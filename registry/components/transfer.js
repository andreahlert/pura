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
import meta from "./transfer.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { transferTemplate } from "./transfer.template.js";

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

    const { html, css } = transferTemplate(this);
    this.render(html, css);

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

define("pura-transfer", PuraTransfer, meta);
export { PuraTransfer };
