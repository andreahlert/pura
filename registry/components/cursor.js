// <pura-cursor> — custom cursor follower (the awwwards cursor). A dot snaps to
// the pointer; a ring lerps behind it. Over interactive targets (links,
// buttons, [data-cursor]) the ring grows; a target carrying data-cursor-text
// fills the ring and shows that text inside it (the "View" / "Drag" move).
//
// Drop one instance anywhere on the page (it renders as a fixed overlay):
//   <pura-cursor hide-native></pura-cursor>
//
// Attributes:
//   hide-native — boolean. Suppress the native cursor while connected.
//   blend       — boolean. mix-blend-mode: difference over the page.
//   ease        — ring lerp factor per frame, 0..1 (default 0.18).
//   targets     — extra CSS selector treated as interactive (grows the ring),
//                 on top of the default a, button, [data-cursor].
//
// The rAF loop runs only while the ring is still catching up; once it settles
// under half a pixel the loop stops until the next pointermove. Touch devices
// ((pointer: coarse)) and reduced motion render nothing and never bind, and
// the native cursor is left alone.
//
// Agent-native layer: registers in window.__puraCursors by data-pura-id;
//   data-pura-cursor-hover / data-pura-cursor-text mirror state.
import { PuraElement, define } from "../base.js";
import meta from "./cursor.meta.js";
import { cursorTemplate } from "./cursor.template.js";

let uid = 0;

function registry() {
  return (window.__puraCursors ||= new Map());
}

function inert() {
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true ||
    window.matchMedia?.("(pointer: coarse)").matches === true
  );
}

const DEFAULT_TARGETS = "a, button, [data-cursor]";

class PuraCursor extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-cursor-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = cursorTemplate(this);
    this.render(html, css);
    this._dot = this.$(".dot");
    this._ring = this.$(".ring");
    this._label = this.$(".label");

    registry().set(this._id, { id: this._id, el: this });

    if (inert()) return;

    this._x = this._rx = 0;
    this._y = this._ry = 0;
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
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get ease() {
    const n = parseFloat(this.getAttribute("ease"));
    return Number.isFinite(n) && n > 0 && n <= 1 ? n : 0.18;
  }
  get targetSelector() {
    const extra = this.getAttribute("targets");
    return extra ? `${DEFAULT_TARGETS}, ${extra}` : DEFAULT_TARGETS;
  }

  // ---- binding --------------------------------------------------------------
  _bind() {
    this._onMove = (e) => {
      this._x = e.clientX;
      this._y = e.clientY;
      if (!this.hasAttribute("data-pura-cursor-live")) {
        // First contact: place the ring at the pointer so it doesn't fly in.
        this._rx = this._x;
        this._ry = this._y;
        this.setAttribute("data-pura-cursor-live", "");
      }
      this._dot.style.transform = `translate3d(${this._x}px, ${this._y}px, 0)`;
      if (!this._raf) this._loop();
    };
    this._onOver = (e) => {
      const t = e.target.closest?.(this.targetSelector);
      if (!t) return;
      this.setAttribute("data-pura-cursor-hover", "");
      const text = t.getAttribute("data-cursor-text");
      if (text) {
        this._label.textContent = text;
        this.setAttribute("data-pura-cursor-text", "");
      }
    };
    this._onOut = (e) => {
      const t = e.target.closest?.(this.targetSelector);
      if (!t) return;
      // Only clear when actually leaving the target (not moving into a child).
      if (t.contains(e.relatedTarget)) return;
      this.removeAttribute("data-pura-cursor-hover");
      this.removeAttribute("data-pura-cursor-text");
    };
    this._onLeaveDoc = () => {
      this.removeAttribute("data-pura-cursor-live");
    };
    document.addEventListener("pointermove", this._onMove, { passive: true });
    document.addEventListener("pointerover", this._onOver, { passive: true });
    document.addEventListener("pointerout", this._onOut, { passive: true });
    document.documentElement.addEventListener("pointerleave", this._onLeaveDoc);
  }
  _unbind() {
    document.removeEventListener("pointermove", this._onMove);
    document.removeEventListener("pointerover", this._onOver);
    document.removeEventListener("pointerout", this._onOut);
    document.documentElement.removeEventListener("pointerleave", this._onLeaveDoc);
  }

  // ---- internals ------------------------------------------------------------
  // Lerp the ring toward the pointer; stop the loop once it settles.
  _loop() {
    this._raf = requestAnimationFrame(() => {
      const e = this.ease;
      this._rx += (this._x - this._rx) * e;
      this._ry += (this._y - this._ry) * e;
      this._ring.style.transform = `translate3d(${this._rx}px, ${this._ry}px, 0)`;
      const settled =
        Math.abs(this._x - this._rx) < 0.5 && Math.abs(this._y - this._ry) < 0.5;
      this._raf = null;
      if (!settled) this._loop();
    });
  }
}

define("pura-cursor", PuraCursor, meta);
export { PuraCursor };
