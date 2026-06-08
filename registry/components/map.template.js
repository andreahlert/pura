// Pure render(s) for <map> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function mapTemplate(el = EMPTY_SHIM) {
  const html = `<div class="empty" part="root">${t("map.empty")}</div>`;
  return { html, css: MAP_CSS };
}

export const MAP_CSS = `
  :host { display: block; }
  .root {
    position: relative; overflow: hidden;
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    background: var(--pura-subtle); box-shadow: var(--pura-shadow-sm);
  }
  .frame {
    display: block; width: 100%; height: var(--_h, 400px);
    border: none; background: var(--pura-subtle);
  }
  .link {
    position: absolute; right: var(--pura-space-2); bottom: var(--pura-space-2);
    font-size: var(--pura-text-xs); font-weight: 550; text-decoration: none;
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-1) var(--pura-space-2); box-shadow: var(--pura-shadow-sm);
  }
  .link:hover { background: var(--pura-subtle-hover); }
  .link:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }

  .empty {
    display: grid; place-items: center; height: var(--_h, 400px);
    border: 1px dashed var(--pura-border-strong); border-radius: var(--pura-radius);
    color: var(--pura-muted); font-size: var(--pura-text-sm); background: var(--pura-subtle);
  }
`;
