import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { sha256 } from "./hash.mjs";

// A fetcher abstracts URL vs local-dir registries. Returns text for a path
// relative to registryRoot (e.g. "r/button.json", "base.js").
export function makeFetcher(registryRoot) {
  const isUrl = /^https?:\/\//.test(registryRoot);
  if (isUrl) {
    return async (rel) => {
      const res = await fetch(registryRoot.replace(/\/$/, "") + "/" + rel);
      if (!res.ok) throw new Error(`fetch ${rel}: ${res.status}`);
      return res.text();
    };
  }
  return (rel) => readFile(join(registryRoot, rel), "utf8");
}

export async function getIndex(fetcher) {
  return JSON.parse(await fetcher("r/registry.json"));
}

export async function getItem(fetcher, name) {
  return JSON.parse(await fetcher(`r/${name}.json`));
}

export async function getRootFile(fetcher, file) {
  return fetcher(file);
}

// Re-hash each file's content; string-compare to the declared hash.
export function verifyItem(item) {
  for (const f of item.files) {
    if (sha256(f.content) !== f.hash) {
      throw new Error(`integrity check failed for ${item.name}/${f.target}`);
    }
  }
}
