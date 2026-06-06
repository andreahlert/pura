// <pura-idle> — AGENT-NATIVE inactivity detector. An invisible wrapper that
// watches for user input and flips between "active" and "idle" after a period
// of no interaction. Useful for auto-save, auto-lock, "are you still there?"
// affordances, and for agents that need to know whether a human is present.
//
// It is NON-VISUAL: the host renders display:contents (children flow as if the
// wrapper were not there). The payload is the behavior + a machine-readable
// layer that agents can read without touching any shadow DOM.
//
// Attributes:
//   timeout  — inactivity window in ms before going idle (default 60000).
//              Non-numeric / negative values fall back to the default.
//   events   — space-separated list of input events to listen for. Defaults to
//              "mousemove keydown pointerdown wheel touchstart scroll". An empty
//              attribute keeps the defaults.
//   target   — where to listen: "document" (default) | "window" | "self".
//              "self" listens on the host element only (scoped activity).
//   paused   — boolean. When present the timer is suspended (always reported
//              active, no idle transitions) until removed.
//
// Properties (reflected behavior, never throw):
//   .idle      — boolean, current idle state (read-only get; set to force).
//   .timeout   — number get/set (reflects the attribute).
//   .paused    — boolean get/set (reflects the attribute).
//   .remaining — ms until idle (0 when idle/paused). Read-only.
//   .reset()   — treat now as activity, restart the timer, go active.
//   .poke()    — alias of reset() for imperative "user is here" pings.
//
// Events (all bubble + composed so they cross the shadow boundary):
//   idle        — fired when the timeout elapses with no input.
//   active      — fired on the first interaction after being idle.
//   pura-idle:change — fired on every state change, detail { idle, timeout }.
//
// Machine-readable layer (the point of an agent-native component):
//   - stable data-* on the HOST (light DOM): data-pura-idle, data-idle-id,
//     data-idle="true|false", data-idle-timeout, data-idle-state, and
//     data-idle-paused when paused. Agents can run
//     document.querySelectorAll('[data-pura-idle]') to find every detector.
//   - ARIA: role=status + aria-live=polite + aria-label on the host so the
//     idle/active transition is announced to assistive tech and visible in the
//     accessibility tree (no visual chrome required).
//   - global window.__puraIdle registry: a live Map keyed by detector id with
//     { id, idle, timeout, remaining, paused, el } entries plus helpers
//     .anyActive() / .allIdle(). Agents read window.__puraIdle to inspect
//     presence across the whole page.
//
// API: PuraIdle.registry() returns a snapshot array of connected detectors.
import { PuraElement, define } from "../base.js";
import meta from "./idle.meta.js";

// Module-level counter for stable, unique ids per instance (parity with other
// pura components; also used as the registry key).
let uid = 0;

const DEFAULT_TIMEOUT = 60000;
const DEFAULT_EVENTS = [
  "mousemove", "keydown", "pointerdown", "wheel", "touchstart", "scroll",
];
const TARGETS = new Set(["document", "window", "self"]);

// Live global registry so agents can enumerate every detector on the page.
function registry() {
  if (!window.__puraIdle) {
    const map = new Map();
    // True if any connected detector currently reports the user as active.
    map.anyActive = () => [...map.values()].some((e) => !e.idle);
    // True if every connected detector is idle (false when there are none).
    map.allIdle = () =>
      map.size > 0 && [...map.values()].every((e) => e.idle);
    window.__puraIdle = map;
  }
  return window.__puraIdle;
}

class PuraIdle extends PuraElement {
  static observedAttributes = ["timeout", "events", "target", "paused"];

  connectedCallback() {
    this._id = this.id || `pura-idle-${uid++}`;
    this._idle = false;
    this._timer = null;
    this._lastActivity = Date.now();
    // Bound once so add/removeEventListener pair up correctly.
    this._onActivity = this._onActivity.bind(this);

    // Non-visual: project children through untouched.
    this.render(`<slot></slot>`, CSS);

    this._bind();
    this._reflect();
    this._publish();
    if (!this._isPaused()) this._arm();
  }

  disconnectedCallback() {
    this._clear();
    this._unbind();
    const reg = window.__puraIdle;
    if (reg) reg.delete(this._id);
  }

  attributeChangedCallback(name) {
    // attributeChangedCallback can fire before connectedCallback has set up
    // listeners/timer; bail until we are wired.
    if (!this.isConnected || !this._onActivity) return;
    if (name === "events" || name === "target") {
      this._unbind();
      this._bind();
    }
    if (name === "paused") {
      if (this._isPaused()) {
        this._clear();
        // A paused detector is reported active (user presence unknown but the
        // affordance is suspended); do not emit, just resync state silently.
        this._setIdle(false, { silent: true });
      } else {
        this.reset();
      }
    } else if (name === "timeout" && !this._isPaused() && !this._idle) {
      // Re-arm against the new timeout from the last activity.
      this._arm();
    }
    this._reflect();
    this._publish();
  }

  // --- configuration helpers -------------------------------------------------

  _timeoutMs() {
    const t = parseInt(this.getAttribute("timeout") || "", 10);
    return Number.isFinite(t) && t >= 0 ? t : DEFAULT_TIMEOUT;
  }

