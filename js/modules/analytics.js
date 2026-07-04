/* ================================================================
   ANALYTICS.JS — Google Analytics 4, Facebook Pixel,
                  Conversion Tracking, Event Helpers
   ================================================================
   HOW TO USE:
   1. Replace 'G-XXXXXXXXXX' with your real GA4 Measurement ID
   2. Replace '0000000000000' with your real Facebook Pixel ID
   3. This file fires events automatically on key interactions
   ================================================================ */

'use strict';

window.AlKhalis = window.AlKhalis || {};

window.AlKhalis.Analytics = {

  config: {
    GA4_ID:      'G-XXXXXXXXXX',   // ← Replace with your GA4 ID
    FB_PIXEL_ID: '0000000000000',  // ← Replace with your Facebook Pixel ID
    debug:       false,            // Set true to log events to console
  },

  init() {
    this.loadGA4();
    this.loadFBPixel();
    this.trackPageView();
    this.bindAutoEvents();
    if (this.config.debug) console.info('%c📊 AlKhalis Analytics ready', 'color:#C9A84C;font-weight:700');
  },

  /* ── GOOGLE ANALYTICS 4 ───────────────────────────────────── */
  loadGA4() {
    if (!this.config.GA4_ID || this.config.GA4_ID.includes('X')) return;

    const script = document.createElement('script');
    script.async = true;
    script.src   = `https://www.googletagmanager.com/gtag/js?id=${this.config.GA4_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', this.config.GA4_ID, {
      page_title:    document.title,
      page_location: window.location.href,
      // Privacy: anonymise IP (EU compliance)
      anonymize_ip: true,
      // Cookie settings
      cookie_flags: 'SameSite=None;Secure',
    });
  },

  /* ── FACEBOOK PIXEL ───────────────────────────────────────── */
  loadFBPixel() {
    if (!this.config.FB_PIXEL_ID || this.config.FB_PIXEL_ID.includes('0000')) return;

    !function(f,b,e,v,n,t,s) {
      if(f.fbq)return; n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
      n.queue=[]; t=b.createElement(e); t.async=!0;
      t.src=v; s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', this.config.FB_PIXEL_ID);
    fbq('track', 'PageView');
  },

  /* ── PAGE VIEW ────────────────────────────────────────────── */
  trackPageView() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    this.event('page_view', { page_title: document.title, page_path: page });
  },

  /* ── GENERIC EVENT ────────────────────────────────────────── */
  event(name, params = {}) {
    if (this.config.debug) console.log('📊 Event:', name, params);

    // GA4
    if (typeof gtag === 'function') {
      gtag('event', name, { ...params, send_to: this.config.GA4_ID });
    }

    // Facebook Pixel
    if (typeof fbq === 'function') {
      const fbMap = {
        'form_submit':   'Lead',
        'phone_click':   'Contact',
        'whatsapp_click':'Contact',
        'package_view':  'ViewContent',
        'flight_search': 'Search',
        'book_now_click':'InitiateCheckout',
      };
      if (fbMap[name]) fbq('track', fbMap[name], params);
    }

    // Push to dataLayer (GTM compatible)
    if (window.dataLayer) {
      window.dataLayer.push({ event: name, ...params });
    }
  },

  /* ── AUTO EVENT BINDING ───────────────────────────────────── */
  bindAutoEvents() {
    // Phone number clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(el => {
      el.addEventListener('click', () => {
        this.event('phone_click', {
          phone_number: el.getAttribute('href').replace('tel:', ''),
          event_category: 'Contact',
          event_label: 'Phone Call',
        });
      });
    });

    // WhatsApp clicks
    document.querySelectorAll('a[href*="wa.me"], .wa-float').forEach(el => {
      el.addEventListener('click', () => {
        this.event('whatsapp_click', {
          event_category: 'Contact',
          event_label: 'WhatsApp',
        });
      });
    });

    // Email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
      el.addEventListener('click', () => {
        this.event('email_click', {
          email: el.getAttribute('href').replace('mailto:', ''),
          event_category: 'Contact',
        });
      });
    });

    // Form submissions
    document.querySelectorAll('form[data-ajax]').forEach(form => {
      form.addEventListener('submit', () => {
        const formId = form.id || form.closest('[id]')?.id || 'unknown_form';
        this.event('form_submit', {
          form_id:        formId,
          form_name:      form.getAttribute('data-form-name') || formId,
          event_category: 'Lead Generation',
          event_label:    'Enquiry Form',
          value:          1,
        });
        // FB Pixel Lead event
        if (typeof fbq === 'function') fbq('track', 'Lead');
      });
    });

    // Book Now / CTA clicks
    document.querySelectorAll('.btn--gold, [data-track="book"]').forEach(el => {
      el.addEventListener('click', () => {
        this.event('book_now_click', {
          label:          el.textContent.trim(),
          event_category: 'Conversion',
          event_label:    'Book Now CTA',
        });
      });
    });

    // Scroll depth milestones
    this._trackScrollDepth();

    // Time on page (fires at 30s, 60s, 120s)
    this._trackEngagement();

    // Outbound links
    document.querySelectorAll('a[href^="http"]').forEach(el => {
      if (!el.href.includes(window.location.hostname)) {
        el.addEventListener('click', () => {
          this.event('outbound_link', {
            url:            el.href,
            event_category: 'Outbound',
          });
        });
      }
    });
  },

  /* ── SCROLL DEPTH TRACKING ────────────────────────────────── */
  _trackScrollDepth() {
    const milestones = [25, 50, 75, 90, 100];
    const fired      = new Set();

    window.addEventListener('scroll', () => {
      const scrolled = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      milestones.forEach(m => {
        if (scrolled >= m && !fired.has(m)) {
          fired.add(m);
          this.event('scroll_depth', {
            depth:          m,
            event_category: 'Engagement',
            event_label:    `${m}% Scroll`,
          });
        }
      });
    }, { passive: true });
  },

  /* ── TIME ON PAGE ─────────────────────────────────────────── */
  _trackEngagement() {
    [30, 60, 120].forEach(seconds => {
      setTimeout(() => {
        this.event('time_on_page', {
          seconds,
          event_category: 'Engagement',
          event_label:    `${seconds}s on page`,
        });
      }, seconds * 1000);
    });
  },

  /* ── CONVERSION HELPERS (call manually from pages) ───────── */
  trackFlightSearch(from, to, date, passengers) {
    this.event('flight_search', {
      from, to, date, passengers,
      event_category: 'Flight',
      event_label:    `${from} → ${to}`,
    });
    if (typeof fbq === 'function') fbq('track', 'Search', { search_string: `${from} to ${to}` });
  },

  trackVisaEnquiry(country, type) {
    this.event('visa_enquiry', {
      country, visa_type: type,
      event_category: 'Visa',
      event_label:    `${type} - ${country}`,
    });
  },

  trackPackageView(name, price) {
    this.event('package_view', {
      package_name:   name,
      value:          price,
      currency:       'INR',
      event_category: 'Package',
    });
    if (typeof fbq === 'function') fbq('track', 'ViewContent', { content_name: name, value: price, currency: 'INR' });
  },

  trackUmrahEnquiry(tier, price) {
    this.event('umrah_enquiry', {
      tier, price,
      event_category: 'Hajj & Umrah',
      event_label:    `${tier} - ₹${price}`,
      value:          price,
      currency:       'INR',
    });
  },
};

/* ── AUTO-INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  window.AlKhalis.Analytics.init();
});
