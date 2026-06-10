// <pura-waves> — layered sine waves drifting along the bottom (or top) of a
// section, in the style of Aceternity's Wavy Background / React Bits' Line
// Waves / Vanta WAVES (2D). Each layer is an SVG path two viewBox widths wide,
// translated by exactly two periods in a seamless CSS @keyframes loop; layers
// differ in amplitude, baseline, speed, phase and direction for a parallax
// depth effect. Everything is deterministic per-index math in the pure
// template (no Math.random), so the server and client paint identical waves
// and the effect works with no client JS.
//
// Attributes:
//   layers    — number of wave layers (default 3, 1..5).
//   amplitude — crest height in viewBox units, viewBox is 1440x320 (default 32).
//   speed     — drift duration in seconds for the front layer; deeper layers
//               move slower for parallax (default 16).
//   lines     — boolean: thin stroked lines instead of filled shapes.
//   position  — "bottom" (default) | "top": which edge the waves hug.
//   paused    — boolean: freeze the drift (animation-play-state).
//
// Tokens: --pura-waves-color (all layers, default --pura-accent/currentColor),
//   --pura-waves-color-1..5 (per layer), --pura-waves-height (band height,
//   default 11rem), --pura-waves-line-width (lines mode, default 2px).
//
// Slots: default — content layered above the waves.
// Parts: canvas (the svg), wave (each path), content (the slot wrapper).
//
// Reduced motion: the drift animation is gated behind
//   prefers-reduced-motion: no-preference, so the waves render as a static
//   decoration at phase 0.
//
// Agent-native layer: each instance registers in window.__puraWavess keyed by
//   data-pura-id with { id, el, pause, play }; data-pura-waves-* mirror state.
import { PuraElement, define } from "../base.js";
import meta from "./waves.meta.js";
import { wavesTemplate } from "./waves.template.js";

let uid = 0;

function registry() {
  return (window.__puraWavess ||= new Map());
}

class PuraWaves extends PuraElement {
  static observedAttributes = ["layers", "amplitude", "speed", "lines"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-waves-${uid++}`;
    this.dataset.puraId = this._id;
    this._paint();
    registry().set(this._id, {
      id: this._id,
      el: this,
      pause: () => this.pause(),
      play: () => this.play(),
    });
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.isConnected || !this._id) return;
    this._paint();
  }

  // ---- public API -----------------------------------------------------------
  pause() {
    this.setAttribute("paused", "");
    this.setAttribute("data-pura-waves-state", "paused");
  }

  play() {
    this.removeAttribute("paused");
    this.setAttribute("data-pura-waves-state", "running");
  }

  // ---- internals ------------------------------------------------------------
  get layers() {
    const n = parseInt(this.getAttribute("layers"), 10);
    return Number.isFinite(n) && n > 0 ? Math.min(n, 5) : 3;
  }

  _paint() {
    const { html, css } = wavesTemplate(this);
    this.render(html, css);
    this.setAttribute("data-pura-waves-layers", String(this.layers));
    this.setAttribute("data-pura-waves-mode", this.hasAttribute("lines") ? "lines" : "fill");
    this.setAttribute(
      "data-pura-waves-state",
      this.hasAttribute("paused") ? "paused" : "running",
    );
  }
}

define("pura-waves", PuraWaves, meta);
export { PuraWaves };
