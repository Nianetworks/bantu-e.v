import re,os,sys,html,base64,json
import os
S=os.environ.get('AR_DIR','./annual-reports-work/')  # folder with html/ (pandoc output of the transparency report .docx files) and out/
R=os.environ.get('REPO','./')
F=R+'node_modules/@fontsource/'
def b64(p): return base64.b64encode(open(p,'rb').read()).decode()
fonts=f"""
@font-face{{font-family:'Noto Serif';font-weight:400;src:url(data:font/woff2;base64,{b64(F+'noto-serif/files/noto-serif-latin-400-normal.woff2')}) format('woff2')}}
@font-face{{font-family:'Noto Serif';font-weight:700;src:url(data:font/woff2;base64,{b64(F+'noto-serif/files/noto-serif-latin-700-normal.woff2')}) format('woff2')}}
@font-face{{font-family:'Archivo';font-weight:400;src:url(data:font/woff2;base64,{b64(F+'archivo/files/archivo-latin-400-normal.woff2')}) format('woff2')}}
@font-face{{font-family:'Archivo';font-weight:400;font-style:italic;src:url(data:font/woff2;base64,{b64(F+'archivo/files/archivo-latin-400-italic.woff2')}) format('woff2')}}
@font-face{{font-family:'Archivo';font-weight:600;src:url(data:font/woff2;base64,{b64(F+'archivo/files/archivo-latin-600-normal.woff2')}) format('woff2')}}
@font-face{{font-family:'Archivo';font-weight:700;src:url(data:font/woff2;base64,{b64(F+'archivo/files/archivo-latin-700-normal.woff2')}) format('woff2')}}
"""
logo='data:image/png;base64,'+b64(R+'public/brand/bantu-logo.png')
H2=re.compile(r'^(Worte|A Message|Message|Grußwort|Ein Wort|Vorwort|Introduction|Einleitung|Einführung|Known Project Finances|Bekannte Projektfinanzen|Finan|Projektfinanzen|Domestic|Inland|Overseas|Ausland|Project Overview|Projektübersicht|Transparen|Outlook|Ausblick|Aktivit|Projects|Projekte |Overview|Überblick|Activities|Tätigkeit|Partners|Partner|Highlights|Fazit|Conclusion)',re.I)
MON=r'(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec|Januar|Februar|März|Juni|Juli|Oktober|Dezember|Mär|Okt|Dez)\.?'
def undash(t,head=False):
    t=re.sub(r'(\d[\d.,:/]*)\s+[–—-]\s+(\d)',r'\1–\2',t)
    t=re.sub(r'('+MON+r'(?:\s\d{4})?)\s+[–—-]\s+('+MON+')',r'\1–\2',t)
    t=re.sub(r'\s+[–—]\s+|\s+-\s+',': ' if head else ', ',t)
    t=t.replace('—',', ')
    return t
def transform(src,lang,year):
    s=open(src,encoding='utf-8').read()
    s=re.sub(r'<img[^>]*>','',s)
    s=re.sub(r'<colgroup>.*?</colgroup>','',s,flags=re.S)
    paras=re.split(r'(?=<p>|<table>|<ul>|<ol>|<blockquote>)',s)
    out=[]; started=False; skip_after_sig=0
    for blk in paras:
        if not blk.strip(): continue
        m=re.match(r'<p>(?:<em>)?<strong>(.*?)</strong>(?:</em>)?</p>\s*$',blk.strip(),re.S)
        text=html.unescape(re.sub('<[^>]+>','',blk)).strip()
        if not started:
            if m and H2.match(html.unescape(m.group(1))) and not text.isupper(): started=True
            else: continue
        if '_____' in text:
            out.append('<p class="signed">'+('Unterzeichnet vom Vorstand' if lang=='de' else 'Signed by the Board')+'</p>'); skip_after_sig=2; continue
        if skip_after_sig and (text.startswith('Boaz Murinzi Murema') or text in ('Vorstand','Executive Director') or text.startswith('Executive Director')):
            skip_after_sig-=1; continue
        if m and len(text)<140 and (text.isupper() and 'TRANSPAREN' in text.upper()):
            continue
        if m and len(text)<140 and (text.rstrip().endswith(',') or text.startswith('Boaz Murinzi Murema') or text in ('Vorstand','Executive Director')):
            out.append('<p class="letter">'+html.escape(undash(html.unescape(m.group(1))))+'</p>'); continue
        if m and len(text)<140:
            t=undash(html.unescape(m.group(1)),True)
            t=re.sub(r'\s*[:,]?\s*(Transparency Report|Transparenzbericht)\s*\d{4}\s*$','',t)
            tag='h2' if H2.match(t) else 'h3'
            out.append(f'<{tag}>{html.escape(t)}</{tag}>'); continue
        blk=re.sub(r'>([^<]+)<',lambda mm:'>'+undash(mm.group(1))+'<',blk)
        out.append(blk)
    body='\n'.join(out)
    body=re.sub(r'<ol[^>]*>\s*<li>(?:<p>)?(Vorstand|Executive Director)(?:</p>)?</li>\s*</ol>',r'<p class="letter-role">\1</p>',body)
    # first message heading -> letter styling
    return body
