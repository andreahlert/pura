// <pura-pagination> — page navigation. Attributes: total (number of pages),
// page (current, 1-based, default 1). Renders Prev, page-number buttons with
// ellipsis truncation (first, last, neighbors of current), Next. Active page
// gets aria-current=page; Prev disabled on first page, Next on last. Clicking a
// page emits CustomEvent("change", { detail: { page } }) and updates the page attr.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

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

  // Build the display sequence: numbers + "ellipsis" tokens. Always show first,
  // last, current and its neighbors; insert an ellipsis only where a gap > 1 exists.
  _items() {
    const total = this._total();
    const page = this._page();
    const pages = new Set([1, total, page, page - 1, page + 1]);
    const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
    const out = [];
    let prev = 0;
    for (const n of sorted) {
      if (prev && n - prev > 1) out.push({ ellipsis: true });
      out.push({ page: n });
      prev = n;
    }
    return out;
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
    const total = this._total();
    const page = this._page();
    const atFirst = page <= 1;
    const atLast = page >= total;

    const numbers = this._items()
      .map((it) =>
        it.ellipsis
          ? `<li><span part="ellipsis" class="ellipsis" aria-hidden="true">&hellip;</span><span class="sr-only">${t("pagination.more")}</span></li>`
          : `<li><button type="button" part="page${it.page === page ? " page-active" : ""}"
               class="page${it.page === page ? " active" : ""}" data-page="${it.page}"
               ${it.page === page ? 'aria-current="page"' : ""}
               aria-label="${it.page === page ? t("pagination.current", { n: it.page }) : t("pagination.goto", { n: it.page })}"
             >${it.page}</button></li>`
      )
      .join("");

    this.render(
      `<nav part="nav" aria-label="${t("pagination.nav")}">
         <ul part="list">
           <li>
             <button type="button" part="prev" class="nav prev" data-page="${page - 1}"
               aria-label="${t("pagination.prevLabel")}" ${atFirst ? "disabled" : ""}>
               <span class="chev" aria-hidden="true">&lsaquo;</span>
               <span class="navlabel">${t("pagination.prev")}</span>
             </button>
           </li>
           ${numbers}
           <li>
             <button type="button" part="next" class="nav next" data-page="${page + 1}"
               aria-label="${t("pagination.nextLabel")}" ${atLast ? "disabled" : ""}>
               <span class="navlabel">${t("pagination.next")}</span>
               <span class="chev" aria-hidden="true">&rsaquo;</span>
             </button>
           </li>
         </ul>
       </nav>`,
      CSS
    );
  }
}

const CSS = `
  :host { display: block; }

  nav { display: flex; }
  ul {
    display: flex; align-items: center; gap: var(--pura-space-1);
    list-style: none; margin: 0; padding: 0;
  }
  li { display: flex; }

  button {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--pura-space-1);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; white-space: nowrap; cursor: pointer;
    border: 1px solid transparent; border-radius: var(--pura-radius);
    min-width: 2.25rem; height: 2.25rem; padding: 0 var(--pura-space-3);
    background: transparent; color: var(--pura-fg);
    transition: background var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  button:hover { background: var(--pura-subtle); }
  button:active { transform: translateY(0.5px) scale(0.99); }
  button:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  button:disabled { opacity: 0.55; cursor: not-allowed; transform: none; background: transparent; }

  /* page numbers are square ghost buttons */
  .page { padding: 0; }

  /* active page is filled */
  .page.active {
    background: var(--pura-primary); color: var(--pura-primary-fg);
    box-shadow: var(--pura-shadow-sm);
  }
  .page.active:hover { background: var(--pura-primary-hover); }

  /* prev / next behave like secondary buttons */
  .nav {
    background: var(--pura-bg); color: var(--pura-fg);
    border-color: var(--pura-border-strong); box-shadow: var(--pura-shadow-sm);
  }
  .nav:hover { background: var(--pura-subtle); }
  .nav:disabled { background: var(--pura-bg); }
  .chev { font-size: 1.15em; line-height: 1; }

  .ellipsis {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 2.25rem; height: 2.25rem;
    color: var(--pura-muted); user-select: none;
  }

  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
  }

  /* hide the textual Prev/Next labels on narrow widths, keep chevrons */
  @media (max-width: 28rem) {
    .navlabel { display: none; }
    .nav { padding: 0; min-width: 2.25rem; }
  }
`;

define("pura-pagination", PuraPagination);
export { PuraPagination };
