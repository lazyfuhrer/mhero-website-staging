/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "../public");

function clean(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  content = content.replace(/var _mhao = \{[\s\S]*?\};?/g, "");

  fs.writeFileSync(filePath, content);
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) walk(full);
    else if (file.endsWith(".html")) clean(full);
  });
}

walk(PUBLIC_DIR);