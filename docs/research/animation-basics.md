# Animation Basics: pura Must Ship

## 1. Executive Summary

pura is expanding from a components-only library into components + animations, and the bar set by Mantine, Radix/shadcn, Framer Motion/motion.dev, Material 3, Magic UI and Aceternity is now well-defined. The non-negotiable core is small and almost entirely CSS-native: a coherent motion-token foundation (durations, easings, reduced-motion), the universal entrance/exit set (fade, slide, scale, fade+slide), the open/close transitions for overlays and disclosures, the basic loading/feedback states, and the FLIP/enter-exit primitive that powers every list animation. pura is already unusually well-positioned: it ships roughly two-thirds of the P0 surface as components (reveal, scroll-progress, parallax, marquee, ticker, spinner, skeleton, progress, progress-ring, plus most overlays), so the real work is not building loaders, it is **establishing the motion foundation layer and the FLIP/layout primitive** that pura currently lacks entirely. The single biggest credibility risk is shipping animation without a tokenized, themeable, reduced-motion-aware foundation, because that is the difference between "a library with motion" and "scattered transitions." This report prioritizes the foundation and the gaps over re-litigating what pura already does well.

A note on scope: a handful of "must-have" items in the research (`scroll-velocity`, `smooth-scroll/Lenis`, `confetti`, `swipe-to-dismiss gesture physics`) are marked `native_feasible:false` because they need either a continuous physics loop or particle canvas. These are deliberately deferred or wrapped, never core; pura's zero-dependency promise is a feature, not a limitation to paper over.

## 2. P0 — Table-stakes (non-negotiable for credibility)

