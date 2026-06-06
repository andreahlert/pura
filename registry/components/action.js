// <pura-action> — AGENT-NATIVE wrapper. Wraps a control (default slot) and
// exposes machine-readable affordances so AI / browser agents can discover and
// invoke it. It mirrors stable data-* attributes + an aria-label onto the
// slotted control, and registers the action in a global window.__puraActions
// registry (a Map keyed by action-id) whose entries expose invoke().
//
// Attributes:
//   intent     — human/agent-readable verb phrase, e.g. "save document"
//   action-id  — stable identifier (registry key)
//   params     — JSON object describing parameters for the action
// Slots:
//   (default)  — the control to wrap (e.g. a <button> / <pura-button>)
// Events:
//   invoke     — fired (bubbles, composed) when the control is activated; the
//                detail carries { actionId, intent, params }.
// Registry:
//   window.__puraActions : Map<actionId, {
//     actionId, intent, params, element, invoke() }>
import { PuraElement, define } from "../base.js";
import meta from "./action.meta.js";

// Lazily create (never assume it exists) the global registry.
function registry() {
  if (!window.__puraActions) window.__puraActions = new Map();
  return window.__puraActions;
}

class PuraAction extends PuraElement {
  static observedAttributes = ["intent", "action-id", "params"];

  connectedCallback() {
    // The shadow is a transparent passthrough: the wrapped control stays in
    // light DOM (where agents crawling the page / a11y tree can see it).
    this.render(`<slot></slot>`, CSS);
    this._slot = this.$("slot");
    this._control = null;
    this._registeredId = null;

    // One click listener on the wrapped control is the single activation path,
    // so author clicks and programmatic invoke() both flow through here.
    this._onClick = () => this._emit();

    this._slot.addEventListener("slotchange", () => this._bind());
    this._bind();
  }

  disconnectedCallback() {
    this._detachControl();
    this._unregister();
  }

  attributeChangedCallback() {
    if (!this.isConnected) return;
    // action-id may have changed: re-sync mirror + registry key.
    this._mirror();
    this._register();
  }

  // ---- control wiring ----------------------------------------------------

  // First assigned element is the wrapped control. May be absent / swapped.
  _resolveControl() {
    if (!this._slot) return null;
    const els = this._slot.assignedElements ? this._slot.assignedElements() : [];
    return els[0] || null;
  }

  _bind() {
    const next = this._resolveControl();
    if (next === this._control) {
      // same node, but its identity/registry inputs may need a refresh
      this._mirror();
      this._register();
      return;
    }
    this._detachControl();
    this._control = next;
    if (this._control) this._control.addEventListener("click", this._onClick);
    this._mirror();
    this._register();
  }

  _detachControl() {
    if (this._control) this._control.removeEventListener("click", this._onClick);
    this._control = null;
  }

  // ---- machine-readable mirror -------------------------------------------

  // Reflect the agent affordances onto the light-DOM control. Each is guarded
  // so an absent attribute never clobbers an author-set value.
  _mirror() {
    const el = this._control;
    if (!el) return;
    const id = this.getAttribute("action-id");
    const intent = this.getAttribute("intent");
    if (id != null) el.setAttribute("data-agent-action", id);
    if (intent != null) {
      el.setAttribute("data-intent", intent);
      // Only supply an aria-label if the author hasn't already labelled it.
      if (!el.hasAttribute("aria-label")) el.setAttribute("aria-label", intent);
    }
  }

  // ---- registry ----------------------------------------------------------

  _parseParams() {
    const raw = this.getAttribute("params");
    if (raw == null) return null;
    try {
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  _register() {
    const id = this.getAttribute("action-id");
    const reg = registry();
    // action-id changed → drop the stale key first.
    if (this._registeredId != null && this._registeredId !== id) {
      if (reg.get(this._registeredId)?.host === this) reg.delete(this._registeredId);
      this._registeredId = null;
    }
    if (id == null || id === "") return; // no stable id → not discoverable
    reg.set(id, {
      actionId: id,
      intent: this.getAttribute("intent") || null,
      params: this._parseParams(),
      host: this,
      get element() { return this.host._control; },
      invoke: () => this.invoke(),
    });
    this._registeredId = id;
  }

  _unregister() {
    if (this._registeredId == null) return;
    const reg = registry();
    if (reg.get(this._registeredId)?.host === this) reg.delete(this._registeredId);
    this._registeredId = null;
  }

  // ---- activation --------------------------------------------------------

  // Programmatic activation: route through the control's click so the single
  // listener fires exactly once (no double emit).
  invoke() {
    if (this._control && typeof this._control.click === "function") {
      this._control.click();
      return true;
    }
    // No control to click — still surface the intent for headless agents.
    this._emit();
    return false;
  }

  _emit() {
    this.dispatchEvent(new CustomEvent("invoke", {
      bubbles: true,
      composed: true,
      detail: {
        actionId: this.getAttribute("action-id") || null,
        intent: this.getAttribute("intent") || null,
        params: this._parseParams(),
      },
    }));
  }
}

const CSS = `
  :host { display: contents; }
`;

define("pura-action", PuraAction, meta);
export { PuraAction };
