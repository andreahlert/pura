// Scans registry/, emits registry.json (index) + apps/www/public/r/<name>.json
// (per-component items with sha256 integrity), and copies the runtime into
// apps/www/public so live previews can load it. Single source = registry/.
//
// Runtime files land at the public ROOT (not a subdir). With Astro base
// "/pura/", a file at public/<x> is served at the deploy URL "/pura/<x>" — which
// is exactly what the site's existing "/pura/..." asset refs resolve to. Nesting
// under public/pura would instead serve at "/pura/pura/..." and 404.
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, basename } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = join(ROOT, "registry");
const COMPONENTS = join(REGISTRY, "components");
const WWW_PUBLIC = join(ROOT, "apps", "www", "public");
const OUT_R = join(WWW_PUBLIC, "r");
// Component files are emitted under both names: pura.js imports "./components/X.js",
// while the docs' demoHTML imports "/pura/lib/X.js" (legacy alias). Same content.
const RUNTIME_DIRS = ["components", "lib"];

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

export function buildAgentsIndex(version, metas) {
  return {
    version,
    components: metas.map((m) => ({
      name: m.name, tag: m.tag, role: m.role, summary: m.summary,
      attributes: m.attributes, events: m.events, slots: m.slots,
    })),
  };
}

export function llmsText(metas) {
  return metas.map((m) => {
    const attrs = m.attributes.map((a) => `  - ${a.name}${a.type ? ` (${a.type})` : ""}`).join("\n");
    return [
      `## ${m.tag}`,
      `role: ${m.role || "none"}`,
      m.summary,
      m.attributes.length ? `attributes:\n${attrs}` : "",
      m.slots.length ? `slots: ${m.slots.join(", ")}` : "",
      m.events.length ? `events: ${m.events.join(", ")}` : "",
    ].filter(Boolean).join("\n");
  }).join("\n\n") + "\n";
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

  const files = (await readdir(COMPONENTS))
    .filter((f) => f.endsWith(".js") && !f.endsWith(".meta.js"))
    .sort();
  const index = [];
  const metas = [];

  for (const file of files) {
    const name = basename(file, ".js");
    const source = await readFile(join(COMPONENTS, file), "utf8");
    const item = buildItem(name, source);
    const meta = (await import(pathToFileURL(join(COMPONENTS, `${name}.meta.js`)).href)).default;
    item.meta = meta;
    metas.push(meta);
    await writeFile(join(OUT_R, `${name}.json`), JSON.stringify(item, null, 2));
    index.push({ name, hash: item.hash, deps: item.deps, tokens: item.tokens.length > 0 });
  }

  const registry = { version: VERSION, components: index };
  await writeFile(join(OUT_R, "registry.json"), JSON.stringify(registry, null, 2));
  await writeFile(join(REGISTRY, "registry.json"), JSON.stringify(registry, null, 2));

  await emitRuntime();

  await writeFile(join(WWW_PUBLIC, "agents.json"), JSON.stringify(buildAgentsIndex(VERSION, metas), null, 2));
  await writeFile(join(WWW_PUBLIC, "llms.txt"), llmsText(metas));

  console.log(`registry build: ${index.length} components, version ${VERSION}`);
}

// Copy the registry runtime into the www public root for live previews.
// Top-level files (base.js, tokens.css, pura.js, theme*.js, i18n.js) go to the
// root; components are duplicated into components/ and lib/. Cleans only the
// generated entries — never the whole public dir (favicon.svg, templates/ are
// committed there).
async function emitRuntime() {
  const entries = await readdir(REGISTRY, { withFileTypes: true });
  const rootFiles = entries
    .filter((e) => e.isFile() && e.name !== "registry.json")
    .map((e) => e.name);

  for (const name of rootFiles) {
    const dest = join(WWW_PUBLIC, name);
    await rm(dest, { force: true });
    await cp(join(REGISTRY, name), dest);
  }

  for (const dir of RUNTIME_DIRS) {
    const dest = join(WWW_PUBLIC, dir);
    await rm(dest, { recursive: true, force: true });
    await cp(COMPONENTS, dest, { recursive: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
