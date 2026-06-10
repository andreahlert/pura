// <pura-pixel-reveal> — retro pixel-block transition. A shadow-DOM grid of
// square cells flickers in pseudo-random (but deterministic, SSR-stable) order
// to either swap between two slotted states (default slot <-> "alt" slot) or
// dissolve away to reveal the content, in the style of React Bits' Pixel
// Transition and Magic UI's Pixel Image. Pure CSS keyframes/transitions with
// per-cell animation-delays seeded by index; no per-frame JS.
//
// Modes:
//   swap   — (default) the "alt" slot replaces the default slot under a
//            one-shot pixel burst each time the state toggles.
//   reveal — the cells cover the content once JS engages; the trigger snaps
//            them off one by one, revealing the content in pixel blocks.
//
// Triggers:
//   attr  — (default) consumer toggles the `active` attribute.
//   hover — pointer enter/leave (plus focusin/focusout) toggles the state.
//   view  — activates once when scrolled into view (IntersectionObserver).
//
// Attributes:
//   mode    — "swap" (default) | "reveal".
//   trigger — "attr" (default) | "hover" | "view".
//   active  — boolean; current state (alt shown / content revealed).
//   cols    — grid columns (default 12, capped at 32).
//   rows    — grid rows (default 8, capped at 32).
//
// Tokens: --pura-pixel-reveal-color (cell color), --pura-pixel-reveal-duration
//   (per-cell pop duration), --pura-pixel-reveal-stagger (scatter spread).
//
// SSR / pre-JS: state A renders fully visible with no cells shown; covering
// and swapping only engage after connect. Reduced motion: no pixel pass,
// state changes jump straight to the final state.
//
// Agent-native layer: each instance registers in window.__puraPixelReveals by
//   data-pura-id with { mode, trigger, active, toggle, el }; data-pura-pr-*
//   mirror config and state.
import { PuraElement, define } from "../base.js";
import meta from "./pixel-reveal.meta.js";
import { pixelRevealTemplate } from "./pixel-reveal.template.js";

let uid = 0;

function registry() {
  return (window.__puraPixelReveals ||= new Map());
}

const TRIGGERS = new Set(["attr", "hover", "view"]);

class PuraPixelReveal extends PuraElement {
  static observedAttributes = ["active"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-pixel-reveal-${uid++}`;
    this.dataset.puraId = this._id;

    // State attributes go on before the first paint so no transition runs
    // for an initially-active or covered instance.
    this._active = this.hasAttribute("active");
    if (this._active) this.setAttribute("data-pura-pr-active", "");
    if (this.mode === "reveal") this.setAttribute("data-pura-pr-cover", "");
    this.setAttribute("data-pura-pr-mode", this.mode);
    this.setAttribute("data-pura-pr-trigger", this.trigger);

    const { html, css } = pixelRevealTemplate(this);
    this.render(html, css);

    if (this.trigger === "hover") this._bindHover();
    else if (this.trigger === "view") this._observe();

    this._ready = true;
    this._register();
  }

  disconnectedCallback() {
    this._io?.disconnect();
    this._io = null;
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this._ready) return;
    this.toggle(this.hasAttribute("active"));
  }

  // ---- config ---------------------------------------------------------------
  get mode() {
    return this.getAttribute("mode") === "reveal" ? "reveal" : "swap";
  }
  get trigger() {
    const v = this.getAttribute("trigger");
    return TRIGGERS.has(v) ? v : "attr";
  }
  get active() {
    return !!this._active;
  }

  // ---- public API -----------------------------------------------------------
  toggle(force) {
    const next = force === undefined ? !this._active : !!force;
    if (next === this._active) return;
    this._active = next;
    this.toggleAttribute("data-pura-pr-active", next);
    this.toggleAttribute("active", next); // keep the public attribute in sync
    if (this.mode === "swap") this._pulse();
    this._register();
    this.dispatchEvent(new CustomEvent("pura-pixel-reveal-toggle", {
      bubbles: true,
      detail: { id: this._id, active: next },
    }));
  }

  // ---- internals ------------------------------------------------------------
  // One-shot pixel burst: re-add the attribute so the CSS animation replays
  // on every toggle, in either direction.
  _pulse() {
    this.removeAttribute("data-pura-pr-burst");
    void this.offsetWidth; // reflow so the re-added attribute replays
    requestAnimationFrame(() => this.setAttribute("data-pura-pr-burst", ""));
  }

  _bindHover() {
    this.addEventListener("pointerenter", () => this.toggle(true));
    this.addEventListener("pointerleave", () => this.toggle(false));
    this.addEventListener("focusin", () => this.toggle(true));
    this.addEventListener("focusout", () => this.toggle(false));
  }

  _observe() {
    if (typeof IntersectionObserver === "undefined") { this.toggle(true); return; }
    this._io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          this.toggle(true);
          this._io?.disconnect();
          this._io = null;
          break;
        }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });
    this._io.observe(this);
  }

  _register() {
    registry().set(this._id, {
      id: this._id,
      mode: this.mode,
      trigger: this.trigger,
      active: this._active,
      toggle: (force) => this.toggle(force),
      el: this,
    });
  }
}

define("pura-pixel-reveal", PuraPixelReveal, meta);
export { PuraPixelReveal };
