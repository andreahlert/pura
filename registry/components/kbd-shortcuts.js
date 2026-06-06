// <pura-kbd-shortcuts> — keyboard shortcuts help. Opens a modal (native
// <dialog> showModal) that lists keyboard shortcuts grouped by section. Each
// shortcut is declared as a light-DOM <pura-shortcut> child; the keys are
// rendered as pura-kbd-like chips.
//
// Attributes (pura-kbd-shortcuts):
//   title    heading shown in the dialog header (default "Keyboard shortcuts")
//   key      a key combo that, when pressed anywhere on the document, opens the
//            help (e.g. key="?" or key="⌘ /" / key="Meta+/"). Empty = no binding.
//   open     reflects the open state; presence opens the dialog.
// Slots:
//   default  one or more <pura-shortcut> elements (the source of truth).
//   header   optional custom heading content (overrides `title`).
//   footer   optional footer content.
// API:
//   .open()  / .close() / .toggle()    open / close the dialog
//   .shortcuts  -> [{ keys, label, section, id }]  (read-only snapshot)
// Events:
//   open / close   bubbling CustomEvents fired when the dialog toggles.
//
// <pura-shortcut> — a single shortcut row (no UI of its own; data carrier).
//   Attributes: keys (space-separated key tokens, e.g. "⌘ K" or "Ctrl Shift P"),
//   label (human description), section (group heading, default "General").
//
// Agent-native: every <pura-kbd-shortcuts> instance registers itself in the
// global window.__puraKbdShortcuts registry keyed by a stable id, exposing
// { el, open, close, getShortcuts }. The host carries data-pura-kbd-shortcuts
// (id), data-count and data-key so an agent can discover, inspect and trigger
// the help without reaching into the shadow DOM. The dialog body is a
// role="list"; each shortcut row is role="listitem" with an aria-label that
// reads "<label>: <keys>". The launch key binding is exposed via data-key.
import { PuraElement, define } from "../base.js";
import meta from "./kbd-shortcuts.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "kbd-shortcuts.title": {
    en: "Keyboard shortcuts",
    "pt-BR": "Atalhos de teclado",
    fr: "Raccourcis clavier",
    de: "Tastenkürzel",
    it: "Scorciatoie da tastiera",
  },
  "kbd-shortcuts.close": {
    en: "Close",
    "pt-BR": "Fechar",
    fr: "Fermer",
    de: "Schließen",
    it: "Chiudi",
  },
  "kbd-shortcuts.empty": {
    en: "No shortcuts defined.",
    "pt-BR": "Nenhum atalho definido.",
    fr: "Aucun raccourci défini.",
    de: "Keine Tastenkürzel definiert.",
    it: "Nessuna scorciatoia definita.",
  },
});

let uid = 0;

// Global machine-readable registry so agents can discover and drive every
// shortcuts panel on the page without touching shadow roots.
const REGISTRY = (window.__puraKbdShortcuts ||= new Map());

class PuraShortcut extends PuraElement {
  static observedAttributes = ["keys", "label", "section"];

  connectedCallback() {
    // Pure data carrier: keep it out of the layout, expose its values as data-*.
    this.setAttribute("role", "listitem");
    this._reflect();
    // Notify the nearest panel that the shortcut set changed.
    this._notify();
  }

  attributeChangedCallback() {
    if (!this.isConnected) return;
    this._reflect();
    this._notify();
  }

  disconnectedCallback() {
    this._notify();
  }

  _reflect() {
    this.setAttribute("data-keys", this.getAttribute("keys") || "");
    this.setAttribute("data-label", this.getAttribute("label") || "");
    this.setAttribute("data-section", this.getAttribute("section") || "General");
  }

  _notify() {
    const panel = this.closest("pura-kbd-shortcuts");
    if (panel && typeof panel._sync === "function") panel._sync();
  }

