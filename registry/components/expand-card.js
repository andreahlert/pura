// <pura-expand-card> — the iOS App Store card. Closed, it is a normal card in
// the layout (slot "card"); click it and it morphs into a near-fullscreen
// overlay revealing the detail content (default slot). The morph is a FLIP
// animation: measure the card rect, switch to fixed positioning at the final
// inset, and animate top/left/width/height between the two; the backdrop and
// detail fades are plain CSS. The host keeps its closed size inline while
// open, so the layout never jumps.
//
// Attributes:
//   margin   — px inset of the expanded card from the viewport (default 24).
//   duration — morph time in ms (default 450).
//
// Slots:
//   card      — the always-visible card face.
//   (default) — the detail content, revealed while open.
//
// Events:
//   open  — the card started expanding.
//   close — the card finished collapsing.
//
// Keyboard: Enter/Space opens (the closed card is a button); Escape closes;
//   clicking the backdrop closes.
// Tokens: --pura-expand-radius, --pura-expand-backdrop, --pura-expand-z.
// Reduced motion: open/close swap instantly, no morph.
//
// Agent-native layer: each instance registers in window.__puraExpandCards by
//   data-pura-id with { open, close, el }; data-pura-expand-open mirrors state.
import { PuraElement, define } from "../base.js";
import meta from "./expand-card.meta.js";
import { expandCardTemplate } from "./expand-card.template.js";

let uid = 0;

function registry() {
  return (window.__puraExpandCards ||= new Map());
}

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

class PuraExpandCard extends PuraElement {
  connectedCallback() {
    this._id = this.dataset.puraId || `pura-expand-card-${uid++}`;
    this.dataset.puraId = this._id;

    const { html, css } = expandCardTemplate(this);
    this.render(html, css);

    this._bind();
    registry().set(this._id, {
      id: this._id,
      open: () => this.open(),
      close: () => this.close(),
      el: this,
    });
  }

  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKey);
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  // ---- config ---------------------------------------------------------------
  get margin() {
    const n = parseFloat(this.getAttribute("margin"));
    return Number.isFinite(n) && n >= 0 ? n : 24;
  }
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n > 0 ? n : 450;
  }
  get isOpen() {
    return this.hasAttribute("data-pura-expand-open");
  }

  // ---- public API -----------------------------------------------------------
  open() {
    if (this.isOpen || this._busy) return;
    const card = this.$(".card");
    const rect = card.getBoundingClientRect();

    // the host holds the card's space in the layout
    this.style.width = `${rect.width}px`;
    this.style.height = `${rect.height}px`;

    const m = this.margin;
    const to = {
      top: m,
      left: m,
      width: Math.max(0, window.innerWidth - 2 * m),
      height: Math.max(0, window.innerHeight - 2 * m),
    };
    this.setAttribute("data-pura-expand-open", "");
    card.style.top = `${to.top}px`;
    card.style.left = `${to.left}px`;
    card.style.width = `${to.width}px`;
    card.style.height = `${to.height}px`;
    card.removeAttribute("role");
    card.removeAttribute("tabindex");

    this._flip(card, rect, to);
    window.addEventListener("keydown", this._onKey);
    this.dispatchEvent(new CustomEvent("open", { bubbles: true, composed: true }));
  }

  close() {
    if (!this.isOpen || this._busy) return;
    const card = this.$(".card");
    const from = card.getBoundingClientRect();
    const home = this.getBoundingClientRect(); // the placeholder still holds the spot
    window.removeEventListener("keydown", this._onKey);

    // inline styles hold the landing rect so the finish never flashes
    card.style.top = `${home.top}px`;
    card.style.left = `${home.left}px`;
    card.style.width = `${home.width}px`;
    card.style.height = `${home.height}px`;

    const finish = () => {
      this.removeAttribute("data-pura-expand-open");
      card.style.top = card.style.left = card.style.width = card.style.height = "";
      this.style.width = this.style.height = "";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    };
    this._flip(card, from, home, finish);
  }

  // ---- internals ------------------------------------------------------------
  _bind() {
    const card = this.$(".card");
    card.addEventListener("click", () => { if (!this.isOpen) this.open(); });
    card.addEventListener("keydown", (e) => {
      if (this.isOpen) return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.open(); }
    });
    this.$(".backdrop").addEventListener("click", () => this.close());
    this._onKey = (e) => { if (e.key === "Escape") this.close(); };
  }

  // Animate the card between two rects; inline styles already hold the target.
  _flip(card, from, to, onDone) {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof card.animate !== "function") { onDone?.(); return; }
    this._busy = true;
    const anim = card.animate(
      [
        { top: `${from.top}px`, left: `${from.left}px`, width: `${from.width}px`, height: `${from.height}px` },
        { top: `${to.top}px`, left: `${to.left}px`, width: `${to.width}px`, height: `${to.height}px` },
      ],
      { duration: this.duration, easing: EASE },
    );
    anim.onfinish = () => {
      this._busy = false;
      onDone?.();
    };
  }
}

define("pura-expand-card", PuraExpandCard, meta);
export { PuraExpandCard };
