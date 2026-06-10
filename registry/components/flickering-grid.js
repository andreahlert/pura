// <pura-flickering-grid> — a background grid of small squares that light up and
// dim back down at staggered times behind slotted content, in the style of
// Magic UI's Flickering Grid. Every cell's delay, duration and resting opacity
// come from deterministic seed + index math in the pure template (no
// Math.random), so the server and client paint the same field and the flicker
// is pure CSS @keyframes with no animation runtime. A gradient mask fades the
// field toward the edges, the classic backdrop for mockups and CTAs.
//
// Attributes:
//   columns — grid columns (default 24, clamped 4..48).
//   rows    — grid rows (default 14, clamped 3..32).
//   seed    — integer that reshuffles the flicker pattern (default 1).
//   mask    — "radial" (default) | "top" | "bottom" | "none" fade mask.
//   speed   — "slow" | "normal" (default) | "fast".
//   color   — flicker color, applied as the color token (optional).
//
// Tokens: --pura-flickering-grid-color, --pura-flickering-grid-gap,
//   --pura-flickering-grid-radius, --pura-flickering-grid-max-opacity,
//   --pura-flickering-grid-mask.
//
// Slots: default — content layered above the grid.
//
// Reduced motion: the flicker is gated behind prefers-reduced-motion:
//   no-preference; reduce gets the same static grid with varied cell
//   opacities (some pre-lit), no movement.
//
// Agent-native layer: each instance registers in window.__puraFlickeringGrids
//   keyed by data-pura-id with { columns, rows, seed, el }; data-pura-fg-*
//   mirror the effective config.
import { PuraElement, define } from "../base.js";
import meta from "./flickering-grid.meta.js";
import { flickeringGridTemplate } from "./flickering-grid.template.js";

let uid = 0;

function registry() {
  return (window.__puraFlickeringGrids ||= new Map());
}

function clampInt(raw, fallback, min, max) {
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

class PuraFlickeringGrid extends PuraElement {
  static observedAttributes = ["columns", "rows", "seed", "mask", "speed", "color"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-flickering-grid-${uid++}`;
    this.dataset.puraId = this._id;
    this._paint();
  }

  disconnectedCallback() {
    const entry = registry().get(this._id);
    if (entry && entry.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._paint();
  }

  _paint() {
    const { html, css } = flickeringGridTemplate(this);
    this.render(html, css);

    const color = this.getAttribute("color");
    if (color) this.style.setProperty("--pura-flickering-grid-color", color);
    else this.style.removeProperty("--pura-flickering-grid-color");

    const columns = this.columns;
    const rows = this.rows;
    const seed = this.seed;
    this.setAttribute("data-pura-fg-columns", String(columns));
    this.setAttribute("data-pura-fg-rows", String(rows));
    this.setAttribute("data-pura-fg-seed", String(seed));

    registry().set(this._id, { id: this._id, columns, rows, seed, el: this });
  }

  // ---- config ---------------------------------------------------------------
  get columns() {
    return clampInt(this.getAttribute("columns"), 24, 4, 48);
  }

  get rows() {
    return clampInt(this.getAttribute("rows"), 14, 3, 32);
  }

  get seed() {
    return clampInt(this.getAttribute("seed"), 1, 0, 9999);
  }
}

define("pura-flickering-grid", PuraFlickeringGrid, meta);
export { PuraFlickeringGrid };
