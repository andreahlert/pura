// <pura-qr-code>: real QR encoder, byte mode, versions 1..10.
// Attributes: value (text/URL), size (px, default 200), level (L/M/Q/H, default M).
// Renders an SVG matrix using var(--pura-fg) modules on var(--pura-bg).
// Zero dependencies: data encoding, Reed-Solomon ECC, masking and placement
// are all implemented here. Quiet zone of 4 modules is included.
import { PuraElement, define } from "../base.js";
import meta from "./qr-code.meta.js";
import { registerMessages, t, onLocaleChange } from "../i18n.js";
import { qrCodeTemplate } from "./qr-code.template.js";

registerMessages({
  "qr.error": {
    en: "Cannot render QR code",
    "pt-BR": "Não foi possível gerar o QR code",
    fr: "Impossible de générer le QR code",
    de: "QR-Code kann nicht erstellt werden",
    it: "Impossibile generare il QR code",
  },
  "qr.empty": {
    en: "No value",
    "pt-BR": "Sem valor",
    fr: "Aucune valeur",
    de: "Kein Wert",
    it: "Nessun valore",
  },
});

// ---- Galois field GF(256), primitive 0x11D ----
const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
(function initGF() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
})();

function gfMul(a, b) {
  if (a === 0 || b === 0) return 0;
  return EXP[LOG[a] + LOG[b]];
}

// Generator polynomial for `degree` EC codewords.
function rsGenerator(degree) {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], EXP[i]);
    }
    poly = next;
  }
  return poly;
}

// Reed-Solomon EC codewords for a data block.
function rsEncode(data, ecLen) {
  const gen = rsGenerator(ecLen);
  const res = new Array(ecLen).fill(0);
  for (const d of data) {
    const factor = d ^ res[0];
    res.shift();
    res.push(0);
    if (factor !== 0) {
      for (let i = 0; i < gen.length; i++) res[i] ^= gfMul(gen[i], factor);
    }
  }
  return res;
}

// ---- Capacity / EC block tables, versions 1..10, byte-mode oriented ----
// Total data codewords per (version, level) and EC block structure.
// Each entry: [ecCodewordsPerBlock, group1Blocks, group1DataCodewords,
//              group2Blocks, group2DataCodewords].
const LEVELS = { L: 0, M: 1, Q: 2, H: 3 };

// Indexed [version-1][levelIndex].
const EC_BLOCKS = [
  // v1
  [[7, 1, 19, 0, 0], [10, 1, 16, 0, 0], [13, 1, 13, 0, 0], [17, 1, 9, 0, 0]],
  // v2
  [[10, 1, 34, 0, 0], [16, 1, 28, 0, 0], [22, 1, 22, 0, 0], [28, 1, 16, 0, 0]],
  // v3
  [[15, 1, 55, 0, 0], [26, 1, 44, 0, 0], [18, 2, 17, 0, 0], [22, 2, 13, 0, 0]],
  // v4
  [[20, 1, 80, 0, 0], [18, 2, 32, 0, 0], [26, 2, 24, 0, 0], [16, 4, 9, 0, 0]],
  // v5
  [[26, 1, 108, 0, 0], [24, 2, 43, 0, 0], [18, 2, 15, 2, 16], [22, 2, 11, 2, 12]],
  // v6
  [[18, 2, 68, 0, 0], [16, 4, 27, 0, 0], [24, 4, 19, 0, 0], [28, 4, 15, 0, 0]],
  // v7
  [[20, 2, 78, 0, 0], [18, 4, 31, 0, 0], [18, 2, 14, 4, 15], [26, 4, 13, 1, 14]],
  // v8
  [[24, 2, 97, 0, 0], [22, 2, 38, 2, 39], [22, 4, 18, 2, 19], [26, 4, 14, 2, 15]],
  // v9
  [[30, 2, 116, 0, 0], [22, 3, 36, 2, 37], [20, 4, 16, 4, 17], [24, 4, 12, 4, 13]],
  // v10
  [[18, 2, 68, 2, 69], [26, 4, 43, 1, 44], [24, 6, 19, 2, 20], [28, 6, 15, 2, 16]],
];

// Total data codewords (sum of all blocks) per version/level. Derived.
function dataCapacity(version, lvl) {
  const [, g1b, g1d, g2b, g2d] = EC_BLOCKS[version - 1][lvl];
  return g1b * g1d + g2b * g2d;
}

// Remainder bits appended after the final codeword, by version.
const REMAINDER_BITS = [0, 7, 7, 7, 7, 7, 0, 0, 0, 0]; // v1..v10

