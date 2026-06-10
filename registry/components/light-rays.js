// <pura-light-rays> — volumetric light rays (god rays) falling from above its
// content, in the style of Magic UI's Light Rays and React Bits' Lightfall.
// Each ray is a narrow translucent conic-gradient wedge anchored to an origin
// point above the frame, softened by a shared blur, swaying slowly in angle
// and intensity via CSS @keyframes with staggered (negative) delays. The fan
// is scattered deterministically in the pure template (no Math.random), so
// server and client paint the same field and the effect needs no client JS.
//
// Attributes:
//   count     — number of rays (default 8, capped at 32).
//   origin    — "left" | "center" | "right" horizontal origin (default center).
//   spread    — total fan width in degrees (default 40, clamped 5..170).
//   intensity — peak ray opacity 0..1 (default 0.6).
//   speed     — base sway cycle in seconds (default 10).
//
// Tokens: --pura-light-rays-color (ray color), --pura-light-rays-blur (soften).
//
// Slots: default — content layered above the ray field.
//
// Reduced motion: the sway animation is gated behind
//   @media (prefers-reduced-motion: no-preference); the rays hold still at
//   peak opacity, which is the final presentable state.
//
// Agent-native layer: each instance registers in window.__puraLightRayss keyed
//   by data-pura-id and mirrors config in data-pura-light-rays-* attributes.
import { PuraElement, define } from "../base.js";
import meta from "./light-rays.meta.js";
import { lightRaysTemplate } from "./light-rays.template.js";

let uid = 0;

function registry() {
  return (window.__puraLightRayss ||= new Map());
}

class PuraLightRays extends PuraElement {
  static observedAttributes = ["count", "origin", "spread", "intensity", "speed"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-light-rays-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, { id: this._id, el: this });
    this._paint();
  }

  disconnectedCallback() {
    const entry = registry().get(this._id);
    if (entry && entry.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot) return;
    this._paint();
  }

  _paint() {
    const { html, css } = lightRaysTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-light-rays-count", this.getAttribute("count") || "8");
    this.setAttribute("data-pura-light-rays-origin", this.getAttribute("origin") || "center");
    this.setAttribute("data-pura-light-rays-intensity", this.getAttribute("intensity") || "0.6");
  }
}

define("pura-light-rays", PuraLightRays, meta);
export { PuraLightRays };
