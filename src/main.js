document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Set current year
  const yearNode = document.querySelector('#current-year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear().toString();
  }

  // Escape key to close mobile menu
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const links = document.querySelector('.nav-links');
      if (links && links.classList.contains('mobile-active')) {
        links.classList.remove('mobile-active');
      }
    }
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 60 * (i % 4));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // Smooth nav background
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu toggle
  window.toggleMobileMenu = function() {
    const links = document.querySelector('.nav-links');
    if (!links) return;
    links.classList.toggle('mobile-active');
  };

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      const links = document.querySelector('.nav-links');
      if (links) links.classList.remove('mobile-active');
    });
  });

  // Animate stat numbers
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      if (el) {
        el.innerHTML = Math.floor(start) + '<span>' + suffix + '</span>';
      }
      if (start >= target) clearInterval(timer);
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stats = entry.target.querySelectorAll('.stat-num');
        const data = [
          { val: 500, suffix: '+' }, { val: 50, suffix: '+' },
          { val: 10, suffix: '+' }, { val: 95, suffix: '%' }
        ];
        stats.forEach((stat, i) => {
          if (data[i]) animateCounter(stat, data[i].val, data[i].suffix);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsDisplay = document.querySelector('.hero-stats');
  if (statsDisplay) statsObserver.observe(statsDisplay);
});

// Form submit (global for onclick)
window.handleSubmit = function(btn) {
  const originalText = btn.innerHTML;
  btn.innerHTML = '<svg class="lucide-check icon-med inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Message Sent! We\'ll be in touch soon.';
  btn.classList.add('btn-success');
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.classList.remove('btn-success');
    btn.disabled = false;
  }, 4000);
};
