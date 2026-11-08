// ABANTU COFFEE – Uganda Collection (12 editions, "Woven Origins v2" bag designs).
// Brand (chair, 08.11.2026): ABANTU COFFEE by Bantu e.V., main coffee partner Balambuli Kwigate Coffee (BKC).
// Roots & Routes (01) and Kanungu Forest (03) are products "coming soon". The other ten editions are shown as a
// collection preview (status 'planned': no price, no reservation, not in the order catalogue) – chair's decision 08.11.2026.
// Stories: chair's decision 08.11.2026 to use the 2025 brochure "Abantu Coffee – Complete 12-Line Collection with Uganda
// Regional Partners" (05_Programme_&_Projekte/…/Abantu Coffee — Marke und Produktentwicklung/03_Implementierung/03_Daten_Fotos_&_Medien).
// Taglines follow the current Woven Origins v2 labels. Cooperatives, processing, altitude and impact are written as plans/aims,
// because none of them is confirmed yet. Left out on purpose: "certified organic" for Bukonzo (EU organic rules: only for
// certified products) and the Sebei circumcision/ceremony-funding lines of the brochure.
// OPEN: have the local-language sayings checked by native speakers (Runyankore, Rukiga, Lukonzo, Luganda, Kinyarwanda).
// Edition 12 is called KUKUNDA (corrected by the chair on 08.11.2026; label artwork retouched to match).
// OPEN: ask the named cooperatives whether they agree to be named as planned partners.
import type { L, Product } from './shop';

export type CoffeeStory = {
  paragraphs: L[];
  sayings?: { text: string; lang: string; language: L; meaning?: L }[];
  aims?: L[];
};

const lang = {
  akan: { de: 'Akan (Ghana)', en: 'Akan (Ghana)', fr: 'akan (Ghana)' },
  runyankore: { de: 'Runyankore', en: 'Runyankore', fr: 'runyankore' },
  rukiga: { de: 'Rukiga', en: 'Rukiga', fr: 'rukiga' },
  swahili: { de: 'Kiswahili', en: 'Swahili', fr: 'swahili' },
  lukonzo: { de: 'Lukonzo', en: 'Lukonzo', fr: 'lukonzo' },
  luganda: { de: 'Luganda', en: 'Luganda', fr: 'luganda' },
  kinyarwanda: { de: 'Kinyarwanda', en: 'Kinyarwanda', fr: 'kinyarwanda' },
  zulu: { de: 'isiZulu', en: 'isiZulu', fr: 'zoulou (isiZulu)' },
};

const BKC = 'Balambuli Kwigate Coffee (BKC)';
const same = (s: string): L => ({ de: s, en: s, fr: s });
const row = (label: L, value: L) => ({ label, value });
const lbl = {
  origin: { de: 'Herkunft', en: 'Origin', fr: 'Origine' },
  edition: { de: 'Edition', en: 'Edition', fr: 'Édition' },
  roast: { de: 'Röstung', en: 'Roast', fr: 'Torréfaction' },
  type: { de: 'Kaffeesorte', en: 'Coffee type', fr: 'Type de café' },
  weight: { de: 'Nettofüllmenge', en: 'Net weight', fr: 'Poids net' },
  plannedWeight: { de: 'Geplante Füllmenge', en: 'Planned net weight', fr: 'Poids net prévu' },
  partner: { de: 'Kaffeepartner', en: 'Coffee partner', fr: 'Partenaire café' },
  coop: { de: 'Geplante Partnerkooperative', en: 'Planned partner cooperative', fr: 'Coopérative partenaire prévue' },
  project: { de: 'Ein Projekt von', en: 'A project of', fr: 'Un projet de' },
  status: { de: 'Stand', en: 'Status', fr: 'Statut' },
};
const editionNo = (n: number): L => {
  const nn = String(n).padStart(2, '0');
  return { de: `Uganda Collection, Nr. ${nn}`, en: `Uganda Collection, no. ${nn}`, fr: `Uganda Collection, n° ${nn}` };
};

function coffeeMedia(slug: string, name: string, pattern: L) {
  const stem = `/images/shop/abantu-coffee/abantu-coffee-${slug}-250g-woven-origins-v2`;
  return {
    image: `${stem}-1254.jpg`,
    imageAlt: {
      de: `Digitale Verpackungsvorschau: Abantu Coffee ${name}, 250 g, in einem mattschwarzen Beutel mit ${pattern.de} Webmuster sowie den Logos von Bantu e.V. und BKC.`,
      en: `Digital packaging preview: Abantu Coffee ${name}, 250 g, in a matte charcoal bag with a ${pattern.en} woven pattern and the Bantu e.V. and BKC logos.`,
      fr: `Aperçu numérique : Abantu Coffee ${name}, 250 g, en sachet noir mat avec un motif tissé ${pattern.fr} et les logos de Bantu e.V. et de BKC.`,
    },
    imageCaption: { de: 'Verpackungsvorschau', en: 'Packaging preview', fr: 'Aperçu de l’emballage' },
    imageWidth: 1254,
    imageHeight: 1254,
    imageVariants: [480, 768, 1254].map((width) => ({ width, src: `${stem}-${width}.webp` })),
    labelImages: [
      { name: { de: 'Vorderes Etikett', en: 'Front label', fr: 'Étiquette avant' }, src: `${stem}-front-label.jpg` },
      { name: { de: 'Hinteres Etikett', en: 'Back label', fr: 'Étiquette arrière' }, src: `${stem}-back-label.jpg` },
    ],
  };
}

const productName = (name: string): L => ({ de: `Abantu Coffee „${name}“`, en: `Abantu Coffee “${name}”`, fr: `Abantu Coffee « ${name} »` });

