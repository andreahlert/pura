// <pura-interactive-grid> — a background grid of real cells that reacts to the
// pointer, in the style of Magic UI's Interactive Grid Pattern and Aceternity's
// Background Boxes / Ripple Effect. The cell under the cursor lights instantly
// and fades out with a trail (transition on un-light); a click ripples a flash
// outward, each cell's animation-delay proportional to its distance from the
// clicked cell. The grid itself is generated deterministically in the pure
// template, so the server paints the full static grid (optionally with a few
// pulsing pre-lit cells) and interaction is a pure enhancement.
//
// Attributes:
//   columns   — grid columns (default 12, 1..64).
//   rows      — grid rows (default 8, 1..64).
//   prelit    — deterministically pre-lit pulsing cells for the static paint
//               (default 3, 0..24).
//   wave-step — ms of click-wave delay per cell of distance (default 40).
//   no-wave   — disable the click wave (hover trail only).
//
// Tokens: --pura-interactive-grid-line, --pura-interactive-grid-highlight,
//   --pura-interactive-grid-prelit, --pura-interactive-grid-wave,
//   --pura-interactive-grid-fade (trail fade-out duration),
//   --pura-interactive-grid-wave-duration, --pura-interactive-grid-pulse-duration.
//
// Events: "pura-interactive-grid:wave" with detail { x, y, columns, rows }.
//
// Reduced motion: pre-lit cells hold a steady soft highlight instead of pulsing
//   and the click wave is dropped; the hover fade collapses via the base RESET.
//
// Agent-native layer: each instance registers in window.__puraInteractiveGrids
//   keyed by data-pura-id with { id, columns, rows, el, wave(x, y) };
//   data-pura-igrid-columns/-rows mirror config and data-pura-igrid-wave the
//   last wave origin.
import { PuraElement, define } from "../base.js";
import meta from "./interactive-grid.meta.js";
import { interactiveGridTemplate } from "./interactive-grid.template.js";

let uid = 0;

function registry() {
  return (window.__puraInteractiveGrids ||= new Map());
}

class PuraInteractiveGrid extends PuraElement {
  static observedAttributes = ["columns", "rows", "prelit"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-interactive-grid-${uid++}`;
    this.dataset.puraId = this._id;
    this._paint();
    registry().set(this._id, {
      id: this._id,
      columns: this.columns,
      rows: this.rows,
      el: this,
      wave: (x, y) => this.wave(x, y),
    });
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot || !this.isConnected) return;
    this._paint();
    const entry = registry().get(this._id);
    if (entry) {
      entry.columns = this.columns;
      entry.rows = this.rows;
    }
  }

  _paint() {
    const { html, css } = interactiveGridTemplate(this);
    this.render(html, css);
    const cells = this.$(".cells");
    cells.addEventListener("pointerover", (e) => {
      const cell = e.target.closest(".cell");
      if (cell) this._light(cell);
    });
    cells.addEventListener("click", (e) => {
      if (this.hasAttribute("no-wave")) return;
      const cell = e.target.closest(".cell");
      if (cell) this.wave(parseInt(cell.dataset.x, 10), parseInt(cell.dataset.y, 10));
    });
    // Animation events bubble: one listener cleans up every finished wave cell.
    cells.addEventListener("animationend", (e) => {
      if (e.animationName !== "pura-igrid-wave") return;
      e.target.classList.remove("wave");
      e.target.style.removeProperty("--pura-igrid-wave-delay");
    });
    this.setAttribute("data-pura-igrid-columns", String(this.columns));
    this.setAttribute("data-pura-igrid-rows", String(this.rows));
  }

  // Light one cell instantly; removing .lit a beat later triggers the CSS
  // fade-out transition, which is what draws the trail.
  _light(cell) {
    cell.classList.add("lit");
    clearTimeout(cell._puraLitTimer);
    cell._puraLitTimer = setTimeout(() => cell.classList.remove("lit"), 60);
  }

  // Ripple a flash outward from cell (x, y): per-cell animation-delay grows
  // with euclidean distance, so one shared keyframe reads as a wave.
  wave(x, y) {
    const cells = this.$$(".cell");
    const step = this.waveStep;
    for (const cell of cells) cell.classList.remove("wave");
    void this.$(".cells").offsetWidth; // one reflow so re-adding .wave restarts
    for (const cell of cells) {
      const dx = parseInt(cell.dataset.x, 10) - x;
      const dy = parseInt(cell.dataset.y, 10) - y;
      const delay = Math.round(Math.hypot(dx, dy) * step);
      cell.style.setProperty("--pura-igrid-wave-delay", `${delay}ms`);
      cell.classList.add("wave");
    }
    this.setAttribute("data-pura-igrid-wave", `${x},${y}`);
    this.dispatchEvent(
      new CustomEvent("pura-interactive-grid:wave", {
        detail: { x, y, columns: this.columns, rows: this.rows },
        bubbles: true,
      }),
    );
  }

  // ---- config ---------------------------------------------------------------
  get columns() {
    const n = parseInt(this.getAttribute("columns"), 10);
    return Number.isFinite(n) ? Math.min(64, Math.max(1, n)) : 12;
  }

  get rows() {
    const n = parseInt(this.getAttribute("rows"), 10);
    return Number.isFinite(n) ? Math.min(64, Math.max(1, n)) : 8;
  }

  get waveStep() {
    const n = parseInt(this.getAttribute("wave-step"), 10);
    return Number.isFinite(n) && n >= 0 ? n : 40;
  }
}

define("pura-interactive-grid", PuraInteractiveGrid, meta);
export { PuraInteractiveGrid };
