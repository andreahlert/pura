// <pura-transfer> - dual-list transfer (shuttle). Two panels (source / target)
// with checkboxes and middle controls to move selected items between them.
//
// Source items: attribute `items` (JSON array of {key,label} or strings) or
// slotted light-DOM <option value="k">Label</option> children.
// Selection: attribute `value` (JSON array) or `.value` property = array of keys
// currently in the target panel.
// Attributes: items, value, searchable.
// Events:
//   change { keys } - fired (bubbles) whenever the target set changes.
// Parts: panel, item, controls, search.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "transfer.source": { en: "Source", "pt-BR": "Origem", fr: "Source", de: "Quelle", it: "Origine" },
  "transfer.target": { en: "Target", "pt-BR": "Destino", fr: "Cible", de: "Ziel", it: "Destinazione" },
  "transfer.search": { en: "Search", "pt-BR": "Buscar", fr: "Rechercher", de: "Suchen", it: "Cerca" },
});

class PuraTransfer extends PuraElement {
  static observedAttributes = ["items", "value", "searchable"];

  connectedCallback() {
    this._items = this._readItems();
    this._target = new Set(this._readValue());
    this._checked = new Set();      // checked item keys (either panel)
    this._query = { source: "", target: "" };

    const searchable = this.hasAttribute("searchable");
    this.render(
      `<div class="wrap">
         ${this._panelChrome("source", searchable)}
         <div part="controls" class="controls">
           <button class="ctl" data-act="all-right" type="button" aria-label="Move all right">&raquo;</button>
           <button class="ctl" data-act="right" type="button" aria-label="Move right">&rsaquo;</button>
           <button class="ctl" data-act="left" type="button" aria-label="Move left">&lsaquo;</button>
           <button class="ctl" data-act="all-left" type="button" aria-label="Move all left">&laquo;</button>
         </div>
         ${this._panelChrome("target", searchable)}
       </div>`,
      CSS
    );

    this._sourceList = this.$('[data-list="source"]');
    this._targetList = this.$('[data-list="target"]');

    // Move controls.
    this.$(".controls").addEventListener("click", (e) => {
      const act = e.target.closest(".ctl")?.dataset.act;
      if (act) this._move(act);
    });

    // Checkbox toggles (delegated per list).
    this._sourceList.addEventListener("change", (e) => this._onCheck(e));
    this._targetList.addEventListener("change", (e) => this._onCheck(e));

    // Search inputs (rebuild only list bodies, never the chrome).
    for (const side of ["source", "target"]) {
      const input = this.$(`[data-search="${side}"]`);
      if (input) input.addEventListener("input", () => {
        this._query[side] = input.value;
        this._renderList(side);
      });
    }

    this._i18nOff = onLocaleChange(() => this._applyI18n());
    this._renderList("source");
    this._renderList("target");
  }

  disconnectedCallback() { this._i18nOff?.(); }

  attributeChangedCallback(name, _old, val) {
    if (!this._sourceList) return;
    if (name === "value") {
      this._target = new Set(this._readValue());
      this._renderList("source");
      this._renderList("target");
    }
    if (name === "items") {
      this._items = this._readItems();
      this._renderList("source");
      this._renderList("target");
    }
  }

  // ---- public API ---------------------------------------------------------
  get value() { return [...this._target]; }
  set value(keys) {
    this._target = new Set(Array.isArray(keys) ? keys : []);
    if (this._sourceList) { this._renderList("source"); this._renderList("target"); }
  }

  // ---- data ---------------------------------------------------------------
  _readItems() {
    const raw = this.getAttribute("items");
    if (raw) {
      try { return this._normalize(JSON.parse(raw)); } catch (_) { /* fall through */ }
    }
    const opts = [...this.querySelectorAll("option")];
    if (opts.length) {
      return opts.map((o) => ({
        key: o.getAttribute("value") ?? o.textContent.trim(),
        label: o.textContent.trim(),
      }));
    }
    return [];
  }
  _normalize(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map((o) =>
      typeof o === "string" ? { key: o, label: o } : { key: o.key ?? o.label, label: o.label ?? String(o.key) }
    );
  }
  _readValue() {
    const raw = this.getAttribute("value");
    if (!raw) return [];
    try { const v = JSON.parse(raw); return Array.isArray(v) ? v : []; } catch (_) { return []; }
  }

  // ---- chrome (rendered once) ---------------------------------------------
  _panelChrome(side, searchable) {
    const titleKey = side === "source" ? "transfer.source" : "transfer.target";
    return `<div part="panel" class="panel" data-panel="${side}">
      <div class="title" data-title="${side}">${t(titleKey)}</div>
      ${searchable ? `<input part="search" class="search" data-search="${side}"
        type="text" placeholder="${esc(t("transfer.search"))}" />` : ""}
      <ul class="list" data-list="${side}" role="listbox" aria-multiselectable="true"></ul>
    </div>`;
  }

