// <pura-heading> — semantic heading primitive. Renders a real <h1>..<h6> in the
// shadow (driven by `level`) so document outline stays correct, while visual
// size is independent and themeable.
// Attributes:
//   level    1–6 (default 2) → real <h1>..<h6> tag for semantics
//   size     xs | sm | md | lg | xl | 2xl | 3xl — overrides the level's visual size
//   weight   400 | 500 | 600 | 700 | 800 (default 700)
//   color    fg (default) | muted | primary | accent | success | danger
//   align    start (default) | center | end | justify
//   tracking tight (default) | normal | wide
// Slot: default — the heading text.
// Part: heading — the rendered <hN> element.
import { PuraElement, define } from "../base.js";
import meta from "./heading.meta.js";

// Visual size scale, all traceable to --pura-text-* tokens (top end via calc).
const SIZES = {
  xs: "var(--pura-text-xs)",
  sm: "var(--pura-text-sm)",
  md: "var(--pura-text-base)",
  lg: "var(--pura-text-lg)",
  xl: "var(--pura-text-xl)",
  "2xl": "calc(var(--pura-text-xl) * 1.33)",
  "3xl": "calc(var(--pura-text-xl) * 1.66)",
};

// Default visual size per heading level when no `size` is given.
const LEVEL_SIZE = { 1: "3xl", 2: "2xl", 3: "xl", 4: "lg", 5: "md", 6: "sm" };

const COLORS = {
  fg: "var(--pura-fg)",
  muted: "var(--pura-muted-fg)",
  primary: "var(--pura-primary)",
  accent: "var(--pura-accent)",
  success: "var(--pura-success-fg)",
  danger: "var(--pura-danger)",
};

const TRACKING = { tight: "-0.02em", normal: "0", wide: "0.02em" };

class PuraHeading extends PuraElement {
  static observedAttributes = ["level", "size", "weight", "color", "align", "tracking"];

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name) {
    // `level` swaps the actual tag, so a full re-render is needed; everything
    // else only updates host custom properties.
    if (!this.shadowRoot) return;
    if (name === "level") this._render();
    else this._sync();
  }

  // Clamp `level` to a valid 1–6 integer, default 2.
  _level() {
    const n = parseInt(this.getAttribute("level"), 10);
    return Number.isFinite(n) && n >= 1 && n <= 6 ? n : 2;
  }

  _render() {
    const tag = `h${this._level()}`;
    this.render(`<${tag} part="heading"><slot></slot></${tag}>`, CSS);
    this._sync();
  }

  // Read attributes → set custom properties on the host. Keeps live edits and
  // the inspector reflecting without re-rendering markup.
  _sync() {
    const size = SIZES[this.getAttribute("size")] || SIZES[LEVEL_SIZE[this._level()]];
    const color = COLORS[this.getAttribute("color")] || COLORS.fg;
    const tracking = TRACKING[this.getAttribute("tracking")] || TRACKING.tight;
    const weight = this.getAttribute("weight") || "700";
    const align = this.getAttribute("align") || "start";

    const s = this.style;
    s.setProperty("--_size", size);
    s.setProperty("--_color", color);
    s.setProperty("--_tracking", tracking);
    s.setProperty("--_weight", weight);
    s.setProperty("--_align", align);
  }
}

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

define("pura-heading", PuraHeading, meta);
export { PuraHeading };
