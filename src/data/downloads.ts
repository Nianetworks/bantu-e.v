// Downloads shown on /berichte/ (groups reports + projectReports) and /downloads/ (forms and flyers). Files live in public/downloads/.
// Only publish documents made for the public (the "Website" versions of reports).
// Brand assets (logos, brand guidelines) are no longer offered on the website (chair, 09.11.2026, audit); the files in
// public/downloads/logos/ stay reachable by direct link for partners who already have them.
type L = { de: string; en: string; fr: string };
export type Download = { title: L; file: string; lang: 'DE' | 'EN' | 'FR' | 'DE/EN'; size: string; group: 'reports' | 'projectReports' | 'membership' | 'flyer'; year?: number; version?: string; kind?: 'annual' | 'transparency' | 'project' };
/** Cover image of a report: first page of the PDF, rendered to public/images/berichte/<file name>.webp (480 px wide, 09.11.2026). */
export const coverFor = (d: Download) => `/images/berichte/${d.file.split('/').pop()!.replace(/\.pdf$/, '')}.webp`;

/** Membership application forms (chair, 09.11.2026): one PDF per language, return address = Postfach 120344, 10593 Berlin.
 *  `version` is appended as ?v= to every link so browsers fetch the new file although PDFs are cached for 30 days. */
export const membershipFormVersion = '2026-11-09';
export const membershipForms: { lang: 'de' | 'en' | 'fr'; file: string; size: string; name: string; label: string }[] = [
  { lang: 'de', file: '/downloads/mitgliedschaft/bantu-ev-mitgliedsantrag-de.pdf', size: '0,4 MB', name: 'Deutsch', label: 'Mitgliedsantrag herunterladen (PDF)' },
  { lang: 'en', file: '/downloads/mitgliedschaft/bantu-ev-membership-form-en.pdf', size: '0,3 MB', name: 'English', label: 'Download membership application (PDF)' },
  { lang: 'fr', file: '/downloads/mitgliedschaft/bantu-ev-formulaire-adhesion-fr.pdf', size: '0,4 MB', name: 'Français', label: 'Télécharger le formulaire d’adhésion (PDF)' },
];
/** Append the cache-busting version to an already resolved href. */
export const withVersion = (url: string, version?: string) => (version ? `${url}?v=${version}` : url);
const report = (year: number, size: { ar: string; tr: string }): Download[] => [
  { group: 'reports', kind: 'annual', year, lang: 'DE', size: `${size.ar} MB`, file: `/downloads/berichte/bantu-ev-jahresbericht-${year}-de.pdf`, title: { de: `Jahresbericht ${year}`, en: `Annual report ${year} (German)`, fr: `Rapport annuel ${year} (allemand)` } },
  { group: 'reports', kind: 'annual', year, lang: 'EN', size: `${size.ar} MB`, file: `/downloads/berichte/bantu-ev-annual-report-${year}-en.pdf`, title: { de: `Annual Report ${year} (Englisch)`, en: `Annual report ${year}`, fr: `Rapport annuel ${year} (anglais)` } },
  { group: 'reports', kind: 'transparency', year, lang: 'DE', size: `${size.tr} MB`, file: `/downloads/berichte/bantu-ev-transparenzbericht-${year}-de.pdf`, title: { de: `Transparenzbericht ${year}`, en: `Transparency report ${year} (German)`, fr: `Rapport de transparence ${year} (allemand)` } },
  { group: 'reports', kind: 'transparency', year, lang: 'EN', size: `${size.tr} MB`, file: `/downloads/berichte/bantu-ev-transparency-report-${year}-en.pdf`, title: { de: `Transparency Report ${year} (Englisch)`, en: `Transparency report ${year}`, fr: `Rapport de transparence ${year} (anglais)` } },
];

