#!/usr/bin/env node
/**
 * Rebuild Workforce / Hub / AI wordmarks from the official ATW Agents mark so
 * ATW letterforms + 4-node constellation match Directory / Orbit / Agents.
 *
 * Method:
 * 1. Start from atw-agents-wordmark.png (same ATW + constellation as the suite)
 * 2. Clear the AGENTS letter pixels
 * 3. Composite a blue-cyan gradient product name in the same slot
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/images/logo');
const fontPath = '/usr/share/fonts/truetype/macos/Inter-BoldItalic.ttf';
const sourcePath = join(outDir, 'atw-agents-wordmark.png');

mkdirSync(outDir, { recursive: true });

/** Where white ATW body ends and blue product letters begin in agents mark. */
const PRODUCT_START_X = 455;
/** Below this Y we treat pixels as wordmark letters (constellation stays above). */
const LETTER_TOP_Y = 228;

const products = [
  { id: 'workforce', label: 'WORKFORCE', extraWidth: 520 },
  { id: 'hub', label: 'HUB', extraWidth: 0 },
  { id: 'ai', label: 'AI', extraWidth: 0 },
];

async function clearProductLetters(raw, width, height, channels) {
  const out = Buffer.from(raw);
  for (let y = LETTER_TOP_Y; y < height; y++) {
    for (let x = PRODUCT_START_X; x < width; x++) {
      const i = (y * width + x) * channels;
      out[i] = 0;
      out[i + 1] = 0;
      out[i + 2] = 0;
      out[i + 3] = 0;
    }
  }
  // Also clear any product-letter fragments under the floating node band
  // (keep constellation nodes/lines which sit higher / are round blobs).
  for (let y = 160; y < LETTER_TOP_Y; y++) {
    for (let x = PRODUCT_START_X + 40; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = out[i];
      const g = out[i + 1];
      const b = out[i + 2];
      const a = out[i + 3];
      if (a < 20) continue;
      // Keep saturated circular node pixels; clear desaturated / letter strokes.
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const sat = max - min;
      const isNodeLike = b > 100 && sat > 40 && Math.abs(r - g) < 80;
      // Heuristic: letter fragments in this band are rarer; prefer keeping blue nodes.
      if (!isNodeLike && y > 200) {
        out[i + 3] = 0;
      }
    }
  }
  return out;
}

function productNameSvg(label, width, height, fontSize) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="${width}" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1e4b96"/>
      <stop offset="35%" stop-color="#3d6ef0"/>
      <stop offset="70%" stop-color="#5b9bff"/>
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
        letter-spacing: -0.085em;
        fill: url(#g);
        stroke: url(#g);
        stroke-width: 2.25px;
        paint-order: stroke fill;
      }
    </style>
  </defs>
  <text x="0" y="${Math.round(height * 0.78)}" class="t">${label}</text>
</svg>`;
}

async function measureTextWidth(label, fontSize) {
  // Generous canvas then trim.
  const width = Math.max(400, label.length * fontSize);
  const height = Math.round(fontSize * 1.35);
  const svg = productNameSvg(label, width, height, fontSize);
  const rendered = await sharp(Buffer.from(svg), { density: 180 }).png().toBuffer();
  const trimmed = await sharp(rendered).trim({ threshold: 8 }).png().toBuffer();
  const meta = await sharp(trimmed).metadata();
  return { buffer: trimmed, width: meta.width, height: meta.height };
}

const source = sharp(sourcePath).ensureAlpha();
const srcMeta = await source.metadata();
const { data: srcRaw, info } = await source.raw().toBuffer({ resolveWithObject: true });
const cleared = await clearProductLetters(srcRaw, info.width, info.height, info.channels);

const basePrefix = await sharp(cleared, {
  raw: { width: info.width, height: info.height, channels: info.channels },
})
  // Keep ATW + constellation; drop empty AGENTS tail for short names later.
  .png()
  .toBuffer();

// ATW+constellation useful width (include floating 4th node ~x 586 + margin)
const PREFIX_KEEP_WIDTH = 640;

for (const product of products) {
  const fontSize = 190;
  const { buffer: textBuf, width: textW, height: textH } = await measureTextWidth(
    product.label,
    fontSize,
  );

  // Match official AGENTS letter box (~184px tall, top ~220).
  const targetTextH = 184;
  const scale = targetTextH / textH;
  const scaledTextW = Math.round(textW * scale);
  const scaledText = await sharp(textBuf)
    .resize({ width: scaledTextW, height: targetTextH, fit: 'fill' })
    .png()
    .toBuffer();

  const canvasW = Math.max(PREFIX_KEEP_WIDTH, PRODUCT_START_X + scaledTextW + 48) + product.extraWidth;
  const canvasH = info.height;

  const prefix = await sharp(basePrefix)
    .extract({ left: 0, top: 0, width: Math.min(PREFIX_KEEP_WIDTH, info.width), height: info.height })
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
      {
        input: scaledText,
        left: PRODUCT_START_X - 4,
        top: 220,
      },
    ])
    .png()
    .toBuffer();

  const trimmed = await sharp(composed).trim({ threshold: 4 }).png().toBuffer();
  const padded = await sharp(trimmed)
    .extend({
      top: 6,
      bottom: 6,
      left: 4,
      right: 10,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const meta = await sharp(padded).metadata();
  const webp = await sharp(padded).webp({ quality: 92 }).toBuffer();

  // Keep SVG as a simple reference export (not used as source of ATW glyphs).
  const svg = `<!-- Generated from official ATW Agents wordmark glyphs; raster is source of truth. -->
<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}" viewBox="0 0 ${meta.width} ${meta.height}">
  <image href="atw-${product.id}-wordmark.png" width="${meta.width}" height="${meta.height}"/>
</svg>`;

  writeFileSync(join(outDir, `atw-${product.id}-wordmark.png`), padded);
  writeFileSync(join(outDir, `atw-${product.id}-wordmark.webp`), webp);
  writeFileSync(join(outDir, `atw-${product.id}-wordmark.svg`), svg);
  console.log(`wrote atw-${product.id}-wordmark (${meta.width}x${meta.height})`);
}
