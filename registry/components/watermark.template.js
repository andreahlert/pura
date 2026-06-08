// Pure render for <pura-watermark>. No DOM; SSR/DSD + client safe.
// The watermark overlay's background-image/size/opacity are applied imperatively
// after render (they depend on getComputedStyle + attribute math), so the static
// markup here is just the content + empty mark layers.
import { EMPTY_SHIM } from "../base.js";

const CSS = `
  :host { display: block; position: relative; color: var(--pura-fg); }
  [part="content"] { position: relative; z-index: 0; }
  [part="mark"] {
    position: absolute; inset: 0; z-index: 1;
    pointer-events: none; user-select: none;
    background-repeat: repeat;
  }
`;

export function watermarkTemplate(el = EMPTY_SHIM) {
  const html = `<div part="content" class="content"><slot></slot></div>
       <div part="mark" class="mark" aria-hidden="true"></div>`;
  return { html, css: CSS };
}
