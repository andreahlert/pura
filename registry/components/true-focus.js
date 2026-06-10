// <pura-true-focus> — the React Bits "True Focus" text effect: one word at a
// time stays in sharp focus inside an animated corner-bracket viewfinder while
// every other word blurs out, cycling through the sentence.
//
// The slotted text stays in the light DOM as the accessible copy; JS splits it
// into aria-hidden word spans (same pattern as <pura-split>). Blur is plain
// CSS keyed off the active index; the viewfinder moves between words with a
// FLIP step animated via WAAPI (measure where the frame is, write the target
// rect inline, animate top/left/width/height between the two).
//
// Attributes:
//   interval — ms each word stays focused while auto-cycling (default 1500).
//   duration — frame travel and blur transition ms (default 400).
//   blur     — blur radius in px for unfocused words (default 5).
//   manual   — boolean; focus follows pointer hover instead of auto-cycling.
//
// Events: focuschange — fired with { index, word } whenever focus moves.
// Parts: wrap, words, word, frame, corner.
// Tokens: --pura-true-focus-blur, --pura-true-focus-color,
//   --pura-true-focus-corner, --pura-true-focus-thickness,
//   --pura-true-focus-radius, --pura-true-focus-glow, --pura-true-focus-dur.
// SSR / pre-JS: the sentence renders sharp with no frame. Reduced motion:
//   blur is disabled (CSS gate), auto-cycling never starts and the frame sits
//   on the first word; hover in manual mode still moves it, instantly.
//
// Agent-native layer: each instance registers in window.__puraTrueFocuss by
//   data-pura-id with { index, words, focusWord, el }; data-pura-true-focus-*
//   mirror state (ready, mode, words, index, active).
import { PuraElement, define } from "../base.js";
import meta from "./true-focus.meta.js";
import { trueFocusTemplate } from "./true-focus.template.js";

let uid = 0;

function registry() {
  return (window.__puraTrueFocuss ||= new Map());
}

const PAD = 6; // px the frame extends past the focused word on each side
const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

class PuraTrueFocus extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-true-focus-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = trueFocusTemplate(this);
    this.render(html, css);

    this._words = [];
    this._index = -1;
    this._placed = false;
    this._onResize = () => this._placeFrame(true);
    this._build();
  }

  disconnectedCallback() {
    clearInterval(this._timer);
    this._timer = null;
    window.removeEventListener("resize", this._onResize);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get interval() {
    const n = parseFloat(this.getAttribute("interval"));
    return Number.isFinite(n) && n > 0 ? n : 1500;
  }
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 400;
  }
  get blur() {
    const n = parseFloat(this.getAttribute("blur"));
    return Number.isFinite(n) && n >= 0 ? n : 5;
  }
  get manual() {
    return this.hasAttribute("manual");
  }

  // ---- public API -----------------------------------------------------------
  get index() {
    return this._index;
  }
  get words() {
    return this._words.length;
  }
  focusWord(i) {
    const len = this._words.length;
    if (!len) return;
    const n = ((Math.trunc(i) % len) + len) % len;
    if (n === this._index) return;
    this._index = n;
    this._words.forEach((w, wi) => w.toggleAttribute("data-active", wi === n));
    this.setAttribute("data-pura-true-focus-index", String(n));
    this._placeFrame(false);
    this.dispatchEvent(new CustomEvent("focuschange", {
      detail: { index: n, word: this._words[n].textContent },
      bubbles: true,
      composed: true,
    }));
  }

  // ---- internals ------------------------------------------------------------
  async _build() {
    const text = (this.textContent || "").replace(/\s+/g, " ").trim();
    if (!text) return;

    this.style.setProperty("--pura-true-focus-blur", `${this.blur}px`);
    this.style.setProperty("--pura-true-focus-dur", `${this.duration}ms`);

    const box = this.$(".words");
    const words = text.split(" ");
    words.forEach((w, wi) => {
      const span = document.createElement("span");
      span.className = "word";
      span.setAttribute("part", "word");
      span.textContent = w;
      if (this.manual) span.addEventListener("pointerenter", () => this.focusWord(wi));
      box.appendChild(span);
      if (wi < words.length - 1) box.appendChild(document.createTextNode(" "));
      this._words.push(span);
    });

    // Wait for fonts so the frame measurement matches the final layout.
    if (typeof document !== "undefined" && document.fonts?.ready) {
      try { await document.fonts.ready; } catch {} // best-effort
    }
    if (!this.isConnected) return;

    this.setAttribute("data-pura-true-focus-ready", "");
    this.setAttribute("data-pura-true-focus-words", String(this._words.length));
    this.setAttribute("data-pura-true-focus-mode", this.manual ? "manual" : "auto");

    registry().set(this._id, {
      id: this._id,
      words: this._words.length,
      index: () => this._index,
      focusWord: (i) => this.focusWord(i),
      el: this,
    });

    this.focusWord(0);
    this.setAttribute("data-pura-true-focus-active", "");

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!this.manual && !reduce) {
      this._timer = setInterval(() => this.focusWord(this._index + 1), this.interval);
    }
    window.addEventListener("resize", this._onResize);
  }

  // Move the viewfinder to the active word. FLIP: read the frame's current
  // rect (First), write the target inline (Last), animate between via WAAPI.
  _placeFrame(instant) {
    const word = this._words[this._index];
    const frame = this.$(".frame");
    const wrap = this.$(".wrap");
    if (!word || !frame || !wrap) return;

    const w = word.getBoundingClientRect();
    const c = wrap.getBoundingClientRect();
    const to = {
      top: w.top - c.top - PAD,
      left: w.left - c.left - PAD,
      width: w.width + 2 * PAD,
      height: w.height + 2 * PAD,
    };
    const f = frame.getBoundingClientRect();
    const from = {
      top: f.top - c.top,
      left: f.left - c.left,
      width: f.width,
      height: f.height,
    };
    const first = !this._placed;
    this._placed = true;

    frame.style.top = `${to.top}px`;
    frame.style.left = `${to.left}px`;
    frame.style.width = `${to.width}px`;
    frame.style.height = `${to.height}px`;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (first || instant || reduce || typeof frame.animate !== "function") return;
    frame.animate(
      [
        { top: `${from.top}px`, left: `${from.left}px`, width: `${from.width}px`, height: `${from.height}px` },
        { top: `${to.top}px`, left: `${to.left}px`, width: `${to.width}px`, height: `${to.height}px` },
      ],
      { duration: this.duration, easing: EASE },
    );
  }
}

define("pura-true-focus", PuraTrueFocus, meta);
export { PuraTrueFocus };
