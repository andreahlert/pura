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
- Motion suite: 25 animation components (`split`, `scramble`, `type-morph`,
  `text-fill`, `scroll-highlight`, `scroll-zoom`, `image-trail`, `gallery-3d`,
  `pin`, `velocity`, `spring`, `motion-path`, `morph`, `tilt`, `magnetic`,
  `cursor`, `wipe`, `clip-reveal`, `draw`, `stage`, `deck`, `expand-card`,
  `fly-to-cart`, `hold-confirm`, `status-badge`), plus 4 new `spinner`
  variants.
- 74 catalog-gap animation components derived from a gap analysis against 30
  animation libraries (GSAP, Motion, Magic UI, Aceternity, react-bits, etc.):
  18 text effects, 8 scroll, 17 interaction, 19 backgrounds, 5 feedback,
  7 layout. Registry now ships 318 components.
- Three awwwards-style showcase templates (`software`, `ecommerce`, `studio`)
  served from `/pura/templates/`, indexed by the new `lp.astro` landing page.
- Homepage motion: top scroll-progress bar (`pura-scroll-progress`), staggered
  scroll-reveal of stat, feature and showcase cards (`pura-reveal`), hero
  entrance, animated gradient headline and card hover-lift. All guarded behind
  `prefers-reduced-motion: reduce`.
- Full 5-locale coverage (en, pt-BR, fr, de, it) for every new homepage string,
  including a `data-i18n-label` handler so attribute-based labels (`pura-stat`)
  translate live on locale switch.
