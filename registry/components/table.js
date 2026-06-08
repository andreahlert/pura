// <pura-table> — styled wrapper around a light-DOM <table> (default slot).
// Preserves native table semantics; styles the slotted table and its rows/cells.
// Attributes: striped (zebra-stripe body rows).
//
// Note: ::slotted() only matches the slot's direct assigned node (the <table>),
// not its descendants (thead/tbody/tr/th/td). To style those while keeping the
// table in the light DOM, this component injects one scoped <style> into the
// light DOM, targeting only this instance via a unique id attribute. All values
// are --pura-* tokens, which inherit through the light DOM normally.
import { PuraElement, define } from "../base.js";
import meta from "./table.meta.js";
import { tableTemplate } from "./table.template.js";

let uid = 0;

class PuraTable extends PuraElement {
  static observedAttributes = ["striped"];

  connectedCallback() {
    this._id = `pura-table-${++uid}`;
    this.setAttribute("data-pura-table", this._id);

    const { html, css } = tableTemplate(this);
    this.render(html, css);

    // Light-DOM style element, scoped to this instance.
    this._style = document.createElement("style");
    this._style.setAttribute("data-pura-table-style", this._id);
    this._applyLightStyles();
    this.appendChild(this._style);
  }

  disconnectedCallback() {
    if (this._style && this._style.parentNode) this._style.remove();
  }

  attributeChangedCallback() {
    if (this._style) this._applyLightStyles();
  }

  _applyLightStyles() {
    this._style.textContent = lightCSS(this._id, this.hasAttribute("striped"));
  }
}

// Styles applied to the host wrapper + the directly slotted <table>.

// Styles applied to the slotted table's descendants, scoped to one instance.
function lightCSS(id, striped) {
  const scope = `[data-pura-table="${id}"] > table`;
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

    ${scope} tbody tr:hover { background: var(--pura-subtle-hover); }

    ${scope} caption {
      padding: var(--pura-space-3) var(--pura-space-4);
      font-size: var(--pura-text-xs);
      color: var(--pura-muted);
      text-align: left;
    }

    ${striped
      ? `${scope} tbody tr:nth-child(even) { background: var(--pura-subtle); }
         ${scope} tbody tr:nth-child(even):hover { background: var(--pura-subtle-hover); }`
      : ""}
  `;
}

define("pura-table", PuraTable, meta);
export { PuraTable };
