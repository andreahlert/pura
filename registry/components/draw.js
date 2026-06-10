// <pura-draw> — SVG draw-on. A stroke writes itself in as you scroll, the
// gsap / motion "self-drawing line" move, driven natively: the path is
// normalized to pathLength="1" and its stroke-dashoffset ramps 1 -> 0 on a
// scroll-driven timeline, with no per-frame JS.
//
// Triggers:
//   scrub  — (default) ties the offset 1:1 to a scroll-driven timeline.
//            timeline="view" (default) maps the element's own view progress;
//            timeline="scroll" maps the nearest scroll container.
//   view   — draws once when scrolled into view (IntersectionObserver), eased by
//            the spring primitive.
//   load   — draws once on connect.
//
// Attributes:
//   path             — SVG path d-string to draw (default a wave).
//   viewbox          — SVG viewBox (default "0 0 100 100").
//   stroke / stroke-width / fill / linecap — paint.
//   trigger          — "scrub" | "view" | "load" (default "scrub").
//   timeline         — "view" | "scroll" (scrub only, default "view").
//   range            — animation-range for scrub (default "cover 0% cover 50%").
//   preset / stiffness / damping / mass — spring() easing for view/load.
//   loop             — boolean; a stroke segment chases around the path forever
//                      (the motion.dev "infinite path drawing" loading move).
//                      Overrides trigger. loop-dur (seconds, default 1.6) and
//                      loop-dash (visible fraction 0..1, default 0.3) tune it.
//
// SSR: before JS the stroke is fully drawn (no hidden state baked in) so nothing
// is missing; the hide/redraw only engages once a trigger attribute applies.
// Reduced motion: the scrub block is gated behind a no-preference media query
// and the stroke shows fully drawn.
//
// Agent-native layer: each instance registers in window.__puraDraws by
//   data-pura-id with { path, replay, el }; data-pura-draw-* mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./draw.meta.js";
import { drawTemplate } from "./draw.template.js";
import { spring } from "./spring.js";

let uid = 0;

function registry() {
  return (window.__puraDraws ||= new Map());
}

const TRIGGERS = new Set(["scrub", "view", "load"]);

class PuraDraw extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-draw-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = drawTemplate(this);
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
    if (this.trigger === "scrub" || this.hasAttribute("loop")) return; // bound to scroll / always running
    this.removeAttribute("data-pura-draw-in");
    void this.offsetWidth; // reflow so re-add plays
    requestAnimationFrame(() => this.setAttribute("data-pura-draw-in", ""));
  }

  // ---- internals ------------------------------------------------------------
  _apply() {
    if (this.hasAttribute("loop")) {
      this._loop();
    } else if (this.trigger === "scrub") {
      this._scrub();
    } else {
      this._timed();
    }

    this.setAttribute("data-pura-draw-trigger", this.hasAttribute("loop") ? "loop" : this.trigger);
    registry().set(this._id, {
      id: this._id,
      path: this.getAttribute("path") || "",
      replay: () => this.replay(),
      el: this,
    });
  }

  _loop() {
    const dur = parseFloat(this.getAttribute("loop-dur"));
    if (dur > 0) this.style.setProperty("--pura-draw-loop-dur", `${dur}s`);
    const dash = parseFloat(this.getAttribute("loop-dash"));
    if (dash > 0 && dash < 1) this.style.setProperty("--pura-draw-loop-dash", String(dash));
    this.setAttribute("data-pura-draw-loop", "");
  }

  _scrub() {
    const tl = this.timeline === "scroll" ? "scroll()" : "view()";
    this.style.setProperty("--pura-draw-timeline", tl);
    const range = this.getAttribute("range");
    if (range) this.style.setProperty("--pura-draw-range", range);
    this.setAttribute("data-pura-draw-scrub", "");
    this.setAttribute("data-pura-draw-timeline", this.timeline);
  }

  _timed() {
    const p = spring({
      preset: this.getAttribute("preset"),
      stiffness: this.getAttribute("stiffness"),
      damping: this.getAttribute("damping"),
      mass: this.getAttribute("mass"),
    });
    this.style.setProperty("--pura-draw-ease", p.easing);
    this.style.setProperty("--pura-draw-dur", `${p.duration}ms`);
    this.setAttribute("data-pura-draw-anim", "");

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
    requestAnimationFrame(() => this.setAttribute("data-pura-draw-in", ""));
  }
}

define("pura-draw", PuraDraw, meta);
export { PuraDraw };
