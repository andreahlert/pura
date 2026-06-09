// pura motion engine — the ONLY JS-tweening code in pura. Everything else is
// CSS + tokens. Two opt-in primitives live here: FLIP (layout animation) and a
// spring integrator (added in P4). WAAPI (element.animate) does the actual
// tweening; nothing here ships a per-frame JS loop except the spring.
//
// Zero dependencies, no build step. Safe to import only on the client (it reads
// layout); guard server usage via the reduced-motion / matchMedia checks.

// Is the user asking for less motion? Honors the platform setting at call time
// (not import time) so a runtime change is respected.
export function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

// Resolve a duration token (ms) off an element's computed style, falling back to
// a literal so the engine works even outside a tokened tree.
export function tokenDuration(el, token = "--pura-duration-4", fallback = 250) {
  if (typeof getComputedStyle === "undefined") return fallback;
  const v = getComputedStyle(el).getPropertyValue(token).trim();
  if (v.endsWith("ms")) return parseFloat(v) || fallback;
  if (v.endsWith("s")) return parseFloat(v) * 1000 || fallback;
  return fallback;
}

const DEFAULT_EASING = "cubic-bezier(0.2, 0, 0, 1)"; // matches --pura-ease-standard

// flip(elements, mutate) — measure positions, run the DOM mutation, then animate
// each element from its old box to its new one with a single WAAPI transform
// tween (scale-corrected for size changes). Returns the Animations so callers
// can await/cancel. No-op (mutate still runs) under reduced motion.
export function flip(elements, mutate, options = {}) {
  const els = [...elements];
  if (reducedMotion()) {
    mutate();
    return [];
  }
  const before = new Map(els.map((el) => [el, el.getBoundingClientRect()]));
  mutate();
  const duration = options.duration ?? tokenDuration(els[0] || document.body);
  const easing = options.easing ?? DEFAULT_EASING;
  const anims = [];
  for (const el of els) {
    const a = before.get(el);
    const b = el.getBoundingClientRect();
    const dx = a.left - b.left;
    const dy = a.top - b.top;
    const sx = b.width ? a.width / b.width : 1;
    const sy = b.height ? a.height / b.height : 1;
    if (!dx && !dy && sx === 1 && sy === 1) continue;
    anims.push(
      el.animate(
        [
          { transformOrigin: "top left", transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
          { transformOrigin: "top left", transform: "none" },
        ],
        { duration, easing }
      )
    );
  }
  return anims;
}

// autoAnimate(container, options) — observe direct children and FLIP-animate
// add / remove / reorder automatically. Mirrors the AutoAnimate drop-in but
// zero-dependency and token-aware. Returns a controller with enable/disable.
//
// options: { duration?, easing?, enter?, exit? } where enter/exit are keyframe
// arrays for added/removed nodes (sensible fade+scale defaults).
export function autoAnimate(container, options = {}) {
  const easing = options.easing ?? DEFAULT_EASING;
  const getDuration = () => options.duration ?? tokenDuration(container);
  const enterFrames = options.enter ?? [
    { opacity: 0, transform: "scale(0.96)" },
    { opacity: 1, transform: "none" },
  ];
  const exitFrames = options.exit ?? [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.96)" },
  ];

  const rects = new WeakMap();
  // Nodes currently playing their exit animation. They are re-appended to the
  // container (pinned, fading out) and removed for real on finish, so they must
  // be invisible to the snapshot, the FLIP pass, and the removed-handling, or
  // exit() would re-fire on its own appendChild/remove and loop forever.
  const exiting = new Set();
  const snapshot = () => {
    for (const child of container.children) {
      if (exiting.has(child)) continue;
      rects.set(child, child.getBoundingClientRect());
    }
  };

  let observer = null;

  const onMutate = (records) => {
    if (reducedMotion()) {
      snapshot();
      return;
    }
    const duration = getDuration();
    const added = new Set();
    const removed = [];
    for (const r of records) {
      r.addedNodes.forEach((n) => {
        if (n.nodeType === 1 && !exiting.has(n)) added.add(n);
      });
      r.removedNodes.forEach((n) => {
        if (n.nodeType !== 1 || exiting.has(n)) return;
        const rect = rects.get(n);
        if (rect) removed.push({ node: n, rect, next: r.nextSibling });
      });
    }

    // FLIP the children that stayed (moved by the add/remove).
    for (const child of container.children) {
      if (added.has(child) || exiting.has(child)) continue;
      const prev = rects.get(child);
      if (!prev) continue;
      const now = child.getBoundingClientRect();
      const dx = prev.left - now.left;
      const dy = prev.top - now.top;
      if (dx || dy) {
        child.animate(
          [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
          { duration, easing }
        );
      }
    }

    // Enter: new children fade + scale in.
    for (const child of added) {
      child.animate(enterFrames, { duration, easing });
    }

    // Exit: re-insert the removed node absolutely at its old spot, animate out,
    // then drop it for real. The re-append and the final remove are our own DOM
    // surgery, so silence the observer around them: disconnect, drain the queued
    // records the surgery generated, then re-observe. The `exiting` guard above
    // keeps those nodes out of every pass meanwhile.
    for (const { node, rect } of removed) {
      exiting.add(node);
      exit(container, node, rect, exitFrames, duration, easing, () => {
        observer?.disconnect();
        node.remove();
        exiting.delete(node);
        observer?.takeRecords();
        observer?.observe(container, { childList: true });
      });
    }

    snapshot();
  };

  observer =
    typeof MutationObserver !== "undefined" ? new MutationObserver(onMutate) : null;

  const enable = () => {
    snapshot();
    observer?.observe(container, { childList: true });
  };
  const disable = () => observer?.disconnect();

  enable();
  return { enable, disable };
}

// viewTransition(update, options) — run a DOM update inside the native View
// Transitions API so the before/after states cross-fade, or morph for elements
// that share a view-transition-name ("magic move"). Falls back to running
// update() synchronously when the API is missing or reduced motion is on.
// Returns the transition's finished promise (resolved immediately in fallback).
export function viewTransition(update, options = {}) {
  const skip =
    reducedMotion() ||
    typeof document === "undefined" ||
    typeof document.startViewTransition !== "function" ||
    options.skip === true;
  if (skip) {
    return Promise.resolve(update());
  }
  const transition = document.startViewTransition(() => update());
  return transition.finished;
}

// spring(options) — physics value driver. onUpdate(value) runs each frame until
// the spring settles, then onRest(). This is the one per-frame JS loop pura
// ships (FLIP uses WAAPI instead); fully opt-in. Jumps straight to `to` under
// reduced motion. Returns { stop }.
export function spring(options = {}) {
  const {
    from = 0,
    to = 1,
    stiffness = 170,
    damping = 26,
    mass = 1,
    restDelta = 0.01,
    onUpdate,
    onRest,
  } = options;

  if (reducedMotion() || typeof requestAnimationFrame === "undefined") {
    onUpdate?.(to);
    onRest?.();
    return { stop() {} };
  }

  let value = from;
  let velocity = 0;
  let prev = null;
  let raf = 0;
  let stopped = false;

  const step = (now) => {
    if (stopped) return;
    if (prev === null) prev = now;
    const dt = Math.min((now - prev) / 1000, 0.064); // clamp to survive tab blur
    prev = now;

    const springForce = -stiffness * (value - to);
    const dampingForce = -damping * velocity;
    const accel = (springForce + dampingForce) / mass;
    velocity += accel * dt;
    value += velocity * dt;

    if (Math.abs(velocity) < restDelta && Math.abs(value - to) < restDelta) {
      value = to;
      onUpdate?.(value);
      onRest?.();
      return;
    }
    onUpdate?.(value);
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);

  return {
    stop() {
      stopped = true;
      if (typeof cancelAnimationFrame !== "undefined") cancelAnimationFrame(raf);
    },
  };
}

// Re-attach a removed node, pinned over its old position, and fade it out.
// `done` performs the real removal (the caller silences the observer around it
// so the re-append and remove don't re-trigger autoAnimate).
function exit(container, node, rect, frames, duration, easing, done) {
  const cbox = container.getBoundingClientRect();
  const cs = getComputedStyle(container);
  if (cs.position === "static") container.style.position = "relative";
  node.style.position = "absolute";
  node.style.pointerEvents = "none";
  node.style.margin = "0";
  node.style.top = `${rect.top - cbox.top + container.scrollTop}px`;
  node.style.left = `${rect.left - cbox.left + container.scrollLeft}px`;
  node.style.width = `${rect.width}px`;
  node.style.height = `${rect.height}px`;
  container.appendChild(node);
  const anim = node.animate(frames, { duration, easing });
  anim.onfinish = done;
  anim.oncancel = done;
}
