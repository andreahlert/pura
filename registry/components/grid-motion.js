// <pura-grid-motion> — the awwwards "infinite grid" hero: a fullscreen grid of
// images/cards whose rows slide laterally following the pointer with lerp
// inertia (same rAF + lerp pattern as pura-cursor). Rows alternate direction
// and move at slightly different depths, so the grid feels parallax-alive.
// The grid overflows its container on purpose; the buffer hides the travel.
//
// Slotted children are the cells; row membership is computed from `columns`
// (row = floor(index / columns)), so consumers just dump a flat list of
// images or cards.
//
// Attributes:
//   columns — cells per row, 1..12 (default 4).
//   shift   — max horizontal travel in px for the deepest row (default 160).
//   ease    — lerp factor per frame, 0..1 (default 0.06). Lower = floatier.
//   tilt    — grid rotation in degrees, -45..45 (default 0; -12 for the
//             classic angled look).
//   global  — boolean. Track the pointer on the whole window instead of only
//             while it is over the element (for fullscreen heroes).
//
// Tokens: --pura-grid-motion-gap, --pura-grid-motion-overflow (grid width,
//   default 160%), --pura-grid-motion-radius, --pura-grid-motion-ratio
//   (cell aspect-ratio), --pura-grid-motion-bg.
//
// SSR / pre-JS paints the static centered grid; without JS it simply never
// moves. Reduced motion and coarse pointers never bind, and a ::slotted
// override pins cells in place as a hard guarantee.
//
// Agent-native layer: each instance registers in window.__puraGridMotions by
//   data-pura-id with { id, columns, shift, ease, el }; data-pura-gm-columns /
//   data-pura-gm-shift mirror config and data-pura-gm-x mirrors the settled
//   horizontal offset in px.
import { PuraElement, define } from "../base.js";
import meta from "./grid-motion.meta.js";
import { gridMotionTemplate } from "./grid-motion.template.js";

let uid = 0;

function registry() {
  return (window.__puraGridMotions ||= new Map());
}

function inert() {
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true ||
    window.matchMedia?.("(pointer: coarse)").matches === true
  );
}

class PuraGridMotion extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-grid-motion-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = gridMotionTemplate(this);
    this.render(html, css);
    this._slot = this.$("slot");

    this.setAttribute("data-pura-gm-columns", String(this.columns));
    this.setAttribute("data-pura-gm-shift", String(this.shift));
    this.setAttribute("data-pura-gm-x", "0");

    registry().set(this._id, {
      id: this._id,
      columns: this.columns,
      shift: this.shift,
      ease: this.ease,
      el: this,
    });

    if (inert()) return;

    this._x = 0; // current lerped offset (px, deepest row)
    this._tx = 0; // target offset from the pointer
    this._raf = null;
    this._rows = [];
    this._onSlot = () => this._collect();
    this._slot.addEventListener("slotchange", this._onSlot);
    this._collect();
    this._bind();
  }

  disconnectedCallback() {
    this._unbind();
    this._slot?.removeEventListener("slotchange", this._onSlot);
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get columns() {
    const n = parseInt(this.getAttribute("columns") || "", 10);
    return Number.isFinite(n) && n >= 1 && n <= 12 ? n : 4;
  }
  get shift() {
    const n = parseFloat(this.getAttribute("shift"));
    return Number.isFinite(n) && n >= 0 ? n : 160;
  }
  get ease() {
    const n = parseFloat(this.getAttribute("ease"));
    return Number.isFinite(n) && n > 0 && n <= 1 ? n : 0.06;
  }

  // ---- internals ------------------------------------------------------------
  // Group slotted cells by row and assign each row a deterministic motion
  // factor: alternating direction, three depth bands cycling by row index.
  _collect() {
    const cols = this.columns;
    this._rows = this._slot.assignedElements({ flatten: true }).map((el, i) => {
      const row = Math.floor(i / cols);
      const dir = row % 2 === 0 ? 1 : -1;
      const depth = 0.55 + (row % 3) * 0.225; // 0.55 / 0.775 / 1.0
      return { el, factor: dir * depth };
    });
  }

  _bind() {
    const global = this.hasAttribute("global");
    this._moveTarget = global ? window : this;
    this._onMove = (e) => {
      let ratio;
      if (global) {
        ratio = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      } else {
        const r = this.getBoundingClientRect();
        ratio = ((e.clientX - r.left) / Math.max(1, r.width)) * 2 - 1;
      }
      this._tx = Math.max(-1, Math.min(1, ratio)) * this.shift;
      if (!this._raf) this._loop();
    };
    this._moveTarget.addEventListener("pointermove", this._onMove, {
      passive: true,
    });
  }
  _unbind() {
    this._moveTarget?.removeEventListener("pointermove", this._onMove);
  }

  // Lerp the shared offset toward the pointer target and fan it out to each
  // row's cells; stop the loop once it settles (same pattern as pura-cursor).
  _loop() {
    this._raf = requestAnimationFrame(() => {
      this._x += (this._tx - this._x) * this.ease;
      for (const { el, factor } of this._rows) {
        el.style.transform = `translate3d(${this._x * factor}px, 0, 0)`;
      }
      const settled = Math.abs(this._tx - this._x) < 0.1;
      this._raf = null;
      if (settled) {
        this.setAttribute("data-pura-gm-x", String(Math.round(this._x)));
      } else {
        this._loop();
      }
    });
  }
}

define("pura-grid-motion", PuraGridMotion, meta);
export { PuraGridMotion };
