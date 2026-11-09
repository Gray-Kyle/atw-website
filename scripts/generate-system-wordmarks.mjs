#!/usr/bin/env node
/**
 * Generate ATW system wordmarks (Workforce, Hub, AI) in the same format as
 * One / Directory / Orbit: white ATW + blue-cyan product name + constellation.
 * Canvas is tightly cropped so card-size (h-8) renders match official marks.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/images/logo');
const fontPath = '/usr/share/fonts/truetype/macos/Inter-BoldItalic.ttf';

mkdirSync(outDir, { recursive: true });

/**
 * Shared constellation placed over the ATW / product-name junction.
 * Coordinates are relative to a junction X of ~360.
 */
function constellation(jx) {
  return {
    nodes: [
      { cx: jx - 18, cy: 52, r: 16 },
      { cx: jx + 28, cy: 22, r: 12 },
      { cx: jx + 78, cy: 48, r: 14 },
      { cx: jx + 42, cy: 82, r: 9 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [0, 2],
      [2, 3],
    ],
  };
}

/** @type {{ id: string; label: string; width: number; height: number; atwX: number; nameX: number; fontSize: number; jx: number }[]} */
const marks = [
  {
    id: 'workforce',
    label: 'WORKFORCE',
    width: 1560,
    height: 320,
    atwX: 24,
    nameX: 360,
    fontSize: 148,
    jx: 340,
  },
  {
    id: 'hub',
    label: 'HUB',
    width: 820,
    height: 320,
    atwX: 24,
    nameX: 360,
    fontSize: 148,
    jx: 340,
  },
  {
    id: 'ai',
    label: 'AI',
    width: 700,
    height: 320,
    atwX: 24,
    nameX: 360,
    fontSize: 148,
    jx: 340,
  },
];

function buildSvg(mark) {
  const baseline = 250;
  const { nodes, lines: linePairs } = constellation(mark.jx);
  const lines = linePairs
    .map(([a, b]) => {
      const n1 = nodes[a];
      const n2 = nodes[b];
      return `<line x1="${n1.cx}" y1="${n1.cy}" x2="${n2.cx}" y2="${n2.cy}" stroke="url(#grad)" stroke-width="6" stroke-linecap="round"/>`;
    })
    .join('\n');
  const nodeEls = nodes
    .map((n) => `<circle cx="${n.cx}" cy="${n.cy}" r="${n.r}" fill="url(#grad)"/>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${mark.width}" height="${mark.height}" viewBox="0 0 ${mark.width} ${mark.height}" fill="none">
  <defs>
    <linearGradient id="grad" x1="${mark.jx - 40}" y1="0" x2="${mark.width - 20}" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1e4b96"/>
      <stop offset="40%" stop-color="#4A6CF7"/>
      <stop offset="100%" stop-color="#7ee0ff"/>
    </linearGradient>
    <style>
      @font-face {
        font-family: 'InterWM';
        src: url('file://${fontPath}');
        font-weight: 700;
        font-style: italic;
      }
      .atw, .name {
        font-family: 'InterWM', 'Inter', 'Arial Black', Arial, sans-serif;
        font-weight: 800;
        font-style: italic;
        font-size: ${mark.fontSize}px;
        letter-spacing: -0.07em;
        paint-order: stroke fill;
      }
      .atw {
        fill: #ffffff;
        stroke: #ffffff;
        stroke-width: 1.25px;
      }
      .name {
        fill: url(#grad);
        stroke: url(#grad);
        stroke-width: 1.25px;
      }
    </style>
  </defs>
  ${lines}
  ${nodeEls}
  <text x="${mark.atwX}" y="${baseline}" class="atw">ATW</text>
  <text x="${mark.nameX}" y="${baseline}" class="name">${mark.label}</text>
</svg>`;
}

for (const mark of marks) {
  const svg = buildSvg(mark);
  const svgPath = join(outDir, `atw-${mark.id}-wordmark.svg`);
  const pngPath = join(outDir, `atw-${mark.id}-wordmark.png`);
  const webpPath = join(outDir, `atw-${mark.id}-wordmark.webp`);
  writeFileSync(svgPath, svg);

  // Render larger then trim transparent padding so card crops match One/Orbit.
  const rendered = await sharp(Buffer.from(svg), { density: 144 })
    .png()
    .toBuffer();
  const trimmed = await sharp(rendered).trim({ threshold: 5 }).png().toBuffer();
  const meta = await sharp(trimmed).metadata();
  // Add a little padding back so constellation is not clipped.
  const padded = await sharp(trimmed)
    .extend({
      top: 12,
      bottom: 8,
      left: 8,
      right: 16,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();
  writeFileSync(pngPath, padded);
  const webp = await sharp(padded).webp({ quality: 92 }).toBuffer();
  writeFileSync(webpPath, webp);
  const finalMeta = await sharp(padded).metadata();
  console.log(
    `wrote atw-${mark.id}-wordmark .{svg,png,webp} (${finalMeta.width}x${finalMeta.height}; pre-trim ${meta.width}x${meta.height})`,
  );
}
