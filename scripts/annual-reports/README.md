# Annual reports and transparency reports (PDF)

Annual reports 2020–2025 (DE/EN) in the brand design (Guidelines v2.1: Noto Serif / Archivo, gold, green, blue,
original stacked logo) are generated from the public transparency reports (Word files in
`01_Governance…/01_Gründung_&_Vereinsregister/<year>/Bantu_eV_Transparen*_Website.docx`).

1. `pandoc <file>.docx -t html5 --wrap=none -o $AR_DIR/html/<file>.html` for each report
2. `AR_DIR=… REPO=. python3 scripts/annual-reports/build.py` (writes HTML + jobs.json to `$AR_DIR/out`)
3. `node scripts/annual-reports/print.cjs $AR_DIR/jobs.json` and `python3 scripts/annual-reports/merge.py $AR_DIR/jobs.json`
4. Copy the PDFs to `public/downloads/berichte/` and list them in `src/data/downloads.ts`.

`unsign.py` (PyMuPDF) replaces the signature line of the transparency reports with
"Unterzeichnet vom Vorstand" / "Signed by the Board" (instruction of the chair, 07.11.2026).
