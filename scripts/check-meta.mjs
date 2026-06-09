import { readdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, basename } from "node:path";
import { isComponentFile } from "./build-registry.mjs";

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
  const components = all.filter(isComponentFile).map((f) => basename(f, ".js"));
  const metas = all.filter((f) => f.endsWith(".meta.js")).map((f) => basename(f, ".meta.js"));
  const { missingMeta, orphanMeta } = findMetaGaps(components, metas);
  if (missingMeta.length || orphanMeta.length) {
    if (missingMeta.length) console.error(`meta: missing for ${missingMeta.join(", ")}`);
    if (orphanMeta.length) console.error(`meta: orphan for ${orphanMeta.join(", ")}`);
    process.exit(1);
  }
  const bad = [];
  for (const name of metas) {
    const meta = (await import(pathToFileURL(join(COMPONENTS, `${name}.meta.js`)).href)).default;
    if ("animation" in meta && typeof meta.animation !== "boolean") bad.push(name);
  }
  if (bad.length) {
    console.error(`meta: animation must be boolean in ${bad.join(", ")}`);
    process.exit(1);
  }
  console.log(`meta: ${components.length} components all have meta`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
