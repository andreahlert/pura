// SSR validity golden: every registry/components/*.template.js must export a
// pure <name>Template() that returns non-empty { html, css } and wraps into a
// valid declarative shadow root via renderDSD — with no DOM present (Node). A
// template that touches an instance method the EMPTY_SHIM lacks throws here,
// which is exactly the "not server-renderable" signal we want CI to catch.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { renderDSD } from "../registry/base.js";

const dir = join(dirname(fileURLToPath(import.meta.url)), "../registry/components");
const files = readdirSync(dir)
  .filter((f) => f.endsWith(".template.js"))
  .sort();

test("there is at least one extracted template", () => {
  assert.ok(files.length > 0);
});

for (const file of files) {
  const base = file.replace(/\.template\.js$/, "");
  test(`${base}: template renders a valid declarative shadow root in Node`, async () => {
    const mod = await import(pathToFileURL(join(dir, file)).href);
    const fns = Object.entries(mod).filter(
      ([k, v]) => typeof v === "function" && k.endsWith("Template"),
    );
    assert.ok(fns.length > 0, `${file} exports no *Template function`);
    for (const [name, fn] of fns) {
      const tpl = fn(); // EMPTY_SHIM default — no DOM, no attributes
      assert.equal(typeof tpl?.html, "string", `${name}() html`);
      assert.equal(typeof tpl?.css, "string", `${name}() css`);
      assert.ok(tpl.html.length > 0, `${name}() empty html`);
      assert.ok(tpl.css.length > 0, `${name}() empty css`);
      const dsd = renderDSD(`pura-${base}`, tpl, {});
      assert.match(dsd, /<template shadowrootmode="open">/);
    }
  });
}
