// Demo cells are generated deterministically at build time (seeded picsum
// URLs, index-based), never at random.
const demoCells = Array.from({ length: 21 }, (_, i) =>
  `  <img src="https://picsum.photos/seed/gridmotion${i + 1}/400/280" alt="" loading="lazy" />`
).join("\n");

export default {
  description:
    "`<pura-grid-motion>` is the awwwards infinite-grid hero: a grid of images or cards, wider than its container on purpose, whose rows slide laterally following the pointer with lerp inertia. Rows alternate direction and move at three depth bands, so the grid feels parallax-alive. Slotted children are the cells; row membership is computed from `columns`, so you just dump a flat list of images. `shift` sets the max travel, `ease` the lerp factor, `tilt` rotates the whole grid for the classic angled look, and `global` tracks the pointer across the whole window for fullscreen heroes. Tokens: `--pura-grid-motion-gap`, `--pura-grid-motion-overflow` (grid width, default 160%), `--pura-grid-motion-radius`, `--pura-grid-motion-ratio`, `--pura-grid-motion-bg`. SSR and no-JS paint the static centered grid; reduced motion and coarse pointers never bind. Each instance registers in `window.__puraGridMotions` by `data-pura-id`; `data-pura-gm-x` mirrors the settled offset.",
  demoHTML: `<pura-grid-motion columns="7" shift="200" tilt="-8" style="height: 340px; border-radius: 12px; --pura-grid-motion-bg: #09090b; --pura-grid-motion-overflow: 190%; --pura-grid-motion-gap: 0.6rem;">\n${demoCells}\n</pura-grid-motion>`,
  usage: `<!-- fullscreen hero: rows follow the pointer anywhere on the page -->
<pura-grid-motion columns="7" tilt="-12" global style="height: 100vh; --pura-grid-motion-bg: #09090b;">
  <img src="/photos/01.jpg" alt="" />
  <img src="/photos/02.jpg" alt="" />
  <!-- ...one flat list of cells; 7 per row -->
</pura-grid-motion>

<!-- cards instead of images, contained pointer, floatier easing -->
<pura-grid-motion columns="4" shift="120" ease="0.04" style="height: 60vh;">
  <div style="background: var(--pura-muted, #f4f4f5); display: grid; place-items: center;">Aa</div>
  <div style="background: var(--pura-muted, #f4f4f5); display: grid; place-items: center;">Bb</div>
  <!-- ... -->
</pura-grid-motion>`,
};
