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
import meta from "./box.meta.js";
import { boxTemplate } from "./box.template.js";

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
    const { html, css } = boxTemplate(this);
    this.render(html, css);
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


define("pura-box", PuraBox, meta);
export { PuraBox };
