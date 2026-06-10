// <pura-clip-reveal> — clip-path wipe reveal. The slotted content (an image, a
// block, a heading) is revealed by an animating clip-path: an inset() slides
// open from one edge or a circle() irises out from the center, by default tied
// 1:1 to a scroll-driven timeline with no per-frame JS. This is the awwwards
// image-wipe move, done natively.
//
// Triggers:
//   scrub  — (default) ties the wipe 1:1 to a scroll-driven timeline.
//            timeline="view" (default) maps the element's own view progress;
//            timeline="scroll" maps the nearest scroll container.
//   view   — wipes open once when scrolled into view (IntersectionObserver),
//            eased by the spring primitive.
//   load   — wipes open once on connect.
//
// Attributes:
//   direction — "up" (default) | "down" | "left" | "right" | "circle".
//   trigger   — "scrub" | "view" | "load" (default "scrub").
//   timeline  — "view" | "scroll" (scrub only, default "view").
//   range     — animation-range for scrub (default "cover 0% cover 50%").
//   preset / stiffness / damping / mass — spring() easing for view/load.
//
// SSR: before JS the content sits fully revealed; the hide/wipe only engages
// once a trigger attribute applies. Reduced motion: the scrub block is gated
// behind a no-preference media query and the content shows revealed.
//
// Agent-native layer: each instance registers in window.__puraClipReveals by
//   data-pura-id with { direction, replay, el }; data-pura-cr-* mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./clip-reveal.meta.js";
import { clipRevealTemplate, clipDirection } from "./clip-reveal.template.js";
import { spring } from "./spring.js";

let uid = 0;

function registry() {
  return (window.__puraClipReveals ||= new Map());
}

const TRIGGERS = new Set(["scrub", "view", "load"]);

class PuraClipReveal extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-clip-reveal-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = clipRevealTemplate(this);
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
  get direction() {
    return clipDirection(this);
  }

  // ---- public API -----------------------------------------------------------
  replay() {
    if (this.trigger === "scrub") return; // scrub is bound to scroll, nothing to replay
    this.removeAttribute("data-pura-cr-in");
    void this.offsetWidth; // reflow so re-add plays
    requestAnimationFrame(() => this.setAttribute("data-pura-cr-in", ""));
  }

  // ---- internals ------------------------------------------------------------
  _apply() {
    if (this.trigger === "scrub") {
      this._scrub();
    } else {
      this._timed();
    }

    this.setAttribute("data-pura-cr-trigger", this.trigger);
    this.setAttribute("data-pura-cr-direction", this.direction);
    registry().set(this._id, {
      id: this._id,
      direction: this.direction,
      replay: () => this.replay(),
      el: this,
    });
  }

  _scrub() {
    const tl = this.timeline === "scroll" ? "scroll()" : "view()";
    this.style.setProperty("--pura-cr-timeline", tl);
    const range = this.getAttribute("range");
    if (range) this.style.setProperty("--pura-cr-range", range);
    this.setAttribute("data-pura-cr-scrub", "");
    this.setAttribute("data-pura-cr-timeline", this.timeline);
  }

  _timed() {
    const p = spring({
      preset: this.getAttribute("preset"),
      stiffness: this.getAttribute("stiffness"),
      damping: this.getAttribute("damping"),
      mass: this.getAttribute("mass"),
    });
    this.style.setProperty("--pura-cr-ease", p.easing);
    this.style.setProperty("--pura-cr-dur", `${p.duration}ms`);
    this.setAttribute("data-pura-cr-anim", "");

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
    requestAnimationFrame(() => this.setAttribute("data-pura-cr-in", ""));
  }
}

define("pura-clip-reveal", PuraClipReveal, meta);
export { PuraClipReveal };
