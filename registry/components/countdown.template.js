// Pure render(s) for <countdown> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

const SEGMENTS = [
  ["days", "Days"],
  ["hours", "Hours"],
  ["minutes", "Minutes"],
  ["seconds", "Seconds"],
];

export function countdownTemplate(el = EMPTY_SHIM) {
  const html = `<div class="cd" part="countdown" role="timer" aria-live="off" aria-atomic="true">
         <div class="segments" part="segments">
           ${SEGMENTS.map(
             ([key, label]) => `
           <div class="seg" part="segment" data-unit="${key}">
             <span class="num" part="value" data-unit="${key}">00</span>
             <span class="cap" part="label">${label}</span>
           </div>
           <span class="colon" part="colon" aria-hidden="true">:</span>`
           ).join("")}
         </div>
         <span class="compact" part="compact"></span>
         <div class="done" part="complete" hidden><slot name="complete"></slot></div>
       </div>`;
  return { html, css: COUNTDOWN_CSS };
}

export const COUNTDOWN_CSS = `
  :host { display: inline-block; color: var(--pura-fg); }

  .cd { display: inline-flex; align-items: stretch; }

  /* segmented (default) */
  .segments {
    display: inline-flex; align-items: flex-start; gap: var(--pura-space-2);
  }
  .seg {
    display: inline-flex; flex-direction: column; align-items: center;
    gap: var(--pura-space-1);
    min-width: 3.25rem;
    padding: var(--pura-space-3) var(--pura-space-2);
    background: var(--pura-subtle); border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius); box-shadow: var(--pura-shadow-sm);
  }
  .num {
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-xl); font-weight: 650; line-height: 1;
    color: var(--pura-fg); letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
  }
  .cap {
    font-size: var(--pura-text-xs); font-weight: 500;
    color: var(--pura-muted); line-height: 1; text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .colon {
    align-self: center;
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-xl); font-weight: 600; line-height: 1;
    color: var(--pura-muted); padding-top: var(--pura-space-1);
  }

  /* no-labels: drop captions, tighten segments */
  .cd[data-labels="off"] .cap { display: none; }
  .cd[data-labels="off"] .seg { padding: var(--pura-space-2); }

  /* compact one-liner */
  .compact {
    display: none;
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-lg); font-weight: 600;
    color: var(--pura-fg); line-height: 1;
    font-variant-numeric: tabular-nums; letter-spacing: 0.01em;
  }
  .cd[data-compact="true"] .segments { display: none; }
  .cd[data-compact="true"] .compact { display: inline-block; }

  /* completion content */
  .done {
    display: inline-flex; align-items: center;
    font-size: var(--pura-text-base); color: var(--pura-muted-fg);
  }
  .done[hidden] { display: none; }
  .cd[data-done="true"] .segments,
  .cd[data-done="true"] .compact { display: none; }
`;
