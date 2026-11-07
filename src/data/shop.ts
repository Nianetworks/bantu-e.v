// Shop catalogue. Prices are deliberately empty until set by the board.
// Checkout only appears when features.shopCheckoutOpen === true AND checkoutUrl is set
// (e.g. a Stripe Payment Link or PayPal button URL). See docs/03_Rechtliches_und_Shop-Checkliste.md.

type L = { de: string; en: string };
export type Category = 'gifts' | 'coffee' | 'merch' | 'crafts';
export type Product = {
  slug: string;
  category: Category;
  name: L;
  short: L;
  description: L;
  details?: { label: L; value: L }[];
  price?: number; // EUR incl. VAT where applicable
  priceNote?: L;
  image?: string;
  photoBrief?: L;
  status: 'available' | 'coming-soon';
  checkoutUrl?: string;
  /** Symbolic gifts are donations: link to donate page with this reference */
  donationReference?: string;
  project?: string;
};

export const categories: { id: Category; name: L; intro: L }[] = [
  {
    id: 'gifts',
    name: { de: 'Spendengeschenke', en: 'Gift a donation', fr: 'Offrir un don' },
    intro: {
      de: 'Verschenken Sie Unterstützung: Ihre Spende geht direkt in ein Projekt. Auf Wunsch stellen wir eine Zuwendungsbestätigung aus.',
      en: 'Give support as a gift: your donation goes straight to a project. On request we issue a donation receipt.', fr: 'Offrez du soutien : votre don va directement à un projet. Sur demande, nous délivrons un reçu fiscal.',
    },
  },
  {
    id: 'coffee',
    name: { de: 'Abantu Coffee', en: 'Abantu Coffee', fr: 'Café Abantu' },
    intro: {
      de: 'Kaffee aus Uganda mit Geschichte: unsere eigene Marke. Die Erlöse fließen in die Projekte von Bantu e.V.',
      en: 'Coffee from Uganda with a story: our own brand. Proceeds support the projects of Bantu e.V.', fr: 'Un café d’Ouganda qui a une histoire : notre propre marque. Les recettes soutiennent les projets de Bantu e.V.',
    },
  },
  {
    id: 'merch',
    name: { de: 'Merchandise', en: 'Merchandise', fr: 'Articles' },
    intro: {
      de: 'Taschen, Shirts und Tassen mit dem Bantu-Logo. Zeigen Sie, wofür Sie stehen.',
      en: 'Bags, shirts and mugs with the Bantu logo. Show what you stand for.', fr: 'Sacs, t-shirts et tasses avec le logo Bantu. Montrez ce qui vous tient à cœur.',
    },
  },
  {
    id: 'crafts',
    name: { de: 'Handwerk von Partner*innen', en: 'Crafts by partners', fr: 'Artisanat de nos partenaires' },
    intro: {
      de: 'Handgemachte Produkte von Gemeinschaften in Uganda und Burundi, fair eingekauft, direkt verkauft.',
      en: 'Handmade products from communities in Uganda and Burundi, bought fairly, sold directly.', fr: 'Des produits faits main par des communautés en Ouganda et au Burundi, achetés équitablement, vendus directement.',
    },
  },
];

