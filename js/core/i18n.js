/* ================================================================
   I18N.JS — Language switcher + runtime translation
   Al Khalis Tours and Travels

   - Adds the language button to the navbar (next to the day/night
     toggle) on every page.
   - On translated pages (/hi/, /ur/, /ar/, /mr/, /gu/, /bn/) it also
     translates text that JavaScript writes into the page (navbar,
     footer, cards from data.js, booking widget...) using the
     dictionary in js/i18n/<lang>.js, and keeps internal links inside
     the current language.
   The static page text is translated at build time by
   tools/i18n/build.js — see SITE-STRUCTURE-GUIDE.md.
   ================================================================ */
(function () {
  'use strict';

  var LANGS = [
    { code: 'en', native: 'English', name: 'English', short: 'EN' },
    { code: 'hi', native: 'हिन्दी',   name: 'Hindi',   short: 'हि' },
    { code: 'ur', native: 'اردو',    name: 'Urdu',    short: 'اُردو' },
    { code: 'ar', native: 'العربية', name: 'Arabic',  short: 'ع' },
    { code: 'mr', native: 'मराठी',   name: 'Marathi', short: 'म' },
    { code: 'gu', native: 'ગુજરાતી',  name: 'Gujarati', short: 'ગુ' },
    { code: 'bn', native: 'বাংলা',    name: 'Bangla',  short: 'বা' }
  ];
  var CODES = LANGS.map(function (l) { return l.code; }).filter(function (c) { return c !== 'en'; });
  var LANG_RE = new RegExp('^/(' + CODES.join('|') + ')(/|$)');

  var path = location.pathname;
  var m = LANG_RE.exec(path);
  var lang = m ? m[1] : 'en';
  var dict = lang !== 'en' ? (window.AK_I18N_DICT || {}) : null;

  /* Path of this page in English, e.g. "/pages/visa.html" */
  function basePath(p) { return p.replace(LANG_RE, '/'); }
  function langPath(code, p) {
    var b = basePath(p);
    if (b === '/index.html') b = '/';
    return code === 'en' ? b : '/' + code + b;
  }

  /* ── Runtime string translation (same rules as tools/i18n/lib.js) ── */
  var NUM_RE = /\d[\d,]*(?:\.\d+)?/g;
  function translatable(s) {
    if (!s || s.length < 2 || !/[A-Za-z]{2}/.test(s)) return false;
    if (/^(https?:|mailto:|tel:|www\.|\.{0,2}\/)/i.test(s)) return false;
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(s)) return false;
    if (/^[A-Z0-9 ,.\/&+:–-]{2,7}$/.test(s)) return false;
    return true;
  }
  function tr(raw) {
    var n = raw.replace(/[\s ]+/g, ' ').trim();
    if (!translatable(n)) return null;
    var nums = [];
    var key = n.replace(NUM_RE, function (x) { nums.push(x); return '{' + (nums.length - 1) + '}'; });
    var t = dict[key], pre = '';
    if (!t) {                                   // "📅 April {0}, {1}" -> try "April {0}, {1}"
      var m2 = /^([^A-Za-z0-9{\u0600-\u06FF\u0900-\u09FF\u0A80-\u0AFF]+)([\s\S]+)$/.exec(key);
      if (m2 && dict[m2[2]]) { pre = m2[1]; t = dict[m2[2]]; }
    }
    if (!t) return null;
    return pre + t.replace(/\{(\d+)\}/g, function (x, i) { return nums[+i] != null ? nums[+i] : x; });
  }
  var ATTRS = ['alt', 'title', 'placeholder', 'aria-label', 'data-tip'];
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, svg: 1, SVG: 1 };

  function translateText(node) {
    var v = node.nodeValue;
    if (!v || !/[A-Za-z]/.test(v)) return;
    var t = tr(v);
    if (t == null) return;
    var out = v.replace(/^(\s*)[\s\S]*?(\s*)$/, function (a, l, r) { return l + t + r; });
    if (out !== v) node.nodeValue = out;
  }
  function translateEl(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var a = el.getAttribute && el.getAttribute(ATTRS[i]);
      if (a) { var t = tr(a); if (t != null && t !== a) el.setAttribute(ATTRS[i], t); }
    }
    if (el.tagName === 'INPUT' && /^(submit|button)$/i.test(el.type) && el.value) {
      var tv = tr(el.value); if (tv != null && tv !== el.value) el.value = tv;
    }
  }
  /* RTL pages: "50+", "+91 98929", "₹72,000" must not be reordered by the bidi algorithm */
  var RTL = document.documentElement.getAttribute('dir') === 'rtl';
  var NUMERIC = /^[\s\d,.:+%₹$€£×x\/–-]*\d[\s\d,.:+%₹$€£×x\/–-]*(?:hr|h|K|k|M)?\+?$/;
  function fixNumber(el) {
    if (!RTL || !el || el.nodeType !== 1 || el.hasAttribute('data-ltr-num')) return;
    var txt = el.textContent.trim();
    if (txt.length > 24 || !NUMERIC.test(txt)) return;
    var align = getComputedStyle(el).textAlign;
    el.setAttribute('data-ltr-num', '');
    el.style.direction = 'ltr';
    el.style.unicodeBidi = 'isolate';
    if (align === 'start' || align === 'right' || align === '-webkit-right') el.style.textAlign = 'right';
  }

  function translateTree(root) {
    if (!root) return;
    if (root.nodeType === 3) { if (!inSkip(root.parentNode)) translateText(root); return; }
    if (root.nodeType !== 1 || SKIP[root.nodeName] || inSkip(root)) return;
    translateEl(root);
    localiseLink(root);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (n.nodeType === 1) return SKIP[n.nodeName] || n.hasAttribute('data-no-translate') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) translateText(n);
      else { translateEl(n); localiseLink(n); fixNumber(n); }
    }
    fixNumber(root);
  }
  function inSkip(el) {
    while (el && el.nodeType === 1) {
      if (SKIP[el.nodeName] || el.hasAttribute('data-no-translate')) return true;
      el = el.parentNode;
    }
    return false;
  }

  /* Keep links to our own pages inside the current language */
  function localiseLink(el) {
    if (lang === 'en' || el.tagName !== 'A' || el.hasAttribute('hreflang')) return;
    var href = el.getAttribute('href');
    if (!href || /^(#|mailto:|tel:|javascript:|data:|https?:\/\/(?!alkhalistravels\.com))/i.test(href)) return;
    var u;
    try { u = new URL(href, location.href); } catch (e) { return; }
    if (u.origin !== location.origin || LANG_RE.test(u.pathname)) return;
    if (!/(\.html|\/)$/.test(u.pathname)) return;           // files (pdf, images) stay shared
    el.setAttribute('href', '/' + lang + u.pathname + u.search + u.hash);
  }

  /* ── Language switcher ─────────────────────────────────────── */
  var GLOBE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.7 3.9 5.9 3.9 9.5s-1.3 6.8-3.9 9.5c-2.6-2.7-3.9-5.9-3.9-9.5s1.3-6.8 3.9-9.5z"/></svg>';

  function buildSwitcher() {
    var cur = LANGS.filter(function (l) { return l.code === lang; })[0];
    var wrap = document.createElement('div');
    wrap.className = 'lang-switch';
    wrap.setAttribute('data-no-translate', '');
    var items = LANGS.map(function (l) {
      var active = l.code === lang;
      return '<li role="none"><a role="menuitem" class="lang-switch__item' + (active ? ' is-active' : '') + '"' +
        ' href="' + langPath(l.code, path) + '" hreflang="' + l.code + '" lang="' + l.code + '"' +
        (active ? ' aria-current="true"' : '') + ' data-lang="' + l.code + '">' +
        '<span class="lang-switch__native">' + l.native + '</span>' +
        (l.code !== 'en' ? '<span class="lang-switch__en">' + l.name + '</span>' : '') +
        (active ? '<span class="lang-switch__tick" aria-hidden="true">✓</span>' : '') + '</a></li>';
    }).join('');
    wrap.innerHTML =
      '<button type="button" class="lang-switch__btn" aria-haspopup="true" aria-expanded="false" ' +
      'aria-label="Language: ' + cur.name + '. Change language" title="Change language / भाषा बदलें">' +
      GLOBE + '<span class="lang-switch__cur">' + cur.short + '</span>' +
      '<svg class="lang-switch__caret" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
      '</button><ul class="lang-switch__menu" role="menu" aria-label="Choose language">' + items + '</ul>';

    var btn = wrap.querySelector('.lang-switch__btn');
    function setOpen(open) {
      wrap.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!wrap.classList.contains('is-open')); });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setOpen(false); } });
    wrap.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[data-lang]');
      if (a) { try { localStorage.setItem('ak-lang', a.getAttribute('data-lang')); } catch (err) {} }
    });
    return wrap;
  }

  function mountSwitcher() {
    var inner = document.querySelector('#navbar .nav-inner');
    if (!inner || inner.querySelector('.lang-switch')) return !!inner;
    // One group for the header buttons (day/night toggle + language), so they sit
    // together instead of being spread out by the navbar's space-between layout.
    var tools = inner.querySelector('.nav-tools');
    if (!tools) {
      tools = document.createElement('div');
      tools.className = 'nav-tools';
      var theme = inner.querySelector('.theme-toggle');
      var burger = inner.querySelector('.hamburger');
      if (theme) { inner.insertBefore(tools, theme); tools.appendChild(theme); }
      else if (burger) inner.insertBefore(tools, burger);
      else inner.appendChild(tools);
    }
    tools.appendChild(buildSwitcher());
    return true;
  }

  /* ── Start ─────────────────────────────────────────────────── */
  function start() {
    if (!mountSwitcher()) {
      // navbar is injected by app.js; try again shortly if it is not there yet
      var tries = 0, iv = setInterval(function () { if (mountSwitcher() || ++tries > 40) clearInterval(iv); }, 100);
    }
    if (lang === 'en' && !RTL) return;
    translateTree(document.body);
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var mu = muts[i];
        if (mu.type === 'characterData') { if (!inSkip(mu.target.parentNode)) translateText(mu.target); }
        else if (mu.type === 'attributes') translateEl(mu.target);
        else for (var j = 0; j < mu.addedNodes.length; j++) translateTree(mu.addedNodes[j]);
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    // Toasts / alerts from the page scripts
    if (window.AlKhalis && window.AlKhalis.App && window.AlKhalis.App.toast) {
      var orig = window.AlKhalis.App.toast.bind(window.AlKhalis.App);
      window.AlKhalis.App.toast = function (msg) { var a = [].slice.call(arguments); a[0] = (msg && tr(msg)) || msg; return orig.apply(null, a); };
    }
  }

  window.AlKhalis = window.AlKhalis || {};
  window.AlKhalis.i18n = { lang: lang, t: function (s) { return (dict && tr(s)) || s; }, langPath: langPath };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
