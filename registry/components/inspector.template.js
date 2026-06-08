// Pure render for <pura-inspector>. No DOM; SSR/DSD + client safe.
// The shell is fully static (bubble + overlay + empty panel); all live content
// (the field rows for the picked element) is injected at runtime into .fields,
// so the initial markup reads nothing from the host. EMPTY_SHIM is unused.
import { EMPTY_SHIM } from "../base.js";

const HTML = `
  <button class="bubble" part="bubble" aria-label="Inspect components" title="Inspect components">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 3l7.5 18 2.5-7 7-2.5z"/></svg>
  </button>
  <div class="overlay">
    <div class="box"><span class="tip"></span></div>
  </div>
  <aside class="panel" part="panel" role="dialog" aria-label="Edit component">
    <header><b class="ptitle"></b>
      <button class="copy" title="Copy element HTML">Copy</button>
      <button class="close" aria-label="Close">✕</button>
    </header>
    <div class="fields"></div>
    <footer><span>Edits saved to localStorage</span></footer>
  </aside>`;

const CSS = `
  :host { font-family: var(--pura-font); }
  .bubble { position: fixed; z-index: 2147483600; width: 44px; height: 44px; border-radius: 999px;
    display: grid; place-items: center; cursor: pointer; border: 1px solid var(--pura-border);
    background: var(--pura-bg); color: var(--pura-fg); box-shadow: var(--pura-shadow-lg); }
  .bubble:hover { background: var(--pura-subtle); }
  :host([active]) .bubble { background: var(--pura-primary); color: var(--pura-primary-fg); border-color: transparent; }
  :host(:not([position])) .bubble, :host([position="bottom-left"]) .bubble { left: 18px; bottom: 18px; }
  :host([position="bottom-right"]) .bubble { right: 18px; bottom: 18px; }
  :host([position="top-left"]) .bubble { left: 18px; top: 18px; }
  :host([position="top-right"]) .bubble { right: 18px; top: 18px; }

  .overlay { display: none; position: fixed; inset: 0; z-index: 2147483500; pointer-events: none; }
  .box { display: none; position: fixed; pointer-events: none; box-sizing: border-box;
    background: color-mix(in srgb, var(--pura-accent) 14%, transparent);
    border: 1px solid var(--pura-accent); border-radius: 3px; transition: all .04s linear; }
  .tip { position: absolute; top: -22px; left: 0; white-space: nowrap; font-size: 11px; font-weight: 600;
    background: var(--pura-accent); color: #fff; padding: 1px 6px; border-radius: 4px; }

  .panel { display: none; position: fixed; z-index: 2147483601; flex-direction: column; width: 300px; max-height: 72vh;
    background: var(--pura-bg); color: var(--pura-fg); border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius-lg); box-shadow: var(--pura-shadow-lg); overflow: hidden; }
  .panel header { display: flex; align-items: center; gap: .5rem; padding: .6rem .75rem; border-bottom: 1px solid var(--pura-border); cursor: move; touch-action: none; user-select: none; }
  .panel header b { flex: 1; font-family: var(--pura-font-mono); font-size: .82rem; }
  .panel header button { font: inherit; font-size: .72rem; cursor: pointer; background: var(--pura-bg); color: var(--pura-muted-fg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm); padding: 2px 7px; }
  .panel header .close { border: none; font-size: .9rem; color: var(--pura-muted); }
  .fields { padding: .5rem .75rem; overflow-y: auto; display: flex; flex-direction: column; gap: .4rem; flex: 1; min-height: 0; }
  .row { display: flex; align-items: center; justify-content: space-between; gap: .6rem; font-size: .8rem; }
  .row span { color: var(--pura-muted-fg); font-family: var(--pura-font-mono); font-size: .72rem; }
  .row .fld { width: 150px; font: inherit; font-size: .76rem; padding: 3px 7px; border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius-sm); background: var(--pura-bg); color: var(--pura-fg); }
  .row .chk { width: 16px; height: 16px; accent-color: var(--pura-primary); }
  .row .sel { width: 162px; font: inherit; font-size: .76rem; padding: 3px 6px; border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius-sm); background: var(--pura-bg); color: var(--pura-fg); cursor: pointer; }
  .colorctl { display: inline-flex; align-items: center; gap: 5px; }
  .colorctl .cdot { width: 18px; height: 18px; border-radius: 5px; border: 1px solid var(--pura-border); flex: none; }
  .colorctl .csel { width: 96px; font: inherit; font-size: .72rem; padding: 3px 5px; border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius-sm); background: var(--pura-bg); color: var(--pura-fg); cursor: pointer; }
  .colorctl .cpick { width: 26px; height: 24px; padding: 0; border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm); background: none; cursor: pointer; flex: none; }
  .stylefld { display: inline-flex; align-items: center; gap: 4px; }
  .stylefld .fld { width: 124px; }
  .gear { font: inherit; font-size: .8rem; line-height: 1; cursor: pointer; background: var(--pura-bg); color: var(--pura-muted-fg);
    border: 1px solid var(--pura-border-strong); border-radius: var(--pura-radius-sm); padding: 3px 6px; }
  .gear:hover { background: var(--pura-subtle); }
  .styleed { display: grid; gap: 4px; margin: 2px 0 4px; padding: .5rem; background: var(--pura-subtle); border-radius: var(--pura-radius-sm); }
  .srow { display: flex; align-items: center; justify-content: space-between; gap: .5rem; }
  .srow span { font-family: var(--pura-font-mono); font-size: .66rem; color: var(--pura-muted-fg); }
  .srow .sed { width: 130px; font: inherit; font-size: .72rem; padding: 2px 6px; border: 1px solid var(--pura-border-strong);
    border-radius: var(--pura-radius-sm); background: var(--pura-bg); color: var(--pura-fg); }
  .panel footer { padding: .45rem .75rem; border-top: 1px solid var(--pura-border); font-size: .68rem; color: var(--pura-muted); }
`;

export function inspectorTemplate(el = EMPTY_SHIM) {
  return { html: HTML, css: CSS };
}
