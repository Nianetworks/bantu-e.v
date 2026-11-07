# Relaunch-Plan www.bantu-ev.org

Stand: 07.11.2026 · Verantwortlich: Boaz Murinzi Murema (Vorstand) · Umsetzung: Claude / Claude Code

## 1. Ausgangslage (Review der alten Website)

| Befund | Bewertung |
|---|---|
| WordPress + Elementor 4.3.6; letzte Änderung 29.10.2023, meiste Seiten 2022 | veraltet, Wartungsrisiko |
| Kein Impressum, keine Datenschutzerklärung | rechtliches Risiko (§ 5 DDG, Art. 13 DSGVO) |
| Google Fonts und Google-Maps-Einbettung ohne Einwilligung | DSGVO-Risiko |
| Nur ein Projekt (Community Resource Centre); `/programs/` defekt | Arbeit des Vereins unsichtbar |
| Partner nur „Ability Beyond the Iris“ (heute Anchored Bridges Initiatives) | veraltet |
| Vorstandsliste und alte Telefonnummern (+49 173 …, 030 …) | veraltet |
| Footer-Social-Links zeigen auf „#“, Navigation mischt DE/EN, Tippfehler im Slug („verte“) | unprofessionell |
| Keine News, keine Termine, keine Berichte, keine Downloads, kein Shop | Kernwünsche fehlen |

## 2. Ziele
1. Professioneller, zweisprachiger Auftritt (DE/EN), der Förderern, Partnern, Schulen und der Community zeigt, was Bantu e.V. tut.
2. Programme **Internationale Zusammenarbeit** und **Inlandsarbeit** mit allen Projekten.
3. Startseite mit **Ankündigungen, Veranstaltungen und Neuigkeiten** (inkl. Hinweisleiste oben).
4. Seite **Menschen** (nicht nur Vorstand): Vorstand, Team, Ehrenamt, Partner, Förderer.
5. Kleiner **Shop** für Einnahmen: Spendengeschenke, Abantu Coffee, Merchandise, Handwerk von Partner*innen.
6. **Wirkung/Erfolgsgeschichten**, **Jahres- & Transparenzberichte** (ITZ-10-Punkte), **Downloads**.
7. Rechtssicher, ohne Tracking, schnell, ohne WordPress-Wartung.
8. Förderauflagen erfüllen (Projektseiten mit Förderhinweisen, Pflicht-Logos).
9. **Barrierefreiheit** (Wunsch 07.11.2026), besonders für blinde und sehbehinderte Menschen: Ziel WCAG 2.2 AA; Einstellungsleiste auf jeder Seite (Textgröße bis 150 %, dunkle Ansicht, hoher Kontrast, gut lesbare Schrift Atkinson Hyperlegible, mehr Abstand, Links hervorheben, Bewegung stoppen, Seite vorlesen), Sprunglinks, tastaturbedienbare Menüs, Seiten „Barrierefreiheit“ und „Einfache Sprache“. Geprüft mit axe-core (0 Verstöße in allen drei Farbmodi) und Reflow-Tests.

## 3. Entscheidungen (07.11.2026)
- Statische Website in einem **GitHub-Repository**, Hosting **GitHub Pages**, Migration weg von WordPress.
- Vorstand: zunächst **nur der Vorsitzende**; neue Vorstandsmitglieder nach Wahl/Eintragung.
- Shop-Sortiment: Spendengeschenke (sofort), Abantu Coffee, Merchandise, Handwerk (nach Prüfung).
- Fotos: Bilder der alten Website übernehmen (Export-Skript), Fotoordner im Bantu-Archiv, Fotoanfrage an Partner, bis dahin Platzhalter.
- Domain/DNS: Boaz hat den Zugang zum Registrar.

## 4. Sitemap

