/* ================================================================
   APP.JS — Core Bootstrap: Topbar, Navbar, Footer
   Al Khalis Tours and Travels v2.0
   ================================================================ */

'use strict';

window.AlKhalis = window.AlKhalis || {};

const App = {

  init() {
    this.detectRoot();
    this.injectLayout();
    this.initLoader();
    this.initNavbar();
    this.initScrollReveal();
    this.initCounters();
    this.initAccordions();
    this.initTabs();
    this.initForms();
    this.initStars();
    this.initStickyCTA();
    this.setActiveNav();
  },

  detectRoot() {
    const path = window.location.pathname;
    this.root = path.includes('/pages/') ? '../' : './';
    window.SITE_ROOT = this.root;
  },

  injectLayout() {
    const navEl    = document.getElementById('nav-container');
    const footerEl = document.getElementById('footer-container');
    if (navEl)    navEl.innerHTML    = this.buildNav();
    if (footerEl) footerEl.innerHTML = this.buildFooter();
  },

  /* ── BUILD NAVBAR ──────────────────────────────────────────── */
  buildNav() {
    const r = this.root;
    const pages = [
      { href: r + 'index.html',          label: 'Home' },
      { href: r + 'pages/flight.html',   label: 'Flight' },
      { href: r + 'pages/visa.html',     label: 'Visa' },
      { href: r + 'pages/hotel.html',    label: 'Hotel' },
      { href: r + 'pages/packages.html', label: 'Packages' },
      { href: r + 'pages/forex.html',    label: 'Forex' },
      { href: r + 'pages/hajj.html',     label: 'Hajj & Umrah' },
      { href: r + 'pages/contact.html',  label: 'Contact' },
      { href: r + 'pages/about.html',    label: 'About Us' },
      { href: r + 'pages/blog.html',     label: 'News & Blogs' },
    ];

    const navLinks    = pages.map(p => `<li><a href="${p.href}">${p.label}</a></li>`).join('');
    const mobileLinks = pages.map(p => `<a href="${p.href}">${p.label}</a>`).join('');

    return `
<!-- Page Loader -->
<div id="page-loader" class="page-loader" role="status" aria-label="Loading">
  <div class="loader-plane">✈</div>
  <div class="loader-brand"><span>Al Khalis</span> Tours &amp; Travels</div>
  <div class="loader-track"><div class="loader-fill"></div></div>
</div>

<!-- Magic Social Menu -->
<div class="social-menu" id="socialMenu" role="navigation" aria-label="Social media links">
  <button class="social-menu__toggle" id="socialToggle"
          onclick="AlKhalis.toggleSocialMenu()"
          aria-label="Toggle social media menu" aria-expanded="false" title="Follow Us">
    <span class="social-menu__icon-open" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z"/></svg>
    </span>
    <span class="social-menu__icon-close" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    </span>
  </button>
  <ul class="social-menu__items" role="list">
    <li class="social-menu__item" style="--i:0;--clr:#1877F2" role="listitem">
      <a href="https://www.facebook.com/alkhalistravels" target="_blank" rel="noopener noreferrer" aria-label="Facebook" data-tip="Facebook">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
      </a>
    </li>
    <li class="social-menu__item" style="--i:1;--clr:#E1306C" role="listitem">
      <a href="https://www.instagram.com/alkhalistravels" target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-tip="Instagram">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
      </a>
    </li>
    <li class="social-menu__item" style="--i:2;--clr:#000000" role="listitem">
      <a href="https://twitter.com/alkhalistravels" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" data-tip="X / Twitter">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
    </li>
    <li class="social-menu__item" style="--i:3;--clr:#FF0000" role="listitem">
      <a href="https://www.youtube.com/@alkhalistravels" target="_blank" rel="noopener noreferrer" aria-label="YouTube" data-tip="YouTube">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
    </li>
    <li class="social-menu__item" style="--i:4;--clr:#0A66C2" role="listitem">
      <a href="https://www.linkedin.com/company/alkhalistravels" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-tip="LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
    </li>
  </ul>
</div>

<!-- Topbar -->
<div class="topbar" role="banner">
  <div class="topbar__contacts">
    <a class="topbar__item topbar__item--link" href="tel:+919892960023">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      +91 98929 60023
    </a>
    <span class="topbar__sep">|</span>
    <a class="topbar__item topbar__item--link" href="tel:+917021231145">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      +91 70212 31145
    </a>
    <span class="topbar__sep">|</span>
    <a class="topbar__item topbar__item--link" href="mailto:info@alkhalistravels.com">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
      info@alkhalistravels.com
    </a>
    <span class="topbar__sep">|</span>
    <a class="topbar__item topbar__item--link" href="https://wa.me/919892960023" target="_blank" rel="noopener noreferrer">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.882a.5.5 0 0 0 .611.611l6.101-1.466A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
      WhatsApp
    </a>
  </div>
  <div class="topbar__right">
    <span class="topbar__item">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
      Mon–Sat: 10AM–7PM
    </span>
  </div>
</div>

<!-- Navbar -->
<nav id="navbar" role="navigation" aria-label="Main navigation">
  <div class="nav-inner">
    <a class="nav-logo" href="${r}index.html" aria-label="Al Khalis Tours Home">
      <img class="nav-logo__img" src="${r}assets/logo-wide-rgba.png" alt="Al Khalis Tours and Travels" loading="eager">
    </a>
    <ul class="nav-links" role="list">${navLinks}
      <li><a href="${r}pages/contact.html" class="nav-cta">Book Now</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-nav">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- Mobile Nav -->
<div class="mobile-nav" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile navigation">
  ${mobileLinks}
  <div class="mobile-nav__footer">
    <a href="tel:+919892960023">📞 +91 98929 60023</a>
    <a href="mailto:info@alkhalistravels.com">✉ info@alkhalistravels.com</a>
  </div>
</div>

<!-- Floating Buttons -->
<div class="float-btns-wrap" aria-label="Quick contact buttons">
  <!-- Scroll to Top -->
  <button class="float-btn float-btn--top" id="scrollTopBtn" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Scroll to top" title="Back to Top" style="display:none">
    <svg viewBox="0 0 24 24" fill="white"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
    <span class="float-btn__tip">Back to Top</span>
  </button>
  <!-- WhatsApp — official 2-path SVG icon -->
  <a class="float-btn float-btn--wa" href="https://wa.me/919892960023?text=Hello%21%20I%20am%20interested%20in%20your%20travel%20services.%20Please%20assist%20me." target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title="WhatsApp Chat">
    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.882a.5.5 0 0 0 .611.611l6.101-1.466A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 0 1-5.003-1.372l-.36-.214-3.717.894.922-3.634-.235-.374A9.787 9.787 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>
    <span class="float-btn__tip">Chat on WhatsApp</span>
  </a>
  <!-- Call -->
  <a class="float-btn float-btn--call" href="tel:+919892960023" aria-label="Call us now" title="Call Now">
    <svg viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
    <span class="float-btn__tip">Call +91 98929 60023</span>
  </a>
</div>

<!-- Sticky CTA Bar -->
<div class="sticky-cta no-print" id="sticky-cta" role="complementary" aria-label="Quick contact bar">
  <div class="sticky-cta__left">
    <span class="sticky-cta__text">Ready to travel? <strong>Talk to our experts!</strong></span>
  </div>
  <div class="sticky-cta__actions">
    <a href="tel:+919892960023" class="btn btn--gold btn--sm"><i class="fa-solid fa-phone"></i> Call Now</a>
    <a href="${r}pages/contact.html" class="btn btn--outline btn--sm">Get Free Quote</a>
    <a href="https://wa.me/919892960023" target="_blank" rel="noopener" class="btn btn--sm" style="background:#25D366;color:#fff"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
  </div>
</div>`;
  },

  /* ── BUILD FOOTER ──────────────────────────────────────────── */
  buildFooter() {
    const r = this.root;
    return `
<footer role="contentinfo">
  <div class="footer-grid">

    <!-- COL 1: Brand + Contact + Social + Badges -->
    <div class="footer-brand">
      <img class="footer-logo-img" src="${r}assets/logo-wide-rgba.png" alt="Al Khalis Tours and Travels" loading="lazy">
      <div class="footer-brand__tag">YOUR TRUSTED TRAVEL PARTNER SINCE 2005</div>
      <p class="footer-desc">Mumbai's most trusted travel agency — offering flights, visas, hotels, Hajj &amp; Umrah packages and forex services for over 20 years.</p>

      <div class="footer-contact-row">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="color:#B8860B;flex-shrink:0"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        <span>Vaikunth Nadekar Chawl, 02, 90 Feet Rd, Saki Naka, Mumbai — 400072</span>
      </div>
      <div class="footer-contact-row">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="color:#B8860B;flex-shrink:0"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        <span>Shop No. 10, Opp. Mira Road Railway Station, Mira Road East — 401107</span>
      </div>
      <div class="footer-contact-row">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="color:#B8860B;flex-shrink:0"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        <span><a href="tel:+919892960023">+91 98929 60023</a> &nbsp;|&nbsp; <a href="tel:+917021231145">+91 70212 31145</a></span>
      </div>
      <div class="footer-contact-row">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="color:#B8860B;flex-shrink:0"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        <span><a href="mailto:info@alkhalistravels.com">info@alkhalistravels.com</a></span>
      </div>

    </div>

    <!-- COL 2: Quick Links (10 items) -->
    <div>
      <h4 class="footer-heading">Quick Links</h4>
      <ul class="footer-links">
        <li><a href="${r}index.html">› Home</a></li>
        <li><a href="${r}pages/about.html">› About Us</a></li>
        <li><a href="${r}pages/flight.html">› Flight Booking</a></li>
        <li><a href="${r}pages/visa.html">› Visa Services</a></li>
        <li><a href="${r}pages/hotel.html">› Hotel Booking</a></li>
        <li><a href="${r}pages/packages.html">› Tour Packages</a></li>
        <li><a href="${r}pages/forex.html">› Forex Exchange</a></li>
        <li><a href="${r}pages/hajj.html">› Hajj &amp; Umrah</a></li>
        <li><a href="${r}pages/contact.html">› Contact Us</a></li>
        <li><a href="${r}pages/blog.html">› News &amp; Blogs</a></li>
      </ul>
    </div>

    <!-- COL 3: Our Services (10 items) -->
    <div>
      <h4 class="footer-heading">Our Services</h4>
      <ul class="footer-links">
        <li><a href="${r}pages/flight.html">› International Flights</a></li>
        <li><a href="${r}pages/flight.html">› Domestic Flights</a></li>
        <li><a href="${r}pages/visa.html">› Tourist Visa</a></li>
        <li><a href="${r}pages/visa.html">› Business Visa</a></li>
        <li><a href="${r}pages/visa.html">› Schengen Visa</a></li>
        <li><a href="${r}pages/hajj.html">› Umrah Packages</a></li>
        <li><a href="${r}pages/hajj.html">› Hajj Registration</a></li>
        <li><a href="${r}pages/packages.html">› Honeymoon Packages</a></li>
        <li><a href="${r}pages/packages.html">› Group Tours</a></li>
        <li><a href="${r}pages/forex.html">› Currency Exchange</a></li>
      </ul>
    </div>

    <!-- COL 4: Newsletter + Social Icons + Trust Badges -->
    <div class="footer-newsletter">
      <h4 class="footer-heading">Newsletter</h4>
      <p>Get exclusive deals, visa news &amp; Umrah updates in your inbox.</p>
      <form class="newsletter-form" id="newsletter-form" novalidate>
        <input type="email" id="newsletter-email" placeholder="your@email.com" autocomplete="email" required aria-label="Email address">
        <button type="submit" class="btn btn--gold" aria-label="Subscribe">→</button>
      </form>

      <!-- Social Icons -->
      <div class="footer-social footer-social--newsletter" aria-label="Follow us on social media" style="margin-top:1.4rem">
        <a class="footer-social__btn" href="https://www.facebook.com/alkhalistravels" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style="--sc:#1877F2">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
        </a>
        <a class="footer-social__btn" href="https://www.instagram.com/alkhalistravels" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style="--sc:#E1306C">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
        </a>
        <a class="footer-social__btn" href="https://twitter.com/alkhalistravels" target="_blank" rel="noopener noreferrer" aria-label="X/Twitter" style="--sc:#000">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a class="footer-social__btn" href="https://www.youtube.com/@alkhalistravels" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style="--sc:#FF0000">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
        <a class="footer-social__btn" href="https://wa.me/919892960023" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style="--sc:#25D366">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.882a.5.5 0 0 0 .611.611l6.101-1.466A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
        </a>
        <a class="footer-social__btn" href="https://www.linkedin.com/company/alkhalistravels" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style="--sc:#0A66C2">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a class="footer-social__btn" href="https://t.me/alkhalistravels" target="_blank" rel="noopener noreferrer" aria-label="Telegram" style="--sc:#26A5E4">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </a>
      </div>

      <!-- Trust / Certification Badges — single actual image -->
      <div class="footer-certs-img-wrap" style="margin-top:1.2rem">
        <img
          src="${r}assets/images/nta-iata-taai-tafi.jpg"
          alt="NTA · IATA · TAAI · TAFI Certified"
          style="max-width:100%;height:auto;border-radius:8px;display:block;opacity:0.92;filter:brightness(1.05)"
          loading="lazy"
        >
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} Al Khalis Tours and Travels. All Rights Reserved.</span>
    <span>
      <a href="${r}pages/about.html">About</a> &nbsp;·&nbsp;
      <a href="${r}pages/contact.html">Contact</a> &nbsp;·&nbsp;
      <a href="#">Privacy Policy</a> &nbsp;·&nbsp;
      Developed by Rakibul Islam Salafi
    </span>
  </div>
</footer>`;
  },

  /* ── PAGE LOADER ───────────────────────────────────────────── */
  initLoader() {
    const hide = () => {
      const loader = document.getElementById('page-loader');
      if (!loader || loader.getAttribute('data-hidden') === 'true') return;
      loader.setAttribute('data-hidden', 'true');
      loader.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';
      loader.style.opacity    = '0';
      loader.style.visibility = 'hidden';
      loader.style.pointerEvents = 'none';
      setTimeout(() => { try { loader.parentNode && loader.parentNode.removeChild(loader); } catch(e){} }, 500);
    };
    /* 4-layer guarantee */
    document.addEventListener('DOMContentLoaded', () => setTimeout(hide, 800));
    window.addEventListener('load',               () => setTimeout(hide, 300));
    setTimeout(hide, 2500);
    if (document.readyState === 'interactive' || document.readyState === 'complete') setTimeout(hide, 800);
  },

  /* ── NAVBAR ────────────────────────────────────────────────── */
  initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
      const topBtn = document.getElementById('scrollTopBtn');
      if (topBtn) topBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    }, { passive: true });
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    if (hamburger && mobileNav) {
      const toggle = () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      };
      hamburger.addEventListener('click', toggle);
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) toggle();
      });
    }
  },

  /* ── STICKY CTA ────────────────────────────────────────────── */
  initStickyCTA() {
    const bar = document.getElementById('sticky-cta');
    if (!bar) return;
    let shown = false;
    window.addEventListener('scroll', () => {
      const show = window.scrollY > 400;
      if (show !== shown) { bar.classList.toggle('visible', show); shown = show; }
    }, { passive: true });
  },

  /* ── SCROLL REVEAL ─────────────────────────────────────────── */
  initScrollReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    const observe = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
      document.querySelectorAll('.reveal-group:not(.visible)').forEach(el => obs.observe(el));
    };
    observe();
    setTimeout(observe, 300);
    setTimeout(observe, 900); /* safety net for late-rendered content */
    window.AlKhalis = window.AlKhalis || {};
    window.AlKhalis.refreshReveals = observe;
  },

  /* ── COUNTERS ──────────────────────────────────────────────── */
  initCounters() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-target]').forEach(el => this._animateCounter(el));
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    const observe = () => document.querySelectorAll('.stats-bar,.stats-section').forEach(el => obs.observe(el));
    observe(); setTimeout(observe, 300);
  },

  _animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target')) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const start  = performance.now();
    const update = now => {
      const p = Math.min((now - start) / 2200, 1);
      el.textContent = Math.floor((1-(1-p)*(1-p)) * target).toLocaleString('en-IN') + suffix;
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  },

  /* ── ACCORDIONS ────────────────────────────────────────────── */
  initAccordions() {
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const isOpen = item.classList.contains('open');
        item.parentElement.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
        trigger.setAttribute('aria-expanded', !isOpen);
      });
    });
  },

  /* ── TABS ──────────────────────────────────────────────────── */
  initTabs() {
    document.querySelectorAll('.tab-nav').forEach(nav => {
      nav.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tabId = btn.getAttribute('data-tab');
          const scope = nav.closest('.tab-wrapper') || document;
          nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          scope.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
          scope.querySelector('#' + tabId)?.classList.add('active');
        });
      });
    });
  },

  /* ── FORMS ─────────────────────────────────────────────────── */
  initForms() {
    setTimeout(() => {
      const nl = document.getElementById('newsletter-form');
      if (nl) {
        nl.addEventListener('submit', e => {
          e.preventDefault();
          const email = nl.querySelector('#newsletter-email')?.value;
          if (!email || !email.includes('@')) { this.toast('Please enter a valid email.', 'error'); return; }
          this.toast('✅ Subscribed! Welcome to Al Khalis Newsletter.', 'success');
          nl.reset();
        });
      }
    }, 500);
  },

  /* ── STARS ─────────────────────────────────────────────────── */
  initStars() {
    const c = document.querySelector('.hero__stars');
    if (!c) return;
    for (let i = 0; i < 28; i++) {
      const s = document.createElement('div'); s.className = 'star';
      const sz = Math.random()*2.5+1;
      s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${(Math.random()*3+2).toFixed(1)}s;--delay:${(Math.random()*3).toFixed(1)}s`;
      c.appendChild(s);
    }
  },

  /* ── ACTIVE NAV ────────────────────────────────────────────── */
  setActiveNav() {
    setTimeout(() => {
      const current = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
        const href = (link.getAttribute('href') || '').split('/').pop();
        if (href === current || (current === '' && href === 'index.html')) link.classList.add('active');
      });
    }, 100);
  },

  /* ── TOAST ─────────────────────────────────────────────────── */
  toast(message, type = 'success', duration = 4500) {
    let container = document.querySelector('.toast-container');
    if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
    const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `<span class="toast__icon">${icons[type]||'✅'}</span><span class="toast__msg">${message}</span><button class="toast__close" aria-label="Close">✕</button>`;
    toast.querySelector('.toast__close').addEventListener('click', () => { toast.classList.add('hiding'); setTimeout(() => toast.remove(), 350); });
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('hiding'); setTimeout(() => toast.remove(), 350); }, duration);
  },
};

window.AlKhalis.App = App;

/* ── SOCIAL MENU TOGGLE ──────────────────────────────────────── */
window.AlKhalis.toggleSocialMenu = function() {
  const menu   = document.getElementById('socialMenu');
  const toggle = document.getElementById('socialToggle');
  if (!menu || !toggle) return;
  const isOpen = menu.classList.toggle('active');
  toggle.setAttribute('aria-expanded', isOpen);
  if (isOpen) {
    setTimeout(() => {
      document.addEventListener('click', function handler(e) {
        if (!menu.contains(e.target)) {
          menu.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
          document.removeEventListener('click', handler);
        }
      });
    }, 10);
  }
};

/* ── AUTO-INIT ───────────────────────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
