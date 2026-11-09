// Events page data: merges news files with `type: event` (detail page, registration) and the event list in
// src/data/events.ts, then splits them into upcoming / ongoing / past at build time (nightly rebuild).
import { formatDate, newsPath, projectPath, type Lang } from '../i18n';
import { getNews, slugOf, type NewsItem } from './content';
import { eventEntries, kindLabel, type EventKind } from '../data/events';

type Precision = 'day' | 'month' | 'year';
const DAY = 24 * 3600 * 1000;

export interface Ev {
  id: string;
  start: Date;
  end: Date;
  /** end of the last day, for status */
  endMs: number;
  precision: Precision;
  /** raw values for <time datetime> */
  dtStart: string;
  dtEnd?: string;
  kind: string;
  title: string;
  name: string;
  summary: string;
  place?: string;
  time?: string;
  rhythm?: string;
  note?: string;
  highlights: { dt: string; label: string; text: string }[];
  sessions: { date: Date; title: string; time?: string }[];
  newsHref?: string;
  projectHref?: string;
  image?: { src: string; alt: string };
  /** news file behind this event (upcoming/ongoing cards reuse NewsCard) */
  news?: NewsItem;
  registration?: { href: string; label: string };
}

/** 'YYYY' | 'YYYY-MM' | 'YYYY-MM-DD' -> first moment (Berlin) and precision */
function parse(s: string, endOfRange = false): { d: Date; p: Precision; last: number } {
  const [y, m, d] = s.split('-').map(Number);
  const p: Precision = d ? 'day' : m ? 'month' : 'year';
  const first = new Date(`${y}-${String(m || 1).padStart(2, '0')}-${String(d || 1).padStart(2, '0')}T00:00:00+01:00`);
  // last day of the period
  const lastDay = p === 'day' ? first : p === 'month' ? new Date(Date.UTC(y, m, 0, 0, 0, 0) - 3600 * 1000) : new Date(`${y}-12-31T00:00:00+01:00`);
  return { d: endOfRange ? lastDay : first, p, last: lastDay.getTime() + DAY - 1 };
}

