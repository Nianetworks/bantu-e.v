// One-off export of the old WordPress site (bantu-ev.org, Elementor) before the DNS switch.
// Run on a computer with normal internet access:   npm run migrate:wp
// Result (not committed, see .gitignore):
//   migration/wordpress-export/*.json   – all pages/posts/media metadata (DE + EN)
//   migration/wordpress-media/…         – every file from wp-content/uploads
//   migration/MEDIA_INDEX.md            – overview to pick photos for the new site
// Then copy the chosen photos (with consent!) to public/images/… and reference them in content.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const SITE = process.env.WP_SITE || 'https://www.bantu-ev.org';
const ROOTS = ['', '/de'];
const OUT = 'migration';

async function getAll(root, type) {
  const items = [];
  for (let page = 1; page < 50; page++) {
    const res = await fetch(`${SITE}${root}/wp-json/wp/v2/${type}?per_page=100&page=${page}`);
    if (!res.ok) break;
    const batch = await res.json();
    items.push(...batch);
    if (batch.length < 100) break;
  }
  return items;
}

await mkdir(join(OUT, 'wordpress-export'), { recursive: true });
const index = ['# WordPress media index', '', `Exported ${new Date().toISOString()} from ${SITE}`, '', '| File | Date | Alt text | Used on |', '|---|---|---|---|'];
const seen = new Set();
for (const root of ROOTS) {
  for (const type of ['pages', 'posts', 'media']) {
    const items = await getAll(root, type);
    const name = `${root.replace('/', '') || 'en'}-${type}.json`;
    await writeFile(join(OUT, 'wordpress-export', name), JSON.stringify(items, null, 2));
    console.log(`${name}: ${items.length}`);
    if (type !== 'media') continue;
    for (const m of items) {
      const url = m.source_url;
      if (!url || seen.has(url)) continue;
      seen.add(url);
      const rel = url.split('/wp-content/uploads/')[1] ?? url.split('/').pop();
      const target = join(OUT, 'wordpress-media', rel);
      await mkdir(dirname(target), { recursive: true });
      const res = await fetch(url);
      if (res.ok) await writeFile(target, Buffer.from(await res.arrayBuffer()));
      index.push(`| ${rel} | ${m.date?.slice(0, 10) ?? ''} | ${(m.alt_text || '').replace(/\|/g, '/')} | ${m.post ?? ''} |`);
    }
  }
}
await writeFile(join(OUT, 'MEDIA_INDEX.md'), index.join('\n') + '\n');
console.log(`Downloaded ${seen.size} media files to ${OUT}/wordpress-media`);
