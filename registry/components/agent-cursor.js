// <pura-agent-cursor> — a replayable ghost cursor that drives over its slotted
// content from a JSON trace. Built so an agent (or a test harness, or a docs
// page) can *show* a sequence of actions: the cursor tweens between points,
// pulses a ring on clicks, and surfaces a label tooltip per step, all from a
// portable trace it can also emit.
//
// Trace format:
//   { version: 1, steps: [ { x, y, t, action, target?, label?, value? } ] }
//   - x, y   : position in px relative to this element's top-left. If omitted
//              and `target` is set, the step centers on that element's box.
//   - t      : milliseconds from the start of the replay.
//   - action : "move" (default) | "click" | "type" | "hover".
//   - target : optional CSS selector (resolved within this element).
//   - label  : optional tooltip + screen-reader announcement for the step.
//   - value  : optional payload (e.g. typed text); passed through on the event.
//
// Source the trace from (in priority order): the `.trace` property, an inline
//   `<script type="application/json">` child, or the `trace` attribute (a URL
//   fetched as JSON).
//
// Attributes: trace (url), autoplay, loop, speed (playback multiplier, default 1).
// API: play() / pause() / restart() / seek(ms); get/set .trace.
// Events: cursorstep { index, action, target, label, value, t }, cursorplay,
//   cursorpause, cursorend.
//
// Agent-native layer: data-pura-cursor-playing + data-pura-cursor-step mirror
//   live state, and each instance registers in window.__puraAgentCursors keyed
//   by data-pura-id, so an agent can enumerate and drive every replay on a page.
//
// Reduced motion: base.js RESET collapses transitions/animations; the cursor
//   still jumps through every step and announces each label.
import { PuraElement, define } from "../base.js";
import meta from "./agent-cursor.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { agentCursorTemplate } from "./agent-cursor.template.js";

registerMessages({
  "agentCursor.replaying": {
    en: "Replaying agent actions",
    "pt-BR": "Reproduzindo ações do agente",
    fr: "Relecture des actions de l'agent",
    de: "Agentenaktionen werden abgespielt",
    it: "Riproduzione delle azioni dell'agente",
  },
});

let uid = 0;

function registry() {
  return (window.__puraAgentCursors ||= new Map());
}

const ACTIONS = new Set(["move", "click", "type", "hover"]);

// Parse + normalize a trace (object or JSON string) into
// { version, steps:[{x,y,t,action,target,label,value}], duration }. Tolerant:
// junk input yields an empty step list rather than throwing.
export function parseTrace(input) {
  let obj = input;
  if (typeof input === "string") {
    try { obj = JSON.parse(input); } catch (_) { obj = null; }
  }
  if (!obj || typeof obj !== "object") return { version: 1, steps: [], duration: 0 };

  const version = Number(obj.version) || 1;
  const raw = Array.isArray(obj.steps) ? obj.steps : [];
  const steps = raw.map((s) => {
    const x = Number.isFinite(Number(s?.x)) && s?.x !== "" && s?.x != null ? Number(s.x) : null;
    const y = Number.isFinite(Number(s?.y)) && s?.y !== "" && s?.y != null ? Number(s.y) : null;
    const tMs = Number(s?.t);
    const action = ACTIONS.has(s?.action) ? s.action : "move";
    return {
      x, y,
      t: Number.isFinite(tMs) ? tMs : 0,
      action,
      target: s?.target ?? null,
      label: s?.label ?? null,
      value: s?.value ?? null,
    };
  }).sort((a, b) => a.t - b.t);

  const duration = steps.length ? steps[steps.length - 1].t : 0;
  return { version, steps, duration };
}

// Sample a path of resolved points [{t,x,y}] (sorted by t) at time `time`.
// Returns { x, y, index } where index is the latest point with t <= time. Ends
// are clamped. Returns null for an empty path.
export function samplePath(points, time) {
  const n = points.length;
  if (n === 0) return null;
  if (time <= points[0].t) return { x: points[0].x, y: points[0].y, index: 0 };
  const last = points[n - 1];
  if (time >= last.t) return { x: last.x, y: last.y, index: n - 1 };

  let i = 0;
  while (i < n - 1 && points[i + 1].t <= time) i++;
  const a = points[i], b = points[i + 1];
  const span = b.t - a.t || 1;
  const f = (time - a.t) / span;
  return {
    x: a.x + (b.x - a.x) * f,
    y: a.y + (b.y - a.y) * f,
    index: i,
  };
}

class PuraAgentCursor extends PuraElement {
  static observedAttributes = ["trace", "speed", "loop"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-agent-cursor-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = agentCursorTemplate(this);
    this.render(html, css);
    this._cursor = this.$(".cursor");
    this._ripple = this.$(".ripple");
    this._labelEl = this.$(".label");
    this._status = this.$(".sr");

    this.setAttribute("aria-label", t("agentCursor.replaying"));

    this._time = 0;
    this._lastIndex = -1;
    this._playing = false;
    this._rafTs = null;
    this._setPlaying(false);

    // Source resolution: inline JSON child first, then the `trace` URL attr.
    const inline = this.querySelector('script[type="application/json"]');
    if (inline && inline.textContent.trim()) {
      this.trace = inline.textContent;
    } else if (this.getAttribute("trace")) {
      this._loadUrl(this.getAttribute("trace"));
    }

    this._i18nOff = onLocaleChange(() => this.setAttribute("aria-label", t("agentCursor.replaying")));
  }

