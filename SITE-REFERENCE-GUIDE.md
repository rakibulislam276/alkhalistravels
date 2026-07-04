# ═══════════════════════════════════════════════════════════════
# AL KHALIS TOURS AND TRAVELS — COMPLETE SITE REFERENCE GUIDE
# Where everything is · How to change anything
# ═══════════════════════════════════════════════════════════════

## ┌─────────────────────────────────────────────────────────────┐
## │                  COMPLETE FOLDER STRUCTURE                  │
## └─────────────────────────────────────────────────────────────┘

alkhalis-v2/                          ← Upload THIS entire folder to server root
│
├── index.html                        ← HOME PAGE
├── 404.html                          ← Custom "Page Not Found" error page
├── favicon.svg                       ← Browser tab icon (SVG — scales to any size)
├── robots.txt                        ← Tells Google which pages to crawl
├── sitemap.xml                       ← All 10 pages listed for Google indexing
├── sitemap-images.xml                ← Images listed for Google Image Search
├── sitemap-news.xml                  ← Blog posts for Google News
├── site.webmanifest                  ← PWA — makes site installable on phones
├── browserconfig.xml                 ← Windows tile settings (Microsoft Edge)
├── .htaccess                         ← Apache server: HTTPS, caching, security
├── SEO-GUIDE.md                      ← Step-by-step Google setup instructions
│
├── pages/                            ← ALL SUBPAGES (10 pages)
│   ├── flight.html                   ← Flight Booking page
│   ├── visa.html                     ← Visa Services page
│   ├── hotel.html                    ← Hotel Booking page
│   ├── packages.html                 ← Tour Packages page
│   ├── forex.html                    ← Forex / Currency Exchange page
│   ├── hajj.html                     ← Hajj & Umrah page
│   ├── contact.html                  ← Contact Us page
│   ├── about.html                    ← About Us page
│   └── blog.html                     ← News & Blogs page
│
├── css/                              ← ALL STYLING FILES
│   ├── base/
│   │   ├── tokens.css                ← COLOURS, FONTS, SPACING — change here first
│   │   └── layout.css                ← Grid system, containers, section sizes
│   ├── components/
│   │   ├── components.css            ← Buttons, cards, forms, badges, modals
│   │   ├── animations.css            ← All animations and scroll effects
│   │   ├── nav.css                   ← Topbar, Navbar, Footer, Social buttons,
│   │   │                                Floating WhatsApp+Call buttons
│   │   └── main.css                  ← Master import (loads all CSS in order)
│   └── pages/
│       ├── pages.css                 ← Page-specific layouts (hero, cards, etc.)
│       ├── images.css                ← Background images for all hero sections
│       └── booking.css               ← Homepage booking widget (Flight/Hotel/
│                                        Packages/Umrah tabs) full styling
│
├── js/                               ← ALL JAVASCRIPT FILES
│   ├── core/
│   │   └── app.js                    ← MASTER FILE: Topbar HTML · Navbar HTML ·
│   │                                    Footer HTML · Social icons · Floating
│   │                                    buttons · Page loader · Scroll reveal ·
│   │                                    Counter animation · Form handling ·
│   │                                    Toast notifications · Active nav links
│   └── modules/
│       ├── booking.js                ← Homepage search widget: Flight search ·
│       │                                Hotel search · Package quote · Umrah
│       │                                booking · Result modal · WhatsApp redirect
│       ├── renderer.js               ← Reads data.js and builds: Services grid ·
│       │                                Destinations · Hotels · Packages · Blog
│       │                                posts · Testimonials · Team · Umrah tiers ·
│       │                                FAQs · Partners · Visa countries
│       ├── flight.js                 ← Flight page: search · filter sidebar ·
│       │                                sort · render results · route chips
│       ├── forex.js                  ← Forex page: live chart · rates table ·
│       │                                currency converter · 60-sec auto refresh
│       └── analytics.js              ← Google Analytics 4 · Facebook Pixel ·
│                                        scroll depth · form tracking · call tracking
│
├── data/
│   └── data.js                       ← ★ MASTER CONTENT FILE ★
│                                        ALL website text, prices, names,
│                                        stats, packages, hotels, FAQs etc.
│                                        Change content HERE — applies everywhere
│
└── assets/
    ├── logo-wide-rgba.png            ← Wide logo used in: Navbar + Footer
    ├── logo-square-rgba.png          ← Square logo used in: App icons
    ├── logo-wide-original.png        ← Your original wide logo (backup)
    ├── logo-square-original.png      ← Your original square logo (backup)
    ├── logo-wide.png                 ← Wide logo (with black bg)
    ├── logo-square.png               ← Square logo (with black bg)
    ├── logo-og.png                   ← Logo for Open Graph images
    ├── apple-touch-icon.png          ← iPhone home screen icon (180×180)
    ├── favicon-96.png                ← Browser favicon PNG fallback
    │
    ├── icons/                        ← App icons for all devices
    │   ├── icon-48.png  to icon-512.png   ← Android/PWA home screen icons
    │   ├── mstile-70x70.png          ← Windows Start menu tiles
    │   ├── mstile-144x144.png
    │   ├── mstile-150x150.png
    │   ├── mstile-310x150.png
    │   └── mstile-310x310.png
    │
    └── images/                       ← ALL WEBSITE IMAGES
        │
        ├── HERO BACKGROUND IMAGES (one per page)
        ├── hero-home.jpg             ← Home page hero background
        ├── hero-flight.jpg           ← Flight page hero background
        ├── hero-visa.jpg             ← Visa page hero background
        ├── hero-hotel.jpg            ← Hotel page hero background
        ├── hero-packages.jpg         ← Packages page hero background
        ├── hero-forex.jpg            ← Forex page hero background
        ├── hero-hajj.jpg             ← Hajj & Umrah page hero background
        ├── hero-contact.jpg          ← Contact page hero background
        ├── hero-about.jpg            ← About Us page hero background
        ├── hero-blog.jpg             ← Blog page hero background
        │
        ├── OPEN GRAPH IMAGES (shown when sharing on WhatsApp/Facebook)
        ├── og-home.jpg               ← Share preview for Home page
        ├── og-flights.jpg            ← Share preview for Flight page
        ├── og-visa.jpg               ← Share preview for Visa page
        ├── og-hotel.jpg              ← Share preview for Hotel page
        ├── og-packages.jpg           ← Share preview for Packages page
        ├── og-forex.jpg              ← Share preview for Forex page
        ├── og-hajj.jpg               ← Share preview for Hajj page
        ├── og-contact.jpg            ← Share preview for Contact page
        ├── og-about.jpg              ← Share preview for About page
        ├── og-blog.jpg               ← Share preview for Blog page
        │
        ├── DESTINATION CARDS (Home page "Where Will You Go Next?" section)
        ├── dest-dubai.jpg
        ├── dest-makkah.jpg
        ├── dest-singapore.jpg
        ├── dest-paris.jpg
        │
        ├── BLOG THUMBNAILS (Blog page post images)
        ├── blog-umrah.jpg
        ├── blog-dubai.jpg
        ├── blog-visa.jpg
        ├── blog-family.jpg
        ├── blog-forex.jpg
        │
        ├── UMRAH PACKAGE TIER IMAGES (Hajj page)
        ├── tier-economy.jpg
        ├── tier-standard.jpg
        ├── tier-premium.jpg
        ├── tier-luxury.jpg
        │
        ├── SERVICE ICON BACKGROUNDS
        ├── svc-flight.jpg / svc-visa.jpg / svc-hotel.jpg / svc-packages.jpg
        ├── svc-forex.jpg / svc-hajj.jpg / svc-tours.jpg / svc-insurance.jpg
        │
        └── TEAM MEMBER PHOTOS
            team-founder.jpg / team-flight.jpg / team-visa.jpg / team-hajj.jpg


