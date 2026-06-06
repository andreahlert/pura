import { merge as jsdiffMerge } from "diff";

// 3-way merge over the battle-tested `diff` (jsdiff) package. yours = local
// (possibly edited), base = pristine at install, theirs = new upstream. jsdiff
// merges at the line level, so adjacent independent edits combine cleanly; only
// true per-line overlap conflicts. Conflicting regions get git-style
// <<<<<<< yours / ======= / >>>>>>> upstream markers.
// Returns { conflict, result } where result is the merged file text.
export function threeWayMerge({ base, yours, theirs }) {
  // Fast paths preserve exact bytes, including trailing-newline state.
  if (yours === theirs) return { conflict: false, result: yours };
  if (yours === base) return { conflict: false, result: theirs };
  if (theirs === base) return { conflict: false, result: yours };

  const patch = jsdiffMerge(yours, theirs, base);
  const { lines: baseLines, finalEol } = splitLines(base);
  let conflict = false;
  const out = [];
  let basePos = 0; // 0-based index into baseLines

  for (const hunk of patch.hunks) {
    const hunkStart = hunk.oldStart - 1;
    while (basePos < hunkStart) out.push(baseLines[basePos++]);

    for (const line of hunk.lines) {
      if (typeof line === "object" && line.conflict) {
        conflict = true;
        out.push("<<<<<<< yours");
        out.push(...pickAdded(line.mine));
        out.push("=======");
        out.push(...pickAdded(line.theirs));
        out.push(">>>>>>> upstream");
        // mine and theirs overlap the same base region; advance past the larger
        // span so reconstruction stays in sync on asymmetric replacements.
        basePos += Math.max(countConsumed(line.mine), countConsumed(line.theirs));
      } else {
        const tag = line[0];
        const text = line.slice(1);
        if (tag === " ") { out.push(text); basePos++; }
        else if (tag === "-") { basePos++; }
        else if (tag === "+") { out.push(text); }
        // a "\ No newline at end of file" marker (leading "\") is ignored;
        // finalEol restores the correct terminator below.
      }
    }
  }
  while (basePos < baseLines.length) out.push(baseLines[basePos++]);

  return { conflict, result: out.join("\n") + (finalEol ? "\n" : "") };
}

// content a side keeps/adds (" " context or "+" addition)
function pickAdded(sideLines) {
  const res = [];
  for (const l of sideLines) {
    const tag = l[0];
    if (tag === " " || tag === "+") res.push(l.slice(1));
  }
  return res;
}

// base lines a side covers (" " context or "-" removal)
function countConsumed(sideLines) {
  let n = 0;
  for (const l of sideLines) if (l[0] === " " || l[0] === "-") n++;
  return n;
}

function splitLines(s) {
  const finalEol = s.endsWith("\n");
  const parts = s.split("\n");
  if (finalEol) parts.pop(); // drop the empty tail produced by a trailing newline
  return { lines: parts, finalEol };
}
