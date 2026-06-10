import { test } from "node:test";
import assert from "node:assert/strict";

// Pure spring math only. The module calls define() at import, so stub the custom
// element registry; we never instantiate the element here.
globalThis.HTMLElement = globalThis.HTMLElement || class {};
const reg = new Map();
globalThis.customElements = globalThis.customElements || {
  get: (t) => reg.get(t),
  define: (t, c) => reg.set(t, c),
};

const { spring, springValueAt, SPRING_PRESETS } = await import(
  "../registry/components/spring.js"
);

test("springValueAt starts at 0 and approaches 1", () => {
  const w0 = Math.sqrt(170 / 1);
  const zeta = 26 / (2 * Math.sqrt(170 * 1));
  assert.equal(springValueAt(0, w0, zeta), 0);
  assert.equal(springValueAt(-1, w0, zeta), 0);
  // far in the tail it has settled near 1
  assert.ok(Math.abs(springValueAt(3, w0, zeta) - 1) < 1e-3);
});

test("underdamped spring overshoots past 1", () => {
  // wobbly: low damping -> must cross above 1 at some point
  const { stiffness, damping, mass } = SPRING_PRESETS.wobbly;
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  let peak = 0;
  for (let t = 0; t <= 2; t += 1 / 240) peak = Math.max(peak, springValueAt(t, w0, zeta));
  assert.ok(peak > 1.05, `expected overshoot, peak=${peak}`);
});

test("overdamped spring never overshoots", () => {
  // slow: high damping relative to stiffness -> zeta > ... still < 1 here, so
  // build an explicitly overdamped one.
  const w0 = Math.sqrt(100 / 1);
  const zeta = 2; // overdamped
  let peak = 0;
  for (let t = 0; t <= 4; t += 1 / 240) peak = Math.max(peak, springValueAt(t, w0, zeta));
  assert.ok(peak <= 1 + 1e-9, `expected no overshoot, peak=${peak}`);
});

test("spring() emits a valid CSS linear() easing", () => {
  const { easing, duration } = spring({ preset: "wobbly" });
  assert.match(easing, /^linear\(/);
  assert.match(easing, /\)$/);
  const nums = easing.slice("linear(".length, -1).split(",").map((s) => Number(s.trim()));
  assert.ok(nums.length >= 24, `expected many samples, got ${nums.length}`);
  assert.equal(nums[0], 0, "starts at 0");
  assert.equal(nums[nums.length - 1], 1, "ends exactly at 1");
  assert.ok(Math.max(...nums) > 1, "underdamped easing exceeds 1 (overshoot)");
  assert.ok(duration >= 60 && duration <= 6000, `duration in range, got ${duration}`);
});

test("spring() honors explicit params over preset", () => {
  const a = spring({ preset: "stiff" });
  const b = spring({ preset: "stiff", damping: 8 });
  // lower damping -> more overshoot -> higher peak in the samples
  const peak = (e) => Math.max(...e.slice("linear(".length, -1).split(",").map(Number));
  assert.ok(peak(b.easing) > peak(a.easing));
});

test("stiffer spring settles faster (shorter duration)", () => {
  const soft = spring({ stiffness: 80, damping: 10 });
  const hard = spring({ stiffness: 400, damping: 30 });
  assert.ok(hard.duration < soft.duration, `${hard.duration} < ${soft.duration}`);
});

test("spring() falls back to defaults on garbage input", () => {
  const { easing, duration } = spring({ stiffness: "nope", damping: NaN });
  assert.match(easing, /^linear\(/);
  assert.ok(Number.isFinite(duration));
});

test("null/empty params (as from getAttribute) do not collapse the spring", () => {
  // Elements forward getAttribute() results, which are null when unset. null must
  // fall back to the preset, not coerce to 0 (Number(null) === 0).
  const fromEl = spring({ preset: "wobbly", stiffness: null, damping: null, mass: null });
  const direct = spring({ preset: "wobbly" });
  assert.equal(fromEl.duration, direct.duration);
  assert.ok(fromEl.duration > 200, `wobbly should settle slowly, got ${fromEl.duration}`);
  assert.equal(spring({ stiffness: "" }).duration, spring({}).duration);
});
