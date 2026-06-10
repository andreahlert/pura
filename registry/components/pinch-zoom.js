// <pura-pinch-zoom> — touch media viewer: pinch with two pointers to zoom,
// drag to pan while zoomed in, double tap (or double click) to toggle between
// fit and a closer scale. Multi-touch is plain Pointer Events math: scale is
// driven by the distance between two pointers, applied as a clamped
// translate() + scale() on the stage so the content never leaves the frame.
// Trackpads zoom with ctrl+wheel (the browser's pinch equivalent) and the
// keyboard works too (+ / - to zoom, arrows to pan, 0 to reset). Plain
// vertical swipes at rest keep scrolling the page (touch-action: pan-y);
// once zoomed the frame takes over (touch-action: none).
//
// Attributes:
//   min              — minimum scale (default 1).
//   max              — maximum scale (default 4).
//   double-tap-scale — scale a double tap zooms to (default 2.5, capped at max).
//   disabled         — turns all zoom and pan gestures off.
//
// Events:
//   zoom — fired when a gesture or API call settles on a new scale
//          (bubbles, composed, detail: { scale }).
//
// Tokens: --pura-pinch-zoom-radius (frame corner radius, default 0),
//   --pura-pinch-zoom-bg (frame background, default transparent),
//   --pura-pinch-zoom-duration (programmatic zoom transition, default 300ms).
// SSR / pre-JS: the media renders normally at scale 1. Reduced motion:
//   gestures still track the pointers 1:1 (input-driven, not an animation);
//   programmatic zooms (double tap, keyboard, API) snap instead of easing.
//
// Agent-native layer: each instance registers in window.__puraPinchZooms by
//   data-pura-id with { min, max, zoomTo, reset, el }; data-pura-pz-scale and
//   data-pura-pz-zoomed mirror the live state.
import { PuraElement, define } from "../base.js";
import meta from "./pinch-zoom.meta.js";
import { pinchZoomTemplate } from "./pinch-zoom.template.js";

let uid = 0;

function registry() {
  return (window.__puraPinchZooms ||= new Map());
}

