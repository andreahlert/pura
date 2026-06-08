// <pura-sidebar> — app sidebar (shadcn Sidebar, simplified). A vertical panel
// with a header (slot name="header"), a scrollable nav body (default slot), and
// a footer (slot name="footer"). Built on the native <dialog> element so the
// SAME slotted content serves both the inline desktop panel and the mobile
// off-canvas overlay (focus trap + ESC + backdrop come free on small screens).
// Attributes:
//   collapsible — enables collapsing to an icon rail.
//   collapsed   — narrow icon rail; hides labels (only when collapsible).
// API: .toggle() (flip collapsed), .openMobile() / .closeMobile().
// On max-width:768px the panel becomes a modal off-canvas drawer (left side).
//
// <pura-sidebar-item> — a single nav entry. Slots: icon (slot name="icon"),
// default slot = label. Attributes: href (renders an <a>, else a <button>),
// active (highlighted, aria-current="page"). Reflects the parent sidebar's
// collapsed state so labels hide on the rail.
import { PuraElement, define } from "../base.js";
import meta from "./sidebar.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { sidebarTemplate } from "./sidebar.template.js";

registerMessages({
  "sidebar.label": {
    en: "Sidebar",
    "pt-BR": "Barra lateral",
    fr: "Barre latérale",
    de: "Seitenleiste",
    it: "Barra laterale",
  },
});

class PuraSidebar extends PuraElement {
  static observedAttributes = ["collapsed", "collapsible"];

  connectedCallback() {
    const { html, css } = sidebarTemplate(this);
    this.render(html, css);
    this._dlg = this.$("dialog");
    this._slot = this.$("nav slot");
    this._dlg.addEventListener("close", () => {
      if (this._mobile) this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
    });
    this._dlg.addEventListener("click", (e) => {
      if (this._mobile && e.target === this._dlg) this.closeMobile();
    });

    const footSlot = this.$('slot[name="footer"]');
    const foot = this.$("footer");
    const headSlot = this.$('slot[name="header"]');
    const head = this.$("header");
    const upd = () => {
      foot.style.display = footSlot.assignedNodes().length ? "" : "none";
      head.style.display = headSlot.assignedNodes().length ? "" : "none";
    };
    footSlot.addEventListener("slotchange", upd);
    headSlot.addEventListener("slotchange", upd);
    upd();

    // Propagate collapsed state to child items (crosses the shadow boundary).
    this._slot.addEventListener("slotchange", () => this._syncItems());
    this._syncItems();

    // Responsive mode: inline on desktop, modal overlay on mobile.
    this._mq = window.matchMedia("(max-width: 768px)");
    this._onMq = () => this._applyMode();
    this._mq.addEventListener("change", this._onMq);
    this._applyMode();

    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._mq?.removeEventListener("change", this._onMq);
    this._i18nOff?.();
  }

  // Update the already-rendered i18n nodes in place (no re-render).
  _applyI18n() {
    this._dlg?.setAttribute("aria-label", t("sidebar.label"));
    this.$("nav")?.setAttribute("aria-label", t("sidebar.label"));
  }

  attributeChangedCallback(name) {
    if (!this._dlg) return;
    if (name === "collapsed") this._syncItems();
    if (name === "collapsible" || name === "collapsed") this._applyMode();
  }

  // Keep the dialog inline-open on desktop; closed (overlay) on mobile.
  _applyMode() {
    const mobile = this._mq ? this._mq.matches : false;
    this._mobile = mobile;
    if (mobile) {
      if (this._dlg.open && !this._modalOpen) this._dlg.close();
    } else {
      this._modalOpen = false;
      if (!this._dlg.open) this._dlg.show();
    }
  }

  _items() {
    return [...this.querySelectorAll("pura-sidebar-item")];
  }

  _syncItems() {
    const on = this.hasAttribute("collapsed") && this.hasAttribute("collapsible");
    for (const it of this._items()) it.toggleAttribute("collapsed", on);
  }

  // Flip the icon rail (only meaningful when collapsible).
  toggle() {
    if (!this.hasAttribute("collapsible")) return;
    this.toggleAttribute("collapsed");
  }

  openMobile() {
    if (!this._mobile || !this._dlg) return;
    if (this._dlg.open) this._dlg.close();
    this._modalOpen = true;
    this._dlg.showModal();
    this.dispatchEvent(new CustomEvent("open", { bubbles: true }));
  }

  closeMobile() {
    if (!this._dlg) return;
    this._modalOpen = false;
    if (this._dlg.open) this._dlg.close();
  }
}


class PuraSidebarItem extends PuraElement {
  static observedAttributes = ["active", "href", "collapsed"];

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name) {
    if (!this.shadowRoot.childElementCount) return;
    // href change swaps anchor/button; otherwise just re-render state.
    this._render();
  }

  _render() {
    const href = this.getAttribute("href");
    const active = this.hasAttribute("active");
    const tag = href != null ? "a" : "button";
    const attrs = href != null
      ? `href="${href}"`
      : `type="button"`;
    const current = active ? ` aria-current="page"` : "";
    this.render(
      `<${tag} class="item" part="item" ${attrs}${current}>
         <span class="icon" part="icon"><slot name="icon"></slot></span>
         <span class="label" part="label"><slot></slot></span>
       </${tag}>`,
      ITEM_CSS
    );
  }
}

const ITEM_CSS = `
  :host { display: block; }

  .item {
    display: flex; align-items: center; gap: var(--pura-space-3);
    width: 100%; box-sizing: border-box; text-align: left;
    padding: var(--pura-space-2) var(--pura-space-3);
    border: none; background: transparent; cursor: pointer;
    color: var(--pura-muted-fg); text-decoration: none;
    font-family: inherit; font-size: var(--pura-text-sm); font-weight: 500;
    line-height: 1.25rem; border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  .item:hover { background: var(--pura-subtle-hover); color: var(--pura-fg); }
  .item:focus-visible { outline: 2px solid var(--pura-ring); outline-offset: 1px; }
  :host([active]) .item {
    background: var(--pura-bg); color: var(--pura-fg);
    box-shadow: var(--pura-shadow-sm);
  }

  .icon { display: inline-flex; align-items: center; justify-content: center;
    flex: none; width: 1.25rem; height: 1.25rem; }
  .icon ::slotted(svg) { width: 1.25rem; height: 1.25rem; }
  .label { overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
    transition: opacity var(--pura-dur) var(--pura-ease); }

  /* Icon rail: hide labels, center the icon. */
  :host([collapsed]) .item { justify-content: center; gap: 0; padding-inline: var(--pura-space-2); }
  :host([collapsed]) .label { display: none; }
`;

define("pura-sidebar", PuraSidebar, meta);
define("pura-sidebar-item", PuraSidebarItem);
export { PuraSidebar, PuraSidebarItem };
