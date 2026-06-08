// Pure render for <pura-copy-button>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const COPY =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">` +
  `<rect x="9" y="9" width="11" height="11" rx="2"/>` +
  `<path d="M5 15V5a2 2 0 0 1 2-2h10"/>` +
  `</svg>`;
const CHECK =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">` +
  `<path d="M20 6L9 17l-5-5"/>` +
  `</svg>`;

export function copyButtonTemplate(el = EMPTY_SHIM) {
  const html = `<button part="button" type="button">
         <span class="icon copy-icon" part="icon copy-icon" aria-hidden="true">${COPY}</span>
         <span class="icon check" part="icon check-icon" aria-hidden="true">${CHECK}</span>
         <span class="label" part="label"><slot></slot></span>
         <span class="feedback" part="feedback" aria-hidden="true">${t("copy-button.copied")}</span>
       </button>
       <span class="sr" part="live" role="status" aria-live="polite"></span>`;
  return { html, css: COPY_BUTTON_CSS };
}

export const COPY_BUTTON_CSS = `
  :host { display: inline-block; }

  button {
    position: relative;
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; white-space: nowrap; cursor: pointer;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    background: var(--pura-bg); color: var(--pura-fg);
    box-shadow: var(--pura-shadow-sm);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  button:hover { background: var(--pura-subtle); }
  button:active { transform: translateY(0.5px) scale(0.99); }
  button:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  button:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  /* icon-only: square button */
  :host(:not([data-labelled])) button {
    width: 2rem; height: 2rem; padding: 0;
  }
  /* labelled: text + leading icon */
  :host([data-labelled]) button {
    height: 2rem; padding: 0 var(--pura-space-3);
  }

  .icon {
    display: inline-flex; align-items: center; justify-content: center;
    font-size: var(--pura-text-base);
  }
  .icon svg { display: block; }

  /* swap copy <-> check */
  .check { display: none; color: var(--pura-success-fg); }
  :host([data-copied]) .copy-icon { display: none; }
  :host([data-copied]) .check { display: inline-flex; }

  /* visible label slot — hidden when empty (icon-only mode) */
  .label { display: none; }
  :host([data-labelled]) .label { display: inline; }

  /* "Copiado" text replaces a visible label while in the copied state */
  .feedback { display: none; }
  :host([data-labelled][data-copied]) .label { display: none; }
  :host([data-labelled][data-copied]) .feedback {
    display: inline; color: var(--pura-success-fg);
  }

  /* visually-hidden polite live region for screen readers */
  .sr {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0;
  }
`;
