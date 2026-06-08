// Pure render for <pura-progress-ring>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function progressRingTemplate(el = EMPTY_SHIM) {
  const html = `<div class="ring" part="ring" role="progressbar" aria-valuemin="0" aria-valuemax="100">
         <svg class="svg" part="svg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
           <circle class="track" part="track" cx="50" cy="50"></circle>
           <circle class="indicator" part="indicator" cx="50" cy="50"></circle>
         </svg>
         <div class="value" part="value" aria-hidden="true"></div>
       </div>`;
  return { html, css: PROGRESS_RING_CSS };
}

export const PROGRESS_RING_CSS = `
  :host { display: inline-block; }

  .ring {
    position: relative;
    width: var(--ring-size, 64px);
    height: var(--ring-size, 64px);
  }

  .svg {
    display: block; width: 100%; height: 100%;
    transform: rotate(-90deg); /* start the arc at 12 o'clock */
    transform-origin: center;
  }

  .track {
    fill: none;
    stroke: var(--pura-subtle);
  }

  .indicator {
    fill: none;
    stroke: var(--pura-primary);
    stroke-linecap: round;
    transition: stroke-dashoffset var(--pura-dur) var(--pura-ease);
  }

  .value {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: calc(var(--ring-size, 64px) * 0.26);
    font-weight: 600; font-variant-numeric: tabular-nums;
    color: var(--pura-fg); line-height: 1; user-select: none;
  }

  /* indeterminate: spin the whole SVG (arc length is fixed via dashoffset) */
  :host([indeterminate]) .svg {
    animation: pura-ring-spin 0.9s linear infinite;
  }
  :host([indeterminate]) .indicator {
    transition: none;
  }
  @keyframes pura-ring-spin {
    from { transform: rotate(-90deg); }
    to { transform: rotate(270deg); }
  }
`;
