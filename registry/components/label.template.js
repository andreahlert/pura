// Pure render for <pura-label>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function labelTemplate(el = EMPTY_SHIM) {
  const html = `<label part="label"><slot></slot></label>`;
  return { html, css: LABEL_CSS };
}

export const LABEL_CSS = `
  :host { display: inline-block; }
  label {
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; color: var(--pura-fg);
    cursor: default; user-select: none;
  }
  :host([for]) label { cursor: pointer; }
`;
