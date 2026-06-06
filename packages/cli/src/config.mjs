import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";

export function defaultConfig() {
  return {
    $schema: "https://andreahlert.github.io/pura/schema/components.json",
    registry: "https://andreahlert.github.io/pura",
    paths: { components: "src/pura/components", tokens: "src/pura/tokens.css" },
  };
}

export function libDir(config) {
  return dirname(config.paths.components);
}

export async function writeConfig(cwd, config) {
  await writeFile(join(cwd, "components.json"), JSON.stringify(config, null, 2) + "\n");
}

export async function readConfig(cwd) {
  try {
    return JSON.parse(await readFile(join(cwd, "components.json"), "utf8"));
  } catch {
    throw new Error("components.json not found. Run `pura init` first.");
  }
}
