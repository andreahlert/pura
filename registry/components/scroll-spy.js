// <pura-scroll-spy> — table-of-contents nav that highlights the link matching
// the section currently in view. It observes a set of section elements with an
// IntersectionObserver and, as the user scrolls, moves aria-current onto the
// matching link inside it. Built for docs / long-form pages.
//
// Two ways to declare what to watch:
//   1. Slotted anchors (default): put <a href="#id"> links in the default slot.
//      Each link's href hash resolves to the section element it tracks.
//   2. sections attribute: a CSS selector resolving to the section elements to
//      watch. Links are still slotted; they are matched to sections by order or
//      by href hash, whichever is available.
//
// Attributes:
//   sections    — CSS selector for the section elements to observe. When absent,
//                 sections are derived from the slotted links' href hashes.
//   root        — CSS selector of the scroll container. When absent, the viewport
//                 (null root) is used.
//   offset      — top inset (px) used to bias which section counts as "current",
//                 e.g. to clear a sticky header. Default 0. Becomes the negative
//                 top of the IntersectionObserver rootMargin.
//   auto-scroll — when present, the active link is scrolled into view within the
//                 nav (honoring prefers-reduced-motion).
//   label       — accessible label for the nav landmark. Default "On this page".
//
// Slots:
//   (default) — the navigation links (<a href="#id"> ...). Arbitrary wrapping
//               markup is fine; any <a> with a hash href is treated as a link.
//
// Parts:
//   nav  — the <nav> landmark wrapper around the slotted links.
//
// Events:
//   pura-scroll-spy:change — (bubbles, composed) fired when the active section
//     changes. detail: { id, index, link, section }.
//
// ARIA: the wrapper is role="navigation" with an aria-label. The active link
//   carries aria-current="location" (the correct token for "current location
//   within a page"). State is never conveyed by motion alone.
//
// Agent-native layer: stable data-pura-scroll-spy-* attributes mirror the live
//   active section (id + index + total), and each instance registers in
//   window.__puraScrollSpy keyed by its data-pura-id, exposing { id, activeId,
//   activeIndex, sections, el } plus an activate(idOrIndex) driver so an agent
//   can read the TOC state and jump to a section without DOM diving.
//
// Degrades gracefully: with no attributes, no links, or no matching sections it
//   renders an empty nav and never throws in connectedCallback. If
//   IntersectionObserver is unavailable it falls back to a scroll listener.
import { PuraElement, define } from "../base.js";
import meta from "./scroll-spy.meta.js";

// Module-level counter for stable, unique ids per instance.
let uid = 0;

// Lazily-created global registry so agents can enumerate / read / drive every
// scroll-spy on the page without touching the Shadow DOM. id -> element.
function registry() {
  if (!window.__puraScrollSpy) {
    const map = new Map();
    // Convenience: the entry whose link/section is currently active, if any.
    map.active = () => [...map.values()].filter((s) => s.activeId);
    window.__puraScrollSpy = map;
  }
  return window.__puraScrollSpy;
}

const REDUCED = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

