// Old WordPress/Elementor URLs (bantu-ev.org until 2026) -> new structure.
// Source: wp-sitemap.xml of the old site, checked 07.11.2026.
// GitHub Pages has no server redirects; Astro writes small HTML pages with
// <meta http-equiv="refresh"> + canonical link for each entry.
export const wordpressRedirects = {
  // English pages (old default language)
  '/about-bantu': '/en/about/',
  '/our-name': '/en/about/#name',
  '/our-story': '/en/about/#story',
  '/our-vision-mission-and-values': '/en/about/#mission',
  '/structure-and-people': '/en/people/',
  '/board': '/en/people/',
  '/team': '/en/people/',
  '/our-volunteers': '/en/people/',
  '/allies-and-partners': '/en/people/#partners',
  '/join-us': '/en/get-involved/',
  '/membership': '/en/get-involved/#membership',
  '/become-a-volunteer': '/en/get-involved/#volunteer',
  '/contact-us': '/en/contact/',
  '/donate': '/en/donate/',
  '/programs': '/en/programmes/',
  '/contact': '/en/contact/',
  '/imprint-and-data-privacy': '/en/imprint/',
  // Programme pages of the first relaunch version (two programmes, until 07.11.2026)
  '/programme/inlandsarbeit': '/inlandsarbeit/',
  '/en/programmes/work-in-germany': '/en/work-in-germany/',
  '/programme/internationale-zusammenarbeit': '/auslandsarbeit/',
  '/en/programmes/international-cooperation': '/en/international-cooperation/',
  // German pages (old /de/ prefix)
  '/de': '/',
  '/de/home-de': '/',
  '/de/uber-bantu': '/ueber-uns/',
  '/de/uber-bantu/unser-name': '/ueber-uns/#name',
  '/de/uber-bantu/unsere-geschichte': '/ueber-uns/#geschichte',
  '/de/uber-bantu/vision-mission-ziele-verte': '/ueber-uns/#mission',
  '/de/uber-bantu/struktur-und-menschen': '/menschen/',
  '/de/uber-bantu/partnerinnen': '/menschen/#partner',
  '/de/mitmachen': '/mitmachen/',
  '/de/kontakt': '/kontakt/',
  '/de/spenden': '/spenden/',
  // Ubuntu Talks moved from 15.11. to 22.11.2026 (correction by the chair, 07.11.2026): old event URLs
  '/aktuelles/ubuntu-talks-15-11-2026': '/aktuelles/ubuntu-talks-22-11-2026/',
  '/en/news/ubuntu-talks-15-11-2026': '/en/news/ubuntu-talks-22-11-2026/',
  '/fr/actualites/ubuntu-talks-15-11-2026': '/fr/actualites/ubuntu-talks-22-11-2026/',
  // Gift donations moved from the shop to the donate page (chair, 08.11.2026)
  '/shop/geschenk-pearl-kita': '/spenden/geschenk-pearl-kita/',
  '/shop/geschenk-wasser-ruziba': '/spenden/geschenk-wasser-ruziba/',
  '/shop/geschenk-bildung': '/spenden/geschenk-bildung/',
  '/en/shop/geschenk-pearl-kita': '/en/donate/geschenk-pearl-kita/',
  '/en/shop/geschenk-wasser-ruziba': '/en/donate/geschenk-wasser-ruziba/',
  '/en/shop/geschenk-bildung': '/en/donate/geschenk-bildung/',
  '/fr/boutique/geschenk-pearl-kita': '/fr/faire-un-don/geschenk-pearl-kita/',
  '/fr/boutique/geschenk-wasser-ruziba': '/fr/faire-un-don/geschenk-wasser-ruziba/',
  '/fr/boutique/geschenk-bildung': '/fr/faire-un-don/geschenk-bildung/',
};

// Files that no longer exist -> page with the current information. Only for the Apache server (.htaccess),
// not for the Astro meta-refresh pages (those cannot replace a PDF path).
export const fileRedirects = {
  '/downloads/flyer/ubuntu-talks-15-11-2026-flyer.pdf': '/aktuelles/ubuntu-talks-22-11-2026/',
  // RSS removed on the chair's instruction (09.11.2026): former feeds and the short-lived info pages lead to the news pages.
  '/aktuelles/rss.xml': '/aktuelles/',
  '/en/news/rss.xml': '/en/news/',
  '/fr/actualites/rss.xml': '/fr/actualites/',
  '/aktuelles/abonnieren': '/aktuelles/',
  '/en/news/follow': '/en/news/',
  '/fr/actualites/suivre': '/fr/actualites/',
};
