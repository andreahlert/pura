// <pura-rich-text> -> WYSIWYG editor: a toolbar plus a contenteditable region.
// Toolbar: bold, italic, underline, strikethrough, h1/h2, bullet/ordered lists,
// link, blockquote, code, clear formatting. Formatting goes through
// document.execCommand. execCommand is deprecated, but it remains the only
// zero-dependency, cross-browser way to drive rich-text editing on a
// contenteditable, so it is used deliberately here.
//
// Attributes:
//   placeholder  shown when the editor is empty
//   value        initial HTML for the editable area
//   disabled     blocks editing and the toolbar
//
// value: get/set the innerHTML of the editable region.
// Events: "input" on every edit; "change" on blur after a change.
// Parts: toolbar, button, editor.
// Keyboard: Ctrl/Cmd+B / I / U map to bold / italic / underline.
import { PuraElement, define } from "../base.js";
import meta from "./rich-text.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "rich-text.bold": { en: "Bold", "pt-BR": "Negrito", fr: "Gras", de: "Fett", it: "Grassetto" },
  "rich-text.italic": { en: "Italic", "pt-BR": "Itálico", fr: "Italique", de: "Kursiv", it: "Corsivo" },
  "rich-text.underline": { en: "Underline", "pt-BR": "Sublinhado", fr: "Souligné", de: "Unterstrichen", it: "Sottolineato" },
  "rich-text.strike": { en: "Strikethrough", "pt-BR": "Tachado", fr: "Barré", de: "Durchgestrichen", it: "Barrato" },
  "rich-text.h1": { en: "Heading 1", "pt-BR": "Título 1", fr: "Titre 1", de: "Überschrift 1", it: "Titolo 1" },
  "rich-text.h2": { en: "Heading 2", "pt-BR": "Título 2", fr: "Titre 2", de: "Überschrift 2", it: "Titolo 2" },
  "rich-text.ul": { en: "Bullet list", "pt-BR": "Lista com marcadores", fr: "Liste à puces", de: "Aufzählungsliste", it: "Elenco puntato" },
  "rich-text.ol": { en: "Numbered list", "pt-BR": "Lista numerada", fr: "Liste numérotée", de: "Nummerierte Liste", it: "Elenco numerato" },
  "rich-text.link": { en: "Insert link", "pt-BR": "Inserir link", fr: "Insérer un lien", de: "Link einfügen", it: "Inserisci link" },
  "rich-text.quote": { en: "Quote", "pt-BR": "Citação", fr: "Citation", de: "Zitat", it: "Citazione" },
  "rich-text.code": { en: "Code", "pt-BR": "Código", fr: "Code", de: "Code", it: "Codice" },
  "rich-text.clear": { en: "Clear formatting", "pt-BR": "Limpar formatação", fr: "Effacer la mise en forme", de: "Formatierung löschen", it: "Cancella formattazione" },
  "rich-text.linkPrompt": { en: "Link URL", "pt-BR": "URL do link", fr: "URL du lien", de: "Link-URL", it: "URL del link" },
  "rich-text.label": { en: "Rich text editor", "pt-BR": "Editor de texto formatado", fr: "Éditeur de texte enrichi", de: "Rich-Text-Editor", it: "Editor di testo formattato" },
});

