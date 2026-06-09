// <pura-particles> — a field of small dots that drift and twinkle behind slotted
// content, in the style of Magic UI's Particles. Pure CSS does the motion: each
// dot floats on a deterministic @keyframes, so the field works server-rendered
// (DSD) with no client JS and no animation runtime. JS re-renders on attribute
// change and wires the agent registry.
//
// Attributes:
//   count — number of particles (default 60, max 200).
//
// Theming: --pura-particle-color, --pura-particle-opacity.
//
// Slots: default — content layered above the field.
//
// Reduced motion: base.js RESET collapses animation-duration, so the field comes
//   to rest with no separate guard.
//
// Agent-native layer: each instance registers in window.__puraParticles keyed by
//   data-pura-id and mirrors data-pura-particles-count.
import { PuraElement, define } from "../base.js";
import meta from "./particles.meta.js";
import { particlesTemplate } from "./particles.template.js";

let uid = 0;

function registry() {
  return (window.__puraParticles ||= new Map());
}

class PuraParticles extends PuraElement {
  static observedAttributes = ["count"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-particles-${uid++}`;
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
    const { html, css } = particlesTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-particles-count", this.getAttribute("count") || "60");
  }
}

define("pura-particles", PuraParticles, meta);
export { PuraParticles };
