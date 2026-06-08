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
import { treeSelectTemplate } from "./tree-select.template.js";

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

    const { html, css } = treeSelectTemplate(this);
    this.render(html, css);

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


define("pura-tree-select", PuraTreeSelect, meta);
export { PuraTreeSelect };
