import fitz,sys,glob,os
out=sys.argv[1]; os.makedirs(out,exist_ok=True)
for f in sorted(glob.glob('*.pdf')):
    de='-de.pdf' in f
    doc=fitz.open(f); done=False
    for page in doc:
        hits=page.search_for('_______________________________')
        if not hits: continue
        U=hits[-1]
        lines=[]
        for b in page.get_text('dict')['blocks']:
            for l in b.get('lines',[]):
                txt=''.join(s['text'] for s in l['spans']).strip()
                if txt and U.y1-1 < l['bbox'][1] < U.y1+75: lines.append((fitz.Rect(l['bbox']),txt,l['spans'][0]))
        size=lines[0][2]['size'] if lines else 11
        page.add_redact_annot(U+(-2,-2,2,2))
        reinsert=[]
        for r,txt,sp in lines:
            if txt.startswith('Boaz Murinzi Murema') or txt in ('Vorstand','Executive Director') or txt.startswith('Executive Director –'):
                page.add_redact_annot(r+(-1,-1,1,1))
                if txt.startswith('Executive Director –'): reinsert.append((r, txt.split('–',1)[1].strip(), sp))
        page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)
        label='Unterzeichnet vom Vorstand' if de else 'Signed by the Board'
        page.insert_text((U.x0, U.y1-2), label, fontname='hebo', fontsize=size+0.5, color=(0,0,0))
        for r,txt,sp in reinsert:
            page.insert_text((r.x0, r.y1-2), txt, fontname='helv', fontsize=sp['size'], color=(0,0,0))
        done=True
    doc.save(os.path.join(out,f),garbage=3,deflate=True)
    print(f,'ok' if done else 'NO SIGNATURE FOUND')
