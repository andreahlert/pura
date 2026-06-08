// <pura-optimistic> — AGENT-NATIVE. Wraps an action with optimistic UI + built-in
// rollback. On activate it immediately swaps in the optimistic result (slot
// name="optimistic"), moves to the "pending" state and emits `commit`. If the
// caller signals failure — via a `fail` event dispatched on the host, or by
// calling `.rollback(reason)` — it reverts to the original content (default
// slot), announces the rollback in an aria-live region, and emits `rollback`.
// When the caller confirms success it calls `.confirm()` (or fires `success`)
// and the component settles into the "committed" state, emitting `confirm`.
//
// Slots:
//   trigger    — the activator (button/link). If omitted, a built-in button is
//                shown using the `label` attribute. Activated by click or by the
//                host `.activate()` method.
//   (default)  — the original / pre-action content (shown while idle and after
//                rollback).
//   optimistic — the optimistic result shown immediately on activate.
//
// Attributes (observed):
//   label        — text for the built-in trigger button (default "Confirmar").
//   state        — reflected read-only-ish lifecycle: idle | pending | committed
//                  | failed. Authors may set an initial state; the component owns
//                  it afterwards.
//   disabled     — blocks activation.
//   rollback-message — announcement text used when reverting (default
//                  "Ação revertida.").
//   auto         — when present, activation also auto-confirms on the next frame
//                  (demo / no-backend mode); without it the caller drives the
//                  outcome via confirm()/rollback()/events.
//
// Methods:
//   activate()         — begin the optimistic action.
//   confirm()          — settle as committed (success).
//   rollback(reason)   — revert to original + announce.
//   reset()            — return to idle, showing the original content.
//
// Events (all bubble, composed): `commit` (on activate, detail {id}),
//   `confirm` (detail {id}), `rollback` (detail {id, reason}).
//
// Machine-readable layer:
//   - stable data-* on host: data-pura-optimistic, data-optimistic-id,
//     data-state (mirrors lifecycle), data-pending ("" while pending).
//   - ARIA: a polite live region announces state transitions; the built-in
//     trigger carries aria-busy while pending.
//   - global window.__puraOptimistic registry: a live Map keyed by id with
//     { id, state, el, activate, confirm, rollback, reset } entries plus a
//     query(state) helper, so an agent can enumerate and drive every optimistic
//     action on the page.
import { PuraElement, define } from "../base.js";
import meta from "./optimistic.meta.js";
import { optimisticTemplate } from "./optimistic.template.js";

// Module-level counter for stable, unique ids + anchor-names per instance.
let uid = 0;

const STATES = new Set(["idle", "pending", "committed", "failed"]);

// Live global registry so agents can enumerate + drive every action on the page.
function registry() {
  if (!window.__puraOptimistic) {
    const map = new Map();
    map.query = (state) =>
      [...map.values()].filter((e) => !state || e.state === state);
    window.__puraOptimistic = map;
  }
  return window.__puraOptimistic;
}

class PuraOptimistic extends PuraElement {
  static observedAttributes = ["label", "state", "disabled", "rollback-message"];

  connectedCallback() {
    this._id = this.id || `pura-optimistic-${uid++}`;
    this._anchor = `--pura-optimistic-${uid}`;
    this._state = this._readInitialState();

    const { html, css } = optimisticTemplate(this);
    this.render(html, css);

    this._statusEl = this.$("[part='status']");
    this._triggerSlot = this.$("slot[name='trigger']");
    this._fallbackBtn = this.$("button.fallback");

    // Activate from either a slotted trigger or the built-in fallback button.
    this._onActivate = (e) => {
      // Don't double-fire when the fallback button bubbles into the slot.
      if (e) e.stopPropagation();
      this.activate();
    };
    this._wireTriggers();
    this._triggerSlot.addEventListener("slotchange", () => this._wireTriggers());

    // Caller-driven outcome via host events.
    this.addEventListener("fail", this._onFail = (e) => {
      const reason = e && e.detail && e.detail.reason;
      this.rollback(reason);
    });
    this.addEventListener("success", this._onSuccess = () => this.confirm());

    this._syncLabel();
    this._apply(this._state);
  }

