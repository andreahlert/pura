// <pura-gallery-3d> — a draggable 3D ring gallery. The slotted items (usually
// images) are arranged around a cylinder inside a perspective scene; grab and
// throw it to spin, and the release glides out with the throw's velocity (a
// CSS transition on the ring transform — no rAF loop, drag math runs only on
// pointermove events). The `auto` attribute spins the ring slowly until the
// first grab.
//
// Attributes:
//   radius      — cylinder radius in px (default: computed from item width and
//                 count so items just clear each other).
//   sensitivity — degrees per dragged px (default 0.3).
//   auto        — boolean; slow infinite spin until first grab.
//
// Tokens: --pura-g3d-perspective (default 1200px), --pura-g3d-speed (auto
//   spin lap, default 40s).
// Reduced motion: no auto spin, drag still works, release settles without
//   glide.
//
// SSR / pre-JS: items render in a flat row; the ring forms when JS measures.
//
// Agent-native layer: each instance registers in window.__puraGallery3ds by
//   data-pura-id with { count, angle, spinTo, el }.
import { PuraElement, define } from "../base.js";
import meta from "./gallery-3d.meta.js";
import { gallery3dTemplate } from "./gallery-3d.template.js";

let uid = 0;

function registry() {
  return (window.__puraGallery3ds ||= new Map());
}

class PuraGallery3d extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-gallery-3d-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = gallery3dTemplate(this);
    this.render(html, css);

    this._angle = 0;
    // layout after slotted items have dimensions
    requestAnimationFrame(() => this._layout());
    this._bind();

    registry().set(this._id, {
      id: this._id,
      count: this.children.length,
      angle: () => this._angle,
      spinTo: (deg) => this._spinTo(deg),
      el: this,
    });
  }

  disconnectedCallback() {
    this._unbind();
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get sensitivity() {
    const n = parseFloat(this.getAttribute("sensitivity"));
    return Number.isFinite(n) && n > 0 ? n : 0.3;
  }

  // ---- internals ------------------------------------------------------------
  _layout() {
    const items = [...this.children].filter((c) => !c.slot);
    const n = items.length;
    if (!n) return;

    const w = items[0].getBoundingClientRect().width || 240;
    const attr = parseFloat(this.getAttribute("radius"));
    // default: each face just clears its neighbors on the cylinder
    const radius = Number.isFinite(attr) && attr > 0
      ? attr
      : Math.round((w / 2) / Math.tan(Math.PI / n)) + 40;

    items.forEach((item, i) => {
      const deg = (360 / n) * i;
      item.style.transform = `translate(-50%, -50%) rotateY(${deg}deg) translateZ(${radius}px)`;
    });
    this.setAttribute("data-pura-g3d-ready", "");
    this.setAttribute("data-pura-g3d-count", String(n));
  }

  _bind() {
    this._onDown = (e) => this._down(e);
    this._onMove = (e) => this._drag(e);
    this._onUp = (e) => this._up(e);
    this.addEventListener("pointerdown", this._onDown);
  }
  _unbind() {
    this.removeEventListener("pointerdown", this._onDown);
    window.removeEventListener("pointermove", this._onMove);
    window.removeEventListener("pointerup", this._onUp);
  }

  _down(e) {
    this.setAttribute("data-pura-g3d-grabbed", ""); // kills auto spin for good
    this.setAttribute("data-pura-g3d-dragging", "");
    this.removeAttribute("data-pura-g3d-settle");
    this.setPointerCapture?.(e.pointerId);
    this._drag0 = { x: e.clientX, angle: this._angle, t: e.timeStamp, vx: 0 };
    window.addEventListener("pointermove", this._onMove);
    window.addEventListener("pointerup", this._onUp);
  }

  _drag(e) {
    if (!this._drag0) return;
    const dx = e.clientX - this._drag0.x;
    const next = this._drag0.angle + dx * this.sensitivity;
    // velocity in deg/ms, smoothed
    const dt = Math.max(1, e.timeStamp - this._drag0.t);
    this._drag0.vx = 0.8 * this._drag0.vx + 0.2 * ((next - this._angle) / dt);
    this._drag0.t = e.timeStamp;
    this._set(next);
  }

  _up() {
    window.removeEventListener("pointermove", this._onMove);
    window.removeEventListener("pointerup", this._onUp);
    this.removeAttribute("data-pura-g3d-dragging");
    const v = this._drag0?.vx || 0;
    this._drag0 = null;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && Math.abs(v) > 0.05) {
      // glide out with the throw: one CSS transition to the projected angle
      this._spinTo(this._angle + v * 350);
    }
  }

  _spinTo(deg) {
    this.setAttribute("data-pura-g3d-settle", "");
    requestAnimationFrame(() => this._set(deg));
  }

  _set(deg) {
    this._angle = deg;
    this.style.setProperty("--pura-g3d-angle", `${deg.toFixed(2)}deg`);
  }
}

define("pura-gallery-3d", PuraGallery3d, meta);
export { PuraGallery3d };
