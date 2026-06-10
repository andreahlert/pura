<div align="center">

# pura

**Native web components for the agent-readable web.**

318 components. Zero dependencies. Zero build step. Any framework, or none.

[![npm](https://img.shields.io/npm/v/puracli?label=puracli&color=black)](https://www.npmjs.com/package/puracli)
[![CI](https://github.com/andreahlert/pura/actions/workflows/ci.yml/badge.svg)](https://github.com/andreahlert/pura/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-black)](LICENSE)

[**Documentation**](https://andreahlert.github.io/pura/) · [Components](https://andreahlert.github.io/pura/docs/button) · [Templates](https://andreahlert.github.io/pura/templates) · [Theme designer](https://andreahlert.github.io/pura/theme)

</div>

---

pura is a component library built entirely on the web platform: Custom Elements + Shadow DOM, plain ES modules, CSS custom properties. No runtime, no dependency tree, no compiler. The same `<pura-button>` works in React, Vue, Svelte, Angular, Astro, or a static HTML file.

```html
<link rel="stylesheet" href="https://andreahlert.github.io/pura/tokens.css" />
<script type="module" src="https://andreahlert.github.io/pura/pura.js"></script>

<pura-button variant="primary">Get started</pura-button>
<pura-input label="Email" type="email"></pura-input>
<pura-word-rotate words="fast|native|accessible"></pura-word-rotate>
```

## Install

**Copy the source into your project** (shadcn-style, you own the code):

```bash
npx puracli init
npx puracli add button dialog data-table
```

The CLI resolves dependencies, verifies every file against the registry's sha256 hashes, and records a lockfile. `pura diff`, `pura update`, and `pura eject` (Shadow DOM to light DOM) included. See [puracli](packages/cli/README.md).

**Or just drop in a script tag** and import only what you use:

```js
import "./components/button.js";
```

## Why pura

- **Pure platform.** Custom Elements + Shadow DOM. Nothing to install, nothing to bundle, nothing to upgrade. If the browser runs, pura runs.
- **Framework-agnostic for real.** Web standards are the integration layer. One library across every stack in your company.
- **318 components.** Forms, overlays, data display, navigation, layout, media, charts, and a 99-component animation suite: scroll-driven effects, text animation, springs, 3D galleries, particle backgrounds, page transitions.
- **Agent-readable by design.** Semantic HTML, ARIA roles, keyboard support, and stable `data-pura` tags on every element. AI agents identify and operate components without guessing at CSS classes.
- **Server-renderable.** Every component's first paint comes from a pure template function that runs in Node, with Declarative Shadow DOM support. No flash of unstyled content.
- **Fully themeable.** Design tokens as CSS custom properties cross the Shadow boundary, so one `tokens.css` themes the entire library. Light and dark included; every internal piece exposed via `::part(...)`.
- **Motion with manners.** All animation gated behind `prefers-reduced-motion`. Animated text keeps an accessible copy for screen readers.

## Theming

```css
:root {
  --pura-primary: #6d28d9;
  --pura-radius: 1rem;
}
```

```js
document.documentElement.dataset.theme = "dark"; // or "light"; defaults to prefers-color-scheme
```

Style internals from outside with parts:

```css
pura-button::part(button) { letter-spacing: 0.02em; }
pura-card::part(card) { border-style: dashed; }
```

Or design visually with the [theme designer](https://andreahlert.github.io/pura/theme) and export your tokens.

## Animations

99 animation components, from scroll-scrubbed reveals to canvas particle systems, inspired by the best of GSAP, Motion, Magic UI, and Aceternity, rebuilt on web standards with zero dependencies:

```html
<pura-split by="char" stagger="30">Split text, char by char</pura-split>
<pura-scroll-zoom><img src="hero.jpg" alt="" /></pura-scroll-zoom>
<pura-image-trail><img src="a.jpg" alt="" /><img src="b.jpg" alt="" /></pura-image-trail>
<pura-confetti trigger="click"><button>Celebrate</button></pura-confetti>
```

See them live on the [templates page](https://andreahlert.github.io/pura/templates).

## i18n

English, Portuguese, French, German, and Italian out of the box. Components register their own message tables and swap text in place on locale change, without re-rendering (focus and state survive).

## Repository

pnpm workspace monorepo:

```
registry/        component source of truth (one element = js + template + meta + docs)
apps/www/        docs and showcase site (Astro)
packages/cli/    puracli, the shadcn-style CLI
```

```bash
pnpm install
pnpm dev      # docs site with live registry
pnpm test     # unit + SSR purity gates
pnpm verify   # full build + smoke
```

## License

[MIT](LICENSE) © André Ahlert
