# Animations pura Should Own (that competitors don't)

> WF2 research output, 2026-06-09. Companion to [`animation-basics.md`](animation-basics.md)
> (the table-stakes set). This doc is the *differential*: motion no competitor is
> architecturally positioned to ship. 40 ideas generated, 10 survived adversarial
> novelty checks against Framer Motion, GSAP, Mantine, Magic UI, Aceternity,
> HeroUI, MUI, Animate.css, AutoAnimate, anime.js, React Spring, Motion One.

## 1. Thesis

Every motion library on the market animates element *properties* with a JavaScript
runtime. pura should refuse that game and instead own two categories no competitor
is architecturally positioned to enter:

- **Agent-native motion** — animation that is itself a machine-readable channel,
  bolted to pura's existing `window.__pura*` registries, stable `data-*`
  attributes, and CustomEvent plumbing.
- **SSR/DSD motion** — animation that ignites at parse time inside Declarative
  Shadow DOM, before any hydration, with zero observers.

These are durable wedges because they are bound to pura's architecture, not to a
CSS trick anyone can paste in five minutes. The native-platform CSS ideas
(animate-to-auto, scroll-reveal) score high on *fit* but have thin moats; they are
the fast-to-ship credibility layer that proves "zero-JS, SSR-correct motion" while
the agent-native and streaming bets build the actual fortress.

## 2. Flagship ideas, ranked

Ranked by fit score, ties broken by defensibility then effort. All verified novel
against the named competitor set.

| # | Name | Lens | Native mechanism | Agent-native? | Effort | Fit |
|---|------|------|------------------|:---:|:---:|:---:|
| 1 | **pura-agent-cursor** | Agent-native | WAAPI + `getBoundingClientRect` snapping + PointerEvent capture | Yes | high | 8 |
| 2 | **animate-to-auto reveal** | Native-platform | `interpolate-size: allow-keywords` + `::details-content` | No | low | 8 |
| 3 | **scroll-reveal-native** | SSR / server-first | `animation-timeline: view()/scroll()` | Yes | med | 8 |
| 4 | **motion-budget governor** | A11y-first | `document.getAnimations()` + cascaded `--pura-motion-scale` | Yes | high | 8 |
| 5 | **pura-narrated-transition** | Agent-native | View Transitions API + CustomEvent + ARIA live | Yes | med | 7 |
| 6 | **pura-diff-motion** | Agent-native | MutationObserver + FLIP via WAAPI + `@starting-style` | Yes | high | 7 |
| 7 | **pura-confidence-meter** | Agent-native | CSS attribute selectors driving `@keyframes` + tunable amplitude | Yes | low | 7 |
| 8 | **stream-cascade** | SSR / server-first | Parse-time CSS animation start in streamed DSD | No | med | 7 |
| 9 | **undo/redo time-scrub** | State-driven | Single WAAPI `currentTime` seeking over the undo registry | Yes | high | 7 |
| 10 | **scroll-timeline pause-on-intent** | A11y-first | CSS `scroll-timeline` + semantic progressbar element | Yes | med | 6 |

## 3. The top 5, in detail

### 1. pura-agent-cursor

**Pitch.** A virtual cursor you feed a declarative trace,
`[{op:"move",to:"#submit"},{op:"click"},{op:"type",value:"hi"}]`, and it walks a
ghost pointer across the *real* layout, snapping to live bounding boxes, dropping
click ripples and a typing caret. It also records: in capture mode it listens to
real PointerEvents and serializes them into an agent-runnable script. Motion
becomes a two-way channel: replay an agent run as visible motion, or capture a
human session as a trace.

**Why rivals structurally cannot copy it.** Every competitor animates element
properties; none has the concept of an autonomous actor *operating* the UI. The
cursor targets components by their machine-readable identity (pura's
`data-pura`/`data-*` selectors via `element.matches`), not fragile CSS, which only
works because pura already ships stable agent-readable attributes across all ~180
components. Motion's `Cursor` follows the live user mouse only; GSAP can hand-author
a scripted walkthrough but with hard-coded coordinates, no `getBoundingClientRect`
snapping, no record mode, no agent framing.

