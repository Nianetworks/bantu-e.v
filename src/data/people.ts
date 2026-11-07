// People, partners and funders.
// PRIVACY RULE: a person appears with name/photo only if `consent: true` (written consent on file
// in 06_Personal_Human-Resources). Entries without consent are not rendered.

import type { Lang } from '../i18n';
type L = { de: string; en: string; fr: string };
export type Person = { name: string; role: L; bio?: L; photo?: string; group: 'board' | 'team' | 'volunteer' | 'advisory'; consent: boolean };

export const people: Person[] = [
  {
    name: 'Boaz Murinzi Murema',
    group: 'board',
    consent: true,
    role: { de: 'Vorsitzender des Vorstands · Geschäftsführung & Projektleitung', en: 'Chair of the board · Executive Director & project lead', fr: 'Président du conseil d’administration · Direction et gestion de projets' },
    bio: {
      de: 'Boaz leitet Bantu e.V. seit der Gründung 2019 und verantwortet die Projekte in Uganda, Burundi und Berlin.',
      en: 'Boaz has led Bantu e.V. since its founding in 2019 and is responsible for the projects in Uganda, Burundi and Berlin.', fr: 'Boaz dirige Bantu e.V. depuis sa fondation en 2019 et est responsable des projets en Ouganda, au Burundi et à Berlin.',
    },
    // OPEN: portrait photo -> public/images/people/boaz-murinzi-murema.jpg
  },
  // Board elected by the general assembly of 30.06.2024 (minutes, Neueintragung_2025), updated by the chair on 07.11.2026:
  // Edith Tendo Okello (elected chair) stepped back; Boaz Murinzi Murema remains chair.
  // Names and roles only – no private data. OPEN: confirm each member agrees to publication; add photos only with written consent.
  // OPEN: registration of the new board at the Amtsgericht – the register extract of 22.05.2026 still shows the previous board.
  { name: 'Anne Behner', group: 'board', consent: true, role: { de: 'Stellvertretende Vorsitzende', en: 'Deputy chair', fr: 'Vice-présidente' } },
  { name: 'Michael Miiro', group: 'board', consent: true, role: { de: 'Schatzmeister', en: 'Treasurer', fr: 'Trésorier' } },
  { name: 'Norah Masane', group: 'board', consent: true, role: { de: 'Schriftführerin', en: 'Secretary', fr: 'Secrétaire' } },
  { name: 'Aishah Nantumbwe', group: 'board', consent: true, role: { de: 'Beisitzerin · Fundraising und Ressourcenmobilisierung', en: 'Board member · Fundraising and resource mobilisation', fr: 'Membre du conseil · Collecte de fonds et mobilisation de ressources' } },
  // OPEN: team members, freelancers and volunteers who agree to be shown (group: 'team' | 'volunteer').
];

export type Org = {
  name: string;
  place: string;
  text: L;
  url?: string;
  since?: string;
  /** Logo in public/partners/ – one file or one per language. `logoDark`: logo is light and needs a dark plate. */
  logo?: string | L;
  logoDark?: boolean;
};
export const orgLogo = (o: { logo?: string | L }, lang: Lang) => (typeof o.logo === 'string' ? o.logo : o.logo?.[lang] ?? o.logo?.en);

