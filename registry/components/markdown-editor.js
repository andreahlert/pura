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
import meta from "./markdown-editor.meta.js";
import { t, onLocaleChange, registerMessages } from "../i18n.js";
import { markdownEditorTemplate, TOOLS } from "./markdown-editor.template.js";

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

    const { html, css } = markdownEditorTemplate(this);
    this.render(html, css);

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
}

define("pura-markdown-editor", PuraMarkdownEditor, meta);
export { PuraMarkdownEditor };
