// Background photos of the homepage hero (rotating slideshow).
// Source: youth exchange "Okushoma kwa Boona – Bildung für alle" (Teams up!, WLV 3100212054),
// Mbarara (Uganda), 23.02.–11.03.2024. Photo rights: participation contract § 6 (EP Contract 04.02.2024).
// Only use photos where no child is identifiable (CLAUDE.md rule 4). Files: public/images/hero/<file>.webp + <file>-800.webp
import type { Lang } from '../i18n';

export type HeroSlide = { file: string; caption: Record<Lang, string>; project?: string };

export const heroSlides: HeroSlide[] = [
  { file: 'okb-erste-hilfe', project: 'okushoma-kwa-boona', caption: {
    de: 'Erste-Hilfe-Training beim Jugendaustausch „Okushoma kwa Boona: Bildung für alle“, Mbarara (Uganda), 2024',
    en: 'First-aid training during the youth exchange “Okushoma kwa Boona: Education for all”, Mbarara (Uganda), 2024', fr: 'Formation aux premiers secours pendant l’échange de jeunes « Okushoma kwa Boona : L’éducation pour tous », Mbarara (Ouganda), 2024' } },
  { file: 'okb-workshop-saal', project: 'okushoma-kwa-boona', caption: {
    de: 'Gesprächsrunde zu Bildungsgerechtigkeit mit Teilnehmenden aus Uganda und Deutschland, Mbarara 2024',
    en: 'Discussion round on educational justice with participants from Uganda and Germany, Mbarara 2024', fr: 'Table ronde sur la justice éducative avec des participants d’Ouganda et d’Allemagne, Mbarara 2024' } },
  { file: 'okb-gruppe-inklusion', project: 'okushoma-kwa-boona', caption: {
    de: 'Junge Menschen mit und ohne Behinderung beim Austausch in Mbarara, 2024',
    en: 'Young people with and without disabilities at the exchange in Mbarara, 2024', fr: 'Jeunes avec et sans handicap pendant l’échange à Mbarara, 2024' } },
  { file: 'okb-braille-lesen', project: 'okushoma-kwa-boona', caption: {
    de: 'Lesen in Brailleschrift: Barrieren für blinde Lernende abbauen, ein Thema des Austauschs 2024',
    en: 'Reading braille: removing barriers for blind learners, a topic of the 2024 exchange', fr: 'Lire le braille : lever les obstacles pour les apprenants aveugles, un thème de l’échange 2024' } },
  { file: 'okb-gruppenarbeit', project: 'okushoma-kwa-boona', caption: {
    de: 'Gruppenarbeit im Freien: Erfahrungen austauschen und Ergebnisse festhalten, Mbarara 2024',
    en: 'Group work outdoors: sharing experiences and recording results, Mbarara 2024', fr: 'Travail de groupe en plein air : partager ses expériences et noter les résultats, Mbarara 2024' } },
  { file: 'okb-workshop', project: 'okushoma-kwa-boona', caption: {
    de: 'Workshop zu inklusiver Bildung mit Teilnehmenden aus Uganda und Deutschland, 2024',
    en: 'Workshop on inclusive education with participants from Uganda and Germany, 2024', fr: 'Atelier sur l’éducation inclusive avec des participants d’Ouganda et d’Allemagne, 2024' } },
  { file: 'okb-erste-hilfe-uebung', project: 'okushoma-kwa-boona', caption: {
    de: 'Praktische Übung im Freien beim Erste-Hilfe-Training, Mbarara 2024',
    en: 'Practical exercise outdoors during the first-aid training, Mbarara 2024', fr: 'Exercice pratique en plein air pendant la formation aux premiers secours, Mbarara 2024' } },
  { file: 'okb-braille', project: 'okushoma-kwa-boona', caption: {
    de: 'Lesen mit der Braillezeile: Bildung für blinde Menschen war ein Schwerpunkt des Austauschs',
    en: 'Reading with a braille display: education for blind people was a focus of the exchange', fr: 'Lecture avec un afficheur braille : l’éducation des personnes aveugles était au cœur de l’échange' } },
  { file: 'okb-besuch', project: 'okushoma-kwa-boona', caption: {
    de: 'Unterwegs beim Austausch: Begegnungen und Gespräche vor Ort, Mbarara 2024',
    en: 'On the move during the exchange: encounters and conversations on site, Mbarara 2024', fr: 'En route pendant l’échange : rencontres et discussions sur place, Mbarara 2024' } },
  { file: 'okb-praesentation', project: 'okushoma-kwa-boona', caption: {
    de: 'Präsentation im Seminarraum: Teilnehmende verfolgen einen fachlichen Input, 2024',
    en: 'Presentation in the seminar room: participants follow an expert input, 2024', fr: 'Présentation en salle de séminaire : les participants suivent l’exposé d’un expert, 2024' } },
  { file: 'okb-gruppe-veranda', project: 'okushoma-kwa-boona', caption: {
    de: 'Teilnehmende und Partner des Austauschs „Okushoma kwa Boona“, Mbarara 2024',
    en: 'Participants and partners of the “Okushoma kwa Boona” exchange, Mbarara 2024', fr: 'Participants et partenaires de l’échange « Okushoma kwa Boona », Mbarara 2024' } },
];
