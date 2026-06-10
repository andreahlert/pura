// <pura-confetti> — the celebration burst: click the slotted trigger (or call
// fire()) and a cannon of confetti launches from it, scattering across the
// page on a full-viewport canvas overlay with simple physics (gravity, drift,
// decay, tumble). Complements fly-to-cart as the success / achievement /
// checkout celebration.
//
// Attributes:
//   trigger  — "click" (default) | "manual" (only fire() launches a burst).
//   count    — particles per burst (default 80).
//   angle    — launch direction in degrees, 90 = straight up (default 90).
//   spread   — cone width in degrees around the angle (default 70).
//   velocity — initial particle speed (default 14).
//   duration — particle lifetime in ms (default 2500).
//   colors   — comma-separated CSS colors; overrides the token palette.
//
// Events:
//   fire — a burst launched (bubbles, composed).
//   done — all particles settled (bubbles, composed).
//
// Tokens: --pura-confetti-color-1 .. --pura-confetti-color-5 (palette),
//   --pura-confetti-size (base particle size, default 8px),
//   --pura-confetti-z (overlay z-index, default 2147483646).
// SSR / pre-JS: just the slotted trigger; the canvas overlay stays hidden.
// Reduced motion: no burst; "fire" and "done" still dispatch so app logic
//   (badges, counters, analytics) keeps working.
//
// Agent-native layer: each instance registers in window.__puraConfettis by
//   data-pura-id with { id, trigger, count, fire, el }; data-pura-confetti-*
//   mirror config and firing state.
import { PuraElement, define } from "../base.js";
import meta from "./confetti.meta.js";
import { confettiTemplate } from "./confetti.template.js";

let uid = 0;

const GRAVITY = 0.35; // px per tick², one tick ≈ one 60fps frame
const AIR_DRAG = 0.99; // per-tick velocity decay
const FADE_TICKS = 20; // fade-out window at the end of a particle's life

function registry() {
  return (window.__puraConfettis ||= new Map());
}

