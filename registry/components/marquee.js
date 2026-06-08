// <pura-marquee> — infinite, seamless scrolling marquee of slotted content.
// The default slot holds the content; it is cloned once into an aria-hidden
// mirror so the loop is gap-free. Animation is pure CSS; prefers-reduced-motion
// pauses it (the base reset neutralizes the duration, and we also stop it
// outright so there is no motion-only affordance).
// Attributes:
//   speed         — seconds for one full loop (number, default 20). Lower = faster.
//   direction     — left (default) | right. Scroll direction of the content.
//   pause-on-hover — when present, the marquee pauses while hovered/focused.
//   paused        — reflected state; present when not animating.
// Slots: default — the content to scroll (text, badges, logos, anything).
// Events: none. Imperative API: play(), pause(), toggle().
// Agent-native layer: stable data-pura-marquee-* attributes mirror live state
//   and the instance registers in window.__puraMarquees keyed by data-pura-id,
//   so agents can enumerate, read and drive every marquee without DOM spelunking.
import { PuraElement, define } from "../base.js";
import meta from "./marquee.meta.js";
import { marqueeTemplate } from "./marquee.template.js";

let uid = 0;

// Lazily-created global registry so agents can enumerate / read / drive every
// marquee on the page. Maps data-pura-id -> element.
function registry() {
  return (window.__puraMarquees ||= new Map());
}

class PuraMarquee extends PuraElement {
  static observedAttributes = ["speed", "direction", "pause-on-hover", "paused"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-marquee-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = marqueeTemplate(this);
    this.render(html, css);

    this._slot = this.$("slot");
    this._mirror = this.$(".mirror");

    // Keep the aria-hidden mirror in sync with the real slotted content so the
    // loop stays seamless even when children change.
    this._slot.addEventListener("slotchange", () => this._syncMirror());
    this._syncMirror();

    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._slot) this._sync();
  }

  // ---- config getters -----------------------------------------------------
  get speed() {
    const n = parseFloat(this.getAttribute("speed"));
    return Number.isFinite(n) && n > 0 ? n : 20;
  }
  get direction() {
    return this.getAttribute("direction") === "right" ? "right" : "left";
  }
  get pauseOnHover() {
    return this.hasAttribute("pause-on-hover");
  }
  get paused() {
    return this.hasAttribute("paused");
  }

  // ---- imperative API ------------------------------------------------------
  play() {
    this.removeAttribute("paused");
  }
  pause() {
    this.setAttribute("paused", "");
  }
  toggle() {
    this.paused ? this.play() : this.pause();
  }

  // Clone the real slotted nodes into the hidden mirror for a gap-free loop.
  _syncMirror() {
    if (!this._mirror) return;
    this._mirror.replaceChildren();
    for (const node of this._slot.assignedNodes({ flatten: true })) {
      this._mirror.appendChild(node.cloneNode(true));
    }
  }

  _sync() {
    // Drive CSS via custom properties / inline state.
    this.style.setProperty("--pura-marquee-speed", `${this.speed}s`);
    this.style.setProperty(
      "--pura-marquee-from",
      this.direction === "right" ? "-50%" : "0%"
    );
    this.style.setProperty(
      "--pura-marquee-to",
      this.direction === "right" ? "0%" : "-50%"
    );
    this._reflectAgentState();
  }

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState() {
    this.setAttribute("data-pura-marquee-speed", String(this.speed));
    this.setAttribute("data-pura-marquee-direction", this.direction);
    this.setAttribute(
      "data-pura-marquee-pause-on-hover",
      this.pauseOnHover ? "true" : "false"
    );
    this.setAttribute(
      "data-pura-marquee-playing",
      this.paused ? "false" : "true"
    );
  }
}

// Minimal attribute-value escaping for interpolated label text.

const CSS = `
  :host { display: block; overflow: hidden; }

  .marquee { display: block; width: 100%; overflow: hidden; }

  /* Two identical groups sit side by side; translating the track by exactly
     half its width swaps the second group into the first's place, so the loop
     is seamless. */
  .track {
    display: flex; width: max-content; flex-wrap: nowrap;
    will-change: transform;
    animation: pura-marquee var(--pura-marquee-speed, 20s) linear infinite;
  }

  .group {
    display: flex; flex-wrap: nowrap; align-items: center;
    gap: var(--pura-space-4); padding-inline-end: var(--pura-space-4);
    white-space: nowrap;
  }

  @keyframes pura-marquee {
    from { transform: translateX(var(--pura-marquee-from, 0%)); }
    to   { transform: translateX(var(--pura-marquee-to, -50%)); }
  }

  /* Pause on hover/focus when opted in (not motion-only: state is also
     mirrored via attributes and the imperative API). */
  :host([pause-on-hover]) .track:hover,
  :host([pause-on-hover]:focus-within) .track {
    animation-play-state: paused;
  }

  /* Explicit paused state. */
  :host([paused]) .track { animation-play-state: paused; }

  /* Respect reduced motion: stop the loop entirely so there is no movement. */
  @media (prefers-reduced-motion: reduce) {
    .track { animation: none; transform: none; }
  }
`;

define("pura-marquee", PuraMarquee, meta);
export { PuraMarquee };
