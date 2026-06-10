// <pura-text-fill> — scroll-driven text fill. The text starts as a faint base
// and fills with color as you scroll: two stacked copies of the text, the top
// one clipped by an animating inset() that slides open along the fill axis.
// The motion.dev "Fill text" move, done natively: by default the fill is tied
// 1:1 to a scroll-driven timeline with no per-frame JS.
//
// Triggers:
//   scrub  — (default) ties the fill 1:1 to a scroll-driven timeline.
//            timeline="view" (default) maps the element's own view progress;
//            timeline="scroll" maps the nearest scroll container.
//   view   — fills once when scrolled into view (IntersectionObserver),
//            eased by the spring primitive.
//   load   — fills once on connect.
//
// Attributes:
//   direction — "right" (default) | "left" | "down" | "up": which way the fill
//               sweeps across the text.
//   trigger   — "scrub" | "view" | "load" (default "scrub").
//   timeline  — "view" | "scroll" (scrub only, default "view").
//   range     — animation-range for scrub (default "cover 0% cover 60%").
//   preset / stiffness / damping / mass — spring() easing for view/load.
//
// Tokens: --pura-text-fill-color (fill, default currentColor) and
//   --pura-text-fill-base (unfilled, default 18% currentColor).
//
// SSR: before JS the text renders in its normal color; the gradient clip only
// engages once a trigger attribute applies. Reduced motion: lands filled.
//
// Agent-native layer: each instance registers in window.__puraTextFills by
//   data-pura-id with { direction, replay, el }; data-pura-tf-* mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./text-fill.meta.js";
import { textFillTemplate, fillDirection } from "./text-fill.template.js";
import { spring } from "./spring.js";

let uid = 0;

function registry() {
  return (window.__puraTextFills ||= new Map());
}

const TRIGGERS = new Set(["scrub", "view", "load"]);

class PuraTextFill extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-text-fill-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = textFillTemplate(this);
    this.render(html, css);

    // Mirror the text into both shadow layers (identical text -> identical
    // layout); the slot stays as the accessible original.
    const text = (this.textContent || "").replace(/\s+/g, " ").trim();
    this.$(".base").textContent = text;
    this.$(".top").textContent = text;
    if (text) this.setAttribute("data-pura-tf-ready", "");

    this._apply();
  }

  disconnectedCallback() {
    this._io?.disconnect();
    this._io = null;
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get trigger() {
    const v = this.getAttribute("trigger");
    return TRIGGERS.has(v) ? v : "scrub";
  }
  get timeline() {
    return this.getAttribute("timeline") === "scroll" ? "scroll" : "view";
  }
  get direction() {
    return fillDirection(this);
  }

  // ---- public API -----------------------------------------------------------
  replay() {
    if (this.trigger === "scrub") return; // scrub is bound to scroll, nothing to replay
    this.removeAttribute("data-pura-tf-in");
    void this.offsetWidth; // reflow so re-add plays
    requestAnimationFrame(() => this.setAttribute("data-pura-tf-in", ""));
  }

  // ---- internals ------------------------------------------------------------
  _apply() {
    if (this.trigger === "scrub") {
      this._scrub();
    } else {
      this._timed();
    }

    this.setAttribute("data-pura-tf-trigger", this.trigger);
    this.setAttribute("data-pura-tf-direction", this.direction);
    registry().set(this._id, {
      id: this._id,
      direction: this.direction,
      replay: () => this.replay(),
      el: this,
    });
  }

  _scrub() {
    const tl = this.timeline === "scroll" ? "scroll()" : "view()";
    this.style.setProperty("--pura-tf-timeline", tl);
    const range = this.getAttribute("range");
    if (range) this.style.setProperty("--pura-tf-range", range);
    this.setAttribute("data-pura-tf-scrub", "");
    this.setAttribute("data-pura-tf-timeline", this.timeline);
  }

  _timed() {
    const p = spring({
      preset: this.getAttribute("preset"),
      stiffness: this.getAttribute("stiffness"),
      damping: this.getAttribute("damping"),
      mass: this.getAttribute("mass"),
    });
    this.style.setProperty("--pura-tf-ease", p.easing);
    this.style.setProperty("--pura-tf-dur", `${p.duration}ms`);
    this.setAttribute("data-pura-tf-anim", "");

    if (this.trigger === "load") { this._reveal(); return; }
    this._observe();
  }

  _observe() {
    if (typeof IntersectionObserver === "undefined") { this._reveal(); return; }
    this._io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { this._reveal(); this._io.disconnect(); this._io = null; break; }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    this._io.observe(this);
  }

  _reveal() {
    requestAnimationFrame(() => this.setAttribute("data-pura-tf-in", ""));
  }
}

define("pura-text-fill", PuraTextFill, meta);
export { PuraTextFill };
