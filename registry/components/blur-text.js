// <pura-blur-text> — text that enters word by word (or character by character)
// out of a blur: each unit starts blurred, transparent and slightly offset,
// then sharpens into place with a stagger. The React Bits "Blur Text" /
// Magic UI "Blur Fade" hero move, done with plain CSS keyframes: the script
// only splits the text and flips one attribute, the motion itself is
// zero-per-frame-JS.
//
// Accessibility & SSR: the original text stays in the light DOM as the
// accessible copy; the animated per-unit spans are aria-hidden. Before the
// script runs the slot is visible, so the text is sharp and readable with no
// JS and on the server; once the split is built the host gets
// data-pura-blur-text-ready and the animated copy takes over.
//
// Attributes:
//   by        — "word" (default) | "char": unit to split and stagger.
//   stagger   — ms between consecutive units (default 60 word, 35 char).
//   trigger   — "view" (default) reveals when scrolled into view; "load"
//               reveals on connect.
//   blur      — starting blur radius in px (default 8).
//   duration  — per-unit animation duration in ms (default 600).
//   direction — "up" (default) units settle upward into place; "down" they
//               settle downward.
//
// Tokens: --pura-blur-text-blur, --pura-blur-text-distance,
//   --pura-blur-text-duration, --pura-blur-text-ease.
// Parts: text — the animated container; unit — each animated word/char span.
// Reduced motion: units render sharp and in place, no animation.
//
// Agent-native layer: each instance registers in window.__puraBlurTexts by
//   data-pura-id with { by, units, replay, el }; data-pura-blur-text-* mirror
//   config and state (ready / in / by / units / trigger).
import { PuraElement, define } from "../base.js";
import meta from "./blur-text.meta.js";
import { blurTextTemplate } from "./blur-text.template.js";

let uid = 0;

function registry() {
  return (window.__puraBlurTexts ||= new Map());
}

const MODES = new Set(["word", "char"]);

class PuraBlurText extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-blur-text-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = blurTextTemplate(this);
    this.render(html, css);
    this._src = this.$(".src");

    this._text = (this.textContent || "").replace(/\s+/g, " ").trim();
    this._units = [];

    this._build();
  }

  disconnectedCallback() {
    this._io?.disconnect();
    this._io = null;
    if (registry().get(this._id) === this._entry) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get by() {
    const v = this.getAttribute("by");
    return MODES.has(v) ? v : "word";
  }
  get trigger() {
    return this.getAttribute("trigger") === "load" ? "load" : "view";
  }
  get stagger() {
    const n = parseFloat(this.getAttribute("stagger"));
    if (Number.isFinite(n) && n >= 0) return n;
    return this.by === "char" ? 35 : 60;
  }

  // ---- public API -----------------------------------------------------------
  get units() {
    return this._units.length;
  }
  replay() {
    this.removeAttribute("data-pura-blur-text-in");
    // Force reflow so the removal takes before re-adding plays again.
    void this.offsetWidth;
    requestAnimationFrame(() => this.setAttribute("data-pura-blur-text-in", ""));
  }

  // ---- internals ------------------------------------------------------------
  _build() {
    if (!this._text) return;

    // Forward numeric attributes into the tokens the keyframes read.
    const blur = parseFloat(this.getAttribute("blur"));
    if (Number.isFinite(blur) && blur >= 0) {
      this.style.setProperty("--pura-blur-text-blur", `${blur}px`);
    }
    const dur = parseFloat(this.getAttribute("duration"));
    if (Number.isFinite(dur) && dur > 0) {
      this.style.setProperty("--pura-blur-text-duration", `${dur}ms`);
    }

    const by = this.by;
    const stagger = this.stagger;
    this._src.textContent = "";
    const words = this._text.split(" ").filter(Boolean);
    let i = 0;
    words.forEach((w, wi) => {
      if (by === "word") {
        i = this._appendUnit(w, i, stagger);
      } else {
        for (const ch of w) i = this._appendUnit(ch, i, stagger);
      }
      if (wi < words.length - 1) this._src.appendChild(document.createTextNode(" "));
    });

    this.setAttribute("data-pura-blur-text-ready", "");
    this.setAttribute("data-pura-blur-text-by", by);
    this.setAttribute("data-pura-blur-text-units", String(this._units.length));
    this.setAttribute("data-pura-blur-text-trigger", this.trigger);

    this._entry = {
      id: this._id, by, units: this._units.length,
      replay: () => this.replay(), el: this,
    };
    registry().set(this._id, this._entry);

    this.trigger === "load" ? this._reveal() : this._observe();
  }

  // Append one animated unit; stagger its delay by index. Returns next index.
  _appendUnit(text, i, stagger) {
    const span = document.createElement("span");
    span.className = "unit";
    span.setAttribute("part", "unit");
    span.textContent = text;
    span.style.setProperty("--d", `${i * stagger}ms`);
    this._src.appendChild(span);
    this._units.push(span);
    return i + 1;
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
    requestAnimationFrame(() => this.setAttribute("data-pura-blur-text-in", ""));
  }
}

define("pura-blur-text", PuraBlurText, meta);
export { PuraBlurText };
