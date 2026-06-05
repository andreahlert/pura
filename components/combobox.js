// <pura-combobox> — autocomplete select. Reads its option set from light-DOM
// <option value label> children, renders a text input (role=combobox) that opens
// a popover listbox filtered by substring of the typed text. Arrow Up/Down move
// aria-activedescendant across visible options, Enter selects, Esc closes.
// Selecting fills the input with the label, sets .value/value attr, and emits
// CustomEvent('change', { detail: { value, label } }).
// Built on the native Popover API + CSS anchor positioning (see popover.js).
// Attributes: placeholder, value, disabled.
import { PuraElement, define } from "../base.js";

let uid = 0;

class PuraCombobox extends PuraElement {
  static observedAttributes = ["placeholder", "value", "disabled"];

  connectedCallback() {
    this._name = `--pura-combobox-${uid++}`;
    this._listId = `pura-combobox-list-${uid}`;
    // Read the option set from light-DOM <option value label> children.
    this._options = [...this.querySelectorAll("option")].map((o) => ({
      value: o.getAttribute("value") ?? o.textContent.trim(),
      label: (o.getAttribute("label") ?? o.textContent).trim(),
    }));

    this.render(
      `<div class="anchor" part="anchor">
         <input part="input" class="input" type="text" role="combobox" autocomplete="off"
           spellcheck="false" aria-autocomplete="list" aria-expanded="false"
           aria-controls="${this._listId}"
           placeholder="${this._esc(this.getAttribute("placeholder") || "")}"
           ${this.hasAttribute("disabled") ? "disabled" : ""} />
         <svg class="chev" part="chevron" viewBox="0 0 24 24" aria-hidden="true">
           <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
       </div>
       <div part="listbox" class="listbox" id="${this._listId}" role="listbox"
         popover="manual" tabindex="-1"></div>`,
      CSS.replaceAll("ANCHOR", this._name)
    );

    this._anchor = this.$(".anchor");
    this._input = this.$(".input");
    this._list = this.$(".listbox");
    this._activeIndex = -1;
    this._filtered = [];

    // Apply an initial value (matches an option by value).
    const initial = this.getAttribute("value");
    if (initial != null && initial !== "") {
      const match = this._options.find((o) => o.value === initial);
      if (match) {
        this._value = match.value;
        this._input.value = match.label;
      }
    }

    this._renderOptions("");

    this._input.addEventListener("input", () => {
      this._renderOptions(this._input.value);
      this._open();
    });
    this._input.addEventListener("focus", () => {
      this._renderOptions(this._input.value);
      this._open();
    });
    this._input.addEventListener("click", () => this._open());
    this._input.addEventListener("keydown", (e) => this._onKeydown(e));

    // Click an option to select it.
    this._list.addEventListener("mousedown", (e) => {
      const el = e.target.closest('[role="option"]');
      if (!el) return;
      e.preventDefault(); // keep focus on the input
      this._selectIndex(Number(el.dataset.index));
    });
    this._list.addEventListener("mousemove", (e) => {
      const el = e.target.closest('[role="option"]');
      if (el) this._setActive(Number(el.dataset.index));
    });

    // Outside click closes the listbox.
    this._onDocPointer = (e) => {
      if (!this.contains(e.target)) this._close();
    };
    document.addEventListener("pointerdown", this._onDocPointer, true);
  }

  disconnectedCallback() {
    if (this._onDocPointer) document.removeEventListener("pointerdown", this._onDocPointer, true);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (!this._input) return;
    if (name === "placeholder") this._input.placeholder = newVal || "";
    if (name === "disabled") this._input.disabled = this.hasAttribute("disabled");
    if (name === "value" && newVal !== this._value) {
      const match = this._options.find((o) => o.value === newVal);
      if (match) {
        this._value = match.value;
        this._input.value = match.label;
      }
    }
  }

  // ---- public API ---------------------------------------------------------
  get value() { return this._value ?? this.getAttribute("value") ?? ""; }
  set value(v) {
    const match = this._options.find((o) => o.value === v);
    this._value = match ? match.value : v;
    if (this._input) this._input.value = match ? match.label : "";
    if (match) this.setAttribute("value", match.value);
    else this.removeAttribute("value");
  }

  // ---- internals ----------------------------------------------------------
  _esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
      .replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  _renderOptions(query) {
    const q = query.trim().toLowerCase();
    this._filtered = this._options.filter((o) => o.label.toLowerCase().includes(q));
    if (this._filtered.length === 0) {
      this._list.innerHTML = `<div part="empty" class="empty">No results</div>`;
    } else {
      this._list.innerHTML = this._filtered
        .map((o, i) => {
          const selected = o.value === this._value;
          return `<div part="option" class="option" role="option" data-index="${i}"
            id="${this._listId}-opt-${i}" aria-selected="${selected ? "true" : "false"}">
            <span class="check" part="check" aria-hidden="true">${selected ? CHECK : ""}</span>
            <span class="opt-label">${this._esc(o.label)}</span>
          </div>`;
        })
        .join("");
    }
    // Reset active option to the selected one (if visible) or the first.
    const selIdx = this._filtered.findIndex((o) => o.value === this._value);
    this._setActive(selIdx >= 0 ? selIdx : this._filtered.length ? 0 : -1);
  }

