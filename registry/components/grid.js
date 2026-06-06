// <pura-grid> — CSS grid container primitive. Themeable layout building block.
// Attributes:
//   cols    number → repeat(n, 1fr) | track string (e.g. "1fr 2fr" | "200px 1fr")
//   rows    number → repeat(n, 1fr) | track string
//   gap     space scale (1–6) → var(--pura-space-N) | any CSS length (e.g. "2rem")
//   align   align-items value (start | center | end | stretch | baseline …)
//   justify justify-items value (start | center | end | stretch …)
//   flow    grid-auto-flow value (row | column | dense | "row dense" …)
//   min     min track size for auto-fit (repeat(auto-fit, minmax(min, 1fr)))
//           applied only when `cols` is not set; defaults to a sensible 16rem
// Slots: default — grid items.
// Part: grid — the grid container <div>.
import { PuraElement, define } from "../base.js";
import meta from "./grid.meta.js";

const SPACE = new Set(["1", "2", "3", "4", "5", "6"]);

class PuraGrid extends PuraElement {
  static get observedAttributes() {
    return ["cols", "rows", "gap", "align", "justify", "flow", "min"];
  }

  connectedCallback() {
    if (!this.shadowRoot.childElementCount) {
      this.render(`<div part="grid"><slot></slot></div>`, CSS);
    }
    this._sync();
  }

  attributeChangedCallback() {
    if (this.isConnected) this._sync();
  }

  // Read attributes → resolve to CSS custom properties on the host. Custom
  // properties pierce the shadow boundary, so the grid <div> reads them in CSS.
  _sync() {
    const cols = this.getAttribute("cols");
    const rows = this.getAttribute("rows");
    const gap = this.getAttribute("gap");
    const min = this.getAttribute("min");

    this._set("--_cols", track(cols, min));
    this._set("--_rows", track(rows));
    this._set("--_gap", gap == null ? null : SPACE.has(gap) ? `var(--pura-space-${gap})` : gap);
    this._set("--_align", this.getAttribute("align"));
    this._set("--_justify", this.getAttribute("justify"));
    this._set("--_flow", this.getAttribute("flow"));
  }

  _set(name, value) {
    if (value == null) this.style.removeProperty(name);
    else this.style.setProperty(name, value);
  }
}

// Resolve a cols/rows attribute to a grid-template value.
// A bare integer → repeat(n, 1fr); anything else is treated as a raw track list.
// When `cols` is absent but `min` is given, fall back to a responsive auto-fit.
function track(value, min) {
  if (value != null && value !== "") {
    return /^\d+$/.test(value.trim()) ? `repeat(${value.trim()}, 1fr)` : value;
  }
  if (min != null) return `repeat(auto-fit, minmax(${min}, 1fr))`;
  return null;
}

const CSS = `
  :host { display: block; }
  [part="grid"] {
    display: grid;
    grid-template-columns: var(--_cols, repeat(auto-fit, minmax(16rem, 1fr)));
    grid-template-rows: var(--_rows, none);
    gap: var(--_gap, var(--pura-space-4));
    align-items: var(--_align, stretch);
    justify-items: var(--_justify, stretch);
    grid-auto-flow: var(--_flow, row);
  }
`;

define("pura-grid", PuraGrid, meta);
export { PuraGrid };
