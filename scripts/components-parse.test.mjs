// Syntax gate for registry/components/*.js — the parser-based safety net for the
// COMPONENT side of the SSR template extraction. The render gate and free-var audit
// both inspect only *.template.js; neither parses the rewritten component file. A
// codemod splice that corrupts a component (a dangling brace, a half-removed const,
// a truncated render call) would therefore pass both template gates and only break
// at bundle/runtime. `pnpm smoke` is a static-URL 404 check that never executes JS,
// so it cannot catch it either. Here we acorn-parse every component module as ESM:
// any parse error => the component is structurally broken. Parse only, no scope
// resolution — wrong-but-parseable rewrites are a separate concern (caught by the
// render gate when the template throws, or by the browser golden).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { pathToFileURL, fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const compDir = join(root, "registry/components");

// Load acorn — same durable resolution as the free-var audit. FAIL LOUD if absent;
// a silent skip turns this gate into a green checkmark that checks nothing.
async function loadAcorn() {
  try {
    return await import("acorn");
  } catch {}
  const store = join(root, "node_modules/.pnpm");
  let entries = [];
  try {
    entries = readdirSync(store).filter((d) => /^acorn@/.test(d));
  } catch {}
  entries.sort();
  for (const e of entries) {
    const candidate = join(store, e, "node_modules/acorn/dist/acorn.mjs");
    try {
      return await import(pathToFileURL(candidate).href);
    } catch {}
  }
  throw new Error(
    "acorn not found (tried bare import and node_modules/.pnpm/acorn@*); " +
      "the component parse gate cannot run — add acorn to devDependencies",
  );
}

const acorn = await loadAcorn();

const files = readdirSync(compDir)
  .filter((f) => f.endsWith(".js") && !f.endsWith(".meta.js"))
  .sort();

assert.ok(files.length > 0, "no component files found to parse");

for (const file of files) {
  test(`parses ${file}`, () => {
    const src = readFileSync(join(compDir, file), "utf8");
    assert.doesNotThrow(
      () => acorn.parse(src, { ecmaVersion: "latest", sourceType: "module" }),
      `${file} failed to parse as ESM (likely codemod splice corruption)`,
    );
  });
}
