// Shop catalogue. Prices are deliberately empty until set by the board.
// Ordering (decision of the chair, 08.11.2026): an order form on our own server (public/shop/bestellung.php) and payment by
// bank transfer straight to the GLS account, with a unique Verwendungszweck per order and a GiroCode QR (components/OrderForm.astro).
// Symbolic gifts (donations) can be ordered now. Goods only when features.shopCheckoutOpen === true, the product has a price,
// status 'available' and shipping.flat is set – see docs/03_Rechtliches_und_Shop-Checkliste.md before switching on.
import { features } from './site';
import { coffeeProducts, type CoffeeStory } from './coffee';

export type L = { de: string; en: string; fr: string };
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
  imageAlt?: L;
  imageCaption?: L;
  imageWidth?: number;
  imageHeight?: number;
  imageVariants?: { width: number; src: string }[];
  labelImages?: { name: L; src: string }[];
  photoBrief?: L;
  /** 'planned' = ABANTU COFFEE collection preview: no price, no reservation, never orderable, not in /shop/katalog.json */
  status: 'available' | 'coming-soon' | 'planned';
  /** ABANTU COFFEE Uganda Collection: edition number (1–12), plain edition name, tagline from the label, story */
  edition?: number;
  editionName?: string;
  tagline?: string;
  story?: CoffeeStory;
  checkoutUrl?: string;
  /** Symbolic gifts are donations: link to donate page with this reference */
  donationReference?: string;
  project?: string;
};

/** Shipping for goods, EUR per order (Germany). OPEN: set by the board together with the prices (PAngV: show before ordering). */
export const shipping: { flat?: number; note: L } = {
  flat: undefined,
  note: { de: 'Versand innerhalb Deutschlands', en: 'Shipping within Germany', fr: 'Livraison en Allemagne' },
};

/** Limits for symbolic gifts (EUR); the order script applies the same limits. */
export const giftLimits = { min: 5, max: 10000, suggestions: [25, 50, 100] };

/** Can this product be ordered with the order form right now? */
export const canOrder = (p: Product): boolean =>
  p.category === 'gifts'
    ? p.status === 'available' && !!p.donationReference
    : features.shopCheckoutOpen && p.status === 'available' && !!p.price && shipping.flat !== undefined;

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
    name: { de: 'Abantu Coffee', en: 'Abantu Coffee', fr: 'Abantu Coffee' },
    // Brand (chair, 08.11.2026): ABANTU COFFEE by Bantu e.V., main coffee partner Balambuli Kwigate Coffee (BKC).
    // Uganda Collection with 12 editions in src/data/coffee.ts: 01 and 03 coming soon, the other ten as a preview (status 'planned').
    intro: {
      de: 'ABANTU COFFEE ist unsere eigene Kaffeemarke: ein Projekt von Bantu e.V. mit Balambuli Kwigate Coffee (BKC) als Hauptpartner für Kaffee. Kaffee aus Uganda mit Geschichte; die Erlöse fließen in die Projekte von Bantu e.V.',
      en: 'ABANTU COFFEE is our own coffee brand: a project of Bantu e.V., with Balambuli Kwigate Coffee (BKC) as its main coffee partner. Coffee from Uganda with a story; proceeds support the projects of Bantu e.V.',
      fr: 'ABANTU COFFEE est notre propre marque de café : un projet de Bantu e.V., avec Balambuli Kwigate Coffee (BKC) comme principal partenaire café. Un café d’Ouganda qui a une histoire ; les recettes soutiennent les projets de Bantu e.V.',
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
  // Abantu Coffee – Uganda Collection, see src/data/coffee.ts.
  ...coffeeProducts,
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
