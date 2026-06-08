// Pure render(s) for <list> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function listItemTemplate(el = EMPTY_SHIM) {
  const html = `<li part="item"><slot></slot></li>`;
  return { html, css: LIST_ITEM_CSS };
}

export const LIST_ITEM_CSS = `
  :host { line-height: 1.7; }
  [part="item"] {
    margin: 0;
    list-style: inherit;
  }

  /* Inside a check-markered list, draw a tick and lay the row out as flex. */
  :host-context(pura-list[marker="check"]) [part="item"] {
    display: flex;
    gap: var(--pura-space-2);
    align-items: baseline;
    list-style: none;
  }
  :host-context(pura-list[marker="check"]) [part="item"]::before {
    content: "✓";
    color: var(--pura-success-fg);
    font-weight: 600;
    flex: none;
  }
`;
