/* ================================================================
   i18n shared helpers (Node, zero dependencies)
   Used by extract.js, translate.js and build.js.
   ================================================================ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SITE = 'https://alkhalistravels.com';

/* Language list. English is the source/default and lives at the site root. */
const LANGS = {
  en: { name: 'English',  native: 'English',  dir: 'ltr', hreflang: 'en-IN', og: 'en_IN', label: 'EN' },
  hi: { name: 'Hindi',    native: 'हिन्दी',     dir: 'ltr', hreflang: 'hi',    og: 'hi_IN', label: 'हि' },
  ur: { name: 'Urdu',     native: 'اردو',      dir: 'rtl', hreflang: 'ur',    og: 'ur_IN', label: 'اُ' },
  ar: { name: 'Arabic',   native: 'العربية',   dir: 'rtl', hreflang: 'ar',    og: 'ar_AR', label: 'ع' },
  mr: { name: 'Marathi',  native: 'मराठी',     dir: 'ltr', hreflang: 'mr',    og: 'mr_IN', label: 'म' },
  gu: { name: 'Gujarati', native: 'ગુજરાતી',    dir: 'ltr', hreflang: 'gu',    og: 'gu_IN', label: 'ગુ' },
  bn: { name: 'Bangla',   native: 'বাংলা',      dir: 'ltr', hreflang: 'bn',    og: 'bn_IN', label: 'বা' },
};
const TARGETS = Object.keys(LANGS).filter(l => l !== 'en');

/* Source pages: the homepage + every real page under pages/ (redirect stubs skipped). */
function sourcePages() {
  const out = ['index.html'];
  const walk = dir => {
    for (const f of fs.readdirSync(path.join(ROOT, dir)).sort()) {
      const rel = dir + '/' + f;
      const abs = path.join(ROOT, rel);
      if (fs.statSync(abs).isDirectory()) walk(rel);
      else if (f.endsWith('.html') && !isRedirectStub(fs.readFileSync(abs, 'utf8'))) out.push(rel);
    }
  };
  walk('pages');
  return out;
}
function isRedirectStub(html) {
  return /http-equiv=["']refresh["']/i.test(html) && html.length < 2000;
}

/* ── Entities ─────────────────────────────────────────────────── */
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', mdash: '—', ndash: '–',
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', middot: '·', copy: '©', reg: '®', trade: '™', rarr: '→', larr: '←',
  bull: '•', times: '×', rsaquo: '›', lsaquo: '‹', raquo: '»', laquo: '«', check: '✓', star: '★', deg: '°', rupee: '₹' };
