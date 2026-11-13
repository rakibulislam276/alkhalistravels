#!/usr/bin/env node
/* ================================================================
   Build the translated copies of the site.
     node tools/i18n/build.js
   For every English page (index.html + pages/**) and every language in
   lib.js it writes /<lang>/<same path>, e.g. /hi/pages/visa.html, with:
     - text, alt/title/placeholder, meta descriptions and JSON-LD translated
       from tools/i18n/dict/<lang>.json (missing strings stay English)
     - <html lang/dir>, canonical, og:locale and a full hreflang set
     - asset paths pointing back to the shared root files
   It also refreshes the hreflang tags + language-switcher includes on the
   English pages, writes js/i18n/<lang>.js (strings JavaScript renders at
   runtime) and adds every language URL to sitemap.xml.
   Re-run it after editing English pages or the dictionaries.
   ================================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const L = require('./lib');
const { transformPage } = require('./page');

const pages = L.sourcePages();
const keys = L.readJSON(path.join(__dirname, 'keys.json'), { static: [], dynamic: [] });
const ALL = Object.keys(L.LANGS);

function pageUrl(lang, page) {
  return L.SITE + (lang === 'en' ? '' : '/' + lang) + '/' + (page === 'index.html' ? '' : page);
}
function depthPrefix(page) { return '../'.repeat(page.split('/').length - 1) || './'; }

/* hreflang + og:locale block shared by every language version of a page */
function alternates(page, lang) {
  const lines = ALL.map(l => `  <link rel="alternate" hreflang="${L.LANGS[l].hreflang}" href="${pageUrl(l, page)}">`);
  lines.push(`  <link rel="alternate" hreflang="x-default" href="${pageUrl('en', page)}">`);
  ALL.filter(l => l !== lang).forEach(l => lines.push(`  <meta property="og:locale:alternate" content="${L.LANGS[l].og}">`));
  return '<!-- i18n:alternates -->\n' + lines.join('\n') + '\n  <!-- /i18n:alternates -->';
}
function headIncludes(page, lang) {
  const root = lang === 'en' ? depthPrefix(page) : '../'.repeat(page.split('/').length);
  const font = {
    hi: 'Noto+Sans+Devanagari:wght@400;500;600;700', mr: 'Noto+Sans+Devanagari:wght@400;500;600;700',
    gu: 'Noto+Sans+Gujarati:wght@400;500;600;700', bn: 'Noto+Sans+Bengali:wght@400;500;600;700',
    ur: 'Noto+Naskh+Arabic:wght@400;500;600;700', ar: 'Noto+Naskh+Arabic:wght@400;500;600;700',
  }[lang];
  return '<!-- i18n:head -->\n' +
    (font ? `  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${font}&display=swap">\n` : '') +
    `  <link rel="stylesheet" href="${root}css/components/i18n.css?v=1">\n  <!-- /i18n:head -->`;
}
function bodyIncludes(page, lang) {
  const root = lang === 'en' ? depthPrefix(page) : '../'.repeat(page.split('/').length);
  return '<!-- i18n:body -->\n' +
    (lang === 'en' ? '' : `<script src="${root}js/i18n/${lang}.js?v=1"></script>\n`) +
    `<script src="${root}js/core/i18n.js?v=1"></script>\n<!-- /i18n:body -->`;
}

/* Insert or replace a marked block. */
function upsert(html, name, block, before) {
  const re = new RegExp(`<!-- i18n:${name} -->[\\s\\S]*?<!-- /i18n:${name} -->`);
  if (re.test(html)) return html.replace(re, block);
  return html.replace(before, m => block + '\n' + m);
}
/* The i18n stylesheet goes straight after the hreflang block (top of <head>) so that
   other branches adding stylesheets before </head> never conflict with it. Its rules
   are specific enough to win without loading last. */
