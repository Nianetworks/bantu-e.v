// Programme portfolio of Bantu e.V. (approved by the chair, 07.11.2026).
// Every project (src/content/projects/{de,en}/<slug>.md) is assigned to exactly one programme here.
// The `programme` field in the project front matter (international | inland) is the REGION, not the programme.
import type { Lang } from '../i18n';

type L = Record<Lang, string>;
export type ProgrammeKey = 'education' | 'health' | 'cooperation' | 'civic' | 'migration';
export type Service = { title: L; text: L; cta?: { label: L; route: 'contact' | 'join' } };
export type Programme = {
  key: ProgrammeKey;
  no: number;
  slug: L;
  icon: string;
  accent: 'gold' | 'green' | 'blue' | 'red' | 'purple';
  title: L;
  short: L;
  lead: L;
  focus: Record<Lang, string[]>;
  projects: string[];
  services?: Service[];
  sdgs: number[];
};

export const programmes: Programme[] = [
  {
    key: 'education',
    no: 1,
    slug: { de: 'bildung', en: 'education' },
    icon: 'school',
    accent: 'gold',
    title: { de: 'Bildung', en: 'Education' },
    short: { de: 'Globales Lernen, Bildungsgerechtigkeit und Austausch', en: 'Global learning, educational justice and exchange' },
    lead: {
      de: 'Globales Lernen, Bildungsgerechtigkeit und Begegnung über Kontinente hinweg: In Deutschland und Uganda bauen wir historisch gewachsene Vorurteile ab und machen Lernen zugänglich – für Schulklassen, junge Menschen und die breite Öffentlichkeit.',
      en: 'Global learning, educational justice and cross-cultural exchange: in Germany and Uganda we dismantle historical biases and make learning accessible – for school classes, young people and the wider public.',
    },
    focus: {
      de: ['Globales Lernen an Schulen und in der Erwachsenenbildung', 'Bildungsgerechtigkeit zwischen Uganda und Deutschland (SDG 4 und 10)', 'Dekolonisierung von Geschichte, Architektur und Landwirtschaft', 'Jugendaustausch und Dialog auf Augenhöhe', 'Bezahlbare und barrierefreie Schulbildung für Kinder aus armen Familien'],
      en: ['Global learning in schools and adult education', 'Educational justice between Uganda and Germany (SDG 4 and 10)', 'Decolonising history, architecture and agriculture', 'Youth exchange and dialogue as equals', 'Affordable and accessible schooling for children from poor families'],
    },
    projects: ['p26-214-bildung-fuer-alle', 'p26-224-erde-saat-erbe', 'okushoma-kwa-boona', 'royal-college-namugongo', 'youth-eco-project'],
    services: [
      {
        title: { de: 'Allgemeine Bildungsarbeit', en: 'General education work' },
        text: {
          de: 'Laufende Workshops, Fortbildungsmodule und Seminare zur politischen Bildung für die breite Öffentlichkeit in Deutschland – zu globaler Gerechtigkeit, Rassismuskritik, Kolonialgeschichte und den Nachhaltigkeitszielen. Auf Anfrage gestalten wir Formate für Schulen, Vereine und Bildungseinrichtungen.',
          en: 'Ongoing workshops, further-education modules and political-education seminars for the wider public in Germany – on global justice, anti-racism, colonial history and the Sustainable Development Goals. On request we design formats for schools, associations and educational institutions.',
        },
        cta: { label: { de: 'Workshop anfragen', en: 'Request a workshop' }, route: 'contact' },
      },
    ],
    sdgs: [4, 10, 17],
  },
  {
    key: 'health',
    no: 2,
    slug: { de: 'gesundheit', en: 'health' },
    icon: 'heart',
    accent: 'red',
    title: { de: 'Gesundheit', en: 'Health' },
    short: { de: 'Rehabilitation, Barrierefreiheit und Versorgung', en: 'Rehabilitation, accessibility and care' },
    lead: {
      de: 'Wir verbessern das körperliche Wohlbefinden, die Barrierefreiheit und die spezialisierte Versorgung von Menschen, die im herkömmlichen Gesundheitssystem auf Hürden stoßen – besonders von Kindern mit Behinderung und ihren Familien.',
      en: 'We improve physical well-being, accessibility and specialised care for people who face barriers in conventional health systems – especially children with disabilities and their families.',
    },
    focus: {
      de: ['Früherkennung und Rehabilitation bei Zerebralparese', 'Physiotherapie und gemeindenahe Versorgung', 'Stärkung von Eltern und Selbsthilfegruppen', 'Aufklärung gegen Stigmatisierung von Behinderung'],
      en: ['Early detection and rehabilitation for cerebral palsy', 'Physiotherapy and community-based care', 'Supporting parents and self-help groups', 'Awareness raising against the stigma of disability'],
    },
    projects: ['p23-91-ours-zerebralparese'],
    sdgs: [3, 10],
  },
  {
    key: 'cooperation',
    no: 3,
    slug: { de: 'internationale-zusammenarbeit', en: 'international-cooperation' },
    icon: 'globe',
    accent: 'green',
    title: { de: 'Globale Zusammenarbeit & Lebensgrundlagen', en: 'Global Cooperation & Livelihoods' },
    short: { de: 'Entwicklungszusammenarbeit in Uganda und Burundi', en: 'Development cooperation in Uganda and Burundi' },
    lead: {
      de: 'Nachhaltige wirtschaftliche Selbstständigkeit, lebenswichtige Infrastruktur und widerstandsfähige Gemeinden: Gemeinsam mit lokalen Partnerorganisationen in Uganda und Burundi schaffen wir Zugang zu frühkindlicher und beruflicher Bildung, Trinkwasser, digitaler Teilhabe und Einkommen. Die Partner planen und setzen um; Bantu e.V. beantragt die Förderung in Deutschland, begleitet die Umsetzung und rechnet transparent ab.',
      en: 'Sustainable economic empowerment, vital infrastructure and resilient communities: together with local partner organisations in Uganda and Burundi we create access to early childhood and vocational education, drinking water, digital participation and income. Our partners plan and implement; Bantu e.V. secures funding in Germany, accompanies implementation and accounts for every euro.',
    },
    focus: {
      de: ['Frühkindliche Bildung und sichere Betreuung', 'Wasser, Sanitärversorgung und Hygiene (WASH)', 'Berufliche Bildung (TVET) mit anerkanntem Abschluss', 'Digitale Teilhabe und IT-Kompetenzen', 'Einkommen durch Nutztierhaltung und Landwirtschaft'],
      en: ['Early childhood education and safe day care', 'Water, sanitation and hygiene (WASH)', 'Technical and vocational education (TVET) with certification', 'Digital inclusion and IT skills', 'Income from livestock and agriculture'],
    },
    projects: ['p26-230-pearl-kita-kampala', 'p26-186-wasser-fuer-ruziba', 'p24-200-msingi-school', 'ruhaama-community-resource-centre', 'nutztiere-und-landwirtschaft'],
    sdgs: [1, 4, 5, 6, 8],
  },
  {
    key: 'civic',
    no: 4,
    slug: { de: 'engagement-und-rechte', en: 'civic-engagement-and-rights' },
    icon: 'people',
    accent: 'blue',
    title: { de: 'Zivilgesellschaftliches Engagement & Rechte', en: 'Civic Engagement & Rights' },
    short: { de: 'Antirassismus, Empowerment und Gemeinschaft', en: 'Anti-racism, empowerment and community' },
    lead: {
      de: 'Antirassismus, Antidiskriminierung, politisches Empowerment und Gemeinschaft: Wir stärken die afrikanische Diaspora und marginalisierte Gruppen in Deutschland – mit Begegnungsräumen, Vernetzung Schwarzer Organisationen und lokalen Orten des Miteinanders.',
      en: 'Anti-racism, anti-discrimination, political empowerment and community building: we strengthen the African diaspora and marginalised groups in Germany – with spaces for encounter, networks of Black-led organisations and local places of togetherness.',
    },
    focus: {
      de: ['Sichere Räume für Begegnung, Austausch und Empowerment', 'Vernetzung und Kapazitätsaufbau Schwarzer Organisationen', 'Kulturelle Identität und Selbstbewusstsein junger Menschen', 'Gemeinschaftsorte im ländlichen Raum'],
      en: ['Safe spaces for encounter, exchange and empowerment', 'Networking and capacity building for Black-led organisations', 'Cultural identity and self-confidence of young people', 'Community spaces in rural areas'],
    },
    projects: ['ubuntu-talks-2026', 'black-engagement-matters', 'fashion-empowerment', 'kikili-stadtspeicher-sandau'],
    sdgs: [10, 16, 11],
  },
  {
    key: 'migration',
    no: 5,
    slug: { de: 'migration-und-integration', en: 'migration-and-integration' },
    icon: 'hand',
    accent: 'purple',
    title: { de: 'Migration & Integration', en: 'Migration & Integration' },
    short: { de: 'Beratung und Begleitung für Geflüchtete', en: 'Advice and support for refugees' },
    lead: {
      de: 'Wir unterstützen, beraten und begleiten Geflüchtete und Migrant*innen, die sich ein Leben in Deutschland aufbauen – kultursensibel, mehrsprachig und mit Blick auf Mehrfachdiskriminierung.',
      en: 'We support, advise and accompany refugees and migrants building their lives in Germany – culturally sensitive, multilingual and aware of intersectional discrimination.',
    },
    focus: {
      de: ['Unterstützung für BIPoC-Geflüchtete, u. a. aus der Ukraine', 'Orientierung in Asyl-, Aufenthalts- und Behördenverfahren', 'Sprachkurse, Bewerbungs- und Jobunterstützung', 'Psychosoziale Begleitung und Räume für Mütter und Familien'],
      en: ['Support for BIPoC refugees, including from Ukraine', 'Guidance through asylum, residence and administrative procedures', 'Language courses, application and job support', 'Psychosocial support and spaces for mothers and families'],
    },
    projects: ['ubuntu-fuer-alle', 'safer-spaces-tubman-network'],
    services: [
      {
        title: { de: 'Verfahrensberatung', en: 'Procedural advice' },
        text: {
          de: 'Praktische Beratung für Migrant*innen und Geflüchtete zu Asyl- und Aufenthaltsverfahren und Behördenwegen: Wir helfen, Schreiben und Bescheide zu verstehen, Fristen im Blick zu behalten, Anträge vorzubereiten und die zuständigen Stellen zu finden. Für eine Rechtsvertretung vermitteln wir an Fachanwält*innen und Beratungsstellen.',
          en: 'Hands-on advice for migrants and refugees on asylum and residence procedures and administrative processes: we help people understand letters and decisions, keep track of deadlines, prepare applications and find the right authorities. For legal representation we refer to specialised lawyers and counselling services.',
        },
        cta: { label: { de: 'Beratung anfragen', en: 'Ask for advice' }, route: 'contact' },
      },
    ],
    sdgs: [10, 16],
  },
];

