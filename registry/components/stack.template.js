// Pure render for <pura-stack>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function stackTemplate(el = EMPTY_SHIM) {
  const html = `<div part="stack"><slot></slot></div>`;
  return { html, css: STACK_CSS };
}

export const STACK_CSS = `
  :host { display: block; }
  [part="stack"] {
    display: flex;
    flex-direction: column;
    align-items: var(--_align, stretch);
    justify-content: var(--_justify, flex-start);
    gap: var(--_gap, var(--pura-space-4));
  }
  /* divide: drop the flex gap and let each child reserve the spacing as padding,
     so the 1px rule sits centered in the whitespace between siblings. */
  :host([divide]) [part="stack"] { gap: 0; }
  :host([divide]) ::slotted(:not(:last-child)) {
    border-bottom: 1px solid var(--pura-border);
    padding-bottom: var(--_gap, var(--pura-space-4));
  }
  :host([divide]) ::slotted(:not(:first-child)) {
    padding-top: var(--_gap, var(--pura-space-4));
  }
`;
