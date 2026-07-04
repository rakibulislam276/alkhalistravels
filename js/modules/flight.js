/* ================================================================
   FLIGHT.JS — Flight Search, Render, Filter, Sort Module
   ================================================================ */

'use strict';

window.AlKhalis = window.AlKhalis || {};

window.AlKhalis.Flight = {

  state: {
    allFlights: [],
    filtered:   [],
    sortBy:     'price-asc',
    filters:    { stops: [], airlines: [] },
    currentTab: 'one',
  },

  init() {
    this.state.allFlights = [...(window.AlKhalis.Data?.flights || [])];
    this.state.filtered   = [...this.state.allFlights];
    this.setDateDefaults();
    this.bindTripType();
    this.bindSwap();
    this.bindSearch();
    this.bindRouteChips();
    this.bindSort();
    this.bindFilters();
    this.render();
  },

  setDateDefaults() {
    const today    = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 7);
    const toStr    = d => d.toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach((el, i) => {
      el.min   = toStr(today);
      el.value = i === 0 ? toStr(today) : toStr(tomorrow);
    });
  },

  bindTripType() {
    document.querySelectorAll('.trip-radios input[type=radio]').forEach(radio => {
      radio.addEventListener('change', () => {
        this.state.currentTab = radio.value;
        const returnGroup = document.getElementById('return-date-group');
        if (returnGroup) {
          returnGroup.style.opacity  = radio.value === 'one' ? '0.4' : '1';
          returnGroup.style.pointerEvents = radio.value === 'one' ? 'none' : '';
        }
      });
    });
  },

  bindSwap() {
    const btn  = document.getElementById('swap-cities');
    const from = document.getElementById('from-city');
    const to   = document.getElementById('to-city');
    if (btn && from && to) {
      btn.addEventListener('click', () => {
        [from.value, to.value] = [to.value, from.value];
        btn.style.transform = 'translateY(-50%) rotate(180deg) scale(1.1)';
        setTimeout(() => { btn.style.transform = ''; }, 400);
      });
    }
  },

  bindSearch() {
    const btn = document.getElementById('search-flights-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      btn.classList.add('btn--loading');
      btn.disabled = true;
      btn.textContent = 'Searching...';
      setTimeout(() => {
        btn.classList.remove('btn--loading');
        btn.disabled = false;
        btn.innerHTML = '🔍 Search Flights';
        this.applyFilters();
        document.getElementById('flight-results')?.scrollIntoView({ behavior:'smooth', block:'start' });
        window.AlKhalis.App?.toast('✈ Found ' + this.state.filtered.length + ' flights for your route!', 'success');
      }, 1400);
    });
  },

  bindRouteChips() {
    document.querySelectorAll('.route-chip[data-from]').forEach(chip => {
      chip.addEventListener('click', () => {
        const fromEl = document.getElementById('from-city');
        const toEl   = document.getElementById('to-city');
        if (fromEl) fromEl.value = chip.getAttribute('data-from');
        if (toEl)   toEl.value   = chip.getAttribute('data-to');
        document.querySelectorAll('.route-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  },

  bindSort() {
    const sel = document.getElementById('sort-flights');
    if (!sel) return;
    sel.addEventListener('change', () => {
      this.state.sortBy = sel.value;
      this.sortFlights();
      this.render();
    });
  },

  bindFilters() {
    document.querySelectorAll('.filter-check').forEach(cb => {
      cb.addEventListener('change', () => this.applyFilters());
    });

    const priceRange = document.getElementById('price-range');
    if (priceRange) {
      const label = document.getElementById('price-range-label');
      priceRange.addEventListener('input', () => {
        if (label) label.textContent = '₹' + parseInt(priceRange.value).toLocaleString('en-IN');
        this.applyFilters();
      });
    }
  },

  applyFilters() {
    const priceRange = document.getElementById('price-range');
    const maxPrice   = priceRange ? parseInt(priceRange.value) : Infinity;

    const checkedStops    = [...document.querySelectorAll('.filter-check[data-type="stops"]:checked')].map(c => c.value);
    const checkedAirlines = [...document.querySelectorAll('.filter-check[data-type="airline"]:checked')].map(c => c.value);

    this.state.filtered = this.state.allFlights.filter(f => {
      const priceOk   = f.price <= maxPrice;
      const stopOk    = checkedStops.length === 0    || checkedStops.includes(f.stops);
      const airlineOk = checkedAirlines.length === 0 || checkedAirlines.includes(f.airline);
      return priceOk && stopOk && airlineOk;
    });

    this.sortFlights();
    this.render();
  },

  sortFlights() {
    const map = {
      'price-asc':   (a,b) => a.price - b.price,
      'price-desc':  (a,b) => b.price - a.price,
      'dur-asc':     (a,b) => a.dur.localeCompare(b.dur),
      'dep-asc':     (a,b) => a.dep.localeCompare(b.dep),
    };
    const fn = map[this.state.sortBy];
    if (fn) this.state.filtered.sort(fn);
  },

  render() {
    const container = document.getElementById('flight-results');
    if (!container) return;

    if (!this.state.filtered.length) {
      container.innerHTML = `
        <div style="text-align:center;padding:3rem;background:var(--white);border-radius:var(--radius);box-shadow:var(--shadow-xs)">
          <div style="font-size:3rem;margin-bottom:1rem">✈</div>
          <h3 style="font-family:var(--font-serif);color:var(--navy);margin-bottom:0.5rem">No flights found</h3>
          <p style="color:var(--text-muted)">Try adjusting your filters or contact our team for assistance.</p>
          <a href="contact.html" class="btn btn--gold" style="margin-top:1.5rem">📞 Contact Flight Team</a>
        </div>`;
      return;
    }

    container.innerHTML = this.state.filtered.map(f => this._flightCardHTML(f)).join('');

    // Reveal animation
    container.querySelectorAll('.flight-card').forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'all 0.4s ease';
        card.style.opacity   = '1';
        card.style.transform = 'translateY(0)';
      }, i * 80);
    });
  },

  _flightCardHTML(f) {
    return `
    <div class="flight-card reveal">
      <div style="display:flex;align-items:center;gap:12px">
        <div class="airline-logo-box">${f.logo}</div>
        <div>
          <div style="font-weight:700;font-size:0.9rem;color:var(--navy)">${f.airline}</div>
          <div style="font-size:0.72rem;color:var(--text-muted)">${f.num} · ${f.cls}</div>
          <div style="margin-top:3px"><span class="badge badge--green" style="font-size:0.65rem">${f.stops}</span></div>
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:12px">
        <div>
          <div class="flight-time-big">${f.dep}</div>
          <div class="flight-code">${f.from}</div>
        </div>
        <div class="route-line">
          <div style="font-size:0.72rem;color:var(--text-muted)">${f.dur}</div>
          <div class="route-line__bar"><span class="route-line__plane">✈</span></div>
          <div style="font-size:0.72rem;color:var(--text-muted)">${f.stops}</div>
        </div>
        <div>
          <div class="flight-time-big">${f.arr}</div>
          <div class="flight-code">${f.to}</div>
        </div>
      </div>

      <div>
        ${f.tag ? `<span class="badge badge--gold" style="font-size:0.65rem">${f.tag}</span>` : ''}
      </div>

      <div>
        <div class="flight-price-big">₹${f.price.toLocaleString('en-IN')}</div>
        <div class="flight-price-pp">per person · incl. taxes</div>
      </div>

      <a href="${window.SITE_ROOT || ''}pages/contact.html" class="btn btn--gold btn--sm">Book Now</a>
    </div>`;
  },
};

/* ── AUTO-INIT IF ON FLIGHT PAGE ─────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('flight-results')) {
    setTimeout(() => window.AlKhalis.Flight.init(), 300);
  }
});
