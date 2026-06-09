// <pura-ripple> — Material-style touch ripple as a zero-dependency wrapper.
// Wrap any clickable surface; a ripple expands from the pointer position on
// pointerdown and fades out. Pure CSS @keyframes does the motion (no JS
// tweening); JS only spawns the ripple span at the right coordinates and removes
// it on animationend.
//
// Attributes:
//   disabled — boolean. Suppresses ripples entirely.
//   centered — boolean. Ripples always emanate from the host center rather than
//              the pointer position (good for icon buttons).
//
// Theming: --pura-ripple-color (default currentColor), --pura-ripple-opacity
//   (0.25), --pura-ripple-duration (var(--pura-duration-5)).
//
// Slots: default — the surface to ripple.
// Parts: ripples — the overlay layer that clips ripple spans to the host shape.
//
// Events: pura-ripple (composed, bubbles) per ripple; detail = { id, x, y }
//   where x/y are host-relative pixels.
//
// Reduced motion: base.js RESET collapses animation-duration, so the ripple is
//   effectively instant under reduce.
//
// Agent-native layer: each instance registers in window.__puraRipples keyed by
//   data-pura-id and mirrors data-pura-ripple-disabled, so an agent can
//   enumerate and read ripple surfaces without DOM diving.
import { PuraElement, define } from "../base.js";
import meta from "./ripple.meta.js";
import { rippleTemplate } from "./ripple.template.js";

let uid = 0;

function registry() {
  return (window.__puraRipples ||= new Map());
}

class PuraRipple extends PuraElement {
  static observedAttributes = ["disabled"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-ripple-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = rippleTemplate(this);
    this.render(html, css);
    this._layer = this.$(".ripples");

    this._onDown = (e) => this._spawn(e);
    this.addEventListener("pointerdown", this._onDown);

    this._reflectAgentState();
  }

  disconnectedCallback() {
    this.removeEventListener("pointerdown", this._onDown);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this._layer) return;
    this._reflectAgentState();
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }
  get centered() {
    return this.hasAttribute("centered");
  }

  _spawn(e) {
    if (this.disabled) return;
    const rect = this.getBoundingClientRect();
    // Cover the farthest corner so the ripple always fills the surface.
    const size = Math.max(rect.width, rect.height) * 2;
    const cx = this.centered ? rect.width / 2 : e.clientX - rect.left;
    const cy = this.centered ? rect.height / 2 : e.clientY - rect.top;

    const span = document.createElement("span");
    span.className = "ripple";
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${cx - size / 2}px`;
    span.style.top = `${cy - size / 2}px`;
    span.addEventListener("animationend", () => span.remove(), { once: true });
    this._layer.appendChild(span);

    this.dispatchEvent(
      new CustomEvent("pura-ripple", {
        bubbles: true,
        composed: true,
        detail: { id: this._id, x: cx, y: cy },
      })
    );
  }

  _reflectAgentState() {
    this.setAttribute(
      "data-pura-ripple-disabled",
      this.disabled ? "true" : "false"
    );
  }
}


define("pura-ripple", PuraRipple, meta);
export { PuraRipple };
