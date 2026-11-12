// Programme portfolio of Bantu e.V. (approved by the chair, 07.11.2026).
// Every project (src/content/projects/{de,en}/<slug>.md) is assigned to exactly one programme here.
// The `programme` field in the project front matter (international | inland) is the REGION, not the programme.
import type { Lang } from '../i18n';

type L = Record<Lang, string>;
export type ProgrammeKey = 'education' | 'health' | 'cooperation' | 'civic' | 'migration';
export type Region = 'inland' | 'international';
export type Service = { title: L; text: L; region: Region; anchor: L; points?: Record<Lang, string[]>; cta?: { label: L; route: 'contact' | 'join' | 'offers' | 'sponsorship' } };
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
    slug: { de: 'bildung', en: 'education', fr: 'education' },
    icon: 'school',
    accent: 'gold',
    title: { de: 'Bildung', en: 'Education', fr: 'Éducation' },
    short: { de: 'Globales Lernen, Bildungsgerechtigkeit und Austausch', en: 'Global learning, educational justice and exchange', fr: 'Éducation globale, justice éducative et échanges' },
    lead: {
      de: 'Globales Lernen, Bildungsgerechtigkeit und Begegnung über Kontinente hinweg: In Deutschland und Uganda bauen wir historisch gewachsene Vorurteile ab und machen Lernen zugänglich: für Schulklassen, junge Menschen und die breite Öffentlichkeit.',
      en: 'Global learning, educational justice and cross-cultural exchange: in Germany and Uganda we dismantle historical biases and make learning accessible: for school classes, young people and the wider public.', fr: 'Éducation globale, justice éducative et rencontres entre continents : en Allemagne et en Ouganda, nous déconstruisons des préjugés hérités de l’histoire et rendons l’apprentissage accessible aux classes, aux jeunes et au grand public.',
    },
    focus: {
      de: ['Globales Lernen an Schulen und in der Erwachsenenbildung', 'Bildungsgerechtigkeit zwischen Uganda und Deutschland (SDG 4 und 10)', 'Dekolonisierung von Geschichte, Architektur und Landwirtschaft', 'Jugendaustausch und Dialog auf Augenhöhe', 'Bezahlbare und barrierefreie Schulbildung für Kinder aus armen Familien'],
      en: ['Global learning in schools and adult education', 'Educational justice between Uganda and Germany (SDG 4 and 10)', 'Decolonising history, architecture and agriculture', 'Youth exchange and dialogue as equals', 'Affordable and accessible schooling for children from poor families'], fr: ['Éducation globale à l’école et dans la formation des adultes', 'Justice éducative entre l’Ouganda et l’Allemagne (ODD 4 et 10)', 'Décoloniser l’histoire, l’architecture et l’agriculture', 'Échanges de jeunes et dialogue d’égal à égal', 'Une scolarité abordable et accessible pour les enfants de familles pauvres'],
    },
    projects: ['p26-214-bildung-fuer-alle', 'p26-224-erde-saat-erbe', 'okushoma-kwa-boona', 'royal-college-namugongo', 'royal-junior-namugongo-schulgeld', 'rwengoma-primary-schulessen', 'youth-eco-project'],
    services: [
      {
        title: { de: 'Allgemeine Bildungsarbeit', en: 'General education work', fr: 'Travail éducatif général' },
        region: 'inland',
        anchor: { de: 'bildungsarbeit', en: 'education-work', fr: 'travail-educatif' },
        text: {
          de: 'Workshops, Fortbildungen und Seminare zur politischen Bildung, die wir gemeinsam mit AfricAvenir International e.V. anbieten: zu globaler Gerechtigkeit, Rassismuskritik, Kolonialgeschichte und den Nachhaltigkeitszielen. Dazu kommen Prozessbegleitung, Moderation und Mediation für Organisationen. Schulen, Vereine, Verwaltungen und Teams können Formate bei uns anfragen.',
          en: 'Workshops, trainings and political-education seminars that we offer together with AfricAvenir International e.V.: on global justice, anti-racism, colonial history and the Sustainable Development Goals. We also offer process support, facilitation and mediation for organisations. Schools, associations, public bodies and teams can book formats with us.', fr: 'Des ateliers, formations et séminaires d’éducation politique que nous proposons avec AfricAvenir International e.V. : sur la justice globale, la critique du racisme, l’histoire coloniale et les objectifs de développement durable. Nous proposons aussi un accompagnement de processus, de la facilitation et de la médiation pour les organisations. Écoles, associations, administrations et équipes peuvent réserver des formats chez nous.',
        },
        cta: { label: { de: 'Zu unseren Bildungsangeboten', en: 'See our workshops and training', fr: 'Voir nos ateliers et formations' }, route: 'offers' },
      },
      {
        // "Education into the Future": education sponsorships with ABI in Uganda (chair, 09.11.2026). Full programme + online form at /mitmachen/bildungspatenschaft/.
        title: { de: 'Education into the Future: Bildungspatenschaften in Uganda', en: 'Education into the Future: education sponsorships in Uganda', fr: 'Education into the Future : parrainages éducatifs en Ouganda' },
        region: 'international',
        anchor: { de: 'bildungspatenschaften', en: 'education-sponsorships', fr: 'parrainages-educatifs' },
        text: {
          de: 'Unser Patenschaftsprogramm mit Anchored Bridges Initiatives (ABI) verbindet Förderung an den Übergängen, an denen Bildungswege abbrechen: von der frühen Bildung über barrierefreies Lernen und die weiterführende Schule bis zur beruflichen Ausbildung. Patinnen und Paten wählen Betrag, Rhythmus und Bildungsstufe; ABI und die Partnerschulen schlagen Lernende vor, deren Bildungsweg aus finanziellen, behinderungsbedingten oder sozialen Gründen gefährdet ist. Ab 25 EUR im Monat, mit Zuwendungsbestätigung und einem Bericht mindestens einmal im Jahr.',
          en: 'Our sponsorship programme with Anchored Bridges Initiatives (ABI) connects support at the transitions where education breaks off: from early childhood through accessible learning and secondary school to vocational training. Sponsors choose the amount, rhythm and education stage; ABI and the partner schools propose learners whose education is at risk for financial, disability-related or social reasons. From 25 EUR a month, with a donation receipt and a report at least once a year.',
          fr: 'Notre programme de parrainage avec Anchored Bridges Initiatives (ABI) relie le soutien aux transitions où les parcours s’interrompent : de la petite enfance à la formation professionnelle, en passant par l’apprentissage accessible et le secondaire. Les marraines et parrains choisissent le montant, le rythme et l’étape éducative ; ABI et les écoles partenaires proposent des élèves dont le parcours est menacé pour des raisons financières, liées au handicap ou sociales. Dès 25 EUR par mois, avec reçu fiscal et un rapport au moins une fois par an.',
        },
        points: {
          de: ['Frühe Bildung: Pearl Kindergarten Kampala (25 EUR im Monat)', 'Barrierefreies Lernen: Rwera Unit for the Deaf, Uganda School for the Deaf (25 EUR)', 'Weiterführende Schule: Royal College Namugongo, 30 % Gebührenermäßigung der Schule (40 EUR)', 'Ausbildung, Pflege und Hebammenwesen: Entebbe Atuwanguza Memorial School, Lyantonde School of Nursing and Midwifery, Nakawa Vocational Training College (70 EUR)'],
          en: ['Early childhood: Pearl Kindergarten Kampala (25 EUR a month)', 'Accessible learning: Rwera Unit for the Deaf, Uganda School for the Deaf (25 EUR)', 'Secondary school: Royal College Namugongo, 30 % tuition reduction by the school (40 EUR)', 'Vocational, nursing and midwifery training: Entebbe Atuwanguza Memorial School, Lyantonde School of Nursing and Midwifery, Nakawa Vocational Training College (70 EUR)'],
          fr: ['Petite enfance : Pearl Kindergarten Kampala (25 EUR par mois)', 'Apprentissage accessible : Rwera Unit for the Deaf, Uganda School for the Deaf (25 EUR)', 'Secondaire : Royal College Namugongo, 30 % de réduction accordée par l’école (40 EUR)', 'Formation professionnelle, soins infirmiers et obstétricaux : Entebbe Atuwanguza Memorial School, Lyantonde School of Nursing and Midwifery, Nakawa Vocational Training College (70 EUR)'],
        },
        cta: { label: { de: 'Zum Programm und zur Patenschaft', en: 'Programme and sponsorship form', fr: 'Programme et formulaire de parrainage' }, route: 'sponsorship' },
      },
    ],
    sdgs: [4, 10, 17],
  },
  {
    key: 'health',
    no: 2,
    slug: { de: 'gesundheit', en: 'health', fr: 'sante' },
    icon: 'heart',
    accent: 'red',
    title: { de: 'Gesundheit', en: 'Health', fr: 'Santé' },
    short: { de: 'Rehabilitation, Barrierefreiheit und Versorgung', en: 'Rehabilitation, accessibility and care', fr: 'Réadaptation, accessibilité et soins' },
    lead: {
      de: 'Wir verbessern das körperliche Wohlbefinden, die Barrierefreiheit und die spezialisierte Versorgung von Menschen, die im herkömmlichen Gesundheitssystem auf Hürden stoßen, besonders von Kindern mit Behinderung und ihren Familien.',
      en: 'We improve physical well-being, accessibility and specialised care for people who face barriers in conventional health systems, especially children with disabilities and their families.', fr: 'Nous améliorons le bien-être physique, l’accessibilité et les soins spécialisés pour les personnes qui rencontrent des obstacles dans les systèmes de santé classiques, en particulier les enfants en situation de handicap et leurs familles.',
    },
    focus: {
      de: ['Früherkennung und Rehabilitation bei Zerebralparese', 'Physiotherapie und gemeindenahe Versorgung', 'Stärkung von Eltern und Selbsthilfegruppen', 'Aufklärung gegen Stigmatisierung von Behinderung'],
      en: ['Early detection and rehabilitation for cerebral palsy', 'Physiotherapy and community-based care', 'Supporting parents and self-help groups', 'Awareness raising against the stigma of disability'], fr: ['Dépistage précoce et réadaptation en cas de paralysie cérébrale', 'Physiothérapie et soins de proximité', 'Soutien aux parents et groupes d’entraide', 'Sensibilisation contre la stigmatisation du handicap'],
    },
    projects: ['p23-91-ours-zerebralparese', 'mobilitaetshilfen-uganda-2018'],
    sdgs: [3, 10],
  },
  {
    key: 'cooperation',
    no: 3,
    slug: { de: 'globale-zusammenarbeit', en: 'global-cooperation', fr: 'cooperation-globale' },
    icon: 'globe',
    accent: 'green',
    title: { de: 'Globale Zusammenarbeit & Lebensgrundlagen', en: 'Global Cooperation & Livelihoods', fr: 'Coopération globale et moyens de subsistance' },
    short: { de: 'Entwicklungszusammenarbeit in Uganda und Burundi', en: 'Development cooperation in Uganda and Burundi', fr: 'Coopération au développement en Ouganda et au Burundi' },
    lead: {
      de: 'Nachhaltige wirtschaftliche Selbstständigkeit, lebenswichtige Infrastruktur und widerstandsfähige Gemeinden: Gemeinsam mit lokalen Partnerorganisationen in Uganda und Burundi schaffen wir Zugang zu frühkindlicher und beruflicher Bildung, Trinkwasser, digitaler Teilhabe und Einkommen. Die Partner planen und setzen um; Bantu e.V. beantragt die Förderung in Deutschland, begleitet die Umsetzung und rechnet transparent ab.',
      en: 'Sustainable economic empowerment, vital infrastructure and resilient communities: together with local partner organisations in Uganda and Burundi we create access to early childhood and vocational education, drinking water, digital participation and income. Our partners plan and implement; Bantu e.V. secures funding in Germany, accompanies implementation and accounts for every euro.', fr: 'Autonomie économique durable, infrastructures vitales et communautés résilientes : avec des organisations partenaires locales en Ouganda et au Burundi, nous ouvrons l’accès à l’éducation de la petite enfance et à la formation professionnelle, à l’eau potable, à la participation numérique et à des revenus. Nos partenaires planifient et mettent en œuvre ; Bantu e.V. obtient les financements en Allemagne, accompagne la mise en œuvre et rend compte de chaque euro.',
    },
    focus: {
      de: ['Frühkindliche Bildung und sichere Betreuung', 'Wasser, Sanitärversorgung und Hygiene (WASH)', 'Berufliche Bildung (TVET) mit anerkanntem Abschluss', 'Digitale Teilhabe und IT-Kompetenzen', 'Einkommen durch Nutztierhaltung und Landwirtschaft'],
      en: ['Early childhood education and safe day care', 'Water, sanitation and hygiene (WASH)', 'Technical and vocational education (TVET) with certification', 'Digital inclusion and IT skills', 'Income from livestock and agriculture'], fr: ['Éducation de la petite enfance et accueil sûr', 'Eau, assainissement et hygiène (WASH)', 'Formation technique et professionnelle (TVET) certifiante', 'Inclusion numérique et compétences informatiques', 'Revenus grâce à l’élevage et à l’agriculture'],
    },
    projects: ['p26-230-pearl-kita-kampala', 'p26-186-wasser-fuer-ruziba', 'p24-200-msingi-school', 'ruhaama-community-resource-centre', 'nutztiere-und-landwirtschaft', 'handwerk-frauen-mit-behinderung'],
    sdgs: [1, 4, 5, 6, 8],
  },
  {
    key: 'civic',
    no: 4,
    slug: { de: 'engagement-und-rechte', en: 'civic-engagement-and-rights', fr: 'engagement-civique-et-droits' },
    icon: 'people',
    accent: 'blue',
    title: { de: 'Zivilgesellschaftliches Engagement & Rechte', en: 'Civic Engagement & Rights', fr: 'Engagement civique et droits' },
    short: { de: 'Antirassismus, Empowerment und Gemeinschaft', en: 'Anti-racism, empowerment and community', fr: 'Antiracisme, empowerment et communauté' },
    lead: {
      de: 'Antirassismus, Antidiskriminierung, politisches Empowerment und Gemeinschaft: Wir stärken die afrikanische Diaspora und marginalisierte Gruppen in Deutschland: mit Begegnungsräumen, Vernetzung Schwarzer Organisationen und lokalen Orten des Miteinanders.',
      en: 'Anti-racism, anti-discrimination, political empowerment and community building: we strengthen the African diaspora and marginalised groups in Germany: with spaces for encounter, networks of Black-led organisations and local places of togetherness.', fr: 'Antiracisme, lutte contre les discriminations, empowerment politique et vie communautaire : nous renforçons la diaspora africaine et les groupes marginalisés en Allemagne, avec des espaces de rencontre, des réseaux d’organisations dirigées par des personnes noires et des lieux de vie commune.',
    },
    focus: {
      de: ['Sichere Räume für Begegnung, Austausch und Empowerment', 'Vernetzung und Kapazitätsaufbau Schwarzer Organisationen', 'Kulturelle Identität und Selbstbewusstsein junger Menschen', 'Gemeinschaftsorte im ländlichen Raum'],
      en: ['Safe spaces for encounter, exchange and empowerment', 'Networking and capacity building for Black-led organisations', 'Cultural identity and self-confidence of young people', 'Community spaces in rural areas'], fr: ['Des espaces sûrs pour la rencontre, l’échange et l’empowerment', 'Mise en réseau et renforcement des organisations dirigées par des personnes noires', 'Identité culturelle et confiance en soi des jeunes', 'Lieux communautaires en milieu rural'],
    },
    projects: ['ubuntu-talks-2026', 'black-engagement-matters', 'fashion-empowerment', 'kikili-stadtspeicher-sandau'],
    sdgs: [10, 16, 11],
  },
  {
    key: 'migration',
    no: 5,
    slug: { de: 'migration-und-integration', en: 'migration-and-integration', fr: 'migration-et-integration' },
    icon: 'hand',
    accent: 'purple',
    title: { de: 'Migration & Integration', en: 'Migration & Integration', fr: 'Migration et intégration' },
    short: { de: 'Beratung und Begleitung für Geflüchtete', en: 'Advice and support for refugees', fr: 'Conseil et accompagnement des personnes réfugiées' },
    lead: {
      de: 'Wir unterstützen, beraten und begleiten Geflüchtete und Migrant*innen, die sich ein Leben in Deutschland aufbauen: kultursensibel, mehrsprachig und mit Blick auf Mehrfachdiskriminierung.',
      en: 'We support, advise and accompany refugees and migrants building their lives in Germany: culturally sensitive, multilingual and aware of intersectional discrimination.', fr: 'Nous soutenons, conseillons et accompagnons les personnes réfugiées et migrantes qui construisent leur vie en Allemagne, avec sensibilité culturelle, en plusieurs langues et en tenant compte des discriminations multiples.',
    },
    focus: {
      de: ['Unterstützung für BIPoC-Geflüchtete, u. a. aus der Ukraine', 'Orientierung in Asyl-, Aufenthalts- und Behördenverfahren', 'Sprachkurse, Bewerbungs- und Jobunterstützung', 'Psychosoziale Begleitung und Räume für Mütter und Familien'],
      en: ['Support for BIPoC refugees, including from Ukraine', 'Guidance through asylum, residence and administrative procedures', 'Language courses, application and job support', 'Psychosocial support and spaces for mothers and families'], fr: ['Soutien aux personnes réfugiées BIPoC, notamment venues d’Ukraine', 'Orientation dans les procédures d’asile, de séjour et administratives', 'Cours de langue, aide aux candidatures et à l’emploi', 'Soutien psychosocial et espaces pour les mères et les familles'],
    },
    projects: ['ubuntu-fuer-alle', 'safer-spaces-tubman-network'],
    services: [
      {
        title: { de: 'Verfahrensberatung', en: 'Procedural advice', fr: 'Conseil sur les procédures' },
        region: 'inland',
        anchor: { de: 'beratung', en: 'advice', fr: 'conseil' },
        text: {
          de: 'Praktische Beratung für Migrant*innen und Geflüchtete zu Asyl- und Aufenthaltsverfahren und Behördenwegen: Wir helfen, Schreiben und Bescheide zu verstehen, Fristen im Blick zu behalten, Anträge vorzubereiten und die zuständigen Stellen zu finden. Für eine Rechtsvertretung vermitteln wir an Fachanwält*innen und Beratungsstellen.',
          en: 'Hands-on advice for migrants and refugees on asylum and residence procedures and administrative processes: we help people understand letters and decisions, keep track of deadlines, prepare applications and find the right authorities. For legal representation we refer to specialised lawyers and counselling services.', fr: 'Un conseil concret pour les personnes migrantes et réfugiées sur les procédures d’asile et de séjour et les démarches administratives : nous aidons à comprendre courriers et décisions, à suivre les délais, à préparer les demandes et à trouver les bons services. Pour une représentation juridique, nous orientons vers des avocats spécialisés et des services de conseil.',
        },
        cta: { label: { de: 'Beratung anfragen', en: 'Ask for advice', fr: 'Demander un conseil' }, route: 'contact' },
      },
    ],
    sdgs: [10, 16],
  },
];

