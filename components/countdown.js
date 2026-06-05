// <pura-countdown> — countdown timer to a target time.
// Ticks every second, rendering days / hours / minutes / seconds, and emits a
// `complete` event once it reaches zero.
// Attributes:
//   to        — target moment as an ISO datetime string (e.g. "2026-12-31T23:59:59Z").
//   seconds   — duration in seconds from connect time (alternative to `to`;
//               ignored when `to` is present).
//   compact   — single-line compact display ("1d 02:03:04") instead of segments.
//   no-labels — hide the unit captions under each segment (segmented mode).
//   pad-days  — zero-pad the days value to 2 digits.
//   running   — reflected; present while the timer is ticking (read-only mirror).
// Slots:
//   complete  — content shown in place of the timer once it hits zero.
// Events:
//   complete  — fired once when the remaining time reaches zero.
//   tick      — fired each second with { detail: { total, days, hours, minutes,
//               seconds } } (remaining time, total in ms).
// Methods:
//   start() / pause() / reset() — programmatic control.
// Agent-native layer: stable data-pura-countdown-* attributes mirror live state
//   each tick, and every instance registers in window.__puraCountdowns keyed by
//   its data-pura-id, so an agent can enumerate / read every timer on the page
//   (remaining seconds, target, completion) without DOM diving.
import { PuraElement, define } from "../base.js";

let uid = 0;

// Lazily-created global registry: data-pura-id -> element.
function registry() {
  return (window.__puraCountdowns ||= new Map());
}

const SEGMENTS = [
  ["days", "Days"],
  ["hours", "Hours"],
  ["minutes", "Minutes"],
  ["seconds", "Seconds"],
];

function pad(n, len = 2) {
  return String(n).padStart(len, "0");
}

