// <pura-border-beam> — a comet of light that travels the rounded border of any
// container, in the style of Magic UI's Border Beam. Pure CSS does the motion:
// the beam is a ::after pseudo-element following `offset-path: border-box`, so
// there is no animation runtime. JS only wires the agent registry and mirrors
// config; the visual works server-rendered (DSD) with no client JS at all.
//
// Attributes:
//   size       — beam length in px (default 64). Maps to --pura-border-beam-size.
//   duration   — seconds for one full lap (default 5). Maps to ...-duration.
//   delay      — seconds before the beam starts (default 0). Maps to ...-delay.
//
// Theming: --pura-border-beam-from / -to (gradient stops, default primary→accent),
//   -size, -duration, -delay, -opacity, -radius, -offset.
//
// Slots: default — the content the beam frames.
//
// Reduced motion: base.js RESET collapses animation-duration, so the beam rests
//   statically with no separate guard.
//
// Agent-native layer: each instance registers in window.__puraBorderBeams keyed
//   by data-pura-id and mirrors data-pura-border-beam-duration, so an agent can
//   enumerate and read beams without DOM diving.
import { PuraElement, define } from "../base.js";
import meta from "./border-beam.meta.js";
import { borderBeamTemplate } from "./border-beam.template.js";

let uid = 0;

function registry() {
  return (window.__puraBorderBeams ||= new Map());
}

class PuraBorderBeam extends PuraElement {
  static observedAttributes = ["size", "duration", "delay"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-border-beam-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = borderBeamTemplate(this);
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

  // Map the convenience attributes onto the CSS custom properties the template
  // reads, so authors can write size/duration/delay without touching style.
  _applyVars() {
    const size = this.getAttribute("size");
    const duration = this.getAttribute("duration");
    const delay = this.getAttribute("delay");
    if (size != null) this.style.setProperty("--pura-border-beam-size", `${size}px`);
    if (duration != null) this.style.setProperty("--pura-border-beam-duration", `${duration}s`);
    if (delay != null) this.style.setProperty("--pura-border-beam-delay", `${delay}s`);
  }

  _reflectAgentState() {
    this.setAttribute(
      "data-pura-border-beam-duration",
      this.getAttribute("duration") || "5"
    );
  }
}

define("pura-border-beam", PuraBorderBeam, meta);
export { PuraBorderBeam };
