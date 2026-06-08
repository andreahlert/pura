// Pure render for <pura-comment>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function commentTemplate(el = EMPTY_SHIM) {
  const html = `<article part="comment" class="comment">
         <div part="avatar" class="avatar" aria-hidden="true"></div>
         <div class="main">
           <div part="header" class="header">
             <span part="author" class="author"></span>
             <time part="time" class="time"></time>
           </div>
           <div part="body" class="body"><slot></slot></div>
           <div part="actions" class="actions"><slot name="actions"></slot></div>
         </div>
       </article>`;
  return { html, css: COMMENT_CSS };
}

export const COMMENT_CSS = `
  :host { display: block; }

  .comment {
    display: flex;
    gap: var(--pura-space-3);
    align-items: flex-start;
  }

  .avatar {
    flex: 0 0 auto;
    position: relative;
    width: 2.25rem; height: 2.25rem;
    border-radius: var(--pura-radius-full);
    overflow: hidden;
    display: inline-grid; place-items: center;
    background: var(--pura-subtle); color: var(--pura-muted-fg);
    font-size: var(--pura-text-sm); font-weight: 600;
    user-select: none;
    box-shadow: inset 0 0 0 1px var(--pura-border);
    z-index: 1;
  }
  .avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .avatar .ini {
    display: grid; place-items: center; width: 100%; height: 100%;
    text-transform: uppercase;
  }
  :host([nested]) .avatar {
    width: 1.875rem; height: 1.875rem;
    font-size: var(--pura-text-xs);
  }

  .main {
    flex: 1 1 auto;
    min-width: 0;
    display: flex; flex-direction: column;
    gap: var(--pura-space-1);
  }

  .header {
    display: flex; align-items: baseline;
    gap: var(--pura-space-2);
    flex-wrap: wrap;
    line-height: 1.2;
  }
  .author {
    font-size: var(--pura-text-sm); font-weight: 600;
    color: var(--pura-fg);
  }
  .time {
    font-size: var(--pura-text-xs);
    color: var(--pura-muted);
    white-space: nowrap;
  }

  .body {
    font-size: var(--pura-text-sm);
    color: var(--pura-muted-fg);
    line-height: 1.6;
    word-wrap: break-word; overflow-wrap: anywhere;
  }

  .actions {
    display: flex; align-items: center;
    gap: var(--pura-space-3);
    margin-top: var(--pura-space-1);
  }
  .actions ::slotted(*) { font-size: var(--pura-text-xs); }

  /* Nested replies render inside the default slot, after the body text. They
     are indented under the main column and get a vertical connector line down
     the left gutter, with an elbow joining each reply's avatar. */
  ::slotted(pura-comment) {
    display: block;
    position: relative;
    margin-top: var(--pura-space-4);
    padding-left: var(--pura-space-5);
  }
  /* Connector line running down the indent gutter of each reply. */
  ::slotted(pura-comment)::before {
    content: "";
    position: absolute;
    left: var(--pura-space-2);
    top: 0; bottom: 0;
    width: 1px;
    background: var(--pura-border);
  }
  /* Curved elbow joining the connector line to the reply's avatar. */
  ::slotted(pura-comment)::after {
    content: "";
    position: absolute;
    left: var(--pura-space-2);
    top: 1.125rem;
    width: calc(var(--pura-space-5) - var(--pura-space-2));
    height: 0;
    border-top: 1px solid var(--pura-border);
  }
`;
