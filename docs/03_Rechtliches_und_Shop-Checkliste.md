# Rechtliches und Shop – Checkliste

Hinweis: Dies ist eine Arbeitsliste, keine Rechts- oder Steuerberatung. Punkte mit ⚖️ bitte mit der Steuerberatung (VIA, Jörg Volbeding) bzw. einer Rechtsberatung klären. Stand der Rechtslage: Mitte 2026.

## 1. Website allgemein (vor Go-live)
- [x] Impressum nach § 5 DDG und Verantwortliche*r nach § 18 Abs. 2 MStV (`/impressum/`)
- [x] Datenschutzerklärung (`/datenschutz/`) – Hosting GitHub Pages, keine Cookies, kein Tracking
- [x] Schriften lokal eingebunden (keine Google-Fonts-Abrufe), keine Karten-/Video-Einbettungen
- [ ] ⚖️ Datenschutzerklärung einmal fachlich prüfen lassen (v. a. GitHub als Hoster/US-Transfer)
- [ ] Impressum aktualisieren, sobald der neue Vorstand eingetragen ist (`src/data/site.ts`)
- [ ] Ehemalige Verlinkung zur EU-OS-Plattform ist nicht mehr nötig (Plattform 2025 eingestellt) ⚖️ bestätigen

## 2. Förderauflagen auf der Website
- [ ] **P 26/224 (BIKO):** Projektseite bis **13.11.2026** online (Fördervertrag Ziffer 9, sonst 15 % Rückforderung); Förderhinweis ✔, Disclaimer ✔, **Berlin-Logo fehlt**, beteiligte Schulen fehlen.
- [x] **P 26/214 (SDG):** „Gefördert durch ENGAGEMENT GLOBAL mit Mitteln des BMZ“ + BMZ-Logo (Pflicht) + EG-Logo (optional) + Haftungshinweis. ⚖️ Prüfen, ob das BMZ-Logo aus dem Teams-up!-Logoabruf 2024 der aktuellen Vorgabe des SDG-Fonds entspricht.
- [ ] **MI2026-24B Ubuntu Talks:** Förderhinweis ✔; Logos „MITTEinander aktiv“ und Bezirksamt Berlin-Mitte fehlen (§ 11 Fördervereinbarung).
- [ ] **P 26/230, P 26/186 (EZ-KPF):** genaue Förderformulierung/Logos aus Fördervertrag bzw. Förderrichtlinien 2025 übernehmen.

## 3. Fotos und Personen
- [ ] Einwilligungen (DSGVO/KUG) für jede erkennbare Person; bei Kindern Einwilligung der Erziehungsberechtigten. Vorlage im Anmeldeformular P 26/214 (optionales Foto-Häkchen) wiederverwenden.
- [ ] Pearl Kita: keine erkennbaren Kindergesichter ohne schriftliche Einwilligung der Eltern; Kinderschutzrichtlinie von ABI beachten.
- [ ] Teammitglieder nur mit schriftlicher Zustimmung zeigen (`consent: true` in `src/data/people.ts`).

## 4. Spenden
- [x] Bankverbindung GLS, Verwendungszwecke je Projekt
- [ ] ⚖️ Zuwendungsbestätigungen: Freistellungsbescheid vom 16.10.2023 (für 2020–2022) – prüfen, ob ein neuer Bescheid für 2023–2025 vorliegt bzw. bis wann der aktuelle trägt.
- [ ] PayPal: Konto `paypal.me/bantucomputerprojekt` (alte Website) prüfen – nur wenn es Bantu e.V. gehört, in `site.ts → paypalUrl` eintragen.

## 5. Shop – bevor `shopCheckoutOpen = true` gesetzt wird
**Steuern** ⚖️
- [ ] Verkauf von Kaffee/Merchandise/Handwerk ist in der Regel ein **steuerpflichtiger wirtschaftlicher Geschäftsbetrieb**: eigene Buchungssphäre; Körperschaft-/Gewerbesteuer erst oberhalb der Besteuerungsgrenze von 45.000 € Einnahmen inkl. USt pro Jahr (§ 64 Abs. 3 AO).
- [ ] Umsatzsteuer: Kleinunternehmerregelung (§ 19 UStG, seit 2025: Vorjahresumsatz ≤ 25.000 €, laufendes Jahr ≤ 100.000 €) prüfen – davon hängt die Preisangabe („inkl. MwSt.“ bzw. „gem. § 19 UStG keine USt“) ab.
- [ ] Spendengeschenke bleiben Spenden (keine Gegenleistung) – nicht mit Warenverkauf vermischen.

