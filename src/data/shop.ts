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
    name: { de: 'Spendengeschenke', en: 'Gift a donation' },
    intro: {
      de: 'Verschenken Sie Unterstützung: Ihre Spende geht direkt in ein Projekt. Auf Wunsch stellen wir eine Zuwendungsbestätigung aus.',
      en: 'Give support as a gift: your donation goes straight to a project. On request we issue a donation receipt.',
    },
  },
  {
    id: 'coffee',
    name: { de: 'Abantu Coffee', en: 'Abantu Coffee' },
    intro: {
      de: 'Kaffee aus Uganda mit Geschichte – unsere eigene Marke. Die Erlöse fließen in die Projekte von Bantu e.V.',
      en: 'Coffee from Uganda with a story – our own brand. Proceeds support the projects of Bantu e.V.',
    },
  },
  {
    id: 'merch',
    name: { de: 'Merchandise', en: 'Merchandise' },
    intro: {
      de: 'Taschen, Shirts und Tassen mit dem Bantu-Logo – zeigen Sie, wofür Sie stehen.',
      en: 'Bags, shirts and mugs with the Bantu logo – show what you stand for.',
    },
  },
  {
    id: 'crafts',
    name: { de: 'Handwerk von Partner*innen', en: 'Crafts by partners' },
    intro: {
      de: 'Handgemachte Produkte von Gemeinschaften in Uganda und Burundi – fair eingekauft, direkt verkauft.',
      en: 'Handmade products from communities in Uganda and Burundi – bought fairly, sold directly.',
    },
  },
];

