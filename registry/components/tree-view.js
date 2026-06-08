// <pura-tree-view> — hierarchical tree. Composes two custom elements:
//
//   <pura-tree>            role=tree. Owns roving-tabindex focus + arrow-key
//                          navigation across all currently-visible items.
//     attrs: label (accessible name for the tree)
//     events: select { detail:{ item, value } }, expand/collapse { detail:{ item } }
//
//   <pura-tree-item>       role=treeitem. A node with an optional disclosure
//                          chevron and a nested group of child items.
//     slots: label (the row text/content) · default (nested <pura-tree-item>s)
//     attrs: expanded (group revealed) · selectable (row toggles aria-selected)
//            · selected · disabled · value (machine-readable id for agents)
//
// Agent-native layer: every node carries stable data-pura-* attributes plus
// ARIA (treeitem/group, aria-level/expanded/selected). A global
// window.__puraTrees registry exposes a live, serializable snapshot of each
// tree keyed by id, so agents can read structure without touching the DOM.
import { PuraElement, define } from "../base.js";
import meta from "./tree-view.meta.js";
import { treeItemTemplate } from "./tree-view.template.js";

let uid = 0;

// ---- global agent-native registry ---------------------------------------
const registry = (window.__puraTrees ||= {
  trees: {},
  // Serializable snapshot of a tree's current structure. Accepts either the
  // internal registry id or the tree element's own DOM id attribute.
  snapshot(id) {
    let tree = this.trees[id];
    if (!tree) tree = Object.values(this.trees).find((t) => t.id === id || t._id === id);
    return tree ? tree.snapshot() : null;
  },
  list() {
    return Object.keys(this.trees);
  },
});

class PuraTreeItem extends PuraElement {
  static observedAttributes = ["expanded", "selectable", "selected", "disabled", "label"];

  connectedCallback() {
    this._id = this._id || `pura-tree-item-${uid++}`;
    const { html, css } = treeItemTemplate(this);
    this.render(html, css);
    this._row = this.$('[part="row"]');
    this._group = this.$('[part="group"]');
    this._childSlot = this.$('[part="group"] slot');

    // React to nested items appearing/disappearing.
    this._childSlot.addEventListener("slotchange", () => this._sync());

    // Row interaction: chevron toggles expand; row click selects.
    this._row.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled")) return;
      const onTwist = e.target.closest('[part="twist"]');
      if (onTwist && this._hasChildren()) {
        this.toggle();
        return;
      }
      this._activate();
    });

    this._sync();
  }

  attributeChangedCallback() {
    if (this._row) this._sync();
  }

  // ---- structure helpers ----
  _hasChildren() {
    return this.querySelector(":scope > pura-tree-item") != null;
  }

  childItems() {
    return [...this.querySelectorAll(":scope > pura-tree-item")];
  }

  _tree() {
    return this.closest("pura-tree");
  }

  get level() {
    let n = 1;
    let p = this.parentElement;
    while (p && p !== this._tree()) {
      if (p.tagName && p.tagName.toLowerCase() === "pura-tree-item") n++;
      p = p.parentElement;
    }
    return n;
  }

  get expanded() {
    return this.hasAttribute("expanded");
  }
  set expanded(v) {
    this.toggleAttribute("expanded", !!v);
  }

  get selected() {
    return this.hasAttribute("selected");
  }
  set selected(v) {
    this.toggleAttribute("selected", !!v);
  }

  get value() {
    return this.getAttribute("value") ?? (this.getAttribute("label") || this.textContent.trim());
  }

  // ---- behaviour ----
  toggle(force) {
    if (!this._hasChildren() || this.hasAttribute("disabled")) return;
    const next = force === undefined ? !this.expanded : !!force;
    if (next === this.expanded) return;
    this.expanded = next;
    const ev = next ? "expand" : "collapse";
    this.dispatchEvent(new CustomEvent(ev, { detail: { item: this }, bubbles: true }));
    this._tree()?._refresh();
  }

  _activate() {
    if (this.hasAttribute("selectable")) {
      const tree = this._tree();
      if (tree) tree._select(this);
      else this.selected = !this.selected;
    } else if (this._hasChildren()) {
      this.toggle();
    }
    this.focus();
    this.dispatchEvent(
      new CustomEvent("activate", { detail: { item: this, value: this.value }, bubbles: true })
    );
  }

  focus() {
    this._row?.focus();
  }

  _sync() {
    if (!this._row) return;
    const hasKids = this._hasChildren();
    const disabled = this.hasAttribute("disabled");
    const level = this.level;

    this._row.setAttribute("aria-level", String(level));
    this._row.setAttribute("data-pura-level", String(level));
    this.style.setProperty("--pura-tree-level", String(level));
    this.toggleAttribute("leaf", !hasKids);

    if (hasKids) {
      this._row.setAttribute("aria-expanded", this.expanded ? "true" : "false");
      this._group.hidden = !this.expanded;
    } else {
      this._row.removeAttribute("aria-expanded");
      this._group.hidden = true;
    }

    if (this.hasAttribute("selectable")) {
      this._row.setAttribute("aria-selected", this.selected ? "true" : "false");
      this._row.setAttribute("data-pura-selected", this.selected ? "true" : "false");
    } else {
      this._row.removeAttribute("aria-selected");
    }

    this._row.setAttribute("aria-disabled", disabled ? "true" : "false");
    this._row.setAttribute("data-pura-expanded", this.expanded ? "true" : "false");
  }
}

