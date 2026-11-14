#!/usr/bin/env node
/**
 * Rebuild Workforce / Hub / AI wordmarks from the official ATW Directory mark so
 * ATW letterforms + 3-dot constellation match Directory / Orbit / One.
 *
 * Critical: never erase the constellation band (y < LETTER_TOP_Y). Only replace
 * the blue product-name letters, then composite a solid-fill name (no stroke).
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/images/logo');
const fontPath = '/usr/share/fonts/truetype/macos/Inter-BoldItalic.ttf';
const sourcePath = join(outDir, 'atw-directory-wordmark.png');

mkdirSync(outDir, { recursive: true });

/** Blue product letters begin around here in Directory. */
const PRODUCT_START_X = 410;
/**
 * Letters live below this Y. Constellation (3 connected dots + floating 4th)
 * is entirely above — never clear pixels above this line.
 */
const LETTER_TOP_Y = 210;
/** Keep ATW + constellation through this X (includes floating node ~x 567). */
const PREFIX_KEEP_WIDTH = 640;

const products = [
  { id: 'workforce', label: 'WORKFORCE' },
  { id: 'hub', label: 'HUB' },
  { id: 'ai', label: 'AI' },
];

async function extractPrefix(raw, width, height, channels) {
  const out = Buffer.alloc(width * height * channels);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const a = raw[i + 3];
      if (a < 12) continue;

      // Always keep constellation band across the prefix width.
      if (y < LETTER_TOP_Y && x < PREFIX_KEEP_WIDTH) {
        out[i] = raw[i];
        out[i + 1] = raw[i + 1];
        out[i + 2] = raw[i + 2];
        out[i + 3] = raw[i + 3];
        continue;
      }

      // Keep ATW white letterforms in the letter band (left of product start).
      if (y >= LETTER_TOP_Y && x < PRODUCT_START_X) {
        out[i] = raw[i];
        out[i + 1] = raw[i + 1];
        out[i + 2] = raw[i + 2];
        out[i + 3] = raw[i + 3];
      }
      // Drop Directory letter pixels (y >= LETTER_TOP_Y && x >= PRODUCT_START_X).
    }
  }
  return out;
}

function productNameSvg(label, width, height, fontSize) {
  // Solid fill only — stroke was making WORKFORCE look hollow/outlined.
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="${width}" y2="${height * 0.35}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2f6fe8"/>
      <stop offset="45%" stop-color="#4d9fff"/>
      <stop offset="100%" stop-color="#7ee0ff"/>
    </linearGradient>
    <style>
      @font-face {
        font-family: 'InterWM';
        src: url('file://${fontPath}');
        font-weight: 700;
        font-style: italic;
      }
      .t {
        font-family: 'InterWM', 'Inter', Arial, sans-serif;
        font-weight: 800;
        font-style: italic;
        font-size: ${fontSize}px;
        letter-spacing: -0.06em;
        fill: url(#g);
      }
    </style>
  </defs>
  <text x="0" y="${Math.round(height * 0.82)}" class="t">${label}</text>
</svg>`;
}

async function measureText(label, fontSize) {
  const width = Math.max(500, label.length * fontSize);
  const height = Math.round(fontSize * 1.4);
  const svg = productNameSvg(label, width, height, fontSize);
  const rendered = await sharp(Buffer.from(svg), { density: 220 }).png().toBuffer();
  const trimmed = await sharp(rendered).trim({ threshold: 10 }).png().toBuffer();
  const meta = await sharp(trimmed).metadata();
  return { buffer: trimmed, width: meta.width, height: meta.height };
}

const source = sharp(sourcePath).ensureAlpha();
const { data: srcRaw, info } = await source.raw().toBuffer({ resolveWithObject: true });
const prefixRaw = await extractPrefix(srcRaw, info.width, info.height, info.channels);

const prefixFull = await sharp(prefixRaw, {
  raw: { width: info.width, height: info.height, channels: info.channels },
})
  .png()
  .toBuffer();

// Official Directory letter box height (~y 210–390 ≈ 180px).
const TARGET_TEXT_H = 178;
const TEXT_TOP = 212;

for (const product of products) {
  const fontSize = 200;
  const { buffer: textBuf, width: textW, height: textH } = await measureText(
    product.label,
    fontSize,
  );

  const scale = TARGET_TEXT_H / textH;
  const scaledTextW = Math.round(textW * scale);
  const scaledText = await sharp(textBuf)
    .resize({ width: scaledTextW, height: TARGET_TEXT_H, fit: 'fill' })
    .png()
    .toBuffer();

  const canvasW = Math.max(PREFIX_KEEP_WIDTH, PRODUCT_START_X + scaledTextW + 36);
  const canvasH = info.height;

  const prefix = await sharp(prefixFull)
    .extract({
      left: 0,
      top: 0,
      width: Math.min(PREFIX_KEEP_WIDTH, info.width),
      height: info.height,
    })
    .png()
    .toBuffer();

  const composed = await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: prefix, left: 0, top: 0 },
      { input: scaledText, left: PRODUCT_START_X - 2, top: TEXT_TOP },
    ])
    .png()
    .toBuffer();

  // Transparent background like official Directory / Orbit / One marks.
  const trimmed = await sharp(composed).trim({ threshold: 2 }).png().toBuffer();
  const padded = await sharp(trimmed)
    .extend({
      top: 4,
      bottom: 4,
      left: 4,
      right: 8,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const meta = await sharp(padded).metadata();
  const webp = await sharp(padded).webp({ quality: 92 }).toBuffer();

  const svg = `<!-- Generated from official ATW Directory wordmark; raster is source of truth. -->
<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}" viewBox="0 0 ${meta.width} ${meta.height}">
  <image href="atw-${product.id}-wordmark.png" width="${meta.width}" height="${meta.height}"/>
</svg>`;

  writeFileSync(join(outDir, `atw-${product.id}-wordmark.png`), padded);
  writeFileSync(join(outDir, `atw-${product.id}-wordmark.webp`), webp);
  writeFileSync(join(outDir, `atw-${product.id}-wordmark.svg`), svg);
  console.log(`wrote atw-${product.id}-wordmark (${meta.width}x${meta.height})`);
}
