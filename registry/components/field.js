// <pura-field> — form field wrapper (shadcn Field). Vertical stack of label,
// control (default slot), description, and error. Attributes: label,
// description, error. When error is set, invalid styling cue is applied and the
// error message replaces the description.
import { PuraElement, define } from "../base.js";
import meta from "./field.meta.js";
import { fieldTemplate } from "./field.template.js";

class PuraField extends PuraElement {
  static observedAttributes = ["label", "description", "error"];

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this._render();
  }

  _render() {
    const { html, css } = fieldTemplate(this);
    this.render(html, css);
  }
}

define("pura-field", PuraField, meta);
export { PuraField };
