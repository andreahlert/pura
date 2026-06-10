// <pura-motion-path> — gsap MotionPath, driven natively. The slotted content
// rides an SVG path via `offset-path: path(...)` while `offset-distance` ramps
// 0% -> 100%, by default tied 1:1 to a scroll-driven timeline with no per-frame
// JS. `offset-rotate: auto` keeps the content facing its direction of travel.
//
// Path coordinates are px in the host's box (offset-path has no viewBox), so
// size the host to fit the path you draw. `show-path` renders a faint dotted
// guide of the same path behind the mover.
//
// Triggers:
//   scrub  — (default) ties the travel 1:1 to a scroll-driven timeline.
//            timeline="view" (default) maps the element's own view progress;
//            timeline="scroll" maps the nearest scroll container.
//   view   — travels once when scrolled into view (IntersectionObserver), eased
//            by the spring primitive.
//   load   — travels once on connect.
//
// Attributes:
//   path        — SVG path d-string to travel (px units).
//   no-rotate   — boolean. Keep the content upright instead of facing travel.
//   show-path   — boolean. Draw a faint dotted guide of the path.
//   line-color  — guide stroke color (default currentColor).
//   trigger     — "scrub" | "view" | "load" (default "scrub").
//   timeline    — "view" | "scroll" (scrub only, default "view").
//   range       — animation-range for scrub (default "cover 0% cover 50%").
//   preset / stiffness / damping / mass — spring() easing for view/load.
//
// SSR: before JS the content sits at the path start, fully visible. Reduced
// motion: the scrub block is gated behind a no-preference media query and the
// content lands at the path end.
//
// Agent-native layer: each instance registers in window.__puraMotionPaths by
//   data-pura-id with { path, replay, el }; data-pura-mp-* mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./motion-path.meta.js";
import { motionPathTemplate } from "./motion-path.template.js";
import { spring } from "./spring.js";

let uid = 0;

function registry() {
  return (window.__puraMotionPaths ||= new Map());
}

const TRIGGERS = new Set(["scrub", "view", "load"]);

class PuraMotionPath extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-motion-path-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = motionPathTemplate(this);
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
    this.removeAttribute("data-pura-mp-in");
    void this.offsetWidth; // reflow so re-add plays
    requestAnimationFrame(() => this.setAttribute("data-pura-mp-in", ""));
  }

  // ---- internals ------------------------------------------------------------
  _apply() {
    if (this.trigger === "scrub") {
      this._scrub();
    } else {
      this._timed();
    }

    this.setAttribute("data-pura-mp-trigger", this.trigger);
    registry().set(this._id, {
      id: this._id,
      path: this.getAttribute("path") || "",
      replay: () => this.replay(),
      el: this,
    });
  }

  _scrub() {
    const tl = this.timeline === "scroll" ? "scroll()" : "view()";
    this.style.setProperty("--pura-mp-timeline", tl);
    const range = this.getAttribute("range");
    if (range) this.style.setProperty("--pura-mp-range", range);
    this.setAttribute("data-pura-mp-scrub", "");
    this.setAttribute("data-pura-mp-timeline", this.timeline);
  }

  _timed() {
    const p = spring({
      preset: this.getAttribute("preset"),
      stiffness: this.getAttribute("stiffness"),
      damping: this.getAttribute("damping"),
      mass: this.getAttribute("mass"),
    });
    this.style.setProperty("--pura-mp-ease", p.easing);
    this.style.setProperty("--pura-mp-dur", `${p.duration}ms`);
    this.setAttribute("data-pura-mp-anim", "");

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
    requestAnimationFrame(() => this.setAttribute("data-pura-mp-in", ""));
  }
}

define("pura-motion-path", PuraMotionPath, meta);
export { PuraMotionPath };
