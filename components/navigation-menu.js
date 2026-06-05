// <pura-navigation-menu> — horizontal site navigation (role=navigation) with a
// row of triggers. Each <pura-navigation-menu-item label="Products"> exposes a
// rich content panel via its default slot; the panel opens below the trigger on
// hover/click using the native Popover API + CSS anchor positioning. Only one
// panel is open at a time. Simple links (add an href) render as plain anchors.
// Keyboard: Tab between triggers, ArrowLeft/Right move, Enter/Space + ArrowDown
// open, Escape closes. Smooth fade in/out.
// Attributes (item): label (trigger text), href (renders a plain link instead).
import { PuraElement, define } from "../base.js";

let uid = 0;

class PuraNavigationMenuItem extends PuraElement {
  static observedAttributes = ["label", "href", "open"];

  connectedCallback() {
    this._name = `--pura-navmenu-${uid++}`;
    this._link = this.hasAttribute("href");
    if (this._link) {
      this.render(
        `<a part="trigger link" class="trigger" href="${this.getAttribute("href")}"><slot name="label">${this._label()}</slot></a>`,
        CSS.replaceAll("ANCHOR", this._name)
      );
      this._trigger = this.$(".trigger");
      return;
    }

    this.render(
      `<button part="trigger" class="trigger" type="button" aria-expanded="false" aria-haspopup="true">
         <span class="trigger-label"><slot name="label">${this._label()}</slot></span>
         <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
       </button>
       <div part="panel" class="panel" popover="manual" role="region">
         <div part="panel-inner" class="panel-inner"><slot></slot></div>
       </div>`,
      CSS.replaceAll("ANCHOR", this._name)
    );

    this._trigger = this.$(".trigger");
    this._panel = this.$(".panel");

    this._trigger.addEventListener("click", () => this.toggle());
    this._panel.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      this.toggleAttribute("open", open);
      this._trigger.setAttribute("aria-expanded", open ? "true" : "false");
      this.dispatchEvent(
        new CustomEvent(open ? "open" : "close", { bubbles: true })
      );
    });
  }

  attributeChangedCallback(name, _old, _val) {
    if (name === "label" && this._trigger && !this.querySelector('[slot="label"]')) {
      const span = this.$(".trigger-label") || this._trigger;
      span.textContent = this._label();
    }
  }

  _label() {
    return this.getAttribute("label") || "";
  }

  get isLink() {
    return this._link;
  }

  get open() {
    return this.hasAttribute("open");
  }

  show() {
    this._panel?.showPopover();
  }

  hide() {
    this._panel?.hidePopover();
  }

  toggle() {
    if (!this._panel) return;
    this.open ? this.hide() : this.show();
  }

  focusTrigger() {
    this._trigger?.focus();
  }
}

class PuraNavigationMenu extends PuraElement {
  connectedCallback() {
    if (!this.hasAttribute("aria-label")) {
      this.setAttribute("aria-label", "Main");
    }
    this.setAttribute("role", "navigation");

    this.render(
      `<ul part="list" class="list" role="list"><slot></slot></ul>`,
      CSS
    );

    this._items = [...this.querySelectorAll(":scope > pura-navigation-menu-item")];

    // Only one panel open at a time.
    this.addEventListener("open", (e) => {
      this._items.forEach((it) => {
        if (it !== e.target && !it.isLink && it.open) it.hide();
      });
    });

    // Roving focus + keyboard navigation across triggers.
    this.addEventListener("keydown", (e) => this._onKeydown(e));

    // Hover intent: open on enter, close on leave (with a small grace delay so
    // moving the pointer down into the panel does not dismiss it).
    this._items.forEach((it) => {
      if (it.isLink) return;
      it.addEventListener("pointerenter", () => {
        clearTimeout(this._closeTimer);
        // If any panel is already open, switch immediately for snappy nav.
        if (this._items.some((o) => !o.isLink && o.open)) it.show();
      });
      it.addEventListener("pointerleave", () => {
        clearTimeout(this._closeTimer);
        this._closeTimer = setTimeout(() => it.hide(), 120);
      });
    });
  }

  _triggers() {
    return this._items.map((it) => it.shadowRoot?.querySelector(".trigger")).filter(Boolean);
  }

  _onKeydown(e) {
    const triggers = this._triggers();
    const current = triggers.findIndex((t) => t === e.composedPath()[0] || t.contains(e.composedPath()[0]));
    if (current === -1) return;
    const item = this._items[current];

    switch (e.key) {
      case "ArrowRight": {
        e.preventDefault();
        const next = (current + 1) % triggers.length;
        this._items[current].hide?.();
        triggers[next].focus();
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        const prev = (current - 1 + triggers.length) % triggers.length;
        this._items[current].hide?.();
        triggers[prev].focus();
        break;
      }
      case "ArrowDown": {
        if (item.isLink) break;
        e.preventDefault();
        item.show();
        // Move focus into the first focusable element of the open panel.
        queueMicrotask(() => {
          const first = item.querySelector("a, button, [tabindex]");
          first?.focus();
        });
        break;
      }
      case "Escape": {
        if (item.isLink || !item.open) break;
        e.preventDefault();
        item.hide();
        item.focusTrigger();
        break;
      }
    }
  }
}

const CSS = `
  :host { display: block; }

  /* parent list */
  .list {
    display: flex; align-items: center; gap: var(--pura-space-1);
    list-style: none; margin: 0; padding: var(--pura-space-1);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    width: max-content; max-width: 100%;
  }

  /* item host sits inline in the row */
  :host(pura-navigation-menu-item) { display: inline-flex; position: relative; }

  /* trigger (button or link) */
  .trigger {
    anchor-name: ANCHOR;
    display: inline-flex; align-items: center; gap: var(--pura-space-1);
    font: inherit; font-size: var(--pura-text-sm); font-weight: 550;
    line-height: 1; white-space: nowrap; cursor: pointer; text-decoration: none;
    color: var(--pura-fg); background: transparent;
    border: 1px solid transparent; border-radius: var(--pura-radius-sm);
    padding: var(--pura-space-2) var(--pura-space-3); height: 2.25rem;
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease);
  }
  .trigger:hover { background: var(--pura-subtle); }
  .trigger:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .trigger[aria-expanded="true"] { background: var(--pura-subtle); }

  .chev { width: 0.85rem; height: 0.85rem; color: var(--pura-muted); flex: none;
    transition: transform var(--pura-dur) var(--pura-ease); }
  .trigger[aria-expanded="true"] .chev { transform: rotate(180deg); }

  /* floating panel via Popover API + anchor positioning */
  .panel {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    width: max-content; max-width: min(34rem, 92vw);
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease),
      transform var(--pura-dur) var(--pura-ease);
  }
  .panel:popover-open { opacity: 1; transform: none; }
  .panel-inner { padding: var(--pura-space-4); font-size: var(--pura-text-sm); }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    :host(pura-navigation-menu-item) { position: relative; }
    .panel { position: absolute; top: 100%; left: 0; inset: auto; }
  }
`;

define("pura-navigation-menu-item", PuraNavigationMenuItem);
define("pura-navigation-menu", PuraNavigationMenu);
export { PuraNavigationMenu, PuraNavigationMenuItem };