class PuraPinchZoom extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-pinch-zoom-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = pinchZoomTemplate(this);
    this.render(html, css);

    this._frame = this.$(".frame");
    this._stage = this.$(".stage");
    this._frame.setAttribute("tabindex", "0");

    this._pointers = new Map();
    this._scale = this._clampScale(1);
    this._tx = 0;
    this._ty = 0;
    this._emitted = this._scale;
    this._start = null;
    this._down = null;
    this._lastTap = null;

    this._onDown = (e) => this._pointerDown(e);
    this._onMove = (e) => this._pointerMove(e);
    this._onUp = (e) => this._pointerUp(e, false);
    this._onCancel = (e) => this._pointerUp(e, true);
    this._onWheel = (e) => this._wheel(e);
    this._onKey = (e) => this._key(e);
    this._onDrag = (e) => e.preventDefault();

    this._frame.addEventListener("pointerdown", this._onDown);
    this._frame.addEventListener("pointermove", this._onMove);
    this._frame.addEventListener("pointerup", this._onUp);
    this._frame.addEventListener("pointercancel", this._onCancel);
    this._frame.addEventListener("wheel", this._onWheel, { passive: false });
    this._frame.addEventListener("keydown", this._onKey);
    this.addEventListener("dragstart", this._onDrag);

    this._apply();
    registry().set(this._id, {
      id: this._id,
      min: this.min,
      max: this.max,
      zoomTo: (s, x, y) => this.zoomTo(s, x, y),
      reset: () => this.reset(),
      el: this,
    });
  }

  disconnectedCallback() {
    this.removeEventListener("dragstart", this._onDrag);
    clearTimeout(this._animT);
    clearTimeout(this._wheelT);
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get min() {
    const n = parseFloat(this.getAttribute("min"));
    return Number.isFinite(n) && n > 0 ? n : 1;
  }
  get max() {
    const n = parseFloat(this.getAttribute("max"));
    return Number.isFinite(n) && n > this.min ? n : Math.max(4, this.min);
  }
  get doubleTapScale() {
    const n = parseFloat(this.getAttribute("double-tap-scale"));
    return Number.isFinite(n) && n > 0 ? n : 2.5;
  }
  get scale() {
    return this._scale;
  }

  // ---- public API -----------------------------------------------------------
  // x/y are optional pixel coordinates inside the frame (defaults to center).
  zoomTo(scale, x, y) {
    const r = this._frame.getBoundingClientRect();
    this._zoomAt(
      this._clampScale(scale),
      (x == null ? r.width / 2 : x) - r.width / 2,
      (y == null ? r.height / 2 : y) - r.height / 2,
    );
    this._animate();
    this._settle();
  }

  reset() {
    this._scale = this.min;
    this._tx = 0;
    this._ty = 0;
    this._animate();
    this._settle();
  }

  // ---- gestures ---------------------------------------------------------------
  _pointerDown(e) {
    if (this.bool("disabled")) return;
    e.preventDefault();
    try {
      this._frame.setPointerCapture(e.pointerId);
    } catch {
      /* capture is best-effort */
    }
    this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    this._down = this._pointers.size === 1
      ? { x: e.clientX, y: e.clientY, t: Date.now() }
      : null;
    if (this._pointers.size <= 2) this._baseline();
  }

  _pointerMove(e) {
    if (!this._pointers.has(e.pointerId)) return;
    this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const s = this._start;
    if (!s) return;
    const pts = [...this._pointers.values()].slice(0, 2);
    if (pts.length === 2) {
      // pinch: scale follows the distance between the two pointers, anchored
      // on the (moving) midpoint so the content tracks both fingers.
      const d = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      const next = this._clampScale(s.dist > 0 ? s.scale * (d / s.dist) : s.scale);
      const mx = (pts[0].x + pts[1].x) / 2 - s.ox;
      const my = (pts[0].y + pts[1].y) / 2 - s.oy;
      const k = next / s.scale;
      this._scale = next;
      this._tx = mx - (s.cx - s.tx) * k;
      this._ty = my - (s.cy - s.ty) * k;
    } else if (this._scale > this.min + 0.001) {
      // one-finger pan while zoomed
      this._tx = s.tx + (pts[0].x - s.ox - s.cx);
      this._ty = s.ty + (pts[0].y - s.oy - s.cy);
    } else {
      return;
    }
    if (this._down && Math.hypot(e.clientX - this._down.x, e.clientY - this._down.y) > 8) {
      this._down = null; // moved too far to still count as a tap
    }
    this._clampPan();
    this._apply();
  }

  _pointerUp(e, cancelled) {
    if (!this._pointers.has(e.pointerId)) return;
    this._pointers.delete(e.pointerId);
    try {
      this._frame.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    if (this._pointers.size > 0) {
      this._baseline(); // pinch -> pan handoff: re-anchor on the survivor
      return;
    }
    this._start = null;
    if (!cancelled) this._tap(e);
    this._settle();
  }

  // Snapshot the gesture origin: scale/translate plus pointer midpoint and
  // distance, all relative to the frame center (the transform origin).
  _baseline() {
    const r = this._frame.getBoundingClientRect();
    const ox = r.left + r.width / 2;
    const oy = r.top + r.height / 2;
    const pts = [...this._pointers.values()].slice(0, 2);
    const mx = pts.reduce((a, p) => a + p.x, 0) / pts.length;
    const my = pts.reduce((a, p) => a + p.y, 0) / pts.length;
    this._start = {
      scale: this._scale,
      tx: this._tx,
      ty: this._ty,
      dist: pts.length > 1 ? Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y) : 0,
      cx: mx - ox,
      cy: my - oy,
      ox,
      oy,
    };
  }

  _tap(e) {
    const now = Date.now();
    const down = this._down;
    this._down = null;
    if (!down || now - down.t > 350) {
      this._lastTap = null;
      return;
    }
    const last = this._lastTap;
    if (last && now - last.t < 300 && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 24) {
      this._lastTap = null;
      const r = this._frame.getBoundingClientRect();
      if (this._scale > this.min + 0.01) this.reset();
      else this.zoomTo(Math.min(this.doubleTapScale, this.max), e.clientX - r.left, e.clientY - r.top);
    } else {
      this._lastTap = { x: e.clientX, y: e.clientY, t: now };
    }
  }

  // ctrl+wheel is what trackpads emit for a pinch gesture on desktop.
  _wheel(e) {
    if (this.bool("disabled") || !e.ctrlKey) return;
    e.preventDefault();
    const r = this._frame.getBoundingClientRect();
    this._zoomAt(
      this._clampScale(this._scale * Math.exp(-e.deltaY * 0.01)),
      e.clientX - r.left - r.width / 2,
      e.clientY - r.top - r.height / 2,
    );
    this._apply();
    clearTimeout(this._wheelT);
    this._wheelT = setTimeout(() => this._settle(), 150);
  }

  _key(e) {
    if (this.bool("disabled")) return;
    const step = 32;
    const zoomed = this._scale > this.min + 0.001;
    if (e.key === "+" || e.key === "=") this.zoomTo(this._scale * 1.25);
    else if (e.key === "-") this.zoomTo(this._scale / 1.25);
    else if (e.key === "0") this.reset();
    else if (zoomed && e.key === "ArrowLeft") this._nudge(step, 0);
    else if (zoomed && e.key === "ArrowRight") this._nudge(-step, 0);
    else if (zoomed && e.key === "ArrowUp") this._nudge(0, step);
    else if (zoomed && e.key === "ArrowDown") this._nudge(0, -step);
    else return;
    e.preventDefault();
  }

  // ---- internals ------------------------------------------------------------
  // Rescale around a focal point (fx/fy relative to the frame center) so the
  // content under the focal point stays put.
  _zoomAt(scale, fx, fy) {
    const k = scale / this._scale;
    this._tx = fx - (fx - this._tx) * k;
    this._ty = fy - (fy - this._ty) * k;
    this._scale = scale;
    this._clampPan();
  }

  _nudge(dx, dy) {
    this._tx += dx;
    this._ty += dy;
    this._clampPan();
    this._animate();
    this._settle();
  }

  _clampScale(v) {
    return Math.min(this.max, Math.max(this.min, v));
  }

  // Containment: with center origin the content may shift at most
  // (scale - 1) * size / 2 in each direction before its edge enters the frame.
  _clampPan() {
    const r = this._frame.getBoundingClientRect();
    const mx = Math.max(0, ((this._scale - 1) * r.width) / 2);
    const my = Math.max(0, ((this._scale - 1) * r.height) / 2);
    this._tx = Math.min(mx, Math.max(-mx, this._tx));
    this._ty = Math.min(my, Math.max(-my, this._ty));
  }

  _apply() {
    this._stage.style.transform = `translate(${this._tx}px, ${this._ty}px) scale(${this._scale})`;
    const zoomed = this._scale > this.min + 0.001;
    this.setAttribute("data-pura-pz-scale", this._scale.toFixed(2));
    if (zoomed) this.setAttribute("data-pura-pz-zoomed", "");
    else this.removeAttribute("data-pura-pz-zoomed");
  }

  // Eased apply for programmatic zooms; the transition itself lives in the
  // template and is gated behind prefers-reduced-motion: no-preference.
  _animate() {
    this._stage.classList.add("anim");
    this._apply();
    clearTimeout(this._animT);
    this._animT = setTimeout(() => this._stage.classList.remove("anim"), 400);
  }

  _settle() {
    if (Math.abs(this._scale - this._emitted) < 0.001) return;
    this._emitted = this._scale;
    this.dispatchEvent(new CustomEvent("zoom", {
      bubbles: true,
      composed: true,
      detail: { scale: this._scale },
    }));
  }
}

define("pura-pinch-zoom", PuraPinchZoom, meta);
export { PuraPinchZoom };
