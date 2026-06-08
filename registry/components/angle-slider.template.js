// Pure render(s) for <angle-slider> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

const CX = 50;
const CY = 50;
const R = 42;

export function angleSliderTemplate(el = EMPTY_SHIM) {
  const html = `<div class="wrap" part="dial">
         <svg class="svg" viewBox="0 0 100 100" role="slider" tabindex="0">
           <circle class="ring" cx="${CX}" cy="${CY}" r="${R}" fill="none"></circle>
           <g class="marks"></g>
           <line class="line" part="line" x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY}"></line>
           <circle class="thumb" part="thumb" r="6"></circle>
         </svg>
       </div>`;
  return { html, css: ANGLE_SLIDER_CSS };
}

export const ANGLE_SLIDER_CSS = `
  :host { display: inline-block; --angle-size: 120px; }
  :host([disabled]) { opacity: 0.55; }

  .wrap { display: inline-flex; }
  .svg {
    display: block; width: var(--angle-size); height: var(--angle-size);
    touch-action: none; cursor: pointer; outline: none;
  }
  :host([disabled]) .svg { cursor: default; }

  .ring {
    stroke: var(--pura-border);
    stroke-width: 3;
  }
  .mark {
    stroke: var(--pura-border-strong);
    stroke-width: 1.5;
    stroke-linecap: round;
  }
  .line {
    stroke: var(--pura-accent);
    stroke-width: 2.5;
    stroke-linecap: round;
  }
  .thumb {
    fill: var(--pura-bg);
    stroke: var(--pura-accent);
    stroke-width: 3;
    transition: stroke-width var(--pura-dur) var(--pura-ease);
  }
  .svg:focus-visible .thumb {
    stroke-width: 5;
  }
  .svg:focus-visible .ring {
    stroke: var(--pura-accent);
  }
`;
