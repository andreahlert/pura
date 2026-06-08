// Pure render for <pura-gauge>. No DOM; SSR/DSD + client safe.
// The initial markup is fully static: the arc geometry derives only from the
// module geometry constants (no attribute reads). The value/label readout and the
// fill/needle positions are filled imperatively by _sync() after render, so the
// first paint here shows the empty track + readout — the real initial DOM.
import { EMPTY_SHIM } from "../base.js";

// Geometry of the semicircle (mirrors gauge.js). Declared before use to avoid TDZ.
const CX = 50;
const CY = 50;
const R = 40;
const STROKE = 9;
const ARC_LEN = Math.PI * R;

// SVG path for the 180° arc (left baseline → over the top → right baseline).
function arcPath() {
  return `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;
}

const CSS = `
  :host { display: inline-block; }

  .gauge {
    display: inline-flex; flex-direction: column; align-items: center;
    position: relative; width: 100%; min-width: 8rem;
    color: var(--pura-fg);
  }

  .svg {
    display: block; width: 100%; height: auto; overflow: visible;
  }

  .track {
    fill: none;
    stroke: var(--pura-subtle);
    stroke-width: ${STROKE};
    stroke-linecap: round;
  }

  .fill {
    fill: none;
    stroke: var(--pura-primary);
    stroke-width: ${STROKE};
    stroke-linecap: round;
    transition: stroke-dasharray var(--pura-dur) var(--pura-ease);
  }

  .needle-group {
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  .needle {
    stroke: var(--pura-fg);
    stroke-width: 2.5;
    stroke-linecap: round;
  }
  .pivot {
    fill: var(--pura-bg);
    stroke: var(--pura-fg);
    stroke-width: 2;
  }

  .readout {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    display: flex; flex-direction: column; align-items: center;
    gap: var(--pura-space-1);
    user-select: none; pointer-events: none;
  }
  .value {
    font-size: var(--pura-text-xl); font-weight: 650; line-height: 1;
    letter-spacing: -0.01em; font-variant-numeric: tabular-nums;
    color: var(--pura-fg);
  }
  .label {
    font-size: var(--pura-text-sm); font-weight: 500; line-height: 1.2;
    color: var(--pura-muted-fg);
  }
`;

export function gaugeTemplate(el = EMPTY_SHIM) {
  const html = `<div class="gauge" part="gauge" role="meter">
         <svg class="svg" part="svg" viewBox="0 0 100 60" aria-hidden="true" focusable="false">
           <path class="track" part="track" d="${arcPath()}" pathLength="${ARC_LEN}"></path>
           <path class="fill" part="fill" d="${arcPath()}" pathLength="${ARC_LEN}"></path>
           <g class="needle-group" part="needle">
             <line class="needle" x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY - R + STROKE}"></line>
           </g>
           <circle class="pivot" part="pivot" cx="${CX}" cy="${CY}" r="3.5"></circle>
         </svg>
         <div class="readout" part="readout" aria-hidden="true">
           <span class="value" part="value"></span>
           <span class="label" part="label"></span>
         </div>
       </div>`;
  return { html, css: CSS };
}