  // Parsed view used by the panel.
  get info() {
    return {
      keys: (this.getAttribute("keys") || "").trim(),
      label: (this.getAttribute("label") || "").trim(),
      section: (this.getAttribute("section") || "General").trim() || "General",
    };
  }
}

class PuraKbdShortcuts extends PuraElement {
  static observedAttributes = ["open", "title", "key"];

  connectedCallback() {
    this._id = `pura-kbd-shortcuts-${uid++}`;
    this.setAttribute("data-pura-kbd-shortcuts", this._id);

    this.render(
      `<dialog part="dialog" aria-label="${this._esc(this._title())}">
         <header part="header">
           <span class="title"><slot name="header">${this._esc(this._title())}</slot></span>
           <button class="x" part="close" type="button" aria-label="${this._esc(t("kbd-shortcuts.close"))}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
           </button>
         </header>
         <div class="body" part="body" role="list"></div>
         <footer part="footer"><slot name="footer"></slot></footer>
       </dialog>
       <slot hidden></slot>`,
      CSS
    );

    this._dlg = this.$("dialog");
    this._body = this.$(".body");
    this._titleEl = this.$(".title");

    this.$(".x").addEventListener("click", () => this.close());
    this._dlg.addEventListener("click", (e) => {
      if (e.target === this._dlg) this.close();
    });
    this._dlg.addEventListener("close", () => {
      this.removeAttribute("open");
      this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
    });

    // Hide the footer when there's nothing slotted into it.
    const footSlot = this.$('slot[name="footer"]');
    const foot = this.$("footer");
    const updFoot = () =>
      (foot.style.display = footSlot.assignedNodes().length ? "" : "none");
    footSlot.addEventListener("slotchange", updFoot);
    updFoot();

    // Re-render the list whenever <pura-shortcut> children change.
    const defSlot = this.$("slot:not([name])");
    defSlot.addEventListener("slotchange", () => this._sync());

    // Document-level key binding (e.g. "?" or "⌘ /").
    this._combo = this._parseCombo(this.getAttribute("key"));
    this._onKey = (e) => this._maybeOpen(e);
    document.addEventListener("keydown", this._onKey);

    REGISTRY.set(this._id, {
      el: this,
      open: () => this.open(),
      close: () => this.close(),
      toggle: () => this.toggle(),
      getShortcuts: () => this.shortcuts,
    });

    this._sync();
    if (this.hasAttribute("open")) this.open();

    // React to locale changes by patching the already-rendered text in place.
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this._onKey);
    REGISTRY.delete(this._id);
    this._i18nOff?.();
  }

  // Update only the i18n-driven nodes in place (no re-render, no new listeners).
  _applyI18n() {
    if (!this._dlg) return;
    // Close button aria-label.
    const x = this.$(".x");
    if (x) x.setAttribute("aria-label", t("kbd-shortcuts.close"));
    // Dialog aria-label + heading reflect the (possibly default) title.
    const title = this._title();
    this._dlg.setAttribute("aria-label", title);
    const hdr = this.$('slot[name="header"]');
    if (hdr && hdr.assignedNodes().length === 0) this._titleEl.textContent = title;
    // Refresh the body so the empty-state message follows the locale.
    this._sync();
  }

  attributeChangedCallback(name, _old, value) {
    if (!this._dlg) return;
    if (name === "open") {
      if (value !== null && !this._dlg.open) this._dlg.showModal();
      if (value === null && this._dlg.open) this._dlg.close();
    } else if (name === "title") {
      const t = this._title();
      this._dlg.setAttribute("aria-label", t);
      // Only mirror into the heading when nothing is slotted there.
      const hdr = this.$('slot[name="header"]');
      if (hdr && hdr.assignedNodes().length === 0) this._titleEl.textContent = t;
    } else if (name === "key") {
      this._combo = this._parseCombo(value);
      this.setAttribute("data-key", value || "");
    }
  }

  // ----- public API -----
  open() {
    this.setAttribute("open", "");
  }
  close() {
    this.removeAttribute("open");
  }
  toggle() {
    this.hasAttribute("open") ? this.close() : this.open();
  }

  // Read-only snapshot of the declared shortcuts.
  get shortcuts() {
    return this._items().map((el, i) => {
      const info = el.info;
      return { ...info, id: `${this._id}-row-${i}` };
    });
  }

  // ----- internals -----
  _items() {
    return [...this.querySelectorAll(":scope > pura-shortcut")];
  }

  _title() {
    return this.getAttribute("title") || t("kbd-shortcuts.title");
  }

  // Rebuild the grouped list from the light-DOM <pura-shortcut> children and
  // refresh the machine-readable data-* attributes.
  _sync() {
    if (!this._body) return;
    const rows = this.shortcuts;

    this.setAttribute("data-count", String(rows.length));
    this.setAttribute("data-key", this.getAttribute("key") || "");

    // Group by section, preserving first-seen order.
    const order = [];
    const groups = new Map();
    for (const row of rows) {
      const sec = row.section || "General";
      if (!groups.has(sec)) {
        groups.set(sec, []);
        order.push(sec);
      }
      groups.get(sec).push(row);
    }

    if (rows.length === 0) {
      this._body.innerHTML = `<p class="empty" part="empty">${this._esc(t("kbd-shortcuts.empty"))}</p>`;
      return;
    }

    let html = "";
    for (const sec of order) {
      html += `<section class="group" part="group">
        <h3 class="group-title" part="group-title">${this._esc(sec)}</h3>
        <ul class="rows" role="presentation">`;
      for (const row of groups.get(sec)) {
        const chips = this._chips(row.keys);
        const aria = this._esc(
          row.label ? `${row.label}: ${row.keys}` : row.keys
        );
        html += `<li class="row" part="row" role="listitem" aria-label="${aria}"
            data-keys="${this._esc(row.keys)}" data-label="${this._esc(row.label)}">
          <span class="row-label" part="row-label">${this._esc(row.label)}</span>
          <span class="keys" part="keys">${chips}</span>
        </li>`;
      }
      html += `</ul></section>`;
    }
    this._body.innerHTML = html;
  }

  // Render a "⌘ K" / "Ctrl Shift P" string into pura-kbd-like chips, joined by
  // a thin "+" separator.
  _chips(keys) {
    const tokens = (keys || "").split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return "";
    return tokens
      .map(
        (t) =>
          `<kbd class="kbd" part="kbd">${this._esc(t)}</kbd>`
      )
      .join(`<span class="plus" aria-hidden="true">+</span>`);
  }

  // ----- key binding -----
  // Parse "key" attribute into a normalized combo descriptor.
  // Accepts symbol tokens (⌘ ⌥ ⌃ ⇧), names (Meta Cmd Alt Ctrl Control Shift)
  // and a final printable key. Tokens may be space- or "+"-separated.
  _parseCombo(raw) {
    if (!raw) return null;
    const tokens = raw.split(/[\s+]+/).filter(Boolean);
    const combo = { meta: false, ctrl: false, alt: false, shift: false, key: null };
    for (const tok of tokens) {
      const t = tok.toLowerCase();
      if (tok === "⌘" || t === "meta" || t === "cmd" || t === "command") combo.meta = true;
      else if (tok === "⌃" || t === "ctrl" || t === "control") combo.ctrl = true;
      else if (tok === "⌥" || t === "alt" || t === "option" || t === "opt") combo.alt = true;
      else if (tok === "⇧" || t === "shift") combo.shift = true;
      else combo.key = tok.length === 1 ? tok.toLowerCase() : t;
    }
    return combo.key ? combo : null;
  }

  _maybeOpen(e) {
    const c = this._combo;
    if (!c) return;
    // Don't hijack keys while the user is typing into a field.
    const t = e.target;
    if (t && (t.isContentEditable ||
        /^(input|textarea|select)$/i.test(t.tagName || ""))) return;
    if (c.meta !== e.metaKey) return;
    if (c.ctrl !== e.ctrlKey) return;
    if (c.alt !== e.altKey) return;
    // Shift is implied for symbols like "?"; only enforce when no printable
    // shift-producing key is requested.
    if (c.shift && !e.shiftKey) return;
    const pressed = (e.key || "").toLowerCase();
    if (pressed !== c.key) return;
    e.preventDefault();
    this.toggle();
  }

  _esc(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
}

