// <pura-flip-card> — a two-faced card that turns 180 degrees in 3D
// perspective. Slot "front" is the resting face, slot "back" is revealed by
// the flip. Pure CSS drives the rotation (transform-style: preserve-3d +
// backface-visibility: hidden + a transition on the rotate), so the hover
// trigger works even before JS runs; JS adds the click trigger, keyboard
// support and the accessibility/agent layer.
//
// Attributes:
//   trigger   — "hover" (default; also flips on :focus-within) | "click"
//               (the card becomes a button, Enter/Space toggles) | "manual"
//               (only the flipped attribute flips it).
//   flipped   — boolean. Shows the back face; toggle it from code in any mode.
//   direction — "right" (default) | "left" | "up" | "down". Flip axis + spin.
//   duration  — flip time in ms (default 600).
//
// Events: flip — fired on flipped attribute change, detail { flipped }.
// Tokens: --pura-flip-card-duration, --pura-flip-card-ease,
//   --pura-flip-card-perspective, --pura-flip-card-radius.
// SSR / pre-JS: the front face renders static (or the back, if flipped is
//   set); the hover flip is pure CSS so it already works. Reduced motion:
//   no 3D rotation at all, the faces crossfade instead.
//
// Agent-native layer: each instance registers in window.__puraFlipCards by
//   data-pura-id with { flip, unflip, toggle, el }; data-pura-flipped and
//   data-pura-fc-trigger mirror state and config.
import { PuraElement, define } from "../base.js";
import meta from "./flip-card.meta.js";
import { flipCardTemplate } from "./flip-card.template.js";

let uid = 0;

function registry() {
  return (window.__puraFlipCards ||= new Map());
}

class PuraFlipCard extends PuraElement {
  static observedAttributes = ["flipped"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-flip-card-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = flipCardTemplate(this);
    this.render(html, css);

    this._hover = false;
    this._bind();
    this._sync(false);
    this.setAttribute("data-pura-fc-trigger", this.trigger);

    registry().set(this._id, {
      id: this._id,
      flip: () => this.flip(),
      unflip: () => this.unflip(),
      toggle: () => this.toggle(),
      el: this,
    });
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name, oldV, newV) {
    // attributes parse before connectedCallback; only react once rendered
    if (name === "flipped" && oldV !== newV && this.$(".card")) this._sync(true);
  }

  // ---- config ---------------------------------------------------------------
  get trigger() {
    const t = this.getAttribute("trigger");
    return t === "click" || t === "manual" ? t : "hover";
  }
  get flipped() {
    return this.hasAttribute("flipped");
  }

  // ---- public API -----------------------------------------------------------
  flip() {
    this.setAttribute("flipped", "");
  }
  unflip() {
    this.removeAttribute("flipped");
  }
  toggle() {
    this.toggleAttribute("flipped");
  }

  // ---- binding --------------------------------------------------------------
  _bind() {
    if (this.trigger === "click") {
      const card = this.$(".card");
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.addEventListener("click", () => this.toggle());
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggle();
        }
      });
    } else if (this.trigger === "hover") {
      // CSS already flips on hover/focus; JS just keeps aria-hidden in sync
      const on = () => { this._hover = true; this._faces(); };
      const off = () => { this._hover = false; this._faces(); };
      this.addEventListener("pointerenter", on);
      this.addEventListener("pointerleave", off);
      this.addEventListener("focusin", on);
      this.addEventListener("focusout", off);
    }
  }

  // ---- internals ------------------------------------------------------------
  _sync(fire) {
    this._faces();
    if (this.trigger === "click") {
      this.$(".card").setAttribute("aria-pressed", String(this.flipped));
    }
    if (this.flipped) this.setAttribute("data-pura-flipped", "");
    else this.removeAttribute("data-pura-flipped");
    if (fire) {
      this.dispatchEvent(new CustomEvent("flip", {
        bubbles: true,
        composed: true,
        detail: { flipped: this.flipped },
      }));
    }
  }

  // Hide the face that is turned away from assistive tech.
  _faces() {
    const front = this.$(".front");
    const back = this.$(".back");
    if (!front || !back) return;
    const showBack = this.flipped || this._hover;
    front.setAttribute("aria-hidden", showBack ? "true" : "false");
    back.setAttribute("aria-hidden", showBack ? "false" : "true");
  }
}

define("pura-flip-card", PuraFlipCard, meta);
export { PuraFlipCard };
