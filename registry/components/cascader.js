// <pura-cascader>. A multi level cascading select. The user drills through
// nested option columns to pick a leaf path. Data comes from a .data property, a
// `data` attribute (JSON nested array of {value,label,children}), or slotted
// light DOM nested <option value>/<optgroup>. The trigger shows the selected path
// joined by " / ". The panel shows side by side columns: activating an item with
// children reveals the next column to its right, and clicking a leaf selects the
// full path.
//
// Attributes: placeholder, disabled, change-on-select (also fire on non leaf),
// expand-trigger (click|hover, default click).
// Public API: get value()/set value() returns an array of values along the path.
// Events: change { detail: { value, labels } } where both are arrays.
// Parts: trigger, panel, column, option.
import { PuraElement, define } from "../base.js";
import meta from "./cascader.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { cascaderTemplate } from "./cascader.template.js";

registerMessages({
  "cascader.placeholder": {
    en: "Select",
    "pt-BR": "Selecionar",
    fr: "Sélectionner",
    de: "Auswählen",
    it: "Seleziona",
  },
  "cascader.empty": {
    en: "No options",
    "pt-BR": "Sem opções",
    fr: "Aucune option",
    de: "Keine Optionen",
    it: "Nessuna opzione",
  },
});

let uid = 0;

class PuraCascader extends PuraElement {
  static observedAttributes = ["placeholder", "disabled", "change-on-select", "expand-trigger", "data"];