  _setActive(index) {
    this._activeIndex = index;
    const opts = this.$$('[role="option"]');
    opts.forEach((el, i) => el.classList.toggle("active", i === index));
    const active = index >= 0 ? opts[index] : null;
    if (active) {
      this._input.setAttribute("aria-activedescendant", active.id);
      active.scrollIntoView({ block: "nearest" });
    } else {
      this._input.removeAttribute("aria-activedescendant");
    }
  }

  _move(delta) {
    const count = this._filtered.length;
    if (count === 0) return;
    let next = this._activeIndex + delta;
    if (next < 0) next = count - 1;
    if (next >= count) next = 0;
    this._setActive(next);
  }

  _onKeydown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!this._isOpen()) { this._renderOptions(this._input.value); this._open(); }
        else this._move(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!this._isOpen()) { this._renderOptions(this._input.value); this._open(); }
        else this._move(-1);
        break;
      case "Enter":
        if (this._isOpen() && this._activeIndex >= 0) {
          e.preventDefault();
          this._selectIndex(this._activeIndex);
        }
        break;
      case "Escape":
        if (this._isOpen()) { e.preventDefault(); this._close(); }
        break;
      case "Tab":
        this._close();
        break;
    }
  }

  _selectIndex(index) {
    const opt = this._filtered[index];
    if (!opt) return;
    this._value = opt.value;
    this._input.value = opt.label;
    this.setAttribute("value", opt.value);
    this.dispatchEvent(new CustomEvent("change", {
      detail: { value: opt.value, label: opt.label },
      bubbles: true,
    }));
    this._close();
  }

  _isOpen() { return this._input.getAttribute("aria-expanded") === "true"; }

  _open() {
    if (this.hasAttribute("disabled") || this._isOpen()) return;
    this._list.showPopover();
    this._input.setAttribute("aria-expanded", "true");
  }

  _close() {
    if (!this._isOpen()) return;
    this._list.hidePopover();
    this._input.setAttribute("aria-expanded", "false");
    this._input.removeAttribute("aria-activedescendant");
    this._setActive(-1);
  }
}

const CHECK =
  `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;

const CSS = `
  :host { display: block; }

  .anchor { anchor-name: ANCHOR; position: relative; display: block; }

  .input {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    padding: 0 var(--pura-space-6) 0 var(--pura-space-3); height: 2.25rem;
    box-shadow: var(--pura-shadow-sm); cursor: text;
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  .input::placeholder { color: var(--pura-muted); }
  .input:hover { border-color: var(--pura-fg); }
  .input:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }
  .input:disabled { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }
  :host([disabled]) { cursor: not-allowed; }

  .chev {
    position: absolute; right: var(--pura-space-3); top: 50%; transform: translateY(-50%);
    width: 1rem; height: 1rem; color: var(--pura-muted); pointer-events: none;
  }

  .listbox {
    position: absolute; position-anchor: ANCHOR;
    margin: 0; inset: auto; box-sizing: border-box;
    top: anchor(bottom); left: anchor(left); margin-top: var(--pura-space-2);
    min-width: anchor-size(width); width: max-content; max-width: min(24rem, 92vw);
    max-height: 16rem; overflow-y: auto;
    background: var(--pura-bg); color: var(--pura-fg);
    border: 1px solid var(--pura-border); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-lg); padding: var(--pura-space-1);
    font-size: var(--pura-text-sm);
    opacity: 0; transform: translateY(-4px);
    transition: opacity var(--pura-dur) var(--pura-ease), transform var(--pura-dur) var(--pura-ease);
  }
  .listbox:popover-open { opacity: 1; transform: none; }

  .option {
    display: flex; align-items: center; gap: var(--pura-space-2);
    padding: var(--pura-space-2) var(--pura-space-2);
    border-radius: var(--pura-radius-sm); cursor: pointer;
    color: var(--pura-fg); user-select: none;
  }
  .option.active { background: var(--pura-subtle); }
  .option[aria-selected="true"] { font-weight: 550; }
  .opt-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .check {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1rem; height: 1rem; flex: none; color: var(--pura-fg);
  }

  .empty {
    padding: var(--pura-space-3) var(--pura-space-2);
    color: var(--pura-muted); text-align: center; font-size: var(--pura-text-sm);
  }

  /* graceful fallback if anchor positioning is unsupported */
  @supports not (anchor-name: --x) {
    .listbox { position: absolute; top: 100%; left: 0; inset: auto; margin-top: var(--pura-space-2); }
  }
`;

define("pura-combobox", PuraCombobox);
export { PuraCombobox };
