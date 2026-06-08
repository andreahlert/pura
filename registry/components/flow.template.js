// Pure render(s) for <flow> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function flowTemplate(el = EMPTY_SHIM) {
  const html = `<div part="canvas" class="canvas">
         <svg part="edges" class="edges" aria-hidden="true"></svg>
         <slot></slot>
       </div>`;
  return { html, css: FLOW_CSS };
}

export function flowEdgeTemplate(el = EMPTY_SHIM) {
  const html = `<slot></slot>`;
  return { html, css: `:host { display: none; }` };
}

export const FLOW_CSS = `
  :host { display: block; }
  .canvas {
    position: relative; overflow: hidden;
    background: var(--pura-bg);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-lg);
    background-image: radial-gradient(var(--pura-border) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  .edges {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; overflow: visible;
  }
  .edge {
    fill: none; stroke: var(--pura-border-strong); stroke-width: 2;
  }
  ::slotted(pura-flow-node) {
    position: absolute; z-index: 1;
  }
`;