// Alignment pattern center coordinates by version (v1 has none).
const ALIGN_POS = [
  [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
  [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50],
];

// ---- Bit buffer ----
class BitBuffer {
  constructor() { this.bits = []; }
  put(value, length) {
    for (let i = length - 1; i >= 0; i--) this.bits.push((value >>> i) & 1);
  }
  get length() { return this.bits.length; }
}

function utf8Bytes(str) {
  return [...new TextEncoder().encode(str)];
}

// Build the final codeword stream (data + EC, interleaved) for value/version/level.
function buildCodewords(bytes, version, lvl) {
  const capacity = dataCapacity(version, lvl);
  const buf = new BitBuffer();
  buf.put(0b0100, 4); // byte mode indicator
  const countBits = version >= 10 ? 16 : 8; // byte-mode count width
  buf.put(bytes.length, countBits);
  for (const b of bytes) buf.put(b, 8);

  const totalBits = capacity * 8;
  // Terminator (up to 4 bits).
  const term = Math.min(4, totalBits - buf.length);
  if (term > 0) buf.put(0, term);
  // Pad to byte boundary.
  while (buf.length % 8 !== 0) buf.bits.push(0);
  // Pad bytes 0xEC, 0x11 alternating.
  const dataCw = [];
  for (let i = 0; i < buf.length; i += 8) {
    let v = 0;
    for (let j = 0; j < 8; j++) v = (v << 1) | buf.bits[i + j];
    dataCw.push(v);
  }
  let pad = 0;
  while (dataCw.length < capacity) {
    dataCw.push(pad === 0 ? 0xec : 0x11);
    pad ^= 1;
  }

  // Split into blocks.
  const [ecLen, g1b, g1d, g2b, g2d] = EC_BLOCKS[version - 1][lvl];
  const blocks = [];
  let pos = 0;
  for (let i = 0; i < g1b; i++) { blocks.push(dataCw.slice(pos, pos + g1d)); pos += g1d; }
  for (let i = 0; i < g2b; i++) { blocks.push(dataCw.slice(pos, pos + g2d)); pos += g2d; }
  const ecBlocks = blocks.map((b) => rsEncode(b, ecLen));

  // Interleave data codewords.
  const out = [];
  const maxData = Math.max(...blocks.map((b) => b.length));
  for (let i = 0; i < maxData; i++)
    for (const b of blocks) if (i < b.length) out.push(b[i]);
  // Interleave EC codewords.
  for (let i = 0; i < ecLen; i++)
    for (const b of ecBlocks) out.push(b[i]);

  // To bit array, append remainder bits.
  const bits = [];
  for (const cw of out) for (let i = 7; i >= 0; i--) bits.push((cw >>> i) & 1);
  for (let i = 0; i < REMAINDER_BITS[version - 1]; i++) bits.push(0);
  return bits;
}

// ---- Matrix construction ----
function makeMatrix(version, bits, lvl) {
  const size = version * 4 + 17;
  const m = Array.from({ length: size }, () => new Array(size).fill(null));
  const reserved = Array.from({ length: size }, () => new Array(size).fill(false));

  const set = (r, c, v) => { m[r][c] = v ? 1 : 0; reserved[r][c] = true; };

  // Finder pattern at (r,c) top-left.
  function finder(r, c) {
    for (let dr = -1; dr <= 7; dr++)
      for (let dc = -1; dc <= 7; dc++) {
        const rr = r + dr, cc = c + dc;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
        const inRing =
          dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6 &&
          (dr === 0 || dr === 6 || dc === 0 || dc === 6);
        const inCore = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        set(rr, cc, inRing || inCore ? 1 : 0);
      }
  }
  finder(0, 0);
  finder(0, size - 7);
  finder(size - 7, 0);

  // Timing patterns.
  for (let i = 8; i < size - 8; i++) {
    set(6, i, i % 2 === 0 ? 1 : 0);
    set(i, 6, i % 2 === 0 ? 1 : 0);
  }

  // Alignment patterns (skip overlaps with finders).
  const centers = ALIGN_POS[version - 1];
  for (const r of centers)
    for (const c of centers) {
      // Skip if overlapping a finder pattern.
      if ((r <= 8 && c <= 8) || (r <= 8 && c >= size - 9) || (r >= size - 9 && c <= 8))
        continue;
      for (let dr = -2; dr <= 2; dr++)
        for (let dc = -2; dc <= 2; dc++) {
          const isDark =
            Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
          set(r + dr, c + dc, isDark ? 1 : 0);
        }
    }

  // Dark module.
  set(size - 8, 8, 1);

  // Reserve format info areas (filled later).
  for (let i = 0; i < 9; i++) {
    if (i !== 6) { reserved[8][i] = true; reserved[i][8] = true; }
  }
  for (let i = 0; i < 8; i++) {
    reserved[8][size - 1 - i] = true;
    reserved[size - 1 - i][8] = true;
  }

  // Reserve version info area for v7+.
  if (version >= 7) {
    for (let i = 0; i < 6; i++)
      for (let j = 0; j < 3; j++) {
        reserved[size - 11 + j][i] = true;
        reserved[i][size - 11 + j] = true;
      }
  }

  // Place data bits in zigzag, skipping reserved.
  let bitIdx = 0;
  let upward = true;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--; // skip timing column
    for (let row = 0; row < size; row++) {
      const r = upward ? size - 1 - row : row;
      for (let c = col; c > col - 2; c--) {
        if (reserved[r][c]) continue;
        const bit = bitIdx < bits.length ? bits[bitIdx] : 0;
        m[r][c] = bit;
        bitIdx++;
      }
    }
    upward = !upward;
  }

  return { m, reserved, size };
}

