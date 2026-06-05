// <pura-markdown-editor> -> split editor: a markdown textarea plus a live
// rendered preview. A small toolbar inserts common markdown at the cursor.
// The markdown-to-HTML renderer is self-contained (zero deps). Block structure
// is parsed on the raw source; every text fragment is HTML escaped before it
// reaches the output, so raw HTML in the source cannot inject into the preview.
//
// Attributes:
//   value        initial markdown text
//   placeholder  textarea placeholder
//   preview      side (default) | tab | off
//                side  textarea and preview side by side
//                tab   Write / Preview toggle, one pane at a time
//                off   textarea only
//
// value: get/set the textarea content (the markdown source).
// Events: "input" on every edit.
// Parts: toolbar, editor, preview.
import { PuraElement, define } from "../base.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";

registerMessages({
  "md.bold": { en: "Bold", "pt-BR": "Negrito", fr: "Gras", de: "Fett", it: "Grassetto" },
  "md.italic": { en: "Italic", "pt-BR": "Itálico", fr: "Italique", de: "Kursiv", it: "Corsivo" },
  "md.link": { en: "Link", "pt-BR": "Link", fr: "Lien", de: "Link", it: "Link" },
  "md.heading": { en: "Heading", "pt-BR": "Título", fr: "Titre", de: "Überschrift", it: "Titolo" },
  "md.list": { en: "List", "pt-BR": "Lista", fr: "Liste", de: "Liste", it: "Elenco" },
  "md.code": { en: "Code", "pt-BR": "Código", fr: "Code", de: "Code", it: "Codice" },
  "md.write": { en: "Write", "pt-BR": "Escrever", fr: "Écrire", de: "Schreiben", it: "Scrivi" },
  "md.preview": { en: "Preview", "pt-BR": "Visualizar", fr: "Aperçu", de: "Vorschau", it: "Anteprima" },
  "md.label": { en: "Markdown editor", "pt-BR": "Editor de markdown", fr: "Éditeur Markdown", de: "Markdown-Editor", it: "Editor Markdown" },
});

