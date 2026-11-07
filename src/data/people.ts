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
  // OPEN: add the newly elected board members here (group: 'board') once registered – with consent.
  // OPEN: team members, freelancers and volunteers who agree to be shown (group: 'team' | 'volunteer').
];

export type Org = { name: string; place: string; text: L; url?: string; since?: string };

export const partnersSouth: Org[] = [
  {
    name: 'Anchored Bridges Initiatives (ABI)',
    place: 'Kampala, Uganda',
    since: '2021',
    text: {
      de: 'Ugandische NGO für Bildung, berufliche Qualifizierung und Gemeindeentwicklung; gegründet 2017 als „Ability Beyond the Iris“. Gemeinsame Projekte: Ruhaama Community Resource Centre, OURS, Okushoma kwa Boona, Pearl Kindertagesstätte.',
      en: 'Ugandan NGO for education, vocational training and community development; founded in 2017 as “Ability Beyond the Iris”. Joint projects: Ruhaama Community Resource Centre, OURS, Okushoma kwa Boona, Pearl Kindergarten.',
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
];

export const partnersNorth: Org[] = [
  {
    name: 'AfricAvenir International e.V.',
    place: 'Berlin',
    text: {
      de: 'Kooperationspartner in der entwicklungspolitischen Bildungsarbeit 2026 (P 26/214, P 26/224).',
      en: 'Cooperation partner for global-learning projects in 2026 (P 26/214, P 26/224).',
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
  {
    name: 'Tubman.Network e.V.',
    place: 'Berlin',
    text: {
      de: 'Netzwerk für Schwarze Eltern und Familien; Bantu e.V. war bis Januar 2024 Trägerverein.',
      en: 'Network for Black parents and families; Bantu e.V. was its fiscal host until January 2024.',
    },
  },
  {
    name: 'Club Dialog e.V.',
    place: 'Berlin',
    text: {
      de: 'Koordiniert das Programm „MITTEinander aktiv“ des Bezirksamts Berlin-Mitte.',
      en: 'Coordinates the Berlin-Mitte district programme “MITTEinander aktiv”.',
    },
  },
];

/** Funders of past and current projects (text list – logos only where the funder requires them). */
export const funders: L[] = [
  { de: 'Stiftung Nord-Süd-Brücken (EZ-Kleinprojektefonds, SDG-Programm, BIKO)', en: 'Stiftung Nord-Süd-Brücken (small-projects fund, SDG programme, BIKO)' },
  { de: 'Engagement Global / Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung (BMZ)', en: 'Engagement Global / Federal Ministry for Economic Cooperation and Development (BMZ)' },
  { de: 'Land Berlin – Senatsverwaltung für Bildung, Jugend und Familie', en: 'State of Berlin – Senate Department for Education, Youth and Family' },
  { de: 'Bezirksamt Berlin-Mitte (MITTEinander aktiv, Integrationsfonds)', en: 'Berlin-Mitte District Office (MITTEinander aktiv, integration fund)' },
  { de: 'Robert Bosch Stiftung', en: 'Robert Bosch Stiftung' },
  { de: 'Deutsche Stiftung für Engagement und Ehrenamt (DSEE)', en: 'German Foundation for Engagement and Volunteering (DSEE)' },
  { de: 'Schmitz-Stiftungen', en: 'Schmitz-Stiftungen' },
  { de: 'Deutsche Fernsehlotterie / Deutsches Hilfswerk', en: 'Deutsche Fernsehlotterie / Deutsches Hilfswerk' },
  { de: 'Europäische Union (Erasmus+)', en: 'European Union (Erasmus+)' },
];
