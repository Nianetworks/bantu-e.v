// Events page (/veranstaltungen/, /en/events/, /fr/evenements/): everything that is NOT a news file with
// `type: event`. News events (with detail page, registration, JSON-LD) stay in src/content/news and are merged
// in by src/lib/events.ts. Upcoming / ongoing / past is decided at build time (nightly rebuild).
//
// Dates: 'YYYY-MM-DD' (day), 'YYYY-MM' (month) or 'YYYY' (year); the format sets how precisely the date is shown.
// Sources (chair's instruction 09.11.2026: list all past, current and future events):
//   project pages on this website; Jahresberichte Inland 2022–2024 and Ausland 2023–2025 (Finanzamt, May 2026);
//   Sachbericht P 24/200 (certification ceremony, June 2025); news report on the cupping 28.09.2026.
// Only facts from these documents. No names of private persons without consent (participants stay anonymous).
import type { L } from './shop';

export type EventKind = 'training' | 'community' | 'workshop' | 'conference' | 'exchange' | 'culture' | 'tasting' | 'celebration' | 'art' | 'school';

export const kindLabel: Record<EventKind | 'event', L> = {
  training: { de: 'Schulung', en: 'Training', fr: 'Formation' },
  community: { de: 'Begegnung', en: 'Community', fr: 'Rencontre' },
  workshop: { de: 'Workshop', en: 'Workshop', fr: 'Atelier' },
  conference: { de: 'Konferenz', en: 'Conference', fr: 'Conférence' },
  exchange: { de: 'Austausch', en: 'Exchange', fr: 'Échange' },
  culture: { de: 'Kultur', en: 'Culture', fr: 'Culture' },
  tasting: { de: 'Verkostung', en: 'Tasting', fr: 'Dégustation' },
  celebration: { de: 'Feier', en: 'Ceremony', fr: 'Cérémonie' },
  art: { de: 'Kunst', en: 'Art', fr: 'Art' },
  school: { de: 'Schulprojekt', en: 'School project', fr: 'Projet scolaire' },
  event: { de: 'Veranstaltung', en: 'Event', fr: 'Événement' },
};

export interface EventEntry {
  id: string;
  start: string;
  end?: string;
  kind: EventKind;
  title: L;
  summary: L;
  place?: L;
  time?: L;
  /** Recurring formats: "jeden Sonntag", "wöchentlich" */
  rhythm?: L;
  /** e.g. "not open to the public" */
  note?: L;
  highlights?: { date: string; label?: L; text: L }[];
  project?: string;
  news?: string;
  image?: { src: string; alt: L };
}

// Historical projects (chair, 12.11.2026): Bantu e.V.'s Trägerschaft, implemented by tubman.network.
const tubman: L = { de: 'Trägerschaft: Bantu e.V. · Umsetzung: tubman.network.', en: 'Legal and administrative project sponsorship: Bantu e.V. · Implementation: tubman.network.', fr: 'Portage juridique et administratif : Bantu e.V. · Mise en œuvre : tubman.network.' };
const join = (a: L, b: L): L => ({ de: `${a.de} ${b.de}`, en: `${a.en} ${b.en}`, fr: `${a.fr} ${b.fr}` });
const berlin: L = { de: 'Berlin', en: 'Berlin', fr: 'Berlin' };
const online: L = { de: 'Online', en: 'Online', fr: 'En ligne' };
const weekly: L = { de: 'wöchentlich', en: 'weekly', fr: 'chaque semaine' };

