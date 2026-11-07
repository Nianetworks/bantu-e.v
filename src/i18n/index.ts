export type Lang = 'de' | 'en';
export const languages: Lang[] = ['de', 'en'];

/** Page routes per language (without base path). */
export const routes = {
  home: { de: '/', en: '/en/' },
  about: { de: '/ueber-uns/', en: '/en/about/' },
  people: { de: '/menschen/', en: '/en/people/' },
  programmes: { de: '/programme/', en: '/en/programmes/' },
  international: { de: '/programme/internationale-zusammenarbeit/', en: '/en/programmes/international-cooperation/' },
  inland: { de: '/programme/inlandsarbeit/', en: '/en/programmes/work-in-germany/' },
  projects: { de: '/projekte/', en: '/en/projects/' },
  news: { de: '/aktuelles/', en: '/en/news/' },
  events: { de: '/veranstaltungen/', en: '/en/events/' },
  impact: { de: '/wirkung/', en: '/en/impact/' },
  reports: { de: '/berichte/', en: '/en/reports/' },
  downloads: { de: '/downloads/', en: '/en/downloads/' },
  shop: { de: '/shop/', en: '/en/shop/' },
  donate: { de: '/spenden/', en: '/en/donate/' },
  join: { de: '/mitmachen/', en: '/en/get-involved/' },
  contact: { de: '/kontakt/', en: '/en/contact/' },
  imprint: { de: '/impressum/', en: '/en/imprint/' },
  privacy: { de: '/datenschutz/', en: '/en/privacy/' },
  accessibility: { de: '/barrierefreiheit/', en: '/en/accessibility/' },
  easy: { de: '/einfache-sprache/', en: '/en/easy-read/' },
} as const;
export type RouteKey = keyof typeof routes;

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

