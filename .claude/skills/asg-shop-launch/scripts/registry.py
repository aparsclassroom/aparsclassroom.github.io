"""List every shop page that defines product config.

Usage: python3 .claude/skills/asg-shop-launch/scripts/registry.py shop [| grep 28]
For each index.html it follows the local <script src> tags (skipping shared /shop/assets libs),
pulls product/productCode*/fix/pls*/Platform* globals and prints one line per page.
"""
import os, re, sys

SHOP = sys.argv[1] if len(sys.argv) > 1 else 'shop'
pat = re.compile(r'\b(?:const|let|var)\s+(product2?|productName2?|productCode\d?|fix|pls2?|Platform2?)\s*=\s*["\']?([^"\';\n]+)["\']?')
SKIP = {'script.js', 'key.js', 'count.js', 'sweetalert.min.js', 'swiper-bundle.min.js', 'course-total-enrollment.js'}

rows = []
for dp, dn, fn in os.walk(SHOP):
    if 'index.html' not in fn:
        continue
    html = open(os.path.join(dp, 'index.html'), encoding='utf-8', errors='ignore').read()
    srcs = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html)
    vals, used = {}, []
    for s in srcs:
        s = s.split('?')[0]
        if s.startswith('http') or s.startswith('//'):
            continue
        if s.startswith('/shop/'):
            p = os.path.join(SHOP, s[len('/shop/'):])
        elif s.startswith('/'):
            continue
        else:
            p = os.path.normpath(os.path.join(dp, s))
        if not os.path.isfile(p):
            continue
        if os.path.basename(p) in SKIP and os.path.dirname(p).startswith(os.path.join(SHOP, 'assets')):
            continue
        code = open(p, encoding='utf-8', errors='ignore').read()
        code = re.sub(r'(?m)^\s*//.*$', '', code)
        hit = False
        for m in pat.finditer(code):
            if m.group(1) not in vals:
                vals[m.group(1)] = m.group(2).strip()
                hit = True
        if hit or '/init' in code:
            used.append(os.path.relpath(p, dp))
    if 'productCode' in vals or 'product' in vals:
        rows.append((os.path.relpath(dp, SHOP), vals, used))

rows.sort()
for d, v, u in rows:
    books = 'BOOKS' if v.get('product2') else ''
    print(f"{d} | {v.get('product','')} {('/ ' + v['product2']) if v.get('product2') else ''} | code {v.get('productCode','')}{(',' + v['productCode2']) if v.get('productCode2') else ''} | fix {v.get('fix','')} pls {v.get('pls','')}{(' pls2 ' + v['pls2']) if v.get('pls2') else ''} | {books} | {' '.join(u)}")
