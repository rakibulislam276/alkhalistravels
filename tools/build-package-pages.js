#!/usr/bin/env node
/* ================================================================
   BUILD PACKAGE PAGES
   ----------------------------------------------------------------
   Creates one static HTML page per tour package:
       pages/packages/<slug>.html
   from two sources:
     - data/data.js               → name, price, nights, image, tag…
     - tools/package-itineraries.js → overview, day-by-day plan,
                                      inclusions, FAQs…
   It also rewrites the package block in sitemap.xml.

   Run from the repo root:   node tools/build-package-pages.js
   Pages are plain HTML (no JS needed to show the content), which is
   best for Google. Re-run this after changing a price or itinerary.
   ================================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://alkhalistravels.com';
const OUT_DIR = path.join(ROOT, 'pages', 'packages');
const PHONE = '+91 98929 60023';
const PHONE_LINK = 'tel:+919892960023';
const WA = '919892960023';
const TODAY = new Date().toISOString().slice(0, 10);

/* ── Load data.js (it sets window.AlKhalis.Data) ────────────── */
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', 'data.js'), 'utf8'), sandbox);
const D = sandbox.window.AlKhalis && sandbox.window.AlKhalis.Data;
if (!D || !Array.isArray(D.packages)) throw new Error('Could not read packages from data/data.js');
const DETAILS = require('./package-itineraries.js');

/* ── Helpers ────────────────────────────────────────────────── */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inr = n => '₹' + Number(n).toLocaleString('en-IN');
const img = (url, w, h) => url.replace(/w=\d+/, 'w=' + w).replace(/h=\d+/, 'h=' + h);
const pageUrl = p => `${SITE}/pages/packages/${p.slug}.html`;
const json = o => JSON.stringify(o).replace(/</g, '\\u003c');

const CAT_LABEL = { international: 'International', domestic: 'Domestic India', religious: 'Religious', honeymoon: 'Honeymoon', group: 'Group Tour' };
const cats = p => p.cat.split(/\s+/).filter(Boolean);
const catLabels = p => cats(p).map(c => CAT_LABEL[c] || c);
const MEAL_ICON = { Breakfast: 'fa-mug-saucer', Lunch: 'fa-bowl-food', Dinner: 'fa-utensils' };

/* Related: packages sharing a category first, then the rest; skip self. */
function related(p, n = 3) {
  const mine = cats(p);
  const others = D.packages.filter(x => x !== p);
  const score = x => cats(x).filter(c => mine.includes(c)).length;
  return others.map((x, i) => ({ x, s: score(x), i })).sort((a, b) => b.s - a.s || a.i - b.i).slice(0, n).map(o => o.x);
}

function waLink(p) {
  const msg = `Hello! I'm interested in the ${p.name} package (${p.nights}N/${p.nights + 1}D, from ${inr(p.price)} ${p.priceNote}). Please share details and dates.`;
  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}

/* Number the itinerary days, allowing an entry to span several days. */
function numberDays(p, det) {
  let day = 1;
  const rows = det.itinerary.map(d => {
    const span = d.span || 1;
    const label = span > 1 ? `Day ${day}–${day + span - 1}` : `Day ${day}`;
    day += span;
    return { ...d, label };
  });
  const total = day - 1;
  if (total !== p.nights + 1) throw new Error(`${p.slug}: itinerary covers ${total} days but package is ${p.nights}N/${p.nights + 1}D`);
  return rows;
}

