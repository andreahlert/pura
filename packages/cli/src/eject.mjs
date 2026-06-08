// Convert a Shadow-DOM pura component source into a light-DOM variant:
//  - this.render(...) -> this.renderLight(...)
//  - add class="pura-<name>__<part>" alongside each part="<part>"
//  - rewrite :host(...) / :host -> .pura-<name> in the CSS string
export function ejectSource(source, name) {
  let out = source.replace(/this\.render\(/g, "this.renderLight(");
  out = out.replace(/part="([\w-]+)"/g, (_, p) => `part="${p}" class="pura-${name}__${p}"`);
  out = out.replace(/:host\(([^)]*)\)/g, `.pura-${name}$1`);
  out = out.replace(/:host\b/g, `.pura-${name}`);
  return out;
}

// Best-effort eject can leave constructs it can't convert. Surface them so the
// user reviews manually rather than shipping broken light-DOM output.
export function ejectWarnings(out) {
  const warnings = [];
  if (/:host\b/.test(out)) warnings.push("contains :host selectors eject could not rewrite");
  if (/this\.render\(/.test(out)) warnings.push("still calls this.render (shadow DOM)");
  return warnings;
}
