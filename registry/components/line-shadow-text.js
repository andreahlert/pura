// <pura-line-shadow-text> — display text with a hard offset shadow made of
// diagonal stripes that slide behind the characters in a continuous CSS loop;
// editorial / brutalist look, zero per-frame JS. The shadow is an aria-hidden
// duplicate of the text painted with a diagonal gradient tile clipped to the
// glyphs (background-clip: text); only background-position animates.
//
// Attributes:
//   text         — shadow copy text. When set, the striped shadow paints on
//                  SSR; when absent the client mirrors the slotted text.
//   shadow-color — stripe color (default currentColor).
//   speed        — seconds for one full stripe loop (number, default 30).
//
// Tokens: --pura-line-shadow-text-color (stripe color),
//   --pura-line-shadow-text-offset (shadow offset, default 0.04em),
//   --pura-line-shadow-text-size (stripe tile size, default 0.06em),
//   --pura-line-shadow-text-speed (loop duration, default 30s).
//
// Reduced motion: stripes render as a static hard shadow, no movement.
// A11y: the slotted original stays the accessible text; the shadow copy is
//   aria-hidden and pointer-events: none.
//
// Agent-native layer: each instance registers in window.__puraLineShadowTexts
// by data-pura-id with { id, text, speed, el }; data-pura-lst-* attributes
// mirror live state on the host.
import { PuraElement, define } from "../base.js";
import meta from "./line-shadow-text.meta.js";
import { lineShadowTextTemplate } from "./line-shadow-text.template.js";

let uid = 0;

// Lazily-created global registry so agents can enumerate every instance.
// Maps data-pura-id -> { id, text, speed, el }.
function registry() {
  return (window.__puraLineShadowTexts ||= new Map());
}

class PuraLineShadowText extends PuraElement {
  static observedAttributes = ["text", "shadow-color", "speed"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-line-shadow-text-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = lineShadowTextTemplate(this);
    this.render(html, css);

    this._shadowCopy = this.$(".shadow");
    this._slot = this.$("slot");
    // Keep the aria-hidden shadow copy in sync with the slotted text so the
    // stripes always trace the visible characters.
    this._slot.addEventListener("slotchange", () => this._syncShadowText());

    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._shadowCopy) this._sync();
  }

  // ---- config ---------------------------------------------------------------
  get speed() {
    const n = parseFloat(this.getAttribute("speed"));
    return Number.isFinite(n) && n > 0 ? n : 30;
  }

  get shadowColor() {
    return this.getAttribute("shadow-color") || "";
  }

  // The text the shadow copy currently traces.
  get text() {
    return this._shadowCopy ? this._shadowCopy.textContent : (this.getAttribute("text") || "");
  }

  // ---- internals ------------------------------------------------------------
  // The `text` attribute wins (it is also the SSR path); otherwise mirror the
  // slotted light-DOM text into the aria-hidden shadow copy.
  _syncShadowText() {
    const attr = this.getAttribute("text");
    this._shadowCopy.textContent = attr != null ? attr : (this.textContent || "").trim();
    this._reflectAgentState();
  }

  _sync() {
    this.style.setProperty("--pura-line-shadow-text-speed", `${this.speed}s`);
    if (this.shadowColor) {
      this.style.setProperty("--pura-line-shadow-text-color", this.shadowColor);
    } else {
      this.style.removeProperty("--pura-line-shadow-text-color");
    }
    this._syncShadowText();
    registry().set(this._id, { id: this._id, text: this.text, speed: this.speed, el: this });
  }

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState() {
    this.setAttribute("data-pura-lst-speed", String(this.speed));
    this.setAttribute("data-pura-lst-text", this._shadowCopy.textContent);
  }
}

define("pura-line-shadow-text", PuraLineShadowText, meta);
export { PuraLineShadowText };
