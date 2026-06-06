// <pura-command> — command palette (cmdk-like). A search input at top and a
// scrollable list below. Commands are provided as <pura-command-item> children
// (default slot = label; slot name="shortcut" = trailing hint). Typing in the
// input substring-filters the items (non-matching ones are hidden; an empty
// state shows when nothing matches). Keyboard: ArrowUp/ArrowDown move the active
// item, Enter runs the active item, Esc clears the query (then closes a parent
// <pura-dialog>/<dialog> if any). Standalone — drop it inside a <pura-dialog>
// for a modal command menu.
// Roles: input is role=combobox; list is role=listbox; items are role=option;
// the active item is tracked via aria-activedescendant.
// Attributes: placeholder, empty (empty-state text), value (current query).
// Emits: "command" (bubbles, composed) with detail { value, label } when an
//   item is run; the run item also dispatches its own "select" event.
//
// <pura-command-item> — a single command row (role=option). Default slot =
// label; slot name="shortcut" = trailing muted hint. Attribute: value, disabled.
// Emits: "select" (bubbles, composed) when activated.
import { PuraElement, define } from "../base.js";
import meta from "./command.meta.js";

let uid = 0;

class PuraCommandItem extends PuraElement {
  static observedAttributes = ["disabled"];

  connectedCallback() {
    this.render(
      `<div part="item" class="item">
         <span class="label" part="label"><slot></slot></span>
         <span class="shortcut" part="shortcut"><slot name="shortcut"></slot></span>
       </div>`,
      ITEM_CSS
    );
    this.setAttribute("role", "option");
    if (!this.id) this.id = `pura-cmd-item-${uid++}`;
    this._sync();
    this.addEventListener("click", (e) => this._activate(e));
  }

  attributeChangedCallback() {
    if (this.isConnected) this._sync();
  }

  _sync() {
    this.setAttribute("aria-disabled", this.hasAttribute("disabled") ? "true" : "false");
  }

  // The text used for substring matching: explicit value attr, else label text.
  get matchText() {
    return (this.getAttribute("value") || this.textContent || "").toLowerCase().trim();
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

class PuraCommand extends PuraElement {
  static observedAttributes = ["placeholder", "empty", "value"];

  connectedCallback() {
    this.render(
      `<div part="root" class="root">
         <div part="input-row" class="input-row">
           <svg class="search" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4.3-4.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
           <input part="input" class="input" type="text" role="combobox"
             autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
             aria-expanded="true" aria-autocomplete="list"
             placeholder="${this.getAttribute("placeholder") || "Type a command or search…"}" />
         </div>
         <div part="list" class="list" role="listbox" tabindex="-1">
           <slot></slot>
           <div part="empty" class="empty" role="presentation">${this.getAttribute("empty") || "No results found."}</div>
         </div>
       </div>`,
      CSS
    );

    this._input = this.$(".input");
    this._list = this.$(".list");
    this._empty = this.$(".empty");
    this._slot = this.$("slot");

    const listId = `pura-cmd-list-${uid++}`;
    this._list.id = listId;
    this._input.setAttribute("aria-controls", listId);

    this._active = null;

    this._slot.addEventListener("slotchange", () => this._filter());
    this._input.addEventListener("input", () => {
      this.setAttribute("value", this._input.value);
      this._filter();
    });
    this._input.addEventListener("keydown", (e) => this._onKeydown(e));

    // A selected item (via click or Enter) re-emits as a host "command" event.
    // This is the single source of truth for "command", so both the click path
    // (item fires "select" itself) and the Enter path (we dispatch "select" on
    // the active item) funnel through here exactly once.
    this.addEventListener("select", (e) => {
      const item = e.target.closest && e.target.closest("pura-command-item");
      if (!item || item.hasAttribute("disabled")) return;
      this.dispatchEvent(
        new CustomEvent("command", {
          bubbles: true,
          composed: true,
          detail: {
            value: item.getAttribute("value") || "",
            label: (item.textContent || "").trim(),
          },
        })
      );
    });

    if (this.hasAttribute("value")) this._input.value = this.getAttribute("value");
    this._filter();
  }

  attributeChangedCallback(name, _o, v) {
    if (!this._input) return;
    if (name === "placeholder") this._input.placeholder = v || "Type a command or search…";
    if (name === "empty") this._empty.textContent = v || "No results found.";
    if (name === "value" && this._input.value !== (v || "")) {
      this._input.value = v || "";
      this._filter();
    }
  }

  // All command items (light-DOM children).
  _items() {
    return this._slot
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName === "PURA-COMMAND-ITEM");
  }

  // Items currently visible (matching the query and not disabled).
  _visible() {
    return this._items().filter(
      (el) => !el.hidden && !el.hasAttribute("disabled")
    );
  }

  // Substring-filter against the query; hide non-matching, manage empty state,
  // and reset the active item to the first visible match.
  _filter() {
    const q = (this._input.value || "").toLowerCase().trim();
    let anyVisible = false;
    for (const item of this._items()) {
      const match = !q || item.matchText.includes(q);
      item.hidden = !match;
      if (match) anyVisible = true;
    }
    this._empty.hidden = anyVisible;
    const vis = this._visible();
    this._setActive(vis[0] || null);
  }

  _setActive(item) {
    if (this._active === item) {
      if (item) {
        if (!item.id) item.id = `pura-cmd-item-${uid++}`;
        this._input.setAttribute("aria-activedescendant", item.id);
      }
      return;
    }
    if (this._active) this._active.removeAttribute("aria-selected");
    this._active = item;
    if (item) {
      // Ensure a stable id even if the child has not upgraded yet (tree-order
      // upgrade can run the parent's first _filter() before the item's own
      // connectedCallback assigns its id).
      if (!item.id) item.id = `pura-cmd-item-${uid++}`;
      item.setAttribute("aria-selected", "true");
      this._input.setAttribute("aria-activedescendant", item.id);
      item.scrollIntoView({ block: "nearest" });
    } else {
      this._input.removeAttribute("aria-activedescendant");
    }
  }

  _move(delta) {
    const vis = this._visible();
    if (!vis.length) return;
    const idx = vis.indexOf(this._active);
    const next = idx < 0 ? 0 : (idx + delta + vis.length) % vis.length;
    this._setActive(vis[next]);
  }

  _onKeydown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this._move(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        this._move(-1);
        break;
      case "Home":
        e.preventDefault();
        this._setActive(this._visible()[0] || null);
        break;
      case "End": {
        e.preventDefault();
        const vis = this._visible();
        this._setActive(vis[vis.length - 1] || null);
        break;
      }
      case "Enter":
        if (this._active && !this._active.hasAttribute("disabled")) {
          e.preventDefault();
          // Dispatch the item's "select" just like a click; the host "select"
          // listener turns that into the single "command" event.
          this._active.dispatchEvent(
            new CustomEvent("select", { bubbles: true, composed: true })
          );
        }
        break;
      case "Escape":
        e.preventDefault();
        this._handleEscape();
        break;
    }
  }

