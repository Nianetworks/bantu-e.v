// People, partners and funders.
// PRIVACY RULE: a person appears with name/photo only if `consent: true` (written consent on file
// in 06_Personal_Human-Resources). Entries without consent are not rendered.

type L = { de: string; en: string };
export type Person = { name: string; role: L; bio?: L; photo?: string; group: 'board' | 'team' | 'volunteer' | 'advisory'; consent: boolean };

export const people: Person[] = [
  {
    name: 'Boaz Murinzi Murema',
    group: 'board',
    consent: true,
    role: { de: 'Vorsitzender des Vorstands · Geschäftsführung & Projektleitung', en: 'Chair of the board · Executive Director & project lead' },
    bio: {
      de: 'Boaz leitet Bantu e.V. seit der Gründung 2019 und verantwortet die Projekte in Uganda, Burundi und Berlin.',
      en: 'Boaz has led Bantu e.V. since its founding in 2019 and is responsible for the projects in Uganda, Burundi and Berlin.',
    },
    // OPEN: portrait photo -> public/images/people/boaz-murinzi-murema.jpg
  },
  // Board elected by the general assembly of 30.06.2024 (minutes, Neueintragung_2025), updated by the chair on 07.11.2026:
  // Edith Tendo Okello (elected chair) stepped back; Boaz Murinzi Murema remains chair.
  // Names and roles only – no private data. OPEN: confirm each member agrees to publication; add photos only with written consent.
  // OPEN: registration of the new board at the Amtsgericht – the register extract of 22.05.2026 still shows the previous board.
  { name: 'Anne Behner', group: 'board', consent: true, role: { de: 'Stellvertretende Vorsitzende', en: 'Deputy chair' } },
  { name: 'Michael Miiro', group: 'board', consent: true, role: { de: 'Schatzmeister', en: 'Treasurer' } },
  { name: 'Norah Masane', group: 'board', consent: true, role: { de: 'Schriftführerin', en: 'Secretary' } },
  { name: 'Aishah Nantumbwe', group: 'board', consent: true, role: { de: 'Beisitzerin · Fundraising und Ressourcenmobilisierung', en: 'Board member · Fundraising and resource mobilisation' } },
  // OPEN: team members, freelancers and volunteers who agree to be shown (group: 'team' | 'volunteer').
];

export type Org = { name: string; place: string; text: L; url?: string; since?: string };

export const partnersSouth: Org[] = [
  {
    name: 'Anchored Bridges Initiatives (ABI)',
    place: 'Kampala, Uganda',
    url: 'https://abi.ug',
    since: '2021',
    text: {
      de: 'Ugandische NGO für Bildung, Inklusion, berufliche Qualifizierung und Gemeindeentwicklung; gegründet 2017 als „Ability Beyond the Iris“. Gemeinsame Projekte: Royal College Namugongo, Ruhaama Community Resource Centre, OURS, Okushoma kwa Boona, Pearl Kindertagesstätte.',
      en: 'Ugandan NGO for education, inclusion, vocational training and community development; founded in 2017 as “Ability Beyond the Iris”. Joint projects: Royal College Namugongo, Ruhaama Community Resource Centre, OURS, Okushoma kwa Boona, Pearl Kindergarten.',
    },
  },
  {
    name: 'Nyentsya Community Development Association (NCDA)',
    place: 'Mbarara, Uganda',
    text: {
      de: 'Trägerin der Msingi School of BTVET; Umsetzungspartnerin der Friseur- und Kosmetikausbildung für junge Frauen (P 24/200).',
      en: 'Runs Msingi School of BTVET; implementing partner of the hairdressing and cosmetology training for young women (P 24/200).',
    },
  },
  {
    name: 'Women Initiative Against Vulnerability for Harm Reduction (WIV-HR)',
    place: 'Burundi',
    text: {
      de: 'Ehrenamtlich getragene Organisation im Sozial- und Gesundheitsbereich; Partnerin beim Projekt „Wasser für Ruziba“ (P 26/186).',
      en: 'Volunteer-run organisation in the social and health sector; partner in “Water for Ruziba” (P 26/186).',
    },
  },
  {
    name: 'Royal College Namugongo',
    place: 'Namugongo, Uganda',
    text: {
      de: 'Schule, an der wir mit ABI Schulgeld für Kinder aus armen Familien übernommen und Rampen für einen barrierefreien Zugang gebaut haben.',
      en: 'School where, together with ABI, we covered school fees for children from poor families and built ramps for step-free access.',
    },
  },
];

