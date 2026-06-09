// <pura-time-scrub> — AGENT-NATIVE. A scrubbable master timeline over a sequence
// of steps. Where <pura-undo> is a one-shot binary undo window (a snackbar with a
// single "Undo?" affordance and a commit timer), this is a *navigable history*:
// every slotted child is a keyframe, and a draggable accessible slider seeks a
// continuous playhead across them — undo/redo by position. Scrubbing exposes a
// continuous fraction (for interpolating any consumer animation against the
// playhead) and a snapped integer index (the discrete state the agent acts on).
//
// The pure timeline model (seekTimeline / indexToPosition, exported below) is the
// whole brain: total keyframes + a 0..1 position → { index, fraction, snapped }.
// It is DOM-free and unit-tested independently.
//
// Slots:
//   default — the steps/keyframes. Each element child is one keyframe; its
//     data-label (or trimmed text) becomes the aria-valuetext at that stop.
//
// The rail is a real slider: role="slider", tabindex 0, arrow keys step the
//   snapped index, Home/End jump to the ends, pointer drag seeks continuously.
//   aria-valuemin/max/now/text track the playhead.
//
// Custom properties set on the host (inherit across the shadow boundary):
//   --pura-scrub        continuous playhead 0..1 (interpolation signal)
//   --pura-scrub-index  snapped integer index
//   --pura-scrub-total  keyframe count
// Each child is stamped data-pura-scrub-state = past | current | future so the
//   history reads visually (future steps dim). Durations multiply
//   var(--pura-motion) so a <pura-motion-budget> governor or reduced motion calms
//   the scrub.
//
// Event: scrub { index, snapped, fraction, position, total, label } (bubbles,
//   composed) on every playhead change.
//
// Agent-native layer: data-pura-scrub-index / -total mirror the live playhead and
//   each instance registers in window.__puraTimeScrubs by data-pura-id with
//   { index, total, seek, step, el } so an agent can drive history without DOM.
import { PuraElement, define } from "../base.js";
import meta from "./time-scrub.meta.js";
import { timeScrubTemplate } from "./time-scrub.template.js";

// ---- pure timeline model (DOM-free, SSR-safe, unit-tested) -----------------

// Given `total` keyframes and a continuous `position` in [0,1], locate the
// playhead: the integer segment index at or before it, the fraction [0,1) into
// the next segment (for WAAPI/transition interpolation), and the nearest snapped
// keyframe index (the discrete state). Degrades safely: total <= 1 → all zeros.
export function seekTimeline(total, position) {
  const n = Math.max(0, Math.trunc(Number(total)) || 0);
  if (n <= 1) return { total: n, position: 0, index: 0, fraction: 0, snapped: 0 };
  const p = Math.min(1, Math.max(0, Number(position) || 0));
  const scaled = p * (n - 1);               // playhead in keyframe units, 0..n-1
  const index = Math.min(n - 2, Math.floor(scaled));
  const fraction = scaled - index;          // 0..1 within [index, index+1]
  const snapped = Math.round(scaled);
  return { total: n, position: p, index, fraction, snapped };
}

// Inverse: the 0..1 position that lands exactly on keyframe `index`.
export function indexToPosition(index, total) {
  const n = Math.max(0, Math.trunc(Number(total)) || 0);
  if (n <= 1) return 0;
  const i = Math.min(n - 1, Math.max(0, Math.trunc(Number(index)) || 0));
  return i / (n - 1);
}

// ---- element ----------------------------------------------------------------

let uid = 0;

function registry() {
  return (window.__puraTimeScrubs ||= new Map());
}

