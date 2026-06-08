// Pure render for <pura-kbd>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function kbdTemplate(el = EMPTY_SHIM) {
  const html = `<kbd part="kbd"><slot></slot></kbd>`;
  return { html, css: KBD_CSS };
}

export const KBD_CSS = `
  :host { display: inline-block; vertical-align: middle; line-height: 1; }

  kbd {
    display: inline-flex; align-items: center; justify-content: center;
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-xs); font-weight: 500;
    line-height: 1; white-space: nowrap;
    min-width: 1.25em; height: 1.25rem;
    padding: 0 var(--pura-space-2);
    color: var(--pura-muted-fg);
    background: var(--pura-subtle);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-sm);
  }
`;