const ICONS = {
  bold: '<path d="M7 5h6a3.5 3.5 0 0 1 0 7H7z"/><path d="M7 12h7a3.5 3.5 0 0 1 0 7H7z"/>',
  italic: '<line x1="19" y1="5" x2="11" y2="5"/><line x1="13" y1="19" x2="5" y2="19"/><line x1="15" y1="5" x2="9" y2="19"/>',
  link: '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
  heading: '<path d="M4 6v12M12 6v12M4 12h8"/><path d="M17 9l3-1.5V18"/>',
  list: '<line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

// Toolbar inserts: each wraps the selection or inserts a snippet at the caret.
const TOOLS = [
  { id: "bold", labelKey: "md.bold", wrap: ["**", "**"], ph: "bold" },
  { id: "italic", labelKey: "md.italic", wrap: ["*", "*"], ph: "italic" },
  { id: "code", labelKey: "md.code", wrap: ["`", "`"], ph: "code" },
  { id: "link", labelKey: "md.link", link: true },
  { id: "heading", labelKey: "md.heading", line: "## " },
  { id: "list", labelKey: "md.list", line: "- " },
];

// ---- Markdown renderer (self-contained) -------------------------------------

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Inline spans: code, images, links, bold, italic, line breaks. Receives RAW
// (un-escaped) text and escapes it as it goes, so HTML in the source is inert.
// Code/image/link output is stashed behind sentinels so later passes and esc()
// cannot touch it; sentinels are restored last.
function inline(raw) {
  const stash = [];
  const keep = (html) => ` ${stash.push(html) - 1} `;

  let s = raw;
  // Inline code: escape its body now, then stash the element.
  s = s.replace(/`([^`]+)`/g, (_, c) => keep(`<code>${esc(c)}</code>`));
  // Images: ![alt](src)
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) =>
    keep(`<img src="${esc(safeUrl(src))}" alt="${esc(alt)}">`));
  // Links: [text](href)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, txt, href) =>
    keep(`<a href="${esc(safeUrl(href))}">${esc(txt)}</a>`));

  // Escape remaining plain text, then apply emphasis on the escaped string.
  s = esc(s);
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  s = s.replace(/_([^_]+)_/g, "<em>$1</em>");

  // Hard line break: two trailing spaces.
  s = s.replace(/  \n/g, "<br>\n");

  // Restore stashed spans.
  s = s.replace(/ (\d+) /g, (_, i) => stash[Number(i)] ?? ` ${i} `);
  return s;
}

// Only allow safe URL schemes; callers HTML escape the returned value.
function safeUrl(u) {
  const low = u.trim().toLowerCase();
  if (/^(https?:|mailto:|tel:|#|\/|\.)/.test(low) || !/^[a-z][a-z0-9+.-]*:/.test(low)) return u.trim();
  return "#";
}

function renderMarkdown(src) {
  // Parse block structure on the RAW source; inline() escapes text fragments.
  const lines = String(src).replace(/\r\n?/g, "\n").split("\n");
  const out = [];
  let i = 0;

  const flushList = (ordered, items) => {
    const tag = ordered ? "ol" : "ul";
    out.push(`<${tag}>${items.map((it) => `<li>${inline(it)}</li>`).join("")}</${tag}>`);
  };

  while (i < lines.length) {
    const line = lines[i];

    // Blank line.
    if (/^\s*$/.test(line)) { i++; continue; }

    // Fenced code block: ``` ... ``` (body escaped, never inline-parsed).
    const fence = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (fence) {
      const marker = fence[1][0];
      const buf = [];
      i++;
      const close = new RegExp(`^\\s*${marker === "`" ? "`" : "~"}{3,}\\s*$`);
      while (i < lines.length && !close.test(lines[i])) { buf.push(lines[i]); i++; }
      i++; // skip closing fence
      out.push(`<pre><code>${esc(buf.join("\n"))}</code></pre>`);
      continue;
    }

    // Horizontal rule.
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) { out.push("<hr>"); i++; continue; }

    // Heading.
    const h = line.match(/^\s*(#{1,6})\s+(.*)$/);
    if (h) { const lvl = h[1].length; out.push(`<h${lvl}>${inline(h[2].trim())}</h${lvl}>`); i++; continue; }

    // Blockquote (consecutive > lines).
    if (/^\s*>/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, "")); i++;
      }
      out.push(`<blockquote>${inline(buf.join("\n")).replace(/\n/g, "<br>")}</blockquote>`);
      continue;
    }

    // Unordered list.
    if (/^\s*[-*+]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*+]\s+/, "")); i++;
      }
      flushList(false, items);
      continue;
    }

    // Ordered list.
    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+[.)]\s+/, "")); i++;
      }
      flushList(true, items);
      continue;
    }

    // Paragraph: gather until a blank line or a block-starting line.
    const buf = [line];
    i++;
    while (i < lines.length && !/^\s*$/.test(lines[i]) &&
      !/^\s*(#{1,6}\s|>|[-*+]\s|\d+[.)]\s|`{3,}|~{3,})/.test(lines[i]) &&
      !/^\s*([-*_])(\s*\1){2,}\s*$/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    out.push(`<p>${inline(buf.join("\n")).replace(/\n/g, "<br>")}</p>`);
  }

  return out.join("\n");
}

// ---- Component --------------------------------------------------------------

class PuraMarkdownEditor extends PuraElement {
  static observedAttributes = ["value", "placeholder", "preview"];

  connectedCallback() {
    if (!this.hasAttribute("role")) this.setAttribute("role", "group");
    if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", t("md.label"));

    this._tab = "write"; // active pane in tab mode

    const tools = TOOLS.map((tl) =>
      `<button part="button" class="btn" type="button" data-id="${tl.id}"
         title="${this._esc(t(tl.labelKey))}" aria-label="${this._esc(t(tl.labelKey))}">${icon(tl.id)}</button>`
    ).join("");

    this.render(
      `<div part="toolbar" class="toolbar" role="toolbar" aria-label="${this._esc(t("md.label"))}">
         <div class="tools">${tools}</div>
         <div class="tabs" role="tablist">
           <button class="tab" type="button" data-tab="write" role="tab" aria-selected="true">${this._esc(t("md.write"))}</button>
           <button class="tab" type="button" data-tab="preview" role="tab" aria-selected="false">${this._esc(t("md.preview"))}</button>
         </div>
       </div>
       <div part="panes" class="panes">
         <textarea part="editor" class="editor" spellcheck="true"
           placeholder="${this._esc(this.getAttribute("placeholder") || "")}"></textarea>
         <div part="preview" class="preview" aria-live="polite"></div>
       </div>`,
      CSS
    );

    this._toolbar = this.$(".toolbar");
    this._editor = this.$(".editor");
    this._preview = this.$(".preview");
    this._editor.value = this.getAttribute("value") || "";

    this._onInput = () => {
      const v = this._editor.value;
      if (v !== this.getAttribute("value")) this.setAttribute("value", v);
      this._renderPreview();
      this.dispatchEvent(new CustomEvent("input", { detail: { value: v }, bubbles: true }));
    };
    this._editor.addEventListener("input", this._onInput);

    this._toolbar.querySelector(".tools").addEventListener("click", (ev) => {
      const btn = ev.target.closest(".btn");
      if (!btn) return;
      ev.preventDefault();
      this._applyTool(TOOLS.find((t2) => t2.id === btn.dataset.id));
    });

    this._toolbar.querySelector(".tabs").addEventListener("click", (ev) => {
      const tab = ev.target.closest(".tab");
      if (!tab) return;
      this._setTab(tab.dataset.tab);
    });

    this._applyMode();
    this._renderPreview();

    if (!this._i18nOff) this._i18nOff = onLocaleChange(() => this._applyI18n());
  }

