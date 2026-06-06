// <pura-comment> — a single comment in a threaded discussion.
// Attributes:
//   author  — display name of the commenter (shown bold in the header).
//   time    — timestamp string shown next to the author (rendered in <time>).
//   avatar  — optional image URL for the commenter's avatar; falls back to the
//             author's initials when absent or when the image fails to load.
// Slots:
//   (default) — the comment body (text/markup).
//   actions   — named slot for action controls (reply / like / …). Hidden if empty.
//   (light children) — nested <pura-comment> elements render as indented replies
//                      with a vertical connector line via the default slot.
// Agent-native layer: role="article" + stable data-* attributes
//   (data-pura-component, data-author, data-time, data-depth, data-reply-count)
//   and an aria-label summarizing author + body so assistive tech and agents
//   can read the thread structure. Each instance also registers itself in the
//   global window.__puraComments registry keyed by a stable id.
import { PuraElement, define } from "../base.js";
import meta from "./comment.meta.js";

let uid = 0;

// Lazily-created global registry of live comment instances. Agents can read
// window.__puraComments to walk the thread without touching the Shadow DOM.
function registry() {
  if (!window.__puraComments) window.__puraComments = new Map();
  return window.__puraComments;
}

// Derive up-to-two-letter initials from a name string.
function initialsOf(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

class PuraComment extends PuraElement {
  static observedAttributes = ["author", "time", "avatar"];

  connectedCallback() {
    if (!this._id) this._id = `pura-comment-${uid++}`;

    this.render(
      `<article part="comment" class="comment">
         <div part="avatar" class="avatar" aria-hidden="true"></div>
         <div class="main">
           <div part="header" class="header">
             <span part="author" class="author"></span>
             <time part="time" class="time"></time>
           </div>
           <div part="body" class="body"><slot></slot></div>
           <div part="actions" class="actions"><slot name="actions"></slot></div>
         </div>
       </article>`,
      CSS
    );

    this._avatarEl = this.$(".avatar");
    this._authorEl = this.$(".author");
    this._timeEl = this.$(".time");
    this._actionsWrap = this.$(".actions");
    this._actionsSlot = this.$('slot[name="actions"]');
    this._defaultSlot = this.$("slot:not([name])");

    // Hide the actions row when nothing is slotted into it.
    const updActions = () => {
      const has = this._actionsSlot.assignedNodes({ flatten: true }).length > 0;
      this._actionsWrap.style.display = has ? "" : "none";
    };
    this._actionsSlot.addEventListener("slotchange", updActions);
    updActions();

    // Track nested replies (light-DOM child <pura-comment> in the default slot)
    // so depth / connector line / reply-count stay in sync.
    this._defaultSlot.addEventListener("slotchange", () => this._sync());

    this._sync();
    registry().set(this._id, this);
  }

  disconnectedCallback() {
    registry().delete(this._id);
  }

  attributeChangedCallback() {
    if (this._authorEl) this._sync();
  }

  // Direct nested replies = child <pura-comment> elements (not deeper descendants).
  _replies() {
    return [...this.children].filter(
      (el) => el.tagName && el.tagName.toLowerCase() === "pura-comment"
    );
  }

  // Nesting depth: 0 for a top-level comment, +1 per ancestor <pura-comment>.
  _depth() {
    let d = 0;
    let p = this.parentElement;
    while (p) {
      if (p.tagName && p.tagName.toLowerCase() === "pura-comment") d++;
      p = p.parentElement;
    }
    return d;
  }

  _sync() {
    const author = this.getAttribute("author") || "";
    const time = this.getAttribute("time") || "";
    const avatar = this.getAttribute("avatar");
    const initials = initialsOf(author);

    // Header.
    this._authorEl.textContent = author || "Anonymous";
    this._timeEl.textContent = time;
    this._timeEl.style.display = time ? "" : "none";
    if (time) this._timeEl.setAttribute("datetime", time);
    else this._timeEl.removeAttribute("datetime");

    // Avatar: image if provided, otherwise initials. Rebuild only when source
    // changes to avoid clobbering a working <img> on every sync.
    if (this._avatarSrc !== avatar || this._avatarInitials !== initials) {
      this._avatarSrc = avatar;
      this._avatarInitials = initials;
      this._avatarEl.textContent = "";
      if (avatar) {
        const img = document.createElement("img");
        img.src = avatar;
        img.alt = "";
        img.addEventListener("error", () => {
          img.replaceWith(
            Object.assign(document.createElement("span"), {
              className: "ini",
              textContent: initials,
            })
          );
        });
        this._avatarEl.appendChild(img);
      } else {
        this._avatarEl.appendChild(
          Object.assign(document.createElement("span"), {
            className: "ini",
            textContent: initials,
          })
        );
      }
    }

    // Structure-aware state.
    const replies = this._replies();
    const depth = this._depth();
    this.toggleAttribute("nested", depth > 0);
    this.toggleAttribute("has-replies", replies.length > 0);

    // Agent-native / machine-readable layer.
    this.setAttribute("role", "article");
    this.setAttribute("data-pura-component", "comment");
    this.setAttribute("data-pura-id", this._id);
    this.setAttribute("data-depth", String(depth));
    this.setAttribute("data-reply-count", String(replies.length));
    if (author) this.setAttribute("data-author", author);
    else this.removeAttribute("data-author");
    if (time) this.setAttribute("data-time", time);
    else this.removeAttribute("data-time");

    // Body text for the summary label (own body, excluding nested replies).
    let bodyText = "";
    for (const node of this.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        bodyText += node.textContent;
      } else if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() !== "pura-comment" &&
        node.getAttribute("slot") !== "actions"
      ) {
        bodyText += node.textContent || "";
      }
    }
    bodyText = bodyText.trim().replace(/\s+/g, " ");

    const label = [`Comment by ${author || "Anonymous"}`];
    if (time) label.push(`at ${time}`);
    if (bodyText) label.push(bodyText);
    if (replies.length) {
      label.push(`${replies.length} ${replies.length === 1 ? "reply" : "replies"}`);
    }
    this.setAttribute("aria-label", label.join(", "));
  }
}

const CSS = `
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

define("pura-comment", PuraComment, meta);
export { PuraComment };
