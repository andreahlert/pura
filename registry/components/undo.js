// <pura-undo> — AGENT-NATIVE. Performs an action and shows an undo affordance
// for a window before the action is treated as committed. Renders a small inline
// snackbar with a message + an Undo button. Ideal for delete flows ("Deleted.
// Undo?") where the real side effect is deferred until the window elapses.
//
// Lifecycle / state machine: idle → pending → (undone | committed).
//   run()    — emits `action`, enters `pending`, shows the snackbar, starts the
//              timeout timer.
//   undo()   — if pending, emits `undo`, clears the timer, hides the snackbar.
//   commit() — if pending (or on timer expiry), emits `commit`, hides the
//              snackbar. The setTimeout is the single source of truth for commit.
// `undo` and `commit` are mutually exclusive and each fires at most once per run.
//
// Slots:
//   trigger — the clickable that starts the flow (its click calls run()).
//   default — the snackbar message text (falls back to attr `label`).
// Attributes:
//   timeout — undo window in ms (default 5000; <= 0 means the snackbar is sticky
//             and only undo()/commit() resolve it).
//   label   — message text when no default slot content is provided.
//   undo-label — text for the undo button (default "Undo").
// Events (all bubble): `action` (on run), `undo` (undone in time),
//   `commit` (window elapsed or committed). detail = { id, label }.
//
// Machine-readable layer:
//   - stable data-* on the host: data-pura-undo, data-undo-id, data-state.
//   - snackbar is role="status" aria-live="polite" so it is announced.
//   - global window.__puraUndo registry: a live Map keyed by undo-id with
//     { id, state, label, remaining, run, undo, commit, el } entries plus a
//     .pending() helper listing every instance currently awaiting resolution.
import { PuraElement, define } from "../base.js";
import meta from "./undo.meta.js";

// Module-level counter for stable, unique ids per instance.
let uid = 0;

// Live global registry so agents can enumerate / drive every undo flow on the page.
function registry() {
  if (!window.__puraUndo) {
    const map = new Map();
    map.pending = () => [...map.values()].filter((u) => u.state === "pending");
    window.__puraUndo = map;
  }
  return window.__puraUndo;
}

class PuraUndo extends PuraElement {
  static observedAttributes = ["label", "undo-label"];

  connectedCallback() {
    this._id = this.id || `pura-undo-${uid++}`;
    this._state = "idle";
    this._timer = null;
    this._timerStart = 0;
    this._remaining = 0;

    this.render(
      `<span class="trigger" part="trigger"><slot name="trigger"></slot></span>
       <div class="snackbar" part="snackbar" role="status" aria-live="polite" hidden>
         <span class="msg" part="message"></span>
         <button class="undo" part="undo" type="button"></button>
       </div>`,
      CSS
    );

    this._trigger = this.$(".trigger");
    this._snackbar = this.$(".snackbar");
    this._msg = this.$(".msg");
    this._undoBtn = this.$(".undo");

    // Starting the flow: slotted trigger click → run().
    this._trigger.addEventListener("click", () => this.run());
    this._undoBtn.addEventListener("click", () => this.undo());

    this._syncLabels();
    this._publish();
  }

