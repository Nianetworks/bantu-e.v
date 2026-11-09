// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { wordpressRedirects } from './src/data/redirects.mjs';

// SITE_URL / BASE_PATH are set by the GitHub Actions workflow.
// - Custom domain live (www.bantu-ev.org): BASE_PATH=/
// - Preview on <user>.github.io/<repo>/: BASE_PATH=/<repo>
const SITE = process.env.SITE_URL || 'https://www.bantu-ev.org';
const BASE = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Old WordPress URLs -> new pages (static meta-refresh redirects, works on GitHub Pages)
  redirects: wordpressRedirects,
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE', en: 'en-GB' } },
      // No 404 page and no search pages (they carry noindex; Pagefind builds its own index) in the sitemap.
      filter: (page) => !page.includes('/404') && !/\/(suche|search|recherche)\/$/.test(page),
    }),
  ],
});
