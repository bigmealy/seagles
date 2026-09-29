// Shared helper: crops src/assets/logo.png (the real circular band logo)
// down to just the seagull over the guitar headstock/sunset, circle-masked.
// The full badge (with "SEAGLES" text and outer ring) is illegible at small
// sizes, so this crop is used everywhere a small/simple version of the logo
// is needed — the favicon set and the OG image mark.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const root = path.resolve(__dirname, "../..");

const SOURCE = path.join(root, "src/assets/logo.png");

// Crop coords are in the source artwork's native 1254x1254 pixel space.
const CROP = { left: 390, top: 150, width: 474, height: 400 };

export async function buildLogoMark(size) {
  const circleMask = `
    <svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff" />
    </svg>
  `;

  const resized = await sharp(SOURCE)
    .extract(CROP)
    .resize(size, size)
    .ensureAlpha()
    .toBuffer();

  return sharp(resized)
    .composite([{ input: Buffer.from(circleMask), blend: "dest-in" }])
    .png()
    .toBuffer();
}
