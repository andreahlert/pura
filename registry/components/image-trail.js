// <pura-image-trail> — the awwwards image-trail hero: move the pointer across
// the zone and copies of the slotted images spawn under the cursor, pop in,
// drift and fade out, cycling through the set. Slot the source <img> elements
// (they stay hidden); slot="content" holds the visible content (the big
// headline) the trail floats over. Each spawned copy is one WAAPI animation —
// nothing runs per frame, only pointermove events.
//
// Attributes:
//   step — pointer distance in px between spawns (default 110).
//   life — ms each copy lives (default 900).
//   max  — concurrent copies cap; oldest is removed first (default 10).
//
// Tokens: --pura-image-trail-size (copy width, default 170px),
//   --pura-image-trail-radius (default 6px).
// Reduced motion: no trail. Touch: spawns on drag movement like mouse moves.
//
// Agent-native layer: each instance registers in window.__puraImageTrails by
//   data-pura-id with { images, el }.
import { PuraElement, define } from "../base.js";
import meta from "./image-trail.meta.js";
import { imageTrailTemplate } from "./image-trail.template.js";

let uid = 0;

function registry() {
  return (window.__puraImageTrails ||= new Map());
}

class PuraImageTrail extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-image-trail-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = imageTrailTemplate(this);
    this.render(html, css);

    this._srcs = [...this.querySelectorAll("img:not([slot])")].map((i) => i.getAttribute("src")).filter(Boolean);
    this._next = 0;
    this._last = null;
    this._live = [];

    this._onMove = (e) => this._move(e);
    this.addEventListener("pointermove", this._onMove);
    this.addEventListener("pointerleave", () => { this._last = null; });

    registry().set(this._id, { id: this._id, images: this._srcs.length, el: this });
  }

  disconnectedCallback() {
    this.removeEventListener("pointermove", this._onMove);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get step() {
    const n = parseFloat(this.getAttribute("step"));
    return Number.isFinite(n) && n > 0 ? n : 110;
  }
  get life() {
    const n = parseFloat(this.getAttribute("life"));
    return Number.isFinite(n) && n > 0 ? n : 900;
  }
  get max() {
    const n = parseFloat(this.getAttribute("max"));
    return Number.isFinite(n) && n > 0 ? n : 10;
  }

  // ---- internals ------------------------------------------------------------
  _move(e) {
    if (!this._srcs.length) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const r = this.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (this._last) {
      const moved = Math.hypot(x - this._last.x, y - this._last.y);
      if (moved < this.step) return;
    }
    this._last = { x, y };
    this._spawn(x, y);
  }

  _spawn(x, y) {
    const layer = this.$(".layer");
    const img = document.createElement("img");
    img.src = this._srcs[this._next % this._srcs.length];
    img.alt = "";
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    layer.appendChild(img);

    // deterministic variation per spawn: tilt and drift cycle with the index
    const i = this._next++;
    const rot = ((i % 5) - 2) * 5; // -10..10 deg
    const driftX = ((i % 3) - 1) * 24; // -24, 0, 24 px
    const anim = img.animate(
      [
        { transform: `translate(-50%, -50%) scale(0.3) rotate(${rot * 1.6}deg)`, opacity: 0 },
        { transform: `translate(-50%, -50%) scale(1) rotate(${rot}deg)`, opacity: 1, offset: 0.18 },
        { transform: `translate(-50%, -50%) scale(1) rotate(${rot}deg)`, opacity: 1, offset: 0.6 },
        { transform: `translate(calc(-50% + ${driftX}px), calc(-50% - 60px)) scale(0.9) rotate(${rot}deg)`, opacity: 0 },
      ],
      { duration: this.life, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
    anim.onfinish = () => img.remove();

    this._live.push(img);
    this._live = this._live.filter((el) => el.isConnected);
    while (this._live.length > this.max) this._live.shift().remove();
  }
}

define("pura-image-trail", PuraImageTrail, meta);
export { PuraImageTrail };
