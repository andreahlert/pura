// <pura-back-to-top> — floating round button that appears (fades in) once the
// page is scrolled past a threshold and smooth-scrolls back to the top on click.
// Fixed bottom-right, subtle. Watches window scroll; degrades gracefully with no
// attributes/children.
// Attributes:
//   offset    — scroll distance in px before the button appears (default 400)
//   label     — accessible label for the icon-only button (default "Voltar ao topo")
//   target    — CSS selector of the scroll container to watch + scroll. When
//               absent (default) it tracks the page (window / documentElement).
//   disabled  — non-interactive (also stays hidden)
// Slots:
//   (default) — optional custom glyph/label replacing the default chevron icon.
// Events:
//   scroll-top  — fired after a scroll-to-top is initiated (via click or .toTop())
// Agent-native layer: stable data-pura-back-to-top-* attributes mirror live state
//   (visible / hidden, current scroll offset, threshold) and each instance
//   registers in window.__puraBackToTop keyed by its data-pura-id, so agents can
//   enumerate buttons and call .toTop() to drive a scroll programmatically.
import { PuraElement, define } from "../base.js";
import meta from "./back-to-top.meta.js";

let uid = 0;

// Lazily-created global registry so agents can enumerate / read / drive every
// back-to-top button on the page without touching the Shadow DOM. id -> element.
function registry() {
  return (window.__puraBackToTop ||= new Map());
}

class PuraBackToTop extends PuraElement {
  static observedAttributes = ["offset", "label", "target", "disabled"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-back-to-top-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this._visible = false;

    this.render(
      `<button part="button" type="button" tabindex="-1" aria-hidden="true">
         <span class="icon" part="icon" aria-hidden="true">${CHEVRON}</span>
         <span class="custom" part="custom"><slot></slot></span>
       </button>`,
      CSS
    );

    this._btn = this.$("button");
    this._slot = this.$("slot");

    this._onClick = () => this.toTop();
    this._btn.addEventListener("click", this._onClick);

    // When custom content is slotted, hide the default chevron and show it.
    this._onSlotChange = () => {
      const custom = this._slot.assignedNodes().length > 0;
      this.toggleAttribute("data-custom", custom);
    };
    this._slot.addEventListener("slotchange", this._onSlotChange);
    this._onSlotChange();

    // Throttle scroll handling to one update per animation frame.
    this._ticking = false;
    this._onScroll = () => {
      if (this._ticking) return;
      this._ticking = true;
      requestAnimationFrame(() => {
        this._ticking = false;
        this._update();
      });
    };

    this._bindScrollSource();
    this._update();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
    this._unbindScrollSource();
  }

  attributeChangedCallback(name) {
    if (!this._btn) return;
    if (name === "target") {
      this._unbindScrollSource();
      this._bindScrollSource();
    }
    this._update();
  }

  // ---- config getters ------------------------------------------------------
  get disabled() {
    return this.hasAttribute("disabled");
  }

  get offset() {
    const n = Number(this.getAttribute("offset"));
    return Number.isFinite(n) && n >= 0 ? n : 400;
  }

  // Resolve the scroll container. Defaults to the page (window scroll).
  get scroller() {
    const sel = this.getAttribute("target");
    if (!sel) return null;
    try {
      return document.querySelector(sel);
    } catch {
      return null;
    }
  }

  // ---- scroll source wiring ------------------------------------------------
  _bindScrollSource() {
    this._source = this.scroller || window;
    this._source.addEventListener("scroll", this._onScroll, { passive: true });
  }

  _unbindScrollSource() {
    if (this._source) {
      this._source.removeEventListener("scroll", this._onScroll);
      this._source = null;
    }
  }

  _scrollTop() {
    const el = this.scroller;
    if (el) return el.scrollTop;
    return window.scrollY || document.documentElement.scrollTop || 0;
  }

  // ---- public API ----------------------------------------------------------
  // Smooth-scroll the tracked container (or the page) to the top. Honors
  // prefers-reduced-motion by jumping instantly. Safe to call programmatically.
  toTop() {
    if (this.disabled) return;
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduce ? "auto" : "smooth";
    const el = this.scroller;
    if (el && typeof el.scrollTo === "function") {
      el.scrollTo({ top: 0, behavior });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
    this.dispatchEvent(new CustomEvent("scroll-top", { bubbles: true }));
  }

  // ---- visibility + state sync ---------------------------------------------
  _update() {
    if (!this._btn) return;
    const top = this._scrollTop();
    const shouldShow = !this.disabled && top > this.offset;
    if (shouldShow !== this._visible) this._visible = shouldShow;

    // The button is removed from the a11y tree + tab order while hidden so it
    // never traps focus or gets announced when off-screen.
    this.toggleAttribute("data-visible", this._visible);
    this._btn.setAttribute("aria-hidden", this._visible ? "false" : "true");
    this._btn.tabIndex = this._visible ? 0 : -1;
    this._btn.disabled = this.disabled;
    this._btn.setAttribute("aria-label", this.getAttribute("label") || "Voltar ao topo");

    this._reflectAgentState(top);
  }

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState(top) {
    this.setAttribute("role", "complementary");
    this.setAttribute("data-pura-back-to-top", this._visible ? "visible" : "hidden");
    this.setAttribute("data-pura-back-to-top-offset", String(Math.round(top)));
    this.setAttribute("data-pura-back-to-top-threshold", String(this.offset));
    this.setAttribute("data-pura-back-to-top-disabled", this.disabled ? "true" : "false");
  }
}

// Inline chevron-up SVG via currentColor; no external assets.
const CHEVRON =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">` +
  `<path d="M18 15l-6-6-6 6"/>` +
  `</svg>`;

const CSS = `
  :host {
    position: fixed;
    right: var(--pura-space-5);
    bottom: var(--pura-space-5);
    z-index: 50;
  }

  button {
    display: inline-flex; align-items: center; justify-content: center;
    width: 2.75rem; height: 2.75rem; padding: 0;
    font: inherit; font-size: var(--pura-text-lg); line-height: 1;
    cursor: pointer;
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-full);
    background: var(--pura-bg); color: var(--pura-fg);
    box-shadow: var(--pura-shadow-lg);
    /* hidden + non-interactive until shown */
    opacity: 0;
    transform: translateY(var(--pura-space-3)) scale(0.96);
    pointer-events: none;
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }

  :host([data-visible]) button {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  button:hover { background: var(--pura-subtle); border-color: var(--pura-border-strong); }
  button:active { transform: translateY(0.5px) scale(0.98); }
  button:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring), var(--pura-shadow-lg); }
  button:disabled { opacity: 0; pointer-events: none; }

  .icon { display: inline-flex; align-items: center; justify-content: center; }
  .icon svg { display: block; }

  /* a custom slotted glyph/label replaces the default chevron when present */
  .custom { display: none; }
  :host([data-custom]) .icon { display: none; }
  :host([data-custom]) .custom { display: inline-flex; align-items: center; justify-content: center; }
  ::slotted(*) { display: inline-flex; }
`;

define("pura-back-to-top", PuraBackToTop, meta);
export { PuraBackToTop };
