# CLAUDE.md – Website Bantu e.V. (www.bantu-ev.org)

Operating manual for Claude Code. Read this first, then `docs/01_Relaunch-Plan.md`.

## What this is
Static, bilingual (DE default, EN under `/en/`) website of **Bantu-Vereinigung für globale Bildung, Gerechtigkeit und Zusammenarbeit e.V.**, Berlin. Replaces the old WordPress/Elementor site (last edited 2023). Built with **Astro 7** (pinned in package.json), deployed by **GitHub Actions → GitHub Pages**. No server, no database, no cookies, no tracking, no external fonts/CDNs.

## Commands
```bash
npm ci                 # install (Node >= 22.23)
npm run dev            # local dev server http://localhost:4321
npm run build          # astro build + postbuild clean-up (dist/)
npm run check:open     # list all "OPEN:" items (content still to confirm)
npm run migrate:wp     # one-off export of the old WordPress pages + media into migration/
```
Preview build under a sub-path: `BASE_PATH=/bantu-ev-website npm run build`.

## Structure
```
src/data/site.ts        legal facts, contacts, bank, board, feature switches (shopCheckoutOpen, formEndpoint)
src/data/people.ts      people (consent flag!), partner organisations, funders
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
3. **Board:** decision of 07.11.2026 – show only the chair (Boaz Murinzi Murema) until the new board is elected and registered. Add new members only with written consent.
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
Push to `main` → workflow `.github/workflows/deploy.yml` builds and publishes. Nightly rebuild at 03:17 UTC keeps "upcoming events" current. Without the repo variable `CUSTOM_DOMAIN` the site is published as a preview at `https://<owner>.github.io/<repo>/`; set `CUSTOM_DOMAIN=www.bantu-ev.org` when switching DNS (see `docs/02_Go-Live_GitHub-Pages_DNS.md`).

## Backlog (in priority order)
1. **By 13.11.2026:** P 26/224 project page live on bantu-ev.org (BIKO contract no. 9 – otherwise 15 % repayment). Add the Land Berlin logo and the confirmed schools. If DNS cannot be switched in time, publish the same text on the old WordPress site as an interim page.
2. Run `npm run migrate:wp`, pick usable photos from the old site (with consent), add them to projects/people.
3. Go-live DNS switch (keep e-mail/MX untouched!).
4. Add logos for MITTEinander aktiv / Bezirksamt Mitte (Ubuntu Talks) and EZ-KPF funding sentence (P 26/230, P 26/186).
5. Real photos per `docs/04_Foto-Briefing.md`; replace placeholders (`image`, `imageAlt` in front matter).
6. New board on /menschen and in `site.ts` once registered.
7. Shop: legal/tax checklist, prices, product photos, Stripe Payment Links → `checkoutUrl`, then `shopCheckoutOpen = true`; add AGB/Widerruf pages.
8. After 15.11.2026: turn Ubuntu Talks into a review (status completed, photos with consent, results).
9. Optional: a privacy-friendly form backend (`features.formEndpoint`), newsletter, Decap CMS for non-technical editing.
