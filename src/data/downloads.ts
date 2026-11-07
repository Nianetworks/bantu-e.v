// Downloads shown on /downloads/ and /berichte/. Files live in public/downloads/.
// Only publish documents made for the public (the "Website" versions of reports).
type L = { de: string; en: string };
export type Download = { title: L; file: string; lang: 'DE' | 'EN' | 'DE/EN'; size: string; group: 'reports' | 'membership' | 'flyer' | 'brand'; year?: number };

const report = (year: number, size: { de: string; en: string }): Download[] => [
  { group: 'reports', year, lang: 'DE', size: size.de, file: `/downloads/berichte/bantu-ev-transparenzbericht-${year}-de.pdf`, title: { de: `Transparenzbericht ${year}`, en: `Transparency report ${year} (German)` } },
  { group: 'reports', year, lang: 'EN', size: size.en, file: `/downloads/berichte/bantu-ev-transparency-report-${year}-en.pdf`, title: { de: `Transparency Report ${year} (Englisch)`, en: `Transparency report ${year}` } },
];

export const downloads: Download[] = [
  ...report(2025, { de: '0,3 MB', en: '0,3 MB' }),
  ...report(2024, { de: '0,3 MB', en: '0,3 MB' }),
  ...report(2023, { de: '0,3 MB', en: '0,3 MB' }),
  ...report(2022, { de: '0,3 MB', en: '0,3 MB' }),
  ...report(2021, { de: '0,3 MB', en: '0,3 MB' }),
  ...report(2020, { de: '0,3 MB', en: '0,3 MB' }),
  { group: 'membership', lang: 'DE', size: '0,1 MB', file: '/downloads/mitgliedschaft/bantu-ev-mitgliedsantrag-de.pdf', title: { de: 'Mitgliedsantrag', en: 'Membership form (German)' } },
  { group: 'membership', lang: 'EN', size: '0,2 MB', file: '/downloads/mitgliedschaft/bantu-ev-membership-form-en.pdf', title: { de: 'Membership application (Englisch, mit SEPA-Mandat)', en: 'Membership application (with SEPA mandate)' } },
  { group: 'flyer', lang: 'EN', size: '0,2 MB', file: '/downloads/flyer/bantu-ev-flyer-2024.pdf', title: { de: 'Vereinsflyer „Building Our Communities Together“ (2024)', en: 'Association flyer “Building Our Communities Together” (2024)' } },
  { group: 'flyer', lang: 'DE/EN', size: '2,7 MB', file: '/downloads/flyer/ubuntu-talks-15-11-2026-flyer.pdf', title: { de: 'Flyer Ubuntu Talks, 15.11.2026', en: 'Flyer Ubuntu Talks, 15 Nov 2026' } },
  { group: 'brand', lang: 'DE/EN', size: '0,2 MB', file: '/downloads/logos/Bantu_eV_Logo_Original_gestapelt_Farbe.png', title: { de: 'Logo farbig (PNG, transparent)', en: 'Logo, colour (PNG, transparent)' } },
  { group: 'brand', lang: 'DE/EN', size: '0,2 MB', file: '/downloads/logos/Bantu_eV_Logo_Original_gestapelt_Farbe_auf_dunkel.png', title: { de: 'Logo für dunkle Hintergründe (PNG)', en: 'Logo for dark backgrounds (PNG)' } },
  { group: 'brand', lang: 'DE/EN', size: '0,1 MB', file: '/downloads/logos/Bantu_eV_Logo_Original_gestapelt_Schwarz.png', title: { de: 'Logo schwarz (PNG)', en: 'Logo, black (PNG)' } },
  { group: 'brand', lang: 'DE/EN', size: '0,2 MB', file: '/downloads/logos/Bantu_eV_Logo_Original_Emblem_Farbe.png', title: { de: 'Emblem ohne Schriftzug (nur für Avatare/kleine Flächen)', en: 'Emblem only (avatars/small spaces only)' } },
];

export const groups: { id: Download['group']; title: L; intro?: L }[] = [
  { id: 'reports', title: { de: 'Jahres- und Transparenzberichte', en: 'Annual and transparency reports' } },
  { id: 'membership', title: { de: 'Mitgliedschaft', en: 'Membership' }, intro: { de: 'Ausgefüllt per Post an unser Postfach oder eingescannt per E-Mail an info@bantu-ev.org.', en: 'Send the completed form by post to our P.O. box or scan it and e-mail it to info@bantu-ev.org.' } },
  { id: 'flyer', title: { de: 'Flyer', en: 'Flyers' } },
  { id: 'brand', title: { de: 'Logos für Presse und Partner', en: 'Logos for press and partners' }, intro: { de: 'Bitte das Logo nicht verändern, strecken oder neu setzen. Der Name steht immer unter dem Emblem.', en: 'Please do not alter, stretch or retype the logo. The name always sits below the emblem.' } },
];
