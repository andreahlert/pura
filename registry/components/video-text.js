// <pura-video-text> — giant typography whose fill is a playing video: an
// inline SVG <text> mask (generated in the pure template) clips the slotted
// <video> to the glyphs, Magic UI "Video Text" style. The mask is static CSS,
// so the initial paint is SSR-safe and the only motion is the video itself.
//
// Attributes:
//   text        — the string rendered as the mask (required for the effect;
//                 without it the slotted media shows full bleed).
//   font-size   — SVG length for the glyphs (default "20em").
//   font-weight — mask font weight (default "900").
//   font-family — mask font stack (default "system-ui, sans-serif").
//
// Tokens: --pura-video-text-bg (area outside the glyphs, default transparent),
//   --pura-video-text-fit (object-fit of the slotted media, default cover).
//
// Accessibility / reduced motion: the glyphs are CSS, so a visually hidden
// span carries the text and the video wrapper is aria-hidden. Under
// prefers-reduced-motion the slotted video is paused (a static masked frame);
// when the preference lifts, autoplay videos resume.
//
// Agent-native layer: each instance registers in window.__puraVideoTexts by
//   data-pura-id with { text, el }; data-pura-vt-* mirror config and state.
import { PuraElement, define } from "../base.js";
import meta from "./video-text.meta.js";
import { videoTextTemplate } from "./video-text.template.js";

let uid = 0;

function registry() {
  return (window.__puraVideoTexts ||= new Map());
}

class PuraVideoText extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-video-text-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = videoTextTemplate(this);
    this.render(html, css);

    const text = (this.getAttribute("text") || "").trim();
    this.setAttribute("data-pura-vt-text", text);
    this.setAttribute("data-pura-vt-masked", text ? "true" : "false");

    // Reduced motion: pause the slotted video (the mask itself is static).
    this._mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    this._applyMotion = () => this._syncMotion();
    this._mq.addEventListener("change", this._applyMotion);
    this.$("slot")?.addEventListener("slotchange", this._applyMotion);
    this._syncMotion();

    registry().set(this._id, { id: this._id, text, el: this });
  }

  disconnectedCallback() {
    this._mq?.removeEventListener("change", this._applyMotion);
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- internals ------------------------------------------------------------
  _syncMotion() {
    const reduce = this._mq.matches;
    for (const v of this.querySelectorAll("video")) {
      if (reduce) v.pause();
      else if (v.autoplay && v.paused) v.play().catch(() => {});
    }
    this.setAttribute("data-pura-vt-motion", reduce ? "paused" : "playing");
  }
}

define("pura-video-text", PuraVideoText, meta);
export { PuraVideoText };