| Name | What | Why | Native-feasible |
|---|---|---|---|
| **Motion tokens (duration scale + easing curves)** | Named CSS custom properties: durations (short 50-200ms, medium 250-400ms, long 450-600ms) and standard easings (standard, decelerate, accelerate). | The consistency primitive every animation references. Without it, motion drifts and cannot be themed. pura today ships only a single `--pura-ease`. | Yes |
| **prefers-reduced-motion path** | Global opt-out collapsing transforms/parallax/loops to opacity-only or instant final state, baked into every animation as a token/switch. | Accessibility + compliance baseline. Gates every other animation. A motion library that ignores the media query is non-credible. | Yes |
| **Fade (in/out)** | Pure opacity 0↔1, no transform. | The irreducible baseline of mount/unmount motion and the safest default under reduced-motion. | Yes |
| **Slide (up/down/left/right, in/out)** | translateX/Y from an offset to 0, paired with fade; reverse on exit. All four directions. | Required for menus, toasts, drawers, carousels, direction-aware transitions. Without left+right you cannot express directional/page transitions. | Yes |
| **Scale / Zoom (in/out)** | transform scale ~0.95→1 with fade, transform-origin aware; reverse on exit. | Standard "emerge from origin" for modals, popovers, tooltips, menus. Second only to fade in ubiquity. | Yes |
| **Fade + slide combo (fade-up/down/left/right)** | Simultaneous short translate (8-24px) + opacity, as one composite preset. | The de-facto "tasteful default" entrance of modern design systems (Mantine ships these first-class). What product UIs actually use over a raw slide. | Yes |
| **Accordion/collapse height expand** | Interpolate height 0↔content height + opacity off open state. | The most-requested disclosure animation; an abrupt content jump is the canonical example of unpolished UI. pura's `accordion` exists; verify it animates. | Yes |
| **Dialog/modal enter-exit + backdrop fade** | Panel fade+scale (0.95→1); scrim fades independently. | Establishes the modal as a top-layer surface. A bare opaque overlay popping in is jarring. | Yes |
| **Drawer/sheet directional slide** | Panel translates in from an edge + overlay fade; reverses out. | The defining motion of side panels; direction encodes spatial origin. | Yes |
| **Popover/dropdown origin-aware scale+fade** | Surface scales from a placement-tied transform-origin while fading. | Makes floating surfaces feel emitted from their trigger. Standard for popover, dropdown, select, combobox, tooltip. | Yes |
| **Toast slide-in + slide/fade-out** | Enter by sliding from a screen edge with fade; exit slides/fades by placement. | Toasts must draw attention without modality. No notification system omits enter/exit. | Yes |
| **Circular indeterminate spinner** | Continuously spinning ring/arc; reduce/pause under reduced-motion. | The universal "working, duration unknown" signal. Its absence reads as broken. | Yes |
| **Skeleton shimmer (gradient sweep)** | Placeholder blocks with a gradient band swept via animated background-position. | Primary perceived-performance technique for structured content loading. | Yes |
| **Determinate progress bar fill** | Track whose fill animates width/scaleX 0→known %. | Canonical measurable progress (uploads, wizards). Table-stakes for forms. | Yes |
| **Indeterminate linear bar** | Segment sliding/growing on a loop for unmeasured operations. | Bar-shaped counterpart to the spinner; route/load top bars. | Yes |
| **Hover color/background transition** | Animate bg/color/border ~120-200ms on hover. | The most fundamental hover affordance. Without it, controls feel inert. | Yes |
| **Press/active scale (tap shrink)** | Scale to ~0.95-0.98 on :active, spring back on release. | Primary tactile feedback that a press registered. Feels broken if omitted. | Yes |
| **Focus-visible ring grow** | Animatable box-shadow spread on :focus-visible (outline width does not transition reliably). | Mandatory for keyboard a11y (WCAG 2.4.7). Non-negotiable. | Yes |
| **Toggle/switch thumb slide** | translateX the knob across the track while the track color cross-fades, off `:checked`. | The switch's core identity: the slide IS the feedback. pura ships `switch`; verify it slides. | Yes |
| **Scroll reveal (on-enter)** | Element animates in the first time it crosses into the viewport, once, configurable direction/threshold. | The single most-used scroll effect on the web. pura ships `reveal`. | Yes |
| **Staggered scroll reveal** | Container reveals children in sequence with per-child delay. | Lists/grids look mechanical without stagger; the expected upgrade over a single reveal. | Yes |
| **Scroll progress indicator** | Bar/ring driven 0-1 by scroll position. | Standard reading-progress UI. pura ships `scroll-progress`. | Yes |
| **Parallax (multi-layer depth)** | Layers translate at different speeds vs scroll. | Canonical scroll effect; flagship example in every motion lib. pura ships `parallax`. | Yes |
| **Scroll-linked transform (scrub)** | Map arbitrary props continuously to scroll progress, bidirectional. | The generalized engine behind parallax/progress/storytelling. | Yes (CSS scroll-timeline) |
| **Sticky / pinned section** | Element fixed in viewport while content scrolls, then releases. | Foundation of scroll storytelling and sticky panels. | Yes (`position:sticky`) |
| **Scroll-snap (sections/carousel)** | Snap scrolling to discrete points, mandatory/proximity. | Powers full-page sites and swipe carousels. | Yes (CSS scroll-snap) |
| **FLIP position/size transition (layout primitive)** | Animate from old box to new via transform (translate+scale) on any DOM/layout change. | The foundational primitive the entire list-animation category is built on. Without it, layout changes pop. | Yes |
| **Add item (enter) + Remove item (exit)** | New child animates in while siblings FLIP to make room; exiting node is kept alive until its exit finishes, then removed. | The most common list interaction. Exit is the genuinely hard half (DOM removes synchronously) and is what plain CSS cannot do alone. | Yes |
| **List reorder / move** | Each item FLIPs along the shortest path from old to new index simultaneously. | Without it a re-sort is an instantaneous scramble; FLIP preserves object permanence. | Yes |
| **Reduced-motion fallback for open/close + scroll** | Collapse the above to instant/opacity-only under the media query. | Same WCAG gate as the global token; called out separately because each motion category must honor it. | Yes |

## 3. P1 — Expected

