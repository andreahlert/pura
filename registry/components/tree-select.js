// <pura-tree-select>. A select whose dropdown is a hierarchical tree for picking
// one or many nodes. Data comes from a .data property, a `data` attribute (JSON
// nested array of {value,label,children}), or slotted light DOM nested
// <option value>/<optgroup>. The trigger shows the selected label(s). The panel
// renders an expandable tree with chevrons that toggle children. Searchable mode
// filters nodes by text and auto expands the matching paths.
//
// Attributes: multiple (checkboxes plus tags of selected), placeholder,
// searchable, disabled.
// Public API: get value()/set value() returns a single value or an array.
// Events: change { detail: { value } } where value is scalar or array.
// Parts: trigger, panel, node, tag.
import { PuraElement, define } from "../base.js";
import meta from "./tree-select.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "tree-select.placeholder": {
    en: "Select",
    "pt-BR": "Selecionar",
    fr: "Sélectionner",
    de: "Auswählen",
    it: "Seleziona",
  },
  "tree-select.search": {
    en: "Search",
    "pt-BR": "Buscar",
    fr: "Rechercher",
    de: "Suchen",
    it: "Cerca",
  },
  "tree-select.empty": {
    en: "No results",
    "pt-BR": "Nenhum resultado",
    fr: "Aucun résultat",
    de: "Keine Ergebnisse",
    it: "Nessun risultato",
  },
  "tree-select.remove": {
    en: "Remove {label}",
    "pt-BR": "Remover {label}",
    fr: "Retirer {label}",
    de: "{label} entfernen",
    it: "Rimuovi {label}",
  },
});

let uid = 0;

class PuraTreeSelect extends PuraElement {
  static observedAttributes = ["multiple", "placeholder", "searchable", "disabled", "data"];

