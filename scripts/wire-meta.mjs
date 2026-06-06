#!/usr/bin/env node
// scripts/wire-meta.mjs
// Wires each component's .meta.js into its define() call.
// Idempotent: running twice produces no further changes.
// Fails loudly if a meta file exists but no matching define() call is found.

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, basename } from "node:path";
import { pathToFileURL } from "node:url";

const COMPONENTS_DIR = new URL("../registry/components/", import.meta.url).pathname;

// Escape a string for use in a RegExp
function escapeRE(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function main() {
  const entries = await readdir(COMPONENTS_DIR);
  const metaFiles = entries.filter((e) => e.endsWith(".meta.js")).sort();

  let totalImported = 0;
  let totalRewritten = 0;
  let totalSkipped = 0;
  const failures = [];

  for (const metaFile of metaFiles) {
    const name = basename(metaFile, ".meta.js");
    const compFile = name + ".js";

    // Both files must exist
    if (!entries.includes(compFile)) {
      failures.push({ file: compFile, reason: "component .js file not found alongside .meta.js" });
      continue;
    }

    const metaPath = join(COMPONENTS_DIR, metaFile);
    const compPath = join(COMPONENTS_DIR, compFile);

    // Dynamic-import the meta module to get the authoritative tag
    let meta;
    try {
      meta = (await import(pathToFileURL(metaPath).href)).default;
    } catch (err) {
      failures.push({ file: metaFile, reason: `failed to import: ${err.message}` });
      continue;
    }

    const tag = meta.tag;
    if (!tag) {
      failures.push({ file: metaFile, reason: "meta.tag is missing or empty" });
      continue;
    }

    let src = await readFile(compPath, "utf8");
    let modified = false;

    // -----------------------------------------------------------------------
    // 1. Check / insert the meta import
    // -----------------------------------------------------------------------
    const metaImportStr = `import meta from "./${name}.meta.js";`;
    const alreadyImported = src.includes(`./${name}.meta.js"`);

    if (!alreadyImported) {
      // Insert immediately after the line that imports from "../base.js"
      // Quote-agnostic match: from "../base.js" or from '../base.js'
      const baseImportRE = /^(.*from\s+["']\.\.\/base\.js["'].*)$/m;
      const baseMatch = baseImportRE.exec(src);
      if (!baseMatch) {
        failures.push({ file: compFile, reason: "no '../base.js' import line found; cannot determine insertion point" });
        continue;
      }
      const insertAfter = baseMatch[0];
      src = src.replace(insertAfter, insertAfter + "\n" + metaImportStr);
      modified = true;
      totalImported++;
    }

    // -----------------------------------------------------------------------
    // 2. Check / rewrite the define() call for the primary tag
    //
    // We handle two forms:
    //   A) Named class ref:  define("tag", ClassName)
    //   B) Inline class:     define("tag", class extends Base {})
    //
    // Strategy: match define("TAG", <2nd-arg>) where 2nd-arg is either:
    //   - a plain identifier (possibly followed by ", meta" already)
    //   - a class expression (class ... { ... }) terminated by } immediately
    //     before the closing );
    //
    // We build two patterns, try each, and pick whichever matches.
    // In both cases we check for an existing 3rd arg "meta" to detect
    // already-wired state.
    // -----------------------------------------------------------------------
    const escTag = escapeRE(tag);

    // Pattern A: named identifier, optional 3rd arg
    //   Groups: 1=quote, 2=ClassName, 3=", meta" if present
    const defineNamedRE = new RegExp(
      "define\\(\\s*([\"'])" + escTag + "\\1\\s*,\\s*([A-Za-z0-9_$]+)\\s*(,\\s*meta\\s*)?\\)\\s*;"
    );

    // Pattern B: inline class expression (e.g. class extends Base {})
    //   Groups: 1=quote, 2=full inline class text, 3=", meta" if present
    // We match "class" followed by anything up to the balanced-ish closing
    // "}" that immediately precedes the ) — we use a non-greedy match that
    // ends at the first "}" followed by optional whitespace then ")" to
    // keep it simple (these inline classes have empty bodies {}).
    const defineInlineRE = new RegExp(
      "define\\(\\s*([\"'])" + escTag + "\\1\\s*,\\s*(class\\s+[^)]+?})\\s*(,\\s*meta\\s*)?\\)\\s*;"
    );

    let defineMatch = defineNamedRE.exec(src);
    let isInline = false;
    if (!defineMatch) {
      defineMatch = defineInlineRE.exec(src);
      isInline = !!defineMatch;
    }

    if (!defineMatch) {
      // No match at all -> fail loud
      failures.push({ file: compFile, reason: `no define() call found for tag "${tag}"` });
      continue;
    }

    if (defineMatch[3]) {
      // Third arg already present -> already wired
      totalSkipped++;
    } else {
      // Rewrite: insert ", meta" before the closing );
      // For named: define("tag", ClassName, meta);
      // For inline: define("tag", class extends Base {}, meta);
      const secondArg = defineMatch[2];
      const replacement = `define("${tag}", ${secondArg}, meta);`;
      src = src.replace(defineMatch[0], replacement);
      modified = true;
      totalRewritten++;
    }

    if (modified) {
      await writeFile(compPath, src, "utf8");
    }
  }

  // -----------------------------------------------------------------------
  // Summary
  // -----------------------------------------------------------------------
  console.log(`\nwire-meta summary`);
  console.log(`  meta files processed : ${metaFiles.length}`);
  console.log(`  imports added        : ${totalImported}`);
  console.log(`  define() rewritten   : ${totalRewritten}`);
  console.log(`  already wired (skip) : ${totalSkipped}`);

  if (failures.length > 0) {
    console.error(`\nFAILURES (${failures.length}):`);
    for (const f of failures) {
      console.error(`  ${f.file}: ${f.reason}`);
    }
    process.exit(1);
  }

  console.log(`\nDone.`);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