**Shape.** `<pura-agent-cursor trace-src="/run.json" mode="replay|record">`, WAAPI
Animation per op so the whole trace is scrubbable; `--pura-cursor-size` /
`--pura-cursor-color` tokens; emits `pura:trace` on record.

### 2. animate-to-auto reveal

**Pitch.** The entire disclosure family (accordion, collapsible, faq, inline-edit,
native `<details>`) transitions smoothly between a fixed and an intrinsic
`height: auto` with *no* JavaScript height measurement. The server renders the open
or closed state with correct intrinsic height and the transition is purely
declarative.

**Why rivals cannot easily match it (honest version).** They *can* copy the
technique, it is documented and replicable in minutes; the moat is thin. What they
cannot easily match is the *combination*: Mantine Collapse and MUI Collapse both do
JS `scrollHeight` measurement, which is structurally SSR-incorrect, and they will
keep doing it because they are not built on a pure-template server contract. pura's
edge is breadth (one mechanism across the whole disclosure family), SSR
correctness, and being first to ship it as a packaged, token-themed family. A
credibility play, not a fortress.

**Shape.** `interpolate-size: allow-keywords` on the component root,
`::details-content` for native details, duration/easing from token scale.
Chromium-only today, so degrade to instant open/close via `@supports`.

### 3. scroll-reveal-native

**Pitch.** Scroll-triggered reveal and scroll-linked progress/parallax driven
entirely by CSS scroll-driven animations: content fades and rises as its subtree
enters the viewport, with no IntersectionObserver and no scroll listener anywhere.

**Why rivals cannot easily copy it.** The killer no-JS differentiator at the
*identity* level. pura's current reveal needs an IntersectionObserver, which is
post-hydration JS; the native version runs from CSS inside the DSD subtree, so it
works *before* hydration and even with scripting disabled. GSAP ScrollTrigger,
Framer `useScroll`/`inView`, Magic UI scroll-velocity, Aceternity Hero Parallax all
ship JS runtimes per scroll, because none are built on Custom Elements plus DSD. The
technique is public standard; the win is fit and pre-hydration delivery, not
invention.

**Shape.** `<pura-reveal>` with `animation-timeline: view()`; phase, range, easing
exposed as `--pura-reveal-distance` / `--pura-reveal-range`.

### 4. motion-budget governor

**Pitch.** A page-level controller that caps total simultaneous large-displacement
motion to a vestibular-safe budget. It enumerates running animations via
`getAnimations()`, classifies them by translate/scale/rotate magnitude, and when
concurrent vestibular-triggering motion exceeds a threshold it pauses or
de-amplifies the lowest-priority ones. A single `calm mode` toggle dials every pura
animation down without removing meaning, mirrored to `<html data-pura-motion="calm">`.

**Why rivals structurally cannot copy it.** Only a zero-dep native library where
every component opts into one base class can introspect *all* page motion through
`document.getAnimations()` plus a shared registry. Competitors manage their own
tweens as isolated islands; `prefers-reduced-motion` and Motion's `MotionConfig`
are binary or uniform-slowdown, with no aggregate budget, concurrency counting,
magnitude classification, or priority-ranked throttling. WCAG 2.3.3 aggregate
handling is left to authors by everyone surveyed. (Caveat: classifying magnitude
from opaque WAAPI transform matrices is non-trivial, and this is runtime-only.)

**Shape.** `window.__puraMotion.budget` API plus a `<pura-calm-toggle>`; every
component multiplies displacement by a cascaded `--pura-motion-scale`.

### 5. pura-narrated-transition

