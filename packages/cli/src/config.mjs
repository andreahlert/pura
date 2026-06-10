import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";

// Config lives in pura.json. components.json (the shadcn config file) is read
// as a fallback only when it carries pura fields, so projects that merged the
// two configs before pura.json existed keep working.
const CONFIG_FILE = "pura.json";
const LEGACY_FILE = "components.json";

export function defaultConfig() {
  return {
    $schema: "https://andreahlert.github.io/pura/schema/pura.json",
    registry: "https://andreahlert.github.io/pura",
    paths: { components: "src/pura/components", tokens: "src/pura/tokens.css" },
  };
}

export function libDir(config) {
  return dirname(config.paths.components);
}

export async function writeConfig(cwd, config) {
  await writeFile(join(cwd, CONFIG_FILE), JSON.stringify(config, null, 2) + "\n");
}

function isPuraConfig(c) {
  return typeof c?.registry === "string" && typeof c?.paths?.components === "string";
}

export async function readConfig(cwd) {
  let raw;
  try {
    raw = await readFile(join(cwd, CONFIG_FILE), "utf8");
  } catch {
    // Legacy fallback: a components.json that has the pura fields merged in.
    try {
      const legacy = JSON.parse(await readFile(join(cwd, LEGACY_FILE), "utf8"));
      if (isPuraConfig(legacy)) return legacy;
    } catch {
      // fall through to the pura.json error below
    }
    throw new Error("pura.json not found. Run `pura init` first.");
  }
  return JSON.parse(raw);
}
