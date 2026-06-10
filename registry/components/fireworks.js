// <pura-fireworks> — the big-impact celebration: rockets launch from the
// bottom of the viewport, climb with a glowing trail, and explode at their
// apex into spheres of sparks that fall with gravity and fade out, all on a
// full-viewport canvas overlay. Shares the confetti particle-engine approach
// (launch physics + radial burst + fade) for moments that deserve more than
// a single burst.
//
// Attributes:
//   trigger  — "click" (default) | "manual" (only fire() launches) | "auto"
//              (one show fires when the element connects).
//   rockets  — rockets per show (default 6, capped at 20).
//   count    — sparks per explosion (default 60, capped at 200).
//   interval — ms between rocket launches (default 350).
//   duration — spark lifetime in ms (default 1800).
//   colors   — comma-separated CSS colors; overrides the token palette.
//
// Events:
//   fire    — a show launched (bubbles, composed).
//   explode — a rocket reached its apex and burst (bubbles, composed).
//   done    — the last spark settled (bubbles, composed).
//
// Tokens: --pura-fireworks-color-1 .. --pura-fireworks-color-5 (palette),
//   --pura-fireworks-size (base spark radius, default 3px),
//   --pura-fireworks-z (overlay z-index, default 2147483646).
// SSR / pre-JS: just the slotted trigger; the canvas overlay stays hidden.
// Reduced motion: no rockets; "fire" and "done" still dispatch so app logic
//   (badges, counters, analytics) keeps working.
//
// Agent-native layer: each instance registers in window.__puraFireworkss by
//   data-pura-id with { id, trigger, rockets, count, fire, el };
//   data-pura-fireworks-* mirror config and firing state.
import { PuraElement, define } from "../base.js";
import meta from "./fireworks.meta.js";
import { fireworksTemplate } from "./fireworks.template.js";

let uid = 0;

const ROCKET_GRAVITY = 0.22; // px per tick², one tick ≈ one 60fps frame
const SPARK_GRAVITY = 0.12; // sparks are light embers, they fall slower
const SPARK_DRAG = 0.975; // per-tick velocity decay inside the burst sphere
const APEX_VY = -1.6; // a rocket slower than this is at its apex → explode
const FADE_TICKS = 24; // fade-out window at the end of a spark's life

function registry() {
  return (window.__puraFireworkss ||= new Map());
}

