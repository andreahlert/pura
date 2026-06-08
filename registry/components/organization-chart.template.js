// Pure render(s) for <organization-chart> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function organizationChartTemplate(el = EMPTY_SHIM) {
  const html = `<div class="scroll" part="root">
         <div class="chart"></div>
         <slot hidden></slot>
       </div>`;
  return { html, css: ORGANIZATION_CHART_CSS };
}

export const ORGANIZATION_CHART_CSS = `
  :host { display: block; color: var(--pura-fg); }

  .scroll { overflow-x: auto; padding: var(--pura-space-2); }
  .chart { display: inline-block; min-width: 100%; text-align: center; }

  ul.tree, ul.children {
    display: flex; justify-content: center; padding: 0; margin: 0;
    list-style: none; position: relative;
    padding-top: var(--pura-space-5);
  }
  ul.tree { padding-top: 0; }

  .li {
    position: relative; list-style: none;
    padding: var(--pura-space-5) var(--pura-space-3) 0;
    display: flex; flex-direction: column; align-items: center;
  }
  ul.tree > .li { padding-top: 0; }

  /* connectors: vertical line up from each child, plus a horizontal bar */
  .li::before, .li::after {
    content: ""; position: absolute; top: 0;
    width: 50%; height: var(--pura-space-5);
    border-top: 1px solid var(--pura-border-strong);
  }
  .li::before { left: 0; border-right: 1px solid var(--pura-border-strong); }
  .li::after { right: 0; }
  /* single child or first/last trims to avoid overhang */
  .li:first-child::before, .li:last-child::after { border-top: 0; }
  .li:last-child::before { border-right: 1px solid var(--pura-border-strong); }
  .li:only-child::after, .li:only-child::before {
    border-right: 0; border-top: 0;
  }
  /* the stem dropping from a parent down to the children bar */
  ul.children::before {
    content: ""; position: absolute; top: 0; left: 50%;
    width: 0; height: var(--pura-space-5);
    border-left: 1px solid var(--pura-border-strong);
  }
  /* stem rising from each child box up to the connector bar */
  .li > .node::before {
    content: ""; position: absolute; bottom: 100%; left: 50%;
    width: 0; height: var(--pura-space-5);
    border-left: 1px solid var(--pura-border-strong);
  }
  ul.tree > .li > .node::before { display: none; }

  .node {
    position: relative; display: inline-flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-2) var(--pura-space-4);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
    font-size: var(--pura-text-sm); font-weight: 550; white-space: nowrap;
    cursor: pointer; outline: none;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .node:hover { border-color: var(--pura-border-strong); box-shadow: var(--pura-shadow); }
  .node:focus-visible { border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring); }

  .toggle {
    display: inline-grid; place-items: center;
    width: 1rem; height: 1rem; flex: none;
    border-radius: var(--pura-radius-full);
    background: var(--pura-subtle); color: var(--pura-muted-fg);
    font-size: var(--pura-text-xs); line-height: 1; font-weight: 700;
  }
`;
