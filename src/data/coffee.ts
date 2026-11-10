// ABANTU COFFEE – Uganda Collection (12 editions). Label artwork: "Signs of Connection v4" (chair's design pack of 10.11.2026):
// one front and one matching back label per edition. Every back carries a QR code to the edition's own English page,
// https://www.bantu-ev.org/en/shop/abantu-coffee-<slug>/ – never change a public slug without new QR codes.
// Brand (chair, 08.11.2026): ABANTU COFFEE by Bantu e.V., main coffee partner Balambuli Kwigate Coffee (BKC).
// PUBLIC since 10.11.2026 (chair: "upload only these four editions now"; shop order in shop.ts → coffeeOrder):
// 03 Kanungu Forest, 04 Sebei Elgon, 01 Roots & Routes ("coming soon") and 09 Nile Highland (label sample: concept artwork,
// coffee details not confirmed → `sample: true`, no origin, roast, type or supplier shown, no reservation).
// The other eight editions stay hidden (status 'planned', shop.ts → showPlannedEditions = false). Their v4 artwork is kept
// in the chair's design pack for later and is NOT on the website. To publish one of them: add its label files (see
// labelMedia below), write its entry like the public ones (only confirmed facts) and add the slug to coffeeOrder.
// Rules from the chair's handoff (10.11.2026): do not invent prices, stock, roast levels, suppliers, tasting notes,
// certifications or donation percentages; aims are aims, not achieved results. Product facts: Roots & Routes and
// Kanungu Forest from the label design brief (Dec 2024, v4); Sebei Elgon without roast and coffee type; Nile Highland none yet.
// The signs on the labels: Sankofa and Asase Ye Duru are Adinkra references of the Akan (Ghana), not Ugandan symbols;
// "Elevation" and "River Route" are original motifs (design pack: Cultural_References_and_Artwork_Key.md).
// Stories: chair's decision 08.11.2026 to use the 2025 brochure "Abantu Coffee – Complete 12-Line Collection with Uganda
// Regional Partners" (05_Programme_&_Projekte/…/Abantu Coffee — Marke und Produktentwicklung/03_Implementierung/03_Daten_Fotos_&_Medien).
// Taglines of the public editions follow the v4 labels. Cooperatives, processing, altitude and impact are written as plans/aims,
// because none of them is confirmed yet. Left out on purpose: "certified organic" for Bukonzo (EU organic rules: only for
// certified products) and the Sebei circumcision/ceremony-funding lines of the brochure.
// OPEN: have the local-language sayings checked by native speakers (Runyankore, Rukiga, Lukonzo, Luganda, Kinyarwanda).
// Edition 12 is called KUKUNDA (corrected by the chair on 08.11.2026; label artwork retouched to match).
// OPEN: ask the named cooperatives whether they agree to be named as planned partners.
import type { L, Product } from './shop';

export type CoffeeStory = {
  paragraphs: L[];
  sayings?: { text: string; lang: string; language: L; meaning?: L }[];
  /** The label in words: the sign or motif on the front and what is printed on the back (the label text is German). */
  label?: L[];
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
  plannedRoast: { de: 'Geplante Röstung', en: 'Planned roast', fr: 'Torréfaction prévue' },
  partner: { de: 'Kaffeepartner', en: 'Coffee partner', fr: 'Partenaire café' },
  coop: { de: 'Geplante Partnerkooperative', en: 'Planned partner cooperative', fr: 'Coopérative partenaire prévue' },
  project: { de: 'Ein Projekt von', en: 'A project of', fr: 'Un projet de' },
  status: { de: 'Stand', en: 'Status', fr: 'Statut' },
};
const editionNo = (n: number): L => {
  const nn = String(n).padStart(2, '0');
  return { de: `Uganda Collection, Nr. ${nn}`, en: `Uganda Collection, no. ${nn}`, fr: `Uganda Collection, n° ${nn}` };
};

/** Front and back of an edition in the shop ("Signs of Connection v4"; chair, 10.11.2026: the front must look like the
 *  coffee bag). Files in public/images/shop/abantu-coffee/, all 3:4:
 *  front = abantu-coffee-<slug>-v4-bag-{480,768}.webp + -768.jpg: the single bag cut from the pack's studio visualisations
 *          (01_Lead_Designs, 02_Collection_Concepts). They are illustrative mockups; the precise artwork is the label.
 *  back  = abantu-coffee-<slug>-v4-back-{480,800,1200}.webp + -800.jpg: the complete back label (06_Back_Labels) on the
 *          backdrop colour of the bag photo, with the QR code to the edition's page. */
