#!/usr/bin/env node
import { runInit } from "../src/commands/init.mjs";
import { runAdd } from "../src/commands/add.mjs";
import { runList } from "../src/commands/list.mjs";

const [cmd, ...rest] = process.argv.slice(2);
const cwd = process.cwd();
const now = () => new Date().toISOString();

try {
  if (cmd === "init") await runInit({ cwd });
  else if (cmd === "add") await runAdd({ cwd, name: rest[0], now });
  else if (cmd === "list") await runList({ cwd });
  else { console.error("usage: pura <init|add|list>"); process.exit(1); }
} catch (e) {
  console.error("pura: " + e.message);
  process.exit(1);
}