export const products: Product[] = [
  // Symbolic gifts = donations (no shipping, no VAT). Live immediately.
  {
    slug: 'geschenk-pearl-kita', category: 'gifts', status: 'available', donationReference: 'Geschenk Pearl Kita', project: 'p26-230-pearl-kita-kampala',
    name: { de: 'Ein guter Start für Kinder in Kampala', en: 'A good start for children in Kampala', fr: 'Un bon départ pour les enfants de Kampala' },
    short: { de: 'Für die gebührenfreien Plätze in der Pearl Kindertagesstätte', en: 'For the fee-free places at Pearl Kindergarten', fr: 'Pour les places gratuites du jardin d’enfants Pearl' },
    description: { de: 'Ihre Spende hilft uns, den Eigenanteil für die Pearl Kindertagesstätte in Kampala aufzubringen: 60 Kinder erhalten einen gebührenfreien Platz und jeden Tag eine warme Mahlzeit.', en: 'Your donation helps us raise our own contribution for the Pearl Kindergarten in Kampala: 60 children get a fee-free place and a warm meal every day.', fr: 'Votre don nous aide à réunir notre part pour le jardin d’enfants Pearl à Kampala : 60 enfants y ont une place gratuite et un repas chaud chaque jour.' },
    priceNote: { de: 'Betrag frei wählbar', en: 'Choose your amount', fr: 'Choisissez votre montant' },
  },
  {
    slug: 'geschenk-wasser-ruziba', category: 'gifts', status: 'available', donationReference: 'Geschenk Wasser Ruziba', project: 'p26-186-wasser-fuer-ruziba',
    name: { de: 'Sauberes Wasser für Ruziba', en: 'Clean water for Ruziba', fr: 'De l’eau propre pour Ruziba' },
    short: { de: 'Für die solarbetriebene Wasserversorgung in Burundi', en: 'For the solar-powered water supply in Burundi', fr: 'Pour l’approvisionnement en eau solaire au Burundi' },
    description: { de: 'Ihre Spende unterstützt die Trinkwasserversorgung für rund 900 Menschen im Stadtteil Ruziba in Bujumbura.', en: 'Your donation supports the drinking water supply for around 900 people in the Ruziba neighbourhood of Bujumbura.', fr: 'Votre don soutient l’approvisionnement en eau potable d’environ 900 personnes dans le quartier de Ruziba à Bujumbura.' },
    priceNote: { de: 'Betrag frei wählbar', en: 'Choose your amount', fr: 'Choisissez votre montant' },
  },
  {
    slug: 'geschenk-bildung', category: 'gifts', status: 'available', donationReference: 'Geschenk Bildung fuer alle', project: 'p26-214-bildung-fuer-alle',
    name: { de: 'Bildung für alle', en: 'Education for all', fr: 'L’éducation pour tous' },
    short: { de: 'Für unsere Bildungsarbeit in Berlin', en: 'For our education work in Berlin', fr: 'Pour notre travail éducatif à Berlin' },
    description: { de: 'Ihre Spende hilft, Schulungen, Workshops und Begegnungen in Berlin kostenfrei anzubieten, mit Kinderbetreuung, damit alle teilnehmen können.', en: 'Your donation helps us offer trainings, workshops and encounters in Berlin free of charge, with childcare so that everyone can take part.', fr: 'Votre don nous aide à proposer gratuitement des formations, des ateliers et des rencontres à Berlin, avec garde d’enfants pour que tout le monde puisse participer.' },
    priceNote: { de: 'Betrag frei wählbar', en: 'Choose your amount', fr: 'Choisissez votre montant' },
  },
  // Abantu Coffee – product facts from the label design brief (Dec 2024, v4).
  {
    slug: 'abantu-coffee-roots-and-routes', category: 'coffee', status: 'coming-soon',
    name: { de: 'Abantu Coffee „Roots and Routes“', en: 'Abantu Coffee “Roots and Routes”', fr: 'Café Abantu « Roots and Routes »' },
    short: { de: 'Sankofa Heritage Coffee · Mount Elgon · mittlere Röstung · 250 g', en: 'Sankofa Heritage Coffee · Mount Elgon · medium roast · 250 g', fr: 'Sankofa Heritage Coffee · mont Elgon · torréfaction moyenne · 250 g' },
    description: { de: 'Kaffee vom Mount Elgon in Uganda, mittlere Röstung, aus unserer Linie „Sankofa Heritage“.', en: 'Coffee from Mount Elgon in Uganda, medium roast, from our “Sankofa Heritage” line.', fr: 'Café du mont Elgon en Ouganda, torréfaction moyenne, de notre gamme « Sankofa Heritage ».' },
    details: [
      { label: { de: 'Herkunft', en: 'Origin', fr: 'Origine' }, value: { de: 'Mount Elgon, Uganda', en: 'Mount Elgon, Uganda', fr: 'Mont Elgon, Ouganda' } },
      { label: { de: 'Röstung', en: 'Roast', fr: 'Torréfaction' }, value: { de: 'mittel', en: 'medium', fr: 'moyenne' } },
      { label: { de: 'Inhalt', en: 'Size', fr: 'Contenance' }, value: { de: '250 g', en: '250 g', fr: '250 g' } },
    ],
    photoBrief: { de: 'Packshot der 250-g-Packung mit dem finalen Etikett', en: 'Packshot of the 250 g bag with the final label', fr: 'Photo du sachet de 250 g avec l’étiquette définitive' },
  },
  {
    slug: 'abantu-coffee-kanungu-forest', category: 'coffee', status: 'coming-soon',
    name: { de: 'Abantu Coffee „Kanungu Forest“', en: 'Abantu Coffee “Kanungu Forest”', fr: 'Café Abantu « Kanungu Forest »' },
    short: { de: 'Bwindi Canopy Coffee · Bwindi Forest Edge · dunkle Röstung · 250 g', en: 'Bwindi Canopy Coffee · Bwindi Forest Edge · dark roast · 250 g', fr: 'Bwindi Canopy Coffee · lisière de la forêt de Bwindi · torréfaction foncée · 250 g' },
    description: { de: 'Kaffee vom Rand des Bwindi-Waldes in Uganda, dunkle Röstung.', en: 'Coffee from the edge of the Bwindi forest in Uganda, dark roast.', fr: 'Café de la lisière de la forêt de Bwindi en Ouganda, torréfaction foncée.' },
    details: [
      { label: { de: 'Herkunft', en: 'Origin', fr: 'Origine' }, value: { de: 'Bwindi Forest Edge, Uganda', en: 'Bwindi Forest Edge, Uganda', fr: 'Lisière de la forêt de Bwindi, Ouganda' } },
      { label: { de: 'Röstung', en: 'Roast', fr: 'Torréfaction' }, value: { de: 'dunkel', en: 'dark', fr: 'foncée' } },
      { label: { de: 'Inhalt', en: 'Size', fr: 'Contenance' }, value: { de: '250 g', en: '250 g', fr: '250 g' } },
    ],
    photoBrief: { de: 'Packshot der 250-g-Packung mit dem finalen Etikett', en: 'Packshot of the 250 g bag with the final label', fr: 'Photo du sachet de 250 g avec l’étiquette définitive' },
  },
  // Merchandise – designs to be produced (print-on-demand or small batch).
  {
    slug: 'bantu-stofftasche', category: 'merch', status: 'coming-soon',
    name: { de: 'Bantu-Stofftasche', en: 'Bantu tote bag', fr: 'Sac en toile Bantu' },
    short: { de: 'Baumwolltasche mit dem Bantu-Logo', en: 'Cotton tote with the Bantu logo', fr: 'Sac en coton avec le logo Bantu' },
    description: { de: 'Robuste Stofftasche mit dem Originallogo von Bantu e.V.', en: 'Sturdy cotton tote bag with the original Bantu e.V. logo.', fr: 'Sac solide en coton avec le logo original de Bantu e.V.' },
    photoBrief: { de: 'Produktfoto der fertigen Tasche', en: 'Product photo of the finished bag', fr: 'Photo du sac terminé' },
  },
  {
    slug: 'bantu-t-shirt', category: 'merch', status: 'coming-soon',
    name: { de: 'T-Shirt „Ich bin, weil wir sind“', en: 'T-shirt “I am because we are”', fr: 'T-shirt « Je suis parce que nous sommes »' },
    short: { de: 'Shirt mit Logo und Ubuntu-Leitsatz', en: 'Shirt with logo and Ubuntu saying', fr: 'T-shirt avec logo et maxime Ubuntu' },
    description: { de: 'T-Shirt mit dem Bantu-Logo und dem Ubuntu-Leitsatz „Ich bin, weil wir sind.“', en: 'T-shirt with the Bantu logo and the Ubuntu saying “I am because we are.”', fr: 'T-shirt avec le logo Bantu et la maxime Ubuntu « Je suis parce que nous sommes. »' },
    photoBrief: { de: 'Produktfoto vorne/hinten', en: 'Product photo front/back', fr: 'Photo du produit, devant et dos' },
  },
  {
    slug: 'bantu-tasse', category: 'merch', status: 'coming-soon',
    name: { de: 'Bantu-Tasse', en: 'Bantu mug', fr: 'Tasse Bantu' },
    short: { de: 'Für den Abantu Coffee am Morgen', en: 'For your morning Abantu Coffee', fr: 'Pour votre café Abantu du matin' },
    description: { de: 'Keramiktasse mit dem Bantu-Logo.', en: 'Ceramic mug with the Bantu logo.', fr: 'Tasse en céramique avec le logo Bantu.' },
    photoBrief: { de: 'Produktfoto', en: 'Product photo', fr: 'Photo du produit' },
  },
  // OPEN: partner crafts – add products once suppliers, prices and import/tax questions are settled.
];