function labelMedia(slug: string, front: L, back: L) {
  const stem = `/images/shop/abantu-coffee/abantu-coffee-${slug}-v4`;
  return { labels: { front: { stem: `${stem}-bag`, alt: front, widths: [480, 768] }, back: { stem: `${stem}-back`, alt: back, widths: [480, 800, 1200] } } };
}
/** Alternative text of the bag mockup (front): what it looks like and what it says. */
const frontAlt = (name: string, look: L, text: L): L => ({
  de: `Verpackungsvorschau: Kaffeebeutel von Abantu Coffee ${name}, Vorderseite: ${look.de} Aufschrift: ${text.de}. Unten die Logos von Bantu e.V. („Ein Projekt von“) und Balambuli Kwigate Coffee („Kaffeepartner“).`,
  en: `Packaging preview: coffee bag of Abantu Coffee ${name}, front: ${look.en} It reads: ${text.en}. At the bottom, the logos of Bantu e.V. (“a project of”) and Balambuli Kwigate Coffee (“coffee partner”).`,
  fr: `Aperçu de l’emballage : sachet d’Abantu Coffee ${name}, face avant : ${look.fr} On y lit : ${text.fr}. En bas, les logos de Bantu e.V. (« un projet de ») et de Balambuli Kwigate Coffee (« partenaire café »).`,
});
/** Alternative text of a back label (German label text): summary; the full content is real text on the edition's page. */
const backAlt = (name: string, content: L): L => ({
  de: `Rückseite des Etiketts von Abantu Coffee ${name}, Text auf Deutsch: ${content.de} Dazu ein Lagerhinweis, ein QR-Code zur Seite dieser Edition und leere Felder für Mindesthaltbarkeitsdatum, Charge und Rösterei. Der Inhalt steht als Text auf der Seite der Edition.`,
  en: `Back of the label of Abantu Coffee ${name}, text in German: ${content.en} Also storage advice, a QR code to this edition’s page and empty fields for best-before date, batch and roaster. The content is given as text on the edition’s page.`,
  fr: `Dos de l’étiquette d’Abantu Coffee ${name}, texte en allemand : ${content.fr} S’y ajoutent un conseil de conservation, un code QR vers la page de cette édition et des champs vides pour la date de durabilité minimale, le lot et le torréfacteur. Le contenu figure en texte sur la page de l’édition.`,
});
/** Story paragraph about the back of the label; `what` says what this edition's back contains. */
const backNote = (what: L): L => ({
  de: `Die Rückseite ist auf Deutsch beschriftet. ${what.de} Dazu kommen der Lagerhinweis (kühl, trocken und lichtgeschützt lagern, nach dem Öffnen gut verschließen) und ein QR-Code, der zur englischen Fassung dieser Seite führt. Die Felder für Mindesthaltbarkeitsdatum, Charge und Rösterei sind noch leer; sie werden erst für die tatsächliche Abfüllung ausgefüllt.`,
  en: `The back is printed in German. ${what.en} It also carries the storage advice (keep cool, dry and away from light; close well after opening) and a QR code that leads to this page. The fields for best-before date, batch and roaster are still empty; they will only be filled in for the actual production run.`,
  fr: `Le dos est rédigé en allemand. ${what.fr} S’y ajoutent le conseil de conservation (au frais, au sec et à l’abri de la lumière ; bien refermer après ouverture) et un code QR qui mène à la version anglaise de cette page. Les champs pour la date de durabilité minimale, le lot et le torréfacteur sont encore vides ; ils ne seront remplis que pour la production réelle.`,
});

const productName = (name: string): L => ({ de: `Abantu Coffee „${name}“`, en: `Abantu Coffee “${name}”`, fr: `Abantu Coffee « ${name} »` });

/** One of the eight editions that are not public yet (hidden, see showPlannedEditions in shop.ts). Texts from the 2025 brochure;
 *  check every fact against the v4 label and the chair's handoff before publishing an edition. */
function planned(e: {
  no: number; slug: string; name: string; tagline: string; place: L; origin: L; from: L; coop: L; story: CoffeeStory;
  extra?: { label: L; value: L }[];
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
      ...(e.extra ?? []),
      row(lbl.plannedWeight, same('250 g')),
      row(lbl.coop, e.coop),
      row(lbl.partner, same(BKC)),
      row(lbl.project, same('Bantu e.V.')),
      row(lbl.status, { de: 'In Vorbereitung, noch nicht bestellbar', en: 'In preparation, not yet available to order', fr: 'En préparation, pas encore disponible' }),
    ],
    story: e.story,
    ...labelMedia(e.slug,
      { de: `Verpackungsvorschau: Kaffeebeutel von Abantu Coffee ${e.name}.`, en: `Packaging preview: coffee bag of Abantu Coffee ${e.name}.`, fr: `Aperçu de l’emballage : sachet d’Abantu Coffee ${e.name}.` },
      { de: `Rückseite des Etiketts von Abantu Coffee ${e.name}, Text auf Deutsch.`, en: `Back of the label of Abantu Coffee ${e.name}, text in German.`, fr: `Dos de l’étiquette d’Abantu Coffee ${e.name}, texte en allemand.` }),
  };
}

