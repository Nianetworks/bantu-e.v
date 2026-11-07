import fitz,json,os,sys
jobs=json.load(open(sys.argv[1]))
for j in jobs:
    full=fitz.open(j['pdf'].replace('.pdf','.full.pdf')); body=fitz.open(j['pdf'].replace('.pdf','.body.pdf'))
    out=fitz.open(); out.insert_pdf(full,from_page=0,to_page=0); out.insert_pdf(body); out.insert_pdf(full,from_page=len(full)-1,to_page=len(full)-1)
    t={'de':'Jahresbericht','en':'Annual Report'}[j['lang']]
    out.set_metadata({'title':f"Bantu e.V. {t} {j['year']}",'author':'Bantu e.V.','subject':f"{t} {j['year']}",'creator':'Bantu e.V.','producer':'Bantu e.V.'})
    out.save(j['pdf'],garbage=3,deflate=True)
    os.remove(j['pdf'].replace('.pdf','.full.pdf')); os.remove(j['pdf'].replace('.pdf','.body.pdf'))
    print(os.path.basename(j['pdf']),len(out),'pages',os.path.getsize(j['pdf'])//1024,'KB')
