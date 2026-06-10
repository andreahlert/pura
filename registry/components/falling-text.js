// <pura-falling-text> - the React Bits "Falling Text" move: on trigger (hover,
// click or scroll into view) every word of the sentence lets go, falls under
// gravity, bounces off the container floor and stacks into a pile. The physics
// is a minimal in-house 2D loop (gravity, restitution, wall and floor collision,
// crude stacking) driven by rAF, updating each word span's transform. No canvas,
// no engine, zero dependencies.
//
// Attributes:
//   trigger     - "hover" (default) | "click" | "view". What starts the drop.
//   gravity     - gravity multiplier (default 1; 1 = 2200 px/s^2).
//   restitution - bounce energy kept on impact, 0..1 (default 0.45).
//   scatter     - horizontal impulse multiplier at release (default 1).
//
// Tokens: --pura-falling-text-height (stage min-height so words have room to
//   fall), --pura-falling-text-color (word color, defaults to inherit).
// Parts: stage, text, word.
//
// SSR / pre-JS: the pure template keeps the slotted sentence visible and intact.
// Reduced motion: drop() is a no-op, nothing ever falls; a CSS guard also pins
// word transforms. The original text always stays readable (the animated copy is
// aria-hidden, the slotted source is the accessible one).
//
// Determinism: per-word release velocities come from a seeded LCG (seeded by the
// text itself), so every run of the same sentence falls identically.
//
// Agent-native layer: each instance registers in window.__puraFallingTexts by
//   data-pura-id with { id, trigger, words, drop, reset, el }; the host mirrors
//   state in data-pura-falling-state ("ready" | "falling" | "settled"),
//   data-pura-falling-trigger and data-pura-falling-words.
import { PuraElement, define } from "../base.js";
import meta from "./falling-text.meta.js";
import { fallingTextTemplate } from "./falling-text.template.js";

let uid = 0;

function registry() {
  return (window.__puraFallingTexts ||= new Map());
}

const TRIGGERS = new Set(["hover", "click", "view"]);

