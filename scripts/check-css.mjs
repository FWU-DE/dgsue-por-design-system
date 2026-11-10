// Kompiliert scripts/css-smoke/input.css wie eine App und prüft, dass Tailwind
// die Klassen der gebauten Komponenten über das @source des Pakets findet.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dir = mkdtempSync(join(tmpdir(), 'por-ui-css-'));
const out = join(dir, 'out.css');

try {
  execFileSync(
    join(root, 'node_modules/.bin/tailwindcss'),
    ['-i', join(root, 'scripts/css-smoke/input.css'), '-o', out],
    { stdio: ['ignore', 'ignore', 'inherit'] },
  );
  const css = readFileSync(out, 'utf8');

  // Je eine Klasse, die nur in einer Komponente vorkommt.
  const expected = [
    '.bg-primary', // button
    '.bg-success', // badge (Status-Tokens)
    '.origin-\\(--radix-popover-content-transform-origin\\)', // popover
    '.min-w-\\(--cell-size\\)', // calendar
  ];
  const missing = expected.filter((selector) => !css.includes(selector));
  if (missing.length) {
    console.error(`check-css: Klassen fehlen im CSS (greift @source?):\n- ${missing.join('\n- ')}`);
    process.exit(1);
  }
  console.log(`check-css: ok (${expected.length} Stichproben)`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
