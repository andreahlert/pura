// <pura-mention> - text field (input or textarea) with an inline autocomplete
// popup. Typing a trigger char (attr `trigger`, default "@") followed by text
// opens a filtered menu of options; arrow keys navigate, Enter/Tab select,
// inserting "<trigger>label " at the caret.
//
// Source: attribute `options` (JSON array of {id,label} or strings) or the
// `.options` property. Attributes: trigger, placeholder, value, multiline (bool
// -> textarea).
// Properties: get/set value (full text), get/set options.
// Events:
//   input    { value }    - fired (bubbles) on every text change.
//   mention  { item }     - fired (bubbles) when an option is selected.
// Parts: input, menu, option.
import { PuraElement, define } from "../base.js";

let uid = 0;

class PuraMention extends PuraElement {
  static observedAttributes = ["placeholder", "value", "multiline", "trigger"];

  connectedCallback() {
    this._name = `--pura-mention-${uid++}`;
    this._options = this._parseOptions(this.getAttribute("options"));
    this._activeIndex = -1;
    this._filtered = [];
    this._range = null; // [start, end] of the active trigger token

    const multiline = this.hasAttribute("multiline");
    const ph = esc(this.getAttribute("placeholder") || "");
    const val = esc(this.getAttribute("value") || "");
    const control = multiline
      ? `<textarea part="input" class="control" rows="${this.getAttribute("rows") || 4}" placeholder="${ph}">${val}</textarea>`
      : `<input part="input" class="control" type="text" autocomplete="off" placeholder="${ph}" value="${val}" />`;

    this.render(
      `<div class="anchor" part="anchor">
         ${control}
       </div>
       <div part="menu" class="menu" role="listbox" popover="manual" tabindex="-1"></div>`,
      CSS.replaceAll("ANCHOR", this._name)
    );

    this._control = this.$(".control");
    this._menu = this.$(".menu");

    this._control.addEventListener("input", () => this._onInput());
    this._control.addEventListener("keydown", (e) => this._onKeydown(e));
    this._control.addEventListener("blur", () => this._close());

    this._menu.addEventListener("mousedown", (e) => {
      const el = e.target.closest('[role="option"]');
      if (!el) return;
      e.preventDefault(); // keep caret in the field
      this._selectIndex(Number(el.dataset.index));
    });
    this._menu.addEventListener("mousemove", (e) => {
      const el = e.target.closest('[role="option"]');
      if (el) this._setActive(Number(el.dataset.index));
    });
  }

  attributeChangedCallback(name, _old, val) {
    if (!this._control) return;
    if (name === "placeholder") this._control.placeholder = val || "";
    if (name === "value" && val !== this._control.value) this._control.value = val || "";
  }

  // ---- public API ---------------------------------------------------------
  get value() { return this._control?.value ?? this.getAttribute("value") ?? ""; }
  set value(v) {
    if (this._control) this._control.value = v ?? "";
    this.setAttribute("value", v ?? "");
  }

  get options() { return this._options; }
  set options(v) { this._options = this._normalize(v); }

  get trigger() { return this.getAttribute("trigger") || "@"; }

  // ---- internals ----------------------------------------------------------
  _parseOptions(raw) {
    if (!raw) return [];
    try { return this._normalize(JSON.parse(raw)); } catch (_) { return []; }
  }
  _normalize(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map((o) =>
      typeof o === "string" ? { id: o, label: o } : { id: o.id ?? o.label, label: o.label ?? String(o.id) }
    );
  }

  _onInput() {
    this.setAttribute("value", this._control.value);
    this.dispatchEvent(new CustomEvent("input", { detail: { value: this._control.value }, bubbles: true }));
    this._updateMenu();
  }

  // Walk back from the caret to find an active trigger token: the trigger char
  // must sit at start-of-text or be preceded by whitespace, with no whitespace
  // between it and the caret.
  _findToken() {
    const trig = this.trigger;
    const text = this._control.value;
    const caret = this._control.selectionStart ?? text.length;
    let i = caret - 1;
    while (i >= 0) {
      const ch = text[i];
      if (ch === trig) {
        const before = text[i - 1];
        if (i === 0 || /\s/.test(before)) {
          return { start: i, end: caret, query: text.slice(i + 1, caret) };
        }
        return null;
      }
      if (/\s/.test(ch)) return null;
      i--;
    }
    return null;
  }

