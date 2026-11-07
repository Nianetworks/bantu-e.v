# CLAUDE.md – Website Bantu e.V. (www.bantu-ev.org)

Operating manual for Claude Code. Read this first, then `docs/01_Relaunch-Plan.md`.

## What this is
Static, bilingual (DE default, EN under `/en/`) website of **Bantu-Vereinigung für globale Bildung, Gerechtigkeit und Zusammenarbeit e.V.**, Berlin. Replaces the old WordPress/Elementor site (last edited 2023). Built with **Astro 7** (pinned in package.json). **Live since 07.11.2026 on the association's own hosting** (cPanel account `bantuev` on wolke.rukeira.com): GitHub Actions builds the site into branch `live`, the server pulls it every 10 minutes. Preview on GitHub Pages. No database, no cookies, no tracking, no external fonts/CDNs (only exception: the twingle donation form, loaded after a click).

## Repository
- GitHub: https://github.com/Nianetworks/bantu-e.v (branch `main`) · Live: https://www.bantu-ev.org · Preview: https://nianetworks.github.io/bantu-e.v/
- Can later be transferred to a Bantu e.V. GitHub organisation (Settings → Transfer) – keeps history; update the CNAME target afterwards.

## Commands
```bash
npm ci                 # install (Node >= 22.23)
npm run dev            # local dev server http://localhost:4321
npm run build          # astro build + postbuild clean-up (dist/)
npm run check:open     # list all "OPEN:" items (content still to confirm)
npm run migrate:wp     # one-off export of the old WordPress pages + media into migration/
```
Preview build under a sub-path: `BASE_PATH=/bantu-e.v npm run build`.

## Structure
```
src/data/site.ts        legal facts, contacts, bank, board, feature switches (shopCheckoutOpen, formEndpoint)
src/data/people.ts      people (consent flag!), partner organisations (with website links), funders (linked logos)
src/data/programmes.ts  2 work areas (regions: /inlandsarbeit/, /auslandsarbeit/), 5 programmes + programme 6 (management),
                        project-to-programme assignment, Trägerschaften. A project's region = front matter `programme: inland|international`
src/data/shop.ts        shop categories + products (prices empty until the board sets them)
src/data/downloads.ts   files offered on /downloads and /berichte (live in public/downloads/)
src/data/impact.ts      verified impact figures + timeline
src/data/redirects.mjs  old WordPress URLs -> new pages
src/content/projects/{de,en}/<slug>.md   one file per project and language (same file name!)
src/content/news/{de,en}/<slug>.md       news, events (type: event), announcements (pinUntil)
src/views/*.astro       page templates (take `lang`)
src/pages/**            thin DE routes + /en/ routes that render the views
src/i18n/index.ts       routes per language, UI strings, nav
public/                 brand assets, images, funder logos, downloads
docs/                   plan, go-live/DNS, legal & shop, photo brief, editing guide, open questions
```

## Non-negotiable rules
1. **Facts only from the association's documents.** Never invent project numbers, amounts, dates, names, quotes or results. If a figure is unknown, leave it out and add `<!-- OPEN: … -->` (Markdown) or `// OPEN: …` (TS). These notes are stripped from the public HTML by `scripts/postbuild-base-path.mjs`.
2. **Legal identity** (`src/data/site.ts`): VR 37606 B, Amtsgericht Charlottenburg; Steuernummer 27/661/53393; Kameruner Str. 1, 13351 Berlin; Postfach 120344, 10593 Berlin; GLS IBAN DE47 4306 0967 1035 6810 00. Bantu e.V. is not Nia and not FUG – never mix their addresses.
3. **Board (updated 07.11.2026 on instruction of the chair):** the board elected on 30.06.2024 is shown on /menschen with names and roles only (Boaz Murinzi Murema – chair; Anne Behner – deputy; Michael Miiro – treasurer; Norah Masane – secretary; Aishah Nantumbwe – fundraising & resource mobilisation). Edith Tendo Okello stepped back. Never publish birth dates or private addresses; photos only with written consent. The Impressum names the chair as authorised representative (register extract 22.05.2026).
4. **Privacy:** people appear with name/photo only with `consent: true`. No identifiable children without parental consent (Pearl Kita!). No embeds (YouTube, Google Maps, Instagram) – link instead. Fonts are self-hosted via @fontsource.
5. **Funding acknowledgements are contractual.** Keep `fundingNote`, `fundingLogos`, `disclaimer` exactly as the funder requires (P 26/224 BIKO, P 26/214 Engagement Global/BMZ, MI2026-24B MITTEinander aktiv). Missing logos = OPEN items.
6. **Brand (Guidelines v2.1, Nov 2026):** original logo only (globe + interwoven green/blue peace sign + 8 rings, name *below* the emblem). Never use the July-2026 redesign concepts or `bantu_logo.svg`. Stacked logo ≥ 120 px wide; emblem-only ≥ 48 px only in very small spaces. Colours: Gold #FEBF00, Green #3CB04B, Blue #749BCA, Black; text-safe #8A6200 / #2E8A3B / #3F6FA6. Fonts: Noto Serif (headlines), Archivo (text).
7. **Bilingual parity:** every project/news file exists in `de/` and `en/` with the same file name. German is binding for funder/authority wording.
8. **Accessibility is a core requirement (blind and partially sighted users):** target WCAG 2.2 AA. Semantic HTML and landmarks, one `h1`, no skipped heading levels, alt texts (decorative = `aria-hidden`), visible focus, contrast ≥ 4.5:1 in **all three themes** (light, dark, high contrast), targets ≥ 44 px, no hover-only interactions, no autoplay, `lang` on mixed-language text. Colours only via CSS variables in `global.css` (never hard-code text/background colours in components – they break dark/contrast mode). New pages must pass `node` axe check and the reflow check (see below) with text at 150 %.
   - Accessibility toolbar: `src/components/A11yPanel.astro` (text size, dark/high contrast, Atkinson Hyperlegible font, spacing, link highlighting, stop motion, read aloud via on-device speech synthesis). Settings live in `localStorage` key `bantu-a11y` and are applied as `data-*` attributes on `<html>`.
   - Pages: `/barrierefreiheit/` (statement + feedback) and `/einfache-sprache/` (easy read) – keep both up to date when content changes.
