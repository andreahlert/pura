// Pure render for <pura-stat>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function statTemplate(el = EMPTY_SHIM) {
  const html = `<div class="stat" part="stat" role="group">
         <span class="icon" part="icon" aria-hidden="true"><slot name="icon"></slot></span>
         <div class="body">
           <span class="label" part="label"></span>
           <span class="value" part="value"></span>
           <span class="delta" part="delta">
             <svg class="arrow" part="arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
               <path class="arrow-path" fill="none" stroke="currentColor" stroke-width="1.75"
                     stroke-linecap="round" stroke-linejoin="round" d=""></path>
             </svg>
             <span class="delta-text" part="delta-text"></span>
           </span>
         </div>
       </div>`;
  return { html, css: STAT_CSS };
}

export const STAT_CSS = `
  :host { display: block; height: 100%; }

  .stat {
    display: flex; align-items: flex-start; gap: var(--pura-space-3);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow-sm);
    padding: var(--pura-space-5);
    height: 100%; box-sizing: border-box;
  }

  .icon {
    display: inline-flex; align-items: center; justify-content: center;
    flex: none; width: 2.5rem; height: 2.5rem;
    border-radius: var(--pura-radius); background: var(--pura-subtle);
    color: var(--pura-muted-fg);
  }
  .icon ::slotted(*) { width: 1.25rem; height: 1.25rem; display: block; }

  .body { display: flex; flex-direction: column; gap: var(--pura-space-1); min-width: 0; }

  .label {
    font-size: var(--pura-text-sm); font-weight: 500;
    color: var(--pura-muted-fg); line-height: 1.2;
  }

  .value {
    font-size: var(--pura-text-xl); font-weight: 650;
    color: var(--pura-fg); line-height: 1.1; letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
  }

  .delta {
    display: inline-flex; align-items: center; gap: var(--pura-space-1);
    align-self: flex-start;
    font-size: var(--pura-text-xs); font-weight: 600; line-height: 1;
    margin-top: var(--pura-space-1);
    color: var(--pura-muted-fg);
    font-variant-numeric: tabular-nums;
  }
  .arrow { display: block; flex: none; }

  /* trend colors driven by resolved data-trend (mirrors the green up / red down rule) */
  .stat[data-trend="up"] .delta { color: var(--pura-success-fg); }
  .stat[data-trend="down"] .delta { color: var(--pura-danger); }
  .stat[data-trend="flat"] .delta { color: var(--pura-muted-fg); }
`;
