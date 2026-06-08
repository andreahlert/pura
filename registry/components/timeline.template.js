// Pure render(s) for <timeline> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";

export function timelineTemplate(el = EMPTY_SHIM) {
  const html = `<div part="list" class="list"><slot></slot></div>`;
  return { html, css: TIMELINE_CSS };
}

export function timelineItemTemplate(el = EMPTY_SHIM) {
  const html = `<div part="item" class="item">
         <div part="marker" class="marker" aria-hidden="true">
           <span part="dot" class="dot"></span>
           <span class="line"></span>
         </div>
         <div part="content" class="content">
           <div part="time" class="time"><slot name="time"></slot></div>
           <div part="title" class="title"><slot name="title"></slot></div>
           <div part="body" class="body"><slot></slot></div>
         </div>
       </div>`;
  return { html, css: TIMELINE_ITEM_CSS };
}

export const TIMELINE_CSS = `
  :host { display: block; }
  .list { display: block; }
`;

export const TIMELINE_ITEM_CSS = `
  :host { display: block; }

  .item {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: var(--pura-space-4);
  }

  /* marker column: the dot sits at the top, the connector line fills the rest */
  .marker {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 0.75rem;
  }
  .dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: var(--pura-radius-full);
    background: var(--pura-bg);
    border: 2px solid var(--pura-border-strong);
    box-shadow: var(--pura-shadow-sm);
    flex: none;
    margin-top: 0.2rem;
    z-index: 1;
  }
  .line {
    flex: 1 1 auto;
    width: 2px;
    background: var(--pura-border);
    margin-top: var(--pura-space-1);
  }
  /* the last item has no trailing connector */
  :host(:last-of-type) .line { display: none; }

  .content {
    padding-bottom: var(--pura-space-5);
    min-width: 0;
  }
  :host(:last-of-type) .content { padding-bottom: 0; }

  [part="time"] {
    font-size: var(--pura-text-xs);
    color: var(--pura-muted);
    line-height: 1.4;
  }
  [part="title"] {
    font-size: var(--pura-text-sm);
    font-weight: 600;
    color: var(--pura-fg);
    line-height: 1.4;
    margin-top: 0.1rem;
  }
  [part="body"] {
    font-size: var(--pura-text-sm);
    color: var(--pura-muted-fg);
    line-height: 1.6;
    margin-top: var(--pura-space-1);
  }

  /* dot variants — color/border driven entirely by tokens */
  :host([variant="primary"]) .dot { background: var(--pura-primary); border-color: var(--pura-primary); }
  :host([variant="success"]) .dot { background: var(--pura-success); border-color: var(--pura-success); }
  :host([variant="warning"]) .dot { background: var(--pura-warning); border-color: var(--pura-warning); }
  :host([variant="danger"])  .dot { background: var(--pura-danger);  border-color: var(--pura-danger); }
  :host([variant="info"])    .dot { background: var(--pura-info);    border-color: var(--pura-info); }
`;
