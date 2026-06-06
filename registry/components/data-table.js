// <pura-data-table> - interactive layer over a slotted light-DOM <table>.
// Keeps the real <table> in the light DOM (native semantics for a11y/agents),
// adds: column sorting (click th: asc -> desc -> none), text search/filter, and
// client-side pagination. Reads data from the slotted rows/cells; never rebuilds
// the table, it reorders/hides the actual <tr> nodes in place.
//
// Like table.js, descendant styling lives in one instance-scoped light-DOM
// <style> (::slotted only reaches the <table>, not its rows/cells).
//
// Attributes:
//   searchable  : show the search box and filter rows by visible text
//   page-size   : rows per page (unset/0 = no pagination)
//   striped     : zebra-stripe visible body rows
//
// Events (bubbles, composed):
//   "sort"   detail: { index, direction }   direction: "asc"|"desc"|null
//   "filter" detail: { query, matched, total }
import { PuraElement, define } from "../base.js";
import meta from "./data-table.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "dataTable.search": { en: "Search…", "pt-BR": "Buscar…", fr: "Rechercher…", de: "Suchen…", it: "Cerca…" },
  "dataTable.empty": { en: "No data", "pt-BR": "Nenhum dado", fr: "Aucune donnée", de: "Keine Daten", it: "Nessun dato" },
  "dataTable.sortAsc": { en: "Sort ascending", "pt-BR": "Ordenar crescente", fr: "Trier par ordre croissant", de: "Aufsteigend sortieren", it: "Ordina crescente" },
  "dataTable.sortDesc": { en: "Sort descending", "pt-BR": "Ordenar decrescente", fr: "Trier par ordre décroissant", de: "Absteigend sortieren", it: "Ordina decrescente" },
  "dataTable.sortNone": { en: "Clear sort", "pt-BR": "Limpar ordenação", fr: "Réinitialiser le tri", de: "Sortierung aufheben", it: "Annulla ordinamento" },
  "dataTable.count": { en: "{shown} of {total}", "pt-BR": "{shown} de {total}", fr: "{shown} sur {total}", de: "{shown} von {total}", it: "{shown} di {total}" },
  "dataTable.prev": { en: "Previous", "pt-BR": "Anterior", fr: "Précédent", de: "Zurück", it: "Precedente" },
  "dataTable.next": { en: "Next", "pt-BR": "Próximo", fr: "Suivant", de: "Weiter", it: "Successivo" },
  "dataTable.page": { en: "Page {page} of {pages}", "pt-BR": "Página {page} de {pages}", fr: "Page {page} sur {pages}", de: "Seite {page} von {pages}", it: "Pagina {page} di {pages}" },
});

let uid = 0;

class PuraDataTable extends PuraElement {
  static observedAttributes = ["searchable", "page-size", "striped"];

  connectedCallback() {
    this._id = `pura-data-table-${++uid}`;
    this.setAttribute("data-pura-data-table", this._id);

    this._query = "";
    this._sortIndex = -1;       // sorted column, -1 = none
    this._sortDir = null;       // "asc" | "desc" | null
    this._page = 1;
    this._rows = [];            // model: { tr, cells: [text…] }
    this._busy = false;         // guards self-induced slotchange

    // Render the shadow shell once. All later updates mutate existing DOM so the
    // search input keeps focus/value (same reason pagination.js updates in place).
    this.render(SHELL(), SHADOW_CSS);

    // Instance-scoped light-DOM style for the slotted table's descendants.
    this._style = document.createElement("style");
    this._style.setAttribute("data-pura-data-table-style", this._id);
    this._applyLightStyles();
    this._mutateLight(() => this.appendChild(this._style));

    this._search = this.$('[part="search"]');
    this._slot = this.$("slot");

    // Reflect attributes present at parse time. attributeChangedCallback fires
    // before connectedCallback on upgrade and is short-circuited until state
    // exists, so initial searchable/striped must be applied here.
    this._syncSearchable();

    this._search.addEventListener("input", () => {
      this._query = this._search.value.trim().toLowerCase();
      this._page = 1;
      this._apply();
      this._emitFilter();
    });

    // Delegate th clicks (rebound implicitly via delegation on stable shadow).
    // The th lives in light DOM, so listen on the host.
    this._onHeadClick = (e) => {
      const th = e.target.closest("thead th");
      if (!th || !this.contains(th)) return;
      const head = this._headCells();
      const index = head.indexOf(th);
      if (index < 0) return;
      this._cycleSort(index);
    };
    this.addEventListener("click", this._onHeadClick);

    this.$('[part="prev"]').addEventListener("click", () => this._goto(this._page - 1));
    this.$('[part="next"]').addEventListener("click", () => this._goto(this._page + 1));

    this._onSlot = () => { if (!this._busy) this._readModel(), this._apply(); };
    this._slot.addEventListener("slotchange", this._onSlot);

    this._i18nOff = onLocaleChange(() => this._applyI18n());

    this._readModel();
    this._applyI18n();
    this._apply();
  }

