// Pure render for <pura-meter>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function meterTemplate(el = EMPTY_SHIM) {
  const html = `<div class="meter" part="meter">
         <div class="header" part="header">
           <span class="label" part="label"></span>
           <span class="value" part="value"></span>
         </div>
         <div class="track" part="track">
           <div class="fill" part="fill"></div>
         </div>
       </div>`;
  return { html, css: METER_CSS };
}

export const METER_CSS = `
  :host { display: block; }

  .meter { display: flex; flex-direction: column; gap: var(--pura-space-2); }

  .header {
    display: flex; align-items: baseline; justify-content: space-between;
    gap: var(--pura-space-3);
    font-size: var(--pura-text-sm); line-height: 1.2;
  }
  .label { font-weight: 500; color: var(--pura-fg); }
  .value {
    font-weight: 600; color: var(--pura-muted-fg);
    font-variant-numeric: tabular-nums; white-space: nowrap;
  }

  .track {
    width: 100%; height: 0.5rem; border-radius: var(--pura-radius-full);
    background: var(--pura-subtle); overflow: hidden;
  }
  .fill {
    height: 100%; width: 0%; border-radius: inherit;
    background: var(--pura-primary);
    transition: width var(--pura-dur) var(--pura-ease),
      background var(--pura-dur) var(--pura-ease);
  }

  /* threshold-driven colors (resolved level mirrors <meter> semantics) */
  .meter[data-level="success"] .fill { background: var(--pura-success); }
  .meter[data-level="warning"] .fill { background: var(--pura-warning); }
  .meter[data-level="danger"]  .fill { background: var(--pura-danger); }
`;