| Name | What | Why | Native-feasible |
|---|---|---|---|
| Blur-in / blur-out | `filter: blur()` few-px→0 with fade + small slide. | Signature premium entrance (Magic UI BlurFade, Aceternity); baseline to compete in that tier. | Yes |
| Flip-in X/Y (3D rotate) | perspective + rotateX/Y 90°→0. | The standard 3D card/notification reveal; the headline "3D" entrance. | Yes |
| Rotate-in / rotate-out | 2D rotate from an angle→0 with fade; corner-origin variants. | Expected member of the entrance taxonomy. | Yes |
| Pop (scale overshoot / spring-in) | Scale that overshoots past 1 then settles (back ease). | The springy default many systems prefer over linear scale (Mantine ships `pop` + 4 corners). | Yes |
| Hover lift (translateY) | Raise -2 to -6px on hover, slight scale. | Standard affordance for cards/CTAs/tiles. | Yes |
| Hover shadow / elevation | Grow/soften box-shadow on hover. | Material elevation language; pairs with or substitutes for lift. | Yes |
| Ripple (ink splash) | Circular splash from touch point, fades. Origin-at-click needs a few lines of vanilla JS to set a CSS var. | Signature Material press feedback; strongly expected where Material aesthetics are targeted. | Yes |
| Checkbox check draw | SVG stroke-dashoffset draws the check; box fills in parallel. | The polish hallmark of a premium checkbox. pura ships `checkbox`; upgrade it. | Yes |
| Determinate progress ring fill | SVG stroke-dashoffset (or conic-gradient angle) fills 0→target. | Compact value display for dashboards. pura ships `progress-ring`. | Yes |
| Pulse (opacity breathing) | Opacity up/down on a loop. | Cheapest placeholder/"live"/pending cue; a named utility almost everywhere. | Yes |
| Dot-typing / staggered dots | Dots animate in sequence via staggered delay. | Standard chat/AI activity indicator and compact loader. | Yes |
| Success checkmark draw | Check draws via stroke-dashoffset, circle pops. | The positive-confirmation payoff that closes the loop a spinner opens. | Yes |
| Error shake | Brief horizontal translateX oscillation on invalid field/action. | The conventional negative-feedback cue; suppress under reduced-motion. | Yes |
| Disclosure chevron rotate | Chevron rotates 0→180°/90° synced to panel state. | Conventional expanded-state affordance; pairs with every accordion/dropdown. | Yes |
| Tabs active-indicator slide | Underline/pill animates position/width to the new tab. | The signature tab affordance; a teleporting indicator looks cheap. pura ships `tabs`. | Yes |
| Directional slide-in offset on popover/dropdown | Few-px translate from `data-side` + fade/scale. | Reinforces the anchor relationship; the shadcn/Radix de-facto recipe. | Yes |
| Tooltip quick pop | Fast, low-displacement fade+scale; quick hide; show/hide delay. | Tooltips need snappier motion than popovers. pura ships `tooltip`. | Yes |
| Toast stacking / list reflow (FLIP) | Remaining toasts translate to new positions on add/dismiss; collapse-on-hover. | Sonner made stacked toast motion a baseline expectation. | Yes |
| Staggered list entrance (choreography) | Many items animate in sequentially (~20ms apart, Material rule). | Simultaneous entrance reads as a flash and hides structure. | Yes |
| Auto-animate (zero-config mutation observer) | Attach to a parent; any add/remove/move of direct children is auto-FLIPed. | The dominant low-effort developer expectation; works on existing/third-party markup. | Yes |
| Shared-element / magic-move | Match two elements by id and morph position/size/appearance between states. | One of the most recognizable modern motion patterns; thumbnail→modal, gliding tab indicator. | Yes (View Transitions / FLIP) |
| Scale-distortion correction during FLIP | Counter-scale children (text, radius, padding) when a FLIP scales a container. | What separates a serious engine from "basic FLIP"; without it, scaled containers warp their contents. | Yes |
| Drag-to-reorder with live settle | Siblings reflow during the drag; dragged item springs into its slot on drop. | The premier interactive list pattern (kanban, playlists). pura ships `kanban`/`swipe`. | Yes |
| Height auto / expand-collapse | Measure natural height and tween to it (height:auto is not directly animatable). | Underpins collapsible rows, expanding cards, "show more." | Yes (or CSS `calc-size()`) |
| Sticky scroll-reveal narrative | Pinned panel whose content swaps at stepped breakpoints (scrollytelling). | Named, expected component for product tours/feature deep-dives. pura has `scroll-spy`/`sticky` parts to build on. | Yes |
| Horizontal scroll section | Content moves horizontally driven by vertical scroll, via a pinned track. | Common showcase/gallery pattern; flagship ScrollTrigger demo. | Yes |
| Container view-progress reveal (enter+exit ranges) | Animation tied to an element's own view ranges (entry/contain/exit). | More precise than a one-shot inView flag; Apple-style reveals depend on it. | Yes (CSS view() timeline) |
| Reduced-motion fallback for scroll effects | Disable parallax/scrub/large transforms, snap to final state. | Scroll-linked motion is a top vestibular-trigger category. | Yes |
| Number count-up / odometer | Tween a value to target, or roll digits mechanically. | Canonical stat/KPI reveal; whole ecosystem exists for it. | Yes |
| Typewriter / text reveal | Text appears char/word by char, blinking caret, cycling. | Dominant hero-headline and AI-streaming effect; both major copy-paste libs ship it. | Yes |
| Bounce (emphasis) | Vertical hop with gravity ease; scroll-cue arrows. | Core Tailwind utility + Animate.css staple. | Yes |
| Confetti / celebration burst | Particle burst with physics on success moments. | The de-facto "delight on success" effect. Wrap a tiny canvas helper; deferred from core. | No (needs canvas/particle loop) |
| **Foundations:** Emphasized easing curves | Higher-expression curves with slight overshoot (Material emphasized set). | Distinguishes hero moments from utilitarian motion; the expressive tier of a two-tier system. | Yes |
| **Foundations:** Spring physics (stiffness/damping/mass) | Spring simulator driving values to rest with overshoot; duration-independent, interruptible, velocity-aware. | The defining primitive of modern motion; a credible 2026 lib cannot be duration-only. Needs a small JS rAF integrator. | Yes |
| **Foundations:** Stagger helper | Incremental per-item delay across a group, with origin/order function. | Signature primitive for list/menu/grid/hero entrances. | Yes |
| **Foundations:** View Transitions API wrapper | `document.startViewTransition()` for same-doc state changes + `@view-transition` for MPA; `view-transition-name` pairing. | The native, framework-free path to route/layout/shared-element morphs. A native-web library should expose it first-class. | Yes |
| **Foundations:** Velocity-aware / interruptible transitions | Interrupt mid-flight and re-target carrying current velocity. | Distinguishes physical motion from canned tweens; drag-release and rapid toggles depend on it. | Yes |
| Pan gesture (low-level pointer tracking) | Continuous offset/delta/velocity after a press threshold. | The substrate for swipe, sliders, scrubbers. pura ships `swipe`/`slider`. | Yes |
| Long-press / press-and-hold | Fire after sustained press (~400-600ms) with a progress/scale affordance. | Standard touch gesture for context menus/selection. | Yes |
| Pull-to-refresh | Overscroll drag past threshold, elastic resistance, spring-back. | Canonical mobile refresh. pura ships `pull-to-refresh`. | Yes |

