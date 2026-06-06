import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveInstall } from "../src/resolve.mjs";

// Fake item graph: alert depends on button; button depends on base + i18n.
const items = {
  alert: { name: "alert", deps: ["base", "button"], files: [{ target: "alert.js", content: "a", hash: "sha256-a" }] },
  button: { name: "button", deps: ["base", "i18n"], files: [{ target: "button.js", content: "b", hash: "sha256-b" }] },
};
const index = { components: [{ name: "alert" }, { name: "button" }] };
const getItem = async (_f, n) => items[n];

test("resolveInstall returns components, root libs, and tokens flag", async () => {
  const plan = await resolveInstall({ fetcher: null, index, getItem, name: "alert" });
  assert.deepEqual(plan.components.map((c) => c.name).sort(), ["alert", "button"]);
  assert.deepEqual([...plan.rootFiles].sort(), ["base.js", "i18n.js"]);
  assert.equal(plan.needsTokens, true);
});

test("resolveInstall throws on unknown component", async () => {
  await assert.rejects(
    resolveInstall({ fetcher: null, index, getItem, name: "ghost" }),
    /unknown component: ghost/
  );
});
