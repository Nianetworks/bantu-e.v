// Background photos of the homepage hero (rotating slideshow).
// Source: youth exchange "Okushoma kwa Boona – Bildung für alle" (Teams up!, WLV 3100212054),
// Mbarara (Uganda), 23.02.–11.03.2024. Photo rights: participation contract § 6 (EP Contract 04.02.2024).
// Only use photos where no child is identifiable (CLAUDE.md rule 4). Files: public/images/hero/<file>.webp + <file>-800.webp
import type { Lang } from '../i18n';

export type HeroSlide = { file: string; caption: Record<Lang, string>; project?: string };

export const heroSlides: HeroSlide[] = [
  {
    file: 'okb-erste-hilfe',
    project: 'okushoma-kwa-boona',
    caption: {
      de: 'Erste-Hilfe-Training beim Jugendaustausch „Okushoma kwa Boona – Bildung für alle“, Mbarara (Uganda), 2024',
      en: 'First-aid training during the youth exchange “Okushoma kwa Boona – Education for all”, Mbarara (Uganda), 2024',
    },
  },
  {
    file: 'okb-gruppe-inklusion',
    project: 'okushoma-kwa-boona',
    caption: {
      de: 'Junge Menschen mit und ohne Behinderung beim Austausch in Mbarara, 2024',
      en: 'Young people with and without disabilities at the exchange in Mbarara, 2024',
    },
  },
  {
    file: 'okb-workshop',
    project: 'okushoma-kwa-boona',
    caption: {
      de: 'Workshop zu inklusiver Bildung mit Teilnehmenden aus Uganda und Deutschland, 2024',
      en: 'Workshop on inclusive education with participants from Uganda and Germany, 2024',
    },
  },
  {
    file: 'okb-braille',
    project: 'okushoma-kwa-boona',
    caption: {
      de: 'Lesen mit der Braillezeile: Bildung für blinde Menschen war ein Schwerpunkt des Austauschs',
      en: 'Reading with a braille display: education for blind people was a focus of the exchange',
    },
  },
  {
    file: 'okb-gruppe-veranda',
    project: 'okushoma-kwa-boona',
    caption: {
      de: 'Teilnehmende und Partner des Austauschs „Okushoma kwa Boona“, Mbarara 2024',
      en: 'Participants and partners of the “Okushoma kwa Boona” exchange, Mbarara 2024',
    },
  },
];
