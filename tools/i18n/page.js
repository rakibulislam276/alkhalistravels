/* Walk one HTML page and translate every user-visible string.
   tr(str) returns the translation or null (keep original). */
'use strict';
const L = require('./lib');

/* Containers whose content (text + inline tags only) is translated as ONE
   sentence, so word order can change: "Your Journey to <span>Dream
   Destinations</span> Starts Here" -> key
   "Your Journey to <b i=1>Dream Destinations</b> Starts Here". */
const UNIT_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'td', 'th', 'dt', 'dd', 'label', 'button', 'a', 'figcaption', 'blockquote', 'summary', 'div', 'span', 'strong', 'small', 'em']);
const INLINE = new Set(['span', 'em', 'strong', 'b', 'i', 'a', 'small', 'mark', 'br', 'sup', 'sub', 'u', 'abbr', 's']);
const VOID = new Set(['br', 'wbr']);

/* Returns { end, key, slots } when toks[i] opens a translatable unit. */
function unitAt(toks, i) {
  const name = L.tagName(toks[i].s);
  if (!UNIT_TAGS.has(name) || toks[i].s.startsWith('</') || /\/>$/.test(toks[i].s)) return null;
  let depth = 0, j = i + 1, inlineCount = 0;
  for (; j < toks.length; j++) {
    const t = toks[j];
    if (t.type === 'comment') continue;
    if (t.type === 'raw' || t.type === 'doctype') return null;
    if (t.type === 'tag') {
      const n = L.tagName(t.s), close = t.s.startsWith('</');
      if (n === name && !INLINE.has(n) && depth === 0 && close) break;
      if (!INLINE.has(n)) return null;
      if (VOID.has(n)) { inlineCount++; continue; }
      if (close) { if (depth === 0) { if (n === name) break; return null; } depth--; }
      else { depth++; inlineCount++; }
    }
  }
  if (j >= toks.length || inlineCount === 0) return null;
  // Build the key: text normalised, inline tags -> <b i=N>..</b> / <img i=N>
  const slots = []; const stack = []; let key = '';
  for (let k = i + 1; k < j; k++) {
    const t = toks[k];
    if (t.type === 'comment') continue;
    if (t.type === 'text') { key += L.decode(t.s); continue; }
    const n = L.tagName(t.s);
    if (VOID.has(n)) { slots.push({ open: t.s }); key += `<img i=${slots.length}>`; continue; }
    if (!t.s.startsWith('</')) {
      // empty element (icon) -> single void slot
      const nx = toks[k + 1];
      if (nx && nx.type === 'tag' && nx.s.startsWith('</') && L.tagName(nx.s) === n) { slots.push({ open: t.s + nx.s }); key += `<img i=${slots.length}>`; k++; continue; }
      if (nx && nx.type === 'text' && !nx.s.trim() && toks[k + 2] && toks[k + 2].type === 'tag' && toks[k + 2].s.startsWith('</') && L.tagName(toks[k + 2].s) === n) { slots.push({ open: t.s + nx.s + toks[k + 2].s }); key += `<img i=${slots.length}>`; k += 2; continue; }
      slots.push({ open: t.s }); stack.push(slots.length); key += `<b i=${slots.length}>`;
    } else { const id = stack.pop(); slots[id - 1].close = t.s; key += '</b>'; }
  }
  key = L.norm(key).replace(/\s*(<img i=\d+>)\s*/g, ' $1 ').replace(/\s+/g, ' ').trim();
  const plain = key.replace(/<[^>]+>/g, ' ');
  if (!L.translatable(L.norm(plain))) return null;
  // a unit made only of one wrapped element ("<b i=1>Text</b>") is better left to the inner element
  if (/^<b i=1>[^<]*<\/b>$/.test(key)) return null;
  return { end: j, key, slots };
}