═══════════════════════════════════════════════════════════════════
  SECTION-BY-SECTION: WHAT IS WHERE & HOW TO CHANGE IT
═══════════════════════════════════════════════════════════════════


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1. BRAND COLOURS — css/base/tokens.css  (lines 8–20)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  To change GOLD colour:
    --gold:        #C9A84C;   ← Main gold
    --gold-light:  #E8C97A;   ← Lighter gold (used in text on dark bg)
    --gold-dark:   #9A7A2E;   ← Darker gold
    --gold-muted:  rgba(201,168,76,0.12);  ← Transparent gold for backgrounds

  To change NAVY/DARK colour:
    --navy:        #0A1628;   ← Darkest navy
    --navy-mid:    #12223E;   ← Mid navy
    --navy-light:  #1C3358;   ← Lighter navy

  To change BACKGROUND colour:
    --cream:       #FAF7F0;   ← Main page background (light sections)
    --cream-dark:  #F0EBE0;   ← Slightly darker cream sections

  To change FONTS:
    --font-serif:  'Cormorant Garamond', Georgia, serif;  ← Headings
    --font-sans:   'Outfit', system-ui, sans-serif;       ← Body text


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 2. TOPBAR (top strip with phone + email)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  FILE: js/core/app.js  →  search "topbar"  (around line 78)

  To change phone numbers:
    href="tel:+919892960023"  and the text "+91 98929 60023"
    href="tel:+917021231145"  and the text "+91 70212 31145"

  To change email:
    href="mailto:info@alkhalistravels.com"
    and the visible text "info@alkhalistravels.com"

  To change business hours:
    Find "Mon–Sat: 10AM–7PM" and edit the text

  Topbar background colour:
    FILE: css/components/nav.css  →  search ".topbar {"
    Change: background: var(--navy);


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 3. NAVBAR (main navigation menu)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  FILE: js/core/app.js  →  search "buildNav()"  (around line 95)

  To change LOGO:
    Replace file: assets/logo-wide-rgba.png
    (Keep same filename OR update the src in app.js → search "nav-logo__img")

  To change menu items / links:
    Find the "pages" array in buildNav() — edit href or label

  To add a new menu item:
    Add: { href: r + 'pages/newpage.html', label: 'New Page' }

  To change "Book Now" button text:
    Find: class="nav-cta" and edit the text "Book Now"

  Navbar background (when scrolled):
    FILE: css/components/nav.css  →  search "#navbar.scrolled {"
    Change: background: rgba(10,22,40,0.97);

  Active link underline colour:
    FILE: css/components/nav.css  →  search ".nav-links a::after {"
    Change: background: var(--gold);


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 4. HOME PAGE — index.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ── 4a. HERO SECTION (full screen intro)
  FILE: index.html  →  search "HERO SECTION"

    To change "Mumbai's Most Trusted Travel Agency" pill text:
      Find: class="hero__tag"
      Edit the text between the span tags

    To change main headline "Your Journey to Dream Destinations Starts Here":
      Find: class="hero__title"
      Edit the text — "accent" class = gold coloured words

    To change description paragraph:
      Find: class="hero__desc"
      Edit the paragraph text

    To change "Explore Packages" button:
      Find: class="btn btn--gold" → edit text and href

    To change "Get Free Quote" button:
      Find: class="btn btn--outline-white" → edit text and href

    To change mini stats (15,000+ Happy Clients / 50+ Destinations / 20yrs):
      FILE: data/data.js  →  search "stats:" (line 28)
      Edit number, suffix, label for each stat

    HERO BACKGROUND IMAGE:
      FILE: assets/images/hero-home.jpg
      Replace this file with your own photo (keep same filename)
      OR: css/pages/images.css → search ".hero {" → change url()

  ── 4b. BOOKING WIDGET (Flight/Hotel/Packages/Umrah tabs)
  FILE: js/modules/booking.js

    To change popular flight routes chips:
      Search "_routeChips()" → edit the routes array
      Format: ['Display Text', 'From City (CODE)', 'To City (CODE)']

    To change hotel popular city chips:
      Search "setHotelDest" inside bw-hotel panel → edit chip names

    To change package destinations in dropdown:
      Search "pkg-dest" → edit the <option> tags and values

    To change Umrah package tiers and prices:
      Search "UMRAH_PRICES:" → edit economy/standard/premium/luxury values

    To change base flight price estimates:
      Search "FLIGHT_PRICES:" → edit price for each route

    WhatsApp number (in result modal):
      Search "wa.me/919892960023" → replace with your number

  ── 4c. STATISTICS BAR (gold bar with numbers)
  FILE: data/data.js  →  search "stats:" (line 28)
    Edit: number, suffix ("+", "%", "yrs"), label

  ── 4d. SERVICES SECTION ("Complete Travel Solutions")
  FILE: data/data.js  →  search "services:" (line 37)
    Each service: { icon, title, desc, href }
    Edit icon (emoji), title, description, or link

  ── 4e. DESTINATIONS SECTION ("Where Will You Go Next?")
  FILE: data/data.js  →  search "destinations:" (line 49)
    Each card: { emoji, name, sub, price, bg, href }
    Edit destination name, flight time, price, background colour gradient

  ── 4f. WHY CHOOSE US SECTION
  FILE: index.html  →  search "WHY CHOOSE US"
    Edit the 4 features: icon, heading, description text directly in HTML

  ── 4g. TESTIMONIALS / REVIEWS SECTION
  FILE: data/data.js  →  search "testimonials:" (line 112)
    Each review: { initials, name, trip, stars, text }
    Add/edit/remove customer reviews here

  ── 4h. CTA SECTION ("Ready for Your Next Adventure?")
  FILE: index.html  →  search "cta-section"
    Edit heading, paragraph, button texts and links directly

  ── 4i. AIRLINE PARTNERS (bottom strip)
  FILE: data/data.js  →  search "partners:" (line ~183)
    Edit the array of airline/partner names


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 5. FLIGHT PAGE — pages/flight.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ── Hero text (title, subtitle, breadcrumb):
    FILE: pages/flight.html  →  search "page-hero__title"
    Edit h1, subtitle paragraph directly in HTML

  ── Flight search form fields (From, To, Date, Class, Passengers):
    FILE: pages/flight.html  →  search "search-wrap"
    Edit labels, placeholder text, select options

  ── Popular route chips (Mumbai → Dubai etc.):
    FILE: pages/flight.html  →  search "route-chip"
    Edit data-from, data-to, and display text of each chip

  ── Filter sidebar (Airlines, Stops, Price):
    FILE: pages/flight.html  →  search "filter-sidebar"
    Add/remove airline checkboxes or change price range limits

  ── Sample flight results:
    FILE: js/modules/flight.js  →  search "FLIGHTS =" OR "allFlights"
    FILE: data/data.js  →  search "flights:" (line 57)
    Edit airline name, flight number, departure/arrival times, price

  ── "Why Book With Us" cards:
    FILE: pages/flight.html  →  search "Why Book With Us"
    Edit icon, title, description directly in HTML


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 6. VISA PAGE — pages/visa.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ── Visa countries grid (flags with country names):
    FILE: data/data.js  →  search "visaCountries:" (line ~163)
    Each entry: { flag, name, type }
    Add/remove countries, change visa type labels

  ── 4-step process (Fill → Submit → Embassy → Delivered):
    FILE: pages/visa.html  →  search "process-timeline"
    Edit step numbers, titles, descriptions directly

  ── Visa types (Tourist, Business, Student etc.):
    FILE: pages/visa.html  →  search "types-heading"
    Edit icon, name, description of each visa type card

  ── Visa enquiry form fields:
    FILE: pages/visa.html  →  search "Visa Enquiry Form"
    Add/remove fields, change dropdown options directly

  ── Success stats (98%, 5000+):
    FILE: pages/visa.html  →  search "Our Success Record"
    Edit numbers directly in HTML


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 7. HOTEL PAGE — pages/hotel.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ── Hotel cards (name, location, price, amenities, rating):
    FILE: data/data.js  →  search "hotels:" (line 67)
    Each hotel: { emoji, name, loc, stars, rating, reviews, price, amenities, bg }
    Change price: edit the number (e.g. price:18500 = ₹18,500/night)
    Change background colour: edit "bg" gradient colours

  ── Popular city chips (Dubai, Makkah etc.):
    FILE: pages/hotel.html  →  search "class=\"chip\""
    Edit onclick destination name and chip label

  ── "Why Book Hotels With Us" cards:
    FILE: pages/hotel.html  →  search "why-hotel-heading"
    Edit 4 cards directly in HTML


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 8. PACKAGES PAGE — pages/packages.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ── All tour packages (name, price, nights, includes, category):
    FILE: data/data.js  →  search "packages:" (line 77)
    Each package:
      name     → Package title
      dest     → Destination shown under name
      nights   → Duration number
      price    → Price in INR (e.g. 42999 = ₹42,999)
      priceNote→ "per person" or "per couple"
      cat      → Filter category: 'international','domestic','religious',
                 'honeymoon','group' (controls which filter tab shows it)
      includes → Array of 4 inclusions shown as chips
      tag      → Badge text (e.g. "Best Seller")
      tagType  → Badge colour: 'gold','blue','green'

  ── Filter tab categories:
    FILE: pages/packages.html  →  search "filter-tab-row"
    Edit button labels or data-cat values

  ── Urgency strip ("Limited Time Offer"):
    FILE: pages/packages.html  →  search "Limited Time Offer"
    Edit the promotional text or remove the entire <div>

  ── "Can't Find Your Package?" CTA:
    FILE: pages/packages.html  →  search "Bespoke Travel"
    Edit heading, description, button texts and links


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 9. FOREX PAGE — pages/forex.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ── Live currency rates (buy/sell prices):
    FILE: data/data.js  →  search "currencies:" (line 90)
    Each currency: { code, name, flag, buy, sell, change, pct }
    Update buy/sell prices daily as needed

  ── Currency converter options:
    FILE: js/modules/forex.js  →  search "initConverter()"
    Currencies are pulled from data.js automatically

  ── Chart period buttons (7D, 1M, 3M, 6M):
    FILE: pages/forex.html  →  search "time-btn-group"
    Edit button labels or data-period values

  ── "What We Offer" list (Exchange, Travel Cards etc.):
    FILE: pages/forex.html  →  search "What We Offer"
    Edit the list items directly in HTML

  ── Disclaimer text:
    FILE: pages/forex.html  →  search "Disclaimer"
    Edit the disclaimer paragraph


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 10. HAJJ & UMRAH PAGE — pages/hajj.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ── Umrah package tiers (Economy/Standard/Premium/Luxury):
    FILE: data/data.js  →  search "umrahPackages:" (line 104)
    Each tier:
      tier      → Name displayed
      icon      → Emoji
      nights    → Duration
      price     → Price per person in INR
      headerBg  → CSS gradient for the coloured header
      features  → Array of what's included (✓ items)
      missing   → Array of what's NOT included (✗ items)
      popular   → true/false — shows "Most Popular" badge

  ── Departure schedule cards (June, July, Ramadan):
    FILE: pages/hajj.html  →  search "Upcoming Departures"
    Edit month name, date range, price, seat availability text

  ── Hajj eligibility requirements:
    FILE: pages/hajj.html  →  search "Hajj Eligibility"
    Edit the bullet points directly in HTML

  ── 4 feature stats (5,000+ Pilgrims / 20+ Years / 100% / 24/7):
    FILE: pages/hajj.html  →  search "data-target"
    Edit the number and label text

  ── FAQ questions and answers:
    FILE: data/data.js  →  search "faqs:" → "umrah:" section
    Edit question (q) and answer (a) text


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 11. CONTACT PAGE — pages/contact.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ── Phone numbers, email, addresses, hours:
    FILE: data/data.js  →  search "site:" (line 13)
    Changing here updates data layer — but contact.html also has
    them hardcoded. Update BOTH for full coverage.

  ── Contact page HTML addresses:
    FILE: pages/contact.html  →  search "Head Office" / "Branch Office"
    Edit address text, phone links, email links directly

  ── Google Map embed:
    FILE: pages/contact.html  →  search "<iframe"
    Replace the src="https://www.google.com/maps/embed?..." URL
    Get new embed URL from: Google Maps → Share → Embed a map

  ── Enquiry form dropdown options:
    FILE: pages/contact.html  →  search "Service Required"
    Add/remove <option> tags for services

  ── Office tab switching (Head / Branch button):
    FILE: pages/contact.html  →  search "switchOffice"
    Edit address content in #office-head and #office-branch divs


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 12. ABOUT PAGE — pages/about.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ── Company story paragraphs:
    FILE: pages/about.html  →  search "Our Story"
    Edit the <p> tags directly

  ── Timeline (2005, 2008, 2011 etc.):
    FILE: pages/about.html  →  search "timeline-item"
    Edit year, title, description for each milestone

  ── Team members (name, role, description):
    FILE: data/data.js  →  search "team:" (line ~175)
    Each: { initial, name, role, desc }
    Change initial (shows as avatar letter), name, role, description

  ── Team member PHOTOS:
    FILE: assets/images/team-founder.jpg (and team-flight, team-visa, team-hajj)
    Replace these files with real team photos
    Recommended size: 400×400px square

  ── Core values (Integrity, Excellence etc.):
    FILE: pages/about.html  →  search "values-heading"
    Edit 4 value cards: icon, title, description


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 13. BLOG PAGE — pages/blog.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ── Blog post cards (title, excerpt, author, date, tags):
    FILE: data/data.js  →  search "blogPosts:" (line 122)
    Each post: { emoji, cat, catType, date, read, author, title, excerpt, tags }
    Edit title, excerpt, date, author name, reading time

  ── Blog thumbnail images:
    FILE: assets/images/blog-umrah.jpg etc.
    Replace with real article photos (recommended: 800×500px)

  ── Sidebar categories and post counts:
    FILE: pages/blog.html  →  search "Blog categories"
    Edit category names and counts directly in HTML

  ── Recent posts sidebar:
    FILE: pages/blog.html  →  search "Recent Posts"
    Edit post titles and dates directly in HTML

  ── Newsletter form (sidebar):
    FILE: pages/blog.html  →  search "Subscribe Now"
    Connect this to your email service (Mailchimp etc.)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 14. FOOTER (appears on all pages)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  FILE: js/core/app.js  →  search "buildFooter()"

  ── Footer LOGO:
    Replace: assets/logo-wide-rgba.png
    (Same file used in navbar and footer)

  ── "Your Trusted Travel Partner Since 2005" tagline:
    Find: class="footer-brand__tag" → edit text

  ── Description paragraph:
    Find: class="footer-desc" → edit paragraph

  ── Address lines (both offices):
    Find the two footer-contact-row divs → edit address text and phone links

  ── Social media icons and links:
    Find: class="footer-social" in buildFooter()
    Edit each href="https://www.facebook.com/..." etc.
    Current 8 icons: Facebook · Instagram · X/Twitter · YouTube
                     WhatsApp · LinkedIn · Telegram · Email

  ── Quick Links column:
    Find the "Quick Links" section → edit link texts and hrefs

  ── Our Services column:
    Find the "Our Services" section → edit service names and hrefs

  ── Newsletter email input:
    Currently shows success toast. To connect to real email service:
    FILE: js/core/app.js  →  search "newsletter-form"
    Replace the form submit handler with your API call

  ── Certification badges (IATA, TAAI, Ministry of Hajj, RBI):
    Find: class="footer-certs" → edit cert-pill text labels

  ── Copyright year:
    Find: ${new Date().getFullYear()} → auto-updates every year

  ── Footer background colour:
    FILE: css/components/nav.css  →  search "footer {"
    Change: background: #060D1B;


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 15. FLOATING BUTTONS (WhatsApp + Call — bottom right)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  FILE: js/core/app.js  →  search "Floating Action Buttons"

  ── WhatsApp number:
    Find: href="https://wa.me/919892960023" → change to your number
    Format: wa.me/91XXXXXXXXXX (no spaces, no dashes, with country code)

  ── WhatsApp pre-filled message:
    Find: ?text=Hello%21%20I%20am%20interested%20...
    Edit the text (URL-encoded — use %20 for spaces, %21 for !)

  ── Call button phone number:
    Find: href="tel:+919892960023" → change to your number

  ── Button colours:
    FILE: css/components/nav.css  →  search ".float-btn--wa {" and ".float-btn--call {"
    WhatsApp: background: #25D366;
    Call:     background: linear-gradient(135deg, #FF8C00, #FFA500);

  ── Button size:
    FILE: css/components/nav.css  →  search ".float-btn {"
    Change: width: 58px; height: 58px;

  ── Button position (how far from bottom/right edge):
    FILE: css/components/nav.css  →  search ".float-btns-wrap {"
    Change: right: 22px; bottom: 90px;


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 16. STICKY CTA BAR (bottom strip "Ready to travel?")
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  FILE: js/core/app.js  →  search "sticky-cta"

  ── Text "Ready to travel? Talk to our experts!":
    Find: class="sticky-cta__text" → edit the text

  ── Button labels ("Call Now", "Get Free Quote", "WhatsApp"):
    Find the 3 <a> tags inside sticky-cta__actions → edit text and hrefs

  ── When it appears (after scrolling how far):
    FILE: js/core/app.js  →  search "initStickyCTA()"
    Change: window.scrollY > 400  (400px from top)

  ── Bar background colour:
    FILE: css/components/nav.css  →  search ".sticky-cta {"
    Change: background: var(--navy);


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 17. HERO IMAGES (all pages)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  FILE: css/pages/images.css  (all hero backgrounds defined here)
  FILE: assets/images/hero-*.jpg  (actual image files)

  To replace a hero image with your own photo:
    1. Prepare your photo — recommended 1920×800px JPG
    2. Name it exactly as shown (e.g. hero-home.jpg)
    3. Replace the file in assets/images/
    4. The CSS automatically uses it — no code change needed

  To change the dark overlay intensity on hero images:
    FILE: css/pages/images.css  →  search ".page-hero::after"
    Change rgba(6,14,28,0.65) → higher number = darker overlay
    Range: 0.0 (none) to 1.0 (completely black)

  Home page hero specifically:
    FILE: css/pages/images.css  →  search ".hero::after"
    Same principle — edit the rgba opacity values


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 18. SEO META TAGS (title, description, keywords)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Each page has its own SEO tags in the <head> section:

  HOME:     index.html              →  lines 1–165
  FLIGHT:   pages/flight.html       →  lines 1–100
  VISA:     pages/visa.html         →  lines 1–100
  HOTEL:    pages/hotel.html        →  lines 1–100
  PACKAGES: pages/packages.html     →  lines 1–100
  FOREX:    pages/forex.html        →  lines 1–100
  HAJJ:     pages/hajj.html         →  lines 1–100
  CONTACT:  pages/contact.html      →  lines 1–100
  ABOUT:    pages/about.html        →  lines 1–100
  BLOG:     pages/blog.html         →  lines 1–100

  In each file, look for and edit:
    <title> ... </title>
    <meta name="description" content="...">
    <meta name="keywords" content="...">
    <meta property="og:title" content="...">
    <meta property="og:description" content="...">
    <link rel="canonical" href="...">

  Schema.org (rich results for Google):
    Look for: <script type="application/ld+json">
    Edit business name, address, phone, hours, prices inside the JSON


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 19. ANALYTICS — Google Analytics + Facebook Pixel
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  FILE: js/modules/analytics.js  →  lines 1–20

  To connect Google Analytics:
    Change: GA4_ID: 'G-XXXXXXXXXX'
    Replace with your real ID from analytics.google.com
    Format: 'G-ABCDE12345'

  To connect Facebook Pixel:
    Change: FB_PIXEL_ID: '0000000000000'
    Replace with your real Pixel ID from business.facebook.com
    Format: '1234567890123'

  To enable debug logging (see all events in browser console):
    Change: debug: false  →  debug: true


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 20. SITEMAP — Update when adding new content
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  FILE: sitemap.xml

  When you publish a new blog post:
    Add a new <url> block at the bottom
    Update <lastmod> date on the changed page
    Re-submit sitemap in Google Search Console

  When you change package prices:
    Update <lastmod> for packages.html to today's date
    Google will re-crawl and re-index the updated prices


═══════════════════════════════════════════════════════════════════
  QUICK REFERENCE: MOST COMMON EDITS
═══════════════════════════════════════════════════════════════════

  ┌─────────────────────────────────────┬──────────────────────────────────────┐
  │ WHAT TO CHANGE                      │ WHERE TO CHANGE IT                   │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Phone number (everywhere)           │ data/data.js → phone1, phone2        │
  │                                     │ js/core/app.js → topbar + footer     │
  │                                     │ js/modules/booking.js → wa.me link   │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Email address (everywhere)          │ data/data.js → email                 │
  │                                     │ js/core/app.js → topbar + footer     │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Business address                    │ data/data.js → head_office,          │
  │                                     │ branch_office                        │
  │                                     │ pages/contact.html → HTML directly   │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Package prices                      │ data/data.js → packages → price      │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Umrah prices                        │ data/data.js → umrahPackages → price │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Forex exchange rates                │ data/data.js → currencies → buy/sell │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Stats (15,000+ clients etc.)        │ data/data.js → stats → number        │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Customer reviews/testimonials       │ data/data.js → testimonials          │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Team member names                   │ data/data.js → team                  │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Team member photos                  │ assets/images/team-*.jpg             │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Logo                                │ assets/logo-wide-rgba.png (navbar)   │
  │                                     │ assets/logo-square-rgba.png (icons)  │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Hero background images              │ assets/images/hero-*.jpg             │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Social media links                  │ js/core/app.js → buildFooter()       │
  │                                     │ search "footer-social"               │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Gold colour                         │ css/base/tokens.css → --gold         │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Navy/dark colour                    │ css/base/tokens.css → --navy         │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Font family                         │ css/base/tokens.css → --font-serif   │
  │                                     │ and --font-sans                      │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ WhatsApp floating button number     │ js/core/app.js → search "wa.me"      │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Google Analytics ID                 │ js/modules/analytics.js → GA4_ID    │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Google Map on contact page          │ pages/contact.html → <iframe src=    │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Page title (browser tab)            │ Each page → <title> in <head>        │
  ├─────────────────────────────────────┼──────────────────────────────────────┤
  │ Meta description (Google snippet)   │ Each page → <meta name="description" │
  └─────────────────────────────────────┴──────────────────────────────────────┘
