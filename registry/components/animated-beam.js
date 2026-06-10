// <pura-animated-beam> — a beam of light that travels along an SVG path
// connecting two slotted anchor elements: the canonical "your app talks to
// these APIs" integration-diagram visual. The client measures the anchors
// (children marked data-from / data-to, or matched by the from/to selector
// attributes), generates a quadratic Bezier between their centers and sweeps
// a gradient dash along the stroke with a CSS keyframe; geometry recomputes
// on ResizeObserver and slotchange. SSR paints only the container and the
// slotted nodes — the beam is progressive enhancement.
//
// Attributes:
//   from      — CSS selector for the start anchor, scoped to the light DOM
//               (default "[data-from]").
//   to        — CSS selector for the end anchor (default "[data-to]").
//   curvature — vertical bow of the Bezier control point in px; positive
//               bows up, negative bows down (default 0, a straight line).
//   duration  — one beam sweep in ms (default 2000).
//   delay     — delay before each iteration chain starts, in ms (default 0).
//   reverse   — boolean; the beam travels to -> from instead.
//
// Events:
//   beam-draw — fired whenever the geometry is (re)computed (bubbles,
//               composed, detail: { length }).
//
// Tokens: --pura-animated-beam-from / -to (gradient colors),
//   --pura-animated-beam-track (idle path color),
//   --pura-animated-beam-width (stroke width, default 2).
// Reduced motion: no travelling pulse; the beam renders as a static gradient
//   stroke connecting the anchors.
//
// Agent-native layer: each instance registers in window.__puraAnimatedBeams by
//   data-pura-id with { from, to, curvature, duration, reverse, refresh, el };
//   data-pura-beam-state ("idle" | "animating" | "static") and
//   data-pura-beam-length mirror the live state.
import { PuraElement, define } from "../base.js";
import meta from "./animated-beam.meta.js";
import { animatedBeamTemplate } from "./animated-beam.template.js";

let uid = 0;

function registry() {
  return (window.__puraAnimatedBeams ||= new Map());
}

class PuraAnimatedBeam extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-animated-beam-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = animatedBeamTemplate(this);
    this.render(html, css);

    this._svg = this.$(".svg");
    this._track = this.$(".track");
    this._beam = this.$(".beam");
    this._gradient = this.$(".gradient");

    this.style.setProperty("--pura-animated-beam-duration", `${this.duration}ms`);
    this.style.setProperty("--pura-animated-beam-delay", `${this.delay}ms`);

    this._onSlot = () => this.refresh();
    this.$("slot").addEventListener("slotchange", this._onSlot);

    this._ro = typeof ResizeObserver === "function"
      ? new ResizeObserver(() => this._draw())
      : null;
    this._mq = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null;
    this._onMq = () => this._mirror();
    this._mq?.addEventListener?.("change", this._onMq);

    registry().set(this._id, {
      id: this._id,
      from: this.getAttribute("from") || "[data-from]",
      to: this.getAttribute("to") || "[data-to]",
      curvature: this.curvature,
      duration: this.duration,
      reverse: this.hasAttribute("reverse"),
      refresh: () => this.refresh(),
      el: this,
    });

    this.refresh();
  }

  disconnectedCallback() {
    this._ro?.disconnect();
    this._mq?.removeEventListener?.("change", this._onMq);
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get curvature() {
    const n = parseFloat(this.getAttribute("curvature"));
    return Number.isFinite(n) ? n : 0;
  }
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 2000;
  }
  get delay() {
    const n = parseFloat(this.getAttribute("delay"));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }

  // ---- public API -----------------------------------------------------------
  // Re-resolve the anchors (selectors or slotted content may have changed),
  // re-wire the observers and redraw the path.
  refresh() {
    this._from = this._anchor("from", "[data-from]");
    this._to = this._anchor("to", "[data-to]");
    if (this._ro) {
      this._ro.disconnect();
      this._ro.observe(this);
      if (this._from) this._ro.observe(this._from);
      if (this._to) this._ro.observe(this._to);
    }
    this._draw();
  }

  // ---- internals ------------------------------------------------------------
  _anchor(attr, fallback) {
    const sel = this.getAttribute(attr) || fallback;
    try {
      return this.querySelector(sel);
    } catch {
      return this.querySelector(fallback);
    }
  }

  _draw() {
    if (!this.isConnected || !this._beam) return;
    if (!this._from || !this._to) {
      this.setAttribute("data-pura-beam-state", "idle");
      this._track.removeAttribute("d");
      this._beam.removeAttribute("d");
      return;
    }

    const r = this.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const a = this._from.getBoundingClientRect();
    const b = this._to.getBoundingClientRect();

    const f = (n) => Math.round(n * 100) / 100;
    const sx = a.left + a.width / 2 - r.left;
    const sy = a.top + a.height / 2 - r.top;
    const ex = b.left + b.width / 2 - r.left;
    const ey = b.top + b.height / 2 - r.top;
    const cx = (sx + ex) / 2;
    const cy = (sy + ey) / 2 - this.curvature;
    const d = `M ${f(sx)} ${f(sy)} Q ${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`;

    this._svg.setAttribute("viewBox", `0 0 ${f(r.width)} ${f(r.height)}`);
    this._track.setAttribute("d", d);
    this._beam.setAttribute("d", d);
    this._gradient.setAttribute("x1", String(f(sx)));
    this._gradient.setAttribute("y1", String(f(sy)));
    this._gradient.setAttribute("x2", String(f(ex)));
    this._gradient.setAttribute("y2", String(f(ey)));

    const len = this._beam.getTotalLength?.() || 0;
    if (!len) return;
    const seg = Math.min(len, Math.max(40, len * 0.3));
    this.style.setProperty("--pura-animated-beam-len", `${f(len)}px`);
    this.style.setProperty("--pura-animated-beam-seg", `${f(seg)}px`);
    this.setAttribute("data-pura-beam-length", String(Math.round(len)));
    this._mirror();

    this.dispatchEvent(
      new CustomEvent("beam-draw", {
        bubbles: true,
        composed: true,
        detail: { length: len },
      }),
    );
  }

  _mirror() {
    if (!this.hasAttribute("data-pura-beam-length")) return;
    const reduce = !!this._mq?.matches;
    this.setAttribute("data-pura-beam-state", reduce ? "static" : "animating");
  }
}

define("pura-animated-beam", PuraAnimatedBeam, meta);
export { PuraAnimatedBeam };
