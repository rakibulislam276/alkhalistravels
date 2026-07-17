/* ================================================================
   DATA.JS — Central Data Layer (Replace with API calls later)
   All content, flights, hotels, packages, currencies, FAQs
   ================================================================ */

'use strict';

window.AlKhalis = window.AlKhalis || {};

window.AlKhalis.Data = {

  /* ── SITE CONFIG ──────────────────────────────────────────── */
  site: {
    name:    'Al Khalis Tours and Travels',
    tagline: 'Your Journey to Dream Destinations Starts Here',
    phone1:  '+919892960023',
    phone2:  '+917021231145',
    email:   'info@alkhalistravels.com',
    website: 'www.alkhalistravels.com',
    whatsapp:'https://wa.me/919892960023',
    head_office:   'Vaikunth Nadekar Chawl, 02, 90 Feet Rd, Saki Naka, Mumbai — 400072',
    branch_office: 'Shop No. 10, Opp. Mira Road Railway Station, Mira Road East — 401107',
    hours:   'Mon–Fri: 10AM–7PM · Saturday: 10AM–5PM',
    founded: 2005,
  },

  /* ── STATS ────────────────────────────────────────────────── */
  stats: [
    { number: 15000, suffix: '+', label: 'Happy Clients' },
    { number: 5000,  suffix: '+', label: 'Pilgrims Served' },
    { number: 20,    suffix: '+', label: 'Years Experience' },
    { number: 98,    suffix: '%', label: 'Visa Approval Rate' },
    { number: 50,    suffix: '+', label: 'Destinations' },
  ],

  /* ── SERVICES ─────────────────────────────────────────────── */
  services: [
    {
      icon: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop&auto=format',
      title: 'Flight Booking',
      desc: 'Domestic & international flights at the lowest prices. Compare 200+ airlines instantly.',
      href: 'pages/flight.html',
      alt: 'Airplane flying above clouds'
    },
    {
      icon: 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=400&h=300&fit=crop&auto=format',
      title: 'Visa Services',
      desc: 'Tourist, business, Schengen, Umrah visas with 98% approval rate & fast processing.',
      href: 'pages/visa.html',
      alt: 'Passport and travel documents'
    },
    {
      icon: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&auto=format',
      title: 'Hotel Booking',
      desc: 'Handpicked hotels from budget to luxury across 50+ worldwide destinations.',
      href: 'pages/hotel.html',
      alt: 'Luxury hotel pool'
    },
    {
      icon: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop&auto=format',
      title: 'Tour Packages',
      desc: 'Customised group, family & honeymoon holiday packages for every budget.',
      href: 'pages/packages.html',
      alt: 'Tourists exploring a destination'
    },
    {
      icon: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&h=300&fit=crop&auto=format',
      title: 'Forex Services',
      desc: 'Best exchange rates for 20+ currencies. RBI authorized money changer.',
      href: 'pages/forex.html',
      alt: 'Currency exchange and money'
    },
    {
      icon: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=300&fit=crop&auto=format',
      title: 'Hajj & Umrah',
      desc: 'Ministry approved operator. 5,000+ pilgrims served. Packages from ₹72,000.',
      href: 'pages/hajj.html',
      alt: 'Masjid al-Haram Makkah'
    },
    {
      icon: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop&auto=format',
      title: 'Group Tours',
      desc: 'Organized group travel with expert guides and end-to-end logistics.',
      href: 'pages/packages.html',
      alt: 'Group of tourists on tour'
    },
    {
      icon: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&auto=format',
      title: 'Travel Insurance',
      desc: 'Comprehensive travel insurance for peace of mind on every journey.',
      href: 'pages/contact.html',
      alt: 'Travel insurance protection'
    },
  ],

  /* ── DESTINATIONS ─────────────────────────────────────────── */
  destinations: [
    {
      img:   'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format',
      name:  'Dubai, UAE',
      sub:   '3h 30min from Mumbai',
      price: 'From ₹35,000',
      href:  'pages/packages.html',
      alt:   'Dubai skyline with Burj Khalifa'
    },
    {
      img:   'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop&auto=format',
      name:  'Paris, France',
      sub:   '9h from Mumbai',
      price: 'From ₹65,000',
      href:  'pages/packages.html',
      alt:   'Eiffel Tower Paris'
    },
    {
      img:   'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop&auto=format',
      name:  'Singapore',
      sub:   '5h 30min from Mumbai',
      price: 'From ₹45,000',
      href:  'pages/packages.html',
      alt:   'Singapore Marina Bay Sands skyline'
    },
    {
      img:   'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop&auto=format',
      name:  'Makkah, KSA',
      sub:   'Hajj & Umrah Packages',
      price: 'From ₹72,000',
      href:  'pages/hajj.html',
      alt:   'Masjid al-Haram Makkah'
    },
  ],

  /* ── FLIGHTS ──────────────────────────────────────────────── */
  flights: [
    { airline:'IndiGo',      num:'6E-201', logo:'🔵', dep:'06:20', arr:'09:50', from:'BOM', to:'DXB', dur:'3h 30m', stops:'Non Stop', price:8450,  tag:'Cheapest',  cls:'Economy' },
    { airline:'Air Arabia',  num:'G9-477', logo:'🔴', dep:'09:15', arr:'12:55', from:'BOM', to:'DXB', dur:'3h 40m', stops:'Non Stop', price:9200,  tag:'Popular',   cls:'Economy' },
    { airline:'Emirates',    num:'EK-502', logo:'✈',  dep:'13:30', arr:'16:55', from:'BOM', to:'DXB', dur:'3h 25m', stops:'Non Stop', price:12800, tag:'Premium',   cls:'Economy' },
    { airline:'Air India',   num:'AI-914', logo:'🟠', dep:'17:40', arr:'21:30', from:'BOM', to:'DXB', dur:'3h 50m', stops:'Non Stop', price:10500, tag:'',          cls:'Economy' },
    { airline:'flydubai',    num:'FZ-121', logo:'🟡', dep:'22:15', arr:'02:00', from:'BOM', to:'DXB', dur:'3h 45m', stops:'Non Stop', price:7990,  tag:'Best Value',cls:'Economy' },
    { airline:'Qatar Airways',num:'QR-543',logo:'🟣', dep:'08:00', arr:'13:30', from:'BOM', to:'DOH', dur:'5h 30m', stops:'Non Stop', price:15800, tag:'',          cls:'Economy' },
  ],

  /* ── HOTELS ───────────────────────────────────────────────── */
  hotels: [
    { emoji:'🏰', name:'Atlantis The Palm',       loc:'Palm Jumeirah, Dubai', stars:5, rating:4.8, reviews:'2.4k', price:18500, amenities:['🏊 Pool','🌊 Waterpark','🍽 Restaurant','🏋 Gym'],        bg:'linear-gradient(135deg,#1a1a2e,#16213e)' },
    { emoji:'🕌', name:'Swissôtel Al Maqam',      loc:'Adjacent to Haram, Makkah', stars:5, rating:4.9, reviews:'1.8k', price:22000, amenities:['🕋 Haram View','🍽 Halal Dining','🚌 Shuttle','📶 WiFi'], bg:'linear-gradient(135deg,#1a472a,#2d6a4f)' },
    { emoji:'🌃', name:'Marina Bay Sands',         loc:'Marina Bay, Singapore', stars:5, rating:4.7, reviews:'3.1k', price:25000, amenities:['🏊 Infinity Pool','🎰 Casino','🍽 Dining','🛍 Shopping'],    bg:'linear-gradient(135deg,#0f3460,#533483)' },
    { emoji:'🏯', name:'The Taj Mahal Palace',     loc:'Apollo Bunder, Mumbai', stars:5, rating:4.9, reviews:'5.2k', price:28000, amenities:['🌊 Sea View','🍽 Multi-Cuisine','💆 Spa','🏊 Pool'],        bg:'linear-gradient(135deg,#2c1810,#5c3826)' },
    { emoji:'🗼', name:'Mercure Paris Notre Dame', loc:'Paris, France',         stars:4, rating:4.5, reviews:'987',  price:12500, amenities:['🗼 Eiffel View','🥐 Breakfast','📶 WiFi','🚇 Metro'],        bg:'linear-gradient(135deg,#1a1a4e,#2d2d8f)' },
    { emoji:'🌴', name:'Anantara Riverside Bangkok',loc:'Chao Phraya, Bangkok', stars:4, rating:4.6, reviews:'1.3k', price:8500,  amenities:['🌊 River View','🏊 Pool','🛶 Boat Shuttle','💆 Spa'],        bg:'linear-gradient(135deg,#1b4332,#2d6a4f)' },
  ],

  /* ── PACKAGES ─────────────────────────────────────────────── */
  packages: [
    {
      img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&auto=format',
      alt:'Dubai skyline Burj Khalifa',
      name:'Dubai Deluxe', dest:'Dubai, UAE', nights:5, price:42999,
      priceNote:'per person', cat:'international',
      includes:['✈ Flights','🏨 4★ Hotel','🚌 Transfers','🎯 Sightseeing'],
      tag:'Best Seller', tagType:'gold'
    },
    {
      img:'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop&auto=format',
      alt:'Masjid al-Haram Makkah',
      name:'Umrah Deluxe', dest:'Makkah & Madinah, KSA', nights:14, price:110000,
      priceNote:'per person', cat:'religious',
      includes:['✈ Direct Flight','🏨 5★ Hotel','🕋 Ziyarat','🍽 Meals'],
      tag:'Ministry Approved', tagType:'blue'
    },
    {
      img:'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop&auto=format',
      alt:'Singapore Marina Bay Sands',
      name:'Singapore + Malaysia', dest:'Singapore & Kuala Lumpur', nights:6, price:68000,
      priceNote:'per person', cat:'international',
      includes:['✈ Flights','🏨 Hotels','🚌 Transfers','🎡 Theme Parks'],
      tag:'Popular', tagType:'gold'
    },
    {
      img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop&auto=format',
      alt:'Bali rice terrace romantic',
      name:'Bali Honeymoon Special', dest:'Bali, Indonesia', nights:7, price:85000,
      priceNote:'per couple', cat:'honeymoon',
      includes:['✈ Flights','🛖 Villa Stay','🍽 Candlelit Dinner','💆 Spa'],
      tag:'Honeymoon', tagType:'gold'
    },
    {
      img:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop&auto=format',
      alt:'Eiffel Tower Paris Europe',
      name:'Europe Grand Tour', dest:'Paris · Rome · Amsterdam', nights:9, price:185000,
      priceNote:'per person', cat:'international',
      includes:['✈ Flights','🏨 4★ Hotels','🚄 Rail Pass','🧳 Expert Guide'],
      tag:'Premium', tagType:'gold'
    },
    {
      img:'https://images.unsplash.com/photo-1560179304-6fc1d8749b23?w=600&h=400&fit=crop&auto=format',
      alt:'Kashmir Dal Lake snow mountains',
      name:'Kashmir Valley Special', dest:'Srinagar · Gulmarg · Pahalgam', nights:5, price:28000,
      priceNote:'per person', cat:'domestic',
      includes:['✈ Flights','🏨 Houseboat','🛶 Shikara Ride','🍽 Meals'],
      tag:'Domestic', tagType:'green'
    },
    {
      img:'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400&fit=crop&auto=format',
      alt:'Thailand temple Bangkok',
      name:'South East Asia Group', dest:'Thailand · Vietnam · Cambodia', nights:10, price:95000,
      priceNote:'per person', cat:'group',
      includes:['✈ Flights','🏨 Hotels','🚌 Coach Tour','🧳 Expert Guide'],
      tag:'Group Tour', tagType:'blue'
    },
    {
      img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop&auto=format',
      alt:'Goa beach sunset waves',
      name:'Goa Beach Holiday', dest:'North & South Goa', nights:4, price:18500,
      priceNote:'per person', cat:'domestic',
      includes:['✈ Flights','🏨 Beach Resort','🚌 Transfers','🏄 Watersports'],
      tag:'Domestic', tagType:'green'
    },
    {
      img:'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop&auto=format',
      alt:'Maldives overwater villa turquoise',
      name:'Maldives Luxury Escape', dest:'North Malé Atoll', nights:6, price:145000,
      priceNote:'per couple', cat:'honeymoon international',
      includes:['✈ Flights','🛖 Overwater Villa','🤿 Snorkelling','🍽 All-inclusive'],
      tag:'Exclusive', tagType:'gold'
    },
    {
      img:'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=600&h=400&fit=crop&auto=format',
      alt:'Istanbul Blue Mosque Turkey',
      name:'Istanbul City Break', dest:'Istanbul, Turkey', nights:5, price:55000,
      priceNote:'per person', cat:'international',
      includes:['✈ Flights','🏨 4★ Hotel','🚌 City Tour','🚢 Bosphorus Cruise'],
      tag:'New', tagType:'blue'
    },
    {
      img:'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&h=400&fit=crop&auto=format',
      alt:'Andaman crystal blue water beach',
      name:'Andaman Adventure', dest:'Port Blair · Havelock · Neil Island', nights:5, price:32000,
      priceNote:'per person', cat:'domestic',
      includes:['✈ Flights','🏨 Resort','⛴ Ferry Transfers','🤿 Scuba Diving'],
      tag:'Adventure', tagType:'green'
    },
    {
      img:'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&h=400&fit=crop&auto=format',
      alt:'Switzerland Alps snowy mountains',
      name:'Switzerland Honeymoon', dest:'Zurich · Interlaken · Lucerne', nights:7, price:175000,
      priceNote:'per couple', cat:'honeymoon international',
      includes:['✈ Flights','🏨 5★ Hotels','🚞 Swiss Rail Pass','🎿 Snow Activities'],
      tag:'Luxury', tagType:'gold'
    },
    {
      img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop&auto=format',
      alt:'Tokyo Japan city lights',
      name:'Japan Cultural Tour', dest:'Tokyo · Kyoto · Osaka', nights:8, price:135000,
      priceNote:'per person', cat:'international group',
      includes:['✈ Flights','🏨 Hotels','🚄 Bullet Train Pass','🧳 Expert Guide'],
      tag:'Trending', tagType:'blue'
    },
  ],

  /* ── CURRENCIES ───────────────────────────────────────────── */
  currencies: [
    { code:'USD', name:'US Dollar',         flag:'🇺🇸', buy:83.10, sell:83.75, change:+0.18, pct:+0.22 },
    { code:'EUR', name:'Euro',              flag:'🇪🇺', buy:105.40,sell:106.20,change:-0.32, pct:-0.30 },
    { code:'GBP', name:'British Pound',     flag:'🇬🇧', buy:105.80,sell:106.60,change:+0.45, pct:+0.43 },
    { code:'AED', name:'UAE Dirham',        flag:'🇦🇪', buy:22.60, sell:22.85, change:+0.05, pct:+0.22 },
    { code:'SAR', name:'Saudi Riyal',       flag:'🇸🇦', buy:22.10, sell:22.35, change:+0.04, pct:+0.18 },
    { code:'SGD', name:'Singapore Dollar',  flag:'🇸🇬', buy:61.80, sell:62.40, change:-0.15, pct:-0.24 },
    { code:'AUD', name:'Australian Dollar', flag:'🇦🇺', buy:53.90, sell:54.70, change:+0.22, pct:+0.41 },
    { code:'CAD', name:'Canadian Dollar',   flag:'🇨🇦', buy:60.10, sell:60.90, change:-0.08, pct:-0.13 },
    { code:'JPY', name:'Japanese Yen',      flag:'🇯🇵', buy:0.545, sell:0.562, change:+0.003,pct:+0.55 },
    { code:'INR', name:'Indian Rupee',      flag:'🇮🇳', buy:1.00,  sell:1.00,  change:0,     pct:0 },
  ],

  /* ── UMRAH PACKAGES ───────────────────────────────────────── */
  umrahPackages: [
    { tier:'Economy', icon:'🌙', nights:12, price:72000, headerBg:'linear-gradient(135deg,#2c3e50,#4a6fa5)', features:['Direct Flight (Economy)','3★ Hotel Makkah (7N) — 300m from Haram','3★ Hotel Madinah (5N)','Umrah Visa Included','Ground Transport','Guided Ziyarat'], missing:['Meals not included'], popular:false },
    { tier:'Standard', icon:'⭐', nights:14, price:95000, headerBg:'linear-gradient(135deg,#8B6914,#C9A84C)', features:['Direct Flight (Economy)','4★ Hotel Makkah (8N) — 150m from Haram','4★ Hotel Madinah (6N)','Umrah Visa Included','Ground Transport','Guided Ziyarat','Breakfast + Dinner'], missing:[], popular:true },
    { tier:'Premium',  icon:'🌟', nights:14, price:125000,headerBg:'linear-gradient(135deg,#0A1628,#1C3358)',  features:['Direct Flight (Economy)','5★ Hotel Makkah (8N) — Haram View','5★ Hotel Madinah (6N)','Umrah Visa Included','Private AC Transport','All Meals Included','Personal Religious Guide'], missing:[], popular:false },
    { tier:'Luxury',   icon:'💎', nights:17, price:210000,headerBg:'linear-gradient(135deg,#1a0533,#4a0e8f)',  features:['Business Class Flights','Swissôtel / Fairmont Makkah','Oberoi Madinah','VIP Visa Processing','Dedicated Concierge','All Meals + Mini Bar','Private Car + Expert Guide'], missing:[], popular:false },
  ],

  /* ── TESTIMONIALS ─────────────────────────────────────────── */
  testimonials: [
    { initials:'A', name:'Arif Khan',      trip:'Dubai Family Package',  stars:5, text:'Excellent service from start to finish! Al Khalis handled our Dubai family trip perfectly — flights, hotel, visa, everything was seamless. Will definitely book again!' },
    { initials:'F', name:'Fatima Shaikh',  trip:'Umrah Package 2024',    stars:5, text:'Our Umrah package was beautifully organized. Every detail was taken care of. The team\'s guidance throughout the spiritual journey was deeply appreciated by our whole family.' },
    { initials:'R', name:'Rahul Sharma',   trip:'Europe Visa Service',   stars:5, text:'Got my Schengen visa approved in just 5 days with their help! Their visa team is incredibly professional and efficient. Highly recommend Al Khalis to everyone!' },
    { initials:'Z', name:'Zainab Patel',   trip:'Kashmir Tour Package',  stars:5, text:'The Kashmir package was beyond our expectations. The houseboat stay, Shikara ride — every moment was perfect. Thank you Al Khalis for making our holiday unforgettable!' },
    { initials:'M', name:'Mohammed Idrisi',trip:'Bali Honeymoon',        stars:5, text:'Our Bali honeymoon was absolutely magical. Al Khalis arranged everything perfectly — villa, candlelit dinner, spa. Best investment we ever made!' },
    { initials:'S', name:'Sunita Nair',    trip:'Singapore Package',     stars:5, text:'Second time booking with Al Khalis and they never disappoint. Singapore trip with kids was perfectly organized. Competitive prices and genuinely caring service!' },
  ],

  /* ── BLOG POSTS ───────────────────────────────────────────── */
  blogPosts: [
    { emoji:'🕋', cat:'Hajj & Umrah', catType:'blue',   url:'blog/umrah-guide-2025.html', date:'April 28, 2025', read:'8 min', author:'Al Khalis Team', title:'Complete Umrah Guide 2025: Everything You Need to Know Before Your Pilgrimage',         excerpt:'A comprehensive guide covering visa requirements, packing essentials, spiritual rituals, hotel recommendations and practical tips for first-time Umrah pilgrims.', tags:['Umrah','Saudi Arabia','Pilgrimage Guide'], featured:true },
    { emoji:'🏙', cat:'Destination',  catType:'gold',   url:'blog/dubai-budget-guide.html', date:'April 20, 2025', read:'5 min', author:'Ahmed Shaikh',   title:'Top 10 Things to Do in Dubai on a Budget — Mumbai Traveller\'s Guide',                  excerpt:'Dubai doesn\'t have to break the bank. From free beaches and iconic architecture to budget dining and souks — experience Dubai affordably from Mumbai.', tags:['Dubai','Budget Travel','UAE'], featured:false },
    { emoji:'📋', cat:'Visa News',    catType:'blue',   url:'blog/schengen-visa-2025.html', date:'April 15, 2025', read:'4 min', author:'Fatima Ansari',  title:'Schengen Visa from India in 2025: New Requirements, Processing Times & Tips',             excerpt:'Europe visa rules have changed significantly. Here\'s everything Indian travellers need to know about the updated Schengen requirements and digital application process.', tags:['Schengen','Europe Visa','2025'], featured:false },
    { emoji:'🌴', cat:'Packages',     catType:'gold',   date:'April 8, 2025',  read:'6 min', author:'Mohammed Khalis',title:'Best Family Holiday Destinations from Mumbai in 2025 — With Prices & Packages',          excerpt:'Planning a family trip this year? We\'ve rounded up the best destinations reachable from Mumbai with complete package pricing and travel tips.', tags:['Family Travel','Mumbai','Packages'], featured:false },
    { emoji:'💱', cat:'Forex',        catType:'gold',   date:'March 30, 2025', read:'3 min', author:'Al Khalis Team', title:'When to Exchange Currency for Your Trip: Smart Forex Tips for Indian Travellers',       excerpt:'Getting the best exchange rate can save thousands. Here\'s our expert guide on when, where, and how much currency to exchange before your international trip.', tags:['Forex','Currency','Money Tips'], featured:false },
  ],

  /* ── FAQ DATA ─────────────────────────────────────────────── */
  faqs: {
    general: [
      { q:'Where are your offices in Mumbai?',          a:'We have two offices: Head Office at Vaikunth Nadekar Chawl, Saki Naka, Mumbai 400072, and Branch Office at Shop No. 10, opposite Mira Road Railway Station, Mira Bhayandar 401107.' },
      { q:'What are your business hours?',              a:'Monday to Friday: 10:00 AM – 7:00 PM. Saturday: 10:00 AM – 5:00 PM. Sundays by appointment only.' },
      { q:'Do you offer doorstep service?',             a:'Yes! We offer doorstep delivery for visa documents and forex currency within Mumbai. WhatsApp us at +91 98929 60023 to arrange.' },
      { q:'Are you IATA certified?',                    a:'Yes. Al Khalis Tours and Travels is IATA certified and a proud member of TAAI (Travel Agents Association of India).' },
    ],
    visa: [
      { q:'What is your visa approval rate?',           a:'We maintain a 98% visa approval rate across all categories — tourist, business, Schengen, UK, USA, UAE and more.' },
      { q:'How long does visa processing take?',        a:'Processing times vary by country. UAE visa: 2–4 days. Schengen: 7–15 days. UK/USA: 2–8 weeks. We advise applying well in advance.' },
      { q:'Do you handle UK and USA visas?',            a:'Yes. We assist with complete documentation, form-filling, appointment booking and submission for UK and USA visas.' },
    ],
    umrah: [
      { q:'Is Al Khalis a Ministry approved Hajj operator?', a:'Yes. We are officially registered and approved under the Ministry of Hajj and Ministry of Minority Affairs, Government of India.' },
      { q:'What is the cheapest Umrah package?',        a:'Our Economy Umrah package starts from ₹72,000 per person including direct flights, visa, 3-star hotel near Haram and ground transport.' },
      { q:'When is Hajj 2026 registration open?',       a:'Hajj 2026 registration is now open. Seats are extremely limited — contact us immediately at +91 98929 60023 to register your interest.' },
    ],
  },

  /* ── POPULAR ROUTES ───────────────────────────────────────── */
  popularRoutes: [
    { from:'Mumbai (BOM)', to:'Dubai (DXB)' },
    { from:'Mumbai (BOM)', to:'Delhi (DEL)' },
    { from:'Mumbai (BOM)', to:'London (LHR)' },
    { from:'Mumbai (BOM)', to:'Singapore (SIN)' },
    { from:'Mumbai (BOM)', to:'Jeddah (JED)' },
    { from:'Mumbai (BOM)', to:'Bangkok (BKK)' },
    { from:'Mumbai (BOM)', to:'Muscat (MCT)' },
  ],

  /* ── VISA COUNTRIES ───────────────────────────────────────── */
  visaCountries: [
    { flag:'🇦🇪', name:'UAE / Dubai',      type:'Tourist · Business' },
    { flag:'🇸🇦', name:'Saudi Arabia',     type:'Umrah · Visit' },
    { flag:'🇬🇧', name:'United Kingdom',   type:'Tourist · Student' },
    { flag:'🇺🇸', name:'USA',              type:'B1/B2 · F1 Visa' },
    { flag:'🇸🇬', name:'Singapore',        type:'Tourist · Transit' },
    { flag:'🇩🇪', name:'Germany',          type:'Schengen Visa' },
    { flag:'🇫🇷', name:'France',           type:'Schengen Visa' },
    { flag:'🇦🇺', name:'Australia',        type:'Tourist · Student' },
    { flag:'🇨🇦', name:'Canada',           type:'Tourist · PR' },
    { flag:'🇹🇭', name:'Thailand',         type:'Tourist · E-Visa' },
    { flag:'🇲🇾', name:'Malaysia',         type:'Tourist · eNTRI' },
    { flag:'🇹🇷', name:'Turkey',           type:'E-Visa · Tourist' },
  ],

  /* ── TEAM ─────────────────────────────────────────────────── */
  team: [
    { initial:'M', name:'Mohammed Khalis', role:'Founder & Director',         desc:'20+ years in travel industry. Specialist in Hajj & Umrah operations.' },
    { initial:'A', name:'Ahmed Shaikh',    role:'Head of Flight Operations',   desc:'15 years in ticketing and airline partnerships across 200+ carriers.' },
    { initial:'F', name:'Fatima Ansari',   role:'Visa Processing Expert',      desc:'Specialist in Schengen, UK, USA, Middle East visa processing.' },
    { initial:'H', name:'Haji Abdul Rahman',role:'Hajj & Umrah Coordinator',  desc:'Licensed religious guide who has led hundreds of pilgrimage groups.' },
  ],

/* ================================================================
   PARTNERS PATCH — Paste this into data/data.js
   Replace the existing  partners: [...]  array with this one
   ================================================================ */

  partners: [
    /* ── ROW 1 (11 airlines) ── */
    { name:'Air Arabia',        img:'assets/images/AirArabia.png'        },
    { name:'Air India',         img:'assets/images/AirIndia.png'         },
    { name:'Akasa Air',         img:'assets/images/AkasaAir.png'         },
    { name:'British Airways',   img:'assets/images/BritishAirways.png'   },
    { name:'Cathay Pacific',    img:'assets/images/CathayPacific.png'    },
    { name:'Emirates',          img:'assets/images/Emirates.png'         },
    { name:'Etihad Airways',    img:'assets/images/EtihadAirways.png'    },
    { name:'flydubai',          img:'assets/images/Flydubai.png'         },
    { name:'Gulf Air',          img:'assets/images/GulfAir.png'          },
    { name:'IndiGo',            img:'assets/images/IndiGo.png'           },
    { name:'Japan Airlines',    img:'assets/images/JapanAirlines.png'    },
    /* ── ROW 2 (11 airlines) ── */
    { name:'Kuwait Airways',    img:'assets/images/KuwaitAirways.png'    },
    { name:'Malaysia Airlines', img:'assets/images/MalaysiaAirlines.png' },
    { name:'Oman Air',          img:'assets/images/OmanAir.png'          },
    { name:'Qatar Airways',     img:'assets/images/QatarAirways.png'     },
    { name:'Saudia',            img:'assets/images/Saudia.png'           },
    { name:'Singapore Airlines',img:'assets/images/SingaporeAirlines.png'},
    { name:'SpiceJet',          img:'assets/images/SpiceJet.png'         },
    { name:'Thai Airways',      img:'assets/images/ThaiAirways.jpg'      },
    { name:'Turkish Airlines',  img:'assets/images/TurkishAirlines.png'  },
    { name:'Vistara',           img:'assets/images/Vistara.png'          },
    { name:'Lufthansa',         img:'assets/images/Lufthansa.png'        },
  ],