// Break a non-negative millisecond span into whole d/h/m/s parts.
function breakdown(ms) {
  const total = Math.max(0, ms);
  const totalSeconds = Math.floor(total / 1000);
  return {
    total,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

class PuraCountdown extends PuraElement {
  static observedAttributes = ["to", "seconds", "compact", "no-labels", "pad-days"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-countdown-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this.render(
      `<div class="cd" part="countdown" role="timer" aria-live="off" aria-atomic="true">
         <div class="segments" part="segments">
           ${SEGMENTS.map(
             ([key, label]) => `
           <div class="seg" part="segment" data-unit="${key}">
             <span class="num" part="value" data-unit="${key}">00</span>
             <span class="cap" part="label">${label}</span>
           </div>
           <span class="colon" part="colon" aria-hidden="true">:</span>`
           ).join("")}
         </div>
         <span class="compact" part="compact"></span>
         <div class="done" part="complete" hidden><slot name="complete"></slot></div>
       </div>`,
      CSS
    );

    this._root = this.$(".cd");
    this._segmentsEl = this.$(".segments");
    this._compactEl = this.$(".compact");
    this._doneEl = this.$(".done");
    this._nums = {};
    for (const [key] of SEGMENTS) {
      this._nums[key] = this.$(`.num[data-unit="${key}"]`);
    }

    // Drop the trailing colon after the seconds segment.
    const colons = this.$$(".colon");
    if (colons.length) colons[colons.length - 1].remove();

    this._completed = false;
    this._paused = false;
    this._timer = null;

    this._computeTarget();
    this._tick();
    if (!this._completed) this._schedule();
  }

  disconnectedCallback() {
    this._clear();
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._root) return;
    if (name === "to" || name === "seconds") {
      this.reset();
    } else {
      this._render();
    }
  }

  // ---- public API ----------------------------------------------------------

  // Resume ticking against the current target (no-op once completed).
  start() {
    this._paused = false;
    this._tick();
    if (!this._completed) this._schedule();
  }

  pause() {
    this._paused = true;
    this.removeAttribute("running");
    this._clear();
  }

  reset() {
    this._clear();
    this._completed = false;
    this._paused = false;
    this._doneEl.hidden = true;
    this._computeTarget();
    this._tick();
    if (!this._completed) this._schedule();
  }

  // Remaining time in whole milliseconds (>= 0).
  get remaining() {
    if (this._target == null) return 0;
    return Math.max(0, this._target - Date.now());
  }

  // ---- internals -----------------------------------------------------------

  _computeTarget() {
    const to = this.getAttribute("to");
    const secs = this.getAttribute("seconds");
    if (to) {
      const t = Date.parse(to);
      this._target = Number.isFinite(t) ? t : null;
    } else if (secs != null && secs !== "") {
      const n = Number(secs);
      this._target = Number.isFinite(n) ? Date.now() + n * 1000 : null;
    } else {
      this._target = null;
    }
  }

  _schedule() {
    this._clear();
    if (this._paused || this._completed || this._target == null) return;
    this.setAttribute("running", "");
    // Align ticks to the second boundary so the display feels precise.
    const delay = 1000 - (Date.now() % 1000);
    this._timer = setTimeout(() => {
      this._tick();
      if (!this._completed) this._schedule();
    }, delay);
  }

  _clear() {
    if (this._timer != null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  _tick() {
    const b = breakdown(this.remaining);
    this._render(b);

    this.dispatchEvent(
      new CustomEvent("tick", { bubbles: true, detail: { ...b } })
    );

    if (b.total <= 0 && !this._completed && this._target != null) {
      this._completed = true;
      this._clear();
      this.removeAttribute("running");
      // Swap to the completion slot only when the author provided content.
      const hasDone =
        this.$('slot[name="complete"]').assignedNodes().length > 0;
      this._doneEl.hidden = !hasDone;
      this._root.dataset.done = hasDone ? "true" : "false";
      this.setAttribute("data-pura-countdown-complete", "true");
      this.dispatchEvent(new CustomEvent("complete", { bubbles: true }));
    }
  }

  _render(b = breakdown(this.remaining)) {
    const noTarget = this._target == null;
    const padDays = this.hasAttribute("pad-days");
    const daysStr = padDays ? pad(b.days) : String(b.days);

    // Segment numbers.
    this._nums.days.textContent = daysStr;
    this._nums.hours.textContent = pad(b.hours);
    this._nums.minutes.textContent = pad(b.minutes);
    this._nums.seconds.textContent = pad(b.seconds);

    // Compact one-liner.
    this._compactEl.textContent = noTarget
      ? "--:--:--"
      : `${daysStr}d ${pad(b.hours)}:${pad(b.minutes)}:${pad(b.seconds)}`;

    // Reflect compact mode so CSS can swap views.
    this._root.dataset.compact = this.hasAttribute("compact") ? "true" : "false";
    this._root.dataset.labels = this.hasAttribute("no-labels") ? "off" : "on";

    // ARIA: a human + agent readable description of remaining time.
    const human = noTarget
      ? "No countdown target set"
      : b.total <= 0
        ? "Countdown complete"
        : [
            b.days ? `${b.days} day${b.days === 1 ? "" : "s"}` : "",
            `${b.hours} hour${b.hours === 1 ? "" : "s"}`,
            `${b.minutes} minute${b.minutes === 1 ? "" : "s"}`,
            `${b.seconds} second${b.seconds === 1 ? "" : "s"}`,
          ]
            .filter(Boolean)
            .join(", ") + " remaining";
    this._root.setAttribute("aria-label", human);

    // Agent-native: stable, machine-readable mirror of live state.
    const totalSeconds = Math.floor(b.total / 1000);
    this.setAttribute("data-pura-countdown-remaining", String(totalSeconds));
    this.setAttribute("data-pura-countdown-days", String(b.days));
    this.setAttribute("data-pura-countdown-hours", String(b.hours));
    this.setAttribute("data-pura-countdown-minutes", String(b.minutes));
    this.setAttribute("data-pura-countdown-seconds", String(b.seconds));
    if (this._target != null) {
      this.setAttribute(
        "data-pura-countdown-target",
        new Date(this._target).toISOString()
      );
    } else {
      this.removeAttribute("data-pura-countdown-target");
    }
    if (!this._completed) {
      this.setAttribute("data-pura-countdown-complete", "false");
    }
  }
}

const CSS = `
  :host { display: inline-block; color: var(--pura-fg); }

  .cd { display: inline-flex; align-items: stretch; }

  /* segmented (default) */
  .segments {
    display: inline-flex; align-items: flex-start; gap: var(--pura-space-2);
  }
  .seg {
    display: inline-flex; flex-direction: column; align-items: center;
    gap: var(--pura-space-1);
    min-width: 3.25rem;
    padding: var(--pura-space-3) var(--pura-space-2);
    background: var(--pura-subtle); border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius); box-shadow: var(--pura-shadow-sm);
  }
  .num {
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-xl); font-weight: 650; line-height: 1;
    color: var(--pura-fg); letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
  }
  .cap {
    font-size: var(--pura-text-xs); font-weight: 500;
    color: var(--pura-muted); line-height: 1; text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .colon {
    align-self: center;
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-xl); font-weight: 600; line-height: 1;
    color: var(--pura-muted); padding-top: var(--pura-space-1);
  }

  /* no-labels: drop captions, tighten segments */
  .cd[data-labels="off"] .cap { display: none; }
  .cd[data-labels="off"] .seg { padding: var(--pura-space-2); }

  /* compact one-liner */
  .compact {
    display: none;
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-lg); font-weight: 600;
    color: var(--pura-fg); line-height: 1;
    font-variant-numeric: tabular-nums; letter-spacing: 0.01em;
  }
  .cd[data-compact="true"] .segments { display: none; }
  .cd[data-compact="true"] .compact { display: inline-block; }

  /* completion content */
  .done {
    display: inline-flex; align-items: center;
    font-size: var(--pura-text-base); color: var(--pura-muted-fg);
  }
  .done[hidden] { display: none; }
  .cd[data-done="true"] .segments,
  .cd[data-done="true"] .compact { display: none; }
`;

define("pura-countdown", PuraCountdown);
export { PuraCountdown };