export const partnersSouth: Org[] = [
  {
    name: 'Anchored Bridges Initiatives (ABI)',
    place: 'Kampala, Uganda',
    url: 'https://abi.ug',
    logo: '/partners/abi.webp',
    since: '2021',
    text: {
      de: 'Ugandische NGO für Bildung, Inklusion, berufliche Qualifizierung und Gemeindeentwicklung, 2017 als „Ability Beyond the Iris“ gegründet. Gemeinsame Projekte: Royal College Namugongo, Ruhaama Community Resource Centre, OURS, Okushoma kwa Boona und die Pearl Kindertagesstätte.',
      en: 'Ugandan NGO for education, inclusion, vocational training and community development, founded in 2017 as “Ability Beyond the Iris”. Joint projects: Royal College Namugongo, Ruhaama Community Resource Centre, OURS, Okushoma kwa Boona and Pearl Kindergarten.', fr: 'ONG ougandaise pour l’éducation, l’inclusion, la formation professionnelle et le développement communautaire, fondée en 2017 sous le nom « Ability Beyond the Iris ». Projets communs : Royal College Namugongo, Ruhaama Community Resource Centre, OURS, Okushoma kwa Boona et le jardin d’enfants Pearl.',
    },
  },
  {
    name: 'Ruharo Mission Hospital (OURS)',
    place: 'Mbarara, Uganda',
    url: 'https://rmh.org.ug/ours-program/',
    logo: '/partners/ruharo-mission-hospital.webp',
    text: {
      de: 'Krankenhaus der Diözese Ankole. Sein Programm OURS (Organised Useful Rehabilitation Services) begleitet seit 1995 Kinder mit Behinderung im Westen und Südwesten Ugandas. Mit OURS haben wir die Früherkennung bei Zerebralparese gestärkt (P 23/91).',
      en: 'Hospital of the Diocese of Ankole. Since 1995 its OURS programme (Organised Useful Rehabilitation Services) has supported children with disabilities in western and south-western Uganda. With OURS we strengthened early detection of cerebral palsy (P 23/91).', fr: 'Hôpital du diocèse d’Ankole. Depuis 1995, son programme OURS (Organised Useful Rehabilitation Services) accompagne les enfants en situation de handicap dans l’ouest et le sud-ouest de l’Ouganda. Avec OURS, nous avons renforcé le dépistage précoce de la paralysie cérébrale (P 23/91).',
    },
  },
  {
    name: 'Nyentsya Community Development Association (NCDA)',
    place: 'Mbarara, Uganda',
    logo: '/partners/ncda.webp',
    text: {
      de: 'Trägerin der Msingi School of BTVET. Mit NCDA haben junge Frauen eine Ausbildung in Friseurhandwerk und Kosmetik abgeschlossen (P 24/200).',
      en: 'Runs Msingi School of BTVET. With NCDA, young women completed training in hairdressing and cosmetology (P 24/200).', fr: 'Gère la Msingi School of BTVET. Avec NCDA, des jeunes femmes ont achevé une formation en coiffure et esthétique (P 24/200).',
    },
  },
  {
    name: 'Women Initiative Against Vulnerability for Harm Reduction (WIV-HR)',
    place: 'Bujumbura, Burundi',
    text: {
      de: 'Ehrenamtlich getragene Organisation im Sozial- und Gesundheitsbereich. Gemeinsam bringen wir Trinkwasser nach Ruziba (P 26/186).',
      en: 'Volunteer-run organisation in the social and health sector. Together we are bringing drinking water to Ruziba (P 26/186).', fr: 'Organisation bénévole du secteur social et de la santé. Ensemble, nous apportons l’eau potable à Ruziba (P 26/186).',
    },
  },
  {
    name: 'Royal College Namugongo',
    place: 'Namugongo, Uganda',
    text: {
      de: 'Schule, an der wir mit ABI Schulgeld für Kinder aus armen Familien übernommen und Rampen für einen stufenlosen Zugang gebaut haben.',
      en: 'School where, together with ABI, we covered school fees for children from poor families and built ramps for step-free access.', fr: 'École où, avec ABI, nous avons pris en charge les frais de scolarité d’enfants de familles pauvres et construit des rampes pour un accès sans marches.',
    },
  },
  {
    name: 'Regenerate Africa',
    place: 'Kampala, Uganda',
    url: 'https://regenerateafrica.org',
    logo: '/partners/regenerate-africa.webp',
    text: {
      de: 'Partner für Kaffee- und Kakao-Kooperativen von Frauen, Klima- und Umweltschutz, Wiederaufforstung und die Wiederherstellung von Ökosystemen.',
      en: 'Partner for women’s coffee and cocoa cooperatives, climate and environmental protection, reforestation and ecosystem restoration.', fr: 'Partenaire pour les coopératives de café et de cacao de femmes, la protection du climat et de l’environnement, le reboisement et la restauration des écosystèmes.',
    },
  },
  {
    name: 'Zinule: Balambuli Kwigate Coffee',
    place: 'Bugisu, Uganda',
    url: 'https://www.zinule.com',
    logo: '/partners/zinule.webp',
    logoDark: true,
    text: {
      de: 'Partner unseres Kaffeeprojekts: Kaffee von Kleinbäuerinnen und Kleinbauern aus der Region Bugisu am Mount Elgon, die faire Preise für ihre Bohnen erhalten.',
      en: 'Partner in our coffee project: coffee from smallholder farmers in the Bugisu region on Mount Elgon who receive fair prices for their beans.', fr: 'Partenaire de notre projet café : un café de petites exploitations de la région de Bugisu, sur le mont Elgon, qui reçoivent un prix équitable pour leurs grains.',
    },
  },
];

