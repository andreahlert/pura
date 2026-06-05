import { readFileSync, writeFileSync } from "node:fs";
import { PRESETS as SEED } from "./theme-presets.js";

const RAW = "/tmp/claude-1000/-home-ahlert-Dev/b2ca9ff6-6e86-497e-870f-ae393ab0ebcd/tasks/wleiin5jn.output";
const txt = readFileSync(RAW, "utf8");
let data; try { data = JSON.parse(txt); } catch { data = JSON.parse(txt.slice(txt.indexOf('{"count"'))); }
const gen = (data.result || data).presets;

const seedIds = new Set(SEED.map((p) => p.id));
const valid = [];
const dropped = [];
for (const p of gen) {
  if (!p || !p.id || seedIds.has(p.id)) { dropped.push(p?.id + " (dup/empty)"); continue; }
  const l = p.vars?.light, d = p.vars?.dark;
  const ok = l && d && l["--pura-bg"] && l["--pura-fg"] && d["--pura-bg"] && d["--pura-fg"]
    && l["--pura-bg"].toLowerCase() !== l["--pura-fg"].toLowerCase()
    && d["--pura-bg"].toLowerCase() !== d["--pura-fg"].toLowerCase();
  if (!ok) { dropped.push(p.id + " (missing/contrast)"); continue; }
  valid.push({ id: p.id, name: p.name, group: p.group || "Tech", vars: p.vars });
}

const all = [...SEED, ...valid];
const header = `// pura theme presets — each overrides --pura-* tokens. Shape:\n// { id, name, group, vars: { base?, light?, dark? } } with { "--pura-token": "value" }.\n// "default" uses pura's built-in tokens. ${all.length} presets (6 hand-tuned + ${valid.length} brand-generated).\n`;
writeFileSync("./theme-presets.js", header + "export const PRESETS = " + JSON.stringify(all, null, 2) + ";\n");
console.log("total presets:", all.length, "| seeds:", SEED.length, "| added:", valid.length, "| dropped:", dropped.length);
if (dropped.length) console.log("dropped:", dropped.join(", "));
