// Pure render(s) for <pricing-table> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function pricingTableTemplate(el = EMPTY_SHIM) {
  const html = `<div part="grid" class="grid"><slot></slot></div>`;
  return { html, css: PRICING_TABLE_CSS };
}

export const PRICING_TABLE_CSS = `
  :host { display: block; }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--pura-pricing-min, 15rem), 1fr));
    gap: var(--pura-space-4);
    align-items: stretch;
  }
`;
