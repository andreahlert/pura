import { readdir, readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, basename } from "node:path";
import { computeRelations } from "./relations.mjs";
import { templates } from "../apps/www/src/data/templates.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const COMPONENTS = join(ROOT, "registry", "components");
const TEMPLATES_DIR = join(ROOT, "apps", "www", "public", "templates");
const OUT = join(ROOT, "apps", "www", "src", "data", "components.js");

export function renderComponentsModule(entries) {
  const body = entries.map((m) => JSON.stringify({
    slug: m.name, title: m.title, category: m.category,
    blurb: m.summary, description: m.description || m.summary,
    attributes: m.attributes, events: m.events, slots: m.slots,
    demoHTML: m.demoHTML || "", usage: m.usage || "",
    animation: m.animation === true,
    relatedComponents: m.relatedComponents || [],
    relatedBlocks: m.relatedBlocks || [],
  }, null, 2)).join(",\n");
  return `// AUTO-GENERATED from registry/components/*.meta.js. Do not edit by hand.\nexport const components = [\n${body}\n];\n`;
}

async function main() {
  const metaFiles = (await readdir(COMPONENTS)).filter((f) => f.endsWith(".meta.js")).sort();
  const entries = [];
  for (const file of metaFiles) {
    const name = basename(file, ".meta.js");
    const meta = (await import(pathToFileURL(join(COMPONENTS, file)).href)).default;
    const docsPath = join(COMPONENTS, `${name}.docs.js`);
    const hasDocs = await access(docsPath).then(() => true).catch(() => false);
    const docs = hasDocs ? (await import(pathToFileURL(docsPath).href)).default : {};
    entries.push({ ...meta, ...docs });
  }

  // Scan canonical (English) blocks for component tags and attach relations.
  const slugs = new Set(entries.map((e) => e.name));
  const titles = new Map(entries.map((e) => [e.name, e.title]));
  const blockTitle = new Map(templates.map((t) => [t.slug, t.title]));
  const htmlFiles = (await readdir(TEMPLATES_DIR))
    .filter((f) => f.endsWith(".html") && !/\.(de|fr|it|pt-BR)\.html$/.test(f));
  const blocks = [];
  for (const f of htmlFiles) {
    const slug = basename(f, ".html");
    const html = await readFile(join(TEMPLATES_DIR, f), "utf8");
    blocks.push({ slug, title: blockTitle.get(slug) || slug, html });
  }
  const { relatedBlocks, relatedComponents } = computeRelations(blocks, slugs, titles);
  for (const e of entries) {
    e.relatedComponents = relatedComponents.get(e.name) || [];
    e.relatedBlocks = relatedBlocks.get(e.name) || [];
  }

  await writeFile(OUT, renderComponentsModule(entries));
  console.log(`generated components.js (${entries.length})`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
