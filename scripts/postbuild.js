import fs from "node:fs";
import path from "node:path";

const outputDir = path.resolve(process.cwd(), ".output");
const distDir = path.resolve(process.cwd(), "dist");

if (fs.existsSync(outputDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  fs.mkdirSync(path.join(distDir, ".output"), { recursive: true });

  // Copy full .output to dist/.output
  fs.cpSync(outputDir, path.join(distDir, ".output"), { recursive: true });

  // Copy full .output contents to dist root
  fs.cpSync(outputDir, distDir, { recursive: true });

  // If public assets exist, copy them to dist root as well
  const publicDir = path.join(outputDir, "public");
  if (fs.existsSync(publicDir)) {
    fs.cpSync(publicDir, distDir, { recursive: true });
  }

  // Find assets in dist/assets
  const assetsDir = path.join(distDir, "assets");
  let cssTag = "";
  let jsTag = "";

  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    const cssFile = files.find((f) => f.endsWith(".css"));
    const jsFile =
      files.find((f) => f.startsWith("index") && f.endsWith(".js")) ||
      files.find((f) => f.startsWith("client") && f.endsWith(".js")) ||
      files.find((f) => f.endsWith(".js"));

    if (cssFile) {
      cssTag = `<link rel="stylesheet" href="/assets/${cssFile}">`;
    }
    if (jsFile) {
      jsTag = `<script type="module" src="/assets/${jsFile}"></script>`;
    }
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payroxa</title>
    <meta name="description" content="Payroxa marketing platform and business operations suite for African businesses." />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    ${cssTag}
  </head>
  <body>
    <div id="root"></div>
    ${jsTag}
  </body>
</html>
`;

  fs.writeFileSync(path.join(distDir, "index.html"), htmlContent, "utf-8");

  // Create entrypoint fallbacks in dist root for deployment runners
  fs.writeFileSync(path.join(distDir, "index.js"), "import('./server/index.mjs');\n", "utf-8");
  fs.writeFileSync(path.join(distDir, "server.js"), "import('./server/index.mjs');\n", "utf-8");

  const distPublicDir = path.join(distDir, "public");
  if (!fs.existsSync(distPublicDir)) {
    fs.mkdirSync(distPublicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(distPublicDir, "index.html"), htmlContent, "utf-8");

  const outputPublicDir = path.join(outputDir, "public");
  if (!fs.existsSync(outputPublicDir)) {
    fs.mkdirSync(outputPublicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outputPublicDir, "index.html"), htmlContent, "utf-8");

  console.log("Successfully copied build artifacts and created index.html in dist directory.");
} else {
  console.warn(".output directory not found after build.");
}
