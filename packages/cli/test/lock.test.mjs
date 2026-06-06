import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { readLock, writeLock, setEntry } from "../src/lock.mjs";
import { writeCache, readCache } from "../src/cache.mjs";

test("readLock returns empty shape when absent", async () => {
  const dir = await mkdtemp(join(tmpdir(), "pura-"));
  assert.deepEqual(await readLock(dir), { lockfileVersion: 1, components: {} });
});

test("setEntry + writeLock + readLock round-trips", async () => {
  const dir = await mkdtemp(join(tmpdir(), "pura-"));
  let lock = await readLock(dir);
  lock = setEntry(lock, "button", { version: "0.0.0-dev", hash: "sha256-a",
    files: [{ path: "src/pura/components/button.js", sha256: "sha256-a" }],
    source: "https://x", installedAt: "2026-06-06T00:00:00Z" });
  await writeLock(dir, lock);
  const back = await readLock(dir);
  assert.equal(back.components.button.hash, "sha256-a");
});

test("cache write/read round-trips pristine content", async () => {
  const dir = await mkdtemp(join(tmpdir(), "pura-"));
  await writeCache(dir, "button", "button.js", "PRISTINE");
  assert.equal(await readCache(dir, "button", "button.js"), "PRISTINE");
});
