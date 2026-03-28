/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "../public");

function inject(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  if (content.includes("global.js")) return;

  content = content.replace(
    "</head>",
    `<script src="/global.js"></script>\n</head>`
  );

  fs.writeFileSync(filePath, content);
  console.log("✅ Injected:", filePath);
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (file.endsWith(".html")) {
      inject(full);
    }
  });
}

walk(PUBLIC_DIR);