function fromNews(n: NewsItem, lang: Lang): Ev {
  const d = n.data;
  const start = d.eventStart!;
  const end = d.eventEnd ?? start;
  const iso = (x: Date) => formatDate(x, 'de', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('.').reverse().join('-');
  return {
    id: `news-${slugOf(n.id)}`,
    start, end,
    endMs: end.getTime() + DAY,
    precision: 'day',
    dtStart: iso(start),
    dtEnd: formatDate(start, 'de') !== formatDate(end, 'de') ? iso(end) : undefined,
    kind: kindLabel[(d.eventKind as EventKind) ?? 'event'][lang],
    title: d.title,
    name: d.eventName ?? d.title,
    summary: d.summary,
    place: d.location,
    time: d.eventTime,
    highlights: [],
    sessions: d.sessions,
    newsHref: newsPath(lang, slugOf(n.id)),
    projectHref: d.project ? projectPath(lang, d.project) : undefined,
    image: d.image ? { src: d.image, alt: d.imageAlt ?? '' } : undefined,
    news: n,
    registration: d.registration ? { href: d.registration, label: d.registrationLabel ?? '' } : undefined,
  };
}

function fromEntry(e: (typeof eventEntries)[number], lang: Lang): Ev {
  const s = parse(e.start);
  const en = parse(e.end ?? e.start, true);
  return {
    id: e.id,
    start: s.d, end: en.d,
    endMs: en.last,
    precision: s.p,
    dtStart: e.start,
    dtEnd: e.end,
    kind: kindLabel[e.kind][lang],
    title: e.title[lang],
    name: e.title[lang],
    summary: e.summary[lang],
    place: e.place?.[lang],
    time: e.time?.[lang],
    rhythm: e.rhythm?.[lang],
    note: e.note?.[lang],
    highlights: (e.highlights ?? []).map((h) => ({ dt: h.date, label: h.label?.[lang] ?? dateText(parse(h.date).d, parse(h.date).p, lang, false), text: h.text[lang] })),
    sessions: [],
    newsHref: e.news ? newsPath(lang, e.news) : undefined,
    projectHref: e.project ? projectPath(lang, e.project) : undefined,
    image: e.image ? { src: e.image.src, alt: e.image.alt[lang] } : undefined,
  };
}

/** Date text for one point (no range). */
function dateText(d: Date, p: Precision, lang: Lang, withYear: boolean) {
  if (p === 'year') return formatDate(d, lang, { year: 'numeric' });
  if (p === 'month') return formatDate(d, lang, withYear ? { month: 'long', year: 'numeric' } : { month: 'long' });
  return formatDate(d, lang, withYear ? { day: 'numeric', month: 'long', year: 'numeric' } : { day: 'numeric', month: 'long' });
}

/** "28. September", "23. Feb.–13. März", "Apr. 2023–März 2024", "2023–2024"; the year is left out when `inYear` covers the whole range. */
export function evDate(ev: Ev, lang: Lang, inYear?: number) {
  const y = (d: Date) => Number(formatDate(d, lang, { year: 'numeric' }));
  const sameDay = formatDate(ev.start, 'de') === formatDate(ev.end, 'de');
  const ys = y(ev.start), ye = y(ev.end);
  const withYear = inYear === undefined || ys !== inYear || ye !== inYear;
  if (ev.precision === 'year') return ys === ye ? String(ys) : `${ys}–${ye}`;
  if (ev.precision === 'month') {
    const mo = (d: Date) => formatDate(d, 'de', { month: 'numeric' });
    const sameMonth = ys === ye && mo(ev.start) === mo(ev.end);
    if (sameMonth) return dateText(ev.start, 'month', lang, withYear);
    if (ys === ye) return `${formatDate(ev.start, lang, { month: 'long' })}–${formatDate(ev.end, lang, withYear ? { month: 'long', year: 'numeric' } : { month: 'long' })}`;
    return `${formatDate(ev.start, lang, { month: 'long', year: 'numeric' })}–${formatDate(ev.end, lang, { month: 'long', year: 'numeric' })}`;
  }
  if (sameDay) return dateText(ev.start, 'day', lang, withYear);
  const short: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  if (ys === ye) return `${formatDate(ev.start, lang, short)}–${formatDate(ev.end, lang, withYear ? { ...short, year: 'numeric' } : short)}`;
  return `${formatDate(ev.start, lang, { ...short, year: 'numeric' })}–${formatDate(ev.end, lang, { ...short, year: 'numeric' })}`;
}

export async function getEventPage(lang: Lang, now = new Date()) {
  const news = (await getNews(lang)).filter((n) => n.data.type === 'event' && n.data.eventStart).map((n) => fromNews(n, lang));
  const all = [...news, ...eventEntries.map((e) => fromEntry(e, lang))];
  const t = now.getTime();
  const past = all.filter((e) => e.endMs < t)
    .sort((a, b) => b.start.getTime() - a.start.getTime() || b.end.getTime() - a.end.getTime());
  const live = all.filter((e) => e.endMs >= t);
  // multi-day events that have begun are "ongoing"; everything else not past is "upcoming"
  const ongoing = live.filter((e) => e.start.getTime() <= t && e.endMs - e.start.getTime() > 2 * DAY).sort((a, b) => a.start.getTime() - b.start.getTime());
  const upcoming = live.filter((e) => !ongoing.includes(e)).sort((a, b) => a.start.getTime() - b.start.getTime());

  // Agenda: every coming date (single sessions of a series count separately)
  const agenda = [...upcoming, ...ongoing].flatMap((ev) =>
    ev.sessions.length
      ? ev.sessions.filter((s) => s.date.getTime() + DAY > t).map((s) => ({ ev, date: s.date, title: s.title, time: s.time ?? ev.time, part: `${ev.sessions.indexOf(s) + 1}/${ev.sessions.length}` }))
      : ev.start.getTime() + DAY > t && ev.precision === 'day' ? [{ ev, date: ev.start, title: '', time: ev.time, part: '' }] : [],
  ).sort((a, b) => a.date.getTime() - b.date.getTime());

  // Past by year (start year, Berlin)
  const years = new Map<number, Ev[]>();
  for (const e of past) {
    const y = Number(formatDate(e.start, lang, { year: 'numeric' }));
    years.set(y, [...(years.get(y) ?? []), e]);
  }
  return { upcoming, ongoing, past, agenda, byYear: [...years.entries()].sort((a, b) => b[0] - a[0]) };
}
