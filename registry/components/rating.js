// <pura-rating> — star rating control. Click or hover a star to rate; full
// keyboard support via arrow keys / Home / End. Exposed as an ARIA slider so
// assistive tech and agents read a clear min/max/now/text.
// Attributes:
//   value      — current rating (number, may be fractional with allow-half)
//   max        — number of stars (default 5)
//   readonly   — display-only, not interactive (still focusable for AT? no — inert)
//   allow-half — permit half-star (0.5) increments on hover/click/keyboard
//   label      — accessible label (aria-label for the slider), default "Rating"
// Slots: none.
// Events: change { value } — fires on commit (click / keyboard). 'input' fires
//   on every keyboard step. Hover preview does NOT emit.
// Agent-native layer: stable data-pura-rating-* attributes mirror live state and
//   the instance registers in window.__puraRatings keyed by its data-pura-id.
import { PuraElement, define } from "../base.js";
import meta from "./rating.meta.js";
import { ratingTemplate } from "./rating.template.js";

let uid = 0;

// Lazily-created global registry so agents can enumerate / read / drive every
// rating on the page without touching the DOM. Maps data-pura-id -> element.
function registry() {
  return (window.__puraRatings ||= new Map());
}

class PuraRating extends PuraElement {
  static observedAttributes = ["value", "max", "readonly", "allow-half", "label"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-rating-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    // Hover preview state (null = no preview, show committed value).
    this._preview = null;

    const { html, css } = ratingTemplate(this);
    this.render(html, css);
    this._root = this.$(".rating");
    this._stars = this.$(".stars");

    this._onPointerLeave = () => {
      this._preview = null;
      this._paint();
    };

    this._root.addEventListener("keydown", (e) => this._onKeydown(e));
    this._root.addEventListener("pointerleave", this._onPointerLeave);
    this._root.addEventListener("blur", this._onPointerLeave);

    this._build();
    this._paint();
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._root) return;
    if (name === "max") this._build();
    if (name === "label") {
      this._root.setAttribute("aria-label", this.getAttribute("label") || "Rating");
    }
    this._preview = null;
    this._paint();
  }

  // ---- config getters ---------------------------------------------------
  get max() {
    const m = Number(this.getAttribute("max"));
    return Number.isFinite(m) && m > 0 ? Math.floor(m) : 5;
  }

  get value() {
    const v = Number(this.getAttribute("value"));
    return Number.isFinite(v) ? clamp(v, 0, this.max) : 0;
  }
  set value(v) {
    const n = Number(v);
    if (Number.isFinite(n)) this.setAttribute("value", String(clamp(n, 0, this.max)));
    else this.removeAttribute("value");
  }

  get readonly() { return this.hasAttribute("readonly"); }
  get allowHalf() { return this.hasAttribute("allow-half"); }
  get step() { return this.allowHalf ? 0.5 : 1; }

  // ---- build star DOM ---------------------------------------------------
  _build() {
    const max = this.max;
    let markup = "";
    for (let i = 1; i <= max; i++) {
      // Each star = two stacked glyphs (empty base + clipped filled overlay) so
      // half-fills render crisply without extra fonts.
      markup +=
        `<span class="star" part="star" data-index="${i}" aria-hidden="true">` +
        `<span class="glyph empty">${STAR}</span>` +
        `<span class="glyph full">${STAR}</span>` +
        `</span>`;
    }
    this._stars.innerHTML = markup;

    // Pointer interactions per star, only when interactive.
    for (const star of this._stars.querySelectorAll(".star")) {
      star.addEventListener("pointermove", (e) => this._onPointerMove(e, star));
      star.addEventListener("click", (e) => this._onClick(e, star));
    }
  }

  // Given a pointer x within a star and the star index, resolve the value
  // (supporting left-half / right-half when allow-half).
  _valueFromPointer(e, star) {
    const index = Number(star.dataset.index);
    if (!this.allowHalf) return index;
    const rect = star.getBoundingClientRect();
    const isLeft = e.clientX - rect.left < rect.width / 2;
    return isLeft ? index - 0.5 : index;
  }

  _onPointerMove(e, star) {
    if (this.readonly) return;
    this._preview = this._valueFromPointer(e, star);
    this._paint();
  }

  _onClick(e, star) {
    if (this.readonly) return;
    const v = this._valueFromPointer(e, star);
    // Clicking the current value clears it (toggle to 0), a common rating UX.
    const next = v === this.value ? 0 : v;
    this._commit(next);
  }

  // ---- keyboard ---------------------------------------------------------
  _onKeydown(e) {
    if (this.readonly) return;
    const step = this.step;
    let v = this.value;
    let handled = true;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        v = clamp(v + step, 0, this.max);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        v = clamp(v - step, 0, this.max);
        break;
      case "Home":
        v = 0;
        break;
      case "End":
        v = this.max;
        break;
      default:
        // Number keys 0-9 jump straight to that rating.
        if (/^[0-9]$/.test(e.key)) v = clamp(Number(e.key), 0, this.max);
        else handled = false;
    }
    if (!handled) return;
    e.preventDefault();
    this._preview = null;
    if (v !== this.value) {
      this._setValue(v);
      this.dispatchEvent(new CustomEvent("input", { detail: { value: v }, bubbles: true }));
    }
    this._commit(v);
  }

  // Set value attribute + repaint without emitting change.
  _setValue(v) {
    this.setAttribute("value", String(v));
    this._paint();
  }

  // Commit a final value and emit change (only if it actually changed, or it
  // was a deliberate re-affirm via click).
  _commit(v) {
    const changed = v !== this.value;
    this._setValue(v);
    this.dispatchEvent(new CustomEvent("change", { detail: { value: v }, bubbles: true }));
    return changed;
  }

  // ---- render fill ------------------------------------------------------
  _paint() {
    if (!this._stars) return;
    const max = this.max;
    const shown = this._preview != null ? this._preview : this.value;

    const stars = this._stars.querySelectorAll(".star");
    stars.forEach((star, i) => {
      const index = i + 1;
      let fill = 0; // 0 .. 1 of this star
      if (shown >= index) fill = 1;
      else if (shown > index - 1) fill = shown - (index - 1);
      star.style.setProperty("--fill", `${fill * 100}%`);
      star.classList.toggle("on", fill > 0);
    });

    // ARIA slider state on the root.
    this._root.setAttribute("aria-valuemin", "0");
    this._root.setAttribute("aria-valuemax", String(max));
    this._root.setAttribute("aria-valuenow", String(this.value));
    this._root.setAttribute(
      "aria-valuetext",
      `${this.value} of ${max} stars`
    );
    this._root.setAttribute("aria-readonly", this.readonly ? "true" : "false");
    // Readonly => not focusable / not a control affordance.
    this._root.setAttribute("tabindex", this.readonly ? "-1" : "0");

    const text = this.$(".sr");
    if (text) text.textContent = `${this.value}/${max}`;

    this._reflectAgentState();
  }

  // Stable machine-readable mirror of state on the host element.
  _reflectAgentState() {
    this.setAttribute("data-pura-rating-value", String(this.value));
    this.setAttribute("data-pura-rating-max", String(this.max));
    this.setAttribute("data-pura-rating-readonly", this.readonly ? "true" : "false");
    this.setAttribute("data-pura-rating-step", String(this.step));
  }
}

// Filled/empty star path; single inline SVG reused via currentColor.
const STAR =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" focusable="false">` +
  `<path d="M12 2.5l2.9 6.06 6.6.92-4.8 4.62 1.16 6.5L12 18.9 6.14 21.6l1.16-6.5-4.8-4.62 6.6-.92z"/>` +
  `</svg>`;

function clamp(n, lo, hi) {
  return Math.min(hi, Math.max(lo, n));
}

// Minimal attribute-value escaping for interpolated label text.


define("pura-rating", PuraRating, meta);
export { PuraRating };
