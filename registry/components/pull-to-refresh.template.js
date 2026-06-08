// Pure render for <pura-pull-to-refresh>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function pullToRefreshTemplate(el = EMPTY_SHIM) {
  const html = `<div part="indicator" class="indicator">
         <span class="arrow" aria-hidden="true"></span>
         <span class="spin" aria-hidden="true"></span>
         <span class="label"></span>
       </div>
       <div part="content" class="content"><slot></slot></div>`;
  return { html, css: PULL_TO_REFRESH_CSS };
}

export const PULL_TO_REFRESH_CSS = `
  :host { display: block; overflow: hidden; }

  .indicator {
    display: flex; align-items: center; justify-content: center;
    gap: var(--pura-space-2);
    height: 0; overflow: hidden;
    color: var(--pura-muted-fg);
    font-size: var(--pura-text-sm);
    transition: height var(--pura-dur) var(--pura-ease);
  }

  .arrow {
    width: 0.85rem; height: 0.85rem;
    border-left: 2px solid currentColor; border-bottom: 2px solid currentColor;
    transform: rotate(-45deg);
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  .indicator[data-state="release"] .arrow { transform: rotate(135deg); }
  .indicator[data-state="refreshing"] .arrow,
  .indicator[data-state="pull"] .spin,
  .indicator[data-state="release"] .spin { display: none; }
  .indicator[data-state="refreshing"] .spin { display: inline-block; }

  .spin {
    display: none; width: 1rem; height: 1rem;
    border: 2px solid color-mix(in srgb, var(--pura-fg) 18%, transparent);
    border-top-color: var(--pura-fg); border-radius: 50%;
    animation: pura-spin 0.65s linear infinite;
  }
  @keyframes pura-spin { to { transform: rotate(360deg); } }

  .content {
    color: var(--pura-fg);
    transition: transform var(--pura-dur) var(--pura-ease);
    touch-action: pan-y;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: var(--pura-border-strong) transparent;
  }
`;
