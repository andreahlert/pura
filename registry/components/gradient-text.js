// <pura-gradient-text> — text filled with a multicolor gradient that flows
// continuously across the letters (aurora style), in the spirit of React Bits'
// Gradient Text, Magic UI's Aurora Text and Aceternity's Colourful Text. The
// fill is a wide linear-gradient clipped to the glyphs (background-clip: text)
// with background-position animated in a seamless CSS @keyframes loop, so it
// works server-rendered with no client JS and no animation runtime. Distinct
// from <pura-text-shimmer>, which sweeps a single highlight band.
//
// Attributes:
//   colors   — comma-separated CSS colors for the gradient stops
//              (default an aurora palette: green, blue, purple, pink).
//   angle    — gradient direction, e.g. "90deg" (default 90deg).
//   duration — seconds for one full flow cycle (default 8).
//
// Tokens: --pura-gradient-text-gradient (full background-image override),
//   -angle, -duration, -size (gradient travel width, default 300% 100%).
//
// Slots: default — the text. The slotted text stays in the light DOM and is
//   read by assistive tech as-is; only the paint is gradient-clipped.
//
// Reduced motion: the flow animation is gated behind
//   prefers-reduced-motion: no-preference, so the gradient freezes as a
//   static multicolor fill (base.js RESET also collapses durations).
//
// Agent-native layer: each instance registers in window.__puraGradientTexts
//   keyed by data-pura-id; data-pura-gradient-* attributes mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./gradient-text.meta.js";
import { gradientTextTemplate } from "./gradient-text.template.js";

let uid = 0;

function registry() {
  return (window.__puraGradientTexts ||= new Map());
}

class PuraGradientText extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-gradient-text-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = gradientTextTemplate(this);
    this.render(html, css);

    const colors = this.getAttribute("colors") || "";
    const duration = this.duration;
    this.setAttribute("data-pura-gradient-flow", "");
    this.setAttribute("data-pura-gradient-duration", String(duration));
    if (colors) this.setAttribute("data-pura-gradient-colors", colors);

    registry().set(this._id, { id: this._id, colors, duration, el: this });
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 8;
  }
}

define("pura-gradient-text", PuraGradientText, meta);
export { PuraGradientText };
