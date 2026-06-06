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

let uid = 0;

// Lazily-created global registry so agents can enumerate / read / drive every
// split button on the page without touching internals. Maps data-pura-id -> el.
function registry() {
  return (window.__puraSplitButtons ||= new Map());
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

class PuraSplitButton extends PuraElement {
  static observedAttributes = ["variant", "size", "disabled", "loading", "placement", "label", "open"];

  connectedCallback() {
    this._name = `--pura-split-${uid++}`;
    this._id = this.dataset.puraId || `pura-split-${this._name.replace("--pura-split-", "")}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    const label = this.getAttribute("label") || "More actions";

    this.render(
      `<div class="group" part="group" role="group">
         <button class="primary" part="primary" type="button">
           <span class="spin" part="spinner" aria-hidden="true"></span>
           <span class="icon" part="icon"><slot name="icon"></slot></span>
           <span class="label"><slot></slot></span>
         </button>
         <span class="anchor" part="trigger-wrap">
           <button class="caret" part="trigger" type="button"
                   aria-haspopup="menu" aria-expanded="false" aria-label="${esc(label)}">
             <svg viewBox="0 0 24 24" aria-hidden="true">
               <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
           </button>
         </span>
         <div class="menu" part="menu" role="menu" popover="auto" aria-label="${esc(label)}"><slot name="menu"></slot></div>
       </div>`,
      CSS.replaceAll("ANCHOR", this._name)
    );

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

const CSS = `
  :host { display: inline-block; }
  :host([full]) { display: block; }

  .group { display: inline-flex; align-items: stretch; }
  :host([full]) .group { display: flex; }
  :host([full]) .primary { flex: 1; }

  button {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--pura-space-2);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; white-space: nowrap; cursor: pointer;
    border: 1px solid transparent; height: 2.25rem;
    background: var(--pura-primary); color: var(--pura-primary-fg);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      filter var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  button:hover { background: var(--pura-primary-hover); }
  button:active { transform: translateY(0.5px) scale(0.99); }
  button:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); z-index: 1; position: relative; }
  button:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  .primary { padding: 0 var(--pura-space-4); border-radius: var(--pura-radius) 0 0 var(--pura-radius); }
  .anchor { anchor-name: ANCHOR; display: inline-flex; }
  .caret {
    padding: 0 var(--pura-space-2); border-radius: 0 var(--pura-radius) var(--pura-radius) 0;
    border-left: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  }
  .caret svg { width: 1rem; height: 1rem; }

  .icon { display: inline-flex; align-items: center; justify-content: center; }
  .icon:empty { display: none; }

  /* sizes */
  :host([size="sm"]) button { height: 1.875rem; font-size: var(--pura-text-xs); }
  :host([size="sm"]) .primary { padding: 0 var(--pura-space-3); }
  :host([size="lg"]) button { height: 2.75rem; font-size: var(--pura-text-base); }
  :host([size="lg"]) .primary { padding: 0 var(--pura-space-5); }
  :host([size="lg"]) .caret { padding: 0 var(--pura-space-3); }

  /* variants */
  :host([variant="secondary"]) button {
    background: var(--pura-bg); color: var(--pura-fg);
    border-color: var(--pura-border-strong); box-shadow: var(--pura-shadow-sm);
  }
  :host([variant="secondary"]) .caret { border-left-color: var(--pura-border-strong); }
  :host([variant="secondary"]) button:hover { background: var(--pura-subtle); }

  :host([variant="ghost"]) button { background: transparent; color: var(--pura-fg); }
  :host([variant="ghost"]) button:hover { background: var(--pura-subtle); }

  :host([variant="danger"]) button { background: var(--pura-danger-solid); color: #fff; }
  :host([variant="danger"]) button:hover { filter: brightness(0.94); }

  /* loading spinner */
  .spin { display: none; width: 0.9em; height: 0.9em; border-radius: 50%;
    border: 2px solid currentColor; border-right-color: transparent;
    animation: pura-spin 0.6s linear infinite; }
  :host([loading]) .primary .spin { display: inline-block; }
  :host([loading]) .primary .icon { display: none; }
  @keyframes pura-spin { to { transform: rotate(360deg); } }

  /* dropdown menu panel */
  [part="menu"] {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); right: anchor(right); left: auto; margin-top: var(--pura-space-2);
    min-width: max(anchor-size(width), 10rem); width: max-content; max-width: min(20rem, 92vw);
    display: flex; flex-direction: column; gap: 1px;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-1);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  [part="menu"]:popover-open { opacity: 1; transform: none; }

  :host([placement="top"]) [part="menu"] {
    top: auto; bottom: anchor(top); margin: 0 0 var(--pura-space-2); transform: translateY(4px);
  }
  :host([placement="top"]) [part="menu"]:popover-open { transform: none; }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    .anchor { position: relative; }
    [part="menu"] { position: absolute; top: 100%; right: 0; left: auto; inset: auto; }
  }
`;

define("pura-split-button", PuraSplitButton, meta);
export { PuraSplitButton };