class PuraScrollSpy extends PuraElement {
  static observedAttributes = ["sections", "root", "offset", "auto-scroll", "label"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-scroll-spy-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    // [{ link, section, id }] in document order; the active index into it.
    this._items = [];
    this._activeIndex = -1;
    this._io = null;
    // Per-section visibility ratios, keyed by section element, for tie-breaking.
    this._ratios = new Map();

    this.render(
      `<nav part="nav" role="navigation"><slot></slot></nav>`,
      CSS
    );

    this._slot = this.$("slot");
    // Re-collect when slotted links change (e.g. a framework re-renders the TOC).
    this._onSlotChange = () => this._collect();
    this._slot.addEventListener("slotchange", this._onSlotChange);

    // Clicking a link should optimistically reflect as active, and (for the
    // fallback path) keep things responsive even before scroll settles.
    this._onLinkClick = (e) => {
      const link = e.target.closest && e.target.closest("a[href]");
      if (!link || !this.contains(link)) return;
      const idx = this._items.findIndex((it) => it.link === link);
      if (idx >= 0) this._setActive(idx, { fromClick: true });
    };
    this.addEventListener("click", this._onLinkClick);

    // rAF-coalesced fallback updater (only wired when IO is unavailable).
    this._ticking = false;
    this._onScroll = () => {
      if (this._ticking) return;
      this._ticking = true;
      requestAnimationFrame(() => {
        this._ticking = false;
        this._updateByScroll();
      });
    };

    this._collect();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._onLinkClick);
    if (this._slot) this._slot.removeEventListener("slotchange", this._onSlotChange);
    this._teardownObserver();
    // The registry entry for this id is owned by this instance (unique id), so
    // remove it unconditionally. (The live entry is a descriptor object, not
    // `this`, once _reflectAgentState has run, so an identity check would miss.)
    registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    // connectedCallback may not have run yet; guard on the rendered slot.
    if (!this._slot) return;
    if (name === "label") {
      this._applyLabel();
      return;
    }
    // sections / root / offset all change what we observe: rebuild.
    this._collect();
  }

  // ---- config getters ------------------------------------------------------
  get offset() {
    const n = Number(this.getAttribute("offset"));
    return Number.isFinite(n) ? n : 0;
  }

  get autoScroll() {
    return this.hasAttribute("auto-scroll");
  }

  // Resolve the scroll container, or null for the viewport. Searches the root
  // node (so it works inside other shadow roots) then the document.
  get scrollRoot() {
    const sel = this.getAttribute("root");
    if (!sel) return null;
    try {
      const r = this.getRootNode();
      return (r && r.querySelector && r.querySelector(sel)) ||
        document.querySelector(sel) ||
        null;
    } catch {
      return null;
    }
  }

  // ---- public API ----------------------------------------------------------
  // The currently active section id (or null).
  get activeId() {
    const it = this._items[this._activeIndex];
    return it ? it.id : null;
  }

  // The currently active section index (or -1).
  get activeIndex() {
    return this._activeIndex;
  }

  // Drive the spy: activate a section by its id or numeric index. Scrolls the
  // section into view (honoring reduced-motion) and reflects state. Returns
  // true when a matching item was found.
  activate(idOrIndex) {
    let idx = -1;
    if (typeof idOrIndex === "number") idx = idOrIndex;
    else idx = this._items.findIndex((it) => it.id === idOrIndex);
    const it = this._items[idx];
    if (!it) return false;
    if (it.section && typeof it.section.scrollIntoView === "function") {
      it.section.scrollIntoView({
        behavior: REDUCED() ? "auto" : "smooth",
        block: "start",
      });
    }
    this._setActive(idx, { fromClick: true });
    return true;
  }

  // ---- collection ----------------------------------------------------------
  // Build the link<->section mapping from slotted links + the sections attr,
  // then (re)wire the observer. Idempotent; safe to call on any change.
  _collect() {
    this._teardownObserver();
    this._applyLabel();

    const links = this._links();
    const explicit = this._explicitSections();

    const items = [];
    links.forEach((link, i) => {
      let section = null;
      let id = "";
      const hash = this._hash(link);
      if (hash) {
        section = this._resolveById(hash);
        id = hash;
      }
      // Fall back to positional pairing with an explicit sections selector.
      if (!section && explicit.length) {
        section = explicit[i] || null;
        if (section) id = section.id || id || `pura-spy-${this._id}-${i}`;
      }
      if (section) items.push({ link, section, id });
    });

    // If links carried no usable targets but a sections selector did, still
    // expose the sections for the agent layer (no links to highlight, though).
    this._items = items;
    this._sortByDocumentOrder();

    this._activeIndex = -1;
    this._ratios.clear();

    // Clear any stale aria-current the author may have left on links.
    for (const link of links) link.removeAttribute("aria-current");

    this._setupObserver();
    this._reflectAgentState();
  }

  _links() {
    // Slotted, flattened: collect every <a> with an href across slotted nodes.
    const out = [];
    const assigned = this._slot.assignedElements
      ? this._slot.assignedElements({ flatten: true })
      : [];
    for (const node of assigned) {
      if (node.tagName === "A" && node.hasAttribute("href")) out.push(node);
      if (node.querySelectorAll) {
        out.push(...node.querySelectorAll("a[href]"));
      }
    }
    // De-dup while preserving order.
    return [...new Set(out)];
  }

  _explicitSections() {
    const sel = this.getAttribute("sections");
    if (!sel) return [];
    try {
      const r = this.getRootNode();
      const scope = (r && r.querySelectorAll) ? r : document;
      return [...scope.querySelectorAll(sel)];
    } catch {
      return [];
    }
  }

  // The fragment id a link points to ("#foo" -> "foo"), same-document only.
  _hash(link) {
    const href = link.getAttribute("href") || "";
    if (href.startsWith("#") && href.length > 1) {
      return decodeURIComponent(href.slice(1));
    }
    return "";
  }

  _resolveById(id) {
    if (!id) return null;
    try {
      const r = this.getRootNode();
      return (r && r.getElementById && r.getElementById(id)) ||
        document.getElementById(id) ||
        null;
    } catch {
      return null;
    }
  }

  _sortByDocumentOrder() {
    this._items.sort((a, b) => {
      const pos = a.section.compareDocumentPosition(b.section);
      if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });
  }

  // ---- observation ---------------------------------------------------------
  _setupObserver() {
    if (!this._items.length) return;

    const rootEl = this.scrollRoot;
    if (typeof IntersectionObserver === "function") {
      // A section counts as "current" once its top passes the offset line.
      // Negative bottom margin keeps a single section active at a time.
      const top = -this.offset;
      this._io = new IntersectionObserver(
        (entries) => this._onIntersect(entries),
        {
          root: rootEl || null,
          rootMargin: `${top}px 0px -65% 0px`,
          threshold: [0, 0.1, 0.25, 0.5, 1],
        }
      );
      for (const it of this._items) this._io.observe(it.section);
    } else {
      // Fallback: listen on the scroll source and compute by position.
      this._fallbackSource = rootEl || window;
      this._fallbackSource.addEventListener("scroll", this._onScroll, { passive: true });
      window.addEventListener("resize", this._onScroll, { passive: true });
      this._updateByScroll();
    }
  }

  _teardownObserver() {
    if (this._io) {
      this._io.disconnect();
      this._io = null;
    }
    if (this._fallbackSource) {
      this._fallbackSource.removeEventListener("scroll", this._onScroll);
      window.removeEventListener("resize", this._onScroll);
      this._fallbackSource = null;
    }
  }

  _onIntersect(entries) {
    for (const e of entries) {
      this._ratios.set(e.target, e.isIntersecting ? e.intersectionRatio : 0);
    }
    // Pick the topmost section that is currently intersecting; if none, keep
    // the last section above the fold (the closest preceding one).
    let bestIdx = -1;
    this._items.forEach((it, i) => {
      const ratio = this._ratios.get(it.section) || 0;
      if (ratio > 0 && bestIdx === -1) bestIdx = i; // topmost intersecting
    });

    if (bestIdx === -1) {
      // Nothing intersecting in the band: choose the closest section whose top
      // is at/above the offset line (i.e. scrolled past). Default to first.
      bestIdx = this._lastSectionAboveLine();
    }
    if (bestIdx >= 0) this._setActive(bestIdx);
  }

  // Index of the last section whose top is at/above the offset line, else 0.
  _lastSectionAboveLine() {
    const line = this.offset;
    let idx = -1;
    this._items.forEach((it, i) => {
      const rect = it.section.getBoundingClientRect();
      const refTop = this._refTop();
      if (rect.top - refTop <= line + 1) idx = i;
    });
    return idx === -1 ? (this._items.length ? 0 : -1) : idx;
  }

  // Top coordinate of the reference frame (scroll container or viewport).
  _refTop() {
    const rootEl = this.scrollRoot;
    if (rootEl && typeof rootEl.getBoundingClientRect === "function") {
      return rootEl.getBoundingClientRect().top;
    }
    return 0;
  }

  // Fallback (no IntersectionObserver): pick by computed position.
  _updateByScroll() {
    if (!this._items.length) return;
    const idx = this._lastSectionAboveLine();
    if (idx >= 0) this._setActive(idx);
  }

  // ---- active state --------------------------------------------------------
  _setActive(index, { fromClick = false } = {}) {
    if (index === this._activeIndex) {
      // Re-affirm aria-current in case the slot was re-rendered.
      this._applyAriaCurrent();
      return;
    }
    this._activeIndex = index;
    this._applyAriaCurrent();

    const it = this._items[index];
    if (it && this.autoScroll) this._scrollLinkIntoView(it.link);

    this._reflectAgentState();

    this.dispatchEvent(
      new CustomEvent("pura-scroll-spy:change", {
        bubbles: true,
        composed: true,
        detail: {
          id: it ? it.id : null,
          index,
          link: it ? it.link : null,
          section: it ? it.section : null,
          fromClick,
        },
      })
    );
  }

  _applyAriaCurrent() {
    this._items.forEach((it, i) => {
      if (i === this._activeIndex) {
        it.link.setAttribute("aria-current", "location");
        it.link.setAttribute("data-pura-active", "");
      } else {
        it.link.removeAttribute("aria-current");
        it.link.removeAttribute("data-pura-active");
      }
    });
  }

  _scrollLinkIntoView(link) {
    if (!link || typeof link.scrollIntoView !== "function") return;
    link.scrollIntoView({
      behavior: REDUCED() ? "auto" : "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }

  _applyLabel() {
    const nav = this.$("[part='nav']");
    if (nav) nav.setAttribute("aria-label", this.getAttribute("label") || "On this page");
  }

  // ---- agent-native --------------------------------------------------------
  // Stable, machine-readable mirror of the spy state on the host (light DOM)
  // plus a live registry entry agents can read/drive.
  _reflectAgentState() {
    const activeId = this.activeId;
    this.setAttribute("data-pura-scroll-spy", "");
    this.setAttribute("data-pura-scroll-spy-count", String(this._items.length));
    this.setAttribute("data-pura-scroll-spy-index", String(this._activeIndex));
    if (activeId != null) this.setAttribute("data-pura-scroll-spy-active", activeId);
    else this.removeAttribute("data-pura-scroll-spy-active");

    registry().set(this._id, {
      id: this._id,
      activeId,
      activeIndex: this._activeIndex,
      sections: this._items.map((it) => it.id),
      el: this,
      activate: (x) => this.activate(x),
    });
  }
}

const CSS = `
  :host { display: block; }
  [part="nav"] { display: block; }
  /* The component manages aria-current on slotted links; authors style the
     active state via [aria-current] on their own links. We expose a minimal,
     token-based hint so it looks intentional out of the box without forcing it. */
  ::slotted(a) {
    color: var(--pura-muted-fg);
    text-decoration: none;
    border-radius: var(--pura-radius-sm);
    transition: color var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease);
  }
  ::slotted(a:hover) { color: var(--pura-fg); }
  ::slotted(a:focus-visible) {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  ::slotted(a[aria-current="location"]) {
    color: var(--pura-fg);
    font-weight: 600;
  }
`;

define("pura-scroll-spy", PuraScrollSpy, meta);
export { PuraScrollSpy };
