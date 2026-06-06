// <pura-segmented-control> — iOS-style single-choice segmented control.
// A pill container with a sliding active indicator behind the selected segment.
// Attributes:
//   options  — comma-separated list of segment labels (e.g. "Day,Week,Month").
//   value    — the currently selected option's label. Defaults to the first
//              option when absent or not present in `options`.
//   disabled — disables the whole control.
//   size     — sm | md (default) | lg.
// Keyboard: ArrowLeft/Up + ArrowRight/Down move and select; Home/End jump to
//   ends. Roving tabindex (one segment tabbable at a time).
// ARIA: container role=radiogroup; each segment role=radio + aria-checked.
// Machine-readable: stable data-* on the host (data-value, data-active-index,
//   data-count) and per-segment (data-value, data-index, data-active).
// Events: CustomEvent('change', { detail: { value }, bubbles: true }) on user
//   interaction only (not on programmatic value/attribute updates).
import { PuraElement, define } from "../base.js";
import meta from "./segmented-control.meta.js";

class PuraSegmentedControl extends PuraElement {
  static observedAttributes = ["options", "value", "disabled", "size"];

  connectedCallback() {
    this._build();
  }

  attributeChangedCallback(name, oldV, newV) {
    if (!this._group) return; // not rendered yet — degrade gracefully
    if (oldV === newV) return;
    if (name === "options") {
      this._build();
    } else if (name === "value") {
      this._select(this._indexOf(newV), { emit: false, focus: false });
    } else if (name === "disabled") {
      this._syncDisabled();
    }
    // size is purely presentational via :host([size]) selectors
  }

  // Parse the comma list into trimmed, non-empty labels.
  get _options() {
    const raw = this.getAttribute("options");
    if (!raw) return [];
    return raw.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
  }

  _indexOf(value) {
    const opts = this._options;
    const i = opts.indexOf(value);
    return i; // -1 when not found
  }

  // Build the shadow DOM from the current options. Safe with zero options.
  _build() {
    const opts = this._options;
    const count = opts.length;

    // Resolve the active index: requested value if valid, else first option.
    let active = this._indexOf(this.getAttribute("value"));
    if (active < 0) active = count > 0 ? 0 : -1;

    const segments = opts
      .map((label, i) => {
        const checked = i === active;
        return `<button part="segment" class="segment" type="button" role="radio"
          data-index="${i}" data-value="${escapeAttr(label)}"
          data-active="${checked}"
          aria-checked="${checked}" tabindex="${checked ? 0 : -1}"
        >${escapeHtml(label)}</button>`;
      })
      .join("");

    this.render(
      `<div part="group" class="group" role="radiogroup"
         aria-label="${escapeAttr(this.getAttribute("label") || "Segmented control")}"
         style="--pura-seg-count: ${count || 1};">
         <span part="indicator" class="indicator" aria-hidden="true"></span>
         ${segments}
       </div>`,
      CSS
    );

    this._group = this.$("[part=group]");
    this._indicator = this.$(".indicator");
    this._segments = this.$$(".segment");
    this._activeIndex = active;

    this._group.addEventListener("click", this._onClick);
    this._group.addEventListener("keydown", this._onKeydown);

    this._reflectIndicator();
    this._reflectHostData();
    this._syncDisabled();
  }

  _onClick = (e) => {
    if (this.hasAttribute("disabled")) return;
    const btn = e.target.closest(".segment");
    if (!btn) return;
    this._select(Number(btn.dataset.index), { emit: true, focus: false });
  };