/** Programme 6: the framework behind all programmes (no projects of its own). */
export const management = {
  no: 6,
  title: { de: 'Programmsteuerung & strategische Entwicklung', en: 'Programme Management & Strategic Operations' } as L,
  lead: {
    de: 'Der übergreifende Rahmen, der rechtliche und förderrechtliche Sorgfalt, Synergien zwischen den Programmen und nachhaltiges Wachstum auf beiden Kontinenten sichert.',
    en: 'The overarching framework that ensures institutional and funding compliance, synergy between programmes and sustainable growth on both continents.',
  } as L,
  items: {
    de: ['Steuerung der internationalen Partnerschaften', 'Wirkungsmonitoring und transparente Abrechnung jedes Projekts', 'Koordination von Ehrenamtlichen und Honorarkräften', 'Trägerschaft und Begleitung junger Initiativen', 'Ausrichtung aller Projekte an unserer Vision von globaler Gerechtigkeit und gemeinsamer Menschlichkeit'],
    en: ['Managing international partnerships', 'Impact monitoring and transparent accounting for every project', 'Coordinating volunteers and freelancers', 'Fiscal sponsorship and incubation of young initiatives', 'Aligning every project with our vision of global justice and shared humanity'],
  } as Record<Lang, string[]>,
};

/** Initiatives for which Bantu e.V. acts (or acted) as Trägerverein / fiscal sponsor. */
export const trusteeships = [
  {
    name: 'tubman.network e.V.',
    url: 'https://tubman.network',
    place: 'Berlin',
    period: { de: '2021 – 2025', en: '2021 – 2025' } as L,
    text: {
      de: 'tubman.network arbeitet mit Kindern, Jugendlichen, Familien und Communities afrikanischer und afro-diasporischer Herkunft – durch Bildung, psychosoziale Unterstützung, Empowerment und Kunst. Bantu e.V. war Trägerverein: Wir haben Fördermittel verwaltet, Verwendungsnachweise erstellt sowie Personal und Verträge betreut. Seit der Eintragung als eigener Verein (VR 40776 B) haben wir laufende Projekte bis 2025 abgewickelt.',
      en: 'tubman.network works with children, young people, families and communities of African and Afro-diasporic heritage – through education, psychosocial support, empowerment and the arts. Bantu e.V. was its fiscal sponsor: we managed grants, prepared financial reports and handled staff and contracts. After tubman.network registered as an association of its own (VR 40776 B), we completed ongoing projects until 2025.',
    } as L,
    projects: {
      de: ['FashionEmpowerment (2023, Bezirksamt Berlin-Mitte)', 'Safer Spaces for Mothers – Mama Circle (2023–2024, Robert Bosch Stiftung)', 'Equal Rights for All (2023, Deutsche Fernsehlotterie)', 'Black Engagement Matters (2024, DSEE)', 'Youth Eco Project (2024, Erasmus+)', 'ParentCircle (2024–2025, Stiftung Nord-Süd-Brücken)'],
      en: ['FashionEmpowerment (2023, Berlin-Mitte District Office)', 'Safer Spaces for Mothers – Mama Circle (2023–2024, Robert Bosch Stiftung)', 'Equal Rights for All (2023, Deutsche Fernsehlotterie)', 'Black Engagement Matters (2024, DSEE)', 'Youth Eco Project (2024, Erasmus+)', 'ParentCircle (2024–2025, Stiftung Nord-Süd-Brücken)'],
    } as Record<Lang, string[]>,
  },
  {
    name: 'Kikili e.V. i.G.',
    url: 'https://www.kikili.de',
    place: 'Sandau (Elbe), Sachsen-Anhalt',
    period: { de: 'seit 2022', en: 'since 2022' } as L,
    text: {
      de: 'Kikili belebt in Sandau (Elbe), der kleinsten Stadt Sachsen-Anhalts, den denkmalgeschützten ehemaligen Stadtspeicher als inklusiven „Dritten Ort“: mit Erinnerungskultur, Bildungs- und Kulturangeboten für Jung und Alt und einer Plattform für Initiativen zu sozialer Gerechtigkeit, Umweltschutz und Inklusion. Bantu e.V. ist Trägerverein und begleitet Kikili beim Aufbau bis zur Eigenständigkeit.',
      en: 'In Sandau (Elbe), the smallest town in Saxony-Anhalt, Kikili is reviving the listed former town granary (“Stadtspeicher”) as an inclusive “third place”: with remembrance culture, education and cultural activities for young and old and a platform for initiatives working on social justice, environmental protection and inclusion. Bantu e.V. is its fiscal sponsor and supports Kikili until it can stand on its own.',
    } as L,
    projects: {
      de: ['Rettung und Belebung des Stadtspeichers Sandau', 'Tag des offenen Denkmals 2026 (13.09.2026): Workshop Landschaftszeichnen und Konzert'],
      en: ['Rescue and revival of the Sandau town granary', 'Heritage Open Day 2026 (13.09.2026): landscape drawing workshop and concert'],
    } as Record<Lang, string[]>,
  },
];

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
export const programmePath = (lang: Lang, key: ProgrammeKey) => {
  const p = programmes.find((x) => x.key === key)!;
  return `${base}${lang === 'de' ? '/programme/' : '/en/programmes/'}${p.slug[lang]}/`;
};
export const programmeByKey = (k: ProgrammeKey) => programmes.find((p) => p.key === k)!;
export const programmeOfProject = (slug: string) => programmes.find((p) => p.projects.includes(slug));
