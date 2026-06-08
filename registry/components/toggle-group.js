// <pura-toggle-group> — segmented group of <pura-toggle> children.
// Attributes: type ('single' radio-like | 'multiple' default), value (single:
//   reflects the pressed child's value; multiple: read .value for the array),
//   disabled (disables the whole group), orientation (horizontal default |
//   vertical). Manages children's `pressed` state on their `change` events,
//   unpressing siblings in 'single' mode. Roving focus via arrow keys.
// <pura-toggle> — a single two-state toggle button. Attributes: pressed,
//   disabled, value. Emits CustomEvent('change', { detail: { pressed, value } }).
import { PuraElement, define } from "../base.js";
import meta from "./toggle-group.meta.js";
import { toggleTemplate, toggleGroupTemplate } from "./toggle-group.template.js";

class PuraToggle extends PuraElement {
  static observedAttributes = ["pressed", "disabled"];

  connectedCallback() {
    const { html, css } = toggleTemplate(this);
    this.render(html, css);
    this._btn = this.$("button");
    this._btn.addEventListener("click", () => {
      if (this.hasAttribute("disabled")) return;
      this.toggleAttribute("pressed");
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { pressed: this.hasAttribute("pressed"), value: this.value },
          bubbles: true,
        })
      );
    });
  }

  attributeChangedCallback(name) {
    if (!this._btn) return;
    if (name === "pressed") this._btn.setAttribute("aria-pressed", this.hasAttribute("pressed"));
    if (name === "disabled") this._btn.disabled = this.hasAttribute("disabled");
  }

  get pressed() { return this.hasAttribute("pressed"); }
  set pressed(v) { this.toggleAttribute("pressed", !!v); }

  get value() { return this.getAttribute("value") ?? this.textContent.trim(); }
  set value(v) { this.setAttribute("value", v); }

  // Roving-focus helper: lets the group flip which toggle is tabbable.
  setTabbable(on) {
    if (this._btn) this._btn.tabIndex = on ? 0 : -1;
  }

  focus() {
    if (this._btn) this._btn.focus();
  }
}


class PuraToggleGroup extends PuraElement {
  static observedAttributes = ["type", "value", "disabled", "orientation"];

  connectedCallback() {
    const single = this.getAttribute("type") === "single";
    const { html, css } = toggleGroupTemplate(this);
    this.render(html, css);
    this._group = this.$("[part=group]");

    // React to any child toggle flipping state.
    this.addEventListener("change", this._onChildChange);

    // Roving focus across the toggles.
    this.addEventListener("keydown", this._onKeydown);

    // Wait for slotted children to be upgraded/laid out, then sync.
    const slot = this.$("slot");
    slot.addEventListener("slotchange", () =>
      this._sync(this._isSingle() ? this.getAttribute("value") : null)
    );
    this._sync(single ? this.getAttribute("value") : null);
  }

  disconnectedCallback() {
    this.removeEventListener("change", this._onChildChange);
    this.removeEventListener("keydown", this._onKeydown);
  }

  attributeChangedCallback(name, oldV, newV) {
    if (!this._group) return;
    // Orientation drives the CSS flex-direction (via :host([orientation]))
    // and arrow-key roving logic, not an ARIA attribute: role=group disallows
    // aria-orientation, so setting it trips aria-allowed-attr.
    if (name === "value" && this._isSingle() && oldV !== newV) {
      this._applySingleValue(newV);
    }
    if (name === "disabled") this._sync();
  }

  _isSingle() { return this.getAttribute("type") === "single"; }

  get toggles() {
    return [...this.querySelectorAll(":scope > pura-toggle")];
  }

  // Establish disabled state + initial roving tabindex, optionally seeding the
  // pressed child from a `value` (single mode).
  _sync(seedValue) {
    const items = this.toggles;
    // Group-level disable only touches its own marked toggles; per-toggle
    // `disabled` set by the consumer is preserved across enable/disable.
    if (this.hasAttribute("disabled")) {
      items.forEach((t) => {
        if (!t.hasAttribute("disabled")) {
          t.setAttribute("disabled", "");
          t.dataset.groupDisabled = "";
        }
      });
    } else {
      items.forEach((t) => {
        if ("groupDisabled" in t.dataset) {
          t.removeAttribute("disabled");
          delete t.dataset.groupDisabled;
        }
      });
    }

    if (seedValue != null && this._isSingle()) {
      this._applySingleValue(seedValue);
    }

    // Roving focus: first enabled, or first pressed, toggle is tabbable.
    const pressed = items.find((t) => t.pressed && !t.hasAttribute("disabled"));
    const firstEnabled = items.find((t) => !t.hasAttribute("disabled"));
    const tabbable = pressed || firstEnabled || null;
    items.forEach((t) => t.setTabbable(t === tabbable));
  }

  _applySingleValue(value) {
    this.toggles.forEach((t) => {
      t.toggleAttribute("pressed", t.value === value && value !== "" && value != null);
    });
  }

  _onChildChange = (e) => {
    const target = e.target;
    if (!(target instanceof PuraToggle) || target === this) return;
    // Don't let the child's raw change escape; the group re-emits its own.
    // stopImmediatePropagation also blocks sibling listeners on this same node,
    // preventing a double-fire for consumers listening on the group.
    e.stopImmediatePropagation();

    if (this._isSingle()) {
      if (target.pressed) {
        // Unpress every sibling (radio-like).
        this.toggles.forEach((t) => {
          if (t !== target) t.removeAttribute("pressed");
        });
        this.setAttribute("value", target.value);
      } else {
        // Toggling the active one off clears the group value.
        this.removeAttribute("value");
      }
    }

    // Keep the just-activated toggle as the tabbable one.
    if (!target.hasAttribute("disabled")) {
      this.toggles.forEach((t) => t.setTabbable(t === target));
    }

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.value, type: this._isSingle() ? "single" : "multiple" },
        bubbles: true,
      })
    );
  };

  _onKeydown = (e) => {
    const horizontal = this.getAttribute("orientation") !== "vertical";
    const next = horizontal ? "ArrowRight" : "ArrowDown";
    const prev = horizontal ? "ArrowLeft" : "ArrowUp";
    const items = this.toggles.filter((t) => !t.hasAttribute("disabled"));
    if (!items.length) return;

    const current = items.findIndex((t) => t.shadowRoot && t.shadowRoot.activeElement);
    let i = current;
    if (e.key === next) i = (current + 1) % items.length;
    else if (e.key === prev) i = (current - 1 + items.length) % items.length;
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = items.length - 1;
    else return;

    e.preventDefault();
    items.forEach((t, j) => t.setTabbable(j === i));
    items[i].focus();
  };

  // single: the pressed child's value (string | null).
  // multiple: array of pressed children's values.
  get value() {
    if (this._isSingle()) {
      const pressed = this.toggles.find((t) => t.pressed);
      return pressed ? pressed.value : null;
    }
    return this.toggles.filter((t) => t.pressed).map((t) => t.value);
  }

  set value(v) {
    if (this._isSingle()) {
      if (v == null) this.removeAttribute("value");
      else this.setAttribute("value", v);
    } else {
      const wanted = Array.isArray(v) ? v : [v];
      this.toggles.forEach((t) => t.toggleAttribute("pressed", wanted.includes(t.value)));
    }
  }
}


define("pura-toggle", PuraToggle);
define("pura-toggle-group", PuraToggleGroup, meta);
export { PuraToggleGroup, PuraToggle };
