// Pure render for <pura-virtual-list>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function virtualListTemplate(el = EMPTY_SHIM) {
  const html = `<div part="viewport" class="viewport">
         <div class="spacer"></div>
         <div class="window" part="window"></div>
       </div>`;
  return { html, css: VIRTUAL_LIST_CSS };
}

export const VIRTUAL_LIST_CSS = `
  :host { display: block; }

  .viewport {
    position: relative;
    overflow: auto;
    height: 18rem;
    color: var(--pura-fg);
    border-radius: var(--pura-radius);
    scrollbar-width: thin;
    scrollbar-color: var(--pura-border-strong) transparent;
  }
  .viewport::-webkit-scrollbar { width: 0.5rem; }
  .viewport::-webkit-scrollbar-track { background: transparent; }
  .viewport::-webkit-scrollbar-thumb {
    background: var(--pura-border-strong);
    border-radius: var(--pura-radius-full);
    border: 2px solid transparent; background-clip: padding-box;
  }

  .spacer { width: 1px; }
  .window {
    position: absolute; top: 0; left: 0; right: 0;
    will-change: transform;
  }
  .item {
    box-sizing: border-box;
    display: flex; align-items: center;
    font-size: var(--pura-text-base);
  }
`;
