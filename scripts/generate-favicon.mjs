// Generates favicon assets (public/favicon.ico, favicon-16.png,
// favicon-32.png, favicon.svg, apple-touch-icon.png) as a miniature circular
// crop of the real band logo (src/assets/logo.png). Run with:
// node scripts/generate-favicon.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { buildLogoMark, root } from "./lib/logo-mark.mjs";

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

const master = await buildLogoMark(1024);

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

// favicon.svg: not a true vector (the source logo is raster artwork), but an
// SVG wrapper embedding the same masked crop as a data URI, so it stays in
// sync with the other favicon assets and works anywhere an SVG icon URL is
// expected (e.g. the JSON-LD `logo` field in BaseLayout.astro).
const svgEmbed = await sharp(master).resize(256, 256, { kernel: sharp.kernel.lanczos3 }).png().toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <image href="data:image/png;base64,${svgEmbed.toString("base64")}" width="256" height="256" />
</svg>
`;
writeFileSync(path.join(root, "public/favicon.svg"), svg);

console.log(
  "Wrote public/favicon.ico, favicon-32.png, favicon-16.png, favicon.svg, apple-touch-icon.png",
);
