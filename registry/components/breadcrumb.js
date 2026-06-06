// <pura-breadcrumb> — breadcrumb navigation. Renders nav[aria-label=breadcrumb]
// > ol as a flex row of small muted items. Slot default = the items.
// <pura-breadcrumb-item> — one crumb. Default slot = label. Attributes: href (renders an
// <a>), current (aria-current=page, non-link foreground color). A chevron '/'
// separator is auto-inserted BEFORE every item except the first.
import { PuraElement, define } from "../base.js";
import meta from "./breadcrumb.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "breadcrumb.label": {
    en: "breadcrumb",
    "pt-BR": "trilha de navegação",
    fr: "fil d'Ariane",
    de: "Brotkrümelnavigation",
    it: "briciole di pane",
  },
});

class PuraBreadcrumb extends PuraElement {
  connectedCallback() {
    this.render(
      `<nav part="nav" aria-label="${t("breadcrumb.label")}">
         <ol part="list"><slot></slot></ol>
       </nav>`,
      NAV_CSS
    );
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  _applyI18n() {
    const nav = this.shadowRoot?.querySelector('[part="nav"]');
    if (nav) nav.setAttribute("aria-label", t("breadcrumb.label"));
  }
}

class PuraBreadcrumbItem extends PuraElement {
  static observedAttributes = ["href", "current"];

  connectedCallback() {
    this._sync();
  }

  attributeChangedCallback() {
    if (this.isConnected) this._sync();
  }

  _sync() {
    const href = this.getAttribute("href");
    const current = this.hasAttribute("current");
    // current pages and item without href render as plain text; otherwise a link.
    const inner =
      href && !current
        ? `<a part="link" href="${href}"><slot></slot></a>`
        : `<span part="page"${current ? ` aria-current="page"` : ""}><slot></slot></span>`;
    this.render(`<li part="item">${inner}</li>`, ITEM_CSS);
  }
}

const NAV_CSS = `
  :host { display: block; }
  ol {
    display: flex; flex-wrap: wrap; align-items: center;
    gap: var(--pura-space-2);
    margin: 0; padding: 0; list-style: none;
    font-size: var(--pura-text-sm); color: var(--pura-muted);
  }
`;

const ITEM_CSS = `
  :host {
    display: inline-flex; align-items: center;
    gap: var(--pura-space-2);
    color: var(--pura-muted);
  }
  /* auto chevron before every item except the first */
  :host(:not(:first-child))::before {
    content: "/";
    color: var(--pura-muted);
    user-select: none;
    font-size: var(--pura-text-sm);
  }
  li {
    display: inline-flex; align-items: center;
    margin: 0; padding: 0;
  }
  [part="link"] {
    color: var(--pura-muted); text-decoration: none;
    transition: color var(--pura-dur) var(--pura-ease);
    border-radius: var(--pura-radius-sm);
  }
  [part="link"]:hover { color: var(--pura-fg); }
  [part="link"]:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  /* current / non-link page uses the strong foreground color */
  [part="page"] { color: var(--pura-fg); font-weight: 450; }
`;

define("pura-breadcrumb", PuraBreadcrumb, meta);
define("pura-breadcrumb-item", PuraBreadcrumbItem);
export { PuraBreadcrumb, PuraBreadcrumbItem };
