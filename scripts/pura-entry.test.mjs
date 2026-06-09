// Guards the single entry point: every component that registers a custom element
// (calls `define(...)`) MUST be imported by registry/pura.js. A component missing
// from the entry silently fails to load on the site and in consumers, with no
// other gate catching it (build copies pura.js verbatim, it is not generated).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";
import { isComponentFile } from "./build-registry.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const COMPONENTS = join(ROOT, "registry", "components");
const ENTRY = join(ROOT, "registry", "pura.js");

test("every define()-ing component is imported by registry/pura.js", async () => {
  const entry = await readFile(ENTRY, "utf8");
  const imported = new Set(
    [...entry.matchAll(/import\s+["']\.\/components\/([^"']+)\.js["']/g)].map((m) => m[1]),
  );

  const files = (await readdir(COMPONENTS)).filter(isComponentFile);
  const missing = [];
  for (const f of files) {
    const src = await readFile(join(COMPONENTS, f), "utf8");
    if (!/\bdefine\s*\(/.test(src)) continue; // helper module, not a custom element
    const name = basename(f, ".js");
    if (!imported.has(name)) missing.push(name);
  }

  assert.deepEqual(
    missing,
    [],
    `components missing from registry/pura.js (won't load): ${missing.join(", ")}`,
  );
});