/** Programme 6: the framework behind all programmes (no projects of its own). */
export const management = {
  no: 6,
  title: { de: 'Programmsteuerung & strategische Entwicklung', en: 'Programme Management & Strategic Operations', fr: 'Pilotage des programmes et développement stratégique' } as L,
  lead: {
    de: 'Der übergreifende Rahmen, der rechtliche und förderrechtliche Sorgfalt, Synergien zwischen den Programmen und nachhaltiges Wachstum auf beiden Kontinenten sichert.',
    en: 'The overarching framework that ensures institutional and funding compliance, synergy between programmes and sustainable growth on both continents.', fr: 'Le cadre commun qui garantit la conformité institutionnelle et financière, les synergies entre les programmes et une croissance durable sur les deux continents.',
  } as L,
  items: {
    de: ['Steuerung der internationalen Partnerschaften', 'Wirkungsmonitoring und transparente Abrechnung jedes Projekts', 'Koordination von Ehrenamtlichen und Honorarkräften', 'Trägerschaft und Begleitung junger Initiativen', 'Ausrichtung aller Projekte an unserer Vision von globaler Gerechtigkeit und gemeinsamer Menschlichkeit'],
    en: ['Managing international partnerships', 'Impact monitoring and transparent accounting for every project', 'Coordinating volunteers and freelancers', 'Fiscal sponsorship and incubation of young initiatives', 'Aligning every project with our vision of global justice and shared humanity'], fr: ['Pilotage des partenariats internationaux', 'Suivi de l’impact et décompte transparent de chaque projet', 'Coordination des bénévoles et des intervenants', 'Portage et accompagnement de jeunes initiatives', 'Orientation de chaque projet vers notre vision de justice globale et d’humanité partagée'],
  } as Record<Lang, string[]>,
};

