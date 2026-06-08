import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { readConfig } from "../config.mjs";
import { ejectSource } from "../eject.mjs";

export async function runEject({ cwd, name }) {
  const config = await readConfig(cwd);
  const file = join(cwd, config.paths.components, `${name}.js`);
  const src = await readFile(file, "utf8");
  await writeFile(file, ejectSource(src, name));
  console.log(`ejected ${name} to light-DOM (classes: .pura-${name}__*)`);
}
