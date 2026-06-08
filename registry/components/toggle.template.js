// Pure render for <pura-toggle>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function toggleTemplate(el = EMPTY_SHIM) {
  const html = `<button part="button toggle" type="button">
         <slot></slot>
       </button>`;
  return { html, css: TOGGLE_CSS };
}

export const TOGGLE_CSS = `
  :host { display: inline-block; }

  button {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; white-space: nowrap; cursor: pointer;
    border: 1px solid transparent; border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-3); height: 2.25rem; min-width: 2.25rem;
    background: transparent; color: var(--pura-fg);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  button:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  button:active { transform: translateY(0.5px) scale(0.99); }
  button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  button:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  /* pressed (on) state — accentuated subtle background */
  :host([pressed]) button {
    background: var(--pura-subtle);
    color: var(--pura-fg);
  }
  :host([pressed]) button:hover { background: var(--pura-subtle-hover); }

  /* sizes */
  :host([size="sm"]) button {
    height: 1.875rem; min-width: 1.875rem;
    font-size: var(--pura-text-xs); padding: 0 var(--pura-space-2);
  }
  :host([size="lg"]) button {
    height: 2.75rem; min-width: 2.75rem;
    font-size: var(--pura-text-base); padding: 0 var(--pura-space-4);
  }

  /* outline variant */
  :host([variant="outline"]) button {
    border-color: var(--pura-border-strong);
    box-shadow: var(--pura-shadow-sm);
  }
  :host([variant="outline"]) button:hover { background: var(--pura-subtle); }
  :host([variant="outline"][pressed]) button { background: var(--pura-subtle); }
  :host([variant="outline"][pressed]) button:hover { background: var(--pura-subtle-hover); }
`;
