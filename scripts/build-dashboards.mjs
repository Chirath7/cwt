#!/usr/bin/env node
/**
 * scripts/build-dashboards.mjs
 * Re-runnable: on first run moves raw JPGs out of public/ to assets-src/,
 * then always encodes WebP and writes dashboards.generated.ts.
 *
 * Usage:  node scripts/build-dashboards.mjs
 */

import { existsSync, mkdirSync, renameSync, rmdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(fileURLToPath(import.meta.url), "../..");
const OLD_SRC = join(ROOT, "public/Dashboards/Screens of Dasdhboard Blured");
const ASSETS_SRC = join(ROOT, "assets-src/dashboards/Screens of Dashboard Blured");
const OUT_DAT = join(ROOT, "public/dashboards/dat");
const TS_OUT = join(ROOT, "src/data/dashboards.generated.ts");

/** Ordered list: (folder name on disk) → (output slug, display title) */
const FOLDERS = [
  { folder: "Accounting Revenue",           slug: "01-accounting-revenue",           title: "Accounting Revenue" },
  { folder: "Advanced Cusdec Search",       slug: "02-advanced-cusdec-search",       title: "Advanced Cusdec Search" },
  { folder: "Advanced FCL Import Dashboard",slug: "03-advanced-fcl-import",          title: "Advanced FCL Import Dashboard" },
  { folder: "Advanced Valuation Analysis",  slug: "04-advanced-valuation-analysis",  title: "Advanced Valuation Analysis" },
  { folder: "Advanced Warehouse Dashboard", slug: "05-advanced-warehouse",           title: "Advanced Warehouse Dashboard" },
  { folder: "Cusdec Analysis",              slug: "06-cusdec-analysis",              title: "Cusdec Analysis" },
  { folder: "Export",                       slug: "07-export",                       title: "Export" },
  { folder: "FCL Import Dashboard",         slug: "08-fcl-import",                  title: "FCL Import Dashboard" },
  { folder: "Import Analysis",              slug: "09-import-analysis",              title: "Import Analysis" },
  { folder: "Investigation & Individuals",  slug: "10-investigation-individuals",   title: "Investigation & Individuals" },
  { folder: "LCL",                          slug: "11-lcl",                         title: "LCL Import" },
  { folder: "Outward Remittances",          slug: "12-outward-remittances",         title: "Outward Remittances" },
  { folder: "Relief Revenue",               slug: "13-relief-revenue",              title: "Relief Revenue" },
  { folder: "Risk Management",              slug: "14-risk-management",             title: "Risk Management" },
  { folder: "Valuation Analysis",           slug: "15-valuation-analysis",          title: "Valuation Analysis" },
  { folder: "Valuation Database",           slug: "16-valuation-database",          title: "Valuation Database" },
  { folder: "Vehicle Dashboard",            slug: "17-vehicle-dashboard",           title: "Vehicle Dashboard" },
  { folder: "Warehouse Dashboard",          slug: "18-warehouse-dashboard",         title: "Warehouse Dashboard" },
];

async function main() {
  // ── Move originals out of public/ on first run ──────────────────────────
  if (existsSync(OLD_SRC) && !existsSync(ASSETS_SRC)) {
    mkdirSync(join(ROOT, "assets-src/dashboards"), { recursive: true });
    renameSync(OLD_SRC, ASSETS_SRC);
    console.log("✔ Moved raw screenshots → assets-src/dashboards/Screens of Dashboard Blured");
    try { rmdirSync(join(ROOT, "public/Dashboards")); } catch {}
  }

  const SRC = existsSync(ASSETS_SRC) ? ASSETS_SRC : OLD_SRC;
  if (!existsSync(SRC)) {
    console.error("Source folder not found:", SRC);
    process.exit(1);
  }

  mkdirSync(OUT_DAT, { recursive: true });

  const manifest = [];

  for (const { folder, slug, title } of FOLDERS) {
    const folderPath = join(SRC, folder);
    if (!existsSync(folderPath)) {
      console.warn(`  SKIP (not found): ${folder}`);
      continue;
    }

    const outFolder = join(OUT_DAT, slug);
    mkdirSync(outFolder, { recursive: true });

    const files = readdirSync(folderPath)
      .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const pages = [];
    for (let i = 0; i < files.length; i++) {
      const srcFile = join(folderPath, files[i]);
      const pageNum = String(i + 1).padStart(2, "0");
      const outFile = join(outFolder, `page-${pageNum}.webp`);

      const meta = await sharp(srcFile).metadata();
      const naturalW = meta.width ?? 0;

      // Never upscale; max 2000px wide; quality 90
      await sharp(srcFile)
        .resize(naturalW > 2000 ? 2000 : null, null, { withoutEnlargement: true })
        .webp({ quality: 90 })
        .toFile(outFile);

      pages.push(`/dashboards/dat/${slug}/page-${pageNum}.webp`);
    }

    manifest.push({ id: slug, slug, title, pageCount: files.length, pages });
    console.log(`  ${slug}: ${files.length} pages`);
  }

  // ── Write src/data/dashboards.generated.ts ──────────────────────────────
  const tsLines = [
    "// AUTO-GENERATED — run `node scripts/build-dashboards.mjs` to refresh. Do not edit.",
    "",
    "export interface GeneratedDashboard {",
    "  id: string;",
    "  slug: string;",
    "  title: string;",
    "  pageCount: number;",
    "  pages: string[];",
    "}",
    "",
    "export const generatedDashboards: GeneratedDashboard[] = ",
    JSON.stringify(manifest, null, 2) + ";",
    "",
  ];
  writeFileSync(TS_OUT, tsLines.join("\n"));

  const totalPages = manifest.reduce((s, d) => s + d.pageCount, 0);
  console.log(`\n✔ ${manifest.length} dashboards · ${totalPages} pages`);
  console.log(`✔ Wrote ${TS_OUT}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
