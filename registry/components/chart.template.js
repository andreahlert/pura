// Pure render(s) for <chart> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function chartTemplate(el = EMPTY_SHIM) {
  const html = `<div class="wrap">
         <svg class="chart" part="svg" preserveAspectRatio="xMidYMid meet"></svg>
         <div class="legend" part="legend"></div>
       </div>
       <slot hidden></slot>`;
  return { html, css: CHART_CSS };
}

export const CHART_CSS = `
  :host { display: block; color: var(--pura-fg); }

  .wrap { display: flex; flex-direction: column; gap: var(--pura-space-3); }

  .chart {
    display: block;
    max-width: 100%;
    height: auto;
    overflow: visible;
    font-family: var(--pura-font);
  }

  .grid {
    stroke: var(--pura-border);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }
  .baseline {
    stroke: var(--pura-border-strong);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }

  .tick { fill: var(--pura-muted); font-size: var(--pura-text-xs); }
  .empty { fill: var(--pura-muted); font-size: var(--pura-text-sm); }

  .line {
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }
  .area { stroke: none; opacity: 0.16; }
  .dot { stroke: var(--pura-bg); stroke-width: 1; }
  .bar { stroke: none; }

  /* Series palette. var() does not resolve in SVG presentation attributes,
     so map the chart tokens through CSS classes instead. */
  .series-1 { stroke: var(--pura-chart-1); fill: var(--pura-chart-1); }
  .series-2 { stroke: var(--pura-chart-2); fill: var(--pura-chart-2); }
  .series-3 { stroke: var(--pura-chart-3); fill: var(--pura-chart-3); }
  .series-4 { stroke: var(--pura-chart-4); fill: var(--pura-chart-4); }
  .series-5 { stroke: var(--pura-chart-5); fill: var(--pura-chart-5); }
  .series-6 { stroke: var(--pura-chart-6); fill: var(--pura-chart-6); }
  .series-7 { stroke: var(--pura-chart-7); fill: var(--pura-chart-7); }
  .series-8 { stroke: var(--pura-chart-8); fill: var(--pura-chart-8); }

  /* Lines must not be filled by the series fill rule. */
  .line.series-1, .line.series-2, .line.series-3, .line.series-4,
  .line.series-5, .line.series-6, .line.series-7, .line.series-8 { fill: none; }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: var(--pura-space-3);
    font-size: var(--pura-text-xs);
    color: var(--pura-muted-fg);
  }
  .legend:empty { display: none; }
  .legend-item { display: inline-flex; align-items: center; gap: var(--pura-space-2); }
  .swatch {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: var(--pura-radius-sm);
    flex: none;
  }
`;