export const products: Product[] = [
  // Symbolic gifts = donations (no shipping, no VAT). Live immediately.
  {
    slug: 'geschenk-pearl-kita', category: 'gifts', status: 'available', donationReference: 'Geschenk Pearl Kita', project: 'p26-230-pearl-kita-kampala',
    name: { de: 'Ein guter Start für Kinder in Kampala', en: 'A good start for children in Kampala' },
    short: { de: 'Für die gebührenfreien Plätze in der Pearl Kindertagesstätte', en: 'For the fee-free places at Pearl Kindergarten' },
    description: { de: 'Ihre Spende hilft uns, den Eigenanteil für die Pearl Kindertagesstätte in Kampala aufzubringen: 60 Kinder erhalten einen gebührenfreien Platz und jeden Tag eine warme Mahlzeit.', en: 'Your donation helps us raise our own contribution for the Pearl Kindergarten in Kampala: 60 children get a fee-free place and a warm meal every day.' },
    priceNote: { de: 'Betrag frei wählbar', en: 'Choose your amount' },
  },
  {
    slug: 'geschenk-wasser-ruziba', category: 'gifts', status: 'available', donationReference: 'Geschenk Wasser Ruziba', project: 'p26-186-wasser-fuer-ruziba',
    name: { de: 'Sauberes Wasser für Ruziba', en: 'Clean water for Ruziba' },
    short: { de: 'Für die solarbetriebene Wasserversorgung in Burundi', en: 'For the solar-powered water supply in Burundi' },
    description: { de: 'Ihre Spende unterstützt die Trinkwasserversorgung für rund 900 Menschen im Stadtteil Ruziba in Bujumbura.', en: 'Your donation supports the drinking water supply for around 900 people in the Ruziba neighbourhood of Bujumbura.' },
    priceNote: { de: 'Betrag frei wählbar', en: 'Choose your amount' },
  },
  {
    slug: 'geschenk-bildung', category: 'gifts', status: 'available', donationReference: 'Geschenk Bildung fuer alle', project: 'p26-214-bildung-fuer-alle',
    name: { de: 'Bildung für alle', en: 'Education for all' },
    short: { de: 'Für unsere Bildungsarbeit in Berlin', en: 'For our education work in Berlin' },
    description: { de: 'Ihre Spende hilft, Schulungen, Workshops und Begegnungen in Berlin kostenfrei anzubieten – mit Kinderbetreuung, damit alle teilnehmen können.', en: 'Your donation helps us offer trainings, workshops and encounters in Berlin free of charge – with childcare so that everyone can take part.' },
    priceNote: { de: 'Betrag frei wählbar', en: 'Choose your amount' },
  },
  // Abantu Coffee – product facts from the label design brief (Dec 2024, v4).
  {
    slug: 'abantu-coffee-roots-and-routes', category: 'coffee', status: 'coming-soon',
    name: { de: 'Abantu Coffee „Roots and Routes“', en: 'Abantu Coffee “Roots and Routes”' },
    short: { de: 'Sankofa Heritage Coffee · Mount Elgon · mittlere Röstung · 250 g', en: 'Sankofa Heritage Coffee · Mount Elgon · medium roast · 250 g' },
    description: { de: 'Kaffee vom Mount Elgon in Uganda, mittlere Röstung – aus unserer Linie „Sankofa Heritage“.', en: 'Coffee from Mount Elgon in Uganda, medium roast – from our “Sankofa Heritage” line.' },
    details: [
      { label: { de: 'Herkunft', en: 'Origin' }, value: { de: 'Mount Elgon, Uganda', en: 'Mount Elgon, Uganda' } },
      { label: { de: 'Röstung', en: 'Roast' }, value: { de: 'mittel', en: 'medium' } },
      { label: { de: 'Inhalt', en: 'Size' }, value: { de: '250 g', en: '250 g' } },
    ],
    photoBrief: { de: 'Packshot der 250-g-Packung mit dem finalen Etikett', en: 'Packshot of the 250 g bag with the final label' },
  },
  {
    slug: 'abantu-coffee-kanungu-forest', category: 'coffee', status: 'coming-soon',
    name: { de: 'Abantu Coffee „Kanungu Forest“', en: 'Abantu Coffee “Kanungu Forest”' },
    short: { de: 'Bwindi Canopy Coffee · Bwindi Forest Edge · dunkle Röstung · 250 g', en: 'Bwindi Canopy Coffee · Bwindi Forest Edge · dark roast · 250 g' },
    description: { de: 'Kaffee vom Rand des Bwindi-Waldes in Uganda, dunkle Röstung.', en: 'Coffee from the edge of the Bwindi forest in Uganda, dark roast.' },
    details: [
      { label: { de: 'Herkunft', en: 'Origin' }, value: { de: 'Bwindi Forest Edge, Uganda', en: 'Bwindi Forest Edge, Uganda' } },
      { label: { de: 'Röstung', en: 'Roast' }, value: { de: 'dunkel', en: 'dark' } },
      { label: { de: 'Inhalt', en: 'Size' }, value: { de: '250 g', en: '250 g' } },
    ],
    photoBrief: { de: 'Packshot der 250-g-Packung mit dem finalen Etikett', en: 'Packshot of the 250 g bag with the final label' },
  },
  // Merchandise – designs to be produced (print-on-demand or small batch).
  {
    slug: 'bantu-stofftasche', category: 'merch', status: 'coming-soon',
    name: { de: 'Bantu-Stofftasche', en: 'Bantu tote bag' },
    short: { de: 'Baumwolltasche mit dem Bantu-Logo', en: 'Cotton tote with the Bantu logo' },
    description: { de: 'Robuste Stofftasche mit dem Originallogo von Bantu e.V.', en: 'Sturdy cotton tote bag with the original Bantu e.V. logo.' },
    photoBrief: { de: 'Produktfoto der fertigen Tasche', en: 'Product photo of the finished bag' },
  },
  {
    slug: 'bantu-t-shirt', category: 'merch', status: 'coming-soon',
    name: { de: 'T-Shirt „Ich bin, weil wir sind“', en: 'T-shirt “I am because we are”' },
    short: { de: 'Shirt mit Logo und Ubuntu-Motto', en: 'Shirt with logo and Ubuntu motto' },
    description: { de: 'T-Shirt mit dem Bantu-Logo und dem Motto „Ich bin, weil wir sind.“', en: 'T-shirt with the Bantu logo and the motto “I am because we are.”' },
    photoBrief: { de: 'Produktfoto vorne/hinten', en: 'Product photo front/back' },
  },
  {
    slug: 'bantu-tasse', category: 'merch', status: 'coming-soon',
    name: { de: 'Bantu-Tasse', en: 'Bantu mug' },
    short: { de: 'Für den Abantu Coffee am Morgen', en: 'For your morning Abantu Coffee' },
    description: { de: 'Keramiktasse mit dem Bantu-Logo.', en: 'Ceramic mug with the Bantu logo.' },
    photoBrief: { de: 'Produktfoto', en: 'Product photo' },
  },
  // OPEN: partner crafts – add products once suppliers, prices and import/tax questions are settled.
];