/** One of the ten planned editions (collection preview). */
function planned(e: {
  no: number; slug: string; name: string; tagline: string; place: L; origin: L; from: L; pattern: L; coop: L; story: CoffeeStory;
}): Product {
  const nn = String(e.no).padStart(2, '0');
  return {
    slug: `abantu-coffee-${e.slug}`, category: 'coffee', status: 'planned', edition: e.no, editionName: e.name, tagline: e.tagline,
    name: productName(e.name),
    short: { de: `${e.tagline} · ${e.place.de}`, en: `${e.tagline} · ${e.place.en}`, fr: `${e.tagline} · ${e.place.fr}` },
    description: {
      de: `Edition Nr. ${nn} der Uganda Collection von ABANTU COFFEE, in Vorbereitung: ${e.tagline} aus ${e.from.de}. Abantu Coffee ist ein Projekt von Bantu e.V. mit ${BKC} als Hauptpartner für Kaffee. Die Erlöse sollen den Projekten von Bantu e.V. zugutekommen.`,
      en: `Edition no. ${nn} of the ABANTU COFFEE Uganda Collection, in preparation: ${e.tagline} from ${e.from.en}. Abantu Coffee is a project of Bantu e.V., with ${BKC} as its main coffee partner. Proceeds are meant to support the projects of Bantu e.V.`,
      fr: `Édition n° ${nn} de la Uganda Collection d’ABANTU COFFEE, en préparation : ${e.tagline}, ${e.from.fr}. Abantu Coffee est un projet de Bantu e.V., avec ${BKC} comme principal partenaire café. Les recettes doivent soutenir les projets de Bantu e.V.`,
    },
    details: [
      row(lbl.origin, e.origin),
      row(lbl.edition, editionNo(e.no)),
      row(lbl.plannedWeight, same('250 g')),
      row(lbl.coop, e.coop),
      row(lbl.partner, same(BKC)),
      row(lbl.project, same('Bantu e.V.')),
      row(lbl.status, { de: 'In Vorbereitung, noch nicht bestellbar', en: 'In preparation, not yet available to order', fr: 'En préparation, pas encore disponible' }),
    ],
    story: e.story,
    ...coffeeMedia(e.slug, e.name, e.pattern),
  };
}

const allPartners: L = { de: 'alle Partnerkooperativen', en: 'all partner cooperatives', fr: 'toutes les coopératives partenaires' };

