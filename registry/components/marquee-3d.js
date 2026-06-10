// <pura-marquee-3d> — multiple vertical marquee columns laid on a statically
// tilted 3D plane (rotateX/rotateZ inside a perspective scene). The
// testimonial-hero / logo-wall composition the flat <pura-marquee> cannot do:
// slotted items are distributed round-robin into N columns, each column loops
// with a pure CSS @keyframes animation, adjacent columns scroll in alternating
// directions with deterministically staggered durations (index math, no
// randomness).
//
// Attributes:
//   columns        — number of vertical columns, 1..8 (default 3).
//   speed          — seconds for one full column loop (default 25). Lower = faster.
//   rotate-x       — plane tilt around the X axis in degrees (default 55).
//   rotate-z       — plane rotation around the Z axis in degrees (default -45).
//   pause-on-hover — when present, pauses while hovered or focused within.
//   paused         — reflected state; present when not animating.
//   label          — aria-label for the role=marquee container.
//
// Tokens: --pura-marquee-3d-perspective, --pura-marquee-3d-rotate-x,
//   --pura-marquee-3d-rotate-z, --pura-marquee-3d-scale, --pura-marquee-3d-gap,
//   --pura-marquee-3d-speed, --pura-marquee-3d-plane-width,
//   --pura-marquee-3d-plane-height.
//
// SSR / pre-JS: the slotted items paint as a static multi-column layout on the
// tilted plane. Reduced motion: the columns hold still. Accessibility: the
// animated columns are aria-hidden clones; the original slotted content stays
// in the accessibility tree (visually hidden once the clones exist).
//
// Agent-native layer: each instance registers in window.__puraMarquee3ds by
//   data-pura-id; data-pura-m3d-* attributes mirror live state (columns, speed,
//   playing) so agents can enumerate and drive every instance.
import { PuraElement, define } from "../base.js";
import meta from "./marquee-3d.meta.js";
import { marquee3dTemplate } from "./marquee-3d.template.js";

let uid = 0;

// Lazily-created global registry so agents can enumerate / read / drive every
// 3D marquee on the page. Maps data-pura-id -> element.
function registry() {
  return (window.__puraMarquee3ds ||= new Map());
}

class PuraMarquee3d extends PuraElement {
  static observedAttributes = [
    "columns",
    "speed",
    "rotate-x",
    "rotate-z",
    "pause-on-hover",
    "paused",
    "label",
  ];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-marquee-3d-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);
    this._mount();
    this._sync();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._cols) return;
    // Structural attributes are baked into the template (column count, the
    // tilt fallbacks, the aria label), so re-render and rebuild for those.
    if (name === "columns" || name === "rotate-x" || name === "rotate-z" || name === "label") {
      this._mount();
    }
    this._sync();
  }

  // ---- config getters -------------------------------------------------------
  get columns() {
    const n = parseInt(this.getAttribute("columns"), 10);
    return Number.isFinite(n) && n > 0 ? Math.min(n, 8) : 3;
  }
  get speed() {
    const n = parseFloat(this.getAttribute("speed"));
    return Number.isFinite(n) && n > 0 ? n : 25;
  }
  get pauseOnHover() {
    return this.hasAttribute("pause-on-hover");
  }
  get paused() {
    return this.hasAttribute("paused");
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

  // ---- internals --------------------------------------------------------------
  _mount() {
    const { html, css } = marquee3dTemplate(this);
    this.render(html, css);
    this._slot = this.$("slot");
    this._cols = this.$(".cols");
    // Rebuild the columns whenever the slotted content changes.
    this._slot.addEventListener("slotchange", () => this._build());
    this._build();
  }

  // Distribute the slotted items round-robin into N columns; each column gets
  // a track with two identical aria-hidden groups so the loop is seamless.
  // Per-column variation is index math (duration stagger, alternating
  // direction): deterministic, never random.
  _build() {
    const items = this._slot.assignedElements({ flatten: true });
    this._cols.replaceChildren();
    const n = this.columns;
    const buckets = Array.from({ length: n }, () => []);
    items.forEach((item, i) => buckets[i % n].push(item));
    buckets.forEach((bucket, i) => {
      const col = document.createElement("div");
      col.className = "col";
      col.setAttribute("part", "col");
      const track = document.createElement("div");
      track.className = "track";
      track.setAttribute("part", "track");
      track.style.setProperty(
        "--pura-m3d-col-duration",
        `${(this.speed * (1 + (i % 3) * 0.18)).toFixed(2)}s`
      );
      track.style.setProperty(
        "--pura-m3d-col-direction",
        i % 2 ? "reverse" : "normal"
      );
      for (let copy = 0; copy < 2; copy++) {
        const group = document.createElement("div");
        group.className = "group";
        group.setAttribute("part", "group");
        for (const item of bucket) group.appendChild(item.cloneNode(true));
        track.appendChild(group);
      }
      col.appendChild(track);
      this._cols.appendChild(col);
    });
    // Only hide the static (accessible) layer once animated clones exist.
    this.toggleAttribute("data-pura-m3d-ready", items.length > 0);
  }

  _sync() {
    this.style.setProperty("--pura-marquee-3d-speed", `${this.speed}s`);
    this._reflectAgentState();
  }

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState() {
    this.setAttribute("data-pura-m3d-columns", String(this.columns));
    this.setAttribute("data-pura-m3d-speed", String(this.speed));
    this.setAttribute(
      "data-pura-m3d-pause-on-hover",
      this.pauseOnHover ? "true" : "false"
    );
    this.setAttribute("data-pura-m3d-playing", this.paused ? "false" : "true");
  }
}

define("pura-marquee-3d", PuraMarquee3d, meta);
export { PuraMarquee3d };
