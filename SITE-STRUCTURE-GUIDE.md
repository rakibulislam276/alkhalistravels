# AL KHALIS TRAVELS — SITE STRUCTURE & EDITING GUIDE
**www.alkhalistravels.com · Hosted on GitHub Pages · Updated: 20 July 2026**

This is the master reference for the website. It answers three questions:
what is where, which file controls which part of the site, and where to go
when you need to edit something. Keep this file in the repo root and update
it when the structure changes.

---

## 1. THE BIG PICTURE — HOW THIS SITE WORKS

This is a **static site** with a **data-driven design**. There is no
database and no server code. Three ideas explain everything:

1. **Content lives in `data/data.js`.** Packages, prices, blog card info,
   FAQs, testimonials, partner airlines, team members — almost every piece
   of *changeable text* is in this ONE file. The HTML pages are mostly
   empty shells with placeholder containers.

2. **JavaScript fills the shells.** When a page loads, `js/core/app.js`
   injects the topbar, navbar, mobile menu, floating buttons, sticky bar
   and footer into every page, and `js/modules/renderer.js` reads
   `data.js` and fills the content sections (destination cards, blog
   cards, packages, FAQs, etc.).

3. **CSS is split by purpose** across `css/base`, `css/components` and
   `css/pages`. The file `css/components/color-fix.css` loads LAST on
   every page, so global overrides and mobile fixes live at the bottom
   of that file.

**Golden workflow (never skip):** open GitHub Desktop → **Fetch origin** →
edit files locally → check the Changes list (expected files only, NO
unexpected red deletions) → Commit → **Push origin** → wait 1–2 min →
hard-refresh the live site. Never upload files through the GitHub website.

---

## 2. FULL FOLDER STRUCTURE

```
alkhalistravels\                        ← THE REPO ROOT
│
├── index.html                          Homepage (hero, all home sections, main schema)
├── 404.html                            "Page not found" page (self-contained design)
├── CNAME                               Custom domain config — NEVER EDIT OR DELETE
├── llms.txt                            AI-search business summary (ChatGPT etc. read this)
├── robots.txt                          Crawler rules + sitemap location
├── sitemap.xml                         All 16 page URLs for Google/Bing
├── site.webmanifest / browserconfig.xml  App icons config
├── favicon.svg                         Browser tab icon
│
├── blog.html ─┐
├── about.html │
├── contact.html│                       REDIRECT STUBS ONLY — forward old-website
├── package.html│                       URLs to the new pages. Never put content
├── destination.html                    here. The REAL pages are in pages\.
├── single.html ┘
│
├── pages\                              ← ALL INNER PAGES
│   ├── flight.html                     Flight booking page
│   ├── visa.html                       Visa services page
│   ├── hotel.html                      Hotel booking page
│   ├── packages.html                   Tour packages page
│   ├── forex.html                      Forex / currency page
│   ├── hajj.html                       Hajj & Umrah page
│   ├── about.html                      About Us page
│   ├── contact.html                    Contact page (addresses, map, form)
│   ├── blog.html                       Blog LISTING page (cards render from data.js)
│   ├── privacy.html                    Privacy Policy
│   └── blog\                           ← FULL BLOG ARTICLES (one file per article)
│       ├── umrah-guide-2025.html
│       ├── dubai-budget-guide.html
│       ├── schengen-visa-2025.html
│       ├── family-destinations.html
│       └── forex-tips.html
│
├── data\
│   └── data.js                         ★ THE CONTENT FILE — see Section 4
│
├── js\
│   ├── core\
│   │   └── app.js                      Topbar, navbar, mobile menu, footer,
│   │                                   floating buttons, sticky CTA bar,
│   │                                   scroll animations, counters
│   └── modules\
│       ├── renderer.js                 Reads data.js → builds cards/sections
│       ├── booking.js                  The hero booking widget (tabs, fields)
│       ├── flight.js                   Flight page logic
│       ├── forex.js                    Live currency rates logic
│       └── analytics.js                Visitor analytics
│
├── css\
│   ├── base\
│   │   ├── tokens.css                  Colors, fonts, spacing variables (the theme)
│   │   └── layout.css                  Page grid, hero layout, containers
│   ├── components\
│   │   ├── components.css              Buttons, cards, sections, footer grid
│   │   ├── nav.css                     Topbar, navbar, mobile menu, footer, newsletter
│   │   ├── booking.css → (in css\pages) — see below
│   │   ├── animations.css              Scroll-reveal animations
│   │   ├── marquee.css                 Scrolling ticker
│   │   ├── social-menu.css             "Follow us" floating menu
│   │   ├── footer-social-fix.css       Footer social icon circles
│   │   ├── homepage-sections-fix.css   Homepage section layouts (destinations grid)
│   │   ├── main.css                    General styles
│   │   └── color-fix.css               ★ LOADS LAST — light theme overrides +
│   │                                   ALL MOBILE FIXES live at the bottom
│   └── pages\
│       ├── pages.css                   Inner-page heroes, section styles
│       ├── booking.css                 Booking widget styling
│       └── images.css                  ★ WHICH PHOTO GOES WHERE — hero images
│                                       per page, destination & blog thumbnails
│
└── assets\
    ├── images\                         All photos (see Section 5 naming system)
    ├── icons\                          App/device icons
    ├── og-*.jpg (10 files, at assets\ root)  WhatsApp/Facebook share previews
    ├── logo-og.png, apple-touch-icon.png, favicon-96.png
    └── (logo files)
```

