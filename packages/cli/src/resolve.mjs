// Walk a component's deps. "base"/"i18n" map to root runtime files; component
// names recurse; tokens.css is always needed. Returns a flat install plan.
const ROOT_LIBS = { base: "base.js", i18n: "i18n.js", animate: "animate.js" };

export async function resolveInstall({ fetcher, index, getItem, name }) {
  const known = new Set(index.components.map((c) => c.name));
  const components = new Map();
  const rootFiles = new Set();

  async function walk(n) {
    if (components.has(n)) return;
    if (!known.has(n)) throw new Error(`unknown component: ${n}`);
    const item = await getItem(fetcher, n);
    components.set(n, item);
    for (const dep of item.deps || []) {
      if (ROOT_LIBS[dep]) rootFiles.add(ROOT_LIBS[dep]);
      else await walk(dep);
    }
  }
  await walk(name);

  return { components: [...components.values()], rootFiles, needsTokens: true };
}
