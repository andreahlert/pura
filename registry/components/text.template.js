// Pure render for <pura-text>. No DOM; SSR/DSD + client safe.
// The element tag derives from [as]/[inline]; under EMPTY_SHIM neither is set so
// it degrades to <p part="text">. All visual variants are attribute-driven CSS.
import { EMPTY_SHIM } from "../base.js";

const TAGS = new Set(["p", "span", "div"]);

const CSS = `
  :host { display: block; }
  :host([inline]) { display: inline; }
  :host([as="span"]) { display: inline; }

  [part="text"] {
    margin: 0;
    font-family: var(--pura-font);
    font-size: var(--pura-text-base);
    font-weight: 400;
    line-height: 1.5;
    color: var(--pura-fg);
    text-align: left;
  }

  /* ---- size ---- */
  :host([size="xs"])   [part="text"] { font-size: var(--pura-text-xs); }
  :host([size="sm"])   [part="text"] { font-size: var(--pura-text-sm); }
  :host([size="base"]) [part="text"] { font-size: var(--pura-text-base); }
  :host([size="lg"])   [part="text"] { font-size: var(--pura-text-lg); }
  :host([size="xl"])   [part="text"] { font-size: var(--pura-text-xl); }

  /* ---- weight ---- */
  :host([weight="normal"])   [part="text"] { font-weight: 400; }
  :host([weight="medium"])   [part="text"] { font-weight: 500; }
  :host([weight="semibold"]) [part="text"] { font-weight: 600; }
  :host([weight="bold"])     [part="text"] { font-weight: 700; }

  /* ---- color ---- */
  :host([color="fg"])      [part="text"] { color: var(--pura-fg); }
  :host([color="muted"])   [part="text"] { color: var(--pura-muted-fg); }
  :host([color="primary"]) [part="text"] { color: var(--pura-primary); }
  :host([color="accent"])  [part="text"] { color: var(--pura-accent); }
  :host([color="success"]) [part="text"] { color: var(--pura-success-fg); }
  :host([color="danger"])  [part="text"] { color: var(--pura-danger); }

  /* ---- align ---- */
  :host([align="left"])   [part="text"] { text-align: left; }
  :host([align="center"]) [part="text"] { text-align: center; }
  :host([align="right"])  [part="text"] { text-align: right; }

  /* ---- leading (line-height) ---- */
  :host([leading="tight"])   [part="text"] { line-height: 1.25; }
  :host([leading="normal"])  [part="text"] { line-height: 1.5; }
  :host([leading="relaxed"]) [part="text"] { line-height: 1.75; }

  /* ---- truncate (single-line ellipsis) ---- */
  :host([truncate]) [part="text"] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
`;

export function textTemplate(el = EMPTY_SHIM) {
  // _tag(): explicit [as] when valid, else <span> if [inline] else <p>.
  const as = (el.getAttribute("as") || "").toLowerCase();
  const tag = TAGS.has(as) ? as : el.bool("inline") ? "span" : "p";
  const html = `<${tag} part="text"><slot></slot></${tag}>`;
  return { html, css: CSS };
}
