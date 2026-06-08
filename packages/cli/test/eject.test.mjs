import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ejectSource } from "../src/eject.mjs";

const here = dirname(fileURLToPath(import.meta.url));

test("ejectSource converts shadow render to light-DOM with prefixed classes", async () => {
  const input = await readFile(join(here, "fixtures/button.shadow.js"), "utf8");
  const golden = await readFile(join(here, "fixtures/button.light.golden.js"), "utf8");
  assert.equal(ejectSource(input, "button"), golden);
});