  disconnectedCallback() {
    this._i18nOff?.();
    this.removeEventListener("click", this._onHeadClick);
    if (this._style && this._style.parentNode) this._style.remove();
  }

  attributeChangedCallback(name) {
    // Initial attributes can fire before connectedCallback wires state up.
    if (!this.isConnected || !this._rows) return;
    if (name === "striped") this._applyLightStyles();
    if (name === "searchable") this._syncSearchable();
    if (name === "page-size") { this._page = 1; }
    this._apply();
  }

  // --- model ---------------------------------------------------------------

  _table() {
    return this.querySelector(":scope > table");
  }

  _headCells() {
    const table = this._table();
    if (!table) return [];
    const row = table.tHead?.rows[0];
    return row ? [...row.cells] : [];
  }

  _bodies() {
    const table = this._table();
    if (!table) return [];
    return table.tBodies.length ? [...table.tBodies] : [];
  }

  // Read rows/cells from the slotted table into a flat model, snapshotting the
  // original order so "clear sort" can restore it.
  _readModel() {
    const rows = [];
    for (const body of this._bodies()) {
      for (const tr of body.rows) {
        if (tr.dataset.puraEmpty) continue; // skip our injected empty row
        rows.push({
          tr,
          cells: [...tr.cells].map((td) => (td.textContent || "").trim()),
        });
      }
    }
    this._rows = rows;
    this._ordered = rows;       // display order; diverges from _rows when sorted
    this._sortIndex = -1;
    this._sortDir = null;
    this._bindHeadAria();
    this._ensureEmptyRow();
  }

  // Ensure a single hidden empty-state <tr> exists in the first tbody.
  _ensureEmptyRow() {
    const body = this._bodies()[0];
    if (!body) { this._emptyRow = null; return; }
    let row = body.querySelector('tr[data-pura-empty]');
    if (!row) {
      const cols = Math.max(1, this._headCells().length || this._rows[0]?.cells.length || 1);
      row = document.createElement("tr");
      row.dataset.puraEmpty = "1";
      row.hidden = true;
      const cell = document.createElement("td");
      cell.colSpan = cols;
      cell.dataset.puraEmptyCell = "1";
      cell.textContent = t("dataTable.empty");
      row.appendChild(cell);
      this._mutateLight(() => body.appendChild(row));
    }
    this._emptyRow = row;
  }

  // --- sorting -------------------------------------------------------------

  _cycleSort(index) {
    if (this._sortIndex !== index) {
      this._sortIndex = index;
      this._sortDir = "asc";
    } else if (this._sortDir === "asc") {
      this._sortDir = "desc";
    } else if (this._sortDir === "desc") {
      this._sortIndex = -1;
      this._sortDir = null;
    } else {
      this._sortDir = "asc";
    }
    this._page = 1;
    this._reorder();
    this._apply();
    this._bindHeadAria();
    this.dispatchEvent(new CustomEvent("sort", {
      detail: { index: this._sortDir ? index : -1, direction: this._sortDir },
      bubbles: true, composed: true,
    }));
  }

