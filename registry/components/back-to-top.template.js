// Pure render for <pura-back-to-top>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

const CHEVRON =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">` +
  `<path d="M18 15l-6-6-6 6"/>` +
  `</svg>`;

export function backToTopTemplate(el = EMPTY_SHIM) {
  const html = `<button part="button" type="button" tabindex="-1" aria-hidden="true">
         <span class="icon" part="icon" aria-hidden="true">${CHEVRON}</span>
         <span class="custom" part="custom"><slot></slot></span>
       </button>`;
  return { html, css: BACK_TO_TOP_CSS };
}

export const BACK_TO_TOP_CSS = `
  :host {
    position: fixed;
    right: var(--pura-space-5);
    bottom: var(--pura-space-5);
    z-index: 50;
  }

  button {
    display: inline-flex; align-items: center; justify-content: center;
    width: 2.75rem; height: 2.75rem; padding: 0;
    font: inherit; font-size: var(--pura-text-lg); line-height: 1;
    cursor: pointer;
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-full);
    background: var(--pura-bg); color: var(--pura-fg);
    box-shadow: var(--pura-shadow-lg);
    /* hidden + non-interactive until shown */
    opacity: 0;
    transform: translateY(var(--pura-space-3)) scale(0.96);
    pointer-events: none;
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }

  :host([data-visible]) button {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  button:hover { background: var(--pura-subtle); border-color: var(--pura-border-strong); }
  button:active { transform: translateY(0.5px) scale(0.98); }
  button:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring), var(--pura-shadow-lg); }
  button:disabled { opacity: 0; pointer-events: none; }

  .icon { display: inline-flex; align-items: center; justify-content: center; }
  .icon svg { display: block; }

  /* a custom slotted glyph/label replaces the default chevron when present */
  .custom { display: none; }
  :host([data-custom]) .icon { display: none; }
  :host([data-custom]) .custom { display: inline-flex; align-items: center; justify-content: center; }
  ::slotted(*) { display: inline-flex; }
`;
