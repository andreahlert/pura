// <pura-pulse-rings> — concentric rings that expand and fade out from the
// center behind the slotted content (a logo, avatar, or icon): the classic
// soft signal / radar backdrop, in the style of Magic UI's Ripple. Distinct
// from <pura-ripple>, which is a pointer-triggered touch ripple. Every ring
// is a pure CSS @keyframes loop with a deterministic per-index stagger; there
// is no animation runtime and no per-frame JS.
//
// Attributes:
//   count    — number of rings (default 4, capped at 8).
//   duration — seconds per expand/fade cycle (default 3).
//   scale    — expansion factor each ring grows to before vanishing (default 2.5).
//   filled   — boolean; tints each ring with a faint background fill.
//
// Tokens: --pura-pulse-rings-size (base ring diameter, default 180px),
//   --pura-pulse-rings-color (ring stroke + fill tint),
//   --pura-pulse-rings-border (stroke width, default 1px),
//   --pura-pulse-rings-opacity (peak ring opacity, default 0.5).
//
// Parts: rings (the ring layer), ring (each ring), content (slot wrapper).
//
// SSR / pre-JS: the pure template paints the full ring field; CSS alone runs
// the loop. Reduced motion: the animation is media-gated off and each ring
// holds a static staggered scale/opacity, a frozen radar frame.
//
// Agent-native layer: each instance registers in window.__puraPulseRingss
// keyed by data-pura-id and mirrors data-pura-pulse-rings-count /
// -duration / -scale.
import { PuraElement, define } from "../base.js";
import meta from "./pulse-rings.meta.js";
import { pulseRingsTemplate } from "./pulse-rings.template.js";

let uid = 0;

function registry() {
  return (window.__puraPulseRingss ||= new Map());
}

class PuraPulseRings extends PuraElement {
  static observedAttributes = ["count", "duration", "scale", "filled"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-pulse-rings-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);
    this._paint();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot) return;
    this._paint();
  }

  _paint() {
    const { html, css } = pulseRingsTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-pulse-rings-count", this.getAttribute("count") || "4");
    this.setAttribute("data-pura-pulse-rings-duration", this.getAttribute("duration") || "3");
    this.setAttribute("data-pura-pulse-rings-scale", this.getAttribute("scale") || "2.5");
  }
}

define("pura-pulse-rings", PuraPulseRings, meta);
export { PuraPulseRings };
