/* ================================================================
   FOREX.JS — Live Chart, Currency Table, Converter Module
   ================================================================ */

'use strict';

window.AlKhalis = window.AlKhalis || {};

window.AlKhalis.Forex = {

  state: {
    currencies:   [],
    selectedIndex: 0,
    chart:        null,
    period:       '7d',
    updateTimer:  null,
  },

  init() {
    this.state.currencies = [...(window.AlKhalis.Data?.currencies || [])];
    this.renderHeroCards();
    this.renderTable();
    this.initConverter();
    this.initChart();
    this.startAutoRefresh();
  },

  /* ── HERO CURRENCY CARDS ──────────────────────────────────── */
  renderHeroCards() {
    const wrap = document.getElementById('currency-cards');
    if (!wrap) return;

    wrap.innerHTML = this.state.currencies.slice(0, 10).map((c, i) => `
      <div class="currency-card ${i === 0 ? 'selected' : ''}"
           data-index="${i}" role="button" tabindex="0"
           aria-label="${c.name}: ₹${c.sell.toFixed(2)}">
        <div class="currency-card__flag">${c.flag}</div>
        <div class="currency-card__code">${c.code}</div>
        <div class="currency-card__rate">₹${c.sell.toFixed(2)}</div>
        <span class="${c.change >= 0 ? 'change-up' : 'change-down'}" style="font-size:0.72rem">
          ${c.change >= 0 ? '▲' : '▼'} ${Math.abs(c.pct).toFixed(2)}%
        </span>
      </div>`).join('');

    wrap.querySelectorAll('.currency-card').forEach(card => {
      const activate = () => {
        const idx = parseInt(card.getAttribute('data-index'));
        this.selectCurrency(idx);
      };
      card.addEventListener('click', activate);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activate(); });
    });
  },

  selectCurrency(idx) {
    this.state.selectedIndex = idx;
    const c = this.state.currencies[idx];
    if (!c) return;

    document.querySelectorAll('.currency-card').forEach(el => el.classList.remove('selected'));
    document.querySelector(`.currency-card[data-index="${idx}"]`)?.classList.add('selected');

    const titleEl    = document.getElementById('chart-title');
    const subtitleEl = document.getElementById('chart-subtitle');
    if (titleEl)    titleEl.textContent    = `${c.code} / INR — ${this._periodLabel(this.state.period)} Trend`;
    if (subtitleEl) subtitleEl.textContent = `1 ${c.code} = ₹${c.sell.toFixed(2)} INR`;

    this.renderChart(c.code, c.sell, this.state.period);
  },

  /* ── RATES TABLE ──────────────────────────────────────────── */
  renderTable() {
    const tbody = document.getElementById('rates-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.state.currencies.map(c => {
      const mid   = ((c.buy + c.sell) / 2).toFixed(2);
      const upDown = c.change >= 0;
      return `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.5rem">${c.flag}</span>
              <div>
                <div style="font-weight:700;font-size:0.9rem;color:var(--navy)">${c.name}</div>
              </div>
            </div>
          </td>
          <td><strong>${c.code}</strong></td>
          <td>₹${c.buy.toFixed(3)}</td>
          <td>₹${c.sell.toFixed(3)}</td>
          <td>₹${mid}</td>
          <td class="${upDown ? 'change-up' : 'change-down'}">${upDown ? '▲' : '▼'} ${Math.abs(c.pct).toFixed(2)}%</td>
          <td>
            <button class="btn btn--gold btn--sm"
              onclick="window.AlKhalis.App?.toast('Contact us at +91 98929 60023 for ${c.code} exchange.','info')">
              Exchange
            </button>
          </td>
        </tr>`;
    }).join('');
  },

  /* ── CURRENCY CONVERTER ───────────────────────────────────── */
  initConverter() {
    const amountEl = document.getElementById('conv-amount');
    const fromEl   = document.getElementById('conv-from');
    const toEl     = document.getElementById('conv-to');

    if (!amountEl || !fromEl || !toEl) return;

    // Populate selects
    const options = this.state.currencies.map(c =>
      `<option value="${c.sell}">${c.code} — ${c.name}</option>`
    ).join('');

    fromEl.innerHTML = options;
    toEl.innerHTML   = options;

    // Defaults: USD → INR
    const inrIndex = this.state.currencies.findIndex(c => c.code === 'INR');
    if (inrIndex > -1) {
      toEl.selectedIndex = inrIndex;
      fromEl.selectedIndex = 0;
    }

    const convert = () => {
      const amount   = parseFloat(amountEl.value) || 0;
      const fromRate = parseFloat(fromEl.value)   || 1;
      const toRate   = parseFloat(toEl.value)     || 1;
      // Convert: amount × fromRate (to INR) ÷ toRate
      const result   = (amount * fromRate) / toRate;

      const toCode = toEl.options[toEl.selectedIndex]?.text.split('—')[0].trim() || '';
      const symbol = toCode === 'INR' ? '₹' : '';
      const el = document.getElementById('conv-result');
      if (el) el.textContent = `${symbol}${result.toLocaleString('en-IN', { maximumFractionDigits: 4 })} ${toCode}`;
    };

    amountEl.addEventListener('input', convert);
    fromEl.addEventListener('change', convert);
    toEl.addEventListener('change', convert);

    // Swap button
    const swapBtn = document.getElementById('conv-swap');
    if (swapBtn) {
      swapBtn.addEventListener('click', () => {
        const tmp = fromEl.value;
        fromEl.value = toEl.value;
        toEl.value   = tmp;
        convert();
      });
    }

    convert(); // initial render
  },

  /* ── CHART ────────────────────────────────────────────────── */
  initChart() {
    const c = this.state.currencies[0];
    if (!c) return;
    this.renderChart(c.code, c.sell, '7d');

    // Time period buttons
    document.querySelectorAll('.time-btn[data-period]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.period = btn.getAttribute('data-period');
        const idx = this.state.selectedIndex;
        const cur = this.state.currencies[idx];
        if (cur) {
          this.renderChart(cur.code, cur.sell, this.state.period);
          const titleEl = document.getElementById('chart-title');
          if (titleEl) titleEl.textContent = `${cur.code} / INR — ${this._periodLabel(this.state.period)} Trend`;
        }
      });
    });
  },

  renderChart(code, baseRate, period) {
    const canvas = document.getElementById('forexChart');
    if (!canvas) return;

    // Destroy existing chart
    if (this.state.chart) {
      this.state.chart.destroy();
      this.state.chart = null;
    }

    const days  = { '7d': 7, '30d': 30, '90d': 90, '180d': 180 }[period] || 7;
    const { labels, data } = this._generateData(baseRate, days);

    // Check Chart.js is loaded
    if (typeof Chart === 'undefined') {
      canvas.parentElement.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--text-muted)">
        Chart library loading... <br><small>Include Chart.js CDN in your page</small></div>`;
      return;
    }

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 320);
    gradient.addColorStop(0,   'rgba(201,168,76,0.28)');
    gradient.addColorStop(0.7, 'rgba(201,168,76,0.06)');
    gradient.addColorStop(1,   'rgba(201,168,76,0)');

    this.state.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: `${code}/INR`,
          data,
          borderColor:     '#C9A84C',
          backgroundColor: gradient,
          fill:            true,
          tension:         0.42,
          pointRadius:     days <= 7 ? 4 : 2,
          pointHoverRadius: 7,
          pointBackgroundColor: '#C9A84C',
          pointBorderColor:     '#fff',
          pointBorderWidth:     2,
          borderWidth:     2.5,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0A1628',
            titleColor:      '#C9A84C',
            bodyColor:       '#fff',
            borderColor:     'rgba(201,168,76,0.3)',
            borderWidth:     1,
            padding:         12,
            callbacks: {
              title:  ctx => ctx[0].label,
              label:  ctx => ` 1 ${code} = ₹${ctx.parsed.y.toFixed(4)}`,
            }
          },
        },
        scales: {
          x: {
            grid:  { color: 'rgba(0,0,0,0.05)', drawBorder: false },
            ticks: { font: { size: 11, family: "'Outfit', sans-serif" }, color: '#718096',
                     maxTicksLimit: days <= 7 ? 7 : 8 }
          },
          y: {
            grid:  { color: 'rgba(0,0,0,0.05)', drawBorder: false },
            ticks: { font: { size: 11, family: "'Outfit', sans-serif" }, color: '#718096',
                     callback: v => '₹' + v.toFixed(2) }
          }
        },
        animation: { duration: 600, easing: 'easeInOutQuart' },
      }
    });
  },

  _generateData(baseRate, days) {
    const labels = [], data = [];
    const now    = new Date();
    let current  = baseRate;

    for (let i = days; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      labels.push(d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }));
      // Random walk ±0.8%
      const delta = (Math.random() - 0.48) * baseRate * 0.008;
      current = Math.max(current + delta, baseRate * 0.92);
      data.push(+current.toFixed(4));
    }
    return { labels, data };
  },

  _periodLabel(p) {
    return { '7d': '7 Day', '30d': '1 Month', '90d': '3 Month', '180d': '6 Month' }[p] || '7 Day';
  },

  /* ── AUTO-REFRESH (simulate live rates) ──────────────────── */
  startAutoRefresh() {
    // Refresh every 60 seconds with tiny rate fluctuations
    this.state.updateTimer = setInterval(() => {
      this.state.currencies = this.state.currencies.map(c => {
        if (c.code === 'INR') return c;
        const delta = (Math.random() - 0.5) * c.sell * 0.002;
        const newSell = +(c.sell + delta).toFixed(4);
        const newBuy  = +(newSell - (c.sell - c.buy)).toFixed(4);
        return { ...c, sell: newSell, buy: newBuy, change: +delta.toFixed(4), pct: +(delta / c.sell * 100).toFixed(2) };
      });
      this.renderHeroCards();
      this.renderTable();

      // Re-select current without re-rendering chart
      const c = this.state.currencies[this.state.selectedIndex];
      if (c) {
        const subtitleEl = document.getElementById('chart-subtitle');
        if (subtitleEl) subtitleEl.textContent = `1 ${c.code} = ₹${c.sell.toFixed(2)} INR`;
      }

      // Show subtle update indicator
      const indicator = document.getElementById('rates-updated');
      if (indicator) {
        indicator.textContent = 'Rates updated: ' + new Date().toLocaleTimeString('en-IN');
      }
    }, 60000);
  },

  destroy() {
    if (this.state.updateTimer) clearInterval(this.state.updateTimer);
    if (this.state.chart) this.state.chart.destroy();
  },
};

/* ── AUTO-INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('forexChart') || document.getElementById('currency-cards')) {
    setTimeout(() => window.AlKhalis.Forex.init(), 300);
  }
});

window.addEventListener('beforeunload', () => {
  window.AlKhalis.Forex?.destroy();
});
