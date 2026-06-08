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
import { commentTemplate } from "./comment.template.js";

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

    const { html, css } = commentTemplate(this);
    this.render(html, css);

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


define("pura-comment", PuraComment, meta);
export { PuraComment };
