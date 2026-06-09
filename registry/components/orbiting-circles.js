// <pura-orbiting-circles> — satellites ride a circular orbit around centred
// content, in the style of Magic UI's Orbiting Circles. Pure CSS does the
// motion: one @keyframes rotates each satellite's arm, with a negative
// animation-delay spreading them around the ring. No animation runtime; the
// visual works server-rendered (DSD). JS re-renders on attribute change and
// wires the agent registry.
//
// Attributes:
//   count    — number of satellites (default 5, max 24).
//   duration — seconds for one orbit (default 20).
//   reverse  — orbit counter-clockwise.
//
// Theming: --pura-orbit-size, -radius, -dot, -color, -glow, -ring, -duration.
//
// Slots: default — the centre content the satellites orbit.
//
// Reduced motion: base.js RESET collapses animation-duration, so the satellites
//   come to rest with no separate guard.
//
// Agent-native layer: each instance registers in window.__puraOrbitingCircles
//   keyed by data-pura-id and mirrors data-pura-orbiting-count.
import { PuraElement, define } from "../base.js";
import meta from "./orbiting-circles.meta.js";
import { orbitingCirclesTemplate } from "./orbiting-circles.template.js";

let uid = 0;

function registry() {
  return (window.__puraOrbitingCircles ||= new Map());
}

class PuraOrbitingCircles extends PuraElement {
  static observedAttributes = ["count", "duration", "reverse"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-orbiting-circles-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);
    this._paint();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._paint();
  }

  _paint() {
    const { html, css } = orbitingCirclesTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-orbiting-count", this.getAttribute("count") || "5");
  }
}

define("pura-orbiting-circles", PuraOrbitingCircles, meta);
export { PuraOrbitingCircles };
