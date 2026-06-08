// Pure render for <pura-swipe>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function swipeTemplate(el = EMPTY_SHIM) {
  const html = `<div class="track">
         <div part="action" class="action left"><slot name="left-action"></slot></div>
         <div part="action" class="action right"><slot name="right-action"></slot></div>
         <div part="content" class="content"><slot></slot></div>
       </div>`;
  return { html, css: SWIPE_CSS };
}

export const SWIPE_CSS = `
  :host { display: block; overflow: hidden; }

  .track { position: relative; }

  .content {
    position: relative; z-index: 1;
    background: var(--pura-bg); color: var(--pura-fg);
    transition: transform var(--pura-dur) var(--pura-ease);
  }

  .action {
    position: absolute; top: 0; bottom: 0;
    display: flex; align-items: center;
    z-index: 0;
  }
  .action.left { left: 0; justify-content: flex-start; }
  .action.right { right: 0; justify-content: flex-end; }
`;
