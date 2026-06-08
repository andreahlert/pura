// Pure render for <pura-fab>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

const DEFAULT_ICON =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">` +
  `<path d="M12 5v14M5 12h14"/>` +
  `</svg>`;

export function fabTemplate(el = EMPTY_SHIM) {
  const html = `<button part="button" type="button">
         <span class="icon" part="icon" aria-hidden="true"><slot name="icon">${DEFAULT_ICON}</slot></span>
         <span class="label" part="label"><slot></slot></span>
       </button>`;
  return { html, css: FAB_CSS };
}

export const FAB_CSS = `
  :host {
    position: fixed; z-index: 50;
    display: inline-flex;
  }

  /* corner placement — uses safe-area insets where available */
  :host(:not([position])),
  :host([position="bottom-right"]) {
    bottom: calc(var(--pura-space-5) + env(safe-area-inset-bottom, 0px));
    right: calc(var(--pura-space-5) + env(safe-area-inset-right, 0px));
  }
  :host([position="bottom-left"]) {
    bottom: calc(var(--pura-space-5) + env(safe-area-inset-bottom, 0px));
    left: calc(var(--pura-space-5) + env(safe-area-inset-left, 0px));
  }
  :host([position="top-right"]) {
    top: calc(var(--pura-space-5) + env(safe-area-inset-top, 0px));
    right: calc(var(--pura-space-5) + env(safe-area-inset-right, 0px));
  }
  :host([position="top-left"]) {
    top: calc(var(--pura-space-5) + env(safe-area-inset-top, 0px));
    left: calc(var(--pura-space-5) + env(safe-area-inset-left, 0px));
  }

  button {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--pura-space-2);
    width: 3.5rem; height: 3.5rem; padding: 0;
    font: inherit; font-size: var(--pura-text-base); font-weight: 600;
    line-height: 1; white-space: nowrap; cursor: pointer;
    border: 1px solid transparent; border-radius: var(--pura-radius-full);
    background: var(--pura-primary); color: var(--pura-primary-fg);
    box-shadow: var(--pura-shadow-lg);
    transition: background var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  button:hover { background: var(--pura-primary-hover); }
  button:active { transform: translateY(0.5px) scale(0.98); }
  button:focus-visible { outline: none; box-shadow: var(--pura-shadow-lg), 0 0 0 3px var(--pura-ring); }
  button:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  .icon {
    display: inline-flex; align-items: center; justify-content: center;
    font-size: var(--pura-text-xl);
  }
  .icon ::slotted(svg), .icon svg { display: block; }

  /* label hidden by default (compact circle); shown only when extended */
  .label { display: none; }
  :host([extended]) button {
    width: auto; min-width: 3.5rem;
    padding: 0 var(--pura-space-5);
  }
  :host([extended]) .label {
    display: inline; font-size: var(--pura-text-sm);
  }
`;
