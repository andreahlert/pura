import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
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

test("write then read round-trips via pura.json", async () => {
  const dir = await mkdtemp(join(tmpdir(), "pura-"));
  await writeConfig(dir, defaultConfig());
  const raw = await readFile(join(dir, "pura.json"), "utf8");
  assert.match(raw, /"registry"/);
  assert.deepEqual(await readConfig(dir), defaultConfig());
});

test("readConfig falls back to a components.json with pura fields", async () => {
  const dir = await mkdtemp(join(tmpdir(), "pura-"));
  const merged = { style: "new-york", ...defaultConfig() }; // shadcn + pura merged
  await writeFile(join(dir, "components.json"), JSON.stringify(merged));
  assert.deepEqual(await readConfig(dir), merged);
});

test("readConfig ignores a shadcn-only components.json", async () => {
  const dir = await mkdtemp(join(tmpdir(), "pura-"));
  await writeFile(join(dir, "components.json"), JSON.stringify({ style: "new-york" }));
  await assert.rejects(readConfig(dir), /pura\.json not found.*pura init/);
});

test("readConfig throws a clear error when missing", async () => {
  const dir = await mkdtemp(join(tmpdir(), "pura-"));
  await assert.rejects(readConfig(dir), /pura\.json not found.*pura init/);
});
