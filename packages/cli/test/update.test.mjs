import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sha256 } from "../src/hash.mjs";
import { defaultConfig, writeConfig } from "../src/config.mjs";
import { runAdd } from "../src/commands/add.mjs";
import { runUpdate } from "../src/commands/update.mjs";

async function reg(content) {
  const root = await mkdtemp(join(tmpdir(), "reg-"));
  await mkdir(join(root, "r"), { recursive: true });
  await writeFile(join(root, "r", "registry.json"), JSON.stringify({
    version: "0.0.0-dev", components: [{ name: "button", hash: sha256(content), deps: [], tokens: false }],
  }));
  await writeFile(join(root, "r", "button.json"), JSON.stringify({
    name: "button", version: "0.0.0-dev", hash: sha256(content), deps: [], tokens: [],
    files: [{ target: "button.js", content, hash: sha256(content) }],
  }));
  await writeFile(join(root, "tokens.css"), ":root{}");
  return root;
}

test("update merges upstream change into a locally edited file", async () => {
  const v1 = "line1\nline2\nline3\n";
  const r1 = await reg(v1);
  const dir = await mkdtemp(join(tmpdir(), "proj-"));
  const cfg = defaultConfig(); cfg.registry = r1;
  await writeConfig(dir, cfg);
  await runAdd({ cwd: dir, name: "button", now: () => "t" });

  // user edits line3 locally
  const file = join(dir, "src/pura/components/button.js");
  await writeFile(file, "line1\nline2\nline3-LOCAL\n");

  // upstream changes line1
  const cfg2 = defaultConfig(); cfg2.registry = await reg("line1-UPSTREAM\nline2\nline3\n");
  await writeConfig(dir, cfg2);

  const res = await runUpdate({ cwd: dir, name: "button", now: () => "t2" });
  const merged = await readFile(file, "utf8");
  assert.match(merged, /line1-UPSTREAM/);   // upstream change applied
  assert.match(merged, /line3-LOCAL/);      // local edit preserved
  assert.equal(res.conflicts.length, 0);
});

test("update with no upstream change is a no-op (hash equal)", async () => {
  const v1 = "a\nb\n";
  const r1 = await reg(v1);
  const dir = await mkdtemp(join(tmpdir(), "proj-"));
  const cfg = defaultConfig(); cfg.registry = r1;
  await writeConfig(dir, cfg);
  await runAdd({ cwd: dir, name: "button", now: () => "t" });
  const res = await runUpdate({ cwd: dir, name: "button", now: () => "t2" });
  assert.deepEqual(res.updated, []);
});