---

## 3. "I WANT TO EDIT ___" — QUICK LOOKUP TABLE

| What you want to change | File to edit | Notes |
|---|---|---|
| A blog article's text | `pages\blog\<article-name>.html` | Edit inside `<div class="article-body">` |
| Blog card title/date/excerpt on listing page | `data\data.js` → `blogPosts:` | Card info only; the article itself is separate |
| Package names & prices | `data\data.js` → `packages:` and `umrahPackages:` | |
| FAQs (any page) | `data\data.js` → `faqs:` | Grouped: general / visa / umrah / forex |
| Phone numbers, email, hours, addresses | `js\core\app.js` (topbar+footer) AND `data\data.js` → `site:` AND `pages\contact.html` AND `pages\privacy.html` | Same info lives in several places — change ALL |
| Testimonials | `data\data.js` → `testimonials:` | |
| Partner airlines list | `data\data.js` → `partners:` + logo in `assets\images\` | Displayed by inline script in `index.html` |
| Destination cards (home) | `data\data.js` → `destinations:` + photo `dest-*.jpg` | |
| Team members | `data\data.js` → `team:` | |
| Menu items (navbar) | `js\core\app.js` — search for `nav-links` | |
| Footer links / services list | `js\core\app.js` — footer section (~line 200+) | |
| Social media profile URLs | `js\core\app.js` — search `facebook.com/alkhalistravels` | Update to client's real profiles |
| Homepage hero headline & subtitle | `index.html` — search "Your Journey" | Static text in HTML |
| Hero background photo (home) | Replace `assets\images\hero-home.jpg` + bump `?v=` in `css\pages\images.css` AND `index.html` line ~184 | See Section 5 |
| Inner-page hero photos | Replace `assets\images\hero-<page>.jpg`; wiring is in `css\pages\images.css` | |
| Colors / fonts / spacing | `css\base\tokens.css` | Change once, applies everywhere |
| Mobile layout issues | Bottom of `css\components\color-fix.css` | The mobile-fix block |
| Privacy Policy text | `pages\privacy.html` | |
| 404 page | `404.html` | Self-contained; safe to edit alone |
| SEO: page titles & descriptions | Each page's `<head>` — `<title>` and `<meta name="description">` | |
| SEO: business info for AI search | `llms.txt` | Plain text, easy |
| SEO: add page to Google/Bing | `sitemap.xml` — copy an existing `<url>` block | Then resubmit in Search Console |

---

## 4. INSIDE `data\data.js` — THE CONTENT FILE

The file is one big object: `window.AlKhalis.Data = { ... }`. Each section
below is a named list. Line numbers are approximate — use Ctrl+F.

| Section | What it controls | Shown on |
|---|---|---|
| `site:` | Business name, phones, email, hours | Used across pages |
| `stats:` | 15,000+ clients / destinations / years counters | Homepage hero |
| `services:` | The service cards | Homepage |
| `destinations:` | Dubai/Paris/Singapore/Makkah cards + prices | Homepage |
| `flights:` | Popular flight routes & fares | Flight page |
| `hotels:` | Hotel listings | Hotel page |
| `packages:` | Tour packages & prices | Packages page |
| `currencies:` | Currency list for forex | Forex page |
| `umrahPackages:` | Umrah package tiers & prices | Hajj page |
| `testimonials:` | Customer reviews carousel | Homepage |
| `blogPosts:` | Blog CARD info: title, date, author, excerpt, tags, thumbnail (`img:`), link (`url:`) | Blog listing page |
| `faqs:` | Q&A groups: general, visa, umrah, forex | Respective pages |
| `popularRoutes:` | Route chips under booking widget | Homepage |
| `visaCountries:` | Country visa list, prices, processing times | Visa page |
| `team:` | Team member cards | About page |
| `partners:` | 22 airline names + logo paths | Homepage |

**Editing rules for data.js — IMPORTANT:**
- Keep the exact punctuation pattern: `{ name:'...', price:'...' },` —
  every quote, comma and bracket matters. One missing comma breaks the
  ENTIRE site's dynamic content (we learned this the hard way).
- If your text contains an apostrophe, write it as `\'`
  (example: `'Mumbai\'s best'`).
- After editing, test locally by opening the site before pushing, or at
  minimum watch the live site right after deploy. If cards/sections
  suddenly vanish site-wide, you broke data.js syntax — undo the commit.

