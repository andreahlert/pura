// Pure render for <pura-chat-bubble>. No DOM; safe on server (SSR/DSD) and client.
import { EMPTY_SHIM } from "../base.js";

export function chatBubbleTemplate(el = EMPTY_SHIM) {
  const html = `<div part="bubble" class="bubble">
         <span part="avatar" class="avatar"><slot name="avatar"></slot></span>
         <div part="content" class="content">
           <div part="message" class="message"><slot></slot></div>
           <time part="time" class="time"></time>
         </div>
       </div>`;
  return { html, css: CHAT_BUBBLE_CSS };
}

export const CHAT_BUBBLE_CSS = `
  :host { display: block; }

  .bubble {
    display: flex; align-items: flex-end; gap: var(--pura-space-2);
    max-width: 100%;
  }
  :host([side="sent"]) .bubble { flex-direction: row-reverse; }

  .avatar {
    flex: 0 0 auto;
    width: 1.75rem; height: 1.75rem;
    border-radius: var(--pura-radius-full);
    overflow: hidden; display: inline-flex;
    align-items: center; justify-content: center;
    background: var(--pura-subtle); color: var(--pura-muted-fg);
    font-size: var(--pura-text-xs); font-weight: 550;
    user-select: none;
  }
  .avatar ::slotted(img) { width: 100%; height: 100%; object-fit: cover; display: block; }

  .content {
    display: flex; flex-direction: column;
    min-width: 0; max-width: min(34rem, 78%);
  }
  :host([side="sent"]) .content { align-items: flex-end; }

  .message {
    position: relative;
    padding: var(--pura-space-2) var(--pura-space-3);
    border-radius: var(--pura-radius-lg);
    font-size: var(--pura-text-sm); line-height: 1.5;
    word-wrap: break-word; overflow-wrap: anywhere;
    background: var(--pura-subtle); color: var(--pura-fg);
    border: 1px solid var(--pura-border);
  }
  :host([side="sent"]) .message {
    background: var(--pura-primary); color: var(--pura-primary-fg);
    border-color: transparent;
  }

  /* Asymmetric corner toward the speaker for a chat feel. */
  :host(:not([side="sent"])) .message { border-bottom-left-radius: var(--pura-radius-sm); }
  :host([side="sent"]) .message { border-bottom-right-radius: var(--pura-radius-sm); }

  /* Optional tail. */
  :host([tail]) .message::after {
    content: ""; position: absolute; bottom: 0;
    width: 0.5rem; height: 0.5rem;
    background: inherit;
  }
  :host([tail]:not([side="sent"])) .message::after {
    left: -0.25rem;
    border-bottom-left-radius: 0.125rem;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
    border-left: 1px solid var(--pura-border);
    border-bottom: 1px solid var(--pura-border);
  }
  :host([tail][side="sent"]) .message::after {
    right: -0.25rem;
    border-bottom-right-radius: 0.125rem;
    clip-path: polygon(0 0, 100% 100%, 0 100%);
  }

  .time {
    margin-top: var(--pura-space-1);
    padding: 0 var(--pura-space-1);
    font-size: var(--pura-text-xs); color: var(--pura-muted);
    line-height: 1; white-space: nowrap;
  }
`;