  disconnectedCallback() {
    this.pause();
    if (registry().get(this._id) === this) registry().delete(this._id);
    this._i18nOff?.();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._cursor) return;
    if (name === "trace" && newValue && newValue !== oldValue) this._loadUrl(newValue);
  }

  // ---- trace source ---------------------------------------------------------
  get trace() { return this._traceData || null; }
  set trace(v) { this._applyTrace(parseTrace(v)); }

  async _loadUrl(url) {
    try {
      const res = await fetch(url);
      const json = await res.json();
      this._applyTrace(parseTrace(json));
    } catch (_) { /* leave the cursor idle on a failed fetch */ }
  }

  _applyTrace(parsed) {
    this._traceData = parsed;
    // Pre-resolve every step to a concrete point so playback is allocation-free.
    this._points = parsed.steps.map((s) => ({ t: s.t, ...this._resolve(s) }));
    this._time = 0;
    this._lastIndex = -1;
    if (this._points.length) this.seek(0);
    if (this.hasAttribute("autoplay")) this.play();
  }

  // Resolve a step's screen point (px relative to this element's box).
  _resolve(step) {
    if (typeof step.x === "number" && typeof step.y === "number") return { x: step.x, y: step.y };
    if (step.target) {
      try {
        const node = this.querySelector(step.target);
        if (node) {
          const r = node.getBoundingClientRect();
          const host = this.getBoundingClientRect();
          return { x: r.left - host.left + r.width / 2, y: r.top - host.top + r.height / 2 };
        }
      } catch (_) { /* fall through */ }
    }
    return { x: 0, y: 0 };
  }

  // ---- playback -------------------------------------------------------------
  get duration() { return this._traceData?.duration || 0; }
  get speed() { return Number(this.getAttribute("speed")) > 0 ? Number(this.getAttribute("speed")) : 1; }

  seek(time) {
    if (!this._points || !this._points.length) return;
    const clamped = Math.max(0, Math.min(this.duration, time));
    this._time = clamped;
    const s = samplePath(this._points, clamped);
    if (!s) return;
    this._cursor.style.transform = `translate(${s.x}px, ${s.y}px)`;
    this._cursor.setAttribute("data-state", "active");
    if (s.index !== this._lastIndex) {
      this._lastIndex = s.index;
      this._enterStep(s.index);
    }
    this.setAttribute("data-pura-cursor-step", String(s.index));
  }

  _enterStep(i) {
    const step = this._traceData.steps[i];
    if (!step) return;

    // Tooltip.
    if (step.label) {
      this._labelEl.textContent = step.label;
      this._labelEl.setAttribute("data-show", "");
    } else {
      this._labelEl.removeAttribute("data-show");
    }

    // Click feedback: restart the ripple keyframe.
    if (step.action === "click") {
      this._ripple.classList.remove("go");
      // Force reflow so the animation restarts even on consecutive clicks.
      void this._ripple.offsetWidth;
      this._ripple.classList.add("go");
    }

    // Screen-reader announcement.
    if (this._status) this._status.textContent = step.label || step.action;

    this.dispatchEvent(new CustomEvent("cursorstep", {
      bubbles: true,
      detail: { index: i, action: step.action, target: step.target, label: step.label, value: step.value, t: step.t },
    }));
  }

  play() {
    if (this._playing || !this._points?.length) return;
    if (this._time >= this.duration) this._time = 0;
    this._playing = true;
    this._rafTs = null;
    this._setPlaying(true);
    this.dispatchEvent(new CustomEvent("cursorplay", { bubbles: true }));
    this._raf = requestAnimationFrame((ts) => this._frame(ts));
  }

  pause() {
    if (!this._playing) return;
    this._playing = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._setPlaying(false);
    this.dispatchEvent(new CustomEvent("cursorpause", { bubbles: true }));
  }

  restart() {
    this._lastIndex = -1;
    this.seek(0);
    this.play();
  }

  _frame(ts) {
    if (!this._playing) return;
    if (this._rafTs == null) this._rafTs = ts;
    const dt = (ts - this._rafTs) * this.speed;
    this._rafTs = ts;
    this.seek(this._time + dt);

    if (this._time >= this.duration) {
      if (this.hasAttribute("loop")) {
        this._lastIndex = -1;
        this._time = 0;
        this._rafTs = null;
        this._raf = requestAnimationFrame((t2) => this._frame(t2));
        return;
      }
      this._playing = false;
      this._setPlaying(false);
      this.dispatchEvent(new CustomEvent("cursorend", { bubbles: true }));
      return;
    }
    this._raf = requestAnimationFrame((t2) => this._frame(t2));
  }

  _setPlaying(on) {
    this.setAttribute("data-pura-cursor-playing", on ? "true" : "false");
  }
}

define("pura-agent-cursor", PuraAgentCursor, meta);
export { PuraAgentCursor };
