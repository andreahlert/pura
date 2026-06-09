// <pura-count-up> — animate a number from `from` to `to` with eased counting.
// The motion is a short rAF tween of the displayed value (counting is the
// component's purpose, like countdown/ticker); transforms stay untouched. Starts
// on first view by default (IntersectionObserver), honoring reduced motion by
// jumping straight to the final value.
//
// Attributes:
//   to        — target number (required).
//   from      — starting number (default 0).
//   duration  — tween length in ms (default token --pura-duration-6).
//   decimals  — fixed decimal places (default 0).
//   separator — thousands separator, e.g. "," (default none).
//   prefix / suffix — strings wrapped around the number, e.g. "$", "%".
//   start     — "view" (default, on first intersection) | "load" | "manual".
//
// Slots: none (the formatted number is rendered into a part).
// Parts: value — the span holding the formatted number.
//
// Events: pura-count-up (composed, bubbles) on finish; detail = { id, value }.
//
// Methods: start() runs the tween now; reset() returns to `from` display.
//
// Reduced motion: renders the final value immediately, no tween.
//
// Agent-native layer: registers in window.__puraCountUps keyed by data-pura-id;
//   data-pura-count-up-value mirrors the live displayed number.
import { PuraElement, define } from "../base.js";
import meta from "./count-up.meta.js";
import { countUpTemplate, formatCount, readOptions } from "./count-up.template.js";

let uid = 0;

function registry() {
  return (window.__puraCountUps ||= new Map());
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

class PuraCountUp extends PuraElement {
  static observedAttributes = ["to", "from", "decimals", "separator", "prefix", "suffix"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-count-up-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = countUpTemplate(this);
    this.render(html, css);
    this._value = this.$(".value");
    this._done = false;

    this._renderValue(this.options.from);

    const mode = this.getAttribute("start") || "view";
    if (mode === "manual") return;
    if (mode === "load" || !("IntersectionObserver" in window) || reducedMotion()) {
      this.start();
      return;
    }
    this._io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            this.start();
            this._io?.disconnect();
            this._io = null;
          }
        }
      },
      { threshold: 0.4 }
    );
    this._io.observe(this);
  }

  disconnectedCallback() {
    this._io?.disconnect();
    if (this._raf) cancelAnimationFrame(this._raf);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this._value) return;
    if (this._done) this._renderValue(this.options.to);
  }

  get options() {
    return readOptions(this);
  }
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    if (Number.isFinite(n) && n >= 0) return n;
    const tok = getComputedStyle(this).getPropertyValue("--pura-duration-6").trim();
    return tok.endsWith("ms") ? parseFloat(tok) : 600;
  }

  start() {
    const { from, to } = this.options;
    if (reducedMotion()) {
      this._renderValue(to);
      this._finish(to);
      return;
    }
    if (this._raf) cancelAnimationFrame(this._raf);
    const duration = this.duration;
    let startTs = null;
    const step = (ts) => {
      if (startTs === null) startTs = ts;
      const t = duration ? Math.min((ts - startTs) / duration, 1) : 1;
      const v = from + (to - from) * easeOutCubic(t);
      this._renderValue(v);
      if (t < 1) {
        this._raf = requestAnimationFrame(step);
      } else {
        this._finish(to);
      }
    };
    this._raf = requestAnimationFrame(step);
  }

  reset() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._done = false;
    this._renderValue(this.options.from);
  }

  _finish(to) {
    this._done = true;
    this.dispatchEvent(
      new CustomEvent("pura-count-up", {
        bubbles: true,
        composed: true,
        detail: { id: this._id, value: to },
      })
    );
  }

  _renderValue(n) {
    const text = formatCount(n, this.options);
    if (this._value) this._value.textContent = text;
    this.setAttribute("data-pura-count-up-value", text);
  }
}


define("pura-count-up", PuraCountUp, meta);
export { PuraCountUp };
