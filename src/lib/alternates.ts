// Maps every page URL to the same page in the other languages (for the language switch and hreflang).
import { getCollection } from 'astro:content';
import { href, languages, newsPath, productPath, projectPath, routes, type Lang } from '../i18n';
import { programmes, regions, programmePath, regionProgrammePath } from '../data/programmes';
import { products } from '../data/shop';

type Alts = Partial<Record<Lang, string>>;
let table: Map<string, Alts> | null = null;
const norm = (p: string) => (p.endsWith('/') || /\.[a-z0-9]+$/i.test(p) ? p : p + '/');
const all = (f: (l: Lang) => string): Alts => Object.fromEntries(languages.map((l) => [l, f(l)]));

async function build() {
  const groups: Alts[] = [];
  for (const key of Object.keys(routes) as (keyof typeof routes)[]) groups.push(all((l) => href(routes[key][l])));
  for (const p of programmes) {
    groups.push(all((l) => programmePath(l, p.key)));
    for (const rg of regions) groups.push(all((l) => regionProgrammePath(l, rg.key, p.key)));
  }
  for (const p of products) groups.push(all((l) => productPath(l, p.slug)));
  for (const [coll, path] of [['projects', projectPath], ['news', newsPath]] as const) {
    const entries = await getCollection(coll);
    const bySlug = new Map<string, Lang[]>();
    for (const e of entries) {
      const [l, ...rest] = e.id.split('/');
      const slug = rest.join('/');
      bySlug.set(slug, [...(bySlug.get(slug) ?? []), l as Lang]);
    }
    for (const [slug, langs] of bySlug) groups.push(Object.fromEntries(langs.map((l) => [l, path(l, slug)])));
  }
  const t = new Map<string, Alts>();
  for (const g of groups) for (const u of Object.values(g)) if (u) t.set(norm(u), g);
  return t;
}

/** Same page in every language that has it. */
export async function alternatesFor(pathname: string): Promise<Alts> {
  table ??= await build();
  return table.get(norm(pathname)) ?? {};
}
