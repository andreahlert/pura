// Pure render(s) for <faq> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function faqItemTemplate(el = EMPTY_SHIM) {
  const html = `<details part="item" ${el.hasAttribute("open") ? "open" : ""}>
         <summary part="trigger">
           <span class="q" part="question"><slot name="question"></slot></span>
           <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </summary>
         <div part="content"><div class="answer" part="answer"><slot></slot></div></div>
       </details>`;
  return { html, css: FAQ_ITEM_CSS };
}

export const FAQ_ITEM_CSS = `
  :host { display: block; }
  details { background: transparent; }
  summary {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); cursor: pointer; list-style: none;
    padding: var(--pura-space-4) var(--pura-space-5);
    font-size: var(--pura-text-sm); font-weight: 550; color: var(--pura-fg);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  summary::-webkit-details-marker { display: none; }
  summary::marker { content: ""; }
  summary:hover { background: var(--pura-subtle); }
  summary:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--pura-ring); }
  .q { min-width: 0; }
  .chev {
    width: 1rem; height: 1rem; color: var(--pura-muted); flex: none;
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  details[open] .chev { transform: rotate(180deg); }
  [part="content"] {
    padding: 0 var(--pura-space-5) var(--pura-space-4);
    font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.6;
  }
`;