const CSS = `
  :host { display: contents; }

  dialog {
    padding: 0; border: 1px solid var(--pura-border); color: var(--pura-fg);
    border-radius: var(--pura-radius-lg); background: var(--pura-bg);
    box-shadow: var(--pura-shadow-lg); width: min(34rem, calc(100vw - 2rem));
    max-height: min(80dvh, 44rem); display: flex; flex-direction: column;
    opacity: 0; transform: translateY(8px) scale(0.98);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  dialog[open] { opacity: 1; transform: none; }
  dialog::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px); }

  header { display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); padding: var(--pura-space-5) var(--pura-space-5) var(--pura-space-3); }
  .title { font-size: var(--pura-text-lg); font-weight: 600; }
  .x { display: grid; place-items: center; width: 1.75rem; height: 1.75rem;
    border: none; background: transparent; color: var(--pura-muted); cursor: pointer;
    border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur); }
  .x:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .x:focus-visible { outline: 2px solid var(--pura-ring); outline-offset: 2px; }
  .x svg { width: 1.1rem; height: 1.1rem; }

  .body { padding: 0 var(--pura-space-5) var(--pura-space-5); overflow: auto; flex: 1;
    display: flex; flex-direction: column; gap: var(--pura-space-5); }
  .empty { color: var(--pura-muted); font-size: var(--pura-text-sm); margin: 0;
    padding: var(--pura-space-4) 0; }

  .group { display: flex; flex-direction: column; gap: var(--pura-space-2); }
  .group-title { margin: 0; font-size: var(--pura-text-xs); font-weight: 600;
    letter-spacing: 0.04em; text-transform: uppercase; color: var(--pura-muted); }
  .rows { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }

  .row { display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-4); padding: var(--pura-space-2) 0;
    border-bottom: 1px solid var(--pura-border); }
  .row:last-child { border-bottom: none; }
  .row-label { font-size: var(--pura-text-sm); color: var(--pura-fg); }
  .keys { display: inline-flex; align-items: center; gap: var(--pura-space-1);
    flex-shrink: 0; white-space: nowrap; }

  .kbd {
    display: inline-flex; align-items: center; justify-content: center;
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-xs); font-weight: 500; line-height: 1;
    white-space: nowrap; min-width: 1.25em; height: 1.25rem;
    padding: 0 var(--pura-space-2);
    color: var(--pura-muted-fg); background: var(--pura-subtle);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm);
  }
  .plus { color: var(--pura-muted); font-size: var(--pura-text-xs); }

  footer { display: flex; justify-content: flex-end; gap: var(--pura-space-2);
    padding: var(--pura-space-4) var(--pura-space-5); border-top: 1px solid var(--pura-border);
    background: var(--pura-subtle); }
`;

// <pura-shortcut> is a headless data carrier; it has no shadow rendering and
// stays out of the visual flow.
const SHORTCUT_CSS = `:host { display: none; }`;
// Apply the hiding style via a minimal connected render so it never shows.
class PuraShortcutEl extends PuraShortcut {
  connectedCallback() {
    if (!this.shadowRoot.querySelector("style")) {
      this.render("", SHORTCUT_CSS);
    }
    super.connectedCallback();
  }
}

define("pura-shortcut", PuraShortcutEl);
define("pura-kbd-shortcuts", PuraKbdShortcuts, meta);
export { PuraKbdShortcuts, PuraShortcutEl as PuraShortcut };
