// <pura-barcode>: CODE128 (auto B/C) and EAN13 encoders from scratch.
// Attributes: value, format ("code128" default | "ean13"), height (px, default 80),
// displayValue (bool, show human-readable text under the bars).
// Bars render as SVG rects: var(--pura-fg) on var(--pura-bg). Includes checksums
// and quiet zones. Graceful error state on invalid input. Zero dependencies.
import { PuraElement, define } from "../base.js";
import meta from "./barcode.meta.js";
import { registerMessages, t, onLocaleChange } from "../i18n.js";

registerMessages({
  "barcode.empty": {
    en: "No value", "pt-BR": "Sem valor", fr: "Aucune valeur",
    de: "Kein Wert", it: "Nessun valore",
  },
  "barcode.ean13": {
    en: "EAN13 needs 12 or 13 digits",
    "pt-BR": "EAN13 requer 12 ou 13 dígitos",
    fr: "EAN13 requiert 12 ou 13 chiffres",
    de: "EAN13 benötigt 12 oder 13 Ziffern",
    it: "EAN13 richiede 12 o 13 cifre",
  },
  "barcode.code128": {
    en: "Invalid CODE128 input",
    "pt-BR": "Entrada CODE128 inválida",
    fr: "Entrée CODE128 invalide",
    de: "Ungültige CODE128-Eingabe",
    it: "Input CODE128 non valido",
  },
});

// ---- CODE128 ----
// 107 symbols, each a width pattern of 6 elements (bars/spaces alternating,
// starting with a bar). Index 0..102 plus start codes and stop.
// Standard CODE128 pattern table (widths sum to 11; stop sums to 13).
const CODE128_PATTERNS = [
  "11011001100","11001101100","11001100110","10010011000","10010001100",
  "10001001100","10011001000","10011000100","10001100100","11001001000",
  "11001000100","11000100100","10110011100","10011011100","10011001110",
  "10111001100","10011101100","10011100110","11001110010","11001011100",
  "11001001110","11011100100","11001110100","11101101110","11101001100",
  "11100101100","11100100110","11101100100","11100110100","11100110010",
  "11011011000","11011000110","11000110110","10100011000","10001011000",
  "10001000110","10110001000","10001101000","10001100010","11010001000",
  "11000101000","11000100010","10110111000","10110001110","10001101110",
  "10111011000","10111000110","10001110110","11101110110","11010001110",
  "11000101110","11011101000","11011100010","11011101110","11101011000",
  "11101000110","11100010110","11101101000","11101100010","11100011010",
  "11101111010","11001000010","11110001010","10100110000","10100001100",
  "10010110000","10010000110","10000101100","10000100110","10110010000",
  "10110000100","10011010000","10011000010","10000110100","10000110010",
  "11000010010","11001010000","11110111010","11000010100","10001111010",
  "10100111100","10010111100","10010011110","10111100100","10011110100",
  "10011110010","11110100100","11110010100","11110010010","11011011110",
  "11011110110","11110110110","10101111000","10100011110","10001011110",
  "10111101000","10111100010","11110101000","11110100010","10111011110",
  "10111101110","11101011110","11110101110","11010000100","11010010000",
  "11010011100","1100011101011", // 106 = stop
];
const START_B = 104, START_C = 105, STOP = 106;

// Encode a string in CODE128 auto B/C. Returns array of code values or null.
function code128Values(text) {
  // Code set B covers ASCII 32..126. Code C packs pairs of digits.
  for (const ch of text) {
    const cc = ch.charCodeAt(0);
    if (cc < 32 || cc > 126) return null; // out of printable ASCII range
  }
  const isDigit = (c) => c >= "0" && c <= "9";
  const codes = [];
  // Helper: count consecutive digits from i.
  const digitRun = (s, i) => { let n = 0; while (i + n < s.length && isDigit(s[i + n])) n++; return n; };

  let i = 0;
  let mode = null; // "B" | "C"
  // Decide start: if 4+ leading digits (or whole string even-digit), start C.
  const lead = digitRun(text, 0);
  const startC = lead >= 4 || (lead === text.length && lead % 2 === 0 && lead >= 2);
  if (startC) { codes.push(START_C); mode = "C"; }
  else { codes.push(START_B); mode = "B"; }

  while (i < text.length) {
    if (mode === "C") {
      const run = digitRun(text, i);
      if (run >= 2) {
        // Encode pairs while at least 2 digits remain (keep even count).
        const pairs = Math.floor(run / 2);
        // If an odd trailing digit will break the run, leave last digit for B.
        for (let p = 0; p < pairs; p++) {
          codes.push(parseInt(text.substr(i, 2), 10));
          i += 2;
        }
        // Switch to B if remaining char is non-digit or single trailing digit.
        if (i < text.length) {
          const nextRun = digitRun(text, i);
          if (nextRun < 2) { codes.push(100); mode = "B"; } // 100 = Code B
        }
      } else {
        codes.push(100); mode = "B"; // Code B
      }
    } else {
      // mode B: switch to C when a run of >=4 digits (or >=6 to be worthwhile)
      const run = digitRun(text, i);
      if (run >= 4) {
        codes.push(99); mode = "C"; // 99 = Code C
      } else {
        codes.push(text.charCodeAt(i) - 32);
        i++;
      }
    }
  }

  // Checksum: (start + Σ value*position) mod 103, position from 1.
  let sum = codes[0];
  for (let k = 1; k < codes.length; k++) sum += codes[k] * k;
  codes.push(sum % 103);
  codes.push(STOP);
  return codes;
}