export const eventEntries: EventEntry[] = [
  // ───────── 2026
  {
    id: 'erde-saat-erbe-schulen',
    start: '2026-09',
    end: '2026-12',
    kind: 'school',
    title: { de: 'Erde, Saat und Erbe: Workshops an Berliner Schulen', en: 'Soil, Seed and Heritage: workshops at Berlin schools', fr: 'Terre, semences et héritage : ateliers dans des écoles berlinoises' },
    summary: {
      de: 'Drei Lerngruppen der Klassen 9 bis 11 bauen ein Stampflehm-Element, säen und beobachten, erkunden koloniale Spuren im Afrikanischen Viertel in Wedding und zeigen ihre Ergebnisse zum Abschluss in einer Mini-Ausstellung an ihrer Schule. In Kooperation mit AfricAvenir International e.V.',
      en: 'Three learning groups from grades 9 to 11 build a rammed-earth element, sow and observe, explore colonial traces in the African Quarter in Wedding and present their results in a mini exhibition at their school. In cooperation with AfricAvenir International e.V.',
      fr: 'Trois groupes d’élèves de la 9e à la 11e année construisent un élément en pisé, sèment et observent, explorent les traces coloniales du Quartier africain à Wedding et présentent leurs résultats dans une mini-exposition dans leur école. En coopération avec AfricAvenir International e.V.',
    },
    place: { de: 'Berliner Schulen', en: 'Berlin schools', fr: 'Écoles berlinoises' },
    note: { de: 'Für die beteiligten Schulklassen, nicht öffentlich.', en: 'For the participating school classes, not open to the public.', fr: 'Réservé aux classes participantes, non ouvert au public.' },
    project: 'p26-224-erde-saat-erbe',
    news: 'erde-saat-erbe-start',
  },
  {
    id: 'kaffee-cupping-2026',
    start: '2026-09-28',
    kind: 'tasting',
    title: { de: 'Ugandan Coffee Cupping Session: The journey behind every bean', en: 'Ugandan Coffee Cupping Session: The journey behind every bean', fr: 'Ugandan Coffee Cupping Session : The journey behind every bean' },
    summary: {
      de: 'Verkostung ugandischer Kaffees mit unserem Partner Symple Coffee Roasters, in Zusammenarbeit mit Regenerate Africa. Zu Gast waren unter anderem Robert, Direktor der Rugyeyo Farm in Uganda, und Ronald von der ugandischen Botschaft.',
      en: 'A tasting of Ugandan coffees with our partner Symple Coffee Roasters, in cooperation with Regenerate Africa. Our guests included Robert, Director of Rugyeyo Farm in Uganda, and Ronald from the Ugandan Embassy.',
      fr: 'Dégustation de cafés ougandais avec notre partenaire Symple Coffee Roasters, en coopération avec Regenerate Africa. Parmi nos invités : Robert, directeur de la Rugyeyo Farm en Ouganda, et Ronald, de l’ambassade d’Ouganda.',
    },
    place: { de: 'Symple Coffee Roasters, Sredzkistraße 45, 10435 Berlin', en: 'Symple Coffee Roasters, Sredzkistraße 45, 10435 Berlin', fr: 'Symple Coffee Roasters, Sredzkistraße 45, 10435 Berlin' },
    time: { de: '17 Uhr', en: '5 pm', fr: '17 h' },
    news: 'kaffee-cupping-symple-coffee-roasters',
    image: {
      src: '/images/news/kaffee-cupping-2026/cupping-gruppe-800.webp',
      alt: {
        de: 'Gruppenfoto der Teilnehmenden hinter dem langen Cuppingtisch im Café von Symple Coffee Roasters.',
        en: 'Group photo of the participants behind the long cupping table in the café of Symple Coffee Roasters.',
        fr: 'Photo de groupe des participants derrière la longue table de cupping, dans le café de Symple Coffee Roasters.',
      },
    },
  },
  {
    id: 'tag-des-offenen-denkmals-sandau-2026',
    start: '2026-09-13',
    kind: 'culture',
    title: { de: 'Tag des offenen Denkmals im Stadtspeicher Sandau', en: 'Heritage Open Day at the Sandau town granary', fr: 'Journées du patrimoine au grenier municipal de Sandau' },
    summary: {
      de: 'Ein Workshop zum Landschaftszeichnen und ein Konzert im ehemaligen Stadtspeicher. Im Projekt Kikili, für das Bantu e.V. Trägerverein ist.',
      en: 'A landscape drawing workshop and a concert in the former town granary. Part of the Kikili project, for which Bantu e.V. is the fiscal sponsor.',
      fr: 'Un atelier de dessin de paysage et un concert dans l’ancien grenier municipal. Dans le cadre du projet Kikili, dont Bantu e.V. est l’association porteuse.',
    },
    place: { de: 'Sandau (Elbe), Sachsen-Anhalt', en: 'Sandau (Elbe), Saxony-Anhalt', fr: 'Sandau (Elbe), Saxe-Anhalt' },
    project: 'kikili-stadtspeicher-sandau',
  },

  // ───────── 2025
  {
    id: 'msingi-zertifikatsfeier-2025',
    start: '2025-06',
    kind: 'celebration',
    title: { de: 'Zertifikatsfeier an der Msingi School', en: 'Certificate ceremony at Msingi School', fr: 'Remise des certificats à la Msingi School' },
    summary: {
      de: 'Nach 24 Wochen Friseur- und Kosmetikausbildung präsentierten die Teilnehmerinnen ihre Arbeiten und erhielten ihre Zertifikate: Alle 18 haben bestanden, sieben wurden direkt von ihren Praktikumsbetrieben eingestellt. Mit unserer Partnerorganisation NCDA.',
      en: 'After 24 weeks of hairdressing and cosmetology training, the trainees presented their work and received their certificates: all 18 passed, and seven were hired straight away by their placement salons. With our partner organisation NCDA.',
      fr: 'Après 24 semaines de formation en coiffure et esthétique, les participantes ont présenté leurs travaux et reçu leurs certificats : les 18 ont toutes réussi, et sept ont été embauchées aussitôt par leur salon de stage. Avec notre organisation partenaire NCDA.',
    },
    place: { de: 'Msingi School of BTVET, Mbarara, Uganda', en: 'Msingi School of BTVET, Mbarara, Uganda', fr: 'Msingi School of BTVET, Mbarara, Ouganda' },
    project: 'p24-200-msingi-school',
    news: 'msingi-absolventinnen',
  },
  {
    id: 'okushoma-digitaler-rueckaustausch-2025',
    start: '2025-05-15',
    end: '2025-06-06',
    kind: 'exchange',
    title: { de: 'Okushoma kwa Boona: digitaler Rückaustausch', en: 'Okushoma kwa Boona: digital return exchange', fr: 'Okushoma kwa Boona : échange retour en ligne' },
    summary: {
      de: 'Weil fünf von sechs ugandischen Teilnehmenden kein Schengen-Visum erhielten, fand der Gegenbesuch online statt: mit virtuellen Besuchen bei unseren Partnerschulen in Berlin, Bendorf, Andernach und Neuwied und einer gemeinsamen Abschluss- und Reflexionsphase.',
      en: 'Because five of the six Ugandan participants were refused Schengen visas, the return visit took place online: with virtual visits to our partner schools in Berlin, Bendorf, Andernach and Neuwied and a joint closing and reflection phase.',
      fr: 'Comme cinq des six participants ougandais se sont vu refuser un visa Schengen, la visite retour s’est faite en ligne : avec des visites virtuelles de nos écoles partenaires à Berlin, Bendorf, Andernach et Neuwied et une phase commune de clôture et de réflexion.',
    },
    place: online,
    project: 'okushoma-kwa-boona',
  },
  {
    id: 'okushoma-online-workshops-2025',
    start: '2025-01-24',
    end: '2025-03-30',
    kind: 'workshop',
    title: { de: 'Okushoma kwa Boona: fünf Online-Wochenendworkshops', en: 'Okushoma kwa Boona: five online weekend workshops', fr: 'Okushoma kwa Boona : cinq ateliers de week-end en ligne' },
    summary: {
      de: 'Die Teilnehmenden aus Deutschland und Uganda vertieften ihre Analyse zum Nachhaltigkeitsziel 4 (hochwertige und inklusive Bildung) und bereiteten den digitalen Rückaustausch vor.',
      en: 'The participants from Germany and Uganda deepened their analysis of Sustainable Development Goal 4 (quality and inclusive education) and prepared the digital return exchange.',
      fr: 'Les participants d’Allemagne et d’Ouganda ont approfondi leur analyse de l’objectif de développement durable 4 (une éducation de qualité et inclusive) et préparé l’échange retour en ligne.',
    },
    place: online,
    project: 'okushoma-kwa-boona',
  },

  // ───────── 2024
  {
    id: 'youth-eco-conference-2024',
    start: '2024-10-18',
    kind: 'conference',
    title: { de: 'Youth Eco Conference', en: 'Youth Eco Conference', fr: 'Youth Eco Conference' },
    summary: join({
      de: 'Die Konferenz des europäischen Youth Eco Project brachte die Partner aus sechs Ländern, junge Menschen und Pädagoginnen aus Black Engagement Matters zusammen, um Wissen zu ökologischer Bildung, Nachhaltigkeit und Führung zu teilen.',
      en: 'The conference of the European Youth Eco Project brought together the partners from six countries, young people and women educators from Black Engagement Matters to share knowledge on eco-literacy, sustainability and leadership.',
      fr: 'La conférence du projet européen Youth Eco Project a réuni les partenaires de six pays, des jeunes et des éducatrices de Black Engagement Matters pour partager des connaissances sur l’écocitoyenneté, la durabilité et le leadership.',
    }, { de: 'Mitorganisiert vom Team von Tubman.Network.', en: 'Co-organised by the Tubman.Network team.', fr: 'Co-organisée par l’équipe de Tubman.Network.' }),
    place: { de: 'Berlin Global Village, Berlin', en: 'Berlin Global Village, Berlin', fr: 'Berlin Global Village, Berlin' },
    project: 'youth-eco-project',
  },
  {
    id: 'okushoma-besuch-deutschland-2024',
    start: '2024-11',
    kind: 'exchange',
    title: { de: 'Besuch aus Uganda an unseren Partnerschulen', en: 'A visit from Uganda to our partner schools', fr: 'Une visite d’Ouganda dans nos écoles partenaires' },
    summary: {
      de: 'Als einzige der ugandischen Teilnehmenden von Okushoma kwa Boona erhielt eine Teilnehmerin unserer Partnerorganisation ABI ein Visum. Sie besuchte deutsche Partnerschulen und Bildungseinrichtungen und tauschte sich über inklusive Bildung aus.',
      en: 'Only one of the Ugandan participants of Okushoma kwa Boona, a participant from our partner organisation ABI, was granted a visa. She visited German partner schools and educational institutions and shared experience of inclusive education.',
      fr: 'Une seule des participantes ougandaises d’Okushoma kwa Boona, membre de notre organisation partenaire ABI, a obtenu un visa. Elle a visité des écoles partenaires et des établissements éducatifs en Allemagne et échangé sur l’éducation inclusive.',
    },
    place: { de: 'Deutschland', en: 'Germany', fr: 'Allemagne' },
    project: 'okushoma-kwa-boona',
  },
  {
    id: 'bem-abschlusskonferenz-2024',
    start: '2024',
    kind: 'conference',
    title: { de: 'Abschlusskonferenz von Black Engagement Matters', en: 'Black Engagement Matters closing conference', fr: 'Conférence de clôture de Black Engagement Matters' },
    summary: join({
      de: 'Zum Ende der UN-Dekade für Menschen afrikanischer Abstammung (2015–2024) vernetzte die Konferenz Aktive aus Schwarzen Organisationen aus ganz Deutschland und fragte, was Schwarzes zivilgesellschaftliches Engagement erfolgreich macht.',
      en: 'At the end of the UN International Decade for People of African Descent (2015–2024), the conference connected activists from Black organisations across Germany and looked at what makes Black civic engagement succeed.',
      fr: 'À la fin de la Décennie internationale des personnes d’ascendance africaine de l’ONU (2015–2024), la conférence a mis en réseau des militant·es d’organisations noires de toute l’Allemagne et s’est interrogée sur ce qui fait réussir l’engagement civique noir.',
    }, tubman),
    project: 'black-engagement-matters',
  },
  {
    id: 'okushoma-austausch-uganda-2024',
    start: '2024-02-23',
    end: '2024-03-13',
    kind: 'exchange',
    title: { de: 'Okushoma kwa Boona: Jugendaustausch in Uganda', en: 'Okushoma kwa Boona: youth exchange in Uganda', fr: 'Okushoma kwa Boona : échange de jeunes en Ouganda' },
    summary: {
      de: 'Sechs Teilnehmende aus Deutschland verbrachten 20 Tage in Mbarara und besuchten mit ihren ugandischen Partner*innen die St. Helen’s Primary School (eine inklusive Schule für blinde Kinder), das Nyamitanga College, die Bishop Stuart University und die St. Peter’s Senior Secondary School. Auch eine Delegation von BMZ und Engagement Global kam zu Besuch.',
      en: 'Six participants from Germany spent 20 days in Mbarara and, with their Ugandan partners, visited St. Helen’s Primary School (an inclusive school for blind children), Nyamitanga College, Bishop Stuart University and St. Peter’s Senior Secondary School. A delegation from BMZ and Engagement Global also visited.',
      fr: 'Six participants venus d’Allemagne ont passé 20 jours à Mbarara et visité, avec leurs partenaires ougandais, la St. Helen’s Primary School (une école inclusive pour enfants aveugles), le Nyamitanga College, la Bishop Stuart University et la St. Peter’s Senior Secondary School. Une délégation du BMZ et d’Engagement Global est également venue.',
    },
    place: { de: 'Mbarara, Uganda', en: 'Mbarara, Uganda', fr: 'Mbarara, Ouganda' },
    highlights: [
      { date: '2024-03-07', text: { de: 'Fishbowl-Podiumsdiskussion mit politischen Entscheidungsträger*innen', en: 'Fishbowl panel discussion with political decision-makers', fr: 'Table ronde en fishbowl avec des décideurs politiques' } },
      { date: '2024-03-08', text: { de: 'Feier zum Internationalen Frauentag im Ruhaama Community Resource Centre', en: 'International Women’s Day celebration at the Ruhaama Community Resource Centre', fr: 'Fête de la Journée internationale des droits des femmes au Ruhaama Community Resource Centre' } },
    ],
    project: 'okushoma-kwa-boona',
    image: {
      src: '/images/projects/okushoma-kwa-boona/04-participants-and-partners-480.webp',
      alt: {
        de: 'Austauschteilnehmende, Partner und Vertreterinnen von BMZ und Engagement Global posieren auf einer Veranda.',
        en: 'Exchange participants pose with partners and representatives of BMZ and Engagement Global on a veranda.',
        fr: 'Les jeunes de l’échange, les partenaires et les représentantes du BMZ et d’Engagement Global posent sur une véranda.',
      },
    },
  },

  // ───────── 2023
  {
    id: 'fashionempowerment-show-2023',
    start: '2023-12-16',
    kind: 'culture',
    title: { de: 'FashionEmpowerment-Show zum Sudan Peace Action Day', en: 'FashionEmpowerment Show for Sudan Peace Action Day', fr: 'FashionEmpowerment Show pour le Sudan Peace Action Day' },
    summary: join({
      de: 'Der Abschluss eines Jahres voller Workshops: Kinder und Jugendliche afrikanischer Abstammung zeigten ihre Entwürfe vor 350 Gästen. Es traten afrikanische Künstler*innen auf, darunter Künstler*innen, die aus der Ukraine nach Berlin gekommen waren. Berlin Mondiale unterstützte die Show.',
      en: 'The finale of a year of workshops: children and young people of African descent showed their designs to 350 guests. African artists performed, among them artists who had come to Berlin from Ukraine. Berlin Mondiale supported the show.',
      fr: 'L’aboutissement d’une année d’ateliers : des enfants et des jeunes d’ascendance africaine ont présenté leurs créations devant 350 invités. Des artistes africain·es se sont produit·es, dont des artistes arrivé·es d’Ukraine à Berlin. Berlin Mondiale a soutenu le spectacle.',
    }, tubman),
    place: berlin,
    project: 'fashion-empowerment',
  },
  {
    id: 'mama-circle-2023-2024',
    start: '2023-04',
    end: '2024-03',
    kind: 'community',
    title: { de: 'Mama Circle: Treffen für geflüchtete Mütter', en: 'Mama Circle: meetings for mothers who fled war', fr: 'Mama Circle : rencontres pour des mères réfugiées' },
    summary: join({
      de: 'Afrikanische und afrodiasporische Mütter und weibliche Bezugspersonen, die vor Krieg geflohen sind, trafen sich zum Austausch über Erfahrungen und kulturelle Traditionen, mit Impulsen zur Gesundheit von Frauen und Kindern und mit Kinderbetreuung während jedes Treffens.',
      en: 'African and Afro-diasporic mothers and female caregivers who had fled war met to share experiences and cultural traditions, with input on the health of women and children and childcare during every meeting.',
      fr: 'Des mères africaines et afro-diasporiques et des femmes ayant la charge d’enfants, qui avaient fui la guerre, se retrouvaient pour échanger expériences et traditions culturelles, avec des apports sur la santé des femmes et des enfants et une garde d’enfants à chaque rencontre.',
    }, tubman),
    place: berlin,
    rhythm: { de: 'jeden Sonntag', en: 'every Sunday', fr: 'chaque dimanche' },
    project: 'safer-spaces-tubman-network',
  },
  {
    id: 'fashionempowerment-workshops-2023',
    start: '2023',
    kind: 'workshop',
    title: { de: 'FashionEmpowerment: Workshops für Kinder und Jugendliche', en: 'FashionEmpowerment: workshops for children and young people', fr: 'FashionEmpowerment : ateliers pour enfants et jeunes' },
    summary: join({
      de: 'Kinder und Jugendliche afrikanischer Abstammung beschäftigten sich mit Mode als Ausdruck von Identität, fertigten mit einem Schneider eigene Accessoires mit Empowerment-Botschaften, sprachen über Erfahrungen mit Rassismus und lernten afrozentrische Frisuren kennen, gemeinsam mit Ulibia Beauty Empire.',
      en: 'Children and young people of African descent explored fashion as an expression of identity, made their own accessories with empowerment messages together with a tailor, talked about experiences of racism and learned about Afrocentric hairstyles with Ulibia Beauty Empire.',
      fr: 'Des enfants et des jeunes d’ascendance africaine ont exploré la mode comme expression de leur identité, fabriqué avec un tailleur leurs propres accessoires porteurs de messages d’empowerment, parlé de leurs expériences du racisme et découvert des coiffures afrocentrées avec Ulibia Beauty Empire.',
    }, tubman),
    place: { de: 'Salone Market, Berlin-Wedding', en: 'Salone Market, Berlin-Wedding', fr: 'Salone Market, Berlin-Wedding' },
    rhythm: weekly,
    project: 'fashion-empowerment',
  },
  {
    id: 'equal-rights-for-all-2023',
    start: '2023',
    kind: 'community',
    title: { de: 'Equal Rights for All: Kulturabende und Empowerment-Workshops', en: 'Equal Rights for All: cultural events and empowerment workshops', fr: 'Equal Rights for All : soirées culturelles et ateliers d’empowerment' },
    summary: join({
      de: 'Für BIPoC-Geflüchtete aus der Ukraine: Kulturveranstaltungen und Empowerment-Workshops, dazu Online-Sprachkurse, Hilfe bei Bewerbungen und psychologische Unterstützung. Das Angebot wurde vollständig von Schwarzen Menschen und People of Color getragen.',
      en: 'For BIPoC refugees from Ukraine: cultural events and empowerment workshops, plus online language courses, help with job applications and psychological support. The programme was run entirely by Black people and People of Colour.',
      fr: 'Pour les personnes réfugiées BIPoC venues d’Ukraine : événements culturels et ateliers d’empowerment, ainsi que des cours de langue en ligne, une aide aux candidatures et un soutien psychologique. Le projet était entièrement porté par des personnes noires et racisées.',
    }, tubman),
    place: berlin,
    rhythm: weekly,
    project: 'ubuntu-fuer-alle',
  },
  {
    id: 'parentcircle-2023',
    start: '2023',
    kind: 'community',
    title: { de: 'ParentCircle: Treffen für BIPoC-Eltern', en: 'ParentCircle: meetings for BIPoC parents', fr: 'ParentCircle : rencontres pour parents BIPoC' },
    summary: join({
      de: 'Treffen für BIPoC-Eltern, besonders Schwarze Eltern, mit gemeinsamem Kochen und Essen und Spielzeit mit den Kindern. Im Austausch entstanden gemeinsame Strategien für den Alltag.',
      en: 'Meetings for BIPoC parents, especially Black parents, with cooking, eating and playtime with the children. Together, the parents developed strategies for everyday life.',
      fr: 'Des rencontres pour les parents BIPoC, en particulier les parents noirs, avec cuisine et repas partagés et temps de jeu avec les enfants. Ensemble, les parents ont développé des stratégies pour le quotidien.',
    }, tubman),
    place: berlin,
    rhythm: weekly,
    project: 'parent-circle',
  },
  {
    id: 'bem-schulungen-2023-2024',
    start: '2023',
    end: '2024',
    kind: 'training',
    title: { de: 'Black Engagement Matters: Schulungen für Schwarze Vereine', en: 'Black Engagement Matters: trainings for Black associations', fr: 'Black Engagement Matters : formations pour associations noires' },
    summary: join({
      de: 'Schulungen auf Grundlage einer Bedarfsanalyse, unter anderem zu Organisationsführung, Rechtsfragen, Fundraising, Öffentlichkeitsarbeit, Datenschutz sowie Safer und Braver Spaces. Geplant war die Qualifizierung Schwarzer Ressourcenpersonen; alle Aktivitäten leiteten BIPoC-Expert*innen.',
      en: 'Trainings based on a needs assessment, including organisational management, legal questions, fundraising, public relations, data protection and safer and braver spaces. The plan included training Black resource persons; all activities were led by BIPoC experts.',
      fr: 'Des formations fondées sur une analyse des besoins, notamment sur la gestion d’association, les questions juridiques, la collecte de fonds, la communication, la protection des données et les safer et braver spaces. La formation de personnes-ressources noires était prévue ; toutes les activités étaient animées par des expert·es BIPoC.',
    }, tubman),
    place: { de: 'bundesweit', en: 'across Germany', fr: 'dans toute l’Allemagne' },
    project: 'black-engagement-matters',
  },
  {
    id: 'okushoma-online-seminare-2023',
    start: '2023',
    kind: 'workshop',
    title: { de: 'Okushoma kwa Boona: sechs Online-Seminare zum Auftakt', en: 'Okushoma kwa Boona: six online seminars to begin', fr: 'Okushoma kwa Boona : six séminaires en ligne pour commencer' },
    summary: {
      de: 'Zum Start des Jugendaustauschs beschäftigten sich die zwölf Teilnehmenden aus Deutschland und Uganda mit interkultureller Kompetenz, dem Nachhaltigkeitsziel 4 und Inklusion.',
      en: 'At the start of the youth exchange, the twelve participants from Germany and Uganda worked on intercultural competence, Sustainable Development Goal 4 and inclusion.',
      fr: 'Au début de l’échange de jeunes, les douze participants d’Allemagne et d’Ouganda ont travaillé sur la compétence interculturelle, l’objectif de développement durable 4 et l’inclusion.',
    },
    place: online,
    project: 'okushoma-kwa-boona',
  },

  // ───────── 2022
  {
    id: 'ubuntu-fuer-alle-2022',
    start: '2022-09',
    end: '2022-12',
    kind: 'community',
    title: { de: 'Ubuntu für alle: Willkommensfeiern und soziale Cafés', en: 'Ubuntu for All: welcome parties and social cafés', fr: 'Ubuntu pour tous : fêtes de bienvenue et cafés solidaires' },
    summary: {
      de: 'Für BIPoC-Geflüchtete aus der Ukraine: fünf Willkommensfeiern mit jeweils 300 bis 400 Gästen und dreieinhalb Monate lang tägliche soziale Cafés mit bis zu 200 Besucher*innen am Tag, dazu Beratung, Kinderbetreuung und Deutschunterricht.',
      en: 'For BIPoC refugees from Ukraine: five welcome parties with 300 to 400 guests each and, for three and a half months, daily social cafés with up to 200 visitors a day, plus counselling, childcare and German lessons.',
      fr: 'Pour les personnes réfugiées BIPoC venues d’Ukraine : cinq fêtes de bienvenue réunissant chacune 300 à 400 invités et, pendant trois mois et demi, des cafés solidaires quotidiens accueillant jusqu’à 200 personnes par jour, ainsi que du conseil, une garde d’enfants et des cours d’allemand.',
    },
    place: berlin,
    project: 'ubuntu-fuer-alle',
  },
  {
    id: 'becoming-documenta-2022',
    start: '2022-05',
    end: '2023-02',
    kind: 'art',
    title: { de: 'BECOMING: Workshops und Installation auf der documenta fifteen', en: 'BECOMING: workshops and an installation at documenta fifteen', fr: 'BECOMING : ateliers et installation à la documenta fifteen' },
    summary: {
      de: 'Ein Kooperationsprojekt mit dem foundationClass*collective der weißensee kunsthochschule berlin im Rahmen der documenta fifteen: Es begleitete Menschen mit Flucht- und Migrationserfahrung auf dem Weg in ein Kunststudium und sensibilisierte Lehrende für inklusive Methoden. Rund 50 Menschen nahmen an den Workshops teil.',
      en: 'A cooperation project with the foundationClass*collective of weißensee kunsthochschule berlin as part of documenta fifteen: it supported people with refugee and migration experience on their way into art school and made teaching staff aware of inclusive methods. Around 50 people took part in the workshops.',
      fr: 'Un projet de coopération avec le foundationClass*collective de la weißensee kunsthochschule berlin, dans le cadre de la documenta fifteen : il a accompagné des personnes ayant vécu l’exil et la migration vers des études d’art et sensibilisé des enseignant·es aux méthodes inclusives. Environ 50 personnes ont participé aux ateliers.',
    },
    place: { de: 'Berlin und Kassel', en: 'Berlin and Kassel', fr: 'Berlin et Cassel' },
    highlights: [
      { date: '2022-06-15', text: { de: 'Workshop „Tool Kit“: Portfolio-Präsentation, weißensee kunsthochschule berlin', en: 'Workshop “Tool Kit”: portfolio presentation, weißensee kunsthochschule berlin', fr: 'Atelier « Tool Kit » : présentation de portfolios, weißensee kunsthochschule berlin' } },
      { date: '2022-06-30', text: { de: 'Workshop „Towards Inclusive Learning-Teaching Methods“ für Hochschullehrende, Kassel', en: 'Workshop “Towards Inclusive Learning-Teaching Methods” for university teachers, Kassel', fr: 'Atelier « Towards Inclusive Learning-Teaching Methods » pour enseignant·es du supérieur, Cassel' } },
      { date: '2022', label: { de: 'documenta fifteen', en: 'documenta fifteen', fr: 'documenta fifteen' }, text: { de: 'Banner-Installation mit mehr als 60 bedruckten Stoffbannern in der Rotunde des Fridericianum in Kassel', en: 'Banner installation of more than 60 printed fabric banners in the rotunda of the Fridericianum in Kassel', fr: 'Installation de plus de 60 bannières en tissu imprimé dans la rotonde du Fridericianum à Cassel' } },
      { date: '2022-12-06', label: { de: '6. und 8. Dez.', en: '6 and 8 Dec', fr: '6 et 8 déc.' }, text: { de: 'Workshop „The eye I live in“: eigene Künstlerbücher und Zines', en: 'Workshop “The eye I live in”: making artist books and zines', fr: 'Atelier « The eye I live in » : livres d’artiste et zines' } },
      { date: '2022-12-16', text: { de: 'Workshop „Artistic expression in Space“ mit Ton, Glas, Holz und Gips', en: 'Workshop “Artistic expression in Space” with clay, glass, wood and plaster', fr: 'Atelier « Artistic expression in Space » avec argile, verre, bois et plâtre' } },
    ],
  },
];
