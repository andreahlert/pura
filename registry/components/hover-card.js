// <pura-hover-card> — non-modal informational card that reveals rich content on
// pointer hover and keyboard focus of its trigger. Built on the native Popover
// API (top layer + light dismiss + ESC for free) plus CSS anchor positioning,
// following the popover reference. Slots: trigger (the hover target), default
// slot = card content. Attributes: placement (bottom default | top | left |
// right), open-delay (ms, ~150 default), close-delay (ms, ~150 default), open.
import { PuraElement, define } from "../base.js";
import meta from "./hover-card.meta.js";
import { hoverCardTemplate } from "./hover-card.template.js";

let uid = 0;

class PuraHoverCard extends PuraElement {
  static observedAttributes = ["open"];

  connectedCallback() {
    this._name = `--pura-hovercard-${uid++}`;
    const { html, css } = hoverCardTemplate(this);
    this.render(html, css);
    this._trigger = this.$(".anchor");
    this._card = this.$("[popover]");
    this._timer = null;

    // Pointer + keyboard intent on the trigger.
    this._trigger.addEventListener("pointerenter", this._scheduleOpen);
    this._trigger.addEventListener("pointerleave", this._scheduleClose);
    this._trigger.addEventListener("focusin", this._scheduleOpen);
    this._trigger.addEventListener("focusout", this._scheduleClose);

    // Keep open while the pointer is over the card; close once it leaves both.
    this._card.addEventListener("pointerenter", this._scheduleOpen);
    this._card.addEventListener("pointerleave", this._scheduleClose);
    this._card.addEventListener("focusout", this._scheduleClose);

    // Esc dismisses; reflect state.
    this._card.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.hide();
    });
    this._card.addEventListener("toggle", (e) => {
      this.toggleAttribute("open", e.newState === "open");
      this.dispatchEvent(
        new CustomEvent(e.newState === "open" ? "open" : "close", { bubbles: true })
      );
    });

    if (this.hasAttribute("open")) queueMicrotask(() => this._card.showPopover());
  }

  disconnectedCallback() {
    clearTimeout(this._timer);
  }

  attributeChangedCallback(name, oldV, newV) {
    if (!this._card || oldV === newV) return;
    if (name === "open") {
      const wantOpen = this.hasAttribute("open");
      const isOpen = this._card.matches(":popover-open");
      if (wantOpen && !isOpen) this._card.showPopover();
      else if (!wantOpen && isOpen) this._card.hidePopover();
    }
  }

  _ms(attr, fallback) {
    const v = parseInt(this.getAttribute(attr), 10);
    return Number.isFinite(v) ? v : fallback;
  }

  // Arrow methods so listeners bind to the instance; cancel any pending timer.
  _scheduleOpen = () => {
    clearTimeout(this._timer);
    if (this._card.matches(":popover-open")) return;
    this._timer = setTimeout(() => this._card.showPopover(), this._ms("open-delay", 150));
  };

  _scheduleClose = () => {
    clearTimeout(this._timer);
    if (!this._card.matches(":popover-open")) return;
    this._timer = setTimeout(() => this._card.hidePopover(), this._ms("close-delay", 150));
  };

  show() {
    clearTimeout(this._timer);
    this._card?.showPopover();
  }
  hide() {
    clearTimeout(this._timer);
    this._card?.hidePopover();
  }
}


define("pura-hover-card", PuraHoverCard, meta);
export { PuraHoverCard };
