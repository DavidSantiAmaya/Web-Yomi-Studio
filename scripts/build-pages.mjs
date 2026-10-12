import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

process.env.GITHUB_ACTIONS = "true";
execFileSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
  stdio: "inherit",
  env: process.env,
});

// The current YOMI UI does not reference these legacy Suburbia public assets.
// Do not publish them or duplicate their weight in the GitHub Pages branch.
const omittedAssets = [
  "bg-texture.webp",
  "concrete-normal.avif",
  "hdr",
  "image-texture.png",
  "images",
  "skateboard.bin",
  "skateboard.gltf",
  "skateboard",
  "video-mask.png",
  "view",
];
for (const asset of omittedAssets) rmSync(`out/${asset}`, { recursive: true, force: true });

function publish(destination) {
  if (destination === ".") {
    for (const entry of [...new Set([...readdirSync("out"), ...omittedAssets])]) {
      rmSync(entry, { recursive: true, force: true });
    }
  } else {
    rmSync(destination, { recursive: true, force: true });
    mkdirSync(destination, { recursive: true });
  }
  cpSync("out", destination, { recursive: true });
  writeFileSync(`${destination}/.nojekyll`, "");
}

publish("docs");
publish(".");
