// <pura-reactions> — emoji reaction bar. A horizontal group of <pura-reaction>
// pills. Clicking a pill toggles its active state and increments/decrements its
// count, emitting a 'react' event { emoji, active, count }.
//
// <pura-reactions>
//   Attributes:
//     label — accessible group label (aria-label), default "Reactions".
//   Slots: default — the <pura-reaction> children.
//   Events: react { emoji, active, count, reaction } — re-dispatched from a child
//     when toggled (bubbles, composed).
//   Parts: bar.
//   Agent-native: role="group"; registers in window.__puraReactions keyed by
//     data-pura-id; reflects data-pura-reactions-count (number of pills) and
//     data-pura-reactions-active (count of active pills).
//
// <pura-reaction> — a single reaction pill (a toggle button, ARIA pressed).
//   Attributes:
//     emoji  — the emoji glyph to show (e.g. "👍"). Degrades to empty if absent.
//     count  — current count (integer, default 0). Reflected.
//     active — boolean; the viewer has reacted. Highlighted pill, aria-pressed.
//     label  — optional accessible label for the reaction (e.g. "Thumbs up").
//     disabled — non-interactive.
//   Events: react { emoji, active, count, reaction } (bubbles, composed).
//   Parts: button, emoji, count.
//   Keyboard: focusable button; Enter/Space toggle (native button behavior).
//   Agent-native: stable data-pura-reaction-* mirror of emoji/count/active and a
//     window.__puraReactions registry entry keyed by data-pura-id.
import { PuraElement, define } from "../base.js";
import meta from "./reactions.meta.js";
import { reactionTemplate } from "./reactions.template.js";

let uid = 0;

// Lazily-created global registry so agents can enumerate / read / drive every
// reaction bar and pill on the page. Maps data-pura-id -> element.
function registry() {
  return (window.__puraReactions ||= new Map());
}

class PuraReactions extends PuraElement {
  static observedAttributes = ["label"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-reactions-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this.render(
      `<div class="bar" part="bar" role="group"
            aria-label="${esc(this.getAttribute("label") || "Reactions")}">
         <slot></slot>
       </div>`,
      CONTAINER_CSS
    );
    this._bar = this.$(".bar");
    this._slot = this.$("slot");

    // Recompute aggregate agent state whenever children change.
    this._onSlotChange = () => this._reflectAgentState();
    this._slot.addEventListener("slotchange", this._onSlotChange);

    // Re-affirm the aggregate whenever a child toggles.
    this._onReact = () => this._reflectAgentState();
    this.addEventListener("react", this._onReact);

    this._reflectAgentState();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._bar) return;
    if (name === "label") {
      this._bar.setAttribute("aria-label", this.getAttribute("label") || "Reactions");
    }
  }

  // Live list of child <pura-reaction> elements.
  get reactions() {
    return [...this.querySelectorAll(":scope > pura-reaction")];
  }

  _reflectAgentState() {
    const items = this.reactions;
    const active = items.filter((r) => r.hasAttribute("active")).length;
    this.setAttribute("data-pura-reactions-count", String(items.length));
    this.setAttribute("data-pura-reactions-active", String(active));
  }
}

class PuraReaction extends PuraElement {
  static observedAttributes = ["emoji", "count", "active", "label", "disabled"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-reaction-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const { html, css } = reactionTemplate(this);
    this.render(html, css);
    this._btn = this.$("button");
    this._btn.addEventListener("click", (e) => this._onClick(e));

    this._paint();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._btn) this._paint();
  }

  // ---- config getters / setters ----------------------------------------
  get emoji() {
    return this.getAttribute("emoji") || "";
  }
  set emoji(v) {
    if (v == null) this.removeAttribute("emoji");
    else this.setAttribute("emoji", String(v));
  }

  get count() {
    const n = parseInt(this.getAttribute("count"), 10);
    return Number.isFinite(n) ? n : 0;
  }
  set count(v) {
    const n = parseInt(v, 10);
    this.setAttribute("count", String(Number.isFinite(n) ? n : 0));
  }

  get active() {
    return this.hasAttribute("active");
  }
  set active(v) {
    if (v) this.setAttribute("active", "");
    else this.removeAttribute("active");
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  // ---- interaction ------------------------------------------------------
  _onClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    this.toggle();
  }

  // Toggle active state, adjust the count, and emit 'react'. Public so agents
  // can drive it programmatically.
  toggle() {
    const next = !this.active;
    // Adjust count: +1 when activating, -1 when deactivating (floor at 0).
    const base = this.count;
    const nextCount = next ? base + 1 : Math.max(0, base - 1);
    this.active = next;
    this.count = nextCount;
    this._paint();
    this.dispatchEvent(
      new CustomEvent("react", {
        detail: {
          emoji: this.emoji,
          active: next,
          count: nextCount,
          reaction: this,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  // ---- render -----------------------------------------------------------
  _paint() {
    if (!this._btn) return;
    const emoji = this.emoji;
    const count = this.count;
    const active = this.active;
    const label = this.getAttribute("label");

    this.$(".emoji").textContent = emoji;
    // Hide the count entirely when zero to keep the pill compact.
    const countEl = this.$(".count");
    countEl.textContent = count > 0 ? String(count) : "";
    countEl.style.display = count > 0 ? "" : "none";

    // Accessible name: explicit label or fallback to the emoji glyph.
    const name = label || (emoji ? `React with ${emoji}` : "React");
    this._btn.setAttribute("aria-label", `${name}, ${count}`);
    this._btn.setAttribute("aria-pressed", active ? "true" : "false");
    this._btn.disabled = this.disabled;

    // Screen-reader-only running text for context.
    const sr = this.$(".sr");
    if (sr) sr.textContent = `${name}: ${count} reaction${count === 1 ? "" : "s"}`;

    this._reflectAgentState();
  }

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState() {
    this.setAttribute("data-pura-reaction-emoji", this.emoji);
    this.setAttribute("data-pura-reaction-count", String(this.count));
    this.setAttribute("data-pura-reaction-active", this.active ? "true" : "false");
    this.setAttribute("data-pura-reaction-disabled", this.disabled ? "true" : "false");
  }
}

// Minimal attribute-value escaping for interpolated label text.
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

const CONTAINER_CSS = `
  :host { display: inline-block; }
  .bar {
    display: inline-flex; flex-wrap: wrap; align-items: center;
    gap: var(--pura-space-2);
  }
`;


define("pura-reactions", PuraReactions, meta);
define("pura-reaction", PuraReaction);
export { PuraReactions, PuraReaction };
