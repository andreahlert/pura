import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

// Audits the built docs pages. Expects a live preview at PURA_BASE (default the
// astro preview server with its `/pura` base path). Fails on serious/critical
// WCAG 2 A/AA violations only; do not loosen the tag set to make it pass.
const BASE = process.env.PURA_BASE || "http://localhost:4400/pura";
const ROUTES = ["/", "/docs/button", "/docs/knob", "/theme"];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
let violations = 0;
for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const serious = results.violations.filter((v) => ["serious", "critical"].includes(v.impact));
  for (const v of serious) {
    violations++;
    console.error(`a11y ${route}: ${v.id} (${v.impact}), ${v.nodes.length} node(s)`);
  }
}
await browser.close();
if (violations) { console.error(`a11y: ${violations} serious/critical violation(s)`); process.exit(1); }
console.log("a11y: no serious/critical violations");
