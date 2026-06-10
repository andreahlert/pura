// <pura-gooey-cursor> — gooey cursor / meta balls: a stack of liquid blobs
// chases the pointer in a staggered lerp chain (the lead blob hugs the cursor,
// each follower lerps toward the one ahead of it) and overlapping circles fuse
// organically through an inline SVG goo filter (feGaussianBlur + feColorMatrix
// alpha threshold). The organic sibling of <pura-cursor>'s dot + ring.
//
// Drop one instance anywhere on the page (it renders as a fixed overlay):
//   <pura-gooey-cursor hide-native></pura-gooey-cursor>
//
// Attributes:
//   count       — number of blobs, 2..8 (default 4).
//   ease        — lead blob lerp factor per frame, 0..1 (default 0.22).
//   strength    — goo blur stdDeviation in px (default 12). Higher = gooier.
//   hide-native — boolean. Suppress the native cursor while connected.
//   blend       — boolean. mix-blend-mode: difference over the page.
//
// Tokens: --pura-gooey-cursor-size (lead blob diameter, default 36px),
//   --pura-gooey-cursor-color (blob fill, default the foreground token).
//
// The rAF loop runs only while the chain is still catching up; once every blob
// settles under half a pixel it stops until the next pointermove. Touch
// devices ((pointer: coarse)) and reduced motion render nothing and never
// bind; SSR / pre-JS paints nothing visible (blobs stay at opacity 0 until the
// first real pointer move).
//
// Agent-native layer: each instance registers in window.__puraGooeyCursors by
//   data-pura-id with { count, ease, el }; data-pura-gooey-count mirrors
//   config and data-pura-gooey-live mirrors pointer-tracking state.
import { PuraElement, define } from "../base.js";
import meta from "./gooey-cursor.meta.js";
import { gooeyCursorTemplate } from "./gooey-cursor.template.js";

let uid = 0;

function registry() {
  return (window.__puraGooeyCursors ||= new Map());
}

function inert() {
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true ||
    window.matchMedia?.("(pointer: coarse)").matches === true
  );
}

class PuraGooeyCursor extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-gooey-cursor-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = gooeyCursorTemplate(this);
    this.render(html, css);
    this._blobs = this.$$(".blob");

    this.setAttribute("data-pura-gooey-count", String(this._blobs.length));
    registry().set(this._id, {
      id: this._id,
      count: this._blobs.length,
      ease: this.ease,
      el: this,
    });

    if (inert()) return;

    this._x = 0;
    this._y = 0;
    this._pts = this._blobs.map(() => ({ x: 0, y: 0 }));
    this._raf = null;
    this._bind();

    if (this.hasAttribute("hide-native")) {
      this._cursorStyle = document.createElement("style");
      this._cursorStyle.textContent = "*, * * { cursor: none !important; }";
      document.head.appendChild(this._cursorStyle);
    }
  }

  disconnectedCallback() {
    this._unbind();
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
    this._cursorStyle?.remove();
    this._cursorStyle = null;
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get ease() {
    const n = parseFloat(this.getAttribute("ease"));
    return Number.isFinite(n) && n > 0 && n <= 1 ? n : 0.22;
  }

  // ---- binding --------------------------------------------------------------
  _bind() {
    this._onMove = (e) => {
      this._x = e.clientX;
      this._y = e.clientY;
      if (!this.hasAttribute("data-pura-gooey-live")) {
        // First contact: park the whole chain at the pointer, no fly-in.
        for (const p of this._pts) {
          p.x = this._x;
          p.y = this._y;
        }
        this.setAttribute("data-pura-gooey-live", "");
      }
      if (!this._raf) this._loop();
    };
    this._onLeaveDoc = () => {
      this.removeAttribute("data-pura-gooey-live");
    };
    document.addEventListener("pointermove", this._onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", this._onLeaveDoc);
  }
  _unbind() {
    document.removeEventListener("pointermove", this._onMove);
    document.documentElement.removeEventListener("pointerleave", this._onLeaveDoc);
  }

  // ---- internals ------------------------------------------------------------
  // Staggered lerp chain: blob 0 chases the pointer, blob i chases blob i-1.
  // Stops once every link in the chain has settled under half a pixel.
  _loop() {
    this._raf = requestAnimationFrame(() => {
      const e = this.ease;
      let settled = true;
      for (let i = 0; i < this._pts.length; i++) {
        const p = this._pts[i];
        const tx = i === 0 ? this._x : this._pts[i - 1].x;
        const ty = i === 0 ? this._y : this._pts[i - 1].y;
        p.x += (tx - p.x) * e;
        p.y += (ty - p.y) * e;
        this._blobs[i].style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        if (Math.abs(tx - p.x) >= 0.5 || Math.abs(ty - p.y) >= 0.5) settled = false;
      }
      this._raf = null;
      if (!settled) this._loop();
    });
  }
}

define("pura-gooey-cursor", PuraGooeyCursor, meta);
export { PuraGooeyCursor };
