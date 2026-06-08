// Pure render for <pura-aspect-ratio>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function aspectRatioTemplate(el = EMPTY_SHIM) {
  const html = `<div part="wrapper"><slot></slot></div>`;
  return { html, css: ASPECT_RATIO_CSS };
}

export const ASPECT_RATIO_CSS = `
  :host { display: block; }

  [part="wrapper"] {
    position: relative;
    width: 100%;
    aspect-ratio: var(--pura-ar, 1 / 1);
    overflow: hidden;
    border-radius: 0;
  }
  :host([rounded]) [part="wrapper"] { border-radius: var(--pura-radius); }

  /* Slotted content fills the box. Media is cropped to cover. */
  ::slotted(*) {
    display: block;
    width: 100%;
    height: 100%;
  }
  ::slotted(img),
  ::slotted(video),
  ::slotted(picture),
  ::slotted(canvas),
  ::slotted(iframe),
  ::slotted(svg) {
    object-fit: cover;
    border: 0;
  }
`;
