// Generates favicon assets (public/favicon.ico, favicon-16.png,
// favicon-32.png, apple-touch-icon.png) as a miniature circular crop of the
// real band logo (src/assets/logo.png). Run with: node scripts/generate-favicon.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SOURCE = path.join(root, "src/assets/logo.png");
const SIZE = 1024; // working resolution before downscaling

// The full circular badge (sunset + seagull + "SEAGLES" text + guitar body +
// waves) has too much fine detail to read at real favicon sizes (16-32px) —
// it turns into an indistinct blob. Instead, crop tight on just the seagull
// over the guitar headstock/sunset — the most recognisable part of the mark
// — from the source artwork (1254x1254), which reads as a mark at small
// sizes while still visibly coming from the real logo.
const CROP = { left: 390, top: 150, width: 474, height: 400 };

const CIRCLE_MASK = `
<svg width="${SIZE}" height="${SIZE}">
  <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2}" fill="#fff" />
</svg>
`;

async function buildMaster() {
  const resized = await sharp(SOURCE)
    .extract(CROP)
    .resize(SIZE, SIZE)
    .ensureAlpha()
    .toBuffer();

  return sharp(resized)
    .composite([{ input: Buffer.from(CIRCLE_MASK), blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function writePng(masterBuffer, size, outPath) {
  await sharp(masterBuffer)
    .resize(size, size, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toFile(outPath);
}

// Minimal ICO container embedding PNG-compressed images (supported by all
// modern browsers/OS since Vista) — avoids pulling in an extra dependency.
function buildIco(entries) {
  const count = entries.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * count;
  let offset = headerSize + dirSize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  const imageBuffers = [];

  for (const { size, buffer } of entries) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256)
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // image data size
    entry.writeUInt32LE(offset, 12); // image data offset
    offset += buffer.length;
    dirEntries.push(entry);
    imageBuffers.push(buffer);
  }

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

const master = await buildMaster();

const icoSizes = [16, 32, 48];
const icoEntries = [];
for (const size of icoSizes) {
  const buffer = await sharp(master)
    .resize(size, size, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
  icoEntries.push({ size, buffer });
}

writeFileSync(path.join(root, "public/favicon.ico"), buildIco(icoEntries));
await writePng(master, 32, path.join(root, "public/favicon-32.png"));
await writePng(master, 16, path.join(root, "public/favicon-16.png"));
await writePng(master, 180, path.join(root, "public/apple-touch-icon.png"));

console.log("Wrote public/favicon.ico, favicon-32.png, favicon-16.png, apple-touch-icon.png");