  disconnectedCallback() {
    clearTimeout(this._timer);
    registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._undoBtn) this._syncLabels();
  }

  // --- public API ----------------------------------------------------------

  // Perform the action and open the undo window. Emits `action`, enters pending.
  run() {
    if (this._state === "pending") return; // already awaiting resolution
    this._state = "pending";
    this._remaining = this._timeoutMs();
    this._emit("action");
    this._showSnackbar();
    this._reflect();
    this._publish();
    this._startTimer();
  }

  // Cancel the action within the window. Emits `undo` exactly once.
  undo() {
    if (this._state !== "pending") return;
    clearTimeout(this._timer);
    this._timer = null;
    this._state = "undone";
    this._hideSnackbar();
    this._reflect();
    this._publish();
    this._emit("undo");
  }

  // Finalize the action. Emits `commit` exactly once. Called by timer expiry.
  commit() {
    if (this._state !== "pending") return;
    clearTimeout(this._timer);
    this._timer = null;
    this._state = "committed";
    this._hideSnackbar();
    this._reflect();
    this._publish();
    this._emit("commit");
  }

  // Current lifecycle state: idle | pending | undone | committed.
  get state() {
    return this._state;
  }

  // --- internals -------------------------------------------------------------

  _timeoutMs() {
    const t = parseInt(this.getAttribute("timeout") || "", 10);
    return Number.isFinite(t) ? t : 5000;
  }

  // The undo window timer is the single source of truth for commit. CSS motion
  // (the shrinking bar) is decorative only and collapses under reduced motion.
  _startTimer() {
    if (this._remaining <= 0) return; // sticky: resolve only via undo()/commit()
    clearTimeout(this._timer);
    this._timerStart = Date.now();
    this._timer = setTimeout(() => this.commit(), this._remaining);
  }

  _label() {
    const slotted = (this.textContent || "").replace(/\s+/g, " ").trim();
    return slotted || this.getAttribute("label") || "Action performed.";
  }

  _syncLabels() {
    if (this._msg) this._msg.textContent = this._label();
    if (this._undoBtn) {
      const ul = this.getAttribute("undo-label") || "Undo";
      this._undoBtn.textContent = ul;
      this._undoBtn.setAttribute("aria-label", ul);
    }
  }

  _showSnackbar() {
    this._syncLabels();
    this._snackbar.hidden = false;
    // animate in on next frame (decorative; neutralized under reduced motion)
    requestAnimationFrame(() => this._snackbar.classList.add("in"));
  }

  _hideSnackbar() {
    this._snackbar.classList.remove("in");
    this._snackbar.hidden = true;
  }

  // Reflect machine-readable state onto the host (light DOM).
  _reflect() {
    this.setAttribute("data-pura-undo", "");
    this.setAttribute("data-undo-id", this._id);
    this.setAttribute("data-state", this._state);
  }

  // Publish a live entry to the global registry.
  _publish() {
    this._reflect();
    const remaining = () => {
      if (this._state !== "pending" || this._remaining <= 0) return this._remaining;
      return Math.max(0, this._remaining - (Date.now() - this._timerStart));
    };
    registry().set(this._id, {
      id: this._id,
      state: this._state,
      label: this._label(),
      get remaining() { return remaining(); },
      run: () => this.run(),
      undo: () => this.undo(),
      commit: () => this.commit(),
      el: this,
    });
  }

  _emit(type) {
    this.dispatchEvent(
      new CustomEvent(type, {
        bubbles: true,
        detail: { id: this._id, label: this._label() },
      })
    );
  }
}

const CSS = `
  :host { display: inline-block; }
  .trigger { display: inline-flex; }
  .trigger:empty { display: none; }

  .snackbar {
    display: inline-flex; align-items: center; gap: var(--pura-space-3);
    margin-top: var(--pura-space-2);
    padding: var(--pura-space-3) var(--pura-space-4);
    border-radius: var(--pura-radius);
    border: 1px solid var(--pura-border); background: var(--pura-bg);
    color: var(--pura-fg); box-shadow: var(--pura-shadow-lg);
    font-size: var(--pura-text-sm);
    width: max-content; max-width: min(24rem, 92vw);
    opacity: 0; transform: translateY(6px) scale(0.98);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .snackbar.in { opacity: 1; transform: none; }
  .snackbar[hidden] { display: none; }

  [part="message"] {
    flex: 1; min-width: 0; color: var(--pura-fg); line-height: 1.5;
    word-wrap: break-word;
  }

  .undo {
    flex: none; align-self: center; font: inherit; font-size: var(--pura-text-xs);
    font-weight: 550; line-height: 1; white-space: nowrap; cursor: pointer;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    background: var(--pura-bg); color: var(--pura-fg);
    padding: var(--pura-space-2) var(--pura-space-3);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .undo:hover { background: var(--pura-subtle); }
  .undo:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
`;

define("pura-undo", PuraUndo, meta);
export { PuraUndo };
