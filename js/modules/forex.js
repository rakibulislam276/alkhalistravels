/* ================================================================
   FOREX.JS — Live currency rates (Sell / Buy), trend chart, converter
   ================================================================

   ✏️  EASY SETTINGS — change these to update the page.
   ----------------------------------------------------------------
   SELL_ADD_INR   ₹ added to the live rate  → "We Sell" price
   BUY_LESS_INR   ₹ taken off the live rate → "We Buy"  price
   CURRENCIES     the list shown on the page, in this order.
                  `unit` = how many units one price is quoted for.
                  Low-value currencies (JPY, THB) are quoted per 100
                  so the ₹ margins above stay sensible.
                  The first 10 (except INR) also appear as top cards.
   REFRESH_MIN    how often the page re-checks the live rates.

   Live rates come from free, keyless public APIs (no account needed):
     1. open.er-api.com                      (primary, latest rates)
     2. @fawazahmed0/currency-api via jsDelivr / Cloudflare (backup
        + daily history for the trend chart and 24h change)
   If every source fails, the last good rates saved in the visitor's
   browser are shown with a warning, otherwise a "call us" message.
   ================================================================ */

'use strict';

window.AlKhalis = window.AlKhalis || {};

window.AlKhalis.ForexConfig = {
  SELL_ADD_INR: 1,
  BUY_LESS_INR: 5,
  REFRESH_MIN:  10,
  WHATSAPP:     '919892960023',

  CURRENCIES: [
    { code: 'USD', name: 'US Dollar',          flag: '🇺🇸', unit: 1   },
    { code: 'EUR', name: 'Euro',               flag: '🇪🇺', unit: 1   },
    { code: 'GBP', name: 'British Pound',      flag: '🇬🇧', unit: 1   },
    { code: 'AED', name: 'UAE Dirham',         flag: '🇦🇪', unit: 1   },
    { code: 'SAR', name: 'Saudi Riyal',        flag: '🇸🇦', unit: 1   },
    { code: 'QAR', name: 'Qatari Riyal',       flag: '🇶🇦', unit: 1   },
    { code: 'KWD', name: 'Kuwaiti Dinar',      flag: '🇰🇼', unit: 1   },
    { code: 'OMR', name: 'Omani Rial',         flag: '🇴🇲', unit: 1   },
    { code: 'SGD', name: 'Singapore Dollar',   flag: '🇸🇬', unit: 1   },
    { code: 'AUD', name: 'Australian Dollar',  flag: '🇦🇺', unit: 1   },
    { code: 'BHD', name: 'Bahraini Dinar',     flag: '🇧🇭', unit: 1   },
    { code: 'CAD', name: 'Canadian Dollar',    flag: '🇨🇦', unit: 1   },
    { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿', unit: 1   },
    { code: 'CHF', name: 'Swiss Franc',        flag: '🇨🇭', unit: 1   },
    { code: 'HKD', name: 'Hong Kong Dollar',   flag: '🇭🇰', unit: 1   },
    { code: 'CNY', name: 'Chinese Yuan',       flag: '🇨🇳', unit: 1   },
    { code: 'MYR', name: 'Malaysian Ringgit',  flag: '🇲🇾', unit: 1   },
    { code: 'JPY', name: 'Japanese Yen',       flag: '🇯🇵', unit: 100 },
    { code: 'THB', name: 'Thai Baht',          flag: '🇹🇭', unit: 100 },
  ],
};

window.AlKhalis.Forex = {

  CACHE_KEY: 'alkhalis_fx_v1',

  state: {
    rows:          [],     // [{code,name,flag,unit,live,sell,buy,change,pct}]
    updatedAt:     null,   // Date of the rate data
    source:        '',
    status:        'loading', // loading | live | cached | error
    selectedCode:  'USD',
    period:        '7d',
    chart:         null,
    historyCache:  {},     // date(YYYY-MM-DD) -> {usd: x, ...} (INR base)
    timer:         null,
  },

  get cfg() { return window.AlKhalis.ForexConfig; },

  async init() {
    this.renderLoading();
    this.bindChartButtons();
    this.bindConverter();
    await this.refresh();
    this.state.timer = setInterval(() => this.refresh(), this.cfg.REFRESH_MIN * 60 * 1000);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.state.updatedAt && Date.now() - this._fetchedAt > this.cfg.REFRESH_MIN * 60 * 1000) this.refresh();
    });
  },

  /* ── DATA ─────────────────────────────────────────────────── */

  async refresh() {
    let latest = null;
    try {
      latest = await this.fetchLatest();
    } catch (e) {
      console.warn('[Forex] live rates unavailable:', e);
    }

    if (latest) {
      this.state.status = 'live';
      this._save(latest);
    } else {
      latest = this._load();
      this.state.status = latest ? 'cached' : 'error';
    }

    if (!latest) { this.renderError(); return; }

    this._fetchedAt   = Date.now();
    this.state.source = latest.source;
    this.state.updatedAt = new Date(latest.time);

    // 24h change: compare with the previous day's rates (best-effort)
    let prev = null;
    if (this.state.status === 'live') {
      try { prev = await this.fetchDay(this._shiftDate(latest.date, -1)); } catch (_) {}
    }

    this.state.rows = this.buildRows(latest.rates, prev);
    this.renderAll();
  },

  /** Returns { rates: {USD: inrPerUnit, ...}, time, date, source } */
  async fetchLatest() {
    // 1) open.er-api.com — base INR, rates are "foreign per 1 INR"
    try {
      const j = await this._getJSON('https://open.er-api.com/v6/latest/INR');
      if (j && j.result === 'success' && j.rates) {
        const date = new Date(j.time_last_update_unix * 1000);
        return {
          rates:  this._invert(j.rates, k => k),
          time:   date.getTime(),
          date:   date.toISOString().slice(0, 10),
          source: 'open.er-api.com',
        };
      }
    } catch (e) { console.warn('[Forex] primary source failed:', e); }

    // 2) fawazahmed0 currency-api (jsDelivr, then Cloudflare mirror)
    const j = await this._getFawaz('latest');
    return {
      rates:  this._invert(j.inr, k => k.toUpperCase()),
      time:   new Date(j.date + 'T00:00:00Z').getTime(),
      date:   j.date,
      source: 'currency-api',
    };
  },

  /** INR-base rates for one past day: {USD: inrPerUnit, ...} */
  async fetchDay(date) {
    if (this.state.historyCache[date]) return this.state.historyCache[date];
    const j = await this._getFawaz(date);
    const rates = this._invert(j.inr, k => k.toUpperCase());
    this.state.historyCache[date] = rates;
    return rates;
  },

  async _getFawaz(tag) {
    const urls = [
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${tag}/v1/currencies/inr.min.json`,
      `https://${tag}.currency-api.pages.dev/v1/currencies/inr.min.json`,
    ];
    let lastErr;
    for (const u of urls) {
      try {
        const j = await this._getJSON(u);
        if (j && j.inr) return j;
      } catch (e) { lastErr = e; }
    }
    throw lastErr || new Error('currency-api unavailable');
  },

  async _getJSON(url, timeoutMs = 8000) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(url, { signal: ctrl.signal, cache: 'no-cache' });
      if (!res.ok) throw new Error(url + ' → HTTP ' + res.status);
      return await res.json();
    } finally { clearTimeout(t); }
  },

  /** API gives "foreign per 1 INR"; we need "INR per 1 foreign". */
  _invert(rates, keyFn) {
    const out = {};
    Object.keys(rates || {}).forEach(k => {
      const v = Number(rates[k]);
      if (v > 0) out[keyFn(k)] = 1 / v;
    });
    return out;
  },

  buildRows(rates, prev) {
    const { SELL_ADD_INR, BUY_LESS_INR, CURRENCIES } = this.cfg;
    return CURRENCIES
      .filter(c => rates[c.code])
      .map(c => {
        const live = rates[c.code] * c.unit;
        const old  = prev && prev[c.code] ? prev[c.code] * c.unit : null;
        const buy  = live - BUY_LESS_INR;
        return {
          ...c,
          live,
          sell:   live + SELL_ADD_INR,
          buy:    buy > 0 ? buy : null,
          change: old ? live - old : null,
          pct:    old ? (live - old) / old * 100 : null,
        };
      });
  },

  _save(latest) {
    try { localStorage.setItem(this.CACHE_KEY, JSON.stringify(latest)); } catch (_) {}
  },
  _load() {
    try { const v = JSON.parse(localStorage.getItem(this.CACHE_KEY)); return v && v.rates ? v : null; }
    catch (_) { return null; }
  },

  /* ── RENDER ───────────────────────────────────────────────── */

  renderAll() {
    this.renderStatus();
    this.renderCards();
    this.renderTable();
    this.fillConverter();
    this.selectCurrency(this.state.selectedCode, true);
  },

  renderLoading() {
    const tbody = document.getElementById('rates-table-body');
    if (tbody) tbody.innerHTML = `<tr><td colspan="5" class="fx-msg">⏳ Loading today's live rates…</td></tr>`;
    const st = document.getElementById('rates-updated');
    if (st) st.innerHTML = `<span class="fx-dot fx-dot--loading"></span> Fetching live rates…`;
  },

  renderError() {
    const phone = '+91 98929 60023';
    const tbody = document.getElementById('rates-table-body');
    if (tbody) tbody.innerHTML = `<tr><td colspan="5" class="fx-msg">
      ⚠️ Live rates could not be loaded right now.<br>
      Call <a href="tel:+919892960023">${phone}</a> or
      <a href="https://wa.me/${this.cfg.WHATSAPP}" target="_blank" rel="noopener">WhatsApp us</a> for today's rate.
      <br><button type="button" class="btn btn--gold btn--sm" style="margin-top:.8rem" id="fx-retry">↻ Try again</button>
    </td></tr>`;
    document.getElementById('fx-retry')?.addEventListener('click', () => { this.renderLoading(); this.refresh(); });
    const cards = document.getElementById('currency-cards');
    if (cards) cards.innerHTML = '';
    const st = document.getElementById('rates-updated');
    if (st) st.innerHTML = `<span class="fx-dot fx-dot--error"></span> Live rates unavailable`;
    const chart = document.querySelector('.chart-card');
    if (chart) chart.hidden = true;
  },

  renderStatus() {
    const st = document.getElementById('rates-updated');
    if (!st) return;
    const when = this.state.updatedAt.toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata',
    });
    if (this.state.status === 'live') {
      st.innerHTML = `<span class="fx-dot fx-dot--live"></span> <strong>Live</strong> · Market rate last updated ${when} IST`;
    } else {
      st.innerHTML = `<span class="fx-dot fx-dot--error"></span> Offline — showing last saved rates from ${when} IST`;
    }
  },

  _fmt(n, d = 2) {
    return n == null ? '—' : '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
  },
  _unitLabel(r) { return r.unit > 1 ? `${r.unit} ${r.code}` : `1 ${r.code}`; },
  _changeHTML(r) {
    if (r.pct == null) return '<span class="fx-flat">—</span>';
    const up = r.change >= 0;
    return `<span class="${up ? 'change-up' : 'change-down'}">${up ? '▲' : '▼'} ${Math.abs(r.pct).toFixed(2)}%</span>`;
  },

  renderCards() {
    const wrap = document.getElementById('currency-cards');
    if (!wrap) return;
    const rows = this.state.rows.slice(0, 10);
    wrap.innerHTML = rows.map(r => `
      <button type="button" class="currency-card fx-card ${r.code === this.state.selectedCode ? 'selected' : ''}"
              data-code="${r.code}" role="listitem"
              aria-label="${r.name}: we sell at ${this._fmt(r.sell)}, we buy at ${this._fmt(r.buy)} per ${this._unitLabel(r)}">
        <span class="currency-card__flag" aria-hidden="true">${r.flag}</span>
        <span class="currency-card__code">${r.code}${r.unit > 1 ? ` <small>×${r.unit}</small>` : ''}</span>
        <span class="fx-card__rates">
          <span><em>Sell</em> <b>${this._fmt(r.sell)}</b></span>
          <span><em>Buy</em> <b>${this._fmt(r.buy)}</b></span>
        </span>
        ${this._changeHTML(r)}
      </button>`).join('');
    wrap.querySelectorAll('.fx-card').forEach(card =>
      card.addEventListener('click', () => this.selectCurrency(card.dataset.code)));
  },

  renderTable() {
    const tbody = document.getElementById('rates-table-body');
    if (!tbody) return;
    tbody.innerHTML = this.state.rows.map(r => {
      const msg = encodeURIComponent(`Hi Al Khalis, I want to exchange ${r.code} (${r.name}). Please share today's rate.`);
      return `
        <tr>
          <td>
            <div class="fx-cur">
              <span class="fx-flag" aria-hidden="true">${r.flag}</span>
              <span class="fx-cur__text">
                <strong>${r.code}</strong><span class="fx-cur__name">${r.name}${r.unit > 1 ? ` (per ${r.unit})` : ''}</span>
                <span class="fx-cur__unit">per ${this._unitLabel(r)} · Live ${this._fmt(r.live)}</span>
              </span>
            </div>
          </td>
          <td class="fx-col-live" data-label="Live">${this._fmt(r.live)}<br>${this._changeHTML(r)}</td>
          <td class="fx-sell" data-label="We Sell">${this._fmt(r.sell)}</td>
          <td class="fx-buy"  data-label="We Buy">${this._fmt(r.buy)}</td>
          <td class="fx-col-act">
            <a class="btn btn--gold btn--sm" href="https://wa.me/${this.cfg.WHATSAPP}?text=${msg}" target="_blank" rel="noopener">Exchange</a>
          </td>
        </tr>`;
    }).join('');
  },

  /* ── CONVERTER ────────────────────────────────────────────── */

  bindConverter() {
    const amountEl = document.getElementById('conv-amount');
    const curEl    = document.getElementById('conv-from');
    if (!amountEl || !curEl) return;
    amountEl.addEventListener('input', () => this.convert());
    curEl.addEventListener('change', () => this.convert());
  },

  fillConverter() {
    const curEl = document.getElementById('conv-from');
    if (!curEl) return;
    const keep = curEl.value || this.state.selectedCode;
    curEl.innerHTML = this.state.rows.map(r => `<option value="${r.code}">${r.flag} ${r.code} — ${r.name}</option>`).join('');
    curEl.value = this.state.rows.some(r => r.code === keep) ? keep : this.state.rows[0]?.code;
    this.convert();
  },

  convert() {
    const amount = parseFloat(document.getElementById('conv-amount')?.value) || 0;
    const code   = document.getElementById('conv-from')?.value;
    const r      = this.state.rows.find(x => x.code === code);
    const payEl  = document.getElementById('conv-pay');
    const getEl  = document.getElementById('conv-get');
    if (!r || !payEl || !getEl) return;
    const per = amount / r.unit;
    const fmt = n => n == null ? '—' : '₹' + Math.round(n).toLocaleString('en-IN');
    payEl.textContent = fmt(per * r.sell);
    getEl.textContent = r.buy == null ? '—' : fmt(per * r.buy);
  },

  /* ── CHART (real daily history) ───────────────────────────── */

  bindChartButtons() {
    document.querySelectorAll('.time-btn[data-period]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.time-btn[data-period]').forEach(b => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        this.state.period = btn.dataset.period;
        this.renderChart();
      });
    });
  },

  selectCurrency(code, silent) {
    const r = this.state.rows.find(x => x.code === code) || this.state.rows[0];
    if (!r) return;
    this.state.selectedCode = r.code;
    document.querySelectorAll('.fx-card').forEach(el => el.classList.toggle('selected', el.dataset.code === r.code));
    const sub = document.getElementById('chart-subtitle');
    if (sub) sub.textContent = `Live: ${this._unitLabel(r)} = ${this._fmt(r.live)} · We sell ${this._fmt(r.sell)} · We buy ${this._fmt(r.buy)}`;
    if (!silent) {
      const conv = document.getElementById('conv-from');
      if (conv) { conv.value = r.code; this.convert(); }
    }
    this.renderChart();
  },

  async renderChart() {
    const canvas = document.getElementById('forexChart');
    const card   = document.querySelector('.chart-card');
    const r      = this.state.rows.find(x => x.code === this.state.selectedCode);
    if (!canvas || !r || !this.state.updatedAt) return;
    if (card) card.hidden = false;

    const days = { '7d': 7, '30d': 30, '90d': 90, '180d': 180 }[this.state.period] || 7;
    const title = document.getElementById('chart-title');
    if (title) title.textContent = `${r.code} / INR — ${this._periodLabel(this.state.period)} Trend`;

    // Sample at most ~10 daily points to keep requests light
    const end   = this.state.updatedAt.toISOString().slice(0, 10);
    const step  = Math.max(1, Math.round(days / 9));
    const dates = [];
    for (let i = days; i > 0; i -= step) dates.push(this._shiftDate(end, -i));

    const token = (this._chartToken = (this._chartToken || 0) + 1);
    const hist  = await Promise.all(dates.map(d => this.fetchDay(d).catch(() => null)));
    if (token !== this._chartToken) return; // user clicked something newer

    const labels = [], data = [];
    dates.forEach((d, i) => {
      if (hist[i] && hist[i][r.code]) {
        labels.push(new Date(d + 'T00:00:00Z').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', timeZone: 'UTC' }));
        data.push(+(hist[i][r.code] * r.unit).toFixed(4));
      }
    });
    labels.push('Today');
    data.push(+r.live.toFixed(4));

    if (this.state.chart) { this.state.chart.destroy(); this.state.chart = null; }
    if (typeof Chart === 'undefined' || data.length < 2) {
      if (card) card.hidden = true;
      return;
    }

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 320);
    gradient.addColorStop(0,   'rgba(201,168,76,0.28)');
    gradient.addColorStop(0.7, 'rgba(201,168,76,0.06)');
    gradient.addColorStop(1,   'rgba(201,168,76,0)');

    this.state.chart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets: [{
        label: `${r.code}/INR`, data,
        borderColor: '#C9A84C', backgroundColor: gradient, fill: true, tension: 0.35,
        pointRadius: 3, pointHoverRadius: 6, pointBackgroundColor: '#C9A84C',
        pointBorderColor: '#fff', pointBorderWidth: 2, borderWidth: 2.5,
      }]},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0A1628', titleColor: '#C9A84C', bodyColor: '#fff',
            borderColor: 'rgba(201,168,76,0.3)', borderWidth: 1, padding: 10,
            callbacks: { label: c => ` ${this._unitLabel(r)} = ₹${c.parsed.y.toFixed(2)} (live)` },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#718096', maxRotation: 0, autoSkip: true, maxTicksLimit: 6 } },
          y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 10 }, color: '#718096', callback: v => '₹' + Number(v).toFixed(2) } },
        },
        animation: { duration: 500 },
      },
    });
  },

  _shiftDate(iso, deltaDays) {
    const d = new Date(iso + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() + deltaDays);
    return d.toISOString().slice(0, 10);
  },

  _periodLabel(p) {
    return { '7d': '7 Day', '30d': '1 Month', '90d': '3 Month', '180d': '6 Month' }[p] || '7 Day';
  },

  destroy() {
    if (this.state.timer) clearInterval(this.state.timer);
    if (this.state.chart) this.state.chart.destroy();
  },
};

/* ── AUTO-INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('rates-table-body')) window.AlKhalis.Forex.init();
});
