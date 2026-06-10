// <pura-mesh-gradient>: an animated mesh-gradient background. Large blurred
// radial-gradient color blobs drift and blend slowly behind the slotted
// content, the full-bleed multicolor SaaS-hero backdrop (unlike <pura-aurora>,
// which is a northern-lights glow at the top edge). Blobs are deterministically
// scattered in the pure template (no Math.random), so server and client paint
// the same mesh and the static paint already looks finished without JS. Motion
// is pure CSS @keyframes with prime durations per layer so the composite
// pattern never visibly repeats.
//
// Attributes:
//   blobs  number of color blobs, 2 to 8 (default 5).
//   speed  drift speed multiplier, > 0 (default 1).
//   static boolean; freezes the mesh at its painted state.
//
// Tokens: --pura-mesh-gradient-1..5 (blob colors), --pura-mesh-gradient-blur
//   (default 64px), --pura-mesh-gradient-opacity (default 0.8),
//   --pura-mesh-gradient-bg (base background behind the blobs).
//
// Slots: default, the content layered above the gradient field.
//
// Reduced motion: the drift animation is gated behind
//   @media (prefers-reduced-motion: no-preference); under reduce the static
//   mesh is the final state (base.js RESET collapses durations as a backup).
//
// Agent-native layer: each instance registers in window.__puraMeshGradients
//   keyed by data-pura-id and mirrors data-pura-mesh-blobs,
//   data-pura-mesh-speed and data-pura-mesh-static.
import { PuraElement, define } from "../base.js";
import meta from "./mesh-gradient.meta.js";
import { meshGradientTemplate } from "./mesh-gradient.template.js";

let uid = 0;

function registry() {
  return (window.__puraMeshGradients ||= new Map());
}

class PuraMeshGradient extends PuraElement {
  static observedAttributes = ["blobs", "speed", "static"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-mesh-gradient-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);
    this._paint();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot || !this.isConnected) return;
    this._paint();
  }

  _paint() {
    const { html, css } = meshGradientTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-mesh-blobs", String(this.blobs));
    this.setAttribute("data-pura-mesh-speed", String(this.speed));
    this.toggleAttribute("data-pura-mesh-static", this.hasAttribute("static"));
  }

  // ---- config ---------------------------------------------------------------
  get blobs() {
    const n = parseInt(this.getAttribute("blobs"), 10);
    return Number.isFinite(n) ? Math.min(Math.max(n, 2), 8) : 5;
  }

  get speed() {
    const n = parseFloat(this.getAttribute("speed"));
    return Number.isFinite(n) && n > 0 ? n : 1;
  }
}

define("pura-mesh-gradient", PuraMeshGradient, meta);
export { PuraMeshGradient };
