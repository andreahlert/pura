// <pura-dot-pattern> — a dot field backdrop behind slotted content, with hexagon
// and diagonal-stripe variants, faded through a radial-gradient mask, and an
// optional brighter copy revealed through a moving radial mask = a glow that
// sweeps the field, in the style of Magic UI's Dot/Hexagon/Striped Pattern.
// Complements <pura-grid-pattern>, which only covers grid lines. Motion is pure
// CSS, so it works server-rendered (DSD) with no client JS and no animation
// runtime. JS re-renders on attribute change and wires the agent registry.
//
// Attributes:
//   variant — "dots" (default) | "hex" | "stripes".
//   gap     — tile spacing in px, 8..240 (default 24; also the hex cell width).
//   glow    — enable the sweeping glow layer.
//   fade    — "edges" (default, fades out toward the edges) | "center" | "none".
//
// Theming: --pura-dot-pattern-color, --pura-dot-pattern-size (dot radius),
//   --pura-dot-pattern-gap, --pura-dot-pattern-line (stripe width),
//   --pura-dot-pattern-opacity, --pura-dot-pattern-glow,
//   --pura-dot-pattern-glow-opacity, --pura-dot-pattern-spot (glow patch size),
//   --pura-dot-pattern-duration. Hex geometry is SVG, so its cell size follows
//   the gap attribute, not the gap token.
//
// Slots: default — content layered above the pattern.
//
// Reduced motion: the sweep is gated behind prefers-reduced-motion:
//   no-preference; under reduce the glow rests centered (base.js RESET
//   backstops by collapsing animation-duration).
//
// Agent-native layer: each instance registers in window.__puraDotPatterns keyed
//   by data-pura-id; data-pura-dot-* attributes mirror the resolved config.
import { PuraElement, define } from "../base.js";
import meta from "./dot-pattern.meta.js";
import { dotPatternTemplate } from "./dot-pattern.template.js";

let uid = 0;

function registry() {
  return (window.__puraDotPatterns ||= new Map());
}

class PuraDotPattern extends PuraElement {
  static observedAttributes = ["variant", "gap", "glow", "fade"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-dot-pattern-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, { id: this._id, el: this });
    this._paint();
  }

  disconnectedCallback() {
    const entry = registry().get(this._id);
    if (entry && entry.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._paint();
  }

  _paint() {
    const { html, css } = dotPatternTemplate(this);
    this.render(html, css);
    // Mirror resolved state for agents (validated values, not raw attributes).
    this.setAttribute("data-pura-dot-variant", this.variant);
    this.setAttribute("data-pura-dot-fade", this.fade);
    this.toggleAttribute("data-pura-dot-glow", this.hasAttribute("glow"));
  }

  // ---- config ---------------------------------------------------------------
  get variant() {
    const v = this.getAttribute("variant");
    return v === "hex" || v === "stripes" ? v : "dots";
  }

  get fade() {
    const v = this.getAttribute("fade");
    return v === "center" || v === "none" ? v : "edges";
  }
}

define("pura-dot-pattern", PuraDotPattern, meta);
export { PuraDotPattern };
