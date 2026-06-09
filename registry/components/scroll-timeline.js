// <pura-scroll-timeline> — AGENT-NATIVE. A section-scoped scroll progress that
// PAUSES on intent. Where <pura-scroll-progress> is a single global reading bar
// fixed to the viewport (always live, no interaction), this tracks how far *this
// element* has travelled through the viewport and freezes its advance the moment
// the reader shows intent to engage — hover or keyboard focus inside the section.
// Freezing while engaged means the motion stops competing for attention exactly
// when someone is reading or operating the content, and the held/engaged state is
// exposed so an agent can tell a section is being attended to.
//
// The pure model (computeViewProgress / timelineState, exported below) is DOM-free
// and unit-tested: viewport geometry → progress, and (progress, engaged) → the
// paused timeline state.
//
// Slots:
//   default — the section content. A thin sticky progress fill sits above it.
//
// Attribute:
//   intent — what counts as intent: "both" (default) | "hover" | "focus" | "none".
//   height — fill thickness (any CSS length, default 3px).
//
// ARIA: the bar is role="progressbar" with aria-valuemin/max 0..100 and a live
//   aria-valuenow. Progress is carried by the static fill width, never motion.
//
// Custom properties (inherit across the shadow boundary):
//   --pura-timeline-progress  0..1 scroll progress (held while engaged)
//   --pura-timeline-paused    1 while intent is freezing it, else 0
// Durations multiply var(--pura-motion) so a <pura-motion-budget> governor or
//   reduced motion calms the fill.
//
// Events (bubble, composed):
//   timeline { progress, paused } on each progress change.
//   intent   { engaged, progress } when intent starts/ends.
//
// Agent-native layer: data-pura-intent (engaged|idle) and
//   data-pura-timeline-progress mirror live state; each instance registers in
//   window.__puraScrollTimelines by data-pura-id.
import { PuraElement, define } from "../base.js";
import meta from "./scroll-timeline.meta.js";
import { scrollTimelineTemplate } from "./scroll-timeline.template.js";

// ---- pure model (DOM-free, SSR-safe, unit-tested) --------------------------

// How far an element has travelled through the viewport, 0..1. 0 when its top is
// at the bottom edge (just entering), 1 when its bottom has passed the top edge
// (fully gone). Mirrors the span of a CSS `view()` timeline. Guards a zero-height
// viewport+element to 0 (never NaN).
export function computeViewProgress(rect, viewportH) {
  const vh = Number(viewportH) || 0;
  const top = Number(rect?.top) || 0;
  const height = Number(rect?.height) || 0;
  const span = vh + height;
  if (span <= 0) return 0;
  const p = (vh - top) / span;
  return Math.min(1, Math.max(0, p));
}

// Resolve the timeline's visual state. When engaged (intent), the progress is
// held: paused is true and the play signal is "paused".
export function timelineState(progress, engaged) {
  const p = Math.min(1, Math.max(0, Number(progress) || 0));
  return { progress: p, paused: !!engaged, play: engaged ? "paused" : "running" };
}

// ---- element ----------------------------------------------------------------

let uid = 0;

function registry() {
  return (window.__puraScrollTimelines ||= new Map());
}

const INTENT_MODES = new Set(["both", "hover", "focus", "none"]);

