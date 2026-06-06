import { merge as jsdiffMerge } from "diff";

// 3-way merge over the battle-tested `diff` (jsdiff) package.
// yours = local (possibly edited), base = pristine at install, theirs = new
// upstream. jsdiff merges at the line level, so adjacent independent edits on
// each side combine cleanly; only true per-line overlap conflicts. Conflicting
// regions get git-style <<<<<<< yours / ======= / >>>>>>> upstream markers.
// Returns { conflict, result } where result is the merged file text.
export function threeWayMerge({ base, yours, theirs }) {
  const patch = jsdiffMerge(yours, theirs, base);
  const baseLines = splitKeepEol(base);
  let conflict = false;
  const out = [];
  let basePos = 0; // 0-based index into baseLines

  for (const hunk of patch.hunks) {
    // copy untouched base lines preceding this hunk
    const hunkStart = hunk.oldStart - 1;
    while (basePos < hunkStart) out.push(baseLines[basePos++]);

    for (const line of hunk.lines) {
      if (typeof line === "object" && line.conflict) {
        conflict = true;
        out.push("<<<<<<< yours\n");
        for (const l of pickAdded(line.mine)) out.push(l);
        out.push("=======\n");
        for (const l of pickAdded(line.theirs)) out.push(l);
        out.push(">>>>>>> upstream\n");
        basePos += countConsumed(line.mine);
      } else {
        const tag = line[0];
        const text = line.slice(1);
        if (tag === " ") { out.push(withEol(text)); basePos++; }
        else if (tag === "-") { basePos++; }
        else if (tag === "+") { out.push(withEol(text)); }
      }
    }
  }
  // trailing untouched base lines
  while (basePos < baseLines.length) out.push(baseLines[basePos++]);

  return { conflict, result: out.join("") };
}

// content lines a side keeps/adds (" " context or "+" addition)
function pickAdded(sideLines) {
  const res = [];
  for (const l of sideLines) {
    const tag = l[0];
    if (tag === " " || tag === "+") res.push(withEol(l.slice(1)));
  }
  return res;
}

// base lines a side consumes (" " context or "-" removal)
function countConsumed(sideLines) {
  let n = 0;
  for (const l of sideLines) if (l[0] === " " || l[0] === "-") n++;
  return n;
}

function splitKeepEol(s) {
  const lines = s.split("\n");
  if (lines[lines.length - 1] === "") lines.pop();
  return lines.map((l) => l + "\n");
}

function withEol(text) {
  return text.endsWith("\n") ? text : text + "\n";
}
