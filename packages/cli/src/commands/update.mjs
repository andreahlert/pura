import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { readConfig } from "../config.mjs";
import { makeFetcher, getItem, verifyItem } from "../registry.mjs";
import { readLock, writeLock, setEntry } from "../lock.mjs";
import { readCache, writeCache } from "../cache.mjs";
import { threeWayMerge } from "../merge.mjs";

export async function runUpdate({ cwd, name, now }) {
  const config = await readConfig(cwd);
  const fetcher = makeFetcher(config.registry);
  let lock = await readLock(cwd);

  const names = name ? [name] : Object.keys(lock.components);
  const updated = [];
  const conflicts = [];

  for (const n of names) {
    const entry = lock.components[n];
    if (!entry) throw new Error(`not installed: ${n}`);
    const item = await getItem(fetcher, n);
    verifyItem(item);
    if (item.hash === entry.hash) continue; // change detection by HASH, not version

    for (const f of item.files) {
      const filePath = join(cwd, config.paths.components, f.target);
      const base = await readCache(cwd, n, f.target);
      const yours = await readFile(filePath, "utf8");
      const theirs = f.content;
      const merged = threeWayMerge({ base, yours, theirs });
      await writeFile(filePath, merged.result);
      await writeCache(cwd, n, f.target, theirs); // new pristine base
      if (merged.conflict) conflicts.push(`${n}/${f.target}`);
    }

    lock = setEntry(lock, n, {
      ...entry, version: item.version, hash: item.hash, installedAt: now(),
      files: item.files.map((f) => ({ path: join(config.paths.components, f.target), sha256: f.hash })),
    });
    updated.push(n);
  }

  await writeLock(cwd, lock);
  for (const c of conflicts) console.log(`CONFLICT: ${c} (resolve markers, then commit)`);
  if (updated.length) console.log(`updated ${updated.join(", ")}`);
  else console.log("everything up to date");
  return { updated, conflicts };
}
