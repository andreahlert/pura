// <pura-organization-chart>, a hierarchical org chart (PrimeReact style).
// Top-down boxes connected by CSS-drawn lines. Data via property .data or
// attribute `data` (nested JSON {label, children:[...]}), OR slotted nested
// <pura-org-node label="CEO">...children...</pura-org-node>.
//
// Attributes: collapsible (click a node toggles its subtree), data (JSON).
// Parts: node, line, children. Emits nodeclick with detail {label}.
import { PuraElement, define } from "../base.js";

// Trivial data holder for the slotted authoring form. It renders nothing on its
// own, the chart reads its label attribute and nested children.
class PuraOrgNode extends PuraElement {
  connectedCallback() {
    // Hidden authoring element, the chart owns the visual rendering.
    this.style.display = "none";
  }
}

class PuraOrganizationChart extends PuraElement {
  static observedAttributes = ["data", "collapsible"];

  connectedCallback() {
    this.render(
      `<div class="scroll" part="root">
         <div class="chart"></div>
         <slot hidden></slot>
       </div>`,
      CSS
    );
    this._chart = this.$(".chart");
    this._slot = this.$("slot");
    // Track which node ids are collapsed.
    this._collapsed = this._collapsed || new Set();

    this._slot.addEventListener("slotchange", () => this._sync());
    this._chart.addEventListener("click", (e) => this._onClick(e));
    this._sync();
  }

  attributeChangedCallback(name) {
    if (!this._chart) return;
    if (name === "data") this._data = undefined; // re-parse on next sync
    this._sync();
  }

  // ---- public API ----
  get data() { return this._model; }
  set data(v) {
    this._data = v;
    if (this._chart) this._sync();
  }

  _parseAttr() {
    const raw = this.getAttribute("data");
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (_) { return null; }
  }

  // Build a normalized model from JSON or slotted <pura-org-node> elements.
  _buildModel() {
    if (this._data !== undefined && this._data !== null) return this._data;
    const attr = this._parseAttr();
    if (attr) return attr;
    const roots = [...this.querySelectorAll(":scope > pura-org-node")];
    if (roots.length === 1) return this._fromNode(roots[0]);
    if (roots.length > 1) return { label: "", children: roots.map((r) => this._fromNode(r)) };
    return null;
  }

  _fromNode(el) {
    const children = [...el.querySelectorAll(":scope > pura-org-node")].map((c) => this._fromNode(c));
    return { label: el.getAttribute("label") || el.textContent.trim().split("\n")[0] || "", children };
  }

  _sync() {
    this._model = this._buildModel();
    this._idSeq = 0;
    if (!this._model) { this._chart.innerHTML = ""; return; }
    this._chart.innerHTML = `<ul class="tree">${this._renderNode(this._model)}</ul>`;
  }

  _renderNode(node) {
    const id = `n${this._idSeq++}`;
    const label = String(node.label ?? "");
    const kids = Array.isArray(node.children) ? node.children : [];
    const collapsible = this.hasAttribute("collapsible") && kids.length > 0;
    const collapsed = this._collapsed.has(this._labelKey(node));
    const safe = label.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    let childrenHtml = "";
    if (kids.length && !collapsed) {
      childrenHtml = `<ul class="children" part="children">${kids.map((k) => this._renderNode(k)).join("")}</ul>`;
    }

    const toggle = collapsible
      ? `<span class="toggle" aria-hidden="true">${collapsed ? "+" : "-"}</span>`
      : "";

    return `<li class="li${collapsed ? " collapsed" : ""}">
      <div class="node" part="node" tabindex="0" role="treeitem"
           data-key="${safe}" data-label="${safe}">
        <span class="node-label">${safe}</span>${toggle}
      </div>${childrenHtml}
    </li>`;
  }

  // Stable key for collapse state. Escaped the same way as the data-key
  // attribute so the render-time check and the click-time toggle agree even
  // when labels contain & < > characters.
  _labelKey(node) {
    return String(node.label ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  _onClick(e) {
    const node = e.target.closest(".node");
    if (!node) return;
    const label = node.getAttribute("data-label") || "";
    this.dispatchEvent(new CustomEvent("nodeclick", { detail: { label }, bubbles: true }));
    if (this.hasAttribute("collapsible")) {
      const key = node.getAttribute("data-key") || "";
      const li = node.closest(".li");
      // Only toggle when there are children to collapse.
      if (li && (li.querySelector(":scope > .children") || li.classList.contains("collapsed"))) {
        if (this._collapsed.has(key)) this._collapsed.delete(key);
        else this._collapsed.add(key);
        this._sync();
      }
    }
  }
}

// Classic ul/li org-tree connector technique, drawn entirely with borders.
const CSS = `
  :host { display: block; color: var(--pura-fg); }

  .scroll { overflow-x: auto; padding: var(--pura-space-2); }
  .chart { display: inline-block; min-width: 100%; text-align: center; }

  ul.tree, ul.children {
    display: flex; justify-content: center; padding: 0; margin: 0;
    list-style: none; position: relative;
    padding-top: var(--pura-space-5);
  }
  ul.tree { padding-top: 0; }

  .li {
    position: relative; list-style: none;
    padding: var(--pura-space-5) var(--pura-space-3) 0;
    display: flex; flex-direction: column; align-items: center;
  }
  ul.tree > .li { padding-top: 0; }

  /* connectors: vertical line up from each child, plus a horizontal bar */
  .li::before, .li::after {
    content: ""; position: absolute; top: 0;
    width: 50%; height: var(--pura-space-5);
    border-top: 1px solid var(--pura-border-strong);
  }
  .li::before { left: 0; border-right: 1px solid var(--pura-border-strong); }
  .li::after { right: 0; }
  /* single child or first/last trims to avoid overhang */
  .li:first-child::before, .li:last-child::after { border-top: 0; }
  .li:last-child::before { border-right: 1px solid var(--pura-border-strong); }
  .li:only-child::after, .li:only-child::before {
    border-right: 0; border-top: 0;
  }
  /* the stem dropping from a parent down to the children bar */
  ul.children::before {
    content: ""; position: absolute; top: 0; left: 50%;
    width: 0; height: var(--pura-space-5);
    border-left: 1px solid var(--pura-border-strong);
  }
  /* stem rising from each child box up to the connector bar */
  .li > .node::before {
    content: ""; position: absolute; bottom: 100%; left: 50%;
    width: 0; height: var(--pura-space-5);
    border-left: 1px solid var(--pura-border-strong);
  }
  ul.tree > .li > .node::before { display: none; }

  .node {
    position: relative; display: inline-flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-2) var(--pura-space-4);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
    font-size: var(--pura-text-sm); font-weight: 550; white-space: nowrap;
    cursor: pointer; outline: none;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .node:hover { border-color: var(--pura-border-strong); box-shadow: var(--pura-shadow); }
  .node:focus-visible { border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring); }

  .toggle {
    display: inline-grid; place-items: center;
    width: 1rem; height: 1rem; flex: none;
    border-radius: var(--pura-radius-full);
    background: var(--pura-subtle); color: var(--pura-muted-fg);
    font-size: var(--pura-text-xs); line-height: 1; font-weight: 700;
  }
`;

define("pura-org-node", PuraOrgNode);
define("pura-organization-chart", PuraOrganizationChart);
export { PuraOrganizationChart, PuraOrgNode };
