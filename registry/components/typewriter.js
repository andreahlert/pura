// <pura-typewriter> — types text out character by character, optionally cycling
// through several phrases. JS drives the per-character timing (its purpose); a
// CSS-only caret blinks alongside. Accessible by design: the full text is
// rendered for no-JS and exposed via the host aria-label, while the animated
// span is aria-hidden so screen readers are not spammed per keystroke.
//
// Attributes:
//   text       — the string to type (single phrase).
//   phrases    — "|"-separated phrases to cycle through (overrides text).
//   speed      — ms per character while typing (default 55).
//   delete-speed — ms per character while deleting (default 30).
//   pause      — ms to hold a completed phrase before deleting (default 1400).
//   caret      — boolean. Show a blinking caret.
//   loop       — boolean. Keep cycling phrases (delete + retype).
//   start      — "view" (default) | "load" | "manual".
//
// Parts: text — the typed span; caret — the blinking caret.
// Events: pura-typewriter (composed, bubbles) when a phrase finishes typing;
//   detail = { id, phrase, index }.
// Methods: start(), stop().
//
// Reduced motion: renders the first (or only) phrase in full, no typing.
//
// Agent-native layer: registers in window.__puraTypewriters keyed by
//   data-pura-id; data-pura-typewriter-text mirrors the current visible text.
import { PuraElement, define } from "../base.js";
import meta from "./typewriter.meta.js";
import { typewriterTemplate, readPhrases } from "./typewriter.template.js";

let uid = 0;

function registry() {
  return (window.__puraTypewriters ||= new Map());
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

class PuraTypewriter extends PuraElement {
  static observedAttributes = ["text", "phrases"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-typewriter-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = typewriterTemplate(this);
    this.render(html, css);
    this._typed = this.$(".typed");
    this._setText(this.phrases[0] || "");

    const mode = this.getAttribute("start") || "view";
    if (mode === "manual") return;
    if (reducedMotion()) return; // leave full first phrase rendered
    if (mode === "load" || !("IntersectionObserver" in window)) {
      this.start();
      return;
    }
    this._io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            this.start();
            this._io?.disconnect();
            this._io = null;
          }
        }
      },
      { threshold: 0.4 }
    );
    this._io.observe(this);
  }

  disconnectedCallback() {
    this.stop();
    this._io?.disconnect();
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this._typed) return;
    // Restart from the new content.
    this.stop();
    this._index = 0;
    this._setText("");
    if (!reducedMotion()) this.start();
    else this._setText(this.phrases[0] || "");
  }

  get phrases() {
    return readPhrases(this);
  }
  get speed() {
    const n = parseFloat(this.getAttribute("speed"));
    return Number.isFinite(n) && n >= 0 ? n : 55;
  }
  get deleteSpeed() {
    const n = parseFloat(this.getAttribute("delete-speed"));
    return Number.isFinite(n) && n >= 0 ? n : 30;
  }
  get pauseMs() {
    const n = parseFloat(this.getAttribute("pause"));
    return Number.isFinite(n) && n >= 0 ? n : 1400;
  }
  get loop() {
    return this.hasAttribute("loop");
  }

  start() {
    if (reducedMotion()) {
      this._setText(this.phrases[0] || "");
      return;
    }
    this.stop();
    this._index = this._index || 0;
    this._setText("");
    this._typeIn(this.phrases[this._index] || "", 0);
  }

  stop() {
    if (this._timer) clearTimeout(this._timer);
    this._timer = null;
  }

  _typeIn(phrase, pos) {
    this._setText(phrase.slice(0, pos));
    if (pos < phrase.length) {
      this._timer = setTimeout(() => this._typeIn(phrase, pos + 1), this.speed);
      return;
    }
    this._emit(phrase);
    const phrases = this.phrases;
    if (phrases.length <= 1 && !this.loop) return;
    this._timer = setTimeout(() => this._typeOut(phrase, phrase.length), this.pauseMs);
  }

  _typeOut(phrase, pos) {
    this._setText(phrase.slice(0, pos));
    if (pos > 0) {
      this._timer = setTimeout(() => this._typeOut(phrase, pos - 1), this.deleteSpeed);
      return;
    }
    const phrases = this.phrases;
    this._index = (this._index + 1) % phrases.length;
    if (this._index === 0 && !this.loop) return;
    this._typeIn(phrases[this._index] || "", 0);
  }

  _emit(phrase) {
    this.dispatchEvent(
      new CustomEvent("pura-typewriter", {
        bubbles: true,
        composed: true,
        detail: { id: this._id, phrase, index: this._index },
      })
    );
  }

  _setText(text) {
    if (this._typed) this._typed.textContent = text;
    this.setAttribute("aria-label", text);
    this.setAttribute("data-pura-typewriter-text", text);
  }
}


define("pura-typewriter", PuraTypewriter, meta);
export { PuraTypewriter };
