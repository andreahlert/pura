// <pura-step-loader> is the multi-step loader for long operations: a vertical
// checklist where each step shows a spinner while it runs and draws a check
// when it completes, with the current step highlighted. The pattern dominant in
// AI-product loading screens. The full list renders up front from the pure
// template; advancing only flips data-state on existing items, so CSS
// transitions and stroke-dashoffset animate the change without a re-render.
//
// Attributes:
//   steps    - step labels separated by "|" (or "," when no pipe is present).
//   step     - index of the step currently running, 0-based; a value equal to
//              the step count marks everything done (default 0).
//   auto     - advance automatically, one step per interval, on a WAAPI timer.
//   interval - milliseconds per step in auto mode (default 1500).
//   loop     - in auto mode, restart from the first step after completing.
//
// Events:
//   advance  - fired whenever the step index changes (detail { step, total }).
//   complete - fired when the last step finishes (detail { total }).
//
// Tokens: --pura-step-loader-gap, -size, -fg, -muted, -active-color,
//   -done-color, -draw, -font-size, -pending-opacity, -done-opacity.
// Reduced motion: the spinner shows as a full static ring and the check draw
// is instant; auto mode still advances so the loader always completes.
//
// Agent-native layer: each instance registers in window.__puraStepLoaders by
//   data-pura-id with { step, total, advance, reset, el }; data-pura-step,
//   data-pura-total and data-pura-state ("running" | "done") mirror the state.
import { PuraElement, define } from "../base.js";
import meta from "./step-loader.meta.js";
import { stepLoaderTemplate, labelsOf, stepOf } from "./step-loader.template.js";

let uid = 0;

function registry() {
  return (window.__puraStepLoaders ||= new Map());
}

class PuraStepLoader extends PuraElement {
  static observedAttributes = ["step", "steps"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-step-loader-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = stepLoaderTemplate(this);
    this.render(html, css);
    this._prevStep = this.step;

    registry().set(this._id, {
      id: this._id,
      step: this.step,
      total: this.labels.length,
      advance: () => this.advance(),
      reset: () => this.reset(),
      el: this,
    });
    this._mirror();

    if (this.hasAttribute("auto")) this._arm();
  }

  disconnectedCallback() {
    this._disarm();
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this.shadowRoot || !this.$(".list")) return; // not rendered yet
    if (name === "steps") {
      const { html, css } = stepLoaderTemplate(this);
      this.render(html, css);
      this._prevStep = undefined; // new list, no advance event for the rebuild
    }
    this._sync();
  }

  // ---- config ---------------------------------------------------------------
  get labels() {
    return labelsOf(this);
  }
  get step() {
    return stepOf(this, this.labels.length);
  }
  get interval() {
    const n = parseFloat(this.getAttribute("interval"));
    return Number.isFinite(n) && n > 0 ? n : 1500;
  }

  // ---- public API -----------------------------------------------------------
  advance() {
    const total = this.labels.length;
    if (this.step >= total) return;
    this.setAttribute("step", String(this.step + 1));
  }

  reset() {
    this.setAttribute("step", "0");
    if (this.hasAttribute("auto")) this._arm();
  }

  // ---- internals ------------------------------------------------------------
  // Flip data-state on the existing items (never re-render: that would restart
  // the spinner and drop the check draw transition), update the live region,
  // mirror agent state and dispatch advance/complete.
  _sync() {
    const step = this.step;
    const labels = this.labels;
    const items = this.$$(".step");
    items.forEach((li, i) => {
      const state = i < step ? "done" : i === step ? "active" : "pending";
      if (li.getAttribute("data-state") !== state) li.setAttribute("data-state", state);
      if (state === "active") li.setAttribute("aria-current", "step");
      else li.removeAttribute("aria-current");
    });
    const live = this.$(".sr-live");
    if (live) live.textContent = step < labels.length ? labels[step] || "" : "";
    this._mirror();

    if (step !== this._prevStep) {
      const fire = this._prevStep !== undefined;
      this._prevStep = step;
      if (fire) {
        const total = items.length;
        this.dispatchEvent(
          new CustomEvent("advance", { detail: { step, total }, bubbles: true, composed: true }),
        );
        if (total > 0 && step >= total) {
          this.dispatchEvent(
            new CustomEvent("complete", { detail: { total }, bubbles: true, composed: true }),
          );
        }
      }
    }
  }

  _mirror() {
    const step = this.step;
    const total = this.labels.length;
    this.setAttribute("data-pura-step", String(step));
    this.setAttribute("data-pura-total", String(total));
    this.setAttribute("data-pura-state", total > 0 && step >= total ? "done" : "running");
    const entry = registry().get(this._id);
    if (entry) {
      entry.step = step;
      entry.total = total;
    }
  }

  // Auto mode: one WAAPI animation per interval acts as the timer (setTimeout
  // fallback for environments without Element.animate). Reduced motion does
  // not pause it; the loader must still finish.
  _arm() {
    this._disarm();
    if (!this.labels.length) return;
    const tick = () => {
      const total = this.labels.length;
      const cur = this.step;
      if (cur >= total) {
        if (this.hasAttribute("loop")) {
          this.setAttribute("step", "0");
          this._schedule(tick);
        }
        return;
      }
      this.setAttribute("step", String(cur + 1));
      if (cur + 1 < total || this.hasAttribute("loop")) this._schedule(tick);
    };
    this._schedule(tick);
  }

  _schedule(fn) {
    if (typeof this.animate === "function") {
      this._timer = this.animate([{}, {}], { duration: this.interval });
      this._timer.onfinish = fn;
    } else {
      this._timeout = setTimeout(fn, this.interval);
    }
  }

  _disarm() {
    if (this._timer) {
      this._timer.onfinish = null;
      this._timer.cancel();
      this._timer = null;
    }
    clearTimeout(this._timeout);
  }
}

define("pura-step-loader", PuraStepLoader, meta);
export { PuraStepLoader };
