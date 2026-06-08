// Pure render for <pura-code-block>. No DOM; SSR/DSD + client safe.
// Renders the always-present header (filename/language optional, copy button
// fixed) plus the <pre><code><slot></slot></code></pre> body. Under EMPTY_SHIM
// language/filename resolve to "" (header still emits the copy affordance) and
// the copy label/aria resolve to the default-locale strings.
import { EMPTY_SHIM } from "../base.js";
import { t } from "../i18n.js";

// Quote-safe escaping for header text/attributes (code-block order: & < > ").
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const CSS = `
  :host { display: block; }

  figure[part="root"] {
    margin: 0;
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-lg);
    background: var(--pura-subtle);
    overflow: hidden;
    font-size: var(--pura-text-sm);
  }

  .header {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--pura-space-3);
    padding: var(--pura-space-2) var(--pura-space-3);
    border-bottom: 1px solid var(--pura-border);
    background: var(--pura-bg);
  }
  .meta {
    display: inline-flex; align-items: center; gap: var(--pura-space-2);
    min-width: 0;
  }
  .filename {
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-xs);
    color: var(--pura-fg);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .language {
    font-size: var(--pura-text-xs); line-height: 1;
    text-transform: uppercase; letter-spacing: 0.03em;
    color: var(--pura-muted);
    padding: 0.2rem var(--pura-space-2);
    border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius-full);
    background: var(--pura-subtle);
  }

  .copy {
    display: inline-flex; align-items: center; gap: var(--pura-space-1);
    flex: none;
    font: inherit; font-size: var(--pura-text-xs); font-weight: 550;
    line-height: 1; cursor: pointer;
    color: var(--pura-muted-fg);
    background: transparent;
    border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius-sm);
    padding: 0.3rem var(--pura-space-2);
    transition: background var(--pura-dur) var(--pura-ease),
      color var(--pura-dur) var(--pura-ease),
      border-color var(--pura-dur) var(--pura-ease);
  }
  .copy:hover { background: var(--pura-subtle-hover); color: var(--pura-fg); }
  .copy:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--pura-ring); }
  .copy.ok { color: var(--pura-success-fg); border-color: color-mix(in srgb, var(--pura-success) 40%, transparent); }

  .body {
    display: flex;
    align-items: stretch;
    overflow-x: auto;
    background: var(--pura-subtle);
  }

  .gutter {
    flex: none;
    display: flex; flex-direction: column;
    text-align: right;
    padding: var(--pura-space-3) var(--pura-space-2);
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-xs);
    line-height: 1.6;
    color: var(--pura-muted);
    background: var(--pura-bg);
    border-right: 1px solid var(--pura-border);
    user-select: none;
    -webkit-user-select: none;
    position: sticky; left: 0;
  }
  .gutter span { display: block; }

  .pre {
    margin: 0;
    flex: 1 1 auto;
    min-width: 0;
    padding: var(--pura-space-3) var(--pura-space-4);
    overflow: visible;
  }
  .code {
    display: block;
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-xs);
    line-height: 1.6;
    color: var(--pura-fg);
    white-space: pre;
    tab-size: 2;
  }
  ::slotted(*) { white-space: inherit; }

  .sr-status {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0 0 0 0);
    white-space: nowrap; border: 0;
  }
`;

export function codeBlockTemplate(el = EMPTY_SHIM) {
  const lang = el.getAttribute("language") || "";
  const file = el.getAttribute("filename") || "";
  const html = `<figure part="root">
         <figcaption part="header" class="header">
           <span class="meta">
             ${file ? `<span part="filename" class="filename">${esc(file)}</span>` : ""}
             ${lang ? `<span part="language" class="language">${esc(lang)}</span>` : ""}
           </span>
           <button part="copy" class="copy" type="button"
             aria-label="${esc(t("code-block.copyAria"))}">
             <span class="copy-label" aria-hidden="true">${esc(t("code-block.copy"))}</span>
           </button>
         </figcaption>
         <div part="body" class="body">
           <pre part="pre" class="pre"><code part="code" class="code"><slot></slot></code></pre>
           <span class="sr-status" part="status" role="status" aria-live="polite"></span>
         </div>
       </figure>`;
  return { html, css: CSS };
}
