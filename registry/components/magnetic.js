// <pura-magnetic> — Draggable + Inertia. Makes slotted content magnetic: in the
// default "lean" mode it leans toward the pointer as it nears, then springs back
// to rest on leave (the awwwards magnetic-button move). In "drag" mode the content
// follows the pointer 1:1 while held and springs back to origin on release with a
// flick-momentum bounce. Both settles use the native spring primitive
// (<pura-spring>): the return is a CSS transition with a sampled `linear(...)`
// timing function, no rAF loop.
//
// Attributes:
//   mode     — "lean" (default) | "drag".
//   strength — 0..1 lean fraction toward the pointer (default 0.4).
//   radius   — px activation distance around the element for lean (default 120).
//   preset / stiffness / damping / mass — forwarded to spring() for the settle.
//
// Parts: content — the transformed wrapper.
// Reduced motion: base.js collapses the transition, so the element simply tracks
//   without an easing tail.
//
// Agent-native layer: each instance registers in window.__puraMagnetics by
//   data-pura-id with { mode, reset, el }; data-pura-mag-mode mirrors the mode.
import { PuraElement, define } from "../base.js";
import meta from "./magnetic.meta.js";
import { magneticTemplate } from "./magnetic.template.js";
import { spring } from "./spring.js";

let uid = 0;

function registry() {
  return (window.__puraMagnetics ||= new Map());
}

// Pure: clamp the lean offset so it never exceeds `max` px in either axis.
export function leanOffset(dx, dy, strength, max) {
  const s = Math.min(1, Math.max(0, strength));
  return { x: clamp(dx * s, max), y: clamp(dy * s, max) };
}
function clamp(v, max) {
  return Math.max(-max, Math.min(max, v));
}

class PuraMagnetic extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-magnetic-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = magneticTemplate(this);
    this.render(html, css);

    const p = spring({
      preset: this.getAttribute("preset"),
      stiffness: this.getAttribute("stiffness"),
      damping: this.getAttribute("damping"),
      mass: this.getAttribute("mass"),
    });
    this.style.setProperty("--pura-mag-ease", p.easing);
    this.style.setProperty("--pura-mag-dur", `${p.duration}ms`);

    this._bind();
    this.setAttribute("data-pura-mag-mode", this.mode);
    registry().set(this._id, { id: this._id, mode: this.mode, reset: () => this._reset(), el: this });
  }

  disconnectedCallback() {
    this._unbind();
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get mode() {
    return this.getAttribute("mode") === "drag" ? "drag" : "lean";
  }
  get strength() {
    const n = parseFloat(this.getAttribute("strength"));
    return Number.isFinite(n) ? n : 0.4;
  }
  get radius() {
    const n = parseFloat(this.getAttribute("radius"));
    return Number.isFinite(n) && n > 0 ? n : 120;
  }

  // ---- binding --------------------------------------------------------------
  _bind() {
    if (this.mode === "drag") {
      this._onDown = (e) => this._dragStart(e);
      this._onMove = (e) => this._dragMove(e);
      this._onUp = () => this._dragEnd();
      this.addEventListener("pointerdown", this._onDown);
    } else {
      this._onEnter = () => { window.addEventListener("pointermove", this._onLean); };
      this._onLean = (e) => this._lean(e);
      this._onLeave = () => { window.removeEventListener("pointermove", this._onLean); this._reset(); };
      this.addEventListener("pointerenter", this._onEnter);
      this.addEventListener("pointerleave", this._onLeave);
    }
  }
  _unbind() {
    this.removeEventListener("pointerdown", this._onDown);
    this.removeEventListener("pointerenter", this._onEnter);
    this.removeEventListener("pointerleave", this._onLeave);
    window.removeEventListener("pointermove", this._onLean);
    window.removeEventListener("pointermove", this._onMove);
    window.removeEventListener("pointerup", this._onUp);
  }

  // ---- lean -----------------------------------------------------------------
  _lean(e) {
    const r = this.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    if (Math.hypot(dx, dy) > this.radius) { this._reset(); return; }
    const { x, y } = leanOffset(dx, dy, this.strength, Math.max(r.width, r.height));
    this._set(x, y);
  }

  // ---- drag -----------------------------------------------------------------
  _dragStart(e) {
    this.setAttribute("data-pura-mag-drag", "");
    this.setPointerCapture?.(e.pointerId);
    const t = this._transform();
    this._origin = { px: e.clientX, py: e.clientY, ox: t.x, oy: t.y };
    window.addEventListener("pointermove", this._onMove);
    window.addEventListener("pointerup", this._onUp);
  }
  _dragMove(e) {
    if (!this._origin) return;
    this._set(this._origin.ox + (e.clientX - this._origin.px), this._origin.oy + (e.clientY - this._origin.py));
  }
  _dragEnd() {
    this.removeAttribute("data-pura-mag-drag"); // re-enable spring transition
    window.removeEventListener("pointermove", this._onMove);
    window.removeEventListener("pointerup", this._onUp);
    this._origin = null;
    this._reset(); // springs back to origin with the configured overshoot
  }

  // ---- helpers --------------------------------------------------------------
  _set(x, y) {
    this.style.setProperty("--pura-mag-x", `${x}px`);
    this.style.setProperty("--pura-mag-y", `${y}px`);
  }
  _reset() {
    this._set(0, 0);
  }
  _transform() {
    return {
      x: parseFloat(this.style.getPropertyValue("--pura-mag-x")) || 0,
      y: parseFloat(this.style.getPropertyValue("--pura-mag-y")) || 0,
    };
  }
}

define("pura-magnetic", PuraMagnetic, meta);
export { PuraMagnetic };