export const partnersNorth: Org[] = [
  {
    name: 'AfricAvenir International e.V.',
    place: 'Berlin',
    url: 'https://www.africavenir.org',
    logo: '/partners/africavenir.webp',
    text: {
      de: 'Unsere Partnerin in der allgemeinen Bildungsarbeit: Workshops, Fortbildungen und Prozessbegleitung entwickeln und gestalten wir gemeinsam, ebenso die Projekte P 26/214 und P 26/224.',
      en: 'Our partner in general education work: we design and run workshops, trainings and process support together, as well as the projects P 26/214 and P 26/224.', fr: 'Notre partenaire pour le travail éducatif général : nous concevons et animons ensemble des ateliers, des formations et des accompagnements, ainsi que les projets P 26/214 et P 26/224.',
    },
  },
  {
    name: 'Federation of Ugandans in Germany e.V. (FUG)',
    place: 'Deutschland',
    url: 'https://www.fug-ev.org',
    logo: { de: '/partners/fug-de.webp', en: '/partners/fug-en.webp', fr: '/partners/fug-en.webp' },
    text: {
      de: 'Dachverband der ugandischen Gemeinschaften in Deutschland; Kooperationspartner der Ubuntu Talks 2026 in Berlin-Mitte.',
      en: 'Umbrella organisation of Ugandan communities in Germany; cooperation partner for Ubuntu Talks 2026 in Berlin-Mitte.', fr: 'Fédération des communautés ougandaises en Allemagne ; partenaire de coopération des Ubuntu Talks 2026 à Berlin-Mitte.',
    },
  },
  {
    name: 'tubman.network e.V.',
    place: 'Berlin',
    url: 'https://tubman.network',
    text: {
      de: 'Organisation für Kinder, Jugendliche, Familien und Communities afrikanischer und afro-diasporischer Herkunft. Bantu e.V. war von 2021 bis 2025 Trägerverein ihrer Projekte.',
      en: 'Organisation for children, young people, families and communities of African and Afro-diasporic heritage. Bantu e.V. was the fiscal sponsor of its projects from 2021 to 2025.', fr: 'Organisation pour les enfants, les jeunes, les familles et les communautés d’origine africaine et afro-diasporique. Bantu e.V. a été l’association porteuse de ses projets de 2021 à 2025.',
    },
  },
  {
    name: 'Kikili e.V. i.G.',
    place: 'Sandau (Elbe)',
    url: 'https://www.kikili.de',
    text: {
      de: 'Belebt den Stadtspeicher Sandau als inklusiven Dritten Ort. Bantu e.V. ist seit 2022 Trägerverein.',
      en: 'Reviving the Sandau town granary as an inclusive third place. Bantu e.V. has been its fiscal sponsor since 2022.', fr: 'Fait revivre le grenier municipal de Sandau comme tiers-lieu inclusif. Bantu e.V. en est l’association porteuse depuis 2022.',
    },
  },
  {
    name: 'Each One Teach One (EOTO) e.V.',
    place: 'Berlin',
    url: 'https://www.eoto-archiv.de',
    logo: '/partners/eoto.svg',
    text: {
      de: 'Community-basierte Bildungs- und Empowerment-Organisation für Menschen afrikanischer Herkunft in Berlin.',
      en: 'Community-based education and empowerment organisation for People of African Descent in Berlin.', fr: 'Organisation communautaire d’éducation et d’empowerment pour les personnes d’ascendance africaine à Berlin.',
    },
  },
  {
    name: 'Wilhelm-Remy-Gymnasium Bendorf',
    place: 'Bendorf',
    url: 'https://wrg-online.de',
    logo: '/partners/wrg-bendorf.webp',
    text: {
      de: 'Partnerschule: Der Erlös der Aktion Tagwerk 2017 ging nach Uganda, unter anderem in Rampen am Royal College Namugongo. Uganda ist Thema im Englischunterricht.',
      en: 'Partner school: the proceeds of Aktion Tagwerk 2017 went to Uganda, among other things for ramps at Royal College Namugongo. Uganda is a topic in English lessons.', fr: 'École partenaire : les recettes de l’Aktion Tagwerk 2017 sont allées à l’Ouganda, entre autres pour des rampes au Royal College Namugongo. L’Ouganda est un thème des cours d’anglais.',
    },
  },
];

