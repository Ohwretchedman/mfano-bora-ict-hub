/**
 * MFANO HUB — Production Engine
 * Professional, Robust, and Secure Website Logic
 */

const MOBILE_BP = 992;

/* ── Global Error Handling ── */
window.addEventListener('error', (event) => {
  console.error('[Mfano Engine] Error captured:', {
    message: event.message,
    source: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
  // Production monitoring would go here
});

window.addEventListener('unhandledrejection', (event) => {
  console.warn('[Mfano Engine] Unhandled Promise Rejection:', event.reason);
});

/* ── Utilities ── */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const throttle = (fn, ms) => {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) { last = now; fn(...args); }
  };
};

/* ── Academy Style Mobile Menu Engine ── */

function closeMenu() {
  const nav = $('.nav-links');
  const btn = $('#menuToggle');
  const overlay = $('.nav-overlay');
  const mainNav = $('nav');
  if (!nav || !btn) return;

  nav.classList.remove('open');
  btn.classList.remove('is-active');
  btn.setAttribute('aria-expanded', 'false');
  if (overlay) overlay.classList.remove('open');
  if (mainNav) mainNav.classList.remove('menu-open');
  document.body.style.overflow = '';
}

function openMenu() {
  const nav = $('.nav-links');
  const btn = $('#menuToggle');
  const overlay = $('.nav-overlay');
  const mainNav = $('nav');
  if (!nav || !btn) return;

  nav.classList.add('open');
  btn.classList.add('is-active');
  btn.setAttribute('aria-expanded', 'true');
  if (overlay) overlay.classList.add('open');
  if (mainNav) mainNav.classList.add('menu-open');
  document.body.style.overflow = 'hidden';
}

window.toggleMobileMenu = function () {
  const nav = $('.nav-links');
  if (nav && nav.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
};

// Bind the toggle to the new ID
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", window.toggleMobileMenu);
  }
});

/* ── Form Handler with Exceptional Error Handling ── */

window.handleSubmit = function (btn) {
  try {
    const form = btn.closest('form');
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="loader"></span> Sending...';

    // Simulated Secure API Call
    setTimeout(() => {
      try {
        // Success Logic
        btn.innerHTML = '✓ Message Sent!';
        btn.classList.add('btn-success');
        if (form) form.reset();

        setTimeout(() => {
          btn.innerHTML = original;
          btn.classList.remove('btn-success');
          btn.disabled = false;
        }, 4000);
      } catch (innerError) {
        throw new Error('Callback execution failed');
      }
    }, 1500);

  } catch (error) {
    console.error('[Form] Submission error:', error);
    btn.innerHTML = 'Submission Error. Retry?';
    btn.classList.add('btn-error');
    btn.disabled = false;
    
    setTimeout(() => {
      btn.classList.remove('btn-error');
      btn.innerHTML = 'Send Message';
    }, 3000);
  }
};

/* ── Initialization ── */

document.addEventListener('DOMContentLoaded', () => {
  try {
    // Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Footer year
    const yr = $('#current-year');
    if (yr) yr.textContent = new Date().getFullYear();

    // Close menu listeners
    const overlay = $('.nav-overlay');
    if (overlay) overlay.addEventListener('click', closeMenu);

    const navLinksList = $('.nav-links');
    if (navLinksList && !$('.menu-close-btn')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'menu-close-btn mobile-only';
      closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      closeBtn.onclick = closeMenu;
      closeBtn.setAttribute('aria-label', 'Close menu');
      navLinksList.prepend(closeBtn);
    }

    $$('.nav-links a').forEach((a) => a.addEventListener('click', closeMenu));

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', throttle(() => {
      if (window.innerWidth > MOBILE_BP) closeMenu();
    }, 200));

    // Scroll handlers
    const navEl = $('nav');
    if (navEl) {
      window.addEventListener('scroll', throttle(() => {
        navEl.classList.toggle('scrolled', window.scrollY > 60);
      }, 100));
    }

    // Intersection Observer for Reveal
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), 50 * (i % 4));
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    $$('.reveal').forEach((el) => revealObs.observe(el));

    // Stats counter engine
    const animateNum = (el, target, suffix) => {
      let cur = 0;
      const duration = 1500;
      const step = target / (duration / 16);
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) {
          el.textContent = target + suffix;
          clearInterval(t);
        } else {
          el.textContent = Math.floor(cur) + suffix;
        }
      }, 16);
    };

    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const nums = e.target.querySelectorAll('.stat-num');
          const cfg = [
            { v: 500, s: '+' }, { v: 50, s: '+' },
            { v: 10, s: '+' }, { v: 95, s: '%' },
          ];
          nums.forEach((n, i) => { if (cfg[i]) animateNum(n, cfg[i].v, cfg[i].s); });
          statsObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    const stats = $('.hero-stats');
    if (stats) statsObs.observe(stats);

  
    // Footer link rotators setup
    const setupRotator = (selector) => {
      const rotator = $(selector);
      if (!rotator) return;
      
      const batches = rotator.querySelectorAll('.rotator-batch');
      if (batches.length <= 1) return;
      
      let currentIndex = 0;
      
      setInterval(() => {
        batches[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % batches.length;
        batches[currentIndex].classList.add('active');
      }, 8000); // Rotates every 8 seconds
    };

    setupRotator('#quick-links-rotator');
    setupRotator('#training-areas-rotator');

  } catch (initError) {
    console.error('[Engine] Initialization failed:', initError);
  }
});
