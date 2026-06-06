import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { writeLock } from "../src/lock.mjs";
import { collectList } from "../src/commands/list.mjs";

test("collectList reports installed entries", async () => {
  const dir = await mkdtemp(join(tmpdir(), "pura-"));
  await writeLock(dir, { lockfileVersion: 1, components: {
    button: { version: "0.0.0-dev", hash: "sha256-a", files: [], source: "x", installedAt: "t" },
  }});
  const rows = await collectList({ cwd: dir });
  assert.deepEqual(rows, [{ name: "button", version: "0.0.0-dev", hash: "sha256-a" }]);
});
