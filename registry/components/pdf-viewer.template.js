// Pure render(s) for <pdf-viewer> custom element(s). No DOM; SSR/DSD + client safe.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

export function pdfViewerTemplate(el = EMPTY_SHIM) {
  const html = `<div class="empty" part="root">${t("pdf.empty")}</div>`;
  return { html, css: PDF_VIEWER_CSS };
}

export const PDF_VIEWER_CSS = `
  :host { display: block; }
  .root {
    display: flex; flex-direction: column; overflow: hidden;
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    background: var(--pura-bg); box-shadow: var(--pura-shadow-sm);
  }
  .toolbar {
    display: flex; align-items: center; gap: var(--pura-space-3);
    padding: var(--pura-space-2) var(--pura-space-3);
    border-bottom: 1px solid var(--pura-border); background: var(--pura-subtle);
  }
  .name {
    flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    font-size: var(--pura-text-sm); font-weight: 550; color: var(--pura-fg);
  }
  .dl {
    display: inline-flex; align-items: center; gap: var(--pura-space-1); flex: none;
    text-decoration: none; cursor: pointer;
    font-size: var(--pura-text-xs); font-weight: 550;
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-1) var(--pura-space-2);
  }
  .dl:hover { background: var(--pura-subtle-hover); }
  .dl:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .dl svg { width: 0.95rem; height: 0.95rem; display: block; }

  .frame {
    display: block; width: 100%; height: var(--_h, 600px);
    border: none; background: var(--pura-subtle);
  }

  .empty {
    display: grid; place-items: center; height: var(--_h, 600px);
    border: 1px dashed var(--pura-border-strong); border-radius: var(--pura-radius);
    color: var(--pura-muted); font-size: var(--pura-text-sm); background: var(--pura-subtle);
  }
`;
