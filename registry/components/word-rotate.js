// <pura-word-rotate> — cycles one word inside a sentence with an animated swap
// (slide, flip or fade) while the container width FLIP-animates to fit the next
// word. Unlike <pura-typewriter>, which types phrases out character by character,
// this is a whole-word swap. SSR renders every word in the DOM with only the
// first one visible; the client drives the swap with WAAPI.
//
// Attributes:
//   words    — "|"-separated words to cycle through.
//   effect   — "slide" (default) | "flip" | "fade".
//   interval — ms a word stays before rotating (default 2500).
//   duration — swap animation time in ms (default 500).
//   start    — "view" (default) | "load" | "manual".
//
// Parts: rotor — the clipping word container; word — each word span.
// Events: pura-word-rotate (composed, bubbles) after each swap;
//   detail = { id, word, index }.
// Methods: start(), stop(), next().
//
// Tokens: --pura-word-rotate-color, --pura-word-rotate-weight,
//   --pura-word-rotate-perspective (flip depth, default 400px).
// Reduced motion (or no WAAPI): words still rotate on the interval but swap
//   instantly, with no animation.
//
// Agent-native layer: each instance registers in window.__puraWordRotates by
//   data-pura-id with { id, el, start, stop, next }; the current state is
//   mirrored in data-pura-word-rotate-word / data-pura-word-rotate-index.
import { PuraElement, define } from "../base.js";
import meta from "./word-rotate.meta.js";
import { wordRotateTemplate, readWords } from "./word-rotate.template.js";

let uid = 0;

function registry() {
  return (window.__puraWordRotates ||= new Map());
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

const FRAMES = {
  slide: {
    out: [
      { transform: "translateY(0)", opacity: 1 },
      { transform: "translateY(-110%)", opacity: 0 },
    ],
    in: [
      { transform: "translateY(110%)", opacity: 0 },
      { transform: "translateY(0)", opacity: 1 },
    ],
  },
  flip: {
    out: [
      { transform: "rotateX(0deg)", opacity: 1 },
      { transform: "rotateX(90deg)", opacity: 0 },
    ],
    in: [
      { transform: "rotateX(-90deg)", opacity: 0 },
      { transform: "rotateX(0deg)", opacity: 1 },
    ],
  },
  fade: {
    out: [{ opacity: 1 }, { opacity: 0 }],
    in: [{ opacity: 0 }, { opacity: 1 }],
  },
};

class PuraWordRotate extends PuraElement {
  static observedAttributes = ["words"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-word-rotate-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = wordRotateTemplate(this);
    this.render(html, css);
    this._index = 0;
    this._sync();

    registry().set(this._id, {
      id: this._id,
      el: this,
      start: () => this.start(),
      stop: () => this.stop(),
      next: () => this.next(),
    });

    const mode = this.getAttribute("start") || "view";
    if (mode === "manual") return;
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
      { threshold: 0.2 },
    );
    this._io.observe(this);
  }

  disconnectedCallback() {
    this.stop();
    this._io?.disconnect();
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot?.childNodes.length) return;
    const running = !!this._timer;
    this.stop();
    const { html, css } = wordRotateTemplate(this);
    this.render(html, css);
    this._index = 0;
    this._sync();
    if (running) this.start();
  }

  // ---- config ---------------------------------------------------------------
  get words() {
    return readWords(this);
  }
  get interval() {
    const n = parseFloat(this.getAttribute("interval"));
    return Number.isFinite(n) && n > 0 ? n : 2500;
  }
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 500;
  }
  get effect() {
    const e = this.getAttribute("effect");
    return e === "flip" || e === "fade" ? e : "slide";
  }

  // ---- public API -----------------------------------------------------------
  start() {
    this.stop();
    if (this.words.length < 2) return;
    this._timer = setTimeout(() => {
      this.next();
      if (this._timer) this.start();
    }, this.interval);
  }

  stop() {
    if (this._timer) clearTimeout(this._timer);
    this._timer = null;
  }

  next() {
    const words = this.$$(".word");
    if (words.length < 2 || this._busy) return;
    const rotor = this.$(".rotor");
    const cur = words[this._index];
    this._index = (this._index + 1) % words.length;
    const nxt = words[this._index];

    if (reducedMotion() || typeof rotor.animate !== "function") {
      cur.removeAttribute("data-active");
      nxt.setAttribute("data-active", "");
      this._sync();
      this._emit();
      return;
    }

    // FLIP: measure the rotor around the swap, then animate the width delta
    // while the words cross-fade/slide/flip via WAAPI.
    const w0 = rotor.getBoundingClientRect().width;
    cur.removeAttribute("data-active");
    cur.classList.add("out");
    nxt.setAttribute("data-active", "");
    const w1 = rotor.getBoundingClientRect().width;

    this._busy = true;
    const opts = { duration: this.duration, easing: EASE };
    const frames = FRAMES[this.effect];
    rotor.animate([{ width: `${w0}px` }, { width: `${w1}px` }], opts);
    const outAnim = cur.animate(frames.out, { ...opts, fill: "forwards" });
    const inAnim = nxt.animate(frames.in, opts);
    inAnim.onfinish = () => {
      cur.classList.remove("out");
      outAnim.cancel();
      this._busy = false;
    };

    this._sync();
    this._emit();
  }

  // ---- internals ------------------------------------------------------------
  _sync() {
    const word = this.words[this._index] || "";
    const a11y = this.$(".a11y");
    if (a11y) a11y.textContent = word;
    this.setAttribute("data-pura-word-rotate-word", word);
    this.setAttribute("data-pura-word-rotate-index", String(this._index));
  }

  _emit() {
    this.dispatchEvent(
      new CustomEvent("pura-word-rotate", {
        bubbles: true,
        composed: true,
        detail: { id: this._id, word: this.words[this._index] || "", index: this._index },
      }),
    );
  }
}

define("pura-word-rotate", PuraWordRotate, meta);
export { PuraWordRotate };
