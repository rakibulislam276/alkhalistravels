#!/usr/bin/env node
/* ================================================================
   Collect every translatable English string on the site.
     node tools/i18n/extract.js            -> static HTML + JS source scan
     node tools/i18n/extract.js --render   -> also renders pages in a headless
                                              browser (needs playwright and a
                                              local server on :8765) to catch
                                              text that JavaScript injects
   Writes tools/i18n/keys.json and prints how many keys each language is missing.
   ================================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const L = require('./lib');
const { pageKeys } = require('./page');

const statics = new Set();
for (const p of L.sourcePages()) pageKeys(fs.readFileSync(path.join(L.ROOT, p), 'utf8')).forEach(k => statics.add(k));

/* Strings that JavaScript writes into the page at runtime. */
const dynamic = new Set();
const CODEY = /\{\d+\}px|['"`]\s*\+|\+\s*['"`]|[a-z]\(|[;=$`{}\\]|^[,:'")\]]|[,:(]$|^<|>$|\|\|/;
const addDyn = s => { const k = L.keyOf(L.decode(s)); if (k && !CODEY.test(k.replace(/\{\d+\}/g, ''))) dynamic.add(k); };
const jsFiles = ['js/core/app.js', 'data/data.js', ...fs.readdirSync(path.join(L.ROOT, 'js/modules')).filter(f => f.endsWith('.js') && f !== 'analytics.js').map(f => 'js/modules/' + f)];
const scan = (src, isData) => {
  let m;
  const between = />([^<>`${}]*[A-Za-z]{2}[^<>`${}]*)</g;
  while ((m = between.exec(src))) addDyn(m[1]);
  const attrs = /(?:placeholder|title|alt|aria-label|data-tip)=["']([^"'$`]+)["']/g;
  while ((m = attrs.exec(src))) addDyn(m[1]);
  const props = isData ? /(?:^|[\s{,:[(])'((?:[^'\\\n]|\\.)+)'/g
                       : /(?:\b\w+\s*:\s*|\b(?:textContent|innerText)\s*=\s*|[[,]\s*)(?:'((?:[^'\\\n]|\\.)+)'|"([^"\n]+)")/g;
  while ((m = props.exec(src))) {
    const v = (m[1] || m[2] || '').replace(/\\'/g, "'");
    if (/^(https?:|\.\.?\/|assets\/|pages\/|#|linear-gradient|rgba?\(|var\()/.test(v)) continue;
    if (/^[a-z0-9_-]+$/.test(v)) continue;            // ids / classes / slugs
    if (/^[.#\[]|^[a-z]+[A-Z]\w*$|^\w+\.\w+$|^(GET|POST|application\/|text\/|image\/)/.test(v)) continue;   // selectors, camelCase, a.b
    addDyn(v.replace(/<[^>]+>/g, ' '));
  }
};
for (const f of jsFiles) scan(fs.readFileSync(path.join(L.ROOT, f), 'utf8'), f.startsWith('data/'));
for (const p of L.sourcePages()) {
  const html = fs.readFileSync(path.join(L.ROOT, p), 'utf8');
  for (const t of L.tokenize(html)) if (t.raw === 'script' && !/ld\+json/i.test(t.s)) scan(t.s, false);
}

async function render() {
  const { chromium } = require('playwright');
  const b = await chromium.launch();
  for (const p of L.sourcePages()) {
    const pg = await b.newPage({ viewport: { width: 1280, height: 900 } });
    const res = await pg.goto('http://localhost:8765/' + p, { waitUntil: 'load', timeout: 30000 });
    if (!res || !res.ok()) throw new Error('Could not load ' + p + ' — is `python3 -m http.server 8765` running in the repo folder?');
    await pg.waitForTimeout(1200);
    // click through tab widgets so their hidden panels render too
    await pg.evaluate(async () => {
      for (const b of document.querySelectorAll('[role=tab], .bw-tab, .tab-btn, [data-tab]')) { try { b.click(); } catch (e) {} await new Promise(r => setTimeout(r, 60)); }
    }).catch(() => {});
    const strs = await pg.evaluate(() => {
      const res = [];
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
      while ((n = w.nextNode())) if (!n.parentElement.closest('script,style,noscript,svg,[data-no-translate]')) res.push(n.nodeValue);
      document.querySelectorAll('[alt],[title],[placeholder],[aria-label],[data-tip]').forEach(e =>
        ['alt', 'title', 'placeholder', 'aria-label', 'data-tip'].forEach(a => e.getAttribute(a) && res.push(e.getAttribute(a))));
      return res;
    });
    strs.forEach(s => { const k = L.keyOf(s); if (k && !statics.has(k)) dynamic.add(k); });
    await pg.close();
  }
  await b.close();
}

/* Strings JavaScript builds from pieces (e.g. "⏱ 8 min read") that no scan can see: list them in extra-keys.json */
L.readJSON(path.join(__dirname, 'extra-keys.json'), []).forEach(k => dynamic.add(k));

(async () => {
  const prev = L.readJSON(path.join(__dirname, 'keys.json'), { static: [], dynamic: [] });
  if (process.argv.includes('--render')) await render();
  else prev.dynamic.forEach(k => dynamic.add(k));   // keep previously rendered keys
  const out = { static: [...statics].sort(), dynamic: [...dynamic].sort() };
  L.writeJSON(path.join(__dirname, 'keys.json'), out);
  const all = new Set([...out.static, ...out.dynamic]);
  console.log(`keys: ${all.size} (static ${out.static.length}, dynamic ${out.dynamic.length})`);
  for (const l of L.TARGETS) {
    const d = L.loadDict(l);
    const miss = [...all].filter(k => !d[k]).length;
    console.log(`  ${l}: ${miss} missing`);
  }
})();
