/* ================================================================
   RENDERER.JS — Dynamic Content Renderer from Data Layer
   ================================================================ */
'use strict';
window.AlKhalis = window.AlKhalis || {};

window.AlKhalis.Renderer = {
  D: null,

  init() {
    this.D = window.AlKhalis.Data;
    if (!this.D) { console.warn('AlKhalis.Data not loaded'); return; }
    this.renderStats();
    this.renderServices();
    this.renderDestinations();
    this.renderTestimonials();
    this.renderHotels();
    this.renderPackages();
    this.renderBlogPosts();
    this.renderTeam();
    this.renderVisaCountries();
    this.renderUmrahPackages();
    this.renderFAQs();
    this.renderPartners();
    this.renderPopularRoutes();
    setTimeout(() => {
      window.AlKhalis.App?.initScrollReveal?.();
      window.AlKhalis.App?.initCounters?.();
    }, 100);
  },

  into(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  },

  /* ── STATS ─────────────────────────────────────────────────── */
  renderStats() {
    const wrap = document.getElementById('stats-bar-inner');
    if (!wrap || !this.D.stats) return;
    wrap.innerHTML = this.D.stats.map(s => `
      <div class="stat-item">
        <span class="stat-item__number" data-target="${s.number}" data-suffix="${s.suffix}">0</span>
        <span class="stat-item__label">${s.label}</span>
      </div>`).join('');
  },

  /* ── SERVICES — real images ─────────────────────────────────── */
  renderServices() {
    const wrap = document.getElementById('services-grid');
    if (!wrap || !this.D.services) return;
    wrap.className = 'services-img-grid reveal-group';
    wrap.innerHTML = this.D.services.map(s => `
      <a href="${window.SITE_ROOT || ''}${s.href}" class="service-card service-card--img">
        <div class="service-card__img-wrap">
          <img
            src="${s.icon}"
            alt="${s.alt || s.title}"
            class="service-card__bg-img"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=70'"
          >
          <div class="service-card__overlay"></div>
          <div class="service-card__label">${s.title}</div>
        </div>
        <div class="service-card__body">
          <h3 class="service-card__title">${s.title}</h3>
          <p class="service-card__desc">${s.desc}</p>
          <span class="service-card__link">Learn More <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>`).join('');
  },

  /* ── DESTINATIONS — real images ─────────────────────────────── */
  renderDestinations() {
    const wrap = document.getElementById('destinations-grid');
    if (!wrap || !this.D.destinations) return;
    wrap.className = 'destinations-img-grid';
    wrap.innerHTML = this.D.destinations.map(d => `
      <div class="dest-card reveal" onclick="location.href='${window.SITE_ROOT || ''}${d.href}'"
           role="link" tabindex="0" aria-label="${d.name}" style="cursor:pointer">
        <img class="dest-card__img"
             src="${d.img}"
             alt="${d.alt || d.name}"
             loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600&q=70'">
        <div class="dest-card__overlay"></div>
        <div class="dest-card__price">${d.price}</div>
        <div class="dest-card__info">
          <div class="dest-card__name">${d.name}</div>
          <div class="dest-card__sub">✈ ${d.sub}</div>
        </div>
      </div>`).join('');
  },

  /* ── TESTIMONIALS ───────────────────────────────────────────── */
  renderTestimonials() {
    const wrap = document.getElementById('testimonials-grid');
    if (!wrap || !this.D.testimonials) return;
    wrap.className = 'grid-3 reveal-group';
    wrap.innerHTML = this.D.testimonials.map(t => `
      <article class="testi-card">
        <div class="testi-card__stars" aria-label="${t.stars} out of 5 stars">
          ${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}
        </div>
        <p class="testi-card__text">"${t.text}"</p>
        <div class="testi-card__author">
          <div class="avatar avatar--md avatar--gold" aria-hidden="true">${t.initials}</div>
          <div>
            <div class="testi-card__name">${t.name}</div>
            <div class="testi-card__trip">${t.trip}</div>
          </div>
        </div>
      </article>`).join('');
  },

  /* ── HOTELS ─────────────────────────────────────────────────── */
  renderHotels() {
    const wrap = document.getElementById('hotels-grid');
    if (!wrap || !this.D.hotels) return;
    wrap.className = 'grid-3 reveal-group';
    wrap.innerHTML = this.D.hotels.map(h => `
      <article class="hotel-card">
        <div class="hotel-card__img" style="background:${h.bg}" role="img" aria-label="${h.name}">
          ${h.emoji}
          <div class="hotel-card__star-badge" aria-label="${h.stars} stars">
            ${'⭐'.repeat(Math.min(h.stars,5))}
          </div>
        </div>
        <div class="hotel-card__body">
          <div class="hotel-card__name">${h.name}</div>
          <div class="hotel-card__loc">📍 ${h.loc}</div>
          <div class="amenity-chips">
            ${h.amenities.map(a=>`<span class="amenity-chip">${a}</span>`).join('')}
          </div>
          <div class="hotel-card__footer">
            <div>
              <div class="hotel-price-big">₹${h.price.toLocaleString('en-IN')}</div>
              <div class="hotel-price-per">per night</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
              <div style="font-size:0.82rem;font-weight:700;color:var(--navy)">
                ⭐ ${h.rating} <span style="font-weight:400;color:var(--text-muted);font-size:0.72rem">(${h.reviews})</span>
              </div>
              <a href="${window.SITE_ROOT||''}pages/contact.html" class="btn btn--gold btn--sm">Book Now</a>
            </div>
          </div>
        </div>
      </article>`).join('');
  },

  /* ── PACKAGES ───────────────────────────────────────────────── */
  renderPackages() {
    const wrap = document.getElementById('packages-grid');
    if (!wrap || !this.D.packages) return;
    wrap.className = 'pkg-grid reveal-group';
    wrap.innerHTML = this.D.packages.map(p => `
      <article class="pkg-card" data-cat="${p.cat}">
        <div class="pkg-card__img-wrap">
          <img src="${p.img}" alt="${p.alt||p.name}" class="pkg-card__img" loading="lazy"
               onerror="this.parentElement.style.background='linear-gradient(135deg,#0D1B2A,#1B2A3E)'">
          <div class="pkg-card__img-overlay"></div>
          <span class="pkg-card__badge pkg-card__badge--${p.tagType}">${p.tag}</span>
          <span class="pkg-card__nights"><i class="fa-solid fa-moon"></i> ${p.nights} Nights</span>
        </div>
        <div class="pkg-card__body">
          <div class="pkg-card__name">${p.name}</div>
          <div class="pkg-card__dest"><i class="fa-solid fa-location-dot" style="color:#B8860B"></i> ${p.dest}</div>
          <div class="pkg-includes">
            ${p.includes.map(inc=>`<span class="pkg-inc">${inc}</span>`).join('')}
          </div>
          <div class="pkg-card__footer">
            <div>
              <div class="pkg-price-big">₹${p.price.toLocaleString('en-IN')}</div>
              <div class="pkg-price-note">${p.priceNote}</div>
            </div>
            <a href="${window.SITE_ROOT||''}pages/contact.html?pkg=${encodeURIComponent(p.name)}" class="pkg-book-btn">
              Book Now <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </article>`).join('');
    this._bindPackageFilters();
  },

  _bindPackageFilters() {
    document.querySelectorAll('.filter-tab[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        document.querySelectorAll('.pkg-card').forEach(card => {
          const cardCat = card.getAttribute('data-cat') || '';
          card.style.display = (cat==='all' || cardCat.includes(cat)) ? '' : 'none';
        });
      });
    });
  },

  /* ── BLOG POSTS ─────────────────────────────────────────────── */
  renderBlogPosts() {
    const wrap = document.getElementById('blog-posts');
    if (!wrap || !this.D.blogPosts) return;
    const bgs = ['linear-gradient(135deg,#1a0533,#3d0c02)','linear-gradient(135deg,#1a1a2e,#0f3460)','linear-gradient(135deg,#0f3460,#533483)','linear-gradient(135deg,#1a472a,#2d6a4f)','linear-gradient(135deg,#8B6914,#C9A84C)'];
    const prefix = window.location.pathname.includes('/pages/') ? '../' : '';
    wrap.innerHTML = this.D.blogPosts.map((p,i) => `
      <article class="blog-card reveal">
        <div class="blog-card__img" style="${p.img
          ? `background:url('${prefix}${p.img}') center/cover no-repeat`
          : `background:${bgs[i%bgs.length]}`}" role="img" aria-label="${p.title}">
          ${p.img ? '' : p.emoji}
          <span class="badge badge--${p.catType}" style="position:absolute;top:1rem;left:1rem">${p.cat}</span>
        </div>
        <div class="blog-card__body">
          <div class="blog-card__meta">
            <span class="blog-meta-item">📅 ${p.date}</span>
            <span class="blog-meta-item">⏱ ${p.read} read</span>
            <span class="blog-author">✍ ${p.author}</span>
          </div>
          <h2 class="blog-title">${p.title}</h2>
          <p class="blog-excerpt">${p.excerpt}</p>
          <div class="blog-footer">
            <div class="blog-tags">${p.tags.map(t=>`<span class="blog-tag">${t}</span>`).join('')}</div>
            <a href="${p.url || '#'}" class="btn btn--outline btn--sm"${p.url ? '' : ' style="opacity:0.45;pointer-events:none"'}>Read More →</a>
          </div>
        </div>
      </article>`).join('');
  },

  /* ── TEAM ───────────────────────────────────────────────────── */
  renderTeam() {
    const wrap = document.getElementById('team-grid');
    if (!wrap || !this.D.team) return;
    wrap.className = 'grid-4 reveal-group';
    wrap.innerHTML = this.D.team.map(m => `
      <div class="card card__body" style="text-align:center;padding:2rem">
        <div class="avatar avatar--xl avatar--gold" style="margin:0 auto 1rem" aria-hidden="true">${m.initial}</div>
        <div style="font-family:var(--font-serif);font-size:1.2rem;color:var(--navy);font-weight:700">${m.name}</div>
        <div style="font-size:0.72rem;color:var(--gold);text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin:4px 0 0.8rem">${m.role}</div>
        <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.65">${m.desc}</p>
      </div>`).join('');
  },

  /* ── VISA COUNTRIES ─────────────────────────────────────────── */
  renderVisaCountries() {
    const wrap = document.getElementById('visa-countries');
    if (!wrap || !this.D.visaCountries) return;
    wrap.className = 'country-pill-grid reveal-group';
    wrap.innerHTML = this.D.visaCountries.map(c => `
      <div class="country-pill">
        <div class="country-pill__flag" aria-hidden="true">${c.flag}</div>
        <div class="country-pill__name">${c.name}</div>
        <div class="country-pill__type">${c.type}</div>
      </div>`).join('');
  },

  /* ── UMRAH PACKAGES ─────────────────────────────────────────── */
  renderUmrahPackages() {
    const wrap = document.getElementById('umrah-packages');
    if (!wrap || !this.D.umrahPackages) return;
    wrap.className = 'grid-4 reveal-group';
    wrap.innerHTML = this.D.umrahPackages.map(p => `
      <article class="hajj-tier-card" style="position:relative">
        ${p.popular ? '<span class="badge badge--gold" style="position:absolute;top:1rem;right:1rem;z-index:2">Most Popular</span>' : ''}
        <div class="hajj-tier-card__header" style="background:${p.headerBg}">
          <div class="hajj-tier-card__icon" aria-hidden="true">${p.icon}</div>
          <div class="hajj-tier-card__name">${p.tier}</div>
          <div class="hajj-tier-card__dur">${p.nights} Nights / ${p.nights+1} Days</div>
          <div class="hajj-tier-card__price">₹${p.price.toLocaleString('en-IN')}</div>
          <div style="font-size:0.72rem;color:rgba(255,255,255,0.65)">per person</div>
        </div>
        <div class="hajj-tier-card__body">
          ${p.features.map(f=>`<div class="tier-feature"><span class="tier-feature__check">✓</span><span>${f}</span></div>`).join('')}
          ${p.missing.map(f=>`<div class="tier-feature" style="opacity:0.6"><span style="color:#ccc">✗</span><span>${f}</span></div>`).join('')}
          <a href="${window.SITE_ROOT||''}pages/contact.html"
             class="btn ${p.popular?'btn--gold':'btn--navy'} btn--full" style="margin-top:1.2rem">Book Now</a>
        </div>
      </article>`).join('');
  },

  /* ── FAQs ───────────────────────────────────────────────────── */
  renderFAQs() {
    if (!this.D.faqs) return;
    Object.entries(this.D.faqs).forEach(([section, items]) => {
      const wrap = document.getElementById(`faq-${section}`);
      if (!wrap) return;
      wrap.innerHTML = items.map((item, i) => `
        <div class="accordion-item" role="region" aria-labelledby="faq-${section}-${i}">
          <button class="accordion-trigger" id="faq-${section}-${i}"
                  aria-expanded="false" aria-controls="faq-body-${section}-${i}">
            <span>${item.q}</span>
            <span class="accordion-trigger__icon" aria-hidden="true">+</span>
          </button>
          <div class="accordion-body" id="faq-body-${section}-${i}">
            <div class="accordion-body__inner">${item.a}</div>
          </div>
        </div>`).join('');
      window.AlKhalis.App?.initAccordions?.();
    });
  },

  /* ── PARTNERS — real logos ──────────────────────────────────── */
  renderPartners() {
    /* Intentionally disabled. The partners section is rendered by the
       inline script in index.html (22 airlines, .partners-grid compact
       layout). This function used to overwrite it 350ms later with a
       .pkg-grid reveal-group version, whose reveal CSS only supports 8
       children — hiding partners 9-22. Do not re-enable without also
       removing the inline renderer and extending the reveal rules. */
    return;
  },

  /* ── POPULAR ROUTES ─────────────────────────────────────────── */
  renderPopularRoutes() {
    document.querySelectorAll('.popular-routes').forEach(wrap => {
      if (!this.D.popularRoutes) return;
      wrap.innerHTML = this.D.popularRoutes.map(r => `
        <button class="route-chip" data-from="${r.from}" data-to="${r.to}"
                aria-label="Route: ${r.from} to ${r.to}">
          ${r.from.split('(')[0].trim()} → ${r.to.split('(')[0].trim()}
        </button>`).join('');
    });
  },
};

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    window.AlKhalis.Renderer.init();
    if (window.AlKhalis.refreshReveals) window.AlKhalis.refreshReveals();
  }, 350);
});
