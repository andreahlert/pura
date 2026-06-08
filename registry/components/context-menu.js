// <pura-context-menu> — right-click (contextmenu) menu. Wraps a target region
// (default slot) and, on contextmenu, opens a floating menu panel at the pointer
// coordinates. The panel is a native popover="auto" (top layer + light dismiss +
// ESC for free); because the anchor is a pointer (not an element), it is
// positioned manually with fixed top/left set to the event clientX/clientY.
// Menu items are <pura-menu-item> elements provided via slot name="menu".
// Attributes: target (boolean — make the host itself the contextmenu target
//   instead of the slotted region), disabled.
// Emits: open / close on the host; each item emits "select".
//
// <pura-menu-item> — a single menu entry (role=menuitem). Default slot = label;
// slot name="icon" = leading icon; slot name="shortcut" = trailing hint.
// Attributes: disabled, variant (default | danger), inset.
// Emits: "select" (bubbles, composed) when activated by click/Enter/Space.
import { PuraElement, define } from "../base.js";
import meta from "./context-menu.meta.js";
import { menuItemTemplate, contextMenuTemplate } from "./context-menu.template.js";

let uid = 0;

class PuraMenuItem extends PuraElement {
  static observedAttributes = ["disabled", "variant", "inset"];

  connectedCallback() {
    const { html, css } = menuItemTemplate(this);
    this.render(html, css);
    this.setAttribute("role", "menuitem");
    this._sync();
    this.addEventListener("click", (e) => this._activate(e));
    this.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this._activate(e);
      }
    });
  }

  attributeChangedCallback() {
    if (this.isConnected) this._sync();
  }

  _sync() {
    const disabled = this.hasAttribute("disabled");
    this.setAttribute("aria-disabled", disabled ? "true" : "false");
    // tabindex is managed by the parent menu's roving focus; default to -1.
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "-1");
  }

  _activate(e) {
    if (this.hasAttribute("disabled")) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }
    this.dispatchEvent(new CustomEvent("select", { bubbles: true, composed: true }));
  }
}

class PuraContextMenu extends PuraElement {
  static observedAttributes = ["disabled"];

  connectedCallback() {
    this._name = `--pura-ctx-${uid++}`;
    const { html, css } = contextMenuTemplate(this);
    this.render(html, css);
    this._menu = this.$('[popover]');
    this._target = this.hasAttribute("target") ? this : this.$(".region");

    this._onContextMenu = (e) => this._handleContextMenu(e);
    this._target.addEventListener("contextmenu", this._onContextMenu);

    this._menu.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      this.toggleAttribute("open", open);
      if (open) {
        this._items().find((i) => !i.hasAttribute("disabled"))?.focus();
      }
      this.dispatchEvent(new CustomEvent(open ? "open" : "close", { bubbles: true }));
    });

    this._menu.addEventListener("keydown", (e) => this._onKeydown(e));
    // Close after an item is selected.
    this._menu.addEventListener("select", () => this.hide());
  }

  disconnectedCallback() {
    this._target?.removeEventListener("contextmenu", this._onContextMenu);
  }

  _items() {
    const slot = this.$('slot[name="menu"]');
    return slot
      .assignedElements({ flatten: true })
      .filter((el) => el.getAttribute("role") === "menuitem" || el.tagName === "PURA-MENU-ITEM");
  }

  _focusable() {
    return this._items().filter((i) => !i.hasAttribute("disabled"));
  }

  _handleContextMenu(e) {
    if (this.hasAttribute("disabled")) return;
    e.preventDefault();
    e.stopPropagation();
    this._position(e.clientX, e.clientY);
    // Re-show if already open (move to new coords).
    if (this._menu.matches(":popover-open")) this._menu.hidePopover();
    this._menu.showPopover();
    // Re-position after layout so size is known, then clamp to viewport.
    queueMicrotask(() => this._position(e.clientX, e.clientY));
  }

  _position(x, y) {
    const m = this._menu;
    m.style.top = `${y}px`;
    m.style.left = `${x}px`;
    // Clamp inside the viewport once dimensions are measurable.
    const rect = m.getBoundingClientRect();
    if (rect.width) {
      const pad = 8;
      let nx = x;
      let ny = y;
      if (x + rect.width + pad > window.innerWidth) nx = Math.max(pad, window.innerWidth - rect.width - pad);
      if (y + rect.height + pad > window.innerHeight) ny = Math.max(pad, window.innerHeight - rect.height - pad);
      m.style.left = `${nx}px`;
      m.style.top = `${ny}px`;
    }
  }

  _onKeydown(e) {
    const items = this._focusable();
    if (!items.length) return;
    const active = items.indexOf(document.activeElement) >= 0
      ? document.activeElement
      : (this.shadowRoot.activeElement && items.indexOf(this.shadowRoot.activeElement) >= 0
          ? this.shadowRoot.activeElement
          : null);
    const idx = items.indexOf(active);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        items[(idx + 1 + items.length) % items.length].focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length].focus();
        break;
      case "Home":
        e.preventDefault();
        items[0].focus();
        break;
      case "End":
        e.preventDefault();
        items[items.length - 1].focus();
        break;
      case "Escape":
        // Native popover handles dismissal; ensure host state stays in sync.
        this.hide();
        break;
    }
  }

  show() { this._menu?.showPopover(); }
  hide() { if (this._menu?.matches(":popover-open")) this._menu.hidePopover(); }
}



define("pura-menu-item", PuraMenuItem);
define("pura-context-menu", PuraContextMenu, meta);
export { PuraContextMenu, PuraMenuItem };
