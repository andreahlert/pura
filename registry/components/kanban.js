// <pura-kanban> — a board with native HTML5 drag-and-drop. Compose with
// <pura-kanban-column label="To Do"> and <pura-kanban-card> children.
// Cards drag between (and within) columns; the board emits a 'change' event
// (bubbles) with { card, from, to, index } after a move, and each column keeps
// a live count. Keyboard: cards are focusable; Space/Enter "lifts" a card and
// arrow Left/Right moves it to the previous/next column.
//
// <pura-kanban>            attrs: — ; slot: pura-kanban-column children
// <pura-kanban-column>     attrs: label, count (auto) ; slot: pura-kanban-card children + slot name="footer"
// <pura-kanban-card>       attrs: — ; default slot: card content
// Events: 'change' { card, from, to, index } on the board after a drop/keyboard move.
import { PuraElement, define } from "../base.js";
import meta from "./kanban.meta.js";
import { kanbanTemplate, kanbanCardTemplate } from "./kanban.template.js";

// the card currently being dragged (DataTransfer can't carry a DOM ref)
let DRAGGING = null;

class PuraKanban extends PuraElement {
  connectedCallback() {
    const { html, css } = kanbanTemplate(this);
    this.render(html, css);
  }
  get columns() { return [...this.querySelectorAll(":scope > pura-kanban-column")]; }
}

class PuraKanbanColumn extends PuraElement {
  static observedAttributes = ["label"];

  connectedCallback() {
    this.render(
      `<section part="column" class="col">
         <header part="header" class="head">
           <span class="label" part="label">${esc(this.getAttribute("label"))}</span>
           <span class="count" part="count">0</span>
         </header>
         <div part="body" class="body"><slot></slot></div>
         <div part="footer" class="foot"><slot name="footer"></slot></div>
       </section>`,
      COL_CSS
    );
    this._body = this.$(".body");
    this._count = this.$(".count");

    const slot = this.$('slot:not([name])');
    slot.addEventListener("slotchange", () => this._sync());
    this._sync();

    // drop zone (cards are light-DOM children, so listen on the host)
    this.addEventListener("dragover", (e) => {
      if (!DRAGGING) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      this.classList.add("over");
      const after = this._afterElement(e.clientY);
      if (after == null) { if (DRAGGING.parentElement !== this || DRAGGING.nextElementSibling) this.appendChild(DRAGGING); }
      else if (after !== DRAGGING) this.insertBefore(DRAGGING, after);
    });
    this.addEventListener("dragleave", (e) => { if (!this.contains(e.relatedTarget)) this.classList.remove("over"); });
    this.addEventListener("drop", (e) => {
      if (!DRAGGING) return;
      e.preventDefault();
      this.classList.remove("over");
      const card = DRAGGING;
      const to = this, from = card._fromColumn || this;
      const index = [...this.querySelectorAll(":scope > pura-kanban-card")].indexOf(card);
      this._sync(); from._sync && from._sync();
      this.dispatchEvent(new CustomEvent("change", { detail: { card, from, to, index }, bubbles: true }));
    });
  }

  attributeChangedCallback(n) {
    if (n === "label" && this.$(".label")) this.$(".label").textContent = this.getAttribute("label") || "";
  }

  // the card we should insert BEFORE for a given pointer Y (null = append)
  _afterElement(y) {
    const cards = [...this.querySelectorAll(":scope > pura-kanban-card:not(.dragging)")];
    for (const c of cards) { const r = c.getBoundingClientRect(); if (y < r.top + r.height / 2) return c; }
    return null;
  }

  _sync() {
    if (this._count) this._count.textContent = this.querySelectorAll(":scope > pura-kanban-card").length;
  }
}

class PuraKanbanCard extends PuraElement {
  connectedCallback() {
    this.setAttribute("draggable", "true");
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
    const { html, css } = kanbanCardTemplate(this);
    this.render(html, css);

    this.addEventListener("dragstart", (e) => {
      DRAGGING = this;
      this._fromColumn = this.closest("pura-kanban-column");
      this.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      try { e.dataTransfer.setData("text/plain", this.textContent.trim()); } catch (_) {}
    });
    this.addEventListener("dragend", () => { this.classList.remove("dragging"); DRAGGING = null; });

    // keyboard move: Space/Enter lifts, ArrowLeft/Right moves columns
    this.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); this.classList.toggle("lifted"); this._lifted = this.classList.contains("lifted"); }
      else if (this._lifted && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        const board = this.closest("pura-kanban");
        const cols = board ? board.columns : [];
        const col = this.closest("pura-kanban-column");
        const i = cols.indexOf(col) + (e.key === "ArrowRight" ? 1 : -1);
        const target = cols[i];
        if (target) {
          const from = col;
          target.appendChild(this);
          this.focus();
          target._sync(); from._sync();
          board.dispatchEvent(new CustomEvent("change", { detail: { card: this, from, to: target }, bubbles: true }));
        }
      } else if (e.key === "Escape") { this.classList.remove("lifted"); this._lifted = false; }
    });
  }
}

function esc(v) { return v == null ? "" : String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }


const COL_CSS = `
  :host { display: block; }
  .col { display: flex; flex-direction: column; gap: var(--pura-space-3);
    background: var(--pura-subtle); border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg);
    padding: var(--pura-space-3); min-height: 6rem;
    transition: background var(--pura-dur) var(--pura-ease), border-color var(--pura-dur) var(--pura-ease); }
  :host(.over) .col { border-color: var(--pura-accent); background: color-mix(in srgb, var(--pura-accent) 7%, var(--pura-subtle)); }
  .head { display: flex; align-items: center; justify-content: space-between; padding: 0 var(--pura-space-1); }
  .label { font-size: var(--pura-text-sm); font-weight: 600; color: var(--pura-fg); }
  .count { font-size: var(--pura-text-xs); font-weight: 600; color: var(--pura-muted); background: var(--pura-bg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius-full); min-width: 1.25rem; text-align: center; padding: 1px 6px; }
  .body { display: flex; flex-direction: column; gap: var(--pura-space-2); min-height: 2rem; }
  .foot { margin-top: var(--pura-space-1); }
`;

define("pura-kanban", PuraKanban, meta);
define("pura-kanban-column", PuraKanbanColumn);
define("pura-kanban-card", PuraKanbanCard);
export { PuraKanban, PuraKanbanColumn, PuraKanbanCard };
