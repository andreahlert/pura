// Pure render for <pura-code>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function codeTemplate(el = EMPTY_SHIM) {
  const html = `<code part="code"><slot></slot></code>`;
  return { html, css: CODE_CSS };
}

export const CODE_CSS = `
  :host { display: inline; }
  code {
    font-family: var(--pura-font-mono);
    font-size: 0.875em;
    color: var(--pura-fg);
  }
  /* default subtle chip */
  :host(:not([variant="plain"])) code {
    background: var(--pura-subtle);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-sm);
    padding: 0.15em 0.4em;
  }
`;
