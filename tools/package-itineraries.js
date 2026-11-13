/* ================================================================
   PACKAGE ITINERARIES — content for the individual package pages
   ----------------------------------------------------------------
   One entry per package in data/data.js (matched by `slug`).
   After editing this file, rebuild the pages with:
       node tools/build-package-pages.js
   The generated pages live in pages/packages/<slug>.html.

   NOTE: Day-by-day plans, hotels and inclusions below are a DRAFT
   written from the short package info on the site. Please check
   each one against what you actually sell before going live.
   ================================================================ */
'use strict';

module.exports = {

  /* ── 1. DUBAI ───────────────────────────────────────────────── */
  'dubai-deluxe': {
    title: 'Dubai Deluxe Tour Package from Mumbai',
    metaDesc: 'Dubai Deluxe package from Mumbai: 5 nights / 6 days with flights, 4-star hotel, desert safari, Dhow cruise, Burj Khalifa and Abu Dhabi tour. From ₹42,999 per person.',
    overview: 'Our best-selling Dubai holiday packs the city\'s big sights into six relaxed days. You stay in a 4-star hotel, see the city from the Burj Khalifa, ride the dunes on a desert safari, dine on a Dhow cruise and spend a full day in Abu Dhabi at the Sheikh Zayed Grand Mosque. Good for families, couples and first-time visitors.',
    highlights: [
      'At the Top, Burj Khalifa (124th & 125th floor)',
      'Desert safari with dune bashing, BBQ dinner and live shows',
      'Dhow cruise dinner on Dubai Creek or Marina',
      'Full-day Abu Dhabi tour with Sheikh Zayed Grand Mosque',
      'Free time for Dubai Mall, Gold Souk and Global Village (seasonal)',
      'UAE tourist visa assistance'
    ],
    itinerary: [
      { title: 'Arrive in Dubai', desc: 'Fly from Mumbai to Dubai. Our representative meets you at the airport and transfers you to your hotel. Evening free; we recommend a walk around your hotel area to settle in.', meals: [] },
      { title: 'Half-day city tour & Dhow cruise', desc: 'Morning city tour: Jumeirah Mosque (photo stop), Burj Al Arab view, Palm Jumeirah and the Atlantis, Dubai Museum area and the Gold & Spice Souks by abra. Evening Dhow cruise with buffet dinner.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Burj Khalifa & desert safari', desc: 'Late morning visit to At the Top, Burj Khalifa, then free time at Dubai Mall and the Dubai Fountain. Afternoon pick-up for the desert safari: dune bashing, camel ride, henna, tanoura and belly-dance shows with BBQ dinner at the camp.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Abu Dhabi full-day tour', desc: 'Drive to Abu Dhabi (about 2 hours). Visit the Sheikh Zayed Grand Mosque, drive along the Corniche, see Emirates Palace and Qasr Al Watan from outside, and stop at Ferrari World / Yas Island for photos. Return to Dubai in the evening.', meals: ['Breakfast'] },
      { title: 'Free day for shopping or optional tours', desc: 'Day at leisure. Popular add-ons: Miracle Garden (seasonal), Museum of the Future, Aquaventure Waterpark or a Global Village evening. Ask us and we will book them for you.', meals: ['Breakfast'] },
      { title: 'Depart for Mumbai', desc: 'Check out after breakfast. Transfer to Dubai International Airport for your flight home.', meals: ['Breakfast'] }
    ],
    inclusions: ['Return economy flights Mumbai–Dubai', '5 nights in a 4-star hotel with daily breakfast', 'Airport transfers and tours on shared (SIC) basis', 'Half-day Dubai city tour', 'Dhow cruise with dinner', 'Desert safari with BBQ dinner', 'Burj Khalifa At the Top tickets (non-prime hours)', 'Abu Dhabi city tour with Grand Mosque', 'UAE tourist visa', 'Travel insurance'],
    exclusions: ['Tourism Dirham fee charged by the hotel', 'Lunches and meals not mentioned', 'Optional tours and personal expenses', 'Private transfers (available at extra cost)', 'Anything not listed under inclusions'],
    bestTime: 'November to March for pleasant weather (20–30°C). Summer (June–August) is hot but hotels are cheaper.',
    faqs: [
      { q: 'Is the Dubai visa included in this package?', a: 'Yes. We apply for your UAE tourist visa as part of the package. You need a passport valid for at least 6 months and a recent photo.' },
      { q: 'Can I upgrade to a 5-star hotel or private transfers?', a: 'Yes. Every part of this package can be upgraded. Call or WhatsApp us and we will send a revised price.' },
      { q: 'Is this package suitable for families with kids?', a: 'Very much. Most of the tours are family friendly, and we can add theme parks like IMG Worlds, Legoland or Aquaventure.' }
    ]
  },

  /* ── 2. UMRAH ───────────────────────────────────────────────── */
  'umrah-deluxe': {
    title: 'Umrah Deluxe Package from Mumbai – 15 Days',
    metaDesc: 'Umrah Deluxe package from Mumbai: 14 nights / 15 days with direct flights, 5-star hotel near Haram, Umrah visa, Ziyarat in Makkah & Madinah and meals. From ₹1,10,000.',
    overview: 'A complete, comfortable Umrah for pilgrims who want to stay close to the Haram. You fly direct from Mumbai, stay in 5-star hotels within walking distance of Masjid al-Haram and Masjid an-Nabawi, and get guided Ziyarat in both holy cities. Our team in Saudi Arabia looks after you from arrival to departure.',
    highlights: [
      'Direct flights from Mumbai to Jeddah / Madinah',
      '5-star hotels near the Haram in Makkah and Madinah',
      'Guided Umrah with an experienced Muallim',
      'Ziyarat of Makkah: Jabal al-Noor, Jabal Thawr, Mina, Arafat, Muzdalifah',
      'Ziyarat of Madinah: Masjid Quba, Uhud, Masjid al-Qiblatayn',
      'Umrah visa and Saudi insurance included'
    ],
    itinerary: [
      { title: 'Depart Mumbai, arrive Jeddah, transfer to Makkah', desc: 'Wear Ihram before the Miqat. Fly from Mumbai to Jeddah. Our team meets you and transfers you by coach to your hotel in Makkah. After resting, perform your Umrah with our Muallim.', meals: ['Dinner'] },
      { title: 'Makkah: rest and prayers', desc: 'A day to rest after Umrah and pray in Masjid al-Haram. Our group leader helps first-time pilgrims find their way around the Haram.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Makkah Ziyarat', desc: 'Guided Ziyarat of Jabal al-Noor (Cave of Hira), Jabal Thawr, Mina, Muzdalifah, Arafat and Jabal al-Rahmah. Afternoon free for Ibadah.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { span: 4, title: 'Makkah: days of Ibadah', desc: 'Free days for prayers, Tawaf and extra Umrah if you wish. Optional visit to Masjid Aisha (Taneem) for Ihram. Our team is on call 24/7.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Makkah: Tawaf al-Wada and travel to Madinah', desc: 'Perform the farewell Tawaf. Check out and travel to Madinah by Haramain high-speed train or coach (about 2.5–5 hours). Check in near Masjid an-Nabawi.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Madinah: prayers at Masjid an-Nabawi', desc: 'Pray in the Prophet\'s Mosque and visit Riyadh ul-Jannah (as per Nusuk permit availability). Offer Salaam at the Rawdah.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Madinah Ziyarat', desc: 'Guided Ziyarat of Masjid Quba, Masjid al-Qiblatayn, Mount Uhud and the Martyrs of Uhud, the Seven Mosques area and date farms.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { span: 4, title: 'Madinah: days of Ibadah', desc: 'Free days for prayers in Masjid an-Nabawi and personal Ibadah. Time for shopping for dates and gifts near the Haram.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Depart for Mumbai', desc: 'Check out and transfer to Madinah (or Jeddah) airport for your direct flight to Mumbai. Ma\'a salama!', meals: ['Breakfast'] }
    ],
    inclusions: ['Return economy flights Mumbai–Jeddah/Madinah', 'Umrah visa with Saudi medical insurance', '5-star hotels near the Haram (about 8 nights Makkah, 6 nights Madinah)', 'Breakfast, lunch and dinner (Indian buffet)', 'All transfers by AC coach; Makkah–Madinah by train or coach', 'Guided Ziyarat in Makkah and Madinah', 'Experienced Muallim / group leader', 'Zamzam water (5 litres, as per airline rules)'],
    exclusions: ['Qurbani / Dam if required', 'Personal expenses, laundry and phone calls', 'Extra Umrah transport not in the plan', 'Any increase in taxes or visa fees after booking'],
    bestTime: 'All year outside Hajj season. November to February is cooler; Ramadan is spiritually special but busiest and costliest.',
    faqs: [
      { q: 'How far is the hotel from the Haram?', a: 'On the Deluxe package, hotels are within walking distance of the Haram in both cities. We confirm the exact hotel name before you pay the balance.' },
      { q: 'Can women travel without a mahram?', a: 'Saudi rules now allow women to perform Umrah without a mahram. We recommend travelling in our group, and we will guide you on the latest rules.' },
      { q: 'Is the number of days fixed?', a: 'No. We also run 10-day and 21-day groups and can change the split between Makkah and Madinah. Ask us for the next group dates.' }
    ]
  },

  /* ── 3. SINGAPORE + MALAYSIA ────────────────────────────────── */
  'singapore-malaysia': {
    title: 'Singapore and Malaysia Tour Package from Mumbai',
    metaDesc: 'Singapore + Malaysia package from Mumbai: 6 nights / 7 days with flights, hotels, Universal Studios, Sentosa, Gardens by the Bay, Genting Highlands and KL city tour. From ₹68,000.',
    overview: 'Two countries in one trip. Spend four nights in Singapore for Universal Studios, Sentosa and Gardens by the Bay, then cross to Kuala Lumpur for the Petronas Towers, Batu Caves and a cable car ride to Genting Highlands. Ideal for families and friends travelling together.',
    highlights: [
      'Universal Studios Singapore full day',
      'Sentosa Island with Wings of Time show',
      'Gardens by the Bay and Marina Bay light show',
      'Night Safari at Singapore Zoo',
      'Kuala Lumpur city tour with Petronas Twin Towers',
      'Genting Highlands by Awana SkyWay cable car'
    ],
    itinerary: [
      { title: 'Arrive in Singapore', desc: 'Fly from Mumbai to Singapore. Transfer to your hotel. In the evening, enjoy the Night Safari, the world\'s first nocturnal zoo.', meals: [] },
      { title: 'Singapore city tour & Gardens by the Bay', desc: 'Half-day city tour: Merlion Park, Marina Bay, Little India, Chinatown and the Esplanade. Afternoon at Gardens by the Bay (Flower Dome & Cloud Forest). Watch the free Garden Rhapsody light show in the evening.', meals: ['Breakfast'] },
      { title: 'Universal Studios Singapore', desc: 'Full day at Universal Studios on Sentosa Island with rides and shows for all ages.', meals: ['Breakfast'] },
      { title: 'Sentosa Island', desc: 'Cable car to Sentosa, visit S.E.A. Aquarium or Madame Tussauds (as per package option), and end the day with the Wings of Time show on the beach.', meals: ['Breakfast'] },
      { title: 'Singapore to Kuala Lumpur, Genting Highlands', desc: 'Check out and travel to Malaysia by coach or a short flight. On the way, ride the Awana SkyWay cable car to Genting Highlands and visit Chin Swee Temple. Continue to your hotel in Kuala Lumpur.', meals: ['Breakfast'] },
      { title: 'Kuala Lumpur city tour', desc: 'See the Petronas Twin Towers (photo stop), King\'s Palace, National Mosque, Independence Square and Batu Caves. Evening free for shopping at Bukit Bintang.', meals: ['Breakfast'] },
      { title: 'Depart for Mumbai', desc: 'Check out and transfer to Kuala Lumpur airport for your flight home.', meals: ['Breakfast'] }
    ],
    inclusions: ['Return economy flights Mumbai–Singapore / Kuala Lumpur–Mumbai', '4 nights Singapore + 2 nights Kuala Lumpur in 3/4-star hotels', 'Daily breakfast', 'All transfers and tours on shared basis', 'Universal Studios, Sentosa and Night Safari tickets', 'Gardens by the Bay (two domes)', 'Genting Highlands cable car', 'Singapore and Malaysia visa assistance', 'Travel insurance'],
    exclusions: ['Lunch and dinner', 'Optional tours and personal expenses', 'Malaysia tourism tax paid at the hotel', 'Anything not listed under inclusions'],
    bestTime: 'All year. February to April is the driest; school holidays (May–June) are busy.',
    faqs: [
      { q: 'Do Indians need a visa for Singapore and Malaysia?', a: 'Singapore needs an e-visa, which we arrange. Malaysia currently offers visa-free entry to Indian passport holders for short stays; we will confirm the rule at the time of booking.' },
      { q: 'Can we add Indian or Jain food?', a: 'Yes. Indian vegetarian, Jain and halal meals are easy to find in both cities, and we can add a meal plan.' }
    ]
  },

  /* ── 4. BALI ────────────────────────────────────────────────── */
  'bali-honeymoon': {
    title: 'Bali Honeymoon Package from Mumbai – 7 Nights',
    metaDesc: 'Bali honeymoon package from Mumbai: 7 nights / 8 days with flights, private pool villa, candlelit dinner, couple spa, Ubud, Kintamani and Nusa Penida. From ₹85,000 per couple.',
    overview: 'A romantic week in Bali split between the green hills of Ubud and the beaches of the south. You stay in a private pool villa, enjoy a candlelit dinner and a couple spa, swing over the rice terraces and take a day trip to Nusa Penida\'s famous cliffs.',
    highlights: [
      'Private pool villa stay in Ubud and Seminyak',
      'Candlelit dinner on the beach',
      'Balinese couple spa (60 minutes)',
      'Kintamani volcano view and Tegallalang rice terraces',
      'Nusa Penida island day trip',
      'Uluwatu Temple sunset and Kecak dance'
    ],
    itinerary: [
      { title: 'Arrive in Bali, transfer to Ubud', desc: 'Fly from Mumbai to Denpasar. Meet our driver and transfer to your private pool villa in Ubud. Evening free to relax.', meals: [] },
      { title: 'Kintamani & Ubud tour', desc: 'Visit Tegallalang rice terraces with a jungle swing, a coffee plantation, Kintamani for views of Mount Batur, Tirta Empul temple and Ubud Market.', meals: ['Breakfast'] },
      { title: 'Couple spa & leisure', desc: 'A slow day in Ubud with a 60-minute Balinese couple massage. Optional: Ubud Monkey Forest or a cooking class.', meals: ['Breakfast'] },
      { title: 'Ubud to Seminyak via Tanah Lot', desc: 'Check out and drive south. Stop at Ulun Danu Beratan lake temple and Tanah Lot for sunset. Check in at your villa in Seminyak.', meals: ['Breakfast'] },
      { title: 'Nusa Penida day trip', desc: 'Fast boat to Nusa Penida. Visit Kelingking Beach, Broken Beach, Angel\'s Billabong and Crystal Bay. Return to Bali by evening.', meals: ['Breakfast', 'Lunch'] },
      { title: 'Water sports & Uluwatu sunset', desc: 'Morning water sports at Tanjung Benoa (banana boat, parasailing). Evening at Uluwatu Temple for sunset and the Kecak fire dance.', meals: ['Breakfast'] },
      { title: 'Free day & candlelit dinner', desc: 'Day at leisure for beach clubs or shopping. In the evening, a candlelit dinner on Jimbaran beach.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Depart for Mumbai', desc: 'Check out and transfer to the airport for your flight home.', meals: ['Breakfast'] }
    ],
    inclusions: ['Return economy flights Mumbai–Bali', '3 nights Ubud + 4 nights Seminyak in private pool villas', 'Daily breakfast, 1 candlelit dinner, 1 lunch', 'Private car with driver for all transfers and tours', 'Nusa Penida day trip with fast boat', 'Couple spa (60 minutes)', 'Honeymoon cake and flower bed decoration', 'Indonesia visa on arrival assistance', 'Travel insurance'],
    exclusions: ['Visa on arrival fee and Bali tourist levy (paid on arrival)', 'Entry tickets not mentioned', 'Lunches and dinners not mentioned', 'Personal expenses'],
    bestTime: 'April to October (dry season). July and August are the busiest.',
    faqs: [
      { q: 'Is this package priced per couple?', a: 'Yes, ₹85,000 is for two people sharing a villa, including flights. Prices change with travel dates and flight fares.' },
      { q: 'Can we change the villa or add more nights?', a: 'Yes. We can upgrade to a cliff-top or beachfront villa, or add nights in Nusa Dua or the Gili Islands.' }
    ]
  },

  /* ── 5. EUROPE ──────────────────────────────────────────────── */
  'europe-grand-tour': {
    title: 'Europe Grand Tour Package from Mumbai – Paris, Rome, Amsterdam',
    metaDesc: 'Europe Grand Tour from Mumbai: 9 nights / 10 days in Paris, Amsterdam and Rome with flights, 4-star hotels, rail pass, Eiffel Tower, Vatican and Colosseum. From ₹1,85,000.',
    overview: 'Three of Europe\'s favourite cities in one trip. Start with Paris and the Eiffel Tower, take the train to Amsterdam\'s canals and tulip country, then fly to Rome for the Colosseum and the Vatican. Hotels are 4-star and centrally located, and an expert guide joins you for the main sightseeing.',
    highlights: [
      'Eiffel Tower (2nd level) and Seine river cruise',
      'Disneyland Paris or Versailles (choose one)',
      'Amsterdam canal cruise and Zaanse Schans windmills',
      'Keukenhof tulip gardens (seasonal, March–May)',
      'Colosseum, Roman Forum and Vatican Museums',
      'Schengen visa assistance with appointment support'
    ],
    itinerary: [
      { title: 'Arrive in Paris', desc: 'Fly from Mumbai to Paris. Transfer to your hotel. Evening free to stroll the Champs-Élysées.', meals: [] },
      { title: 'Paris city tour & Eiffel Tower', desc: 'Guided tour of the Arc de Triomphe, Champs-Élysées, Place de la Concorde and Louvre (outside). Visit the Eiffel Tower 2nd level, then an evening Seine river cruise.', meals: ['Breakfast'] },
      { title: 'Disneyland Paris or Versailles', desc: 'Choose a full day at Disneyland Paris or a guided visit to the Palace of Versailles.', meals: ['Breakfast'] },
      { title: 'Paris to Amsterdam by train', desc: 'High-speed train to Amsterdam (about 3.5 hours). Afternoon canal cruise and free time at Dam Square.', meals: ['Breakfast'] },
      { title: 'Zaanse Schans, Volendam & Keukenhof', desc: 'Visit the windmills of Zaanse Schans and a cheese farm, then the fishing village of Volendam. In spring, visit Keukenhof gardens instead.', meals: ['Breakfast'] },
      { title: 'Amsterdam to Rome', desc: 'Fly to Rome. Check in and enjoy an evening walk to the Trevi Fountain and Spanish Steps.', meals: ['Breakfast'] },
      { title: 'Ancient Rome', desc: 'Guided tour of the Colosseum, Roman Forum and Palatine Hill. Afternoon at the Pantheon and Piazza Navona.', meals: ['Breakfast'] },
      { title: 'Vatican City', desc: 'Guided visit to the Vatican Museums, Sistine Chapel and St Peter\'s Basilica.', meals: ['Breakfast'] },
      { title: 'Free day in Rome (optional Pisa / Florence)', desc: 'Day at leisure, or take an optional day trip to Florence and the Leaning Tower of Pisa.', meals: ['Breakfast'] },
      { title: 'Depart for Mumbai', desc: 'Check out and transfer to Rome airport for your flight home.', meals: ['Breakfast'] }
    ],
    inclusions: ['Return economy flights Mumbai–Paris / Rome–Mumbai', 'Amsterdam–Rome flight', '9 nights in 4-star hotels with daily breakfast', 'Paris–Amsterdam train tickets', 'Airport and station transfers', 'Guided sightseeing as per itinerary with entry tickets listed', 'Seine and Amsterdam canal cruises', 'Schengen visa assistance', 'Travel insurance'],
    exclusions: ['Schengen visa fee and VFS charges', 'City taxes paid at hotels', 'Lunch and dinner', 'Optional tours and personal expenses'],
    bestTime: 'April to June and September to October. Summer (July–August) is busy and pricier.',
    faqs: [
      { q: 'How early should we apply for the Schengen visa?', a: 'Apply 6–8 weeks before travel, and up to 3 months before in peak season. Our visa team prepares your file and helps you book the appointment.' },
      { q: 'Can we add Switzerland to this tour?', a: 'Yes. Many guests add 2–3 nights in Switzerland between Paris and Rome. See our Switzerland Honeymoon package or ask for a custom quote.' }
    ]
  },

  /* ── 6. KASHMIR ─────────────────────────────────────────────── */
  'kashmir-valley': {
    title: 'Kashmir Tour Package from Mumbai – Srinagar, Gulmarg, Pahalgam',
    metaDesc: 'Kashmir Valley package from Mumbai: 5 nights / 6 days with flights, houseboat stay, Shikara ride, Gulmarg Gondola, Pahalgam and Sonamarg. From ₹28,000 per person.',
    overview: 'See why Kashmir is called paradise on earth. Stay a night on a houseboat on Dal Lake, ride the Gondola in Gulmarg, walk the valleys of Pahalgam and take in the glaciers of Sonamarg. A great choice for families, couples and first-time visitors to the hills.',
    highlights: [
      'Night on a deluxe houseboat on Dal Lake',
      'Shikara ride on Dal Lake',
      'Mughal Gardens: Nishat, Shalimar and Chashme Shahi',
      'Gulmarg with Gondola cable car (optional ticket)',
      'Pahalgam: Betaab Valley and Aru Valley',
      'Sonamarg day trip to Thajiwas Glacier'
    ],
    itinerary: [
      { title: 'Arrive in Srinagar, houseboat & Shikara', desc: 'Fly from Mumbai to Srinagar. Check in to your houseboat on Dal Lake. Evening Shikara ride past floating gardens and markets.', meals: ['Dinner'] },
      { title: 'Srinagar to Gulmarg', desc: 'Drive to Gulmarg (about 2 hours), the meadow of flowers. Ride the Gondola (optional) to Kongdori or Apharwat for snow views. Overnight in Gulmarg.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Gulmarg to Pahalgam', desc: 'Drive to Pahalgam via saffron fields and Awantipora ruins. Evening walk by the Lidder river.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Pahalgam sightseeing', desc: 'Visit Betaab Valley, Aru Valley and Chandanwari by local taxi (paid locally as per union rules). Pony rides are optional.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Sonamarg day trip, back to Srinagar', desc: 'Drive to Sonamarg, the meadow of gold. Optional pony ride to Thajiwas Glacier. Return to a hotel in Srinagar; visit the Mughal Gardens on the way if time allows.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Depart for Mumbai', desc: 'Visit Shankaracharya Temple or Hazratbal Shrine if flight timing allows, then transfer to Srinagar airport.', meals: ['Breakfast'] }
    ],
    inclusions: ['Return economy flights Mumbai–Srinagar', '1 night houseboat + 4 nights hotels', 'Breakfast and dinner daily (MAP)', 'Private car for all transfers and sightseeing', 'Shikara ride (1 hour)', 'All driver allowances, tolls and parking'],
    exclusions: ['Gulmarg Gondola tickets', 'Local union taxi in Pahalgam and Sonamarg', 'Pony rides and garden entry tickets', 'Lunch and personal expenses'],
    bestTime: 'March to October for green meadows; December to February for snow.',
    faqs: [
      { q: 'Is Kashmir safe for tourists?', a: 'Tourist areas like Srinagar, Gulmarg, Pahalgam and Sonamarg see lakhs of visitors every year. We use trusted local partners and keep you updated on any advisories.' },
      { q: 'Why are local taxis not included?', a: 'In Pahalgam and Sonamarg, local unions run the taxis to the valleys and do not allow outside cars. Rates are fixed and paid directly there.' }
    ]
  },

  /* ── 7. SOUTH EAST ASIA GROUP ───────────────────────────────── */
  'south-east-asia-group': {
    title: 'South East Asia Group Tour from Mumbai – Thailand, Vietnam, Cambodia',
    metaDesc: 'South East Asia group tour from Mumbai: 10 nights / 11 days in Thailand, Vietnam and Cambodia with flights, hotels, coach tours, Angkor Wat and Ha Long Bay. From ₹95,000.',
    overview: 'A guided group tour across three countries. See the temples and markets of Bangkok, the ancient Angkor Wat in Cambodia, the old streets of Hanoi and the islands of Ha Long Bay. A tour manager from Mumbai travels with the group, so you never have to worry about the details.',
    highlights: [
      'Tour manager from Mumbai with the group',
      'Bangkok Grand Palace and Wat Arun',
      'Pattaya Coral Island speedboat trip',
      'Sunrise at Angkor Wat, Bayon and Ta Prohm',
      'Hanoi Old Quarter and water puppet show',
      'Overnight cruise in Ha Long Bay'
    ],
    itinerary: [
      { title: 'Arrive in Bangkok, transfer to Pattaya', desc: 'Fly from Mumbai to Bangkok. Meet the group and drive to Pattaya. Evening Alcazar show.', meals: ['Dinner'] },
      { title: 'Coral Island', desc: 'Speedboat to Coral Island for beach time and optional water sports. Evening at leisure.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Pattaya to Bangkok', desc: 'Drive to Bangkok. Afternoon city tour with Golden Buddha and Marble Temple.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Bangkok temples & river', desc: 'Visit the Grand Palace and Wat Pho, then a long-tail boat ride to Wat Arun. Evening Chao Phraya dinner cruise.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Bangkok to Siem Reap', desc: 'Fly to Siem Reap, Cambodia. Evening at Pub Street and the night market.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Angkor Wat', desc: 'Sunrise at Angkor Wat, then a guided tour of Angkor Thom, Bayon and Ta Prohm, the jungle temple.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Siem Reap to Hanoi', desc: 'Fly to Hanoi, Vietnam. Evening water puppet show and walk in the Old Quarter.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Hanoi city tour', desc: 'Visit Ho Chi Minh Mausoleum (outside), One Pillar Pagoda, Temple of Literature and Hoan Kiem Lake.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Ha Long Bay cruise', desc: 'Drive to Ha Long Bay and board an overnight cruise. Kayaking, cave visit and sunset on deck.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Ha Long Bay to Hanoi', desc: 'Tai chi on deck, brunch on board, then drive back to Hanoi. Farewell group dinner.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Depart for Mumbai', desc: 'Transfer to Hanoi airport for your flight home.', meals: ['Breakfast'] }
    ],
    inclusions: ['All flights: Mumbai–Bangkok, Bangkok–Siem Reap, Siem Reap–Hanoi, Hanoi–Mumbai', '9 nights hotels + 1 night Ha Long Bay cruise', 'Breakfast, lunch and dinner (Indian meals where possible)', 'AC coach for all tours', 'Tour manager from Mumbai and local guides', 'Entry tickets as per itinerary', 'Thailand, Cambodia and Vietnam visa assistance', 'Travel insurance'],
    exclusions: ['Visa fees', 'Optional activities and water sports', 'Tips for guides and drivers', 'Personal expenses'],
    bestTime: 'November to March is dry and cooler across all three countries.',
    faqs: [
      { q: 'When are the next group departures?', a: 'We run group departures most months from October to March. WhatsApp us to get the next fixed dates and seat availability.' },
      { q: 'Is Indian food available on this tour?', a: 'Yes. On a group tour we arrange Indian meals at most stops, and vegetarian and Jain options on request.' }
    ]
  },

  /* ── 8. GOA ─────────────────────────────────────────────────── */
  'goa-beach': {
    title: 'Goa Beach Holiday Package from Mumbai – 4 Nights',
    metaDesc: 'Goa beach holiday package from Mumbai: 4 nights / 5 days with flights, beach resort, transfers, North & South Goa tours and water sports. From ₹18,500 per person.',
    overview: 'A quick, easy beach break from Mumbai. Stay at a beach resort, tour the forts and beaches of North Goa, see the old churches and quiet beaches of the south, and try water sports at Calangute. Great for friends, couples and families.',
    highlights: [
      'Beach resort with pool',
      'North Goa: Fort Aguada, Calangute, Baga and Anjuna',
      'South Goa: Old Goa churches, Colva and Palolem',
      'Water sports at Calangute / Baga',
      'Mandovi river cruise in the evening',
      'Free evening for Goa\'s famous beach shacks'
    ],
    itinerary: [
      { title: 'Arrive in Goa', desc: 'Fly from Mumbai to Goa (Dabolim or Mopa). Transfer to your beach resort. Evening at the beach.', meals: [] },
      { title: 'North Goa tour', desc: 'Visit Fort Aguada, Sinquerim, Calangute, Baga, Anjuna and Chapora Fort (the "Dil Chahta Hai" fort). Water sports at Calangute.', meals: ['Breakfast'] },
      { title: 'South Goa tour & river cruise', desc: 'See the Basilica of Bom Jesus and Se Cathedral in Old Goa, Mangueshi Temple, Dona Paula and Miramar. Evening Mandovi river cruise with music and dance.', meals: ['Breakfast'] },
      { title: 'Free day', desc: 'Relax by the pool or the beach. Optional: Dudhsagar waterfall trip or a dolphin-spotting boat ride.', meals: ['Breakfast'] },
      { title: 'Depart for Mumbai', desc: 'Check out and transfer to the airport for your flight home.', meals: ['Breakfast'] }
    ],
    inclusions: ['Return economy flights Mumbai–Goa', '4 nights at a beach resort with daily breakfast', 'Airport transfers', 'North and South Goa sightseeing by AC vehicle', 'Water sports package (parasailing, banana ride, bumper ride)', 'Mandovi river cruise'],
    exclusions: ['Lunch and dinner', 'Dudhsagar and other optional tours', 'Entry fees at forts and monuments', 'Personal expenses'],
    bestTime: 'October to March. Monsoon (June–September) is green and cheap but water sports stop.',
    faqs: [
      { q: 'Can we go by train or car instead of flight?', a: 'Yes. We can build the package around a train ticket or your own car and lower the price.' },
      { q: 'North Goa or South Goa — where should we stay?', a: 'North Goa is lively with more nightlife; South Goa is calmer and better for families and couples. We can split the stay too.' }
    ]
  },

  /* ── 9. MALDIVES ────────────────────────────────────────────── */
  'maldives-luxury': {
    title: 'Maldives Luxury Package from Mumbai – Overwater Villa',
    metaDesc: 'Maldives luxury escape from Mumbai: 6 nights / 7 days with flights, overwater villa, all-inclusive meals, speedboat transfers and snorkelling. From ₹1,45,000 per couple.',
    overview: 'A true island escape. Stay in a beach villa and then an overwater villa at a resort in North Malé Atoll, with all meals and drinks included. Your days are for snorkelling the house reef, sunset cruises, spa time and simply doing nothing.',
    highlights: [
      'Overwater villa with direct lagoon access',
      'All-inclusive meals and soft drinks',
      'Speedboat transfers from Malé airport',
      'Snorkelling trip with gear',
      'Sunset dolphin cruise',
      'Romantic dinner on the beach'
    ],
    itinerary: [
      { title: 'Arrive in Malé, speedboat to the resort', desc: 'Fly from Mumbai to Malé. Our resort team meets you and takes you by speedboat to the resort. Check in to your beach villa.', meals: ['Lunch', 'Dinner'] },
      { title: 'Snorkelling & house reef', desc: 'Guided snorkelling trip to see reef fish, turtles and rays. Afternoon free at the beach.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Move to overwater villa', desc: 'Shift to your overwater villa. Spend the day swimming straight from your deck.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Sunset dolphin cruise', desc: 'Day at leisure. In the evening, a sunset cruise to spot dolphins.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Spa & beach dinner', desc: 'Optional spa session or water sports. Romantic dinner set up on the beach.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Free day', desc: 'A full day to relax. Optional: sandbank picnic, scuba try-dive or seaplane flight.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { title: 'Depart for Mumbai', desc: 'Speedboat back to Malé airport for your flight home.', meals: ['Breakfast'] }
    ],
    inclusions: ['Return economy flights Mumbai–Malé', '2 nights beach villa + 4 nights overwater villa', 'All-inclusive meals and soft drinks', 'Return speedboat transfers', 'Snorkelling trip and sunset dolphin cruise', 'One romantic beach dinner', 'Green tax and resort taxes', 'Travel insurance'],
    exclusions: ['Spa treatments and diving', 'Seaplane upgrade', 'Personal expenses'],
    bestTime: 'November to April for calm seas and sunshine.',
    faqs: [
      { q: 'Do Indians need a visa for the Maldives?', a: 'No advance visa is needed. Indian passport holders get a free 30-day tourist visa on arrival with a confirmed resort booking and return ticket.' },
      { q: 'Is the price per couple?', a: 'Yes, ₹1,45,000 is per couple. The final price depends on the resort and travel dates; we will share 2–3 resort options.' }
    ]
  },

  /* ── 10. ISTANBUL ───────────────────────────────────────────── */
  'istanbul-city-break': {
    title: 'Istanbul City Break Package from Mumbai – 5 Nights',
    metaDesc: 'Istanbul city break from Mumbai: 5 nights / 6 days with flights, 4-star hotel, Blue Mosque, Hagia Sophia, Topkapi Palace, Bosphorus cruise and Princes\' Islands. From ₹55,000.',
    overview: 'Where Europe meets Asia. Walk through the Blue Mosque and Hagia Sophia, explore Topkapi Palace, shop in the Grand Bazaar, cruise the Bosphorus and take a ferry to the car-free Princes\' Islands. A rich mix of history, food and culture.',
    highlights: [
      'Blue Mosque and Hagia Sophia',
      'Topkapi Palace and Basilica Cistern',
      'Grand Bazaar and Spice Bazaar',
      'Bosphorus cruise between Europe and Asia',
      'Princes\' Islands ferry trip',
      'Optional Cappadocia hot-air balloon add-on'
    ],
    itinerary: [
      { title: 'Arrive in Istanbul', desc: 'Fly from Mumbai to Istanbul. Transfer to your hotel in Sultanahmet or Taksim. Evening walk on Istiklal Avenue.', meals: [] },
      { title: 'Old City tour', desc: 'Guided tour of the Blue Mosque, Hagia Sophia, the Hippodrome and Basilica Cistern. Afternoon at the Grand Bazaar.', meals: ['Breakfast'] },
      { title: 'Topkapi Palace & Bosphorus cruise', desc: 'Visit Topkapi Palace and the Spice Bazaar. Afternoon Bosphorus cruise past palaces and the bridges linking Europe and Asia.', meals: ['Breakfast'] },
      { title: 'Princes\' Islands', desc: 'Ferry to Büyükada, the largest of the Princes\' Islands. Explore by bicycle or electric cart and enjoy seafood by the water.', meals: ['Breakfast'] },
      { title: 'Free day', desc: 'Day at leisure. Optional: Galata Tower, Eyüp Sultan Mosque, a Turkish bath or a day flight to Cappadocia.', meals: ['Breakfast'] },
      { title: 'Depart for Mumbai', desc: 'Check out and transfer to Istanbul Airport for your flight home.', meals: ['Breakfast'] }
    ],
    inclusions: ['Return economy flights Mumbai–Istanbul', '5 nights in a 4-star hotel with daily breakfast', 'Airport transfers', 'Guided Old City tour with entry tickets', 'Bosphorus cruise', 'Princes\' Islands ferry', 'Turkey e-visa assistance', 'Travel insurance'],
    exclusions: ['Lunch and dinner', 'Optional tours and Cappadocia add-on', 'Hotel city tax', 'Personal expenses'],
    bestTime: 'April to June and September to November for mild weather.',
    faqs: [
      { q: 'Do Indians get a visa for Turkey easily?', a: 'Indian passport holders with a valid US, UK, Schengen or Irish visa can get a Turkey e-visa online. Others need a sticker visa; our visa team handles both.' },
      { q: 'Can we add Cappadocia?', a: 'Yes. A 2-night Cappadocia add-on with a hot-air balloon ride is our most popular extension.' }
    ]
  },

  /* ── 11. ANDAMAN ────────────────────────────────────────────── */
  'andaman-adventure': {
    title: 'Andaman Tour Package from Mumbai – Port Blair, Havelock, Neil',
    metaDesc: 'Andaman adventure package from Mumbai: 5 nights / 6 days with flights, resorts, ferry transfers, Radhanagar beach, scuba diving and Cellular Jail. From ₹32,000.',
    overview: 'Clear blue water, white sand and coral reefs, right here in India. Visit the historic Cellular Jail in Port Blair, relax on Radhanagar Beach in Havelock, try scuba diving and explore the natural rock bridge on Neil Island.',
    highlights: [
      'Cellular Jail and Light & Sound show',
      'Radhanagar Beach, one of Asia\'s best beaches',
      'Scuba diving at Havelock (beginner dive)',
      'Elephant Beach snorkelling',
      'Natural Bridge and Laxmanpur Beach on Neil Island',
      'Private ferry (Makruzz / Green Ocean) transfers'
    ],
    itinerary: [
      { title: 'Arrive in Port Blair', desc: 'Fly from Mumbai to Port Blair. Visit Corbyn\'s Cove beach and the Cellular Jail, followed by the Light & Sound show.', meals: ['Dinner'] },
      { title: 'Port Blair to Havelock', desc: 'Morning private ferry to Havelock (Swaraj Dweep). Afternoon at Radhanagar Beach for sunset.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Scuba diving & Elephant Beach', desc: 'Beginner scuba dive with a certified instructor, then a boat to Elephant Beach for snorkelling.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Havelock to Neil Island', desc: 'Ferry to Neil (Shaheed Dweep). Visit the Natural Bridge, Laxmanpur Beach and Bharatpur Beach.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Neil Island to Port Blair', desc: 'Ferry back to Port Blair. Visit Chatham Saw Mill or the Samudrika Naval Museum and shop at Aberdeen Bazaar.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Depart for Mumbai', desc: 'Transfer to Port Blair airport for your flight home.', meals: ['Breakfast'] }
    ],
    inclusions: ['Return economy flights Mumbai–Port Blair', '5 nights in resorts / hotels', 'Breakfast and dinner daily', 'Private ferry tickets between islands', 'All transfers and sightseeing by AC car', 'One beginner scuba dive', 'Elephant Beach boat trip', 'Entry permits and Cellular Jail tickets'],
    exclusions: ['Extra water sports', 'Lunch and personal expenses', 'Camera fees at monuments'],
    bestTime: 'October to May. Ferries can be cancelled during the monsoon.',
    faqs: [
      { q: 'Do I need a permit for Andaman?', a: 'Indian citizens do not need a special permit for the islands in this tour. Carry a photo ID for flights and ferries.' },
      { q: 'I can\'t swim. Can I still do scuba?', a: 'Yes. Beginner dives are done with a trained instructor holding you throughout. You only need to be in good health.' }
    ]
  },

  /* ── 12. SWITZERLAND ────────────────────────────────────────── */
  'switzerland-honeymoon': {
    title: 'Switzerland Honeymoon Package from Mumbai – 7 Nights',
    metaDesc: 'Switzerland honeymoon package from Mumbai: 7 nights / 8 days in Zurich, Interlaken and Lucerne with flights, 5-star hotels, Swiss Travel Pass, Jungfraujoch and Mt Titlis. From ₹1,75,000.',
    overview: 'Snowy peaks, blue lakes and scenic trains, made for couples. Travel by Swiss Travel Pass between Zurich, Interlaken and Lucerne, go up to Jungfraujoch, the Top of Europe, stand on the Titlis Cliff Walk and cruise Lake Lucerne. Stay in hand-picked 5-star hotels.',
    highlights: [
      'Swiss Travel Pass for trains, boats and buses',
      'Jungfraujoch – Top of Europe',
      'Mt Titlis with the rotating Rotair cable car',
      'Lake Lucerne cruise',
      'Rhine Falls and Zurich old town',
      'Honeymoon welcome in each hotel'
    ],
    itinerary: [
      { title: 'Arrive in Zurich', desc: 'Fly from Mumbai to Zurich. Activate your Swiss Travel Pass. Walk around the old town and Lake Zurich.', meals: [] },
      { title: 'Rhine Falls, then to Interlaken', desc: 'Morning train to Rhine Falls, Europe\'s largest waterfall. Continue by scenic train to Interlaken.', meals: ['Breakfast'] },
      { title: 'Jungfraujoch – Top of Europe', desc: 'Cogwheel train to Jungfraujoch (3,454 m). See the Ice Palace, Sphinx terrace and Aletsch Glacier.', meals: ['Breakfast'] },
      { title: 'Lauterbrunnen & Grindelwald', desc: 'Visit the valley of 72 waterfalls and the village of Grindelwald. Optional: Grindelwald First Cliff Walk or a paragliding flight.', meals: ['Breakfast'] },
      { title: 'Interlaken to Lucerne by Golden Pass', desc: 'Scenic train to Lucerne. Walk the Chapel Bridge and see the Lion Monument.', meals: ['Breakfast'] },
      { title: 'Mt Titlis', desc: 'Day trip to Engelberg and Mt Titlis by Rotair cable car. Snow activities at Ice Flyer and the Titlis Cliff Walk.', meals: ['Breakfast'] },
      { title: 'Lake Lucerne cruise & free time', desc: 'Cruise on Lake Lucerne. Optional: Mt Pilatus or Mt Rigi. Evening free for chocolate and watch shopping.', meals: ['Breakfast', 'Dinner'] },
      { title: 'Depart for Mumbai', desc: 'Train to Zurich airport for your flight home.', meals: ['Breakfast'] }
    ],
    inclusions: ['Return economy flights Mumbai–Zurich', '7 nights in 4/5-star hotels with daily breakfast', '1 special honeymoon dinner', 'Swiss Travel Pass (8 days, 2nd class)', 'Jungfraujoch and Mt Titlis tickets', 'Lake Lucerne cruise', 'Schengen visa assistance', 'Travel insurance'],
    exclusions: ['Schengen visa fee and VFS charges', 'City taxes', 'Lunches and dinners not mentioned', 'Optional activities'],
    bestTime: 'May to September for green valleys; December to March for snow.',
    faqs: [
      { q: 'Is ₹1,75,000 per couple?', a: 'Yes, the starting price is per couple. Peak summer and Christmas dates cost more; we will confirm the price with your dates.' },
      { q: 'Can we add Paris or Venice?', a: 'Yes. Paris + Switzerland and Switzerland + Venice are popular honeymoon combinations. Ask us for a custom plan.' }
    ]
  },

  /* ── 13. JAPAN ──────────────────────────────────────────────── */
  'japan-cultural': {
    title: 'Japan Tour Package from Mumbai – Tokyo, Kyoto, Osaka',
    metaDesc: 'Japan cultural tour from Mumbai: 8 nights / 9 days in Tokyo, Mt Fuji, Kyoto, Nara and Osaka with flights, hotels, bullet train pass and expert guide. From ₹1,35,000.',
    overview: 'Discover Japan\'s mix of old and new. Explore Tokyo\'s busy streets, see Mt Fuji from Lake Kawaguchi, ride the Shinkansen bullet train to Kyoto\'s temples and gardens, feed the deer in Nara and finish with Osaka\'s street food. An expert guide joins you for the main days.',
    highlights: [
      'Japan Rail / bullet train travel between cities',
      'Tokyo: Asakusa, Shibuya Crossing and Tokyo Skytree',
      'Mt Fuji and Lake Kawaguchi',
      'Kyoto: Fushimi Inari, Kinkaku-ji and Arashiyama bamboo grove',
      'Nara deer park and Todai-ji Temple',
      'Osaka Castle and Dotonbori food street'
    ],
    itinerary: [
      { title: 'Arrive in Tokyo', desc: 'Fly from Mumbai to Tokyo. Transfer to your hotel. Evening at Shinjuku.', meals: [] },
      { title: 'Tokyo city tour', desc: 'Guided tour of Senso-ji Temple in Asakusa, Meiji Shrine, Harajuku, Shibuya Crossing and Tokyo Skytree.', meals: ['Breakfast'] },
      { title: 'Mt Fuji & Lake Kawaguchi', desc: 'Day trip to the Mt Fuji area: Lake Kawaguchi, Chureito Pagoda and Oshino Hakkai village (Fuji views depend on weather).', meals: ['Breakfast'] },
      { title: 'Free day in Tokyo', desc: 'Day at leisure. Optional: Tokyo Disneyland, DisneySea or teamLab Planets.', meals: ['Breakfast'] },
      { title: 'Bullet train to Kyoto', desc: 'Shinkansen to Kyoto (about 2 hours 15 minutes). Afternoon at Fushimi Inari Shrine and its thousands of red gates. Evening walk in Gion.', meals: ['Breakfast'] },
      { title: 'Kyoto temples', desc: 'Visit Kinkaku-ji (Golden Pavilion), Arashiyama bamboo grove and Kiyomizu-dera.', meals: ['Breakfast'] },
      { title: 'Nara, then to Osaka', desc: 'Day trip to Nara to see the deer park and the giant Buddha at Todai-ji. Continue to Osaka.', meals: ['Breakfast'] },
      { title: 'Osaka', desc: 'Visit Osaka Castle and Shinsekai. Evening street food at Dotonbori. Optional: Universal Studios Japan.', meals: ['Breakfast'] },
      { title: 'Depart for Mumbai', desc: 'Transfer to Kansai airport for your flight home.', meals: ['Breakfast'] }
    ],
    inclusions: ['Return economy flights Mumbai–Tokyo / Osaka–Mumbai', '8 nights in 3/4-star hotels with daily breakfast', 'Bullet train Tokyo–Kyoto and local rail passes', 'English-speaking guide on main sightseeing days', 'Entry tickets as per itinerary', 'Japan visa assistance', 'Travel insurance'],
    exclusions: ['Japan visa fee', 'Lunch and dinner', 'Optional theme parks', 'Personal expenses'],
    bestTime: 'Late March to early April for cherry blossoms; October to November for autumn colours.',
    faqs: [
      { q: 'Is vegetarian food easy to find in Japan?', a: 'It takes some planning. We share a list of Indian and vegetarian restaurants in each city and can add an Indian meal plan.' },
      { q: 'Is this a group tour?', a: 'We run small group departures in spring and autumn, and can also make it a private tour for your family on any dates.' }
    ]
  }
};
