// <pura-infinite-scroll> fires "load" when the user nears the bottom.
//   Uses an IntersectionObserver on a sentinel just past the content.
//   Attributes:
//     threshold (px) → rootMargin slack before the sentinel triggers
//     disabled       → stop observing
//     loading (bool) → show spinner + "Loading…" label, suppress further loads
//     done    (bool) → show end message, stop firing
//     height  (px)   → host scroll container height (overflow auto)
//     window  (bool) → observe the document viewport instead of the host
//   Dispatches "load" (bubbles) on the host. Parts: content, sentinel, loader.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "infinite-scroll.loading": {
    en: "Loading…",
    "pt-BR": "Carregando…",
    fr: "Chargement…",
    de: "Wird geladen…",
    it: "Caricamento…",
  },
  "infinite-scroll.done": {
    en: "No more items",
    "pt-BR": "Nada mais a carregar",
    fr: "Plus d’éléments",
    de: "Keine weiteren Einträge",
    it: "Nessun altro elemento",
  },
});

class PuraInfiniteScroll extends PuraElement {
  static observedAttributes = ["threshold", "disabled", "loading", "done", "height", "window"];

  connectedCallback() {
    this.render(
      `<div part="content" class="content">
         <slot></slot>
         <div part="sentinel" class="sentinel" aria-hidden="true"></div>
         <div part="loader" class="loader">
           <span class="spin" aria-hidden="true"></span>
           <span class="loadlabel"></span>
           <span class="donelabel"></span>
         </div>
       </div>`,
      CSS
    );
    this._content = this.$(".content");
    this._sentinel = this.$(".sentinel");
    this._loadLabel = this.$(".loadlabel");
    this._doneLabel = this.$(".donelabel");

    this._sync();
    this._applyI18n();
    this._observe();
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._io?.disconnect();
    this._i18nOff?.();
  }

  attributeChangedCallback(name) {
    if (!this._content) return;
    this._sync();
    // Observer params changed → rebuild.
    this._observe();
  }

  get _root() {
    return this.bool("window") ? null : this._content;
  }

  _sync() {
    // Host scroll container height (px or CSS length).
    const h = this.getAttribute("height");
    if (h && !this.bool("window")) {
      this._content.style.height = /\D/.test(h) ? h : `${h}px`;
      this._content.style.overflow = "auto";
    } else {
      this._content.style.removeProperty("height");
      this._content.style.removeProperty("overflow");
    }

    const loading = this.bool("loading");
    const done = this.bool("done");
    this.$(".loader").style.display = loading || done ? "flex" : "none";
    this.$(".spin").style.display = loading ? "inline-block" : "none";
    this._loadLabel.style.display = loading ? "inline" : "none";
    this._doneLabel.style.display = done && !loading ? "inline" : "none";
  }

  _applyI18n() {
    this._loadLabel.textContent = t("infinite-scroll.loading");
    this._doneLabel.textContent = t("infinite-scroll.done");
  }

  _observe() {
    this._io?.disconnect();
    if (this.bool("disabled") || this.bool("done")) return;

    const px = parseInt(this.getAttribute("threshold"), 10);
    const margin = Number.isFinite(px) ? px : 200;
    this._io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        // Debounce: never fire while a load is in flight or finished.
        if (hit && !this.bool("loading") && !this.bool("done") && !this.bool("disabled")) {
          this.dispatchEvent(new CustomEvent("load", { bubbles: true }));
        }
      },
      { root: this._root, rootMargin: `0px 0px ${margin}px 0px`, threshold: 0 }
    );
    this._io.observe(this._sentinel);
  }
}

const CSS = `
  :host { display: block; }

  .content {
    color: var(--pura-fg);
    scrollbar-width: thin;
    scrollbar-color: var(--pura-border-strong) transparent;
  }

  .sentinel { width: 100%; height: 1px; }

  .loader {
    display: none;
    align-items: center; justify-content: center; gap: var(--pura-space-2);
    padding: var(--pura-space-4);
    color: var(--pura-muted-fg);
    font-size: var(--pura-text-sm);
  }
  .spin {
    display: none; width: 1rem; height: 1rem;
    border: 2px solid color-mix(in srgb, var(--pura-fg) 18%, transparent);
    border-top-color: var(--pura-fg); border-radius: 50%;
    animation: pura-spin 0.65s linear infinite;
  }
  @keyframes pura-spin { to { transform: rotate(360deg); } }
`;

define("pura-infinite-scroll", PuraInfiniteScroll);
export { PuraInfiniteScroll };