class PuraTimeScrub extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-time-scrub-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = timeScrubTemplate(this);
    this.render(html, css);

    this._rail = this.$(".rail");
    this._ticks = this.$(".ticks");

    this._position = 0; // continuous playhead, source of truth
    this._dragging = false;

    this._rail.setAttribute("role", "slider");
    this._rail.setAttribute("tabindex", "0");
    this._rail.setAttribute("aria-valuemin", "0");

    this._onKey = (e) => this._key(e);
    this._onPointerDown = (e) => this._pointerDown(e);
    this._onPointerMove = (e) => this._pointerMove(e);
    this._onPointerUp = () => this._pointerUp();
    this._rail.addEventListener("keydown", this._onKey);
    this._rail.addEventListener("pointerdown", this._onPointerDown);

    // Recount when steps stream in/out so total and stamps stay correct.
    if (typeof MutationObserver !== "undefined") {
      this._mo = new MutationObserver(() => this._sync(true));
      this._mo.observe(this, { childList: true });
    }

    this._sync(true);
  }

  disconnectedCallback() {
    this._mo?.disconnect();
    this._mo = null;
    this._rail?.removeEventListener("keydown", this._onKey);
    this._rail?.removeEventListener("pointerdown", this._onPointerDown);
    window.removeEventListener("pointermove", this._onPointerMove);
    window.removeEventListener("pointerup", this._onPointerUp);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- public API ----------------------------------------------------------

  get total() {
    return this._steps().length;
  }
  // Snapped keyframe index the playhead is nearest to.
  get index() {
    return seekTimeline(this.total, this._position).snapped;
  }
  // Continuous playhead, 0..1.
  get position() {
    return this._position;
  }

  // Seek to a continuous position (0..1). Clamped.
  seek(position) {
    this._position = Math.min(1, Math.max(0, Number(position) || 0));
    this._apply();
  }
  // Jump to a snapped keyframe index.
  toIndex(i) {
    this.seek(indexToPosition(i, this.total));
  }
  // Move the snapped index by `delta` keyframes (e.g. +1 redo, -1 undo).
  step(delta) {
    this.toIndex(this.index + (Math.trunc(Number(delta)) || 0));
  }

  // ---- internals -----------------------------------------------------------

  _steps() {
    return Array.from(this.children);
  }

  _key(e) {
    const total = this.total;
    let handled = true;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp": this.step(1); break;
      case "ArrowLeft":
      case "ArrowDown": this.step(-1); break;
      case "Home": this.toIndex(0); break;
      case "End": this.toIndex(total - 1); break;
      case "PageUp": this.step(2); break;
      case "PageDown": this.step(-2); break;
      default: handled = false;
    }
    if (handled) e.preventDefault();
  }

  _pointerDown(e) {
    this._dragging = true;
    this._rail.setPointerCapture?.(e.pointerId);
    window.addEventListener("pointermove", this._onPointerMove);
    window.addEventListener("pointerup", this._onPointerUp);
    this._seekFromPointer(e);
  }
  _pointerMove(e) {
    if (this._dragging) this._seekFromPointer(e);
  }
  _pointerUp() {
    this._dragging = false;
    window.removeEventListener("pointermove", this._onPointerMove);
    window.removeEventListener("pointerup", this._onPointerUp);
  }
  _seekFromPointer(e) {
    const r = this._rail.getBoundingClientRect?.();
    if (!r || !r.width) return;
    this.seek((e.clientX - r.left) / r.width);
  }

  // Recompute geometry, stamps, ARIA and registry from _position + step count.
  _sync(rebuildTicks) {
    const total = this.total;
    const m = seekTimeline(total, this._position);

    this.style.setProperty("--pura-scrub", String(m.position));
    this.style.setProperty("--pura-scrub-index", String(m.snapped));
    this.style.setProperty("--pura-scrub-total", String(total));
    this.setAttribute("data-pura-scrub-index", String(m.snapped));
    this.setAttribute("data-pura-scrub-total", String(total));

    const steps = this._steps();
    let label = "";
    steps.forEach((child, i) => {
      const state = i < m.snapped ? "past" : i === m.snapped ? "current" : "future";
      child.setAttribute("data-pura-scrub-state", state);
      if (i === m.snapped) label = this._labelOf(child);
    });

    if (this._rail) {
      this._rail.setAttribute("aria-valuemax", String(Math.max(0, total - 1)));
      this._rail.setAttribute("aria-valuenow", String(m.snapped));
      if (label) this._rail.setAttribute("aria-valuetext", label);
      else this._rail.removeAttribute("aria-valuetext");
    }

    if (rebuildTicks) this._renderTicks(total, m.snapped);
    else this._markTicks(m.snapped);

    registry().set(this._id, {
      id: this._id,
      get index() { return m.snapped; },
      total,
      position: m.position,
      seek: (p) => this.seek(p),
      step: (d) => this.step(d),
      toIndex: (i) => this.toIndex(i),
      el: this,
    });
  }

  // Applied on a real playhead change: sync + emit.
  _apply() {
    this._sync(false);
    const total = this.total;
    const m = seekTimeline(total, this._position);
    const label = this._labelOf(this._steps()[m.snapped]);
    this.dispatchEvent(new CustomEvent("scrub", {
      bubbles: true,
      composed: true,
      detail: { index: m.snapped, snapped: m.snapped, fraction: m.fraction, position: m.position, total, label },
    }));
  }

  _labelOf(child) {
    if (!child) return "";
    return (child.getAttribute?.("data-label") || child.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60);
  }

  _renderTicks(total, snapped) {
    if (!this._ticks) return;
    this._ticks.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const tick = document.createElement("span");
      tick.className = "tick";
      tick.setAttribute("part", "tick");
      tick.style.left = `${indexToPosition(i, total) * 100}%`;
      this._ticks.appendChild(tick);
    }
    this._markTicks(snapped);
  }
  _markTicks(snapped) {
    if (!this._ticks) return;
    Array.from(this._ticks.children).forEach((tick, i) => {
      if (i <= snapped) tick.setAttribute("data-reached", ""); else tick.removeAttribute("data-reached");
      if (i === snapped) tick.setAttribute("data-current", ""); else tick.removeAttribute("data-current");
    });
  }
}

define("pura-time-scrub", PuraTimeScrub, meta);
export { PuraTimeScrub };
