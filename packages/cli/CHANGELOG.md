# Changelog

All notable changes to `puracli` are documented here. This project follows
[Semantic Versioning](https://semver.org/).

## [0.0.3] - 2026-06-10

### Changed
- Registry expanded from 192 to 318 components, all installable via
  `pura add` / discoverable via `pura list`: the 25-component motion suite
  (`split`, `image-trail`, `gallery-3d`, `scroll-zoom`, `spring`,
  `motion-path`, ...) and 74 catalog-gap animation components (text effects,
  scroll, interaction, backgrounds, feedback, layout) derived from a gap
  analysis against 30 animation libraries.
- No CLI code changes; this release tracks the registry expansion so the npm
  version reflects the available component set.

## [0.0.2] - 2026-06-09

### Added
- Trusted-publishing workflow (`.github/workflows/publish.yml`): npm publish via
  GitHub OIDC, gated behind the `npm` environment. First release published
  through the automated pipeline.

### Fixed
- Component manifests now ship the colocated `<name>.meta.js` and
  `<name>.template.js` sidecars, so `pura add <name>` no longer produces a
  component whose sibling imports 404 at runtime.

## [0.0.1] - 2026-06-09

### Added
- Initial release of the `puracli` CLI (`pura` binary): `init`, `add`, `list`,
  `diff`, `update`, `remove`, `eject`. Copies pura web components into a
  consumer's project from the public registry, verifying each file's sha256.

[0.0.3]: https://github.com/andreahlert/pura/releases/tag/v0.0.3
[0.0.2]: https://github.com/andreahlert/pura/releases/tag/v0.0.2
[0.0.1]: https://www.npmjs.com/package/puracli/v/0.0.1
