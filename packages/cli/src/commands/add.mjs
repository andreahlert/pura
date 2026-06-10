import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { readConfig, libDir } from "../config.mjs";
import { makeFetcher, getIndex, getItem, getRootFile, verifyItem } from "../registry.mjs";
import { resolveInstall } from "../resolve.mjs";
import { readLock, writeLock, setEntry } from "../lock.mjs";
import { writeCache } from "../cache.mjs";

async function writeFileMk(path, content) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
}

export async function runAdd({ cwd, name, names, now }) {
  const list = names ?? (name ? [name] : []);
  if (list.length === 0) throw new Error("usage: pura add <component> [component...]");
  const config = await readConfig(cwd);
  const fetcher = makeFetcher(config.registry);
  const index = await getIndex(fetcher);

  // Resolve every requested component up front, merging the plans so shared
  // deps and root files are fetched/written once.
  const components = new Map();
  const rootFiles = new Set();
  let needsTokens = false;
  for (const n of list) {
    const plan = await resolveInstall({ fetcher, index, getItem, name: n });
    for (const item of plan.components) components.set(item.name, item);
    for (const f of plan.rootFiles) rootFiles.add(f);
    needsTokens = needsTokens || plan.needsTokens;
  }

  const compDir = join(cwd, config.paths.components);
  const lib = join(cwd, libDir(config));

  let lock = await readLock(cwd);

  for (const item of components.values()) {
    verifyItem(item);
    for (const f of item.files) {
      await writeFileMk(join(compDir, f.target), f.content);
      await writeCache(cwd, item.name, f.target, f.content);
    }
    lock = setEntry(lock, item.name, {
      version: item.version,
      hash: item.hash,
      files: item.files.map((f) => ({
        path: join(config.paths.components, f.target),
        sha256: f.hash,
      })),
      source: config.registry,
      installedAt: now(),
    });
  }

  for (const file of rootFiles) {
    await writeFileMk(join(lib, file), await getRootFile(fetcher, file));
  }
  if (needsTokens) {
    await writeFileMk(join(cwd, config.paths.tokens), await getRootFile(fetcher, "tokens.css"));
  }

  await writeLock(cwd, lock);
  console.log(`added ${[...components.keys()].join(", ")}`);
}