function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    const v = NAMED[e.toLowerCase()]; return v === undefined ? m : v;
  });
}
function escText(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escAttr(s) { return escText(s).replace(/"/g, '&quot;'); }

/* ── Keys ─────────────────────────────────────────────────────── */
function norm(s) { return s.replace(/[\s ]+/g, ' ').trim(); }
/* "Umrah from ₹72,000" -> { key: "Umrah from ₹{0}", nums: ["72,000"] } */
function templ(s) {
  const nums = [];
  const key = s.replace(/<[^>]*>|\d[\d,]*(?:\.\d+)?/g, m => {
    if (m[0] === '<') return m;                       // placeholder tags of sentence units
    nums.push(m); return '{' + (nums.length - 1) + '}';
  });
  return { key, nums };
}
function translatable(s) {
  if (!s || s.length < 2) return false;
  if (!/[A-Za-z]{2}/.test(s)) return false;
  if (/^(https?:|mailto:|tel:|www\.|\.{0,2}\/)/i.test(s)) return false;
  if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(s)) return false;
  if (/^[A-Z0-9 ,.\/&+:–-]{2,7}$/.test(s)) return false;          // currency / airport codes, "USD", "BOM → DXB"
  if (/^[\w-]+\.(html|jpg|png|webp|svg|js|css)$/i.test(s)) return false;
  return true;
}
/* Key used in the dictionaries: whitespace-normalised, numbers templated. */
function keyOf(text) { const n = norm(text); return translatable(n) ? templ(n).key : null; }

/* Look a raw string up in a dictionary; returns translated string (numbers restored) or null. */
function lookup(dict, raw) {
  const n = norm(raw);
  if (!translatable(n)) return null;
  const { key, nums } = templ(n);
  let t = dict[key], pre = '';
  if (!t) {                                   // "📅 April {0}, {1}" -> try "April {0}, {1}"
    const m = /^([^\p{L}\p{N}{<]+)([\s\S]+)$/u.exec(key);
    if (m && dict[m[2]]) { pre = m[1]; t = dict[m[2]]; }
  }
  if (t == null || t === '') return null;
  return pre + t.replace(/\{(\d+)\}/g, (m, i) => nums[+i] != null ? nums[+i] : m);
}

/* ── HTML tokenizer (good enough for hand-written static pages) ── */
const TOKEN_RE = /<!--[\s\S]*?-->|<(script|style|textarea|noscript)\b(?:[^>"']|"[^"]*"|'[^']*')*>[\s\S]*?<\/\1\s*>|<!doctype[^>]*>|<\/?[a-zA-Z](?:[^>"']|"[^"]*"|'[^']*')*>|[^<]+|</gi;
function tokenize(html) {
  const out = []; let m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(html))) {
    const s = m[0];
    let type = 'text';
    if (s.startsWith('<!--')) type = 'comment';
    else if (m[1]) type = 'raw';
    else if (/^<!doctype/i.test(s)) type = 'doctype';
    else if (/^<\/?[a-zA-Z]/.test(s)) type = 'tag';
    out.push({ type, s, raw: m[1] ? m[1].toLowerCase() : null });
  }
  return out;
}
const ATTR_RE = /(\s)([\w:.-]+)(\s*=\s*)("([^"]*)"|'([^']*)')/g;
function tagName(tag) { const m = /^<\/?([a-zA-Z][\w-]*)/.exec(tag); return m ? m[1].toLowerCase() : ''; }
function getAttr(tag, name) {
  ATTR_RE.lastIndex = 0; let m;
  while ((m = ATTR_RE.exec(tag))) if (m[2].toLowerCase() === name) return m[5] != null ? m[5] : m[6];
  return null;
}
/* Rewrite attribute values: fn(name, decodedValue, tag) -> new decoded value | undefined */
function mapAttrs(tag, fn) {
  return tag.replace(ATTR_RE, (all, sp, name, eq, q, dv, sv) => {
    const val = dv != null ? dv : sv;
    const r = fn(name.toLowerCase(), decode(val), tag);
    if (r === undefined || r === null || r === decode(val)) return all;
    return `${sp}${name}${eq}"${escAttr(r)}"`;
  });
}

const TEXT_ATTRS = ['alt', 'title', 'placeholder', 'aria-label', 'data-tip', 'label'];
const META_KEYS = ['description', 'og:title', 'og:description', 'og:image:alt', 'twitter:title', 'twitter:description', 'twitter:image:alt'];
const LD_KEYS = ['name', 'text', 'description', 'headline', 'slogan', 'alternativeHeadline'];

/* Walk JSON-LD and call fn on translatable string values; returns new object. */
function mapLd(node, fn, key) {
  if (Array.isArray(node)) return node.map(n => mapLd(n, fn, key));
  if (node && typeof node === 'object') {
    const o = {};
    for (const k of Object.keys(node)) o[k] = mapLd(node[k], fn, k);
    return o;
  }
  if (typeof node === 'string' && LD_KEYS.includes(key)) { const r = fn(node); return r == null ? node : r; }
  return node;
}

function readJSON(p, def) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return def; } }
function writeJSON(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 1) + '\n'); }
function dictPath(lang) { return path.join(__dirname, 'dict', lang + '.json'); }
function loadDict(lang) { return readJSON(dictPath(lang), {}); }

module.exports = { ROOT, SITE, LANGS, TARGETS, sourcePages, isRedirectStub, decode, escText, escAttr, norm, templ,
  translatable, keyOf, lookup, tokenize, tagName, getAttr, mapAttrs, mapLd, TEXT_ATTRS, META_KEYS, LD_KEYS,
  readJSON, writeJSON, dictPath, loadDict };
