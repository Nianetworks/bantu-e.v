// Post-build clean-up of the generated HTML in dist/:
// 1. Removes internal "<!-- OPEN: … -->" notes from Markdown/templates so they never reach the public.
// 2. For the preview at https://<user>.github.io/<repo>/ (BASE_PATH set), prefixes root-relative
//    links from Markdown content ("/downloads/…") with the base path. Components already do this.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const esc = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const linkRe = base ? new RegExp(`(href|src)="/(?!/|${esc.slice(1)}/)`, 'g') : null;
const openRe = /<!--\s*OPEN:[\s\S]*?-->/g;

async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(p);
    else if (p.endsWith('.html')) yield p;
  }
}
let changed = 0;
for await (const f of files('dist')) {
  const html = await readFile(f, 'utf8');
  let out = html.replace(openRe, '');
  if (linkRe) out = out.replace(linkRe, `$1="${base}/`);
  if (out !== html) { await writeFile(f, out); changed++; }
}
console.log(`postbuild: cleaned ${changed} HTML files${base ? ` (base path ${base})` : ''}`);
