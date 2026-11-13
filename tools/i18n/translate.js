#!/usr/bin/env node
/* ================================================================
   Draft machine translation for missing dictionary keys.
     node tools/i18n/translate.js            -> all languages
     node tools/i18n/translate.js hi mr      -> just these
   Only fills keys that are missing; never overwrites a translation
   that is already in tools/i18n/dict/<lang>.json, so hand-corrected
   entries are safe. Uses the public Google Translate endpoint (in a proxied
   sandbox run with NODE_USE_ENV_PROXY=1).
   ================================================================ */
'use strict';
const path = require('path');
const L = require('./lib');

/* Kept exactly as written in every language. Longest first. */
const KEEP = ['Al Khalis Tours and Travels', 'Al Khalis Tours & Travels', 'Al Khalis Travels', 'Al Khalis Tours', 'Al Khalis',
  'WhatsApp', 'Instagram', 'Facebook', 'YouTube', 'LinkedIn', 'Google', 'IATA', 'TAAI', 'TAFI', 'IATO', 'RBI', 'FEMA', 'UPI', 'NEFT', 'IMPS', 'RTGS'];
const PROTECT_RE = new RegExp([
  /\{\d+\}/.source,
  /https?:\/\/\S+/.source,
  /[\w.+-]+@[\w-]+\.[\w.]+/.source,
  /\+\d[\d ]{6,}\d/.source,
  ...KEEP.map(k => k.replace(/[.*+?^${}()|[\]\\&]/g, '\\$&') + '(?![a-z])'),
].join('|'), 'g');

const isUnit = k => /<(?:b|img) i=\d+>/.test(k);
function prep(src) {
  if (isUnit(src)) {
    const kept = [];
    let core = src.split(/(<[^>]+>)/).map(part => part.startsWith('<') ? part
      : part.replace(PROTECT_RE, m => { kept.push(m); return 'ZXQ' + (kept.length - 1); }).replace(/&/g, '&amp;').replace(/</g, '&lt;')).join('');
    return { lead: '', trail: '', core, kept, html: true };
  }
  const lead = (/^[^\p{L}\p{N}{(+"“‘]+/u.exec(src) || [''])[0];
  const trail = (/[^\p{L}\p{N}.!?)}\]%"”’]+$/u.exec(src.slice(lead.length)) || [''])[0];
  let core = src.slice(lead.length, src.length - trail.length);
  const kept = [];
  core = core.replace(PROTECT_RE, m => { kept.push(m); return 'ZXQ' + (kept.length - 1); });
  return { lead, trail, core, kept };
}
function finish(p, out, src) {
  if (p.html) out = out.replace(/\s*(<\/b>)/g, '$1').replace(/(<b i=\d+>)\s*/g, '$1 ').replace(/<b i=(\d+)> /g, '<b i=$1>')
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, m => L.decode(m));
  let s = out.replace(/ZXQ\s?(\d+)/gi, (m, i) => p.kept[+i] != null ? p.kept[+i] : m);
  if (!/[.!?।۔]$/.test(p.core)) s = s.replace(/\s*[.।۔]$/u, '');   // MT likes to add a full stop
  s = s.replace(/​/g, '').trim();
  return p.lead + s + p.trail;
}

async function mt(lang, cores, html) {
  const params = new URLSearchParams({ client: 'gtx', sl: 'en', tl: lang });
  if (html) params.append('format', 'html');
  cores.forEach(c => params.append('q', c));
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const r = await fetch('https://translate.googleapis.com/translate_a/t?' + params.toString());
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const j = await r.json();
      const arr = cores.length === 1 ? [Array.isArray(j) ? j[0] : j] : j;
      return arr.map(x => Array.isArray(x) ? x[0] : x);
    } catch (e) {
      await new Promise(r => setTimeout(r, 1500 * (attempt + 1)));
      if (attempt === 4) throw e;
    }
  }
}

(async () => {
  const keys = L.readJSON(path.join(__dirname, 'keys.json'), { static: [], dynamic: [] });
  const all = [...new Set([...keys.static, ...keys.dynamic])];
  const langs = process.argv.slice(2).length ? process.argv.slice(2) : L.TARGETS;
  const gl = glossary();
  for (const lang of langs) {
    const dict = L.loadDict(lang);
    for (const k of Object.keys(dict)) if (!all.includes(k) && !gl[k]) delete dict[k];   // drop strings no longer on the site
    for (const k of Object.keys(gl)) if (gl[k][lang]) dict[k] = gl[k][lang];
    L.writeJSON(L.dictPath(lang), sortObj(dict));
    const todo = all.filter(k => !dict[k]);
    let i = 0, done = 0;
    todo.sort((a, b) => isUnit(a) - isUnit(b));      // plain strings first, then sentence units (HTML mode)
    while (i < todo.length) {
      const batch = []; let len = 0;
      const html = isUnit(todo[i]);
      while (i < todo.length && isUnit(todo[i]) === html && batch.length < 40 && len < 1800) { batch.push(todo[i]); len += todo[i].length; i++; }
      const preps = batch.map(prep);
      const idx = preps.map((p, n) => /[A-Za-z]{2}/.test(p.core.replace(/ZXQ\d+|<[^>]+>/g, '')) ? n : -1).filter(n => n >= 0);
      const outs = idx.length ? await mt(lang, idx.map(n => preps[n].core), html) : [];
      batch.forEach((k, n) => {
        const j = idx.indexOf(n);
        dict[k] = j < 0 ? k : finish(preps[n], outs[j], k);
      });
      done += batch.length;
      L.writeJSON(L.dictPath(lang), sortObj(dict));
      process.stdout.write(`\r${lang}: ${done}/${todo.length}`);
    }
    console.log('');
  }
})();
function glossary() {
  const out = {};
  const rows = require('fs').readFileSync(path.join(__dirname, 'glossary.tsv'), 'utf8').split('\n');
  for (const row of rows) {
    if (!row.trim() || row.startsWith('#')) continue;
    const c = row.split('\t');
    out[c[0]] = {};
    L.TARGETS.forEach((l, i) => { if (c[i + 1]) out[c[0]][l] = c[i + 1].trim(); });
  }
  return out;
}
function sortObj(o) { const r = {}; Object.keys(o).sort().forEach(k => r[k] = o[k]); return r; }
