// Smoke-checks the built site (apps/www/dist) the way GitHub Pages serves it:
// a static server rooted so that the deploy base "/pura/" maps to the dist root.
// For each key route it asserts the page is 200 and that every "/pura/..." asset
// it references resolves to 200 — catching the static-404 class (a missing
// favicon, tokens.css, pura.js, or a stale bundle reference) before deploy.
//
// Limitation: this does NOT execute JavaScript, so runtime-only fetches (e.g.
// demoHTML `import("/pura/lib/<x>.js")`) are covered by the explicit ASSETS list
// below, not by HTML parsing. Verify interactive behavior with `astro preview`.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "apps", "www", "dist");
const BASE = "/pura/";

const TYPES = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml",
};

// Routes that must render, plus runtime assets only reachable via JS at runtime.
const ROUTES = ["/pura/", "/pura/docs/button", "/pura/docs/pillar/display", "/pura/docs/pillar/animations", "/pura/theme", "/pura/templates"];
const ASSETS = [
  "/pura/tokens.css", "/pura/pura.js", "/pura/base.js", "/pura/i18n.js",
  "/pura/animate.js",
  "/pura/lib/button.js", "/pura/components/button.js", "/pura/favicon.svg",
  "/pura/r/button.json", "/pura/templates/login.html",
];

// Resolve a request URL to a file in dist. "/pura/x" -> dist/x; extension-less
// paths map to their index.html (Astro's directory output).
function resolve(urlPath) {
  let rel = urlPath.startsWith(BASE) ? urlPath.slice(BASE.length) : urlPath.slice(1);
  if (rel === "" || rel.endsWith("/")) rel += "index.html";
  else if (!extname(rel)) rel += "/index.html";
  return join(DIST, rel);
}

function serve() {
  return createServer(async (req, res) => {
    try {
      const file = resolve(decodeURI(req.url.split("?")[0]));
      const body = await readFile(file);
      res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });
}

async function main() {
  try {
    await stat(join(DIST, "index.html"));
  } catch {
    console.error("smoke: apps/www/dist not built. Run `pnpm build` first.");
    process.exit(1);
  }

  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const port = server.address().port;
  const origin = `http://localhost:${port}`;

  const failures = [];
  const check = async (path) => {
    const res = await fetch(origin + path);
    if (!res.ok) failures.push(`${res.status} ${path}`);
    return res;
  };

  // Pages: fetch, assert 200, then verify every "/pura/..." ref they declare.
  const refRe = /(?:href|src)="(\/pura\/[^"]+)"/g;
  const seen = new Set();
  for (const route of ROUTES) {
    const res = await check(route);
    if (!res.ok) continue;
    const html = await res.text();
    for (const m of html.matchAll(refRe)) {
      const ref = m[1].split("#")[0];
      if (ref && !seen.has(ref)) { seen.add(ref); await check(ref); }
    }
  }
  // Runtime assets reachable only via JS.
  for (const asset of ASSETS) {
    if (!seen.has(asset)) { seen.add(asset); await check(asset); }
  }

  server.close();

  if (failures.length) {
    console.error(`smoke: ${failures.length} broken URL(s):`);
    for (const f of failures) console.error("  " + f);
    process.exit(1);
  }
  console.log(`smoke: ${ROUTES.length} routes + ${seen.size} assets OK`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
