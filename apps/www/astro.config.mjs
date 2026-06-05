import { defineConfig } from "astro/config";

// Static site. pura ships as native web components served from /public/pura,
// loaded via a module script in the layout. No framework integration needed.
export default defineConfig({
  site: "https://pura.dev",
  devToolbar: { enabled: false },
});
