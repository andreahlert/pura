// <pura-stat-grid> — responsive grid wrapper for <pura-stat> children. Columns
// auto-fit to the available width (no fixed count) and 1px dividers run between
// cells, adapting automatically to however many columns wrap. Container only;
// place <pura-stat> elements in the default slot.
//   Parts: grid
//   ARIA: role="group" (a labelled cluster of related stats) with an accessible
//     name from the `label` attribute.
//   Attributes:
//     label   — accessible name for the group.
//     min     — minimum column width (CSS length, e.g. "12rem"); default 11rem.
//     dividers — present (default behaviour) shows the 1px rules; set
//                dividers="none" to drop them.
//   Agent layer: gets a stable data-pura-stat-grid id and registers a live,
//     machine-readable snapshot in window.__puraStats keyed by that id:
//     { label, stats: [{ id, label, value, delta, trend }] }.
//
// <pura-stat> — a single statistic cell.
//   Slots: label (caption/eyebrow), default = the value, help (small footnote).
//     Or supply value/label via attributes when there is no rich markup.
//   Parts: stat, label, value, delta, help
//   Attributes:
//     label  — text label (used when the `label` slot is empty).
//     value  — text value (used when the default slot is empty).
//     delta  — change text (e.g. "+12.5%"); rendered next to the value.
//     trend  — up | down | flat — colours the delta and exposes direction.
//   ARIA: role="group" with the label as its accessible name; the delta gets a
//     descriptive aria-label including the trend direction.
//   Agent layer: stable data-pura-stat id + data-trend; its content is reflected
//     into the parent grid's registry snapshot.
import { PuraElement, define } from "../base.js";
import meta from "./stat-grid.meta.js";

let uid = 0;

// Global, machine-readable registry of every mounted stat grid. Agents can read
// window.__puraStats[id] to get { label, stats: [...] } without scraping the
// DOM. Created lazily, non-enumerable, never overwritten.
function registry() {
  if (!window.__puraStats) {
    Object.defineProperty(window, "__puraStats", {
      value: {},
      writable: false,
      configurable: true,
      enumerable: false,
    });
  }
  return window.__puraStats;
}

class PuraStatGrid extends PuraElement {
  static observedAttributes = ["label", "min", "dividers"];

  connectedCallback() {
    this._id = this.getAttribute("data-pura-stat-grid") || `pura-stat-grid-${++uid}`;
    this.setAttribute("data-pura-stat-grid", this._id);

    if (!this.hasAttribute("role")) this.setAttribute("role", "group");
    this._syncLabel();

    this.render(`<div part="grid" class="grid"><slot></slot></div>`, CSS);

    this._applyMin();
    this._slot = this.$("slot");
    this._slot.addEventListener("slotchange", () => this._sync());
    this._sync();
  }

  disconnectedCallback() {
    delete registry()[this._id];
  }

  attributeChangedCallback(name) {
    if (name === "label") this._syncLabel();
    else if (name === "min") this._applyMin();
  }

  _syncLabel() {
    const label = this.getAttribute("label");
    if (label) this.setAttribute("aria-label", label);
    else this.removeAttribute("aria-label");
    if (this._id) {
      const entry = registry()[this._id];
      if (entry) entry.label = label || null;
    }
  }

  _applyMin() {
    const grid = this.$(".grid");
    if (!grid) return;
    const min = this.getAttribute("min");
    grid.style.setProperty("--pura-stat-min", min || "11rem");
  }

  _items() {
    return this._slot
      ? this._slot.assignedElements().filter((el) => el.tagName === "PURA-STAT")
      : [];
  }

  // Rebuild this grid's registry snapshot. Called on slotchange and when a child
  // stat announces it changed.
  _sync() {
    const items = this._items();
    registry()[this._id] = {
      label: this.getAttribute("label") || null,
      get stats() {
        return items.map((el) => el.snapshot());
      },
    };
  }
}

class PuraStat extends PuraElement {
  static observedAttributes = ["label", "value", "delta", "trend"];

  connectedCallback() {
    this._id = this.getAttribute("data-pura-stat") || `pura-stat-${++uid}`;
    this.setAttribute("data-pura-stat", this._id);

    if (!this.hasAttribute("role")) this.setAttribute("role", "group");
    this._reflectTrend();

    this.render(
      `<div part="stat" class="stat">
         <div part="label" class="label"><slot name="label">${esc(this.getAttribute("label"))}</slot></div>
         <div class="row">
           <div part="value" class="value"><slot>${esc(this.getAttribute("value"))}</slot></div>
           <span part="delta" class="delta" hidden></span>
         </div>
         <div part="help" class="help"><slot name="help"></slot></div>
       </div>`,
      STAT_CSS
    );

    this._delta = this.$("[part='delta']");
    this._updateDelta();
    this._syncLabel();

    // Hide the label/help rows when both their slot and attribute are empty so
    // spacing collapses; notify the parent grid when content changes.
    for (const name of ["label", "help"]) {
      const slot = this.$(`slot[name="${name}"]`);
      const host = slot.closest(`[part="${name}"]`);
      const upd = () => {
        const has = slot.assignedNodes().length || (name === "label" && this.getAttribute("label"));
        host.style.display = has ? "" : "none";
        this._notify();
      };
      slot.addEventListener("slotchange", upd);
      upd();
    }
    const valueSlot = this.$("[part='value'] slot");
    valueSlot.addEventListener("slotchange", () => this._notify());
  }

