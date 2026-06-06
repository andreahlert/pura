// <pura-swatch-picker> a grid of preset color chips to pick from. Lighter than
// a full color picker.
// Attributes:
//   colors      comma-separated hex list, e.g. "#ef4444,#f59e0b"
//   value       selected color
//   columns     number of grid columns
//   size        swatch size (CSS length or number of px)
//   allow-clear when set, clicking the selected swatch clears the value
// Property: .colors (array) mirrors the attribute.
// Parts: grid, swatch. Event: change { value }.
// a11y: role=radiogroup with role=radio swatches, roving tabindex, arrow keys.
import { PuraElement, define } from "../base.js";
import meta from "./swatch-picker.meta.js";

const DEFAULT_COLORS = [
  "#ef4444", "#f59e0b", "#eab308", "#22c55e", "#14b8a6", "#3b82f6",
  "#6366f1", "#8b5cf6", "#ec4899", "#64748b",
];

class PuraSwatchPicker extends PuraElement {
  static observedAttributes = ["colors", "value", "columns", "size", "allow-clear"];

  connectedCallback() {
    this._value = this.getAttribute("value") || "";
    this._renderAll();
  }

  attributeChangedCallback(name, _old, _value) {
    if (!this.isConnected) return;
    if (name === "value") {
      const v = this.getAttribute("value") || "";
      if (v !== this._value) {
        this._value = v;
        this._syncSelection();
      }
      return;
    }
    this._renderAll();
  }

  _colorList() {
    if (Array.isArray(this._colorsProp) && this._colorsProp.length) return this._colorsProp;
    const attr = this.getAttribute("colors");
    if (attr) return attr.split(",").map((s) => s.trim()).filter(Boolean);
    return DEFAULT_COLORS;
  }

  _renderAll() {
    const colors = this._colorList();
    const cols = parseInt(this.getAttribute("columns"), 10);
    const size = this._size();
    const swatches = colors
      .map((c, i) => {
        const sel = String(c).toLowerCase() === String(this._value || "").toLowerCase();
        return `<button type="button" class="swatch" part="swatch" role="radio"
          data-color="${esc(c)}" aria-checked="${sel ? "true" : "false"}"
          aria-label="${esc(c)}" tabindex="${sel ? 0 : -1}"
          style="background:${esc(c)}"></button>`;
      })
      .join("");

    this.render(
      `<div class="grid" part="grid" role="radiogroup"
         style="grid-template-columns:repeat(${cols > 0 ? cols : "auto-fill"}, minmax(${size}, 1fr));--swatch-size:${size}">
         ${swatches}
       </div>`,
      CSS
    );
    this._grid = this.$(".grid");
    this._grid.addEventListener("click", (e) => {
      const sw = e.target.closest(".swatch");
      if (!sw) return;
      this._pick(sw.dataset.color, sw);
    });
    this._grid.addEventListener("keydown", (e) => this._onKeydown(e));
    // If nothing selected, ensure first swatch is focusable.
    if (!this._swatches().some((s) => s.getAttribute("aria-checked") === "true")) {
      const first = this._swatches()[0];
      if (first) first.tabIndex = 0;
    }
  }

  _size() {
    const raw = this.getAttribute("size");
    if (!raw) return "1.75rem";
    return /^\d+$/.test(raw) ? `${raw}px` : raw;
  }

  _swatches() {
    return this.$$(".swatch");
  }

  _pick(color, el) {
    const wasSelected = color.toLowerCase() === this._value.toLowerCase();
    if (wasSelected && this.bool("allow-clear")) {
      this._value = "";
      this.removeAttribute("value");
    } else {
      this._value = color;
      this.setAttribute("value", color);
    }
    this._syncSelection();
    if (el) el.focus();
    this.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { value: this._value } }));
  }

  _syncSelection() {
    let anyChecked = false;
    this._swatches().forEach((s) => {
      const sel = s.dataset.color.toLowerCase() === this._value.toLowerCase();
      s.setAttribute("aria-checked", sel ? "true" : "false");
      s.tabIndex = sel ? 0 : -1;
      if (sel) anyChecked = true;
    });
    if (!anyChecked) {
      const first = this._swatches()[0];
      if (first) first.tabIndex = 0;
    }
  }

  _focusAt(index) {
    const list = this._swatches();
    if (!list.length) return;
    const i = (index + list.length) % list.length;
    list.forEach((s, j) => (s.tabIndex = j === i ? 0 : -1));
    list[i].focus();
  }

  _onKeydown(e) {
    const list = this._swatches();
    if (!list.length) return;
    const cur = list.indexOf(this.shadowRoot.activeElement);
    const cols = this._effectiveCols(list.length);
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        this._focusAt(cur < 0 ? 0 : cur + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        this._focusAt(cur < 0 ? 0 : cur - 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        this._focusAt(cur < 0 ? 0 : cur + cols);
        break;
      case "ArrowUp":
        e.preventDefault();
        this._focusAt(cur < 0 ? 0 : cur - cols);
        break;
      case "Home":
        e.preventDefault();
        this._focusAt(0);
        break;
      case "End":
        e.preventDefault();
        this._focusAt(list.length - 1);
        break;
      case "Enter":
      case " ":
        if (cur >= 0) {
          e.preventDefault();
          this._pick(list[cur].dataset.color, list[cur]);
        }
        break;
    }
  }

  _effectiveCols(total) {
    const cols = parseInt(this.getAttribute("columns"), 10);
    if (cols > 0) return cols;
    // Estimate columns from the rendered grid width.
    try {
      const first = this._swatches()[0];
      if (first && this._grid) {
        const gw = this._grid.clientWidth || 0;
        const sw = first.offsetWidth || 1;
        return Math.max(1, Math.floor(gw / sw)) || total;
      }
    } catch {}
    return total;
  }

  get value() { return this._value; }
  set value(v) {
    const s = v == null ? "" : String(v);
    this._value = s;
    if (s) this.setAttribute("value", s);
    else this.removeAttribute("value");
    this._syncSelection();
  }

  get colors() { return this._colorList(); }
  set colors(list) {
    this._colorsProp = Array.isArray(list) ? list.slice() : null;
    this._renderAll();
  }
}

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const CSS = `
  :host { display: block; }
  .grid {
    display: grid;
    gap: var(--pura-space-2);
  }
  .swatch {
    width: var(--swatch-size, 1.75rem);
    aspect-ratio: 1; padding: 0; cursor: pointer;
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-sm);
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.06);
    transition: transform var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .swatch:hover { transform: scale(1.08); }
  .swatch:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--pura-bg), 0 0 0 4px var(--pura-ring);
  }
  .swatch[aria-checked="true"] {
    box-shadow: 0 0 0 2px var(--pura-bg), 0 0 0 4px var(--pura-accent);
  }
`;

define("pura-swatch-picker", PuraSwatchPicker, meta);
export { PuraSwatchPicker };
