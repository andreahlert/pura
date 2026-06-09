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
  const snapshot = () => {
    for (const child of container.children) {
      rects.set(child, child.getBoundingClientRect());
    }
  };

  const onMutate = (records) => {
    if (reducedMotion()) {
      snapshot();
      return;
    }
    const duration = getDuration();
    const added = new Set();
    const removed = [];
    for (const r of records) {
      r.addedNodes.forEach((n) => n.nodeType === 1 && added.add(n));
      r.removedNodes.forEach((n) => {
        if (n.nodeType !== 1) return;
        const rect = rects.get(n);
        if (rect) removed.push({ node: n, rect, next: r.nextSibling });
      });
    }

    // FLIP the children that stayed (moved by the add/remove).
    for (const child of container.children) {
      if (added.has(child)) continue;
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
    // then drop it for real. This is what gives removal a smooth fade.
    for (const { node, rect } of removed) {
      exit(container, node, rect, exitFrames, duration, easing);
    }

    snapshot();
  };

  const observer =
    typeof MutationObserver !== "undefined" ? new MutationObserver(onMutate) : null;

  const enable = () => {
    snapshot();
    observer?.observe(container, { childList: true });
  };
  const disable = () => observer?.disconnect();

  enable();
  return { enable, disable };
}

// Re-attach a removed node, pinned over its old position, and fade it out.
function exit(container, node, rect, frames, duration, easing) {
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
  anim.onfinish = () => node.remove();
  anim.oncancel = () => node.remove();
}
