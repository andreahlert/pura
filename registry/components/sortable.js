// <pura-sortable> is the drag-to-reorder list: grab an item with the pointer,
// the siblings open space with a FLIP tween at every index swap, and on drop
// the component emits a bubbling 'change' event with { item, from, to, order }.
// Where pura-kanban covers a board with columns, this is the simple flat list.
// Items are the light-DOM children of the slotted <ul>/<ol> (or of the host
// itself), so SSR paints a plain semantic static list with zero JS.
//
// Attributes:
//   axis     - "y" (default) | "x". Drag direction and arrow-key mapping.
//   handle   - CSS selector inside each item that starts the drag (default:
//              the whole item).
//   disabled - boolean. No dragging, no keyboard reordering.
//   duration - number (ms). Overrides the token-derived FLIP duration.
//
// Keyboard: items are focusable; Space/Enter lifts an item, ArrowUp/Down (or
//   Left/Right when axis="x") moves it, Space/Enter drops and emits 'change',
//   Escape restores the order held at lift time.
//
// Tokens: --pura-sortable-drag-scale (1.02), --pura-sortable-drag-shadow,
//   --pura-sortable-drag-z (10).
// Reduced motion: the FLIP engine no-ops (items still reorder instantly) and
//   the drop snap is skipped; the 'change' event always fires.
//
// Agent-native layer: each instance registers in window.__puraSortables by
//   data-pura-id with { id, el, order(), move(from, to) }; live state mirrors
//   in data-pura-sortable-axis / -enabled / -dragging / -count / -order.
import { PuraElement, define } from "../base.js";
import meta from "./sortable.meta.js";
import { sortableTemplate } from "./sortable.template.js";
import { flip, reducedMotion, tokenDuration } from "../animate.js";

let uid = 0;

function registry() {
  return (window.__puraSortables ||= new Map());
}

const THRESHOLD = 4; // px of pointer travel before a drag starts (clicks pass through)
const EASE = "cubic-bezier(0.2, 0, 0, 1)"; // matches --pura-ease-standard

