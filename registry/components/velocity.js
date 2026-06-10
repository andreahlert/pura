// <pura-velocity> — scroll-velocity lean (the motion.dev useVelocity move).
// The slotted content skews proportionally to how fast the page is scrolling,
// then eases back upright when scrolling stops. Big display text leaning into
// the scroll is the classic use.
//
//   <pura-velocity><h2>FAST WHEN YOU ARE</h2></pura-velocity>
//
// Attributes:
//   max    — max lean in degrees (default 6).
//   factor — sensitivity: degrees per (px/ms) of scroll speed (default 8).
//   axis   — "y" (default, skewY: lean into vertical scroll) | "x" (skewX).
//   decay  — settle lerp factor per frame, 0..1 (default 0.12).
//
// Mechanics: a passive scroll listener samples velocity (px/ms) and raises the
// target lean; a rAF loop lerps the rendered lean toward the target (which
// itself decays toward 0) and STOPS once settled under 0.01deg, so there is no
// idle per-frame work. Under prefers-reduced-motion nothing binds and the
// content stays upright.
//
// Agent-native layer: registers in window.__puraVelocities by data-pura-id;
//   data-pura-velocity-active mirrors whether the loop is live.
import { PuraElement, define } from "../base.js";
import meta from "./velocity.meta.js";
import { velocityTemplate } from "./velocity.template.js";

let uid = 0;

function registry() {
  return (window.__puraVelocities ||= new Map());
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

class PuraVelocity extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-velocity-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = velocityTemplate(this);
    this.render(html, css);

    registry().set(this._id, { id: this._id, el: this });

    if (reducedMotion()) return;

    this._lean = 0; // rendered degrees
    this._target = 0; // where velocity wants us
    this._lastY = window.scrollY;
    this._lastT = 0;
    this._raf = null;
    this._bind();
  }

  disconnectedCallback() {
    this._unbind();
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get max() {
    const n = parseFloat(this.getAttribute("max"));
    return Number.isFinite(n) && n > 0 ? n : 6;
  }
  get factor() {
    const n = parseFloat(this.getAttribute("factor"));
    return Number.isFinite(n) && n > 0 ? n : 8;
  }
  get decay() {
    const n = parseFloat(this.getAttribute("decay"));
    return Number.isFinite(n) && n > 0 && n <= 1 ? n : 0.12;
  }

  // ---- binding --------------------------------------------------------------
  _bind() {
    this._onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = now - this._lastT;
      if (dt > 0 && dt < 200) {
        const v = (y - this._lastY) / dt; // px per ms, signed
        const lean = Math.max(-this.max, Math.min(this.max, v * this.factor));
        this._target = lean;
      }
      this._lastY = y;
      this._lastT = now;
      if (!this._raf) this._loop();
    };
    window.addEventListener("scroll", this._onScroll, { passive: true });
  }
  _unbind() {
    window.removeEventListener("scroll", this._onScroll);
  }

  // ---- internals ------------------------------------------------------------
  // Lerp the rendered lean toward the target while the target itself decays to
  // 0; stop the loop once both settle (no idle per-frame work).
  _loop() {
    this.setAttribute("data-pura-velocity-active", "");
    this._raf = requestAnimationFrame(() => {
      this._target *= 1 - this.decay;
      this._lean += (this._target - this._lean) * 0.2;
      this.style.setProperty("--pura-velocity-skew", `${this._lean.toFixed(3)}deg`);
      const settled = Math.abs(this._lean) < 0.01 && Math.abs(this._target) < 0.01;
      this._raf = null;
      if (!settled) {
        this._loop();
      } else {
        this.style.setProperty("--pura-velocity-skew", "0deg");
        this.removeAttribute("data-pura-velocity-active");
      }
    });
  }
}

define("pura-velocity", PuraVelocity, meta);
export { PuraVelocity };
