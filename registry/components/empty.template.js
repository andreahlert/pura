// Pure render for <pura-empty>. No DOM; SSR/DSD + client safe.
// `title` falls back to the named slot; under EMPTY_SHIM the attribute is absent
// so the slot fallback collapses to empty (no "null" leak).
import { EMPTY_SHIM } from "../base.js";

const CSS = `
  :host { display: block; }
  [part="empty"] {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; gap: var(--pura-space-2);
    padding: var(--pura-space-6) var(--pura-space-5);
    color: var(--pura-muted-fg);
  }
  .media {
    display: grid; place-items: center;
    width: 2.75rem; height: 2.75rem; margin-bottom: var(--pura-space-2);
    border-radius: var(--pura-radius-lg);
    background: var(--pura-subtle); color: var(--pura-muted);
    border: 1px solid var(--pura-border);
  }
  .media ::slotted(svg) { width: 1.4rem; height: 1.4rem; }
  .title {
    font-size: var(--pura-text-lg); font-weight: 600; line-height: 1.3;
    color: var(--pura-fg);
  }
  .desc {
    font-size: var(--pura-text-sm); line-height: 1.55; color: var(--pura-muted);
    max-width: 28rem;
  }
  .actions {
    display: flex; flex-wrap: wrap; align-items: center; justify-content: center;
    gap: var(--pura-space-2); margin-top: var(--pura-space-3);
  }
`;

export function emptyTemplate(el = EMPTY_SHIM) {
  const title = el.getAttribute("title");
  const html = `<div part="empty" role="status">
         <div class="media" part="icon"><slot name="icon"></slot></div>
         <div part="title" class="title">
           <slot name="title">${title ? title : ""}</slot>
         </div>
         <div part="description" class="desc"><slot></slot></div>
         <div class="actions" part="action"><slot name="action"></slot></div>
       </div>`;
  return { html, css: CSS };
}
