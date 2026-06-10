// <pura-holo-card> — a holographic foil card in the style of a trading card:
// an iridescent rainbow sheen and a soft glare slide across the surface as the
// pointer moves, optionally combined with a light 3D tilt. Unlike
// <pura-magic-card> (gradient border + spotlight), the whole face shimmers via
// blended gradient overlays whose background-position is steered by CSS vars.
//
// Attributes:
//   intensity — foil strength 0..1 (default 0.75).
//   angle     — base angle of the foil stripes in degrees (default 115).
//   tilt      — max tilt angle in degrees; bare attribute means 6, absent
//               means no tilt (compose with <pura-tilt> for spring physics).
//   sparkle   — boolean. Adds a glittery dot layer over the foil.
//
// Tokens: --pura-holo-card-radius (default 16px), --pura-holo-card-bg
//   (default --pura-surface), plus the pointer vars --pura-holo-mx/-my and
//   tilt vars --pura-holo-rx/-ry the element drives at runtime.
//
// Reduced motion: pointer tracking and tilt never bind; the card keeps the
//   pretty resting sheen the server painted (centred foil, no glare).
// SSR / pre-JS: same resting paint via the pure template, so the page looks
//   finished without JS.
//
// Agent-native layer: each instance registers in window.__puraHoloCards by
//   data-pura-id with { intensity, tilt, reset, el }; config and hover state
//   are mirrored in data-pura-holo-* attributes.
import { PuraElement, define } from "../base.js";
import meta from "./holo-card.meta.js";
import { holoCardTemplate } from "./holo-card.template.js";

let uid = 0;

function registry() {
  return (window.__puraHoloCards ||= new Map());
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

class PuraHoloCard extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-holo-card-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = holoCardTemplate(this);
    this.render(html, css);

    this.setAttribute("data-pura-holo-intensity", String(this.intensity));
    this.setAttribute("data-pura-holo-tilt", String(this.tilt));

    if (!reducedMotion()) this._bind();

    registry().set(this._id, {
      id: this._id,
      intensity: this.intensity,
      tilt: this.tilt,
      reset: () => this._reset(),
      el: this,
    });
  }

  disconnectedCallback() {
    this._unbind();
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get intensity() {
    const n = parseFloat(this.getAttribute("intensity"));
    return Number.isFinite(n) && n >= 0 && n <= 1 ? n : 0.75;
  }
  get tilt() {
    if (!this.hasAttribute("tilt")) return 0;
    const n = parseFloat(this.getAttribute("tilt"));
    return Number.isFinite(n) && n >= 0 ? n : 6;
  }

  // ---- binding --------------------------------------------------------------
  _bind() {
    this._onEnter = () => this.setAttribute("data-pura-holo-active", "");
    this._onMove = (e) => this._track(e);
    this._onLeave = () => this._reset();
    this.addEventListener("pointerenter", this._onEnter);
    this.addEventListener("pointermove", this._onMove);
    this.addEventListener("pointerleave", this._onLeave);
  }
  _unbind() {
    this.removeEventListener("pointerenter", this._onEnter);
    this.removeEventListener("pointermove", this._onMove);
    this.removeEventListener("pointerleave", this._onLeave);
  }

  // ---- internals ------------------------------------------------------------
  _track(e) {
    const r = this.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const ny = (e.clientY - r.top) / r.height - 0.5;
    this.style.setProperty("--pura-holo-mx", `${((nx + 0.5) * 100).toFixed(1)}%`);
    this.style.setProperty("--pura-holo-my", `${((ny + 0.5) * 100).toFixed(1)}%`);
    const max = this.tilt;
    if (max > 0) {
      this.style.setProperty("--pura-holo-rx", `${(-ny * 2 * max).toFixed(2)}deg`);
      this.style.setProperty("--pura-holo-ry", `${(nx * 2 * max).toFixed(2)}deg`);
    }
  }

  _reset() {
    this.removeAttribute("data-pura-holo-active"); // re-enable the settle transition
    this.style.setProperty("--pura-holo-mx", "50%");
    this.style.setProperty("--pura-holo-my", "50%");
    this.style.setProperty("--pura-holo-rx", "0deg");
    this.style.setProperty("--pura-holo-ry", "0deg");
  }
}

define("pura-holo-card", PuraHoloCard, meta);
export { PuraHoloCard };
