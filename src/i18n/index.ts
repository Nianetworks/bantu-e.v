export type Lang = 'de' | 'en' | 'fr';
export const languages: Lang[] = ['de', 'en', 'fr'];
export const langNames: Record<Lang, string> = { de: 'Deutsch', en: 'English', fr: 'Français' };

/** Page routes per language (without base path). */
export const routes = {
  home: { de: '/', en: '/en/', fr: '/fr/' },
  about: { de: '/ueber-uns/', en: '/en/about/', fr: '/fr/a-propos/' },
  people: { de: '/menschen/', en: '/en/people/', fr: '/fr/equipe/' },
  programmes: { de: '/programme/', en: '/en/programmes/', fr: '/fr/programmes/' },
  inland: { de: '/inlandsarbeit/', en: '/en/work-in-germany/', fr: '/fr/travail-en-allemagne/' },
  international: { de: '/auslandsarbeit/', en: '/en/international-cooperation/', fr: '/fr/cooperation-internationale/' },
  projects: { de: '/projekte/', en: '/en/projects/', fr: '/fr/projets/' },
  news: { de: '/aktuelles/', en: '/en/news/', fr: '/fr/actualites/' },
  events: { de: '/veranstaltungen/', en: '/en/events/', fr: '/fr/evenements/' },
  impact: { de: '/wirkung/', en: '/en/impact/', fr: '/fr/impact/' },
  reports: { de: '/berichte/', en: '/en/reports/', fr: '/fr/rapports/' },
  downloads: { de: '/downloads/', en: '/en/downloads/', fr: '/fr/telechargements/' },
  shop: { de: '/shop/', en: '/en/shop/', fr: '/fr/boutique/' },
  donate: { de: '/spenden/', en: '/en/donate/', fr: '/fr/faire-un-don/' },
  join: { de: '/mitmachen/', en: '/en/get-involved/', fr: '/fr/s-engager/' },
  contact: { de: '/kontakt/', en: '/en/contact/', fr: '/fr/contact/' },
  imprint: { de: '/impressum/', en: '/en/imprint/', fr: '/fr/mentions-legales/' },
  privacy: { de: '/datenschutz/', en: '/en/privacy/', fr: '/fr/confidentialite/' },
  accessibility: { de: '/barrierefreiheit/', en: '/en/accessibility/', fr: '/fr/accessibilite/' },
  easy: { de: '/einfache-sprache/', en: '/en/easy-read/', fr: '/fr/facile-a-lire/' },
  offers: { de: '/bildungsangebote/', en: '/en/education-offers/', fr: '/fr/formations/' },
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
export const projectPath = (lang: Lang, slug: string) => href(`${routes.projects[lang]}${slug}/`);
export const newsPath = (lang: Lang, slug: string) => href(`${routes.news[lang]}${slug}/`);
/** Anchor of the "completed projects" archive on the all-projects page. */
export const archiveId: Record<Lang, string> = { de: 'archiv', en: 'archive', fr: 'archives' };
export const archiveLabel: Record<Lang, string> = { de: 'Archiv: abgeschlossene Projekte', en: 'Archive: completed projects', fr: 'Archives : projets terminés' };
export const productPath = (lang: Lang, slug: string) => href(`${routes.shop[lang]}${slug}/`);

const tz = 'Europe/Berlin';
export function formatDate(d: Date, lang: Lang, opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }) {
  return new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : lang === 'fr' ? 'fr-FR' : 'en-GB', { timeZone: tz, ...opts }).format(d);
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
    language: 'Sprache',
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
    footerAbout: 'Gemeinnütziger Verein für globale Bildung, Gerechtigkeit und Zusammenarbeit, in Berlin und in der Region der Großen Seen Ostafrikas.',
    newsletterHint: 'Neuigkeiten per E-Mail? Schreiben Sie uns kurz. Wir nehmen Sie in unseren Verteiler auf.',
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
    language: 'Language',
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
    footerAbout: 'Non-profit association for global education, justice and cooperation, in Berlin and in the Great Lakes region of East Africa.',
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
  fr: {
    skip: 'Aller au contenu',
    skipNav: 'Aller à la navigation',
    skipFooter: 'Aller au contact',
    a11y: 'Accessibilité',
    easy: 'Facile à lire',
    newWindow: '(s’ouvre dans une nouvelle fenêtre)',
    overview: 'Vue d’ensemble',
    menu: 'Menu',
    close: 'Fermer',
    donate: 'Faire un don',
    langName: 'Français',
    otherLang: 'Deutsch',
    language: 'Langue',
    readMore: 'Lire la suite',
    allProjects: 'Tous les projets',
    allNews: 'Toutes les actualités',
    allEvents: 'Tous les événements',
    projectStatus: { active: 'En cours', completed: 'Terminé', planned: 'En préparation' },
    programme: { international: 'Coopération internationale', inland: 'Travail en Allemagne' },
    type: { news: 'Actualité', event: 'Événement', announcement: 'Annonce' },
    period: 'Durée',
    location: 'Lieu',
    partners: 'Partenaires',
    funders: 'Financé par',
    code: 'Numéro de projet',
    sdgs: 'Objectifs de développement durable',
    country: 'Pays',
    photoComing: 'Photo à venir',
    upcoming: 'À venir',
    past: 'Événements passés',
    noUpcoming: 'Aucun événement n’est prévu pour le moment. Nous annonçons les nouveaux événements ici et sur Instagram.',
    register: 'Inscription',
    when: 'Quand',
    where: 'Où',
    cost: 'Coût',
    backTo: 'Retour à',
    contact: 'Contact',
    footerAbout: 'Association d’intérêt général pour l’éducation globale, la justice et la coopération, à Berlin et dans la région des Grands Lacs d’Afrique de l’Est.',
    newsletterHint: 'Des nouvelles par e-mail ? Écrivez-nous un mot et nous vous ajoutons à notre liste de diffusion.',
    priceTbd: 'Prix à venir',
    comingSoon: 'Bientôt disponible',
    buy: 'Acheter',
    notify: 'Réserver',
    shopClosedNote: 'La boutique en ligne ouvre bientôt. Vous pouvez déjà réserver des produits par e-mail.',
    copy: 'Copier',
    copied: 'Copié',
    sources: 'Source',
    page: 'Page',
    breadcrumbHome: 'Accueil',
  },
} as const;

