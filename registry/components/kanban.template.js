// Pure render(s) for <kanban> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function kanbanTemplate(el = EMPTY_SHIM) {
  const html = `<div part="board" class="board" role="group"><slot></slot></div>`;
  return { html, css: KANBAN_CSS };
}

export function kanbanCardTemplate(el = EMPTY_SHIM) {
  const html = `<div part="card" class="card"><slot></slot></div>`;
  return { html, css: KANBAN_CARD_CSS };
}

export const KANBAN_CSS = `
  :host { display: block; }
  .board { display: flex; gap: var(--pura-space-4); align-items: flex-start; overflow-x: auto; padding-bottom: var(--pura-space-2); }
  ::slotted(pura-kanban-column) { flex: 0 0 clamp(220px, 22vw, 300px); }
`;

export const KANBAN_CARD_CSS = `
  :host { display: block; cursor: grab; }
  :host(.dragging) { opacity: .4; }
  :host(.lifted) .card { outline: 2px solid var(--pura-accent); outline-offset: 2px; }
  :host(:focus-visible) .card { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .card { background: var(--pura-bg); border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    padding: var(--pura-space-3); box-shadow: var(--pura-shadow-sm); font-size: var(--pura-text-sm); color: var(--pura-fg); }
  :host(:active) { cursor: grabbing; }
`;