/** Funders of past and current projects, shown as linked logos (text tile where no logo file exists).
 *  Logos: public/funders/. OPEN: Erasmus+ (EU emblem with the funding sentence) – add when the file is available. */
export type Funder = { name: L; url: string; logo?: string; note: L };
export const funders: Funder[] = [
  { name: { de: 'Stiftung Nord-Süd-Brücken', en: 'Stiftung Nord-Süd-Brücken', fr: 'Stiftung Nord-Süd-Brücken' }, url: 'https://www.nord-sued-bruecken.de', logo: '/funders/nord-sued-bruecken.svg', note: { de: 'EZ-Kleinprojektefonds, SDG-Fonds, BIKO', en: 'Small-projects fund, SDG fund, BIKO', fr: 'Fonds pour petits projets, fonds ODD, BIKO' } },
  { name: { de: 'Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung (BMZ)', en: 'Federal Ministry for Economic Cooperation and Development (BMZ)', fr: 'Ministère fédéral allemand de la Coopération économique et du Développement (BMZ)' }, url: 'https://www.bmz.de', logo: '/funders/bmz-logo.png', note: { de: 'über Engagement Global und die Stiftung Nord-Süd-Brücken', en: 'via Engagement Global and Stiftung Nord-Süd-Brücken', fr: 'via Engagement Global et la Stiftung Nord-Süd-Brücken' } },
  { name: { de: 'Engagement Global', en: 'Engagement Global', fr: 'Engagement Global' }, url: 'https://www.engagement-global.de', logo: '/funders/engagement-global-logo.png', note: { de: 'Teams up!, SDG-Bildungsarbeit', en: 'Teams up!, SDG education', fr: 'Teams up!, éducation aux ODD' } },
  { name: { de: 'Senatsverwaltung für Bildung, Jugend und Familie Berlin', en: 'Berlin Senate Department for Education, Youth and Family', fr: 'Administration du Sénat de Berlin pour l’Éducation, la Jeunesse et la Famille' }, url: 'https://www.berlin.de/sen/bjf/', logo: '/funders/senbjf.webp', note: { de: 'BIKO: Erde, Saat und Erbe', en: 'BIKO: Soil, Seed and Heritage', fr: 'BIKO : Terre, semences et héritage' } },
  { name: { de: 'Bezirksamt Berlin-Mitte', en: 'Berlin-Mitte District Office', fr: 'Mairie d’arrondissement de Berlin-Mitte' }, url: 'https://www.berlin.de/ba-mitte/', logo: '/funders/ba-mitte.webp', note: { de: 'MITTEinander aktiv, Integrationsfonds', en: 'MITTEinander aktiv, integration fund', fr: 'MITTEinander aktiv, fonds d’intégration' } },
  { name: { de: 'Club Dialog e.V.', en: 'Club Dialog e.V.', fr: 'Club Dialog e.V.' }, url: 'https://www.club-dialog.de', logo: '/funders/club-dialog.webp', note: { de: 'MITTEinander aktiv: Ubuntu Talks', en: 'MITTEinander aktiv: Ubuntu Talks', fr: 'MITTEinander aktiv : Ubuntu Talks' } },
  { name: { de: 'EIRENE e.V.', en: 'EIRENE e.V.', fr: 'EIRENE e.V.' }, url: 'https://eirene.org', logo: '/funders/eirene.svg', note: { de: 'Kooperation und Förderung seit Dezember 2025', en: 'Cooperation and funding since December 2025', fr: 'Coopération et soutien depuis décembre 2025' } },
  { name: { de: 'Robert Bosch Stiftung', en: 'Robert Bosch Stiftung', fr: 'Robert Bosch Stiftung' }, url: 'https://www.bosch-stiftung.de', logo: '/funders/robert-bosch-stiftung.svg', note: { de: 'Safer Spaces for Mothers', en: 'Safer Spaces for Mothers', fr: 'Safer Spaces for Mothers' } },
  { name: { de: 'Deutsche Stiftung für Engagement und Ehrenamt (DSEE)', en: 'German Foundation for Engagement and Volunteering (DSEE)', fr: 'Fondation allemande pour l’engagement et le bénévolat (DSEE)' }, url: 'https://www.deutsche-stiftung-engagement-und-ehrenamt.de', logo: '/funders/dsee.svg', note: { de: 'Black Engagement Matters, Ubuntu für alle', en: 'Black Engagement Matters, Ubuntu for All', fr: 'Black Engagement Matters, Ubuntu pour tous' } },
  { name: { de: 'Deutsche Fernsehlotterie', en: 'Deutsche Fernsehlotterie', fr: 'Deutsche Fernsehlotterie' }, url: 'https://www.fernsehlotterie.de', logo: '/funders/deutsche-fernsehlotterie.svg', note: { de: 'Equal Rights for All', en: 'Equal Rights for All', fr: 'Equal Rights for All' } },
  { name: { de: 'Schmitz-Stiftungen', en: 'Schmitz-Stiftungen', fr: 'Schmitz-Stiftungen' }, url: 'https://www.schmitz-stiftungen.de', logo: '/funders/schmitz-stiftungen.svg', note: { de: 'Msingi School BTVET', en: 'Msingi School BTVET', fr: 'Msingi School BTVET' } },
  { name: { de: 'Aktion Tagwerk', en: 'Aktion Tagwerk', fr: 'Aktion Tagwerk' }, url: 'https://www.aktion-tagwerk.de', logo: '/funders/aktion-tagwerk.svg', note: { de: 'über das Wilhelm-Remy-Gymnasium Bendorf (2017)', en: 'via Wilhelm-Remy-Gymnasium Bendorf (2017)', fr: 'via le Wilhelm-Remy-Gymnasium de Bendorf (2017)' } },
  { name: { de: 'Europäische Union, Erasmus+', en: 'European Union, Erasmus+', fr: 'Union européenne, Erasmus+' }, url: 'https://erasmus-plus.ec.europa.eu', note: { de: 'Youth Eco Project', en: 'Youth Eco Project', fr: 'Youth Eco Project' } },
];
