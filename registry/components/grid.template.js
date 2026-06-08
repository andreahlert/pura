// Pure render for <pura-grid>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function gridTemplate(el = EMPTY_SHIM) {
  const html = `<div part="grid"><slot></slot></div>`;
  return { html, css: GRID_CSS };
}

export const GRID_CSS = `
  :host { display: block; }
  [part="grid"] {
    display: grid;
    grid-template-columns: var(--_cols, repeat(auto-fit, minmax(16rem, 1fr)));
    grid-template-rows: var(--_rows, none);
    gap: var(--_gap, var(--pura-space-4));
    align-items: var(--_align, stretch);
    justify-items: var(--_justify, stretch);
    grid-auto-flow: var(--_flow, row);
  }
`;
