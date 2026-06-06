import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { defaultConfig, writeConfig, readConfig, libDir } from "../src/config.mjs";

test("defaultConfig has registry + paths", () => {
  const c = defaultConfig();
  assert.equal(c.registry, "https://andreahlert.github.io/pura");
  assert.equal(c.paths.components, "src/pura/components");
});

test("libDir is the parent of the components dir", () => {
  assert.equal(libDir(defaultConfig()), "src/pura");
});

test("write then read round-trips", async () => {
  const dir = await mkdtemp(join(tmpdir(), "pura-"));
  await writeConfig(dir, defaultConfig());
  const raw = await readFile(join(dir, "components.json"), "utf8");
  assert.match(raw, /"registry"/);
  assert.deepEqual(await readConfig(dir), defaultConfig());
});

test("readConfig throws a clear error when missing", async () => {
  const dir = await mkdtemp(join(tmpdir(), "pura-"));
  await assert.rejects(readConfig(dir), /components\.json not found.*pura init/);
});
