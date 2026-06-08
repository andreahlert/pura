// <pura-pagination> — page navigation. Attributes: total (number of pages),
// page (current, 1-based, default 1). Renders Prev, page-number buttons with
// ellipsis truncation (first, last, neighbors of current), Next. Active page
// gets aria-current=page; Prev disabled on first page, Next on last. Clicking a
// page emits CustomEvent("change", { detail: { page } }) and updates the page attr.
import { PuraElement, define } from "../base.js";
import meta from "./pagination.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { paginationTemplate } from "./pagination.template.js";

registerMessages({
  "pagination.nav": { en: "pagination", "pt-BR": "paginação", fr: "pagination", de: "Seitennummerierung", it: "impaginazione" },
  "pagination.more": { en: "More pages", "pt-BR": "Mais páginas", fr: "Plus de pages", de: "Weitere Seiten", it: "Altre pagine" },
  "pagination.current": { en: "Page {n}, current page", "pt-BR": "Página {n}, página atual", fr: "Page {n}, page actuelle", de: "Seite {n}, aktuelle Seite", it: "Pagina {n}, pagina corrente" },
  "pagination.goto": { en: "Go to page {n}", "pt-BR": "Ir para a página {n}", fr: "Aller à la page {n}", de: "Zur Seite {n} gehen", it: "Vai alla pagina {n}" },
  "pagination.prevLabel": { en: "Go to previous page", "pt-BR": "Ir para a página anterior", fr: "Aller à la page précédente", de: "Zur vorherigen Seite gehen", it: "Vai alla pagina precedente" },
  "pagination.prev": { en: "Previous", "pt-BR": "Anterior", fr: "Précédent", de: "Zurück", it: "Precedente" },
  "pagination.nextLabel": { en: "Go to next page", "pt-BR": "Ir para a próxima página", fr: "Aller à la page suivante", de: "Zur nächsten Seite gehen", it: "Vai alla pagina successiva" },
  "pagination.next": { en: "Next", "pt-BR": "Próximo", fr: "Suivant", de: "Weiter", it: "Successivo" },
});

class PuraPagination extends PuraElement {
  static observedAttributes = ["total", "page"];

  connectedCallback() {
    this._render();
    // One delegated listener bound to the stable shadowRoot, so it survives the
    // innerHTML swaps that re-rendering performs.
    this.shadowRoot.addEventListener("click", (e) => {
      const el = e.target.closest("button[data-page]");
      if (!el || el.disabled) return;
      const next = Number(el.dataset.page);
      const total = this._total();
      if (!Number.isFinite(next) || next < 1 || next > total || next === this._page()) return;
      this.dispatchEvent(
        new CustomEvent("change", { detail: { page: next }, bubbles: true, composed: true })
      );
      this.setAttribute("page", String(next));
    });
    this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
  }

  attributeChangedCallback() {
    if (!this.isConnected) return;
    this._render();
  }

  _total() {
    const t = Math.floor(Number(this.getAttribute("total")));
    return Number.isFinite(t) && t > 0 ? t : 1;
  }

  _page() {
    const total = this._total();
    const p = Math.floor(Number(this.getAttribute("page")));
    if (!Number.isFinite(p) || p < 1) return 1;
    return p > total ? total : p;
  }

  // Update only the already-rendered i18n nodes in place (text + aria-labels),
  // so a locale change does not trigger a full re-render (which would drop focus
  // and re-run wiring). No document/window listeners are added here.
  _applyI18n() {
    const root = this.shadowRoot;
    if (!root) return;

    const nav = root.querySelector('nav[part="nav"]');
    if (nav) nav.setAttribute("aria-label", t("pagination.nav"));

    root.querySelectorAll(".ellipsis + .sr-only").forEach((el) => {
      el.textContent = t("pagination.more");
    });

    const page = this._page();
    root.querySelectorAll("button.page[data-page]").forEach((btn) => {
      const n = Number(btn.dataset.page);
      btn.setAttribute(
        "aria-label",
        n === page ? t("pagination.current", { n }) : t("pagination.goto", { n })
      );
    });

    const prev = root.querySelector('button[part="prev"]');
    if (prev) {
      prev.setAttribute("aria-label", t("pagination.prevLabel"));
      const lbl = prev.querySelector(".navlabel");
      if (lbl) lbl.textContent = t("pagination.prev");
    }

    const next = root.querySelector('button[part="next"]');
    if (next) {
      next.setAttribute("aria-label", t("pagination.nextLabel"));
      const lbl = next.querySelector(".navlabel");
      if (lbl) lbl.textContent = t("pagination.next");
    }
  }

  _render() {
    const { html, css } = paginationTemplate(this);
    this.render(html, css);
  }
}

define("pura-pagination", PuraPagination, meta);
export { PuraPagination };
