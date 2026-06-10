// <pura-starfield> — the classic hyperspace starfield: stars fly toward the
// screen on a Canvas 2D field with a trivial pseudo-3D projection (each star
// has x/y/z; z shrinks every frame and the point is reprojected), in the style
// of tsParticles' Hyperspace/Stars presets and React Bits' Hyperspeed. Speed
// stretches the streaks: each star is drawn as a short line from its slightly
// deeper projection to its current one, so faster warp means longer trails.
// One rAF loop runs the field and is paused while the element is offscreen.
// The pure template paints a dark backdrop with a deterministic static star
// field for SSR; client JS takes the canvas over and hides the static field
// after the first frame.
//
// Attributes:
//   count  — number of stars (default 200, max 400).
//   speed  — warp speed multiplier (default 1, 0 holds the field still).
//   streak — streak length multiplier (default 1, 0 draws round stars only).
//
// Tokens: --pura-starfield-color (stars + streaks, default #e8eaff),
//   --pura-starfield-bg (host backdrop, default a dark space gradient).
//
// Reduced motion: no loop; the canvas freezes on a single frame of round
//   stars (no streaks), tracked live via media query. The SSR twinkle is
//   gated behind prefers-reduced-motion: no-preference.
//
// Agent-native layer: each instance registers in window.__puraStarfields by
//   data-pura-id with { id, count, speed, pause, resume, el };
//   data-pura-starfield-count / -speed / -streak / -state mirror config and
//   run state.
import { PuraElement, define } from "../base.js";
import meta from "./starfield.meta.js";
import { starfieldTemplate } from "./starfield.template.js";

let uid = 0;
const MAX_COUNT = 400;

function registry() {
  return (window.__puraStarfields ||= new Map());
}

class PuraStarfield extends PuraElement {
  static observedAttributes = ["count", "speed", "streak"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-starfield-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = starfieldTemplate(this);
    this.render(html, css);
    this._canvas = this.$(".canvas");
    this._ctx = this._canvas.getContext("2d");
    this._visible = true;
    this._paused = false;
    this._raf = 0;
    this._tick = this._tick.bind(this);

    this._reduceMq = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null;
    this._onReduce = () => this._sync();
    this._reduceMq?.addEventListener?.("change", this._onReduce);

    if (typeof ResizeObserver === "function") {
      this._ro = new ResizeObserver(() => this._resize());
      this._ro.observe(this);
    }
    if (typeof IntersectionObserver === "function") {
      this._io = new IntersectionObserver((entries) => {
        this._visible = entries[entries.length - 1].isIntersecting;
        this._sync();
      });
      this._io.observe(this);
    }

    this._resize();
    this._mirror();
    registry().set(this._id, {
      id: this._id,
      count: this.count,
      speed: this.speed,
      pause: () => { this._paused = true; this._sync(); },
      resume: () => { this._paused = false; this._sync(); },
      el: this,
    });
    this._sync();
  }