/** Prefix any site-internal path with the configured base path. */
export function href(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : '/' + path}`;
}
export function r(key: RouteKey, lang: Lang, hash = ''): string {
  return href(routes[key][lang] + hash);
}
export const projectPath = (lang: Lang, slug: string) => href(`${lang === 'de' ? '/projekte/' : '/en/projects/'}${slug}/`);
export const newsPath = (lang: Lang, slug: string) => href(`${lang === 'de' ? '/aktuelles/' : '/en/news/'}${slug}/`);
export const productPath = (lang: Lang, slug: string) => href(`${lang === 'de' ? '/shop/' : '/en/shop/'}${slug}/`);

const tz = 'Europe/Berlin';
export function formatDate(d: Date, lang: Lang, opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }) {
  return new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', { timeZone: tz, ...opts }).format(d);
}
export function formatLongDate(d: Date, lang: Lang) {
  return formatDate(d, lang, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
}

/** UI strings */
export const ui = {
  de: {
    skip: 'Zum Inhalt springen',
    skipNav: 'Zur Navigation springen',
    skipFooter: 'Zum Kontakt springen',
    a11y: 'Barrierefreiheit',
    easy: 'Einfache Sprache',
    newWindow: '(öffnet in neuem Fenster)',
    overview: 'Übersicht',
    menu: 'Menü',
    close: 'Schließen',
    donate: 'Spenden',
    langName: 'Deutsch',
    otherLang: 'English',
    readMore: 'Weiterlesen',
    allProjects: 'Alle Projekte',
    allNews: 'Alle Neuigkeiten',
    allEvents: 'Alle Veranstaltungen',
    projectStatus: { active: 'Laufend', completed: 'Abgeschlossen', planned: 'In Vorbereitung' },
    programme: { international: 'Internationale Zusammenarbeit', inland: 'Inlandsarbeit' },
    type: { news: 'Neuigkeit', event: 'Veranstaltung', announcement: 'Ankündigung' },
    period: 'Laufzeit',
    location: 'Ort',
    partners: 'Partner',
    funders: 'Gefördert durch',
    code: 'Projektnummer',
    sdgs: 'Nachhaltigkeitsziele (SDGs)',
    country: 'Land',
    photoComing: 'Foto folgt',
    upcoming: 'Demnächst',
    past: 'Vergangene Veranstaltungen',
    noUpcoming: 'Zurzeit sind keine Termine geplant. Neue Veranstaltungen kündigen wir hier und auf Instagram an.',
    register: 'Anmeldung',
    when: 'Wann',
    where: 'Wo',
    cost: 'Kosten',
    backTo: 'Zurück zu',
    contact: 'Kontakt',
    footerAbout: 'Gemeinnütziger Verein für globale Bildung, Gerechtigkeit und Zusammenarbeit – in Berlin und in der Region der Großen Seen Ostafrikas.',
    newsletterHint: 'Neuigkeiten per E-Mail? Schreiben Sie uns kurz – wir nehmen Sie in unseren Verteiler auf.',
    priceTbd: 'Preis folgt',
    comingSoon: 'Bald erhältlich',
    buy: 'Jetzt kaufen',
    notify: 'Vormerken',
    shopClosedNote: 'Der Online-Shop öffnet in Kürze. Sie können Produkte schon jetzt per E-Mail vormerken.',
    copy: 'Kopieren',
    copied: 'Kopiert',
    sources: 'Quelle',
    page: 'Seite',
    breadcrumbHome: 'Start',
  },
  en: {
    skip: 'Skip to content',
    skipNav: 'Skip to navigation',
    skipFooter: 'Skip to contact',
    a11y: 'Accessibility',
    easy: 'Easy read',
    newWindow: '(opens in a new window)',
    overview: 'Overview',
    menu: 'Menu',
    close: 'Close',
    donate: 'Donate',
    langName: 'English',
    otherLang: 'Deutsch',
    readMore: 'Read more',
    allProjects: 'All projects',
    allNews: 'All news',
    allEvents: 'All events',
    projectStatus: { active: 'Ongoing', completed: 'Completed', planned: 'In preparation' },
    programme: { international: 'International cooperation', inland: 'Work in Germany' },
    type: { news: 'News', event: 'Event', announcement: 'Announcement' },
    period: 'Duration',
    location: 'Location',
    partners: 'Partners',
    funders: 'Funded by',
    code: 'Project number',
    sdgs: 'Sustainable Development Goals',
    country: 'Country',
    photoComing: 'Photo coming soon',
    upcoming: 'Upcoming',
    past: 'Past events',
    noUpcoming: 'No events are scheduled right now. We announce new events here and on Instagram.',
    register: 'Registration',
    when: 'When',
    where: 'Where',
    cost: 'Cost',
    backTo: 'Back to',
    contact: 'Contact',
    footerAbout: 'Non-profit association for global education, justice and cooperation – in Berlin and in the Great Lakes region of East Africa.',
    newsletterHint: 'Want news by e-mail? Drop us a line and we will add you to our mailing list.',
    priceTbd: 'Price to follow',
    comingSoon: 'Coming soon',
    buy: 'Buy now',
    notify: 'Reserve',
    shopClosedNote: 'The online shop opens soon. You can already reserve products by e-mail.',
    copy: 'Copy',
    copied: 'Copied',
    sources: 'Source',
    page: 'Page',
    breadcrumbHome: 'Home',
  },
} as const;

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export function mainNav(lang: Lang): NavItem[] {
  const de = lang === 'de';
  return [
    {
      label: de ? 'Über uns' : 'About',
      href: r('about', lang),
      children: [
        { label: de ? 'Wer wir sind' : 'Who we are', href: r('about', lang) },
        { label: de ? 'Menschen' : 'People', href: r('people', lang) },
        { label: de ? 'Partner & Förderer' : 'Partners & funders', href: r('people', lang, de ? '#partner' : '#partners') },
        { label: de ? 'Transparenz' : 'Transparency', href: r('reports', lang, de ? '#transparenz' : '#transparency') },
      ],
    },
    {
      label: de ? 'Programme' : 'Programmes',
      href: r('programmes', lang),
      children: [
        { label: de ? 'Internationale Zusammenarbeit' : 'International cooperation', href: r('international', lang) },
        { label: de ? 'Inlandsarbeit' : 'Work in Germany', href: r('inland', lang) },
        { label: de ? 'Alle Projekte' : 'All projects', href: r('projects', lang) },
      ],
    },
    {
      label: de ? 'Aktuelles' : 'News',
      href: r('news', lang),
      children: [
        { label: de ? 'Neuigkeiten' : 'Latest news', href: r('news', lang) },
        { label: de ? 'Veranstaltungen' : 'Events', href: r('events', lang) },
      ],
    },
    {
      label: de ? 'Wirkung' : 'Impact',
      href: r('impact', lang),
      children: [
        { label: de ? 'Erfolgsgeschichten' : 'Success stories', href: r('impact', lang) },
        { label: de ? 'Jahres- & Transparenzberichte' : 'Annual & transparency reports', href: r('reports', lang) },
        { label: 'Downloads', href: r('downloads', lang) },
      ],
    },
    { label: 'Shop', href: r('shop', lang) },
    {
      label: de ? 'Mitmachen' : 'Get involved',
      href: r('join', lang),
      children: [
        { label: de ? 'Mitglied werden' : 'Become a member', href: r('join', lang, '#membership') },
        { label: de ? 'Ehrenamt' : 'Volunteer', href: r('join', lang, '#volunteer') },
        { label: de ? 'Kooperationen' : 'Partner with us', href: r('join', lang, '#cooperation') },
        { label: de ? 'Kontakt' : 'Contact', href: r('contact', lang) },
      ],
    },
  ];
}