  // ---- list bodies (rebuilt on move/search) -------------------------------
  _itemsFor(side) {
    const inTarget = side === "target";
    const q = this._query[side].trim().toLowerCase();
    return this._items
      .filter((it) => this._target.has(it.key) === inTarget)
      .filter((it) => !q || it.label.toLowerCase().includes(q));
  }

  _renderList(side) {
    const list = side === "source" ? this._sourceList : this._targetList;
    if (!list) return;
    const items = this._itemsFor(side);
    list.innerHTML = items.map((it) => {
      const checked = this._checked.has(it.key) ? "checked" : "";
      return `<li part="item" class="item" role="option">
        <label>
          <input type="checkbox" data-key="${esc(it.key)}" ${checked} />
          <span class="item-label">${esc(it.label)}</span>
        </label>
      </li>`;
    }).join("");
  }

  _onCheck(e) {
    const cb = e.target.closest('input[type="checkbox"]');
    if (!cb) return;
    const key = cb.dataset.key;
    if (cb.checked) this._checked.add(key); else this._checked.delete(key);
  }

  _move(act) {
    const keysIn = (side) => new Set(this._itemsFor(side).map((it) => it.key));

    if (act === "right" || act === "all-right") {
      const pool = keysIn("source");
      const moving = act === "all-right" ? pool : new Set([...this._checked].filter((k) => pool.has(k)));
      for (const k of moving) this._target.add(k);
    } else if (act === "left" || act === "all-left") {
      const pool = keysIn("target");
      const moving = act === "all-left" ? pool : new Set([...this._checked].filter((k) => pool.has(k)));
      for (const k of moving) this._target.delete(k);
    }

    this._checked.clear();
    this.setAttribute("value", JSON.stringify([...this._target]));
    this._renderList("source");
    this._renderList("target");
    this.dispatchEvent(new CustomEvent("change", { detail: { keys: [...this._target] }, bubbles: true }));
  }

  _applyI18n() {
    const s = this.$('[data-title="source"]');
    const tg = this.$('[data-title="target"]');
    if (s) s.textContent = t("transfer.source");
    if (tg) tg.textContent = t("transfer.target");
    for (const side of ["source", "target"]) {
      const inp = this.$(`[data-search="${side}"]`);
      if (inp) inp.placeholder = t("transfer.search");
    }
  }
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const CSS = `
  :host { display: block; }
  .wrap {
    display: grid; grid-template-columns: 1fr auto 1fr; gap: var(--pura-space-3);
    align-items: stretch;
  }

  .panel {
    display: flex; flex-direction: column; min-width: 0;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    background: var(--pura-bg); overflow: hidden;
  }
  .title {
    padding: var(--pura-space-2) var(--pura-space-3);
    font-size: var(--pura-text-sm); font-weight: 550; color: var(--pura-fg);
    border-bottom: 1px solid var(--pura-border);
  }
  .search {
    margin: var(--pura-space-2); width: calc(100% - var(--pura-space-2) * 2);
    font: inherit; font-size: var(--pura-text-sm); color: var(--pura-fg);
    background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    padding: 0 var(--pura-space-2); height: 2rem;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .search::placeholder { color: var(--pura-muted); }
  .search:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  .list {
    list-style: none; margin: 0; padding: var(--pura-space-1);
    overflow-y: auto; flex: 1; max-height: 16rem; min-height: 6rem;
  }
  .item { border-radius: var(--pura-radius-sm); }
  .item label {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-2); cursor: pointer; user-select: none;
    font-size: var(--pura-text-sm); color: var(--pura-fg);
  }
  .item label:hover { background: var(--pura-subtle); }
  .item input { accent-color: var(--pura-accent); flex: none; }
  .item-label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .controls {
    display: flex; flex-direction: column; justify-content: center;
    gap: var(--pura-space-2);
  }
  .ctl {
    display: inline-flex; align-items: center; justify-content: center;
    width: 2rem; height: 2rem; padding: 0;
    font: inherit; font-size: var(--pura-text-base); line-height: 1; cursor: pointer;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    background: var(--pura-bg); color: var(--pura-fg);
    box-shadow: var(--pura-shadow-sm);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  .ctl:hover { background: var(--pura-subtle); }
  .ctl:active { transform: translateY(0.5px) scale(0.98); }
  .ctl:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }

  @media (max-width: 480px) {
    .wrap { grid-template-columns: 1fr; }
    .controls { flex-direction: row; }
  }
`;

define("pura-transfer", PuraTransfer);
export { PuraTransfer };
