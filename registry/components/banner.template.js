// Pure render for <pura-banner>. No DOM; SSR/DSD + client safe.
// variant/title/message/dismissible derive from attributes; under EMPTY_SHIM the
// strip degrades to an info banner with empty title/message slots and no close
// button. `t` is module-global so the region label resolves to the default locale.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

const VARIANTS = new Set(["info", "success", "warning", "danger", "promo"]);

// Inline SVG glyphs per variant. `promo` gets a sparkle; the rest mirror the
// shared status iconography used across alert/toast.
const ICONS = {
  info: '<path d="M12 16v-4M12 8h.01" stroke-width="2"/><circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/>',
  success: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/><path d="M8 12l3 3 5-6" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  warning: '<path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  danger: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/><path d="M12 8v5M12 16h.01" stroke-width="2" stroke-linecap="round"/>',
  promo: '<path d="M12 3l1.9 4.8L19 9l-4 3.4 1.3 5.1L12 15l-4.3 2.5L9 12.4 5 9l5.1-1.2z" fill="none" stroke-width="2" stroke-linejoin="round"/>',
};

// Minimal escaping for attribute-derived text interpolated into the template.
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const CSS = `
  :host { display: block; }
  :host([hidden]) { display: none !important; }
  :host([sticky]) { position: sticky; top: 0; z-index: 50; }

  [part="banner"] {
    display: flex; align-items: center; gap: var(--pura-space-3);
    width: 100%; padding: var(--pura-space-3) var(--pura-space-5);
    border-bottom: 1px solid var(--pura-border);
    background: var(--pura-subtle); color: var(--pura-fg);
    font-size: var(--pura-text-sm); line-height: 1.5;
  }

  .ico { width: 1.15rem; height: 1.15rem; flex: none; color: var(--pura-muted); }

  .body {
    display: flex; flex-wrap: wrap; align-items: baseline;
    gap: var(--pura-space-1) var(--pura-space-2);
    flex: 1; min-width: 0;
  }
  .title { font-weight: 600; }
  .message { color: var(--pura-muted-fg); min-width: 0; word-wrap: break-word; }

  .action { flex: none; display: inline-flex; align-items: center; gap: var(--pura-space-2); }

  .x {
    display: grid; place-items: center; width: 1.5rem; height: 1.5rem; flex: none;
    border: none; background: transparent; color: var(--pura-muted); cursor: pointer;
    border-radius: var(--pura-radius-sm);
    transition: background var(--pura-dur) var(--pura-ease), color var(--pura-dur) var(--pura-ease);
  }
  .x:hover { background: color-mix(in srgb, currentColor 12%, transparent); color: var(--pura-fg); }
  .x:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .x svg { width: 0.95rem; height: 0.95rem; }

  /* variants — colours from existing tokens only */
  :host([variant="info"]) [part="banner"] { background: var(--pura-info-bg); border-color: color-mix(in srgb, var(--pura-info) 25%, transparent); }
  :host([variant="info"]) .ico { color: var(--pura-info); }

  :host([variant="success"]) [part="banner"] { background: var(--pura-success-bg); border-color: color-mix(in srgb, var(--pura-success) 25%, transparent); }
  :host([variant="success"]) .ico { color: var(--pura-success-fg); }

  :host([variant="warning"]) [part="banner"] { background: var(--pura-warning-bg); border-color: color-mix(in srgb, var(--pura-warning) 25%, transparent); }
  :host([variant="warning"]) .ico { color: var(--pura-warning); }

  :host([variant="danger"]) [part="banner"] { background: var(--pura-danger-bg); border-color: color-mix(in srgb, var(--pura-danger) 25%, transparent); }
  :host([variant="danger"]) .ico { color: var(--pura-danger); }

  /* promo — no dedicated token set; built from the accent + primary surface */
  :host([variant="promo"]) [part="banner"] {
    background: var(--pura-primary); color: var(--pura-primary-fg);
    border-color: transparent;
  }
  :host([variant="promo"]) .ico { color: var(--pura-primary-fg); }
  :host([variant="promo"]) .message { color: color-mix(in srgb, var(--pura-primary-fg) 80%, transparent); }
  :host([variant="promo"]) .x { color: color-mix(in srgb, var(--pura-primary-fg) 70%, transparent); }
  :host([variant="promo"]) .x:hover { color: var(--pura-primary-fg); }

  @media (max-width: 30rem) {
    [part="banner"] { flex-wrap: wrap; }
    .action { width: 100%; }
  }
`;

export function bannerTemplate(el = EMPTY_SHIM) {
  const vv = el.getAttribute("variant");
  const v = VARIANTS.has(vv) ? vv : "info";
  const title = el.getAttribute("title") || "";
  const message = el.getAttribute("message") || "";
  const dismissible = el.hasAttribute("dismissible");

  const html = `<div part="banner" role="region" aria-label="${esc(el.getAttribute("label") || t(`banner.label.${v}`))}">
         <svg class="ico" part="icon" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none">${ICONS[v] || ICONS.info}</svg>
         <div class="body" part="content">
           <strong class="title" part="title"><slot name="title">${esc(title)}</slot></strong>
           <span class="message" part="message"><slot>${esc(message)}</slot></span>
         </div>
         <div class="action" part="action"><slot name="action"></slot></div>
         ${dismissible
           ? `<button class="x" part="close" type="button" aria-label="${esc(t("banner.dismiss"))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>`
           : ""}
       </div>`;
  return { html, css: CSS };
}
