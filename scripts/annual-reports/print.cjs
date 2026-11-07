const { chromium } = require('playwright');
const jobs = require(process.argv[2]);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  for (const j of jobs) {
    await p.goto('file://' + j.html.replace('.html', '.full.html'), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.pdf({ path: j.pdf.replace('.pdf', '.full.pdf'), printBackground: true, preferCSSPageSize: true });
    await p.goto('file://' + j.html.replace('.html', '.body.html'), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.pdf({ path: j.pdf.replace('.pdf', '.body.pdf'), printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `<div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:7.5pt;color:#6b6457;padding:0 22mm;display:flex;justify-content:space-between"><span>Bantu e.V. · ${j.foot} ${j.year}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
      tagged: true, outline: true });
  }
  await b.close();
})();
