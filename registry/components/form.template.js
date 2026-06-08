// Pure render for <pura-form>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function formTemplate(el = EMPTY_SHIM) {
  const html = `<div part="form" class="form">
         <slot></slot>
         <div part="errors" class="errors" role="alert" aria-live="polite" hidden></div>
       </div>`;
  return { html, css: FORM_CSS };
}

export const FORM_CSS = `
  :host { display: block; }
  .form { display: block; }
  .errors {
    margin-top: var(--pura-space-3);
    display: flex; flex-direction: column; gap: var(--pura-space-1);
    padding: var(--pura-space-3);
    background: var(--pura-danger-bg);
    border: 1px solid var(--pura-danger);
    border-radius: var(--pura-radius);
    color: var(--pura-danger);
    font-size: var(--pura-text-sm); font-weight: 550; line-height: 1.4;
  }
  .errors[hidden] { display: none; }
`;