/* ── Page template ──────────────────────────────────────────── */
function buildPage(p, idx) {
  const det = DETAILS[p.slug];
  if (!det) throw new Error(`No itinerary for slug "${p.slug}" in tools/package-itineraries.js`);
  const days = numberDays(p, det);
  const url = pageUrl(p);
  const nd = `${p.nights} Nights / ${p.nights + 1} Days`;
  const titleTag = `${det.title} | ${nd} | Al Khalis Travels`;
  const heroImg = img(p.img, 1600, 700);
  const ogImg = img(p.img, 1200, 630);
  const rel = related(p);
  const prev = D.packages[(idx - 1 + D.packages.length) % D.packages.length];
  const next = D.packages[(idx + 1) % D.packages.length];
  const enquire = `../contact.html?pkg=${encodeURIComponent(p.name)}`;

  /* Structured data */
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      '@id': url + '#trip',
      name: `${p.name} – ${nd}`,
      description: det.metaDesc,
      url,
      image: ogImg,
      touristType: catLabels(p),
      provider: { '@type': 'TravelAgency', name: 'Al Khalis Tours and Travels', url: SITE + '/', telephone: PHONE },
      itinerary: {
        '@type': 'ItemList',
        numberOfItems: days.length,
        itemListElement: days.map((d, i) => ({ '@type': 'ListItem', position: i + 1, name: `${d.label}: ${d.title}`, description: d.desc }))
      },
      offers: { '@type': 'Offer', price: String(p.price), priceCurrency: 'INR', availability: 'https://schema.org/InStock', url, description: `Starting price ${p.priceNote}` }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': url + '#product',
      name: `${p.name} Tour Package`,
      description: det.metaDesc,
      image: ogImg,
      brand: { '@type': 'Brand', name: 'Al Khalis Tours and Travels' },
      category: 'Tour package',
      offers: { '@type': 'Offer', price: String(p.price), priceCurrency: 'INR', availability: 'https://schema.org/InStock', url, seller: { '@type': 'TravelAgency', name: 'Al Khalis Tours and Travels' } }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Tour Packages', item: SITE + '/pages/packages.html' },
        { '@type': 'ListItem', position: 3, name: p.name, item: url }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: det.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    }
  ];

  const facts = [
    ['fa-regular fa-clock', 'Duration', nd],
    ['fa-solid fa-location-dot', 'Destination', p.dest],
    ['fa-solid fa-plane-departure', 'Departs from', 'Mumbai'],
    ['fa-solid fa-users', 'Ideal for', catLabels(p).join(', ')]
  ];

  const dayHtml = days.map((d, i) => `
          <details class="pd-day"${i === 0 ? ' open' : ''}>
            <summary>
              <span class="pd-day__num">${esc(d.label)}</span>
              <span class="pd-day__title">${esc(d.title)}</span>
              <i class="fa-solid fa-chevron-down pd-day__chev" aria-hidden="true"></i>
            </summary>
            <div class="pd-day__body">
              <p>${esc(d.desc)}</p>${d.meals && d.meals.length ? `
              <ul class="pd-meals" aria-label="Meals included">${d.meals.map(m => `<li><i class="fa-solid ${MEAL_ICON[m] || 'fa-utensils'}" aria-hidden="true"></i> ${esc(m)}</li>`).join('')}</ul>` : ''}
            </div>
          </details>`).join('');

  const relHtml = rel.map(r => `
        <a class="pd-rel" href="${r.slug}.html">
          <img src="${esc(img(r.img, 600, 400))}" alt="${esc(r.alt || r.name)}" loading="lazy" width="600" height="400">
          <span class="pd-rel__body">
            <span class="pd-rel__name">${esc(r.name)}</span>
            <span class="pd-rel__meta"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${esc(r.dest)}</span>
            <span class="pd-rel__meta"><i class="fa-regular fa-clock" aria-hidden="true"></i> ${r.nights}N / ${r.nights + 1}D</span>
            <span class="pd-rel__price">From ${inr(r.price)} <small>${esc(r.priceNote)}</small></span>
          </span>
        </a>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- GENERATED by tools/build-package-pages.js — edit tools/package-itineraries.js or data/data.js, then re-run the script. -->
  <meta charset="UTF-8">
  <script>/* theme: set before paint to avoid a flash */(function(){var d=document.documentElement,t;try{t=localStorage.getItem("ak-theme")}catch(e){}if(t!=="light"&&t!=="dark")t=window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.setAttribute("data-theme",t)})();</script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${esc(titleTag)}</title>
  <meta name="description" content="${esc(det.metaDesc)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="author" content="Al Khalis Tours and Travels">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="en-IN" href="${url}">
  <link rel="icon" type="image/svg+xml" href="../../favicon.svg">
  <link rel="icon" type="image/png" sizes="96x96" href="../../assets/favicon-96.png">
  <link rel="apple-touch-icon" sizes="180x180" href="../../assets/apple-touch-icon.png">
  <link rel="manifest" href="../../site.webmanifest">
  <meta name="theme-color" content="#0D1B2A">

  <meta property="og:type" content="product">
  <meta property="og:site_name" content="Al Khalis Tours and Travels">
  <meta property="og:title" content="${esc(p.name)} – ${nd} | From ${inr(p.price)}">
  <meta property="og:description" content="${esc(det.metaDesc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${esc(ogImg)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(p.alt || p.name)}">
  <meta property="og:locale" content="en_IN">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@alkhalistravels">
  <meta name="twitter:title" content="${esc(p.name)} – ${nd} | From ${inr(p.price)}">
  <meta name="twitter:description" content="${esc(det.metaDesc)}">
  <meta name="twitter:image" content="${esc(ogImg)}">

  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
  <link rel="preload" as="image" href="${esc(heroImg)}">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="../../css/base/tokens.css">
  <link rel="stylesheet" href="../../css/base/layout.css">
  <link rel="stylesheet" href="../../css/components/components.css">
  <link rel="stylesheet" href="../../css/components/animations.css">
  <link rel="stylesheet" href="../../css/components/nav.css">
  <link rel="stylesheet" href="../../css/pages/pages.css">
  <link rel="stylesheet" href="../../css/pages/images.css">
  <link rel="stylesheet" href="../../css/components/social-menu.css">
  <link rel="stylesheet" href="../../css/components/color-fix.css?v=2">
  <link rel="stylesheet" href="../../css/components/footer-social-fix.css">
  <link rel="stylesheet" href="../../css/pages/package-detail.css">
  <link rel="stylesheet" href="../../css/components/motion.css">

  <script type="application/ld+json">${json(schema)}</script>
  <link rel="stylesheet" href="../../css/components/theme.css">
</head>
<body class="pd-page">
<div id="nav-container"></div>

<section class="pd-hero" aria-label="${esc(p.name)}">
  <img class="pd-hero__img" src="${esc(heroImg)}" alt="${esc(p.alt || p.name)}" width="1600" height="700" fetchpriority="high">
  <div class="pd-hero__shade" aria-hidden="true"></div>
  <div class="pd-hero__content">
    <nav class="breadcrumb pd-crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span class="breadcrumb__sep">&rsaquo;</span><a href="../packages.html">Tour Packages</a><span class="breadcrumb__sep">&rsaquo;</span><span aria-current="page">${esc(p.name)}</span>
    </nav>
    <span class="pd-tag pd-tag--${esc(p.tagType)}">${esc(p.tag)}</span>
    <h1 class="pd-hero__title">${esc(p.name)} <span>Package</span></h1>
    <p class="pd-hero__sub"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${esc(p.dest)} &nbsp;·&nbsp; <i class="fa-regular fa-moon" aria-hidden="true"></i> ${nd}</p>
  </div>
</section>

<div class="pd-facts">
  <div class="pd-wrap pd-facts__inner">
    ${facts.map(f => `<div class="pd-fact"><i class="${f[0]}" aria-hidden="true"></i><span><small>${f[1]}</small>${esc(f[2])}</span></div>`).join('\n    ')}
    <div class="pd-fact pd-fact--price"><span><small>Starting from</small><strong>${inr(p.price)}</strong> <em>${esc(p.priceNote)}</em></span></div>
  </div>
</div>

<nav class="pd-tabs" aria-label="On this page">
  <div class="pd-wrap pd-tabs__inner">
    <a href="#overview">Overview</a><a href="#itinerary">Itinerary</a><a href="#inclusions">Inclusions</a><a href="#good-to-know">Good to know</a><a href="#faqs">FAQs</a><a href="#related">Similar Packages</a>
  </div>
</nav>

<main class="pd-wrap pd-layout">
  <div class="pd-main">

    <section id="overview" class="pd-sec" aria-labelledby="h-overview">
      <h2 id="h-overview">Overview</h2>
      <p class="pd-lead">${esc(det.overview)}</p>
      <h3>Tour highlights</h3>
      <ul class="pd-highlights">
        ${det.highlights.map(h => `<li><i class="fa-solid fa-star" aria-hidden="true"></i> ${esc(h)}</li>`).join('\n        ')}
      </ul>
      <div class="pd-includes-row" aria-label="Package includes">
        ${p.includes.map(i => `<span class="pkg-inc">${esc(i)}</span>`).join('')}
      </div>
    </section>

    <section id="itinerary" class="pd-sec" aria-labelledby="h-itin">
      <div class="pd-sec__head">
        <h2 id="h-itin">Day-by-day itinerary</h2>
        <button type="button" class="pd-expand" data-expand>Expand all</button>
      </div>
      <div class="pd-days">${dayHtml}
      </div>
    </section>

    <section id="inclusions" class="pd-sec" aria-labelledby="h-inc">
      <h2 id="h-inc">Inclusions &amp; exclusions</h2>
      <div class="pd-incexc">
        <div class="pd-box pd-box--inc">
          <h3><i class="fa-solid fa-circle-check" aria-hidden="true"></i> What's included</h3>
          <ul>${det.inclusions.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
        <div class="pd-box pd-box--exc">
          <h3><i class="fa-solid fa-circle-xmark" aria-hidden="true"></i> Not included</h3>
          <ul>${det.exclusions.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
      </div>
    </section>

    <section id="good-to-know" class="pd-sec" aria-labelledby="h-gtk">
      <h2 id="h-gtk">Good to know</h2>
      <div class="pd-note"><strong><i class="fa-regular fa-calendar" aria-hidden="true"></i> Best time to go:</strong> ${esc(det.bestTime)}</div>
      <ul class="pd-gtk">
        <li>Prices start from ${inr(p.price)} ${esc(p.priceNote)} and change with travel dates, hotel choice and flight fares.</li>
        <li>The day-by-day plan is a guide. Sightseeing order can change with flight times, weather and local conditions.</li>
        <li>Every package is fully customisable: add nights, upgrade hotels or travel privately.</li>
        <li>Need a visa, forex or travel insurance? We arrange all of it under one roof.</li>
      </ul>
    </section>

    <section id="faqs" class="pd-sec" aria-labelledby="h-faq">
      <h2 id="h-faq">Frequently asked questions</h2>
      ${det.faqs.map(f => `<details class="pd-faq"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n      ')}
    </section>
  </div>

  <aside class="pd-side" aria-label="Book this package">
    <div class="pd-card">
      <div class="pd-card__price"><small>Starting from</small><strong>${inr(p.price)}</strong><span>${esc(p.priceNote)}</span></div>
      <ul class="pd-card__list">
        <li><i class="fa-regular fa-clock" aria-hidden="true"></i> ${nd}</li>
        <li><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${esc(p.dest)}</li>
        ${p.includes.map(i => `<li>${esc(i)}</li>`).join('')}
      </ul>
      <a class="pd-btn pd-btn--wa" href="${esc(waLink(p))}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Enquire on WhatsApp</a>
      <a class="pd-btn pd-btn--gold" href="${esc(enquire)}"><i class="fa-regular fa-paper-plane" aria-hidden="true"></i> Send Enquiry</a>
      <a class="pd-btn pd-btn--ghost" href="${PHONE_LINK}"><i class="fa-solid fa-phone" aria-hidden="true"></i> ${PHONE}</a>
      <p class="pd-card__small">Free quote · No booking fee · IATA certified</p>
    </div>
  </aside>
</main>

<section id="related" class="pd-related" aria-labelledby="h-rel">
  <div class="pd-wrap">
    <h2 id="h-rel">Similar packages you may like</h2>
    <div class="pd-rel-grid">${relHtml}
    </div>
    <nav class="pd-pn" aria-label="More packages">
      <a href="${prev.slug}.html" rel="prev"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> <span><small>Previous</small>${esc(prev.name)}</span></a>
      <a href="../packages.html" class="pd-pn__all">All packages</a>
      <a href="${next.slug}.html" rel="next"><span><small>Next</small>${esc(next.name)}</span> <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
    </nav>
  </div>
</section>

<div class="pd-mbar" aria-label="Quick booking">
  <div><small>From</small> <strong>${inr(p.price)}</strong> <em>${esc(p.priceNote)}</em></div>
  <a class="pd-btn pd-btn--wa" href="${esc(waLink(p))}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Enquire</a>
</div>

<div id="footer-container"></div>

<script src="../../data/data.js"></script>
<script src="../../js/core/app.js"></script>
<script src="../../js/modules/analytics.js"></script>
<script src="../../js/core/motion.js" defer></script>
<script>
  /* Expand / collapse all itinerary days */
  (function () {
    var btn = document.querySelector('[data-expand]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var days = document.querySelectorAll('.pd-day');
      var openAll = btn.textContent.trim() === 'Expand all';
      days.forEach(function (d) { d.open = openAll; });
      btn.textContent = openAll ? 'Collapse all' : 'Expand all';
    });
  })();
