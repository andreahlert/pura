// <pura-input> — text field. Attributes: type, placeholder, value, disabled,
// invalid, label, hint. Mirrors value back to the host attribute.
import { PuraElement, define } from "../base.js";
import meta from "./input.meta.js";

class PuraInput extends PuraElement {
  static observedAttributes = ["label", "hint", "placeholder", "type", "value", "disabled", "invalid"];

  connectedCallback() {
    const id = "i";
    this.render(
      `${this.getAttribute("label") ? `<label part="label" for="${id}">${this.getAttribute("label")}</label>` : ""}
       <input id="${id}" part="input"
         type="${this.getAttribute("type") || "text"}"
         placeholder="${this.getAttribute("placeholder") || ""}"
         ${this.hasAttribute("disabled") ? "disabled" : ""}
         ${this.hasAttribute("invalid") ? 'aria-invalid="true"' : ""}
         value="${this.getAttribute("value") || ""}" />
       ${this.getAttribute("hint") ? `<small part="hint">${this.getAttribute("hint")}</small>` : ""}`,
      CSS
    );
    this._input = this.$("input");
    this._input.addEventListener("input", () => {
      this.setAttribute("value", this._input.value);
      this.dispatchEvent(new CustomEvent("input", { detail: { value: this._input.value }, bubbles: true }));
    });
  }

  get value() { return this._input?.value ?? this.getAttribute("value") ?? ""; }
  set value(v) { this.setAttribute("value", v); if (this._input) this._input.value = v; }
}

const CSS = `
  :host { display: block; }
  label {
    display: block; font-size: var(--pura-text-sm); font-weight: 550;
    color: var(--pura-fg); margin-bottom: var(--pura-space-2);
  }
  input {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-3); height: 2.25rem;
    box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  input::placeholder { color: var(--pura-muted); }
  input:hover { border-color: var(--pura-fg); }
  input:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  input:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }
  :host([invalid]) input {
    border-color: var(--pura-danger);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--pura-danger) 30%, transparent);
  }
  small {
    display: block; margin-top: var(--pura-space-2);
    font-size: var(--pura-text-xs); color: var(--pura-muted);
  }
  :host([invalid]) small { color: var(--pura-danger); }
`;

define("pura-input", PuraInput, meta);
export { PuraInput };