  disconnectedCallback() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
    this._ro?.disconnect();
    this._io?.disconnect();
    this._reduceMq?.removeEventListener?.("change", this._onReduce);
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._ctx) return;
    if (name === "count") this._seed();
    this._mirror();
    const entry = registry().get(this._id);
    if (entry) {
      entry.count = this.count;
      entry.speed = this.speed;
    }
    if (this._reduce() || !this._raf) this._draw(false);
  }

  // ---- config ---------------------------------------------------------------
  get count() {
    const n = parseInt(this.getAttribute("count"), 10);
    return Number.isFinite(n) && n > 0 ? Math.min(n, MAX_COUNT) : 200;
  }
  get speed() {
    const n = parseFloat(this.getAttribute("speed"));
    return Number.isFinite(n) && n >= 0 ? Math.min(n, 10) : 1;
  }
  get streak() {
    const n = parseFloat(this.getAttribute("streak"));
    return Number.isFinite(n) && n >= 0 ? Math.min(n, 10) : 1;
  }

  // ---- internals ------------------------------------------------------------
  _reduce() {
    return !!this._reduceMq?.matches;
  }

  _mirror() {
    this.setAttribute("data-pura-starfield-count", String(this.count));
    this.setAttribute("data-pura-starfield-speed", String(this.speed));
    this.setAttribute("data-pura-starfield-streak", String(this.streak));
  }

  _resize() {
    const rect = this.getBoundingClientRect();
    this._w = Math.max(1, rect.width);
    this._h = Math.max(1, rect.height);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this._canvas.width = Math.max(1, Math.round(this._w * dpr));
    this._canvas.height = Math.max(1, Math.round(this._h * dpr));
    this._ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this._resolveColors();
    if (!this._stars || this._stars.length !== this.count) this._seed();
    if (this._reduce() || !this._raf) this._draw(false);
  }

  // Tokens are resolved once per resize (and on attribute change); a live theme
  // swap settles on the next layout change.
  _resolveColors() {
    const cs = getComputedStyle(this);
    this._color = (cs.getPropertyValue("--pura-starfield-color") || "").trim() || "#e8eaff";
  }

  // Initial positions come from the same index math family as the SSR field so
  // the canvas takeover reads as the same sky; respawns are ephemeral runtime
  // state, so native randomness is fine there.
  _seed() {
    const n = this.count;
    const stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: (((i * 53) % 100) / 50) - 1, // -1..1 around the vanishing point
        y: ((((i * 29) + 7) % 100) / 50) - 1, // -1..1
        z: 0.05 + (((i * 13) + 3) % 95) / 100, // depth spread 0.05..0.99
      });
    }
    this._stars = stars;
  }

  _respawn(s) {
    s.x = Math.random() * 2 - 1;
    s.y = Math.random() * 2 - 1;
    s.z = 0.65 + Math.random() * 0.35; // re-enter far away
  }

  // Start/stop the loop from the current gates: visibility (IntersectionObserver),
  // reduced motion, agent pause, and connectedness. Under reduced motion the
  // canvas holds a single static frame of round stars instead of animating.
  _sync() {
    const reduce = this._reduce();
    const shouldRun = !reduce && this._visible && !this._paused && this.isConnected;
    if (shouldRun && !this._raf) {
      this._last = 0;
      this._raf = requestAnimationFrame(this._tick);
    } else if (!shouldRun && this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = 0;
    }
    if (reduce && this._ctx) this._draw(false);
    this.setAttribute("data-pura-starfield-state", reduce ? "static" : this._raf ? "running" : "paused");
  }

  _tick(t) {
    this._raf = requestAnimationFrame(this._tick);
    const dt = this._last ? Math.min(0.05, (t - this._last) / 1000) : 0;
    this._last = t;
    if (dt) this._step(dt);
    this._draw(true);
  }

  // The whole pseudo-3D: z shrinks, the star gets reprojected closer to the
  // edges, and once it passes the camera it respawns in the distance.
  _step(dt) {
    const v = 0.45 * this.speed;
    for (const s of this._stars) {
      s.z -= v * dt;
      if (s.z <= 0.02) this._respawn(s);
    }
  }

  _draw(animated) {
    const ctx = this._ctx;
    const cx = this._w / 2;
    const cy = this._h / 2;
    const scale = Math.min(this._w, this._h) * 0.5;
    const tailGap = animated ? 0.045 * this.streak * Math.max(0.4, this.speed) : 0;
    ctx.clearRect(0, 0, this._w, this._h);
    ctx.fillStyle = this._color;
    ctx.strokeStyle = this._color;
    ctx.lineCap = "round";

    for (const s of this._stars) {
      const sx = cx + (s.x / s.z) * scale;
      const sy = cy + (s.y / s.z) * scale;
      if (sx < -40 || sx > this._w + 40 || sy < -40 || sy > this._h + 40) {
        if (animated) this._respawn(s);
        continue;
      }
      const depth = 1 - s.z;
      const r = 0.4 + depth * 2.2;
      ctx.globalAlpha = Math.min(1, 0.15 + depth * 1.2);
      if (tailGap > 0) {
        // streak: line from the star's slightly deeper projection to its
        // current one, so trail length scales with speed and depth
        const tz = Math.min(1, s.z + tailGap);
        ctx.lineWidth = Math.max(0.5, r);
        ctx.beginPath();
        ctx.moveTo(cx + (s.x / tz) * scale, cy + (s.y / tz) * scale);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    // first painted frame: retire the static SSR field
    this.setAttribute("data-pura-starfield-live", "");
  }
}

define("pura-starfield", PuraStarfield, meta);
export { PuraStarfield };
