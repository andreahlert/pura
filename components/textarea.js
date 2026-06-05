// <pura-textarea> — multiline field. Attributes: label, hint, placeholder,
// rows, value, disabled, invalid.
import { PuraElement, define } from "../base.js";

class PuraTextarea extends PuraElement {
  static observedAttributes = ["label", "hint", "placeholder", "rows", "value", "disabled", "invalid"];

  connectedCallback() {
    this.render(
      `${this.getAttribute("label") ? `<label part="label" for="t">${this.getAttribute("label")}</label>` : ""}
       <textarea id="t" part="textarea" rows="${this.getAttribute("rows") || 4}"
         placeholder="${this.getAttribute("placeholder") || ""}"
         ${this.hasAttribute("disabled") ? "disabled" : ""}
         ${this.hasAttribute("invalid") ? 'aria-invalid="true"' : ""}>${this.getAttribute("value") || ""}</textarea>
       ${this.getAttribute("hint") ? `<small part="hint">${this.getAttribute("hint")}</small>` : ""}`,
      CSS
    );
    this._el = this.$("textarea");
    this._el.addEventListener("input", () => {
      this.setAttribute("value", this._el.value);
      this.dispatchEvent(new CustomEvent("input", { detail: { value: this._el.value }, bubbles: true }));
    });
  }

  get value() { return this._el?.value ?? ""; }
  set value(v) { if (this._el) this._el.value = v; this.setAttribute("value", v); }
}

const CSS = `
  :host { display: block; }
  label {
    display: block; font-size: var(--pura-text-sm); font-weight: 550;
    color: var(--pura-fg); margin-bottom: var(--pura-space-2);
  }
  textarea {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg); resize: vertical;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: var(--pura-space-3); min-height: 4.5rem; line-height: 1.55;
    box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  textarea::placeholder { color: var(--pura-muted); }
  textarea:hover { border-color: var(--pura-fg); }
  textarea:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  textarea:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }
  :host([invalid]) textarea {
    border-color: var(--pura-danger);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--pura-danger) 30%, transparent);
  }
  small { display: block; margin-top: var(--pura-space-2); font-size: var(--pura-text-xs); color: var(--pura-muted); }
  :host([invalid]) small { color: var(--pura-danger); }
`;

define("pura-textarea", PuraTextarea);
export { PuraTextarea };
