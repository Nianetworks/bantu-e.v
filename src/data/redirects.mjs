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
  '/programme/inlandsarbeit': '/programme/',
  '/en/programmes/work-in-germany': '/en/programmes/',
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
};
