import { test } from "node:test";
import assert from "node:assert/strict";
import { toMetaRecord } from "./seed-meta.mjs";

test("toMetaRecord maps a docs entry to a .meta record", () => {
  const entry = {
    slug: "button", title: "Button", category: "Form",
    blurb: "Action button.", description: "`<pura-button>` ...",
    attributes: [{ name: "variant", type: "string", default: "primary", desc: "Style." }],
    events: [], slots: ["default"],
  };
  const m = toMetaRecord(entry, { role: "button" });
  assert.equal(m.name, "button");
  assert.equal(m.tag, "pura-button");
  assert.equal(m.role, "button");
  assert.equal(m.summary, "Action button.");
  assert.deepEqual(m.slots, ["default"]);
  assert.equal(m.attributes[0].name, "variant");
});
