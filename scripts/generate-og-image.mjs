// Generates public/images/og-default.png — a placeholder social-preview
// (Open Graph) image: the full band logo badge, large and centered, over
// the brand gradient background from src/styles/global.css. Not final
// branding/photography — see CLAUDE.md "Known placeholders to replace".
import sharp from "sharp";
import path from "node:path";
import { buildFullLogoMark, root } from "./lib/logo-mark.mjs";

const WIDTH = 1200;
const HEIGHT = 630;
const MARK_SIZE = 580;
const MARK_TOP = Math.round((HEIGHT - MARK_SIZE) / 2);
const MARK_LEFT = Math.round((WIDTH - MARK_SIZE) / 2);

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
</svg>
`;

const logoMark = await buildFullLogoMark(MARK_SIZE);

await sharp(Buffer.from(svg))
  .composite([{ input: logoMark, top: MARK_TOP, left: MARK_LEFT }])
  .png()
  .toFile(path.join(root, "public/images/og-default.png"));

console.log("Wrote public/images/og-default.png");
