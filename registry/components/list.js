// <pura-list> — list primitive wrapping real <ul>/<ol> semantics.
//   Attributes:
//     ordered  (boolean)  → render <ol> instead of <ul>
//     marker   (disc | decimal | none | check)  → bullet style (default: auto)
//     gap      (1..6)     → vertical (or horizontal) space between items
//     inline   (boolean)  → lay items out horizontally
//   Slots: default — expects <pura-list-item> children.
//
// <pura-list-item> — a single row. Renders a real <li> in shadow.
//   Attributes: none. Slots: default — the row content.
//
// Theming via var(--pura-*) tokens only. Markers, gap and direction are driven
// by CSS custom properties set on the host from _sync() so the inspector and
// live attribute edits reflect immediately.
import { PuraElement, define } from "../base.js";

class PuraList extends PuraElement {
  static observedAttributes = ["ordered", "marker", "gap", "inline"];

  connectedCallback() {
    this._render();
    this._sync();
  }

  attributeChangedCallback(name) {
    // `ordered` swaps the semantic tag, so it needs a re-render.
    if (name === "ordered" && this.shadowRoot.childNodes.length) {
      this._render();
    }
    this._sync();
  }

  _render() {
    const ordered = this.bool("ordered");
    const tag = ordered ? "ol" : "ul";
    this.render(
      `<${tag} part="list"><slot></slot></${tag}>`,
      CSS
    );
  }

  // Map attributes → CSS custom properties on the host. Defaults keep the
  // component sane with no attributes set.
  _sync() {
    const marker = this.getAttribute("marker");
    const fallback = this.bool("ordered") ? "decimal" : "disc";
    // `check` is rendered via a pseudo-element; native list-style is none.
    const style = marker === "check" ? "none" : marker || fallback;
    this.style.setProperty("--_list-style", style);
    this.style.setProperty("--_check", marker === "check" ? "1" : "0");

    const gap = this.getAttribute("gap");
    this.style.setProperty(
      "--_gap",
      gap ? `var(--pura-space-${gap})` : "var(--pura-space-1)"
    );
  }
}

const CSS = `
  :host { display: block; color: var(--pura-fg); font-size: var(--pura-text-base); }

  [part="list"] {
    margin: 0;
    padding: 0;
    padding-inline-start: var(--pura-space-6);
    list-style: var(--_list-style, disc);
    display: flex;
    flex-direction: column;
    gap: var(--_gap, var(--pura-space-1));
  }

  /* Marker "none" and the custom check both drop the indent. */
  :host([marker="none"]) [part="list"],
  :host([marker="check"]) [part="list"] {
    padding-inline-start: 0;
  }

  /* Inline / horizontal layout. */
  :host([inline]) [part="list"] {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding-inline-start: 0;
    list-style: none;
    column-gap: var(--_gap, var(--pura-space-4));
  }

  /* The marker style is consumed by the slotted item hosts, which act as <li>. */
  ::slotted(pura-list-item) {
    display: list-item;
    list-style: inherit;
  }
  :host([inline]) ::slotted(pura-list-item) { display: inline-flex; }

`;

class PuraListItem extends PuraElement {
  connectedCallback() {
    this.render(`<li part="item"><slot></slot></li>`, ITEM_CSS);
  }
}

const ITEM_CSS = `
  :host { line-height: 1.7; }
  [part="item"] {
    margin: 0;
    list-style: inherit;
  }

  /* Inside a check-markered list, draw a tick and lay the row out as flex. */
  :host-context(pura-list[marker="check"]) [part="item"] {
    display: flex;
    gap: var(--pura-space-2);
    align-items: baseline;
    list-style: none;
  }
  :host-context(pura-list[marker="check"]) [part="item"]::before {
    content: "✓";
    color: var(--pura-success);
    font-weight: 600;
    flex: none;
  }
`;

define("pura-list", PuraList);
define("pura-list-item", PuraListItem);
export { PuraList, PuraListItem };