**Pitch.** A wrapper that animates a state change with View Transitions *and*
simultaneously emits a structured CustomEvent plus an aria-live announcement:
`{from:"list", to:"detail", reason:"agent:open-order", changed:["#row-42"]}`. The
visible morph and the machine-readable narration come from one call, so a human
sees motion while an agent reads exactly what changed and why, in sync.

**Why rivals structurally cannot copy it.** Vanilla `document.startViewTransition`
is a native API no React-bound competitor exposes outside its framework, and none
couples the transition to a structured "what changed and why" payload. htmx and
Turbo pair swap events with view transitions, but their event detail is mechanical
plumbing, not a semantic `{from,to,reason,changed}`, and carries no author-supplied
reason. The moat is narrow but real: the single-call tuple of morph plus
agent-readable event plus synchronized narration.

**Shape.** `<pura-narrated-transition reason="agent:open-order">` calling
`startViewTransition`, emitting `pura:transition`, writing to the existing live
region; reduced-motion via the `base.js` guard.

## 4. Themes: four strategic bets

- **Bet A — Agent-native motion (the fortress).** Ideas 1, 5, 6, 7, 9. Motion as a
  two-way machine-readable channel, bolted to pura's Agent category. The genuinely
  un-copyable category: no competitor has *any* agent-facing concept. Highest
  defensibility, mostly higher effort.
- **Bet B — SSR / server-first motion (the structural edge).** Ideas 3 and 8.
  Animation that runs from DSD before hydration, choreographed by HTML streaming
  itself. Only possible because pura ships per-component parse-time shadow CSS.
- **Bet C — native-platform / zero-JS motion (the credibility layer).** Ideas 2 and
  10. CSS-first disclosure and scroll progress that a JS runtime cannot match on
  SSR correctness. Thin moats, but they prove the zero-dep promise fast. Ship these
  to establish the narrative.
- **Bet D — accessibility-first motion (the conscience).** Ideas 4 and 10.
  Vestibular budgets, calm mode, semantic progress that survives reduced-motion.
  Differentiates on a dimension every rival delegates to the author.

## 5. Recommended first 3 to prototype

Sequenced by `effort x fit x narrative leverage`, mixing one quick credibility win,
one low-effort agent-native proof, and one marquee differentiator.

1. **animate-to-auto reveal** (fit 8, effort low). Fastest path to a visible,
   SSR-correct, zero-JS win that differentiates against Mantine and MUI's
   JS-measurement collapse. Ship it first to anchor the narrative.
2. **pura-confidence-meter** (fit 7, effort low). Cheapest entry into the
   agent-native fortress: pure CSS attribute selectors, one `data-agent-state`
   attribute that is both the machine-readable signal and the animation trigger.
   Seeds the agent-motion vocabulary the bigger ideas build on.
3. **pura-agent-cursor** (fit 8, effort high). The flagship, the one nobody can
   follow pura into. Even a rough record/replay prototype is a category-defining
   demo. Start in parallel since it carries schedule risk.

## 6. Honest moat notes

Adversarial verification flagged that several ideas package *known techniques*
rather than inventing mechanisms:

- **animate-to-auto / scroll-reveal-native / scroll-timeline pause-on-intent** are
  public web-platform recipes. The moat is SSR correctness + breadth + being first
  to package, not invention. Replicable by a competitor in minutes-to-weeks.
- **pura-diff-motion** is a novel *composition* over commodity primitives
  (AutoAnimate FLIP + GSAP ScrambleText already exist). Defensible part = the
  emitted structured `{added,removed,moved,changed}` diff + agent framing.
- **pura-confidence-meter** recombines shimmer-as-streaming (already shipped by
  assistant-ui, Vercel AI SDK, Magic UI) with uncertainty-as-motion (old dataviz
  concept). Novel part = the agent-state-driven multi-state binding.
- **pura-agent-cursor / motion-budget governor / stream-cascade / narrated-transition**
  are the genuinely un-occupied ideas — bound to pura's architecture, not a
  pasteable snippet.
