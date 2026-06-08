// Pure render for <pura-markdown-editor>. No DOM; SSR/DSD + client safe.
// Renders the toolbar (insert buttons from TOOLS + icons + tab toggle) and the
// empty editor/preview panes. The textarea value and the rendered preview are
// filled by the component after render (the markdown engine lives there), so the
// initial markup is fully static: toolbar + i18n labels + [placeholder]. TOOLS is
// owned here and re-exported for the component's tool-insert + i18n handlers.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

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
export const TOOLS = [
  { id: "bold", labelKey: "md.bold", wrap: ["**", "**"], ph: "bold" },
  { id: "italic", labelKey: "md.italic", wrap: ["*", "*"], ph: "italic" },
  { id: "code", labelKey: "md.code", wrap: ["`", "`"], ph: "code" },
  { id: "link", labelKey: "md.link", link: true },
  { id: "heading", labelKey: "md.heading", line: "## " },
  { id: "list", labelKey: "md.list", line: "- " },
];

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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

export function markdownEditorTemplate(el = EMPTY_SHIM) {
  const tools = TOOLS.map((tl) =>
    `<button part="button" class="btn" type="button" data-id="${tl.id}"
         title="${esc(t(tl.labelKey))}" aria-label="${esc(t(tl.labelKey))}">${icon(tl.id)}</button>`
  ).join("");
  const ph = esc(el.getAttribute("placeholder") || "");

  const html = `<div part="toolbar" class="toolbar" role="toolbar" aria-label="${esc(t("md.label"))}">
         <div class="tools">${tools}</div>
         <div class="tabs" role="tablist">
           <button class="tab" type="button" data-tab="write" role="tab" aria-selected="true">${esc(t("md.write"))}</button>
           <button class="tab" type="button" data-tab="preview" role="tab" aria-selected="false">${esc(t("md.preview"))}</button>
         </div>
       </div>
       <div part="panes" class="panes">
         <textarea part="editor" class="editor" spellcheck="true"
           placeholder="${ph}"></textarea>
         <div part="preview" class="preview" aria-live="polite"></div>
       </div>`;
  return { html, css: CSS };
}
