// Generates public/images/og-default.png — a placeholder social-preview
// (Open Graph) image built from the brand mark and theme colors in
// src/styles/global.css. Not final branding/photography — see CLAUDE.md
// "Known placeholders to replace".
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const WIDTH = 1200;
const HEIGHT = 630;

const eagleMarkSvg = readFileSync(path.join(root, "public/favicon.svg"), "utf-8");
const eaglePathMatch = eagleMarkSvg.match(/<path d="([^"]+)"/);
const eaglePath = eaglePathMatch[1];

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c2c40" />
      <stop offset="100%" stop-color="#170f0b" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="18%" r="60%">
      <stop offset="0%" stop-color="#d9772e" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#d9772e" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />
  <g transform="translate(${WIDTH / 2 - 90}, 70) scale(1.4)">
    <path d="${eaglePath}" fill="#f4ecd8" />
  </g>
  <text
    x="${WIDTH / 2}"
    y="440"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="88"
    font-weight="700"
    letter-spacing="6"
    fill="#f4ecd8"
  >SEAGLES</text>
  <text
    x="${WIDTH / 2}"
    y="500"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="34"
    letter-spacing="4"
    fill="#d9772e"
  >AN EAGLES TRIBUTE</text>
  <text
    x="${WIDTH / 2}"
    y="550"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="24"
    fill="#f4ecd8"
    fill-opacity="0.7"
  >North-East Scotland</text>
</svg>
`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(root, "public/images/og-default.png"));

console.log("Wrote public/images/og-default.png");
