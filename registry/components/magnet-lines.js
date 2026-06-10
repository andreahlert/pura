// <pura-magnet-lines> - a grid of short ticks that rotate to point at the
// cursor like compass needles, in the style of React Bits' Magnet Lines. The
// pure template renders the full grid at the resting angle (SSR paints a
// presentable static field); client JS listens to window pointermove and aims
// every line with atan2(pointer - cell center), writing one CSS var per cell,
// throttled to one update per animation frame.
//
// Attributes:
//   rows       - grid rows (default 9, capped at 30).
//   columns    - grid columns (default 9, capped at 30).
//   base-angle - resting rotation in degrees before any pointer input (default -10).
//
// Tokens: --pura-magnet-lines-color (tick color), --pura-magnet-lines-width,
//   --pura-magnet-lines-height (tick size).
//
// Slots: default - content layered above the line field.
//
// Reduced motion: under prefers-reduced-motion: reduce the pointer listener is
//   never attached and the field holds the resting angle (the SSR state).
//
// Agent-native layer: each instance registers in window.__puraMagnetLiness
//   keyed by data-pura-id with { id, rows, columns, el, aim };
//   data-pura-magnet-lines-* mirror config and aim(x, y) points the field at
//   viewport coordinates programmatically.
import { PuraElement, define } from "../base.js";
import meta from "./magnet-lines.meta.js";
import { magnetLinesTemplate } from "./magnet-lines.template.js";

let uid = 0;

function registry() {
  return (window.__puraMagnetLiness ||= new Map());
}

class PuraMagnetLines extends PuraElement {
  static observedAttributes = ["rows", "columns", "base-angle"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-magnet-lines-${uid++}`;
    this.dataset.puraId = this._id;
    this._paint();

    registry().set(this._id, {
      id: this._id,
      rows: this.rows,
      columns: this.columns,
      el: this,
      aim: (x, y) => this._aim(x, y),
    });

    this._raf = 0;
    this._onMove = (e) => {
      this._px = e.clientX;
      this._py = e.clientY;
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = 0;
        this._aim(this._px, this._py);
      });
    };
    // Reduced motion: never attach the tracker; the resting angle holds.
    this._reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    this._onReduce = () => this._wire();
    this._reduce.addEventListener("change", this._onReduce);
    this._wire();
  }

  disconnectedCallback() {
    window.removeEventListener("pointermove", this._onMove);
    this._reduce?.removeEventListener("change", this._onReduce);
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this._lines) return; // not connected/painted yet
    this._paint();
    const entry = registry().get(this._id);
    if (entry) {
      entry.rows = this.rows;
      entry.columns = this.columns;
    }
  }

  // ---- config ---------------------------------------------------------------
  get rows() {
    const n = parseInt(this.getAttribute("rows"), 10);
    return Number.isFinite(n) && n > 0 ? Math.min(n, 30) : 9;
  }

  get columns() {
    const n = parseInt(this.getAttribute("columns"), 10);
    return Number.isFinite(n) && n > 0 ? Math.min(n, 30) : 9;
  }

  // ---- internals ------------------------------------------------------------
  _wire() {
    window.removeEventListener("pointermove", this._onMove);
    if (!this._reduce.matches) {
      window.addEventListener("pointermove", this._onMove, { passive: true });
    }
  }

  _paint() {
    const { html, css } = magnetLinesTemplate(this);
    this.render(html, css);
    this._lines = this.$$(".line");
    this.setAttribute("data-pura-magnet-lines-rows", String(this.rows));
    this.setAttribute("data-pura-magnet-lines-columns", String(this.columns));
    this.setAttribute("data-pura-magnet-lines-base", this.getAttribute("base-angle") || "-10");
  }

  // Point every line at viewport coordinates (x, y). Rect reads are grouped in
  // a single frame and the writes only touch a transform-driving custom
  // property, so there is no layout thrash between cells.
  _aim(x, y) {
    for (const line of this._lines) {
      const r = line.getBoundingClientRect();
      const deg =
        (Math.atan2(y - (r.y + r.height / 2), x - (r.x + r.width / 2)) * 180) / Math.PI - 90;
      line.style.setProperty("--pura-ml-angle", `${deg.toFixed(2)}deg`);
    }
    if (!this.hasAttribute("data-pura-magnet-lines-tracking")) {
      this.setAttribute("data-pura-magnet-lines-tracking", "");
    }
  }
}

define("pura-magnet-lines", PuraMagnetLines, meta);
export { PuraMagnetLines };