class PuraFireworks extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-fireworks-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = fireworksTemplate(this);
    this.render(html, css);

    this._rockets = [];
    this._sparks = [];
    this._raf = 0;

    this._onClick = () => {
      if (this.trigger === "click") this.fire();
    };
    this.addEventListener("click", this._onClick);

    this.setAttribute("data-pura-fireworks-trigger", this.trigger);
    this.setAttribute("data-pura-fireworks-rockets", String(this.rockets));
    this.setAttribute("data-pura-fireworks-count", String(this.count));

    registry().set(this._id, {
      id: this._id,
      trigger: this.trigger,
      rockets: this.rockets,
      count: this.count,
      fire: (opts) => this.fire(opts),
      el: this,
    });

    if (this.trigger === "auto") {
      // wait a frame so layout (and the canvas) exists before launching
      requestAnimationFrame(() => {
        if (this.isConnected) this.fire();
      });
    }
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._onClick);
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
    this._rockets = [];
    this._sparks = [];
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get trigger() {
    const v = this.getAttribute("trigger");
    return v === "manual" || v === "auto" ? v : "click";
  }
  get rockets() {
    const n = parseFloat(this.getAttribute("rockets"));
    return Number.isFinite(n) && n > 0 ? Math.min(20, Math.round(n)) : 6;
  }
  get count() {
    const n = parseFloat(this.getAttribute("count"));
    return Number.isFinite(n) && n > 0 ? Math.min(200, Math.round(n)) : 60;
  }
  get interval() {
    const n = parseFloat(this.getAttribute("interval"));
    return Number.isFinite(n) && n >= 0 ? n : 350;
  }
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 1800;
  }

  // ---- public API -----------------------------------------------------------
  // Launch a show. opts may override { rockets, count, interval, duration }
  // for this show only.
  fire(opts = {}) {
    this.dispatchEvent(new CustomEvent("fire", { bubbles: true, composed: true }));
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const canvas = this.$(".sky");
    const ctx = canvas?.getContext?.("2d");
    if (reduce || !ctx) {
      // skip straight to the end state; app logic still runs off the events
      this._finish();
      return;
    }
    this._spawnRockets(opts);
    if (!this._raf) {
      this._syncCanvas(canvas, ctx);
      this._ctx = ctx;
      this.setAttribute("data-pura-fireworks-firing", "");
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
    const fallbacks = ["#f43f5e", "#f59e0b", "#22d3ee", "#a3e635", "#a855f7"];
    return fallbacks.map(
      (fb, i) => cs.getPropertyValue(`--pura-fireworks-color-${i + 1}`).trim() || fb,
    );
  }

  _spawnRockets(opts) {
    const rockets = Math.min(20, opts.rockets ?? this.rockets);
    const interval = (opts.interval ?? this.interval) / 16.7; // ms → ticks
    const count = Math.min(200, opts.count ?? this.count);
    const life = (opts.duration ?? this.duration) / 16.7;
    const palette = this._palette();
    const W = window.innerWidth;
    const H = window.innerHeight;

    for (let i = 0; i < rockets; i++) {
      // ephemeral canvas particles: native randomness is fine here (runtime
      // visual scatter only, never part of the SSR paint)
      const apex = H * (0.45 + Math.random() * 0.3); // burst 45%..75% up screen
      this._rockets.push({
        delay: i * interval * (0.85 + Math.random() * 0.3),
        x: W * (0.2 + Math.random() * 0.6),
        y: H + 8,
        vx: (Math.random() - 0.5) * 1.6,
        vy: -Math.sqrt(2 * ROCKET_GRAVITY * apex),
        color: palette[i % palette.length],
        count,
        life,
      });
    }
  }

  _explode(rocket) {
    const size =
      parseFloat(getComputedStyle(this).getPropertyValue("--pura-fireworks-size")) || 3;
    for (let i = 0; i < rocket.count; i++) {
      const theta = (i / rocket.count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const v = 2 + Math.random() * 6; // mixed radii read as a sphere
      this._sparks.push({
        x: rocket.x,
        y: rocket.y,
        vx: Math.cos(theta) * v,
        vy: Math.sin(theta) * v,
        r: size * (0.5 + Math.random() * 0.8),
        color: rocket.color,
        t: 0,
        life: rocket.life * (0.7 + Math.random() * 0.6),
      });
    }
    this.dispatchEvent(new CustomEvent("explode", { bubbles: true, composed: true }));
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

    // rockets: climb, decelerate, explode at apex
    const climbing = [];
    for (const r of this._rockets) {
      if (r.delay > 0) {
        r.delay -= dt;
        climbing.push(r);
        continue;
      }
      const px = r.x;
      const py = r.y;
      r.vy += ROCKET_GRAVITY * dt;
      r.x += r.vx * dt;
      r.y += r.vy * dt;
      if (r.vy >= APEX_VY) {
        this._explode(r);
        continue;
      }
      // trail: a short streak from where the rocket just was
      ctx.strokeStyle = r.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.moveTo(px - r.vx * 3, py - r.vy * 3);
      ctx.lineTo(r.x, r.y);
      ctx.stroke();
      climbing.push(r);
    }
    this._rockets = climbing;

    // sparks: radial burst falling under gravity with drag, fading out
    const alive = [];
    for (const s of this._sparks) {
      s.t += dt;
      if (s.t >= s.life || s.y > H + 20) continue;
      const drag = Math.pow(SPARK_DRAG, dt);
      s.vx *= drag;
      s.vy = s.vy * drag + SPARK_GRAVITY * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      const left = s.life - s.t;
      ctx.globalAlpha = left < FADE_TICKS ? Math.max(0, left / FADE_TICKS) : 1;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      alive.push(s);
    }
    ctx.globalAlpha = 1;
    this._sparks = alive;

    if (this._rockets.length || this._sparks.length) {
      this._raf = requestAnimationFrame((t) => this._tick(t));
    } else {
      this._raf = 0;
      ctx.clearRect(0, 0, W, H);
      this._finish();
    }
  }

  _finish() {
    this.removeAttribute("data-pura-fireworks-firing");
    this.dispatchEvent(new CustomEvent("done", { bubbles: true, composed: true }));
  }
}

define("pura-fireworks", PuraFireworks, meta);
export { PuraFireworks };
