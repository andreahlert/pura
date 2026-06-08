import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { readConfig } from "../config.mjs";
import { ejectSource, ejectWarnings } from "../eject.mjs";

export async function runEject({ cwd, name }) {
  const config = await readConfig(cwd);
  const file = join(cwd, config.paths.components, `${name}.js`);
  const src = await readFile(file, "utf8");
  const out = ejectSource(src, name);
  for (const w of ejectWarnings(out)) console.warn(`warning: ${name} ${w}; review manually`);
  await writeFile(file, out);
  console.log(`ejected ${name} to light-DOM (classes: .pura-${name}__*)`);
}
