// <pura-motion> — generic enter/exit motion primitive. Wraps any content and
// animates it in and out as the `show` attribute is toggled, the foundational
// presence wrapper the rest of pura's motion presets build on. (The name
// `presence` is already an avatar-stack component, hence `pura-motion`.)
//
// The motion itself is pure CSS, driven entirely by the `show` attribute (see
// motion.template.js): JS only toggles state, mirrors a machine-readable layer,
// and emits events. No JS tweening, no animation runtime — same zero-dependency,
// SSR-safe model as the shipped overlays.
//
// Attributes:
//   show      — boolean. Present = content visible (entered). Absent = content
//               removed (exited). Toggling it at runtime runs the transition;
//               an element rendered already-`show` (SSR) snaps in with no flash.
//   animation — fade (default) | slide-up | slide-down | slide-left |
//               slide-right | scale | fade-slide. Invalid values fall back to
//               fade.
//   appear    — boolean. When present and `show` is set at mount, the element
//               starts hidden and plays the enter animation on first frame
//               (opt-in mount animation; off by default so SSR content is calm).
//
// State (reflected, read-only via data-*): data-pura-motion-state cycles
//   entering -> entered on enter, exiting -> exited on exit (settled on
//   transitionend). Under reduced motion it jumps straight to entered/exited.
//
// Slots: default — the content to animate.
// Parts: content — the animated wrapper around the slotted content.
//
// Events: pura-motion (composed, bubbles) fired when `show` toggles; detail =
//   { id, animation, state: "enter" | "exit" }.
//
// Imperative API: enter() shows, exit() hides, toggle(force?) flips (or forces).
//
// Reduced motion: the entire transition block is scoped to
//   (prefers-reduced-motion: no-preference); under reduce, show/hide is an
//   instant display swap with no motion.
//
// Agent-native layer: each instance registers in window.__puraMotions keyed by
//   data-pura-id, and data-pura-motion-* attributes mirror its config
//   (animation) and live state (show, state), so an agent can enumerate, read
//   and drive every transition on the page without DOM diving.
import { PuraElement, define } from "../base.js";
import meta from "./motion.meta.js";
import { motionTemplate } from "./motion.template.js";

let uid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraMotions ||= new Map());
}

const ANIMATIONS = new Set([
  "fade",
  "slide-up",
  "slide-down",
  "slide-left",
  "slide-right",
  "scale",
  "fade-slide",
]);

class PuraMotion extends PuraElement {
  static observedAttributes = ["show", "animation", "appear"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-motion-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = motionTemplate(this);
    this.render(html, css);
    this._content = this.$(".content");

    // Settle the agent-readable state once the exit/enter transition finishes.
    this._content.addEventListener("transitionend", (e) => {
      if (e.propertyName !== "opacity" || e.target !== this._content) return;
      this._state = this.shown ? "entered" : "exited";
      this.setAttribute("data-pura-motion-state", this._state);
    });

    // appear: start hidden, then enter on the next frame so the transition runs
    // even though `show` was present at mount. _appearing guards the spurious
    // exit event the removeAttribute would otherwise emit.
    if (this.hasAttribute("appear") && this.shown) {
      this._appearing = true;
      this.removeAttribute("show");
      requestAnimationFrame(() => {
        this._appearing = false;
        if (this.isConnected) this.setAttribute("show", "");
      });
    }

    this._state = this.shown ? "entered" : "exited";
    this._reflectAgentState();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name, _old, val) {
    // Pre-render: connectedCallback seeds the initial state. Ignore the upgrade
    // pass so a server-rendered `show` does not emit a spurious enter event.
    if (!this._content) return;
    if (this._appearing) return;
    if (name === "show") {
      this._state = val !== null ? "entering" : "exiting";
      this.dispatchEvent(
        new CustomEvent("pura-motion", {
          bubbles: true,
          composed: true,
          detail: {
            id: this._id,
            animation: this.animation,
            state: val !== null ? "enter" : "exit",
          },
        })
      );
    }
    this._reflectAgentState();
  }

  // ---- config getters -----------------------------------------------------
  get animation() {
    const a = this.getAttribute("animation");
    return ANIMATIONS.has(a) ? a : "fade";
  }
  get shown() {
    return this.hasAttribute("show");
  }

  // ---- imperative API ------------------------------------------------------
  enter() {
    this.setAttribute("show", "");
  }
  exit() {
    this.removeAttribute("show");
  }
  toggle(force) {
    const next = force === undefined ? !this.shown : !!force;
    if (next) this.enter();
    else this.exit();
    return next;
  }

  // ---- internals ----------------------------------------------------------
  // Stable machine-readable mirror of config + live state on the host element.
  _reflectAgentState() {
    this.setAttribute("data-pura-motion-animation", this.animation);
    this.setAttribute("data-pura-motion-show", this.shown ? "true" : "false");
    if (this._state) this.setAttribute("data-pura-motion-state", this._state);
  }
}


define("pura-motion", PuraMotion, meta);
export { PuraMotion };
