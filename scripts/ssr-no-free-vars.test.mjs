// Free-variable audit for registry/components/*.template.js — the parser-based
// safety net that is INDEPENDENT of the codemod's own regex analyzer. The codemod
// can miss a dependency that lives inside an attribute-gated nested template literal
// (a branch EMPTY_SHIM never takes), so the Node render gate would not catch it and
// it would ReferenceError only on a real client. Here we parse each emitted template
// with a real JS parser (acorn) and do per-scope identifier resolution: any name that
// is referenced but neither imported, declared, a parameter/local, nor a known global
// is a free variable => the template is broken. Per-scope (not flat) so a missed dep
// named `icon` is still caught even if some unrelated arrow has an `icon` param.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { pathToFileURL, fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const compDir = join(root, "registry/components");

// Load acorn. It is reachable transitively (vite/rollup) via the pnpm store. Resolve
// durably: prefer a bare import, else glob the store. FAIL LOUD if absent — a silent
// skip would turn this gate into a green checkmark that checks nothing.
async function loadAcorn() {
  try {
    return await import("acorn");
  } catch {}
  const store = join(root, "node_modules/.pnpm");
  let entries = [];
  try {
    entries = readdirSync(store).filter((d) => /^acorn@/.test(d));
  } catch {}
  entries.sort();
  for (const e of entries) {
    const candidate = join(store, e, "node_modules/acorn/dist/acorn.mjs");
    try {
      return await import(pathToFileURL(candidate).href);
    } catch {}
  }
  throw new Error(
    "acorn not found (tried bare import and node_modules/.pnpm/acorn@*); " +
      "the free-variable audit cannot run — add acorn to devDependencies",
  );
}

const GLOBALS = new Set([
  "el", "t", "arguments", "globalThis", "undefined", "NaN", "Infinity",
  "Math", "JSON", "Intl", "console", "structuredClone",
  "Object", "Array", "String", "Number", "Boolean", "Symbol", "BigInt",
  "Date", "Map", "Set", "WeakMap", "WeakSet", "RegExp", "Promise", "Proxy", "Reflect",
  "Error", "TypeError", "RangeError", "SyntaxError",
  "parseInt", "parseFloat", "isNaN", "isFinite",
  "encodeURIComponent", "decodeURIComponent", "encodeURI", "decodeURI",
]);

// Names bound by a (possibly destructuring) pattern.
function declaredNamesInPattern(node, out) {
  switch (node?.type) {
    case "Identifier":
      out.add(node.name);
      break;
    case "ObjectPattern":
      for (const p of node.properties) {
        if (p.type === "RestElement") declaredNamesInPattern(p.argument, out);
        else declaredNamesInPattern(p.value, out);
      }
      break;
    case "ArrayPattern":
      for (const e of node.elements) if (e) declaredNamesInPattern(e, out);
      break;
    case "AssignmentPattern":
      declaredNamesInPattern(node.left, out);
      break;
    case "RestElement":
      declaredNamesInPattern(node.argument, out);
      break;
  }
}

// Collect names declared directly in a scope (function/program), NOT descending into
// nested function bodies. Block-scoped names are hoisted to the enclosing function
// scope here — a deliberate over-bind that only ever causes a rare cross-block false
// negative within one function, never a false positive, and still catches cross-file
// misses (the bug class we care about).
function collectBindings(stmts, out) {
  const walk = (node) => {
    if (!node || typeof node.type !== "string") return;
    if (node.type === "VariableDeclaration") {
      for (const d of node.declarations) declaredNamesInPattern(d.id, out);
    } else if (node.type === "FunctionDeclaration" && node.id) {
      out.add(node.id.name);
      return; // do not descend into its body
    } else if (node.type === "ClassDeclaration" && node.id) {
      out.add(node.id.name);
      return;
    } else if (
      node.type === "FunctionExpression" ||
      node.type === "ArrowFunctionExpression"
    ) {
      return; // nested function — its locals belong to it
    }
    for (const k in node) {
      const v = node[k];
      if (Array.isArray(v)) for (const c of v) walk(c);
      else if (v && typeof v.type === "string") walk(v);
    }
  };
  for (const s of stmts) walk(s);
}

function resolveRef(name, scopes, free) {
  if (GLOBALS.has(name)) return;
  for (const s of scopes) if (s.has(name)) return;
  free.add(name);
}

