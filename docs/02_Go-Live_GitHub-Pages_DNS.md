# Go-live: GitHub Pages und DNS für bantu-ev.org

Ziel: `https://www.bantu-ev.org` zeigt die neue Website, `bantu-ev.org` leitet dorthin weiter – **E-Mail (info@bantu-ev.org, boazmurinzi@bantu-ev.org) läuft unverändert weiter.**

## A. GitHub (einmalig)
1. Repository → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Repository → **Actions**: Workflow „Build and deploy to GitHub Pages“ läuft nach jedem Push. Vorschau-Adresse: `https://<github-name>.github.io/bantu-ev-website/`.
3. Vorschau prüfen (DE/EN, Mobil, Downloads, Spenden-Seite).
4. Empfohlen: Domain im GitHub-Konto verifizieren – **Profilbild → Settings → Pages → Add a domain** → `bantu-ev.org`; GitHub nennt einen TXT-Eintrag `_github-pages-challenge-<name>.bantu-ev.org`, den Sie beim DNS-Anbieter anlegen.

## B. Vor der Umstellung: E-Mail absichern (wichtig!)
1. Beim DNS-Anbieter die **aktuellen Einträge notieren/Screenshot** (A, AAAA, CNAME, MX, TXT).
2. **MX-Einträge prüfen:** Zeigt ein MX auf `bantu-ev.org` selbst oder auf einen Namen, der per CNAME auf `bantu-ev.org` verweist, dann **zuerst** einen eigenen A-Eintrag `mail.bantu-ev.org` mit der **bisherigen** Server-IP anlegen und den MX darauf umstellen. Sonst würde die Änderung des A-Eintrags unten die E-Mail kappen.
3. MX-, SPF- (TXT `v=spf1 …`), DKIM- und Autodiscover-Einträge **nicht verändern**.
4. Optional: TTL der zu ändernden Einträge 24 h vorher auf 300 s senken.

## C. DNS-Einträge für GitHub Pages
| Name | Typ | Wert |
|---|---|---|
| `www` | CNAME | `<github-name>.github.io` |
| `@` (bantu-ev.org) | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `@` | AAAA | `2606:50c0:8000::153` |
| `@` | AAAA | `2606:50c0:8001::153` |
| `@` | AAAA | `2606:50c0:8002::153` |
| `@` | AAAA | `2606:50c0:8003::153` |

Bestehende A/AAAA-Einträge für `@` und `www`, die auf den alten Webserver zeigen, entfernen (nicht die Mail-Einträge).

## D. GitHub auf die Domain umstellen
1. Repository → **Settings → Pages → Custom domain:** `www.bantu-ev.org` → Save. Warten, bis der DNS-Check grün ist, dann **Enforce HTTPS** aktivieren.
2. Repository → **Settings → Secrets and variables → Actions → Variables → New repository variable:** `CUSTOM_DOMAIN` = `www.bantu-ev.org`.
3. **Actions → Build and deploy → Run workflow** (baut die Seite ohne Unterpfad neu).

## E. Nach dem Go-live testen
- `https://www.bantu-ev.org/`, `https://bantu-ev.org/` (Weiterleitung), `/en/`, `/projekte/p26-224-erde-saat-erbe/`
- Alte Links: `/about-bantu/`, `/donate/`, `/de/kontakt/` leiten weiter
- E-Mail senden und empfangen an info@bantu-ev.org
- `https://www.bantu-ev.org/sitemap-index.xml` in der Google Search Console einreichen (optional)

## F. Altes WordPress
- **Vorher** `npm run migrate:wp` ausführen (sichert Seiten und alle Bilder).
- Hosting erst kündigen, wenn Export, E-Mail-Betrieb und neue Seite geprüft sind. Klären, ob die E-Mail-Postfächer beim selben Hosting-Paket liegen – dann Hosting **nicht** kündigen oder die Postfächer vorher umziehen.

## Notfall-Rückweg
DNS-Einträge aus Schritt B.1 wiederherstellen; die alte WordPress-Seite ist dann nach Ablauf der TTL wieder erreichbar.
