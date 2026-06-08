// <pura-spacer> — flexible space / gap primitive. Renders an empty <div part="spacer">.
// Attributes:
//   size — space-scale step (1–6, maps to var(--pura-space-N)) OR any CSS length.
//          Fixed gap on the main axis (and block-flow height).
//   (no size) — flex: 1, grows to push flex siblings apart; inert in normal flow.
// Slots: none.
import { PuraElement, define } from "../base.js";
import meta from "./spacer.meta.js";
import { spacerTemplate } from "./spacer.template.js";

class PuraSpacer extends PuraElement {
  static observedAttributes = ["size"];

  attributeChangedCallback() {
    this._sync();
  }

  connectedCallback() {
    this._sync();
    const { html, css } = spacerTemplate(this);
    this.render(html, css);
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


define("pura-spacer", PuraSpacer, meta);
export { PuraSpacer };