export const partnersNorth: Org[] = [
  {
    name: 'AfricAvenir International e.V.',
    place: 'Berlin',
    url: 'https://www.africavenir.org',
    text: {
      de: 'Kooperationspartner in der entwicklungspolitischen Bildungsarbeit 2026 (P 26/214, P 26/224).',
      en: 'Cooperation partner for global-learning projects in 2026 (P 26/214, P 26/224).',
    },
  },
  {
    name: 'tubman.network e.V.',
    place: 'Berlin',
    url: 'https://tubman.network',
    text: {
      de: 'Organisation für Kinder, Jugendliche, Familien und Communities afrikanischer und afro-diasporischer Herkunft; Bantu e.V. war 2021–2025 Trägerverein ihrer Projekte.',
      en: 'Organisation for children, young people, families and communities of African and Afro-diasporic heritage; Bantu e.V. was the fiscal sponsor of its projects 2021–2025.',
    },
  },
  {
    name: 'Kikili e.V. i.G.',
    place: 'Sandau (Elbe)',
    url: 'https://www.kikili.de',
    text: {
      de: 'Belebt den Stadtspeicher Sandau als inklusiven Dritten Ort; Bantu e.V. ist seit 2022 Trägerverein.',
      en: 'Reviving the Sandau town granary as an inclusive third place; Bantu e.V. has been its fiscal sponsor since 2022.',
    },
  },
  {
    name: 'Wilhelm-Remy-Gymnasium Bendorf',
    place: 'Bendorf',
    url: 'https://wrg-online.de',
    text: {
      de: 'Partnerschule: Erlös der Aktion Tagwerk 2017 für Uganda, u. a. für Rampen am Royal College Namugongo; Uganda-Projekte im Englischunterricht.',
      en: 'Partner school: proceeds of Aktion Tagwerk 2017 for Uganda, including ramps at Royal College Namugongo; Uganda projects in English lessons.',
    },
  },
  {
    name: 'Club Dialog e.V.',
    place: 'Berlin',
    url: 'https://www.club-dialog.de',
    text: {
      de: 'Koordiniert das Programm „MITTEinander aktiv“ des Bezirksamts Berlin-Mitte.',
      en: 'Coordinates the Berlin-Mitte district programme “MITTEinander aktiv”.',
    },
  },
  {
    name: 'Each One Teach One (EOTO) e.V.',
    place: 'Berlin',
    url: 'https://www.eoto-archiv.de',
    text: {
      de: 'Community-basierte Bildungs- und Empowerment-Organisation für Menschen afrikanischer Herkunft in Berlin.',
      en: 'Community-based education and empowerment organisation for People of African Descent in Berlin.',
    },
  },
  {
    name: 'EIRENE – Internationaler Christlicher Friedensdienst e.V.',
    place: 'Neuwied',
    url: 'https://eirene.org',
    text: {
      de: 'Kooperationsvereinbarung seit Dezember 2025.',
      en: 'Cooperation agreement since December 2025.',
    },
  },
  {
    name: 'Federation of Ugandans in Germany e.V. (FUG)',
    place: 'Deutschland',
    text: {
      de: 'Kooperationspartner der Ubuntu Talks 2026 in Berlin-Mitte.',
      en: 'Cooperation partner for Ubuntu Talks 2026 in Berlin-Mitte.',
    },
  },
];

