// <pura-box> — generic themeable container (a styled div).
// Maps layout/style attributes to CSS using --pura-* tokens.
// Attributes:
//   p / px / py   padding   — scale 0-6 (--pura-space-N) OR any CSS length
//   m / mx / my   margin    — scale 0-6 (--pura-space-N) OR any CSS length OR 'auto'
//   bg            background — bg | subtle | primary | transparent
//   color         text color — fg | muted | primary
//   border        boolean (1px) OR 'strong' (1px stronger)
//   radius        sm | md | lg | full
//   shadow        sm | md | lg | none
//   w / h         CSS length OR 'full' (100%)
//   display       any CSS display value (block | flex | inline-flex | grid | inline | none ...)
// Slots: default — container contents.
// Part: box — the container <div>.
import { PuraElement, define } from "../base.js";

// Scale 0-6 → token (0 = none). Anything else is treated as a raw CSS length.
const SPACE = {
  "0": "0",
  "1": "var(--pura-space-1)",
  "2": "var(--pura-space-2)",
  "3": "var(--pura-space-3)",
  "4": "var(--pura-space-4)",
  "5": "var(--pura-space-5)",
  "6": "var(--pura-space-6)",
};

// Resolve a spacing attribute to a CSS value: token if on the scale, else raw.
const space = (v) => (v == null ? null : SPACE[v] ?? v);

// Resolve a size attribute (w/h): 'full' → 100%, else raw CSS length.
const size = (v) => (v == null ? null : v === "full" ? "100%" : v);

class PuraBox extends PuraElement {
  static get observedAttributes() {
    return ["p", "px", "py", "m", "mx", "my", "w", "h", "display"];
  }

  connectedCallback() {
    this.render(`<div part="box"><slot></slot></div>`, CSS);
    this._sync();
  }

  attributeChangedCallback() {
    // Only re-sync once rendered (connectedCallback handles first paint).
    if (this.shadowRoot.childElementCount) this._sync();
  }

  // Reflect length-valued attributes as CSS custom props on the host, so the
  // attribute-selector CSS below can pick them up. Token-scale and enum
  // attributes (bg/color/border/radius/shadow) are handled purely in CSS.
  _sync() {
    const set = (prop, val) =>
      val == null ? this.style.removeProperty(prop) : this.style.setProperty(prop, val);

    // Padding: p is the base; px/py override axes; individual sides unset → use p.
    const p = space(this.getAttribute("p"));
    const px = space(this.getAttribute("px"));
    const py = space(this.getAttribute("py"));
    set("--_pt", py ?? p);
    set("--_pb", py ?? p);
    set("--_pl", px ?? p);
    set("--_pr", px ?? p);

    // Margin: same axis logic.
    const m = space(this.getAttribute("m"));
    const mx = space(this.getAttribute("mx"));
    const my = space(this.getAttribute("my"));
    set("--_mt", my ?? m);
    set("--_mb", my ?? m);
    set("--_ml", mx ?? m);
    set("--_mr", mx ?? m);

    set("--_w", size(this.getAttribute("w")));
    set("--_h", size(this.getAttribute("h")));
    set("--_display", this.getAttribute("display"));
  }
}

const CSS = `
  :host { display: var(--_display, block); }

  [part="box"] {
    display: inherit;
    box-sizing: border-box;
    /* spacing custom props default to 0/auto when unset */
    padding: var(--_pt, 0) var(--_pr, 0) var(--_pb, 0) var(--_pl, 0);
    margin: var(--_mt, 0) var(--_mr, 0) var(--_mb, 0) var(--_ml, 0);
    width: var(--_w, auto);
    height: var(--_h, auto);
  }

  /* ---- background ---- */
  :host([bg="bg"]) [part="box"] { background: var(--pura-bg); }
  :host([bg="subtle"]) [part="box"] { background: var(--pura-subtle); }
  :host([bg="primary"]) [part="box"] { background: var(--pura-primary); color: var(--pura-primary-fg); }
  :host([bg="transparent"]) [part="box"] { background: transparent; }

  /* ---- text color (explicit color wins over bg's implicit color) ---- */
  :host([color="fg"]) [part="box"] { color: var(--pura-fg); }
  :host([color="muted"]) [part="box"] { color: var(--pura-muted-fg); }
  :host([color="primary"]) [part="box"] { color: var(--pura-primary); }

  /* ---- border ---- */
  :host([border]) [part="box"] { border: 1px solid var(--pura-border); }
  :host([border="strong"]) [part="box"] { border-color: var(--pura-border-strong); }

  /* ---- radius ---- */
  :host([radius="sm"]) [part="box"] { border-radius: var(--pura-radius-sm); }
  :host([radius="md"]) [part="box"] { border-radius: var(--pura-radius); }
  :host([radius="lg"]) [part="box"] { border-radius: var(--pura-radius-lg); }
  :host([radius="full"]) [part="box"] { border-radius: var(--pura-radius-full); }

  /* ---- shadow ---- */
  :host([shadow="sm"]) [part="box"] { box-shadow: var(--pura-shadow-sm); }
  :host([shadow="md"]) [part="box"] { box-shadow: var(--pura-shadow); }
  :host([shadow="lg"]) [part="box"] { box-shadow: var(--pura-shadow-lg); }
  :host([shadow="none"]) [part="box"] { box-shadow: none; }
`;

define("pura-box", PuraBox);
export { PuraBox };
