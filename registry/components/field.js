// <pura-field> — form field wrapper (shadcn Field). Vertical stack of label,
// control (default slot), description, and error. Attributes: label,
// description, error. When error is set, invalid styling cue is applied and the
// error message replaces the description.
import { PuraElement, define } from "../base.js";
import meta from "./field.meta.js";

class PuraField extends PuraElement {
  static observedAttributes = ["label", "description", "error"];

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this._render();
  }

  _render() {
    const label = this.getAttribute("label");
    const description = this.getAttribute("description");
    const error = this.getAttribute("error");
    const hasError = error != null && error !== "";

    this.render(
      `${label ? `<span part="label" class="label">${label}</span>` : ""}
       <div part="control" class="control"><slot></slot></div>
       ${description && !hasError ? `<span part="description" class="description">${description}</span>` : ""}
       ${hasError ? `<span part="error" class="error" role="alert" aria-live="polite">${error}</span>` : ""}`,
      CSS
    );
  }
}

const CSS = `
  :host {
    display: flex; flex-direction: column; gap: var(--pura-space-2);
  }
  .label {
    font-size: var(--pura-text-sm); font-weight: 550; line-height: 1.3;
    color: var(--pura-fg);
  }
  .control { display: block; }
  .description {
    font-size: var(--pura-text-xs); line-height: 1.4; color: var(--pura-muted);
  }
  .error {
    font-size: var(--pura-text-xs); line-height: 1.4; color: var(--pura-danger);
    font-weight: 550;
  }
  /* invalid styling cue: tint the label and mark slotted controls invalid */
  :host([error]:not([error=""])) .label { color: var(--pura-danger); }
  :host([error]:not([error=""])) ::slotted(*) { --pura-field-invalid: 1; }
`;

define("pura-field", PuraField, meta);
export { PuraField };
