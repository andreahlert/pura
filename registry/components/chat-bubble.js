// <pura-chat-bubble> — a single chat message bubble.
// Attributes:
//   side  — received (default) | sent. Sent aligns right w/ primary color;
//           received aligns left w/ subtle bg.
//   time  — optional timestamp string shown under the message.
//   tail  — boolean; draws a small pointer tail toward the speaker's side.
// Slots:
//   avatar       — named slot for an avatar (image/initials). Hidden if empty.
//   (default)    — the message text/content.
// Agent-native layer: role="listitem" + data-* (data-pura-component,
//   data-side, data-time, data-has-avatar) and an aria-label summarizing the
//   message so assistive tech and agents can read direction + content + time.
import { PuraElement, define } from "../base.js";
import meta from "./chat-bubble.meta.js";

class PuraChatBubble extends PuraElement {
  static observedAttributes = ["side", "time", "tail"];

  connectedCallback() {
    this.render(
      `<div part="bubble" class="bubble">
         <span part="avatar" class="avatar"><slot name="avatar"></slot></span>
         <div part="content" class="content">
           <div part="message" class="message"><slot></slot></div>
           <time part="time" class="time"></time>
         </div>
       </div>`,
      CSS
    );

    this._avatarWrap = this.$(".avatar");
    this._avatarSlot = this.$('slot[name="avatar"]');
    this._timeEl = this.$(".time");

    const updAvatar = () => {
      const has = this._avatarSlot.assignedNodes().length > 0;
      this._avatarWrap.style.display = has ? "" : "none";
      this.setAttribute("data-has-avatar", has ? "true" : "false");
    };
    this._avatarSlot.addEventListener("slotchange", updAvatar);
    updAvatar();

    this._sync();
  }

  attributeChangedCallback() {
    if (this._timeEl) this._sync();
  }

  _sync() {
    const side = this.getAttribute("side") === "sent" ? "sent" : "received";
    const time = this.getAttribute("time") || "";

    this._timeEl.textContent = time;
    this._timeEl.style.display = time ? "" : "none";

    // Agent-native / machine-readable layer.
    this.setAttribute("role", "listitem");
    this.setAttribute("data-pura-component", "chat-bubble");
    this.setAttribute("data-side", side);
    if (time) this.setAttribute("data-time", time);
    else this.removeAttribute("data-time");

    const dir = side === "sent" ? "Sent message" : "Received message";
    const text = (this.textContent || "").trim().replace(/\s+/g, " ");
    const parts = [dir];
    if (text) parts.push(text);
    if (time) parts.push(`at ${time}`);
    this.setAttribute("aria-label", parts.join(": ").replace(": at", ", at"));
  }
}

const CSS = `
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

define("pura-chat-bubble", PuraChatBubble, meta);
export { PuraChatBubble };
