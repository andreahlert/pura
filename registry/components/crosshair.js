// <pura-crosshair> — the technical/editorial crosshair: full-bleed horizontal
// and vertical hairlines cross at the cursor position inside the area, with an
// optional live coordinates readout, the portfolio "viewfinder" look. The two
// 1px lines live in a pointer-events: none overlay positioned by the CSS vars
// --pura-ch-x / --pura-ch-y; pointermove updates a target and a rAF loop lerps
// the drawn position toward it, so the cross trails the cursor slightly. Lines
// are visible only while hovering; SSR renders nothing active.
//
// Attributes:
//   coords      — boolean; show a monospace "x, y" readout near the cross.
//   dashed      — boolean; dashed hairlines instead of solid.
//   hide-cursor — boolean; hide the native cursor over the area.
//   smoothing   — lerp factor per frame, 0..1 (default 0.18; 1 = no trailing).
//
// Tokens: --pura-crosshair-color (line color, default --pura-accent then
//   --pura-fg), --pura-crosshair-thickness (default 1px), --pura-crosshair-fade
//   (hover fade, default 0.15s), --pura-crosshair-coords-size,
//   --pura-crosshair-coords-color.
// Reduced motion: no lerp loop, the cross snaps to the pointer directly; the
//   hover fade is also disabled. Overlay is aria-hidden; slotted content stays
//   fully accessible.
//
// Agent-native layer: each instance registers in window.__puraCrosshairs by
//   data-pura-id with { id, set, el }; data-pura-crosshair-active mirrors hover
//   and data-pura-crosshair-x/y mirror the rounded cross position.
import { PuraElement, define } from "../base.js";
import meta from "./crosshair.meta.js";
import { crosshairTemplate } from "./crosshair.template.js";

let uid = 0;

function registry() {
  return (window.__puraCrosshairs ||= new Map());
}

class PuraCrosshair extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-crosshair-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = crosshairTemplate(this);
    this.render(html, css);
    this._coordsEl = this.$(".coords");

    this._x = this._y = this._tx = this._ty = 0;
    this._rx = this._ry = null;
    this._raf = 0;
    this._active = false;
    this._reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    this._onEnter = (e) => this._enter(e);
    this._onMove = (e) => this._move(e);
    this._onLeave = () => this._leave();
    this.addEventListener("pointerenter", this._onEnter);
    this.addEventListener("pointermove", this._onMove);
    this.addEventListener("pointerleave", this._onLeave);

    registry().set(this._id, {
      id: this._id,
      set: (x, y) => this._set(x, y),
      el: this,
    });
  }

  disconnectedCallback() {
    this.removeEventListener("pointerenter", this._onEnter);
    this.removeEventListener("pointermove", this._onMove);
    this.removeEventListener("pointerleave", this._onLeave);
    cancelAnimationFrame(this._raf);
    this._raf = 0;
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get smoothing() {
    const n = parseFloat(this.getAttribute("smoothing"));
    return Number.isFinite(n) && n > 0 && n <= 1 ? n : 0.18;
  }

  // ---- internals ------------------------------------------------------------
  _point(e) {
    const r = this.getBoundingClientRect();
    return [
      Math.min(Math.max(e.clientX - r.left, 0), r.width),
      Math.min(Math.max(e.clientY - r.top, 0), r.height),
    ];
  }

  _enter(e) {
    const [x, y] = this._point(e);
    // snap on entry so the cross appears under the cursor, not mid-flight
    this._tx = this._x = x;
    this._ty = this._y = y;
    this._active = true;
    this.setAttribute("data-pura-crosshair-active", "");
    this._apply();
    this._loop();
  }

  _move(e) {
    if (!this._active) {
      this._enter(e);
      return;
    }
    [this._tx, this._ty] = this._point(e);
    if (this._reduce) {
      this._x = this._tx;
      this._y = this._ty;
      this._apply();
    }
  }

  _leave() {
    this._active = false;
    this.removeAttribute("data-pura-crosshair-active");
    cancelAnimationFrame(this._raf);
    this._raf = 0;
  }

  // programmatic positioning for the agent-native layer (also shows the cross)
  _set(x, y) {
    this._tx = this._x = x;
    this._ty = this._y = y;
    this._active = true;
    this.setAttribute("data-pura-crosshair-active", "");
    this._apply();
  }

  _loop() {
    if (this._raf || this._reduce) return;
    const step = () => {
      if (!this._active) {
        this._raf = 0;
        return;
      }
      const k = this.smoothing;
      this._x += (this._tx - this._x) * k;
      this._y += (this._ty - this._y) * k;
      this._apply();
      this._raf = requestAnimationFrame(step);
    };
    this._raf = requestAnimationFrame(step);
  }

  _apply() {
    this.style.setProperty("--pura-ch-x", `${this._x}px`);
    this.style.setProperty("--pura-ch-y", `${this._y}px`);
    const rx = Math.round(this._x);
    const ry = Math.round(this._y);
    if (rx === this._rx && ry === this._ry) return;
    this._rx = rx;
    this._ry = ry;
    this.setAttribute("data-pura-crosshair-x", String(rx));
    this.setAttribute("data-pura-crosshair-y", String(ry));
    if (this._coordsEl) this._coordsEl.textContent = `${rx}, ${ry}`;
  }
}

define("pura-crosshair", PuraCrosshair, meta);
export { PuraCrosshair };
