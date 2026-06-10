// <pura-noise> — an animated film-grain overlay in the style of Magic UI's
// Noise Texture, React Bits' Noise and Aceternity's Noise Background: an SVG
// feTurbulence tile embedded as a data URI, shuffled by a steps() @keyframes
// on background-position so the grain reads as living analog film stock. The
// whole effect is CSS; no per-frame JS and no canvas. Content goes in the
// default slot and the grain layer paints above it with pointer-events: none.
//
// Attributes:
//   opacity   — grain opacity 0..1 (default 0.08).
//   size      — rendered tile size in px, smaller means finer grain (default 256).
//   frequency — feTurbulence baseFrequency 0.05..4 (default 0.8).
//   fps       — grain shuffle frames per second 1..60 (default 12).
//   blend     — mix-blend-mode of the grain layer (default "overlay").
//   static    — boolean; keep the texture but never animate.
//
// Tokens: --pura-noise-opacity, --pura-noise-size, --pura-noise-blend,
//   --pura-noise-duration (all with attribute-derived fallbacks).
// Parts: grain.
//
// SSR / pre-JS: the static grain texture paints immediately from the pure
//   template. Reduced motion: the shuffle is gated behind
//   prefers-reduced-motion: no-preference, so the grain holds still.
//
// Agent-native layer: each instance registers in window.__puraNoises keyed by
//   data-pura-id with { id, opacity, fps, static, el }; config is mirrored on
//   data-pura-noise-* attributes.
import { PuraElement, define } from "../base.js";
import meta from "./noise.meta.js";
import { noiseTemplate } from "./noise.template.js";

let uid = 0;

function registry() {
  return (window.__puraNoises ||= new Map());
}

class PuraNoise extends PuraElement {
  static observedAttributes = ["opacity", "size", "frequency", "fps", "blend", "static"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-noise-${uid++}`;
    this.dataset.puraId = this._id;
    this._paint();
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot) return;
    this._paint();
  }

  _paint() {
    const { html, css } = noiseTemplate(this);
    this.render(html, css);

    const opacity = this.opacity;
    const fps = this.fps;
    const isStatic = this.bool("static");
    this.setAttribute("data-pura-noise-opacity", String(opacity));
    this.setAttribute("data-pura-noise-fps", String(fps));
    if (isStatic) this.setAttribute("data-pura-noise-static", "");
    else this.removeAttribute("data-pura-noise-static");

    registry().set(this._id, { id: this._id, opacity, fps, static: isStatic, el: this });
  }

  // ---- config ---------------------------------------------------------------
  get opacity() {
    const n = parseFloat(this.getAttribute("opacity"));
    return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0.08;
  }

  get fps() {
    const n = parseFloat(this.getAttribute("fps"));
    return Number.isFinite(n) ? Math.min(60, Math.max(1, n)) : 12;
  }
}

define("pura-noise", PuraNoise, meta);
export { PuraNoise };
