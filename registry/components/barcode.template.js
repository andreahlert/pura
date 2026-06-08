// Pure render(s) for <barcode> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

function esc(s) {
  return String(s).replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

export function barcodeTemplate(el = EMPTY_SHIM) {
  const html = `<div part="error" class="err">${esc(t("barcode.empty"))}</div>`;
  return { html, css: BARCODE_CSS };
}

export const BARCODE_CSS = `
  :host { display: inline-block; line-height: 0; }
  svg { display: block; }
  svg .bg { fill: var(--pura-bg); }
  svg .bars { fill: var(--pura-fg); }
  svg .label { fill: var(--pura-fg); font-family: var(--pura-font-mono); }
  .err {
    display: inline-flex; align-items: center; justify-content: center;
    padding: var(--pura-space-4);
    font-size: var(--pura-text-sm); color: var(--pura-danger);
    background: var(--pura-danger-bg); border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius); line-height: 1.4;
  }
`;