  // Esc clears a non-empty query first; if already empty, close a containing
  // <pura-dialog> / native <dialog> when present.
  _handleEscape() {
    if (this._input.value) {
      this.clear();
      return;
    }
    const dialog = this.closest("pura-dialog");
    if (dialog && typeof dialog.close === "function") {
      dialog.close();
      return;
    }
    const native = this.closest("dialog");
    if (native && native.open) native.close();
  }

  // Public API.
  get value() { return this._input?.value ?? ""; }
  set value(v) {
    if (this._input) this._input.value = v || "";
    this.setAttribute("value", v || "");
    this._filter();
  }

  clear() {
    if (!this._input) return;
    this._input.value = "";
    this.removeAttribute("value");
    this._filter();
  }

  focus() { this._input?.focus(); }
}

const ITEM_CSS = `
  :host { display: block; }
  :host([hidden]) { display: none !important; }
  .item {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-2) var(--pura-space-3);
    font-size: var(--pura-text-sm); color: var(--pura-fg);
    border-radius: var(--pura-radius-sm); cursor: pointer;
    user-select: none; outline: none;
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  .label { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .shortcut {
    margin-left: auto; padding-left: var(--pura-space-4);
    font-size: var(--pura-text-xs); color: var(--pura-muted);
    letter-spacing: 0.04em; white-space: nowrap;
  }
  :host(:hover:not([disabled])) .item { background: var(--pura-subtle); }
  :host([aria-selected="true"]:not([disabled])) .item {
    background: var(--pura-subtle); color: var(--pura-fg);
  }
  :host([aria-selected="true"]:not([disabled])) .shortcut { color: var(--pura-muted-fg); }

  :host([disabled]) .item { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
`;

const CSS = `
  :host { display: block; }
  .root {
    display: flex; flex-direction: column;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
    box-shadow: var(--pura-shadow);
    overflow: hidden;
    max-height: 100%;
  }
  /* dropped straight into a <pura-dialog> body we let the dialog frame it */
  :host([flush]) .root { border: none; box-shadow: none; border-radius: 0; }

  .input-row {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: 0 var(--pura-space-3);
    border-bottom: 1px solid var(--pura-border);
  }
  .search {
    width: 1rem; height: 1rem; flex: none; color: var(--pura-muted);
  }
  .input {
    flex: 1; min-width: 0;
    font: inherit; font-size: var(--pura-text-sm); color: var(--pura-fg);
    background: transparent; border: none; outline: none;
    height: 2.75rem; padding: 0;
  }
  .input::placeholder { color: var(--pura-muted); }

  .list {
    overflow-y: auto; overscroll-behavior: contain;
    max-height: 20rem; padding: var(--pura-space-2);
    display: flex; flex-direction: column; gap: 1px;
  }

  .empty {
    padding: var(--pura-space-5) var(--pura-space-3);
    text-align: center;
    font-size: var(--pura-text-sm); color: var(--pura-muted);
  }
  .empty[hidden] { display: none; }
`;

define("pura-command-item", PuraCommandItem);
define("pura-command", PuraCommand, meta);
export { PuraCommand, PuraCommandItem };
