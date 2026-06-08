// <pura-input> — text field. Attributes: type, placeholder, value, disabled,
// invalid, label, hint. Mirrors value back to the host attribute.
import { PuraElement, define } from "../base.js";
import meta from "./input.meta.js";
import { inputTemplate } from "./input.template.js";

class PuraInput extends PuraElement {
  static observedAttributes = ["label", "hint", "placeholder", "type", "value", "disabled", "invalid"];

  connectedCallback() {
    const { html, css } = inputTemplate(this);
    this.render(html, css);
    this._input = this.$("input");
    // When there's no in-shadow `label`, the real <input> still needs a name.
    // Forward the host's aria-label/labelledby so a wrapping <pura-field> (or a
    // bare consumer) can name the control across the shadow boundary.
    if (!this.getAttribute("label")) {
      const label = this.getAttribute("aria-label");
      const labelledby = this.getAttribute("aria-labelledby");
      if (label) this._input.setAttribute("aria-label", label);
      else if (labelledby) this._input.setAttribute("aria-labelledby", labelledby);
    }
    this._input.addEventListener("input", () => {
      this.setAttribute("value", this._input.value);
      this.dispatchEvent(new CustomEvent("input", { detail: { value: this._input.value }, bubbles: true }));
    });
  }

  get value() { return this._input?.value ?? this.getAttribute("value") ?? ""; }
  set value(v) { this.setAttribute("value", v); if (this._input) this._input.value = v; }
}


define("pura-input", PuraInput, meta);
export { PuraInput };