  connectedCallback() {
    this._name = `--pura-tree-select-${uid++}`;
    this._panelId = `pura-tree-select-panel-${uid}`;
    this._expanded = this._expanded || new Set();
    this._selected = this._selected || new Set();
    this._query = "";

    this._model = this._parse();

    this.render(
      `<div class="anchor" part="anchor">
         <div class="trigger" part="trigger" role="button" tabindex="${this.bool("disabled") ? "-1" : "0"}"
           aria-haspopup="tree" aria-expanded="false" aria-controls="${this._panelId}"
           aria-disabled="${this.bool("disabled") ? "true" : "false"}">
           <span class="value" part="value"></span>
           <svg class="chev" part="chevron" viewBox="0 0 24 24" aria-hidden="true">
             <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
         </div>
         <div class="panel" part="panel" id="${this._panelId}" popover="manual" tabindex="-1">
           <div class="search" part="search" hidden>
             <input class="search-input" type="text" autocomplete="off" spellcheck="false" />
           </div>
           <div class="tree" role="tree"></div>
         </div>
       </div>`,
      CSS.replaceAll("ANCHOR", this._name)
    );

    this._anchor = this.$(".anchor");
    this._trigger = this.$(".trigger");
    this._valueEl = this.$(".value");
    this._panel = this.$(".panel");
    this._searchWrap = this.$(".search");
    this._searchInput = this.$(".search-input");
    this._treeEl = this.$(".tree");

    this._syncSearchUI();

    // Seed selection from light DOM <option selected> if no explicit value set.
    if (this._selected.size === 0) {
      this._eachNode(this._model, (n) => { if (n._selected) this._selected.add(n.value); });
    }

    // Delegated listeners live on stable shells, so inner HTML can be re-rendered freely.
    this._trigger.addEventListener("click", () => this._toggleOpen());
    this._trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this._toggleOpen(); }
      else if (e.key === "Escape") this._close();
    });

    this._treeEl.addEventListener("click", (e) => {
      const twist = e.target.closest('[part="twist"]');
      if (twist) {
        const row = twist.closest(".node");
        this._toggleExpand(row.dataset.value);
        return;
      }
      const row = e.target.closest(".node");
      if (!row || row.dataset.disabled === "true") return;
      this._pick(row.dataset.value);
    });

    this._valueEl.addEventListener("click", (e) => {
      const rm = e.target.closest('[part="tag"] .tag-remove');
      if (!rm) return;
      e.stopPropagation();
      const tag = rm.closest('[part="tag"]');
      this._selected.delete(tag.dataset.value);
      this._renderValue();
      this._renderTree();
      this._emit();
    });

    if (this._searchInput) {
      this._searchInput.addEventListener("input", () => {
        this._query = this._searchInput.value.trim().toLowerCase();
        this._renderTree();
      });
    }

    this._onDocPointer = (e) => { if (!this.contains(e.target)) this._close(); };
    document.addEventListener("pointerdown", this._onDocPointer, true);

    this._panel.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      this._trigger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    this._renderValue();
    this._renderTree();

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    if (this._onDocPointer) document.removeEventListener("pointerdown", this._onDocPointer, true);
    this._i18nOff?.();
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._trigger) return;
    if (name === "disabled") {
      const d = this.bool("disabled");
      this._trigger.setAttribute("aria-disabled", d ? "true" : "false");
      this._trigger.tabIndex = d ? -1 : 0;
    }
    else if (name === "placeholder") this._renderValue();
    else if (name === "searchable") this._syncSearchUI();
    else if (name === "multiple") { this._renderValue(); this._renderTree(); }
    else if (name === "data" && val != null) {
      this._model = this._parse();
      this._renderValue();
      this._renderTree();
    }
  }

  // ---- public API ---------------------------------------------------------
  get value() {
    const arr = [...this._selected];
    return this.bool("multiple") ? arr : (arr[0] ?? "");
  }
  set value(v) {
    this._selected = new Set();
    if (Array.isArray(v)) v.forEach((x) => this._selected.add(String(x)));
    else if (v != null && v !== "") this._selected.add(String(v));
    if (this._trigger) { this._renderValue(); this._renderTree(); }
  }

  // ---- data normalization -------------------------------------------------
  // Priority: .data property, then `data` attribute JSON, then slotted DOM.
  _parse() {
    if (Array.isArray(this._data)) return this._normalize(this._data);
    const attr = this.getAttribute("data");
    if (attr) {
      try {
        const json = JSON.parse(attr);
        if (Array.isArray(json)) return this._normalize(json);
      } catch (_) {}
    }
    return this._fromDOM(this);
  }

  // .data property accessor so assigning the property reparses.
  get data() { return this._data; }
  set data(v) {
    this._data = v;
    if (this._trigger) {
      this._model = this._parse();
      this._renderValue();
      this._renderTree();
    }
  }

  _normalize(arr) {
    return arr.map((n) => ({
      value: String(n.value ?? n.label ?? ""),
      label: String(n.label ?? n.value ?? ""),
      disabled: !!n.disabled,
      _selected: !!n.selected,
      children: Array.isArray(n.children) ? this._normalize(n.children) : [],
    }));
  }

  _fromDOM(root) {
    const out = [];
    for (const el of [...root.children]) {
      const tag = el.tagName.toLowerCase();
      if (tag === "optgroup") {
        out.push({
          value: String(el.getAttribute("value") ?? el.getAttribute("label") ?? ""),
          label: String(el.getAttribute("label") ?? el.getAttribute("value") ?? ""),
          disabled: el.hasAttribute("disabled"),
          _selected: false,
          children: this._fromDOM(el),
        });
      } else if (tag === "option") {
        out.push({
          value: String(el.getAttribute("value") ?? el.textContent.trim()),
          label: el.textContent.trim() || String(el.getAttribute("value") ?? ""),
          disabled: el.hasAttribute("disabled"),
          _selected: el.hasAttribute("selected"),
          children: this._fromDOM(el),
        });
      }
    }
    return out;
  }

  // ---- selection ----------------------------------------------------------
  _pick(value) {
    if (this.bool("multiple")) {
      if (this._selected.has(value)) this._selected.delete(value);
      else this._selected.add(value);
      this._renderValue();
      this._renderTree();
      this._emit();
    } else {
      this._selected = new Set([value]);
      this._renderValue();
      this._renderTree();
      this._emit();
      this._close();
    }
  }

  _emit() {
    this.dispatchEvent(new CustomEvent("change", {
      detail: { value: this.value }, bubbles: true,
    }));
  }

  // ---- open/close ---------------------------------------------------------
  _isOpen() { return this._panel.matches(":popover-open"); }
  _toggleOpen() { this._isOpen() ? this._close() : this._open(); }
  _open() {
    if (this.bool("disabled") || this._isOpen()) return;
    this._panel.showPopover();
    if (this.bool("searchable")) queueMicrotask(() => this._searchInput?.focus());
  }
  _close() {
    if (!this._isOpen()) return;
    this._panel.hidePopover();
  }

  _toggleExpand(value) {
    if (this._expanded.has(value)) this._expanded.delete(value);
    else this._expanded.add(value);
    this._renderTree();
  }

  // ---- rendering ----------------------------------------------------------
  _renderValue() {
    const labels = [];
    this._eachNode(this._model, (n) => { if (this._selected.has(n.value)) labels.push(n); });
    const placeholder = this.getAttribute("placeholder") || t("tree-select.placeholder");

    if (labels.length === 0) {
      this._valueEl.innerHTML = `<span class="placeholder">${esc(placeholder)}</span>`;
      return;
    }
    if (this.bool("multiple")) {
      this._valueEl.innerHTML = labels.map((n) =>
        `<span class="tag" part="tag" data-value="${esc(n.value)}">
           <span class="tag-label">${esc(n.label)}</span>
           <button type="button" class="tag-remove" aria-label="${esc(t("tree-select.remove", { label: n.label }))}">
             <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
           </button>
         </span>`
      ).join("");
    } else {
      this._valueEl.innerHTML = `<span class="single">${esc(labels[0].label)}</span>`;
    }
  }

  _renderTree() {
    // When searching, compute the set of nodes to keep (a node survives if it or
    // any descendant matches) and the ancestors to force expand.
    let keep = null;
    let forceExpand = null;
    if (this.bool("searchable") && this._query) {
      keep = new Set();
      forceExpand = new Set();
      this._filter(this._model, [], keep, forceExpand);
    }

    const html = this._renderNodes(this._model, 1, keep, forceExpand);
    if (!html) {
      this._treeEl.innerHTML =
        `<div class="empty" part="empty">${esc(t("tree-select.empty"))}</div>`;
      return;
    }
    this._treeEl.innerHTML = html;
  }

  _filter(nodes, _path, keep, forceExpand) {
    let anyKept = false;
    for (const n of nodes) {
      const selfMatch = n.label.toLowerCase().includes(this._query);
      const childKept = n.children.length
        ? this._filter(n.children, _path, keep, forceExpand)
        : false;
      if (selfMatch || childKept) {
        keep.add(n.value);
        anyKept = true;
        if (childKept) forceExpand.add(n.value);
      }
    }
    return anyKept;
  }

  _renderNodes(nodes, level, keep, forceExpand) {
    let html = "";
    for (const n of nodes) {
      if (keep && !keep.has(n.value)) continue;
      const hasKids = n.children.length > 0;
      const expanded = (forceExpand && forceExpand.has(n.value)) || this._expanded.has(n.value);
      const selected = this._selected.has(n.value);
      const multiple = this.bool("multiple");
      html +=
        `<div class="node" part="node" role="treeitem" style="--pura-ts-level:${level}"
           data-value="${esc(n.value)}" data-disabled="${n.disabled ? "true" : "false"}"
           aria-selected="${selected ? "true" : "false"}"
           ${hasKids ? `aria-expanded="${expanded ? "true" : "false"}"` : ""}>
           <span class="twist" part="twist" aria-hidden="true">
             ${hasKids ? `<svg class="tw-chev ${expanded ? "open" : ""}" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ""}
           </span>
           ${multiple ? `<span class="box ${selected ? "checked" : ""}" aria-hidden="true">${selected ? CHECK : ""}</span>` : ""}
           <span class="node-label">${esc(n.label)}</span>
           ${!multiple && selected ? `<span class="tick" aria-hidden="true">${CHECK}</span>` : ""}
         </div>`;
      if (hasKids && expanded) {
        html += this._renderNodes(n.children, level + 1, keep, forceExpand);
      }
    }
    return html;
  }

  _syncSearchUI() {
    if (!this._searchWrap) return;
    const on = this.bool("searchable");
    this._searchWrap.hidden = !on;
    if (this._searchInput) {
      this._searchInput.placeholder = t("tree-select.search");
    }
  }

  _applyI18n() {
    this._renderValue();
    this._renderTree();
    if (this._searchInput) this._searchInput.placeholder = t("tree-select.search");
  }

  // Depth first walk of the model.
  _eachNode(nodes, fn) {
    for (const n of nodes) {
      fn(n);
      if (n.children.length) this._eachNode(n.children, fn);
    }
  }
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const CHECK =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;

const CSS = `
  :host { display: block; }
  .anchor { anchor-name: ANCHOR; position: relative; display: block; }

  .trigger {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    display: flex; align-items: center; gap: var(--pura-space-2);
    color: var(--pura-fg); background: var(--pura-bg); text-align: left;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-2) 0 var(--pura-space-3); min-height: 2.25rem;
    box-shadow: var(--pura-shadow-sm); cursor: pointer;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .trigger:hover { border-color: var(--pura-fg); }
  .trigger:focus-visible {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  .trigger[aria-disabled="true"] { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }

  .value {
    flex: 1 1 auto; min-width: 0; display: flex; flex-wrap: wrap;
    align-items: center; gap: var(--pura-space-1); padding: var(--pura-space-1) 0;
  }
  .value .single, .value .placeholder {
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .placeholder { color: var(--pura-muted); }

  .tag {
    display: inline-flex; align-items: center; gap: var(--pura-space-1);
    background: var(--pura-subtle); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-sm);
    padding: 0.075rem var(--pura-space-1) 0.075rem var(--pura-space-2);
    font-size: var(--pura-text-xs); max-width: 12rem;
  }
  .tag-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tag-remove {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1rem; height: 1rem; padding: 0; flex: none;
    border: none; background: transparent; color: var(--pura-muted); cursor: pointer;
    border-radius: var(--pura-radius-sm);
  }
  .tag-remove svg { width: 0.75rem; height: 0.75rem; }
  .tag-remove:hover { color: var(--pura-fg); background: var(--pura-subtle-hover); }

  .chev {
    width: 1rem; height: 1rem; flex: none; color: var(--pura-muted);
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  .trigger[aria-expanded="true"] .chev { transform: rotate(180deg); }

  .panel {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    min-width: anchor-size(width); width: max-content; max-width: min(24rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-1);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }

  .search { padding: var(--pura-space-1) var(--pura-space-1) var(--pura-space-2); }
  .search[hidden] { display: none; }
  .search-input {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    padding: 0 var(--pura-space-2); height: 2rem; outline: none;
  }
  .search-input:focus { border-color: var(--pura-accent); box-shadow: 0 0 0 2px var(--pura-ring); }

  .tree { display: flex; flex-direction: column; gap: 1px; max-height: 16rem; overflow-y: auto; }

  .node {
    display: flex; align-items: center; gap: var(--pura-space-1);
    padding: var(--pura-space-2);
    padding-left: calc(var(--pura-space-2) + (var(--pura-ts-level, 1) - 1) * var(--pura-space-5));
    border-radius: var(--pura-radius-sm); cursor: pointer; user-select: none;
    color: var(--pura-fg); line-height: 1.4;
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .node:hover { background: var(--pura-subtle); }
  .node[aria-selected="true"] { background: var(--pura-subtle-hover); font-weight: 550; }
  .node[data-disabled="true"] { opacity: 0.5; cursor: not-allowed; }

  .twist {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1rem; height: 1rem; flex: none; color: var(--pura-muted);
  }
  .tw-chev { width: 0.85rem; height: 0.85rem; transition: transform var(--pura-dur) var(--pura-ease); }
  .tw-chev.open { transform: rotate(90deg); }

  .box {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1rem; height: 1rem; flex: none;
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    color: var(--pura-primary-fg); background: var(--pura-bg);
  }
  .box.checked { background: var(--pura-primary); border-color: var(--pura-primary); }
  .box svg { width: 0.75rem; height: 0.75rem; }

  .node-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tick {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1rem; height: 1rem; flex: none; color: var(--pura-accent);
  }

  .empty {
    padding: var(--pura-space-3) var(--pura-space-2);
    color: var(--pura-muted); text-align: center;
  }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    .panel { position: absolute; top: 100%; left: 0; inset: auto; margin-top: var(--pura-space-2); }
  }
`;

define("pura-tree-select", PuraTreeSelect, meta);
export { PuraTreeSelect };
