// Pure render(s) for <qr-code> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

export function qrCodeTemplate(el = EMPTY_SHIM) {
  const html = `<div part="error" class="err">${escapeHtml(t("qr.empty"))}</div>`;
  return { html, css: QR_CODE_CSS };
}

export const QR_CODE_CSS = `
  :host { display: inline-block; line-height: 0; }
  svg { display: block; border-radius: var(--pura-radius-sm); }
  svg .bg { fill: var(--pura-bg); }
  svg .fg { fill: var(--pura-fg); }
  .err {
    display: inline-flex; align-items: center; justify-content: center;
    padding: var(--pura-space-4);
    font-size: var(--pura-text-sm); color: var(--pura-danger);
    background: var(--pura-danger-bg); border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius); line-height: 1.4;
  }
`;
