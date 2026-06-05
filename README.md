# pura

A component library built on **native web components**. Zero dependencies, zero build, framework-agnostic. Minimal neutral aesthetic (Linear/Vercel line). Accessible and readable by AI agents by default (semantic HTML + ARIA + stable tags).

## Why

- **Pure**: platform only. Custom Elements + Shadow DOM. No runtime, no dependency tree.
- **Universal**: works in React, Vue, Svelte, Angular, or plain HTML. It's a browser standard.
- **Themable**: everything via CSS custom properties. Custom props cross the Shadow boundary, so a single `tokens.css` controls the whole library. Light/dark included.
- **Customizable from outside**: every internal piece exposes `::part(...)`.
- **Agent-readable**: native roles, ARIA, focus, and keyboard. Agents identify and operate without relying on CSS classes.

## Usage

```html
<link rel="stylesheet" href="tokens.css" />
<script type="module" src="pura.js"></script>

<pura-button>Click</pura-button>
<pura-input label="Email" type="email"></pura-input>
```

Import only what you use:

```js
import "./components/button.js";
```

## Components (140)

One custom element per file in `components/`. Import `pura.js` for all of them, or just the ones you use.

**Forms and input**
`action` · `button` · `button-group` · `split-button` · `toggle` · `toggle-group` · `segmented-control` · `input` · `textarea` · `number-input` · `input-group` · `input-otp` · `field` · `label` · `select` · `combobox` · `checkbox` · `radio` · `radio-group` · `switch` · `slider` · `range-slider` · `color-picker` · `date-picker` · `calendar` · `rating` · `tag-input` · `file-dropzone`

**Actions and commands**
`fab` · `speed-dial` · `copy-button` · `command` · `command-registry` · `dropdown-menu` · `context-menu` · `menubar` · `toolbar`

**Overlays**
`dialog` · `alert-dialog` · `sheet` · `drawer` · `popover` · `tooltip` · `hover-card` · `lightbox` · `spotlight` · `portal`

**Feedback and status**
`alert` · `banner` · `badge` · `tag` · `toast` · `spinner` · `progress` · `progress-ring` · `gauge` · `meter` · `skeleton` · `skeleton-text` · `empty` · `live-region` · `notification-item` · `presence` · `undo`

**Async and state**
`async` · `optimistic` · `idle` · `intent`

**Data and display**
`table` · `list` · `item` · `card` · `kanban` · `tree-view` · `timeline` · `stat` · `stat-grid` · `sparkline` · `stepper` · `diff` · `comment` · `testimonial` · `pricing-table` · `reactions` · `pagination` · `avatar` · `avatar-group`

**Layout**
`box` · `flex` · `grid` · `stack` · `center` · `spacer` · `container` · `section` · `aspect-ratio` · `masonry` · `resizable` · `separator` · `sidebar` · `dock` · `scroll-area`

**Navigation**
`breadcrumb` · `navigation-menu` · `tabs` · `accordion` · `collapsible` · `back-to-top` · `scroll-progress` · `scroll-spy`

**Typography and content**
`heading` · `text` · `prose` · `blockquote` · `code` · `code-block` · `kbd` · `link` · `truncate` · `redact` · `image` · `image-compare` · `marquee` · `ticker` · `countdown`

**AI / agent**
`agent-hint` · `explain` · `chat-bubble` · `chat-input` · `copy-region`

**Utilities and dev**
`carousel` · `faq` · `hotkey` · `kbd-shortcuts` · `reveal` · `tour` · `cookie-consent` · `mediaquery` · `theme-designer` · `inspector`

Tags are prefixed with `pura-` (e.g. `<pura-button>`). Several expose sub-elements (`pura-accordion-item`, `pura-kanban-column`, `pura-menu-item`, etc.). `theme-designer` and `inspector` are dev tools.

## Themes

Switch theme: `document.documentElement.dataset.theme = "dark"` (or `"light"`). With no attribute, it follows `prefers-color-scheme`.

Customize: override the tokens in your own `:root`.

```css
:root {
  --pura-primary: #6d28d9;
  --pura-radius: 1rem;
}
```

## Customize parts

```css
pura-button::part(button) { letter-spacing: 0.02em; }
pura-card::part(card) { border-style: dashed; }
```

## Demo

Open `index.html` from any static server (needs HTTP because of ES modules):

```bash
python3 -m http.server -d pura 8080
# http://localhost:8080
```

## Structure

```
pura/
  tokens.css        design tokens (light/dark)
  base.js           base class (Shadow + render helper)
  components/*.js    one custom element per file
  pura.js           imports all of them
  index.html        showcase
```
