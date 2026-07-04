# AL KHALIS TOURS AND TRAVELS
## Complete SEO Implementation Guide
### www.alkhalistravels.com

---

## FILE PLACEMENT ON YOUR SERVER

```
/ (website root)
├── index.html               ← Home page
├── favicon.svg              ← ✅ ROOT (required)
├── site.webmanifest         ← ✅ ROOT (required)
├── robots.txt               ← ✅ ROOT (required)
├── sitemap.xml              ← ✅ ROOT (required)
├── sitemap-images.xml       ← ✅ ROOT
├── sitemap-news.xml         ← ✅ ROOT
├── browserconfig.xml        ← ✅ ROOT
├── .htaccess                ← ✅ ROOT (Apache only)
├── 404.html                 ← ✅ ROOT
│
├── pages/
│   ├── flight.html
│   ├── visa.html
│   ├── hotel.html
│   ├── packages.html
│   ├── forex.html
│   ├── hajj.html
│   ├── contact.html
│   ├── about.html
│   └── blog.html
│
├── assets/                  ← Create this folder
│   ├── og-home.jpg          ← 1200×630px OG images (one per page)
│   ├── og-flights.jpg
│   ├── og-visa.jpg
│   ├── og-hotel.jpg
│   ├── og-packages.jpg
│   ├── og-forex.jpg
│   ├── og-hajj.jpg
│   ├── og-contact.jpg
│   ├── og-about.jpg
│   ├── og-blog.jpg
│   ├── logo.png             ← 400×120px transparent PNG
│   ├── apple-touch-icon.png ← 180×180px PNG
│   ├── favicon-96.png       ← 96×96px PNG
│   └── icons/
│       ├── icon-192.png     ← Most critical (Android home screen)
│       ├── icon-512.png     ← Most critical (PWA splash)
│       └── mstile-150x150.png
│
├── css/                     (your existing CSS)
├── js/                      (your existing JS)
└── data/                    (your existing data)
```

---

## IMMEDIATE POST-UPLOAD CHECKLIST

### Day 1 — Technical Setup
- [ ] Upload ALL files to server root
- [ ] Test HTTPS works: https://www.alkhalistravels.com
- [ ] Verify www redirect: http://alkhalistravels.com → https://www.alkhalistravels.com
- [ ] Test robots.txt: https://www.alkhalistravels.com/robots.txt
- [ ] Test sitemap: https://www.alkhalistravels.com/sitemap.xml
- [ ] Test 404 page by visiting a non-existent URL

### Day 1 — Google Setup
- [ ] Sign up at https://search.google.com/search-console
- [ ] Add property: https://www.alkhalistravels.com
- [ ] Verify via HTML file or DNS TXT record
- [ ] Submit sitemap: Sitemaps → https://www.alkhalistravels.com/sitemap.xml
- [ ] Submit sitemap-images.xml
- [ ] Request indexing for homepage

### Day 1 — Google Business Profile
- [ ] Go to https://business.google.com
- [ ] Create or claim "Al Khalis Tours and Travels"
- [ ] Add HEAD OFFICE address (Saki Naka, Mumbai 400072)
- [ ] Add BRANCH address (Mira Road East 401107)
- [ ] Category: "Travel Agency"
- [ ] Add phone: +91 98929 60023
- [ ] Add website: www.alkhalistravels.com
- [ ] Add hours: Mon–Fri 10–7, Sat 10–5
- [ ] Upload 10+ high-quality photos of office, team, packages
- [ ] Enable messaging

### Day 2 — OG Images
Create 10 images at 1200×630px in Canva (free):
- Background: navy (#0A1628) with gold accent (#C9A84C)
- Include Al Khalis logo + page title + phone number
- Save as JPG, 80% quality
- Upload to /assets/ folder

### Day 2 — Analytics
- [ ] Create GA4 property at analytics.google.com
- [ ] Copy Measurement ID (G-XXXXXXXXXX)
- [ ] Replace 'G-XXXXXXXXXX' in js/modules/analytics.js
- [ ] Create Facebook Pixel at business.facebook.com
- [ ] Replace '0000000000000' in analytics.js
- [ ] Verify both are firing with browser extension

### Week 1 — Favicon Icons
- [ ] Go to https://realfavicongenerator.net
- [ ] Upload favicon.svg
- [ ] Set background: #0A1628
- [ ] Download all icon sizes
- [ ] Upload to /assets/icons/ folder

### Week 1 — Rich Results Testing
| Test | URL |
|------|-----|
| Schema validation | https://validator.schema.org |
| Rich results | https://search.google.com/test/rich-results |
| Open Graph | https://developers.facebook.com/tools/debug/ |
| Twitter Card | https://cards-dev.twitter.com/validator |
| Page speed | https://pagespeed.web.dev |
| Mobile-friendly | https://search.google.com/test/mobile-friendly |

---

## KEY SEO FEATURES IN EVERY PAGE

### Schema.org Markup
- **Home**: TravelAgency + WebSite + FAQPage
- **Flight**: Service + BreadcrumbList + FAQPage
- **Visa**: Service + BreadcrumbList + FAQPage
- **Hotel**: Service + BreadcrumbList + FAQPage
- **Packages**: ItemList (TouristTrip) + BreadcrumbList + FAQPage
- **Forex**: FinancialService + BreadcrumbList + FAQPage
- **Hajj**: Service (4 Offers) + BreadcrumbList + FAQPage (5 Qs)
- **Contact**: ContactPage + LocalBusiness + BreadcrumbList
- **About**: AboutPage + Organization + BreadcrumbList
- **Blog**: Blog + BlogPosting (3 posts) + BreadcrumbList

### Open Graph
- og:type, og:title, og:description, og:url, og:image (1200×630)
- og:image:width, og:image:height, og:image:alt, og:image:type
- og:locale (en_IN), og:site_name, article:publisher

### Twitter/X Cards
- twitter:card (summary_large_image)
- twitter:site, twitter:creator, twitter:title, twitter:description
- twitter:image, twitter:image:alt

### Technical SEO
- Canonical URLs on every page
- hreflang en-IN on every page
- x-default on homepage
- geo.region, geo.placename, geo.position (local SEO)
- Inline critical CSS (LCP optimization)
- Deferred font loading (CLS prevention)
- Preconnect/DNS-prefetch hints
- Lazy loading on all images/iframes

### Internal Linking
- Every page has 15 keyword-rich internal links in SEO silo footer
- Breadcrumbs on all subpages
- Navigation cross-links all 10 pages

---

## MONTHLY MAINTENANCE

- Update <lastmod> dates in sitemap.xml for changed pages
- Add new blog posts to sitemap-news.xml
- Monitor Core Web Vitals in Search Console
- Respond to Google Business Profile reviews (improves local SEO)
- Add new client reviews to aggregateRating reviewCount in Schema
- Check Search Console for crawl errors monthly
- Update keywords if Google Search Console shows impressions but no clicks
