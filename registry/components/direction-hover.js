// <pura-direction-hover> — direction-aware hover: the overlay caption slides
// in from the same edge the cursor entered the card through, and slides out
// through the exit edge. The classic premium image-grid detail.
//
// On pointerenter the entry quadrant is computed via atan2 of the entry point
// (normalized for aspect ratio) and written to data-dir on the host; the
// overlay is parked at that edge with the transition suppressed for one
// frame, then slides to center with a plain CSS transition. pointerleave
// recomputes the exit quadrant and lets the overlay slide back out through it.
//
// Attributes:
//   duration — slide time in ms (default 350).
//   easing   — CSS easing for the slide (default cubic-bezier(0.25, 0.46, 0.45, 0.94)).
//
// Slots:
//   (default) — the card face (image, video, any content).
//   overlay   — the caption that slides in.
//
// Events:
//   enter — the overlay started sliding in; detail: { dir }.
//   leave — the overlay started sliding out; detail: { dir }.
//
// Tokens: --pura-direction-hover-duration, --pura-direction-hover-easing,
//   --pura-direction-hover-bg, --pura-direction-hover-fg,
//   --pura-direction-hover-padding, --pura-direction-hover-radius.
//
// Keyboard: focus inside the card (:focus-within) shows the overlay. Touch
// pointers are ignored (no hover concept). Reduced motion: the overlay
// swaps instantly, no slide. SSR / pre-JS: the card renders at rest with
// the overlay parked off-canvas, nothing covers the media.
//
// Agent-native layer: each instance registers in window.__puraDirectionHovers
//   by data-pura-id with { show, hide, el }; data-dir mirrors the active edge
//   and data-pura-dh-active mirrors the hover state.
import { PuraElement, define } from "../base.js";
import meta from "./direction-hover.meta.js";
import { directionHoverTemplate } from "./direction-hover.template.js";

let uid = 0;

function registry() {
  return (window.__puraDirectionHovers ||= new Map());
}

const DIRS = ["right", "bottom", "left", "top"];

class PuraDirectionHover extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-direction-hover-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = directionHoverTemplate(this);
    this.render(html, css);

    this.style.setProperty("--pura-direction-hover-duration", `${this.duration}ms`);
    const easing = this.getAttribute("easing");
    if (easing) this.style.setProperty("--pura-direction-hover-easing", easing);

    this._onEnter = (e) => { if (e.pointerType !== "touch") this.show(this._dirOf(e)); };
    this._onLeave = (e) => { if (e.pointerType !== "touch") this.hide(this._dirOf(e)); };
    this.addEventListener("pointerenter", this._onEnter);
    this.addEventListener("pointerleave", this._onLeave);

    registry().set(this._id, {
      id: this._id,
      show: (dir = "bottom") => this.show(dir),
      hide: (dir = "bottom") => this.hide(dir),
      el: this,
    });
  }

  disconnectedCallback() {
    this.removeEventListener("pointerenter", this._onEnter);
    this.removeEventListener("pointerleave", this._onLeave);
    const entry = registry().get(this._id);
    if (entry && entry.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 350;
  }
  get isActive() {
    return this.hasAttribute("data-pura-dh-active");
  }

  // ---- public API -----------------------------------------------------------
  // Slide the overlay in from `dir` ("top" | "right" | "bottom" | "left").
  show(dir) {
    this.setAttribute("data-dir", dir);
    const ov = this.$(".overlay");
    if (ov) {
      // park the overlay at the entry edge without animating the reposition
      ov.style.transition = "none";
      void ov.offsetWidth; // flush styles so the snap lands before the slide
      ov.style.transition = "";
    }
    this.setAttribute("data-pura-dh-active", "");
    this.dispatchEvent(new CustomEvent("enter", { bubbles: true, composed: true, detail: { dir } }));
  }

  // Slide the overlay out through `dir`. While active the overlay sits at
  // transform: none, so retargeting data-dir is free; dropping the active
  // flag lets the transition carry it out through the exit edge.
  hide(dir) {
    this.setAttribute("data-dir", dir);
    this.removeAttribute("data-pura-dh-active");
    this.dispatchEvent(new CustomEvent("leave", { bubbles: true, composed: true, detail: { dir } }));
  }

  // ---- internals ------------------------------------------------------------
  // Quadrant of a pointer event relative to the card center, normalized to a
  // square so corners split fairly on non-square cards.
  _dirOf(e) {
    const r = this.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / Math.max(1, r.width);
    const y = (e.clientY - r.top - r.height / 2) / Math.max(1, r.height);
    const d = Math.round(Math.atan2(y, x) / (Math.PI / 2) + 4) % 4;
    return DIRS[d];
  }
}

define("pura-direction-hover", PuraDirectionHover, meta);
export { PuraDirectionHover };
