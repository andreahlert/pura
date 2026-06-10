// <pura-letter-shuffle> — Letter Shuffle. The characters of the text physically
// trade places: every letter jumps to a seeded shuffled slot, then they all
// slide back along the X axis into the correct order (the React Bits "Shuffle"
// move). Unlike <pura-scramble>, which swaps glyphs in place, here the letters
// MOVE. FLIP under the hood: the pure template renders the final order; play()
// measures each character's slot, offsets every letter to its shuffled slot via
// the first WAAPI keyframe (fill: backwards holds it through the stagger delay)
// and animates transform back to identity, letter by letter.
//
// Attributes:
//   text     — the string to shuffle (required; SSR renders it in final order).
//   trigger  — "view" (default) | "load" | "hover" | "manual".
//              hover replays on every pointerenter (nav-link move).
//   duration — slide time per letter in ms (default 600).
//   stagger  — ms between consecutive letters (default 25).
//   seed     — integer seed for the permutation (default derived from text).
//
// Methods: play(), stop(). Events: pura-letter-shuffle (composed) when all
//   letters land; detail = { id, text }.
//
// Deterministic shuffle: the permutation comes from a seeded LCG (the seed
//   attribute, or a hash of the text), never native randomness, so runs are
//   reproducible and testable.
//
// Tokens: --pura-letter-shuffle-easing (slide easing, default
//   cubic-bezier(0.22, 1, 0.36, 1)). Parts: text (the row), char (each letter).
// Accessibility & reduced motion: a visually-hidden copy carries the real
//   string and the animated row is aria-hidden; SSR, no-JS and reduced motion
//   all show the text already in the correct order, with zero movement.
//
// Agent-native layer: each instance registers in window.__puraLetterShuffles
//   by data-pura-id with { text, play, el }; data-pura-letter-shuffle-state
//   mirrors idle|playing|done, data-pura-letter-shuffle-chars the letter count
//   and data-pura-letter-shuffle-trigger the trigger mode.
import { PuraElement, define } from "../base.js";
import meta from "./letter-shuffle.meta.js";
import { letterShuffleTemplate } from "./letter-shuffle.template.js";

let uid = 0;

function registry() {
  return (window.__puraLetterShuffles ||= new Map());
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

const TRIGGERS = new Set(["view", "load", "hover", "manual"]);

// Deterministic LCG in [0, 1): same seed, same permutation (reproducible runs).
function lcg(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

class PuraLetterShuffle extends PuraElement {
  static observedAttributes = ["text"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-letter-shuffle-${uid++}`;
    this.dataset.puraId = this._id;
    this._anims = [];

    this._build();

    registry().set(this._id, {
      id: this._id,
      text: this.text,
      play: () => this.play(),
      el: this,
    });

    if (reducedMotion()) { this._state("done"); return; }

    switch (this.trigger) {
      case "load":
        this.play();
        break;
      case "hover":
        this._onEnter = () => this.play();
        this.addEventListener("pointerenter", this._onEnter);
        break;
      case "manual":
        break;
      default:
        this._observe();
    }
  }

  disconnectedCallback() {
    this.stop();
    this._io?.disconnect();
    this._io = null;
    this.removeEventListener("pointerenter", this._onEnter);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this._row) return;
    this.stop();
    this._build();
  }

  // ---- config ---------------------------------------------------------------
  get text() {
    return this.getAttribute("text") || "";
  }
  get trigger() {
    const v = this.getAttribute("trigger");
    return TRIGGERS.has(v) ? v : "view";
  }
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 600;
  }
  get stagger() {
    const n = parseFloat(this.getAttribute("stagger"));
    return Number.isFinite(n) && n >= 0 ? n : 25;
  }
  get seed() {
    const n = parseInt(this.getAttribute("seed"), 10);
    if (Number.isFinite(n)) return n;
    let h = 7;
    for (const ch of this.text) h = (h * 31 + ch.codePointAt(0)) >>> 0;
    return h;
  }

  // ---- public API -----------------------------------------------------------
  play() {
    const chars = this._chars || [];
    if (reducedMotion() || chars.length < 2 || typeof chars[0].animate !== "function") {
      this._finish();
      return;
    }
    this.stop();

    // FLIP: the DOM already sits in the final order. Measure each character's
    // slot, shuffle the slot indices with the seeded LCG (Fisher-Yates), and
    // let each letter start at its shuffled slot, then slide home along X.
    const x = chars.map((c) => c.offsetLeft);
    const rand = lcg(this.seed);
    const slot = chars.map((_, i) => i);
    for (let i = slot.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [slot[i], slot[j]] = [slot[j], slot[i]];
    }

    const easing =
      (getComputedStyle(this).getPropertyValue("--pura-letter-shuffle-easing") || "").trim() ||
      "cubic-bezier(0.22, 1, 0.36, 1)";

    this._state("playing");
    let pending = 0;
    chars.forEach((c, i) => {
      const dx = x[slot[i]] - x[i];
      const anim = c.animate(
        [{ transform: `translateX(${dx}px)` }, { transform: "translateX(0px)" }],
        {
          duration: this.duration,
          delay: i * this.stagger,
          easing,
          fill: "backwards",
        },
      );
      pending++;
      anim.onfinish = () => {
        if (--pending === 0) this._finish();
      };
      this._anims.push(anim);
    });
  }

  stop() {
    for (const a of this._anims) a.cancel();
    this._anims = [];
  }

  // ---- internals ------------------------------------------------------------
  _build() {
    const { html, css } = letterShuffleTemplate(this);
    this.render(html, css);
    this._row = this.$(".row");
    this._chars = this.$$(".ch");
    this._state("idle");
    this.setAttribute("data-pura-letter-shuffle-trigger", this.trigger);
    this.setAttribute("data-pura-letter-shuffle-chars", String(this._chars.length));
  }

  _observe() {
    if (typeof IntersectionObserver === "undefined") { this.play(); return; }
    this._io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { this.play(); this._io.disconnect(); this._io = null; break; }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    this._io.observe(this);
  }

  _finish() {
    this.stop();
    this._state("done");
    this.dispatchEvent(new CustomEvent("pura-letter-shuffle", {
      bubbles: true,
      composed: true,
      detail: { id: this._id, text: this.text },
    }));
  }

  _state(s) {
    this.setAttribute("data-pura-letter-shuffle-state", s);
  }
}

define("pura-letter-shuffle", PuraLetterShuffle, meta);
export { PuraLetterShuffle };