## 4. P2 — Polish

| Name | What | Why | Native-feasible |
|---|---|---|---|
| Spin-in / spin-out | Rotation as part of enter/exit, composable with fade/zoom/slide. | tailwindcss-animate/shadcn compose-set member. | Yes |
| Skew-in (skew-up/down) | transform skew + fade/translate on enter. | Stylistic editorial/marketing entrance (Mantine preset). | Yes |
| Bounce-in / bounce-out | Multi-keyframe elastic bounce settle, directional variants. | Classic Animate.css attention entrance; playful brands. | Yes |
| Back-in / back-out (anticipation) | Overshoot opposite direction before settling. | Disney-principle anticipation; rounds out a comprehensive catalog. | Yes |
| Light-speed-in/out | Skew + translate + fade "whoosh" streak. | Decorative flourish; Animate.css parity only. | Yes |
| Icon nudge on hover | Translate an embedded icon (arrow slides ~2-4px). | Cheap, high-signal "continue/next" CTA refinement. | Yes |
| Underline / link slide-in | Underline grows from one side via background-size/scaleX. | Deliberate-craft nav/link polish. | Yes |
| Button shine / shimmer sweep | Gradient highlight sweeps across on hover. | "Premium/hero" CTA flair (Magic UI). | Yes |
| Animated gradient border | Conic/linear gradient rotates around the border (`@property` angle). | Glowing moving edge for premium CTAs/cards. | Yes |
| Magnetic button / cursor-follow | Label translates toward cursor; vanilla JS pointer→transform. | "Awwwards" flourish; heavy-handed for utilitarian UIs. | Yes |
| Spotlight / glow follow on hover | Radial-gradient tracks cursor via CSS vars. | Trendy depth cue for cards/CTAs. | Yes |
| Striped / buffering progress | Diagonal stripes (animated bg-position) or buffer segment. | Media buffering/streaming indicator. | Yes |
| Toast swipe-to-dismiss | Drag follows toast; past threshold animates off, else springs back. | Primary dismissal affordance on touch; Radix/Sonner core. | No (needs drag physics; build on pura's `swipe`) |
| Tab panel crossfade / directional slide | Crossfade or slide panels in travel direction. | Smooths content swaps; conveys lateral relationship. | Yes |
| Dropdown item stagger / focus highlight | Items fade/stagger in; active highlight transitions. | Adds hierarchy to menu reveal; legible keyboard nav. | Yes |
| Heartbeat | Double-thump scale pulse on a loop. | "Alive/favorited/health" indicators (like buttons). | Yes |
| Wiggle / jiggle | Small rotational oscillation; rotational sibling of shake. | Playful "tap me/pending" cue (iOS edit-mode). | Yes |
| Highlight flash (changed content) | Brief bg/outline flash fading to default on updated rows. | "Flash of updated content" for live tables/optimistic UI. | Yes |
| tada / rubberBand / wobble / jello / swing | Animate.css one-shot emphasis family. | Completes the recognized named-flourish vocabulary. | Yes |
| Scroll-snap event hooks / active-section sync | Emit active/snapped section for nav dots/URL. | Full-page/carousel UIs need current-section reflection. pura ships `scroll-spy`. | Yes |
| Scroll-driven counters / odometers | Numbers count up as a section enters view, once. | Ubiquitous stats sections; builds on scroll-reveal + count-up. | Yes |
| Grid resize / responsive reflow | Cells resize and travel to new grid positions on breakpoint/resize. | Snapping column counts feel cheap; animated reflow reads coherent. | Yes |
| Masonry settle | Cards animate to recomputed packed positions after load/filter. | Masonry thrashes without animated settling. pura ships `masonry`. | Yes |
| Interruption / mid-flight redirection (FLIP) | Re-target a running FLIP from current position/velocity. | Fast lists feel laggy without it; spring-based interruption. | Yes |
| Pinch / zoom (+ rotate) | Two-pointer distance→scale, angle→rotation around focal point. | Image viewers, maps, zoomable canvas. pura ships `lightbox`/`image-compare`. | Yes |
| Drag momentum / inertia (flick) | Continue motion on release using velocity, decay to rest. | A flick that stops dead reads as broken on touch. | Yes |

**Explicitly out of native scope (wrap or defer, never core):** scroll-velocity/momentum-reactive effects and smooth-scroll/Lenis normalization (`native_feasible:false`) require a continuous JS scroll-physics loop; confetti needs a particle canvas; swipe-to-dismiss physics needs a drag integrator. These are optional adapters around pura's zero-dependency core, documented as recipes, not shipped primitives.

## 5. Motion Foundations (the primitives everything depends on)

Build these **first**. Every preset and component above consumes them. pura today ships exactly one motion token (`--pura-ease: cubic-bezier(0.16, 1, 0.3, 1)`) and nothing else, so this layer is greenfield and is the highest-leverage work in the whole effort.

1. **Duration + easing tokens** (`registry/tokens.css`). Add a finite duration scale and a named easing set as CSS custom properties so every component references tokens, not hardcoded ms:
   - Durations: `--pura-duration-1` 100ms (instant micro), `-2` 150ms, `-3` 200ms (default), `-4` 300ms, `-5` 400ms, `-6` 600ms (overlays/long).
   - Easings: `--pura-ease-standard` `cubic-bezier(0.2,0,0,1)`, `--pura-ease-decelerate` `cubic-bezier(0,0,0,1)` (enter), `--pura-ease-accelerate` `cubic-bezier(0.3,0,1,1)` (exit), plus an expressive tier `--pura-ease-emphasized` and `--pura-ease-spring`/`back` `cubic-bezier(0.34,1.56,0.64,1)` for pop/overshoot. Keep the existing `--pura-ease` as an alias for back-compat.
   - **Asymmetric enter/exit is the rule:** decelerate in, accelerate out. Linear reads as broken.

2. **`prefers-reduced-motion` as a global switch.** A single `@media (prefers-reduced-motion: reduce)` block (and/or a `--pura-motion: 0/1` token consumed by transition durations) that collapses transforms/parallax/loops to opacity-only or instant final state across all components. This **gates** every other animation; ship it before any preset.

3. **Stagger primitive.** A declarative way to set incremental per-child delays (CSS `--pura-stagger-index`/`--pura-stagger-step` consumed via `calc()`, or a tiny attribute that writes per-item `transition-delay`). Powers list/menu/grid/hero entrances. Target Material's ~20ms-apart guidance as the default.

4. **Spring physics (small JS integrator).** A duration-independent stiffness/damping/mass simulator on `requestAnimationFrame`, interruptible and velocity-aware, exposed as a utility that drag-release, layout shifts, and toggles can opt into. This is the one foundation piece that is genuinely JS (not CSS), and the one that most separates a 2026-credible motion lib from a transition-only one. Keep it dependency-free and opt-in so CSS-only components stay zero-JS.

5. **CSS scroll-timeline + view-timeline.** Use `animation-timeline: scroll()` / `view()` with `animation-range` (entry/cover/exit) as the native engine behind scroll-reveal, scrub, progress, and per-element view-progress reveals. Progressively enhance: feature-detect and fall back to IntersectionObserver where unsupported. pura's existing `reveal`, `scroll-progress`, and `parallax` should be refactored to sit on this primitive rather than each rolling its own observer.

6. **View Transitions API wrapper.** A thin first-class helper around `document.startViewTransition()` (same-document state changes) and `@view-transition` (MPA navigation), with `view-transition-name` pairing for shared-element/magic-move and list reorder. Same-document View Transitions reached Baseline in late 2025, so this is the native, framework-free path to the whole layout/route-morph category and a natural fit for a native-web library. Feature-detect and degrade to instant swap.

7. **FLIP/layout primitive + velocity-aware interruption.** The First-Last-Invert-Play engine (transform-only, with scale-distortion correction) that powers add/remove/reorder, toast reflow, grid resize, and masonry settle. Pair it with mid-flight interruption that re-targets from current position/velocity. This is the second genuinely-JS foundation; everything in the layout/list category depends on it.

## 6. Mapping to pura

pura already ships ~25 of the relevant surfaces as components. The gaps are concentrated in the **foundation layer** and the **FLIP/layout + a few feedback primitives** — not in loaders or scroll components, which are largely done.

**Already shipped (P0/P1 surface pura covers today):**

| Research item | pura component(s) | Status / action |
|---|---|---|
| Scroll reveal | `reveal` | Have. Refactor onto CSS view-timeline + reduced-motion. |
| Scroll progress indicator | `scroll-progress` | Have. Refactor onto `scroll()` timeline. |
| Parallax | `parallax` | Have. Refactor onto scroll-timeline; add reduced-motion off-switch. |
| Marquee / ticker | `marquee`, `ticker` | Have. Verify pause-on-hover + reduced-motion. |
| Circular spinner | `spinner` | Have. Verify reduced-motion (slow/pause). |
| Skeleton shimmer | `skeleton`, `skeleton-text` | Have. Confirm gradient-sweep (not just pulse). |
| Determinate progress bar / indeterminate bar | `progress` | Have bar. **Verify indeterminate loop variant exists.** |
| Progress ring fill | `progress-ring` | Have. |
| Accordion height expand + chevron | `accordion`, `collapsible` | Have. **Verify height animates and chevron rotates.** |
| Dialog/modal + backdrop | `dialog`, `alert-dialog` | Have. **Verify fade+scale enter/exit + scrim fade.** |
| Drawer/sheet slide | `drawer`, `sheet` | Have. **Verify directional slide + overlay fade.** |
| Popover/dropdown/tooltip origin-aware | `popover`, `dropdown-menu`, `tooltip`, `hover-card`, `context-menu`, `menubar`, `navigation-menu` | Have. **Verify origin-aware scale+fade + `data-side` slide offset.** |
| Toast enter/exit (+ stacking) | `toast` | Have. **Verify slide-in/out; build FLIP stacking reflow (P1).** |
| Tabs active-indicator slide | `tabs`, `segmented-control` | Have. **Verify the indicator animates, not teleports.** |
| Switch thumb slide | `switch`, `toggle` | Have. **Verify thumb translates + track cross-fades.** |
| Sticky/pinned, scroll-snap, snap sync | `affix`, `back-to-top`, `scroll-spy`, `scroll-area`, `carousel`, `infinite-scroll` | Have building blocks. |
| Pull-to-refresh, swipe, pan, drag-reorder | `pull-to-refresh`, `swipe`, `kanban`, `slider`/`range-slider` | Have. Pan/long-press primitive can extract from these. |
| Count-up, typewriter | `countdown`, `stat`, `chat-input`/`terminal` | Partial — **no generic count-up/number-ticker or typewriter primitive.** |
| Checkbox/press/hover/focus micro-interactions | `checkbox`, `button`, `field` | Have components; **micro-interaction polish (check-draw, press-scale, focus-ring-grow) likely not yet tokenized/animated — verify and upgrade.** |

**Gaps to build (no pura equivalent today):**

1. **Motion-token foundation** — durations, easing scale, spring, stagger, reduced-motion switch. (Only `--pura-ease` exists.) *Highest priority.*
2. **Generic enter/exit transition primitive** — a `pura-transition`/`pura-motion` element or directive exposing fade/slide/scale/blur/fade+slide presets with enter+exit and keep-alive-until-exit. ⚠️ Note: pura's existing `presence` is an **avatar-stack** component, not this — the name is taken, so use a different name (e.g. `pura-motion` or `pura-transition`).
3. **FLIP / auto-animate / layout primitive** — `pura-auto-animate` (mutation-observer drop-in) + the underlying FLIP engine with scale-correction and interruption. Powers add/remove/reorder, toast reflow, `masonry` settle, grid resize, `kanban` drag-settle.
4. **View Transitions wrapper** — first-class `startViewTransition` helper for route/shared-element/magic-move.
5. **Feedback primitives** — error-shake, success-checkmark-draw, dot-typing/typing-indicator, ripple (vanilla-JS origin), as small standalone components or attributes.
6. **count-up / number-ticker** and **typewriter / text-reveal** as dedicated emphasis components.
7. **Emphasis utilities** — pulse, bounce, shake, heartbeat, wiggle, highlight-flash as token-driven keyframe utilities.

## 7. Prioritized Build Order

**Phase 0 — Foundation (ship before any preset; unblocks everything).**
1. Duration + easing tokens in `tokens.css` (keep `--pura-ease` as alias).
2. `prefers-reduced-motion` global switch/token. *(0.1 and 0.2 together are the credibility gate.)*
3. Stagger primitive (CSS-var driven).
4. CSS scroll-timeline / view-timeline helper + IntersectionObserver fallback.

**Phase 1 — Core entrance/exit + honor what exists.**
5. Generic enter/exit motion primitive: fade, slide ×4, scale, fade+slide, with enter+exit + reduced-motion. (New name; `presence` is taken.)
6. Audit-and-upgrade pass on shipped overlays/disclosures (`dialog`, `drawer`, `sheet`, `popover`, `dropdown-menu`, `tooltip`, `accordion`, `tabs`, `switch`, `toast`) to consume the new tokens and confirm each animates enter/exit, origin-aware, with reduced-motion fallback.
7. Refactor `reveal` / `scroll-progress` / `parallax` onto the scroll-timeline primitive.

**Phase 2 — Micro-interactions + feedback.**
8. Press-scale, hover color/lift/shadow, focus-visible-ring-grow as token-driven utilities on `button`/`field`/interactive components.
9. Feedback set: error-shake, success-check-draw, dot-typing, pulse, indeterminate-bar (if missing), checkbox-check-draw, ripple.

**Phase 3 — Layout/list (the FLIP engine).**
10. FLIP primitive with scale-correction + interruption.
11. `pura-auto-animate` drop-in (mutation observer over FLIP).
12. Apply to add/remove/reorder, `toast` stacking reflow, `masonry` settle, `kanban` drag-settle, grid resize.

**Phase 4 — Spring + native morphs.**
13. Spring physics JS integrator (opt-in), wired into drag-release and layout interruption.
14. View Transitions wrapper + shared-element/magic-move + Tabs `layoutId`-style shared indicator.

**Phase 5 — Emphasis + premium polish (P2, demand-driven).**
15. count-up / number-ticker, typewriter, emphasis family (bounce/heartbeat/wiggle/tada/highlight-flash).
16. Premium hover flair (shimmer, gradient-border, spotlight, magnetic), striped progress, tab crossfade, swipe-to-dismiss on `swipe`.
17. Optional non-native adapters as documented recipes only: confetti, smooth-scroll/Lenis, scroll-velocity.

**The opinionated through-line:** pura's competitive advantage is zero-dependency, SSR-safe, CSS-native motion. Do Phases 0-2 entirely in CSS + tokens (no JS animation runtime), reserve JS for exactly two primitives — the FLIP engine and the spring integrator — keep both opt-in, and lean on the platform (scroll-timeline, view-timeline, View Transitions) wherever Baseline allows with graceful degradation. Ship the foundation first; everything else is a preset on top of it.