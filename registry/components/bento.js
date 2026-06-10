// <pura-bento> — bento-style feature grid. A dense CSS grid where each child
// cell declares its own footprint via `col-span` / `row-span` attributes, so a
// few hero cells can dominate while small ones fill the gaps. Cells enter with
// a staggered fade/rise (delay derived from :nth-child index, pure CSS) and
// lift with a shadow/border highlight on hover. Zero per-frame JS.
//
// Attributes (host):
//   cols     — column count, 1..8 (default 3).
//   gap      — overrides --pura-bento-gap (any CSS length).
//   row      — overrides --pura-bento-row, the minimum auto row height.
//   stagger  — per-cell entrance delay in ms, 0..1000 (default 80).
//   duration — entrance duration in ms, 0..5000 (default 600).
//   static   — boolean: skip the entrance animation entirely.
//   no-hover — boolean: disable the hover lift/highlight.
// Attributes (on child cells):
//   col-span — columns the cell spans, up to `cols`.
//   row-span — rows the cell spans, 2..4.
//
// Tokens: --pura-bento-gap, --pura-bento-row, --pura-bento-radius,
//   --pura-bento-padding, --pura-bento-cell-bg, --pura-bento-border,
//   --pura-bento-hover-border, --pura-bento-hover-shadow, --pura-bento-lift,
//   --pura-bento-stagger, --pura-bento-duration. Parts: grid.
//
// SSR / pre-JS: layout, spans and cell chrome are pure CSS, so the grid is
// complete and presentable without JS. Reduced motion: the entrance block is
// gated behind prefers-reduced-motion: no-preference; reduce paints the final
// state immediately (hover transition still collapses via the base reset).
//
// Agent-native layer: each instance registers in window.__puraBentos by
//   data-pura-id with { id, cols, cells, el }; data-pura-bento-* mirror state.
import { PuraElement, define } from "../base.js";
import meta from "./bento.meta.js";
import { bentoTemplate } from "./bento.template.js";

let uid = 0;

function registry() {
  return (window.__puraBentos ||= new Map());
}

class PuraBento extends PuraElement {
  static get observedAttributes() {
    return ["cols", "gap", "row", "stagger", "duration", "static", "no-hover"];
  }

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-bento-${uid++}`;
    this.dataset.puraId = this._id;
    this._paint();
  }

  attributeChangedCallback() {
    if (this.isConnected && this._id) this._paint();
  }

  disconnectedCallback() {
    const entry = registry().get(this._id);
    if (entry && entry.el === this) registry().delete(this._id);
  }

  // Re-run the pure template (cheap: only <style> + slot live in the shadow
  // root, slotted cells are untouched so no state or focus is lost), map the
  // gap/row attributes onto their tokens, and mirror state for agents.
  _paint() {
    const { html, css } = bentoTemplate(this);
    this.render(html, css);

    const gap = this.getAttribute("gap");
    const row = this.getAttribute("row");
    if (gap) this.style.setProperty("--pura-bento-gap", gap);
    else this.style.removeProperty("--pura-bento-gap");
    if (row) this.style.setProperty("--pura-bento-row", row);
    else this.style.removeProperty("--pura-bento-row");

    const cols = this.cols;
    const cells = this.children.length;
    this.setAttribute("data-pura-bento-cols", String(cols));
    this.setAttribute("data-pura-bento-cells", String(cells));
    registry().set(this._id, { id: this._id, cols, cells, el: this });
  }

  // ---- config ---------------------------------------------------------------
  get cols() {
    const n = parseInt(this.getAttribute("cols"), 10);
    return Number.isFinite(n) ? Math.min(8, Math.max(1, n)) : 3;
  }
}

define("pura-bento", PuraBento, meta);
export { PuraBento };
