// <pura-virtual-list> windowed rendering for large datasets.
//   Properties:
//     items       (array)                   → the full dataset
//     renderItem  (fn(item,index)->string|Node) → row renderer (default: text)
//   Attributes:
//     item-height (px)  → fixed row height (windowing assumes uniform rows)
//     height      (px)  → viewport height
//   Only the visible slice (+ overscan) is rendered. A tall spacer preserves the
//   real scroll height; the rendered window is offset with translateY.
//   Dispatches "visiblechange" {start,end} on the host when the window moves.
//   Parts: viewport, item.
import { PuraElement, define } from "../base.js";
import meta from "./virtual-list.meta.js";
import { virtualListTemplate } from "./virtual-list.template.js";

const OVERSCAN = 4;

class PuraVirtualList extends PuraElement {
  static observedAttributes = ["item-height", "height"];

  connectedCallback() {
    const { html, css } = virtualListTemplate(this);
    this.render(html, css);
    this._viewport = this.$(".viewport");
    this._spacer = this.$(".spacer");
    this._window = this.$(".window");
    this._start = -1;
    this._end = -1;

    this._onScroll = () => this._schedule();
    this._viewport.addEventListener("scroll", this._onScroll, { passive: true });

    // Lazy property upgrade: a consumer may have set .items/.renderItem before
    // the element upgraded.
    this._upgrade("items");
    this._upgrade("renderItem");

    this._sync();
    this._update(true);
  }

  disconnectedCallback() {
    this._viewport?.removeEventListener("scroll", this._onScroll);
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  attributeChangedCallback() {
    if (!this._viewport) return;
    this._sync();
    this._update(true);
  }

  _upgrade(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const v = this[prop];
      delete this[prop];
      this[prop] = v;
    }
  }

  get items() {
    return this._items || [];
  }
  set items(v) {
    this._items = Array.isArray(v) ? v : [];
    if (this._viewport) {
      this._viewport.scrollTop = 0;
      this._sync();
      this._update(true);
    }
  }

  get renderItem() {
    return this._renderItem || DEFAULT_RENDER;
  }
  set renderItem(fn) {
    this._renderItem = typeof fn === "function" ? fn : null;
    if (this._viewport) this._update(true);
  }

  _itemHeight() {
    return parseInt(this.getAttribute("item-height"), 10) || 32;
  }

  // Map height attr + total scroll height to the layout.
  _sync() {
    const h = this.getAttribute("height");
    this._viewport.style.height = h ? (/\D/.test(h) ? h : `${h}px`) : "18rem";
    this._spacer.style.height = `${this.items.length * this._itemHeight()}px`;
  }

  // rAF-throttle scroll-driven recomputation.
  _schedule() {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = 0;
      this._update(false);
    });
  }

  _update(force) {
    const ih = this._itemHeight();
    const total = this.items.length;
    const viewH = this._viewport.clientHeight || 0;
    const scrollTop = this._viewport.scrollTop;

    let start = Math.floor(scrollTop / ih) - OVERSCAN;
    let end = Math.ceil((scrollTop + viewH) / ih) + OVERSCAN;
    start = Math.max(0, start);
    end = Math.min(total, Math.max(start, end));

    if (!force && start === this._start && end === this._end) return;
    this._start = start;
    this._end = end;

    this._window.style.transform = `translateY(${start * ih}px)`;

    const render = this.renderItem;
    const frag = document.createDocumentFragment();
    for (let i = start; i < end; i++) {
      const row = document.createElement("div");
      row.setAttribute("part", "item");
      row.className = "item";
      row.style.height = `${ih}px`;
      const out = render(this.items[i], i);
      if (out instanceof Node) row.appendChild(out);
      else row.innerHTML = String(out);
      frag.appendChild(row);
    }
    this._window.replaceChildren(frag);

    this.dispatchEvent(
      new CustomEvent("visiblechange", { detail: { start, end } })
    );
  }
}

const DEFAULT_RENDER = (item) => String(item);


define("pura-virtual-list", PuraVirtualList, meta);
export { PuraVirtualList };
