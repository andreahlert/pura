// Pure render for <pura-collapsible>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function collapsibleTemplate(el = EMPTY_SHIM) {
  const html = `<button part="trigger" type="button" class="trigger" aria-expanded="false">
         <slot name="trigger"></slot>
       </button>
       <div part="content" class="content" role="region">
         <div class="inner"><slot></slot></div>
       </div>`;
  return { html, css: COLLAPSIBLE_CSS };
}

export const COLLAPSIBLE_CSS = `
  :host { display: block; }

  .trigger {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    text-align: left; color: var(--pura-fg); cursor: pointer;
    background: transparent; border: none; border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-1) 0;
    transition: color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .trigger:hover { color: var(--pura-muted-fg); }
  .trigger:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  .trigger:disabled { opacity: 0.55; cursor: not-allowed; }

  .content {
    display: grid; grid-template-rows: 0fr;
    transition: grid-template-rows var(--pura-dur) var(--pura-ease);
  }
  :host([open]) .content { grid-template-rows: 1fr; }

  .inner {
    overflow: hidden; min-height: 0;
    font-size: var(--pura-text-sm); color: var(--pura-fg);
  }
  :host(:not([open])) .inner { visibility: hidden; }
  :host([open]) .inner { padding-top: var(--pura-space-2); }
`;
