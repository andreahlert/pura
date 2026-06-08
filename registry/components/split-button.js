// <pura-split-button> — a primary action button joined to a caret button that
// opens a dropdown menu of secondary actions. Built on the native Popover API
// (top layer + light dismiss + ESC for free) plus CSS anchor positioning.
// Slots:
//   default      — label of the primary action
//   icon         — optional leading icon for the primary action
//   (menu)       — <pura-menu-item> rows (also pura-menu-separator / -label),
//                  same elements used by <pura-dropdown-menu>.
// Attributes:
//   variant      — primary (default) | secondary | ghost | danger
//   size         — sm | md (default) | lg
//   disabled     — disables both buttons
//   loading      — primary shows a spinner, both buttons inert
//   placement    — bottom (default) | top  (menu side)
//   label        — accessible label for the caret button (default "More actions")
//   open         — reflects menu open state
// Events:
//   click        — fired by the host when the primary action is activated
//   select       — bubbles from a chosen <pura-menu-item>
//   open / close — menu visibility changed
// Agent-native layer: stable data-pura-split-* attributes mirror live state and
//   the instance registers in window.__puraSplitButtons keyed by its data-pura-id.
import { PuraElement, define } from "../base.js";
import meta from "./split-button.meta.js";
import { splitButtonTemplate } from "./split-button.template.js";

let uid = 0;

// Lazily-created global registry so agents can enumerate / read / drive every
// split button on the page without touching internals. Maps data-pura-id -> el.
function registry() {
  return (window.__puraSplitButtons ||= new Map());
}


class PuraSplitButton extends PuraElement {
  static observedAttributes = ["variant", "size", "disabled", "loading", "placement", "label", "open"];

  connectedCallback() {
    this._name = `--pura-split-${uid++}`;
    this._id = this.dataset.puraId || `pura-split-${this._name.replace("--pura-split-", "")}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const label = this.getAttribute("label") || "More actions";

    const { html, css } = splitButtonTemplate(this);
    this.render(html, css);

    this._primary = this.$(".primary");
    this._caret = this.$(".caret");
    this._menu = this.$("[popover]");
    this._slot = this.$("[part='menu'] slot");

    // Primary action: re-emit a host-level 'click' (block when disabled/loading).
    this._primary.addEventListener("click", (e) => {
      if (this._inert()) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return;
      }
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent("click", { bubbles: true, cancelable: true }));
    });

    // Caret toggles the menu.
    this._caret.addEventListener("click", (e) => {
      if (this._inert()) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return;
      }
      this._menu.togglePopover();
    });

    this._menu.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      this.toggleAttribute("open", open);
      this._caret.setAttribute("aria-expanded", open ? "true" : "false");
      this.dataset.puraSplitOpen = open ? "true" : "false";
      if (open) {
        requestAnimationFrame(() => this._focusFirst());
      } else {
        this._caret.focus?.();
      }
      this.dispatchEvent(new CustomEvent(open ? "open" : "close", { bubbles: true }));
    });

    // Item keyboard navigation (items live in light DOM; keydown bubbles to host).
    this.addEventListener("keydown", (e) => this._onKeydown(e));

    // Caret-specific keys to open the menu (ArrowDown / ArrowUp / Enter / Space).
    this._caret.addEventListener("keydown", (e) => {
      if (this._inert()) return;
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key) && !this._menu.matches(":popover-open")) {
        e.preventDefault();
        this._menu.showPopover();
      }
    });

    // Selecting an item closes the menu.
    this.addEventListener("select", () => this._menu.hidePopover());

    this._sync();
    if (this.hasAttribute("open") && !this._inert()) {
      queueMicrotask(() => this._menu.showPopover());
    }
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
  }

  attributeChangedCallback(name) {
    if (!this._primary) return;
    if (name === "label") {
      const label = this.getAttribute("label") || "More actions";
      this._caret.setAttribute("aria-label", label);
      this._menu.setAttribute("aria-label", label);
    }
    if (name === "open") {
      const want = this.hasAttribute("open");
      const isOpen = this._menu.matches(":popover-open");
      if (want && !isOpen && !this._inert()) this._menu.showPopover();
      if (!want && isOpen) this._menu.hidePopover();
    }
    this._sync();
  }

  _inert() {
    return this.hasAttribute("disabled") || this.hasAttribute("loading");
  }

  _sync() {
    const inert = this._inert();
    const loading = this.hasAttribute("loading");
    this._primary.disabled = inert;
    this._caret.disabled = inert;
    this._primary.setAttribute("aria-busy", loading ? "true" : "false");
    // Agent-native mirror of live state.
    this.dataset.puraSplit = "";
    this.dataset.puraSplitDisabled = this.hasAttribute("disabled") ? "true" : "false";
    this.dataset.puraSplitLoading = loading ? "true" : "false";
    this.dataset.puraSplitVariant = this.getAttribute("variant") || "primary";
    if (!("puraSplitOpen" in this.dataset)) this.dataset.puraSplitOpen = "false";
  }

  // Non-disabled menu items currently slotted, in document order.
  _items() {
    if (!this._slot) return [];
    return this._slot
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName === "PURA-MENU-ITEM" && !el.hasAttribute("disabled"));
  }

  _focusFirst() {
    this._items()[0]?.focus?.();
  }

  _focusAt(index) {
    const items = this._items();
    if (!items.length) return;
    const i = (index + items.length) % items.length;
    items[i].focus?.();
  }

  _onKeydown(e) {
    if (!this._menu.matches(":popover-open")) return;
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

  // ---- imperative API ---------------------------------------------------
  show() { if (!this._inert()) this._menu?.showPopover(); }
  hide() { this._menu?.hidePopover(); }
  toggle() { if (!this._inert()) this._menu?.togglePopover(); }
  // Programmatically trigger the primary action.
  press() {
    if (this._inert()) return;
    this.dispatchEvent(new CustomEvent("click", { bubbles: true, cancelable: true }));
  }
}


define("pura-split-button", PuraSplitButton, meta);
export { PuraSplitButton };
