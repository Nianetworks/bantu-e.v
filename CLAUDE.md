# CLAUDE.md – Website Bantu e.V. (www.bantu-ev.org)

Operating manual for Claude Code. Read this first, then `docs/01_Relaunch-Plan.md`.

## What this is
Static, trilingual (DE default, EN under `/en/`, FR under `/fr/`) website of **Bantu-Vereinigung für globale Bildung, Gerechtigkeit und Zusammenarbeit e.V.**, Berlin. Replaces the old WordPress/Elementor site (last edited 2023). Built with **Astro 7** (pinned in package.json). **Live since 07.11.2026 on the association's own hosting** (cPanel account `bantuev` on wolke.rukeira.com): GitHub Actions builds the site into branch `live`, the server pulls it every 10 minutes. Preview on GitHub Pages. No database, no cookies, no tracking, no external fonts/CDNs (only exception: the twingle donation form, loaded after a click).

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
src/data/shop.ts        shop categories + products (prices empty until the board sets them), shipping, giftLimits, canOrder()
src/components/OrderForm.astro + public/shop/bestellung.php   shop orders (chair, 08.11.2026): form -> our own server (the ONLY
                        server-side script; .htaccess allows POST over HTTPS to exactly this file) -> mail to info@ + buyer, backup
                        ~/bantu-orders/orders.jsonl; payment by bank transfer to GLS with a unique Verwendungszweck + GiroCode QR (uqr).
                        Prices come only from /shop/katalog.json (src/pages/shop/katalog.json.ts). Gifts live; goods behind shopCheckoutOpen.
                        Gifts (donations) are NOT in the shop: section #geschenke on the donate page, pages at /spenden/<slug>/
                        (giftPath), old /shop/geschenk-* URLs redirect (redirects.mjs). Chair's decision 08.11.2026.
src/data/downloads.ts   files offered on /downloads and /berichte (live in public/downloads/)
src/data/impact.ts      verified impact figures + timeline
src/data/events.ts      events page list (past/ongoing events that have no news file): DE/EN/FR, dates 'YYYY[-MM[-DD]]',
                        kind labels, links to project/news; sources = Jahresberichte Inland 2022–2024 / Ausland 2023–2025,
                        project pages. src/lib/events.ts merges them with news `type: event` (eventName, eventKind,
                        `sessions` = single dates of a series) and splits upcoming / ongoing / past-by-year at build time.
                        Rendered by src/views/EventsView.astro (chair, 09.11.2026: all past, current and future events).
src/data/redirects.mjs  old WordPress URLs -> new pages
src/content/projects/{de,en,fr}/<slug>.md   one file per project and language (same file name!)
src/content/news/{de,en,fr}/<slug>.md       news, events (type: event), announcements (pinUntil); optional `photos` (src stem + width/height:
                        <src>.jpg, <src>-800.webp, <src>-<width>.webp in public/images/news/, EXIF/GPS stripped) shown below the text.
                        Coffee cupping report 28.09.2026 (kaffee-cupping-symple-coffee-roasters) is also teased in the shop coffee section.
