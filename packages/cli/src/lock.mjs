import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function readLock(cwd) {
  try {
    return JSON.parse(await readFile(join(cwd, "pura.lock"), "utf8"));
  } catch {
    return { lockfileVersion: 1, components: {} };
  }
}

export async function writeLock(cwd, lock) {
  await writeFile(join(cwd, "pura.lock"), JSON.stringify(lock, null, 2) + "\n");
}

export function setEntry(lock, name, entry) {
  return { ...lock, components: { ...lock.components, [name]: entry } };
}
