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
import { chatBubbleTemplate } from "./chat-bubble.template.js";

class PuraChatBubble extends PuraElement {
  static observedAttributes = ["side", "time", "tail"];

  connectedCallback() {
    const { html, css } = chatBubbleTemplate(this);
    this.render(html, css);

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


define("pura-chat-bubble", PuraChatBubble, meta);
export { PuraChatBubble };
