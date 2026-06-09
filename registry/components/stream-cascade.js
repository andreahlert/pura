// <pura-stream-cascade> — staggered entrance for streamed content. Wrap a list,
// a table body, a feed, anything whose children arrive progressively, and each
// child fades up a step after the previous one. The stagger is computed at PARSE
// TIME by CSS `::slotted(:nth-child(n))` rules (see the template), so when this
// is server-rendered as Declarative Shadow DOM the cascade plays as the light
// children stream in over the wire, before any JavaScript runs. That makes it
// the natural entrance for an agent streaming rows/tokens into the page.
//
// Two regimes, both handled:
//   - burst (all children present at parse) → the nth-child delays cascade them.
//   - live (children appended over time) → each newcomer animates immediately
//     (delay 0), since the stream itself already provides the time stagger; a
//     stale positional delay would make late items wait pointlessly.
//
// Attributes:
//   animation — fade (default) | slide-up | slide-left | zoom | blur.
//   step      — ms between each child's entrance (number, default 60).
//
// Slots: default — the streamed children.
//
// Event: cascadeitem { index, total } (bubbles, composed) per child appended
//   after connect, so an agent gets a signal each time an item streams in.
//
// Reduced motion / <pura-motion-budget>: delays and durations multiply
//   var(--pura-motion); base.js RESET also collapses them under reduced motion.
//
// Agent-native layer: registers in window.__puraStreamCascades by data-pura-id
//   and mirrors data-pura-cascade-animation / data-pura-cascade-step.
import { PuraElement, define } from "../base.js";
import meta from "./stream-cascade.meta.js";
import { streamCascadeTemplate } from "./stream-cascade.template.js";

let uid = 0;

function registry() {
  return (window.__puraStreamCascades ||= new Map());
}

const ANIMATIONS = new Set(["fade", "slide-up", "slide-left", "zoom", "blur"]);

class PuraStreamCascade extends PuraElement {
  static observedAttributes = ["animation", "step"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-stream-cascade-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = streamCascadeTemplate(this);
    this.render(html, css);

    this._sync();
    this._observe();
  }

  disconnectedCallback() {
    this._mo?.disconnect();
    this._mo = null;
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot?.childNodes.length) return;
    this._sync();
  }

  get animation() {
    const a = this.getAttribute("animation");
    return ANIMATIONS.has(a) ? a : "fade";
  }
  get step() {
    const n = parseFloat(this.getAttribute("step"));
    return Number.isFinite(n) && n >= 0 ? n : 60;
  }

  _sync() {
    this.style.setProperty("--pura-cascade-anim", `pura-cascade-${this.animation}`);
    this.style.setProperty("--pura-cascade-step", `${this.step}ms`);
    this.setAttribute("data-pura-cascade-animation", this.animation);
    this.setAttribute("data-pura-cascade-step", String(this.step));
  }

  // Watch for children appended after the initial parse: animate them
  // immediately (the stream already staggers them in time) and announce each.
  _observe() {
    if (typeof MutationObserver === "undefined") return;
    this._mo = new MutationObserver((records) => {
      for (const rec of records) {
        for (const node of rec.addedNodes) {
          if (node.nodeType !== 1) continue; // elements only
          node.style && (node.style.animationDelay = "0ms");
          this.dispatchEvent(new CustomEvent("cascadeitem", {
            bubbles: true,
            composed: true,
            detail: { index: this._indexOf(node), total: this.children.length },
          }));
        }
      }
    });
    this._mo.observe(this, { childList: true });
  }

  _indexOf(node) {
    let i = 0;
    for (const child of this.children) { if (child === node) return i; i++; }
    return -1;
  }
}

define("pura-stream-cascade", PuraStreamCascade, meta);
export { PuraStreamCascade };
