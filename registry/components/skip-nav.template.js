// Pure render for <pura-skip-nav>. No DOM; SSR/DSD + client safe.
// href/label derive from attributes with defaults; `t` is module-global so the
// server form emits the real default-locale label. `esc` is inlined here (copy
// semantics) so the template never calls an instance method.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const CSS = `
  :host { display: contents; }

  .link {
    position: fixed; top: var(--pura-space-2); left: var(--pura-space-2);
    z-index: 1100;
    transform: translateY(-150%);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    text-decoration: none; white-space: nowrap;
    color: var(--pura-primary-fg); background: var(--pura-primary);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: var(--pura-space-2) var(--pura-space-4);
    box-shadow: var(--pura-shadow-lg);
    transition: transform var(--pura-dur) var(--pura-ease);
  }
  .link:focus-visible, .link:focus {
    outline: none;
    transform: translateY(0);
    box-shadow: 0 0 0 3px var(--pura-ring), var(--pura-shadow-lg);
  }
`;

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function skipNavTemplate(el = EMPTY_SHIM) {
  const href = el.getAttribute("href") || "#main";
  const label = el.getAttribute("label") || t("skip-nav.label");
  const html = `<a class="link" part="link" href="${esc(href)}">${esc(label)}</a>`;
  return { html, css: CSS };
}
