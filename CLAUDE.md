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
npm run build          # astro build + postbuild clean-up + pagefind search index (dist/)
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
src/components/OrderForm.astro + public/shop/bestellung.php   shop orders (chair, 08.11.2026): form -> our own server (one of only
                        TWO server-side scripts; .htaccess allows POST over HTTPS to exactly these files) -> mail to info@ + buyer, backup
                        ~/bantu-orders/orders.jsonl; payment by bank transfer to GLS with a unique Verwendungszweck + GiroCode QR (uqr).
                        Prices come only from /shop/katalog.json (src/pages/shop/katalog.json.ts). Gifts live; goods behind shopCheckoutOpen.
                        Gifts (donations) are NOT in the shop: section #geschenke on the donate page, pages at /spenden/<slug>/
                        (giftPath), old /shop/geschenk-* URLs redirect (redirects.mjs). Chair's decision 08.11.2026.
src/views/SponsorshipView.astro + public/mitmachen/patenschaft.php   "Education into the Future" education sponsorships (chair,
                        09.11.2026): pages /mitmachen/bildungspatenschaft/ (route `sponsorship`), online form -> the second server-side
                        script (same pattern as the shop: honeypot, dwell time, 3 requests/15 min per hashed IP, mail to info@ + sponsor
                        in the page language, backup ~/bantu-patenschaften/patenschaften.jsonl, HTML answer without JS). No payment
                        data, no direct debit mandate: Bantu sends the GLS bank details afterwards. The programme is presented ON the
                        page (chair, 09.11.2026: no PDFs, neither brochure nor form; texts = the chair's programme drafts + documented
                        results from the project pages). Also shown as a `services` block on the international education programme page
                        (/auslandsarbeit/bildung/, programmes.ts). Privacy policy section 8. Guide values 25/40/70 EUR per month are
                        guide values; actual costs are confirmed per support plan.
src/components/DonateBar.astro   giving bar on small screens (audit 09.11.2026): fixed strip with "Spenden" + "Monatlich helfen"
                        (sponsorship), shown only when the header uses the compact menu (same breakpoints as Header.astro), hidden on
                        the donate and sponsorship pages, while the menu is open and in print; body gets bottom padding via :has().
                        NOT a pop-up: no overlay, nothing to dismiss (the chair rejects pop-ups, 09.11.2026). Monthly giving comes
                        first on /spenden/ ("Regelmäßig helfen": sponsorship + twingle "monatlich") and on the homepage (.monthly).
src/views/PartnersView.astro   /mitmachen/unternehmen-und-stiftungen/ (route `partners`): partnerships with companies and foundations.
                        Describes existing practice only (local partners, receipts, reports, ITZ) and the four real forms: project
                        co-funding, group sponsorships, AfricAvenir workshops, in-kind support. Donations get a receipt; sponsoring
                        with a service in return needs an agreement. No partner companies named (none on record). Funder logos from
                        people.ts. Nav child + footer link "Unternehmen & Stiftungen", button in the join page's cooperation section.
src/views/SearchView.astro + Pagefind   site search /suche/, /en/search/, /fr/recherche/ (route `search`, utility-bar link). `npm run build`
                        runs `pagefind --site dist` after the postbuild: static index per language in dist/pagefind/ (only <main
                        data-pagefind-body> is indexed; noindex pages such as 404 and the search pages are skipped). Pagefind Component
                        UI (self-hosted, no external requests, nothing sent anywhere); theme tokens mapped in SearchView (--pf-*).
                        CSP has 'wasm-unsafe-eval' for the search engine; .pf_* and .pagefind files cached 30 days, .json no-cache.
src/views/ContactView.astro   contact page (audit 09.11.2026): consented hero photo (heroSlides), answer promise "48 Stunden an
                        Werktagen" (⚠️ chair's promise), direct channels (mailto/tel), addresses with OpenStreetMap LINK (no Google
                        Maps embed, rule 4), press note, mailto-composing form with subjects, inline SVG schematic Berlin/Kampala/
                        Mbarara/Bujumbura (no map embed). Header: utility-bar link "Kontakt" (no raw e-mail) and top-level "Kontakt"
                        after Shop (fits in one row at 1280 px, measured 09.11.2026).
