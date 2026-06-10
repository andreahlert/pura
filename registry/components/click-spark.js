// <pura-click-spark> — celebration micro-feedback: a burst of sparks (short
// lines, or emojis) radiates from the exact click/touch point on the slotted
// surface. Distinct from <pura-ripple>: instead of one expanding circle, this
// throws N particles outward. Spark spans are created on pointerdown, animated
// with WAAPI (radial translate + scale + fade) and removed on finish, so the
// initial paint carries zero effect markup and the component is SSR-safe by
// construction.
//
// Attributes:
//   count    — sparks per burst (default 8).
//   size     — spark length in px; emoji font size in emoji mode (default 10).
//   radius   — travel distance from the click point in px (default 28).
//   duration — burst time in ms (default 500).
//   emoji    — optional space-separated emoji list; when set, sparks are emoji
//              characters cycled by index instead of lines.
//   disabled — boolean. Suppresses bursts entirely.
//
// Events: pura-click-spark (bubbles, composed) per burst;
//   detail = { id, x, y } with host-relative pixels.
//
// Tokens: --pura-click-spark-color (line spark color, default --pura-accent
//   then currentColor).
// Parts: sparks — the overlay layer the spark spans live in.
//
// Reduced motion: no particles are spawned under prefers-reduced-motion:
//   reduce (the WAAPI flight is skipped); the pura-click-spark event still
//   fires so behavior hooks keep working.
//
// Determinism: per-spark variation (angle jitter, distance, spin) is derived
//   from the spark index, never from native randomness.
//
// Agent-native layer: each instance registers in window.__puraClickSparks by
//   data-pura-id with { id, count, burst, el }; data-pura-click-spark-disabled
//   and data-pura-click-spark-count mirror config.
import { PuraElement, define } from "../base.js";
import meta from "./click-spark.meta.js";
import { clickSparkTemplate } from "./click-spark.template.js";

let uid = 0;

function registry() {
  return (window.__puraClickSparks ||= new Map());
}

class PuraClickSpark extends PuraElement {
  static observedAttributes = ["disabled", "count"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-click-spark-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = clickSparkTemplate(this);
    this.render(html, css);
    this._layer = this.$(".sparks");

    this._onDown = (e) => {
      const rect = this.getBoundingClientRect();
      this.burst(e.clientX - rect.left, e.clientY - rect.top);
    };
    this.addEventListener("pointerdown", this._onDown);

    registry().set(this._id, {
      id: this._id,
      count: this.count,
      burst: (x, y) => this.burst(x, y),
      el: this,
    });
    this._reflectAgentState();
  }

  disconnectedCallback() {
    this.removeEventListener("pointerdown", this._onDown);
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this._layer) return;
    const entry = registry().get(this._id);
    if (entry) entry.count = this.count;
    this._reflectAgentState();
  }

  // ---- config ---------------------------------------------------------------
  get disabled() {
    return this.hasAttribute("disabled");
  }
  get count() {
    const n = parseInt(this.getAttribute("count"), 10);
    return Number.isFinite(n) && n > 0 ? Math.min(n, 64) : 8;
  }
  get size() {
    const n = parseFloat(this.getAttribute("size"));
    return Number.isFinite(n) && n > 0 ? n : 10;
  }
  get radius() {
    const n = parseFloat(this.getAttribute("radius"));
    return Number.isFinite(n) && n > 0 ? n : 28;
  }
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 500;
  }
  get emojis() {
    const raw = (this.getAttribute("emoji") || "").trim();
    return raw ? raw.split(/\s+/) : null;
  }

  // ---- public API -----------------------------------------------------------
  // Fire a burst at host-relative (x, y); defaults to the host center.
  burst(x, y) {
    if (this.disabled || !this._layer) return;

    if (x == null || y == null) {
      const rect = this.getBoundingClientRect();
      x = rect.width / 2;
      y = rect.height / 2;
    }

    this.dispatchEvent(
      new CustomEvent("pura-click-spark", {
        bubbles: true,
        composed: true,
        detail: { id: this._id, x, y },
      })
    );

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof Element.prototype.animate !== "function") return;

    const count = this.count;
    const emojis = this.emojis;
    for (let i = 0; i < count; i++) {
      // Index-based variation: evenly spread angles with a small deterministic
      // jitter, slightly varied travel distance and timing per spark.
      const angle = (i / count) * 360 + (((i * 37) % 10) - 4.5);
      const dist = this.radius * (0.85 + ((i * 53) % 4) * 0.07);
      const time = this.duration * (0.85 + ((i * 29) % 3) * 0.1);
      const span = emojis
        ? this._emojiSpark(x, y, emojis[i % emojis.length])
        : this._lineSpark(x, y);
      this._layer.appendChild(span);
      const anim = emojis
        ? this._flyEmoji(span, angle, dist, i, time)
        : this._flyLine(span, angle, dist, time);
      anim.onfinish = () => span.remove();
    }
  }

  // ---- internals ------------------------------------------------------------
  _lineSpark(x, y) {
    const size = this.size;
    const thickness = Math.max(2, size / 5);
    const span = document.createElement("span");
    span.className = "spark";
    span.style.left = `${x}px`;
    span.style.top = `${y - thickness / 2}px`;
    span.style.width = `${size}px`;
    span.style.height = `${thickness}px`;
    span.style.transformOrigin = "0 50%";
    return span;
  }

  _emojiSpark(x, y, char) {
    const size = this.size;
    const span = document.createElement("span");
    span.className = "spark emoji";
    span.textContent = char;
    span.style.left = `${x - size / 2}px`;
    span.style.top = `${y - size / 2}px`;
    span.style.fontSize = `${size}px`;
    return span;
  }

  _flyLine(span, angle, dist, time) {
    return span.animate(
      [
        { transform: `rotate(${angle}deg) translateX(${this.size * 0.4}px) scaleX(1)`, opacity: 1 },
        { transform: `rotate(${angle}deg) translateX(${dist}px) scaleX(0.15)`, opacity: 0 },
      ],
      { duration: time, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );
  }

  _flyEmoji(span, angle, dist, i, time) {
    const rad = (angle * Math.PI) / 180;
    const dx = Math.cos(rad) * dist;
    const dy = Math.sin(rad) * dist;
    const spin = ((i % 2 ? 1 : -1) * (20 + ((i * 13) % 3) * 15));
    return span.animate(
      [
        { transform: "translate(0, 0) scale(0.4) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(1.1) rotate(${spin}deg)`, opacity: 0 },
      ],
      { duration: time, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );
  }

  _reflectAgentState() {
    this.setAttribute("data-pura-click-spark-disabled", this.disabled ? "true" : "false");
    this.setAttribute("data-pura-click-spark-count", String(this.count));
  }
}

define("pura-click-spark", PuraClickSpark, meta);
export { PuraClickSpark };