  disconnectedCallback() {
    this.removeEventListener("fail", this._onFail);
    this.removeEventListener("success", this._onSuccess);
    registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._statusEl) return; // not yet rendered
    if (name === "label") this._syncLabel();
    if (name === "state") {
      const next = this.getAttribute("state");
      if (STATES.has(next) && next !== this._state) this._apply(next);
    }
  }

  // -- public API ---------------------------------------------------------
  get state() {
    return this._state;
  }

  // Begin the optimistic action: swap to the optimistic view + emit `commit`.
  activate() {
    if (this.hasAttribute("disabled")) return;
    if (this._state === "pending") return;
    this._apply("pending");
    this._emit("commit", { id: this._id });
    // demo mode: settle as success on the next frame
    if (this.hasAttribute("auto")) {
      requestAnimationFrame(() => {
        if (this._state === "pending") this.confirm();
      });
    }
  }

  // Settle as committed (success). No-op unless currently pending.
  confirm() {
    if (this._state !== "pending") return;
    this._apply("committed");
    this._emit("confirm", { id: this._id });
  }

  // Revert to the original content + announce the rollback.
  rollback(reason) {
    if (this._state !== "pending") return;
    this._apply("failed");
    this._announce(this._rollbackMessage(reason));
    this._emit("rollback", { id: this._id, reason: reason != null ? String(reason) : null });
  }

  // Return to a clean idle state showing the original content.
  reset() {
    this._apply("idle");
  }

  // -- internals ----------------------------------------------------------
  _readInitialState() {
    const s = this.getAttribute("state");
    return STATES.has(s) ? s : "idle";
  }

  _rollbackMessage(reason) {
    if (reason) return String(reason);
    return this.getAttribute("rollback-message") || "Ação revertida.";
  }

  // Apply a lifecycle state: reflect attrs/data-*, update busy + registry.
  _apply(state) {
    this._state = state;
    if (this.getAttribute("state") !== state) this.setAttribute("state", state);

    // stable machine-readable layer
    this.setAttribute("data-pura-optimistic", "");
    this.setAttribute("data-optimistic-id", this._id);
    this.setAttribute("data-state", state);
    if (state === "pending") this.setAttribute("data-pending", "");
    else this.removeAttribute("data-pending");

    const busy = state === "pending";
    if (this._fallbackBtn) this._fallbackBtn.setAttribute("aria-busy", busy ? "true" : "false");
    this._slottedTriggers().forEach((t) => {
      if (t.setAttribute) t.setAttribute("aria-busy", busy ? "true" : "false");
    });

    // Keep the global registry current on every transition.
    this._register();
  }

  _wireTriggers() {
    if (this._fallbackBtn) {
      this._fallbackBtn.removeEventListener("click", this._onActivate);
      this._fallbackBtn.addEventListener("click", this._onActivate);
    }
    this._slottedTriggers().forEach((t) => {
      t.removeEventListener("click", this._onActivate);
      t.addEventListener("click", this._onActivate);
    });
  }

  _slottedTriggers() {
    if (!this._triggerSlot) return [];
    return this._triggerSlot
      .assignedElements({ flatten: true })
      .filter((el) => el && el.nodeType === 1);
  }

  _syncLabel() {
    if (this._fallbackBtn) {
      this._fallbackBtn.textContent = this.getAttribute("label") || "Confirmar";
    }
  }

  // Push a fresh announcement into the polite live region.
  _announce(text) {
    if (!this._statusEl || !text) return;
    // Clearing first nudges AT to re-announce identical consecutive messages.
    this._statusEl.textContent = "";
    requestAnimationFrame(() => {
      if (this._statusEl) this._statusEl.textContent = text;
    });
  }

  _emit(name, detail) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
  }

  _register() {
    registry().set(this._id, {
      id: this._id,
      state: this._state,
      el: this,
      activate: () => this.activate(),
      confirm: () => this.confirm(),
      rollback: (reason) => this.rollback(reason),
      reset: () => this.reset(),
    });
  }
}


define("pura-optimistic", PuraOptimistic, meta);
export { PuraOptimistic };
