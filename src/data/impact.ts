// Verified impact figures. Each figure names its source document (Tätigkeitsbericht 2023–2025,
// Transparenzbericht 2025). Update only from final reports (Sachbericht / Verwendungsnachweis).
type L = { de: string; en: string };
export const impact: { value: L; label: L; source: L; project: string }[] = [
  { value: { de: '18', en: '18' }, label: { de: 'junge Frauen mit Berufsabschluss in Mbarara – 7 direkt angestellt', en: 'young women with a vocational certificate in Mbarara – 7 hired straight away' }, source: { de: 'P 24/200, 2025', en: 'P 24/200, 2025' }, project: 'p24-200-msingi-school' },
  { value: { de: '172', en: '172' }, label: { de: 'Kinder mit Zerebralparese erhielten Rehabilitation (Ziel: 150)', en: 'children with cerebral palsy received rehabilitation (target: 150)' }, source: { de: 'P 23/91, 2023', en: 'P 23/91, 2023' }, project: 'p23-91-ours-zerebralparese' },
  { value: { de: '225', en: '225' }, label: { de: 'Menschen besuchten IT-Kurse im Ruhaama Community Resource Centre', en: 'people took IT courses at the Ruhaama Community Resource Centre' }, source: { de: 'P 22/29, 2023', en: 'P 22/29, 2023' }, project: 'ruhaama-community-resource-centre' },
  { value: { de: '1.800', en: '1,800' }, label: { de: 'BIPoC-Geflüchtete aus der Ukraine in Berlin unterstützt', en: 'BIPoC refugees from Ukraine supported in Berlin' }, source: { de: 'Ubuntu für alle, 2022', en: 'Ubuntu for All, 2022' }, project: 'ubuntu-fuer-alle' },
  { value: { de: '30', en: '30' }, label: { de: 'Schwarze Organisationen bundesweit vernetzt', en: 'Black organisations connected across Germany' }, source: { de: 'Black Engagement Matters, 2024', en: 'Black Engagement Matters, 2024' }, project: 'black-engagement-matters' },
  { value: { de: '12', en: '12' }, label: { de: 'junge Menschen aus Deutschland und Uganda im Jugendaustausch', en: 'young people from Germany and Uganda in our youth exchange' }, source: { de: 'Okushoma kwa Boona, 2023–2025', en: 'Okushoma kwa Boona, 2023–2025' }, project: 'okushoma-kwa-boona' },
];

export const timeline: { year: string; text: L }[] = [
  { year: '2019', text: { de: 'Gründung von Bantu e.V. in Berlin durch Menschen aus Uganda und Deutschland.', en: 'Bantu e.V. is founded in Berlin by people from Uganda and Germany.' } },
  { year: '2020', text: { de: 'Erstmalige Anerkennung der Gemeinnützigkeit.', en: 'Non-profit status recognised for the first time.' } },
  { year: '2021', text: { de: 'Start der Partnerschaft mit ABI in Uganda: Aufbau des Ruhaama Community Resource Centre. Bantu wird Trägerverein von Tubman.Network.', en: 'Partnership with ABI in Uganda begins: the Ruhaama Community Resource Centre is set up. Bantu becomes fiscal host of Tubman.Network.' } },
  { year: '2022', text: { de: '„Ubuntu für alle“: Unterstützung für rund 1.800 BIPoC-Geflüchtete aus der Ukraine.', en: '“Ubuntu for All”: support for around 1,800 BIPoC refugees from Ukraine.' } },
  { year: '2023', text: { de: 'OURS erreicht 172 Kinder mit Zerebralparese; Start des Jugendaustauschs Okushoma kwa Boona; Mama Circle und FashionEmpowerment in Berlin.', en: 'OURS reaches 172 children with cerebral palsy; youth exchange Okushoma kwa Boona starts; Mama Circle and FashionEmpowerment in Berlin.' } },
  { year: '2024', text: { de: 'Tubman.Network wird eigenständig; Austausch in Mbarara; Black Engagement Matters vernetzt 30 Organisationen.', en: 'Tubman.Network becomes independent; exchange visit to Mbarara; Black Engagement Matters connects 30 organisations.' } },
  { year: '2025', text: { de: '18 Absolventinnen an der Msingi School; Abschluss von Okushoma kwa Boona.', en: '18 graduates at Msingi School; Okushoma kwa Boona completed.' } },
  { year: '2026', text: { de: 'Erste Projekte in Burundi (Wasser für Ruziba) und Kampala (Pearl Kindertagesstätte); Bildungsprojekte mit Berliner Schulen; Ubuntu Talks in Mitte.', en: 'First projects in Burundi (Water for Ruziba) and Kampala (Pearl Kindergarten); education projects with Berlin schools; Ubuntu Talks in Mitte.' } },
];
