import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ejectSource, ejectWarnings } from "../src/eject.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const SAMPLE = ["button", "alert", "badge", "card", "input"];

for (const name of SAMPLE) {
  test(`eject ${name}: no :host or this.render remains`, async () => {
    const src = await readFile(join(ROOT, "registry/components", `${name}.js`), "utf8");
    const out = ejectSource(src, name);
    assert.ok(!/:host\b/.test(out), `${name} still has :host`);
    assert.ok(!/this\.render\(/.test(out), `${name} still calls this.render`);
  });
}

// --- ejectWarnings unit tests ---

test("ejectWarnings: returns warnings for residual :host and this.render(", () => {
  const dirty = `
    :host { display: block; }
    this.render(\`<div></div>\`, CSS);
  `;
  const warnings = ejectWarnings(dirty);
  assert.ok(warnings.length >= 2, "expected at least 2 warnings");
  assert.ok(warnings.some(w => w.includes(":host")), "expected :host warning");
  assert.ok(warnings.some(w => w.includes("this.render")), "expected this.render warning");
});

test("ejectWarnings: returns empty array for clean light-DOM output", () => {
  const clean = `
    .pura-button { display: block; }
    this.renderLight(\`<div></div>\`, CSS);
  `;
  const warnings = ejectWarnings(clean);
  assert.deepEqual(warnings, []);
});
