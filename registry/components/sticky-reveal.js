// <pura-sticky-reveal> — sticky scroll reveal, the classic SaaS landing-page
// feature walkthrough (the Aceternity UI move): text steps scroll down one
// column while a media panel sticks in the other; as each step crosses the
// middle of the viewport its matching media crossfades in.
//
//   <pura-sticky-reveal>
//     <div slot="step"><h3>Feature one</h3><p>...</p></div>
//     <img slot="media" src="/one.png" alt="Feature one" />
//     <div slot="step"><h3>Feature two</h3><p>...</p></div>
//     <img slot="media" src="/two.png" alt="Feature two" />
//   </pura-sticky-reveal>
//
// Steps and media pair by source order (first step <-> first media). The
// layout (grid + position: sticky) is pure CSS; this class only watches the
// steps with an IntersectionObserver (a narrow band around the middle of the
// nearest scroll container) and toggles data-active on the matching
// step/media pair. No per-frame JS, no timers.
//
// Attributes:
//   side   — "right" (default) | "left". Which side the sticky media panel
//            sits on (wide screens; narrow screens stack media on top).
//   top    — sticky top offset of the media frame in px (default 96).
//   no-dim — boolean. Keep inactive steps at full opacity.
//
// Tokens: --pura-sticky-reveal-gap (column gap), -step-gap (space between
//   steps), -pad (block padding around the steps), -height / -height-sm
//   (media frame height), -radius, -bg, -duration (crossfade), -dim
//   (inactive step opacity).
//
// Events: "pura-sticky-reveal-change" (bubbles) with detail { index } when
//   the active step changes.
//
// SSR / pre-JS: the sticky layout and the first media render with zero JS.
// Reduced motion: the crossfade and enter shift are disabled; media swaps.
//
// Agent-native layer: each instance registers in window.__puraStickyReveals
//   by data-pura-id with { steps, active, el }; data-pura-sr-* mirror state
//   (data-pura-sr-ready, data-pura-sr-steps, data-pura-sr-active).
import { PuraElement, define } from "../base.js";
import meta from "./sticky-reveal.meta.js";
import { stickyRevealTemplate } from "./sticky-reveal.template.js";

let uid = 0;

function registry() {
  return (window.__puraStickyReveals ||= new Map());
}

class PuraStickyReveal extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-sticky-reveal-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = stickyRevealTemplate(this);
    this.render(html, css);

    this._onSlot = () => this._build();
    this.$$("slot").forEach((s) => s.addEventListener("slotchange", this._onSlot));

    registry().set(this._id, { id: this._id, steps: 0, active: 0, el: this });
    this._build();
  }

  disconnectedCallback() {
    this._io?.disconnect();
    this.$$("slot").forEach((s) => s.removeEventListener("slotchange", this._onSlot));
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- internals ------------------------------------------------------------
  // Nearest scrollable ancestor (or null for the viewport), used as the
  // IntersectionObserver root so the component also works inside scroll panels.
  _scrollRoot() {
    let p = this.parentElement;
    while (p) {
      const o = getComputedStyle(p).overflowY;
      if ((o === "auto" || o === "scroll") && p.scrollHeight > p.clientHeight) return p;
      p = p.parentElement;
    }
    return null;
  }

  // Collect the slotted step/media pairs and observe each step against a
  // narrow band around the middle of the scroll root.
  _build() {
    this._io?.disconnect();
    const kids = Array.from(this.children);
    this._steps = kids.filter((c) => c.getAttribute("slot") === "step");
    this._media = kids.filter((c) => c.getAttribute("slot") === "media");
    const n = this._steps.length;
    this.setAttribute("data-pura-sr-steps", String(n));
    if (!n) return;

    this._io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = this._steps.indexOf(entry.target);
          if (i >= 0) this._activate(i);
        }
      },
      { root: this._scrollRoot(), rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    this._steps.forEach((s) => this._io.observe(s));

    this.setAttribute("data-pura-sr-ready", "");
    this._activate(Math.min(this._active ?? 0, n - 1), true);
  }

  // Mark step/media `index` active: toggle data-active on the pair, hide the
  // inactive media from the a11y tree, mirror state, emit the change event.
  _activate(index, force = false) {
    const i = Math.max(0, Math.min(index, this._steps.length - 1));
    const changed = i !== this._active;
    if (!changed && !force) return;
    this._active = i;

    this._steps.forEach((s, j) => s.toggleAttribute("data-active", j === i));
    this._media.forEach((m, j) => {
      m.toggleAttribute("data-active", j === i);
      if (j === i) m.removeAttribute("aria-hidden");
      else m.setAttribute("aria-hidden", "true");
    });

    this.setAttribute("data-pura-sr-active", String(i));
    const entry = registry().get(this._id);
    if (entry) {
      entry.active = i;
      entry.steps = this._steps.length;
    }
    if (changed) {
      this.dispatchEvent(
        new CustomEvent("pura-sticky-reveal-change", { detail: { index: i }, bubbles: true })
      );
    }
  }
}

define("pura-sticky-reveal", PuraStickyReveal, meta);
export { PuraStickyReveal };
