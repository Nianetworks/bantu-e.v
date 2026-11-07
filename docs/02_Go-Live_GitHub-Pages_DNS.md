# Go-live und Betrieb: www.bantu-ev.org auf dem eigenen Server

Stand: 07.11.2026. Die neue Website ersetzt seit dem 07.11.2026 die alte WordPress-Seite auf dem bisherigen Hosting. **DNS und E-Mail wurden nicht verändert.**

## So funktioniert die Veröffentlichung
1. Änderungen werden im Repository **github.com/Nianetworks/bantu-e.v** (Branch `main`) gemacht – im GitHub-Browser-Editor oder mit Claude Code.
2. Der Workflow `.github/workflows/deploy.yml` baut bei jedem Push (und jede Nacht um 03:17 UTC):
   - die **Vorschau** auf GitHub Pages: https://nianetworks.github.io/bantu-e.v/
   - die **Live-Fassung** für https://www.bantu-ev.org (inkl. `.htaccess`) und legt sie im Branch `live` ab.
3. Der Server holt den Branch `live` **alle 10 Minuten** ab und spielt ihn in `public_html` ein.
   - Skript: `~/bin/bantu-site-deploy.sh` (cPanel-Konto `bantuev`), Protokoll: `~/logs/bantu-site-deploy.log`
   - Cronjob des Kontos (sichtbar in cPanel → Cron Jobs): `*/10 * * * * /bin/bash $HOME/bin/bantu-site-deploy.sh >/dev/null 2>&1`
   - Sofort veröffentlichen: im cPanel-Terminal `bash ~/bin/bantu-site-deploy.sh --force`

Eine Änderung ist also nach etwa **5–15 Minuten** live (Build ca. 1 Minute + nächster Cron-Lauf).

## Server und Domain
| Was | Wert |
|---|---|
| Server | wolke.rukeira.com (WHM/cPanel, Apache), IP 94.130.164.170 |
| cPanel-Konto | `bantuev`, Webroot `/home/bantuev/public_html` |
| Nameserver | ns1/ns2.rukeira.com (DNS-Zone liegt auf demselben Server) |
| Kanonische Adresse | `https://www.bantu-ev.org` – `bantu-ev.org` und `http://` leiten per 301 dorthin (`.htaccess`) |
| SSL | cPanel AutoSSL (`.well-known/` bleibt erreichbar) |
| E-Mail | unverändert über denselben Server (MX → bantu-ev.org) – **den A-Eintrag von bantu-ev.org nicht ändern**, sonst fällt die E-Mail aus |
| Andere Subdomains | `fin.bantu-ev.org`, `wolke.bantu-ev.org` liegen in eigenen Ordnern und sind nicht betroffen |

## Alte WordPress-Seite (Sicherung)
- Dateien: `/home/bantuev/wordpress_backup_2026-11-07/public_html/` (verschoben, nicht gelöscht)
- Datenbank: `bantuev_web` bleibt unverändert bestehen; zusätzlich Dump `/home/bantuev/wordpress_backup_2026-11-07/bantuev_web_2026-11-07.sql.gz`
- **Notfall-Rückweg (ca. 2 Minuten):** Cronjob deaktivieren, Inhalt von `public_html` in einen Ordner verschieben und den Inhalt von `wordpress_backup_2026-11-07/public_html/` zurück nach `public_html` verschieben.
- Die Sicherung frühestens nach einigen Monaten löschen (Absprache Vorstand).

## Alte Adressen
Alte WordPress-Links (`/about-bantu/`, `/donate/`, `/de/spenden/` …) leiten per **301** auf die neuen Seiten weiter. Liste: `src/data/redirects.mjs` (daraus wird die `.htaccess` erzeugt). `/wp-admin`, `/wp-login.php`, `/xmlrpc.php` antworten mit 410.

## Prüfen nach Änderungen
- `https://www.bantu-ev.org/`, `/en/`, `/spenden/`, `/projekte/p26-224-erde-saat-erbe/`
- `https://bantu-ev.org/` und `http://www.bantu-ev.org/` → Weiterleitung auf `https://www.bantu-ev.org/`
- E-Mail an info@bantu-ev.org senden und empfangen (nach Änderungen am Server)

## Später: Umzug auf GitHub Pages (optional)
Nur sinnvoll, wenn das Hosting gekündigt werden soll. Dann vorher die E-Mail absichern: eigener A-Eintrag `mail.bantu-ev.org` mit der Server-IP, MX darauf umstellen, erst danach A/AAAA für `@` auf GitHub Pages (185.199.108–111.153) und CNAME `www` → `nianetworks.github.io`; Repository-Variable `CUSTOM_DOMAIN=www.bantu-ev.org` setzen.
