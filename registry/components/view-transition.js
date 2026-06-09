// <pura-view-transition> — morph between UI states with the native View
// Transitions API, zero dependency. Call transition(updateFn) to run any DOM
// update wrapped in a cross-fade; children that share a `view-transition-name`
// across the before/after states "magic move" between their positions. Degrades
// to an instant update when the API is unavailable or reduced motion is on.
//
// Attributes:
//   name — applies view-transition-name to the host so it morphs as a single
//          shared element across page-level transitions.
//
// Slots: default — the content whose state changes are animated.
//
// Methods: transition(updateFn) -> Promise. Runs updateFn (which mutates the
//   slotted DOM) inside startViewTransition and resolves when the morph
//   finishes. Also emits pura-view-transition { phase: "start" | "finish" }.
//
// Reduced motion / unsupported: updateFn runs synchronously, the promise
//   resolves immediately, and the same events still fire so callers are
//   API-agnostic.
//
// Agent-native layer: registers in window.__puraViewTransitions keyed by
//   data-pura-id; data-pura-view-transition-name mirrors the name attribute.
import { PuraElement, define } from "../base.js";
import meta from "./view-transition.meta.js";
import { viewTransitionTemplate } from "./view-transition.template.js";
import { viewTransition } from "../animate.js";

let uid = 0;

function registry() {
  return (window.__puraViewTransitions ||= new Map());
}

class PuraViewTransition extends PuraElement {
  static observedAttributes = ["name"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-view-transition-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = viewTransitionTemplate(this);
    this.render(html, css);
    this._applyName();
    this._reflectAgentState();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot.childNodes.length) return;
    this._applyName();
    this._reflectAgentState();
  }

  // Run a DOM update inside a view transition. updateFn should perform the
  // mutation that changes the slotted content; the morph plays around it.
  transition(updateFn) {
    this._emit("start");
    const finished = viewTransition(() => updateFn?.(this));
    return Promise.resolve(finished).then((r) => {
      this._emit("finish");
      return r;
    });
  }

  _emit(phase) {
    this.dispatchEvent(
      new CustomEvent("pura-view-transition", {
        bubbles: true,
        composed: true,
        detail: { id: this._id, phase },
      })
    );
  }

  _applyName() {
    const name = this.getAttribute("name");
    this.style.viewTransitionName = name || "";
  }

  _reflectAgentState() {
    this.setAttribute(
      "data-pura-view-transition-name",
      this.getAttribute("name") || ""
    );
  }
}


define("pura-view-transition", PuraViewTransition, meta);
export { PuraViewTransition };
