// <pura-particle-network> — the iconic particles.js background: dots drift on
// a Canvas 2D field, connect with lines while close, and react to the pointer
// (grab draws lines to the cursor, repulse pushes dots away, attract pulls
// them in). One rAF loop runs the O(n^2) pair scan (fine for n <= 160) and is
// paused while the element is offscreen. The pure template paints a static,
// deterministic dot field for SSR; client JS takes the canvas over and hides
// the static field after the first frame.
//
// Attributes:
//   count            — number of particles (default 80, max 160).
//   distance         — max link distance in px (default 120).
//   speed            — drift speed in px per second (default 40).
//   size             — base dot radius in px (default 2).
//   pointer          — "grab" (default) | "repulse" | "attract" | "none".
//   pointer-distance — pointer interaction radius in px (default 160).
//
// Tokens: --pura-particle-network-color (dots, default --pura-fg),
//   --pura-particle-network-link-color (lines, default the dot color),
//   --pura-particle-network-opacity (dots, default 0.55),
//   --pura-particle-network-link-opacity (lines, default 0.35),
//   --pura-particle-network-link-width (lines, default 1),
//   --pura-particle-network-bg (host background, default transparent).
//
// Reduced motion: no loop and no pointer forces; the canvas freezes on a
//   single connected frame (dots plus links), tracked live via media query.
//
// Agent-native layer: each instance registers in window.__puraParticleNetworks
//   by data-pura-id with { id, count, pointer, pause, resume, el };
//   data-pura-pn-count / -pointer / -state mirror config and run state.
import { PuraElement, define } from "../base.js";
import meta from "./particle-network.meta.js";
import { particleNetworkTemplate } from "./particle-network.template.js";

let uid = 0;
const MAX_COUNT = 160;

function registry() {
  return (window.__puraParticleNetworks ||= new Map());
}