| DE | EN | Inhalt |
|---|---|---|
| `/` | `/en/` | Hero, Wirkung in Zahlen, Aktuell & demnächst, Programme, laufende Projekte, Erfolgsgeschichte, Unterstützen, Partner |
| `/ueber-uns/` | `/en/about/` | Name, Geschichte, Vision/Mission/Werte, Arbeitsweise (Soziokratie), gemeinnützige Zwecke, Meilensteine |
| `/menschen/` | `/en/people/` | Vorstand, Team/Honorarkräfte/Ehrenamt (nur mit Einwilligung), Partner Süd/Nord, Förderer |
| `/programme/` | `/en/programmes/` | Übersicht beider Programme |
| `/programme/internationale-zusammenarbeit/` | `/en/programmes/international-cooperation/` | Arbeitsprinzipien, laufende und abgeschlossene Projekte |
| `/programme/inlandsarbeit/` | `/en/programmes/work-in-germany/` | dto. |
| `/projekte/` + `/projekte/<slug>/` | `/en/projects/…` | alle 14 Projekte mit Steckbrief, Zahlen, Förderhinweis |
| `/aktuelles/` + `/aktuelles/<slug>/` | `/en/news/…` | Neuigkeiten, Ankündigungen, RSS |
| `/veranstaltungen/` | `/en/events/` | kommende und vergangene Termine |
| `/wirkung/` | `/en/impact/` | Wirkung in Zahlen, Erfolgsgeschichten |
| `/berichte/` | `/en/reports/` | Transparenzberichte 2020–2025 (DE/EN), ITZ-10-Punkte |
| `/downloads/` | `/en/downloads/` | Berichte, Mitgliedsanträge, Flyer, Logos |
| `/shop/` + `/shop/<slug>/` | `/en/shop/…` | 4 Kategorien, 8 Produkte |
| `/spenden/` | `/en/donate/` | Bankverbindung mit Kopierfunktion, Spendenzweck-Auswahl, Zuwendungsbestätigung |
| `/mitmachen/` | `/en/get-involved/` | Mitgliedschaft, Ehrenamt, Kooperationen |
| `/kontakt/` | `/en/contact/` | Adressen, Kontaktformular (öffnet E-Mail-Programm), OSM-Link |
| `/barrierefreiheit/` | `/en/accessibility/` | Bedienhilfen, Erklärung zur Barrierefreiheit, Feedback |
| `/einfache-sprache/` | `/en/easy-read/` | Der Verein in Einfacher Sprache |
| `/impressum/`, `/datenschutz/` | `/en/imprint/`, `/en/privacy/` | Pflichtangaben |

Alte WordPress-URLs leiten automatisch weiter (`src/data/redirects.mjs`).

## 5. Projekte auf der Website

| Programm | Projekt | Code | Status |
|---|---|---|---|
| International | Pearl Kindertagesstätte Kampala | P 26/230 | laufend |
| International | Wasser für Ruziba (Burundi) | P 26/186 | laufend |
| International | Msingi School BTVET | P 24/200 | abgeschlossen |
| International | Okushoma kwa Boona (Teams up!) | WLV 3100212054 | abgeschlossen |
| International | OURS – Zerebralparese | P 23/91 | abgeschlossen |
| International | Ruhaama Community Resource Centre | P 21/23, P 22/29 | abgeschlossen |
| Inland | Erde, Saat und Erbe (BIKO) | P 26/224 | laufend – **Pflichtseite bis 13.11.2026** |
| Inland | Bildung für alle …?! (SDG) | P 26/214 | laufend |
| Inland | Ubuntu Talks | MI2026-24B | laufend (15.11.2026) |
| Inland | Black Engagement Matters | – | abgeschlossen |
| Inland | Ubuntu für alle & Equal Rights for All | – | abgeschlossen |
| Inland | Safer Spaces & ParentCircle (Tubman.Network) | – | abgeschlossen |
| Inland | FashionEmpowerment | – | abgeschlossen |
| Inland | Youth Eco Project (Erasmus+) | – | abgeschlossen |

Nicht aufgenommen (bewusst): MITTEinander aktiv 2026 (MI2026-6ABA – Inhalt noch zu klären), Tag des offenen Denkmals Sandau 2026, Abantu Coffee/Bantu Tech/KITA Baobab als eigene Projekte (Coffee erscheint im Shop).

## 6. Phasen

| Phase | Was | Wann | Status |
|---|---|---|---|
| 0 | Review, Inhalte aus Archiv, Struktur | 07.11.2026 | erledigt |
| 1 | Website gebaut, Redesign mit Barrierefreiheit (99 Seiten), Repository angelegt | 07.11.2026 | erledigt |
| 2 | Vorschau auf GitHub Pages prüfen; OPEN-Punkte klären (`npm run check:open`) | bis 11.11.2026 | offen |
| 3 | **Go-live** mit DNS-Umstellung (docs/02) – spätestens für P 26/224 am 13.11.2026 | 12.–13.11.2026 | offen |
| 4 | WordPress-Export (`npm run migrate:wp`), Fotos einpflegen, alte Hosting-Leistung erst danach kündigen | November 2026 | offen |
| 5 | Fotos von Partnern (docs/04), Ubuntu-Talks-Rückblick, neue Vorstandsmitglieder | Nov./Dez. 2026 | offen |
| 6 | Shop öffnen nach Rechts-/Steuercheck (docs/03) | Q1 2027 | offen |
| 7 | Laufende Pflege: neue Projekte, Berichte 2026, EÜR 2025 | laufend | – |

## 7. Pflege und Rollen
- Inhalte pflegen: `docs/05_Inhalte-pflegen.md` (im GitHub-Browser-Editor oder per Claude Code).
- Jede neue Bewilligung → Projektseite (DE+EN) mit Förderhinweis aus dem Bescheid.
- Jede Veranstaltung → News-Eintrag `type: event`, ggf. `pinUntil` für die Hinweisleiste.
- Jährlich bis 31.07.: Transparenzbericht als PDF in `public/downloads/berichte/` + Eintrag in `src/data/downloads.ts`.
