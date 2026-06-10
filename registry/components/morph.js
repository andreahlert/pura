// <pura-morph> — SVG path morph. One path bends into another as it scrolls.
// This is the gsap / motion "the shape is the animation" move, driven natively:
// the `d` geometry property interpolates between two matched-command path()
// values on a scroll-driven timeline, with no per-frame JS and no flubber.
//
// The two paths must share command structure (same count and order of M/L/C/Z…).
// Matched commands interpolate smoothly; mismatched commands snap. Author both
// paths with the same skeleton (a square and a diamond are both M L L L Z).
//
// Triggers:
//   scrub  — (default) ties `d` 1:1 to a scroll-driven timeline. No frame JS.
//            timeline="view" (default) maps the element's own view progress;
//            timeline="scroll" maps the nearest scroll container.
//   view   — morphs once when scrolled into view (IntersectionObserver), eased
//            by the spring primitive.
//   load   — morphs once on connect.
//
// Attributes:
//   from / to        — path d-strings (default square -> diamond).
//   viewbox          — SVG viewBox (default "0 0 100 100").
//   fill / stroke / stroke-width — paint (fill default currentColor).
//   trigger          — "scrub" | "view" | "load" (default "scrub").
//   timeline         — "view" | "scroll" (scrub only, default "view").
//   range            — animation-range for scrub (default "cover 0% cover 50%").
//   preset / stiffness / damping / mass — spring() easing for view/load.
//
// SSR: before JS the shape sits at its from-path, fully painted. Reduced motion:
// the scrub block is gated behind a no-preference media query and the shape
// lands at its destination.
//
// Agent-native layer: each instance registers in window.__puraMorphs by
//   data-pura-id with { from, to, replay, el }; data-pura-morph-* mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./morph.meta.js";
import { morphTemplate } from "./morph.template.js";
import { spring } from "./spring.js";

let uid = 0;

function registry() {
  return (window.__puraMorphs ||= new Map());
}

const TRIGGERS = new Set(["scrub", "view", "load"]);

class PuraMorph extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-morph-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = morphTemplate(this);
    this.render(html, css);

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

  // ---- public API -----------------------------------------------------------
  replay() {
    if (this.trigger === "scrub") return; // scrub is bound to scroll, nothing to replay
    this.removeAttribute("data-pura-morph-in");
    void this.offsetWidth; // reflow so re-add plays
    requestAnimationFrame(() => this.setAttribute("data-pura-morph-in", ""));
  }

  // ---- internals ------------------------------------------------------------
  _apply() {
    if (this.trigger === "scrub") {
      this._scrub();
    } else {
      this._timed();
    }

    this.setAttribute("data-pura-morph-trigger", this.trigger);
    registry().set(this._id, {
      id: this._id,
      from: this.getAttribute("from") || "",
      to: this.getAttribute("to") || "",
      replay: () => this.replay(),
      el: this,
    });
  }

  _scrub() {
    const tl = this.timeline === "scroll" ? "scroll()" : "view()";
    this.style.setProperty("--pura-morph-timeline", tl);
    const range = this.getAttribute("range");
    if (range) this.style.setProperty("--pura-morph-range", range);
    this.setAttribute("data-pura-morph-scrub", "");
    this.setAttribute("data-pura-morph-timeline", this.timeline);
  }

  _timed() {
    const p = spring({
      preset: this.getAttribute("preset"),
      stiffness: this.getAttribute("stiffness"),
      damping: this.getAttribute("damping"),
      mass: this.getAttribute("mass"),
    });
    this.style.setProperty("--pura-morph-ease", p.easing);
    this.style.setProperty("--pura-morph-dur", `${p.duration}ms`);
    this.setAttribute("data-pura-morph-anim", "");

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
    requestAnimationFrame(() => this.setAttribute("data-pura-morph-in", ""));
  }
}

define("pura-morph", PuraMorph, meta);
export { PuraMorph };
