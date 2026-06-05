// <pura-tabs> with <pura-tab label="..."> children (default slot holds panels).
// Each pura-tab's content is its slotted body. Attribute on tabs: active (index).
import { PuraElement, define } from "../base.js";

class PuraTab extends PuraElement {
  connectedCallback() {
    this.render(`<div part="panel" role="tabpanel"><slot></slot></div>`, `
      :host { display: block; }
      [part="panel"] { font-size: var(--pura-text-sm); color: var(--pura-muted-fg); line-height: 1.6; }
    `);
  }
}

class PuraTabs extends PuraElement {
  connectedCallback() {
    this._tabs = [...this.querySelectorAll("pura-tab")];
    const active = Number(this.getAttribute("active") || 0);
    this.render(
      `<div part="list" role="tablist">
         ${this._tabs.map((t, i) =>
           `<button part="tab" role="tab" data-i="${i}" aria-selected="${i === active}" tabindex="${i === active ? 0 : -1}">${t.getAttribute("label") || `Tab ${i + 1}`}</button>`
         ).join("")}
       </div>
       <div part="panels"><slot></slot></div>`,
      CSS
    );
    this._buttons = this.$$('[part="tab"]');
    this._buttons.forEach((b) => {
      b.addEventListener("click", () => this.select(Number(b.dataset.i)));
      b.addEventListener("keydown", (e) => {
        const i = Number(b.dataset.i);
        if (e.key === "ArrowRight") this.select((i + 1) % this._tabs.length, true);
        if (e.key === "ArrowLeft") this.select((i - 1 + this._tabs.length) % this._tabs.length, true);
      });
    });
    this.select(active);
  }

  select(i, focus) {
    this._buttons.forEach((b, j) => {
      b.setAttribute("aria-selected", j === i);
      b.tabIndex = j === i ? 0 : -1;
      if (j === i && focus) b.focus();
    });
    this._tabs.forEach((t, j) => (t.style.display = j === i ? "" : "none"));
    this.setAttribute("active", i);
    this.dispatchEvent(new CustomEvent("change", { detail: { index: i }, bubbles: true }));
  }
}

const CSS = `
  :host { display: block; }
  [part="list"] { display: flex; gap: var(--pura-space-1);
    border-bottom: 1px solid var(--pura-border); margin-bottom: var(--pura-space-4); }
  [part="tab"] {
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    background: transparent; border: none; cursor: pointer;
    color: var(--pura-muted); padding: var(--pura-space-3) var(--pura-space-3);
    border-bottom: 2px solid transparent; margin-bottom: -1px;
    transition: color var(--pura-dur) var(--pura-ease), border-color var(--pura-dur) var(--pura-ease);
  }
  [part="tab"]:hover { color: var(--pura-fg); }
  [part="tab"]:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); border-radius: var(--pura-radius-sm); }
  [part="tab"][aria-selected="true"] { color: var(--pura-fg); border-bottom-color: var(--pura-primary); }
`;

define("pura-tab", PuraTab);
define("pura-tabs", PuraTabs);
export { PuraTabs, PuraTab };
