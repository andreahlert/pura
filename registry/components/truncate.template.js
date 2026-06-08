// Pure render for <pura-truncate>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function truncateTemplate(el = EMPTY_SHIM) {
  const html = `<div part="content" id="${el._id}-content"><slot></slot></div>
       <button part="toggle" type="button" hidden
               aria-controls="${el._id}-content"
               aria-expanded="false"></button>`;
  return { html, css: TRUNCATE_CSS };
}

export const TRUNCATE_CSS = `
  :host { display: block; }

  [part="content"] {
    color: var(--pura-fg);
    font-size: var(--pura-text-sm);
    line-height: 1.6;
  }
  /* Visual clamp only — the full text remains in the DOM and accessibility
     tree, so screen readers and agents read everything. */
  [part="content"][data-clamped] {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--pura-truncate-lines, 3);
    line-clamp: var(--pura-truncate-lines, 3);
    overflow: hidden;
  }

  [part="toggle"] {
    margin-top: var(--pura-space-1);
    display: inline-flex; align-items: center;
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; cursor: pointer;
    background: transparent; color: var(--pura-accent);
    border: none; border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-1) 0;
    transition: color var(--pura-dur) var(--pura-ease);
  }
  [part="toggle"]:hover { color: var(--pura-primary); }
  [part="toggle"]:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  [part="toggle"][hidden] { display: none; }
`;