  attributeChangedCallback(name) {
    if (!this.shadowRoot || !this.shadowRoot.childNodes.length) return;
    if (name === "trend") {
      this._reflectTrend();
      this._updateDelta();
    } else if (name === "delta") {
      this._updateDelta();
    } else if (name === "label") {
      this._refreshLabelSlot();
      this._syncLabel();
    } else if (name === "value") {
      this._refreshValueSlot();
    }
    this._notify();
  }

  _reflectTrend() {
    const t = this.getAttribute("trend");
    if (t) this.setAttribute("data-trend", t);
    else this.removeAttribute("data-trend");
  }

  // Keep aria-label on the host in sync so the group has an accessible name even
  // when the label lives only in a slot.
  _syncLabel() {
    const label = this._labelText();
    if (label) this.setAttribute("aria-label", label);
    else this.removeAttribute("aria-label");
  }

  _refreshLabelSlot() {
    const slot = this.$('slot[name="label"]');
    if (slot && !slot.assignedNodes().length) slot.textContent = this.getAttribute("label") || "";
  }

  _refreshValueSlot() {
    const slot = this.$('[part="value"] slot');
    if (slot && !slot.assignedNodes().length) slot.textContent = this.getAttribute("value") || "";
  }

  _updateDelta() {
    if (!this._delta) return;
    const delta = this.getAttribute("delta");
    if (delta) {
      this._delta.textContent = delta;
      this._delta.hidden = false;
      const t = this.getAttribute("trend");
      const dir = t === "up" ? "increase" : t === "down" ? "decrease" : null;
      this._delta.setAttribute("aria-label", dir ? `${delta}, ${dir}` : delta);
    } else {
      this._delta.textContent = "";
      this._delta.hidden = true;
      this._delta.removeAttribute("aria-label");
    }
  }

  // Tell the parent grid to refresh its registry snapshot.
  _notify() {
    const grid = this.closest("pura-stat-grid");
    if (grid && typeof grid._sync === "function") grid._sync();
  }

  _slotText(sel) {
    const slot = this.shadowRoot && this.shadowRoot.querySelector(sel);
    if (!slot) return null;
    const assigned = slot.assignedNodes();
    const nodes = assigned.length ? assigned : [...slot.childNodes];
    const text = nodes
      .map((n) => (n.textContent || "").trim())
      .join(" ")
      .trim();
    return text || null;
  }

  _labelText() {
    return this._slotText('slot[name="label"]') || this.getAttribute("label") || null;
  }

  _valueText() {
    return this._slotText('[part="value"] slot') || this.getAttribute("value") || null;
  }

  // Machine-readable view of this stat, used by the grid registry.
  snapshot() {
    return {
      id: this._id,
      label: this._labelText(),
      value: this._valueText(),
      delta: this.getAttribute("delta") || null,
      trend: this.getAttribute("trend") || null,
    };
  }
}

// Escape attribute-sourced text before injecting into the template fallback.
function esc(v) {
  if (v == null) return "";
  return String(v).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

const CSS = `
  :host { display: block; }

  /* The container background bleeds through a 1px gap to draw dividers that
     adapt to any wrapped column count. Each cell repaints its own surface. */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--pura-stat-min, 11rem), 1fr));
    gap: 1px;
    background: var(--pura-border);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-lg);
    overflow: hidden;
  }

  :host([dividers="none"]) .grid {
    gap: 0;
    background: transparent;
    border-color: transparent;
  }

  ::slotted(pura-stat) {
    background: var(--pura-bg);
  }
  :host([dividers="none"]) ::slotted(pura-stat) {
    background: transparent;
  }
`;

const STAT_CSS = `
  :host { display: block; height: 100%; }
  .stat {
    display: flex;
    flex-direction: column;
    gap: var(--pura-space-1);
    padding: var(--pura-space-5);
    height: 100%;
  }

  [part="label"] {
    font-size: var(--pura-text-xs);
    font-weight: 550;
    letter-spacing: 0.02em;
    color: var(--pura-muted);
    line-height: 1.4;
  }

  .row {
    display: flex;
    align-items: baseline;
    gap: var(--pura-space-2);
    flex-wrap: wrap;
  }
  [part="value"] {
    font-size: var(--pura-text-xl);
    font-weight: 650;
    color: var(--pura-fg);
    line-height: 1.1;
  }

  [part="delta"] {
    display: inline-flex;
    align-items: center;
    font-size: var(--pura-text-xs);
    font-weight: 600;
    color: var(--pura-muted-fg);
    line-height: 1;
  }
  [part="delta"]::before { content: ""; }
  :host([trend="up"])   [part="delta"] { color: var(--pura-success-fg); }
  :host([trend="down"]) [part="delta"] { color: var(--pura-danger); }
  :host([trend="flat"]) [part="delta"] { color: var(--pura-muted); }
  :host([trend="up"])   [part="delta"]::before { content: "\\2191\\00a0"; }
  :host([trend="down"]) [part="delta"]::before { content: "\\2193\\00a0"; }
  :host([trend="flat"]) [part="delta"]::before { content: "\\2192\\00a0"; }

  [part="help"] {
    font-size: var(--pura-text-xs);
    color: var(--pura-muted);
    line-height: 1.5;
    margin-top: var(--pura-space-1);
  }
`;

define("pura-stat-grid", PuraStatGrid, meta);
define("pura-stat", PuraStat);
export { PuraStatGrid, PuraStat };
