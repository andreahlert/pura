// Pure render for <pura-knob>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function knobTemplate(el = EMPTY_SHIM) {
  const html = `<div class="knob" part="root">
         <svg class="svg" part="svg" viewBox="0 0 100 100" role="slider" tabindex="0">
           <path class="range" part="range" fill="none"></path>
           <path class="value" part="value" fill="none"></path>
           <text class="text" part="text" x="50" y="50" text-anchor="middle" dominant-baseline="central"></text>
         </svg>
       </div>`;
  return { html, css: KNOB_CSS };
}

export const KNOB_CSS = `
  :host { display: inline-block; --knob-size: 100px; --knob-stroke: 9; }
  :host([disabled]) { opacity: 0.55; }
  :host([disabled]) .svg, :host([readonly]) .svg { cursor: default; }

  .knob { display: inline-flex; }
  .svg {
    display: block; width: var(--knob-size); height: var(--knob-size);
    cursor: ns-resize; touch-action: none; outline: none;
  }
  .svg:focus-visible { outline: none; }
  .svg:focus-visible .range { stroke: var(--pura-border-strong); }

  .range {
    stroke: var(--pura-subtle);
    stroke-width: var(--knob-stroke);
    stroke-linecap: round;
  }
  .value {
    stroke: var(--pura-accent);
    stroke-width: var(--knob-stroke);
    stroke-linecap: round;
    transition: d var(--pura-dur) var(--pura-ease);
  }
  .text {
    fill: var(--pura-fg);
    font-family: var(--pura-font);
    font-size: 18px; font-weight: 650;
    font-variant-numeric: tabular-nums;
  }
`;
