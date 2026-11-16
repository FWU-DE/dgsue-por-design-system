// Prüft das Build-Ergebnis, bevor es veröffentlicht wird:
//  1. Zu jeder Komponente gibt es .js und .d.ts.
//  2. "use client" steht weiterhin in der ersten Zeile, wo es im Quellcode stand.
//     (Fehlt es, brechen Server Components in Next.js.)
//  3. Relative Imports zeigen auf .js-Dateien, die es gibt.
//  4. Jedes Modul lässt sich in Node laden (fängt fehlende Abhängigkeiten ab).
//  5. Keine v3-Schreibweise `utility-[--var]`, die in Tailwind v4 nicht wirkt.
//  6. Jede Komponente hat einen Eintrag unter exports in package.json.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const errors = [];

const sources = [
  ...readdirSync(join(root, 'src/components'), { recursive: true }).map((f) => `components/${f}`),
  ...readdirSync(join(root, 'src/lib')).map((f) => `lib/${f}`),
].filter((f) => /\.tsx?$/.test(f));

// 6. Jede Komponente ist in package.json exportiert (die Import-Pfade sind flach,
//    die Ordner shadcn/, angepasst/ und eigene/ tauchen darin nicht auf).
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
for (const src of sources.filter((f) => f.startsWith('components/'))) {
  const name = src.replace(/^.*\//, '').replace(/\.tsx?$/, '');
  const target = `./dist/${src.replace(/\.tsx?$/, '.js')}`;
  if (pkg.exports[`./${name}`]?.default !== target) errors.push(`package.json: Export ./${name} -> ${target} fehlt`);
}

for (const src of sources) {
  const base = src.replace(/\.tsx?$/, '');
  const js = join(root, 'dist', `${base}.js`);
  const dts = join(root, 'dist', `${base}.d.ts`);
  if (!existsSync(js)) errors.push(`${base}.js fehlt`);
  if (!existsSync(dts)) errors.push(`${base}.d.ts fehlt`);
  if (!existsSync(js)) continue;

  const srcCode = readFileSync(join(root, 'src', src), 'utf8');
  const jsCode = readFileSync(js, 'utf8');
  const wantsClient = /^['"]use client['"]/.test(srcCode.trimStart());
  const hasClient = /^['"]use client['"]/.test(jsCode.trimStart());
  if (wantsClient !== hasClient) errors.push(`${base}.js: "use client" ${wantsClient ? 'fehlt' : 'unerwartet'}`);

  for (const [, spec] of jsCode.matchAll(/from\s+['"](\.{1,2}\/[^'"]+)['"]/g)) {
    if (!spec.endsWith('.js')) errors.push(`${base}.js: relativer Import ohne .js: ${spec}`);
    else if (!existsSync(resolve(dirname(js), spec))) errors.push(`${base}.js: Import nicht gefunden: ${spec}`);
  }

  for (const [cls] of jsCode.matchAll(/[\w:-]+-\[--[\w-]+\]/g)) {
    errors.push(`${base}.js: v3-Schreibweise, in Tailwind v4 wirkungslos: ${cls}`);
  }

  try {
    await import(pathToFileURL(js).href);
  } catch (e) {
    errors.push(`${base}.js lässt sich nicht laden: ${e.message}`);
  }
}

for (const css of ['styles/index.css', 'styles/tokens.css', 'styles/base.css']) {
  if (!existsSync(join(root, 'dist', css))) errors.push(`${css} fehlt`);
}

if (errors.length) {
  console.error(`check-dist: ${errors.length} Fehler\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`check-dist: ${sources.length} Module ok`);
