/**
 * One-off script: converts public/infographics PNG/JPG files to WebP.
 * Run: node scripts/optimize-images.mjs
 * Original files are left in place; .webp files are written alongside them.
 * After running, update the src/data/sections.ts img() calls to use .webp extensions.
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIR = join(ROOT, "public", "infographics");

const SOURCE_EXTS = new Set([".png", ".jpg", ".jpeg"]);

const files = (await readdir(DIR)).filter((f) => SOURCE_EXTS.has(extname(f).toLowerCase()));

if (!files.length) {
  console.log("No source images found in", DIR);
  process.exit(0);
}

console.log(`\nOptimising ${files.length} images → WebP (quality 82, max-width 1800px)\n`);

let totalIn = 0;
let totalOut = 0;

for (const file of files) {
  const inPath = join(DIR, file);
  const outName = basename(file, extname(file)) + ".webp";
  const outPath = join(DIR, outName);

  const { size: sizeBefore } = await stat(inPath);
  await sharp(inPath)
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outPath);
  const { size: sizeAfter } = await stat(outPath);

  totalIn += sizeBefore;
  totalOut += sizeAfter;
  const pct = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(1);
  console.log(
    `  ${file.padEnd(42)} ${kb(sizeBefore).padStart(7)} → ${kb(sizeAfter).padStart(7)}  −${pct}%`,
  );
}

console.log(`\n  Total: ${kb(totalIn)} → ${kb(totalOut)}  −${(((totalIn - totalOut) / totalIn) * 100).toFixed(1)}%`);
console.log("\n✓ Done. Update sections.ts img() calls to use .webp extensions.\n");

function kb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}