src/data/policy-content.ts + src/views/PolicyView.astro   Impressum, Datenschutzerklärung, Erklärung zur Barrierefreiheit in DE/EN/FR
                        (chair's reviewed package "Bantu_Website_Policies_and_Donation_Update", revision 3, 10.11.2026; payment wording updated after PayPal/Stripe activation the same day). Texts are
                        data (sections with stable ids; privacy `#twingle` is the target of twingle's privacy link). Representative
                        "Murema, Murinzi Boaz", Bantu e.V. operates its own hosting (both confirmed by the chair). EN/FR legal pages
                        show the courtesy-translation note. PolicyView keeps the old anchors #bestellformular / #patenschaftsformular
                        (OrderForm, SponsorshipView) as aliases of the forms section. Privacy section 11 "Externe Links und soziale
                        Netzwerke" was added when merging (old section 10). AccessibilityView = statement + the practical guide
                        (display functions, keyboard/screen-reader tips, button "Darstellung jetzt anpassen"). Do not add retention
                        periods, contracts or conformance claims that are not documented (see open items in the package handover).
src/data/donation-help.ts + src/components/DonationHelp.astro   seven donor FAQs (native <details>) at the end of the donate pages;
                        the donate page head has quick choices (twingle page, PayPal, #bank). Receipt wording: "auf Wunsch".
src/views/ReportsView.astro   /berichte/ = all reports (audit 09.11.2026): featured latest Jahresbericht, sections Jahresberichte,
                        Transparenzberichte, Projektberichte with cover images (public/images/berichte/<pdf name>.webp = page 1 of the
                        PDF, 480 px; regenerate when a PDF changes) and metadata (PDF · language · size); ITZ ten points below.
                        /downloads/ = forms and flyers only. Brand assets (logos, guidelines) removed from the site (chair, 09.11.2026);
                        files remain in public/downloads/logos/ for partners who have the links.
src/data/downloads.ts   files offered on /downloads and /berichte (live in public/downloads/). Membership forms DE/EN/FR =
                        `membershipForms` (public/downloads/mitgliedschaft/, return address Postfach 120344; versions of 09.11.2026);
                        links carry ?v=<membershipFormVersion> because PDFs are cached 30 days: raise it when a form is replaced.
src/data/impact.ts      verified impact figures + timeline
src/data/events.ts      events page list (past/ongoing events that have no news file): DE/EN/FR, dates 'YYYY[-MM[-DD]]',
                        kind labels, links to project/news; sources = Jahresberichte Inland 2022–2024 / Ausland 2023–2025,
                        project pages. src/lib/events.ts merges them with news `type: event` (eventName, eventKind,
                        `sessions` = single dates of a series) and splits upcoming / ongoing / past-by-year at build time.
                        Rendered by src/views/EventsView.astro (chair, 09.11.2026: all past, current and future events).
src/data/redirects.mjs  old WordPress URLs -> new pages
public/images/projects/p23-91-ediri/  14 photos of the EDIRI pilot 2023 (P 23/91), from the OURS report; children's faces blurred by the
                        chair's editor (09.11.2026), 480 px thumbs for the gallery. Report PDFs DE/EN/FR in public/downloads/berichte/
                        (bantu-ev-ediri-*), built from one HTML template (chair's folder Claude outputs/EDIRI_Bericht_2026-11); texts =
                        OURS progress report 09.11.2023 + Jahresbericht 2023 Ausland. Project front matter `report` (button + side box,
                        `alternates` = other languages) and `galleryTitle`. Downloads group `projectReports`.
public/images/projects/abi-berichte/<report folder>/  photos of the six ABI Uganda reports (chair's package ABI_Uganda_Project_Reports,
                        09.11.2026; edited there: children's faces lightly blurred, six pupil portraits approved). WebP + -480 thumbs,
                        captions/alt from the package. PDFs: public/downloads/berichte/abi-*-report-en.pdf (English only), covers in
                        public/images/berichte/. Pages: nutztiere-und-landwirtschaft (2017 case study added), royal-college-namugongo
                        (school partnership report merged in), new mobilitaetshilfen-uganda-2018, handwerk-frauen-mit-behinderung,
                        rwengoma-primary-schulessen, royal-junior-namugongo-schulgeld. EN body = package text verbatim; DE/FR translated.
                        Facts to keep straight: ABI = Anchored Bridges Initiatives, formerly Ability Beyond the Iris; Royal College
                        Namugongo = secondary and parent school; Royal Junior Namugongo = primary school of the six pupils; approx.
                        7,000 EUR = one shared pool (school partnership, Rwengoma meals, six pupils' fees). Word masters, guides and
                        manifests of the package stay out of the repo.
src/content/projects/{de,en,fr}/<slug>.md   one file per project and language (same file name!)
src/content/news/{de,en,fr}/<slug>.md       news, events (type: event), announcements (pinUntil); optional `photos` (src stem + width/height:
                        <src>.jpg, <src>-800.webp, <src>-<width>.webp in public/images/news/, EXIF/GPS stripped) shown below the text.
                        Coffee cupping report 28.09.2026 (kaffee-cupping-symple-coffee-roasters) is also teased in the shop coffee section.
src/views/*.astro       page templates (take `lang`)
src/pages/**            thin DE routes + /en/ routes that render the views
src/i18n/index.ts       routes per language (de/en/fr), UI strings, main nav (mega menus for the two work areas)
src/lib/alternates.ts   maps every page to its DE/EN/FR versions (language switch DE · EN · FR, hreflang)
(no RSS)                The site has NO RSS feed and no feed information pages (chair, 09.11.2026: misleading for visitors).
                        Former /…/rss.xml and the short-lived follow pages 301-redirect to the news pages (redirects.mjs fileRedirects).
                        "Follow us" = social media only (org.socials: Instagram, Facebook, X, LinkedIn since 09.11.2026) via the SocialLinks component.
src/data/sdgs.ts        SDG names; icons in public/sdg/ (SdgIcons component)
src/lib/schema.ts       JSON-LD @graph (NGO + WebSite on every page; Event nodes from news files with type: event)
public/partners/        partner logos (OrgCard); public/funders/ funder logos
public/images/shop/abantu-coffee/  ABANTU COFFEE label pairs, artwork "Signs of Connection v4" (chair's design pack, 10.11.2026):
                        front = bag mockup abantu-coffee-<slug>-v4-bag-{480,768}.webp + -768.jpg (chair, 10.11.2026: the picture must look
                        like the coffee bag; single bag cut from the pack's studio visualisations, illustrative), back =
                        abantu-coffee-<slug>-v4-back-{480,800,1200}.webp + -800.jpg (complete back label from 06_Back_Labels on the
                        photo's backdrop colour). All 3:4. Shown by
                        components/ProductGallery.astro = front/back viewer in the shop card and on the product page: arrow to the right
                        of the bag turns the pack over in place, image area stays 3:4, "Zur Vorderseite" returns, arrow keys/Escape work, no
                        link to the image file and NO enlarged label page or pop-up (chair's brief). Complete artwork, never cropped.
                        Every back has a QR code to https://www.bantu-ev.org/en/shop/abantu-coffee-<slug>/ : never change a public slug.
                        Label designs, not final retail labels (best-before/batch/roaster fields are empty). Main coffee partner:
                        Balambuli Kwigate Coffee (BKC). Uganda Collection = 12 editions in src/data/coffee.ts. PUBLIC since 10.11.2026
                        (chair: only these four, in this order): 03 Kanungu Forest, 04 Sebei Elgon, 01 Roots & Routes ("coming soon") and
                        09 Nile Highland (label SAMPLE, `sample: true`: no origin/roast/type/supplier, no reservation, not in katalog.json,
                        until the chair confirms the coffee details). The other eight (status 'planned') stay HIDDEN (shop.ts
                        showPlannedEditions = false: no card, no page, no images on the site); their v4 artwork is in the chair's design
                        pack (Mac folder Website/…/Abantu_Coffee_Signs_of_Connection_v4…) for later. NEVER unpack a design pack into the
                        repository: the repo is public on GitHub. Each edition has a story (DE/EN/FR): 2025 "Complete 12-Line Collection"
                        brochure (chair's choice) plus the v4 label notes (section "Das Etikett": sign/motif, what the German back says).
                        Rules (chair's handoff 10.11.2026): do not invent prices, stock, roast levels, suppliers, tasting notes,
                        certifications or donation percentages; aims are aims, not achieved results ("Das sind Ziele, keine erreichten
                        Ergebnisse. Ein fester Anteil pro Packung ist nicht festgelegt."). Adinkra signs (Sankofa, Asase Ye Duru) are
                        Akan references (Ghana), not Ugandan symbols. Cooperatives are "planned partner", never confirmed suppliers.
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
10. **Navigation (chair, 09.11.2026 evening):** main row = Über uns · Inlandsarbeit · Internationale Zusammenarbeit (mega menus: programme → current projects; completed projects only via the archive link `/projekte/#archiv`, `/en/projects/#archive`, `/fr/projets/#archives`) · Wirkung · Mitmachen · Spenden button. Top strip (utility bar) = Einfache Sprache | Aktuelles · Shop · Kontakt · Suche · Barrierefreiheit · DE EN FR. Aktuelles, Shop and Kontakt are `util: true` items in `mainNav`: strip on desktop, burger menu on compact screens, never both (no duplicate contact entry). Labels stay on one line; with enlarged text the compact menu is always used. **Compact header (phones, tablets, < 1280 px or enlarged text; chair 10.11.2026, MSF pattern):** the utility strip is hidden; the header row shows the logo plate (smaller), a gold "Spenden" pill and the "Menü" button (icon switches to a cross, label stays, `aria-expanded`). The menu panel (`#nav-list`, `position: fixed` below the header, scrolls on its own) contains in DOM order: search form (GET `?q=` to the search page) · main items with disclosures · group "Mehr" (Neuigkeiten, Veranstaltungen, Shop, Kontakt = the `util` items, children listed flat) · group "Barrierefrei nutzen und Sprache" (Einfache Sprache, Barrierefreiheit button, DE EN FR). While open, `main`, `footer`, announcement and donate bar are `inert`, Escape closes and returns focus. The header must never get `backdrop-filter`, `filter` or `transform`: it would become the containing block of the fixed panel, which then collapses to a few lines (the iOS bug of 10.11.2026). Region programme pages: `/inlandsarbeit/<programm>/`, `/auslandsarbeit/<programm>/`. Education offers with AfricAvenir: `/bildungsangebote/`.
11. **Contacts:** office +49 (0)30 26934764; mobile +49 176 34213765 only 16:00–20:00, also Signal, Threema, Telegram, WhatsApp (`Phones` component).
12. **Funding logos:** EZ-KPF projects show SNSB + BMZ; P 26/214 (SDG fund) SNSB + BMZ + Engagement Global; P 26/224 (BIKO) SNSB + SenBJF; Ubuntu Talks BA Mitte + MITTEinander aktiv + Club Dialog (logo public/funders/mitteinander-aktiv.webp, cut from the flyer of 12.11.2026). SDG icons on project, programme and area pages.
8. **Accessibility is a core requirement (blind and partially sighted users):** target WCAG 2.2 AA. Semantic HTML and landmarks, one `h1`, no skipped heading levels, alt texts (rule of 11.11.2026: every `<img>` has an `alt` attribute; content images a descriptive German alt text on German pages, in the page language elsewhere; decorative images `alt=""`; decorative SVG icons `aria-hidden`), visible focus, contrast ≥ 4.5:1 in **all three themes** (light, dark, high contrast), targets ≥ 44 px, no hover-only interactions, no autoplay, `lang` on mixed-language text. Colours only via CSS variables in `global.css` (never hard-code text/background colours in components – they break dark/contrast mode). New pages must pass `node` axe check and the reflow check (see below) with text at 150 %.
   - Accessibility toolbar: `src/components/A11yPanel.astro` (text size, dark/high contrast, Atkinson Hyperlegible font, spacing, link highlighting, stop motion, read aloud via on-device speech synthesis). Native modal `<dialog>` rendered at the end of `<body>` by Base.astro (its h2 never precedes the page h1); open it with any button `[data-a11y-toggle] aria-haspopup="dialog"`. Settings live in `localStorage` key `bantu-a11y` and are applied as `data-*` attributes on `<html>`; text size also sets `--font-scale`.
   - Pages: `/barrierefreiheit/` (statement + feedback) and `/einfache-sprache/` (easy read) – keep both up to date when content changes.
9. **Shop:** goods ordering stays off (`features.shopCheckoutOpen = false`) until everything in `docs/03_Rechtliches_und_Shop-Checkliste.md` is done. Symbolic gifts are donations, not sales, and can be ordered now (bank transfer with unique Verwendungszweck). Exactly two server-side scripts exist (shop order form, sponsorship form); never add another or loosen the .htaccess exceptions without the chair's decision.

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
- Reports (11.11.2026): all 33 report PDFs and covers replaced by the redesigned editions (chair's package Bantu_Reports_Redesigned_2026-11-10; same file names, covers 560 × 792). Links to /downloads/berichte/ and /images/berichte/ carry `?v=` + `reportsVersion` (src/data/downloads.ts) because the server caches PDFs and images for 30 days: raise it whenever reports are replaced again. Sizes in downloads.ts and the page counts/sizes in project `report.note` follow the package manifest. Editable masters and review files of the package stay off the website.
- Msingi P 24/200 (11.11.2026): 12 of the 38 edited photos in public/images/projects/msingi-p24-200/ (consent confirmed by the chair, including the parents of the schoolchildren in photo 021); left out: near-duplicates and the party photos with a wine bottle. Photo 007: the gown sleeve read "MUST" (tailor's mistake, meant to be Msingi); the lettering was removed by retouching, not replaced. Final report bantu-ev-msingi-abschlussbericht-2025-de.pdf combines Sachbericht, financial statement and Teil C (20.03.2026); public version without staff names, single salaries, account data or receipt numbers, personnel costs only as one total (chair). Its editable master is kept outside the website.
- Project images P 26/186, P 26/230, P 26/224 (12.11.2026): chair's 8 AI-generated images in public/images/projects/p26-*/ (*.webp 1600 px + -480) as main image + gallery "Bilder zum Projekt". The chair decided (12.11.2026) to show them WITHOUT a "Symbolbild/KI" label because real photos will replace them; the sign beside the Ruziba tower was removed by retouching. Replace with real photos from WIV-HR, ABI and the schools as soon as they arrive (photoBrief kept). The optional field `imageCaption` (figcaption under the main image) stays available.
- P 26/214 "Bildung für alle …?!" (12.11.2026, chair): training days moved to Sa 28.11., 05.12., 12.12., 19.12.2026 (same topics in the same order; first registration deadline Tue 24.11.2026); registration stays by e-mail as on the flyer. Photos in public/images/projects/p26-214-bildung-fuer-alle/ (main image + gallery "Bilder zum Projekt"; event news image = videokonferenz-mit-kampala). Flyer DE/EN/FR (A4, 2 pages) shown as pictures on the event page in the page language (public/images/veranstaltungen/bildung-fuer-alle-2026-flyer-<lang>-seite-<n>), no PDF. Start news of P 26/230, P 26/186, P 26/224 now carry their project's main image (homepage cards).
- Tubman archive (12.11.2026, chair's package Tubman_Network_Website_Update): six historical projects (ubuntu-fuer-alle, fashion-empowerment, safer-spaces-tubman-network, black-engagement-matters, youth-eco-project, NEW parent-circle) carry the chair's attribution "Trägerschaft: Bantu e.V. · Umsetzung: tubman.network" (EN "Legal and administrative project sponsorship: Bantu e.V. · Implementation: tubman.network", FR "Portage juridique et administratif : Bantu e.V. · Mise en œuvre : tubman.network") in the text and in the side box (ProjectView shows a "Trägerschaft" row when fiscalSponsorship is true). ParentCircle IS one of them (the older exclusion is superseded). No blanket "until January 2024" for projects: end dates are project-specific (Towards Safer Spaces 01.04.2023–29.03.2024, Robert Bosch grant). Images: public/images/projects/tubman-network/<slug>/{photos,thematic}/ (WebP + -thumb.webp; the package's JPEG copies and archive posters were not published). Galleries: section "Thematische Motive / Thematic illustrations / Images thématiques" (3 per priority page) without an explanatory note (chair, 12.11.2026: the note "The images are thematic illustrations and do not depict documented project participants or events." was removed everywhere; the `galleryNote` field stays available but unused); the chair does not want them labelled as AI-made. Never present thematic images as photos of real participants, dates or the BEM training/conference. Unsupported figures removed (Ubuntu 1,800; BEM 10 resource persons / 30 organisations) from project pages, impact.ts and events.ts. Package evidence notes, manifests, reports and extended archive stay outside the repo. No parental consent for the children in the Tubman photos (chair, 12.11.2026): FashionEmpowerment, Ubuntu/Equal Rights and Safer Spaces show ONLY the three thematic images each (main image, card and gallery "Einblicke in die Projektthemen"), like Black Engagement Matters and ParentCircle; the package's documentary photos of these projects are not on the website. YouthECO keeps its 4 conference photos (adults). Thematic images carry no dates.
- Funding box (12.11.2026, chair): FundingNote = section "Förderung und Dank / Funding and thanks / Financement et remerciements" at the end of every project page that has funders: funder logos LARGE on a white plate (72 to 104 px high), the contractual fundingNote unchanged, then a thank-you sentence naming the funders. Logos added for DSEE, Deutsche Fernsehlotterie, Robert Bosch Stiftung, BA Mitte (Tubman projects), Engagement Global + BMZ (Okushoma kwa Boona), Aktion Tagwerk (Royal College, Royal Junior, Rwengoma). OPEN: EU / Erasmus+ emblem for YouthECO (no official file in the repo). BMZ, Engagement Global and Club Dialog logo files were trimmed of white margins only.
- Figures check (12.11.2026): Tubman.Network was founded after 24.02.2022 (Tätigkeitsbericht tubman.network 2022), so Bantu's Trägerschaft runs 2022–2024 (timeline, people.ts, programmes.ts); ABI partnership since 2017 everywhere (sponsorship page, ABI news); Ruziba's 900 people are a target, not a result.
- Meta descriptions: German main pages (/, /programme/, /projekte/, /wirkung/, /spenden/, /mitmachen/, /inlandsarbeit/, /auslandsarbeit/, /einfache-sprache/, /shop/, /kontakt/) take theirs from `src/data/meta-descriptions.ts` (120 to 155 characters, unique, no dashes as punctuation); all other pages use the view's description.
- Donations: twingle form (`org.donation` in `src/data/site.ts`), two-click loading on `/spenden/`. Language (chair, 10.11.2026): hosted links get `?tw_lang=de|en|fr` and the widget script is loaded as `…/widget/<id>?tw_lang=<lang>` with script id `tw-<id>` (letters/digits only; twingle finds its container through that id once the address carries a query) (DonateView), so twingle matches the page language. Payment methods in the twingle form (project configuration read on the live form, 10.11.2026 afternoon, after the chair finished the twingle settings): one-off = SEPA direct debit, PayPal, credit card (via PayPal), Google Pay (via PayPal), Apple Pay (via Stripe), bank transfer; recurring = SEPA, PayPal, credit card (via PayPal), Google Pay and Apple Pay (via Stripe). Wallets appear only on supported devices. Amount buttons 25/50/100 EUR + custom. Opt-in public supporters list. twingle legal links point to /datenschutz/ and /impressum/. Donor self-service: `org.donation.selfServiceUrl` (labelled link in the online panel, receipt panel and FAQ). Recheck the form's payment_methods before changing payment wording; the website never names a method that the form does not offer. Trust line under the page head (gemeinnützig + Freistellungsbescheid date, receipt, reports, ITZ). PayPal: hosted donate button of the Bantu e.V. business account (`org.paypalUrl`, hosted_button_id DHB93M2JA5ZKQ, chair 09.11.2026) as a plain link in the "Online spenden" panel, opening in a new tab; no PayPal script on our pages.

## Backlog (in priority order)
1. **By 13.11.2026:** P 26/224 project page is live on bantu-ev.org since 07.11.2026 – still add the Land Berlin logo and the confirmed schools (BIKO contract no. 9).
2. Photos: old-site photos reviewed 07.11.2026 (most are stock images or portraits of former team members – not reused); Ruhaama sign photo imported. WordPress backup on the server: `~/wordpress_backup_2026-11-07/`.
3. Policies (10.11.2026 package): set twingle's privacy link to https://www.bantu-ev.org/datenschutz/#twingle in the twingle admin; confirm log/backup retention, twingle processing agreement, Google Forms terms, VAT/W-IdNr. (only if issued), newest Freistellungsbescheid, donor-data sharing with partners; then update `policy-content.ts`.
4. Add the EZ-KPF funding sentence (P 26/230, P 26/186). Ubuntu Talks logos done 12.11.2026 (BA Mitte, MITTEinander aktiv, Club Dialog).
   Ubuntu Talks (12.11.2026): registration = Google Form https://forms.gle/fBRsqho22GvvBTL1A (privacy section 10 covers Google Forms; e-mail/phone stay as alternatives). Flyer shown as pictures only (chair, 12.11.2026: no PDF): front/back in public/images/veranstaltungen/ (<stem>.jpg = 300 dpi full size, linked; -800/-1240 webp), on the event page via news front matter `flyer` (section #flyer, button "Flyer ansehen"); the project page links there. Illustration = public/images/ubuntu-talks-2026-illustration.webp (new flyer art; the old "Woven Together" illustration was removed). Print files (3 mm bleed, A3 poster) stay off the site.
5. Real photos per `docs/04_Foto-Briefing.md`; replace placeholders (`image`, `imageAlt` in front matter).
6. Board: confirm registration of the new board at the Amtsgericht; collect consented photos/short bios.
7. Shop: legal/tax checklist, prices, product photos, Stripe Payment Links → `checkoutUrl`, then `shopCheckoutOpen = true`; add AGB/Widerruf pages.
8. After 22.11.2026 (date corrected from 15.11. on 07.11.2026): turn Ubuntu Talks into a review (status completed, photos with consent, results).
9. Optional: a privacy-friendly form backend (`features.formEndpoint`), newsletter, Decap CMS for non-technical editing.
- Report corrections (12.11.2026, chair's audit Financial_Report_Audit_2026-11-12, F01–F39): all 34 report PDFs re-rendered from the corrected masters (masters, audit, correction log and backups stay OFF the website, in the chair's folder Website/Financial_Report_Audit_2026-11-12/Korrektur_2026-11-12). Each corrected report has a "Correction notice / Korrekturhinweis · 12 November 2026" box after the overview. Rules now in force: unresolved figures are shown "as originally published; under reconciliation / in Abstimmung", never replaced by a guessed figure (2020 income/membership, 2023 totals, 2024/2025 totals, Msingi final expenditure, Ubuntu €1,375.97 and Ruhaama €9.78 financing gaps, EDIRI one cent, Mama Circle €90k basis, ParentCircle funder). Established facts used: Ruhaama 225 participants (target 200) / 175 certificates / 350 pupils (Sachbericht P 22/29, 30.05.2024); phase 1 P 21/23 set up and opened 2021–2022; Mama Circle funding period extended to 31.07.2024 (RBS letter 14.03.2024), total costs €110,458.12 (FP-VN 21.11.2025); Okushoma ≈22 months; Msingi "24 scheduled project weeks", Schmitz-Stiftungen = co-sponsor of the EZ-Kleinprojektefonds (no separate amount); HIV 14.4 % = Mbarara district, adults 15–49, 2022 estimate (UAC factsheet 2023). The 2023 donor split (≈82 % BMZ) is withdrawn. Filing status: covering letter 22.05.2026, no receipt on file (status 12.11.2026); never write "will be filed by 31.07.2026". abi-women-and-crafts-report-en-v2.pdf renamed to abi-women-and-crafts-report-en.pdf (301 in fileRedirects). reportsVersion 20261112.
- Financial reports UNPUBLISHED (chair, 12.11.2026, after the corrections): all 24 annual and transparency report PDFs 2020–2025 and their covers removed from the site; old PDF URLs 301 to /berichte/ (DE) or /en/reports/ (EN). /berichte/ shows "Transparenz- und Finanzberichte folgen in Kürze / Transparency and finance reports coming soon / Les rapports de transparence et les rapports financiers arrivent bientôt"; ITZ points 5, 7, 8, 10 and the donate, impact, sponsorship, partners and downloads pages say the same. Project reports (Msingi, EDIRI, ABI) stay online. To republish: restore the ...report(<year>) entries in downloads.ts, the PDFs (public/downloads/berichte/) and covers (public/images/berichte/), remove the redirects and the coming-soon texts. Corrected masters: chair's folder Financial_Report_Audit_2026-11-12/Korrektur_2026-11-12.
