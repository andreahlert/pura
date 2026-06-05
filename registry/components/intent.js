// <pura-intent> — AGENT-NATIVE semantic affordance. Annotates a region of the
// page with a machine-readable goal/purpose so autonomous agents can discover
// "what this area is for" and "what can be done here" by crawling the DOM.
//
// It is intentionally NON-VISUAL: the host renders display:contents (its
// children flow as if the wrapper were not there) and adds no chrome. The
// payload is the semantic + machine-readable layer:
//   - ARIA reflected onto the HOST (light DOM): role=region + aria-label=goal,
//     so document.querySelectorAll('[role="region"]') / the a11y tree see it.
//   - data-intent="<goal>" on the host, so agents can run
//     document.querySelectorAll('[data-intent]') to enumerate annotated regions.
//   - data-intent-actions reflected on the host when sub-actions are declared.
//   - A global window.__puraIntents registry of live entries
//     ({ goal, element, actions }) maintained across connect/disconnect/attr.
//
// Attributes:
//   goal     — human/agent-readable purpose of the region (string). Reflected to
//              aria-label + data-intent. Omitted => no aria-label (no empty one).
//   actions  — JSON array of sub-actions an agent can take in this region, e.g.
//              actions='[{"name":"submit","label":"Send order"}]'. Malformed
//              JSON degrades to [] instead of throwing.
//
// Slots: default — the annotated content (rendered as-is, no wrapper box).
//
// API: .goal (get/set), .actions (get parsed array). Static
//   PuraIntent.registry() returns a snapshot array of connected entries.
//   PuraIntent.find(goalSubstring) filters that snapshot.
import { PuraElement, define } from "../base.js";

// Module-level counter kept available for parity with other pura components
// that mint unique anchor-names; <pura-intent> is non-visual so it does not
// open a floating panel, but each instance still gets a stable id for the
// registry and for agents to reference.
let uid = 0;

// Global, append-only-then-pruned registry of live intent regions. Agents can
// read window.__puraIntents directly without touching any shadow DOM.
function ensureRegistry() {
  if (!window.__puraIntents) {
    Object.defineProperty(window, "__puraIntents", {
      value: [],
      writable: true,
      configurable: true,
      enumerable: true,
    });
  }
  return window.__puraIntents;
}

class PuraIntent extends PuraElement {
  static observedAttributes = ["goal", "actions"];

  connectedCallback() {
    if (this._id == null) this._id = `pura-intent-${uid++}`;
    // Non-visual: just project children through. The semantic layer lives on
    // the host element in the light DOM where crawlers/AT can see it.
    this.render(`<slot></slot>`, CSS);
    this._reflect();
    this._register();
  }

  disconnectedCallback() {
    this._unregister();
  }

  attributeChangedCallback() {
    // Guard: attributeChangedCallback can fire before connectedCallback.
    if (!this.isConnected) return;
    this._reflect();
    this._updateRegistry();
  }

  // --- machine-readable layer ------------------------------------------------

  // Reflect goal + actions onto the HOST so agents see them via light-DOM
  // queries ([data-intent], [role=region]) and assistive tech via ARIA.
  _reflect() {
    const goal = this.getAttribute("goal");

    // role=region: only set if the author has not chosen their own role.
    if (!this.hasAttribute("role")) this.setAttribute("role", "region");

    if (goal != null && goal !== "") {
      this.setAttribute("aria-label", goal);
      this.setAttribute("data-intent", goal);
    } else {
      // No goal => do not leave an empty aria-label/data-intent lying around.
      this.removeAttribute("aria-label");
      this.setAttribute("data-intent", "");
    }

    const actions = this.actions;
    if (actions.length) {
      this.setAttribute("data-intent-actions", String(actions.length));
    } else {
      this.removeAttribute("data-intent-actions");
    }

    this.setAttribute("data-intent-id", this._id);
  }

  _entry() {
    return { id: this._id, goal: this.goal, element: this, actions: this.actions };
  }

  _register() {
    const reg = ensureRegistry();
    if (!reg.some((e) => e.element === this)) reg.push(this._entry());
  }

  _updateRegistry() {
    const reg = ensureRegistry();
    const existing = reg.find((e) => e.element === this);
    if (existing) {
      existing.goal = this.goal;
      existing.actions = this.actions;
    } else {
      reg.push(this._entry());
    }
  }

  _unregister() {
    const reg = window.__puraIntents;
    if (!reg) return;
    const i = reg.findIndex((e) => e.element === this);
    if (i >= 0) reg.splice(i, 1);
  }

  // --- public API ------------------------------------------------------------

  get goal() {
    return this.getAttribute("goal") || "";
  }
  set goal(v) {
    if (v == null || v === "") this.removeAttribute("goal");
    else this.setAttribute("goal", String(v));
  }

  // Parsed sub-actions. Malformed JSON degrades to [] (never throws).
  get actions() {
    const raw = this.getAttribute("actions");
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  // Snapshot (array) of all connected intent regions.
  static registry() {
    return (window.__puraIntents || []).slice();
  }

  // Find connected regions whose goal contains `q` (case-insensitive).
  static find(q) {
    const needle = String(q || "").toLowerCase();
    return (window.__puraIntents || []).filter((e) =>
      (e.goal || "").toLowerCase().includes(needle)
    );
  }
}

const CSS = `
  /* Non-visual annotation: the host disappears from layout, children flow
     as if it were not present. No color/box affordances by design. */
  :host { display: contents; }
`;

define("pura-intent", PuraIntent);

export { PuraIntent };
export default PuraIntent;
