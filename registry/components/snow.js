// <pura-snow> — gently falling snowflakes behind its content: vertical fall plus
// lateral sway, with three depth layers (size, speed, opacity vary by index) for
// a parallax feel. The flakes are deterministically scattered in the pure
// template (no Math.random), so the server and client paint the same field and
// the effect works with no client JS. Each flake is two CSS @keyframes (fall on
// top, sway on transform); there is no animation runtime.
//
// Attributes:
//   count — number of snowflakes (default 48, capped at 160).
//
// Tokens: --pura-snow-color (flake color), --pura-snow-glow (halo),
//   --pura-snow-size (size multiplier), --pura-snow-speed (fall speed
//   multiplier), --pura-snow-drift (sway amplitude multiplier).
//
// Slots: default — content layered above the snowfield.
//
// Reduced motion: animation is gated behind prefers-reduced-motion:
//   no-preference; under reduce the flakes hold their static scattered
//   positions, which is also the SSR / pre-JS paint.
//
// Agent-native layer: each instance registers in window.__puraSnows keyed by
//   data-pura-id and mirrors data-pura-snow-count.
import { PuraElement, define } from "../base.js";
import meta from "./snow.meta.js";
import { snowTemplate } from "./snow.template.js";

let uid = 0;

function registry() {
  return (window.__puraSnows ||= new Map());
}

class PuraSnow extends PuraElement {
  static observedAttributes = ["count"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-snow-${uid++}`;
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
    const { html, css } = snowTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-snow-count", this.getAttribute("count") || "48");
  }
}

define("pura-snow", PuraSnow, meta);
export { PuraSnow };
