// <pura-menubar> — application menubar (role=menubar). Holds
// <pura-menubar-menu label="File"> children; each menu renders a trigger button
// (its label) plus a dropdown panel built on the native Popover API + CSS anchor
// positioning. The panel's default slot holds <pura-menu-item> rows.
//
// Behavior matches shadcn/ui: click a trigger to open; once any menu is open,
// hovering a sibling trigger switches to it. Keyboard: Left/Right move between
// top-level menus (roving tabindex), Down opens & focuses first item, Up/Down
// move within items, Esc closes and restores focus to the trigger.
//
// <pura-menubar>             — role=menubar wrapper.
// <pura-menubar-menu>        — attrs: label (trigger text), disabled.
// <pura-menu-item>           — attrs: disabled, inset. Dispatches "select".
import { PuraElement, define } from "../base.js";
import meta from "./menubar.meta.js";

let uid = 0;

// ── <pura-menu-item> ───────────────────────────────────────────────────────
class PuraMenuItem extends PuraElement {
  static observedAttributes = ["disabled", "inset"];

  connectedCallback() {
    this.render(
      `<div part="item" role="menuitem" tabindex="-1"
        aria-disabled="${this.hasAttribute("disabled") ? "true" : "false"}">
         <span class="icon" part="icon" aria-hidden="true"><slot name="icon"></slot></span>
         <span class="label"><slot></slot></span>
         <span class="shortcut" part="shortcut"><slot name="shortcut"></slot></span>
       </div>`,
      ITEM_CSS
    );
    this._item = this.$('[part="item"]');
    this.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled")) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return;
      }
      this.dispatchEvent(new CustomEvent("select", { bubbles: true, composed: true }));
    });
  }

  attributeChangedCallback() {
    if (this._item)
      this._item.setAttribute("aria-disabled", this.hasAttribute("disabled") ? "true" : "false");
  }

  focus() { this._item?.focus(); }
}

const ITEM_CSS = `
  :host { display: block; }
  [part="item"] {
    display: flex; align-items: center; gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); cursor: pointer; user-select: none;
    padding: var(--pura-space-2) var(--pura-space-3);
    border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  [part="item"]:hover, [part="item"]:focus-visible, [part="item"][data-active] {
    outline: none; background: var(--pura-subtle); color: var(--pura-fg);
  }
  .icon { display: inline-flex; width: 1rem; height: 1rem; flex: none; color: var(--pura-muted); }
  .icon:empty { display: none; }
  .label { flex: 1; }
  .shortcut { margin-left: var(--pura-space-5); font-size: var(--pura-text-xs);
    color: var(--pura-muted); letter-spacing: 0.04em; }
  .shortcut:empty { display: none; }
  :host([inset]) .icon { display: inline-flex; }
  :host([disabled]) [part="item"] { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
`;

// ── <pura-menubar-menu> ──────────────────────────────────────────────────────
class PuraMenubarMenu extends PuraElement {
  static observedAttributes = ["label", "disabled"];

