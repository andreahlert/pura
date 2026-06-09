// <pura-grid-pattern> — a tiled grid behind slotted content with a glowing patch
// that sweeps across it, in the style of Magic UI's (Animated) Grid Pattern. A
// dim base grid is always visible; a brighter copy is revealed through a moving
// radial mask. Motion is pure CSS, so it works server-rendered (DSD) with no
// client JS and no animation runtime. JS re-renders on attribute change and
// wires the agent registry.
//
// Attributes:
//   dots — render dots instead of crossed lines.
//
// Theming: --pura-grid-line, --pura-grid-glow, --pura-grid-cell, --pura-grid-spot
//   (glow patch size), --pura-grid-duration, --pura-grid-opacity.
//
// Slots: default — content layered above the grid.
//
// Reduced motion: base.js RESET collapses animation-duration, so the glow rests
//   in one spot with no separate guard.
//
// Agent-native layer: each instance registers in window.__puraGridPatterns keyed
//   by data-pura-id.
import { PuraElement, define } from "../base.js";
import meta from "./grid-pattern.meta.js";
import { gridPatternTemplate } from "./grid-pattern.template.js";

let uid = 0;

function registry() {
  return (window.__puraGridPatterns ||= new Map());
}

class PuraGridPattern extends PuraElement {
  static observedAttributes = ["dots"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-grid-pattern-${uid++}`;
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
    const { html, css } = gridPatternTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-grid-pattern", "true");
  }
}

define("pura-grid-pattern", PuraGridPattern, meta);
export { PuraGridPattern };
