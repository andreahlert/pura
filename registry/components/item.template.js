// Pure render for <pura-item>. No DOM; SSR/DSD + client safe.
// The title row uses the [title] attribute as slot fallback; under EMPTY_SHIM no
// attribute is set so it falls back to "" (the empty title row is CSS-hidden).
import { EMPTY_SHIM } from "../base.js";

const CSS = `
  :host { display: block; }

  .item {
    display: flex;
    align-items: center;
    gap: var(--pura-space-3);
    padding: var(--pura-space-3) var(--pura-space-4);
    color: var(--pura-fg);
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--pura-radius);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }

  /* leading media: icons, avatars, thumbnails */
  .media {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    color: var(--pura-muted-fg);
  }
  .media slot::slotted(*) { display: block; }

  /* middle column grows to fill available space */
  .content {
    display: flex;
    flex-direction: column;
    gap: var(--pura-space-1);
    min-width: 0;
    flex: 1 1 auto;
  }

  .title {
    display: block;
    font-size: var(--pura-text-sm);
    font-weight: 550;
    line-height: 1.3;
    color: var(--pura-fg);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* hide the title row entirely when there is no title text or slotted node */
  .title:empty { display: none; }

  .description {
    display: block;
    font-size: var(--pura-text-sm);
    line-height: 1.4;
    color: var(--pura-muted);
  }

  /* trailing actions: buttons, menus, badges */
  .actions {
    display: inline-flex;
    align-items: center;
    gap: var(--pura-space-2);
    flex: 0 0 auto;
    margin-left: auto;
  }

  /* hover background */
  :host([hover]) .item:hover {
    background: var(--pura-subtle);
  }

  /* bordered: visible border + radius + subtle elevation */
  :host([bordered]) .item {
    border-color: var(--pura-border);
    box-shadow: var(--pura-shadow-sm);
  }

  /* clickable: pointer affordance + focus ring on the host */
  :host([clickable]) { cursor: pointer; }
  :host([clickable]) .item { cursor: pointer; }
  :host([clickable]:hover) .item { background: var(--pura-subtle); }
  :host([clickable][hover]:hover) .item { background: var(--pura-subtle-hover); }
  :host([clickable]:focus) { outline: none; }
  :host([clickable]:focus-visible) {
    outline: none;
  }
  :host([clickable]:focus-visible) .item {
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  :host([clickable]:active) .item { background: var(--pura-subtle-hover); }
`;

export function itemTemplate(el = EMPTY_SHIM) {
  // _titleText(): the [title] attribute or "".
  const titleText = el.getAttribute("title") || "";
  const html = `<div class="item" part="item">
         <span class="media" part="media"><slot name="media"></slot></span>
         <span class="content" part="content">
           <span class="title" part="title"><slot name="title">${titleText}</slot></span>
           <span class="description" part="description"><slot></slot></span>
         </span>
         <span class="actions" part="actions"><slot name="actions"></slot></span>
       </div>`;
  return { html, css: CSS };
}