src/views/*.astro       page templates (take `lang`)
src/pages/**            thin DE routes + /en/ routes that render the views
src/i18n/index.ts       routes per language (de/en/fr), UI strings, main nav (mega menus for the two work areas)
src/lib/alternates.ts   maps every page to its DE/EN/FR versions (language switch DE · EN · FR, hreflang)
src/views/FollowView.astro  "Neuigkeiten verfolgen" info pages /aktuelles/abonnieren/, /en/news/follow/, /fr/actualites/suivre/
                        (route `follow`): plain HTML explanation of the RSS feed, read button -> news page, copy button (JS only,
                        announces success via role=status, manual instructions on failure), selectable address field. Visible
                        subscription links point here, never at the raw rss.xml (chair, 09.11.2026). Feeds stay at `feedPath`
                        (i18n) = src/pages/<lang>/rss.xml.js and in the <head> rel=alternate; never redirect or replace them.
src/data/sdgs.ts        SDG names; icons in public/sdg/ (SdgIcons component)
src/lib/schema.ts       JSON-LD @graph (NGO + WebSite on every page; Event nodes from news files with type: event)
public/partners/        partner logos (OrgCard); public/funders/ funder logos
public/images/shop/abantu-coffee/  ABANTU COFFEE "Woven Origins v2" bag previews (480/768/1254 WebP + JPEG) and front/back label
                        previews, shown by components/ProductImage.astro (whole bag, square, no cropping). Digital packaging previews,
                        not final retail labels. Main coffee partner: Balambuli Kwigate Coffee (BKC). Uganda Collection = 12 editions in
                        src/data/coffee.ts: 01 Roots & Routes and 04 Sebei Elgon "coming soon" (chair, 09.11.2026). The other ten (status 'planned')
                        are HIDDEN from the public website since 09.11.2026 (shop.ts showPlannedEditions = false: no section, no pages,
                        images removed; copies in the chair's Website/Abantu_Coffee_Shop_Upload_2026-11-08 folders). Each
                        edition has a story (DE/EN/FR) from the 2025 "Complete 12-Line Collection" brochure (chair's choice); unconfirmed
                        cooperatives/processing/impact are written as plans/aims. No "certified organic" claims; no prices invented.
public/videos/          self-hosted films + VTT captions; shown by src/components/ProjectMedia.astro via front matter `video` (film at
                        the top; `video.transcript` = VTT whose cues appear right below it as "photo descriptions as text"; optional
                        `video.narrated` = film with spoken photo descriptions) and `gallery`. No autoplay, preload none.
                        Okushoma kwa Boona: standard films only (chair's decision 08.11.2026, no narrated versions online).
                        Films are NOT offered for download (chair, 08.11.2026): no download link, controlslist="nodownload",
                        no right-click save on the player. Media URLs carry ?v=<MEDIA_VERSION> (ProjectMedia.astro): raise it when a
                        film/caption/poster is replaced under the same name. Keep each MP4 under ~23 MB (25 MB GitHub browser-upload limit;
                        one film per zip). Blur names/faces without consent before publishing.
                        Gallery = even 3:2 tiles grouped by front-matter `section` (h3 per group), click opens a modal viewer; photos far
                        from 3:2 are shown whole on a blurred backdrop unless `focus` (object-position) is set. Okushoma kwa Boona = revision 5 (08.11.2026).
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
7. **Language parity:** every project/news file exists in `de/`, `en/` and `fr/` with the same file name. German is binding for funder/authority wording (funding sentences stay German, with a translation after it). Views use `de ? 'DE' : fr ? 'FR' : 'EN'`. Write like a person: no em/en dashes as punctuation (ranges like 2021–2025 are fine), no filler phrases.
10. **Navigation:** Über uns · Inlandsarbeit · Internationale Zusammenarbeit (mega menus: programme → current projects; completed projects only via the archive link `/projekte/#archiv`, `/en/projects/#archive`, `/fr/projets/#archives`) · Wirkung · Aktuelles · Mitmachen · Shop (own top-level item before the donate button, 08.11.2026). Labels stay on one line; with enlarged text the compact menu is always used. Region programme pages: `/inlandsarbeit/<programm>/`, `/auslandsarbeit/<programm>/`. Education offers with AfricAvenir: `/bildungsangebote/`.
11. **Contacts:** office +49 (0)30 26934764; mobile +49 176 34213765 only 16:00–20:00, also Signal, Threema, Telegram, WhatsApp (`Phones` component).
12. **Funding logos:** EZ-KPF projects show SNSB + BMZ; P 26/214 (SDG fund) SNSB + BMZ + Engagement Global; P 26/224 (BIKO) SNSB + SenBJF; Ubuntu Talks BA Mitte + Club Dialog. SDG icons on project, programme and area pages.
8. **Accessibility is a core requirement (blind and partially sighted users):** target WCAG 2.2 AA. Semantic HTML and landmarks, one `h1`, no skipped heading levels, alt texts (decorative = `aria-hidden`), visible focus, contrast ≥ 4.5:1 in **all three themes** (light, dark, high contrast), targets ≥ 44 px, no hover-only interactions, no autoplay, `lang` on mixed-language text. Colours only via CSS variables in `global.css` (never hard-code text/background colours in components – they break dark/contrast mode). New pages must pass `node` axe check and the reflow check (see below) with text at 150 %.
   - Accessibility toolbar: `src/components/A11yPanel.astro` (text size, dark/high contrast, Atkinson Hyperlegible font, spacing, link highlighting, stop motion, read aloud via on-device speech synthesis). Native modal `<dialog>` rendered at the end of `<body>` by Base.astro (its h2 never precedes the page h1); open it with any button `[data-a11y-toggle] aria-haspopup="dialog"`. Settings live in `localStorage` key `bantu-a11y` and are applied as `data-*` attributes on `<html>`; text size also sets `--font-scale`.
   - Pages: `/barrierefreiheit/` (statement + feedback) and `/einfache-sprache/` (easy read) – keep both up to date when content changes.
9. **Shop:** goods ordering stays off (`features.shopCheckoutOpen = false`) until everything in `docs/03_Rechtliches_und_Shop-Checkliste.md` is done. Symbolic gifts are donations, not sales, and can be ordered now (bank transfer with unique Verwendungszweck). Never add another server-side script or loosen the .htaccess exception without the chair's decision.

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
- Homepage slideshow (11 photos, prev/next/pause): photos in `public/images/hero/` (1600 px + `-800` version, WebP), captions in `src/data/heroSlides.ts`. Only the first photo is in the HTML (preloaded in HomeView); the others sit in a `<template>` and are mounted by script when needed. Only photos with documented consent and without identifiable children.
- Donations: twingle form (`org.donation` in `src/data/site.ts`), two-click loading on `/spenden/`.

## Backlog (in priority order)
1. **By 13.11.2026:** P 26/224 project page is live on bantu-ev.org since 07.11.2026 – still add the Land Berlin logo and the confirmed schools (BIKO contract no. 9).
2. Photos: old-site photos reviewed 07.11.2026 (most are stock images or portraits of former team members – not reused); Ruhaama sign photo imported. WordPress backup on the server: `~/wordpress_backup_2026-11-07/`.
3. Confirm data processing agreements (hosting provider, twingle) and the hosting provider's name in the privacy policy (OPEN notes in `LegalView.astro`).
4. Add logos for MITTEinander aktiv / Bezirksamt Mitte (Ubuntu Talks) and EZ-KPF funding sentence (P 26/230, P 26/186).
5. Real photos per `docs/04_Foto-Briefing.md`; replace placeholders (`image`, `imageAlt` in front matter).
6. Board: confirm registration of the new board at the Amtsgericht; collect consented photos/short bios.
7. Shop: legal/tax checklist, prices, product photos, Stripe Payment Links → `checkoutUrl`, then `shopCheckoutOpen = true`; add AGB/Widerruf pages.
8. After 22.11.2026 (date corrected from 15.11. on 07.11.2026): turn Ubuntu Talks into a review (status completed, photos with consent, results).
9. Optional: a privacy-friendly form backend (`features.formEndpoint`), newsletter, Decap CMS for non-technical editing.
