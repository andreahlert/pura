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
import { notificationItemTemplate } from "./notification-item.template.js";

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

    const { html, css } = notificationItemTemplate(this);
    this.render(html, css);

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

define("pura-notification-item", PuraNotificationItem, meta);
export { PuraNotificationItem };
