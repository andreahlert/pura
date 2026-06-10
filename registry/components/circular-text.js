// <pura-circular-text> — text laid out on a circular SVG path (textPath),
// spinning continuously around its center: the classic hero badge / sticker
// seal. Unlike <pura-orbiting-circles>, which orbits elements, this orbits
// typography itself. The circle, the path and the justified text are all
// produced by the pure template (SSR-safe, static and presentable before JS);
// the rotation is a single CSS @keyframes on the SVG, zero per-frame JS.
//
// Attributes:
//   text           — the text laid around the circle (default "PURA • WEB COMPONENTS • ").
//   radius         — circle radius in SVG user units / px (number, default 80).
//   repeat         — how many times the text repeats around the circle (1..20, default 1).
//   speed          — seconds per full revolution (number, default 20). Lower = faster.
//   direction      — cw (default) | ccw. Spin direction.
//   paused         — reflected state; present when not spinning.
//   pause-on-hover — when present, the spin pauses while hovered/focused.
//
// Slots: default — optional center content (logo, icon, image) that does NOT spin.
// Events: none. Imperative API: play(), pause(), toggle().
//
// Tokens: --pura-circular-text-size (font size, default 14px),
//   --pura-circular-text-color (fill, default currentColor),
//   --pura-circular-text-weight (default 600),
//   --pura-circular-text-tracking (letter-spacing, default 0.16em),
//   --pura-circular-text-transform (default uppercase),
//   --pura-circular-text-duration (revolution time, defaults to the speed attr),
//   --pura-circular-text-diameter (rendered box size, defaults to the SVG size).
//
// Accessibility / motion: the SVG copy is aria-hidden; a visually-hidden span
// holds the readable text. The spin only runs under
// @media (prefers-reduced-motion: no-preference); reduced motion gets the
// static circle of text.
//
// Agent-native layer: each instance registers in window.__puraCircularTexts by
//   data-pura-id; data-pura-circular-text-* attributes mirror live state so
//   agents can enumerate, read and drive every badge without DOM spelunking.
import { PuraElement, define } from "../base.js";
import meta from "./circular-text.meta.js";
import { circularTextTemplate } from "./circular-text.template.js";

let uid = 0;

// Lazily-created global registry so agents can enumerate / read / drive every
// circular text on the page. Maps data-pura-id -> element.
function registry() {
  return (window.__puraCircularTexts ||= new Map());
}

class PuraCircularText extends PuraElement {
  static observedAttributes = [
    "text",
    "radius",
    "repeat",
    "speed",
    "direction",
    "paused",
    "pause-on-hover",
  ];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-circular-text-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = circularTextTemplate(this);
    this.render(html, css);
    this._ready = true;
    this._reflectAgentState();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._ready) return;
    if (name === "paused" || name === "pause-on-hover") {
      // Pure CSS state; only the agent mirror needs a refresh.
      this._reflectAgentState();
      return;
    }
    // Structural config changed: re-run the pure template.
    const { html, css } = circularTextTemplate(this);
    this.render(html, css);
    this._reflectAgentState();
  }

  // ---- config getters -------------------------------------------------------
  get text() {
    return this.getAttribute("text") || "PURA • WEB COMPONENTS • ";
  }
  get radius() {
    const n = parseFloat(this.getAttribute("radius"));
    return Number.isFinite(n) && n > 0 ? n : 80;
  }
  get repeat() {
    const n = parseInt(this.getAttribute("repeat"), 10);
    return Number.isFinite(n) && n >= 1 && n <= 20 ? n : 1;
  }
  get speed() {
    const n = parseFloat(this.getAttribute("speed"));
    return Number.isFinite(n) && n > 0 ? n : 20;
  }
  get direction() {
    return this.getAttribute("direction") === "ccw" ? "ccw" : "cw";
  }
  get paused() {
    return this.hasAttribute("paused");
  }
  get pauseOnHover() {
    return this.hasAttribute("pause-on-hover");
  }

  // ---- imperative API ---------------------------------------------------------
  play() {
    this.removeAttribute("paused");
  }
  pause() {
    this.setAttribute("paused", "");
  }
  toggle() {
    this.paused ? this.play() : this.pause();
  }

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState() {
    this.setAttribute("data-pura-circular-text-text", this.text);
    this.setAttribute("data-pura-circular-text-radius", String(this.radius));
    this.setAttribute("data-pura-circular-text-speed", String(this.speed));
    this.setAttribute("data-pura-circular-text-direction", this.direction);
    this.setAttribute(
      "data-pura-circular-text-playing",
      this.paused ? "false" : "true"
    );
  }
}

define("pura-circular-text", PuraCircularText, meta);
export { PuraCircularText };
