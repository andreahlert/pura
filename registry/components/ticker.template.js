// Pure render for <pura-ticker>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function tickerTemplate(el = EMPTY_SHIM) {
  const html = `<span part="ticker" role="status" aria-live="polite" aria-atomic="true">
         <span part="prefix" class="prefix" aria-hidden="true"></span>
         <span part="number" class="number"></span>
         <span part="suffix" class="suffix" aria-hidden="true"></span>
       </span>`;
  return { html, css: TICKER_CSS };
}

export const TICKER_CSS = `
  :host { display: inline-block; }
  [part="ticker"] {
    display: inline-flex; align-items: baseline; gap: var(--pura-space-1);
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-xl); font-weight: 600; line-height: 1;
    color: var(--pura-fg);
    font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1;
  }
  .number { font-variant-numeric: tabular-nums; }
  .prefix, .suffix {
    font-size: 0.7em; font-weight: 550; color: var(--pura-muted);
  }
`;
