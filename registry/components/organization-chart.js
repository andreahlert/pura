// <pura-organization-chart>, a hierarchical org chart (PrimeReact style).
// Top-down boxes connected by CSS-drawn lines. Data via property .data or
// attribute `data` (nested JSON {label, children:[...]}), OR slotted nested
// <pura-org-node label="CEO">...children...</pura-org-node>.
//
// Attributes: collapsible (click a node toggles its subtree), data (JSON).
// Parts: node, line, children. Emits nodeclick with detail {label}.
import { PuraElement, define } from "../base.js";
import meta from "./organization-chart.meta.js";
import { organizationChartTemplate } from "./organization-chart.template.js";

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
    const { html, css } = organizationChartTemplate(this);
    this.render(html, css);
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
    if (!this._model) { this._chart.innerHTML = ""; return; }
    this._chart.innerHTML = `<ul class="tree">${this._renderNode(this._model)}</ul>`;
  }

  _renderNode(node) {
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

define("pura-org-node", PuraOrgNode);
define("pura-organization-chart", PuraOrganizationChart, meta);
export { PuraOrganizationChart, PuraOrgNode };
