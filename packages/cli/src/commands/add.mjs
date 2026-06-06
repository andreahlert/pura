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

export async function runAdd({ cwd, name, now }) {
  if (!name) throw new Error("usage: pura add <component>");
  const config = await readConfig(cwd);
  const fetcher = makeFetcher(config.registry);
  const index = await getIndex(fetcher);
  const plan = await resolveInstall({ fetcher, index, getItem, name });

  const compDir = join(cwd, config.paths.components);
  const lib = join(cwd, libDir(config));

  let lock = await readLock(cwd);

  for (const item of plan.components) {
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

  for (const file of plan.rootFiles) {
    await writeFileMk(join(lib, file), await getRootFile(fetcher, file));
  }
  if (plan.needsTokens) {
    await writeFileMk(join(cwd, config.paths.tokens), await getRootFile(fetcher, "tokens.css"));
  }

  await writeLock(cwd, lock);
  console.log(`added ${plan.components.map((c) => c.name).join(", ")}`);
}