  _updateMenu() {
    const token = this._findToken();
    if (!token) { this._close(); return; }
    this._range = [token.start, token.end];
    const q = token.query.toLowerCase();
    this._filtered = this._options.filter((o) => o.label.toLowerCase().includes(q));
    if (this._filtered.length === 0) { this._close(); return; }

    this._menu.innerHTML = this._filtered
      .map((o, i) => `<div part="option" class="option" role="option" data-index="${i}"
        aria-selected="false">${esc(o.label)}</div>`)
      .join("");
    this._setActive(0);
    this._open();
  }

  _setActive(index) {
    this._activeIndex = index;
    const opts = this.$$('[role="option"]');
    opts.forEach((el, i) => {
      el.classList.toggle("active", i === index);
      el.setAttribute("aria-selected", i === index ? "true" : "false");
    });
    if (opts[index]) opts[index].scrollIntoView({ block: "nearest" });
  }

  _move(delta) {
    const count = this._filtered.length;
    if (!count) return;
    let next = this._activeIndex + delta;
    if (next < 0) next = count - 1;
    if (next >= count) next = 0;
    this._setActive(next);
  }

  _onKeydown(e) {
    if (!this._isOpen()) return;
    switch (e.key) {
      case "ArrowDown": e.preventDefault(); this._move(1); break;
      case "ArrowUp": e.preventDefault(); this._move(-1); break;
      case "Enter":
      case "Tab":
        if (this._activeIndex >= 0) { e.preventDefault(); this._selectIndex(this._activeIndex); }
        break;
      case "Escape": e.preventDefault(); this._close(); break;
    }
  }

  _selectIndex(index) {
    const opt = this._filtered[index];
    if (!opt || !this._range) return;
    const [start, end] = this._range;
    const text = this._control.value;
    const insert = `${this.trigger}${opt.label} `;
    this._control.value = text.slice(0, start) + insert + text.slice(end);
    const caret = start + insert.length;
    this._control.setSelectionRange(caret, caret);
    this._control.focus();

    this.setAttribute("value", this._control.value);
    this.dispatchEvent(new CustomEvent("input", { detail: { value: this._control.value }, bubbles: true }));
    this.dispatchEvent(new CustomEvent("mention", { detail: { item: opt }, bubbles: true }));
    this._close();
  }

  _isOpen() { return this._menu.matches(":popover-open"); }
  _open() {
    if (this._isOpen()) return;
    try { this._menu.showPopover(); } catch (_) {}
  }
  _close() {
    if (!this._isOpen()) return;
    try { this._menu.hidePopover(); } catch (_) {}
    this._activeIndex = -1;
    this._range = null;
  }
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const CSS = `
  :host { display: block; }
  .anchor { anchor-name: ANCHOR; position: relative; display: block; }

  .control {
    width: 100%; font: inherit; font-size: var(--pura-text-sm);
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
    transition: border-color var(--pura-dur) var(--pura-ease),
      box-shadow var(--pura-dur) var(--pura-ease);
  }
  input.control { padding: 0 var(--pura-space-3); height: 2.25rem; }
  textarea.control {
    padding: var(--pura-space-3); min-height: 4.5rem; line-height: 1.55;
    resize: vertical;
  }
  .control::placeholder { color: var(--pura-muted); }
  .control:hover { border-color: var(--pura-fg); }
  .control:focus {
    outline: none; border-color: var(--pura-accent);
    box-shadow: 0 0 0 3px var(--pura-ring);
  }

  .menu {
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
  .menu:popover-open { opacity: 1; transform: none; }

  .option {
    padding: var(--pura-space-2) var(--pura-space-2);
    border-radius: var(--pura-radius-sm); cursor: pointer;
    color: var(--pura-fg); user-select: none;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .option.active { background: var(--pura-subtle); }

  @supports not (anchor-name: --x) {
    .menu { position: absolute; top: 100%; left: 0; inset: auto; margin-top: var(--pura-space-2); }
  }
`;

define("pura-mention", PuraMention);
export { PuraMention };
