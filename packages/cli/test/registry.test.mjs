import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { makeFetcher, getIndex, getItem, getRootFile, verifyItem } from "../src/registry.mjs";

async function fakeRegistry() {
  const root = await mkdtemp(join(tmpdir(), "reg-"));
  await mkdir(join(root, "r"), { recursive: true });
  await writeFile(join(root, "r", "registry.json"),
    JSON.stringify({ version: "0.0.0-dev", components: [{ name: "button", hash: "x", deps: ["base"], tokens: true }] }));
  const src = "export const x = 1;";
  const { sha256 } = await import("../src/hash.mjs");
  await writeFile(join(root, "r", "button.json"),
    JSON.stringify({ name: "button", version: "0.0.0-dev", hash: sha256(src),
      deps: ["base"], tokens: ["--pura-primary"],
      files: [{ target: "button.js", content: src, hash: sha256(src) }] }));
  await writeFile(join(root, "base.js"), "export class P {}");
  return root;
}

test("getIndex reads components", async () => {
  const root = await fakeRegistry();
  const fetcher = makeFetcher(root);
  const idx = await getIndex(fetcher);
  assert.equal(idx.components[0].name, "button");
});

test("getItem + verifyItem passes for honest content", async () => {
  const root = await fakeRegistry();
  const fetcher = makeFetcher(root);
  const item = await getItem(fetcher, "button");
  assert.doesNotThrow(() => verifyItem(item));
});

test("verifyItem throws on tampered content", async () => {
  const root = await fakeRegistry();
  const item = await getItem(makeFetcher(root), "button");
  item.files[0].content = "tampered";
  assert.throws(() => verifyItem(item), /integrity/);
});

test("getRootFile fetches base.js", async () => {
  const root = await fakeRegistry();
  assert.match(await getRootFile(makeFetcher(root), "base.js"), /class P/);
});