class PuraScrollTimeline extends PuraElement {
  static observedAttributes = ["height"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-scroll-timeline-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = scrollTimelineTemplate(this);
    this.render(html, css);

    this._bar = this.$(".bar");
    this._bar.setAttribute("role", "progressbar");
    this._bar.setAttribute("aria-valuemin", "0");
    this._bar.setAttribute("aria-valuemax", "100");

    this._progress = 0;   // held value (frozen while engaged)
    this._engaged = false;
    this._ticking = false;
    this._rafId = 0;

    this._onScroll = () => this._schedule();
    this._onResize = () => this._schedule();
    window.addEventListener("scroll", this._onScroll, { passive: true });
    window.addEventListener("resize", this._onResize, { passive: true });

    // Intent listeners on the host (light DOM) so hover/focus anywhere in the
    // section counts. Which gestures count is the `intent` attribute: pointer*
    // gestures are gated on "hover", focus* gestures on "focus".
    this._onPointerEnter = () => { if (this._gesture("hover")) this._setIntent(true); };
    this._onPointerLeave = () => { if (this._gesture("hover")) this._setIntent(false); };
    this._onFocusIn = () => { if (this._gesture("focus")) this._setIntent(true); };
    this._onFocusOut = () => { if (this._gesture("focus")) this._setIntent(false); };
    this.addEventListener("pointerenter", this._onPointerEnter);
    this.addEventListener("pointerleave", this._onPointerLeave);
    this.addEventListener("focusin", this._onFocusIn);
    this.addEventListener("focusout", this._onFocusOut);

    this._syncHeight();
    this._update(true);
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this._onScroll);
    window.removeEventListener("resize", this._onResize);
    this.removeEventListener("pointerenter", this._onPointerEnter);
    this.removeEventListener("pointerleave", this._onPointerLeave);
    this.removeEventListener("focusin", this._onFocusIn);
    this.removeEventListener("focusout", this._onFocusOut);
    if (this._rafId) cancelAnimationFrame(this._rafId);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._bar) this._syncHeight();
  }

  // ---- public API ----------------------------------------------------------

  // Live scroll progress, 0..100 (rounded). Held while engaged.
  get progress() {
    return Math.round(this._progress * 100);
  }
  // Whether intent (hover/focus) is currently freezing the timeline.
  get engaged() {
    return this._engaged;
  }

  // ---- internals -----------------------------------------------------------

  get _intentMode() {
    const m = this.getAttribute("intent");
    return INTENT_MODES.has(m) ? m : "both";
  }

  _gesture(kind /* "hover" | "focus" */) {
    const mode = this._intentMode;
    if (mode === "none") return false;
    if (mode === "both") return true;
    return mode === kind;
  }

  _setIntent(engaged) {
    if (this._engaged === engaged) return;
    this._engaged = engaged;
    this._reflectIntent();
    this.dispatchEvent(new CustomEvent("intent", {
      bubbles: true,
      composed: true,
      detail: { engaged, progress: this.progress },
    }));
    // resuming: recompute immediately from the live scroll position.
    if (!engaged) this._update(false);
  }

  _schedule() {
    if (this._ticking) return;
    this._ticking = true;
    this._rafId = requestAnimationFrame(() => {
      this._ticking = false;
      this._rafId = 0;
      this._update(false);
    });
  }

  // Recompute progress unless frozen by intent; always reflect state.
  _update(force) {
    const vh = window.innerHeight || document.documentElement?.clientHeight || 0;
    const rect = this.getBoundingClientRect?.() || { top: 0, height: 0 };
    const live = computeViewProgress(rect, vh);

    // Frozen while engaged: hold the last value (unless forced, e.g. first paint).
    if (!this._engaged || force) this._progress = live;

    const st = timelineState(this._progress, this._engaged);
    this.style.setProperty("--pura-timeline-progress", String(st.progress));
    this.style.setProperty("--pura-timeline-paused", st.paused ? "1" : "0");
    this.setAttribute("data-pura-timeline-progress", String(this.progress));

    if (this._bar) this._bar.setAttribute("aria-valuenow", String(this.progress));

    this.dispatchEvent(new CustomEvent("timeline", {
      bubbles: true,
      composed: true,
      detail: { progress: this.progress, paused: st.paused },
    }));
  }

  _reflectIntent() {
    this.setAttribute("data-pura-intent", this._engaged ? "engaged" : "idle");
    this.style.setProperty("--pura-timeline-paused", this._engaged ? "1" : "0");
  }

  _syncHeight() {
    const h = this.getAttribute("height");
    if (h) this.style.setProperty("--_stl-height", h);
    else this.style.removeProperty("--_stl-height");
  }
}

define("pura-scroll-timeline", PuraScrollTimeline, meta);
export { PuraScrollTimeline };
