import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type Project = CollectionEntry<'projects'>;
export type NewsItem = CollectionEntry<'news'>;

/** "de/p26-224-erde-saat-erbe" -> "p26-224-erde-saat-erbe" */
export const slugOf = (id: string) => id.split('/').slice(1).join('/');
const langOf = (id: string) => id.split('/')[0] as Lang;

export async function getProjects(lang: Lang) {
  const all = await getCollection('projects', (e) => langOf(e.id) === lang && !e.data.draft);
  const statusRank = { active: 0, planned: 1, completed: 2 } as const;
  return all.sort((a, b) =>
    statusRank[a.data.status] - statusRank[b.data.status] ||
    a.data.order - b.data.order ||
    (b.data.start?.getTime() ?? 0) - (a.data.start?.getTime() ?? 0));
}

export async function getNews(lang: Lang) {
  const all = await getCollection('news', (e) => langOf(e.id) === lang && !e.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Events split at build time; a nightly rebuild (GitHub Actions cron) keeps this current. */
export async function getEvents(lang: Lang, now = new Date()) {
  const items = (await getNews(lang)).filter((n) => n.data.type === 'event' && n.data.eventStart);
  const endOf = (n: NewsItem) => (n.data.eventEnd ?? n.data.eventStart!).getTime() + 24 * 3600 * 1000;
  const upcoming = items.filter((n) => endOf(n) >= now.getTime()).sort((a, b) => a.data.eventStart!.getTime() - b.data.eventStart!.getTime());
  const past = items.filter((n) => endOf(n) < now.getTime()).sort((a, b) => b.data.eventStart!.getTime() - a.data.eventStart!.getTime());
  return { upcoming, past };
}

export async function getPinned(lang: Lang, now = new Date()) {
  return (await getNews(lang)).filter((n) => n.data.pinUntil && n.data.pinUntil.getTime() + 24 * 3600 * 1000 >= now.getTime());
}

/** Find the matching entry in the other language (same file name). */
export function altSlugExists(entries: { id: string }[], slug: string, lang: Lang) {
  return entries.some((e) => e.id === `${lang}/${slug}`);
}
