// <pura-dropdown-menu> — dropdown menu built on the native Popover API (top
// layer + light dismiss + ESC for free) plus CSS anchor positioning.
// Slots: trigger (the clickable), default slot = menu items.
// Attributes: open. Sub-elements: <pura-menu-item> (slot=label default, optional
// slot name='icon', optional slot name='shortcut', attr disabled; emits
// CustomEvent('select',{bubbles:true})), <pura-menu-separator>, <pura-menu-label>.
import { PuraElement, define } from "../base.js";

let uid = 0;

class PuraDropdownMenu extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    this._name = `--pura-menu-${uid++}`;
    this.render(
      `<span class="anchor" part="trigger"><slot name="trigger"></slot></span>
       <div part="menu" role="menu" popover="auto"><slot></slot></div>`,
      CSS.replaceAll("ANCHOR", this._name)
    );
    this._trigger = this.$(".anchor");
    this._menu = this.$("[popover]");
    this._slot = this.$("[part='menu'] slot");

    this._trigger.addEventListener("click", () => this._menu.togglePopover());

    this._menu.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      this.toggleAttribute("open", open);
      this._setTriggerExpanded(open);
      if (open) {
        // panel must be visible before focusing; defer one frame
        requestAnimationFrame(() => this._focusFirst());
      } else {
        // return focus to the trigger (covers ESC + outside dismiss)
        this._focusTrigger();
      }
      this.dispatchEvent(
        new CustomEvent(open ? "open" : "close", { bubbles: true })
      );
    });

    // Focused items live in light DOM, so keydown bubbles up to the host.
    this.addEventListener("keydown", (e) => this._onKeydown(e));

    // Selecting an item (click/Enter/Space) closes the menu.
    this.addEventListener("select", () => this._menu.hidePopover());

    this._setTriggerExpanded(false);
    if (this.hasAttribute("open")) queueMicrotask(() => this._menu.showPopover());
  }

  // All non-disabled menu items currently slotted, in document order.
  _items() {
    return this._slot
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName === "PURA-MENU-ITEM" && !el.hasAttribute("disabled"));
  }

  _setTriggerExpanded(open) {
    const t = this.$("slot[name='trigger']").assignedElements({ flatten: true })[0];
    if (!t) return;
    t.setAttribute("aria-haspopup", "menu");
    t.setAttribute("aria-expanded", open ? "true" : "false");
  }

  _focusTrigger() {
    const t = this.$("slot[name='trigger']").assignedElements({ flatten: true })[0];
    t?.focus?.();
  }

  _focusFirst() {
    this._items()[0]?.focus();
  }

  _focusAt(index) {
    const items = this._items();
    if (!items.length) return;
    const i = (index + items.length) % items.length;
    items[i].focus();
  }

  _onKeydown(e) {
    if (this._menu.matches(":popover-open") === false) return;
    const items = this._items();
    if (!items.length) return;
    const current = items.indexOf(document.activeElement);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this._focusAt(current < 0 ? 0 : current + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        this._focusAt(current < 0 ? items.length - 1 : current - 1);
        break;
      case "Home":
        e.preventDefault();
        this._focusAt(0);
        break;
      case "End":
        e.preventDefault();
        this._focusAt(items.length - 1);
        break;
      case "Enter":
      case " ":
        if (current >= 0) {
          e.preventDefault();
          items[current].click();
        }
        break;
    }
  }

  show() { this._menu?.showPopover(); }
  hide() { this._menu?.hidePopover(); }
}

const CSS = `
  :host { display: inline-block; }
  .anchor { anchor-name: ANCHOR; display: inline-flex; }
  [part="menu"] {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    min-width: max(anchor-size(width), 12rem); width: max-content; max-width: min(20rem, 92vw);
    display: flex; flex-direction: column; gap: 1px;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-1);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  [part="menu"]:popover-open { opacity: 1; transform: none; }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    :host { position: relative; }
    [part="menu"] { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

define("pura-dropdown-menu", PuraDropdownMenu);

// ---------------------------------------------------------------------------
// <pura-menu-item> — a single selectable row. Slots: default = label, optional
// name='icon', optional name='shortcut'. Attr: disabled. Emits 'select'.
class PuraMenuItem extends PuraElement {
  static observedAttributes = ["disabled"];

  connectedCallback() {
    this.render(
      `<span class="icon" part="icon"><slot name="icon"></slot></span>
       <span class="label" part="label"><slot></slot></span>
       <span class="shortcut" part="shortcut"><slot name="shortcut"></slot></span>`,
      ITEM_CSS
    );
    this.setAttribute("role", "menuitem");
    this._sync();

    this.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled")) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return;
      }
      this.dispatchEvent(new CustomEvent("select", { bubbles: true }));
    });
  }

  attributeChangedCallback() {
    this._sync();
  }

  _sync() {
    const disabled = this.hasAttribute("disabled");
    this.setAttribute("aria-disabled", disabled ? "true" : "false");
    this.setAttribute("tabindex", "-1");
  }
}

const ITEM_CSS = `
  :host {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-2) var(--pura-space-2);
    border-radius: var(--pura-radius-sm); cursor: pointer;
    color: var(--pura-fg); font-size: var(--pura-text-sm); line-height: 1.2;
    user-select: none; outline: none;
    transition: background var(--pura-dur) var(--pura-ease);
  }
  :host(:hover), :host(:focus-visible), :host(:focus) { background: var(--pura-subtle); }
  :host(:focus-visible) { box-shadow: inset 0 0 0 1px var(--pura-border-strong); }
  :host([disabled]) { color: var(--pura-muted); cursor: not-allowed; pointer-events: none; opacity: 0.6; }
  .icon { display: inline-flex; align-items: center; justify-content: center; width: 1rem; height: 1rem; flex: none; color: var(--pura-muted-fg); }
  .icon:empty { display: none; }
  .label { flex: 1; min-width: 0; }
  .shortcut { margin-left: auto; padding-left: var(--pura-space-4); color: var(--pura-muted); font-size: var(--pura-text-xs); letter-spacing: 0.05em; }
  .shortcut:empty { display: none; }
`;

define("pura-menu-item", PuraMenuItem);

// ---------------------------------------------------------------------------
// <pura-menu-separator> — a divider rule between menu groups.
class PuraMenuSeparator extends PuraElement {
  connectedCallback() {
    this.render(`<div part="separator" role="separator"></div>`, SEP_CSS);
  }
}

const SEP_CSS = `
  :host { display: block; }
  [part="separator"] {
    height: 1px; width: auto; background: var(--pura-border);
    margin: var(--pura-space-1) calc(var(--pura-space-1) * -1);
  }
`;

define("pura-menu-separator", PuraMenuSeparator);

// ---------------------------------------------------------------------------
// <pura-menu-label> — a non-interactive section heading. Slot: default = text.
class PuraMenuLabel extends PuraElement {
  connectedCallback() {
    this.render(`<div part="label" role="presentation"><slot></slot></div>`, LABEL_CSS);
  }
}

const LABEL_CSS = `
  :host { display: block; }
  [part="label"] {
    padding: var(--pura-space-2) var(--pura-space-2);
    font-size: var(--pura-text-xs); font-weight: 600;
    color: var(--pura-muted); letter-spacing: 0.02em;
  }
`;

define("pura-menu-label", PuraMenuLabel);

export { PuraDropdownMenu, PuraMenuItem, PuraMenuSeparator, PuraMenuLabel };
