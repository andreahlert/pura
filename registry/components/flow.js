// <pura-flow>, a lightweight node-graph / flowchart canvas. Compose with
// light-DOM <pura-flow-node> children positioned by x/y attributes, and edges
// declared either via the host `edges` attribute (JSON [{from,to}]) or as
// slotted <pura-flow-edge from="a" to="b"> children. Nodes are draggable boxes
// (pointer drag, unless readonly); edges render as SVG bezier paths on a layer
// behind the nodes and redraw on drag + slotchange.
//
// <pura-flow>        attrs: width, height, readonly, edges (JSON) ; slot: nodes + edges
// <pura-flow-node>   attrs: id, x, y, label ; default slot: extra node content
// <pura-flow-edge>   attrs: from, to ; no visual output (declares an edge)
// Events: 'nodemove' { id, x, y } (bubbles) on the flow after a node is dragged.
// Parts: canvas, edges, node.
import { PuraElement, define } from "../base.js";
import meta from "./flow.meta.js";

const SVGNS = "http://www.w3.org/2000/svg";

class PuraFlow extends PuraElement {
  static observedAttributes = ["width", "height", "edges", "readonly"];

  connectedCallback() {
    this.render(
      `<div part="canvas" class="canvas">
         <svg part="edges" class="edges" aria-hidden="true"></svg>
         <slot></slot>
       </div>`,
      CSS
    );
    this._canvas = this.$(".canvas");
    this._svg = this.$(".edges");
    this._applySize();

    // Redraw whenever the slotted node/edge set changes.
    const slot = this.$("slot");
    slot.addEventListener("slotchange", () => this.draw());

    // Each node reports its moves up; the node's x/y attribute change already
    // triggers draw(), so here we only re-emit the public 'nodemove' event.
    this.addEventListener("pura-flow-node-move", (e) => {
      e.stopPropagation();
      const { id, x, y } = e.detail;
      this.dispatchEvent(new CustomEvent("nodemove", { detail: { id, x, y }, bubbles: true }));
    });

    // First paint (nodes may upgrade after us; rAF lets layout settle).
    requestAnimationFrame(() => this.draw());
  }

  attributeChangedCallback(name) {
    if (!this._canvas) return;
    if (name === "width" || name === "height") this._applySize();
    if (name === "edges") this.draw();
    if (name === "readonly") this._nodes().forEach((n) => n._syncReadonly?.());
  }

  _applySize() {
    const w = this.getAttribute("width");
    const h = this.getAttribute("height");
    this._canvas.style.width = w ? (/^\d+$/.test(w) ? `${w}px` : w) : "100%";
    this._canvas.style.height = h ? (/^\d+$/.test(h) ? `${h}px` : h) : "400px";
  }

  get readonly() { return this.hasAttribute("readonly"); }
  set readonly(v) { this.toggleAttribute("readonly", !!v); }

  _nodes() {
    return [...this.querySelectorAll(":scope > pura-flow-node")];
  }

  // Collect edges from the `edges` JSON attribute + slotted <pura-flow-edge>.
  _edges() {
    const out = [];
    const raw = this.getAttribute("edges");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) for (const e of parsed) if (e && e.from && e.to) out.push({ from: e.from, to: e.to });
      } catch (_) { /* malformed JSON: ignore */ }
    }
    for (const el of this.querySelectorAll(":scope > pura-flow-edge")) {
      const from = el.getAttribute("from");
      const to = el.getAttribute("to");
      if (from && to) out.push({ from, to });
    }
    return out;
  }

  // Center of a node in canvas coordinates (uses x/y + measured box size).
  _center(node) {
    const x = Number(node.getAttribute("x")) || 0;
    const y = Number(node.getAttribute("y")) || 0;
    const box = node.getBoundingClientRect();
    const w = box.width || 120;
    const h = box.height || 48;
    return { x: x + w / 2, y: y + h / 2, w, h, left: x, top: y };
  }

  // Rebuild the SVG edge layer connecting node centers with bezier paths.
  draw() {
    if (!this._svg) return;
    const map = new Map();
    for (const n of this._nodes()) { const id = n.getAttribute("id"); if (id) map.set(id, n); }
    while (this._svg.firstChild) this._svg.removeChild(this._svg.firstChild);

    for (const { from, to } of this._edges()) {
      const a = map.get(from);
      const b = map.get(to);
      if (!a || !b) continue;
      const c1 = this._center(a);
      const c2 = this._center(b);
      const path = document.createElementNS(SVGNS, "path");
      path.setAttribute("d", bezier(c1, c2));
      path.setAttribute("class", "edge");
      path.setAttribute("part", "edge");
      this._svg.appendChild(path);
    }
  }
}

