// <pura-reveal> — animates slotted content into view when it first enters the
// viewport, observed via IntersectionObserver. The entrance is purely visual
// (opacity + transform); the content is always present in the accessibility
// tree, so there is no motion-only affordance and nothing is ever permanently
// hidden.
//
// Attributes:
//   animation — fade (default) | slide-up | zoom. The entrance style.
//   delay     — milliseconds to wait before animating once in view (number,
//               default 0). Applied as transition-delay, scoped to
//               (prefers-reduced-motion: no-preference) so reduced-motion users
//               never wait.
//   once      — when present, the element reveals a single time then stops
//               observing. When absent, it re-hides on exit and re-reveals on
//               re-entry.
//   threshold — IntersectionObserver threshold 0..1 (number, default 0.15).
//
// State (reflected, read-only): revealed — present while content is shown.
//
// Slots: default — the content to reveal.
//
// Parts: content — the animated wrapper around the slotted content.
//
// Events: pura-reveal (composed, bubbles) fired each time content transitions
//   to visible; detail = { id, animation, once }.
//
// Imperative API: reveal() shows now; reset() re-hides (no-op under reduced
//   motion, where content is always visible).
//
// Reduced motion: the hidden initial state and the delay live inside a
//   (prefers-reduced-motion: no-preference) media block, so under reduced
//   motion the content is visible from first paint with no delay and no
//   dependence on the observer firing.
//
// Degrades gracefully: with no attributes/children connectedCallback never
//   throws; if IntersectionObserver is unavailable the content reveals
//   immediately.
//
// Agent-native layer: each instance registers in window.__puraReveals keyed by
//   data-pura-id, and stable data-pura-reveal-* attributes mirror its config
//   (animation, once, delay) and live state (hidden|visible), so an agent can
//   enumerate, read and drive every reveal on the page without DOM diving.
import { PuraElement, define } from "../base.js";
import meta from "./reveal.meta.js";
import { revealTemplate } from "./reveal.template.js";

let uid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraReveals ||= new Map());
}

const ANIMATIONS = new Set(["fade", "slide-up", "zoom"]);

class PuraReveal extends PuraElement {
  static observedAttributes = ["animation", "delay", "once", "threshold"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-reveal-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = revealTemplate(this);
    this.render(html, css);

    this._revealed = false;
    this._syncStyle();

    // No IntersectionObserver (old engines / SSR-less degrade): reveal now so
    // content is never gated on an observer that will not fire.
    if (!("IntersectionObserver" in window)) {
      this.reveal();
      this._reflectAgentState();
      return;
    }

    this._io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.reveal();
            if (this.once && this._io) {
              this._io.unobserve(this);
              this._io.disconnect();
              this._io = null;
            }
          } else if (!this.once) {
            this.reset();
          }
        }
      },
      { threshold: this.threshold }
    );
    this._io.observe(this);
    this._reflectAgentState();
  }

  disconnectedCallback() {
    if (this._io) {
      this._io.disconnect();
      this._io = null;
    }
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this.isConnected) return;
    this._syncStyle();
    // threshold change needs a fresh observer to take effect.
    if (name === "threshold" && this._io) {
      this._io.disconnect();
      this._io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.reveal();
              if (this.once && this._io) {
                this._io.unobserve(this);
                this._io.disconnect();
                this._io = null;
              }
            } else if (!this.once) {
              this.reset();
            }
          }
        },
        { threshold: this.threshold }
      );
      this._io.observe(this);
    }
    this._reflectAgentState();
  }

  // ---- config getters -----------------------------------------------------
  get animation() {
    const a = this.getAttribute("animation");
    return ANIMATIONS.has(a) ? a : "fade";
  }
  get delay() {
    const n = parseFloat(this.getAttribute("delay"));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }
  get once() {
    return this.hasAttribute("once");
  }
  get threshold() {
    const n = parseFloat(this.getAttribute("threshold"));
    return Number.isFinite(n) && n >= 0 && n <= 1 ? n : 0.15;
  }
  get revealed() {
    return this.hasAttribute("revealed");
  }

  // ---- imperative API ------------------------------------------------------
  reveal() {
    if (this._revealed) return;
    this._revealed = true;
    this.setAttribute("revealed", "");
    this.setAttribute("data-pura-reveal-state", "visible");
    this.dispatchEvent(
      new CustomEvent("pura-reveal", {
        bubbles: true,
        composed: true,
        detail: { id: this._id, animation: this.animation, once: this.once },
      })
    );
  }

  reset() {
    if (!this._revealed) return;
    this._revealed = false;
    this.removeAttribute("revealed");
    this.setAttribute("data-pura-reveal-state", "hidden");
  }

  // ---- internals ----------------------------------------------------------
  // Drive the entrance distance/delay via custom properties consumed by CSS.
  _syncStyle() {
    this.style.setProperty("--_reveal-delay", `${this.delay}ms`);
  }

  // Stable machine-readable mirror of config + live state on the host element.
  _reflectAgentState() {
    this.setAttribute("data-pura-reveal-animation", this.animation);
    this.setAttribute("data-pura-reveal-once", this.once ? "true" : "false");
    this.setAttribute("data-pura-reveal-delay", String(this.delay));
    if (!this.hasAttribute("data-pura-reveal-state")) {
      this.setAttribute(
        "data-pura-reveal-state",
        this._revealed ? "visible" : "hidden"
      );
    }
  }
}


define("pura-reveal", PuraReveal, meta);
export { PuraReveal };
