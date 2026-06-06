import { readLock } from "../lock.mjs";

export async function collectList({ cwd }) {
  const lock = await readLock(cwd);
  return Object.entries(lock.components).map(([name, e]) => ({
    name, version: e.version, hash: e.hash,
  }));
}

export async function runList({ cwd }) {
  const rows = await collectList({ cwd });
  if (rows.length === 0) { console.log("no components installed"); return; }
  for (const r of rows) console.log(`${r.name}  ${r.version}  ${r.hash.slice(0, 14)}`);
}
