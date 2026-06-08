// Pure render for <pura-scroll-area>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function scrollAreaTemplate(el = EMPTY_SHIM) {
  const html = `<div part="viewport" class="viewport" tabindex="0"><slot></slot></div>`;
  return { html, css: SCROLL_AREA_CSS };
}

export const SCROLL_AREA_CSS = `
  :host { display: block; }

  .viewport {
    overflow: auto;
    max-height: 18rem;
    border-radius: var(--pura-radius);
    color: var(--pura-fg);
    /* Firefox / standards slim scrollbar */
    scrollbar-width: thin;
    scrollbar-color: var(--pura-border-strong) transparent;
  }

  :host([horizontal]) .viewport { overflow-x: auto; }
  :host(:not([horizontal])) .viewport { overflow-x: hidden; }

  /* WebKit / Blink slim scrollbar */
  .viewport::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  .viewport::-webkit-scrollbar-track {
    background: transparent;
  }
  .viewport::-webkit-scrollbar-thumb {
    background: var(--pura-border-strong);
    border-radius: var(--pura-radius-full);
    border: 2px solid transparent;
    background-clip: padding-box;
  }
  .viewport::-webkit-scrollbar-thumb:hover {
    background: var(--pura-muted);
    background-clip: padding-box;
  }
  .viewport::-webkit-scrollbar-corner {
    background: transparent;
  }

  .viewport:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
`;
