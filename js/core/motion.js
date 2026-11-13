/* ================================================================
   MOTION.JS — scroll reveal + scroll progress bar
   Tiny (no libraries). Only items that start BELOW the first screen
   get hidden-then-revealed, so nothing above the fold ever flashes
   and Google always sees the content.
   ================================================================ */
(function () {
  'use strict';
  if (!('IntersectionObserver' in window)) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scroll progress bar */
  if (!reduce) {
    var bar = document.createElement('div');
    bar.className = 'motion-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var ticking = false;
    var update = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(window.scrollY / h, 1) : 0) + ')';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  if (reduce) return;

  /* Scroll reveal for cards and headings */
  var SELECTOR = [
    '.service-card', '.dest-card', '.testi-card', '.blog-card', '.visa-card',
    '.hajj-tier-card', '.departure-card', '.visa-step', '.accordion-item',
    '.partner-card', '.section-header', '.why-card-img-wrap', '.contact-detail'
  ].join(',');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('m-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function scan() {
    var fold = window.innerHeight;
    var groups = new Map();
    document.querySelectorAll(SELECTOR).forEach(function (el) {
      if (el.dataset.motion) return;
      el.dataset.motion = '1';
      /* skip anything the older reveal system already animates */
      if (el.closest('.reveal, .reveal-group')) return;
      if (el.getBoundingClientRect().top < fold) return;   // already on screen
      /* stagger siblings in the same grid */
      var parent = el.parentElement;
      var i = groups.get(parent) || 0;
      groups.set(parent, i + 1);
      el.style.setProperty('--m-delay', Math.min(i % 4, 3) * 0.09 + 's');
      el.classList.add('m-reveal');
      io.observe(el);
    });
  }

  function start() {
    scan();
    /* cards rendered later by JS (nav, packages, blog lists) */
    setTimeout(scan, 400);
    setTimeout(scan, 1200);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
