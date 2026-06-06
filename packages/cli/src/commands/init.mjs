import { access } from "node:fs/promises";
import { join } from "node:path";
import { defaultConfig, writeConfig } from "../config.mjs";

export async function runInit({ cwd }) {
  const exists = await access(join(cwd, "components.json")).then(() => true).catch(() => false);
  if (exists) throw new Error("components.json already exists.");
  await writeConfig(cwd, defaultConfig());
  console.log("created components.json");
}
