// Pure render for <pura-notification-item>. No DOM; SSR/DSD + client safe.
// The title comes from the [title] attribute; time and dismiss state are filled
// at runtime by _sync(). Under EMPTY_SHIM no attribute is set so the title is ""
// (CSS-hidden), the <time> is empty, and the dismiss button stays hidden.
import { EMPTY_SHIM } from "../base.js";

// Minimal escaping for the title interpolated into the template string.
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Inline × glyph via currentColor; no external assets.
const CLOSE =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">` +
  `<path d="M18 6L6 18M6 6l12 12"/>` +
  `</svg>`;

const CSS = `
  :host { display: block; }

  .row {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: var(--pura-space-3);
    padding: var(--pura-space-3) var(--pura-space-4);
    color: var(--pura-fg);
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--pura-radius);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }

  /* hover highlight on the whole row */
  .row:hover { background: var(--pura-subtle); }

  /* unread dot — leading accent marker, hidden until [unread] */
  .dot {
    flex: 0 0 auto;
    width: 0.5rem; height: 0.5rem;
    margin-top: 0.4rem;
    border-radius: 50%;
    background: var(--pura-accent);
    opacity: 0;
    transform: scale(0.6);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  :host([unread]) .dot { opacity: 1; transform: none; }

  /* leading media: icons, avatars */
  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    color: var(--pura-muted-fg);
    font-size: var(--pura-text-lg);
  }
  .icon slot::slotted(*) { display: block; }
  /* collapse the icon column when nothing is slotted */
  :host(:not([data-has-icon])) .icon { display: none; }

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
  /* hide the title line entirely when there is no title text */
  .title:empty { display: none; }
  /* unread rows get a slightly stronger title */
  :host([unread]) .title { font-weight: 600; }

  .description {
    display: block;
    font-size: var(--pura-text-sm);
    line-height: 1.4;
    color: var(--pura-muted);
  }
  /* hide the description line when the default slot is empty */
  :host(:not([data-pura-notification-has-description="true"])) .description { display: none; }

  /* trailing meta column: timestamp + dismiss */
  .meta {
    display: inline-flex;
    align-items: center;
    gap: var(--pura-space-2);
    flex: 0 0 auto;
    margin-left: auto;
  }

  .time {
    font-size: var(--pura-text-xs);
    color: var(--pura-muted);
    white-space: nowrap;
  }
  .time:empty { display: none; }

  /* dismiss button — icon-only ghost button */
  .dismiss {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem; height: 1.5rem;
    padding: 0;
    font: inherit;
    cursor: pointer;
    color: var(--pura-muted);
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease);
  }
  .dismiss[hidden] { display: none; }
  .dismiss svg { display: block; }
  .dismiss:hover { background: var(--pura-subtle-hover); color: var(--pura-fg); }
  .dismiss:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .dismiss:active { background: var(--pura-subtle-hover); }
`;

export function notificationItemTemplate(el = EMPTY_SHIM) {
  // _titleText(): the [title] attribute or "".
  const titleText = el.getAttribute("title") || "";
  const html = `<div class="row" part="row">
         <span class="dot" part="dot" aria-hidden="true"></span>
         <span class="icon" part="icon"><slot name="icon"></slot></span>
         <span class="content" part="content">
           <span class="title" part="title">${escapeHtml(titleText)}</span>
           <span class="description" part="description"><slot></slot></span>
         </span>
         <span class="meta" part="meta">
           <time class="time" part="time"></time>
           <button class="dismiss" part="dismiss" type="button" hidden>
             <span aria-hidden="true">${CLOSE}</span>
           </button>
         </span>
       </div>`;
  return { html, css: CSS };
}
