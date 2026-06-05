// Scans registry/, emits registry.json (index) + apps/www/public/r/<name>.json
// (per-component items with sha256 integrity), and copies the runtime into
// apps/www/public/pura for live previews. Single source = registry/.
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = join(ROOT, "registry");
const COMPONENTS = join(REGISTRY, "components");
const WWW_PUBLIC = join(ROOT, "apps", "www", "public");
const OUT_R = join(WWW_PUBLIC, "r");
const OUT_PURA = join(WWW_PUBLIC, "pura");

export const VERSION = process.env.PURA_REGISTRY_VERSION || "0.0.0-dev";

// Integrity hash over file content. Hex digest, verified CLI-side by string
// comparison (not W3C Subresource Integrity, which would require base64).
export function hash(content) {
  return "sha256-" + createHash("sha256").update(content).digest("hex");
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")     // block comments
    .replace(/(^|[^:])\/\/.*$/gm, "$1");  // line comments (keep e.g. http://)
}

export function parseDeps(source) {
  const code = stripComments(source);
  const re = /from\s+["']\.\.?\/([\w-]+)\.js["']|import\s+["']\.\.?\/([\w-]+)\.js["']/g;
  const out = [];
  let m;
  while ((m = re.exec(code))) {
    const name = m[1] || m[2];
    if (name && !out.includes(name)) out.push(name);
  }
  return out;
}

export function parseTokens(source) {
  const re = /var\(\s*(--pura-[\w-]+)/g;
  const out = [];
  let m;
  while ((m = re.exec(source))) {
    if (!out.includes(m[1])) out.push(m[1]);
  }
  return out;
}

export function buildItem(name, source) {
  const h = hash(source);
  return {
    name,
    version: VERSION,
    hash: h,
    deps: parseDeps(source),
    tokens: parseTokens(source),
    files: [{ target: `${name}.js`, content: source, hash: h }],
  };
}

async function main() {
  await rm(OUT_R, { recursive: true, force: true });
  await mkdir(OUT_R, { recursive: true });

  const files = (await readdir(COMPONENTS)).filter((f) => f.endsWith(".js")).sort();
  const index = [];

  for (const file of files) {
    const name = basename(file, ".js");
    const source = await readFile(join(COMPONENTS, file), "utf8");
    const item = buildItem(name, source);
    await writeFile(join(OUT_R, `${name}.json`), JSON.stringify(item, null, 2));
    index.push({ name, hash: item.hash, deps: item.deps, tokens: item.tokens.length > 0 });
  }

  const registry = { version: VERSION, components: index };
  await writeFile(join(OUT_R, "registry.json"), JSON.stringify(registry, null, 2));
  await writeFile(join(REGISTRY, "registry.json"), JSON.stringify(registry, null, 2));

  await rm(OUT_PURA, { recursive: true, force: true });
  await mkdir(OUT_PURA, { recursive: true });
  await cp(REGISTRY, OUT_PURA, {
    recursive: true,
    filter: (src) => src !== join(REGISTRY, "registry.json"),
  });

  console.log(`registry build: ${index.length} components, version ${VERSION}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