  _onKeydown = (e) => {
    if (this.hasAttribute("disabled")) return;
    const count = this._segments.length;
    if (!count) return;
    let i = this._activeIndex < 0 ? 0 : this._activeIndex;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") i = (i + 1) % count;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") i = (i - 1 + count) % count;
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = count - 1;
    else return;
    e.preventDefault();
    this._select(i, { emit: true, focus: true });
  };

  // Select segment at index. emit: dispatch change; focus: move DOM focus.
  _select(index, { emit = false, focus = false } = {}) {
    const count = this._segments.length;
    if (count === 0) return;
    if (index < 0 || index >= count) return;

    const changed = index !== this._activeIndex;
    this._activeIndex = index;

    this._segments.forEach((b, j) => {
      const on = j === index;
      b.setAttribute("aria-checked", on);
      b.dataset.active = String(on);
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });

    // Reflect value attribute without re-triggering attributeChangedCallback work.
    const value = this._segments[index].dataset.value;
    if (this.getAttribute("value") !== value) this.setAttribute("value", value);

    this._reflectIndicator();
    this._reflectHostData();

    if (emit && changed) {
      this.dispatchEvent(
        new CustomEvent("change", { detail: { value }, bubbles: true })
      );
    }
  }

  // Move the sliding indicator via transform (no layout measurement needed).
  _reflectIndicator() {
    if (!this._indicator) return;
    const i = this._activeIndex;
    if (i < 0) {
      this._indicator.style.opacity = "0";
      return;
    }
    this._indicator.style.opacity = "1";
    this._indicator.style.setProperty("--pura-seg-index", String(i));
  }

  // Mirror current state onto the host as stable data-* hooks.
  _reflectHostData() {
    this.dataset.count = String(this._segments.length);
    this.dataset.activeIndex = String(this._activeIndex);
    if (this._activeIndex >= 0) {
      this.dataset.value = this._segments[this._activeIndex].dataset.value;
    } else {
      delete this.dataset.value;
    }
  }

  _syncDisabled() {
    const disabled = this.hasAttribute("disabled");
    if (this._group) this._group.setAttribute("aria-disabled", String(disabled));
    this._segments.forEach((b) => {
      b.disabled = disabled;
      if (disabled) b.tabIndex = -1;
      else b.tabIndex = Number(b.dataset.index) === this._activeIndex ? 0 : -1;
    });
  }

  // Public API.
  get value() {
    return this._activeIndex >= 0 && this._segments
      ? this._segments[this._activeIndex].dataset.value
      : this.getAttribute("value");
  }
  set value(v) {
    const i = this._indexOf(v);
    if (i >= 0) this._select(i, { emit: false, focus: false });
    else this.setAttribute("value", v);
  }

  get options() {
    return this._options;
  }
  set options(list) {
    this.setAttribute("options", Array.isArray(list) ? list.join(",") : String(list));
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(v) {
    this.toggleAttribute("disabled", !!v);
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}

const CSS = `
  :host { display: inline-block; vertical-align: middle; }
  :host([disabled]) { opacity: 0.55; pointer-events: none; }

  .group {
    position: relative;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    isolation: isolate;
    gap: 0;
    padding: var(--pura-space-1);
    background: var(--pura-subtle);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-full);
  }

  /* Sliding active indicator: equal-width, positioned by transform — no JS
     measurement, so it lands correctly on first paint and snaps under
     prefers-reduced-motion (base reset neutralizes the transition). */
  .indicator {
    position: absolute;
    z-index: 0;
    top: var(--pura-space-1);
    bottom: var(--pura-space-1);
    left: var(--pura-space-1);
    width: calc((100% - 2 * var(--pura-space-1)) / var(--pura-seg-count, 1));
    background: var(--pura-bg);
    border-radius: var(--pura-radius-full);
    box-shadow: var(--pura-shadow-sm);
    transform: translateX(calc(var(--pura-seg-index, 0) * 100%));
    transition: transform var(--pura-dur) var(--pura-ease),
      opacity var(--pura-dur) var(--pura-ease);
  }

  .segment {
    position: relative;
    z-index: 1;
    appearance: none;
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; white-space: nowrap; cursor: pointer;
    border: none; background: transparent;
    color: var(--pura-muted-fg);
    padding: 0 var(--pura-space-4); height: 1.875rem;
    border-radius: var(--pura-radius-full);
    transition: color var(--pura-dur) var(--pura-ease);
    -webkit-tap-highlight-color: transparent;
  }
  .segment:hover { color: var(--pura-fg); }
  .segment[aria-checked="true"] { color: var(--pura-fg); font-weight: 600; }
  .segment:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  .segment:disabled { cursor: not-allowed; }

  /* sizes */
  :host([size="sm"]) .segment { height: 1.625rem; font-size: var(--pura-text-xs); padding: 0 var(--pura-space-3); }
  :host([size="lg"]) .segment { height: 2.25rem; font-size: var(--pura-text-base); padding: 0 var(--pura-space-5); }
`;

define("pura-segmented-control", PuraSegmentedControl, meta);
export { PuraSegmentedControl };
