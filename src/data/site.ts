// Central facts about Bantu e.V. – every page reads from here.
// Sources: Vereinsregister extract VR 37606 B (22.05.2026), Freistellungsbescheid 16.10.2023,
// Transparenzbericht 2025, project files. Never change legal data without a document.

export const org = {
  shortName: 'Bantu e.V.',
  legalName: 'Bantu-Vereinigung für globale Bildung, Gerechtigkeit und Zusammenarbeit e.V.',
  legalNameEn: 'Bantu Association for Global Education, Justice and Cooperation e.V.',
  founded: 2019,
  // Motto (decided by the chair, 07.11.2026). The English wording is the original.
  motto: { de: 'Gemeinsam bauen wir nachhaltige und selbstbestimmte Gemeinschaften', en: 'Together, We Build Sustainable and Empowered Communities', fr: 'Ensemble, nous bâtissons des communautés durables et autonomes' },
  // Ubuntu saying: the philosophy behind our work (used where Ubuntu is explained, not as the motto).
  claim: { de: 'Ich bin, weil wir sind.', en: 'I am because we are.', fr: 'Je suis parce que nous sommes.' },
  tagline: { de: 'Gemeinsam bauen wir nachhaltige und selbstbestimmte Gemeinschaften', en: 'Together, We Build Sustainable and Empowered Communities', fr: 'Ensemble, nous bâtissons des communautés durables et autonomes' },
  address: { street: 'Kameruner Str. 1', zip: '13351', city: 'Berlin', district: 'Wedding (Mitte)', country: 'Deutschland' },
  postbox: { line: 'Postfach 120344', zip: '10593', city: 'Berlin' },
  email: 'info@bantu-ev.org',
  // Office line (landline) and mobile. The mobile is answered only from 16:00 to 20:00 (instruction of the chair, 07.11.2026).
  officePhone: '+49 (0)30 26934764',
  officePhoneHref: '+493026934764',
  phone: '+49 176 34213765',
  phoneHref: '+4917634213765',
  mobileHours: '16:00–20:00',
  messengers: ['Signal', 'Threema', 'Telegram', 'WhatsApp'],
  web: 'https://www.bantu-ev.org',
  register: { court: 'Amtsgericht Charlottenburg', number: 'VR 37606 B' },
  tax: {
    office: 'Finanzamt für Körperschaften I, Berlin',
    number: '27/661/53393',
    exemptionNotice: '16.10.2023', // Freistellungsbescheid for 2020–2022
    purposes: {
      de: ['Förderung des öffentlichen Gesundheitswesens', 'Förderung der Erziehung, Volks- und Berufsbildung', 'Hilfe für Geflüchtete und Verfolgte', 'Förderung der Entwicklungszusammenarbeit'],
      en: ['Public health', 'Education and vocational training', 'Support for refugees and persecuted persons', 'Development cooperation'], fr: ['Santé publique', 'Éducation et formation professionnelle', 'Aide aux personnes réfugiées et persécutées', 'Coopération au développement'],
    },
  },
  // Board shown publicly. Decision 07.11.2026: show the chair only until the new board is registered.
  // OPEN: add the new board (names + roles) once elected and registered at the Amtsgericht.
  board: [
    { name: 'Boaz Murinzi Murema', role: { de: 'Vorsitzender des Vorstands (vertretungsberechtigt) · Geschäftsführung', en: 'Chair of the board (authorised representative) · Executive Director', fr: 'Président du conseil d’administration (représentant légal) · Direction' } },
  ],
  bank: {
    holder: 'Bantu e.V.',
    bank: 'GLS Gemeinschaftsbank eG',
    iban: 'DE47 4306 0967 1035 6810 00',
    bic: 'GENODEM1GLS',
  },
  // Online donation form (twingle), taken over from the old WordPress donate page (checked 07.11.2026).
  // The page link opens twingle's hosted form; the widget is only loaded after a click (two-click privacy).
  donation: {
    provider: 'twingle',
    pageUrl: 'https://spenden.twingle.de/genericorganisation/genericproject/tw612f63939f052/page',
    widgetUrl: 'https://spenden.twingle.de/embed/genericorganisation/genericproject/tw612f63939f052/widget',
  },
  // OPEN: the old site linked paypal.me/bantucomputerprojekt – confirm the account belongs to Bantu e.V. before setting it here.
  paypalUrl: '' as string,
  socials: [
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/bantu_ev/' },
    { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/BantueV' },
    { name: 'X (Twitter)', icon: 'x', url: 'https://twitter.com/Bantu_eV' },
  ],
  memberships: {
    de: ['Initiative Transparente Zivilgesellschaft (seit 2026)'],
    en: ['Transparent Civil Society Initiative (since 2026)'], fr: ['Initiative pour une société civile transparente (depuis 2026)'],
  },
};

// Feature switches – flip when ready (see docs/03_Rechtliches_und_Shop-Checkliste.md)
export const features = {
  // Online checkout for coffee/merch/crafts. Keep false until tax, packaging (LUCID) and payment set-up are done.
  shopCheckoutOpen: false,
  // Optional form service endpoint (e.g. an EU-hosted form backend). Empty = forms open the visitor's e-mail app.
  formEndpoint: '' as string,
};
