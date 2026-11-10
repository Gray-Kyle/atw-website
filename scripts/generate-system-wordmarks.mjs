#!/usr/bin/env node
/**
 * Rebuild Workforce / Hub / AI wordmarks from the official ATW Directory mark so
 * ATW letterforms + 3-dot constellation match Directory / Orbit / One.
 *
 * Method:
 * 1. Start from atw-directory-wordmark.png (same ATW + constellation as the suite)
 * 2. Clear the DIRECTORY letter pixels
 * 3. Composite a blue-cyan gradient product name in the same slot
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/images/logo');
const fontPath = '/usr/share/fonts/truetype/macos/Inter-BoldItalic.ttf';
/** Official suite reference (user-confirmed ATW + 3 dots). */
const sourcePath = join(outDir, 'atw-directory-wordmark.png');

mkdirSync(outDir, { recursive: true });

/** Where white ATW body ends and blue product letters begin in Directory mark. */
const PRODUCT_START_X = 413;
/** Below this Y we treat pixels as wordmark letters (constellation stays above). */
const LETTER_TOP_Y = 145;

const products = [
  { id: 'workforce', label: 'WORKFORCE', extraWidth: 120 },
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
  // Clear product-letter fragments under the floating 4th node band; keep round nodes.
  for (let y = 90; y < LETTER_TOP_Y; y++) {
    for (let x = PRODUCT_START_X + 30; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = out[i];
      const g = out[i + 1];
      const b = out[i + 2];
      const a = out[i + 3];
      if (a < 20) continue;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const sat = max - min;
      const isNodeLike = b > 100 && sat > 40 && Math.abs(r - g) < 80;
      if (!isNodeLike && y > 120) {
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
  .png()
  .toBuffer();

// ATW + constellation useful width (include floating 4th node above product start)
const PREFIX_KEEP_WIDTH = 620;

for (const product of products) {
  const fontSize = 190;
  const { buffer: textBuf, width: textW, height: textH } = await measureTextWidth(
    product.label,
    fontSize,
  );

  // Match official DIRECTORY letter box height in the source mark.
  const targetTextH = 175;
  const scale = targetTextH / textH;
  const scaledTextW = Math.round(textW * scale);
  const scaledText = await sharp(textBuf)
    .resize({ width: scaledTextW, height: targetTextH, fit: 'fill' })
    .png()
    .toBuffer();

  const canvasW =
    Math.max(PREFIX_KEEP_WIDTH, PRODUCT_START_X + scaledTextW + 48) + product.extraWidth;
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
        left: PRODUCT_START_X - 2,
        top: 148,
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

  const svg = `<!-- Generated from official ATW Directory wordmark glyphs; raster is source of truth. -->
<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}" viewBox="0 0 ${meta.width} ${meta.height}">
  <image href="atw-${product.id}-wordmark.png" width="${meta.width}" height="${meta.height}"/>
</svg>`;

  writeFileSync(join(outDir, `atw-${product.id}-wordmark.png`), padded);
  writeFileSync(join(outDir, `atw-${product.id}-wordmark.webp`), webp);
  writeFileSync(join(outDir, `atw-${product.id}-wordmark.svg`), svg);
  console.log(`wrote atw-${product.id}-wordmark (${meta.width}x${meta.height})`);
}
