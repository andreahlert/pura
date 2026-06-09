# Changelog

Notable changes to the **pura** monorepo (registry + docs site). The `puracli`
package keeps its own log in [`packages/cli/CHANGELOG.md`](packages/cli/CHANGELOG.md).
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Changed
- Redesigned the docs site homepage (`apps/www`). Dropped the shadcn-style
  "foundation for your design system" framing for an agent-native pitch:
  _"Native components for the agent-readable web."_ Mantine-shaped layout, split
  hero, stat band, six feature cards, framework tabs (React/Vue/Astro/HTML),
  component showcase, closing CTA, built entirely from pura components.

### Added
- Homepage motion: top scroll-progress bar (`pura-scroll-progress`), staggered
  scroll-reveal of stat, feature and showcase cards (`pura-reveal`), hero
  entrance, animated gradient headline and card hover-lift. All guarded behind
  `prefers-reduced-motion: reduce`.
- Full 5-locale coverage (en, pt-BR, fr, de, it) for every new homepage string,
  including a `data-i18n-label` handler so attribute-based labels (`pura-stat`)
  translate live on locale switch.
