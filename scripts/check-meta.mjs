import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const COMPONENTS = join(ROOT, "registry", "components");

export function findMetaGaps(componentNames, metaNames) {
  const metaSet = new Set(metaNames);
  const compSet = new Set(componentNames);
  return {
    missingMeta: componentNames.filter((n) => !metaSet.has(n)),
    orphanMeta: metaNames.filter((n) => !compSet.has(n)),
  };
}

async function main() {
  const all = await readdir(COMPONENTS);
  const components = all.filter((f) => f.endsWith(".js") && !f.endsWith(".meta.js") && !f.endsWith(".docs.js")).map((f) => basename(f, ".js"));
  const metas = all.filter((f) => f.endsWith(".meta.js")).map((f) => basename(f, ".meta.js"));
  const { missingMeta, orphanMeta } = findMetaGaps(components, metas);
  if (missingMeta.length || orphanMeta.length) {
    if (missingMeta.length) console.error(`meta: missing for ${missingMeta.join(", ")}`);
    if (orphanMeta.length) console.error(`meta: orphan for ${orphanMeta.join(", ")}`);
    process.exit(1);
  }
  console.log(`meta: ${components.length} components all have meta`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