// Deterministic LCG in [0, 1): same sentence, same fall, every run.
function lcg(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

class PuraFallingText extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-falling-text-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = fallingTextTemplate(this);
    this.render(html, css);
    this._stage = this.$(".stage");
    this._src = this.$(".src");

    this._text = (this.textContent || "").replace(/\s+/g, " ").trim();
    this._words = [];
    this._bodies = [];
    this._raf = 0;
    this._last = 0;

    this._build();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    this._raf = 0;
    this._io?.disconnect();
    this._io = null;
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get trigger() {
    const v = this.getAttribute("trigger");
    return TRIGGERS.has(v) ? v : "hover";
  }
  get gravity() {
    const n = parseFloat(this.getAttribute("gravity"));
    return Number.isFinite(n) && n > 0 ? n : 1;
  }
  get restitution() {
    const n = parseFloat(this.getAttribute("restitution"));
    return Number.isFinite(n) && n >= 0 && n <= 1 ? n : 0.45;
  }
  get scatter() {
    const n = parseFloat(this.getAttribute("scatter"));
    return Number.isFinite(n) && n >= 0 ? n : 1;
  }

  // ---- public API -----------------------------------------------------------
  get state() {
    return this.getAttribute("data-pura-falling-state") || "idle";
  }

  // Release the words. No-op unless ready, and never under reduced motion.
  drop() {
    if (this.state !== "ready" || !this._words.length) return;
    if (typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sw = this._stage.clientWidth;
    const sh = this._stage.clientHeight;
    if (!sw || !sh) return;

    // Freeze the stage height so the layout cannot collapse mid-fall.
    this._stage.style.minHeight = `${sh}px`;

    const rand = lcg(this._text.length * 31 + this._words.length * 7 + 13);
    this._bodies = this._words.map((el) => ({
      el,
      x0: el.offsetLeft, y0: el.offsetTop,
      x: el.offsetLeft, y: el.offsetTop,
      w: el.offsetWidth, h: el.offsetHeight,
      vx: (rand() * 2 - 1) * 90 * this.scatter,
      vy: -(30 + rand() * 70), // small upward pop before the fall
      a: 0,
      va: (rand() * 2 - 1) * 2.4,
      resting: false,
    }));

    this._setState("falling");
    this._emit("fall");
    this._last = 0;
    this._raf = requestAnimationFrame((t) => this._step(t));
  }

  // Put every word back in flow and re-arm the trigger.
  reset() {
    cancelAnimationFrame(this._raf);
    this._raf = 0;
    this._last = 0;
    for (const b of this._bodies) b.el.style.transform = "";
    this._bodies = [];
    this._stage.style.minHeight = "";
    this._setState("ready");
    if (this.trigger === "view" && !this._io) this._observe();
  }

  // ---- internals ------------------------------------------------------------
  _build() {
    if (!this._text) return;
    this._src.textContent = "";
    const words = this._text.split(" ");
    words.forEach((w, i) => {
      const span = document.createElement("span");
      span.className = "word";
      span.setAttribute("part", "word");
      span.textContent = w;
      this._src.appendChild(span);
      if (i < words.length - 1) this._src.appendChild(document.createTextNode(" "));
      this._words.push(span);
    });

    this.setAttribute("data-pura-falling-ready", "");
    this.setAttribute("data-pura-falling-trigger", this.trigger);
    this.setAttribute("data-pura-falling-words", String(this._words.length));
    this._setState("ready");

    registry().set(this._id, {
      id: this._id, trigger: this.trigger, words: this._words.length,
      drop: () => this.drop(), reset: () => this.reset(), el: this,
    });

    this._arm();
  }

  _arm() {
    const t = this.trigger;
    if (t === "hover") {
      this._stage.addEventListener("mouseenter", () => this.drop());
    } else if (t === "click") {
      this._stage.addEventListener("click", () => this.drop());
    } else {
      this._observe();
    }
  }

  _observe() {
    if (typeof IntersectionObserver === "undefined") { this.drop(); return; }
    this._io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          this.drop();
          this._io.disconnect();
          this._io = null;
          break;
        }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.2 });
    this._io.observe(this);
  }

  // One physics frame: integrate, collide with walls and the landing surface,
  // bounce with restitution, come to rest below a velocity threshold.
  _step(t) {
    if (!this._last) this._last = t;
    const dt = Math.min((t - this._last) / 1000, 1 / 30);
    this._last = t;

    const g = 2200 * this.gravity;
    const rest = this.restitution;
    const sw = this._stage.clientWidth;
    const sh = this._stage.clientHeight;
    let active = 0;

    for (const b of this._bodies) {
      if (b.resting) continue;
      const prevBottom = b.y + b.h;

      b.vy += g * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.a = Math.max(-0.45, Math.min(0.45, b.a + b.va * dt));

      // Side walls.
      if (b.x < 0) { b.x = 0; b.vx = -b.vx * rest; }
      else if (b.x + b.w > sw) { b.x = sw - b.w; b.vx = -b.vx * rest; }

      // Landing surface: the stage floor, or the top of a resting word the
      // body overlaps and was above last frame. That is the whole stacking model.
      const floor = this._floorFor(b, prevBottom, sh);
      if (b.y + b.h >= floor) {
        b.y = floor - b.h;
        if (Math.abs(b.vy) < 60) {
          b.vx = 0; b.vy = 0; b.va = 0;
          b.resting = true;
        } else {
          b.vy = -b.vy * rest;
          b.vx *= 0.82;
          b.va *= 0.7;
        }
      }

      if (!b.resting) active++;
      b.el.style.transform =
        `translate(${(b.x - b.x0).toFixed(2)}px, ${(b.y - b.y0).toFixed(2)}px) rotate(${b.a.toFixed(3)}rad)`;
    }

    if (active) {
      this._raf = requestAnimationFrame((tt) => this._step(tt));
    } else {
      this._raf = 0;
      this._setState("settled");
      this._emit("settle");
    }
  }

  _floorFor(b, prevBottom, sh) {
    let floor = sh;
    for (const o of this._bodies) {
      if (o === b || !o.resting) continue;
      const overlap = Math.min(b.x + b.w, o.x + o.w) - Math.max(b.x, o.x);
      if (overlap > Math.min(b.w, o.w) * 0.35 && prevBottom <= o.y + 2 && o.y < floor) {
        floor = o.y;
      }
    }
    return floor;
  }

  _setState(s) {
    this.setAttribute("data-pura-falling-state", s);
  }

  _emit(kind) {
    this.dispatchEvent(new CustomEvent(`pura-falling-text:${kind}`, {
      bubbles: true,
      composed: true,
      detail: { id: this._id, words: this._words.length },
    }));
  }
}

define("pura-falling-text", PuraFallingText, meta);
export { PuraFallingText };