  connectedCallback() {
    this._name = `--pura-cascader-${uid++}`;
    this._panelId = `pura-cascader-panel-${uid}`;
    // _active is the chain of nodes drilled into (one per open column level).
    this._active = this._active || [];
    // _value is the committed path of selected values.
    this._value = this._value || [];

    this._model = this._parse();

    const { html, css } = cascaderTemplate(this);
    this.render(html, css);

    this._anchor = this.$(".anchor");
    this._trigger = this.$(".trigger");
    this._valueEl = this.$(".value");
    this._panel = this.$(".panel");
    this._columns = this.$(".columns");

    // Delegated listeners on the stable columns shell, so columns re-render freely.
    this._trigger.addEventListener("click", () => this._toggleOpen());

    this._columns.addEventListener("click", (e) => {
      const opt = e.target.closest('[part="option"]');
      if (!opt || opt.dataset.disabled === "true") return;
      this._activate(Number(opt.dataset.level), opt.dataset.value, "click");
    });

    this._columns.addEventListener("mouseover", (e) => {
      if (this._expandTrigger() !== "hover") return;
      const opt = e.target.closest('[part="option"]');
      if (!opt || opt.dataset.disabled === "true") return;
      this._activate(Number(opt.dataset.level), opt.dataset.value, "hover");
    });

    this._onDocPointer = (e) => { if (!this.contains(e.target)) this._close(); };
    document.addEventListener("pointerdown", this._onDocPointer, true);

    this._panel.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      this._trigger.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) this._syncActiveFromValue();
    });

    // Seed value from light DOM <option selected> path if none set.
    if (this._value.length === 0) {
      const path = this._findSelectedPath(this._model, []);
      if (path) this._value = path.map((n) => n.value);
    }

    this._renderValue();
    this._renderColumns();

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    if (this._onDocPointer) document.removeEventListener("pointerdown", this._onDocPointer, true);
    this._i18nOff?.();
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._trigger) return;
    if (name === "disabled") this._trigger.disabled = this.bool("disabled");
    else if (name === "placeholder") this._renderValue();
    else if (name === "data" && val != null) {
      this._model = this._parse();
      this._renderValue();
      this._renderColumns();
    }
  }

  // ---- public API ---------------------------------------------------------
  get value() { return [...this._value]; }
  set value(v) {
    this._value = Array.isArray(v) ? v.map((x) => String(x)) : (v != null && v !== "" ? [String(v)] : []);
    if (this._trigger) {
      this._syncActiveFromValue();
      this._renderValue();
      this._renderColumns();
    }
  }

  // ---- data normalization -------------------------------------------------
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

  get data() { return this._data; }
  set data(v) {
    this._data = v;
    if (this._trigger) {
      this._model = this._parse();
      this._renderValue();
      this._renderColumns();
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

  _findSelectedPath(nodes, prefix) {
    for (const n of nodes) {
      const path = [...prefix, n];
      if (n._selected) return path;
      if (n.children.length) {
        const deep = this._findSelectedPath(n.children, path);
        if (deep) return deep;
      }
    }
    return null;
  }

  // ---- drilling -----------------------------------------------------------
  _expandTrigger() {
    return this.getAttribute("expand-trigger") === "hover" ? "hover" : "click";
  }

  // Activate the option at the given column level. Truncates deeper active state,
  // pushes this node, and either reveals its children or selects a leaf.
  _activate(level, value, source) {
    const siblings = this._columnNodes(level);
    const node = siblings.find((n) => n.value === value);
    if (!node) return;

    this._active = this._active.slice(0, level);
    this._active[level] = node;

    const isLeaf = node.children.length === 0;

    if (isLeaf) {
      if (source !== "click") return; // hover never selects a leaf
      this._value = this._active.map((n) => n.value);
      this._renderValue();
      this._renderColumns();
      this._emit();
      this._close();
      return;
    }

    // Non leaf. Hover only reveals; click reveals and may emit when change-on-select.
    this._renderColumns();
    if (source === "click" && this.bool("change-on-select")) {
      this._value = this._active.map((n) => n.value);
      this._renderValue();
      this._emit();
    }
  }

  // Nodes shown in a given column. Level 0 is the roots; deeper levels are the
  // children of the active node one level up.
  _columnNodes(level) {
    if (level === 0) return this._model;
    const parent = this._active[level - 1];
    return parent ? parent.children : [];
  }

  // Rebuild the active chain from the committed value path.
  _syncActiveFromValue() {
    this._active = [];
    let nodes = this._model;
    for (const v of this._value) {
      const node = nodes.find((n) => n.value === v);
      if (!node) break;
      this._active.push(node);
      nodes = node.children;
    }
  }

  _emit() {
    this.dispatchEvent(new CustomEvent("change", {
      detail: { value: this._active.map((n) => n.value), labels: this._active.map((n) => n.label) },
      bubbles: true,
    }));
  }

  // ---- open/close ---------------------------------------------------------
  _isOpen() { return this._panel.matches(":popover-open"); }
  _toggleOpen() { this._isOpen() ? this._close() : this._open(); }
  _open() {
    if (this.bool("disabled") || this._isOpen()) return;
    this._syncActiveFromValue();
    this._renderColumns();
    this._panel.showPopover();
  }
  _close() {
    if (!this._isOpen()) return;
    this._panel.hidePopover();
  }

  // ---- rendering ----------------------------------------------------------
  _renderValue() {
    const labels = this._labelsForValue();
    const placeholder = this.getAttribute("placeholder") || t("cascader.placeholder");
    if (!labels.length) {
      this._valueEl.innerHTML = `<span class="placeholder">${esc(placeholder)}</span>`;
    } else {
      this._valueEl.innerHTML = `<span class="path">${labels.map(esc).join(" / ")}</span>`;
    }
  }

  _labelsForValue() {
    const labels = [];
    let nodes = this._model;
    for (const v of this._value) {
      const node = nodes.find((n) => n.value === v);
      if (!node) break;
      labels.push(node.label);
      nodes = node.children;
    }
    return labels;
  }

  _renderColumns() {
    // One column per active level, plus the next column when the deepest active
    // node has children. Column 0 is always the roots.
    const cols = [];
    cols.push(this._columnNodes(0));
    for (let i = 0; i < this._active.length; i++) {
      const node = this._active[i];
      if (node.children.length) cols.push(node.children);
    }

    if (!cols[0].length) {
      this._columns.innerHTML =
        `<div class="empty" part="empty">${esc(t("cascader.empty"))}</div>`;
      return;
    }

    this._columns.innerHTML = cols.map((nodes, level) => {
      const items = nodes.map((n) => {
        const hasKids = n.children.length > 0;
        const active = this._active[level] && this._active[level].value === n.value;
        return `<div class="option" part="option" role="menuitem"
            data-level="${level}" data-value="${esc(n.value)}"
            data-disabled="${n.disabled ? "true" : "false"}"
            aria-haspopup="${hasKids ? "menu" : "false"}"
            ${active ? 'data-active="true"' : ""}>
            <span class="opt-label">${esc(n.label)}</span>
            ${hasKids ? `<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ""}
          </div>`;
      }).join("");
      return `<div class="column" part="column" role="menu">${items}</div>`;
    }).join("");
  }

  _applyI18n() {
    this._renderValue();
    this._renderColumns();
  }
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


define("pura-cascader", PuraCascader, meta);
export { PuraCascader };
