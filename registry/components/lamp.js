// <pura-lamp> - the Linear-style lamp header: two mirrored conic-gradient
// cones spread light downward from a bright bar (blur + box-shadow glow) that
// illuminates the slotted heading, with an animated "lamp opening" entrance
// (width + opacity keyframes).
//
// Triggers:
//   view  - (default) opens once when scrolled into view (IntersectionObserver).
//   scrub - ties the opening 1:1 to a scroll-driven timeline
//           (animation-timeline: view()), pure CSS, no per-frame JS.
//   load  - opens once on connect.
//   none  - static, always open.
//
// Attributes:
//   trigger  - "view" | "scrub" | "load" | "none" (default "view").
//   color    - light color (default --pura-lamp-color, then --pura-accent,
//              then #22d3ee).
//   range    - animation-range for scrub (default "entry 0% cover 40%").
//   duration - entrance duration in ms for view/load (default 900).
//
// Tokens: --pura-lamp-color, --pura-lamp-width (bar width, default
//   min(28rem, 80vw)), --pura-lamp-height (space above the bar, default 8rem),
//   --pura-lamp-spread (cone reach below the bar, default 14rem),
//   --pura-lamp-gap (content top padding), --pura-lamp-dur, --pura-lamp-ease.
//
// SSR / pre-JS and reduced motion: the lamp renders fully open, no entrance.
//
// Agent-native layer: each instance registers in window.__puraLamps by
//   data-pura-id with { trigger, replay, el }; data-pura-lamp-* mirror state.
import { PuraElement, define } from "../base.js";
import meta from "./lamp.meta.js";
import { lampTemplate } from "./lamp.template.js";

let uid = 0;

function registry() {
  return (window.__puraLamps ||= new Map());
}

const TRIGGERS = new Set(["view", "scrub", "load", "none"]);

class PuraLamp extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-lamp-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = lampTemplate(this);
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
    return TRIGGERS.has(v) ? v : "view";
  }

  // ---- public API -----------------------------------------------------------
  replay() {
    if (this.trigger === "scrub" || this.trigger === "none") return;
    this.removeAttribute("data-pura-lamp-in");
    void this.offsetWidth; // reflow so re-add plays
    requestAnimationFrame(() => this.setAttribute("data-pura-lamp-in", ""));
  }

  // ---- internals ------------------------------------------------------------
  _apply() {
    const dur = parseFloat(this.getAttribute("duration"));
    if (Number.isFinite(dur) && dur > 0) {
      this.style.setProperty("--pura-lamp-dur", `${dur}ms`);
    }

    const trigger = this.trigger;
    if (trigger === "scrub") {
      const range = this.getAttribute("range");
      if (range) this.style.setProperty("--pura-lamp-range", range);
      this.setAttribute("data-pura-lamp-scrub", "");
    } else if (trigger === "load") {
      this.setAttribute("data-pura-lamp-anim", "");
      this._reveal();
    } else if (trigger === "view") {
      this.setAttribute("data-pura-lamp-anim", "");
      this._observe();
    }

    this.setAttribute("data-pura-lamp-trigger", trigger);
    registry().set(this._id, {
      id: this._id,
      trigger,
      replay: () => this.replay(),
      el: this,
    });
  }

  _observe() {
    if (typeof IntersectionObserver === "undefined") { this._reveal(); return; }
    this._io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { this._reveal(); this._io.disconnect(); this._io = null; break; }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });
    this._io.observe(this);
  }

  _reveal() {
    requestAnimationFrame(() => this.setAttribute("data-pura-lamp-in", ""));
  }
}

define("pura-lamp", PuraLamp, meta);
export { PuraLamp };