---

## 5. IMAGES — THE NAMING SYSTEM

All photos live in `assets\images\`. The prefix tells you what it's for:

| Prefix | Purpose | Size | Wired up in |
|---|---|---|---|
| `hero-*.jpg` | Page hero backgrounds (hero-home, hero-visa, …) | wide, ~1800px | `css\pages\images.css` |
| `dest-*.jpg` | Homepage destination cards | portrait | `data.js` destinations |
| `blog-*.jpg` | Blog card thumbnails + article header images | 800×500 | `data.js` blogPosts (`img:`) + inside each article file |
| `svc-*.jpg` | Service images | — | services section |
| `og-*.jpg` (in `assets\` root, NOT images\) | WhatsApp/Facebook link previews | 1200×630 | Each page's `<head>` meta tags |
| Airline names (`Emirates.png` …) | Partner logos | — | `data.js` partners |
| `nta-iata-taai-tafi.jpg` | Certification badges strip | — | Footer (app.js) |

**To swap a photo:** the safest method is to give the NEW file the SAME
name as the old one, replace it in the folder, then add or bump a version
number where it's referenced — e.g. change `hero-home.jpg?v=2` to `?v=3`
in `css\pages\images.css` (and `index.html` for the homepage hero). The
version bump forces every visitor's browser to fetch the new image
instead of showing the cached old one.

---

## 6. HOW TO EDIT A BLOG ARTICLE (STEP BY STEP)

1. Open `pages\blog\` and open the article file (e.g.
   `family-destinations.html`) in any editor (VS Code recommended).
2. All the readable text is between `<div class="article-body">` and the
   matching `</div>` before `<div class="article-cta">`.
   - Paragraph = `<p>...</p>`
   - Section heading = `<h2>...</h2>`, sub-heading = `<h3>...</h3>`
   - Bullet list = `<ul><li>...</li></ul>`
   - Gold tip box = `<div class="article-tip">...</div>`
3. If you change the TITLE, change it in FOUR places for consistency:
   the `<title>` tag, the `og:title` meta, the `"headline"` in the
   JSON-LD block, and the `<h1>` — plus the matching card title in
   `data.js → blogPosts`.
4. Commit → Push → hard-refresh the article page.

## 7. HOW TO ADD A BRAND-NEW ARTICLE (STEP BY STEP)

1. **Copy** an existing article in `pages\blog\` (pick the one closest in
   style) and rename it, e.g. `dubai-visa-guide.html`. Use lowercase
   words separated by hyphens, ending in `.html`.
2. Inside the new file, update: `<title>`, meta description, ALL
   `og:` tags, the canonical URL, the JSON-LD block (headline,
   description, dates, author, URL — it appears twice as `@id` and
   `mainEntityOfPage`), the `<h1>`, breadcrumb label, the header image,
   the meta row (date/read time/author/category), the body, and the
   WhatsApp CTA text.
3. **Add the article's photo**: an 800×500 jpg in `assets\images\` named
   `blog-<topic>.jpg`.
4. **Add a card** in `data\data.js → blogPosts:` — copy an existing line,
   update every field, set `img:'assets/images/blog-<topic>.jpg'` and
   `url:'blog/<your-file-name>.html'`.
5. **Add the URL to `sitemap.xml`** — copy an existing blog `<url>` block
   and change the address + date.
6. Commit → Push → then in Google Search Console paste the new URL in the
   top bar → **Request Indexing** (and the same in Bing's URL Submission).

---

## 8. FILES YOU MUST NEVER TOUCH CASUALLY

| File | Why |
|---|---|
| `CNAME` | One character wrong = the whole domain goes down |
| `.git` folder (hidden) | The repo's memory — corrupting it detaches Git |
| `robots.txt` | Wrong rule can de-index the entire site |
| Redirect stubs (root blog.html, about.html, etc.) | They look useless but preserve old links' SEO value |
| `js\modules\renderer.js` & `js\core\app.js` | Editable, but a syntax error blanks large parts of the site — always test after |

---

## 9. DEPLOYMENT & TROUBLESHOOTING CHEAT SHEET

- **Change not showing after push?** Wait 2 minutes for GitHub Pages, then
  hard-refresh (Ctrl+Shift+R). Still stale → open in incognito. If
  incognito shows the new version, it's your cache, not the site.
- **A whole section is suddenly empty?** Almost always a JavaScript syntax
  error in the last thing edited (usually `data.js`). Press F12 →
  Console → the red error names the file and line.
- **Widget/nav unstyled?** A CSS file failed to load — F12 → Network tab →
  look for red 404 rows.
- **GitHub Desktop shows files you didn't change as deleted?** STOP. Do
  not commit. You're probably in a stale copy of the folder.
- **Changing CSS or JS?** Consider bumping the `?v=` number on that
  file's `<link>`/`<script>` tag so all visitors get the update
  immediately.