  _eventNames() {
    const raw = (this.getAttribute("events") || "").trim();
    if (!raw) return DEFAULT_EVENTS;
    const list = raw.split(/\s+/).filter(Boolean);
    return list.length ? list : DEFAULT_EVENTS;
  }

  _targetNode() {
    const t = (this.getAttribute("target") || "document").toLowerCase();
    const choice = TARGETS.has(t) ? t : "document";
    if (choice === "window") return window;
    if (choice === "self") return this;
    return document;
  }

  _isPaused() {
    return this.hasAttribute("paused");
  }

  // --- listener wiring -------------------------------------------------------

  _bind() {
    const node = (this._boundNode = this._targetNode());
    const names = (this._boundEvents = this._eventNames());
    if (!node || typeof node.addEventListener !== "function") return;
    for (const name of names) {
      node.addEventListener(name, this._onActivity, { passive: true });
    }
  }

  _unbind() {
    const node = this._boundNode;
    const names = this._boundEvents;
    if (!node || !names || typeof node.removeEventListener !== "function") return;
    for (const name of names) {
      node.removeEventListener(name, this._onActivity, { passive: true });
    }
    this._boundNode = null;
    this._boundEvents = null;
  }

  _onActivity() {
    if (this._isPaused()) return;
    this._lastActivity = Date.now();
    if (this._idle) {
      // Coming back from idle: announce active, then re-arm.
      this._setIdle(false);
    }
    this._arm();
  }

  // --- timer -----------------------------------------------------------------

  _arm() {
    this._clear();
    if (this._isPaused()) return;
    const ms = this._timeoutMs();
    this._timer = setTimeout(() => {
      this._timer = null;
      this._setIdle(true);
    }, ms);
  }

  _clear() {
    if (this._timer != null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  // --- state transition ------------------------------------------------------

  _setIdle(next, opts = {}) {
    next = !!next;
    if (next === this._idle) {
      // No change, but keep the machine-readable layer fresh.
      this._reflect();
      this._publish();
      return;
    }
    this._idle = next;
    if (next) this._clear();
    this._reflect();
    this._publish();
    if (opts.silent) return;
    const detail = { idle: this._idle, timeout: this._timeoutMs() };
    this.dispatchEvent(
      new CustomEvent(next ? "idle" : "active", {
        bubbles: true,
        composed: true,
        detail,
      })
    );
    this.dispatchEvent(
      new CustomEvent("pura-idle:change", {
        bubbles: true,
        composed: true,
        detail,
      })
    );
  }

  // --- machine-readable layer ------------------------------------------------

  // Reflect state onto the HOST (light DOM) so crawlers/AT see it without
  // entering the shadow root.
  _reflect() {
    const paused = this._isPaused();
    const state = paused ? "paused" : this._idle ? "idle" : "active";
    this.setAttribute("data-pura-idle", "");
    this.setAttribute("data-idle-id", this._id);
    this.setAttribute("data-idle", this._idle ? "true" : "false");
    this.setAttribute("data-idle-timeout", String(this._timeoutMs()));
    this.setAttribute("data-idle-state", state);
    if (paused) this.setAttribute("data-idle-paused", "");
    else this.removeAttribute("data-idle-paused");

    // Announce the transition to AT/agents via a host-level live region.
    this.setAttribute("role", this.getAttribute("role") || "status");
    this.setAttribute("aria-live", "polite");
    this.setAttribute(
      "aria-label",
      paused
        ? "Inactivity detection paused"
        : this._idle
        ? "User is idle"
        : "User is active"
    );
  }

  // Publish / update the live entry in the global registry.
  _publish() {
    registry().set(this._id, {
      id: this._id,
      idle: this._idle,
      timeout: this._timeoutMs(),
      remaining: this.remaining,
      paused: this._isPaused(),
      el: this,
    });
  }

  // --- public API ------------------------------------------------------------

  get idle() {
    return this._idle;
  }
  set idle(v) {
    // Forcing idle clears any pending timer; forcing active re-arms.
    if (v) this._setIdle(true);
    else this.reset();
  }

  get timeout() {
    return this._timeoutMs();
  }
  set timeout(v) {
    const n = Number(v);
    if (Number.isFinite(n) && n >= 0) this.setAttribute("timeout", String(n));
    else this.removeAttribute("timeout");
  }

  get paused() {
    return this._isPaused();
  }
  set paused(v) {
    this.toggleAttribute("paused", !!v);
  }

  // ms until the idle transition (0 when idle or paused).
  get remaining() {
    if (this._idle || this._isPaused()) return 0;
    const elapsed = Date.now() - this._lastActivity;
    return Math.max(0, this._timeoutMs() - elapsed);
  }

  // Treat now as activity: go active (announcing if needed) and restart timer.
  reset() {
    this._lastActivity = Date.now();
    if (this._idle) this._setIdle(false);
    else {
      this._reflect();
      this._publish();
    }
    this._arm();
  }

  // Imperative "user is here" ping (alias of reset()).
  poke() {
    this.reset();
  }

  // Snapshot (array) of all connected detectors.
  static registry() {
    return [...(window.__puraIdle || new Map()).values()];
  }
}

const CSS = `
  /* Invisible wrapper: the host disappears from layout, children flow as if it
     were not present. No color/box affordances by design. */
  :host { display: contents; }
`;

define("pura-idle", PuraIdle, meta);

export { PuraIdle };
export default PuraIdle;
