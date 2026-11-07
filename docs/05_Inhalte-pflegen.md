# Inhalte pflegen

Zwei Wege: **(A)** direkt im Browser auf GitHub oder **(B)** mit Claude Code. Nach jeder Änderung auf `main` ist die Website nach ca. 2 Minuten aktualisiert (Reiter „Actions“ zeigt den Fortschritt).

## A. Im Browser auf GitHub
1. Repository öffnen → Ordner wählen, z. B. `src/content/news/de/`
2. **Add file → Create new file** → Dateiname `mein-titel.md` (klein, ohne Leerzeichen/Umlaute)
3. Vorlage unten einfügen und ausfüllen → **Commit changes**
4. Die englische Fassung mit **demselben Dateinamen** in `src/content/news/en/` anlegen

Bestehende Datei ändern: Datei öffnen → Stift-Symbol → ändern → **Commit changes**.

## B. Mit Claude Code
Im Repository-Ordner zum Beispiel:
- „Lege eine Veranstaltung an: Mitgliederversammlung am 05.12.2026, 18 Uhr, online. Deutsch und Englisch, Hinweisleiste bis zum Termin.“
- „Neues bewilligtes Projekt P 27/xx: Lies den Bescheid in <Pfad> und lege die Projektseite DE/EN mit Förderhinweis an.“
- „Ersetze den Platzhalter bei Pearl Kita durch das Foto <Datei>, verkleinere es auf 1600 px.“

## Vorlagen

### Neuigkeit
```markdown
---
title: "Titel der Meldung"
date: 2026-11-20
type: news
summary: "Ein bis zwei Sätze für Übersicht und Suchmaschinen."
project: p26-230-pearl-kita-kampala   # optional: Slug des Projekts
---

Text in Markdown. **Fett**, [Link](https://…), Listen mit „- “.
```

### Veranstaltung (erscheint unter „Demnächst“ und optional in der gelben Hinweisleiste)
```markdown
---
title: "Name der Veranstaltung"
date: 2026-11-20            # Veröffentlichungsdatum
type: event
summary: "Worum geht es, für wen?"
eventStart: 2026-12-05T18:00:00+01:00
eventEnd: 2026-12-05T20:00:00+01:00
eventTime: "18–20 Uhr"
location: "Ort, Adresse"
registration: "mailto:info@bantu-ev.org?subject=Anmeldung"
registrationLabel: "Per E-Mail anmelden"
cost: "kostenfrei"
pinUntil: 2026-12-05        # optional: Hinweisleiste oben bis zu diesem Tag
---
Beschreibung …
```

### Projekt (`src/content/projects/de/<slug>.md` + `en/<slug>.md`)
```markdown
---
title: "Projekttitel"
subtitle: "Untertitel"
summary: "Ein Satz für Karten und Vorschau."
code: "P 27/12"
programme: international      # oder: inland
status: active                # active | completed | planned
country: "Uganda"
location: "Ort"
period: "01.01.2027 – 31.12.2027"
start: 2027-01-01
end: 2027-12-31
partners: ["Partnerorganisation"]
funders: ["Geldgeber"]
fundingNote: "Förderhinweis exakt wie im Bescheid"
disclaimer: "Haftungshinweis exakt wie im Bescheid"
sdgs: [4]
stats:
  - { value: "60", label: "Kinder" }
photoBrief: "Welches Foto gebraucht wird"
featured: true
---
Text …
```

### Bericht/Download
PDF nach `public/downloads/berichte/` hochladen, dann in `src/data/downloads.ts` eine Zeile ergänzen (Jahr, Dateiname, Größe).

### Person
In `src/data/people.ts` einen Eintrag ergänzen – **nur mit schriftlicher Einwilligung** (`consent: true`). Foto nach `public/images/people/`.

## Vor dem Veröffentlichen
- Zahlen, Daten und Namen nur aus Bescheiden, Sachberichten, Verträgen.
- Unklares mit `<!-- OPEN: … -->` markieren (wird nicht öffentlich angezeigt).
- Deutsch und Englisch gleichzeitig pflegen.
