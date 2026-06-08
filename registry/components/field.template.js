// Pure render for <pura-field>. No DOM; SSR/DSD + client safe.
// label/description/error derive from attributes; under EMPTY_SHIM none are set so
// the field degrades to just the control slot.
import { EMPTY_SHIM } from "../base.js";

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

export function fieldTemplate(el = EMPTY_SHIM) {
  const label = el.getAttribute("label");
  const description = el.getAttribute("description");
  const error = el.getAttribute("error");
  const hasError = error != null && error !== "";

  const html = `${label ? `<span part="label" class="label">${label}</span>` : ""}
       <div part="control" class="control"><slot></slot></div>
       ${description && !hasError ? `<span part="description" class="description">${description}</span>` : ""}
       ${hasError ? `<span part="error" class="error" role="alert" aria-live="polite">${error}</span>` : ""}`;
  return { html, css: CSS };
}
