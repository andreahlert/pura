// <pura-text-highlighter> -- animated marker pen: a highlighter-color sweep
// paints the slotted text from one side to the other when it enters the
// viewport. The highlight is a no-repeat linear-gradient behind the glyphs
// whose background-size grows from 0% to 100%, so the original text stays in
// the light DOM, fully accessible and selectable; nothing is duplicated.
//
// Triggers:
//   view   -- (default) sweeps once when scrolled into view
//             (IntersectionObserver sets the in-view attribute; the sweep
//             itself is a pure CSS transition).
//   scrub  -- ties the sweep 1:1 to a scroll-driven timeline
//             (animation-timeline: view()), zero per-frame JS.
//   load   -- sweeps once on connect.
//
// Attributes:
//   trigger   -- "view" | "scrub" | "load" (default "view").
//   direction -- "right" (default) | "left": which way the pen sweeps.
//   duration  -- sweep duration in ms for view/load (default 900).
//   delay     -- sweep delay in ms for view/load (default 0).
//   timeline  -- "view" | "scroll" (scrub only, default "view").
//   range     -- animation-range for scrub (default "entry 0% cover 50%").
//
// Tokens: --pura-text-highlighter-color (pen color, default #fde047),
//   --pura-text-highlighter-height (highlight thickness from the baseline,
//   default 100%), --pura-text-highlighter-radius (default 0.25em),
//   --pura-text-highlighter-padding (default 0.08em 0.25em).
//
// SSR / pre-JS: the text renders with the full highlight already painted, so
// the page looks finished without JS. Reduced motion: lands fully highlighted,
// no sweep.
//
// Agent-native layer: each instance registers in window.__puraTextHighlighters
//   by data-pura-id with { trigger, direction, replay, el }; data-pura-th-*
//   mirror config and in-view state.
import { PuraElement, define } from "../base.js";
import meta from "./text-highlighter.meta.js";
import { textHighlighterTemplate, highlightDirection } from "./text-highlighter.template.js";

let uid = 0;

function registry() {
  return (window.__puraTextHighlighters ||= new Map());
}

const TRIGGERS = new Set(["view", "scrub", "load"]);

class PuraTextHighlighter extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-text-highlighter-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = textHighlighterTemplate(this);
    this.render(html, css);

    this._apply();
  }

  disconnectedCallback() {
    this._io?.disconnect();
    this._io = null;
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get trigger() {
    const v = this.getAttribute("trigger");
    return TRIGGERS.has(v) ? v : "view";
  }
  get direction() {
    return highlightDirection(this);
  }
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n >= 0 ? n : 900;
  }
  get delay() {
    const n = parseFloat(this.getAttribute("delay"));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }

  // ---- public API -----------------------------------------------------------
  replay() {
    if (this.trigger === "scrub") return; // scrub is bound to scroll, nothing to replay
    this.removeAttribute("data-pura-th-in");
    void this.offsetWidth; // reflow so re-add plays
    requestAnimationFrame(() => this.setAttribute("data-pura-th-in", ""));
  }

  // ---- internals ------------------------------------------------------------
  _apply() {
    if (this.trigger === "scrub") {
      this._scrub();
    } else {
      this._timed();
    }

    this.setAttribute("data-pura-th-trigger", this.trigger);
    this.setAttribute("data-pura-th-direction", this.direction);
    registry().set(this._id, {
      id: this._id,
      trigger: this.trigger,
      direction: this.direction,
      replay: () => this.replay(),
      el: this,
    });
  }

  _scrub() {
    const tl = this.getAttribute("timeline") === "scroll" ? "scroll()" : "view()";
    this.style.setProperty("--pura-th-timeline", tl);
    const range = this.getAttribute("range");
    if (range) this.style.setProperty("--pura-th-range", range);
    this.setAttribute("data-pura-th-scrub", "");
  }

  _timed() {
    this.style.setProperty("--pura-th-dur", `${this.duration}ms`);
    this.style.setProperty("--pura-th-delay", `${this.delay}ms`);
    this.setAttribute("data-pura-th-anim", "");

    if (this.trigger === "load") { this._reveal(); return; }
    this._observe();
  }

  _observe() {
    if (typeof IntersectionObserver === "undefined") { this._reveal(); return; }
    this._io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { this._reveal(); this._io.disconnect(); this._io = null; break; }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.35 });
    this._io.observe(this);
  }

  _reveal() {
    requestAnimationFrame(() => this.setAttribute("data-pura-th-in", ""));
  }
}

define("pura-text-highlighter", PuraTextHighlighter, meta);
export { PuraTextHighlighter };
