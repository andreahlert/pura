// <pura-text> — typographic text primitive. Renders <p> by default, <span> when
// [inline], or the tag named by [as] (p|span|div). Attributes:
//   size    xs|sm|base|lg|xl                     (default base)
//   weight  normal|medium|semibold|bold          (400/500/600/700, default normal)
//   color   fg|muted|primary|accent|success|danger (default fg)
//   align   left|center|right                    (default left)
//   leading tight|normal|relaxed                  (line-height, default normal)
//   truncate (boolean)  ellipsis on a single line
//   inline   (boolean)  render <span> instead of <p>
//   as       p|span|div   explicit tag override
// Slot: default (text content). Part: text. Theming via var(--pura-*) tokens.
import { PuraElement, define } from "../base.js";
import meta from "./text.meta.js";

const TAGS = new Set(["p", "span", "div"]);

class PuraText extends PuraElement {
  static get observedAttributes() {
    return ["inline", "as"];
  }

  connectedCallback() {
    this.render(`<${this._tag()} part="text"><slot></slot></${this._tag()}>`, CSS);
  }

  attributeChangedCallback() {
    // Re-render only after first mount; the element tag itself may change.
    if (this.isConnected) this.connectedCallback();
  }

  _tag() {
    const as = (this.getAttribute("as") || "").toLowerCase();
    if (TAGS.has(as)) return as;
    return this.bool("inline") ? "span" : "p";
  }
}

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
  :host([color="success"]) [part="text"] { color: var(--pura-success); }
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

define("pura-text", PuraText, meta);
export { PuraText };