T={'de':{'title':'Jahresbericht','sub':'Tätigkeit, Projekte und Finanzen','legal':'Bantu-Vereinigung für globale Bildung, Gerechtigkeit und Zusammenarbeit e.V.','claim':'Gemeinsam bauen wir nachhaltige und selbstbestimmte Gemeinschaften.','contents':'Inhalt','back':['Kontakt','Vereinsregister','Gemeinnützigkeit','Spendenkonto'],'reg':'Amtsgericht Charlottenburg, VR 37606 B','tax':'Finanzamt für Körperschaften I, Berlin · Steuernummer 27/661/53393','note':'Grundlage dieses Berichts ist der Transparenzbericht {y} von Bantu e.V. nach den Kriterien der Initiative Transparente Zivilgesellschaft. Gestaltung nach den Brand & Corporate Design Guidelines v2.1 (November 2026).','donate':'Spenden sind steuerlich absetzbar. Zuwendungsbestätigungen auf Anfrage.','foot':'Jahresbericht'},
   'en':{'title':'Annual Report','sub':'Activities, projects and finances','legal':'Bantu Association for Global Education, Justice and Cooperation e.V.','claim':'Together, We Build Sustainable and Empowered Communities.','contents':'Contents','back':['Contact','Register of associations','Non-profit status','Donations'],'reg':'Amtsgericht Charlottenburg (Berlin), VR 37606 B','tax':'Finanzamt für Körperschaften I, Berlin · tax number 27/661/53393','note':'This report is based on the {y} Transparency Report of Bantu e.V., following the criteria of the Transparent Civil Society Initiative. Design based on the Brand & Corporate Design Guidelines v2.1 (November 2026).','donate':'Donations are tax-deductible in Germany. Donation receipts on request.','foot':'Annual Report'}}
CSS=open(S+'style.css').read()
def page(lang,year,body):
    t=T[lang]
    heads=re.findall(r'<h2>(.*?)</h2>',body)
    toc=''.join(f'<li><span class="n">{i+1:02d}</span>{h}</li>' for i,h in enumerate(heads))
    return f"""<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><title>{t['title']} {year} · Bantu e.V.</title><style>{fonts}{CSS}</style></head><body>
<section class="cover">
  <div class="cover__rings" aria-hidden="true">{''.join(f'<span style="border-color:{c}"></span>' for c in ['#ff343d','#ff8409','#3cb04b','#0071bc','#ff6c71','#c180a1','#749bca','#b9e245'])}</div>
  <img class="cover__logo" src="{logo}" alt="Bantu e.V.">
  <div class="cover__text">
    <p class="cover__eyebrow">Bantu e.V. · Berlin</p>
    <h1>{t['title']}<span>{year}</span></h1>
    <p class="cover__sub">{t['sub']}</p>
  </div>
  <div class="cover__foot"><p class="claim">{t['claim']}</p><p>{t['legal']}</p></div>
</section>
<section class="toc"><h2 class="toc__h">{t['contents']}</h2><ol>{toc}</ol>
<p class="toc__note">{t['note'].format(y=year)}</p></section>
<main class="content">{body}</main>
<section class="back">
  <img src="{logo}" alt="" class="back__logo">
  <div class="back__grid">
   <div><h4>{t['back'][0]}</h4><p>Kameruner Str. 1<br>13351 Berlin<br>Postfach 120344, 10593 Berlin<br>info@bantu-ev.org<br>www.bantu-ev.org<br>+49 (0)30 26934764</p></div>
   <div><h4>{t['back'][1]}</h4><p>{t['reg']}</p><h4>{t['back'][2]}</h4><p>{t['tax']}</p></div>
   <div><h4>{t['back'][3]}</h4><p>GLS Gemeinschaftsbank eG<br>IBAN DE47 4306 0967 1035 6810 00<br>BIC GENODEM1GLS</p><p class="small">{t['donate']}</p></div>
  </div>
  <p class="back__claim">{t['claim']}</p>
</section>
</body></html>"""
jobs=[]
for y in range(2020,2026):
    for lang,fn,out in (('de',f'Bantu_eV_Transparenzbericht_{y}_Website.html',f'bantu-ev-jahresbericht-{y}-de'),('en',f'Bantu_eV_TransparencyReport_{y}_Website.html',f'bantu-ev-annual-report-{y}-en')):
        body=transform(S+'html/'+fn,lang,y)
        full=page(lang,y,body)
        open(S+'out/'+out+'.html','w',encoding='utf-8').write(full)
        cov=full.replace('@page { size: A4; margin: 20mm 0 22mm; }','@page { size: A4; margin: 0; }')
        cov=re.sub(r'<section class="toc">.*?</main>','',cov,flags=re.S)
        open(S+'out/'+out+'.full.html','w',encoding='utf-8').write(cov)
        bod=re.sub(r'<section class="cover">.*?</section>\s*<section class="toc">','<section class="toc">',full,flags=re.S)
        bod=re.sub(r'<section class="back">.*?</section>','',bod,flags=re.S)
        open(S+'out/'+out+'.body.html','w',encoding='utf-8').write(bod)
        jobs.append({'html':S+'out/'+out+'.html','pdf':S+'out/'+out+'.pdf','lang':lang,'year':y,'foot':T[lang]['foot']})
json.dump(jobs,open(S+'jobs.json','w'))
print(len(jobs),'html written')