class PuraParticleNetwork extends PuraElement {
  static observedAttributes = ["count", "distance", "speed", "size", "pointer", "pointer-distance"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-particle-network-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = particleNetworkTemplate(this);
    this.render(html, css);
    this._canvas = this.$(".canvas");
    this._ctx = this._canvas.getContext("2d");
    this._mouse = { x: 0, y: 0, active: false };
    this._visible = true;
    this._paused = false;
    this._raf = 0;
    this._tick = this._tick.bind(this);

    this._reduceMq = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null;
    this._onReduce = () => this._sync();
    this._reduceMq?.addEventListener?.("change", this._onReduce);

    this._onMove = (e) => {
      const r = this.getBoundingClientRect();
      this._mouse.x = e.clientX - r.left;
      this._mouse.y = e.clientY - r.top;
      this._mouse.active = true;
    };
    this._onLeave = () => { this._mouse.active = false; };
    this.addEventListener("pointermove", this._onMove);
    this.addEventListener("pointerleave", this._onLeave);
    this.addEventListener("pointercancel", this._onLeave);

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
      pointer: this.pointerMode,
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
    this.removeEventListener("pointermove", this._onMove);
    this.removeEventListener("pointerleave", this._onLeave);
    this.removeEventListener("pointercancel", this._onLeave);
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._ctx) return;
    if (name === "count" || name === "speed" || name === "size") this._seed();
    this._mirror();
    const entry = registry().get(this._id);
    if (entry) {
      entry.count = this.count;
      entry.pointer = this.pointerMode;
    }
    if (this._reduce() || !this._raf) this._draw(false);
  }

  // ---- config ---------------------------------------------------------------
  get count() {
    const n = parseInt(this.getAttribute("count"), 10);
    return Number.isFinite(n) && n > 0 ? Math.min(n, MAX_COUNT) : 80;
  }
  get distance() {
    const n = parseFloat(this.getAttribute("distance"));
    return Number.isFinite(n) && n > 0 ? n : 120;
  }
  get speed() {
    const n = parseFloat(this.getAttribute("speed"));
    return Number.isFinite(n) && n >= 0 ? n : 40;
  }
  get size() {
    const n = parseFloat(this.getAttribute("size"));
    return Number.isFinite(n) && n > 0 ? n : 2;
  }
  get pointerMode() {
    const m = this.getAttribute("pointer");
    return m === "repulse" || m === "attract" || m === "none" ? m : "grab";
  }
  get pointerDistance() {
    const n = parseFloat(this.getAttribute("pointer-distance"));
    return Number.isFinite(n) && n > 0 ? n : 160;
  }

  // ---- internals ------------------------------------------------------------
  _reduce() {
    return !!this._reduceMq?.matches;
  }

  _mirror() {
    this.setAttribute("data-pura-pn-count", String(this.count));
    this.setAttribute("data-pura-pn-pointer", this.pointerMode);
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
    if (!this._pts || this._pts.length !== this.count) {
      this._seed();
    } else {
      for (const p of this._pts) {
        p.x = Math.min(Math.max(p.x, p.r), this._w - p.r);
        p.y = Math.min(Math.max(p.y, p.r), this._h - p.r);
      }
    }
    if (this._reduce() || !this._raf) this._draw(false);
  }

  // Tokens are resolved once per resize (and on attribute change); a live theme
  // swap settles on the next layout change.
  _resolveColors() {
    const cs = getComputedStyle(this);
    const get = (name, fallback) => (cs.getPropertyValue(name) || "").trim() || fallback;
    const dot = get("--pura-particle-network-color", get("--pura-fg", "#a1a1aa"));
    const opacity = parseFloat(get("--pura-particle-network-opacity", "0.55"));
    const linkOpacity = parseFloat(get("--pura-particle-network-link-opacity", "0.35"));
    const linkWidth = parseFloat(get("--pura-particle-network-link-width", "1"));
    this._colors = {
      dot,
      link: get("--pura-particle-network-link-color", dot),
      opacity: Number.isFinite(opacity) ? opacity : 0.55,
      linkOpacity: Number.isFinite(linkOpacity) ? linkOpacity : 0.35,
      linkWidth: Number.isFinite(linkWidth) && linkWidth > 0 ? linkWidth : 1,
    };
  }

  // Positions come from the same index math as the SSR field so the canvas
  // takeover is seamless; velocities are ephemeral runtime state, so native
  // randomness is fine here.
  _seed() {
    const n = this.count;
    const speed = this.speed;
    const pts = [];
    for (let i = 0; i < n; i++) {
      const angle = Math.random() * Math.PI * 2;
      const v = speed * (0.5 + Math.random() * 0.5);
      pts.push({
        x: (((i * 53) % 100) / 100) * this._w,
        y: ((((i * 29) + 7) % 100) / 100) * this._h,
        vx: Math.cos(angle) * v,
        vy: Math.sin(angle) * v,
        r: this.size * (0.75 + ((i * 7) % 3) * 0.25),
      });
    }
    this._pts = pts;
  }

  // Start/stop the loop from the current gates: visibility (IntersectionObserver),
  // reduced motion, agent pause, and connectedness. Under reduced motion the
  // canvas holds a single connected frame instead of animating.
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
    this.setAttribute("data-pura-pn-state", reduce ? "static" : this._raf ? "running" : "paused");
  }

  _tick(t) {
    this._raf = requestAnimationFrame(this._tick);
    const dt = this._last ? Math.min(0.05, (t - this._last) / 1000) : 0;
    this._last = t;
    if (dt) this._step(dt);
    this._draw(true);
  }

  _step(dt) {
    const { _w: w, _h: h, _mouse: m } = this;
    const mode = this.pointerMode;
    const pd = this.pointerDistance;
    const push = mode === "repulse" ? 1 : mode === "attract" ? -1 : 0;
    for (const p of this._pts) {
      if (push && m.active) {
        const dx = p.x - m.x;
        const dy = p.y - m.y;
        const d = Math.hypot(dx, dy);
        if (d > 0.001 && d < pd) {
          const f = (1 - d / pd) * push * 320 * dt;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.x < p.r) { p.x = p.r; p.vx = Math.abs(p.vx); }
      else if (p.x > w - p.r) { p.x = w - p.r; p.vx = -Math.abs(p.vx); }
      if (p.y < p.r) { p.y = p.r; p.vy = Math.abs(p.vy); }
      else if (p.y > h - p.r) { p.y = h - p.r; p.vy = -Math.abs(p.vy); }
    }
  }

  _draw(withPointer) {
    const ctx = this._ctx;
    const pts = this._pts;
    const { dot, link, opacity, linkOpacity, linkWidth } = this._colors;
    const dist = this.distance;
    ctx.clearRect(0, 0, this._w, this._h);

    // links between close pairs, fading with distance
    ctx.strokeStyle = link;
    ctx.lineWidth = linkWidth;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d2 = dx * dx + dy * dy;
        if (d2 > dist * dist) continue;
        ctx.globalAlpha = (1 - Math.sqrt(d2) / dist) * linkOpacity;
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.stroke();
      }
    }

    // grab: lines from nearby particles to the cursor
    if (withPointer && this._mouse.active && this.pointerMode === "grab") {
      const pd = this.pointerDistance;
      const m = this._mouse;
      for (const p of pts) {
        const d = Math.hypot(p.x - m.x, p.y - m.y);
        if (d > pd) continue;
        ctx.globalAlpha = (1 - d / pd) * Math.min(1, linkOpacity * 2);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = opacity;
    ctx.fillStyle = dot;
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // first painted frame: retire the static SSR field
    this.setAttribute("data-pura-pn-live", "");
  }
}

define("pura-particle-network", PuraParticleNetwork, meta);
export { PuraParticleNetwork };
