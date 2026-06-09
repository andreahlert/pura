# puracli

shadcn-style CLI for [pura](https://andreahlert.github.io/pura/), a library of ~180 native web components (Custom Elements + Shadow DOM). Zero runtime dependencies, zero build step. The CLI copies component source straight into your project from the public registry.

## Usage

No install needed:

```bash
npx puracli init          # scaffold pura.json config
npx puracli add button    # copy a component (+ its deps) into your project
```

Or install globally:

```bash
npm i -g puracli
pura add dialog
```

## Commands

| Command | What it does |
|---------|--------------|
| `pura init` | Create `pura.json` (component paths, registry URL). |
| `pura add <name>` | Resolve deps from the registry, verify each file's sha256, copy in, record a lock entry. |
| `pura list` | List installed components. |
| `pura diff <name>` | Show local vs registry diff for a component. |
| `pura update <name>` | Pull the latest version from the registry. |
| `pura remove <name>` | Remove a component and its lock entry. |
| `pura eject <name>` | Rewrite a Shadow-DOM component to light DOM so consumer CSS can target classes. |

## Registry

Components are fetched from `https://andreahlert.github.io/pura` by default. Override the `registry` field in `pura.json` to point at your own mirror.

## License

MIT
