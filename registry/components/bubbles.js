// <pura-bubbles> — translucent bubbles drifting up the section with a lateral
// sway and a soft pop near the top, in the style of the tsParticles Bubbles
// preset. The bubbles are deterministically scattered in the pure template
// (no Math.random), so the server and client paint the same field and the
// effect works with no client JS. Each bubble is two composed CSS @keyframes
// (outer rise + inner sway); there is no animation runtime.
//
// Attributes:
//   count — number of bubbles (default 16, capped at 80).
//
// Theming: --pura-bubbles-color (rim + tint), --pura-bubbles-highlight
//   (inner radial glare), --pura-bubbles-opacity (peak opacity),
//   --pura-bubbles-travel (rise distance, default -105vh; set e.g. -320px
//   for short sections so the pop happens in view).
//
// Slots: default — content layered above the bubble field.
//
// Reduced motion: the rise/sway animations are gated behind
//   prefers-reduced-motion: no-preference; under reduce the bubbles hold a
//   static scattered field at their deterministic seat positions.
//
// Agent-native layer: each instance registers in window.__puraBubbless keyed
//   by data-pura-id and mirrors data-pura-bubbles-count.
import { PuraElement, define } from "../base.js";
import meta from "./bubbles.meta.js";
import { bubblesTemplate } from "./bubbles.template.js";

let uid = 0;

function registry() {
  return (window.__puraBubbless ||= new Map());
}

class PuraBubbles extends PuraElement {
  static observedAttributes = ["count"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-bubbles-${uid++}`;
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
    const { html, css } = bubblesTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-bubbles-count", this.getAttribute("count") || "16");
  }
}

define("pura-bubbles", PuraBubbles, meta);
export { PuraBubbles };
