// SSR completeness gate: every component that calls this.render(...) MUST import
// a `*.template.js`, i.e. its initial paint goes through the pure-template / DSD
// contract rather than an inline string literal. The render/free-var gates only
// validate the templates that EXIST (they glob *.template.js); they never assert
// that ALL render-callers have one. This gate closes that hole so "complete" is
// machine-checked, not eyeballed. If you add a render-calling component, give it
// a template (run the SSR extraction) or this fails.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = join(dirname(fileURLToPath(import.meta.url)), "../registry/components");

// Component sources only — exclude the .meta.js and .template.js sidecars.
const components = readdirSync(dir)
  .filter((f) => f.endsWith(".js") && !f.endsWith(".meta.js") && !f.endsWith(".template.js"))
  .sort();

const RENDER = /this\.(?:_?render)\(/;
const TEMPLATE_IMPORT = /\.template\.js/;

// Documented exemptions: render-callers whose initial paint interpolates
// RUNTIME-ONLY content into itself (slotted children / measured layout), so
// there is no attribute-derived form a pure template could reproduce. Each entry
// must carry a structural reason — a per-instance uid or a wired-after-render
// value is NOT a valid reason (those extract cleanly).
const EXEMPT = {
  // <pura-select> re-emits its light-DOM <option> children: connectedCallback
  // maps `this.querySelectorAll("option")` straight into the native <select>.
  // The options live in slotted markup, not in attributes, and EMPTY_SHIM has no
  // querySelectorAll — so the server has nothing to reproduce. The native
  // <select> is itself the SSR-friendly primitive; light-DOM options are already
  // visible/agent-readable pre-upgrade. No pure-template form exists.
  "select.js": "re-emits slotted light-DOM <option> children into native <select>",
};

const renderCallers = components.filter((f) => RENDER.test(readFileSync(join(dir, f), "utf8")));

test("there are render-calling components to check", () => {
  assert.ok(renderCallers.length > 0, "no render-calling components found — glob broken?");
});

test("every render-calling component imports a *.template.js (SSR contract)", () => {
  const missing = renderCallers.filter(
    (f) => !TEMPLATE_IMPORT.test(readFileSync(join(dir, f), "utf8")) && !(f in EXEMPT),
  );
  assert.deepEqual(
    missing,
    [],
    `${missing.length} render-calling component(s) lack a template import (not server-renderable):\n  ${missing.join("\n  ")}`,
  );
});

// The allowlist must not rot: every exempt entry has to still be a render-caller
// that lacks a template. If one gains a template (or stops calling render), drop
// it from EXEMPT so the exemption can't silently mask a regressed component.
test("exempt allowlist is live (no stale entries)", () => {
  const stale = Object.keys(EXEMPT).filter(
    (f) => !renderCallers.includes(f) || TEMPLATE_IMPORT.test(readFileSync(join(dir, f), "utf8")),
  );
  assert.deepEqual(
    stale,
    [],
    `${stale.length} stale EXEMPT entr(ies) — now templated or no longer render-callers:\n  ${stale.join("\n  ")}`,
  );
});
