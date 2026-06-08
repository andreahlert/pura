// Pure render for <pura-pagination>. No DOM; SSR/DSD + client safe.
// Builds the full nav (Prev, truncated page numbers with ellipses, Next) from
// the [total] and [page] attributes — all integer/i18n derived, no escaping
// needed. Under EMPTY_SHIM total=1/page=1, so a single-page nav renders.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

function totalOf(el) {
  const n = Math.floor(Number(el.getAttribute("total")));
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function pageOf(el) {
  const total = totalOf(el);
  const p = Math.floor(Number(el.getAttribute("page")));
  if (!Number.isFinite(p) || p < 1) return 1;
  return p > total ? total : p;
}

// Display sequence: numbers + "ellipsis" tokens. Always show first, last,
// current and its neighbors; ellipsis only where a gap > 1 exists.
function itemsOf(el) {
  const total = totalOf(el);
  const page = pageOf(el);
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

export function paginationTemplate(el = EMPTY_SHIM) {
  const total = totalOf(el);
  const page = pageOf(el);
  const atFirst = page <= 1;
  const atLast = page >= total;

  const numbers = itemsOf(el)
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

  const html = `<nav part="nav" aria-label="${t("pagination.nav")}">
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
       </nav>`;
  return { html, css: CSS };
}
