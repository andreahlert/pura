// <pura-beams> — background beams behind hero content, in the style of
// Aceternity UI's Background Beams / Background Lines: curved SVG paths with a
// faint base trace plus a glowing gradient dash traveling along each path on a
// staggered infinite loop. Geometry and timing are deterministic per-index
// math in the pure template (no Math.random), so the server and client paint
// byte-identical scenes and the effect needs no client JS; there is no
// animation runtime, only CSS @keyframes over stroke-dashoffset.
//
// Attributes:
//   count    — number of beam paths (default 8, capped at 32).
//   duration — base loop duration in seconds (default 7); each beam loops at
//              0.75x..1.25x of it with a deterministic phase shift.
//
// Tokens: --pura-beams-color-a/-b/-c (gradient stops), --pura-beams-width
//   (beam stroke), --pura-beams-trace-color / --pura-beams-trace-width
//   (base trace), --pura-beams-opacity.
//
// Slots: default — content layered above the beam scene.
//
// Reduced motion: the travel animation is gated behind
//   (prefers-reduced-motion: no-preference); in reduce only the calm static
//   traces show. The scene is aria-hidden (purely decorative).
//
// Agent-native layer: each instance registers in window.__puraBeamss keyed by
//   data-pura-id and mirrors data-pura-beams-count / data-pura-beams-duration.
import { PuraElement, define } from "../base.js";
import meta from "./beams.meta.js";
import { beamsTemplate } from "./beams.template.js";

let uid = 0;

function registry() {
  return (window.__puraBeamss ||= new Map());
}

class PuraBeams extends PuraElement {
  static observedAttributes = ["count", "duration"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-beams-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);
    this._paint();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this._id) return;
    this._paint();
  }

  _paint() {
    const { html, css } = beamsTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-beams-count", this.getAttribute("count") || "8");
    this.setAttribute("data-pura-beams-duration", this.getAttribute("duration") || "7");
  }
}

define("pura-beams", PuraBeams, meta);
export { PuraBeams };