  connectedCallback() {
    this._name = `--pura-menubar-${uid++}`;
    this.render(
      `<button part="trigger" type="button" role="menuitem"
        aria-haspopup="true" aria-expanded="false" tabindex="-1"
        ${this.hasAttribute("disabled") ? "disabled" : ""}>${this.getAttribute("label") || ""}</button>
       <div part="content" role="menu" popover="manual"><slot></slot></div>`,
      MENU_CSS.replaceAll("ANCHOR", this._name)
    );
    this._trigger = this.$('[part="trigger"]');
    this._panel = this.$('[part="content"]');

    this._trigger.addEventListener("click", () => {
      if (this.hasAttribute("disabled")) return;
      this.toggle();
    });
    // Hover-switch: once any sibling is open, hovering swaps the open menu.
    this._trigger.addEventListener("pointerenter", () => {
      if (this.hasAttribute("disabled")) return;
      const bar = this.closest("pura-menubar");
      if (bar && bar.hasOpenMenu() && !this.open) bar.openMenu(this);
    });

    this._panel.addEventListener("keydown", (e) => this._onPanelKeydown(e));
    // Selecting an item closes the menu (light dismiss on activation).
    this._panel.addEventListener("select", () => this.close());
    // Reflect popover state changes (e.g. light dismiss / programmatic) to ARIA.
    this._panel.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      this._trigger.setAttribute("aria-expanded", open ? "true" : "false");
      this.toggleAttribute("open", open);
    });
  }

  attributeChangedCallback(name) {
    if (!this._trigger) return;
    if (name === "label") this._trigger.textContent = this.getAttribute("label") || "";
    if (name === "disabled") this._trigger.disabled = this.hasAttribute("disabled");
  }

  get open() { return this._panel?.matches(":popover-open") ?? false; }

  get items() {
    return [...this.querySelectorAll("pura-menu-item")].filter((i) => !i.hasAttribute("disabled"));
  }

  toggle() { this.open ? this.close() : this.open_(); }

  // Open this menu; tells the parent menubar so siblings close.
  open_() {
    const bar = this.closest("pura-menubar");
    if (bar) bar.openMenu(this);
    else this.show();
  }

  // Low-level show used by the parent menubar after closing siblings.
  show(focusFirst) {
    if (this.hasAttribute("disabled") || this.open) {
      if (focusFirst) this._focusItem(0);
      return;
    }
    this._panel.showPopover();
    if (focusFirst) this._focusItem(0);
    this.dispatchEvent(new CustomEvent("open", { bubbles: true }));
  }

  close(focusTrigger) {
    if (!this.open) return;
    this._panel.hidePopover();
    if (focusTrigger) this._trigger.focus();
    this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
  }

  _focusItem(i) {
    const items = this.items;
    if (!items.length) return;
    const idx = (i + items.length) % items.length;
    items.forEach((it) => it.removeAttribute("data-active"));
    items[idx].setAttribute("data-active", "");
    items[idx].focus();
    this._active = idx;
  }

  _onPanelKeydown(e) {
    const items = this.items;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this._focusItem((this._active ?? -1) + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        this._focusItem((this._active ?? 0) - 1);
        break;
      case "Home":
        e.preventDefault();
        this._focusItem(0);
        break;
      case "End":
        e.preventDefault();
        this._focusItem(items.length - 1);
        break;
      case "Escape":
        e.preventDefault();
        this.close(true);
        break;
      case "ArrowLeft":
      case "ArrowRight":
        // Let the menubar move to the previous/next top-level menu.
        e.preventDefault();
        this.closest("pura-menubar")?._moveFromOpen(this, e.key === "ArrowRight" ? 1 : -1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        items[this._active ?? 0]?.dispatchEvent(
          new CustomEvent("select", { bubbles: true, composed: true })
        );
        break;
    }
  }
}