/** Initiatives for which Bantu e.V. acts (or acted) as Trägerverein / fiscal sponsor.
 *  `slugs` runs parallel to `projects`: a project file name links the list item to its project page. */
export type Trusteeship = {
  name: string;
  url: string;
  place: string;
  period: L;
  text: L;
  projectsHeading?: L;
  projects: Record<Lang, string[]>;
  slugs?: (string | undefined)[];
};
export const trusteeships: Trusteeship[] = [
  {
    name: 'tubman.network e.V.',
    url: 'https://tubman.network',
    place: 'Berlin',
    // OPEN: end year. The last Bantu projects implemented by the Tubman team (Black Engagement Matters, Youth Eco Project) ended in 2024;
    // "until 2025" referred only to ParentCircle, which the chair confirmed on 08.11.2026 is not a Bantu e.V. project.
    period: { de: '2021–2024', en: '2021–2024', fr: '2021–2024' },
    text: {
      de: 'tubman.network arbeitet mit Kindern, Jugendlichen, Familien und Communities afrikanischer und afro-diasporischer Herkunft: durch Bildung, psychosoziale Unterstützung, Empowerment und Kunst. Bis Januar 2024 war Tubman.Network eine Initiative unter dem Dach von Bantu e.V., seitdem ist es ein eigener Verein (VR 40776 B). Die Projekte unten waren Projekte von Bantu e.V.: Wir waren Träger, haben die Fördermittel verwaltet, Verwendungsnachweise erstellt sowie Personal und Verträge betreut; umgesetzt hat sie das Team von Tubman.Network. ParentCircle war ein Projekt von tubman.network e.V. selbst und kein Projekt von Bantu e.V.',
      en: 'tubman.network works with children, young people, families and communities of African and Afro-diasporic heritage: through education, psychosocial support, empowerment and the arts. Until January 2024 Tubman.Network was an initiative under the umbrella of Bantu e.V.; since then it has been an association of its own (VR 40776 B). The projects below were Bantu e.V. projects: we were the responsible organisation, managed the grants, prepared the financial reports and handled staff and contracts; the Tubman.Network team implemented them. ParentCircle was a project of tubman.network e.V. itself, not of Bantu e.V.',
      fr: 'tubman.network travaille avec des enfants, des jeunes, des familles et des communautés d’origine africaine et afro-diasporique : par l’éducation, le soutien psychosocial, l’empowerment et les arts. Jusqu’en janvier 2024, Tubman.Network était une initiative sous l’égide de Bantu e.V. ; depuis, c’est une association à part entière (VR 40776 B). Les projets ci-dessous étaient des projets de Bantu e.V. : nous en étions la structure responsable, gérions les subventions, établissions les décomptes et nous occupions du personnel et des contrats ; l’équipe de Tubman.Network les a mis en œuvre. ParentCircle était un projet de tubman.network e.V. lui-même, et non de Bantu e.V.',
    },
    projectsHeading: { de: 'Projekte von Bantu e.V., umgesetzt vom Team von Tubman.Network', en: 'Bantu e.V. projects implemented by the Tubman.Network team', fr: 'Projets de Bantu e.V. mis en œuvre par l’équipe de Tubman.Network' },
    projects: {
      de: ['FashionEmpowerment (2023, Bezirksamt Berlin-Mitte)', 'Safer Spaces for Mothers: Mama Circle (2023–2024, Robert Bosch Stiftung)', 'Equal Rights for All (2023, Deutsche Fernsehlotterie)', 'Black Engagement Matters (2023–2024, DSEE)', 'Youth Eco Project (2024, Erasmus+)'],
      en: ['FashionEmpowerment (2023, Berlin-Mitte District Office)', 'Safer Spaces for Mothers: Mama Circle (2023–2024, Robert Bosch Stiftung)', 'Equal Rights for All (2023, Deutsche Fernsehlotterie)', 'Black Engagement Matters (2023–2024, DSEE)', 'Youth Eco Project (2024, Erasmus+)'],
      fr: ['FashionEmpowerment (2023, Bezirksamt Berlin-Mitte)', 'Safer Spaces for Mothers : Mama Circle (2023–2024, Robert Bosch Stiftung)', 'Equal Rights for All (2023, Deutsche Fernsehlotterie)', 'Black Engagement Matters (2023–2024, DSEE)', 'Youth Eco Project (2024, Erasmus+)'],
    },
    slugs: ['fashion-empowerment', 'safer-spaces-tubman-network', 'ubuntu-fuer-alle', 'black-engagement-matters', 'youth-eco-project'],
  },
  {
    name: 'Kikili e.V. i.G.',
    url: 'https://www.kikili.de',
    place: 'Sandau (Elbe), Sachsen-Anhalt',
    period: { de: 'seit 2022', en: 'since 2022', fr: 'depuis 2022' },
    text: {
      de: 'Kikili belebt in Sandau (Elbe), der kleinsten Stadt Sachsen-Anhalts, den denkmalgeschützten ehemaligen Stadtspeicher als inklusiven „Dritten Ort“: mit Erinnerungskultur, Bildungs- und Kulturangeboten für Jung und Alt und einer Plattform für Initiativen zu sozialer Gerechtigkeit, Umweltschutz und Inklusion. Das Projekt wird vollständig und eigenständig von Frau Vicky Germain als Bauherr*in und Projektleitung geführt. Bantu e.V. ist Trägerverein und stellt Gemeinnützigkeit und Verwaltung zur Verfügung, bis Kikili als eigener Verein eingetragen ist.',
      en: 'In Sandau (Elbe), the smallest town in Saxony-Anhalt, Kikili is reviving the listed former town granary (“Stadtspeicher”) as an inclusive “third place”: with remembrance culture, education and cultural activities for young and old and a platform for initiatives working on social justice, environmental protection and inclusion. The project is managed fully and independently by Ms Vicky Germain as developer (Bauherr*in) and project lead. Bantu e.V. is its fiscal sponsor and provides charitable status and administration until Kikili is registered as an association of its own.',
      fr: 'À Sandau (Elbe), la plus petite ville de Saxe-Anhalt, Kikili fait revivre l’ancien grenier municipal classé (« Stadtspeicher ») comme « tiers-lieu » inclusif : avec un travail de mémoire, des activités éducatives et culturelles pour tous les âges et une plateforme pour des initiatives en faveur de la justice sociale, de l’environnement et de l’inclusion. Le projet est dirigé entièrement et de manière autonome par Mme Vicky Germain, maître d’ouvrage et cheffe de projet. Bantu e.V. en est l’association porteuse et met à disposition son statut d’intérêt général et son administration jusqu’à ce que Kikili soit inscrite comme association.',
    },
    projects: {
      de: ['Rettung und Belebung des Stadtspeichers Sandau', 'Tag des offenen Denkmals 2026 (13.09.2026): Workshop Landschaftszeichnen und Konzert'],
      en: ['Rescue and revival of the Sandau town granary', 'Heritage Open Day 2026 (13.09.2026): landscape drawing workshop and concert'],
      fr: ['Sauvetage et renouveau du grenier municipal de Sandau', 'Journées du patrimoine 2026 (13.09.2026) : atelier de dessin de paysage et concert'],
    },
    slugs: ['kikili-stadtspeicher-sandau'],
  },
];

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
export const programmePath = (lang: Lang, key: ProgrammeKey) => {
  const p = programmes.find((x) => x.key === key)!;
  return `${base}${lang === 'de' ? '/programme/' : `/${lang}/programmes/`}${p.slug[lang]}/`;
};
export const programmeByKey = (k: ProgrammeKey) => programmes.find((p) => p.key === k)!;
export const programmeOfProject = (slug: string) => programmes.find((p) => p.projects.includes(slug));