**Pflichten für den Online-Verkauf**
- [ ] AGB, Widerrufsbelehrung + Muster-Widerrufsformular, Versand- und Zahlungsbedingungen als eigene Seiten
- [ ] Preisangaben nach PAngV (Endpreis, Versandkosten): `price` je Produkt und `shipping.flat` in `src/data/shop.ts`. Der Bestellbutton für Waren heißt bereits „Zahlungspflichtig bestellen“ (Bestellformular).
- [ ] AGB, Widerrufsbelehrung und Versandbedingungen im Bestellformular verlinken (OPEN-Hinweis in `src/components/OrderForm.astro`).
- [ ] **Verpackungsgesetz:** Registrierung im Verpackungsregister LUCID und Lizenzierung bei einem dualen System, bevor die erste Sendung rausgeht (gilt auch für Versandkartons)
- [x] Datenschutzerklärung: Abschnitt 7 „Bestellformular im Shop“ (08.11.2026) – ⚖️ zusammen mit der übrigen Erklärung prüfen lassen. Kein Zahlungsanbieter beteiligt (Überweisung).

**Abantu Coffee** ⚖️
- [ ] Lebensmittelkennzeichnung (LMIV): Bezeichnung, Nettofüllmenge, Mindesthaltbarkeitsdatum, Los-Nummer, Name/Anschrift des Verantwortlichen
- [ ] Ggf. Registrierung als Lebensmittelunternehmen bei der Lebensmittelaufsicht (Bezirksamt), wenn Bantu selbst abfüllt/lagert
- [ ] **Kaffeesteuer:** Bei eigener Einfuhr aus Uganda fällt Kaffeesteuer an (Zoll). Einfacher: fertig gerösteten, versteuerten Kaffee von einer deutschen Rösterei/Importeur beziehen.
- [ ] Bezugsquelle, Preise, Etiketten (Design-Brief v4, Dez. 2024) finalisieren

**Handwerk von Partner*innen** ⚖️
- [ ] Einfuhr/Zoll und Einfuhrumsatzsteuer, faire Einkaufspreise schriftlich vereinbaren, Produktsicherheit (GPSR) prüfen

**Technik**
- [x] **Bezahlweg (Entscheidung des Vorsitzenden, 08.11.2026): Überweisung direkt auf das GLS-Konto** mit eigenem Verwendungszweck je Bestellung (z. B. „Geschenk Pearl Kita 2611-K7Q4M2“, Waren „Bantu Shop 2611-…“) und GiroCode-QR für Banking-Apps. Kein Zahlungsanbieter, keine Gebühren, keine Kartendaten.
- [x] **Bestellformular auf dem eigenen Server** (`public/shop/bestellung.php`): prüft gegen die Preisliste `/shop/katalog.json` (beim Build erzeugt), E-Mail an info@bantu-ev.org (Antwort geht an die Käufer*in) und Bestätigung an die Käufer*in, Sicherungskopie außerhalb des Webroots in `~/bantu-orders/orders.jsonl` (nur für das Konto lesbar), Spam- und Mengenbegrenzung. `.htaccess` lässt nur POST über HTTPS auf genau diese Datei zu. Lokal mit Apache + PHP getestet.
- [ ] ⚖️ **Kontoinhaber-Name prüfen:** Banken gleichen seit Oktober 2025 den Empfängernamen mit dem Kontoinhaber ab (Empfängerüberprüfung). Formular, E-Mail und QR-Code nutzen `bank.holder` aus `src/data/site.ts` (zurzeit „Bantu e.V.“). Steht bei der GLS ein anderer Name, dort eintragen, sonst sehen Zahlende einen Warnhinweis.
- [ ] Zahlungseingänge regelmäßig mit den Bestell-E-Mails abgleichen (Verwendungszweck); Spendengeschenke mit Wunsch „Zuwendungsbestätigung“ an die Schatzmeisterin.
- [ ] Je Ware `price`, `image`, `status: 'available'` in `src/data/shop.ts`, dazu `shipping.flat`; dann `features.shopCheckoutOpen = true` – erst wenn alle Punkte oben erledigt sind. Vor dem Freischalten eine Testbestellung über die Seite machen (Warenformular mit Menge und Lieferanschrift).
- [ ] Optional später: Karte/PayPal über einen Anbieter (`checkoutUrl`) – Auszahlungen kommen dann gesammelt, der Verwendungszweck je Kauf steht nur beim Anbieter.
- [ ] Barrierefreiheitsstärkungsgesetz: Kleinstunternehmen sind für Dienstleistungen ausgenommen ⚖️ – trotzdem barrierearm bleiben
