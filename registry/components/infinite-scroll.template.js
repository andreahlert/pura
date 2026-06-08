// Pure render for <pura-infinite-scroll>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function infiniteScrollTemplate(el = EMPTY_SHIM) {
  const html = `<div part="content" class="content">
         <slot></slot>
         <div part="sentinel" class="sentinel" aria-hidden="true"></div>
         <div part="loader" class="loader">
           <span class="spin" aria-hidden="true"></span>
           <span class="loadlabel"></span>
           <span class="donelabel"></span>
         </div>
       </div>`;
  return { html, css: INFINITE_SCROLL_CSS };
}

export const INFINITE_SCROLL_CSS = `
  :host { display: block; }

  .content {
    color: var(--pura-fg);
    scrollbar-width: thin;
    scrollbar-color: var(--pura-border-strong) transparent;
  }

  .sentinel { width: 100%; height: 1px; }

  .loader {
    display: none;
    align-items: center; justify-content: center; gap: var(--pura-space-2);
    padding: var(--pura-space-4);
    color: var(--pura-muted-fg);
    font-size: var(--pura-text-sm);
  }
  .spin {
    display: none; width: 1rem; height: 1rem;
    border: 2px solid color-mix(in srgb, var(--pura-fg) 18%, transparent);
    border-top-color: var(--pura-fg); border-radius: 50%;
    animation: pura-spin 0.65s linear infinite;
  }
  @keyframes pura-spin { to { transform: rotate(360deg); } }
`;
