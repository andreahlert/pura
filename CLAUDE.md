# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**pura** is a component library of ~180 native web components (Custom Elements + Shadow DOM). Zero runtime dependencies, zero build step for consumers, framework-agnostic. Everything themed via CSS custom properties; every internal piece exposed via `::part(...)`. Components are designed to be agent-readable (semantic HTML + ARIA + stable `data-*` tags) and server-renderable.

This is a **pnpm workspace monorepo** (`node >= 20`, pnpm 10). Three members:

- `registry/` — the single source of truth. All component source lives here.
- `apps/www/` (`pura-site`) — Astro docs/showcase site. Deployed to GitHub Pages under base `/pura/`.
- `packages/cli/` (`purajs`, bin `pura`) — shadcn-style CLI that copies components into a consumer's project.

## Commands

Run from repo root unless noted.

```bash
pnpm dev            # Astro dev server (rebuilds registry first)
pnpm build          # build:registry then build:www
pnpm build:registry # gen-components-data + build-registry (regen all generated artifacts)
pnpm test           # node --test over scripts/*.test.mjs, apps/www/src/**/*.test.mjs, plus CLI tests
pnpm test:cli       # CLI package tests only
pnpm smoke          # static-serve apps/www/dist, assert routes + /pura/ assets are 200
pnpm verify         # build then smoke
pnpm check:a11y     # axe-core/playwright against a running preview (needs PURA_BASE)
```

Single test file: `node --test scripts/build-registry.test.mjs`. Single CLI test: `node --test packages/cli/test/<name>.test.mjs`.

CI (`.github/workflows/ci.yml`) gate order: `pnpm test` → `check-meta.mjs` → `check-i18n.mjs` → `pnpm build` → `pnpm smoke` → a11y. Match this locally before pushing.

## Component anatomy (the core convention)

Each component is **four colocated files** in `registry/components/<name>.*`:

- `<name>.js` — the Custom Element. Extends `PuraElement` (from `../base.js`), imports its meta and template, ends with `define("pura-<name>", Class, meta)`.
- `<name>.template.js` — **pure** render function `nameTemplate(el = EMPTY_SHIM)` returning `{ html, css }`. No DOM access beyond the read surface `EMPTY_SHIM` provides (`getAttribute`/`hasAttribute`/`bool`). Must run on the server. This is the SSR/DSD contract.
- `<name>.meta.js` — machine-readable metadata (tag, category, attributes, events, slots, i18nKeys). Feeds the docs site and the registry index.
- `<name>.docs.js` — demo HTML + usage strings for the docs site.

When adding or changing a component, keep all four in sync. `scripts/check-meta.mjs` fails on a `.js` without a matching `.meta.js` (and vice-versa).

### The SSR completeness gate

`scripts/ssr-completeness.test.mjs` asserts that **every component calling `this.render(...)` imports a `*.template.js`**. Initial paint must go through the pure template, never an inline string. If you add a render-calling component without a template, this test fails. Exemptions are hard-coded with a structural reason (currently only `select.js`, which re-emits slotted light-DOM `<option>` children that no pure template could reproduce). Related gates: `ssr-no-free-vars.test.mjs`, `ssr-templates.test.mjs`.

### base.js

`registry/base.js` is the whole framework: `PuraElement` (opens Shadow DOM, shared CSS reset). Key members:
- `render(html, css)` — write to shadow root (the normal path).
- `renderLight(html, css)` — write to the element's own children (light DOM); used by **ejected** components so consumer CSS can target classes.
- `renderDSD(tag, {html, css}, attrs)` — emit Declarative Shadow DOM for SSR.
- `EMPTY_SHIM` — no-attribute element stand-in so `nameTemplate()` (no arg) degrades to the attribute-free form on the server, byte-identical to `nameTemplate(this)` on the client.
- `define(tag, cls, meta)` — registers the element and wires `data-pura` for agent discovery.

## Build pipeline

`registry/` is the only source. The generators (in `scripts/`) produce everything else:

- `gen-components-data.mjs` → `apps/www/src/data/components.js` (merges every `.meta.js` + `.docs.js`). **AUTO-GENERATED, never edit by hand.**
- `build-registry.mjs` → `registry/registry.json` (index with sha256 integrity hashes + parsed deps/tokens) and per-component `apps/www/public/r/<name>.json`, and copies the runtime into `apps/www/public/` under both `components/` and `lib/` (legacy alias). Runtime files land at the public root because Astro base `/pura/` maps `public/<x>` → `/pura/<x>`.

Deps are parsed from `import ... from "./x.js"` statements; tokens from `var(--pura-*)` usage. After editing a component, run `pnpm build:registry` so the site and registry JSON stay consistent.

## CLI (`purajs`)

shadcn-style: `pura add <component>` resolves deps from the registry index, verifies each file's sha256 against `registry.json`, copies into the consumer's configured `paths.components`, and records a lock entry. Other commands in `packages/cli/src/commands/`: `init`, `list`, `diff`, `update`, `remove`, `eject`. `eject.mjs` rewrites a Shadow-DOM component to light DOM (`render`→`renderLight`, adds `class="pura-<name>__<part>"` beside each `part=`, rewrites `:host` → `.pura-<name>`) and warns on constructs it could not convert.

## i18n & theming

- **i18n** (`registry/i18n.js`): English default; locales `en`, `pt-BR`, `fr`, `de`, `it`. Components register their own message tables (colocated) and read via `t(key)`. Locale switch fires a window event; components update only their own text nodes / aria-labels — never a full re-render (that would drop focus/state). `check-i18n.mjs` validates `i18nKeys` coverage.
- **Theming**: `registry/tokens.css` defines light/dark tokens. Switch with `document.documentElement.dataset.theme = "dark" | "light"`; absent attribute follows `prefers-color-scheme`. `theme.js`, `theme-boot.js`, `theme-presets.js` support the docs theme designer.

## Gotchas

- The root `README.md` "Structure" section is outdated: components live in `registry/components/`, not a root `components/` dir (that one holds only a test fixture).
- ES modules need HTTP to load; serve statically, don't open `file://`.
- `smoke.mjs` does not execute JS, so runtime-only `import()`s are covered by an explicit `ASSETS` list — verify interactive behavior with `astro preview`.
