#!/usr/bin/env node
import { runInit } from "../src/commands/init.mjs";
import { runAdd } from "../src/commands/add.mjs";
import { runList } from "../src/commands/list.mjs";
import { runUpdate } from "../src/commands/update.mjs";

const [cmd, ...rest] = process.argv.slice(2);
const cwd = process.cwd();
const now = () => new Date().toISOString();

try {
  if (cmd === "init") await runInit({ cwd });
  else if (cmd === "add") await runAdd({ cwd, name: rest[0], now });
  else if (cmd === "list") await runList({ cwd });
  else if (cmd === "update") await runUpdate({ cwd, name: rest[0], now });
  else { console.error("usage: pura <init|add|list|update|diff|remove>"); process.exit(1); }
} catch (e) {
  console.error("pura: " + e.message);
  process.exit(1);
}
