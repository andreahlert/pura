import { test } from "node:test";
import assert from "node:assert/strict";
import { hash, parseDeps, parseTokens, buildItem, buildAgentsIndex, llmsText } from "./build-registry.mjs";

test("hash is deterministic sha256 with prefix", () => {
  const h = hash("hello");
  assert.match(h, /^sha256-[a-f0-9]{64}$/);
  assert.equal(h, hash("hello"));
  assert.notEqual(h, hash("hello!"));
});

test("parseDeps finds named and side-effect imports, dedups", () => {
  const src = `import { PuraElement } from "../base.js";\nimport "./card.js";`;
  assert.deepEqual(parseDeps(src), ["base", "card"]);
});

test("parseDeps returns [base] for a component importing only base", () => {
  const src = `import { PuraElement, define } from "../base.js";`;
  assert.deepEqual(parseDeps(src), ["base"]);
});

test("parseTokens extracts unique pura css vars", () => {
  const src = "color: var(--pura-primary); gap: var(--pura-space-2); bg: var(--pura-primary);";
  assert.deepEqual(parseTokens(src), ["--pura-primary", "--pura-space-2"]);
});

test("parseDeps ignores commented-out imports", () => {
  const src = `import { PuraElement } from "../base.js";\n// import "./old.js";\n/* import "./dead.js"; */`;
  assert.deepEqual(parseDeps(src), ["base"]);
});

test("buildItem assembles a registry item", () => {
  const src = `import { PuraElement } from "../base.js";\n/* var(--pura-primary) */`;
  const item = buildItem("button", src);
  assert.equal(item.name, "button");
  assert.equal(item.version, "0.0.0-dev");
  assert.deepEqual(item.deps, ["base"]);
  assert.deepEqual(item.tokens, ["--pura-primary"]);
  assert.equal(item.files.length, 1);
  assert.equal(item.files[0].target, "button.js");
  assert.equal(item.files[0].content, src);
  assert.match(item.files[0].hash, /^sha256-/);
  assert.equal(item.hash, item.files[0].hash);
});

test("buildAgentsIndex projects meta records", () => {
  const metas = [{ name: "button", tag: "pura-button", role: "button", summary: "s",
    attributes: [{ name: "variant" }], events: [], slots: ["default"] }];
  const idx = buildAgentsIndex("1.0.0", metas);
  assert.equal(idx.version, "1.0.0");
  assert.equal(idx.components[0].tag, "pura-button");
  assert.equal(idx.components[0].role, "button");
});

test("llmsText renders one block per component", () => {
  const txt = llmsText([{ name: "button", tag: "pura-button", role: "button",
    summary: "Action button.", attributes: [{ name: "variant", type: "string" }], events: [], slots: ["default"] }]);
  assert.match(txt, /pura-button/);
  assert.match(txt, /role: button/);
  assert.match(txt, /Action button\./);
});
