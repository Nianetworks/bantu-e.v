// Accessibility check: serve dist/ on http://localhost:4321 (e.g. npx astro preview --port 4321), then: node scripts/check-a11y.cjs
// Requires: npm i -D axe-core playwright
const { chromium } = require('playwright');
const fs = require('fs');
const axeSrc = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const pages = ['/', '/ueber-uns/', '/menschen/', '/programme/', '/programme/internationale-zusammenarbeit/', '/projekte/', '/projekte/p26-224-erde-saat-erbe/', '/projekte/p26-214-bildung-fuer-alle/', '/aktuelles/', '/aktuelles/ubuntu-talks-15-11-2026/', '/veranstaltungen/', '/wirkung/', '/berichte/', '/downloads/', '/shop/', '/shop/abantu-coffee-roots-and-routes/', '/spenden/', '/mitmachen/', '/kontakt/', '/impressum/', '/datenschutz/', '/barrierefreiheit/', '/einfache-sprache/', '/en/', '/en/projects/p26-230-pearl-kita-kampala/', '/en/accessibility/'];
(async () => {
  const b = await chromium.launch();
  const summary = {};
  for (const theme of ['light', 'dark', 'contrast']) {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.addInitScript((th) => { try { localStorage.setItem('bantu-a11y', JSON.stringify({ theme: th })); } catch (e) {} }, theme);
    const p = await ctx.newPage();
    for (const u of pages) {
      if (theme !== 'light' && !['/', '/projekte/p26-224-erde-saat-erbe/', '/spenden/', '/shop/', '/barrierefreiheit/', '/aktuelles/'].includes(u)) continue;
      await p.goto('http://localhost:4321' + u, { waitUntil: 'load' });
      await p.addScriptTag({ content: axeSrc });
      const res = await p.evaluate(async () => await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
      for (const v of res.violations) {
        const key = `${theme} | ${v.id} (${v.impact})`;
        summary[key] = summary[key] || { pages: new Set(), help: v.help, sample: v.nodes[0]?.target?.join(' ') + ' :: ' + (v.nodes[0]?.failureSummary || '').slice(0, 160) };
        summary[key].pages.add(u);
      }
    }
    await ctx.close();
  }
  for (const [k, v] of Object.entries(summary)) console.log(k, '\n   ', v.help, '\n    pages:', [...v.pages].join(', '), '\n    e.g.', v.sample);
  if (!Object.keys(summary).length) console.log('axe: no violations');
  await b.close();
})();
