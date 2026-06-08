// Pure render for <pura-heading>. No DOM; SSR/DSD + client safe.
// `level` (1-6, default 2) selects the real <hN> tag so the document outline is
// correct even before hydration. Visual size/color/etc are host custom properties
// applied by _sync() after render, so they are not part of this static markup.
import { EMPTY_SHIM } from "../base.js";

const CSS = `
  :host { display: block; }
  [part="heading"] {
    margin: 0;
    font-size: var(--_size, var(--pura-text-xl));
    font-weight: var(--_weight, 700);
    color: var(--_color, var(--pura-fg));
    letter-spacing: var(--_tracking, -0.02em);
    text-align: var(--_align, start);
    line-height: 1.2;
    text-wrap: balance;
  }
`;

export function headingTemplate(el = EMPTY_SHIM) {
  // _level(): clamp to a valid 1-6 integer, default 2.
  const n = parseInt(el.getAttribute("level"), 10);
  const level = Number.isFinite(n) && n >= 1 && n <= 6 ? n : 2;
  const tag = `h${level}`;
  const html = `<${tag} part="heading"><slot></slot></${tag}>`;
  return { html, css: CSS };
}
