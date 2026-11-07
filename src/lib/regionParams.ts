import { getProjects, slugOf } from './content';
import { programmes, type Region } from '../data/programmes';
import type { Lang } from '../i18n';

/** Static paths for /<area>/<programme>/: only programmes that have projects or services in that area. */
export async function regionProgrammeParams(lang: Lang, region: Region) {
  const all = await getProjects(lang);
  const regionOf = new Map(all.map((p) => [slugOf(p.id), p.data.programme]));
  return programmes
    .filter((p) => p.projects.some((s) => regionOf.get(s) === region) || p.services?.some((s) => s.region === region))
    .map((p) => ({ params: { programme: p.slug[lang] }, props: { programme: p.key } }));
}
