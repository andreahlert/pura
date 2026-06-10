// <pura-type-morph> — variable-font axis morph. The slotted text physically
// thickens (wght) and widens/narrows (wdth) as it scrolls. This is the
// motion.dev / gsap "the type is the animation" move: the letters themselves
// are the moving thing, driven natively.
//
// The axes ride the native font-weight (wght) and font-stretch (wdth)
// properties, not font-variation-settings. Both are natively animatable and,
// crucially, always re-rasterize the glyph: Chromium does NOT re-render a glyph
// when an *animated* value reaches font-variation-settings via var(), so a
// transition or scroll-driven keyframe on those two properties is what actually
// moves the type. font-weight / font-stretch inherit through the flat tree, so
// the slotted light-DOM text picks them up from :host.
//
// Triggers:
//   scrub  — (default) ties the axes 1:1 to a scroll-driven timeline. No frame JS.
//            timeline="view" (default) maps the element's own view progress;
//            timeline="scroll" maps the nearest scroll container. This is the
//            "scroll and the letters morph" effect. Reversible, GPU, free.
//   view   — morphs once when scrolled into view (IntersectionObserver), eased by
//            the spring primitive.
//   load   — morphs once on connect.
//
// Attributes:
//   from-wght / to-wght   — weight axis endpoints (default 400 -> 800).
//   from-wdth / to-wdth   — width axis endpoints (default 100 -> 100, i.e. off).
//   trigger               — "scrub" | "view" | "load" (default "scrub").
//   timeline              — "view" | "scroll" (scrub only, default "view").
//   range                 — animation-range for scrub (default "cover 0% cover 50%",
//                            so the morph completes as the word reaches center).
//   preset / stiffness / damping / mass — spring() easing for view/load.
//
// SSR: before JS the text sits at its from-axes (the :host fallbacks), fully
// readable. Reduced motion: the scrub block is gated behind a no-preference media
// query, and base.js collapses the view/load transition, so text lands settled.
//
// Agent-native layer: each instance registers in window.__puraTypeMorphs by
//   data-pura-id with { from, to, replay, el }; data-pura-tm-* mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./type-morph.meta.js";
import { typeMorphTemplate } from "./type-morph.template.js";
import { spring } from "./spring.js";

let uid = 0;

function registry() {
  return (window.__puraTypeMorphs ||= new Map());
}

const TRIGGERS = new Set(["scrub", "view", "load"]);

class PuraTypeMorph extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-type-morph-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = typeMorphTemplate(this);
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
    this.removeAttribute("data-pura-tm-in");
    void this.offsetWidth; // reflow so re-add plays
    requestAnimationFrame(() => this.setAttribute("data-pura-tm-in", ""));
  }

  // ---- internals ------------------------------------------------------------
  _apply() {
    // Forward the axis endpoints to the template's CSS vars (only when set, so the
    // template fallbacks stand otherwise).
    this._axis("from-wght", "--pura-tm-from-wght");
    this._axis("to-wght", "--pura-tm-to-wght");
    this._axis("from-wdth", "--pura-tm-from-wdth");
    this._axis("to-wdth", "--pura-tm-to-wdth");

    if (this.trigger === "scrub") {
      this._scrub();
    } else {
      this._timed();
    }

    this.setAttribute("data-pura-tm-trigger", this.trigger);
    registry().set(this._id, {
      id: this._id,
      from: { wght: this._num("from-wght", 400), wdth: this._num("from-wdth", 100) },
      to: { wght: this._num("to-wght", 800), wdth: this._num("to-wdth", 100) },
      replay: () => this.replay(),
      el: this,
    });
  }

  _scrub() {
    const tl = this.timeline === "scroll" ? "scroll()" : "view()";
    this.style.setProperty("--pura-tm-timeline", tl);
    const range = this.getAttribute("range");
    if (range) this.style.setProperty("--pura-tm-range", range);
    this.setAttribute("data-pura-tm-scrub", "");
    this.setAttribute("data-pura-tm-timeline", this.timeline);
  }

  _timed() {
    const p = spring({
      preset: this.getAttribute("preset"),
      stiffness: this.getAttribute("stiffness"),
      damping: this.getAttribute("damping"),
      mass: this.getAttribute("mass"),
    });
    this.style.setProperty("--pura-tm-ease", p.easing);
    this.style.setProperty("--pura-tm-dur", `${p.duration}ms`);
    this.setAttribute("data-pura-tm-anim", "");

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
    requestAnimationFrame(() => this.setAttribute("data-pura-tm-in", ""));
  }

  // Mirror a numeric attribute onto a CSS var when present.
  _axis(attr, cssVar) {
    const raw = this.getAttribute(attr);
    if (raw == null || raw === "") return;
    const n = Number(raw);
    if (Number.isFinite(n)) this.style.setProperty(cssVar, String(n));
  }
  _num(attr, fallback) {
    const n = Number(this.getAttribute(attr));
    return Number.isFinite(n) ? n : fallback;
  }
}

define("pura-type-morph", PuraTypeMorph, meta);
export { PuraTypeMorph };
