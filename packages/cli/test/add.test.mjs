import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sha256 } from "../src/hash.mjs";
import { defaultConfig, writeConfig } from "../src/config.mjs";
import { runAdd } from "../src/commands/add.mjs";

async function localRegistry() {
  const root = await mkdtemp(join(tmpdir(), "reg-"));
  await mkdir(join(root, "r"), { recursive: true });
  const src = `import { PuraElement, define } from "../base.js";\ndefine("pura-button", class extends PuraElement {});`;
  await writeFile(join(root, "r", "registry.json"), JSON.stringify({
    version: "0.0.0-dev",
    components: [{ name: "button", hash: sha256(src), deps: ["base"], tokens: true }],
  }));
  await writeFile(join(root, "r", "button.json"), JSON.stringify({
    name: "button", version: "0.0.0-dev", hash: sha256(src), deps: ["base"], tokens: ["--pura-primary"],
    files: [{ target: "button.js", content: src, hash: sha256(src) }],
  }));
  await writeFile(join(root, "base.js"), "export class PuraElement {}\nexport function define(){}");
  await writeFile(join(root, "tokens.css"), ":root{--pura-primary:#000}");
  return root;
}

async function project(registryRoot) {
  const dir = await mkdtemp(join(tmpdir(), "proj-"));
  const cfg = defaultConfig();
  cfg.registry = registryRoot;
  await writeConfig(dir, cfg);
  return dir;
}

test("add writes component, base.js, tokens.css; records lock + cache", async () => {
  const reg = await localRegistry();
  const dir = await project(reg);
  await runAdd({ cwd: dir, name: "button", now: () => "2026-06-06T00:00:00Z" });

  await readFile(join(dir, "src/pura/components/button.js"), "utf8");
  await readFile(join(dir, "src/pura/base.js"), "utf8");
  const tokens = await readFile(join(dir, "src/pura/tokens.css"), "utf8");
  assert.match(tokens, /--pura-primary/);

  const lock = JSON.parse(await readFile(join(dir, "pura.lock"), "utf8"));
  assert.ok(lock.components.button.hash.startsWith("sha256-"));
  assert.equal(lock.components.button.installedAt, "2026-06-06T00:00:00Z");

  const cached = await readFile(join(dir, ".pura/cache/button/button.js"), "utf8");
  assert.match(cached, /pura-button/);
});

test("add fails closed on a tampered registry item", async () => {
  const reg = await localRegistry();
  const itemPath = join(reg, "r", "button.json");
  const item = JSON.parse(await readFile(itemPath, "utf8"));
  item.files[0].content += "// tampered";
  await writeFile(itemPath, JSON.stringify(item));
  const dir = await project(reg);
  await assert.rejects(runAdd({ cwd: dir, name: "button", now: () => "t" }), /integrity/);
});