const allPartners: L = { de: 'alle Partnerkooperativen', en: 'all partner cooperatives', fr: 'toutes les coopératives partenaires' };

export const coffeeProducts: Product[] = [
  // 01 – "coming soon". Product facts from the label design brief (Dec 2024, v4), as printed on the v4 label.
  {
    slug: 'abantu-coffee-roots-and-routes', category: 'coffee', status: 'coming-soon', edition: 1, editionName: 'Roots & Routes', tagline: 'Sankofa Heritage Coffee',
    name: productName('Roots & Routes'),
    short: { de: 'Sankofa Heritage Coffee · Mount Elgon · mittlere Röstung · 250 g', en: 'Sankofa Heritage Coffee · Mount Elgon · medium roast · 250 g', fr: 'Sankofa Heritage Coffee · mont Elgon · torréfaction moyenne · 250 g' },
    description: {
      de: 'Arabica vom Mount Elgon in Uganda, mit mittlerer Röstung, aus unserer Linie „Sankofa Heritage“. In der 250-g-Packung. Abantu Coffee ist ein Projekt von Bantu e.V. mit Balambuli Kwigate Coffee (BKC) als Hauptpartner für Kaffee. Die Erlöse sollen die Projekte von Bantu e.V. unterstützen.',
      en: 'A medium-roast Arabica from Mount Elgon in Uganda, from our Sankofa Heritage line. In a 250 g pack. Abantu Coffee is a project of Bantu e.V., with Balambuli Kwigate Coffee (BKC) as its main coffee partner. Proceeds are meant to support the projects of Bantu e.V.',
      fr: 'Un arabica du mont Elgon en Ouganda, à torréfaction moyenne, de notre gamme Sankofa Heritage. En sachet de 250 g. Abantu Coffee est un projet de Bantu e.V., avec Balambuli Kwigate Coffee (BKC) comme principal partenaire café. Les recettes doivent soutenir les projets de Bantu e.V.',
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
          de: 'Später sollen auf dieser Seite auch Videogeschichten der Bäuerinnen und Bauern und Neuigkeiten aus dem Community Resource Centre zu finden sein.',
          en: 'Later, video stories from the farmers and news from the Community Resource Centre are meant to be found on this page as well.',
          fr: 'Plus tard, on doit aussi trouver sur cette page des récits vidéo des agricultrices et agriculteurs et des nouvelles du Community Resource Centre.',
        },
      ],
      sayings: [{ text: 'Sankofa', lang: 'ak', language: lang.akan, meaning: { de: 'Der Blick zurück weist den Weg nach vorn.', en: 'Learning from the past guides us forward.', fr: 'Le regard vers le passé guide nos pas vers l’avenir.' } }],
      label: [
        {
          de: 'Auf dem Etikett blickt der Sankofa-Vogel zurück: ein Adinkra-Zeichen aus der Akan-Kultur Ghanas, hier in einer zeitgenössischen Interpretation. Es steht für das Lernen aus der Vergangenheit. Das Zeichen ist kein ugandisches Symbol; es steht für die Idee der Edition, nicht für die Herkunft des Kaffees.',
          en: 'On the label the Sankofa bird looks back: an Adinkra sign from the Akan culture of Ghana, in a contemporary interpretation. It stands for learning from the past. The sign is not a Ugandan symbol; it stands for the idea of the edition, not for the origin of the coffee.',
          fr: 'Sur l’étiquette, l’oiseau Sankofa regarde en arrière : un signe adinkra de la culture akan du Ghana, dans une interprétation contemporaine. Il évoque l’apprentissage du passé. Ce signe n’est pas un symbole ougandais ; il représente l’idée de l’édition, non l’origine du café.',
        },
        backNote({
          de: 'Sie nennt die Angaben zum Kaffee, erzählt die Geschichte in Kurzform und nennt die Ziele der Edition: fairere Einkommen für Kaffeefamilien, Weiterbildung und bessere Bildungschancen.',
          en: 'It gives the coffee details, tells the story in brief and names the aims of the edition: fairer incomes for coffee-farming families, training and better educational opportunities.',
          fr: 'Il donne les indications sur le café, raconte l’histoire en bref et cite les objectifs de l’édition : des revenus plus justes pour les familles de caféiculteurs, la formation et de meilleures chances d’éducation.',
        }),
      ],
      aims: [
        { de: 'Faire Preise für Kaffeekirschen und saisonale Prämien für die Bäuerinnen und Bauern', en: 'Fair prices for coffee cherries and seasonal bonuses for farmers', fr: 'Des prix justes pour les cerises de café et des primes saisonnières pour les producteurs' },
        { de: 'Schulungen und Geräte für den Anbau', en: 'Training and equipment for farming', fr: 'Formations et équipement agricole' },
        { de: 'Digitale Bildung im Community Resource Centre', en: 'Digital literacy at the Community Resource Centre', fr: 'Alphabétisation numérique au Community Resource Centre' },
        { de: 'Zugang zu Gesundheitsversorgung und Stipendien für Kinder aus Bauernfamilien', en: 'Access to healthcare and scholarships for children from farming families', fr: 'Accès aux soins et bourses d’études pour les enfants des familles d’agriculteurs' },
      ],
    },
    ...labelMedia('roots-and-routes',
      frontAlt('Roots & Routes',
        { de: 'cremefarbener Grund mit dem blauen Sankofa-Vogel, der zurückblickt, vor einem orangefarbenen und einem goldgelben Streifen.', en: 'cream ground with the blue Sankofa bird looking back, in front of an orange and a golden-yellow stripe.', fr: 'fond crème avec l’oiseau Sankofa bleu qui regarde en arrière, devant une bande orange et une bande jaune doré.' },
        { de: 'Abantu Coffee, Roots & Routes, Sankofa Heritage Coffee, Mount Elgon, Uganda, mittlere Röstung, Arabica, 250 g', en: 'Abantu Coffee, Roots & Routes, Sankofa Heritage Coffee, Mount Elgon, Uganda, medium roast, Arabica, 250 g', fr: 'Abantu Coffee, Roots & Routes, Sankofa Heritage Coffee, mont Elgon, Ouganda, torréfaction moyenne, arabica, 250 g' }),
      backAlt('Roots & Routes', {
        de: 'Sankofa Heritage Coffee, Mount Elgon, Uganda, mittlere Röstung, Arabica, 250 g; die Geschichte der Edition; Ziele: fairere Einkommen für Kaffeefamilien, Weiterbildung und bessere Bildungschancen.',
        en: 'Sankofa Heritage Coffee, Mount Elgon, Uganda, medium roast, Arabica, 250 g; the story of the edition; aims: fairer incomes for coffee-farming families, training and better educational opportunities.',
        fr: 'Sankofa Heritage Coffee, mont Elgon, Ouganda, torréfaction moyenne, arabica, 250 g ; l’histoire de l’édition ; objectifs : des revenus plus justes pour les familles de caféiculteurs, la formation et de meilleures chances d’éducation.',
      })),
  },
  planned({
    no: 2, slug: 'ankole-hills', name: 'Ankole Hills', tagline: 'Pastoral Heritage Coffee',
    place: { de: 'Region Ankole', en: 'Ankole Region', fr: 'région d’Ankole' },
    origin: { de: 'Region Ankole, Uganda', en: 'Ankole Region, Uganda', fr: 'Région d’Ankole, Ouganda' },
    from: { de: 'der Region Ankole, Uganda', en: 'the Ankole Region, Uganda', fr: 'région d’Ankole, Ouganda' },
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
  // 03 – "coming soon" again since 10.11.2026 (chair; it was hidden from 09.11.2026). Roast and coffee type from the label design
  // brief (Dec 2024, v4), as printed on the v4 label. The cooperative is a planned partner, not a confirmed supplier.
  {
    slug: 'abantu-coffee-kanungu-forest', category: 'coffee', status: 'coming-soon', edition: 3, editionName: 'Kanungu Forest', tagline: 'Bwindi Canopy Coffee',
    name: productName('Kanungu Forest'),
    short: { de: 'Bwindi Canopy Coffee · Bwindi Forest Edge · dunkle Röstung · 250 g', en: 'Bwindi Canopy Coffee · Bwindi Forest Edge · dark roast · 250 g', fr: 'Bwindi Canopy Coffee · lisière de la forêt de Bwindi · torréfaction foncée · 250 g' },
    description: {
      de: 'Arabica vom Rand des Bwindi-Waldes in Uganda, mit dunkler Röstung, aus unserer Linie „Bwindi Canopy“. In der 250-g-Packung. Abantu Coffee ist ein Projekt von Bantu e.V. mit Balambuli Kwigate Coffee (BKC) als Hauptpartner für Kaffee. Die Erlöse sollen die Projekte von Bantu e.V. unterstützen.',
      en: 'A dark-roast Arabica from the edge of the Bwindi forest in Uganda, from our Bwindi Canopy line. In a 250 g pack. Abantu Coffee is a project of Bantu e.V., with Balambuli Kwigate Coffee (BKC) as its main coffee partner. Proceeds are meant to support the projects of Bantu e.V.',
      fr: 'Un arabica de la lisière de la forêt de Bwindi en Ouganda, à torréfaction foncée, de notre gamme Bwindi Canopy. En sachet de 250 g. Abantu Coffee est un projet de Bantu e.V., avec Balambuli Kwigate Coffee (BKC) comme principal partenaire café. Les recettes doivent soutenir les projets de Bantu e.V.',
    },
    details: [
      row(lbl.origin, { de: 'Bwindi Forest Edge, Uganda', en: 'Bwindi Forest Edge, Uganda', fr: 'Lisière de la forêt de Bwindi, Ouganda' }),
      row(lbl.edition, editionNo(3)),
      row(lbl.roast, { de: 'dunkel', en: 'dark', fr: 'foncée' }),
      row(lbl.type, same('Arabica')),
      row(lbl.weight, same('250 g')),
      row(lbl.coop, same('Kanungu Coffee Farmers Cooperative Society')),
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
      label: [
        {
          de: 'Auf dem Etikett steht Asase Ye Duru, ein Adinkra-Zeichen aus der Akan-Kultur Ghanas, hier in einer zeitgenössischen Interpretation. Es würdigt die Erde als Grundlage des Lebens. Die kantigen Blattformen wurden eigens für diese Edition gezeichnet. Das Zeichen ist kein ugandisches Symbol; es sagt nichts darüber aus, wo der Kaffee wächst oder wer ihn anbaut.',
          en: 'The label shows Asase Ye Duru, an Adinkra sign from the Akan culture of Ghana, in a contemporary interpretation. It honours the earth as the basis of life. The angular leaf shapes were drawn specially for this edition. The sign is not a Ugandan symbol, and it says nothing about where the coffee grows or who grows it.',
          fr: 'L’étiquette montre Asase Ye Duru, un signe adinkra de la culture akan du Ghana, dans une interprétation contemporaine. Il rend hommage à la terre, fondement de la vie. Les formes de feuilles anguleuses ont été dessinées spécialement pour cette édition. Ce signe n’est pas un symbole ougandais et ne dit rien sur le lieu où pousse le café ni sur les personnes qui le cultivent.',
        },
        backNote({
          de: 'Sie nennt die Angaben zum Kaffee, erklärt das Zeichen und verweist für die Geschichte und die Ziele der Edition auf diese Seite.',
          en: 'It gives the coffee details, explains the sign and refers to this page for the story and the aims of the edition.',
          fr: 'Il donne les indications sur le café, explique le signe et renvoie à cette page pour l’histoire et les objectifs de l’édition.',
        }),
      ],
      aims: [
        { de: 'Waldschutz und Wiederaufforstung', en: 'Forest conservation and reforestation', fr: 'Protection des forêts et reboisement' },
        { de: 'Initiativen zum Schutz des Lebensraums der Berggorillas', en: 'Initiatives to protect the mountain gorilla’s habitat', fr: 'Initiatives pour protéger l’habitat du gorille des montagnes' },
        { de: 'Verbindung von Ökotourismus und Kaffeeanbau', en: 'Linking eco-tourism and coffee farming', fr: 'Lien entre écotourisme et culture du café' },
        { de: 'Schulungen für nachhaltigen Anbau am Waldrand', en: 'Training in sustainable farming at the forest edge', fr: 'Formations à une agriculture durable en lisière de forêt' },
      ],
    },
    ...labelMedia('kanungu-forest',
      frontAlt('Kanungu Forest',
        { de: 'dunkelgrüner Grund mit dem cremefarbenen Zeichen Asase Ye Duru und kantigen grünen Blattformen.', en: 'dark green ground with the cream-coloured sign Asase Ye Duru and angular green leaf shapes.', fr: 'fond vert foncé avec le signe Asase Ye Duru de couleur crème et des formes de feuilles vertes anguleuses.' },
        { de: 'Abantu Coffee, Kanungu Forest, Bwindi Canopy Coffee, Bwindi Forest Edge, Uganda, dunkle Röstung, Arabica, 250 g', en: 'Abantu Coffee, Kanungu Forest, Bwindi Canopy Coffee, Bwindi Forest Edge, Uganda, dark roast, Arabica, 250 g', fr: 'Abantu Coffee, Kanungu Forest, Bwindi Canopy Coffee, Bwindi Forest Edge, Ouganda, torréfaction foncée, arabica, 250 g' }),
      backAlt('Kanungu Forest', {
        de: 'Bwindi Canopy Coffee, Bwindi Forest Edge, Uganda, dunkle Röstung, Arabica, 250 g; die Geschichte des Zeichens Asase Ye Duru; Projekt und Ziele.',
        en: 'Bwindi Canopy Coffee, Bwindi Forest Edge, Uganda, dark roast, Arabica, 250 g; the story of the sign Asase Ye Duru; project and aims.',
        fr: 'Bwindi Canopy Coffee, Bwindi Forest Edge, Ouganda, torréfaction foncée, arabica, 250 g ; l’histoire du signe Asase Ye Duru ; projet et objectifs.',
      })),
  },
  // 04 – "coming soon" since 09.11.2026 (chair). Roast and coffee type are not confirmed, so they are not shown (the v4 label
  // says only "Kaffee aus Uganda"). The cooperative is a planned partner, not a confirmed supplier.
  {
    slug: 'abantu-coffee-sebei-elgon', category: 'coffee', status: 'coming-soon', edition: 4, editionName: 'Sebei Elgon', tagline: 'Mountain Heritage Coffee',
    name: productName('Sebei Elgon'),
    short: { de: 'Mountain Heritage Coffee · Osthänge des Mount Elgon · 250 g', en: 'Mountain Heritage Coffee · Eastern slopes of Mount Elgon · 250 g', fr: 'Mountain Heritage Coffee · versant est du mont Elgon · 250 g' },
    description: {
      de: 'Kaffee von den Osthängen des Mount Elgon in Uganda, aus unserer Linie „Mountain Heritage“. In der 250-g-Packung. Abantu Coffee ist ein Projekt von Bantu e.V. mit Balambuli Kwigate Coffee (BKC) als Hauptpartner für Kaffee. Die Erlöse sollen die Projekte von Bantu e.V. unterstützen.',
      en: 'Coffee from the eastern slopes of Mount Elgon in Uganda, from our Mountain Heritage line. In a 250 g pack. Abantu Coffee is a project of Bantu e.V., with Balambuli Kwigate Coffee (BKC) as its main coffee partner. Proceeds are meant to support the projects of Bantu e.V.',
      fr: 'Un café du versant est du mont Elgon en Ouganda, de notre gamme Mountain Heritage. En sachet de 250 g. Abantu Coffee est un projet de Bantu e.V., avec Balambuli Kwigate Coffee (BKC) comme principal partenaire café. Les recettes doivent soutenir les projets de Bantu e.V.',
    },
    details: [
      row(lbl.origin, { de: 'Osthänge des Mount Elgon, Uganda', en: 'Eastern slopes of Mount Elgon, Uganda', fr: 'Versant est du mont Elgon, Ouganda' }),
      row(lbl.edition, editionNo(4)),
      row(lbl.weight, same('250 g')),
      row(lbl.coop, same('Sebei Elgon Co-operative Union')),
      row(lbl.partner, same(BKC)),
      row(lbl.project, same('Bantu e.V.')),
    ],
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
      label: [
        {
          de: 'Das Etikett zeigt das Motiv „Elevation“: gestufte Flächen und aufsteigende Linien, eigens für diese Edition gezeichnet. Es steht für Rhythmus und Aufstieg. Es ist weder eine Landkarte noch ein traditionelles Zeichen.',
          en: 'The label shows the motif “Elevation”: stepped planes and rising lines, drawn specially for this edition. It stands for rhythm and ascent. It is neither a map nor a traditional sign.',
          fr: 'L’étiquette montre le motif « Elevation » : des plans en gradins et des lignes ascendantes, dessinés spécialement pour cette édition. Il évoque le rythme et l’ascension. Ce n’est ni une carte ni un signe traditionnel.',
        },
        backNote({
          de: 'Sie nennt die Angaben zum Kaffee, erzählt die Geschichte in Kurzform und nennt die Ziele der Edition: Kulturerbe bewahren, junge Menschen fördern und Wissen im Hochlandanbau weitergeben.',
          en: 'It gives the coffee details, tells the story in brief and names the aims of the edition: preserving cultural heritage, supporting young people and passing on knowledge of highland farming.',
          fr: 'Il donne les indications sur le café, raconte l’histoire en bref et cite les objectifs de l’édition : préserver le patrimoine culturel, soutenir les jeunes et transmettre le savoir de la culture en altitude.',
        }),
      ],
      aims: [
        { de: 'Erhalt des kulturellen Erbes und Dokumentation des Wissens der Ältesten', en: 'Preserving cultural heritage and recording the knowledge of elders', fr: 'Préservation du patrimoine culturel et transmission du savoir des anciens' },
        { de: 'Förderung junger Menschen als Führungspersönlichkeiten', en: 'Leadership training for young people', fr: 'Formation au leadership pour les jeunes' },
        { de: 'Schulungen für den Anbau in großer Höhe', en: 'Training in high-altitude farming', fr: 'Formations à la culture en haute altitude' },
        { de: 'Unterstützung für traditionelle Sportarten und Kulturfeste', en: 'Support for traditional sports and cultural festivals', fr: 'Soutien aux sports traditionnels et aux fêtes culturelles' },
      ],
    },
    ...labelMedia('sebei-elgon',
      frontAlt('Sebei Elgon',
        { de: 'gelber Beutel mit dem Motiv „Elevation“: drei dunkle, gestufte Flächen, eine helle Diagonale und feine türkisfarbene Linien.', en: 'yellow ground with the motif “Elevation”: three dark stepped planes, a light diagonal and fine teal lines.', fr: 'fond jaune avec le motif « Elevation » : trois plans sombres en gradins, une diagonale claire et de fines lignes turquoise.' },
        { de: 'Abantu Coffee, Sebei Elgon, Uganda Collection, 250 g', en: 'Abantu Coffee, Sebei Elgon, Uganda Collection, 250 g', fr: 'Abantu Coffee, Sebei Elgon, Uganda Collection, 250 g' }),
      backAlt('Sebei Elgon', {
        de: 'Mountain Heritage Coffee, östliche Hänge des Mount Elgon, Uganda, 250 g; die Geschichte der Edition; Ziele: Kulturerbe bewahren, junge Menschen fördern und Wissen im Hochlandanbau weitergeben.',
        en: 'Mountain Heritage Coffee, eastern slopes of Mount Elgon, Uganda, 250 g; the story of the edition; aims: preserving cultural heritage, supporting young people and passing on knowledge of highland farming.',
        fr: 'Mountain Heritage Coffee, versant est du mont Elgon, Ouganda, 250 g ; l’histoire de l’édition ; objectifs : préserver le patrimoine culturel, soutenir les jeunes et transmettre le savoir de la culture en altitude.',
      })),
  },
  planned({
    no: 5, slug: 'bukonzo', name: 'Bukonzo', tagline: 'Mountains of the Moon',
    place: { de: 'Rwenzori-Gebirge', en: 'Rwenzori Mountains', fr: 'monts Rwenzori' },
    origin: { de: 'Rwenzori-Gebirge, Uganda', en: 'Rwenzori Mountains, Uganda', fr: 'Monts Rwenzori, Ouganda' },
    from: { de: 'dem Rwenzori-Gebirge, Uganda', en: 'the Rwenzori Mountains, Uganda', fr: 'monts Rwenzori, Ouganda' },
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
  // 09 – label SAMPLE since 10.11.2026 (chair): concept artwork, coffee details not confirmed. No origin, roast, coffee type,
  // supplier, price or stock here until the chair supplies them (v4 label: "Kollektionsentwurf, geplante Uganda-Edition,
  // Packungsformat 250 g"; the river motif is "keine Karte eines bestimmten Anbaugebiets"). Left out on purpose from the 2025
  // brochure text: the Nile source region as origin, "pure spring water", the Nile Highland Coffee Farmers Association and
  // the Luganda saying. The aims are the brochure's aims, shown as provisional. When the details are confirmed: add them,
  // remove `sample` and `priceNote`, and the edition is treated like the other "coming soon" editions.
  {
    slug: 'abantu-coffee-nile-highland', category: 'coffee', status: 'coming-soon', sample: true, edition: 9, editionName: 'Nile Highland', tagline: 'Uganda Collection',
    name: productName('Nile Highland'),
    short: { de: 'Muster · geplante Edition der Uganda Collection · Packungsformat 250 g', en: 'Sample · planned edition of the Uganda Collection · 250 g pack format', fr: 'Échantillon · édition prévue de la Uganda Collection · format 250 g' },
    description: {
      de: 'Nile Highland ist eine geplante Edition der Uganda Collection von ABANTU COFFEE. Zu sehen ist das Verpackungsmuster. Herkunft, Röstung, Kaffeesorte, Lieferpartner, Preis und Verfügbarkeit stehen noch nicht fest; wir ergänzen sie hier, sobald sie bestätigt sind. Abantu Coffee ist ein Projekt von Bantu e.V. mit Balambuli Kwigate Coffee (BKC) als Hauptpartner für Kaffee.',
      en: 'Nile Highland is a planned edition of the ABANTU COFFEE Uganda Collection. What you see here is the packaging sample. Origin, roast, coffee type, supply partner, price and availability are not yet fixed; we will add them here as soon as they are confirmed. Abantu Coffee is a project of Bantu e.V., with Balambuli Kwigate Coffee (BKC) as its main coffee partner.',
      fr: 'Nile Highland est une édition prévue de la Uganda Collection d’ABANTU COFFEE. Vous voyez ici l’échantillon d’emballage. L’origine, la torréfaction, le type de café, le partenaire d’approvisionnement, le prix et la disponibilité ne sont pas encore fixés ; nous les ajouterons ici dès qu’ils seront confirmés. Abantu Coffee est un projet de Bantu e.V., avec Balambuli Kwigate Coffee (BKC) comme principal partenaire café.',
    },
    priceNote: { de: 'Kaffeeangaben folgen', en: 'Coffee details to follow', fr: 'Indications à venir' },
    details: [
      row(lbl.edition, editionNo(9)),
      row(lbl.plannedWeight, same('250 g')),
      row(lbl.partner, same(BKC)),
      row(lbl.project, same('Bantu e.V.')),
      row(lbl.status, { de: 'Muster: Angaben zum Kaffee noch nicht bestätigt', en: 'Sample: coffee details not yet confirmed', fr: 'Échantillon : indications sur le café pas encore confirmées' }),
    ],
    story: {
      paragraphs: [
        {
          de: 'Der Name Nile Highland erinnert an den Nil, der bei Jinja den Viktoriasee verlässt und seine lange Reise bis zum Mittelmeer beginnt. Die Edition greift das Bild des Flusses auf: Bewegung, Handel und Begegnung.',
          en: 'The name Nile Highland recalls the Nile, which leaves Lake Victoria near Jinja and begins its long journey to the Mediterranean. The edition takes up the image of the river: movement, trade and encounter.',
          fr: 'Le nom Nile Highland évoque le Nil, qui quitte le lac Victoria près de Jinja et commence son long voyage jusqu’à la Méditerranée. L’édition reprend l’image du fleuve : mouvement, échanges et rencontres.',
        },
        {
          de: 'Nile Highland ist noch ein Entwurf. Aus welcher Region der Kaffee kommen wird, mit wem wir dort zusammenarbeiten und wie er geröstet wird, steht noch nicht fest. Diese Angaben ergänzen wir hier, sobald sie bestätigt sind.',
          en: 'Nile Highland is still a concept. Which region the coffee will come from, who we will work with there and how it will be roasted has not yet been decided. We will add these details here as soon as they are confirmed.',
          fr: 'Nile Highland est encore un projet. La région d’où viendra le café, les partenaires sur place et la torréfaction ne sont pas encore décidés. Nous ajouterons ces informations ici dès qu’elles seront confirmées.',
        },
      ],
      label: [
        {
          de: 'Fließende Bänder ziehen sich über das Etikett. Das eigens entwickelte Flussmotiv „River Route“ steht für Bewegung und Verbindung. Es ist eine grafische Komposition und keine Karte eines bestimmten Anbaugebiets.',
          en: 'Flowing ribbons run across the label. The specially developed river motif “River Route” stands for movement and connection. It is a graphic composition, not a map of a particular growing area.',
          fr: 'Des rubans fluides traversent l’étiquette. Le motif fluvial « River Route », conçu pour cette édition, évoque le mouvement et le lien. C’est une composition graphique et non la carte d’une zone de culture précise.',
        },
        backNote({
          de: 'Sie nennt Nile Highland als Kollektionsentwurf und geplante Uganda-Edition im Packungsformat 250 g, erklärt das Flussmotiv und verweist für die Projektziele auf diese Seite.',
          en: 'It describes Nile Highland as a collection concept and planned Uganda edition in a 250 g pack format, explains the river motif and refers to this page for the project aims.',
          fr: 'Il présente Nile Highland comme un projet de collection et une édition ougandaise prévue au format 250 g, explique le motif fluvial et renvoie à cette page pour les objectifs du projet.',
        }),
      ],
      aims: [
        { de: 'Schutz der Quellen und Wasservorkommen im Hochland', en: 'Protecting highland springs and water sources', fr: 'Protection des sources et des réserves d’eau des hautes terres' },
        { de: 'Erhalt des kulturellen Erbes und Aufbau von Tourismus', en: 'Preserving cultural heritage and developing tourism', fr: 'Préservation du patrimoine culturel et développement du tourisme' },
        { de: 'Bildung zur Geschichte der alten Handelswege', en: 'Education on the history of ancient trade routes', fr: 'Éducation à l’histoire des anciennes routes commerciales' },
        { de: 'Verbindung von Ökotourismus und Kaffee', en: 'Linking eco-tourism and coffee', fr: 'Lien entre écotourisme et café' },
      ],
    },
    ...labelMedia('nile-highland',
      frontAlt('Nile Highland',
        { de: 'türkisfarbener Beutel mit dem Flussmotiv „River Route“: geschwungene Bänder in Creme und Blau, daneben orangefarbene Striche.', en: 'turquoise bag with the river motif “River Route”: curved ribbons in cream and blue, with orange bars beside them.', fr: 'sachet turquoise avec le motif fluvial « River Route » : des rubans ondulés crème et bleu, à côté de traits orange.' },
        { de: 'Abantu Coffee, Nile Highland, Uganda Collection, 250 g', en: 'Abantu Coffee, Nile Highland, Uganda Collection, 250 g', fr: 'Abantu Coffee, Nile Highland, Uganda Collection, 250 g' }),
      backAlt('Nile Highland', {
        de: 'Kollektionsentwurf, geplante Uganda-Edition, Packungsformat 250 g; die Geschichte des Flussmotivs; der Hinweis, dass die Projektziele auf der Seite der Edition stehen.',
        en: 'collection concept, planned Uganda edition, pack format 250 g; the story of the river motif; a note that the project aims are given on the edition’s page.',
        fr: 'projet de collection, édition ougandaise prévue, format 250 g ; l’histoire du motif fluvial ; une note indiquant que les objectifs du projet figurent sur la page de l’édition.',
      })),
  },
  planned({
    no: 10, slug: 'kwihangana', name: 'Kwihangana', tagline: 'Patience & Mindful Cultivation',
    place: { de: 'Region Viktoriasee', en: 'Lake Victoria Region', fr: 'région du lac Victoria' },
    origin: { de: 'Region Viktoriasee, Uganda', en: 'Lake Victoria Region, Uganda', fr: 'Région du lac Victoria, Ouganda' },
    from: { de: 'der Region Viktoriasee, Uganda', en: 'the Lake Victoria Region, Uganda', fr: 'région du lac Victoria, Ouganda' },
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
