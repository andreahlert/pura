// <pura-masonry> — Pinterest-style column (masonry) layout for slotted items.
//   Uses native CSS multi-column layout so items flow top-to-bottom, then wrap
//   into the next column, with each item kept unbroken (break-inside: avoid).
//   Container only: drop any elements into the default slot.
//
//   Parts: masonry
//   Slots: (default) — the masonry items, in source order.
//   Attributes:
//     columns  — fixed column count (integer >= 1). When set, the layout uses
//                exactly that many columns at all widths.
//     min      — minimum column width (CSS length, e.g. "16rem"); when `columns`
//                is omitted the column count is responsive: as many columns as
//                fit at this width. Default 16rem.
//     gap      — gap between columns and rows (CSS length or token-friendly
//                value). Default var(--pura-space-4).
//     label    — accessible name for the list of items.
//   ARIA: host is role="list" (a labelled collection); each slotted item is
//     assigned role="listitem" so assistive tech announces the set and count.
//   Events: emits "pura-masonry-change" (bubbles, composed) whenever the set of
//     items changes, with detail { id, count }.
//   Agent layer: gets a stable data-pura-masonry id and registers a live,
//     machine-readable snapshot in window.__puraMasonry keyed by that id:
//     { label, columns, count, items: [{ index, label }] }. In fixed mode the
//     column count is reflected to data-columns for inspection (responsive mode
//     omits it, since the count depends on the rendered width).
import { PuraElement, define } from "../base.js";
import meta from "./masonry.meta.js";
import { masonryTemplate } from "./masonry.template.js";

let uid = 0;

// Global, machine-readable registry of every mounted masonry. Agents can read
// window.__puraMasonry[id] without scraping the DOM. Created lazily,
// non-enumerable, never overwritten.
function registry() {
  if (!window.__puraMasonry) {
    Object.defineProperty(window, "__puraMasonry", {
      value: {},
      writable: false,
      configurable: true,
      enumerable: false,
    });
  }
  return window.__puraMasonry;
}

class PuraMasonry extends PuraElement {
  static observedAttributes = ["columns", "min", "gap", "label"];

  connectedCallback() {
    this._id = this.getAttribute("data-pura-masonry") || `pura-masonry-${++uid}`;
    this.setAttribute("data-pura-masonry", this._id);

    if (!this.hasAttribute("role")) this.setAttribute("role", "list");
    this._syncLabel();

    // role="none" on the wrapper drops the intervening generic from the a11y
    // tree, so the host's list role associates directly with the listitems.
    const { html, css } = masonryTemplate(this);
    this.render(html, css);

    this._col = this.$(".masonry");
    this._applyLayout();

    this._slot = this.$("slot");
    this._slot.addEventListener("slotchange", () => this._sync());
    this._sync();
  }

  disconnectedCallback() {
    delete registry()[this._id];
  }

  attributeChangedCallback(name) {
    // Guard: connectedCallback may not have run yet (or element detached).
    if (!this._col) return;
    if (name === "label") this._syncLabel();
    else this._applyLayout();
    this._sync();
  }

  // Push the columns/min/gap attributes into the CSS custom properties that
  // drive the multi-column layout, and reflect the resolved count.
  _applyLayout() {
    const gap = this.getAttribute("gap");
    this._col.style.setProperty("--pura-masonry-gap", gap || "var(--pura-space-4)");

    const fixed = parseInt(this.getAttribute("columns"), 10);
    if (Number.isFinite(fixed) && fixed >= 1) {
      this._col.style.setProperty("--pura-masonry-count", String(fixed));
      this._col.style.removeProperty("--pura-masonry-min");
      this._col.style.columnWidth = "auto";
      this.setAttribute("data-columns", String(fixed));
    } else {
      // Responsive: column-width drives how many columns fit at the current
      // width; column-count stays auto so the browser packs as many as fit.
      const min = this.getAttribute("min") || "16rem";
      this._col.style.setProperty("--pura-masonry-min", min);
      this._col.style.removeProperty("--pura-masonry-count");
      this._col.style.columnWidth = "";
      this.removeAttribute("data-columns");
    }
  }

  _syncLabel() {
    const label = this.getAttribute("label");
    if (label) this.setAttribute("aria-label", label);
    else this.removeAttribute("aria-label");
    const entry = this._id && registry()[this._id];
    if (entry) entry.label = label || null;
  }

  _items() {
    return this._slot
      ? this._slot.assignedElements().filter((el) => !el.hasAttribute("slot"))
      : [];
  }

  // Assign listitem roles to slotted children, refresh the registry snapshot,
  // and announce the change. Called on slotchange and on attribute changes.
  _sync() {
    const items = this._items();
    for (const el of items) {
      if (!el.hasAttribute("role")) el.setAttribute("role", "listitem");
    }

    const id = this._id;
    const fixed = parseInt(this.getAttribute("columns"), 10);
    registry()[id] = {
      label: this.getAttribute("label") || null,
      columns: Number.isFinite(fixed) && fixed >= 1 ? fixed : "auto",
      count: items.length,
      get items() {
        return items.map((el, index) => ({
          index,
          label:
            el.getAttribute("aria-label") ||
            (el.textContent || "").trim().slice(0, 120) ||
            null,
        }));
      },
    };

    this.dispatchEvent(
      new CustomEvent("pura-masonry-change", {
        bubbles: true,
        composed: true,
        detail: { id, count: items.length },
      })
    );
  }
}


define("pura-masonry", PuraMasonry, meta);
export { PuraMasonry };