  // A column is numeric when every non-empty cell parses to a finite number.
  _isNumericColumn(index) {
    let seen = false;
    for (const r of this._rows) {
      const v = r.cells[index];
      if (v == null || v === "") continue;
      seen = true;
      if (!Number.isFinite(this._num(v))) return false;
    }
    return seen;
  }

  _num(v) {
    // Tolerate thousands separators and currency/sign noise.
    const cleaned = String(v).replace(/[^0-9eE.+-]/g, "");
    return cleaned === "" ? NaN : Number(cleaned);
  }

  // Reorder the actual <tr> nodes in tbody. Stable: returns to original order
  // when sort is cleared (index -1).
  _reorder() {
    const body = this._bodies()[0];
    if (!body) return;
    let order = this._rows;
    if (this._sortIndex >= 0 && this._sortDir) {
      const idx = this._sortIndex;
      const numeric = this._isNumericColumn(idx);
      const dir = this._sortDir === "desc" ? -1 : 1;
      order = [...this._rows]
        .map((r, i) => ({ r, i }))
        .sort((a, b) => {
          const av = a.r.cells[idx] ?? "";
          const bv = b.r.cells[idx] ?? "";
          let c;
          if (numeric) {
            c = (this._num(av) || 0) - (this._num(bv) || 0);
          } else {
            c = av.localeCompare(bv, undefined, { numeric: true, sensitivity: "base" });
          }
          return c !== 0 ? c * dir : a.i - b.i; // stable tiebreak
        })
        .map((x) => x.r);
    }
    // Keep display order for filtering/pagination (slices must follow the sort).
    this._ordered = order;
    this._mutateLight(() => {
      for (const r of order) body.appendChild(r.tr); // moves in place
      if (this._emptyRow) body.appendChild(this._emptyRow); // keep empty row last
    });
  }

  // --- filter + pagination -------------------------------------------------

  _matched() {
    const base = this._ordered || this._rows;
    if (!this._query) return base;
    return base.filter((r) =>
      r.cells.some((c) => c.toLowerCase().includes(this._query))
    );
  }

  _emitFilter() {
    this.dispatchEvent(new CustomEvent("filter", {
      detail: { query: this._query, matched: this._matched().length, total: this._rows.length },
      bubbles: true, composed: true,
    }));
  }

