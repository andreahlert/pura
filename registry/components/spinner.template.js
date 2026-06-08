// Pure render for <pura-spinner>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function spinnerTemplate(el = EMPTY_SHIM) {
  const html = `<span part="spinner" role="status" aria-label="${el.getAttribute("label") || t("spinner.loading")}"></span>`;
  return { html, css: SPINNER_CSS };
}

export const SPINNER_CSS = `
  :host { display: inline-block; line-height: 0; }
  [part="spinner"] {
    display: inline-block; width: 1.25rem; height: 1.25rem;
    border: 2.5px solid color-mix(in srgb, var(--pura-fg) 18%, transparent);
    border-top-color: var(--pura-fg); border-radius: 50%;
    animation: pura-spin 0.65s linear infinite;
  }
  :host([size="sm"]) [part="spinner"] { width: 0.9rem; height: 0.9rem; border-width: 2px; }
  :host([size="lg"]) [part="spinner"] { width: 2rem; height: 2rem; border-width: 3px; }
  @keyframes pura-spin { to { transform: rotate(360deg); } }
`;
