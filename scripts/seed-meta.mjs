import { readdir, readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const COMPONENTS = join(ROOT, "registry", "components");

// ARIA roles by component slug. "" = no implicit role override.
// Authored once here; reviewed against each component during M3.
const ROLES = { button: "button", alert: "alert", dialog: "dialog", tabs: "tablist" };

export function toMetaRecord(entry, { role = "" } = {}) {
  return {
    name: entry.slug,
    tag: `pura-${entry.slug}`,
    category: entry.category,
    title: entry.title,
    role,
    summary: entry.blurb,
    attributes: (entry.attributes || []).map((a) => ({
      name: a.name, type: a.type, default: a.default, desc: a.desc,
    })),
    events: entry.events || [],
    slots: entry.slots || [],
    i18nKeys: [],
  };
}

function serialize(record) {
  return "export default " + JSON.stringify(record, null, 2) + ";\n";
}

async function main() {
  const { components } = await import(join("file://", ROOT, "apps/www/src/data/components.js"));
  const known = new Set((await readdir(COMPONENTS)).filter((f) => f.endsWith(".js") && !f.endsWith(".meta.js")).map((f) => basename(f, ".js")));
  const bySlug = new Map(components.map((c) => [c.slug, c]));

  let seeded = 0, missing = [];
  for (const slug of known) {
    const metaPath = join(COMPONENTS, `${slug}.meta.js`);
    const exists = await access(metaPath).then(() => true).catch(() => false);
    if (exists) continue;
    const entry = bySlug.get(slug);
    if (!entry) { missing.push(slug); continue; }
    await writeFile(metaPath, serialize(toMetaRecord(entry, { role: ROLES[slug] || "" })));
    seeded++;
  }
  console.log(`seeded ${seeded} .meta.js; ${missing.length} components lack a docs entry: ${missing.join(", ")}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
