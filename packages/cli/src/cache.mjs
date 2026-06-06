import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";

function cachePath(cwd, name, target) {
  return join(cwd, ".pura", "cache", name, target);
}

export async function writeCache(cwd, name, target, content) {
  const p = cachePath(cwd, name, target);
  await mkdir(dirname(p), { recursive: true });
  await writeFile(p, content);
}

export async function readCache(cwd, name, target) {
  return readFile(cachePath(cwd, name, target), "utf8");
}
