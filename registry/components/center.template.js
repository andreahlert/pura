// Pure render for <pura-center>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function centerTemplate(el = EMPTY_SHIM) {
  const html = `<div part="center"><slot></slot></div>`;
  return { html, css: CENTER_CSS };
}

export const CENTER_CSS = `
  :host {
    display: grid;
    --pura-center-min-h: auto;
  }
  [part="center"] {
    display: grid;
    place-items: center;
    place-content: center;
    min-height: var(--pura-center-min-h);
  }
  /* axis="x" — center horizontally only, keep content top-aligned */
  :host([axis="x"]) [part="center"] {
    place-items: start center;
    place-content: start center;
  }
  /* axis="y" — center vertically only, keep content left-aligned */
  :host([axis="y"]) [part="center"] {
    place-items: center start;
    place-content: center start;
  }
`;
