// <pura-spacer> — flexible space / gap primitive. Renders an empty <div part="spacer">.
// Attributes:
//   size — space-scale step (1–6, maps to var(--pura-space-N)) OR any CSS length.
//          Fixed gap on the main axis (and block-flow height).
//   (no size) — flex: 1, grows to push flex siblings apart; inert in normal flow.
// Slots: none.
import { PuraElement, define } from "../base.js";

class PuraSpacer extends PuraElement {
  static observedAttributes = ["size"];

  attributeChangedCallback() {
    this._sync();
  }

  connectedCallback() {
    this._sync();
    this.render(`<div part="spacer"></div>`, CSS);
  }

  // Resolve `size` to the --_size custom prop on the host. Scale steps 1–6 map to
  // the spacing tokens; anything else is treated as a raw CSS length. Touches only
  // the host (style/attrs) so it is safe before connection.
  _sync() {
    const size = this.getAttribute("size");
    if (size == null || size === "") {
      this.style.removeProperty("--_size");
      return;
    }
    const v = /^[1-6]$/.test(size) ? `var(--pura-space-${size})` : size;
    this.style.setProperty("--_size", v);
  }
}

const CSS = `
  :host { display: block; }
  /* No size: grow to fill (pushes flex siblings apart); inert in block flow. */
  :host(:not([size])) { flex: 1 1 0%; }
  /* Fixed size: main-axis basis covers flex row/column; height covers block flow. */
  :host([size]) { flex: 0 0 var(--_size); height: var(--_size); }
  [part="spacer"] { width: 100%; height: 100%; }
`;

define("pura-spacer", PuraSpacer);
export { PuraSpacer };
