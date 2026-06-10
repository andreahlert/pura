// <pura-tilt> — 3D tilt on hover. The slotted content rotates toward the
// pointer in perspective (the awwwards card move): rotateX/rotateY follow the
// pointer across the surface, then spring back flat on leave. Event-driven
// (pointermove), no rAF loop; the settle is a CSS transition with a sampled
// spring `linear(...)` easing, same as <pura-magnetic>.
//
// Attributes:
//   max         — max tilt angle in degrees (default 12).
//   perspective — perspective depth in px (default 900).
//   scale       — hover scale (default 1, off; try 1.04).
//   glare       — boolean. Radial highlight follows the pointer.
//   reverse     — boolean. Tilt away from the pointer instead of toward it.
//   preset / stiffness / damping / mass — spring() easing for the settle.
//
// Reduced motion: tilt disabled entirely (transforms never engage).
// SSR: renders flat; pointer logic only binds on the client.
//
// Agent-native layer: each instance registers in window.__puraTilts by
//   data-pura-id with { max, reset, el }; data-pura-tilt-active mirrors state.
import { PuraElement, define } from "../base.js";
import meta from "./tilt.meta.js";
import { tiltTemplate } from "./tilt.template.js";
import { spring } from "./spring.js";

let uid = 0;

function registry() {
  return (window.__puraTilts ||= new Map());
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

// Pure: pointer offset (-0.5..0.5 across each axis) -> tilt angles.
export function tiltAngles(nx, ny, max, reverse) {
  const sign = reverse ? -1 : 1;
  return {
    rx: (-ny * 2 * max * sign).toFixed(2),
    ry: (nx * 2 * max * sign).toFixed(2),
  };
}

class PuraTilt extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-tilt-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = tiltTemplate(this);
    this.render(html, css);

    const p = spring({
      preset: this.getAttribute("preset"),
      stiffness: this.getAttribute("stiffness"),
      damping: this.getAttribute("damping"),
      mass: this.getAttribute("mass"),
    });
    this.style.setProperty("--pura-tilt-ease", p.easing);
    this.style.setProperty("--pura-tilt-dur", `${p.duration}ms`);

    if (!reducedMotion()) this._bind();

    registry().set(this._id, { id: this._id, max: this.max, reset: () => this._reset(), el: this });
  }

  disconnectedCallback() {
    this._unbind();
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get max() {
    const n = parseFloat(this.getAttribute("max"));
    return Number.isFinite(n) && n >= 0 ? n : 12;
  }
  get scale() {
    const n = parseFloat(this.getAttribute("scale"));
    return Number.isFinite(n) && n > 0 ? n : 1;
  }
  get reverse() {
    return this.hasAttribute("reverse");
  }

  // ---- binding --------------------------------------------------------------
  _bind() {
    this._onEnter = () => {
      this.setAttribute("data-pura-tilt-active", "");
      this.style.setProperty("--pura-tilt-scale", String(this.scale));
    };
    this._onMove = (e) => this._tilt(e);
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
  _tilt(e) {
    const r = this.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    const { rx, ry } = tiltAngles(nx, ny, this.max, this.reverse);
    this.style.setProperty("--pura-tilt-rx", `${rx}deg`);
    this.style.setProperty("--pura-tilt-ry", `${ry}deg`);
    this.style.setProperty("--pura-tilt-gx", `${((nx + 0.5) * 100).toFixed(1)}%`);
    this.style.setProperty("--pura-tilt-gy", `${((ny + 0.5) * 100).toFixed(1)}%`);
  }

  _reset() {
    this.removeAttribute("data-pura-tilt-active"); // re-enable spring transition
    this.style.setProperty("--pura-tilt-rx", "0deg");
    this.style.setProperty("--pura-tilt-ry", "0deg");
    this.style.setProperty("--pura-tilt-scale", "1");
  }
}

define("pura-tilt", PuraTilt, meta);
export { PuraTilt };
