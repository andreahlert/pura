// <pura-pdf-viewer> - thin wrapper that embeds a PDF via the browser's native
// PDF renderer. By design this relies on the platform's built-in viewer (the
// <iframe> below), NOT pdf.js or any external library. Zero deps, platform only.
// Tradeoff: rendering, zoom, page navigation are whatever the browser provides;
// behavior varies per browser and some (older mobile) browsers cannot render
// inline PDFs at all. We accept that to stay dependency-free.
// Attributes:
//   src       - PDF URL.
//   height    - viewer height (number → px, or any CSS length). Default 600.
//   download  - boolean; shows a download link in the toolbar.
//   title     - display name in the toolbar (falls back to the src filename).
// Parts: root, toolbar, frame, download.
import { PuraElement, define } from "../base.js";
import meta from "./pdf-viewer.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "pdf.download": { en: "Download", "pt-BR": "Baixar", fr: "Télécharger", de: "Herunterladen", it: "Scarica" },
  "pdf.empty": { en: "No PDF to display.", "pt-BR": "Nenhum PDF para exibir.", fr: "Aucun PDF à afficher.", de: "Kein PDF zum Anzeigen.", it: "Nessun PDF da mostrare." },
});

const DL_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 11l5 5 5-5M5 21h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function len(v, fallback) {
  if (v == null || v === "") return fallback;
  return /^-?\d*\.?\d+$/.test(String(v).trim()) ? `${String(v).trim()}px` : v;
}

function fileName(src) {
  try { return decodeURIComponent(src.split("/").pop().split("?")[0]) || src; }
  catch (_) { return src; }
}

class PuraPdfViewer extends PuraElement {
  connectedCallback() {
    const src = this.getAttribute("src");
    const height = len(this.getAttribute("height"), "600px");
    this.style.setProperty("--_h", height);

    if (!src) {
      this.render(`<div class="empty" part="root">${t("pdf.empty")}</div>`, CSS);
      this._i18nOff = onLocaleChange(() => { const e = this.$(".empty"); if (e) e.textContent = t("pdf.empty"); });
      return;
    }

    const name = this.getAttribute("title") || fileName(src);
    this.render(
      `<div class="root" part="root">
         <div class="toolbar" part="toolbar">
           <span class="name" part="title" title="${name}">${name}</span>
           ${this.hasAttribute("download") ? `<a class="dl" part="download" href="${src}" download aria-label="${t("pdf.download")}"><span>${DL_ICON}</span><span class="dl-txt">${t("pdf.download")}</span></a>` : ""}
         </div>
         <iframe class="frame" part="frame" src="${src}" title="${name}" loading="lazy"></iframe>
       </div>`,
      CSS
    );
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  _applyI18n() {
    const dl = this.$(".dl");
    if (dl) {
      dl.setAttribute("aria-label", t("pdf.download"));
      this.$(".dl-txt").textContent = t("pdf.download");
    }
  }
}

const CSS = `
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

define("pura-pdf-viewer", PuraPdfViewer, meta);
export { PuraPdfViewer };