// Build bar segments (array of {x,w}) from CODE128 code values.
function code128Bars(codes) {
  let pattern = "";
  for (const code of codes) pattern += CODE128_PATTERNS[code];
  return pattern;
}

// ---- EAN13 ----
// L (odd) and G (even) encodings for left group; R for right group.
const EAN_L = ["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"];
const EAN_G = ["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"];
const EAN_R = ["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"];
// Parity pattern for digits 2..7 chosen by first digit (O=odd/L, E=even/G).
const EAN_PARITY = [
  "OOOOOO","OOEOEE","OOEEOE","OOEEEO","OEOOEE",
  "OEEOOE","OEEEOO","OEOEOE","OEOEEO","OEEOEO",
];

function ean13Checksum(d12) {
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += (+d12[i]) * (i % 2 === 0 ? 1 : 3);
  return (10 - (sum % 10)) % 10;
}

// Returns { pattern, text } or null if invalid.
function ean13Bars(value) {
  const digits = value.replace(/\s/g, "");
  if (!/^\d{12,13}$/.test(digits)) return null;
  let full;
  if (digits.length === 12) {
    full = digits + ean13Checksum(digits);
  } else {
    // 13 digits: validate the provided check digit.
    if (ean13Checksum(digits.slice(0, 12)) !== +digits[12]) return null;
    full = digits;
  }
  const first = +full[0];
  const parity = EAN_PARITY[first];
  let p = "101"; // start guard
  for (let i = 1; i <= 6; i++) {
    const d = +full[i];
    p += parity[i - 1] === "O" ? EAN_L[d] : EAN_G[d];
  }
  p += "01010"; // center guard
  for (let i = 7; i <= 12; i++) p += EAN_R[+full[i]];
  p += "101"; // end guard
  return { pattern: p, text: full };
}

class PuraBarcode extends PuraElement {
  static observedAttributes = ["value", "format", "height", "displayvalue"];

  connectedCallback() {
    this._off = onLocaleChange(() => this._draw());
    this._draw();
  }
  disconnectedCallback() { if (this._off) this._off(); }
  attributeChangedCallback() { if (this.isConnected) this._draw(); }

  _draw() {
    const value = this.getAttribute("value") || "";
    const format = (this.getAttribute("format") || "code128").toLowerCase();
    const height = parseInt(this.getAttribute("height"), 10) || 80;
    const showText = this.bool("displayvalue");

    if (!value) {
      this.render(`<div part="error" class="err">${esc(t("barcode.empty"))}</div>`, CSS);
      return;
    }

    let pattern, label;
    if (format === "ean13") {
      const r = ean13Bars(value);
      if (!r) { this.render(`<div part="error" class="err">${esc(t("barcode.ean13"))}</div>`, CSS); return; }
      pattern = r.pattern;
      label = r.text;
    } else {
      const codes = code128Values(value);
      if (!codes) { this.render(`<div part="error" class="err">${esc(t("barcode.code128"))}</div>`, CSS); return; }
      pattern = code128Bars(codes);
      label = value;
    }

    // Layout: 1 module = 2 user units. Quiet zone of 10 modules each side.
    const unit = 2;
    const quiet = 10;
    const modules = pattern.length;
    const totalModules = modules + quiet * 2;
    const w = totalModules * unit;
    const textH = showText ? 20 : 0;
    const h = height + textH;

    // Build bar rects: consecutive "1" runs become one rect.
    let rects = "";
    let x = quiet;
    let i = 0;
    while (i < modules) {
      if (pattern[i] === "1") {
        let run = 1;
        while (i + run < modules && pattern[i + run] === "1") run++;
        rects += `<rect x="${x * unit}" y="0" width="${run * unit}" height="${height}"/>`;
        x += run;
        i += run;
      } else { x++; i++; }
    }

    const textEl = showText
      ? `<text part="text" class="label" x="${w / 2}" y="${height + 15}" text-anchor="middle" ` +
        `font-size="14">${esc(label)}</text>`
      : "";

    const svg =
      `<svg part="svg" xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" ` +
      `viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" role="img" aria-label="${esc(label)}">` +
      `<rect class="bg" width="${w}" height="${h}"/>` +
      `<g class="bars">${rects}</g>` +
      `${textEl}</svg>`;
    this.render(svg, CSS);
  }
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

const CSS = `
  :host { display: inline-block; line-height: 0; }
  svg { display: block; }
  svg .bg { fill: var(--pura-bg); }
  svg .bars { fill: var(--pura-fg); }
  svg .label { fill: var(--pura-fg); font-family: var(--pura-font-mono); }
  .err {
    display: inline-flex; align-items: center; justify-content: center;
    padding: var(--pura-space-4);
    font-size: var(--pura-text-sm); color: var(--pura-danger);
    background: var(--pura-danger-bg); border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius); line-height: 1.4;
  }
`;

define("pura-barcode", PuraBarcode, meta);
export { PuraBarcode };
