// Pure render for <pura-visually-hidden>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function visuallyHiddenTemplate(el = EMPTY_SHIM) {
  const html = `<span part="content" class="sr"><slot></slot></span>`;
  return { html, css: VISUALLY_HIDDEN_CSS };
}

export const VISUALLY_HIDDEN_CSS = `
  :host { display: contents; }

  .sr {
    position: absolute !important;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  /* focusable: reveal when focus lands inside (skip-link reveal) */
  :host([focusable]) .sr:focus-within {
    position: static !important;
    width: auto; height: auto;
    padding: revert; margin: 0;
    overflow: visible;
    clip: auto;
    clip-path: none;
    white-space: normal;
  }
`;