class PuraTree extends PuraElement {
  static observedAttributes = ["label"];

  connectedCallback() {
    this._id = this._id || `pura-tree-${uid++}`;
    this.render(
      `<div part="tree" role="tree" id="${this._id}" data-pura-tree
            aria-label="${(this.getAttribute("label") || "Tree").replace(/"/g, "&quot;")}">
         <slot></slot>
       </div>`,
      CSS_TREE
    );
    this._root = this.$('[part="tree"]');

    this._onKey = (e) => this._key(e);
    this._root.addEventListener("keydown", this._onKey);
    this.$("slot").addEventListener("slotchange", () => this._refresh());

    registry.trees[this._id] = this;
    queueMicrotask(() => this._refresh());
  }

  disconnectedCallback() {
    delete registry.trees[this._id];
  }

  attributeChangedCallback(name) {
    if (name === "label" && this._root) {
      this._root.setAttribute("aria-label", this.getAttribute("label") || "Tree");
    }
  }

  // All items in document order, regardless of visibility.
  allItems() {
    return [...this.querySelectorAll("pura-tree-item")];
  }

  // Items currently reachable (ancestors all expanded) and not disabled.
  visibleItems() {
    return this.allItems().filter((it) => {
      if (it.hasAttribute("disabled")) return false;
      let p = it.parentElement;
      while (p && p !== this) {
        if (p.tagName && p.tagName.toLowerCase() === "pura-tree-item" && !p.expanded) return false;
        p = p.parentElement;
      }
      return true;
    });
  }

  // Recompute roving tabindex so exactly one visible item is in the tab order.
  _refresh() {
    // Re-sync every item so level/indentation/ARIA settle once the full tree
    // has mounted (children may connect before their ancestors).
    this.allItems().forEach((it) => it._sync && it._sync());
    const visible = this.visibleItems();
    const current = visible.find((it) => it._row && it._row.tabIndex === 0);
    const focusable = current || visible[0];
    this.allItems().forEach((it) => {
      if (it._row) it._row.tabIndex = it === focusable ? 0 : -1;
    });
  }

  _focusItem(it) {
    if (!it) return;
    this.allItems().forEach((i) => {
      if (i._row) i._row.tabIndex = -1;
    });
    if (it._row) it._row.tabIndex = 0;
    it.focus();
  }

  _select(item) {
    this.allItems().forEach((it) => {
      if (it !== item && it.hasAttribute("selectable")) it.selected = false;
    });
    item.selected = !item.selected;
    this.dispatchEvent(
      new CustomEvent("select", { detail: { item, value: item.value }, bubbles: true })
    );
  }

  _key(e) {
    const visible = this.visibleItems();
    if (!visible.length) return;
    const active = this.allItems().find((it) => it._row && it._row.matches(":focus"));
    const idx = active ? visible.indexOf(active) : -1;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this._focusItem(visible[Math.min(idx + 1, visible.length - 1)] || visible[0]);
        break;
      case "ArrowUp":
        e.preventDefault();
        this._focusItem(idx <= 0 ? visible[0] : visible[idx - 1]);
        break;
      case "ArrowRight":
        e.preventDefault();
        if (!active) return;
        if (active._hasChildren() && !active.expanded) active.toggle(true);
        else if (active._hasChildren() && active.expanded) {
          const kid = active.childItems().find((k) => !k.hasAttribute("disabled"));
          if (kid) this._focusItem(kid);
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (!active) return;
        if (active._hasChildren() && active.expanded) active.toggle(false);
        else {
          const parent = active.parentElement?.closest("pura-tree-item");
          if (parent) this._focusItem(parent);
        }
        break;
      case "Home":
        e.preventDefault();
        this._focusItem(visible[0]);
        break;
      case "End":
        e.preventDefault();
        this._focusItem(visible[visible.length - 1]);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (active) active._activate();
        break;
    }
  }

  // ---- agent-native serializable snapshot ----
  snapshot() {
    const walk = (item) => ({
      id: item._id,
      value: item.value,
      label: (item.getAttribute("label") || item.textContent.trim().split("\n")[0] || "").trim(),
      level: item.level,
      expanded: item.expanded,
      selectable: item.hasAttribute("selectable"),
      selected: item.selected,
      disabled: item.hasAttribute("disabled"),
      children: item.childItems().map(walk),
    });
    return {
      id: this._id,
      label: this.getAttribute("label") || "Tree",
      roots: [...this.querySelectorAll(":scope > pura-tree-item")].map(walk),
    };
  }
}


const CSS_TREE = `
  :host { display: block; }
  [part="tree"] {
    display: flex; flex-direction: column; gap: 1px;
    font-family: var(--pura-font);
  }
`;

define("pura-tree-item", PuraTreeItem);
define("pura-tree", PuraTree);
// Alias the spec tag name to the root tree so <pura-tree-view> also works.
define("pura-tree-view", class extends PuraTree {}, meta);

export { PuraTree, PuraTreeItem };