/** The two areas of work. Each region page lists the programmes that have projects there. */
export const regions = [
  {
    key: 'inland' as Region,
    slug: { de: 'inlandsarbeit', en: 'work-in-germany', fr: 'travail-en-allemagne' } as L,
    title: { de: 'Inlandsarbeit', en: 'Work in Germany', fr: 'Travail en Allemagne' } as L,
    navTitle: { de: 'Inlandsarbeit', en: 'Work in Germany', fr: 'Travail en Allemagne' } as L,
    icon: 'people',
    image: '/images/ubuntu-talks-2026-illustration.webp',
    places: { de: 'Berlin · Sachsen-Anhalt · bundesweit', en: 'Berlin · Saxony-Anhalt · across Germany', fr: 'Berlin · Saxe-Anhalt · toute l’Allemagne' } as L,
    navLead: { de: 'Bildung, Begegnung, Beratung und Trägerschaften in Berlin und bundesweit.', en: 'Education, encounter, advice and fiscal sponsorship in Berlin and across Germany.', fr: 'Éducation, rencontres, conseil et portage d’initiatives à Berlin et dans toute l’Allemagne.' } as L,
    lead: {
      de: 'In Berlin und bundesweit verbinden wir Globales Lernen mit Empowerment: Bildungsprojekte an Schulen, Begegnungsräume für die afrikanische Diaspora und ihre Nachbarschaften, Beratung für Geflüchtete und Migrant*innen und Trägerschaften für junge Initiativen.',
      en: 'In Berlin and across Germany we combine global learning with empowerment: education projects in schools, spaces of encounter for the African diaspora and their neighbours, advice for refugees and migrants, and fiscal sponsorship for young initiatives.', fr: 'À Berlin et dans toute l’Allemagne, nous relions éducation globale et empowerment : projets éducatifs dans les écoles, espaces de rencontre pour la diaspora africaine et ses voisins, conseil pour les personnes réfugiées et migrantes, et portage de jeunes initiatives.',
    } as L,
    principles: {
      de: ['Globales Lernen mit Stimmen aus dem Globalen Süden, live zugeschaltet', 'Barrierearme Formate: kostenfrei, mit Kinderbetreuung und Übersetzung', 'Communities gestalten selbst. Sie sind keine Hilfeempfangenden', 'Kooperation mit Schulen, Bezirken und Partnervereinen'],
      en: ['Global learning with voices from the Global South, joining live', 'Low-barrier formats: free of charge, with childcare and interpretation', 'Communities shape the work themselves. They are not recipients of help', 'Cooperation with schools, districts and partner associations'], fr: ['L’éducation globale avec des voix du Sud global, en direct', 'Des formats accessibles : gratuits, avec garde d’enfants et interprétation', 'Les communautés façonnent elles-mêmes le travail. Elles ne sont pas des bénéficiaires d’aide', 'Coopération avec les écoles, les arrondissements et les associations partenaires'],
    } as Record<Lang, string[]>,
  },
  {
    key: 'international' as Region,
    slug: { de: 'auslandsarbeit', en: 'international-cooperation', fr: 'cooperation-internationale' } as L,
    title: { de: 'Internationale Zusammenarbeit', en: 'International Cooperation', fr: 'Coopération internationale' } as L,
    navTitle: { de: 'Internationale Zusammenarbeit (Auslandsarbeit)', en: 'International Cooperation', fr: 'Coopération internationale' } as L,
    icon: 'globe',
    image: '/images/hero/okb-gruppe-veranda-r5-800.webp',
    places: { de: 'Uganda · Burundi', en: 'Uganda · Burundi', fr: 'Ouganda · Burundi' } as L,
    navLead: { de: 'Mit Partnern in Uganda und Burundi: Bildung, Gesundheit, Wasser und Einkommen.', en: 'With partners in Uganda and Burundi: education, health, water and income.', fr: 'Avec nos partenaires en Ouganda et au Burundi : éducation, santé, eau et revenus.' } as L,
    lead: {
      de: 'Mit Partnerorganisationen in Uganda und Burundi schaffen wir Zugang zu Bildung, Gesundheit, Trinkwasser, beruflicher Qualifizierung und Einkommen. Die Partner vor Ort planen und setzen um; Bantu e.V. beantragt die Förderung in Deutschland, begleitet die Umsetzung und rechnet transparent ab.',
      en: 'With partner organisations in Uganda and Burundi we create access to education, health care, drinking water, vocational training and income. Our local partners plan and implement; Bantu e.V. secures funding in Germany, accompanies implementation and accounts for every euro.', fr: 'Avec des organisations partenaires en Ouganda et au Burundi, nous ouvrons l’accès à l’éducation, aux soins de santé, à l’eau potable, à la formation professionnelle et aux revenus. Nos partenaires locaux planifient et mettent en œuvre ; Bantu e.V. obtient les financements en Allemagne, accompagne la mise en œuvre et rend compte de chaque euro.',
    } as L,
    principles: {
      de: ['Partnerschaft auf Augenhöhe: Die Gemeinden entscheiden, was gebraucht wird', 'Kritischer Blick auf „Entwicklungszusammenarbeit“ und neokoloniale Muster', 'Nachhaltigkeit von Anfang an: Betriebskonzepte, lokale Fachkräfte, Wartung', 'Inklusion als Querschnittsthema, besonders für Menschen mit Behinderung'],
      en: ['Partnership as equals: communities decide what is needed', 'A critical view of “development” and neo-colonial patterns', 'Sustainability from day one: operating plans, local staff, maintenance', 'Inclusion as a cross-cutting theme, especially for people with disabilities'], fr: ['Un partenariat d’égal à égal : les communautés décident de ce dont elles ont besoin', 'Un regard critique sur le « développement » et les schémas néocoloniaux', 'La durabilité dès le premier jour : plans d’exploitation, personnel local, entretien', 'L’inclusion comme thème transversal, en particulier pour les personnes en situation de handicap'],
    } as Record<Lang, string[]>,
  },
];
/** Programme page inside a work area, e.g. /inlandsarbeit/bildung/ or /en/international-cooperation/health/ */
export const regionProgrammePath = (lang: Lang, region: Region, key: ProgrammeKey) => {
  const rg = regions.find((x) => x.key === region)!;
  const p = programmes.find((x) => x.key === key)!;
  return `${base}${lang === 'de' ? '/' : `/${lang}/`}${rg.slug[lang]}/${p.slug[lang]}/`;
};
export const regionPath = (lang: Lang, key: Region) => {
  const r = regions.find((x) => x.key === key)!;
  return `${base}${lang === 'de' ? '/' : `/${lang}/`}${r.slug[lang]}/`;
};