  disconnectedCallback() {
    this._i18nOff?.();
    this._i18nOff = null;
  }

  attributeChangedCallback(name, oldV, newV) {
    if (!this._editor) return;
    if (name === "value" && newV !== this._editor.value) {
      this._editor.value = newV || "";
      this._renderPreview();
    } else if (name === "placeholder") {
      this._editor.placeholder = newV || "";
    } else if (name === "preview") {
      this._applyMode();
    }
  }

  get value() { return this._editor ? this._editor.value : (this.getAttribute("value") || ""); }
  set value(v) {
    if (this._editor) { this._editor.value = v || ""; this._renderPreview(); }
    if ((v || "") !== this.getAttribute("value")) this.setAttribute("value", v || "");
  }

  _mode() {
    const m = this.getAttribute("preview");
    return m === "tab" || m === "off" ? m : "side";
  }

  _applyMode() {
    const mode = this._mode();
    const panes = this.$(".panes");
    panes.setAttribute("data-mode", mode);
    const tabs = this.$(".tabs");
    if (tabs) tabs.style.display = mode === "tab" ? "" : "none";
    if (mode === "tab") this._setTab(this._tab);
    this.setAttribute("data-pura-preview", mode);
  }

  _setTab(which) {
    this._tab = which === "preview" ? "preview" : "write";
    const panes = this.$(".panes");
    panes.setAttribute("data-tab", this._tab);
    this.$$(".tab").forEach((tb) =>
      tb.setAttribute("aria-selected", tb.dataset.tab === this._tab ? "true" : "false"));
    if (this._tab === "preview") this._renderPreview();
  }

  _renderPreview() {
    if (this._mode() === "off") return;
    this._preview.innerHTML = renderMarkdown(this._editor.value);
  }

  // Insert/wrap markdown at the textarea caret, keeping focus and selection.
  _applyTool(tool) {
    if (!tool) return;
    const ta = this._editor;
    ta.focus();
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const val = ta.value;
    const selected = val.slice(start, end);

    if (tool.link) {
      const txt = selected || "text";
      const snippet = `[${txt}](https://)`;
      this._replace(start, end, snippet);
      // Select the URL placeholder ("https://", 8 chars).
      const urlStart = start + txt.length + 3;
      ta.setSelectionRange(urlStart, urlStart + 8);
    } else if (tool.wrap) {
      const [a, b] = tool.wrap;
      const inner = selected || tool.ph || "";
      this._replace(start, end, a + inner + b);
      if (selected) ta.setSelectionRange(start + a.length, end + a.length);
      else ta.setSelectionRange(start + a.length, start + a.length + inner.length);
    } else if (tool.line) {
      // Prefix each line of the selection (or the current line).
      const lineStart = val.lastIndexOf("\n", start - 1) + 1;
      const block = val.slice(lineStart, end);
      const prefixed = block.split("\n").map((l) => tool.line + l).join("\n");
      this._replace(lineStart, end, prefixed);
      ta.setSelectionRange(lineStart + tool.line.length, lineStart + prefixed.length);
    }
    this._onInput();
  }

  _replace(start, end, text) {
    const ta = this._editor;
    // Use setRangeText so native undo history is preserved where supported.
    if (typeof ta.setRangeText === "function") {
      ta.setRangeText(text, start, end, "preserve");
    } else {
      ta.value = ta.value.slice(0, start) + text + ta.value.slice(end);
    }
  }

  _applyI18n() {
    if (this._ownLabel()) this.setAttribute("aria-label", t("md.label"));
    this._toolbar?.setAttribute("aria-label", t("md.label"));
    for (const tl of TOOLS) {
      const btn = this._toolbar?.querySelector(`.btn[data-id="${tl.id}"]`);
      if (btn) { btn.title = t(tl.labelKey); btn.setAttribute("aria-label", t(tl.labelKey)); }
    }
    const wt = this._toolbar?.querySelector('.tab[data-tab="write"]');
    const pt = this._toolbar?.querySelector('.tab[data-tab="preview"]');
    if (wt) wt.textContent = t("md.write");
    if (pt) pt.textContent = t("md.preview");
  }

