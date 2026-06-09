// <pura-retro-grid> — a tilted, perspective grid floor whose lines scroll toward
// the viewer, in the style of Magic UI's Retro Grid. Motion is one pure CSS
// @keyframes scroll, so it works server-rendered with no client JS and no
// animation runtime. JS only wires the agent registry.
//
// Theming: --pura-retro-grid-line (line color), --pura-retro-grid-cell (cell px),
//   --pura-retro-grid-angle, --pura-retro-grid-perspective,
//   --pura-retro-grid-opacity, --pura-retro-grid-duration.
//
// Slots: default — content layered above the grid.
//
// Reduced motion: base.js RESET collapses animation-duration, so the grid holds
//   still.
//
// Agent-native layer: each instance registers in window.__puraRetroGrids keyed
//   by data-pura-id.
import { PuraElement, define } from "../base.js";
import meta from "./retro-grid.meta.js";
import { retroGridTemplate } from "./retro-grid.template.js";

let uid = 0;

function registry() {
  return (window.__puraRetroGrids ||= new Map());
}

class PuraRetroGrid extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-retro-grid-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = retroGridTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-retro-grid", "true");
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }
}

define("pura-retro-grid", PuraRetroGrid, meta);
export { PuraRetroGrid };
