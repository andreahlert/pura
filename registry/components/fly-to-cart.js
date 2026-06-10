// <pura-fly-to-cart> — the "add to cart" flight: click the slotted trigger and
// a dot launches from it, arcs across the page, and lands on the target (the
// cart icon), which pulses on impact. The flight is one WAAPI animation on a
// fixed-position dot (it must travel outside any shadow root, so it is created
// on document.body at click time); the arc is a three-keyframe translate with a
// raised midpoint.
//
// Attributes:
//   target   — CSS selector for the landing element (required for flight;
//              without a match the click still fires "land").
//   duration — flight time in ms (default 700).
//   size     — dot diameter in px (default 14).
//
// Events:
//   land — fired when the dot reaches the target (bubbles, composed).
//
// Tokens: --pura-fly-color (dot color, default --pura-accent then --pura-fg).
// Reduced motion: no flight; the target still pulses subtly and "land" fires.
//
// Agent-native layer: each instance registers in window.__puraFlyToCarts by
//   data-pura-id with { target, fly, el }.
import { PuraElement, define } from "../base.js";
import meta from "./fly-to-cart.meta.js";
import { flyToCartTemplate } from "./fly-to-cart.template.js";

let uid = 0;

function registry() {
  return (window.__puraFlyToCarts ||= new Map());
}

class PuraFlyToCart extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-fly-to-cart-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = flyToCartTemplate(this);
    this.render(html, css);

    this._onClick = () => this.fly();
    this.addEventListener("click", this._onClick);
    registry().set(this._id, {
      id: this._id,
      target: this.getAttribute("target") || "",
      fly: () => this.fly(),
      el: this,
    });
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._onClick);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 700;
  }
  get size() {
    const n = parseFloat(this.getAttribute("size"));
    return Number.isFinite(n) && n > 0 ? n : 14;
  }

  // ---- public API -----------------------------------------------------------
  fly() {
    const target = this._target();
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!target || reduce || typeof Element.prototype.animate !== "function") {
      this._land(target);
      return;
    }

    const from = this.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const size = this.size;
    const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
    const dy = (to.top + to.height / 2) - (from.top + from.height / 2);

    const dot = document.createElement("span");
    dot.setAttribute("aria-hidden", "true");
    dot.style.cssText =
      `position: fixed; z-index: 2147483646; pointer-events: none;` +
      `left: ${from.left + from.width / 2 - size / 2}px;` +
      `top: ${from.top + from.height / 2 - size / 2}px;` +
      `width: ${size}px; height: ${size}px; border-radius: 50%;` +
      `background: ${getComputedStyle(this).getPropertyValue("--pura-fly-color").trim() || "var(--pura-accent, var(--pura-fg, currentColor))"};`;
    document.body.appendChild(dot);

    // arc: raise the midpoint above the straight line between the endpoints
    const lift = Math.min(160, Math.max(60, Math.abs(dx) * 0.25));
    const anim = dot.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - lift}px) scale(0.75)`, opacity: 1, offset: 0.5 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.25)`, opacity: 0.6 },
      ],
      { duration: this.duration, easing: "cubic-bezier(0.45, 0, 0.55, 1)" },
    );
    anim.onfinish = () => {
      dot.remove();
      this._land(target);
    };
  }

  // ---- internals ------------------------------------------------------------
  _target() {
    const sel = this.getAttribute("target");
    if (!sel) return null;
    try {
      return document.querySelector(sel);
    } catch {
      return null;
    }
  }

  _land(target) {
    if (target && typeof target.animate === "function") {
      target.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.25)" },
          { transform: "scale(1)" },
        ],
        { duration: 300, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
      );
    }
    this.dispatchEvent(new CustomEvent("land", { bubbles: true, composed: true }));
  }
}

define("pura-fly-to-cart", PuraFlyToCart, meta);
export { PuraFlyToCart };