function applyMask(m, reserved, size, mask) {
  const out = m.map((row) => row.slice());
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++) {
      if (reserved[r][c]) continue;
      let flip = false;
      switch (mask) {
        case 0: flip = (r + c) % 2 === 0; break;
        case 1: flip = r % 2 === 0; break;
        case 2: flip = c % 3 === 0; break;
        case 3: flip = (r + c) % 3 === 0; break;
        case 4: flip = (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0; break;
        case 5: flip = ((r * c) % 2) + ((r * c) % 3) === 0; break;
        case 6: flip = (((r * c) % 2) + ((r * c) % 3)) % 2 === 0; break;
        case 7: flip = (((r + c) % 2) + ((r * c) % 3)) % 2 === 0; break;
      }
      if (flip) out[r][c] ^= 1;
    }
  return out;
}

// Format info: 5 bits (2 level + 3 mask) with BCH(15,5) and mask 0x5412.
function formatBits(lvl, mask) {
  const lvlBits = { L: 0b01, M: 0b00, Q: 0b11, H: 0b10 }[Object.keys(LEVELS)[lvl]];
  const data = (lvlBits << 3) | mask;
  let rem = data;
  for (let i = 0; i < 10; i++) {
    rem <<= 1;
    if (rem & (1 << 10)) rem ^= 0b10100110111;
  }
  return ((data << 10) | rem) ^ 0b101010000010010;
}

// Version info: BCH(18,6) for v7+.
function versionBits(version) {
  let rem = version;
  for (let i = 0; i < 12; i++) {
    rem <<= 1;
    if (rem & (1 << 12)) rem ^= 0b1111100100101;
  }
  return (version << 12) | rem;
}

function placeFormat(m, size, lvl, mask) {
  const bits = formatBits(lvl, mask);
  // bits is 15 bits; bit 14 is MSB.
  const get = (i) => (bits >> i) & 1;
  // Around top-left.
  for (let i = 0; i <= 5; i++) m[8][i] = get(i);
  m[8][7] = get(6);
  m[8][8] = get(7);
  m[7][8] = get(8);
  for (let i = 9; i <= 14; i++) m[14 - i][8] = get(i);
  // Around top-right and bottom-left.
  for (let i = 0; i <= 7; i++) m[8][size - 1 - i] = get(i);
  for (let i = 8; i <= 14; i++) m[size - 15 + i][8] = get(i);
}

function placeVersion(m, size, version) {
  if (version < 7) return;
  const bits = versionBits(version);
  for (let i = 0; i < 18; i++) {
    const bit = (bits >> i) & 1;
    const r = Math.floor(i / 3);
    const c = i % 3;
    m[size - 11 + c][r] = bit;
    m[r][size - 11 + c] = bit;
  }
}