  _ownLabel() {
    const cur = this.getAttribute("aria-label");
    return cur === null || ["Markdown editor", "Editor de markdown", "Éditeur Markdown",
      "Markdown-Editor", "Editor Markdown"].includes(cur);
  }

  _esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
}

const CSS = `
  :host { display: block; }

  .toolbar {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-2);
    padding: var(--pura-space-2);
    background: var(--pura-bg);
    border: 1px solid var(--pura-border);
    border-bottom: 0;
    border-radius: var(--pura-radius) var(--pura-radius) 0 0;
  }
  .tools { display: flex; flex-wrap: wrap; gap: var(--pura-space-1); }

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

  .tabs { display: flex; gap: var(--pura-space-1); }
  .tab {
    font: inherit; font-size: var(--pura-text-xs); font-weight: 550;
    color: var(--pura-muted-fg); cursor: pointer;
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--pura-radius-sm);
    padding: 0.3rem var(--pura-space-3);
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease);
  }
  .tab:hover { background: var(--pura-subtle); color: var(--pura-fg); }
  .tab:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .tab[aria-selected="true"] {
    background: var(--pura-subtle); color: var(--pura-fg);
    border-color: var(--pura-border-strong);
  }

  .panes {
    display: grid;
    border: 1px solid var(--pura-border-strong);
    border-radius: 0 0 var(--pura-radius) var(--pura-radius);
    box-shadow: var(--pura-shadow-sm);
    overflow: hidden;
    background: var(--pura-bg);
  }
  .panes[data-mode="side"] { grid-template-columns: 1fr 1fr; }
  .panes[data-mode="off"] { grid-template-columns: 1fr; }
  .panes[data-mode="off"] .preview { display: none; }
  .panes[data-mode="tab"] { grid-template-columns: 1fr; }
  .panes[data-mode="tab"][data-tab="write"] .preview { display: none; }
  .panes[data-mode="tab"][data-tab="preview"] .editor { display: none; }

  .editor {
    width: 100%; min-height: 14rem; resize: vertical;
    padding: var(--pura-space-3) var(--pura-space-4);
    font-family: var(--pura-font-mono); font-size: var(--pura-text-sm);
    line-height: 1.6; color: var(--pura-fg);
    background: var(--pura-bg); border: 0; outline: none;
  }
  .editor::placeholder { color: var(--pura-muted); }
  .panes[data-mode="side"] .editor { border-right: 1px solid var(--pura-border); }

  .preview {
    min-height: 14rem; overflow-y: auto;
    padding: var(--pura-space-3) var(--pura-space-4);
    font-size: var(--pura-text-sm); line-height: 1.6;
    color: var(--pura-fg); background: var(--pura-bg);
  }
  .preview > :first-child { margin-top: 0; }
  .preview h1 { font-size: var(--pura-text-xl); margin: 0.5em 0 0.3em; line-height: 1.25; }
  .preview h2 { font-size: var(--pura-text-lg); margin: 0.5em 0 0.3em; line-height: 1.3; }
  .preview h3, .preview h4, .preview h5, .preview h6 {
    font-size: var(--pura-text-base); margin: 0.5em 0 0.3em;
  }
  .preview p { margin: 0.5em 0; }
  .preview ul, .preview ol { margin: 0.5em 0; padding-left: 1.5em; }
  .preview a { color: var(--pura-accent); text-decoration: underline; }
  .preview img { max-width: 100%; height: auto; border-radius: var(--pura-radius-sm); }
  .preview hr { border: 0; border-top: 1px solid var(--pura-border); margin: 1em 0; }
  .preview blockquote {
    margin: 0.5em 0; padding: 0.25em 0 0.25em var(--pura-space-3);
    border-left: 3px solid var(--pura-border-strong); color: var(--pura-muted-fg);
  }
  .preview code {
    font-family: var(--pura-font-mono); font-size: 0.9em;
    background: var(--pura-subtle); padding: 0.1em 0.3em;
    border-radius: var(--pura-radius-sm);
  }
  .preview pre {
    margin: 0.5em 0; padding: var(--pura-space-3);
    background: var(--pura-subtle); border-radius: var(--pura-radius-sm);
    overflow-x: auto;
  }
  .preview pre code { background: transparent; padding: 0; }
`;

define("pura-markdown-editor", PuraMarkdownEditor);
export { PuraMarkdownEditor };
