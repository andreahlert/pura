// <pura-wavy-text> — the classic wavy footer / playful CTA text: each character
// bobs on a continuous sine wave, phase-shifted per character, so the string
// rolls like a flag. 100% CSS keyframes (the pure template emits per-character
// spans with an --i index and an incremental negative animation-delay), zero
// per-frame JS.
//
// Attributes:
//   text      — string to animate. When absent, the slotted text is lifted into
//               it on connect so the pure template can split characters.
//   amplitude — CSS length for the bob height (default 0.3em).
//   duration  — seconds for one full wave cycle (default 1.6).
//   stagger   — ms of phase shift between adjacent characters (default 90).
//
// Tokens: --pura-wavy-text-amplitude, --pura-wavy-text-duration,
//   --pura-wavy-text-stagger (attributes write the same properties).
// Parts: wave, word, char, text.
//
// Accessibility & SSR: the animated spans are aria-hidden with a visually
// hidden accessible copy of the full string; words wrap as blocks so layout
// survives narrow containers. Pre-JS with a text attribute the wave runs from
// first paint; with only slotted text it renders statically.
// Reduced motion: the animation is gated behind prefers-reduced-motion:
// no-preference; under reduce the text sits still at the baseline.
//
// Agent-native layer: each instance registers in window.__puraWavyTexts by
//   data-pura-id with { text, chars, el }; data-pura-wavy-* mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./wavy-text.meta.js";
import { wavyTextTemplate } from "./wavy-text.template.js";

let uid = 0;

function registry() {
  return (window.__puraWavyTexts ||= new Map());
}

class PuraWavyText extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-wavy-text-${uid++}`;
    this.dataset.puraId = this._id;

    // Lift slotted text into the attribute so the pure template can split it
    // into per-character spans (the slot is then hidden by the template CSS).
    if (!this.getAttribute("text")) {
      const t = (this.textContent || "").replace(/\s+/g, " ").trim();
      if (t) this.setAttribute("text", t);
    }

    const { html, css } = wavyTextTemplate(this);
    this.render(html, css);

    const chars = this.text.replace(/\s+/g, "").length;
    this.setAttribute("data-pura-wavy-chars", String(chars));
    this.setAttribute("data-pura-wavy-duration", String(this.duration));
    this.setAttribute("data-pura-wavy-stagger", String(this.stagger));

    registry().set(this._id, { id: this._id, text: this.text, chars, el: this });
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get text() {
    return this.getAttribute("text") || "";
  }
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 1.6;
  }
  get stagger() {
    const n = parseFloat(this.getAttribute("stagger"));
    return Number.isFinite(n) && n >= 0 ? n : 90;
  }
}

define("pura-wavy-text", PuraWavyText, meta);
export { PuraWavyText };