// Penalty scoring for mask selection.
function penalty(m, size) {
  let score = 0;
  // Rule 1: runs of 5+ same color in rows and cols.
  for (let r = 0; r < size; r++) {
    let run = 1;
    for (let c = 1; c < size; c++) {
      if (m[r][c] === m[r][c - 1]) { run++; if (run === 5) score += 3; else if (run > 5) score++; }
      else run = 1;
    }
  }
  for (let c = 0; c < size; c++) {
    let run = 1;
    for (let r = 1; r < size; r++) {
      if (m[r][c] === m[r - 1][c]) { run++; if (run === 5) score += 3; else if (run > 5) score++; }
      else run = 1;
    }
  }
  // Rule 2: 2x2 blocks.
  for (let r = 0; r < size - 1; r++)
    for (let c = 0; c < size - 1; c++) {
      const v = m[r][c];
      if (v === m[r][c + 1] && v === m[r + 1][c] && v === m[r + 1][c + 1]) score += 3;
    }
  // Rule 3: finder-like patterns 1:1:3:1:1 with 4 light.
  const pat1 = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
  const pat2 = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
  const match = (arr, i, p) => p.every((v, k) => arr[i + k] === v);
  for (let r = 0; r < size; r++)
    for (let c = 0; c <= size - 11; c++) {
      const row = m[r];
      if (match(row, c, pat1) || match(row, c, pat2)) score += 40;
    }
  for (let c = 0; c < size; c++) {
    const col = [];
    for (let r = 0; r < size; r++) col.push(m[r][c]);
    for (let r = 0; r <= size - 11; r++)
      if (match(col, r, pat1) || match(col, r, pat2)) score += 40;
  }
  // Rule 4: dark proportion.
  let dark = 0;
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) dark += m[r][c];
  const ratio = (dark * 100) / (size * size);
  const k = Math.floor(Math.abs(ratio - 50) / 5);
  score += k * 10;
  return score;
}

// Full encode. Returns { matrix, size } or throws if value does not fit.
function encodeQR(value, level) {
  const lvl = LEVELS[level] ?? LEVELS.M;
  const bytes = utf8Bytes(value);
  // Pick smallest version (1..10) whose capacity fits header+data.
  let version = 0;
  for (let v = 1; v <= 10; v++) {
    const countBits = v >= 10 ? 16 : 8;
    const needBits = 4 + countBits + bytes.length * 8;
    if (needBits <= dataCapacity(v, lvl) * 8) { version = v; break; }
  }
  if (!version) throw new Error("too long");

  const bits = buildCodewords(bytes, version, lvl);
  const { m, reserved, size } = makeMatrix(version, bits, lvl);

  // Try all 8 masks, pick lowest penalty.
  let best = null, bestScore = Infinity, bestMask = 0;
  for (let mask = 0; mask < 8; mask++) {
    const masked = applyMask(m, reserved, size, mask);
    placeFormat(masked, size, lvl, mask);
    placeVersion(masked, size, version);
    const s = penalty(masked, size);
    if (s < bestScore) { bestScore = s; best = masked; bestMask = mask; }
  }
  return { matrix: best, size, version };
}

class PuraQRCode extends PuraElement {
  static observedAttributes = ["value", "size", "level"];

  connectedCallback() {
    this._off = onLocaleChange(() => this._draw());
    this._draw();
  }

  disconnectedCallback() {
    if (this._off) this._off();
  }

  attributeChangedCallback() {
    if (this.isConnected) this._draw();
  }

  _draw() {
    const value = this.getAttribute("value") || "";
    const size = parseInt(this.getAttribute("size"), 10) || 200;
    const level = (this.getAttribute("level") || "M").toUpperCase();

    if (!value) {
      const { html, css } = qrCodeTemplate(this);
      this.render(html, css);
      return;
    }

    let result;
    try {
      result = encodeQR(value, LEVELS[level] != null ? level : "M");
    } catch (e) {
      this.render(`<div part="error" class="err">${escapeHtml(t("qr.error"))}</div>`, CSS);
      return;
    }

    const { matrix, size: n } = result;
    const quiet = 4;
    const total = n + quiet * 2;
    // Build a single path of all dark modules.
    let d = "";
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++)
        if (matrix[r][c]) d += `M${c + quiet} ${r + quiet}h1v1h-1z`;

    const svg =
      `<svg part="svg" xmlns="http://www.w3.org/2000/svg" ` +
      `width="${size}" height="${size}" viewBox="0 0 ${total} ${total}" ` +
      `shape-rendering="crispEdges" role="img" aria-label="${escapeHtml(value)}">` +
      `<rect class="bg" width="${total}" height="${total}"/>` +
      `<path class="fg" d="${d}"/>` +
      `</svg>`;
    this.render(svg, CSS);
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

const CSS = `
  :host { display: inline-block; line-height: 0; }
  svg { display: block; border-radius: var(--pura-radius-sm); }
  svg .bg { fill: var(--pura-bg); }
  svg .fg { fill: var(--pura-fg); }
  .err {
    display: inline-flex; align-items: center; justify-content: center;
    padding: var(--pura-space-4);
    font-size: var(--pura-text-sm); color: var(--pura-danger);
    background: var(--pura-danger-bg); border: 1px solid var(--pura-border);
    border-radius: var(--pura-radius); line-height: 1.4;
  }
`;

define("pura-qr-code", PuraQRCode, meta);
export { PuraQRCode };