const MENU_CSS = `
  :host { display: inline-block; }
  [part="trigger"] {
    font: inherit; font-size: var(--pura-text-sm); font-weight: 500;
    line-height: 1; white-space: nowrap; cursor: pointer;
    color: var(--pura-fg); background: transparent;
    border: 1px solid transparent; border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-1) var(--pura-space-3); height: 2rem;
    anchor-name: ANCHOR;
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  [part="trigger"]:hover { background: var(--pura-subtle); }
  [part="trigger"]:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  [part="trigger"][aria-expanded="true"] { background: var(--pura-subtle); }
  [part="trigger"]:disabled { opacity: 0.5; cursor: not-allowed; }

  [part="content"] {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    min-width: 12rem; width: max-content; max-width: min(20rem, 92vw);
    display: flex; flex-direction: column; gap: 1px;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-1);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  [part="content"]:popover-open { opacity: 1; transform: none; }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    :host { position: relative; }
    [part="content"] { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

// ── <pura-menubar> ───────────────────────────────────────────────────────────
class PuraMenubar extends PuraElement {
  connectedCallback() {
    this.render(
      `<div part="bar" role="menubar" aria-orientation="horizontal"><slot></slot></div>`,
      BAR_CSS
    );
    this._bar = this.$('[part="bar"]');

    // Roving tabindex across top-level triggers; only one is in the tab order.
    queueMicrotask(() => this._initRoving());

    this._bar.addEventListener("keydown", (e) => this._onKeydown(e));

    // Close on outside click / blur away from the bar.
    this._onDocPointer = (e) => {
      if (!this.contains(e.target)) this.closeAll();
    };
    document.addEventListener("pointerdown", this._onDocPointer);
  }

  disconnectedCallback() {
    document.removeEventListener("pointerdown", this._onDocPointer);
  }

  get menus() {
    return [...this.querySelectorAll(":scope > pura-menubar-menu")];
  }

  _triggers() {
    return this.menus.map((m) => m.shadowRoot?.querySelector('[part="trigger"]')).filter(Boolean);
  }

  _initRoving() {
    const triggers = this._triggers();
    triggers.forEach((t, i) => {
      t.tabIndex = i === 0 ? 0 : -1;
      t.addEventListener("focus", () => this._setActive(i));
    });
    this._active = 0;
  }

  _setActive(i) {
    const triggers = this._triggers();
    triggers.forEach((t, j) => (t.tabIndex = j === i ? 0 : -1));
    this._active = i;
  }

  _focusTrigger(i) {
    const triggers = this._triggers();
    if (!triggers.length) return;
    const idx = (i + triggers.length) % triggers.length;
    this._setActive(idx);
    triggers[idx].focus();
  }

  hasOpenMenu() {
    return this.menus.some((m) => m.open);
  }

  // Open a menu, closing any sibling first. Preserves keyboard vs pointer focus.
  openMenu(menu, focusFirst) {
    const switching = this.hasOpenMenu();
    this.menus.forEach((m) => { if (m !== menu) m.close(); });
    menu.show(focusFirst);
    // When hover-switching, keep the trigger active in the roving sequence.
    const i = this.menus.indexOf(menu);
    if (i >= 0) this._setActive(i);
    return switching;
  }

  closeAll() {
    this.menus.forEach((m) => m.close());
  }

  // Called by a menu's panel on Left/Right: move to the adjacent menu and,
  // since a menu was already open, open the new one and focus its first item.
  _moveFromOpen(fromMenu, dir) {
    const menus = this.menus;
    const i = menus.indexOf(fromMenu);
    if (i < 0) return;
    const next = menus[(i + dir + menus.length) % menus.length];
    this.openMenu(next, true);
  }

  _onKeydown(e) {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        this._focusTrigger((this._active ?? 0) + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        this._focusTrigger((this._active ?? 0) - 1);
        break;
      case "Home":
        e.preventDefault();
        this._focusTrigger(0);
        break;
      case "End":
        e.preventDefault();
        this._focusTrigger(this.menus.length - 1);
        break;
      case "ArrowDown":
      case "Enter":
      case " ": {
        // Open the focused menu and dive into its items.
        const menu = this.menus[this._active ?? 0];
        if (menu && !menu.hasAttribute("disabled")) {
          e.preventDefault();
          this.openMenu(menu, true);
        }
        break;
      }
    }
  }
}

const BAR_CSS = `
  :host { display: block; }
  [part="bar"] {
    display: flex; align-items: center; gap: var(--pura-space-1);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
    padding: var(--pura-space-1);
  }
`;

define("pura-menu-item", PuraMenuItem);
define("pura-menubar-menu", PuraMenubarMenu);
define("pura-menubar", PuraMenubar, meta);
export { PuraMenubar, PuraMenubarMenu, PuraMenuItem };
