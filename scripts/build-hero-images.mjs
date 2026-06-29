// Hero image pipeline.
//
// The cover art is the single heaviest thing on the homepage, so we treat it
// like a master tape: the full-resolution originals live in `assets/heroes/`
// (NOT under public/, so they never ship), and this script presses a
// resolution ladder of AVIF + WebP variants into `public/images/heroes/`.
//
// The browser then pulls the sharpest file its screen can actually resolve —
// a 4K/Retina desktop still gets a genuine 3000px image (~0.5 MB AVIF instead
// of a ~5 MB JPEG); a phone gets a ~150 KB file that looks pixel-perfect on a
// ~1200px-wide panel. Same perceived sharpness, a fraction of the bytes.
//
// Run: npm run images:heroes   (re-run whenever a master changes)

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'assets', 'heroes');
const OUT = join(root, 'public', 'images', 'heroes');

// AVIF/WebP quality tuned for large photographic art: visually
// indistinguishable from the master at a fraction of the size.
const AVIF = { quality: 58, effort: 5 };
const WEBP = { quality: 78, effort: 5 };
const JPEG = { quality: 82, mozjpeg: true };

// Each master + the widths to press. Widths never exceed the master's native
// resolution (no upscaling). The CRT art is mobile-only (<=768px), so it tops
// out at ~2400px (768 CSS px x 3 DPR); the midnight art is full-bleed desktop,
// so it goes to the master's native 3000px for 4K/Retina.
const MASTERS = [
  { name: 'hero-crt', file: 'hero-crt.jpg', widths: [768, 1200, 1600, 2400], jpegWidth: 1200 },
  { name: 'hero-midnight', file: 'hero-midnight.jpg', widths: [1366, 1920, 2560, 3000], jpegWidth: 1920 },
];

await mkdir(OUT, { recursive: true });

let count = 0;
for (const m of MASTERS) {
  const input = join(SRC, m.file);
  for (const w of m.widths) {
    const base = sharp(input).resize({ width: w, withoutEnlargement: true });
    await base.clone().avif(AVIF).toFile(join(OUT, `${m.name}-${w}.avif`));
    await base.clone().webp(WEBP).toFile(join(OUT, `${m.name}-${w}.webp`));
    count += 2;
  }
  // One JPEG per master as the universal <img> fallback for the rare browser
  // that supports neither AVIF nor WebP.
  await sharp(input)
    .resize({ width: m.jpegWidth, withoutEnlargement: true })
    .jpeg(JPEG)
    .toFile(join(OUT, `${m.name}-${m.jpegWidth}.jpg`));
  count += 1;
}

console.log(`Pressed ${count} hero variants into public/images/heroes/`);
