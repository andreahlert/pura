# pura

Biblioteca de componentes em **web components nativos**. Zero dependências, zero build, framework-agnóstico. Estética minimal neutra (linha Linear/Vercel). Acessível e legível por agentes de IA por padrão (HTML semântico + ARIA + tags estáveis).

## Por que

- **Puro**: só plataforma. Custom Elements + Shadow DOM. Nenhum runtime, nenhuma árvore de dependências.
- **Universal**: funciona em React, Vue, Svelte, Angular ou HTML puro. É padrão do browser.
- **Temável**: tudo via CSS custom properties. Custom props atravessam o Shadow boundary, então um único `tokens.css` controla a lib inteira. Light/dark inclusos.
- **Customizável de fora**: cada peça interna expõe `::part(...)`.
- **Agent-readable**: roles, ARIA, foco e teclado nativos. Agente identifica e opera sem depender de classe CSS.

## Uso

```html
<link rel="stylesheet" href="tokens.css" />
<script type="module" src="pura.js"></script>

<pura-button>Click</pura-button>
<pura-input label="Email" type="email"></pura-input>
```

Importar só o que usa:

```js
import "./components/button.js";
```

## Componentes (140)

Um custom element por arquivo em `components/`. Importe `pura.js` para todos, ou só o que usa.

**Forms e input**
`action` · `button` · `button-group` · `split-button` · `toggle` · `toggle-group` · `segmented-control` · `input` · `textarea` · `number-input` · `input-group` · `input-otp` · `field` · `label` · `select` · `combobox` · `checkbox` · `radio` · `radio-group` · `switch` · `slider` · `range-slider` · `color-picker` · `date-picker` · `calendar` · `rating` · `tag-input` · `file-dropzone`

**Ações e comandos**
`fab` · `speed-dial` · `copy-button` · `command` · `command-registry` · `dropdown-menu` · `context-menu` · `menubar` · `toolbar`

**Overlays**
`dialog` · `alert-dialog` · `sheet` · `drawer` · `popover` · `tooltip` · `hover-card` · `lightbox` · `spotlight` · `portal`

**Feedback e status**
`alert` · `banner` · `badge` · `tag` · `toast` · `spinner` · `progress` · `progress-ring` · `gauge` · `meter` · `skeleton` · `skeleton-text` · `empty` · `live-region` · `notification-item` · `presence` · `undo`

**Async e estado**
`async` · `optimistic` · `idle` · `intent`

**Dados e display**
`table` · `list` · `item` · `card` · `kanban` · `tree-view` · `timeline` · `stat` · `stat-grid` · `sparkline` · `stepper` · `diff` · `comment` · `testimonial` · `pricing-table` · `reactions` · `pagination` · `avatar` · `avatar-group`

**Layout**
`box` · `flex` · `grid` · `stack` · `center` · `spacer` · `container` · `section` · `aspect-ratio` · `masonry` · `resizable` · `separator` · `sidebar` · `dock` · `scroll-area`

**Navegação**
`breadcrumb` · `navigation-menu` · `tabs` · `accordion` · `collapsible` · `back-to-top` · `scroll-progress` · `scroll-spy`

**Tipografia e conteúdo**
`heading` · `text` · `prose` · `blockquote` · `code` · `code-block` · `kbd` · `link` · `truncate` · `redact` · `image` · `image-compare` · `marquee` · `ticker` · `countdown`

**AI / agente**
`agent-hint` · `explain` · `chat-bubble` · `chat-input` · `copy-region`

**Utilitários e dev**
`carousel` · `faq` · `hotkey` · `kbd-shortcuts` · `reveal` · `tour` · `cookie-consent` · `mediaquery` · `theme-designer` · `inspector`

Tags com prefixo `pura-` (ex.: `<pura-button>`). Vários expõem sub-elementos (`pura-accordion-item`, `pura-kanban-column`, `pura-menu-item`, etc.). `theme-designer` e `inspector` são ferramentas de dev.

## Temas

Trocar tema: `document.documentElement.dataset.theme = "dark"` (ou `"light"`). Sem atributo, segue `prefers-color-scheme`.

Customizar: sobrescreva os tokens no seu `:root`.

```css
:root {
  --pura-primary: #6d28d9;
  --pura-radius: 1rem;
}
```

## Customizar partes

```css
pura-button::part(button) { letter-spacing: 0.02em; }
pura-card::part(card) { border-style: dashed; }
```

## Demo

Abra `index.html` em qualquer servidor estático (precisa de HTTP por causa dos ES modules):

```bash
python3 -m http.server -d pura 8080
# http://localhost:8080
```

## Estrutura

```
pura/
  tokens.css        design tokens (light/dark)
  base.js           classe base (Shadow + render helper)
  components/*.js    um custom element por arquivo
  pura.js           importa todos
  index.html        showcase
```
