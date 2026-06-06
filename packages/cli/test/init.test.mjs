import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runInit } from "../src/commands/init.mjs";

test("runInit writes a default components.json", async () => {
  const dir = await mkdtemp(join(tmpdir(), "pura-"));
  await runInit({ cwd: dir });
  const c = JSON.parse(await readFile(join(dir, "components.json"), "utf8"));
  assert.equal(c.paths.components, "src/pura/components");
});

test("runInit refuses to overwrite an existing config", async () => {
  const dir = await mkdtemp(join(tmpdir(), "pura-"));
  await writeFile(join(dir, "components.json"), "{}");
  await assert.rejects(runInit({ cwd: dir }), /already exists/);
});