export const downloads: Download[] = [
  ...report(2025, { ar: '0,3', tr: '0,3' }),
  ...report(2024, { ar: '0,3', tr: '0,3' }),
  ...report(2023, { ar: '0,3', tr: '0,3' }),
  ...report(2022, { ar: '0,3', tr: '0,3' }),
  ...report(2021, { ar: '0,3', tr: '0,3' }),
  ...report(2020, { ar: '0,3', tr: '0,3' }),
  // Project reports (public editions). EDIRI pilot 2023 (P 23/91): three languages generated from one template, 09.11.2026.
  { group: 'projectReports', kind: 'project', year: 2023, lang: 'DE', size: '1,7 MB', file: '/downloads/berichte/bantu-ev-ediri-pilotbericht-2023-de.pdf', title: { de: 'EDIRI-Pilotprojekt zu Zerebralparese, Fortschrittsbericht Juni bis September 2023 (P 23/91)', en: 'Cerebral palsy EDIRI pilot project, progress report June to September 2023, German (P 23/91)', fr: 'Projet pilote EDIRI sur la paralysie cérébrale, rapport d’avancement juin à septembre 2023, allemand (P 23/91)' } },
  { group: 'projectReports', kind: 'project', year: 2023, lang: 'EN', size: '1,7 MB', file: '/downloads/berichte/bantu-ev-ediri-pilot-report-2023-en.pdf', title: { de: 'Cerebral palsy EDIRI pilot project, progress report June to September 2023, Englisch (P 23/91)', en: 'Cerebral palsy EDIRI pilot project, progress report June to September 2023 (P 23/91)', fr: 'Projet pilote EDIRI sur la paralysie cérébrale, rapport d’avancement juin à septembre 2023, anglais (P 23/91)' } },
  { group: 'projectReports', kind: 'project', year: 2023, lang: 'FR', size: '1,7 MB', file: '/downloads/berichte/bantu-ev-ediri-rapport-pilote-2023-fr.pdf', title: { de: 'Projet pilote EDIRI sur la paralysie cérébrale, Fortschrittsbericht Juni bis September 2023, Französisch (P 23/91)', en: 'Cerebral palsy EDIRI pilot project, progress report June to September 2023, French (P 23/91)', fr: 'Projet pilote EDIRI sur la paralysie cérébrale, rapport d’avancement juin à septembre 2023 (P 23/91)' } },
  { group: 'membership', lang: 'DE', size: '0,4 MB', version: membershipFormVersion, file: '/downloads/mitgliedschaft/bantu-ev-mitgliedsantrag-de.pdf', title: { de: 'Mitgliedsantrag (Deutsch)', en: 'Membership application (German)', fr: 'Formulaire d’adhésion (allemand)' } },
  { group: 'membership', lang: 'EN', size: '0,3 MB', version: membershipFormVersion, file: '/downloads/mitgliedschaft/bantu-ev-membership-form-en.pdf', title: { de: 'Membership application (Englisch)', en: 'Membership application (English)', fr: 'Formulaire d’adhésion (anglais)' } },
  { group: 'membership', lang: 'FR', size: '0,4 MB', version: membershipFormVersion, file: '/downloads/mitgliedschaft/bantu-ev-formulaire-adhesion-fr.pdf', title: { de: 'Formulaire d’adhésion (Französisch)', en: 'Membership application (French)', fr: 'Formulaire d’adhésion (français)' } },
  { group: 'flyer', lang: 'EN', size: '0,2 MB', file: '/downloads/flyer/bantu-ev-flyer-2024.pdf', title: { de: 'Vereinsflyer „Building Our Communities Together“ (2024)', en: 'Association flyer “Building Our Communities Together” (2024)', fr: 'Dépliant de l’association « Building Our Communities Together » (2024)' } },
  // OPEN: Ubuntu Talks flyer removed 07.11.2026 – it shows 15.11.2026; add the corrected flyer (22.11.2026) here.
];

export const groups: { id: Download['group']; title: L; intro?: L }[] = [
  { id: 'reports', title: { de: 'Jahres- und Transparenzberichte', en: 'Annual and transparency reports', fr: 'Rapports annuels et de transparence' } },
  { id: 'projectReports', title: { de: 'Projektberichte', en: 'Project reports', fr: 'Rapports de projet' }, intro: { de: 'Berichte unserer Partnerorganisationen zu einzelnen Projekten, aufbereitet für die Website. Gesichter von Kindern auf Fotos sind unkenntlich gemacht.', en: 'Reports by our partner organisations on individual projects, edited for the website. Children’s faces in photographs are blurred.', fr: 'Rapports de nos organisations partenaires sur des projets précis, édités pour le site web. Les visages des enfants sur les photos sont floutés.' } },
  { id: 'membership', title: { de: 'Mitgliedschaft', en: 'Membership', fr: 'Adhésion' }, intro: { de: 'Ausgefüllt per Post an Bantu e.V., Postfach 120344, 10593 Berlin (unsere Postanschrift, nicht die Büroadresse Kameruner Straße 1) oder eingescannt per E-Mail an info@bantu-ev.org. Formulare auf Deutsch, Englisch und Französisch.', en: 'Send the completed form by post to Bantu e.V., Postfach 120344, 10593 Berlin, Germany (our postal address, not the office address Kameruner Straße 1), or scan it and e-mail it to info@bantu-ev.org. Forms in German, English and French.', fr: 'Envoyez le formulaire rempli par courrier à Bantu e.V., Postfach 120344, 10593 Berlin, Allemagne (notre adresse postale, et non l’adresse du bureau Kameruner Straße 1), ou scanné par e-mail à info@bantu-ev.org. Formulaires en allemand, anglais et français.' } },
  { id: 'flyer', title: { de: 'Flyer', en: 'Flyers', fr: 'Dépliants' } },
];
