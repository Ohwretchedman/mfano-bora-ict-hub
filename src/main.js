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

function registerFormHandler(formId, submitText, processingText, successText, onSubmitSuccess) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    if (!btn || btn.disabled) return;

    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="loader"></span> ${processingText}`;

    setTimeout(() => {
      try {
        if (onSubmitSuccess) {
          onSubmitSuccess(form, btn, originalHTML);
        } else {
          // Default Success State
          btn.innerHTML = `✓ ${successText}`;
          btn.classList.add('btn-success');
          form.reset();

          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('btn-success');
            btn.disabled = false;
          }, 4000);
        }
      } catch (error) {
        console.error(`[Form] Submission error in ${formId}:`, error);
        btn.innerHTML = 'Submission Error. Retry?';
        btn.classList.add('btn-error');
        btn.disabled = false;

        setTimeout(() => {
          btn.classList.remove('btn-error');
          btn.innerHTML = originalHTML;
        }, 3000);
      }
    }, 1500);
  });
}

// Bind all forms cleanly on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // 1. General Contact Forms
  registerFormHandler('contact-form', 'Send Message', 'Sending...', 'Message Sent!', null);
  registerFormHandler('home-contact-form', 'Send Message', 'Sending...', 'Message Sent!', null);

  // 2. Student Enrollment Form
  registerFormHandler('enrollment-form', 'Submit Enrollment Application', 'Processing Admission...', 'Enrollment Submitted', (form, btn, originalHTML) => {
    const studentName = document.getElementById('student-name').value;
    const studentCourse = document.getElementById('student-course').value;

    const alertOverlay = document.createElement('div');
    alertOverlay.className = 'enroll-success-overlay';

    const alertBox = document.createElement('div');
    alertBox.className = 'glass-panel enroll-success-box';
    alertBox.innerHTML = `
        <div class="enroll-success-icon-wrap">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="var(--cyan)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        <h3 class="enroll-success-title">Application Successful!</h3>
        <p class="enroll-success-student">Congratulations, ${studentName}!</p>
        <p class="enroll-success-text">
            Your registration for <strong>${studentCourse}</strong> has been successfully received. We have reserved your slot. An admissions counselor will contact you at your email and phone number within 24 hours to guide you through your class timetable, required documents, and tuition orientation.
        </p>
        <button id="close-enroll-alert" class="btn-primary enroll-success-close-btn">Explore Mfano Hub →</button>
    `;

    alertOverlay.appendChild(alertBox);
    document.body.appendChild(alertOverlay);

    document.getElementById('close-enroll-alert').onclick = function () {
        alertOverlay.remove();
        form.reset();
        window.location.href = './courses.html';
    };

    btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Enrollment Submitted`;
    btn.disabled = false;
  });

  // 3. Strategic Partner Form
  registerFormHandler('partner-form', 'Submit Strategic Brief', 'Reviewing Brief...', 'Brief Received!', (form, btn, originalHTML) => {
    const orgName = document.getElementById('org-name').value;
    const partnerType = document.getElementById('partnership-type').value;

    const alertOverlay = document.createElement('div');
    alertOverlay.className = 'enroll-success-overlay';

    const alertBox = document.createElement('div');
    alertBox.className = 'enroll-success-box';
    alertBox.innerHTML = `
        <div class="success-icon-wrap">
            <svg class="lucide-check-circle success-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        </div>
        <h3>Brief Received!</h3>
        <p class="success-p-main">Thank you, <strong>${orgName}</strong>, for submitting your <strong>${partnerType}</strong> strategic brief.</p>
        <p class="success-p-sub">Our executive board of directors will review your brief details and schedule a direct Zoom conference call within 24 hours.</p>
        <button class="btn btn-primary w-full mt-4" id="close-partner-alert">Return to Services</button>
    `;

    alertOverlay.appendChild(alertBox);
    document.body.appendChild(alertOverlay);

    document.getElementById('close-partner-alert').onclick = function () {
        alertOverlay.remove();
        form.reset();
        window.location.href = './services.html';
    };

    btn.innerHTML = originalHTML;
    btn.disabled = false;
  });

  // 4. Feedback Hub Form
  registerFormHandler('feedback-form', 'Submit Feedback Portfolio', 'Packaging Portfolio...', 'Feedback Integrated!', (form, btn, originalHTML) => {
    const webRatingInput = document.querySelector('input[name="web-rating"]:checked');
    const companyRatingInput = document.querySelector('input[name="company-rating"]:checked');

    const webRating = webRatingInput ? webRatingInput.value : 'N/A';
    const companyRating = companyRatingInput ? companyRatingInput.value : 'N/A';

    const alertOverlay = document.createElement('div');
    alertOverlay.className = 'enroll-success-overlay';

    const alertBox = document.createElement('div');
    alertBox.className = 'enroll-success-box';
    alertBox.innerHTML = `
        <div class="success-icon-wrap">
            <svg class="lucide-heart success-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
        </div>
        <h3>Feedback Integrated!</h3>
        <p class="success-p-main">Web Rating: <strong>${webRating}</strong> | Company Rating: <strong>${companyRating}</strong></p>
        <p class="success-p-sub">Thank you for sharing your feedback. Your suggestions for both the website experience and Mfano Africa's institutional operations have been delivered directly to our core administration squad!</p>
        <button class="btn btn-primary w-full mt-4" id="close-feedback-alert">Back to Home</button>
    `;

    alertOverlay.appendChild(alertBox);
    document.body.appendChild(alertOverlay);

    document.getElementById('close-feedback-alert').onclick = function () {
        alertOverlay.remove();
        form.reset();
        window.location.href = './index.html';
    };

    btn.innerHTML = originalHTML;
    btn.disabled = false;
  });
});

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

