// Pure render for <pura-sparkline>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function sparklineTemplate(el = EMPTY_SHIM) {
  const html = `<svg class="chart" part="chart" role="img" preserveAspectRatio="none">
         <polygon class="area" part="area" points=""></polygon>
         <polyline class="line" part="line" points=""></polyline>
         <circle class="dot" part="dot" r="0" cx="0" cy="0"></circle>
       </svg>`;
  return { html, css: SPARKLINE_CSS };
}

export const SPARKLINE_CSS = `
  :host { display: inline-block; line-height: 0; }

  .chart {
    display: block;
    overflow: visible;
    color: var(--spark-color, var(--pura-fg));
  }

  .line {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }

  .area {
    fill: currentColor;
    opacity: 0.14;
    stroke: none;
  }

  .dot {
    fill: currentColor;
    stroke: var(--pura-bg);
    stroke-width: 1;
  }
`;