export type NavItem = { label: string; short?: string; href: string; mega?: 'inland' | 'international'; children?: { label: string; href: string }[] };

export function mainNav(lang: Lang): NavItem[] {
  const de = lang === 'de';
  const fr = lang === 'fr';
  return [
    {
      label: de ? 'Über uns' : fr ? 'À propos' : 'About',
      href: r('about', lang),
      children: [
        { label: de ? 'Wer wir sind' : fr ? 'Qui nous sommes' : 'Who we are', href: r('about', lang) },
        { label: de ? 'Vorstand und Team' : fr ? 'Conseil d’administration et équipe' : 'Board and team', href: r('people', lang) },
        { label: de ? 'Partner und Förderer' : fr ? 'Partenaires et bailleurs' : 'Partners and funders', href: r('people', lang, de ? '#partner' : '#partners') },
        { label: de ? 'Alle Programme im Überblick' : fr ? 'Tous les programmes en bref' : 'All programmes at a glance', href: r('programmes', lang) },
        { label: de ? 'Transparenz' : fr ? 'Transparence' : 'Transparency', href: r('reports', lang, de ? '#transparenz' : '#transparency') },
      ],
    },
    { label: de ? 'Inlandsarbeit' : fr ? 'Travail en Allemagne' : 'Work in Germany', short: fr ? 'En Allemagne' : undefined, href: r('inland', lang), mega: 'inland' },
    { label: de ? 'Internationale Zusammenarbeit' : fr ? 'Coopération internationale' : 'International Cooperation', href: r('international', lang), mega: 'international' },
    {
      label: de ? 'Wirkung' : fr ? 'Impact' : 'Impact',
      href: r('impact', lang),
      children: [
        { label: de ? 'Unsere Wirkung im Überblick' : fr ? 'Notre impact en bref' : 'Our impact at a glance', href: r('impact', lang) },
        { label: de ? 'Wirkung in Zahlen' : fr ? 'L’impact en chiffres' : 'Impact in numbers', href: r('impact', lang, '#zahlen') },
        { label: de ? 'Beitrag zu den Nachhaltigkeitszielen' : fr ? 'Contribution aux ODD' : 'Contribution to the SDGs', href: r('impact', lang, '#sdg') },
        { label: de ? 'Erfolgsgeschichten' : fr ? 'Réussites' : 'Success stories', href: r('impact', lang, '#geschichten') },
        { label: de ? 'Jahres- und Transparenzberichte' : fr ? 'Rapports annuels et de transparence' : 'Annual and transparency reports', href: r('reports', lang) },
        { label: 'Downloads', href: r('downloads', lang) },
      ],
    },
    {
      label: de ? 'Aktuelles' : fr ? 'Actualités' : 'News',
      href: r('news', lang),
      children: [
        { label: de ? 'Neuigkeiten' : fr ? 'Dernières nouvelles' : 'Latest news', href: r('news', lang) },
        { label: de ? 'Veranstaltungen' : fr ? 'Événements' : 'Events', href: r('events', lang) },
      ],
    },
    {
      label: de ? 'Mitmachen' : fr ? 'S’engager' : 'Get involved',
      href: r('join', lang),
      children: [
        { label: de ? 'Mitglied werden' : fr ? 'Devenir membre' : 'Become a member', href: r('join', lang, '#membership') },
        { label: de ? 'Ehrenamt' : fr ? 'Bénévolat' : 'Volunteer', href: r('join', lang, '#volunteer') },
        { label: de ? 'Bildungsangebote anfragen' : fr ? 'Demander un atelier ou une formation' : 'Book a workshop or training', href: r('offers', lang) },
        { label: de ? 'Kooperationen' : fr ? 'Coopérer avec nous' : 'Partner with us', href: r('join', lang, '#cooperation') },
        { label: de ? 'Kontakt' : fr ? 'Contact' : 'Contact', href: r('contact', lang) },
      ],
    },
    // Charity shop as its own top-level item, right before the donate button (chair's decision 08.11.2026).
    { label: fr ? 'Boutique' : 'Shop', href: r('shop', lang) },
  ];
}