function setHead(html, page, lang) {
  html = html.replace(/\n?<!-- i18n:head -->[\s\S]*?<!-- \/i18n:head -->/, '');
  return html.replace(/(<!-- \/i18n:alternates -->)/, `$1\n  ${headIncludes(page, lang)}`);
}
function setAlternates(html, page, lang) {
  // drop hand-written hreflang/og:locale:alternate tags, then insert the generated set after the canonical
  html = html.replace(/^[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*">[ \t]*\r?\n/gm, '')
             .replace(/^[ \t]*<meta property="og:locale:alternate" content="[^"]*">[ \t]*\r?\n/gm, '');
  const block = alternates(page, lang);
  const re = /<!-- i18n:alternates -->[\s\S]*?<!-- \/i18n:alternates -->/;
  if (re.test(html)) return html.replace(re, block);
  return html.replace(/(<link rel="canonical"[^>]*>)/, `$1\n  ${block}`);
}

const SKIP_URL = /^(https?:|\/\/|\/|#|mailto:|tel:|data:|javascript:|sms:|whatsapp:|\{|\$)/i;
function isPageLink(u) { const p = u.split(/[?#]/)[0]; return p === '' || p.endsWith('.html') || p.endsWith('/'); }
function localiseUrls(html, lang) {
  const up = u => SKIP_URL.test(u) ? u : '../' + u.replace(/^\.\//, '');
  const toks = L.tokenize(html);
  for (const t of toks) {
    if (t.type === 'raw' && t.raw === 'style') t.s = t.s.replace(/url\((['"]?)(?!data:|https?:|\/)([^'")]+)\1\)/g, (m, q, u) => `url(${q}${up(u)}${q})`);
    if (t.type !== 'tag' && !(t.type === 'raw' && t.raw === 'script')) continue;
    const name = L.tagName(t.s);
    if (t.type === 'raw') { // the opening <script ...> tag + relative 'assets/...' strings in inline code
      t.s = t.s.replace(/^<script\b[^>]*>/i, open => L.mapAttrs(open, (a, v) => a === 'src' ? up(v) : undefined));
      if (!/ld\+json/i.test(t.s)) t.s = t.s.replace(/(['"`])((?:\.\.\/)*)(?:\.\/)?assets\//g, '$1../$2assets/');
      continue;
    }
    if (name === 'meta') continue;
    if (name === 'link' && /rel="(canonical|alternate)"/.test(t.s)) continue;
    t.s = L.mapAttrs(t.s, (a, v) => {
      if (a === 'style') return v.replace(/url\((['"]?)(?!data:|https?:|\/)([^'")]+)\1\)/g, (m, q, u) => `url(${q}${up(u)}${q})`);
      if (a === 'href' && name === 'a') {
        if (v === '/') return '/' + lang + '/';
        if (/^\/pages\//.test(v)) return '/' + lang + v;
        if (v.startsWith(L.SITE + '/') && isPageLink(v.slice(L.SITE.length))) return L.SITE + '/' + lang + v.slice(L.SITE.length);
        return isPageLink(v) ? v : up(v);
      }
      if (['src', 'href', 'poster', 'data-src'].includes(a)) return up(v);
      if (a === 'srcset') return v.split(',').map(s => s.trim()).map(s => { const [u, ...r] = s.split(/\s+/); return [up(u), ...r].join(' '); }).join(', ');
      return undefined;
    });
  }
  return toks.map(t => t.s).join('');
}

function buildPage(page, lang, dict) {
  const src = fs.readFileSync(path.join(L.ROOT, page), 'utf8');
  let html = transformPage(src, s => L.lookup(dict, s));
  const meta = L.LANGS[lang];
  html = html.replace(/<html\b[^>]*>/i, tag => {
    tag = tag.replace(/\slang="[^"]*"/, '').replace(/\sdir="[^"]*"/, '');
    return tag.replace(/^<html/i, `<html lang="${lang}" dir="${meta.dir}"`);
  });
  html = html.replace(/(<meta http-equiv="Content-Language" content=")[^"]*"/, `$1${meta.hreflang}"`)
             .replace(/(<meta name="language" content=")[^"]*"/, `$1${meta.name}"`)
             .replace(/(<meta property="og:locale" content=")[^"]*"/, `$1${meta.og}"`)
             .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${pageUrl(lang, page)}"`)
             .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${pageUrl(lang, page)}"`)
             .replace(/"inLanguage":"en-IN"/g, `"inLanguage":"${meta.hreflang}"`);
  html = localiseUrls(html, lang);
  html = setAlternates(html, page, lang);
  html = setHead(html, page, lang);
  html = upsert(html, 'body', bodyIncludes(page, lang), /<\/body>/i);
  const out = path.join(L.ROOT, lang, page);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const note = `<!-- Generated by tools/i18n/build.js from /${page}. Edit the English page or tools/i18n/dict/${lang}.json, then re-run the build. -->`;
  fs.writeFileSync(out, /^<!doctype[^>]*>/i.test(html) ? html.replace(/^(<!doctype[^>]*>)/i, `$1\n${note}`) : note + '\n' + html);
}

/* 1. English pages: refresh alternates + includes in place */
for (const page of pages) {
  const p = path.join(L.ROOT, page);
  let html = fs.readFileSync(p, 'utf8');
  const before = html;
  html = setAlternates(html, page, 'en');
  html = setHead(html, page, 'en');
  html = upsert(html, 'body', bodyIncludes(page, 'en'), /<\/body>/i);
  if (html !== before) fs.writeFileSync(p, html);
}

/* 2. Translated pages + runtime dictionaries */
const report = [];
fs.mkdirSync(path.join(L.ROOT, 'js/i18n'), { recursive: true });
for (const lang of L.TARGETS) {
  const dict = L.loadDict(lang);
  for (const page of pages) buildPage(page, lang, dict);
  const rt = {};
  keys.dynamic.forEach(k => { if (dict[k] && dict[k] !== k) rt[k] = dict[k]; });
  fs.writeFileSync(path.join(L.ROOT, 'js/i18n', lang + '.js'),
    `/* Generated by tools/i18n/build.js: ${L.LANGS[lang].name} strings for text that JavaScript adds to the page. */\n` +
    `window.AK_I18N_DICT = ${JSON.stringify(rt)};\n`);
  const total = new Set([...keys.static, ...keys.dynamic]);
  report.push(`${lang}: ${pages.length} pages, ${[...total].filter(k => dict[k]).length}/${total.size} strings translated`);
}

/* 3. sitemap.xml: language alternates on every page + one <url> per language version */
const smPath = path.join(L.ROOT, 'sitemap.xml');
let sm = fs.readFileSync(smPath, 'utf8');
sm = sm.replace(/\n?[ \t]*<!-- i18n:sitemap -->[\s\S]*?<!-- \/i18n:sitemap -->[ \t]*\n?/, '\n');
const urlBlocks = [...sm.matchAll(/<url>[\s\S]*?<\/url>/g)].map(m => m[0]);
const byLoc = {};
urlBlocks.forEach(b => { byLoc[/<loc>([^<]*)<\/loc>/.exec(b)[1]] = b; });
const altXml = page => ALL.map(l => `    <xhtml:link rel="alternate" hreflang="${L.LANGS[l].hreflang}" href="${pageUrl(l, page)}"/>`).join('\n') +
  `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl('en', page)}"/>`;
const extra = [];
for (const page of pages) {
  const loc = pageUrl('en', page);
  const block = byLoc[loc];
  if (!block) continue;               // page not listed in the sitemap: leave it out in every language
  const nb = block.replace(/\n[ \t]*<xhtml:link[^>]*\/>/g, '').replace(/\n([ \t]*)<\/url>/, `\n${altXml(page)}\n$1</url>`);
  sm = sm.replace(block, nb);
  for (const l of L.TARGETS) extra.push(nb.replace(`<loc>${loc}</loc>`, `<loc>${pageUrl(l, page)}</loc>`));
}
sm = sm.replace(/\n?<\/urlset>/, `\n  <!-- i18n:sitemap -->\n  ${extra.join('\n  ')}\n  <!-- /i18n:sitemap -->\n</urlset>`);
fs.writeFileSync(smPath, sm);

console.log(report.join('\n'));