</script>
<link rel="stylesheet" href="../../css/components/ui-fixes.css">
</body>
</html>
`;
}

/* ── Sitemap block ──────────────────────────────────────────── */
function updateSitemap() {
  const file = path.join(ROOT, 'sitemap.xml');
  let xml = fs.readFileSync(file, 'utf8');
  const START = '  <!-- PACKAGE DETAIL PAGES (generated) -->';
  const END = '  <!-- /PACKAGE DETAIL PAGES -->';
  const block = [START, ...D.packages.map(p => `  <url>
    <loc>${pageUrl(p)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en-IN" href="${pageUrl(p)}"/>
  </url>`), END].join('\n');
  if (xml.includes(START)) {
    xml = xml.replace(new RegExp(START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), block);
  } else {
    // insert right after the packages.html <url> entry
    const anchor = xml.indexOf('<loc>https://alkhalistravels.com/pages/packages.html</loc>');
    const after = xml.indexOf('</url>', anchor) + '</url>'.length;
    xml = xml.slice(0, after) + '\n' + block + xml.slice(after);
  }
  fs.writeFileSync(file, xml);
}


/* ── Listing page (pages/packages.html): schema + plain links ── */
function replaceBetween(text, start, end, inner, file) {
  const a = text.indexOf(start), b = text.indexOf(end);
  if (a < 0 || b < 0) throw new Error(`Markers "${start}" / "${end}" missing in ${file}`);
  return text.slice(0, a + start.length) + '\n' + inner + '\n  ' + text.slice(b);
}
function updateListing() {
  const file = path.join(ROOT, 'pages', 'packages.html');
  let html = fs.readFileSync(file, 'utf8');
  const list = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    '@id': SITE + '/pages/packages.html#packagelist',
    name: 'Holiday Tour Packages from Mumbai',
    url: SITE + '/pages/packages.html',
    numberOfItems: D.packages.length,
    itemListElement: D.packages.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: pageUrl(p), name: p.name }))
  };
  html = replaceBetween(html, '<!-- PACKAGE LIST SCHEMA (generated) -->', '<!-- /PACKAGE LIST SCHEMA -->',
    `  <script type="application/ld+json">${json(list)}</script>`, 'pages/packages.html');
  const links = `    <nav class="pkg-links" aria-labelledby="pkg-links-h" style="margin-top:2.5rem;padding:1.4rem 1.2rem;border:1px solid #E9ECEF;border-radius:14px;background:#F8F9FA">
      <h2 id="pkg-links-h" style="font-family:var(--font-serif);font-size:1.3rem;color:var(--navy);margin:0 0 .8rem">Full day-by-day itineraries</h2>
      <ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:.5rem 1.2rem">
${D.packages.map(p => `        <li><a href="packages/${p.slug}.html" style="color:var(--navy);text-decoration:none;font-size:.9rem;line-height:1.9">${esc(p.name)} <span style="color:#5D6D7E">· ${p.nights}N/${p.nights + 1}D · ${inr(p.price)}</span></a></li>`).join('\n')}
      </ul>
    </nav>`;
  html = replaceBetween(html, '<!-- PACKAGE LINKS (generated) -->', '<!-- /PACKAGE LINKS -->', links, 'pages/packages.html');
  fs.writeFileSync(file, html);
}

/* ── Run ────────────────────────────────────────────────────── */
fs.mkdirSync(OUT_DIR, { recursive: true });
const seen = new Set();
D.packages.forEach((p, i) => {
  if (!p.slug) throw new Error(`Package "${p.name}" has no slug in data/data.js`);
  if (seen.has(p.slug)) throw new Error(`Duplicate slug ${p.slug}`);
  seen.add(p.slug);
  fs.writeFileSync(path.join(OUT_DIR, p.slug + '.html'), buildPage(p, i));
  console.log('✓ pages/packages/' + p.slug + '.html');
});
updateSitemap();
updateListing();
console.log('✓ pages/packages.html list + schema updated');
console.log('✓ sitemap.xml updated (' + D.packages.length + ' package pages)');
