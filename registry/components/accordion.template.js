// Pure render(s) for <accordion> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function accordionItemTemplate(el = EMPTY_SHIM) {
  const html = `<details part="item" ${el.hasAttribute("open") ? "open" : ""}>
         <summary part="trigger">
           <span>${el.getAttribute("label") || ""}</span>
           <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </summary>
         <div part="content"><slot></slot></div>
       </details>`;
  return { html, css: ACCORDION_ITEM_CSS };
}

export function accordionTemplate(el = EMPTY_SHIM) {
  const html = `<slot></slot>`;
  return { html, css: `:host { display: block; border: 1px solid var(--pura-border); border-radius: var(--pura-radius-lg); overflow: hidden; }` };
}

export const ACCORDION_ITEM_CSS = `
  :host { display: block; }
  :host(:not(:last-child)) details { border-bottom: 1px solid var(--pura-border); }
  summary {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); cursor: pointer; list-style: none;
    padding: var(--pura-space-4) var(--pura-space-5);
    font-size: var(--pura-text-sm); font-weight: 550; color: var(--pura-fg);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  summary::-webkit-details-marker { display: none; }
  summary:hover { background: var(--pura-subtle); }
  summary:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--pura-ring); }
  .chev { width: 1rem; height: 1rem; color: var(--pura-muted); flex: none;
    transition: transform var(--pura-dur) var(--pura-ease); }
  details[open] .chev { transform: rotate(180deg); }
  [part="content"] { padding: 0 var(--pura-space-5) var(--pura-space-4);
    font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.6; }
`;
