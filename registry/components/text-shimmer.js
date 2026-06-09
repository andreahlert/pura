// <pura-text-shimmer> — a bright band sweeps across the slotted text, in the
// style of Magic UI's Animated Shiny Text. The sweep is a moving gradient
// clipped to the glyphs (background-clip: text); pure CSS @keyframes, so it
// works server-rendered with no client JS and no animation runtime. JS only
// wires the agent registry.
//
// Theming: --pura-text-shimmer-base (resting text color), -highlight (the band),
//   -duration.
//
// Slots: default — the text (plain text or color-inheriting elements).
//
// Reduced motion: base.js RESET collapses animation-duration, so the sweep
//   freezes and the text shows in the base color.
//
// Agent-native layer: each instance registers in window.__puraTextShimmers keyed
//   by data-pura-id.
import { PuraElement, define } from "../base.js";
import meta from "./text-shimmer.meta.js";
import { textShimmerTemplate } from "./text-shimmer.template.js";

let uid = 0;

function registry() {
  return (window.__puraTextShimmers ||= new Map());
}

class PuraTextShimmer extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-text-shimmer-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = textShimmerTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-text-shimmer", "true");
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }
}

define("pura-text-shimmer", PuraTextShimmer, meta);
export { PuraTextShimmer };
