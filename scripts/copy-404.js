import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// GitHub Pages serves 404.html for unknown routes.
// Copying index.html ensures the SPA still loads and React Router can handle routing.
const distDir = resolve("dist");
const indexFile = resolve(distDir, "index.html");
const notFoundFile = resolve(distDir, "404.html");

if (!existsSync(indexFile)) {
  process.exit(0);
}

if (existsSync(notFoundFile)) {
  // eslint-disable-next-line no-console
  console.log("404.html already exists; skipping SPA fallback copy.");
  process.exit(0);
}

copyFileSync(indexFile, notFoundFile);
// eslint-disable-next-line no-console
console.log("Copied index.html to 404.html for SPA fallback.");
