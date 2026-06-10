// <pura-hold-confirm> — press-and-hold to confirm. While the button is held, a
// ring fills around the indicator; release early and it snaps back, hold to the
// end and the element fires "confirm" and the ring morphs into a check. The
// motion.dev "hold to confirm" move: the fill is a CSS transition over the hold
// duration, the only JS is the setTimeout that decides completion.
//
// Attributes:
//   duration — hold time in ms before confirm fires (default 1200).
//   disabled — standard disabled semantics.
//
// Events:
//   confirm — fired once the hold completes (bubbles, composed).
//   cancel  — fired when a hold is released early (bubbles, composed).
//
// Keyboard: holding Space or Enter works like holding the pointer.
// Reduced motion: the ring still fills (it is functional progress feedback,
//   not decoration) — the hold gesture is the feature.
//
// Agent-native layer: each instance registers in window.__puraHoldConfirms by
//   data-pura-id with { duration, confirm, reset, el }.
import { PuraElement, define } from "../base.js";
import meta from "./hold-confirm.meta.js";
import { holdConfirmTemplate } from "./hold-confirm.template.js";

let uid = 0;

function registry() {
  return (window.__puraHoldConfirms ||= new Map());
}

class PuraHoldConfirm extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-hold-confirm-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = holdConfirmTemplate(this);
    this.render(html, css);

    this.style.setProperty("--pura-hold-dur", `${this.duration}ms`);
    this._bind();
    registry().set(this._id, {
      id: this._id,
      duration: this.duration,
      confirm: () => this._complete(),
      reset: () => this.reset(),
      el: this,
    });
  }

  disconnectedCallback() {
    clearTimeout(this._timer);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 1200;
  }

  // ---- public API -----------------------------------------------------------
  reset() {
    clearTimeout(this._timer);
    this._timer = null;
    this.removeAttribute("data-pura-hold-active");
    this.removeAttribute("data-pura-hold-done");
  }

  // ---- internals ------------------------------------------------------------
  _bind() {
    const btn = this.$("button");
    btn.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      btn.setPointerCapture?.(e.pointerId);
      this._start();
    });
    btn.addEventListener("pointerup", () => this._release());
    btn.addEventListener("pointercancel", () => this._release());
    btn.addEventListener("keydown", (e) => {
      if (e.repeat) return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); this._start(); }
    });
    btn.addEventListener("keyup", (e) => {
      if (e.key === " " || e.key === "Enter") this._release();
    });
    // a completed click should not re-trigger; swallow the synthetic click
    btn.addEventListener("click", (e) => e.preventDefault());
  }

  _start() {
    if (this.hasAttribute("disabled") || this._timer || this.hasAttribute("data-pura-hold-done")) return;
    this.setAttribute("data-pura-hold-active", "");
    this._timer = setTimeout(() => this._complete(), this.duration);
  }

  _release() {
    if (!this._timer) return;
    clearTimeout(this._timer);
    this._timer = null;
    this.removeAttribute("data-pura-hold-active");
    this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }));
  }

  _complete() {
    clearTimeout(this._timer);
    this._timer = null;
    this.removeAttribute("data-pura-hold-active");
    this.setAttribute("data-pura-hold-done", "");
    this.dispatchEvent(new CustomEvent("confirm", { bubbles: true, composed: true }));
  }
}

define("pura-hold-confirm", PuraHoldConfirm, meta);
export { PuraHoldConfirm };
