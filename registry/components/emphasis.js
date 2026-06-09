// <pura-emphasis> — attention-seeking emphasis animations (bounce, heartbeat,
// wiggle, tada, shake, pulse, flash) as a wrapper. The motion is pure CSS
// @keyframes; JS only flips a data-playing flag for the view/manual triggers
// (hover and loop are CSS-only). base.js RESET neutralizes it under reduced
// motion.
//
// Attributes:
//   animation — bounce | heartbeat | wiggle | tada | shake | pulse | flash.
//   trigger   — "hover" (CSS) | "view" (on first intersection) | "loop" (CSS,
//               infinite) | "manual" (default; only via play()).
//
// Theming: --pura-emphasis-duration (default var(--pura-duration-5)).
//
// Slots: default — the content to emphasize.
// Parts: content — the animated wrapper.
//
// Events: pura-emphasis (composed, bubbles) when a play finishes; detail =
//   { id, animation }.
// Methods: play() runs the animation once now.
//
// Agent-native layer: registers in window.__puraEmphasis keyed by data-pura-id;
//   data-pura-emphasis-animation mirrors the preset.
import { PuraElement, define } from "../base.js";
import meta from "./emphasis.meta.js";
import { emphasisTemplate } from "./emphasis.template.js";

let uid = 0;

function registry() {
  return (window.__puraEmphasis ||= new Map());
}

const ANIMATIONS = new Set([
  "bounce",
  "heartbeat",
  "wiggle",
  "tada",
  "shake",
  "pulse",
  "flash",
]);

class PuraEmphasis extends PuraElement {
  static observedAttributes = ["animation", "trigger"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-emphasis-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = emphasisTemplate(this);
    this.render(html, css);
    this._content = this.$(".content");

    this._content.addEventListener("animationend", () => {
      this.removeAttribute("data-playing");
      this.dispatchEvent(
        new CustomEvent("pura-emphasis", {
          bubbles: true,
          composed: true,
          detail: { id: this._id, animation: this.animation },
        })
      );
    });

    if (this.trigger === "view" && "IntersectionObserver" in window) {
      this._io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              this.play();
              this._io?.disconnect();
              this._io = null;
            }
          }
        },
        { threshold: 0.4 }
      );
      this._io.observe(this);
    }

    this._reflectAgentState();
  }

  disconnectedCallback() {
    this._io?.disconnect();
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this._content) return;
    this._reflectAgentState();
  }

  get animation() {
    const a = this.getAttribute("animation");
    return ANIMATIONS.has(a) ? a : "pulse";
  }
  get trigger() {
    return this.getAttribute("trigger") || "manual";
  }

  // Replay even mid-animation: drop the flag, force reflow, re-add.
  play() {
    this.removeAttribute("data-playing");
    void this._content.offsetWidth;
    this.setAttribute("data-playing", "");
  }

  _reflectAgentState() {
    this.setAttribute("data-pura-emphasis-animation", this.animation);
  }
}


define("pura-emphasis", PuraEmphasis, meta);
export { PuraEmphasis };
