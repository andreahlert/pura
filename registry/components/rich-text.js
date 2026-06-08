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
import { richTextTemplate, ACTIONS } from "./rich-text.template.js";

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

class PuraRichText extends PuraElement {
  static observedAttributes = ["placeholder", "value", "disabled"];

  connectedCallback() {
    if (!this.hasAttribute("role")) this.setAttribute("role", "group");
    if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", t("rich-text.label"));

    const { html, css } = richTextTemplate(this);
    this.render(html, css);

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
}

define("pura-rich-text", PuraRichText, meta);
export { PuraRichText };
