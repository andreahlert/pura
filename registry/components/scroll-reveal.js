// <pura-scroll-reveal> — reveals slotted content as it scrolls through the
// viewport, driven entirely by the native CSS scroll-driven-animation timeline
// (`animation-timeline: view()`). Unlike <pura-reveal> (an IntersectionObserver
// that flips a binary hidden/visible state), this *scrubs* the entrance to the
// element's progress through the viewport: scroll halfway and the reveal is
// halfway. There is no observer, no per-frame JS, and the whole effect survives
// SSR because it is pure CSS.
//
// Attributes:
//   animation — fade (default) | slide-up | slide-down | slide-left |
//               slide-right | zoom | blur. Invalid values fall back to fade.
//   distance  — px the slide variants travel (number, default 28).
//   range     — preset window the reveal scrubs over:
//                 enter (default) — finishes shortly after entering view
//                 cover           — scrubs across the whole viewport crossing
//                 early           — finishes almost immediately on entry
//               or any raw CSS `animation-range` value (e.g. "entry 0% exit 0%").
//
// Slots: default — the content to reveal.
// Parts: content — the animated wrapper.
//
// Reduced motion / old engines: the keyframed animation lives inside
//   `@supports (animation-timeline: view())` + `(prefers-reduced-motion:
//   no-preference)`, so otherwise the content is fully visible from first paint.
//
// Agent-native layer: each instance registers in window.__puraScrollReveals
//   keyed by data-pura-id, and data-pura-reveal-* mirror the resolved config
//   (animation, range, native) so an agent can enumerate and read every reveal.
import { PuraElement, define } from "../base.js";
import meta from "./scroll-reveal.meta.js";
import { scrollRevealTemplate } from "./scroll-reveal.template.js";

let uid = 0;

function registry() {
  return (window.__puraScrollReveals ||= new Map());
}

const ANIMATIONS = new Set([
  "fade", "slide-up", "slide-down", "slide-left", "slide-right", "zoom", "blur",
]);

// Preset name -> CSS animation-range window.
const RANGES = {
  enter: "entry 0% cover 38%",
  cover: "cover 0% cover 100%",
  early: "entry 0% entry 100%",
};

// Pure: resolve an animation-range from the `range` attribute. A known preset
// maps to its window; any other non-empty string is treated as a raw CSS value;
// empty/missing falls back to the `enter` preset.
export function resolveRange(raw) {
  if (raw == null || raw === "") return RANGES.enter;
  if (raw in RANGES) return RANGES[raw];
  return raw;
}

class PuraScrollReveal extends PuraElement {
  static observedAttributes = ["animation", "distance", "range"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-scroll-reveal-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = scrollRevealTemplate(this);
    this.render(html, css);

    this._native =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline: view()");

    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.isConnected) return;
    this._sync();
  }

  // ---- config getters -------------------------------------------------------
  get animation() {
    const a = this.getAttribute("animation");
    return ANIMATIONS.has(a) ? a : "fade";
  }
  get distance() {
    const n = parseFloat(this.getAttribute("distance"));
    return Number.isFinite(n) && n >= 0 ? n : 28;
  }
  get range() {
    return resolveRange(this.getAttribute("range"));
  }
  get native() {
    return !!this._native;
  }

  // ---- internals ------------------------------------------------------------
  _sync() {
    this.style.setProperty("--pura-sr-anim", `pura-sr-${this.animation}`);
    this.style.setProperty("--pura-sr-distance", `${this.distance}px`);
    this.style.setProperty("--pura-sr-range", this.range);

    this.setAttribute("data-pura-reveal-animation", this.animation);
    this.setAttribute("data-pura-reveal-range", this.range);
    this.setAttribute("data-pura-reveal-native", this.native ? "true" : "false");
  }
}

define("pura-scroll-reveal", PuraScrollReveal, meta);
export { PuraScrollReveal };
