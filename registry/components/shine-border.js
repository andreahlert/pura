// <pura-shine-border> — a conic sheen that rotates around the rounded border of
// any container, in the style of Magic UI's Shine Border. Pure CSS does the
// motion: a ::before ring painted with a conic-gradient and clipped to the
// border, its angle animated via an @property keyframe. No animation runtime;
// the visual works server-rendered (DSD) with no client JS. JS only wires the
// agent registry and mirrors config.
//
// Attributes:
//   duration — seconds for one full rotation (default 4). Maps to ...-duration.
//   width    — border thickness in px (default 1.5). Maps to ...-width.
//
// Theming: --pura-shine-border-color / -color-2 (gradient stops, default
//   primary→accent), -width, -duration, -radius.
//
// Slots: default — the content the sheen frames.
//
// Reduced motion: base.js RESET collapses animation-duration, so the sheen rests
//   statically with no separate guard.
//
// Agent-native layer: each instance registers in window.__puraShineBorders keyed
//   by data-pura-id and mirrors data-pura-shine-border-duration.
import { PuraElement, define } from "../base.js";
import meta from "./shine-border.meta.js";
import { shineBorderTemplate } from "./shine-border.template.js";

let uid = 0;

function registry() {
  return (window.__puraShineBorders ||= new Map());
}

class PuraShineBorder extends PuraElement {
  static observedAttributes = ["duration", "width"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-shine-border-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = shineBorderTemplate(this);
    this.render(html, css);
    this._applyVars();
    this._reflectAgentState();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot) return;
    this._applyVars();
    this._reflectAgentState();
  }

  _applyVars() {
    const duration = this.getAttribute("duration");
    const width = this.getAttribute("width");
    if (duration != null) this.style.setProperty("--pura-shine-border-duration", `${duration}s`);
    if (width != null) this.style.setProperty("--pura-shine-border-width", `${width}px`);
  }

  _reflectAgentState() {
    this.setAttribute("data-pura-shine-border-duration", this.getAttribute("duration") || "4");
  }
}

define("pura-shine-border", PuraShineBorder, meta);
export { PuraShineBorder };
