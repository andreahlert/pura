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
