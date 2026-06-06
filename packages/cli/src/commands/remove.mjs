import { rm } from "node:fs/promises";
import { join } from "node:path";
import { readLock, writeLock } from "../lock.mjs";

export async function runRemove({ cwd, name }) {
  const lock = await readLock(cwd);
  const entry = lock.components[name];
  if (!entry) throw new Error(`not installed: ${name}`);

  // Warn about dependents still installed.
  const dependents = Object.entries(lock.components)
    .filter(([n, e]) => n !== name && (e.deps || []).includes(name))
    .map(([n]) => n);
  if (dependents.length) console.log(`warning: still used by ${dependents.join(", ")}`);

  for (const f of entry.files) await rm(join(cwd, f.path), { force: true });
  await rm(join(cwd, ".pura", "cache", name), { recursive: true, force: true });

  const next = { ...lock, components: { ...lock.components } };
  delete next.components[name];
  await writeLock(cwd, next);
  console.log(`removed ${name}`);
}
