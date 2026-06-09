// <pura-narrated-transition> — runs a UI state change inside the native View
// Transitions API (like <pura-view-transition>) but, crucially, *narrates* it:
// it captures the named state before and after, diffs them, and emits a
// structured, agent- and screen-reader-readable account of WHAT changed and
// WHY. Where <pura-view-transition> answers "play a morph", this answers "play
// a morph AND tell me it went from {status:'idle'} to {status:'done'} because
// 'order placed', changing `status`". That payload is the whole point: an agent
// reading the page learns the semantic delta, not just that pixels moved.
//
// State is a plain object you own: seed it with the `.state` property (or a
// JSON `state` attribute), then drive changes through
// `transition({ to, reason }, updateFn)`. The component captures `from`, runs
// `updateFn` inside the view transition, applies `to`, diffs, and emits.
//
// Attributes:
//   name  — applies view-transition-name to the host so it morphs as a shared
//           element across page-level transitions.
//   state — optional initial state as a JSON object.
//
// Slots: default — the content whose state changes are animated.
// Parts: content, narration (the live region).
//
// Methods:
//   transition({ to, reason }, updateFn?) -> Promise<narration>
//   narrate(to, reason) -> narration  (diff + emit + announce, no morph)
//   get/set .state
//
// Event: transitionnarrate { id, from, to, reason, changed, at } (bubbles,
//   composed). `changed` is an array of { key, from, to }.
//
// Reduced motion / unsupported: the morph degrades to an instant update (via
//   ../animate.js viewTransition), but the narration still fires identically.
//
// Agent-native layer: registers in window.__puraNarratedTransitions by
//   data-pura-id; data-pura-narration-reason and data-pura-narration-changed
//   mirror the latest narration.
import { PuraElement, define } from "../base.js";
import meta from "./narrated-transition.meta.js";
import { narratedTransitionTemplate } from "./narrated-transition.template.js";
import { viewTransition } from "../animate.js";

let uid = 0;

function registry() {
  return (window.__puraNarratedTransitions ||= new Map());
}

// Pure: assemble a narration payload from two state snapshots. `changed` lists
// every key whose value differs (Object.is), with its before/after values.
// Tolerant of null/undefined snapshots.
export function buildNarration(from, to, reason) {
  const a = from && typeof from === "object" ? from : {};
  const b = to && typeof to === "object" ? to : {};
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const changed = [];
  for (const k of keys) {
    if (!Object.is(a[k], b[k])) changed.push({ key: k, from: a[k], to: b[k] });
  }
  return { from: { ...a }, to: { ...b }, reason: reason ?? null, changed };
}

// Pure: a short human/SR sentence for a narration. Prefers the reason, then
// names the changed keys, then a generic fallback.
export function describeNarration(n) {
  const keys = n.changed.map((c) => c.key);
  if (n.reason && keys.length) return `${n.reason} (${keys.join(", ")})`;
  if (n.reason) return n.reason;
  if (keys.length) return `Changed ${keys.join(", ")}`;
  return "No change";
}

class PuraNarratedTransition extends PuraElement {
  static observedAttributes = ["name"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-narrated-transition-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = narratedTransitionTemplate(this);
    this.render(html, css);
    this._live = this.$(".sr");

    // Seed state from the JSON `state` attribute when present.
    this._state = {};
    const raw = this.getAttribute("state");
    if (raw) {
      try { this._state = JSON.parse(raw) || {}; } catch (_) { /* ignore bad JSON */ }
    }

    this._applyName();
    this._reflectAgentState();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot?.childNodes.length) return;
    this._applyName();
  }

  // ---- state ----------------------------------------------------------------
  get state() { return { ...this._state }; }
  set state(v) { this._state = v && typeof v === "object" ? { ...v } : {}; }

  // ---- transitions ----------------------------------------------------------
  // Morph + narrate. `to` is merged onto the current state; `reason` explains
  // the change. updateFn performs the DOM mutation the morph plays around.
  transition({ to = {}, reason = null } = {}, updateFn) {
    const from = this.state;
    const next = { ...from, ...to };
    const finished = viewTransition(() => updateFn?.(this));
    this._state = next;
    const narration = this._emit(from, next, reason);
    return Promise.resolve(finished).then(() => narration);
  }

  // Narrate a state change with no morph (e.g. an instantaneous update).
  narrate(to = {}, reason = null) {
    const from = this.state;
    const next = { ...from, ...to };
    this._state = next;
    return this._emit(from, next, reason);
  }

  _emit(from, to, reason) {
    const n = buildNarration(from, to, reason);
    const sentence = describeNarration(n);
    if (this._live) this._live.textContent = sentence;
    this.setAttribute("data-pura-narration-reason", n.reason || "");
    this.setAttribute("data-pura-narration-changed", n.changed.map((c) => c.key).join(" "));
    this.dispatchEvent(new CustomEvent("transitionnarrate", {
      bubbles: true,
      composed: true,
      detail: { id: this._id, ...n, at: now() },
    }));
    return n;
  }

  _applyName() {
    this.style.viewTransitionName = this.getAttribute("name") || "";
  }

  _reflectAgentState() {
    this.setAttribute("data-pura-narration-reason", "");
    this.setAttribute("data-pura-narration-changed", "");
  }
}

function now() {
  return typeof performance !== "undefined" && performance.now
    ? Math.round(performance.now())
    : 0;
}

define("pura-narrated-transition", PuraNarratedTransition, meta);
export { PuraNarratedTransition };
