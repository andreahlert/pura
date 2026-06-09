# Changelog

All notable changes to `puracli` are documented here. This project follows
[Semantic Versioning](https://semver.org/).

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

[0.0.2]: https://github.com/andreahlert/pura/releases/tag/v0.0.2
[0.0.1]: https://www.npmjs.com/package/puracli/v/0.0.1
