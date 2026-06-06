// <pura-notification-item> — a single notification row (built like pura-item).
// Flex row: leading icon (slot="icon"), a middle column with a title (attr
// `title`) over a description (default slot, muted), a trailing time stamp
// (attr `time`) and an optional dismiss button. An unread dot marks the row
// when the `unread` attribute is present, and the whole row gets a hover
// highlight. Degrades gracefully with no attributes/children.
// Attributes:
//   title       — bold title text for the row (omit to hide the title line)
//   time        — short timestamp / relative time shown trailing (e.g. "2m ago")
//   unread      — boolean; shows the unread dot + emphasised styling
//   dismissible — boolean; renders a dismiss (×) button on the right
//   dismiss-label — accessible label for the dismiss button (default "Dispensar")
// Slots:
//   icon        — leading media (icon / avatar). Hidden when empty.
//   (default)   — description / body text. Hidden when empty.
// Events:
//   read    { id }   — fired when the row is marked read (unread removed)
//   dismiss { id }   — fired when the row is dismissed (before removal)
// Agent-native layer: stable data-pura-notification-* attributes mirror live
//   state and the instance registers in window.__puraNotificationItems keyed by
//   its data-pura-id. Agents can call .markRead(), .markUnread() and .dismiss()
//   to drive the component without touching the Shadow DOM.
import { PuraElement, define } from "../base.js";
import meta from "./notification-item.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "notification-item.dismiss": {
    en: "Dismiss",
    "pt-BR": "Dispensar",
    fr: "Ignorer",
    de: "Schließen",
    it: "Ignora",
  },
  "notification-item.unread": {
    en: "Unread",
    "pt-BR": "Não lida",
    fr: "Non lu",
    de: "Ungelesen",
    it: "Non letto",
  },
});

let uid = 0;

// Lazily-created global registry so agents can enumerate / read / drive every
// notification row on the page without reaching into the Shadow DOM. id -> el.
function registry() {
  return (window.__puraNotificationItems ||= new Map());
}

class PuraNotificationItem extends PuraElement {
  static observedAttributes = ["title", "time", "unread", "dismissible", "dismiss-label"];

  connectedCallback() {
    this._id = this.dataset.puraId || `pura-notification-item-${uid++}`;
    this.dataset.puraId = this._id;
    registry().set(this._id, this);

    this.render(
      `<div class="row" part="row">
         <span class="dot" part="dot" aria-hidden="true"></span>
         <span class="icon" part="icon"><slot name="icon"></slot></span>
         <span class="content" part="content">
           <span class="title" part="title">${escapeHtml(this._titleText())}</span>
           <span class="description" part="description"><slot></slot></span>
         </span>
         <span class="meta" part="meta">
           <time class="time" part="time"></time>
           <button class="dismiss" part="dismiss" type="button" hidden>
             <span aria-hidden="true">${CLOSE}</span>
           </button>
         </span>
       </div>`,
      CSS
    );

    this._row = this.$(".row");
    this._title = this.$(".title");
    this._time = this.$(".time");
    this._dismissBtn = this.$(".dismiss");
    this._iconSlot = this.$('slot[name="icon"]');
    // .description wraps the default (unnamed) slot
    this._descSlot = this.$(".description slot");

    this._onDismissClick = (e) => {
      e.stopPropagation();
      this.dismiss();
    };
    this._dismissBtn.addEventListener("click", this._onDismissClick);

    this._onSlotChange = () => this._sync();
    for (const slot of this.$$("slot")) slot.addEventListener("slotchange", this._onSlotChange);

    if (!this.hasAttribute("role")) this.setAttribute("role", "listitem");

    this._sync();

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    if (registry().get(this._id) === this) registry().delete(this._id);
    if (this._dismissBtn) this._dismissBtn.removeEventListener("click", this._onDismissClick);
    this._i18nOff?.();
  }

  // Update already-rendered i18n nodes in place on locale change (no re-render).
  // _sync() rewrites the dismiss aria-label and the host aria-label from t(...);
  // it adds no document/window listeners, so it is safe to re-run here.
  _applyI18n() {
    this._sync();
  }

  attributeChangedCallback() {
    if (this._row) this._sync();
  }

  // ---- config getters -----------------------------------------------------
  get unread() {
    return this.hasAttribute("unread");
  }

  get dismissible() {
    return this.hasAttribute("dismissible");
  }

  _titleText() {
    return this.getAttribute("title") || "";
  }

  _timeText() {
    return this.getAttribute("time") || "";
  }

  // ---- public API ---------------------------------------------------------
  // Mark the row as read (removes the unread state). Returns true if it changed.
  markRead() {
    if (!this.unread) return false;
    this.removeAttribute("unread");
    this.dispatchEvent(new CustomEvent("read", { detail: { id: this._id }, bubbles: true }));
    return true;
  }

  // Mark the row unread again.
  markUnread() {
    if (this.unread) return false;
    this.setAttribute("unread", "");
    return true;
  }

  // Dismiss the row: fire `dismiss` then remove from the DOM. Agents call this.
  dismiss() {
    const evt = new CustomEvent("dismiss", {
      detail: { id: this._id },
      bubbles: true,
      cancelable: true,
    });
    this.dispatchEvent(evt);
    if (!evt.defaultPrevented) this.remove();
    return !evt.defaultPrevented;
  }

  // ---- sync DOM + ARIA + agent mirror -------------------------------------
  _sync() {
    if (!this._row) return;

    // title line: text from attr, hidden when empty
    const title = this._titleText();
    if (this._title) this._title.textContent = title;

    // time stamp: hidden when empty; datetime mirrors the literal value
    const time = this._timeText();
    if (this._time) {
      this._time.textContent = time;
      if (time) this._time.setAttribute("datetime", time);
      else this._time.removeAttribute("datetime");
    }

    // dismiss button: present only when dismissible
    if (this._dismissBtn) {
      this._dismissBtn.hidden = !this.dismissible;
      this._dismissBtn.setAttribute(
        "aria-label",
        this.getAttribute("dismiss-label") || t("notification-item.dismiss")
      );
    }

    // hide leading icon slot when nothing is assigned
    const hasIcon = this._iconSlot && this._iconSlot.assignedNodes().length > 0;
    this.toggleAttribute("data-has-icon", hasIcon);

    const hasDesc =
      this._descSlot && this._descSlot.assignedNodes({ flatten: true }).some(
        (n) => n.nodeType !== Node.TEXT_NODE || n.textContent.trim() !== ""
      );

    this._reflectAgentState(title, time, hasIcon, hasDesc);
  }

  // Stable machine-readable mirror of state on the host element so agents can
  // enumerate and read notifications without entering the Shadow DOM.
  _reflectAgentState(title, time, hasIcon, hasDesc) {
    this.setAttribute("data-pura-notification", "item");
    this.setAttribute("data-pura-notification-state", this.unread ? "unread" : "read");
    this.setAttribute("data-pura-notification-dismissible", this.dismissible ? "true" : "false");
    this.setAttribute("data-pura-notification-title", title);
    this.setAttribute("data-pura-notification-time", time);
    this.setAttribute("data-pura-notification-has-icon", hasIcon ? "true" : "false");
    this.setAttribute("data-pura-notification-has-description", hasDesc ? "true" : "false");
    // expose the unread state to assistive tech without overriding an author role
    const label = [
      this.unread ? t("notification-item.unread") : null,
      title,
      time,
    ].filter(Boolean).join(", ");
    if (label) this.setAttribute("aria-label", label);
    else this.removeAttribute("aria-label");
  }
}

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

define("pura-notification-item", PuraNotificationItem, meta);
export { PuraNotificationItem };