/** Funders of past and current projects – shown as linked logos (text tile where no logo file is available yet).
 *  Logos: public/funders/. OPEN: official logo files for Land Berlin (SenBJF), Bezirksamt Berlin-Mitte /
 *  MITTEinander aktiv and Erasmus+ (EU emblem) – request from the funders, then add `logo`. */
export type Funder = { name: L; url: string; logo?: string; logoWidth?: number; note: L };
export const funders: Funder[] = [
  { name: { de: 'Stiftung Nord-Süd-Brücken', en: 'Stiftung Nord-Süd-Brücken' }, url: 'https://www.nord-sued-bruecken.de', logo: '/funders/nord-sued-bruecken.svg', note: { de: 'EZ-Kleinprojektefonds, SDG-Programm, BIKO', en: 'Small-projects fund, SDG programme, BIKO' } },
  { name: { de: 'Engagement Global', en: 'Engagement Global' }, url: 'https://www.engagement-global.de', logo: '/funders/engagement-global-logo.png', note: { de: 'Teams up!, SDG-Bildungsarbeit', en: 'Teams up!, SDG education' } },
  { name: { de: 'Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung (BMZ)', en: 'Federal Ministry for Economic Cooperation and Development (BMZ)' }, url: 'https://www.bmz.de', logo: '/funders/bmz-logo.png', note: { de: 'über Engagement Global und die Stiftung Nord-Süd-Brücken', en: 'via Engagement Global and Stiftung Nord-Süd-Brücken' } },
  { name: { de: 'Robert Bosch Stiftung', en: 'Robert Bosch Stiftung' }, url: 'https://www.bosch-stiftung.de', logo: '/funders/robert-bosch-stiftung.svg', note: { de: 'Safer Spaces for Mothers', en: 'Safer Spaces for Mothers' } },
  { name: { de: 'Deutsche Stiftung für Engagement und Ehrenamt (DSEE)', en: 'German Foundation for Engagement and Volunteering (DSEE)' }, url: 'https://www.deutsche-stiftung-engagement-und-ehrenamt.de', logo: '/funders/dsee.svg', note: { de: 'Black Engagement Matters, Ubuntu für alle', en: 'Black Engagement Matters, Ubuntu for All' } },
  { name: { de: 'Deutsche Fernsehlotterie', en: 'Deutsche Fernsehlotterie' }, url: 'https://www.fernsehlotterie.de', logo: '/funders/deutsche-fernsehlotterie.svg', note: { de: 'Equal Rights for All', en: 'Equal Rights for All' } },
  { name: { de: 'Schmitz-Stiftungen', en: 'Schmitz-Stiftungen' }, url: 'https://www.schmitz-stiftungen.de', logo: '/funders/schmitz-stiftungen.svg', note: { de: 'Msingi School BTVET', en: 'Msingi School BTVET' } },
  { name: { de: 'Aktion Tagwerk', en: 'Aktion Tagwerk' }, url: 'https://www.aktion-tagwerk.de', logo: '/funders/aktion-tagwerk.svg', note: { de: 'über das Wilhelm-Remy-Gymnasium Bendorf (2017)', en: 'via Wilhelm-Remy-Gymnasium Bendorf (2017)' } },
  { name: { de: 'Land Berlin – Senatsverwaltung für Bildung, Jugend und Familie', en: 'State of Berlin – Senate Department for Education, Youth and Family' }, url: 'https://www.berlin.de/sen/bjf/', note: { de: 'BIKO: Erde, Saat und Erbe', en: 'BIKO: Soil, Seed and Heritage' } },
  { name: { de: 'Bezirksamt Berlin-Mitte', en: 'Berlin-Mitte District Office' }, url: 'https://www.berlin.de/ba-mitte/', note: { de: 'MITTEinander aktiv, Integrationsfonds', en: 'MITTEinander aktiv, integration fund' } },
  { name: { de: 'Europäische Union – Erasmus+', en: 'European Union – Erasmus+' }, url: 'https://erasmus-plus.ec.europa.eu', note: { de: 'Youth Eco Project', en: 'Youth Eco Project' } },
];