// Icon paths (viewBox 0 0 24 24, stroke=currentColor). Kept as inner markup.
const ICONS = {
  bold: '<path d="M7 5h6a3.5 3.5 0 0 1 0 7H7z"/><path d="M7 12h7a3.5 3.5 0 0 1 0 7H7z"/>',
  italic: '<line x1="19" y1="5" x2="11" y2="5"/><line x1="13" y1="19" x2="5" y2="19"/><line x1="15" y1="5" x2="9" y2="19"/>',
  underline: '<path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="5" y1="20" x2="19" y2="20"/>',
  strike: '<path d="M16 5a4 4 0 0 0-4-2c-2.5 0-4 1.5-4 3 0 1.4 1 2.3 3 3"/><path d="M8 18a4 4 0 0 0 4 2c2.5 0 4-1.4 4-3 0-1-.4-1.8-1.3-2.4"/><line x1="4" y1="12" x2="20" y2="12"/>',
  h1: '<path d="M4 6v12M12 6v12M4 12h8"/><path d="M17 10l3-2v10"/>',
  h2: '<path d="M4 6v12M12 6v12M4 12h8"/><path d="M16 10a2 2 0 1 1 3.5 1.4L16 18h4"/>',
  ul: '<line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
  ol: '<line x1="10" y1="6" x2="20" y2="6"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="10" y1="18" x2="20" y2="18"/><path d="M4 6h1v4M4 10h2"/><path d="M4 14h2v1l-2 2h2"/>',
  link: '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
  quote: '<path d="M7 7H4v6h5V9c0 2-1 3-3 3"/><path d="M17 7h-3v6h5V9c0 2-1 3-3 3"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  clear: '<path d="M9 5h11M9 5l-2 14M14 5l-1 7"/><line x1="4" y1="20" x2="14" y2="20"/><line x1="16" y1="14" x2="22" y2="20"/><line x1="22" y1="14" x2="16" y2="20"/>',
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

// Toolbar actions: [id, command, state-command-or-null].
// `cmd` is what execCommand runs; `state` is queried for active styling.
const ACTIONS = [
  { id: "bold", labelKey: "rich-text.bold", run: (e) => e._cmd("bold"), state: "bold" },
  { id: "italic", labelKey: "rich-text.italic", run: (e) => e._cmd("italic"), state: "italic" },
  { id: "underline", labelKey: "rich-text.underline", run: (e) => e._cmd("underline"), state: "underline" },
  { id: "strike", labelKey: "rich-text.strike", run: (e) => e._cmd("strikeThrough"), state: "strikeThrough" },
  { sep: true },
  { id: "h1", labelKey: "rich-text.h1", run: (e) => e._heading("H1") },
  { id: "h2", labelKey: "rich-text.h2", run: (e) => e._heading("H2") },
  { sep: true },
  { id: "ul", labelKey: "rich-text.ul", run: (e) => e._cmd("insertUnorderedList"), state: "insertUnorderedList" },
  { id: "ol", labelKey: "rich-text.ol", run: (e) => e._cmd("insertOrderedList"), state: "insertOrderedList" },
  { sep: true },
  { id: "link", labelKey: "rich-text.link", run: (e) => e._link() },
  { id: "quote", labelKey: "rich-text.quote", run: (e) => e._block("BLOCKQUOTE") },
  { id: "code", labelKey: "rich-text.code", run: (e) => e._block("PRE") },
  { sep: true },
  { id: "clear", labelKey: "rich-text.clear", run: (e) => e._clear() },
];

class PuraRichText extends PuraElement {
  static observedAttributes = ["placeholder", "value", "disabled"];

  connectedCallback() {
    if (!this.hasAttribute("role")) this.setAttribute("role", "group");
    if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", t("rich-text.label"));

    const buttons = ACTIONS.map((a) =>
      a.sep
        ? '<span class="sep" part="separator" aria-hidden="true"></span>'
        : `<button part="button" class="btn" type="button" data-id="${a.id}"
             title="${this._esc(t(a.labelKey))}" aria-label="${this._esc(t(a.labelKey))}"
             aria-pressed="false">${icon(a.id)}</button>`
    ).join("");

    this.render(
      `<div part="toolbar" class="toolbar" role="toolbar" aria-label="${this._esc(t("rich-text.label"))}">${buttons}</div>
       <div part="editor" class="editor" contenteditable="true"
         role="textbox" aria-multiline="true"
         data-placeholder="${this._esc(this.getAttribute("placeholder") || "")}"></div>`,
      CSS
    );

    this._toolbar = this.$(".toolbar");
    this._editor = this.$(".editor");
    this._editor.innerHTML = this.getAttribute("value") || "";

    this._onToolClick = (ev) => {
      const btn = ev.target.closest(".btn");
      if (!btn || this.hasAttribute("disabled")) return;
      ev.preventDefault();
      const action = ACTIONS.find((a) => a.id === btn.dataset.id);
      this._editor.focus();
      action?.run(this);
      this._emitInput();
      this._syncState();
    };
    // Use mousedown so the editor keeps its selection (click would blur it).
    this._toolbar.addEventListener("mousedown", (ev) => {
      if (ev.target.closest(".btn")) ev.preventDefault();
    });
    this._toolbar.addEventListener("click", this._onToolClick);

    this._onInput = () => this._emitInput();
    this._editor.addEventListener("input", this._onInput);

    this._onKeydown = (ev) => {
      if (this.hasAttribute("disabled")) return;
      const mod = ev.ctrlKey || ev.metaKey;
      if (!mod) return;
      const k = ev.key.toLowerCase();
      const map = { b: "bold", i: "italic", u: "underline" };
      if (map[k]) {
        ev.preventDefault();
        this._cmd(map[k]);
        this._emitInput();
        this._syncState();
      }
    };
    this._editor.addEventListener("keydown", this._onKeydown);

    this._onSelect = () => this._syncState();
    this._editor.addEventListener("keyup", this._onSelect);
    this._editor.addEventListener("mouseup", this._onSelect);
    document.addEventListener("selectionchange", this._onSelect);

    this._dirty = false;
    this._onBlur = () => {
      if (this._dirty) {
        this._dirty = false;
        this.dispatchEvent(new CustomEvent("change", { detail: { value: this.value }, bubbles: true }));
      }
    };
    this._editor.addEventListener("blur", this._onBlur);

    this._applyDisabled();
    this._syncState();

    if (!this._i18nOff) this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    document.removeEventListener("selectionchange", this._onSelect);
    this._i18nOff?.();
    this._i18nOff = null;
  }

  attributeChangedCallback(name, oldV, newV) {
    if (!this._editor) return;
    if (name === "value" && newV !== this._editor.innerHTML) {
      this._editor.innerHTML = newV || "";
    } else if (name === "placeholder") {
      this._editor.setAttribute("data-placeholder", newV || "");
    } else if (name === "disabled") {
      this._applyDisabled();
    }
  }

  get value() { return this._editor ? this._editor.innerHTML : (this.getAttribute("value") || ""); }
  set value(v) {
    if (this._editor) this._editor.innerHTML = v || "";
    if ((v || "") !== this.getAttribute("value")) this.setAttribute("value", v || "");
  }

  _applyDisabled() {
    const off = this.hasAttribute("disabled");
    this._editor.setAttribute("contenteditable", off ? "false" : "true");
    this._editor.setAttribute("aria-disabled", off ? "true" : "false");
    this.$$(".btn").forEach((b) => (b.disabled = off));
  }

  _emitInput() {
    this._dirty = true;
    // Keep the attribute in sync for SSR-like reflection without clobbering caret.
    const html = this._editor.innerHTML;
    if (html !== this.getAttribute("value")) this.setAttribute("value", html);
    this.dispatchEvent(new CustomEvent("input", { detail: { value: html }, bubbles: true }));
  }

  // execCommand wrapper. Deprecated API, used intentionally (see header).
  _cmd(command, arg = null) {
    try { document.execCommand(command, false, arg); } catch (_) {}
  }

  // Toggle a heading: if already that heading, revert to paragraph.
  _heading(tag) {
    const cur = this._currentBlockTag();
    this._cmd("formatBlock", cur === tag ? "P" : tag);
  }

  // Toggle a block wrapper (blockquote / pre).
  _block(tag) {
    const cur = this._currentBlockTag();
    this._cmd("formatBlock", cur === tag ? "P" : tag);
  }

  _currentBlockTag() {
    const sel = (this.shadowRoot.getSelection ? this.shadowRoot.getSelection() : window.getSelection());
    let node = sel && sel.anchorNode;
    if (!node) return "";
    if (node.nodeType === 3) node = node.parentNode;
    while (node && node !== this._editor) {
      if (/^(H1|H2|H3|BLOCKQUOTE|PRE|P)$/.test(node.nodeName)) return node.nodeName;
      node = node.parentNode;
    }
    return "";
  }

  _link() {
    const url = window.prompt(t("rich-text.linkPrompt"), "https://");
    if (url) this._cmd("createLink", url);
  }

  _clear() {
    this._cmd("removeFormat");
    this._cmd("formatBlock", "P");
    this._cmd("unlink");
  }

  // Reflect active formatting onto button pressed-state via queryCommandState.
  _syncState() {
    if (!this._toolbar) return;
    for (const a of ACTIONS) {
      if (a.sep || !a.state) continue;
      let on = false;
      try { on = document.queryCommandState(a.state); } catch (_) {}
      const btn = this._toolbar.querySelector(`.btn[data-id="${a.id}"]`);
      if (btn) {
        btn.classList.toggle("active", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      }
    }
  }

  _applyI18n() {
    if (this.getAttribute("aria-label") === null || this._ownLabel()) {
      this.setAttribute("aria-label", t("rich-text.label"));
    }
    this._toolbar?.setAttribute("aria-label", t("rich-text.label"));
    for (const a of ACTIONS) {
      if (a.sep) continue;
      const btn = this._toolbar?.querySelector(`.btn[data-id="${a.id}"]`);
      if (btn) {
        btn.title = t(a.labelKey);
        btn.setAttribute("aria-label", t(a.labelKey));
      }
    }
  }

  _ownLabel() {
    // Treat label as owned if it matches any localized default for this component.
    const cur = this.getAttribute("aria-label");
    return ["Rich text editor", "Editor de texto formatado", "Éditeur de texte enrichi",
      "Rich-Text-Editor", "Editor di testo formattato"].includes(cur);
  }

  _esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
}

const CSS = `
  :host { display: block; }

  .toolbar {
    display: flex; flex-wrap: wrap; align-items: center;
    gap: var(--pura-space-1);
    padding: var(--pura-space-2);
    background: var(--pura-bg);
    border: 1px solid var(--pura-border);
    border-bottom: 0;
    border-radius: var(--pura-radius) var(--pura-radius) 0 0;
  }
  .sep {
    width: 1px; height: 1.25rem; margin: 0 var(--pura-space-1);
    background: var(--pura-border);
  }

  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    width: 2rem; height: 2rem; padding: 0;
    color: var(--pura-muted-fg);
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--pura-radius-sm);
    cursor: pointer;
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease);
  }
  .btn:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .btn.active {
    background: var(--pura-subtle); color: var(--pura-fg);
    border-color: var(--pura-border-strong);
  }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .editor {
    min-height: 8rem; max-height: 28rem; overflow-y: auto;
    padding: var(--pura-space-3) var(--pura-space-4);
    font-size: var(--pura-text-sm); line-height: 1.6;
    color: var(--pura-fg); background: var(--pura-bg);
    border: 1px solid var(--pura-border-strong);
    border-radius: 0 0 var(--pura-radius) var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
  }
  .editor:focus { outline: none; border-color: var(--pura-accent); box-shadow: 0 0 0 3px var(--pura-ring); }
  .editor[aria-disabled="true"] { opacity: 0.55; cursor: not-allowed; background: var(--pura-subtle); }
  .editor:empty::before {
    content: attr(data-placeholder);
    color: var(--pura-muted);
    pointer-events: none;
  }

  /* Content styling (scoped to the editor surface). */
  .editor h1 { font-size: var(--pura-text-xl); margin: 0.4em 0; line-height: 1.25; }
  .editor h2 { font-size: var(--pura-text-lg); margin: 0.4em 0; line-height: 1.3; }
  .editor p { margin: 0.5em 0; }
  .editor ul, .editor ol { margin: 0.5em 0; padding-left: 1.5em; }
  .editor a { color: var(--pura-accent); text-decoration: underline; }
  .editor blockquote {
    margin: 0.5em 0; padding: 0.25em 0 0.25em var(--pura-space-3);
    border-left: 3px solid var(--pura-border-strong); color: var(--pura-muted-fg);
  }
  .editor pre {
    margin: 0.5em 0; padding: var(--pura-space-3);
    font-family: var(--pura-font-mono); font-size: var(--pura-text-xs);
    background: var(--pura-subtle); border-radius: var(--pura-radius-sm);
    white-space: pre-wrap; overflow-x: auto;
  }
`;

define("pura-rich-text", PuraRichText, meta);
export { PuraRichText };