  _pageSize() {
    const n = Math.floor(Number(this.getAttribute("page-size")));
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  _goto(page) {
    const pages = this._pageCount(this._matched().length);
    const next = Math.min(Math.max(1, page), pages);
    if (next === this._page) return;
    this._page = next;
    this._apply();
  }

  _pageCount(count) {
    const size = this._pageSize();
    if (!size) return 1;
    return Math.max(1, Math.ceil(count / size));
  }

  // Apply current sort/filter/page state to the live DOM: toggle row visibility,
  // stripe visible rows, show empty state, refresh footer.
  _apply() {
    const matched = this._matched();
    const total = this._rows.length;
    const size = this._pageSize();
    const pages = this._pageCount(matched.length);
    if (this._page > pages) this._page = pages;

    const start = size ? (this._page - 1) * size : 0;
    const end = size ? start + size : matched.length;
    const visible = new Set(matched.slice(start, end).map((r) => r.tr));

    this._mutateLight(() => {
      let stripe = 0;
      for (const r of this._rows) {
        const show = visible.has(r.tr);
        r.tr.hidden = !show;
        // Stripe by visible index, not :nth-child (hidden rows would skew it).
        r.tr.toggleAttribute("data-pura-odd", show && stripe % 2 === 1);
        if (show) stripe++;
      }
      if (this._emptyRow) {
        const showEmpty = matched.length === 0;
        this._emptyRow.hidden = !showEmpty;
        const cols = Math.max(1, this._headCells().length || 1);
        const cell = this._emptyRow.firstElementChild;
        if (cell) cell.colSpan = cols;
      }
    });

    this._syncFooter(matched.length, total, pages);
  }

  // --- DOM sync helpers ----------------------------------------------------

  _syncSearchable() {
    const tools = this.$('[part="toolbar"]');
    if (tools) tools.hidden = !this.hasAttribute("searchable");
    if (!this.hasAttribute("searchable") && this._query) {
      this._query = "";
      if (this._search) this._search.value = "";
    }
  }

  _syncFooter(shown, total, pages) {
    const count = this.$('[part="count"]');
    if (count) count.textContent = t("dataTable.count", { shown, total });

    const footer = this.$('[part="footer"]');
    const pager = this.$('[part="pager"]');
    const paginate = this._pageSize() > 0 && pages > 1;
    if (pager) pager.hidden = !paginate;
    if (footer) footer.hidden = false;

    if (paginate) {
      const prev = this.$('[part="prev"]');
      const next = this.$('[part="next"]');
      prev.disabled = this._page <= 1;
      next.disabled = this._page >= pages;
      const label = this.$('[part="page-label"]');
      if (label) label.textContent = t("dataTable.page", { page: this._page, pages });
    }
  }

  // Drive the sort indicator via aria-sort on the active th (CSS shows a glyph).
  _bindHeadAria() {
    const head = this._headCells();
    head.forEach((th, i) => {
      th.classList.add("pura-sortable");
      if (i === this._sortIndex && this._sortDir) {
        th.setAttribute("aria-sort", this._sortDir === "asc" ? "ascending" : "descending");
      } else {
        th.removeAttribute("aria-sort");
      }
      const next = i !== this._sortIndex || !this._sortDir
        ? t("dataTable.sortAsc")
        : this._sortDir === "asc" ? t("dataTable.sortDesc") : t("dataTable.sortNone");
      th.setAttribute("title", next);
    });
  }

  _applyI18n() {
    if (this._search) this._search.setAttribute("placeholder", t("dataTable.search"));
    const prev = this.$('[part="prev"]');
    const next = this.$('[part="next"]');
    if (prev) prev.setAttribute("aria-label", t("dataTable.prev")), (prev.textContent = "‹");
    if (next) next.setAttribute("aria-label", t("dataTable.next")), (next.textContent = "›");
    if (this._emptyRow) {
      const cell = this._emptyRow.firstElementChild;
      if (cell) cell.textContent = t("dataTable.empty");
    }
    this._bindHeadAria();
    // Refresh count/page text in current locale.
    this._apply();
  }

  // --- light-DOM mutation guard --------------------------------------------

  // Wrap any host-light-DOM mutation so the resulting slotchange is ignored
  // (avoids re-reading the model / infinite loops). Reordering within tbody does
  // not fire slotchange, but appending the empty row / style does.
  _mutateLight(fn) {
    const prev = this._busy;
    this._busy = true;
    try { fn(); } finally { this._busy = prev; }
  }

  _applyLightStyles() {
    if (this._style) this._style.textContent = lightCSS(this._id, this.hasAttribute("striped"));
  }
}

// Shadow shell, rendered once. The slot holds the real <table>.
function SHELL() {
  return `
    <div class="root" part="root">
      <div part="toolbar" class="toolbar" hidden>
        <input part="search" class="search" type="search" autocomplete="off"
          spellcheck="false" aria-label="search" />
      </div>
      <div part="table" class="table">
        <slot></slot>
      </div>
      <div part="footer" class="footer" hidden>
        <span part="count" class="count"></span>
        <div part="pager" class="pager" hidden>
          <button part="prev" type="button" class="navbtn"></button>
          <span part="page-label" class="page-label"></span>
          <button part="next" type="button" class="navbtn"></button>
        </div>
      </div>
    </div>
  `;
}

// Shadow styles: host shell, toolbar, footer, and the directly slotted <table>.
const SHADOW_CSS = `
  :host { display: block; }

  .root {
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius);
    background: var(--pura-bg);
    overflow: hidden;
  }

  .toolbar {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-3) var(--pura-space-4);
    border-bottom: 1px solid var(--pura-border);
  }
  .toolbar[hidden] { display: none; }

  .search {
    font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-3); height: 2.25rem;
    width: 100%; max-width: 20rem;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .search::placeholder { color: var(--pura-muted); }
  .search:focus-visible {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  .table { width: 100%; overflow-x: auto; }

  ::slotted(table) {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--pura-text-sm);
    color: var(--pura-fg);
    caption-side: bottom;
  }
  ::slotted(style) { display: none; }

  .footer {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3); flex-wrap: wrap;
    padding: var(--pura-space-3) var(--pura-space-4);
    border-top: 1px solid var(--pura-border);
    font-size: var(--pura-text-xs); color: var(--pura-muted);
  }
  .footer[hidden] { display: none; }

  .pager { display: flex; align-items: center; gap: var(--pura-space-2); }
  .pager[hidden] { display: none; }

  .page-label { color: var(--pura-muted-fg); font-size: var(--pura-text-xs); }

  .navbtn {
    display: inline-flex; align-items: center; justify-content: center;
    font: inherit; font-size: var(--pura-text-base); line-height: 1;
    cursor: pointer; color: var(--pura-fg);
    background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius);
    min-width: 2rem; height: 2rem; padding: 0 var(--pura-space-2);
    box-shadow: var(--pura-shadow-sm);
    transition: background var(--pura-dur) var(--pura-ease);
  }
  .navbtn:hover { background: var(--pura-subtle); }
  .navbtn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .navbtn:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-bg); }
`;

// Styles applied to the slotted table's descendants, scoped to one instance.
// Mirrors table.js look, plus sortable headers + stripe-by-class.
function lightCSS(id, striped) {
  const scope = `[data-pura-data-table="${id}"] > table`;
  return `
    ${scope} { border-collapse: collapse; }

    ${scope} thead th {
      background: var(--pura-subtle);
      text-align: left;
      font-size: var(--pura-text-sm);
      font-weight: 600;
      color: var(--pura-muted-fg);
      padding: var(--pura-space-3) var(--pura-space-4);
      border-bottom: 1px solid var(--pura-border);
      white-space: nowrap;
    }

    ${scope} thead th.pura-sortable {
      cursor: pointer;
      user-select: none;
      position: relative;
      padding-right: calc(var(--pura-space-4) + 1.1em);
    }
    ${scope} thead th.pura-sortable:hover { background: var(--pura-subtle-hover); }

    /* Sort indicator: dim glyph by default, accented when active. */
    ${scope} thead th.pura-sortable::after {
      content: "\\2195"; /* up-down arrow */
      position: absolute;
      right: var(--pura-space-4);
      top: 50%; transform: translateY(-50%);
      font-size: 0.85em; color: var(--pura-muted); opacity: 0.5;
    }
    ${scope} thead th[aria-sort="ascending"]::after {
      content: "\\2191"; color: var(--pura-fg); opacity: 1;
    }
    ${scope} thead th[aria-sort="descending"]::after {
      content: "\\2193"; color: var(--pura-fg); opacity: 1;
    }

    ${scope} tbody td,
    ${scope} tfoot td,
    ${scope} tfoot th {
      padding: var(--pura-space-3) var(--pura-space-4);
      border-bottom: 1px solid var(--pura-border);
      color: var(--pura-fg);
      vertical-align: middle;
    }

    ${scope} tbody tr:last-child td { border-bottom: none; }

    ${scope} tbody tr {
      transition: background var(--pura-dur) var(--pura-ease);
    }
    ${scope} tbody tr[hidden] { display: none; }
    ${scope} tbody tr:hover { background: var(--pura-subtle-hover); }

    /* Empty state row. */
    ${scope} tbody tr[data-pura-empty] td {
      text-align: center;
      color: var(--pura-muted);
      padding: var(--pura-space-5) var(--pura-space-4);
    }
    ${scope} tbody tr[data-pura-empty]:hover { background: transparent; }

    ${scope} caption {
      padding: var(--pura-space-3) var(--pura-space-4);
      font-size: var(--pura-text-xs);
      color: var(--pura-muted);
      text-align: left;
    }

    ${striped
      ? `${scope} tbody tr[data-pura-odd] { background: var(--pura-subtle); }
         ${scope} tbody tr[data-pura-odd]:hover { background: var(--pura-subtle-hover); }`
      : ""}
  `;
}

define("pura-data-table", PuraDataTable, meta);
export { PuraDataTable };
