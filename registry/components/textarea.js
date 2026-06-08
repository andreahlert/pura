// <pura-textarea> — multiline field. Attributes: label, hint, placeholder,
// rows, value, disabled, invalid.
import { PuraElement, define } from "../base.js";
import meta from "./textarea.meta.js";
import { textareaTemplate } from "./textarea.template.js";

class PuraTextarea extends PuraElement {
  static observedAttributes = ["label", "hint", "placeholder", "rows", "value", "disabled", "invalid"];

  connectedCallback() {
    const { html, css } = textareaTemplate(this);
    this.render(html, css);
    this._el = this.$("textarea");
    this._el.addEventListener("input", () => {
      this.setAttribute("value", this._el.value);
      this.dispatchEvent(new CustomEvent("input", { detail: { value: this._el.value }, bubbles: true }));
    });
  }

  get value() { return this._el?.value ?? ""; }
  set value(v) { if (this._el) this._el.value = v; this.setAttribute("value", v); }
}


define("pura-textarea", PuraTextarea, meta);
export { PuraTextarea };