export const coffeeProducts: Product[] = [
  // 01 – product "coming soon". Product facts from the label design brief (Dec 2024, v4).
  {
    slug: 'abantu-coffee-roots-and-routes', category: 'coffee', status: 'coming-soon', edition: 1, editionName: 'Roots & Routes', tagline: 'Sankofa Heritage Coffee',
    name: productName('Roots & Routes'),
    short: { de: 'Sankofa Heritage Coffee · Mount Elgon · mittlere Röstung · 250 g', en: 'Sankofa Heritage Coffee · Mount Elgon · medium roast · 250 g', fr: 'Sankofa Heritage Coffee · mont Elgon · torréfaction moyenne · 250 g' },
    description: {
      de: 'Arabica vom Mount Elgon in Uganda, mit mittlerer Röstung, aus unserer Linie „Sankofa Heritage“. In der 250-g-Packung. Abantu Coffee ist ein Projekt von Bantu e.V. mit Balambuli Kwigate Coffee (BKC) als Hauptpartner für Kaffee. Die Erlöse unterstützen die Projekte von Bantu e.V.',
      en: 'A medium-roast Arabica from Mount Elgon in Uganda, from our Sankofa Heritage line. In a 250 g pack. Abantu Coffee is a project of Bantu e.V., with Balambuli Kwigate Coffee (BKC) as its main coffee partner. Proceeds support the projects of Bantu e.V.',
      fr: 'Un arabica du mont Elgon en Ouganda, à torréfaction moyenne, de notre gamme Sankofa Heritage. En sachet de 250 g. Abantu Coffee est un projet de Bantu e.V., avec Balambuli Kwigate Coffee (BKC) comme principal partenaire café. Les recettes soutiennent les projets de Bantu e.V.',
    },
    details: [
      row(lbl.origin, { de: 'Mount Elgon, Uganda', en: 'Mount Elgon, Uganda', fr: 'Mont Elgon, Ouganda' }),
      row(lbl.edition, editionNo(1)),
      row(lbl.roast, { de: 'mittel', en: 'medium', fr: 'moyenne' }),
      row(lbl.type, same('Arabica')),
      row(lbl.weight, same('250 g')),
      row(lbl.partner, same(BKC)),
      row(lbl.project, same('Bantu e.V.')),
    ],
    story: {
      paragraphs: [
        {
          de: 'Sankofa ist ein Bild aus der Akan-Kultur Westafrikas: ein Vogel, der den Kopf nach hinten wendet. Es steht für den Gedanken, dass der Blick zurück den Weg nach vorn weist. Roots & Routes, Wurzeln und Wege, verbindet diese Idee mit den Menschen, die Kaffee anbauen, und mit der Diaspora, die ihn trinkt.',
          en: 'Sankofa is an image from the Akan culture of West Africa: a bird turning its head to look back. It carries the idea that learning from the past guides us forward. Roots & Routes links this idea with the people who grow coffee and with the diaspora who drink it.',
          fr: 'Sankofa est une image de la culture akan d’Afrique de l’Ouest : un oiseau qui tourne la tête vers l’arrière. Elle porte l’idée que le regard vers le passé guide nos pas vers l’avenir. Roots & Routes, racines et chemins, relie cette idée aux personnes qui cultivent le café et à la diaspora qui le boit.',
        },
        {
          de: 'Der Kaffee kommt von den Hängen des Mount Elgon, aus 1.800 bis 2.300 Metern Höhe und von vulkanischen Böden. Unser Hauptpartner Balambuli Kwigate Coffee (BKC) arbeitet dort mit Kleinbäuerinnen und Kleinbauern. Vorgesehen ist eine Fermentation von 16 bis 40 Stunden.',
          en: 'The coffee comes from the slopes of Mount Elgon, from 1,800 to 2,300 metres above sea level and from volcanic soils. Our main partner Balambuli Kwigate Coffee (BKC) works there with smallholder farmers. A fermentation of 16 to 40 hours is planned.',
          fr: 'Le café vient des pentes du mont Elgon, entre 1 800 et 2 300 mètres d’altitude, sur des sols volcaniques. Notre partenaire principal Balambuli Kwigate Coffee (BKC) y travaille avec de petits producteurs et productrices. Une fermentation de 16 à 40 heures est prévue.',
        },
        {
          de: 'Auf der Verpackung führt ein QR-Code zu Bantu e.V. Später sollen dort auch Videogeschichten der Bäuerinnen und Bauern und Neuigkeiten aus dem Community Resource Centre zu finden sein.',
          en: 'A QR code on the pack leads to Bantu e.V. Later it is meant to lead to video stories from the farmers and to news from the Community Resource Centre as well.',
          fr: 'Sur le sachet, un code QR mène à Bantu e.V. Plus tard, il doit aussi conduire à des récits vidéo des agricultrices et agriculteurs et aux nouvelles du Community Resource Centre.',
        },
      ],
      sayings: [{ text: 'Sankofa', lang: 'ak', language: lang.akan, meaning: { de: 'Der Blick zurück weist den Weg nach vorn.', en: 'Learning from the past guides us forward.', fr: 'Le regard vers le passé guide nos pas vers l’avenir.' } }],
      aims: [
        { de: 'Faire Preise für Kaffeekirschen und saisonale Prämien für die Bäuerinnen und Bauern', en: 'Fair prices for coffee cherries and seasonal bonuses for farmers', fr: 'Des prix justes pour les cerises de café et des primes saisonnières pour les producteurs' },
        { de: 'Schulungen und Geräte für den Anbau', en: 'Training and equipment for farming', fr: 'Formations et équipement agricole' },
        { de: 'Digitale Bildung im Community Resource Centre', en: 'Digital literacy at the Community Resource Centre', fr: 'Alphabétisation numérique au Community Resource Centre' },
        { de: 'Zugang zu Gesundheitsversorgung und Stipendien für Kinder aus Bauernfamilien', en: 'Access to healthcare and scholarships for children from farming families', fr: 'Accès aux soins et bourses d’études pour les enfants des familles d’agriculteurs' },
      ],
    },
    ...coffeeMedia('roots-and-routes', 'Roots & Routes', { de: 'braun-goldenem', en: 'brown and gold', fr: 'brun et or' }),
  },
  planned({
    no: 2, slug: 'ankole-hills', name: 'Ankole Hills', tagline: 'Pastoral Heritage Coffee',
    place: { de: 'Region Ankole', en: 'Ankole Region', fr: 'région d’Ankole' },
    origin: { de: 'Region Ankole, Uganda', en: 'Ankole Region, Uganda', fr: 'Région d’Ankole, Ouganda' },
    from: { de: 'der Region Ankole, Uganda', en: 'the Ankole Region, Uganda', fr: 'région d’Ankole, Ouganda' },
    pattern: { de: 'ocker-goldenem', en: 'ochre and gold', fr: 'ocre et or' },
    coop: same('Ankole Coffee Producers Cooperative Union'),
    story: {
      paragraphs: [
        {
          de: 'Im Südwesten Ugandas liegen die sanften Hügel von Ankole. Hier gehören die Ankole-Rinder mit ihren mächtigen, geschwungenen Hörnern seit Generationen zum Leben der Menschen. Viele Familien, die früher vor allem von der Viehhaltung lebten, bauen heute auch Kaffee an.',
          en: 'The gentle hills of Ankole lie in south-western Uganda. For generations, Ankole cattle with their mighty, curved horns have been part of people’s lives here. Many families who once lived mainly from livestock now grow coffee as well.',
          fr: 'Les douces collines de l’Ankole s’étendent au sud-ouest de l’Ouganda. Depuis des générations, les vaches Ankole aux cornes immenses et recourbées font partie de la vie des habitants. Beaucoup de familles qui vivaient surtout de l’élevage cultivent aujourd’hui aussi du café.',
        },
        {
          de: 'Ankole Hills erzählt von dieser Verbindung: Rinder und Kaffee auf denselben Hügeln, mit vielen kleinen Mikroklimata. Geplant ist eine Hochland-Mischung, in Zusammenarbeit mit der Ankole Coffee Producers Cooperative Union.',
          en: 'Ankole Hills tells of this connection: cattle and coffee on the same hills, with many small microclimates. A highland blend is planned, in cooperation with the Ankole Coffee Producers Cooperative Union.',
          fr: 'Ankole Hills raconte ce lien : le bétail et le café sur les mêmes collines, avec de nombreux microclimats. Un mélange des hautes terres est prévu, en coopération avec l’Ankole Coffee Producers Cooperative Union.',
        },
      ],
      sayings: [{ text: 'Obusozi bw’Ankole businga obunene', lang: 'nyn', language: lang.runyankore, meaning: { de: 'Die Hügel von Ankole übertreffen alles an Größe.', en: 'The hills of Ankole surpass all in greatness.', fr: 'Les collines de l’Ankole surpassent tout en grandeur.' } }],
      aims: [
        { de: 'Unterstützung für eine Landwirtschaft, die Viehhaltung und Kaffeeanbau verbindet', en: 'Support for farming that combines livestock and coffee', fr: 'Soutien à une agriculture qui associe élevage et café' },
        { de: 'Erhalt des kulturellen Erbes der Hirtengemeinschaften', en: 'Preserving the cultural heritage of pastoral communities', fr: 'Préservation du patrimoine culturel des communautés pastorales' },
        { de: 'Tierärztliche Versorgung und Schulungen zur Tiergesundheit', en: 'Veterinary services and training in animal health', fr: 'Services vétérinaires et formations en santé animale' },
        { de: 'Bildung für junge Menschen zwischen Hirtentradition und moderner Landwirtschaft', en: 'Education for young people between pastoral tradition and modern farming', fr: 'Éducation des jeunes entre tradition pastorale et agriculture moderne' },
      ],
    },
  }),
  // 03 – product "coming soon".
  {
    slug: 'abantu-coffee-kanungu-forest', category: 'coffee', status: 'coming-soon', edition: 3, editionName: 'Kanungu Forest', tagline: 'Bwindi Canopy Coffee',
    name: productName('Kanungu Forest'),
    short: { de: 'Bwindi Canopy Coffee · Bwindi Forest Edge · dunkle Röstung · 250 g', en: 'Bwindi Canopy Coffee · Bwindi Forest Edge · dark roast · 250 g', fr: 'Bwindi Canopy Coffee · lisière de la forêt de Bwindi · torréfaction foncée · 250 g' },
    description: {
      de: 'Arabica vom Rand des Bwindi-Waldes in Uganda, mit dunkler Röstung, aus unserer Linie „Bwindi Canopy“. In der 250-g-Packung. Abantu Coffee ist ein Projekt von Bantu e.V. mit Balambuli Kwigate Coffee (BKC) als Hauptpartner für Kaffee. Die Erlöse unterstützen die Projekte von Bantu e.V.',
      en: 'A dark-roast Arabica from the edge of the Bwindi forest in Uganda, from our Bwindi Canopy line. In a 250 g pack. Abantu Coffee is a project of Bantu e.V., with Balambuli Kwigate Coffee (BKC) as its main coffee partner. Proceeds support the projects of Bantu e.V.',
      fr: 'Un arabica de la lisière de la forêt de Bwindi en Ouganda, à torréfaction foncée, de notre gamme Bwindi Canopy. En sachet de 250 g. Abantu Coffee est un projet de Bantu e.V., avec Balambuli Kwigate Coffee (BKC) comme principal partenaire café. Les recettes soutiennent les projets de Bantu e.V.',
    },
    details: [
      row(lbl.origin, { de: 'Bwindi Forest Edge, Uganda', en: 'Bwindi Forest Edge, Uganda', fr: 'Lisière de la forêt de Bwindi, Ouganda' }),
      row(lbl.edition, editionNo(3)),
      row(lbl.roast, { de: 'dunkel', en: 'dark', fr: 'foncée' }),
      row(lbl.type, same('Arabica')),
      row(lbl.weight, same('250 g')),
      row(lbl.partner, same(BKC)),
      row(lbl.project, same('Bantu e.V.')),
    ],
    story: {
      paragraphs: [
        {
          de: 'Am Rand des Bwindi Impenetrable Forest, eines der letzten Lebensräume der Berggorillas, liegt der Distrikt Kanungu. Hier wächst Kaffee im Schatten des Waldes.',
          en: 'Kanungu district lies at the edge of Bwindi Impenetrable Forest, one of the last homes of the mountain gorilla. Here coffee grows in the shade of the forest.',
          fr: 'Le district de Kanungu se trouve à la lisière de la forêt impénétrable de Bwindi, l’un des derniers refuges du gorille des montagnes. Ici, le café pousse à l’ombre de la forêt.',
        },
        {
          de: 'Kanungu Forest steht für Kaffee, der mit dem Wald lebt und nicht gegen ihn: Schattenanbau unter dem natürlichen Blätterdach, waldfreundliche Anbaumethoden und der Schutz der Artenvielfalt. In der Region wollen wir mit der Kanungu Coffee Farmers Cooperative Society zusammenarbeiten; unser Hauptpartner für Kaffee ist Balambuli Kwigate Coffee (BKC).',
          en: 'Kanungu Forest stands for coffee that lives with the forest, not against it: shade-grown under the natural canopy, forest-friendly farming and the protection of biodiversity. In the region we plan to work with the Kanungu Coffee Farmers Cooperative Society; our main coffee partner is Balambuli Kwigate Coffee (BKC).',
          fr: 'Kanungu Forest représente un café qui vit avec la forêt et non contre elle : culture sous ombrage, sous la canopée naturelle, pratiques respectueuses de la forêt et protection de la biodiversité. Dans la région, nous prévoyons de travailler avec la Kanungu Coffee Farmers Cooperative Society ; notre principal partenaire café est Balambuli Kwigate Coffee (BKC).',
        },
      ],
      sayings: [{ text: 'Ekibira kikuuma obulamu', lang: 'cgg', language: lang.rukiga, meaning: { de: 'Der Wald schützt das Leben.', en: 'The forest protects life.', fr: 'La forêt protège la vie.' } }],
      aims: [
        { de: 'Waldschutz und Wiederaufforstung', en: 'Forest conservation and reforestation', fr: 'Protection des forêts et reboisement' },
        { de: 'Initiativen zum Schutz des Lebensraums der Berggorillas', en: 'Initiatives to protect the mountain gorilla’s habitat', fr: 'Initiatives pour protéger l’habitat du gorille des montagnes' },
        { de: 'Verbindung von Ökotourismus und Kaffeeanbau', en: 'Linking eco-tourism and coffee farming', fr: 'Lien entre écotourisme et culture du café' },
        { de: 'Schulungen für nachhaltigen Anbau am Waldrand', en: 'Training in sustainable farming at the forest edge', fr: 'Formations à une agriculture durable en lisière de forêt' },
      ],
    },
    ...coffeeMedia('kanungu-forest', 'Kanungu Forest', { de: 'dunkelgrün-goldenem', en: 'deep green and gold', fr: 'vert foncé et or' }),
  },
  planned({
    no: 4, slug: 'sebei-elgon', name: 'Sebei Elgon', tagline: 'Mountain Heritage Coffee',
    place: { de: 'Osthänge des Mount Elgon', en: 'Eastern Elgon Slopes', fr: 'versant est du mont Elgon' },
    origin: { de: 'Osthänge des Mount Elgon, Uganda', en: 'Eastern slopes of Mount Elgon, Uganda', fr: 'Versant est du mont Elgon, Ouganda' },
    from: { de: 'den Osthängen des Mount Elgon, Uganda', en: 'the eastern slopes of Mount Elgon, Uganda', fr: 'versant est du mont Elgon, Ouganda' },
    pattern: { de: 'marineblau-goldenem', en: 'navy blue and gold', fr: 'bleu marine et or' },
    coop: same('Sebei Elgon Co-operative Union'),
    story: {
      paragraphs: [
        {
          de: 'Sebei Elgon führt an die Osthänge des Mount Elgon, nahe der Grenze zu Kenia. Hier lebt das Volk der Sebei, das für seine Stärke und seinen Mut bekannt ist und sein kulturelles Erbe bewusst pflegt.',
          en: 'Sebei Elgon takes you to the eastern slopes of Mount Elgon, near the border with Kenya. This is home to the Sebei people, known for their strength and courage, who take great care of their cultural heritage.',
          fr: 'Sebei Elgon vous emmène sur le versant est du mont Elgon, près de la frontière kényane. C’est le pays du peuple sebei, connu pour sa force et son courage, qui veille avec soin sur son patrimoine culturel.',
        },
        {
          de: 'Der Kaffee wächst hier besonders hoch, auf 2.000 bis 2.500 Metern, auf vulkanischen Böden und mit klarem Quellwasser aus den Bergen. Daraus soll ein kräftiger Bergkaffee entstehen, in Zusammenarbeit mit der Sebei Elgon Co-operative Union.',
          en: 'Coffee grows especially high here, at 2,000 to 2,500 metres, on volcanic soils and with clear spring water from the mountains. The plan is a strong mountain coffee, in cooperation with the Sebei Elgon Co-operative Union.',
          fr: 'Ici, le café pousse particulièrement haut, entre 2 000 et 2 500 mètres, sur des sols volcaniques et avec l’eau claire des sources de montagne. L’idée est un café de montagne corsé, en coopération avec la Sebei Elgon Co-operative Union.',
        },
      ],
      sayings: [{ text: 'Shujaa wa mlima', lang: 'sw', language: lang.swahili, meaning: { de: 'Held des Berges', en: 'Hero of the mountain', fr: 'Héros de la montagne' } }],
      aims: [
        { de: 'Erhalt des kulturellen Erbes und Dokumentation des Wissens der Ältesten', en: 'Preserving cultural heritage and recording the knowledge of elders', fr: 'Préservation du patrimoine culturel et transmission du savoir des anciens' },
        { de: 'Förderung junger Menschen als Führungspersönlichkeiten', en: 'Leadership training for young people', fr: 'Formation au leadership pour les jeunes' },
        { de: 'Schulungen für den Anbau in großer Höhe', en: 'Training in high-altitude farming', fr: 'Formations à la culture en haute altitude' },
        { de: 'Unterstützung für traditionelle Sportarten und Kulturfeste', en: 'Support for traditional sports and cultural festivals', fr: 'Soutien aux sports traditionnels et aux fêtes culturelles' },
      ],
    },
  }),
  planned({
    no: 5, slug: 'bukonzo', name: 'Bukonzo', tagline: 'Mountains of the Moon',
    place: { de: 'Rwenzori-Gebirge', en: 'Rwenzori Mountains', fr: 'monts Rwenzori' },
    origin: { de: 'Rwenzori-Gebirge, Uganda', en: 'Rwenzori Mountains, Uganda', fr: 'Monts Rwenzori, Ouganda' },
    from: { de: 'dem Rwenzori-Gebirge, Uganda', en: 'the Rwenzori Mountains, Uganda', fr: 'monts Rwenzori, Ouganda' },
    pattern: { de: 'petrol-goldenem', en: 'teal and gold', fr: 'bleu pétrole et or' },
    coop: same('Bukonzo Organic Farmers Cooperative Union'),
    story: {
      paragraphs: [
        {
          de: 'Die Rwenzori-Berge an der Grenze zur Demokratischen Republik Kongo werden die Mondberge genannt. Ihre Gipfel tragen Schnee und Gletscher, obwohl sie fast am Äquator liegen. Hier lebt das Volk der Bakonzo; der Name Bukonzo steht für seine Heimat.',
          en: 'The Rwenzori Mountains on the border with the Democratic Republic of the Congo are known as the Mountains of the Moon. Their peaks carry snow and glaciers, although they lie almost on the equator. This is the home of the Bakonzo people; the name Bukonzo stands for their homeland.',
          fr: 'Les monts Rwenzori, à la frontière de la République démocratique du Congo, sont appelés les montagnes de la Lune. Leurs sommets portent neige et glaciers, bien qu’ils se trouvent presque sur l’équateur. C’est le pays du peuple bakonzo ; le nom Bukonzo désigne sa terre.',
        },
        {
          de: 'Kaffee wächst hier in großer Höhe, auf vulkanischen Bergböden, bewässert von Bächen aus den Gletschern. Bukonzo soll in Zusammenarbeit mit der Bukonzo Organic Farmers Cooperative Union entstehen, einer Genossenschaft, die auf ökologischen Anbau setzt.',
          en: 'Coffee grows here at high altitude, on volcanic mountain soils, watered by streams from the glaciers. Bukonzo is planned together with the Bukonzo Organic Farmers Cooperative Union, a cooperative committed to organic farming.',
          fr: 'Le café y pousse en altitude, sur des sols volcaniques, arrosé par les ruisseaux des glaciers. Bukonzo est prévu avec la Bukonzo Organic Farmers Cooperative Union, une coopérative engagée dans l’agriculture biologique.',
        },
      ],
      sayings: [{ text: 'Bukonzo bw’omwezi gwokyera', lang: 'koo', language: lang.lukonzo, meaning: { de: 'Bukonzo des leuchtenden Mondes', en: 'Bukonzo of the shining moon', fr: 'Bukonzo de la lune brillante' } }],
      aims: [
        { de: 'Schulungen und Unterstützung auf dem Weg zur Bio-Zertifizierung', en: 'Training and support on the way to organic certification', fr: 'Formations et soutien vers la certification biologique' },
        { de: 'Anpassung an den Klimawandel in großer Höhe', en: 'Climate adaptation for high-altitude farming', fr: 'Adaptation au changement climatique en altitude' },
        { de: 'Schutz der Bergbäche und des Wassers', en: 'Protecting mountain streams and water', fr: 'Protection des ruisseaux de montagne et de l’eau' },
        { de: 'Bildung für nachhaltige Berglandwirtschaft', en: 'Education in sustainable mountain agriculture', fr: 'Éducation à une agriculture de montagne durable' },
      ],
    },
  }),
  planned({
    no: 6, slug: 'nkongoro', name: 'Nkongoro', tagline: 'Crater Valley Coffee',
    place: { de: 'Kraterhochland', en: 'Crater Highlands', fr: 'hautes terres des cratères' },
    origin: { de: 'Kraterhochland, Uganda', en: 'Crater Highlands, Uganda', fr: 'Hautes terres des cratères, Ouganda' },
    from: { de: 'dem Kraterhochland, Uganda', en: 'the Crater Highlands, Uganda', fr: 'hautes terres des cratères, Ouganda' },
    pattern: { de: 'weinrot-goldenem', en: 'wine red and gold', fr: 'lie-de-vin et or' },
    coop: same('Nkongoro Coffee Farmers Cooperatives Society'),
    story: {
      paragraphs: [
        {
          de: 'Nkongoro führt in die Kraterhochländer Ugandas, wo alte Vulkane Täler und Kraterseen hinterlassen haben. Die Böden sind reich an Mineralien, die Täler haben ihr eigenes Mikroklima.',
          en: 'Nkongoro takes you to Uganda’s crater highlands, where ancient volcanoes left valleys and crater lakes behind. The soils are rich in minerals, and the valleys have their own microclimate.',
          fr: 'Nkongoro vous emmène dans les hautes terres des cratères d’Ouganda, où d’anciens volcans ont laissé des vallées et des lacs de cratère. Les sols sont riches en minéraux et les vallées ont leur propre microclimat.',
        },
        {
          de: 'Aus diesen vulkanischen Kraterböden soll ein kräftiger, intensiver Kaffee entstehen, geformt von uralten Kräften der Erde. Geplant ist die Zusammenarbeit mit der Nkongoro Coffee Farmers Cooperatives Society.',
          en: 'From these volcanic crater soils a bold, intense coffee is to emerge, shaped by ancient forces of the earth. Cooperation with the Nkongoro Coffee Farmers Cooperatives Society is planned.',
          fr: 'De ces sols volcaniques doit naître un café corsé et intense, façonné par les forces anciennes de la terre. Une coopération avec la Nkongoro Coffee Farmers Cooperatives Society est prévue.',
        },
      ],
      sayings: [{ text: 'Ekikomera kivaamu amaanyi', lang: 'lg', language: lang.luganda, meaning: { de: 'Der Krater schenkt Kraft.', en: 'The crater gives strength.', fr: 'Le cratère donne la force.' } }],
      aims: [
        { de: 'Schutz der vulkanischen Böden', en: 'Protecting the volcanic soils', fr: 'Protection des sols volcaniques' },
        { de: 'Schulungen in Bodenkunde und Bodenpflege', en: 'Training in soil science and soil care', fr: 'Formations en science et en soin des sols' },
        { de: 'Schutz des Ökosystems der Krater', en: 'Protecting the crater ecosystem', fr: 'Protection de l’écosystème des cratères' },
        { de: 'Bessere Preise durch die Vermarktung des besonderen Terroirs', en: 'Better prices by marketing the unique terroir', fr: 'De meilleurs prix grâce à la valorisation d’un terroir unique' },
      ],
    },
  }),
  planned({
    no: 7, slug: 'rwenzori-peaks', name: 'Rwenzori Peaks', tagline: 'Mountain Heights Coffee',
    place: { de: 'Region Rwenzori', en: 'Rwenzori Region', fr: 'région du Rwenzori' },
    origin: { de: 'Region Rwenzori, Uganda', en: 'Rwenzori Region, Uganda', fr: 'Région du Rwenzori, Ouganda' },
    from: { de: 'der Region Rwenzori, Uganda', en: 'the Rwenzori Region, Uganda', fr: 'région du Rwenzori, Ouganda' },
    pattern: { de: 'indigoblau-goldenem', en: 'indigo and gold', fr: 'indigo et or' },
    coop: same('Mount Rwenzori Coffee Farmers’ Co-operative Union'),
    story: {
      paragraphs: [
        {
          de: 'Die Gipfel des Rwenzori gehören zu den höchsten Afrikas; oft verschwinden sie in den Wolken. In den Tälern darunter wird Kaffee in außergewöhnlicher Höhe angebaut, mit reinem Schmelzwasser der Gletscher.',
          en: 'The Rwenzori peaks are among Africa’s highest and often disappear into the clouds. In the valleys below, coffee is grown at exceptional altitude, with pure glacial meltwater.',
          fr: 'Les sommets du Rwenzori comptent parmi les plus hauts d’Afrique et disparaissent souvent dans les nuages. Dans les vallées en contrebas, le café est cultivé à une altitude exceptionnelle, avec l’eau pure de la fonte des glaciers.',
        },
        {
          de: 'Rwenzori Peaks steht für dieses seltene alpine Klima und für die Arbeit der Bäuerinnen und Bauern in den Höhenlagen. Geplant ist die Zusammenarbeit mit der Mount Rwenzori Coffee Farmers’ Co-operative Union.',
          en: 'Rwenzori Peaks stands for this rare alpine climate and for the work of the farmers at these heights. Cooperation with the Mount Rwenzori Coffee Farmers’ Co-operative Union is planned.',
          fr: 'Rwenzori Peaks représente ce climat alpin rare et le travail des agricultrices et agriculteurs sur ces hauteurs. Une coopération avec la Mount Rwenzori Coffee Farmers’ Co-operative Union est prévue.',
        },
      ],
      sayings: [{ text: 'Entumbi zirikwera wamaizi', lang: 'koo', language: lang.lukonzo, meaning: { de: 'Gipfel, die die Wolken berühren', en: 'Peaks that touch the clouds', fr: 'Des sommets qui touchent les nuages' } }],
      aims: [
        { de: 'Entwicklung von Anbaumethoden für extreme Höhenlagen', en: 'Developing farming methods for extreme altitudes', fr: 'Développer des méthodes de culture pour la très haute altitude' },
        { de: 'Schulungen zur Anpassung an den Klimawandel', en: 'Training in climate adaptation', fr: 'Formations à l’adaptation au changement climatique' },
        { de: 'Schutz des Gletscherwassers', en: 'Protecting glacial water', fr: 'Protection de l’eau des glaciers' },
        { de: 'Vermarktung und Zertifizierung von Hochlagenkaffee', en: 'Marketing and certification of high-altitude coffee', fr: 'Commercialisation et certification du café d’altitude' },
      ],
    },
  }),
  planned({
    no: 8, slug: 'obushobozi', name: 'Obushobozi', tagline: 'Strength Through Community',
    place: same('Uganda'),
    origin: { de: 'Uganda', en: 'Uganda', fr: 'Ouganda' },
    from: { de: 'Uganda', en: 'Uganda', fr: 'Ouganda' },
    pattern: { de: 'pflaumenfarben-goldenem', en: 'plum and gold', fr: 'prune et or' },
    coop: { de: 'Bukalasi Women’s Association und weitere Frauenkooperativen', en: 'Bukalasi Women’s Association and other women’s cooperatives', fr: 'Bukalasi Women’s Association et d’autres coopératives de femmes' },
    story: {
      paragraphs: [
        {
          de: 'Obushobozi bedeutet auf Runyankore Stärke und Fähigkeit. Diese Edition stellt die Frauen in den Mittelpunkt, die einen großen Teil der Arbeit im Kaffeeanbau leisten.',
          en: 'Obushobozi means strength and ability in Runyankore. This edition puts the spotlight on the women who do a large part of the work in coffee farming.',
          fr: 'Obushobozi signifie force et capacité en runyankore. Cette édition met en lumière les femmes, qui accomplissent une grande partie du travail dans la culture du café.',
        },
        {
          de: 'Sie soll aus Kooperativen kommen, die von Frauen geführt werden, und Frauen auf dem Weg zu wirtschaftlicher Unabhängigkeit stärken. Geplant ist die Zusammenarbeit mit der Bukalasi Women’s Association und weiteren Frauenkooperativen in mehreren Regionen.',
          en: 'It is meant to come from women-led cooperatives and to strengthen women on their way to economic independence. Cooperation with the Bukalasi Women’s Association and other women’s cooperatives in several regions is planned.',
          fr: 'Elle doit provenir de coopératives dirigées par des femmes et les soutenir sur le chemin de l’indépendance économique. Une coopération avec la Bukalasi Women’s Association et d’autres coopératives de femmes dans plusieurs régions est prévue.',
        },
      ],
      sayings: [{ text: 'Obushobozi obw’amazima buva mu bantu', lang: 'nyn', language: lang.runyankore, meaning: { de: 'Wahre Stärke kommt von den Menschen.', en: 'True strength comes from people.', fr: 'La vraie force vient des gens.' } }],
      aims: [
        { de: 'Führungstrainings und Unterstützung beim Aufbau eigener Geschäfte', en: 'Leadership training and support for women’s own businesses', fr: 'Formations au leadership et soutien à la création d’activités' },
        { de: 'Spar- und Kleinkreditgruppen', en: 'Savings and microcredit groups', fr: 'Groupes d’épargne et de microcrédit' },
        { de: 'Stipendien für Kinder', en: 'Scholarships for children', fr: 'Bourses d’études pour les enfants' },
        { de: 'Gesundheitsversorgung und Unterstützung für Mütter', en: 'Healthcare and support for mothers', fr: 'Accès aux soins et soutien aux mères' },
      ],
    },
  }),
  planned({
    no: 9, slug: 'nile-highland', name: 'Nile Highland', tagline: 'Source of the Nile Coffee',
    place: { de: 'Region der Nilquelle', en: 'Nile Source Region', fr: 'région de la source du Nil' },
    origin: { de: 'Region der Nilquelle, Uganda', en: 'Nile Source Region, Uganda', fr: 'Région de la source du Nil, Ouganda' },
    from: { de: 'der Region der Nilquelle, Uganda', en: 'the Nile Source Region, Uganda', fr: 'région de la source du Nil, Ouganda' },
    pattern: { de: 'tiefblau-goldenem', en: 'deep blue and gold', fr: 'bleu profond et or' },
    coop: same('Nile Highland Coffee Farmers Association'),
    story: {
      paragraphs: [
        {
          de: 'Bei Jinja verlässt der Nil den Viktoriasee und beginnt seine lange Reise bis zum Mittelmeer. Die Hochländer rund um diese Quelle sind seit Langem ein Ort des Handels und der Begegnung.',
          en: 'Near Jinja, the Nile leaves Lake Victoria and begins its long journey to the Mediterranean. The highlands around this source have long been a place of trade and encounter.',
          fr: 'Près de Jinja, le Nil quitte le lac Victoria et commence son long voyage jusqu’à la Méditerranée. Les hautes terres autour de cette source sont depuis longtemps un lieu d’échanges et de rencontres.',
        },
        {
          de: 'Nile Highland erzählt von diesem Ursprung: Kaffee aus dem Hochland an der Quelle des Nils, mit reinem Quellwasser. Geplant ist die Zusammenarbeit mit der Nile Highland Coffee Farmers Association.',
          en: 'Nile Highland tells of this origin: coffee from the highlands at the source of the Nile, with pure spring water. Cooperation with the Nile Highland Coffee Farmers Association is planned.',
          fr: 'Nile Highland raconte cette origine : un café des hautes terres de la source du Nil, avec une eau de source pure. Une coopération avec la Nile Highland Coffee Farmers Association est prévue.',
        },
      ],
      sayings: [{ text: 'Ensozi ezivaamu Nnalubaale', lang: 'lg', language: lang.luganda, meaning: { de: 'Die Hügel, aus denen der Nil fließt', en: 'The hills from which the Nile flows', fr: 'Les collines d’où coule le Nil' } }],
      aims: [
        { de: 'Schutz der Quellen und Wasservorkommen im Hochland', en: 'Protecting highland springs and water sources', fr: 'Protection des sources et des réserves d’eau des hautes terres' },
        { de: 'Erhalt des kulturellen Erbes und Aufbau von Tourismus', en: 'Preserving cultural heritage and developing tourism', fr: 'Préservation du patrimoine culturel et développement du tourisme' },
        { de: 'Bildung zur Geschichte der alten Handelswege', en: 'Education on the history of ancient trade routes', fr: 'Éducation à l’histoire des anciennes routes commerciales' },
        { de: 'Verbindung von Ökotourismus und Kaffee', en: 'Linking eco-tourism and coffee', fr: 'Lien entre écotourisme et café' },
      ],
    },
  }),
  planned({
    no: 10, slug: 'kwihangana', name: 'Kwihangana', tagline: 'Patience & Mindful Cultivation',
    place: { de: 'Region Viktoriasee', en: 'Lake Victoria Region', fr: 'région du lac Victoria' },
    origin: { de: 'Region Viktoriasee, Uganda', en: 'Lake Victoria Region, Uganda', fr: 'Région du lac Victoria, Ouganda' },
    from: { de: 'der Region Viktoriasee, Uganda', en: 'the Lake Victoria Region, Uganda', fr: 'région du lac Victoria, Ouganda' },
    pattern: { de: 'olivgrün-goldenem', en: 'olive green and gold', fr: 'vert olive et or' },
    coop: same('Kibinge Coffee Farmers’ Cooperative Society'),
    story: {
      paragraphs: [
        {
          de: 'Kwihangana heißt auf Kinyarwanda Geduld und Ausdauer. Guter Kaffee braucht beides, vom Pflanzen über die Ernte bis zur Aufbereitung.',
          en: 'Kwihangana means patience and perseverance in Kinyarwanda. Good coffee needs both, from planting and harvesting to processing.',
          fr: 'Kwihangana signifie patience et persévérance en kinyarwanda. Un bon café a besoin des deux, de la plantation à la récolte jusqu’au traitement.',
        },
        {
          de: 'Diese Edition kommt aus dem Hochland am Viktoriasee, inspiriert von der Ruhe des Wassers. Vorgesehen sind eine verlängerte Fermentation von 36 bis 40 Stunden und ein achtsamer Anbau, in Zusammenarbeit mit der Kibinge Coffee Farmers’ Cooperative Society.',
          en: 'This edition comes from the highlands by Lake Victoria, inspired by the calm of the water. An extended fermentation of 36 to 40 hours and mindful cultivation are planned, in cooperation with the Kibinge Coffee Farmers’ Cooperative Society.',
          fr: 'Cette édition vient des hautes terres du lac Victoria, inspirée par le calme de l’eau. Une fermentation prolongée de 36 à 40 heures et une culture attentive sont prévues, en coopération avec la Kibinge Coffee Farmers’ Cooperative Society.',
        },
      ],
      sayings: [{ text: 'Kwihangana ni urufunguzo rw’intsinzi', lang: 'rw', language: lang.kinyarwanda, meaning: { de: 'Geduld ist der Schlüssel zum Sieg.', en: 'Patience is the key to victory.', fr: 'La patience est la clé de la victoire.' } }],
      aims: [
        { de: 'Programme für achtsame Landwirtschaft und Wohlbefinden', en: 'Programmes for mindful farming and wellbeing', fr: 'Programmes d’agriculture attentive et de bien-être' },
        { de: 'Psychosoziale Unterstützung und Orte der Ruhe in den Gemeinden', en: 'Mental health support and quiet spaces in the communities', fr: 'Soutien psychologique et lieux de calme dans les communautés' },
        { de: 'Schulungen für nachhaltige Landwirtschaft am See', en: 'Training in sustainable lakeside farming', fr: 'Formations à une agriculture durable au bord du lac' },
        { de: 'Schulungen zur Aufbereitung für bessere Qualität', en: 'Processing training for better quality', fr: 'Formations au traitement pour une meilleure qualité' },
      ],
    },
  }),
  planned({
    no: 11, slug: 'ubuntu', name: 'Ubuntu', tagline: 'I Am Because We Are',
    place: same('Uganda'),
    origin: { de: 'Uganda', en: 'Uganda', fr: 'Ouganda' },
    from: { de: 'Uganda', en: 'Uganda', fr: 'Ouganda' },
    pattern: { de: 'dunkelbraun-goldenem', en: 'dark brown and gold', fr: 'brun foncé et or' },
    coop: allPartners,
    story: {
      paragraphs: [
        {
          de: 'Ubuntu ist ein Gedanke, der in vielen Bantusprachen lebt: Ein Mensch wird erst durch andere Menschen zum Menschen. Auch unser Name kommt aus dieser Sprachfamilie; Abantu bedeutet die Menschen.',
          en: 'Ubuntu is an idea that lives in many Bantu languages: a person becomes a person through other people. Our own name comes from this language family; Abantu means the people.',
          fr: 'Ubuntu est une idée qui vit dans de nombreuses langues bantoues : on devient une personne grâce aux autres. Notre nom vient lui aussi de cette famille de langues ; Abantu signifie les gens.',
        },
        {
          de: 'Die Edition Ubuntu ist als Mischung aus allen Partnerregionen geplant: unterschiedliche Böden und Landschaften in einer Tasse, als Zeichen für die Verbundenheit der Kaffeegemeinschaften Ugandas.',
          en: 'Ubuntu is planned as a blend from all partner regions: different soils and landscapes in one cup, as a sign of how Uganda’s coffee communities belong together.',
          fr: 'L’édition Ubuntu est prévue comme un mélange de toutes les régions partenaires : des sols et des paysages différents dans une même tasse, signe du lien entre les communautés caféières d’Ouganda.',
        },
      ],
      sayings: [{ text: 'Umuntu ngumuntu ngabantu', lang: 'zu', language: lang.zulu, meaning: { de: 'Ein Mensch ist ein Mensch durch andere Menschen.', en: 'A person is a person through other people.', fr: 'Une personne est une personne grâce aux autres.' } }],
      aims: [
        { de: 'Zusammenarbeit zwischen den Kooperativen der verschiedenen Regionen', en: 'Cooperation between cooperatives from different regions', fr: 'Coopération entre les coopératives des différentes régions' },
        { de: 'Begegnungen und Feste zwischen den Gemeinschaften', en: 'Exchanges and festivals between communities', fr: 'Rencontres et fêtes entre les communautés' },
        { de: 'Netzwerke zum Austausch von Wissen und guter Praxis', en: 'Networks for sharing knowledge and good practice', fr: 'Réseaux d’échange de savoirs et de bonnes pratiques' },
        { de: 'Projekte für Frieden und Versöhnung', en: 'Projects for peace and reconciliation', fr: 'Projets de paix et de réconciliation' },
      ],
    },
  }),
  planned({
    no: 12, slug: 'kukunda', name: 'Kukunda', tagline: 'Love & Compassion',
    place: same('Uganda'),
    origin: { de: 'Uganda', en: 'Uganda', fr: 'Ouganda' },
    from: { de: 'Uganda', en: 'Uganda', fr: 'Ouganda' },
    pattern: { de: 'terrakotta-goldenem', en: 'terracotta and gold', fr: 'terre cuite et or' },
    coop: allPartners,
    story: {
      paragraphs: [
        {
          de: 'Kukunda steht für Liebe und Mitgefühl. Die letzte Edition der Uganda Collection ist den Menschen gewidmet, die in schweren Zeiten Unterstützung brauchen: Kindern, älteren Menschen und Familien in Not.',
          en: 'Kukunda stands for love and compassion. The last edition of the Uganda Collection is dedicated to people who need support in hard times: children, older people and families in need.',
          fr: 'Kukunda représente l’amour et la compassion. La dernière édition de la Uganda Collection est dédiée aux personnes qui ont besoin de soutien dans les moments difficiles : enfants, personnes âgées et familles en détresse.',
        },
        {
          de: 'Geplant ist ein Kaffee mit Honey-Aufbereitung: Ein Teil des süßen Fruchtfleischs bleibt beim Trocknen an der Bohne und gibt ihr eine natürliche Süße. Die besondere Sorgfalt in jedem Arbeitsschritt steht für die Fürsorge, um die es in dieser Edition geht. Der Kaffee soll aus allen Partnerkooperativen kommen.',
          en: 'A honey-processed coffee is planned: part of the sweet fruit pulp stays on the bean while it dries and gives it a natural sweetness. The extra care at every step stands for the care this edition is about. The coffee is meant to come from all partner cooperatives.',
          fr: 'Un café au procédé honey est prévu : une partie de la pulpe sucrée reste sur le grain pendant le séchage et lui donne une douceur naturelle. Le soin apporté à chaque étape symbolise l’attention au cœur de cette édition. Le café doit provenir de toutes les coopératives partenaires.',
        },
      ],
      sayings: [
        { text: 'Okwagala', lang: 'lg', language: lang.luganda, meaning: { de: 'Liebe', en: 'Love', fr: 'Amour' } },
        { text: 'Upendo', lang: 'sw', language: lang.swahili, meaning: { de: 'Liebe', en: 'Love', fr: 'Amour' } },
      ],
      aims: [
        { de: 'Unterstützung für Waisenhäuser und gefährdete Kinder', en: 'Support for orphanages and vulnerable children', fr: 'Soutien aux orphelinats et aux enfants vulnérables' },
        { de: 'Programme für ältere Menschen und Hilfe in der Gemeinde', en: 'Programmes for older people and community support', fr: 'Programmes pour les personnes âgées et entraide locale' },
        { de: 'Gesundheitsversorgung für Bauernfamilien in Not', en: 'Healthcare for farming families in need', fr: 'Accès aux soins pour les familles d’agriculteurs en difficulté' },
        { de: 'Ein Nothilfefonds für Krisen in den Gemeinden', en: 'An emergency fund for crises in the communities', fr: 'Un fonds d’urgence pour les crises dans les communautés' },
      ],
    },
  }),
];