9. **Shop:** checkout stays off (`features.shopCheckoutOpen = false`) until everything in `docs/03_Rechtliches_und_Shop-Checkliste.md` is done. Symbolic gifts are donations, not sales.

## How to verify a change
0. Accessibility: run axe-core (Playwright) on changed pages in light, dark and contrast theme, and check for horizontal scrolling at 320 px and at 360 px with text size 150 %.
1. `npm run build` must pass without errors.
2. `npm run check:open` – review new/remaining items.
3. Screenshot changed pages at 1440 px and 390 px (Playwright) and look at them.
4. Check DE and EN versions and the language switch on the page you changed.

## Deploy
Push to `main` → `.github/workflows/deploy.yml`:
- job `build`/`deploy`: preview on GitHub Pages (`https://<owner>.github.io/<repo>/`)
- job `live`: production build (`SITE_URL=https://www.bantu-ev.org`, `BASE_PATH=/`, `HTACCESS=1`) force-pushed to branch `live`
The server (cPanel account `bantuev`) runs `~/bin/bantu-site-deploy.sh` every 10 minutes (cron) and checks out branch `live` into `~/public_html`; log in `~/logs/bantu-site-deploy.log`. Nightly rebuild at 03:17 UTC keeps "upcoming events" current. **Never change the DNS A record of bantu-ev.org – e-mail (MX) runs on the same server.** Details and rollback: `docs/02_Go-Live_GitHub-Pages_DNS.md`.
- `.htaccess` is generated by `scripts/postbuild-base-path.mjs` (canonical https://www., 301 redirects from `src/data/redirects.mjs`, 404, caching, security headers) – do not edit it on the server.
- Homepage slideshow (11 photos, prev/next/pause): photos in `public/images/hero/` (1600 px + `-800` version, WebP), captions in `src/data/heroSlides.ts`. Only photos with documented consent and without identifiable children.
- Donations: twingle form (`org.donation` in `src/data/site.ts`), two-click loading on `/spenden/`.

## Backlog (in priority order)
1. **By 13.11.2026:** P 26/224 project page is live on bantu-ev.org since 07.11.2026 – still add the Land Berlin logo and the confirmed schools (BIKO contract no. 9).
2. Photos: old-site photos reviewed 07.11.2026 (most are stock images or portraits of former team members – not reused); Ruhaama sign photo imported. WordPress backup on the server: `~/wordpress_backup_2026-11-07/`.
3. Confirm data processing agreements (hosting provider, twingle) and the hosting provider's name in the privacy policy (OPEN notes in `LegalView.astro`).
4. Add logos for MITTEinander aktiv / Bezirksamt Mitte (Ubuntu Talks) and EZ-KPF funding sentence (P 26/230, P 26/186).
5. Real photos per `docs/04_Foto-Briefing.md`; replace placeholders (`image`, `imageAlt` in front matter).
6. Board: confirm registration of the new board at the Amtsgericht; collect consented photos/short bios.
7. Shop: legal/tax checklist, prices, product photos, Stripe Payment Links → `checkoutUrl`, then `shopCheckoutOpen = true`; add AGB/Widerruf pages.
8. After 15.11.2026: turn Ubuntu Talks into a review (status completed, photos with consent, results).
9. Optional: a privacy-friendly form backend (`features.formEndpoint`), newsletter, Decap CMS for non-technical editing.
