// Pure render(s) for <breadcrumb> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function breadcrumbTemplate(el = EMPTY_SHIM) {
  const html = `<nav part="nav" aria-label="${t("breadcrumb.label")}">
         <ol part="list"><slot></slot></ol>
       </nav>`;
  return { html, css: BREADCRUMB_CSS };
}

export const BREADCRUMB_CSS = `
  :host { display: block; }
  ol {
    display: flex; flex-wrap: wrap; align-items: center;
    gap: var(--pura-space-2);
    margin: 0; padding: 0; list-style: none;
    font-size: var(--pura-text-sm); color: var(--pura-muted);
  }
`;