class PuraConfetti extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-confetti-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = confettiTemplate(this);
    this.render(html, css);

    this._particles = [];
    this._raf = 0;

    this._onClick = () => {
      if (this.trigger === "click") this.fire();
    };
    this.addEventListener("click", this._onClick);

    this.setAttribute("data-pura-confetti-trigger", this.trigger);
    this.setAttribute("data-pura-confetti-count", String(this.count));

    registry().set(this._id, {
      id: this._id,
      trigger: this.trigger,
      count: this.count,
      fire: (opts) => this.fire(opts),
      el: this,
    });
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._onClick);
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
    this._particles = [];
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get trigger() {
    return this.getAttribute("trigger") === "manual" ? "manual" : "click";
  }
  get count() {
    const n = parseFloat(this.getAttribute("count"));
    return Number.isFinite(n) && n > 0 ? Math.min(500, Math.round(n)) : 80;
  }
  get angle() {
    const n = parseFloat(this.getAttribute("angle"));
    return Number.isFinite(n) ? n : 90;
  }
  get spread() {
    const n = parseFloat(this.getAttribute("spread"));
    return Number.isFinite(n) && n > 0 ? n : 70;
  }
  get velocity() {
    const n = parseFloat(this.getAttribute("velocity"));
    return Number.isFinite(n) && n > 0 ? n : 14;
  }
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 2500;
  }

  // ---- public API -----------------------------------------------------------
  // Launch a burst. opts may override { count, angle, spread, velocity,
  // duration, x, y } for this burst only (x/y in viewport px; default is the
  // center of the element).
  fire(opts = {}) {
    this.dispatchEvent(new CustomEvent("fire", { bubbles: true, composed: true }));
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const canvas = this.$(".burst");
    const ctx = canvas?.getContext?.("2d");
    if (reduce || !ctx) {
      // skip straight to the end state; app logic still runs off the events
      this._finish();
      return;
    }
    this._spawn(opts);
    if (!this._raf) {
      this._syncCanvas(canvas, ctx);
      this._ctx = ctx;
      this.setAttribute("data-pura-confetti-firing", "");
      this._last = performance.now();
      this._raf = requestAnimationFrame((t) => this._tick(t));
    }
  }

  // ---- internals ------------------------------------------------------------
  _palette() {
    const attr = this.getAttribute("colors");
    if (attr) {
      const list = attr.split(",").map((s) => s.trim()).filter(Boolean);
      if (list.length) return list;
    }
    const cs = getComputedStyle(this);
    const fallbacks = ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#a855f7"];
    return fallbacks.map(
      (fb, i) => cs.getPropertyValue(`--pura-confetti-color-${i + 1}`).trim() || fb,
    );
  }

  _spawn(opts) {
    const rect = this.getBoundingClientRect();
    const x0 = opts.x ?? rect.left + rect.width / 2;
    const y0 = opts.y ?? rect.top + rect.height / 2;
    const count = opts.count ?? this.count;
    const angle = ((opts.angle ?? this.angle) * Math.PI) / 180;
    const spread = ((opts.spread ?? this.spread) * Math.PI) / 180;
    const velocity = opts.velocity ?? this.velocity;
    const life = (opts.duration ?? this.duration) / 16.7; // ms → ticks
    const palette = this._palette();
    const size =
      parseFloat(getComputedStyle(this).getPropertyValue("--pura-confetti-size")) || 8;

    for (let i = 0; i < count; i++) {
      // ephemeral canvas particles: native randomness is fine here (runtime
      // visual scatter only, never part of the SSR paint)
      const theta = angle + (Math.random() - 0.5) * spread;
      const v = velocity * (0.6 + Math.random() * 0.8);
      this._particles.push({
        x: x0,
        y: y0,
        vx: Math.cos(theta) * v,
        vy: -Math.sin(theta) * v,
        w: size * (0.5 + Math.random() * 0.7),
        h: size * (0.3 + Math.random() * 0.4),
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        flip: Math.random() * Math.PI * 2,
        vflip: 0.1 + Math.random() * 0.2,
        drift: (Math.random() - 0.5) * 0.6,
        color: palette[i % palette.length],
        t: 0,
        life: life * (0.7 + Math.random() * 0.6),
      });
    }
  }

  _syncCanvas(canvas, ctx) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  _tick(now) {
    const ctx = this._ctx;
    const dt = Math.min(3, (now - this._last) / 16.7); // clamp tab-switch jumps
    this._last = now;
    const W = window.innerWidth;
    const H = window.innerHeight;
    ctx.clearRect(0, 0, W, H);

    const alive = [];
    for (const p of this._particles) {
      p.t += dt;
      if (p.t >= p.life || p.y > H + 40) continue;
      const drag = Math.pow(AIR_DRAG, dt);
      p.vx *= drag;
      p.vy = p.vy * drag + GRAVITY * dt;
      p.x += (p.vx + p.drift) * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      p.flip += p.vflip * dt;

      const left = p.life - p.t;
      ctx.globalAlpha = left < FADE_TICKS ? Math.max(0, left / FADE_TICKS) : 1;
      ctx.fillStyle = p.color;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      // cos(flip) fakes the 3D tumble by squashing the rect's height
      const fh = p.h * Math.cos(p.flip);
      ctx.fillRect(-p.w / 2, -fh / 2, p.w, fh);
      ctx.restore();
      alive.push(p);
    }
    ctx.globalAlpha = 1;

    this._particles = alive;
    if (alive.length) {
      this._raf = requestAnimationFrame((t) => this._tick(t));
    } else {
      this._raf = 0;
      ctx.clearRect(0, 0, W, H);
      this._finish();
    }
  }

  _finish() {
    this.removeAttribute("data-pura-confetti-firing");
    this.dispatchEvent(new CustomEvent("done", { bubbles: true, composed: true }));
  }
}

define("pura-confetti", PuraConfetti, meta);
export { PuraConfetti };
