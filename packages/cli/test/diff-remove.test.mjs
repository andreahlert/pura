import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sha256 } from "../src/hash.mjs";
import { defaultConfig, writeConfig } from "../src/config.mjs";
import { runAdd } from "../src/commands/add.mjs";
import { computeDiff } from "../src/commands/diff.mjs";
import { runRemove } from "../src/commands/remove.mjs";

async function setup() {
  const root = await mkdtemp(join(tmpdir(), "reg-"));
  await mkdir(join(root, "r"), { recursive: true });
  const src = "a\nb\n";
  await writeFile(join(root, "r", "registry.json"), JSON.stringify({
    version: "0.0.0-dev", components: [{ name: "button", hash: sha256(src), deps: [], tokens: false }] }));
  await writeFile(join(root, "r", "button.json"), JSON.stringify({
    name: "button", version: "0.0.0-dev", hash: sha256(src), deps: [], tokens: [],
    files: [{ target: "button.js", content: src, hash: sha256(src) }] }));
  await writeFile(join(root, "tokens.css"), ":root{}");
  const dir = await mkdtemp(join(tmpdir(), "proj-"));
  const cfg = defaultConfig(); cfg.registry = root;
  await writeConfig(dir, cfg);
  await runAdd({ cwd: dir, name: "button", now: () => "t" });
  return dir;
}

test("computeDiff reports local edits vs pristine", async () => {
  const dir = await setup();
  await writeFile(join(dir, "src/pura/components/button.js"), "a\nb-EDIT\n");
  const d = await computeDiff({ cwd: dir, name: "button" });
  assert.equal(d.changed, true);
  assert.match(d.patch, /-b/);
  assert.match(d.patch, /\+b-EDIT/);
});

test("remove deletes files, lock entry, and cache", async () => {
  const dir = await setup();
  await runRemove({ cwd: dir, name: "button" });
  await assert.rejects(access(join(dir, "src/pura/components/button.js")));
  const lock = JSON.parse(await readFile(join(dir, "pura.lock"), "utf8"));
  assert.equal(lock.components.button, undefined);
});
