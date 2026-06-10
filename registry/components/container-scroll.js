// <pura-container-scroll> — the famous 3D flatten hero: the slotted
// screenshot/card starts tilted back in perspective (rotateX) and flattens,
// grows and lifts to face-on as the page scrolls, tied 1:1 to a scroll-driven
// timeline (animation-timeline: view()) with zero per-frame JS. An optional
// header slot drifts up in sync. Complements <pura-scroll-zoom>, which only
// scales the media without perspective rotation.
//
// Attributes:
//   tilt     — starting rotateX in degrees, 0..80 (default 20).
//   from     — starting scale, 0.1..2 (default 0.9).
//   lift     — final upward translateY in px (default 24).
//   range    — animation-range (default "cover 0% cover 60%").
//   timeline — "view" (default) | "scroll".
//
// Tokens: --pura-container-scroll-perspective (default 1000px),
//   --pura-container-scroll-radius (default 16px),
//   --pura-container-scroll-shadow (card drop shadow),
//   plus -tilt / -from / -lift mirrors of the attributes.
//
// SSR / pre-JS: the card paints in its tilted starting pose, a presentable
// static hero. Unsupported browsers and reduced motion: static flat card.
//
// Agent-native layer: each instance registers in window.__puraContainerScrolls
//   by data-pura-id with { tilt, from, lift, el }; data-pura-cs-* mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./container-scroll.meta.js";
import { containerScrollTemplate, containerScrollConfig } from "./container-scroll.template.js";

let uid = 0;

function registry() {
  return (window.__puraContainerScrolls ||= new Map());
}

class PuraContainerScroll extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-container-scroll-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = containerScrollTemplate(this);
    this.render(html, css);

    const tl = this.getAttribute("timeline") === "scroll" ? "scroll()" : "view()";
    this.style.setProperty("--pura-cs-timeline", tl);
    const range = this.getAttribute("range");
    if (range) this.style.setProperty("--pura-cs-range", range);

    const { tilt, from, lift } = containerScrollConfig(this);
    this.setAttribute("data-pura-cs-scrub", "");
    this.setAttribute("data-pura-cs-tilt", String(tilt));
    this.setAttribute("data-pura-cs-from", String(from));
    this.setAttribute("data-pura-cs-lift", String(lift));

    registry().set(this._id, { id: this._id, tilt, from, lift, el: this });
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get tilt() {
    return containerScrollConfig(this).tilt;
  }
  get from() {
    return containerScrollConfig(this).from;
  }
  get lift() {
    return containerScrollConfig(this).lift;
  }
}

define("pura-container-scroll", PuraContainerScroll, meta);
export { PuraContainerScroll };
