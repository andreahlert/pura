// <pura-bottom-navigation> is a fixed bottom bar of icon plus label destinations
// (mobile style). It renders its own row of buttons from a merged item list.
//
// Two ways to supply items:
//   1. Slotted <pura-bottom-nav-item icon-path="..." label="Home" value="home"
//      active> children. PuraBottomNavItem just holds attributes, the bar reads
//      them and renders the actual buttons.
//   2. The .items property: a JSON array [{ value, label, iconPath, active }].
// The active destination is highlighted with var(--pura-accent). Clicking sets
// active and dispatches a "change" CustomEvent with detail { value }.
//
// Attributes:
//   value  the active value (reflected onto the matching button).
//   labels (bool, default true) when set to "false" shows icons only.
//   static (bool) lays the bar inline instead of fixed to the viewport bottom.
// Parts: nav, item, icon, label.
import { PuraElement, define } from "../base.js";
import meta from "./bottom-navigation.meta.js";
import { bottomNavigationTemplate } from "./bottom-navigation.template.js";

const esc = (s) => String(s).replace(/"/g, "&quot;");

// <pura-bottom-nav-item> just holds attributes. The parent bar reads them.
class PuraBottomNavItem extends PuraElement {
  static observedAttributes = ["icon-path", "label", "value", "active"];

  connectedCallback() {
    // Render nothing visible: this element is a declarative data holder.
    this.style.display = "none";
    this._notify();
  }

  attributeChangedCallback() {
    this._notify();
  }

  _notify() {
    // Ask the parent bar to re render when our attributes change.
    const bar = this.closest("pura-bottom-navigation");
    bar?._scheduleRender?.();
  }
}

class PuraBottomNavigation extends PuraElement {
  static observedAttributes = ["value", "labels", "static"];

  connectedCallback() {
    const { html, css } = bottomNavigationTemplate(this);
    this.render(html, css);
    this._nav = this.$(".nav");
    this._slot = this.$("slot");
    this._slot.addEventListener("slotchange", () => this._scheduleRender());

    // Apply a property set before upgrade.
    if (this._pendingItems !== undefined) {
      this._items = this._pendingItems;
      this._pendingItems = undefined;
    }
    this._renderItems();
  }

  attributeChangedCallback() {
    if (this._nav) this._renderItems();
  }

  // .items property: JSON array of { value, label, iconPath, active }.
  set items(v) {
    if (!this._nav) {
      this._pendingItems = v; // set before upgrade, apply on connect
      return;
    }
    this._items = v;
    this._renderItems();
  }
  get items() {
    return this._items;
  }

  get value() {
    return this.getAttribute("value");
  }
  set value(v) {
    if (v == null) this.removeAttribute("value");
    else this.setAttribute("value", v);
  }

  _scheduleRender() {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = 0;
      this._renderItems();
    });
  }

  // Merge the two sources: explicit .items wins, else read slotted item nodes.
  _resolveItems() {
    if (Array.isArray(this._items)) {
      return this._items.map((it) => ({
        value: it.value,
        label: it.label || "",
        iconPath: it.iconPath || "",
        active: !!it.active,
      }));
    }
    const nodes = [...this.querySelectorAll("pura-bottom-nav-item")];
    return nodes.map((el) => ({
      value: el.getAttribute("value"),
      label: el.getAttribute("label") || "",
      iconPath: el.getAttribute("icon-path") || "",
      active: el.hasAttribute("active"),
    }));
  }

  _renderItems() {
    const items = this._resolveItems();
    const current = this.getAttribute("value");
    const showLabels = this.getAttribute("labels") !== "false";

    // Clear out any previously rendered buttons (keep the <slot>).
    for (const b of this._nav.querySelectorAll("button")) b.remove();

    for (const it of items) {
      const active = current != null ? it.value === current : it.active;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "item";
      btn.setAttribute("part", active ? "item active" : "item");
      if (active) {
        btn.setAttribute("aria-current", "page");
        btn.dataset.active = "true";
      }
      btn.dataset.value = it.value ?? "";

      const iconHtml = it.iconPath
        ? `<svg part="icon" class="icon" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" aria-hidden="true"><path d="${esc(it.iconPath)}"/></svg>`
        : `<span part="icon" class="icon" aria-hidden="true"></span>`;
      const labelHtml = showLabels && it.label
        ? `<span part="label" class="label">${esc(it.label)}</span>`
        : "";
      btn.innerHTML = iconHtml + labelHtml;
      if (!showLabels || !it.label) btn.setAttribute("aria-label", it.label || it.value || "");

      btn.addEventListener("click", () => this._select(it.value));
      this._nav.appendChild(btn);
    }
  }

  _select(value) {
    if (value == null) return;
    this.setAttribute("value", value);
    this._renderItems();
    this.dispatchEvent(
      new CustomEvent("change", { bubbles: true, detail: { value } })
    );
  }
}


define("pura-bottom-nav-item", PuraBottomNavItem);
define("pura-bottom-navigation", PuraBottomNavigation, meta);
export { PuraBottomNavigation, PuraBottomNavItem };
