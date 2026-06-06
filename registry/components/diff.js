// <pura-diff> — inline word-level text diff. Renders the change from `before`
// to `after`: removed segments struck-through in danger color, added segments
// highlighted in success color, unchanged text rendered plainly.
//
// Attributes:
//   before  — original text (or use slot[name="before"])
//   after   — new text (or use slot[name="after"])
//   mode    — "words" (default) | "chars"  (granularity of the diff)
//   inline  — present = single interleaved stream (default);
//             absent has no visual effect, kept for forward-compat
//   label   — accessible label for the diff region (default: "Text diff")
// Slots:
//   before  — original text source (overrides `before` attr)
//   after   — new text source (overrides `after` attr)
// Parts:
//   diff     — the wrapping region
//   segment  — every segment span
//   removed  — removed segments (also part="segment")
//   added    — added segments (also part="segment")
//   equal    — unchanged segments (also part="segment")
//   summary  — the counts line (added / removed)
//
// Events:
//   diff — CustomEvent({ added, removed, equal, segments }) after each compute.
//
// Agent-native layer:
//   - role="group" + aria-label on the region; the live diff is exposed as a
//     screen-reader string via an aria-described summary.
//   - stable data-* on every segment: data-op="add|del|eq", data-text.
//   - host data-added / data-removed / data-equal counts reflect the result.
//   - global window.__puraDiffs registry maps instance id -> structured result
//     so agents can read every diff on the page without DOM scraping.
import { PuraElement, define } from "../base.js";
import meta from "./diff.meta.js";

let uid = 0;

// Global machine-readable registry of every diff instance on the page.
const REGISTRY = (window.__puraDiffs ||= new Map());

// Word/char-level LCS diff. Returns an ordered list of ops:
//   { op: "eq" | "del" | "add", text }
// Pure JS, zero deps. Token boundaries keep whitespace attached so the
// reconstructed text round-trips exactly.
function tokenize(str, mode) {
  if (str === "") return [];
  if (mode === "chars") return [...str];
  // words: split but keep the delimiters (whitespace runs) as their own tokens
  return str.match(/\s+|[^\s]+/g) || [];
}

function diffTokens(a, b) {
  const n = a.length;
  const m = b.length;
  // LCS length table (classic DP). For typical diff sizes this is fine.
  const dp = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j]
        ? dp[i + 1][j + 1] + 1
        : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const ops = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      ops.push({ op: "eq", text: a[i] });
      i++; j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ op: "del", text: a[i] });
      i++;
    } else {
      ops.push({ op: "add", text: b[j] });
      j++;
    }
  }
  while (i < n) ops.push({ op: "del", text: a[i++] });
  while (j < m) ops.push({ op: "add", text: b[j++] });
  return ops;
}

// Merge consecutive ops of the same kind into single segments for cleaner DOM.
function coalesce(ops) {
  const out = [];
  for (const o of ops) {
    const last = out[out.length - 1];
    if (last && last.op === o.op) last.text += o.text;
    else out.push({ op: o.op, text: o.text });
  }
  return out;
}

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

class PuraDiff extends PuraElement {
  static observedAttributes = ["before", "after", "mode", "label"];

  connectedCallback() {
    this._id = this.getAttribute("id") || `pura-diff-${uid++}`;
    this.render(
      `<div part="diff" role="group">
         <span class="stream" part="stream"></span>
       </div>
       <span class="summary" part="summary" aria-hidden="true"></span>
       <slot name="before" hidden></slot>
       <slot name="after" hidden></slot>
       <span class="sr" aria-live="polite"></span>`,
      CSS
    );
    this._region = this.$('[part="diff"]');
    this._stream = this.$(".stream");
    this._summary = this.$(".summary");
    this._sr = this.$(".sr");
    this._beforeSlot = this.$('slot[name="before"]');
    this._afterSlot = this.$('slot[name="after"]');
    // Recompute when slotted text changes.
    const recompute = () => this._compute();
    this._beforeSlot.addEventListener("slotchange", recompute);
    this._afterSlot.addEventListener("slotchange", recompute);
    this._compute();
  }

  disconnectedCallback() {
    REGISTRY.delete(this._id);
  }

  attributeChangedCallback() {
    if (this._stream) this._compute();
  }

  _slotText(slot) {
    const nodes = slot.assignedNodes();
    if (!nodes.length) return null;
    return nodes.map((n) => n.textContent).join("");
  }

  _compute() {
    const before =
      this._slotText(this._beforeSlot) ?? this.getAttribute("before") ?? "";
    const after =
      this._slotText(this._afterSlot) ?? this.getAttribute("after") ?? "";
    const mode = this.getAttribute("mode") === "chars" ? "chars" : "words";

    const segments = coalesce(
      diffTokens(tokenize(before, mode), tokenize(after, mode))
    );

    let added = 0;
    let removed = 0;
    let equal = 0;
    const partFor = { eq: "equal", del: "removed", add: "added" };
    const html = segments
      .map((s) => {
        if (s.op === "add") added++;
        else if (s.op === "del") removed++;
        else equal++;
        const part = partFor[s.op];
        return `<span part="segment ${part}" class="seg ${s.op}" data-op="${s.op}" data-text="${escapeHtml(
          s.text
        )}"${s.op === "del" ? ' aria-hidden="false"' : ""}>${escapeHtml(s.text)}</span>`;
      })
      .join("");
    this._stream.innerHTML = html;

    // Visible + machine-readable summary.
    this._summary.textContent =
      added || removed
        ? `+${added} −${removed}`
        : "no changes";
    this._sr.textContent = `${added} added, ${removed} removed, ${equal} unchanged.`;

    // Region ARIA.
    const label = this.getAttribute("label") || "Text diff";
    this._region.setAttribute("aria-label", label);

    // Reflect counts on the host as stable data-* (agent-native).
    this.dataset.added = String(added);
    this.dataset.removed = String(removed);
    this.dataset.equal = String(equal);
    this.dataset.mode = mode;

    const result = {
      id: this._id,
      added,
      removed,
      equal,
      mode,
      segments: segments.map((s) => ({ op: s.op, text: s.text })),
    };
    REGISTRY.set(this._id, result);
    this._last = result;

    this.dispatchEvent(
      new CustomEvent("diff", { detail: result, bubbles: true })
    );
  }

  // Public API: read the structured result without DOM scraping.
  get result() {
    return this._last ?? null;
  }
}

const CSS = `
  :host { display: inline; }
  :host([block]) { display: block; }

  [part="diff"] {
    font-family: var(--pura-font-mono);
    font-size: var(--pura-text-sm);
    line-height: 1.6;
    color: var(--pura-fg);
    white-space: pre-wrap;
    word-break: break-word;
  }

  .seg { border-radius: var(--pura-radius-sm); }

  .seg.eq { color: var(--pura-fg); }

  .seg.del {
    text-decoration: line-through;
    text-decoration-thickness: 1px;
    color: var(--pura-danger);
    background: var(--pura-danger-bg);
    padding: 0 var(--pura-space-1);
  }

  .seg.add {
    color: var(--pura-success);
    background: var(--pura-success-bg);
    padding: 0 var(--pura-space-1);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
  }

  .summary {
    display: inline-flex;
    align-items: center;
    gap: var(--pura-space-1);
    margin-left: var(--pura-space-2);
    font-family: var(--pura-font);
    font-size: var(--pura-text-xs);
    font-weight: 550;
    color: var(--pura-muted-fg);
    vertical-align: middle;
  }

  .sr {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0 0 0 0);
    white-space: nowrap; border: 0;
  }
`;

define("pura-diff", PuraDiff, meta);
export { PuraDiff };
