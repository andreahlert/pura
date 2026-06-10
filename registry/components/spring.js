// <pura-spring> — the spring PRIMITIVE the rest of pura's motion is built on.
// A damped harmonic oscillator is sampled once at definition time and serialized
// into a CSS `linear(...)` easing string. The result is a native, zero-runtime
// spring: real overshoot and settle with no per-frame JS, no rAF loop, no library.
// The element itself is a tiny poke-able demo (a token that springs along a rail),
// but the value is the exported pure math: split, magnetic, tilt, scatter and the
// other motion components import `spring()` from here instead of reinventing it.
//
// spring(opts) -> { easing, duration, stiffness, damping, mass, w0, zeta }
//   opts: { stiffness, damping, mass } or { preset } (gentle | wobbly | stiff |
//   slow | snappy | default). duration is ms; easing is a CSS `linear(...)`
//   string you drop straight into `transition`/`animation` timing.
//
// Attributes (demo): stiffness, damping, mass, preset, travel (px). Clicking the
//   stage toggles the token between rest and end, animated by the sampled spring.
//
// Agent-native layer: each instance registers in window.__puraSprings by
//   data-pura-id with { profile, poke, el }; data-pura-spring-* mirror the
//   resolved easing/duration so an agent can read the curve without DOM.
import { PuraElement, define } from "../base.js";
import meta from "./spring.meta.js";
import { springTemplate } from "./spring.template.js";

// ---- pure spring math (DOM-free, SSR-safe, unit-tested) --------------------

// Named spring profiles, mirroring the vocabulary motion designers expect.
export const SPRING_PRESETS = {
  default: { stiffness: 170, damping: 26, mass: 1 },
  gentle:  { stiffness: 120, damping: 14, mass: 1 },
  wobbly:  { stiffness: 180, damping: 12, mass: 1 },
  stiff:   { stiffness: 210, damping: 20, mass: 1 },
  slow:    { stiffness: 280, damping: 60, mass: 1 },
  snappy:  { stiffness: 400, damping: 28, mass: 1 },
};

// Displacement of a unit step response at time t (seconds), normalized 0 -> 1.
// Underdamped overshoots past 1; critically/overdamped approach without crossing.
export function springValueAt(t, w0, zeta) {
  if (t <= 0) return 0;
  const decay = Math.exp(-zeta * w0 * t);
  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    return 1 - decay * (Math.cos(wd * t) + (zeta * w0 / wd) * Math.sin(wd * t));
  }
  if (zeta === 1) {
    return 1 - decay * (1 + w0 * t);
  }
  const wd = w0 * Math.sqrt(zeta * zeta - 1);
  return 1 - decay * (Math.cosh(wd * t) + (zeta * w0 / wd) * Math.sinh(wd * t));
}

// Sample a spring into a CSS linear() easing + duration (ms). The duration is the
// settle time: the last moment the value is more than `rest` from 1, plus a
// margin, clamped to a sane window. Points are emitted evenly; CSS infers spacing.
export function spring(opts = {}) {
  const base = opts.preset && SPRING_PRESETS[opts.preset]
    ? SPRING_PRESETS[opts.preset]
    : SPRING_PRESETS.default;
  const stiffness = num(opts.stiffness, base.stiffness);
  const damping = num(opts.damping, base.damping);
  const mass = Math.max(0.01, num(opts.mass, base.mass));
  const rest = Math.max(1e-4, num(opts.rest, 0.0015));

  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));

  // Find settle time by scanning a fine grid until the tail stays within rest.
  const dt = 1 / 240;
  const maxT = 6;
  let settle = dt;
  for (let t = dt; t <= maxT; t += dt) {
    if (Math.abs(springValueAt(t, w0, zeta) - 1) > rest) settle = t;
  }
  const duration = Math.min(6000, Math.max(60, Math.round((settle + dt) * 1000)));

  // Sample ~16 points per 100ms, capped, so overshoot is captured smoothly.
  const steps = Math.min(120, Math.max(24, Math.round(duration / 1000 * 60)));
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * (duration / 1000);
    const v = i === steps ? 1 : springValueAt(t, w0, zeta);
    pts.push(round(v));
  }
  pts[0] = 0;
  const easing = `linear(${pts.join(", ")})`;
  return { easing, duration, stiffness, damping, mass, w0, zeta };
}

function num(v, fallback) {
  if (v == null || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function round(v) {
  return Math.round(v * 10000) / 10000;
}

// ---- element ----------------------------------------------------------------

let uid = 0;

function registry() {
  return (window.__puraSprings ||= new Map());
}

class PuraSpring extends PuraElement {
  static observedAttributes = ["stiffness", "damping", "mass", "preset", "travel"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-spring-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = springTemplate(this);
    this.render(html, css);

    this._stage = this.$(".stage");
    this._on = 0;
    this._onClick = () => this.poke();
    this._stage.addEventListener("click", this._onClick);

    this._sync();
  }

  disconnectedCallback() {
    this._stage?.removeEventListener("click", this._onClick);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this.isConnected) this._sync();
  }

  // ---- public API -----------------------------------------------------------

  // The sampled spring for the current attributes.
  get profile() {
    return spring({
      stiffness: this.getAttribute("stiffness"),
      damping: this.getAttribute("damping"),
      mass: this.getAttribute("mass"),
      preset: this.getAttribute("preset"),
    });
  }

  // Toggle the demo token between rest and end, animated by the spring.
  poke() {
    this._on = this._on ? 0 : 1;
    this.style.setProperty("--pura-spring-on", String(this._on));
  }

  // ---- internals ------------------------------------------------------------

  _sync() {
    const p = this.profile;
    this.style.setProperty("--pura-spring-ease", p.easing);
    this.style.setProperty("--pura-spring-dur", `${p.duration}ms`);
    const travel = parseFloat(this.getAttribute("travel"));
    if (Number.isFinite(travel)) {
      this.style.setProperty("--pura-spring-travel", `${travel}px`);
    }

    this.setAttribute("data-pura-spring-duration", String(p.duration));
    this.setAttribute("data-pura-spring-zeta", String(round(p.zeta)));

    registry().set(this._id, {
      id: this._id,
      profile: p,
      poke: () => this.poke(),
      el: this,
    });
  }
}

define("pura-spring", PuraSpring, meta);
export { PuraSpring };
