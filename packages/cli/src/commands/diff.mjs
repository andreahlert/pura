import { readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { diffLines } from "diff";
import { readConfig } from "../config.mjs";
import { readLock } from "../lock.mjs";
import { readCache } from "../cache.mjs";

export async function computeDiff({ cwd, name }) {
  const config = await readConfig(cwd);
  const lock = await readLock(cwd);
  const entry = lock.components[name];
  if (!entry) throw new Error(`not installed: ${name}`);

  let changed = false;
  let patch = "";
  for (const f of entry.files) {
    const target = relative(config.paths.components, f.path);
    const pristine = await readCache(cwd, name, target);
    const current = await readFile(join(cwd, f.path), "utf8");
    if (pristine === current) continue;
    changed = true;
    for (const part of diffLines(pristine, current)) {
      const prefix = part.added ? "+" : part.removed ? "-" : " ";
      const lines = part.value.split("\n");
      if (lines[lines.length - 1] === "") lines.pop();
      for (const l of lines) patch += prefix + l + "\n";
    }
  }
  return { changed, patch };
}

export async function runDiff({ cwd, name }) {
  const d = await computeDiff({ cwd, name });
  if (!d.changed) { console.log(`${name}: no local changes`); return; }
  process.stdout.write(d.patch);
}