class PuraSortable extends PuraElement {
  static observedAttributes = ["disabled", "axis", "handle"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-sortable-${uid++}`;
    this.dataset.puraId = this._id;
    this._nextKey = 0;

    const { html, css } = sortableTemplate(this);
    this.render(html, css);

    this._onDown = (e) => this._down(e);
    this._onKeyDown = (e) => this._key(e);
    this.addEventListener("pointerdown", this._onDown);
    this.addEventListener("keydown", this._onKeyDown);
    // native HTML5 drag (images, links) would hijack the pointer drag
    this.addEventListener("dragstart", (e) => {
      if (this._drag) e.preventDefault();
    });

    this._observeList();
    this.shadowRoot.querySelector("slot").addEventListener("slotchange", () => this._observeList());

    this._wireItems();
    this._reflectAgentState();
    this._reflectOrder();

    registry().set(this._id, {
      id: this._id,
      el: this,
      order: () => this.order,
      move: (from, to) => this.move(from, to),
    });
  }

  disconnectedCallback() {
    this._unbindWindow();
    this._mo?.disconnect();
    this._mo = null;
    if (registry().get(this._id)?.el === this) registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot.childNodes.length) return; // pre-render
    this._wireItems();
    this._reflectAgentState();
  }

  // ---- config ---------------------------------------------------------------
  get axis() {
    return this.getAttribute("axis") === "x" ? "x" : "y";
  }
  get duration() {
    const n = parseFloat(this.getAttribute("duration"));
    return Number.isFinite(n) && n >= 0 ? n : undefined;
  }
  get items() {
    return [...this._list().children].filter((n) => n.nodeType === 1);
  }
  get order() {
    return this.items.map((it) => this._keyOf(it));
  }

  // ---- public API -----------------------------------------------------------
  // Programmatic reorder: move the item at `from` to index `to`, FLIP the list
  // and emit 'change' (same detail shape as a pointer drop).
  move(from, to) {
    const items = this.items;
    const item = items[from];
    if (!item || to < 0 || to >= items.length || from === to) return;
    const list = this._list();
    const others = items.filter((it) => it !== item);
    const ref = others[to] || null;
    flip(items, () => list.insertBefore(item, ref), this._flipOpts());
    this._reflectOrder();
    this._emitChange(item, from, to);
  }

  // ---- pointer drag ---------------------------------------------------------
  _down(e) {
    if (this._drag || this.hasAttribute("disabled")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const items = this.items;
    const item = items.find((it) => it === e.target || it.contains(e.target));
    if (!item) return;
    const handleSel = this.getAttribute("handle");
    if (handleSel) {
      const grip = item.querySelector(handleSel);
      if (!grip || !(grip === e.target || grip.contains(e.target))) return;
    }
    this._drag = {
      item,
      pointerId: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      from: items.indexOf(item),
      started: false,
      tx: 0,
      ty: 0,
    };
    this._onWinMove = (ev) => this._move(ev);
    this._onWinUp = (ev) => this._up(ev);
    window.addEventListener("pointermove", this._onWinMove);
    window.addEventListener("pointerup", this._onWinUp);
    window.addEventListener("pointercancel", this._onWinUp);
  }

  _move(e) {
    const d = this._drag;
    if (!d || e.pointerId !== d.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.started) {
      if (Math.hypot(dx, dy) < THRESHOLD) return;
      this._lift(d);
    }
    const axis = this.axis;
    d.tx = axis === "y" ? 0 : d.startRect.left + dx - d.natural.left;
    d.ty = axis === "x" ? 0 : d.startRect.top + dy - d.natural.top;
    d.item.style.transform = `translate(${d.tx}px, ${d.ty}px) scale(${d.scale})`;
    this._hitTest(d);
  }

  _lift(d) {
    d.started = true;
    const r = d.item.getBoundingClientRect();
    d.startRect = { left: r.left, top: r.top, width: r.width, height: r.height };
    d.natural = { left: r.left, top: r.top };
    d.scale = parseFloat(getComputedStyle(this).getPropertyValue("--pura-sortable-drag-scale")) || 1.02;

    const s = d.item.style;
    d.prev = {
      transform: s.transform, zIndex: s.zIndex, boxShadow: s.boxShadow,
      willChange: s.willChange, position: s.position, transition: s.transition, cursor: s.cursor,
    };
    if (getComputedStyle(d.item).position === "static") s.position = "relative";
    s.zIndex = "var(--pura-sortable-drag-z, 10)";
    s.boxShadow = "var(--pura-sortable-drag-shadow, 0 8px 24px rgba(0, 0, 0, 0.18))";
    s.willChange = "transform";
    s.transition = "none";
    s.cursor = "grabbing";

    try { d.item.setPointerCapture(d.pointerId); } catch (_) {}
    this.setAttribute("data-pura-sortable-dragging", "true");
  }

  // When the dragged center crosses a sibling's midpoint, move it in the DOM
  // and FLIP only the siblings (the dragged item keeps following the pointer).
  _hitTest(d) {
    const items = this.items;
    const others = items.filter((it) => it !== d.item);
    if (!others.length) return;
    const axis = this.axis;
    const center = axis === "x"
      ? d.natural.left + d.tx + d.startRect.width / 2
      : d.natural.top + d.ty + d.startRect.height / 2;

    let idx = others.length;
    for (let i = 0; i < others.length; i++) {
      const r = others[i].getBoundingClientRect();
      const mid = axis === "x" ? r.left + r.width / 2 : r.top + r.height / 2;
      if (center < mid) { idx = i; break; }
    }
    const list = this._list();
    const ref = others[idx] || null;
    if (d.item.nextElementSibling === ref) return;
    if (ref === null && list.lastElementChild === d.item) return;

    flip(others, () => list.insertBefore(d.item, ref), this._flipOpts());

    // Re-anchor: the item's layout slot moved, so recompute its untransformed
    // origin from the rect center (scale keeps the center, default origin) and
    // re-apply the same visual position.
    const r = d.item.getBoundingClientRect();
    d.natural = {
      left: r.left + r.width / 2 - d.tx - d.startRect.width / 2,
      top: r.top + r.height / 2 - d.ty - d.startRect.height / 2,
    };
  }

  _up(e) {
    const d = this._drag;
    if (!d || e.pointerId !== d.pointerId) return;
    this._unbindWindow();
    this._drag = null;
    if (!d.started) return;
    try { d.item.releasePointerCapture(d.pointerId); } catch (_) {}

    const s = d.item.style;
    s.transform = d.prev.transform;
    s.zIndex = d.prev.zIndex;
    s.boxShadow = d.prev.boxShadow;
    s.willChange = d.prev.willChange;
    s.position = d.prev.position;
    s.transition = d.prev.transition;
    s.cursor = d.prev.cursor;

    if ((d.tx || d.ty) && !reducedMotion() && typeof d.item.animate === "function") {
      d.item.animate(
        [
          { transform: `translate(${d.tx}px, ${d.ty}px) scale(${d.scale})` },
          { transform: "none" },
        ],
        { duration: this.duration ?? tokenDuration(this), easing: EASE }
      );
    }

    this.setAttribute("data-pura-sortable-dragging", "false");
    this._wireItems(); // restore grab cursor on the dragged item/handle
    this._reflectOrder();
    const to = this.items.indexOf(d.item);
    if (to !== d.from) this._emitChange(d.item, d.from, to);
  }

  _unbindWindow() {
    if (!this._onWinMove) return;
    window.removeEventListener("pointermove", this._onWinMove);
    window.removeEventListener("pointerup", this._onWinUp);
    window.removeEventListener("pointercancel", this._onWinUp);
    this._onWinMove = this._onWinUp = null;
  }

  // ---- keyboard -------------------------------------------------------------
  _key(e) {
    if (this.hasAttribute("disabled")) return;
    const items = this.items;
    const item = items.find((it) => it === e.target);
    if (!item) return;
    const axis = this.axis;
    const prevKey = axis === "x" ? "ArrowLeft" : "ArrowUp";
    const nextKey = axis === "x" ? "ArrowRight" : "ArrowDown";

    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (this._lifted === item) {
        delete item.dataset.puraSortableLifted;
        this._lifted = null;
        this._reflectOrder();
        const to = items.indexOf(item);
        if (to !== this._liftFrom) this._emitChange(item, this._liftFrom, to);
      } else {
        if (this._lifted) delete this._lifted.dataset.puraSortableLifted;
        this._lifted = item;
        this._liftFrom = items.indexOf(item);
        this._liftOrder = items;
        item.dataset.puraSortableLifted = "true";
      }
    } else if (this._lifted === item && (e.key === prevKey || e.key === nextKey)) {
      e.preventDefault();
      const i = items.indexOf(item);
      const j = e.key === nextKey ? i + 1 : i - 1;
      if (j < 0 || j >= items.length) return;
      const list = this._list();
      const ref = e.key === nextKey ? items[j].nextElementSibling : items[j];
      flip(items, () => list.insertBefore(item, ref), this._flipOpts());
      item.focus();
      this._reflectOrder();
    } else if (this._lifted === item && e.key === "Escape") {
      e.preventDefault();
      const list = this._list();
      const saved = this._liftOrder;
      flip(saved, () => { for (const it of saved) list.appendChild(it); }, this._flipOpts());
      delete item.dataset.puraSortableLifted;
      this._lifted = null;
      item.focus();
      this._reflectOrder();
    }
  }

  // ---- internals ------------------------------------------------------------
  // The sortable container: a single slotted <ul>/<ol>, or the host itself.
  _list() {
    const first = this.firstElementChild;
    if (first && !first.nextElementSibling && /^(UL|OL)$/.test(first.tagName)) return first;
    return this;
  }

  _observeList() {
    this._mo?.disconnect();
    this._mo = new MutationObserver(() => {
      this._wireItems();
      this._reflectOrder();
    });
    this._mo.observe(this._list(), { childList: true });
    this._wireItems();
    this._reflectOrder();
  }

  _wireItems() {
    const disabled = this.hasAttribute("disabled");
    const handleSel = this.getAttribute("handle");
    for (const it of this.items) {
      if (it._puraSortableKey === undefined) {
        it._puraSortableKey = it.dataset.id || it.id || `${this._id}-item-${this._nextKey++}`;
      }
      if (!it.hasAttribute("tabindex")) it.setAttribute("tabindex", "0");
      it.style.userSelect = "none";
      it.style.webkitUserSelect = "none";
      const grip = handleSel ? it.querySelector(handleSel) : it;
      if (grip) {
        grip.style.touchAction = "none";
        grip.style.cursor = disabled ? "" : "grab";
      }
    }
  }

  _keyOf(item) {
    return item.dataset.id || item.id || item._puraSortableKey || "";
  }

  _flipOpts() {
    const d = this.duration;
    return d !== undefined ? { duration: d, easing: EASE } : { easing: EASE };
  }

  _emitChange(item, from, to) {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { item, from, to, order: this.order },
        bubbles: true,
        composed: true,
      })
    );
  }

  _reflectAgentState() {
    this.setAttribute("data-pura-sortable-axis", this.axis);
    this.setAttribute("data-pura-sortable-enabled", this.hasAttribute("disabled") ? "false" : "true");
    if (!this.hasAttribute("data-pura-sortable-dragging")) {
      this.setAttribute("data-pura-sortable-dragging", "false");
    }
  }

  _reflectOrder() {
    const order = this.order;
    this.setAttribute("data-pura-sortable-count", String(order.length));
    this.setAttribute("data-pura-sortable-order", order.join(","));
  }
}

define("pura-sortable", PuraSortable, meta);
export { PuraSortable };