// Horizontal bezier between two centers; control points flatten the curve.
function bezier(a, b) {
  const dx = Math.max(40, Math.abs(b.x - a.x) / 2);
  return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
}

class PuraFlowNode extends PuraElement {
  static observedAttributes = ["x", "y", "label"];

  connectedCallback() {
    this.render(
      `<div part="node" class="node">
         <span part="label" class="label">${esc(this.getAttribute("label"))}</span>
         <div class="body"><slot></slot></div>
       </div>`,
      NODE_CSS
    );
    this._label = this.$(".label");
    this._applyPos();
    this._syncReadonly();

    this.addEventListener("pointerdown", (e) => this._onDown(e));
  }

  attributeChangedCallback(name) {
    if (!this._label) return;
    if (name === "label") this._label.textContent = this.getAttribute("label") || "";
    if (name === "x" || name === "y") {
      this._applyPos();
      // Redraw edges when a node is repositioned (drag or programmatic).
      this._flow()?.draw();
    }
  }

  _applyPos() {
    const x = Number(this.getAttribute("x")) || 0;
    const y = Number(this.getAttribute("y")) || 0;
    this.style.left = `${x}px`;
    this.style.top = `${y}px`;
  }

  _flow() { return this.closest("pura-flow"); }

  _syncReadonly() {
    const ro = this._flow()?.readonly;
    this.classList.toggle("readonly", !!ro);
  }

  _onDown(e) {
    const flow = this._flow();
    if (!flow || flow.readonly) return;
    if (e.button !== 0) return;
    e.preventDefault();

    const startX = Number(this.getAttribute("x")) || 0;
    const startY = Number(this.getAttribute("y")) || 0;
    const px = e.clientX;
    const py = e.clientY;
    this.classList.add("dragging");
    try { this.setPointerCapture(e.pointerId); } catch (_) {}

    const move = (ev) => {
      const nx = Math.round(startX + (ev.clientX - px));
      const ny = Math.round(startY + (ev.clientY - py));
      this.setAttribute("x", String(Math.max(0, nx)));
      this.setAttribute("y", String(Math.max(0, ny)));
      this.dispatchEvent(new CustomEvent("pura-flow-node-move", {
        detail: { id: this.getAttribute("id"), x: Math.max(0, nx), y: Math.max(0, ny) },
        bubbles: true,
      }));
    };
    const up = () => {
      this.classList.remove("dragging");
      this.removeEventListener("pointermove", move);
      this.removeEventListener("pointerup", up);
      this.removeEventListener("pointercancel", up);
    };
    this.addEventListener("pointermove", move);
    this.addEventListener("pointerup", up);
    this.addEventListener("pointercancel", up);
  }
}

// <pura-flow-edge> holds from/to attributes only; the flow reads + renders it.
class PuraFlowEdge extends PuraElement {
  connectedCallback() {
    this.render(`<slot></slot>`, `:host { display: none; }`);
  }
}

function esc(v) {
  return v == null ? "" : String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

const CSS = `
  :host { display: block; }
  .canvas {
    position: relative; overflow: hidden;
    background: var(--pura-bg);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-lg);
    background-image: radial-gradient(var(--pura-border) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  .edges {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; overflow: visible;
  }
  .edge {
    fill: none; stroke: var(--pura-border-strong); stroke-width: 2;
  }
  ::slotted(pura-flow-node) {
    position: absolute; z-index: 1;
  }
`;

const NODE_CSS = `
  :host { display: block; position: absolute; }
  :host(.dragging) { z-index: 2; }
  .node {
    min-width: 7rem; user-select: none; cursor: grab;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
    padding: var(--pura-space-2) var(--pura-space-3);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .node:hover { border-color: var(--pura-fg); }
  :host(.dragging) .node {
    cursor: grabbing; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring), var(--pura-shadow);
  }
  :host(.readonly) .node { cursor: default; }
  .label { display: block; font-size: var(--pura-text-sm); font-weight: 600; }
  .body { font-size: var(--pura-text-xs); color: var(--pura-muted); }
  .body:empty { display: none; }
`;

define("pura-flow", PuraFlow, meta);
define("pura-flow-node", PuraFlowNode);
define("pura-flow-edge", PuraFlowEdge);
export { PuraFlow, PuraFlowNode, PuraFlowEdge };