/* Turn a translated unit back into HTML; null if the translation lost a tag. */
function renderUnit(unit, translated) {
  const ids = s => (s.match(/<(?:b|img) i=(\d+)>/g) || []).map(x => +/\d+/.exec(x)[0]).sort().join(',');
  if (ids(translated) !== ids(unit.key)) return null;
  if ((translated.match(/<b i=/g) || []).length !== (translated.match(/<\/b>/g) || []).length) return null;
  const stack = [];
  return translated.split(/(<b i=\d+>|<img i=\d+>|<\/b>)/).map(part => {
    let m;
    if ((m = /^<b i=(\d+)>$/.exec(part))) { stack.push(+m[1]); return unit.slots[+m[1] - 1].open; }
    if ((m = /^<img i=(\d+)>$/.exec(part))) return unit.slots[+m[1] - 1].open;
    if (part === '</b>') { const id = stack.pop(); return id ? unit.slots[id - 1].close || '' : ''; }
    return L.escText(part);
  }).join('');
}

function transformPage(html, tr) {
  const toks = L.tokenize(html);
  let inSvg = 0;
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (t.type === 'tag' && !inSvg) {
      const unit = unitAt(toks, i);
      if (unit) {
        const r = tr(unit.key, true);
        const out = r != null ? renderUnit(unit, r) : null;
        if (out != null) {
          const first = toks.slice(i + 1, unit.end).map(x => x.s).join('');
          const lead = /^\s*/.exec(first)[0], trail = /\s*$/.exec(first)[0];
          t.s = L.mapAttrs(t.s, (a, v) => L.TEXT_ATTRS.includes(a) ? tr(v) : undefined) + lead + out + trail;
          for (let k = i + 1; k < unit.end; k++) toks[k].s = '';
          i = unit.end - 1;
          continue;
        }
        if (r === undefined) { /* collecting: fall through so inner pieces are not collected */ i = unit.end - 1; continue; }
      }
    }
    if (t.type === 'tag') {
      const name = L.tagName(t.s);
      if (name === 'svg') inSvg += t.s.startsWith('</') ? -1 : (/\/>$/.test(t.s) ? 0 : 1);
      if (name === 'meta') {
        const key = (L.getAttr(t.s, 'name') || L.getAttr(t.s, 'property') || '').toLowerCase();
        if (L.META_KEYS.includes(key)) t.s = L.mapAttrs(t.s, (a, v) => a === 'content' ? tr(v) : undefined);
        continue;
      }
      if (t.s.startsWith('</')) continue;
      const isBtnInput = name === 'input' && /^(submit|button|reset)$/i.test(L.getAttr(t.s, 'type') || '');
      t.s = L.mapAttrs(t.s, (a, v) => (L.TEXT_ATTRS.includes(a) || (isBtnInput && a === 'value')) ? tr(v) : undefined);
    } else if (t.type === 'text' && !inSvg) {
      const dec = L.decode(t.s);
      if (!dec.trim()) continue;
      const r = tr(dec);
      if (r != null) {
        const lead = /^\s*/.exec(t.s)[0], trail = /\s*$/.exec(t.s)[0];
        t.s = lead + L.escText(r) + trail;
      }
    } else if (t.type === 'raw' && t.raw === 'script' && /type=["']application\/ld\+json["']/i.test(t.s)) {
      const m = /^(<script[^>]*>)([\s\S]*?)(<\/script\s*>)$/i.exec(t.s);
      try {
        const data = JSON.parse(m[2]);
        const out = L.mapLd(data, v => tr(v));
        const ws = /^\s*/.exec(m[2])[0], we = /\s*$/.exec(m[2])[0];
        t.s = m[1] + ws + JSON.stringify(out) + we + m[3];
      } catch (e) { /* leave malformed JSON-LD untouched */ }
    }
  }
  return toks.map(t => t.s).join('');
}

/* Collect dictionary keys used by a page. */
function pageKeys(html) {
  const keys = new Set();
  transformPage(html, (s, isUnit) => {
    if (isUnit) { keys.add(L.templ(s).key); return undefined; }
    const k = L.keyOf(s); if (k) keys.add(k); return null;
  });
  return keys;
}

module.exports = { transformPage, pageKeys, renderUnit };
