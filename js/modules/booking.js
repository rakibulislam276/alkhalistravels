/* ================================================================
   BOOKING.JS — Fully Functional Homepage Search Engine
   Al Khalis Tours and Travels v2.0
   Forms: Flight · Hotel · Packages · Umrah
   Features: Validation · WhatsApp redirect · Results display ·
             Live price estimation · Autocomplete · Form memory
   ================================================================ */

'use strict';

window.AlKhalis = window.AlKhalis || {};

window.AlKhalis.Booking = {

  /* Active tab */
  activeTab: 'flight',

  /* All major airports for autocomplete */
  AIRPORTS: [
    { code:'BOM', name:'Mumbai', country:'India', label:'Mumbai (BOM)' },
    { code:'DEL', name:'Delhi', country:'India', label:'Delhi (DEL)' },
    { code:'BLR', name:'Bengaluru', country:'India', label:'Bengaluru (BLR)' },
    { code:'MAA', name:'Chennai', country:'India', label:'Chennai (MAA)' },
    { code:'HYD', name:'Hyderabad', country:'India', label:'Hyderabad (HYD)' },
    { code:'CCU', name:'Kolkata', country:'India', label:'Kolkata (CCU)' },
    { code:'COK', name:'Kochi', country:'India', label:'Kochi (COK)' },
    { code:'AMD', name:'Ahmedabad', country:'India', label:'Ahmedabad (AMD)' },
    { code:'PNQ', name:'Pune', country:'India', label:'Pune (PNQ)' },
    { code:'DXB', name:'Dubai', country:'UAE', label:'Dubai (DXB)' },
    { code:'AUH', name:'Abu Dhabi', country:'UAE', label:'Abu Dhabi (AUH)' },
    { code:'SHJ', name:'Sharjah', country:'UAE', label:'Sharjah (SHJ)' },
    { code:'JED', name:'Jeddah', country:'Saudi Arabia', label:'Jeddah (JED)' },
    { code:'RUH', name:'Riyadh', country:'Saudi Arabia', label:'Riyadh (RUH)' },
    { code:'MED', name:'Madinah', country:'Saudi Arabia', label:'Madinah (MED)' },
    { code:'LHR', name:'London Heathrow', country:'UK', label:'London (LHR)' },
    { code:'LGW', name:'London Gatwick', country:'UK', label:'London Gatwick (LGW)' },
    { code:'CDG', name:'Paris Charles de Gaulle', country:'France', label:'Paris (CDG)' },
    { code:'FRA', name:'Frankfurt', country:'Germany', label:'Frankfurt (FRA)' },
    { code:'AMS', name:'Amsterdam', country:'Netherlands', label:'Amsterdam (AMS)' },
    { code:'FCO', name:'Rome', country:'Italy', label:'Rome (FCO)' },
    { code:'SIN', name:'Singapore Changi', country:'Singapore', label:'Singapore (SIN)' },
    { code:'KUL', name:'Kuala Lumpur', country:'Malaysia', label:'Kuala Lumpur (KUL)' },
    { code:'BKK', name:'Bangkok', country:'Thailand', label:'Bangkok (BKK)' },
    { code:'HKG', name:'Hong Kong', country:'HK', label:'Hong Kong (HKG)' },
    { code:'NRT', name:'Tokyo Narita', country:'Japan', label:'Tokyo (NRT)' },
    { code:'SYD', name:'Sydney', country:'Australia', label:'Sydney (SYD)' },
    { code:'MEL', name:'Melbourne', country:'Australia', label:'Melbourne (MEL)' },
    { code:'JFK', name:'New York JFK', country:'USA', label:'New York (JFK)' },
    { code:'LAX', name:'Los Angeles', country:'USA', label:'Los Angeles (LAX)' },
    { code:'ORD', name:'Chicago', country:'USA', label:'Chicago (ORD)' },
    { code:'YYZ', name:'Toronto', country:'Canada', label:'Toronto (YYZ)' },
    { code:'MCT', name:'Muscat', country:'Oman', label:'Muscat (MCT)' },
    { code:'BAH', name:'Bahrain', country:'Bahrain', label:'Bahrain (BAH)' },
    { code:'KWI', name:'Kuwait', country:'Kuwait', label:'Kuwait (KWI)' },
    { code:'DOH', name:'Doha', country:'Qatar', label:'Doha (DOH)' },
    { code:'CAI', name:'Cairo', country:'Egypt', label:'Cairo (CAI)' },
    { code:'IST', name:'Istanbul', country:'Turkey', label:'Istanbul (IST)' },
    { code:'DPS', name:'Bali Denpasar', country:'Indonesia', label:'Bali (DPS)' },
    { code:'MLE', name:'Maldives Male', country:'Maldives', label:'Maldives (MLE)' },
    { code:'CMB', name:'Colombo', country:'Sri Lanka', label:'Colombo (CMB)' },
    { code:'KTM', name:'Kathmandu', country:'Nepal', label:'Kathmandu (KTM)' },
    { code:'DAC', name:'Dhaka', country:'Bangladesh', label:'Dhaka (DAC)' },
  ],

  /* Base prices (INR) for estimation */
  FLIGHT_PRICES: {
    'BOM-DXB':3800,'BOM-JED':5500,'BOM-LHR':18000,'BOM-SIN':8000,
    'BOM-BKK':6000,'BOM-DOH':5000,'BOM-MCT':3500,'BOM-KUL':7000,
    'BOM-CDG':22000,'BOM-FRA':21000,'BOM-NRT':28000,'BOM-SYD':35000,
    'BOM-JFK':38000,'BOM-CAI':12000,'BOM-IST':15000,'BOM-DPS':14000,
    'BOM-MLE':12000,'BOM-DEL':2200,'BOM-BLR':1800,'BOM-HYD':1900,
  },

  HOTEL_PRICES: {
    'dubai':3500,'makkah':4500,'madinah':3800,'london':6500,'paris':7000,
    'singapore':5500,'bangkok':2800,'bali':3200,'maldives':12000,'istanbul':3500,
  },

  PACKAGE_PRICES: {
    'dubai':42999,'umrah':95000,'bali':85000,'europe':185000,'singapore':68000,
    'kashmir':28000,'goa':18500,'maldives':145000,'thailand':65000,'malaysia':55000,
  },

  UMRAH_PRICES: {
    'economy':72000,'standard':95000,'premium':125000,'luxury':210000,
  },

  /* Visa info per destination */
  VISA_INFO: {
    'UAE':      { time:'2–4 Working Days', valid:'30–90 Days', entry:'Single/Multiple', rate:'98%' },
    'SA':       { time:'3–7 Working Days', valid:'30 Days',    entry:'Single',          rate:'99%' },
    'UK':       { time:'15–21 Working Days',valid:'6 Months',  entry:'Multiple',        rate:'95%' },
    'US':       { time:'4–8 Weeks',        valid:'10 Years',   entry:'Multiple',        rate:'90%' },
    'SCHENGEN': { time:'7–15 Working Days', valid:'90 Days',   entry:'Single/Multiple', rate:'96%' },
    'SG':       { time:'3–5 Working Days', valid:'30 Days',    entry:'Single',          rate:'99%' },
    'AU':       { time:'2–4 Weeks',        valid:'3–12 Months',entry:'Multiple',        rate:'93%' },
    'CA':       { time:'4–8 Weeks',        valid:'6 Months',   entry:'Single/Multiple', rate:'91%' },
    'TH':       { time:'1–3 Working Days', valid:'30–60 Days', entry:'Single',          rate:'99%' },
    'MY':       { time:'1–2 Working Days', valid:'30 Days',    entry:'Single',          rate:'99%' },
    'TR':       { time:'1–3 Working Days', valid:'30–90 Days', entry:'Multiple',        rate:'99%' },
    'OM':       { time:'3–5 Working Days', valid:'30 Days',    entry:'Single',          rate:'98%' },
    'QA':       { time:'2–4 Working Days', valid:'30 Days',    entry:'Single',          rate:'98%' },
    'BH':       { time:'2–3 Working Days', valid:'14–30 Days', entry:'Single',          rate:'98%' },
    'KW':       { time:'3–5 Working Days', valid:'30 Days',    entry:'Single',          rate:'97%' },
    'EG':       { time:'2–4 Working Days', valid:'30 Days',    entry:'Single',          rate:'98%' },
    'ID':       { time:'1–2 Working Days', valid:'30 Days',    entry:'Single',          rate:'99%' },
    'MV':       { time:'On Arrival',       valid:'30 Days',    entry:'Single',          rate:'100%'},
    'JP':       { time:'5–7 Working Days', valid:'15–90 Days', entry:'Single/Double',   entry2:'—', rate:'95%' },
    'NZ':       { time:'2–4 Weeks',        valid:'3–9 Months', entry:'Multiple',        rate:'92%' },
  },

  /* Forex rates (INR base) */
  FOREX_RATES: {
    'INR':1, 'USD':83.42, 'EUR':105.80, 'GBP':106.20,
    'AED':22.72,'SAR':22.20,'SGD':62.10,'AUD':54.30,
    'CAD':60.50,'JPY':0.86,'THB':2.38,'MYR':18.20,
  },

  /* ── INIT ─────────────────────────────────────────────────── */
  init() {
    this.buildSearchWidget();
    this.loadSavedData();
    console.info('✈ AlKhalis Booking Engine ready');
  },

  /* ── BUILD THE FULL SEARCH WIDGET ───────────────────────────── */
  buildSearchWidget() {
    const container = document.getElementById('booking-widget');
    if (!container) return;

    container.innerHTML = `
      <!-- TAB BAR -->
      <div class="bw-tabs" role="tablist" aria-label="Booking type">
        <button class="bw-tab active" data-tab="flight"   role="tab" aria-selected="true"  onclick="AlKhalis.Booking.switchTab('flight')">
          <span class="bw-tab-icon">✈️</span><span class="bw-tab-label">Flight</span>
        </button>
        <button class="bw-tab" data-tab="hotel"    role="tab" aria-selected="false" onclick="AlKhalis.Booking.switchTab('hotel')">
          <span class="bw-tab-icon">🏨</span><span class="bw-tab-label">Hotel</span>
        </button>
        <button class="bw-tab" data-tab="packages" role="tab" aria-selected="false" onclick="AlKhalis.Booking.switchTab('packages')">
          <span class="bw-tab-icon">🧳</span><span class="bw-tab-label">Packages</span>
        </button>
        <button class="bw-tab" data-tab="umrah"    role="tab" aria-selected="false" onclick="AlKhalis.Booking.switchTab('umrah')">
          <span class="bw-tab-icon">🕋</span><span class="bw-tab-label">Umrah</span>
        </button>
        <button class="bw-tab" data-tab="visa"     role="tab" aria-selected="false" onclick="AlKhalis.Booking.switchTab('visa')">
          <span class="bw-tab-icon">🛂</span><span class="bw-tab-label">Visa</span>
        </button>
        <button class="bw-tab" data-tab="forex"    role="tab" aria-selected="false" onclick="AlKhalis.Booking.switchTab('forex')">
          <span class="bw-tab-icon">💱</span><span class="bw-tab-label">Forex</span>
        </button>
      </div>

      <!-- FLIGHT FORM -->
      <div class="bw-panel" id="bw-flight" role="tabpanel">
        <div class="bw-trip-row">
          <label class="bw-radio-label"><input type="radio" name="trip-type" value="oneway" checked onchange="AlKhalis.Booking.updateTripType()"> One Way</label>
          <label class="bw-radio-label"><input type="radio" name="trip-type" value="round"  onchange="AlKhalis.Booking.updateTripType()"> Round Trip</label>
          <label class="bw-radio-label"><input type="radio" name="trip-type" value="multi"  onchange="AlKhalis.Booking.updateTripType()"> Multi City</label>
        </div>
        <div class="bw-flight-row">
          <div class="bw-field bw-field--grow">
            <label class="bw-label">From</label>
            <div class="bw-input-wrap">
              <span class="bw-icon">🛫</span>
              <input type="text" id="fl-from" class="bw-input" placeholder="City or Airport" value="Mumbai (BOM)"
                     autocomplete="off" oninput="AlKhalis.Booking.autocomplete(this,'fl-from-list')"
                     onfocus="this.select()" aria-autocomplete="list" aria-controls="fl-from-list">
              <div class="bw-autocomplete" id="fl-from-list" role="listbox" hidden></div>
            </div>
          </div>
          <button class="bw-swap" id="fl-swap" onclick="AlKhalis.Booking.swapCities('fl-from','fl-to')" title="Swap cities" aria-label="Swap cities">⇄</button>
          <div class="bw-field bw-field--grow">
            <label class="bw-label">To</label>
            <div class="bw-input-wrap">
              <span class="bw-icon">🛬</span>
              <input type="text" id="fl-to" class="bw-input" placeholder="City or Airport"
                     autocomplete="off" oninput="AlKhalis.Booking.autocomplete(this,'fl-to-list')"
                     onfocus="this.select()" aria-autocomplete="list" aria-controls="fl-to-list">
              <div class="bw-autocomplete" id="fl-to-list" role="listbox" hidden></div>
            </div>
          </div>
          <div class="bw-field">
            <label class="bw-label">Departure</label>
            <input type="date" id="fl-dep" class="bw-input" onchange="AlKhalis.Booking.updateReturnMin()">
          </div>
          <div class="bw-field" id="fl-return-wrap">
            <label class="bw-label">Return</label>
            <input type="date" id="fl-ret" class="bw-input">
          </div>
          <div class="bw-field bw-field--sm">
            <label class="bw-label">Travellers</label>
            <div class="bw-pax-wrap" onclick="AlKhalis.Booking.togglePax('fl-pax-drop')">
              <span class="bw-icon">👤</span>
              <span id="fl-pax-display" class="bw-input bw-pax-display">1 Adult</span>
            </div>
            <div class="bw-pax-drop" id="fl-pax-drop" hidden>
              ${this._paxDropdown('fl')}
            </div>
          </div>
          <div class="bw-field bw-field--sm">
            <label class="bw-label">Class</label>
            <select id="fl-class" class="bw-input bw-select">
              <option value="economy">Economy</option>
              <option value="premium">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
        </div>
        <div class="bw-footer-row">
          <span class="bw-popular-label">Popular routes:</span>
          <div class="bw-chips" role="list" aria-label="Popular flight routes">
            ${this._routeChips()}
          </div>
          <button class="bw-search-btn bw-search-btn--full" onclick="AlKhalis.Booking.searchFlight()" id="fl-search-btn" aria-label="Search flights">
            <span class="bw-search-icon">🔍</span> Search Flights
          </button>
        </div>
      </div>

      <!-- HOTEL FORM -->
      <div class="bw-panel" id="bw-hotel" role="tabpanel" hidden>
        <div class="bw-hotel-row">
          <div class="bw-field bw-field--xl">
            <label class="bw-label">Destination / Hotel Name</label>
            <div class="bw-input-wrap">
              <span class="bw-icon">📍</span>
              <input type="text" id="ht-dest" class="bw-input" placeholder="City, hotel, or landmark..."
                     autocomplete="off" oninput="AlKhalis.Booking.autocompleteHotel(this,'ht-dest-list')">
              <div class="bw-autocomplete" id="ht-dest-list" role="listbox" hidden></div>
            </div>
          </div>
          <div class="bw-field">
            <label class="bw-label">Check-In</label>
            <input type="date" id="ht-in" class="bw-input" onchange="AlKhalis.Booking.setCheckoutMin()">
          </div>
          <div class="bw-field">
            <label class="bw-label">Check-Out</label>
            <input type="date" id="ht-out" class="bw-input">
          </div>
          <div class="bw-field">
            <label class="bw-label">Rooms &amp; Guests</label>
            <div class="bw-pax-wrap" onclick="AlKhalis.Booking.togglePax('ht-pax-drop')">
              <span class="bw-icon">🛏</span>
              <span id="ht-pax-display" class="bw-input bw-pax-display">1 Room, 2 Guests</span>
            </div>
            <div class="bw-pax-drop" id="ht-pax-drop" hidden>
              ${this._hotelPaxDropdown()}
            </div>
          </div>
          <div class="bw-field bw-field--sm">
            <label class="bw-label">Star Rating</label>
            <select id="ht-stars" class="bw-input bw-select">
              <option value="any">Any Rating</option>
              <option value="3">3 Star ⭐⭐⭐</option>
              <option value="4">4 Star ⭐⭐⭐⭐</option>
              <option value="5">5 Star ⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>
        <div class="bw-footer-row">
          <span class="bw-popular-label">Popular destinations:</span>
          <div class="bw-chips" role="list" aria-label="Popular hotel destinations">
            <span class="bw-chip" onclick="AlKhalis.Booking.setHotelDest('Dubai')">Dubai</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setHotelDest('Makkah')">Makkah</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setHotelDest('Madinah')">Madinah</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setHotelDest('Singapore')">Singapore</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setHotelDest('London')">London</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setHotelDest('Bali')">Bali</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setHotelDest('Bangkok')">Bangkok</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setHotelDest('Bangkok')">Bangkok</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setHotelDest('Paris')">Paris</span>
          </div>
          <button class="bw-search-btn bw-search-btn--full" onclick="AlKhalis.Booking.searchHotel()" id="ht-search-btn" aria-label="Search hotels">
            <span class="bw-search-icon">🔍</span> Search Hotels
          </button>
        </div>
      </div>

      <!-- PACKAGES FORM -->
      <div class="bw-panel" id="bw-packages" role="tabpanel" hidden>
        <div class="bw-pkg-row">
          <div class="bw-field bw-field--xl">
            <label class="bw-label">Destination / Package Type</label>
            <select id="pkg-dest" class="bw-input bw-select" onchange="AlKhalis.Booking.updatePkgPrice()">
              <option value="">Select a destination...</option>
              <option value="dubai">Dubai, UAE — from ₹42,999</option>
              <option value="umrah">Umrah Package — from ₹95,000</option>
              <option value="bali">Bali, Indonesia — from ₹85,000</option>
              <option value="europe">Europe Grand Tour — from ₹1,85,000</option>
              <option value="singapore">Singapore + Malaysia — from ₹68,000</option>
              <option value="kashmir">Kashmir Valley — from ₹28,000</option>
              <option value="goa">Goa Beach Holiday — from ₹18,500</option>
              <option value="maldives">Maldives Luxury — from ₹1,45,000</option>
              <option value="thailand">Thailand — from ₹65,000</option>
              <option value="malaysia">Malaysia — from ₹55,000</option>
            </select>
          </div>
          <div class="bw-field bw-field--sm">
            <label class="bw-label">Package Type</label>
            <select id="pkg-type" class="bw-input bw-select">
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="luxury">Luxury</option>
              <option value="honeymoon">Honeymoon</option>
              <option value="group">Group Tour</option>
              <option value="family">Family</option>
            </select>
          </div>
          <div class="bw-field">
            <label class="bw-label">Travel Month</label>
            <select id="pkg-month" class="bw-input bw-select">
              <option value="">Select month</option>
              <option>June 2026</option><option>July 2026</option>
              <option>August 2026</option><option>September 2026</option>
              <option>October 2026</option><option>November 2026</option>
              <option>December 2026</option><option>January 2026</option>
              <option>February 2026</option><option>March 2026</option>
            </select>
          </div>
          <div class="bw-field bw-field--sm">
            <label class="bw-label">No. of Travellers</label>
            <select id="pkg-pax" class="bw-input bw-select" onchange="AlKhalis.Booking.updatePkgPrice()">
              <option value="1">1 Person</option>
              <option value="2" selected>2 Persons</option>
              <option value="3">3 Persons</option>
              <option value="4">4 Persons</option>
              <option value="5">5 Persons</option>
              <option value="6">6 Persons</option>
              <option value="10">Group 10+</option>
            </select>
          </div>
          <div class="bw-field bw-field--sm">
            <label class="bw-label">Duration</label>
            <select id="pkg-dur" class="bw-input bw-select">
              <option>3–5 Nights</option>
              <option>6–8 Nights</option>
              <option>9–12 Nights</option>
              <option>13–16 Nights</option>
              <option>17+ Nights</option>
            </select>
          </div>
        </div>
        <div id="pkg-price-bar" class="bw-price-estimate" hidden>
          <span class="bw-price-label">Estimated Price:</span>
          <span class="bw-price-value" id="pkg-price-val">—</span>
          <span class="bw-price-note">*per person, subject to availability</span>
        </div>
        <div class="bw-footer-row">
          <span class="bw-popular-label">Popular packages:</span>
          <div class="bw-chips" role="list" aria-label="Popular packages">
            <span class="bw-chip" onclick="AlKhalis.Booking.setPkg('dubai')">Dubai</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setPkg('bali')">Bali</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setPkg('europe')">Europe</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setPkg('maldives')">Maldives</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setPkg('kashmir')">Kashmir</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setPkg('goa')">Goa</span>
          </div>
          <button class="bw-search-btn bw-search-btn--full" onclick="AlKhalis.Booking.searchPackage()" id="pkg-search-btn" aria-label="Get package quote">
            <span class="bw-search-icon">📦</span> Get Package Quote
          </button>
        </div>
      </div>

      <!-- UMRAH / HAJJ FORM -->
      <div class="bw-panel" id="bw-umrah" role="tabpanel" hidden>
        <div class="bw-umrah-row">
          <div class="bw-field bw-field--sm">
            <label class="bw-label">Package Tier</label>
            <select id="um-tier" class="bw-input bw-select" onchange="AlKhalis.Booking.updateUmrahPrice()">
              <option value="economy">Economy</option>
              <option value="standard" selected>Standard</option>
              <option value="premium">Premium</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <div class="bw-field bw-field--sm">
            <label class="bw-label">Duration</label>
            <select id="um-dur" class="bw-input bw-select">
              <option value="12">12 Nights / 13 Days</option>
              <option value="14" selected>14 Nights / 15 Days</option>
              <option value="17">17 Nights / 18 Days</option>
              <option value="21">21 Nights (Ramadan)</option>
            </select>
          </div>
          <div class="bw-field">
            <label class="bw-label">Preferred Departure</label>
            <select id="um-month" class="bw-input bw-select">
              <option>June 2026</option>
              <option>July 2026</option>
              <option>August 2026</option>
              <option>September 2026</option>
              <option>October 2026</option>
              <option>November 2026</option>
              <option>Ramadan 2026</option>
              <option>Hajj 2026</option>
            </select>
          </div>
          <div class="bw-field bw-field--sm">
            <label class="bw-label">No. of Pilgrims</label>
            <select id="um-pax" class="bw-input bw-select" onchange="AlKhalis.Booking.updateUmrahPrice()">
              <option value="1">1 Pilgrim</option>
              <option value="2" selected>2 Pilgrims</option>
              <option value="3">3 Pilgrims</option>
              <option value="4">4 Pilgrims</option>
              <option value="5">5 Pilgrims</option>
              <option value="6">6 Pilgrims</option>
              <option value="10">10+ Pilgrims</option>
            </select>
          </div>
          <div class="bw-field bw-field--sm">
            <label class="bw-label">Meal Plan</label>
            <select id="um-meal" class="bw-input bw-select">
              <option>Breakfast Only</option>
              <option>Breakfast + Dinner</option>
              <option>All Meals Included</option>
              <option>No Meals</option>
            </select>
          </div>
        </div>
        <div class="bw-umrah-features">
          <label class="bw-check-label"><input type="checkbox" id="um-visa"      checked> Umrah Visa Included</label>
          <label class="bw-check-label"><input type="checkbox" id="um-ziyarat"  checked> Guided Ziyarat</label>
          <label class="bw-check-label"><input type="checkbox" id="um-transport" checked> Ground Transport</label>
          <label class="bw-check-label"><input type="checkbox" id="um-insurance"> Travel Insurance</label>
        </div>
        <div class="bw-price-estimate" id="um-price-bar">
          <span class="bw-price-label">Estimated Total:</span>
          <span class="bw-price-value" id="um-price-val">₹1,90,000</span>
          <span class="bw-price-note">for 2 pilgrims · Standard · 14 nights</span>
        </div>
        <div class="bw-footer-row">
          <div style="font-size:0.72rem;color:rgba(255,255,255,0.5);line-height:1.5">
            🕌 <strong style="color:var(--gold-light)">Ministry of Hajj Approved</strong> · 5,000+ pilgrims served
          </div>
          <button class="bw-search-btn bw-search-btn--full" onclick="AlKhalis.Booking.searchUmrah()" id="um-search-btn" aria-label="Check Umrah availability">
            <span class="bw-search-icon">🕌</span> Check Availability
          </button>
        </div>
      </div>

      <!-- VISA PANEL -->
      <div class="bw-panel" id="bw-visa" role="tabpanel" hidden>

        <div class="bw-visa-row">
          <div class="bw-field bw-field--sm">
            <label class="bw-label">From Country</label>
            <select id="vi-from" class="bw-input bw-select">
              <option value="IN" selected>🇮🇳 India</option>
              <option value="PK">🇵🇰 Pakistan</option>
              <option value="BD">🇧🇩 Bangladesh</option>
              <option value="NP">🇳🇵 Nepal</option>
              <option value="LK">🇱🇰 Sri Lanka</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div class="bw-field bw-field--grow">
            <label class="bw-label">Destination Country *</label>
            <div class="bw-input-wrap">
              <span class="bw-icon">🌍</span>
              <select id="vi-to" class="bw-input bw-select" onchange="AlKhalis.Booking.updateVisaInfo()">
                <option value="">Select destination...</option>
                <option value="UAE">🇦🇪 UAE / Dubai</option>
                <option value="SA">🇸🇦 Saudi Arabia</option>
                <option value="UK">🇬🇧 United Kingdom</option>
                <option value="US">🇺🇸 USA</option>
                <option value="SCHENGEN">🇪🇺 Schengen (Europe)</option>
                <option value="SG">🇸🇬 Singapore</option>
                <option value="AU">🇦🇺 Australia</option>
                <option value="CA">🇨🇦 Canada</option>
                <option value="TH">🇹🇭 Thailand</option>
                <option value="MY">🇲🇾 Malaysia</option>
                <option value="TR">🇹🇷 Turkey</option>
                <option value="OM">🇴🇲 Oman</option>
                <option value="QA">🇶🇦 Qatar</option>
                <option value="BH">🇧🇭 Bahrain</option>
                <option value="KW">🇰🇼 Kuwait</option>
                <option value="EG">🇪🇬 Egypt</option>
                <option value="ID">🇮🇩 Indonesia / Bali</option>
                <option value="MV">🇲🇻 Maldives</option>
                <option value="NZ">🇳🇿 New Zealand</option>
                <option value="JP">🇯🇵 Japan</option>
              </select>
            </div>
          </div>
          <div class="bw-field bw-field--sm">
            <label class="bw-label">Visa Type</label>
            <select id="vi-type" class="bw-input bw-select">
              <option value="tourist">Tourist</option>
              <option value="business">Business</option>
              <option value="student">Student</option>
              <option value="umrah">Umrah / Hajj</option>
              <option value="family">Family / Visit</option>
              <option value="transit">Transit</option>
              <option value="work">Work Permit</option>
            </select>
          </div>
          <div class="bw-field bw-field--sm">
            <label class="bw-label">Travel Date</label>
            <input type="date" id="vi-date" class="bw-input">
          </div>
          <div class="bw-field bw-field--sm">
            <label class="bw-label">No. of Applicants</label>
            <select id="vi-pax" class="bw-input bw-select">
              <option value="1">1 Person</option>
              <option value="2">2 Persons</option>
              <option value="3">3 Persons</option>
              <option value="4">4 Persons</option>
              <option value="5">5 Persons</option>
              <option value="6+">6+ Persons</option>
            </select>
          </div>
        </div>

        <!-- Visa info bar — updates on country selection -->
        <div id="vi-info-bar" class="bw-visa-info" hidden>
          <div class="bw-visa-info__grid">
            <div class="bw-visa-stat">
              <span class="bw-visa-stat__label">Processing Time</span>
              <span class="bw-visa-stat__val" id="vi-stat-time">—</span>
            </div>
            <div class="bw-visa-stat">
              <span class="bw-visa-stat__label">Success Rate</span>
              <span class="bw-visa-stat__val" id="vi-stat-rate">98%</span>
            </div>
            <div class="bw-visa-stat">
              <span class="bw-visa-stat__label">Validity</span>
              <span class="bw-visa-stat__val" id="vi-stat-valid">—</span>
            </div>
            <div class="bw-visa-stat">
              <span class="bw-visa-stat__label">Entry Type</span>
              <span class="bw-visa-stat__val" id="vi-stat-entry">—</span>
            </div>
          </div>
        </div>

        <!-- Popular visa country chips -->
        <div class="bw-footer-row">
          <span class="bw-popular-label">Popular visa destinations:</span>
          <div class="bw-chips" role="list" aria-label="Popular visa countries">
            <span class="bw-chip" onclick="AlKhalis.Booking.setVisaDest('UAE')">🇦🇪 Dubai</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setVisaDest('UK')">🇬🇧 UK</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setVisaDest('SCHENGEN')">🇪🇺 Schengen</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setVisaDest('US')">🇺🇸 USA</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setVisaDest('SA')">🇸🇦 Saudi</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setVisaDest('SG')">🇸🇬 Singapore</span>
          </div>
          <button class="bw-search-btn bw-search-btn--full" onclick="AlKhalis.Booking.searchVisa()" id="vi-search-btn" aria-label="Apply for visa">
            <span class="bw-search-icon">📋</span> Apply for Visa
          </button>
        </div>
      </div>

      <!-- FOREX PANEL -->
      <div class="bw-panel" id="bw-forex" role="tabpanel" hidden>

        <div class="bw-forex-row">
          <div class="bw-field bw-field--sm">
            <label class="bw-label">Amount</label>
            <div class="bw-input-wrap">
              <span class="bw-icon" id="fx-from-flag">₹</span>
              <input type="number" id="fx-amount" class="bw-input" value="10000"
                     placeholder="Enter amount" min="1"
                     oninput="AlKhalis.Booking.convertForex()"
                     style="padding-left:28px">
            </div>
          </div>
          <div class="bw-field bw-field--sm">
            <label class="bw-label">From Currency</label>
            <select id="fx-from" class="bw-input bw-select" onchange="AlKhalis.Booking.convertForex()">
              <option value="83.42" data-code="INR" data-flag="🇮🇳" selected>🇮🇳 INR — Indian Rupee</option>
              <option value="0.012" data-code="USD" data-flag="🇺🇸">🇺🇸 USD — US Dollar</option>
              <option value="0.011" data-code="EUR" data-flag="🇪🇺">🇪🇺 EUR — Euro</option>
              <option value="0.0094" data-code="GBP" data-flag="🇬🇧">🇬🇧 GBP — British Pound</option>
              <option value="0.044" data-code="AED" data-flag="🇦🇪">🇦🇪 AED — UAE Dirham</option>
              <option value="0.045" data-code="SAR" data-flag="🇸🇦">🇸🇦 SAR — Saudi Riyal</option>
              <option value="0.016" data-code="SGD" data-flag="🇸🇬">🇸🇬 SGD — Singapore Dollar</option>
              <option value="0.018" data-code="AUD" data-flag="🇦🇺">🇦🇺 AUD — Australian Dollar</option>
              <option value="0.016" data-code="CAD" data-flag="🇨🇦">🇨🇦 CAD — Canadian Dollar</option>
              <option value="1.78"  data-code="JPY" data-flag="🇯🇵">🇯🇵 JPY — Japanese Yen</option>
              <option value="0.42"  data-code="THB" data-flag="🇹🇭">🇹🇭 THB — Thai Baht</option>
              <option value="0.053" data-code="MYR" data-flag="🇲🇾">🇲🇾 MYR — Malaysian Ringgit</option>
            </select>
          </div>

          <!-- Swap button -->
          <button class="bw-swap" onclick="AlKhalis.Booking.swapForex()" title="Swap currencies" aria-label="Swap currencies" style="margin-bottom:5px">⇄</button>

          <div class="bw-field bw-field--sm">
            <label class="bw-label">To Currency</label>
            <select id="fx-to" class="bw-input bw-select" onchange="AlKhalis.Booking.convertForex()">
              <option value="83.42" data-code="INR" data-flag="🇮🇳">🇮🇳 INR — Indian Rupee</option>
              <option value="0.012" data-code="USD" data-flag="🇺🇸" selected>🇺🇸 USD — US Dollar</option>
              <option value="0.011" data-code="EUR" data-flag="🇪🇺">🇪🇺 EUR — Euro</option>
              <option value="0.0094" data-code="GBP" data-flag="🇬🇧">🇬🇧 GBP — British Pound</option>
              <option value="0.044"  data-code="AED" data-flag="🇦🇪">🇦🇪 AED — UAE Dirham</option>
              <option value="0.045"  data-code="SAR" data-flag="🇸🇦">🇸🇦 SAR — Saudi Riyal</option>
              <option value="0.016"  data-code="SGD" data-flag="🇸🇬">🇸🇬 SGD — Singapore Dollar</option>
              <option value="0.018"  data-code="AUD" data-flag="🇦🇺">🇦🇺 AUD — Australian Dollar</option>
              <option value="0.016"  data-code="CAD" data-flag="🇨🇦">🇨🇦 CAD — Canadian Dollar</option>
              <option value="1.78"   data-code="JPY" data-flag="🇯🇵">🇯🇵 JPY — Japanese Yen</option>
              <option value="0.42"   data-code="THB" data-flag="🇹🇭">🇹🇭 THB — Thai Baht</option>
              <option value="0.053"  data-code="MYR" data-flag="🇲🇾">🇲🇾 MYR — Malaysian Ringgit</option>
            </select>
          </div>

          <div class="bw-field bw-field--sm">
            <label class="bw-label">Service Type</label>
            <select id="fx-service" class="bw-input bw-select">
              <option>Buy Foreign Currency</option>
              <option>Sell Foreign Currency</option>
              <option>Travel Forex Card</option>
              <option>Wire Transfer</option>
              <option>Demand Draft</option>
            </select>
          </div>
        </div>

        <!-- Live conversion result display -->
        <div class="bw-forex-result">
          <div class="bw-forex-result__left">
            <span class="bw-forex-result__amount" id="fx-from-display">₹10,000</span>
            <span class="bw-forex-result__equals">=</span>
            <span class="bw-forex-result__converted" id="fx-to-display">$119.90</span>
          </div>
          <div class="bw-forex-result__rate" id="fx-rate-display">
            Rate: 1 INR = 0.012 USD &nbsp;·&nbsp; <span style="color:rgba(255,255,255,0.4);font-size:0.65rem">Indicative · Confirmed at transaction</span>
          </div>
        </div>

        <!-- Quick currency chips -->
        <div class="bw-footer-row">
          <span class="bw-popular-label">Quick exchange:</span>
          <div class="bw-chips" role="list" aria-label="Quick currency pairs">
            <span class="bw-chip" onclick="AlKhalis.Booking.setForexPair('INR','USD')">INR → USD</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setForexPair('INR','AED')">INR → AED</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setForexPair('INR','EUR')">INR → EUR</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setForexPair('INR','GBP')">INR → GBP</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setForexPair('INR','SAR')">INR → SAR</span>
            <span class="bw-chip" onclick="AlKhalis.Booking.setForexPair('INR','SGD')">INR → SGD</span>
          </div>
          <button class="bw-search-btn bw-search-btn--full" onclick="AlKhalis.Booking.searchForex()" id="fx-search-btn" aria-label="Get forex quote">
            <span class="bw-search-icon">💱</span> Get Best Rate Quote
          </button>
        </div>
      </div>

      <!-- RESULT MODAL -->
      <div id="bw-result-modal" class="bw-result-modal" hidden role="dialog" aria-modal="true" aria-labelledby="bw-result-title">
        <div class="bw-result-card">
          <button class="bw-result-close" onclick="AlKhalis.Booking.closeResult()" aria-label="Close">✕</button>
          <div id="bw-result-content"></div>
        </div>
      </div>
    `;

    this.setDateDefaults();
    this.updateUmrahPrice();
    this.closeDropdowns();
    this._forceCloseAll(); // Ensure nothing is open on load
    this.convertForex();   // Init forex display
  },

  /* ── Force close every dropdown on init ── */
  _forceCloseAll() {
    // Use setTimeout to run after DOM fully renders
    setTimeout(() => {
      document.querySelectorAll('.bw-pax-drop').forEach(el => {
        el.hidden = true;
        el.setAttribute('hidden', '');
      });
      document.querySelectorAll('.bw-autocomplete').forEach(el => {
        el.hidden = true;
        el.setAttribute('hidden', '');
      });
      const modal = document.getElementById('bw-result-modal');
      if (modal) { modal.hidden = true; modal.setAttribute('hidden',''); }
    }, 0);
  },

  /* ── TAB SWITCH ──────────────────────────────────────────── */
  switchTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('.bw-tab').forEach(b => {
      const active = b.getAttribute('data-tab') === tab;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active);
    });
    document.querySelectorAll('.bw-panel').forEach(p => {
      p.hidden = p.id !== `bw-${tab}`;
    });
  },

  /* ── DATE DEFAULTS ───────────────────────────────────────── */
  setDateDefaults() {
    const today     = new Date();
    const tomorrow  = new Date(today); tomorrow.setDate(today.getDate() + 1);
    const nextWeek  = new Date(today); nextWeek.setDate(today.getDate() + 7);
    const nextMonth = new Date(today); nextMonth.setDate(today.getDate() + 30);
    const toStr = d => d.toISOString().split('T')[0];

    ['fl-dep','fl-ret','ht-in','ht-out'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.min = toStr(today);
    });
    const fd = document.getElementById('fl-dep');
    if (fd) fd.value = toStr(nextWeek);
    const fr = document.getElementById('fl-ret');
    if (fr) { fr.value = toStr(new Date(nextWeek.getTime() + 7*86400000)); fr.disabled = true; }
    const hi = document.getElementById('ht-in');
    if (hi) hi.value = toStr(nextWeek);
    const ho = document.getElementById('ht-out');
    if (ho) ho.value = toStr(nextMonth);
  },

  updateTripType() {
    const val = document.querySelector('input[name="trip-type"]:checked')?.value;
    const retWrap = document.getElementById('fl-return-wrap');
    const retEl   = document.getElementById('fl-ret');
    if (!retWrap || !retEl) return;
    const isRound = val === 'round';
    retEl.disabled = !isRound;
    retWrap.style.opacity = isRound ? '1' : '0.4';
  },

  updateReturnMin() {
    const dep = document.getElementById('fl-dep')?.value;
    const ret = document.getElementById('fl-ret');
    if (dep && ret) { ret.min = dep; if (ret.value < dep) ret.value = dep; }
  },

  setCheckoutMin() {
    const ci = document.getElementById('ht-in')?.value;
    const co = document.getElementById('ht-out');
    if (ci && co) { co.min = ci; if (!co.value || co.value <= ci) {
      const d = new Date(ci); d.setDate(d.getDate()+1);
      co.value = d.toISOString().split('T')[0];
    }}
  },

  /* ── AUTOCOMPLETE ────────────────────────────────────────── */
  autocomplete(input, listId) {
    const q    = input.value.toLowerCase();
    const list = document.getElementById(listId);
    if (!list) return;
    if (!q || q.length < 2) { list.hidden = true; return; }

    const matches = this.AIRPORTS.filter(a =>
      a.label.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q)  ||
      a.country.toLowerCase().includes(q)
    ).slice(0, 7);

    if (!matches.length) { list.hidden = true; return; }

    list.innerHTML = matches.map(a => `
      <div class="bw-ac-item" role="option" tabindex="0"
           onclick="AlKhalis.Booking.selectAirport('${input.id}','${listId}','${a.label}')">
        <span class="bw-ac-code">${a.code}</span>
        <span class="bw-ac-name">${a.name}</span>
        <span class="bw-ac-country">${a.country}</span>
      </div>`).join('');
    list.hidden = false;
  },

  selectAirport(inputId, listId, label) {
    const input = document.getElementById(inputId);
    const list  = document.getElementById(listId);
    if (input) input.value = label;
    if (list)  list.hidden = true;
    this.estimateFlightPrice();
  },

  autocompleteHotel(input, listId) {
    const CITIES = ['Dubai','Makkah','Madinah','Singapore','London','Paris',
      'Bangkok','Bali','Istanbul','Cairo','Muscat','Kuala Lumpur','Tokyo',
      'Sydney','New York','Toronto','Rome','Amsterdam','Frankfurt','Hong Kong',
      'Kathmandu','Colombo','Maldives','Kashmir','Goa','Mumbai','Delhi'];
    const q    = input.value.toLowerCase();
    const list = document.getElementById(listId);
    if (!list || !q || q.length < 2) { if(list) list.hidden=true; return; }
    const matches = CITIES.filter(c => c.toLowerCase().includes(q)).slice(0,6);
    if (!matches.length) { list.hidden=true; return; }
    list.innerHTML = matches.map(c => `
      <div class="bw-ac-item" role="option" tabindex="0"
           onclick="AlKhalis.Booking.setHotelDest('${c}')">
        <span class="bw-ac-code">📍</span>
        <span class="bw-ac-name">${c}</span>
      </div>`).join('');
    list.hidden = false;
  },

  setHotelDest(city) {
    const el = document.getElementById('ht-dest');
    const list = document.getElementById('ht-dest-list');
    if (el) el.value = city;
    if (list) list.hidden = true;
  },

  closeDropdowns() {
    document.addEventListener('click', e => {
      if (!e.target.closest('.bw-input-wrap') &&
          !e.target.closest('.bw-pax-wrap')   &&
          !e.target.closest('.bw-pax-drop')) {
        document.querySelectorAll('.bw-autocomplete').forEach(l => {
          l.hidden = true; l.setAttribute('hidden','');
        });
        document.querySelectorAll('.bw-pax-drop').forEach(l => {
          l.hidden = true; l.setAttribute('hidden','');
        });
      }
    });
    // Also close on ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.bw-pax-drop').forEach(l => {
          l.hidden = true; l.setAttribute('hidden','');
        });
        document.querySelectorAll('.bw-autocomplete').forEach(l => {
          l.hidden = true; l.setAttribute('hidden','');
        });
      }
    });
  },

  /* ── PAX DROPDOWNS ───────────────────────────────────────── */
  _paxDropdown(prefix) {
    return `
      <div class="bw-pax-row">
        <div class="bw-pax-label"><strong>Adults</strong><span>12+ years</span></div>
        <div class="bw-pax-ctrl">
          <button type="button" onclick="AlKhalis.Booking.changePax('${prefix}-adults',-1)" aria-label="Decrease adults">−</button>
          <span id="${prefix}-adults" data-min="1" data-max="9">1</span>
          <button type="button" onclick="AlKhalis.Booking.changePax('${prefix}-adults',1)" aria-label="Increase adults">+</button>
        </div>
      </div>
      <div class="bw-pax-row">
        <div class="bw-pax-label"><strong>Children</strong><span>2–11 years</span></div>
        <div class="bw-pax-ctrl">
          <button type="button" onclick="AlKhalis.Booking.changePax('${prefix}-children',-1)" aria-label="Decrease children">−</button>
          <span id="${prefix}-children" data-min="0" data-max="6">0</span>
          <button type="button" onclick="AlKhalis.Booking.changePax('${prefix}-children',1)" aria-label="Increase children">+</button>
        </div>
      </div>
      <div class="bw-pax-row">
        <div class="bw-pax-label"><strong>Infants</strong><span>Under 2</span></div>
        <div class="bw-pax-ctrl">
          <button type="button" onclick="AlKhalis.Booking.changePax('${prefix}-infants',-1)" aria-label="Decrease infants">−</button>
          <span id="${prefix}-infants" data-min="0" data-max="4">0</span>
          <button type="button" onclick="AlKhalis.Booking.changePax('${prefix}-infants',1)" aria-label="Increase infants">+</button>
        </div>
      </div>
      <button class="bw-pax-done" onclick="AlKhalis.Booking.closePax('${prefix}-pax-drop','${prefix}')">Done</button>
    `;
  },

  _hotelPaxDropdown() {
    return `
      <div class="bw-pax-row">
        <div class="bw-pax-label"><strong>Rooms</strong></div>
        <div class="bw-pax-ctrl">
          <button type="button" onclick="AlKhalis.Booking.changePax('ht-rooms',-1)">−</button>
          <span id="ht-rooms" data-min="1" data-max="5">1</span>
          <button type="button" onclick="AlKhalis.Booking.changePax('ht-rooms',1)">+</button>
        </div>
      </div>
      <div class="bw-pax-row">
        <div class="bw-pax-label"><strong>Adults</strong><span>18+</span></div>
        <div class="bw-pax-ctrl">
          <button type="button" onclick="AlKhalis.Booking.changePax('ht-adults',-1)">−</button>
          <span id="ht-adults" data-min="1" data-max="10">2</span>
          <button type="button" onclick="AlKhalis.Booking.changePax('ht-adults',1)">+</button>
        </div>
      </div>
      <div class="bw-pax-row">
        <div class="bw-pax-label"><strong>Children</strong><span>0–17</span></div>
        <div class="bw-pax-ctrl">
          <button type="button" onclick="AlKhalis.Booking.changePax('ht-children',-1)">−</button>
          <span id="ht-children" data-min="0" data-max="6">0</span>
          <button type="button" onclick="AlKhalis.Booking.changePax('ht-children',1)">+</button>
        </div>
      </div>
      <button class="bw-pax-done" onclick="AlKhalis.Booking.closePax('ht-pax-drop','ht')">Done</button>
    `;
  },

  togglePax(dropId) {
    const el = document.getElementById(dropId);
    if (!el) return;
    // Close all other pax drops first
    document.querySelectorAll('.bw-pax-drop').forEach(d => {
      if (d.id !== dropId) {
        d.hidden = true;
        d.setAttribute('hidden','');
      }
    });
    // Toggle target
    const isOpen = !el.hasAttribute('hidden');
    if (isOpen) {
      el.hidden = true;
      el.setAttribute('hidden','');
    } else {
      el.removeAttribute('hidden');
      el.hidden = false;
    }
  },

  changePax(id, delta) {
    const el  = document.getElementById(id);
    if (!el) return;
    const min = parseInt(el.getAttribute('data-min')||0);
    const max = parseInt(el.getAttribute('data-max')||9);
    const cur = parseInt(el.textContent||0);
    const next = Math.min(max, Math.max(min, cur+delta));
    el.textContent = next;
    const prefix = id.split('-')[0];
    this.updatePaxDisplay(prefix);
  },

  closePax(dropId, prefix) {
    const el = document.getElementById(dropId);
    if (el) {
      el.hidden = true;
      el.setAttribute('hidden','');
    }
    this.updatePaxDisplay(prefix);
  },

  updatePaxDisplay(prefix) {
    const display = document.getElementById(`${prefix}-pax-display`);
    if (!display) return;
    if (prefix === 'ht') {
      const rooms    = parseInt(document.getElementById('ht-rooms')?.textContent||1);
      const adults   = parseInt(document.getElementById('ht-adults')?.textContent||2);
      const children = parseInt(document.getElementById('ht-children')?.textContent||0);
      display.textContent = `${rooms} Room${rooms>1?'s':''}, ${adults+children} Guest${adults+children>1?'s':''}`;
    } else {
      const adults   = parseInt(document.getElementById(`${prefix}-adults`)?.textContent||1);
      const children = parseInt(document.getElementById(`${prefix}-children`)?.textContent||0);
      const infants  = parseInt(document.getElementById(`${prefix}-infants`)?.textContent||0);
      const parts = [`${adults} Adult${adults>1?'s':''}`];
      if (children) parts.push(`${children} Child${children>1?'ren':''}`);
      if (infants)  parts.push(`${infants} Infant${infants>1?'s':''}`);
      display.textContent = parts.join(', ');
    }
  },

  /* ── ROUTE CHIPS ──────────────────────────────────────────── */
  _routeChips() {
    const routes = [
      ['Mumbai → Dubai','Mumbai (BOM)','Dubai (DXB)'],
      ['Mumbai → Jeddah','Mumbai (BOM)','Jeddah (JED)'],
      ['Mumbai → London','Mumbai (BOM)','London (LHR)'],
      ['Mumbai → Singapore','Mumbai (BOM)','Singapore (SIN)'],
      ['Mumbai → Bangkok','Mumbai (BOM)','Bangkok (BKK)'],
      ['Mumbai → Muscat','Mumbai (BOM)','Muscat (MCT)'],
    ];
    return routes.map(([label,from,to]) =>
      `<span class="bw-chip" onclick="AlKhalis.Booking.setRoute('${from}','${to}')">${label}</span>`
    ).join('');
  },

  setRoute(from, to) {
    const fi = document.getElementById('fl-from');
    const ti = document.getElementById('fl-to');
    if (fi) fi.value = from;
    if (ti) ti.value = to;
    this.estimateFlightPrice();
  },

  /* ── PRICE ESTIMATION ────────────────────────────────────── */
  estimateFlightPrice() {
    const from  = document.getElementById('fl-from')?.value || '';
    const to    = document.getElementById('fl-to')?.value   || '';
    const fromC = from.match(/\(([A-Z]+)\)/)?.[1] || '';
    const toC   = to.match(/\(([A-Z]+)\)/)?.[1]   || '';
    const key   = `${fromC}-${toC}`;
    const price = this.FLIGHT_PRICES[key] || this.FLIGHT_PRICES[`${toC}-${fromC}`];
    const bar   = document.getElementById('fl-price-bar');
    if (bar && price) {
      bar.hidden = false;
      document.getElementById('fl-price-val').textContent = `from ₹${price.toLocaleString('en-IN')}`;
    }
  },

  updatePkgPrice() {
    const dest  = document.getElementById('pkg-dest')?.value;
    const pax   = parseInt(document.getElementById('pkg-pax')?.value||1);
    const bar   = document.getElementById('pkg-price-bar');
    const valEl = document.getElementById('pkg-price-val');
    if (!dest || !bar || !valEl) return;
    const base = this.PACKAGE_PRICES[dest];
    if (base) {
      bar.hidden = false;
      valEl.textContent = `₹${base.toLocaleString('en-IN')} × ${pax} = ₹${(base*pax).toLocaleString('en-IN')}`;
    } else { bar.hidden = true; }
  },

  setPkg(dest) {
    const sel = document.getElementById('pkg-dest');
    if (sel) { sel.value = dest; this.updatePkgPrice(); }
  },

  updateUmrahPrice() {
    const tier  = document.getElementById('um-tier')?.value || 'standard';
    const pax   = parseInt(document.getElementById('um-pax')?.value||2);
    const dur   = document.getElementById('um-dur')?.value  || '14';
    const price = this.UMRAH_PRICES[tier] || 95000;
    const total = price * pax;
    const valEl = document.getElementById('um-price-val');
    const note  = document.getElementById('um-price-bar')?.querySelector('.bw-price-note');
    if (valEl) valEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    if (note) note.textContent  = `for ${pax} pilgrim${pax>1?'s':''} · ${tier.charAt(0).toUpperCase()+tier.slice(1)} · ${dur} nights`;
  },

  /* ── SWAP CITIES ──────────────────────────────────────────── */
  swapCities(fromId, toId) {
    const f = document.getElementById(fromId);
    const t = document.getElementById(toId);
    if (!f || !t) return;
    [f.value, t.value] = [t.value, f.value];
    const btn = document.getElementById('fl-swap');
    if (btn) { btn.style.transform='rotate(180deg)'; setTimeout(()=>btn.style.transform='',400); }
    this.estimateFlightPrice();
  },

  /* ── SEARCH HANDLERS ──────────────────────────────────────── */
  /* ── VISA METHODS ─────────────────────────────────────────────── */

  updateVisaInfo() {
    const dest    = document.getElementById('vi-to')?.value;
    const infoBar = document.getElementById('vi-info-bar');
    if (!dest || !infoBar) return;

    const info = this.VISA_INFO[dest];
    if (!info) { infoBar.hidden = true; infoBar.setAttribute('hidden',''); return; }

    infoBar.removeAttribute('hidden');
    infoBar.hidden = false;
    document.getElementById('vi-stat-time').textContent  = info.time;
    document.getElementById('vi-stat-rate').textContent  = info.rate;
    document.getElementById('vi-stat-valid').textContent = info.valid;
    document.getElementById('vi-stat-entry').textContent = info.entry;
  },

  setVisaDest(code) {
    const sel = document.getElementById('vi-to');
    if (sel) { sel.value = code; this.updateVisaInfo(); }
  },

  searchVisa() {
    const dest   = document.getElementById('vi-to')?.value;
    const type   = document.getElementById('vi-type')?.value  || 'tourist';
    const pax    = document.getElementById('vi-pax')?.value   || '1';
    const date   = document.getElementById('vi-date')?.value;
    const from   = document.getElementById('vi-from')?.value  || 'IN';

    if (!dest) {
      this._shake('vi-to');
      this._toast('Please select a destination country.', 'error');
      return;
    }

    this._setLoading('vi-search-btn', true, '📋 Checking...');

    const info = this.VISA_INFO[dest] || {};
    const toSel = document.getElementById('vi-to');
    const destLabel = toSel?.options[toSel.selectedIndex]?.text?.replace(/^.* — /, '').trim()
                   || toSel?.options[toSel.selectedIndex]?.text || dest;
    const dateLabel = date
      ? new Date(date).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})
      : 'Flexible';

    try {
      localStorage.setItem('ak_last_visa', JSON.stringify({dest,type,pax,date}));
    } catch(e){}

    setTimeout(() => {
      this._setLoading('vi-search-btn', false, '<span class="bw-search-icon">📋</span> Apply for Visa');
      this._showResult('visa', { dest:destLabel, destCode:dest, type, pax, date:dateLabel, info });
    }, 1200);
  },

  /* ── FOREX METHODS ─────────────────────────────────────────────── */

  convertForex() {
    const amount  = parseFloat(document.getElementById('fx-amount')?.value) || 0;
    const fromSel = document.getElementById('fx-from');
    const toSel   = document.getElementById('fx-to');
    if (!fromSel || !toSel) return;

    const fromRate = parseFloat(fromSel.value) || 1;  // rate vs INR
    const toRate   = parseFloat(toSel.value)   || 1;

    // Convert: amount → INR → target
    const fromCode = fromSel.options[fromSel.selectedIndex]?.getAttribute('data-code') || 'INR';
    const toCode   = toSel.options[toSel.selectedIndex]?.getAttribute('data-code')     || 'USD';

    // fromRate = 1 unit of fromCurrency in INR
    // toRate   = 1 unit of toCurrency   in INR
    let result;
    if (fromCode === 'INR') {
      result = amount / toRate;
    } else if (toCode === 'INR') {
      result = amount * fromRate;
    } else {
      result = (amount * fromRate) / toRate;
    }

    const exchangeRate = fromCode === 'INR' ? (1/toRate) : toRate / fromRate;

    const fromDisp = document.getElementById('fx-from-display');
    const toDisp   = document.getElementById('fx-to-display');
    const rateDisp = document.getElementById('fx-rate-display');

    const fromSymbols = {INR:'₹',USD:'$',EUR:'€',GBP:'£',AED:'د.إ',SAR:'ر.س',SGD:'S$',AUD:'A$',CAD:'C$',JPY:'¥',THB:'฿',MYR:'RM'};
    const fSym = fromSymbols[fromCode] || fromCode;
    const tSym = fromSymbols[toCode]   || toCode;

    if (fromDisp) fromDisp.textContent = `${fSym}${amount.toLocaleString('en-IN',{maximumFractionDigits:2})}`;
    if (toDisp)   toDisp.textContent   = `${tSym}${result.toLocaleString('en-IN',{maximumFractionDigits:4})}`;
    if (rateDisp) rateDisp.innerHTML   =
      `Rate: 1 ${fromCode} = ${exchangeRate.toFixed(4)} ${toCode} &nbsp;·&nbsp; <span style="color:rgba(255,255,255,0.4);font-size:0.65rem">Indicative · Confirmed at transaction</span>`;
  },

  swapForex() {
    const fromSel = document.getElementById('fx-from');
    const toSel   = document.getElementById('fx-to');
    if (!fromSel || !toSel) return;
    const tmpVal = fromSel.value;
    const tmpIdx = fromSel.selectedIndex;
    fromSel.value = toSel.value;
    fromSel.selectedIndex = toSel.selectedIndex;
    toSel.value = tmpVal;
    toSel.selectedIndex = tmpIdx;
    this.convertForex();
  },

  setForexPair(from, to) {
    const fromSel = document.getElementById('fx-from');
    const toSel   = document.getElementById('fx-to');
    if (fromSel) {
      for (let opt of fromSel.options) {
        if (opt.getAttribute('data-code') === from) { fromSel.value = opt.value; break; }
      }
    }
    if (toSel) {
      for (let opt of toSel.options) {
        if (opt.getAttribute('data-code') === to) { toSel.value = opt.value; break; }
      }
    }
    this.convertForex();
  },

  searchForex() {
    const fromSel   = document.getElementById('fx-from');
    const toSel     = document.getElementById('fx-to');
    const amount    = parseFloat(document.getElementById('fx-amount')?.value) || 0;
    const service   = document.getElementById('fx-service')?.value || 'Buy Foreign Currency';

    if (!amount || amount <= 0) {
      this._shake('fx-amount');
      this._toast('Please enter a valid amount.', 'error');
      return;
    }

    const fromCode  = fromSel?.options[fromSel.selectedIndex]?.getAttribute('data-code') || 'INR';
    const toCode    = toSel?.options[toSel.selectedIndex]?.getAttribute('data-code')     || 'USD';
    const fromRate  = parseFloat(fromSel?.value) || 1;
    const toRate    = parseFloat(toSel?.value)   || 1;

    let result;
    if (fromCode === 'INR') result = amount / toRate;
    else if (toCode === 'INR') result = amount * fromRate;
    else result = (amount * fromRate) / toRate;

    const exchangeRate = fromCode === 'INR' ? (1/toRate).toFixed(4) : (toRate/fromRate).toFixed(4);

    this._setLoading('fx-search-btn', true, '💱 Getting Rate...');

    try {
      localStorage.setItem('ak_last_forex', JSON.stringify({fromCode,toCode,amount,service}));
    } catch(e){}

    setTimeout(() => {
      this._setLoading('fx-search-btn', false, '<span class="bw-search-icon">💱</span> Get Best Rate Quote');
      this._showResult('forex', { fromCode, toCode, amount, result, exchangeRate, service });
    }, 1000);
  },

  searchFlight() {
    const from = document.getElementById('fl-from')?.value?.trim();
    const to   = document.getElementById('fl-to')?.value?.trim();
    const dep  = document.getElementById('fl-dep')?.value;
    const cls  = document.getElementById('fl-class')?.value || 'economy';
    const trip = document.querySelector('input[name="trip-type"]:checked')?.value || 'oneway';
    const paxTxt = document.getElementById('fl-pax-display')?.textContent || '1 Adult';

    if (!from) { this._shake('fl-from'); this._toast('Please enter your departure city.','error'); return; }
    if (!to)   { this._shake('fl-to');   this._toast('Please enter your destination.','error'); return; }
    if (!dep)  { this._shake('fl-dep');  this._toast('Please select a travel date.','error'); return; }

    this._setLoading('fl-search-btn', true, '✈ Searching...');

    // Save to localStorage
    try { localStorage.setItem('ak_last_flight', JSON.stringify({from,to,dep,cls,trip})); } catch(e){}

    const fromC = from.match(/\(([A-Z]+)\)/)?.[1] || from.slice(0,3).toUpperCase();
    const toC   = to.match(/\(([A-Z]+)\)/)?.[1]   || to.slice(0,3).toUpperCase();
    const price = this.FLIGHT_PRICES[`${fromC}-${toC}`] || this.FLIGHT_PRICES[`${toC}-${fromC}`] || null;
    const depDate = dep ? new Date(dep).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : dep;

    setTimeout(() => {
      this._setLoading('fl-search-btn', false, '<span class="bw-search-icon">🔍</span> Search Flights');
      this._showResult('flight', {from,to,dep:depDate,cls,trip,pax:paxTxt,price});
      window.AlKhalis?.Analytics?.trackFlightSearch?.(from,to,dep,paxTxt);
    }, 1400);
  },

  searchHotel() {
    const dest   = document.getElementById('ht-dest')?.value?.trim();
    const checkIn  = document.getElementById('ht-in')?.value;
    const checkOut = document.getElementById('ht-out')?.value;
    const paxTxt   = document.getElementById('ht-pax-display')?.textContent || '1 Room, 2 Guests';
    const stars    = document.getElementById('ht-stars')?.value || 'any';

    if (!dest)     { this._shake('ht-dest'); this._toast('Please enter a destination.','error'); return; }
    if (!checkIn)  { this._shake('ht-in');   this._toast('Please select check-in date.','error'); return; }
    if (!checkOut) { this._shake('ht-out');  this._toast('Please select check-out date.','error'); return; }

    const nights = Math.ceil((new Date(checkOut)-new Date(checkIn))/(1000*60*60*24));
    if (nights < 1) { this._toast('Check-out must be after check-in.','error'); return; }

    this._setLoading('ht-search-btn', true, '🏨 Searching...');

    const destKey = dest.toLowerCase().split(',')[0].trim();
    const pricePerNight = this.HOTEL_PRICES[destKey] || 4500;
    const ci = checkIn ? new Date(checkIn).toLocaleDateString('en-IN',{day:'2-digit',month:'short'}) : '';
    const co = checkOut ? new Date(checkOut).toLocaleDateString('en-IN',{day:'2-digit',month:'short'}) : '';

    try { localStorage.setItem('ak_last_hotel', JSON.stringify({dest,checkIn,checkOut,paxTxt,stars})); } catch(e){}

    setTimeout(() => {
      this._setLoading('ht-search-btn', false, '<span class="bw-search-icon">🔍</span> Search Hotels');
      this._showResult('hotel', {dest,checkIn:ci,checkOut:co,nights,paxTxt,stars,pricePerNight});
    }, 1400);
  },

  searchPackage() {
    const dest  = document.getElementById('pkg-dest')?.value;
    const type  = document.getElementById('pkg-type')?.value || 'standard';
    const month = document.getElementById('pkg-month')?.value;
    const pax   = parseInt(document.getElementById('pkg-pax')?.value||2);
    const dur   = document.getElementById('pkg-dur')?.value;

    if (!dest)  { this._shake('pkg-dest');  this._toast('Please select a destination.','error'); return; }
    if (!month) { this._shake('pkg-month'); this._toast('Please select a travel month.','error'); return; }

    this._setLoading('pkg-search-btn', true, '📦 Getting Quote...');

    const base  = this.PACKAGE_PRICES[dest] || 50000;
    const total = base * pax;
    const destLabel = document.getElementById('pkg-dest')?.options[document.getElementById('pkg-dest').selectedIndex]?.text?.split('—')[0]?.trim() || dest;

    try { localStorage.setItem('ak_last_pkg', JSON.stringify({dest,type,month,pax,dur})); } catch(e){}

    setTimeout(() => {
      this._setLoading('pkg-search-btn', false, '<span class="bw-search-icon">📦</span> Get Package Quote');
      this._showResult('package', {dest:destLabel,type,month,pax,dur,base,total});
      window.AlKhalis?.Analytics?.trackPackageView?.(destLabel, base);
    }, 1400);
  },

  searchUmrah() {
    const tier  = document.getElementById('um-tier')?.value || 'standard';
    const dur   = document.getElementById('um-dur')?.value || '14';
    const month = document.getElementById('um-month')?.value;
    const pax   = parseInt(document.getElementById('um-pax')?.value||2);
    const meal  = document.getElementById('um-meal')?.value;
    const visa  = document.getElementById('um-visa')?.checked;
    const ziyarat  = document.getElementById('um-ziyarat')?.checked;
    const transport = document.getElementById('um-transport')?.checked;
    const insurance = document.getElementById('um-insurance')?.checked;

    if (!month) { this._toast('Please select a preferred departure month.','error'); return; }

    this._setLoading('um-search-btn', true, '🕌 Checking...');

    const price = this.UMRAH_PRICES[tier] || 95000;
    const total = price * pax;
    const extras = [visa&&'Visa',ziyarat&&'Guided Ziyarat',transport&&'Transport',insurance&&'Insurance'].filter(Boolean);

    try { localStorage.setItem('ak_last_umrah', JSON.stringify({tier,dur,month,pax,meal})); } catch(e){}

    setTimeout(() => {
      this._setLoading('um-search-btn', false, '<span class="bw-search-icon">🕌</span> Check Availability');
      this._showResult('umrah', {tier,dur,month,pax,meal,price,total,extras});
      window.AlKhalis?.Analytics?.trackUmrahEnquiry?.(tier, price);
    }, 1400);
  },

  /* ── RESULT MODAL ─────────────────────────────────────────── */
  _showResult(type, data) {
    const modal   = document.getElementById('bw-result-modal');
    const content = document.getElementById('bw-result-content');
    if (!modal || !content) return;

    const waBase = 'https://wa.me/919892960023?text=';
    let html = '', waMsg = '';

    if (type === 'flight') {
      waMsg = encodeURIComponent(
        `Hi Al Khalis! I want to book a flight:\n` +
        `✈ From: ${data.from}\n✈ To: ${data.to}\n` +
        `📅 Date: ${data.dep}\n👥 ${data.pax}\n🪑 Class: ${data.cls}\n` +
        `📱 Please share the best available fares.`
      );
      html = `
        <div class="bwr-icon">✈</div>
        <h3 class="bwr-title" id="bw-result-title">Flights Found!</h3>
        <div class="bwr-route">${data.from} → ${data.to}</div>
        <div class="bwr-details">
          <div class="bwr-detail"><span>📅 Date</span><strong>${data.dep}</strong></div>
          <div class="bwr-detail"><span>👥 Passengers</span><strong>${data.pax}</strong></div>
          <div class="bwr-detail"><span>🪑 Class</span><strong>${data.cls.charAt(0).toUpperCase()+data.cls.slice(1)}</strong></div>
          <div class="bwr-detail"><span>🔄 Trip Type</span><strong>${data.trip==='round'?'Round Trip':data.trip==='multi'?'Multi City':'One Way'}</strong></div>
        </div>
        ${data.price ? `<div class="bwr-price">Starting from <strong>₹${data.price.toLocaleString('en-IN')}</strong><span>/person</span></div>` : ''}
        <p class="bwr-note">Our team will confirm exact fares and availability within 30 minutes.</p>`;
    }

    else if (type === 'hotel') {
      waMsg = encodeURIComponent(
        `Hi Al Khalis! I want to book a hotel:\n` +
        `📍 Destination: ${data.dest}\n` +
        `📅 Check-in: ${data.checkIn}\n📅 Check-out: ${data.checkOut}\n` +
        `🌙 ${data.nights} night${data.nights>1?'s':''}\n` +
        `🛏 ${data.paxTxt}\n⭐ Rating: ${data.stars==='any'?'Any':data.stars+' Star'}\n` +
        `Please share available hotels with rates.`
      );
      html = `
        <div class="bwr-icon">🏨</div>
        <h3 class="bwr-title" id="bw-result-title">Hotels Available!</h3>
        <div class="bwr-route">${data.dest}</div>
        <div class="bwr-details">
          <div class="bwr-detail"><span>📅 Check-in</span><strong>${data.checkIn}</strong></div>
          <div class="bwr-detail"><span>📅 Check-out</span><strong>${data.checkOut}</strong></div>
          <div class="bwr-detail"><span>🌙 Duration</span><strong>${data.nights} night${data.nights>1?'s':''}</strong></div>
          <div class="bwr-detail"><span>🛏 Rooms</span><strong>${data.paxTxt}</strong></div>
        </div>
        <div class="bwr-price">From <strong>₹${data.pricePerNight.toLocaleString('en-IN')}</strong><span>/night</span></div>
        <p class="bwr-note">We'll share top hotel options with exclusive rates within 1 hour.</p>`;
    }

    else if (type === 'package') {
      waMsg = encodeURIComponent(
        `Hi Al Khalis! I'm interested in a tour package:\n` +
        `📍 Destination: ${data.dest}\n` +
        `📦 Type: ${data.type}\n📅 Month: ${data.month}\n` +
        `👥 Persons: ${data.pax}\n⏱ Duration: ${data.dur}\n` +
        `💰 Budget: ~₹${data.total.toLocaleString('en-IN')}\n` +
        `Please share the detailed itinerary and pricing.`
      );
      html = `
        <div class="bwr-icon">📦</div>
        <h3 class="bwr-title" id="bw-result-title">Package Quote Ready!</h3>
        <div class="bwr-route">${data.dest}</div>
        <div class="bwr-details">
          <div class="bwr-detail"><span>📦 Type</span><strong>${data.type.charAt(0).toUpperCase()+data.type.slice(1)}</strong></div>
          <div class="bwr-detail"><span>📅 Travel</span><strong>${data.month}</strong></div>
          <div class="bwr-detail"><span>👥 Persons</span><strong>${data.pax}</strong></div>
          <div class="bwr-detail"><span>⏱ Duration</span><strong>${data.dur}</strong></div>
        </div>
        <div class="bwr-price">Estimated <strong>₹${data.base.toLocaleString('en-IN')}</strong><span>/person · Total ₹${data.total.toLocaleString('en-IN')}</span></div>
        <p class="bwr-note">Our expert will share a detailed itinerary and best pricing within 2 hours.</p>`;
    }

    else if (type === 'umrah') {
      const tierLabel = {economy:'Economy',standard:'Standard',premium:'Premium',luxury:'Luxury'}[data.tier]||data.tier;
      waMsg = encodeURIComponent(
        `Assalamu Alaikum Al Khalis!\n` +
        `I want to enquire about Umrah packages:\n` +
        `🕌 Package: ${tierLabel}\n⏱ Duration: ${data.dur} nights\n` +
        `📅 Departure: ${data.month}\n👥 Pilgrims: ${data.pax}\n` +
        `🍽 Meals: ${data.meal}\n✅ Includes: ${data.extras.join(', ')}\n` +
        `💰 Budget: ~₹${data.total.toLocaleString('en-IN')}\n` +
        `Please share availability and detailed package info. JazakAllah Khair.`
      );
      html = `
        <div class="bwr-icon">🕌</div>
        <h3 class="bwr-title" id="bw-result-title">Umrah Package Available!</h3>
        <div class="bwr-route">${{economy:'Economy',standard:'Standard',premium:'Premium',luxury:'Luxury'}[data.tier]} Package</div>
        <div class="bwr-details">
          <div class="bwr-detail"><span>⏱ Duration</span><strong>${data.dur} Nights</strong></div>
          <div class="bwr-detail"><span>📅 Departure</span><strong>${data.month}</strong></div>
          <div class="bwr-detail"><span>👥 Pilgrims</span><strong>${data.pax}</strong></div>
          <div class="bwr-detail"><span>🍽 Meals</span><strong>${data.meal}</strong></div>
        </div>
        <div class="bwr-includes">${data.extras.map(e=>`<span class="bwr-tag">✓ ${e}</span>`).join('')}</div>
        <div class="bwr-price">Total <strong>₹${data.total.toLocaleString('en-IN')}</strong><span> for ${data.pax} pilgrim${data.pax>1?'s':''}</span></div>
        <p class="bwr-note">Alhamdulillah! Limited seats available. Our Hajj team will contact you within 1 hour.</p>`;
    }

    else if (type === 'visa') {
      const waMsg_v = encodeURIComponent(
        `Hello Al Khalis! I need visa assistance:\n` +
        `🌍 Destination: ${data.dest}\n` +
        `📋 Visa Type: ${data.type.charAt(0).toUpperCase()+data.type.slice(1)}\n` +
        `👥 Applicants: ${data.pax}\n` +
        `📅 Travel Date: ${data.date}\n` +
        `⏱ Processing: ${data.info?.time || '—'}\n` +
        `Please guide me through the visa application process.`
      );
      waMsg = waMsg_v;
      html = `
        <div class="bwr-icon">📋</div>
        <h3 class="bwr-title" id="bw-result-title">Visa Enquiry Ready!</h3>
        <div class="bwr-route">${data.dest}</div>
        <div class="bwr-details">
          <div class="bwr-detail"><span>📋 Visa Type</span><strong>${data.type.charAt(0).toUpperCase()+data.type.slice(1)}</strong></div>
          <div class="bwr-detail"><span>👥 Applicants</span><strong>${data.pax}</strong></div>
          <div class="bwr-detail"><span>📅 Travel Date</span><strong>${data.date}</strong></div>
          <div class="bwr-detail"><span>⏱ Processing</span><strong>${data.info?.time || 'Contact us'}</strong></div>
          <div class="bwr-detail"><span>📆 Validity</span><strong>${data.info?.valid || '—'}</strong></div>
          <div class="bwr-detail"><span>🔁 Entry</span><strong>${data.info?.entry || '—'}</strong></div>
        </div>
        <div class="bwr-price" style="background:rgba(72,187,120,0.1);border-color:rgba(72,187,120,0.25)">
          <strong style="color:#68D391;font-size:1.4rem">✅ ${data.info?.rate || '98%'} Success Rate</strong>
          <span>Our visa experts handle everything for you</span>
        </div>
        <p class="bwr-note">Our visa specialists will contact you within 2 hours with exact documents needed and processing fees.</p>`;
    }

    else if (type === 'forex') {
      const fromSymbols = {INR:'₹',USD:'$',EUR:'€',GBP:'£',AED:'د.إ',SAR:'ر.س',SGD:'S$',AUD:'A$',CAD:'C$',JPY:'¥',THB:'฿',MYR:'RM'};
      const fSym = fromSymbols[data.fromCode] || data.fromCode;
      const tSym = fromSymbols[data.toCode]   || data.toCode;
      const waMsg_f = encodeURIComponent(
        `Hello Al Khalis! I need forex service:\n` +
        `💱 Exchange: ${data.fromCode} → ${data.toCode}\n` +
        `💰 Amount: ${fSym}${parseFloat(data.amount).toLocaleString('en-IN')}\n` +
        `📊 Converted: ${tSym}${parseFloat(data.result).toLocaleString('en-IN',{maximumFractionDigits:2})}\n` +
        `🏦 Service: ${data.service}\n` +
        `Please share your best available rate and process.`
      );
      waMsg = waMsg_f;
      html = `
        <div class="bwr-icon">💱</div>
        <h3 class="bwr-title" id="bw-result-title">Forex Rate Ready!</h3>
        <div class="bwr-route">${data.fromCode} → ${data.toCode}</div>
        <div class="bwr-details">
          <div class="bwr-detail"><span>💰 You Give</span><strong>${fSym}${parseFloat(data.amount).toLocaleString('en-IN',{maximumFractionDigits:2})}</strong></div>
          <div class="bwr-detail"><span>💵 You Get</span><strong>${tSym}${parseFloat(data.result).toLocaleString('en-IN',{maximumFractionDigits:4})}</strong></div>
          <div class="bwr-detail"><span>📊 Exchange Rate</span><strong>1 ${data.fromCode} = ${data.exchangeRate} ${data.toCode}</strong></div>
          <div class="bwr-detail"><span>🏦 Service</span><strong>${data.service}</strong></div>
        </div>
        <div class="bwr-price">
          <strong>${fSym}${parseFloat(data.amount).toLocaleString('en-IN')} = ${tSym}${parseFloat(data.result).toLocaleString('en-IN',{maximumFractionDigits:2})}</strong>
          <span>Indicative rate · Confirmed at transaction</span>
        </div>
        <p class="bwr-note">RBI Authorized dealer. Doorstep delivery available in Mumbai. Final rate locked at time of transaction.</p>`;
    }

    // Action buttons
    const root = window.SITE_ROOT || './';
    html += `
      <div class="bwr-actions">
        <a href="${waBase}${waMsg}" target="_blank" rel="noopener noreferrer" class="bwr-btn bwr-btn--wa">
          💬 WhatsApp Us Now
        </a>
        <a href="tel:+919892960023" class="bwr-btn bwr-btn--call">📞 Call +91 98929 60023</a>
        <a href="${root}pages/contact.html" class="bwr-btn bwr-btn--form">📋 Send Full Enquiry</a>
      </div>
    `;

    content.innerHTML = html;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.bw-result-card')?.scrollTo(0,0);

    // Close on backdrop
    modal.addEventListener('click', e => { if (e.target === modal) this.closeResult(); }, {once:true});
  },

  closeResult() {
    const modal = document.getElementById('bw-result-modal');
    if (modal) modal.hidden = true;
    document.body.style.overflow = '';
  },

  /* ── HELPERS ──────────────────────────────────────────────── */
  _shake(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('bw-shake');
    setTimeout(() => el.classList.remove('bw-shake'), 600);
  },

  _toast(msg, type='info') {
    window.AlKhalis?.App?.toast?.(msg, type);
  },

  _setLoading(btnId, loading, label) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = loading;
    btn.innerHTML = loading ? `<span class="bw-spinner"></span> ${label}` : label;
    btn.style.opacity = loading ? '0.8' : '1';
  },

  /* ── RESTORE SAVED DATA ───────────────────────────────────── */
  loadSavedData() {
    try {
      const fl = JSON.parse(localStorage.getItem('ak_last_flight')||'null');
      if (fl) {
        if (fl.from) document.getElementById('fl-from').value = fl.from;
        if (fl.to)   document.getElementById('fl-to').value   = fl.to;
        if (fl.cls)  document.getElementById('fl-class').value = fl.cls;
      }
    } catch(e){}
  },
};

/* ── AUTO-INIT ON DOM READY ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('booking-widget')) {
    window.AlKhalis.Booking.init();
  }
});
