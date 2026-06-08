// Pure render for <pura-diff>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function diffTemplate(el = EMPTY_SHIM) {
  const html = `<div part="diff" role="group">
         <span class="stream" part="stream"></span>
       </div>
       <span class="summary" part="summary" aria-hidden="true"></span>
       <slot name="before" hidden></slot>
       <slot name="after" hidden></slot>
       <span class="sr" aria-live="polite"></span>`;
  return { html, css: DIFF_CSS };
}

export const DIFF_CSS = `
  :host { display: inline; }
  :host([block]) { display: block; }

  [part="diff"] {
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-sm);
    line-height: 1.6;
    color: var(--pura-fg);
    white-space: pre-wrap;
    word-break: break-word;
  }

  .seg { border-radius: var(--pura-radius-sm); }

  .seg.eq { color: var(--pura-fg); }

  .seg.del {
    text-decoration: line-through;
    text-decoration-thickness: 1px;
    color: var(--pura-danger);
    background: var(--pura-danger-bg);
    padding: 0 var(--pura-space-1);
  }

  .seg.add {
    color: var(--pura-success-fg);
    background: var(--pura-success-bg);
    padding: 0 var(--pura-space-1);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
  }

  .summary {
    display: inline-flex;
    align-items: center;
    gap: var(--pura-space-1);
    margin-left: var(--pura-space-2);
    font-family: var(--pura-font);
    font-size: var(--pura-text-xs);
    font-weight: 550;
    color: var(--pura-muted-fg);
    vertical-align: middle;
  }

  .sr {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0 0 0 0);
    white-space: nowrap; border: 0;
  }
`;
