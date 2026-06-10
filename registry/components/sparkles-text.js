// <pura-sparkles-text> — text decorated with tiny four-point stars that twinkle
// and are born/die around the letters, in the style of Magic UI's Sparkles Text
// and Aceternity's Sparkles. The stars are scattered deterministically in the
// pure template (no Math.random), so the server and client paint the same
// field; each star is a CSS @keyframes twinkle (scale/opacity/rotate) with a
// per-index delay, so there is no animation runtime.
//
// Attributes:
//   count    — number of sparkles (default 10, capped at 40).
//   duration — seconds per twinkle cycle (default 1.6).
//
// Tokens: --pura-sparkles-text-color (star color, default #f5c518),
//   --pura-sparkles-text-color-alt (every other star, default #a855f7),
//   --pura-sparkles-text-size (star size, default 0.55em).
//
// Slots: default — the text (or any inline content) being decorated; it stays
//   untouched in the light DOM, so it is the accessible copy. Sparkles are
//   aria-hidden decoration.
//
// Reduced motion: the twinkle is gated behind prefers-reduced-motion:
//   no-preference; under reduce the stars hold a soft static scale/opacity.
//
// Agent-native layer: each instance registers in window.__puraSparklesTexts
//   keyed by data-pura-id and mirrors data-pura-sparkles-count and
//   data-pura-sparkles-duration.
import { PuraElement, define } from "../base.js";
import meta from "./sparkles-text.meta.js";
import { sparklesTextTemplate } from "./sparkles-text.template.js";

let uid = 0;

function registry() {
  return (window.__puraSparklesTexts ||= new Map());
}

class PuraSparklesText extends PuraElement {
  static observedAttributes = ["count", "duration"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-sparkles-text-${uid++}`;
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
    const { html, css } = sparklesTextTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-sparkles-count", this.getAttribute("count") || "10");
    this.setAttribute("data-pura-sparkles-duration", this.getAttribute("duration") || "1.6");
  }
}

define("pura-sparkles-text", PuraSparklesText, meta);
export { PuraSparklesText };