// Visit default/computed parts of a binding pattern (these ARE value-position refs).
function visitPatternExtras(node, scopes, free) {
  switch (node?.type) {
    case "AssignmentPattern":
      visit(node.right, scopes, free);
      visitPatternExtras(node.left, scopes, free);
      break;
    case "ObjectPattern":
      for (const p of node.properties) {
        if (p.type === "RestElement") visitPatternExtras(p.argument, scopes, free);
        else {
          if (p.computed) visit(p.key, scopes, free);
          visitPatternExtras(p.value, scopes, free);
        }
      }
      break;
    case "ArrayPattern":
      for (const e of node.elements) if (e) visitPatternExtras(e, scopes, free);
      break;
    case "RestElement":
      visitPatternExtras(node.argument, scopes, free);
      break;
  }
}

function visitFunction(node, scopes, free) {
  const s = new Set();
  for (const p of node.params) declaredNamesInPattern(p, s);
  const bodyStmts = node.body.type === "BlockStatement" ? node.body.body : [node.body];
  collectBindings(bodyStmts, s);
  const inner = [s, ...scopes];
  for (const p of node.params) visitPatternExtras(p, inner, free);
  visit(node.body, inner, free);
}

function visit(node, scopes, free) {
  if (!node || typeof node.type !== "string") return;
  switch (node.type) {
    case "Identifier":
      resolveRef(node.name, scopes, free);
      return;
    case "ThisExpression":
    case "Super":
    case "BreakStatement":
    case "ContinueStatement":
    case "ImportDeclaration":
    case "ExportAllDeclaration":
      return;
    case "MemberExpression":
      visit(node.object, scopes, free);
      if (node.computed) visit(node.property, scopes, free);
      return;
    case "Property":
      if (node.computed) visit(node.key, scopes, free);
      visit(node.value, scopes, free);
      return;
    case "MethodDefinition":
    case "PropertyDefinition":
      if (node.computed) visit(node.key, scopes, free);
      if (node.value) visit(node.value, scopes, free);
      return;
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "ArrowFunctionExpression":
      visitFunction(node, scopes, free);
      return;
    case "ClassDeclaration":
    case "ClassExpression":
      if (node.superClass) visit(node.superClass, scopes, free);
      visit(node.body, scopes, free);
      return;
    case "VariableDeclarator":
      visitPatternExtras(node.id, scopes, free);
      if (node.init) visit(node.init, scopes, free);
      return;
    case "CatchClause": {
      const s = new Set();
      if (node.param) declaredNamesInPattern(node.param, s);
      visit(node.body, [s, ...scopes], free);
      return;
    }
    case "LabeledStatement":
      visit(node.body, scopes, free);
      return;
    case "ExportNamedDeclaration":
      if (node.declaration) visit(node.declaration, scopes, free);
      return;
    default:
      for (const k in node) {
        const v = node[k];
        if (Array.isArray(v)) for (const c of v) visit(c, scopes, free);
        else if (v && typeof v.type === "string") visit(v, scopes, free);
      }
  }
}

export function findFreeVars(src, acorn) {
  const ast = acorn.parse(src, { ecmaVersion: 2022, sourceType: "module" });
  const moduleScope = new Set();
  collectBindings(ast.body, moduleScope);
  for (const n of ast.body) {
    if (n.type === "ImportDeclaration")
      for (const sp of n.specifiers) moduleScope.add(sp.local.name);
  }
  const free = new Set();
  for (const n of ast.body) visit(n, [moduleScope], free);
  return [...free].sort();
}

const acorn = await loadAcorn();
const files = readdirSync(compDir)
  .filter((f) => f.endsWith(".template.js"))
  .sort();

test("free-var audit found template files", () => {
  assert.ok(files.length > 0, "no *.template.js files to audit");
});

for (const file of files) {
  test(`${file}: no free variables (all refs imported/declared/global)`, () => {
    const src = readFileSync(join(compDir, file), "utf8");
    const free = findFreeVars(src, acorn);
    assert.deepEqual(
      free,
      [],
      `${file} references undefined name(s): ${free.join(", ")} — ` +
        `the codemod missed a dependency (likely inside a gated nested template)`,
    );
  });
}
