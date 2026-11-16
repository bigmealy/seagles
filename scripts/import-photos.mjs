// Imports chosen gig photos into src/assets/photos/ as web-sized JPEGs.
// Originals are ~15MB 6000x4000 camera files — far too big for the repo —
// so each is auto-rotated (baking in EXIF orientation), resized to a 2400px
// long edge, and re-encoded with all metadata (EXIF/GPS) stripped. Astro's
// <Image> then builds the responsive WebP variants from these at build time.
//
// Usage: node scripts/import-photos.mjs "<source dir>"
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { root } from "./lib/logo-mark.mjs";

// Frame numbers from "Seagles - Drouthy Cobbler - 6-11-26 - UNEDITED (<n>).JPG".
// The source files name the wrong venue: the gig was at the Drouthy Laird, Inverurie.
const CHOSEN = [2, 72, 131, 158, 221, 237, 243, 246, 259, 290, 316, 363, 395, 422, 429];
const LONG_EDGE = 2400;

const srcDir = process.argv[2];
if (!srcDir) {
  console.error('Usage: node scripts/import-photos.mjs "<source dir>"');
  process.exit(1);
}

const outDir = path.join(root, "src/assets/photos");
fs.mkdirSync(outDir, { recursive: true });

for (const n of CHOSEN) {
  const src = path.join(srcDir, `Seagles - Drouthy Cobbler - 6-11-26 - UNEDITED (${n}).JPG`);
  const out = path.join(outDir, `drouthy-laird-2026-11-06-${n}.jpg`);
  await sharp(src)
    .rotate()
    .resize(LONG_EDGE, LONG_EDGE, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  console.log(`Wrote ${path.relative(root, out)}`);
}
