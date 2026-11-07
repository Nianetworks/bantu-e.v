// Lists every "OPEN:" marker in content, data and views – the to-do list before launch.
// Usage: npm run check:open
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(md|ts|mjs|astro)$/.test(p)) yield p;
  }
}
let n = 0;
for await (const f of walk('src')) {
  const lines = (await readFile(f, 'utf8')).split('\n');
  lines.forEach((l, i) => {
    const m = l.match(/OPEN:\s*(.*?)(-->|\*\/)?\s*$/);
    if (m) { n++; console.log(`${f}:${i + 1}  ${m[1]}`); }
  });
}
console.log(`\n${n} open item(s).`);
