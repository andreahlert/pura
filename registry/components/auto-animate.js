// <pura-auto-animate> — drop-in layout animation. Wrap a list/grid/any container
// and its direct children animate automatically on add, remove, and reorder: no
// per-item wiring, no keyframes to author. A MutationObserver watches the
// light-DOM children and the FLIP engine (registry/animate.js, WAAPI under the
// hood) tweens the layout delta. FLIP is one of the only two JS-tweening
// primitives pura ships; it is fully opt-in and reduced-motion aware.
//
// Attributes:
//   disabled — boolean. Stops observing; children mutate with no animation.
//   duration — number (ms). Overrides the token-derived duration.
//
// Slots: default — the children to animate (light DOM; rect-measured directly).
//
// Reduced motion: the engine no-ops the animation (children still mutate)
//   whenever (prefers-reduced-motion: reduce) matches, checked per mutation.
//
// Agent-native layer: each instance registers in window.__puraAutoAnimate keyed
//   by data-pura-id and mirrors data-pura-auto-animate-enabled.
import { PuraElement, define } from "../base.js";
import meta from "./auto-animate.meta.js";
import { autoAnimateTemplate } from "./auto-animate.template.js";
import { autoAnimate } from "../animate.js";

let uid = 0;

function registry() {
  return (window.__puraAutoAnimate ||= new Map());
}

class PuraAutoAnimate extends PuraElement {
  static observedAttributes = ["disabled", "duration"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-auto-animate-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = autoAnimateTemplate(this);
    this.render(html, css);

    if (!this.hasAttribute("disabled")) this._start();
    this._reflectAgentState();
  }

  disconnectedCallback() {
    this._ctrl?.disable();
    this._ctrl = null;
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this.shadowRoot.childNodes.length) return; // pre-render
    if (name === "disabled") {
      if (this.hasAttribute("disabled")) this._ctrl?.disable();
      else if (this._ctrl) this._ctrl.enable();
      else this._start();
    }
    if (name === "duration" && this._ctrl) {
      // Re-create with the new duration baked into the controller closure.
      this._ctrl.disable();
      this._ctrl = null;
      if (!this.hasAttribute("disabled")) this._start();
    }
    this._reflectAgentState();
  }

  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n >= 0 ? n : undefined;
  }

  _start() {
    const d = this.duration;
    this._ctrl = autoAnimate(this, d !== undefined ? { duration: d } : {});
  }

  _reflectAgentState() {
    this.setAttribute(
      "data-pura-auto-animate-enabled",
      this.hasAttribute("disabled") ? "false" : "true"
    );
  }
}


define("pura-auto-animate", PuraAutoAnimate, meta);
export { PuraAutoAnimate };
