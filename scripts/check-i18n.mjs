import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export const LOCALES = ["en", "pt-BR", "fr", "de", "it"];
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const COMPONENTS = join(ROOT, "registry", "components");

export function findI18nGaps(tables) {
  const gaps = [];
  for (const { file, messages } of tables) {
    for (const [key, vals] of Object.entries(messages)) {
      const missing = LOCALES.filter((l) => !(l in vals));
      if (missing.length) gaps.push({ file, key, missing });
    }
  }
  return gaps;
}

// Extract the object literal passed to registerMessages(...) without executing
// the module (components import DOM-only base.js). Uses a balanced-brace scan.
export function extractMessages(source) {
  const idx = source.indexOf("registerMessages(");
  if (idx === -1) return {};
  const start = source.indexOf("{", idx);
  let depth = 0, end = start;
  for (let i = start; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") { depth--; if (depth === 0) { end = i; break; } }
  }
  const literal = source.slice(start, end + 1);
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${literal});`)();
}

async function main() {
  const files = (await readdir(COMPONENTS)).filter((f) => f.endsWith(".js") && !f.endsWith(".meta.js") && !f.endsWith(".docs.js"));
  const tables = [];
  for (const file of files) {
    const src = await readFile(join(COMPONENTS, file), "utf8");
    if (src.includes("registerMessages(")) tables.push({ file, messages: extractMessages(src) });
  }
  const gaps = findI18nGaps(tables);
  if (gaps.length) {
    console.error(`i18n: ${gaps.length} incomplete key(s):`);
    for (const g of gaps) console.error(`  ${g.file} ${g.key} missing ${g.missing.join(", ")}`);
    process.exit(1);
  }
  console.log(`i18n: all keys cover ${LOCALES.length} locales`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
