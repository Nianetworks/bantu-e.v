// Structured data (Schema.org JSON-LD) for search engines.
// Base.astro always outputs one @graph with the organisation (NGO) and the website. Pages can add
// further nodes (e.g. events) through the `schema` prop. Every fact comes from src/data/site.ts or from
// the content files; nothing is written here by hand.
import { href, newsPath, r, ui, type Lang } from '../i18n';
import { org } from '../data/site';
import { slugOf, type NewsItem } from './content';

type Node = Record<string, unknown>;
const SITE = 'https://www.bantu-ev.org';
/** Absolute URL for a file path in public/ (base path added here). */
const abs = (path: string, site?: URL) => new URL(href(path), site ?? SITE).toString();
/** Absolute URL for a page path that already went through r()/newsPath() (base path already included). */
const absPage = (path: string, site?: URL) => new URL(path, site ?? SITE).toString();
export const orgId = `${SITE}/#organization`;
export const websiteId = `${SITE}/#website`;

/** ISO 8601 with the Berlin offset (e.g. 2026-11-15T11:00:00+01:00), as people expect for local events. */
export function berlinIso(d: Date): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23', timeZoneName: 'longOffset' })
      .formatToParts(d).map((p) => [p.type, p.value]),
  );
  const offset = (parts.timeZoneName || 'GMT+00:00').replace('GMT', '') || '+00:00';
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${offset}`;
}

export function organisationGraph(lang: Lang, site?: URL): Node[] {
  return [
    {
      '@type': 'NGO',
      '@id': orgId,
      name: org.legalName,
      alternateName: [org.shortName, org.legalNameEn],
      url: absPage(r('home', lang), site),
      logo: { '@type': 'ImageObject', url: abs('/brand/bantu-logo.png', site), width: 120, height: 142 },
      image: abs('/brand/og-default.jpg', site),
      slogan: org.tagline[lang],
      description: ui[lang].footerAbout,
      foundingDate: String(org.founded),
      email: org.email,
      telephone: org.officePhone.replace(' (0)', ' '),
      address: [
        { '@type': 'PostalAddress', streetAddress: org.address.street, postalCode: org.address.zip, addressLocality: org.address.city, addressCountry: 'DE' },
        { '@type': 'PostalAddress', postOfficeBoxNumber: org.postbox.line.replace(/\D/g, ''), postalCode: org.postbox.zip, addressLocality: org.postbox.city, addressCountry: 'DE' },
      ],
      areaServed: [
        { '@type': 'Country', name: 'Germany' },
        { '@type': 'Country', name: 'Uganda' },
        { '@type': 'Country', name: 'Burundi' },
      ],
      sameAs: org.socials.map((s) => s.url),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${SITE}/`,
      name: org.shortName,
      inLanguage: ['de', 'en', 'fr'],
      publisher: { '@id': orgId },
    },
  ];
}

/** "VHS Berlin Mitte, Linienstraße 162, 10115 Berlin, room 2.02" -> Place with a structured address. */
function place(location: string): Node {
  const parts = location.split(/,\s*/);
  const z = parts.findIndex((p) => /^\d{5}\s/.test(p));
  if (z >= 2) {
    const [postalCode, ...city] = parts[z].split(/\s+/);
    return {
      '@type': 'Place',
      name: parts.slice(0, z - 1).join(', '),
      address: { '@type': 'PostalAddress', streetAddress: parts[z - 1], postalCode, addressLocality: city.join(' '), addressCountry: 'DE' },
    };
  }
  return { '@type': 'Place', name: location, address: location };
}

/** Event node for a news item of type "event" (only when start date and location are set). */
export function eventNode(item: NewsItem, lang: Lang, site?: URL): Node | null {
  const d = item.data;
  if (d.type !== 'event' || !d.eventStart || !d.location) return null;
  const free = /free|kostenlos|frei|gratuit|libre/i.test(d.cost ?? '');
  // "… and online" / "… und online" / "… et en ligne": venue plus video conference.
  const online = /\bonline\b|en ligne/i.test(d.location);
  const venue = place(d.location);
  return {
    '@type': 'Event',
    '@id': `${absPage(newsPath(lang, slugOf(item.id)), site)}#event`,
    name: d.title,
    description: d.summary,
    url: absPage(newsPath(lang, slugOf(item.id)), site),
    startDate: berlinIso(d.eventStart),
    ...(d.eventEnd ? { endDate: berlinIso(d.eventEnd) } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: `https://schema.org/${online ? 'Mixed' : 'Offline'}EventAttendanceMode`,
    location: online ? [venue, { '@type': 'VirtualLocation', name: 'Online' }] : venue,
    ...(d.image ? { image: [abs(d.image, site)] } : {}),
    inLanguage: lang,
    ...(free ? { isAccessibleForFree: true } : {}),
    organizer: { '@id': orgId },
  };
}
