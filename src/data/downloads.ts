// Downloads shown on /downloads/ and /berichte/. Files live in public/downloads/.
// Only publish documents made for the public (the "Website" versions of reports).
type L = { de: string; en: string; fr: string };
export type Download = { title: L; file: string; lang: 'DE' | 'EN' | 'DE/EN'; size: string; group: 'reports' | 'membership' | 'flyer' | 'brand'; year?: number };

const report = (year: number, size: { ar: string; tr: string }): Download[] => [
  { group: 'reports', year, lang: 'DE', size: `${size.ar} MB`, file: `/downloads/berichte/bantu-ev-jahresbericht-${year}-de.pdf`, title: { de: `Jahresbericht ${year}`, en: `Annual report ${year} (German)`, fr: `Rapport annuel ${year} (allemand)` } },
  { group: 'reports', year, lang: 'EN', size: `${size.ar} MB`, file: `/downloads/berichte/bantu-ev-annual-report-${year}-en.pdf`, title: { de: `Annual Report ${year} (Englisch)`, en: `Annual report ${year}`, fr: `Rapport annuel ${year} (anglais)` } },
  { group: 'reports', year, lang: 'DE', size: `${size.tr} MB`, file: `/downloads/berichte/bantu-ev-transparenzbericht-${year}-de.pdf`, title: { de: `Transparenzbericht ${year}`, en: `Transparency report ${year} (German)`, fr: `Rapport de transparence ${year} (allemand)` } },
  { group: 'reports', year, lang: 'EN', size: `${size.tr} MB`, file: `/downloads/berichte/bantu-ev-transparency-report-${year}-en.pdf`, title: { de: `Transparency Report ${year} (Englisch)`, en: `Transparency report ${year}`, fr: `Rapport de transparence ${year} (anglais)` } },
];

export const downloads: Download[] = [
  ...report(2025, { ar: '0,3', tr: '0,3' }),
  ...report(2024, { ar: '0,3', tr: '0,3' }),
  ...report(2023, { ar: '0,3', tr: '0,3' }),
  ...report(2022, { ar: '0,3', tr: '0,3' }),
  ...report(2021, { ar: '0,3', tr: '0,3' }),
  ...report(2020, { ar: '0,3', tr: '0,3' }),
  { group: 'membership', lang: 'DE', size: '0,1 MB', file: '/downloads/mitgliedschaft/bantu-ev-mitgliedsantrag-de.pdf', title: { de: 'Mitgliedsantrag', en: 'Membership form (German)', fr: 'Formulaire d’adhésion (allemand)' } },
  { group: 'membership', lang: 'EN', size: '0,2 MB', file: '/downloads/mitgliedschaft/bantu-ev-membership-form-en.pdf', title: { de: 'Membership application (Englisch, mit SEPA-Mandat)', en: 'Membership application (with SEPA mandate)', fr: 'Demande d’adhésion (avec mandat SEPA)' } },
  { group: 'flyer', lang: 'EN', size: '0,2 MB', file: '/downloads/flyer/bantu-ev-flyer-2024.pdf', title: { de: 'Vereinsflyer „Building Our Communities Together“ (2024)', en: 'Association flyer “Building Our Communities Together” (2024)', fr: 'Dépliant de l’association « Building Our Communities Together » (2024)' } },
  { group: 'flyer', lang: 'DE/EN', size: '2,7 MB', file: '/downloads/flyer/ubuntu-talks-15-11-2026-flyer.pdf', title: { de: 'Flyer Ubuntu Talks, 15.11.2026', en: 'Flyer Ubuntu Talks, 15 Nov 2026', fr: 'Dépliant Ubuntu Talks, 15 nov. 2026' } },
  { group: 'brand', lang: 'EN', size: '2,7 MB', file: '/downloads/logos/Bantu_eV_Brand_Guidelines_v2.1_2026-11.pdf', title: { de: 'Markenrichtlinien (Brand Guidelines v2.1, November 2026, PDF)', en: 'Brand guidelines (v2.1, November 2026, PDF)', fr: 'Charte graphique (v2.1, novembre 2026, PDF)' } },
  { group: 'brand', lang: 'DE/EN', size: '0,2 MB', file: '/downloads/logos/Bantu_eV_Logo_Original_gestapelt_Farbe.png', title: { de: 'Logo farbig (PNG, transparent)', en: 'Logo, colour (PNG, transparent)', fr: 'Logo en couleur (PNG, transparent)' } },
  { group: 'brand', lang: 'DE/EN', size: '0,2 MB', file: '/downloads/logos/Bantu_eV_Logo_Original_gestapelt_Farbe_auf_dunkel.png', title: { de: 'Logo für dunkle Hintergründe (PNG)', en: 'Logo for dark backgrounds (PNG)', fr: 'Logo pour fonds sombres (PNG)' } },
  { group: 'brand', lang: 'DE/EN', size: '0,1 MB', file: '/downloads/logos/Bantu_eV_Logo_Original_gestapelt_Schwarz.png', title: { de: 'Logo schwarz (PNG)', en: 'Logo, black (PNG)', fr: 'Logo noir (PNG)' } },
  { group: 'brand', lang: 'DE/EN', size: '0,2 MB', file: '/downloads/logos/Bantu_eV_Logo_Original_Emblem_Farbe.png', title: { de: 'Emblem ohne Schriftzug (nur für Avatare/kleine Flächen)', en: 'Emblem only (avatars/small spaces only)', fr: 'Emblème seul (avatars et petits formats uniquement)' } },
];

export const groups: { id: Download['group']; title: L; intro?: L }[] = [
  { id: 'reports', title: { de: 'Jahres- und Transparenzberichte', en: 'Annual and transparency reports', fr: 'Rapports annuels et de transparence' } },
  { id: 'membership', title: { de: 'Mitgliedschaft', en: 'Membership', fr: 'Adhésion' }, intro: { de: 'Ausgefüllt per Post an unser Postfach oder eingescannt per E-Mail an info@bantu-ev.org.', en: 'Send the completed form by post to our P.O. box or scan it and e-mail it to info@bantu-ev.org.', fr: 'Envoyez le formulaire rempli par courrier à notre boîte postale ou scanné par e-mail à info@bantu-ev.org.' } },
  { id: 'flyer', title: { de: 'Flyer', en: 'Flyers', fr: 'Dépliants' } },
  { id: 'brand', title: { de: 'Logos für Presse und Partner', en: 'Logos for press and partners', fr: 'Logos pour la presse et les partenaires' }, intro: { de: 'Bitte das Logo nicht verändern, strecken oder neu setzen. Der Name steht immer unter dem Emblem.', en: 'Please do not alter, stretch or retype the logo. The name always sits below the emblem.', fr: 'Merci de ne pas modifier, étirer ou recomposer le logo. Le nom se trouve toujours sous l’emblème.' } },
];
