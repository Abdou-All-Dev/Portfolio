// Abdellah Aounallah – Static Portfolio JS
(function () {
  const navbar = document.getElementById('navbar');
  const year = document.getElementById('year');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.getElementById('mobileMenu');

  // Footer year
  if (year) year.textContent = String(new Date().getFullYear());

  // Navbar scroll state
  function onScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth scrolling for links/buttons
  function smoothScrollTo(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-scroll]');
    const btn = e.target.closest('[data-scroll-to]');
    if (a && a.getAttribute('href')?.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(a.getAttribute('href'));
      closeMobileMenu();
    }
    if (btn) {
      e.preventDefault();
      const to = btn.getAttribute('data-scroll-to');
      if (to) smoothScrollTo(to);
      closeMobileMenu();
    }
  });

  // Mobile menu
  function openMobileMenu() {
    if (!mobileMenu || !mobileToggle) return;
    mobileMenu.hidden = false;
    mobileToggle.setAttribute('aria-expanded', 'true');
    // change icon to "X"
    mobileToggle.querySelector('.icon-menu')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileToggle) return;
    mobileMenu.hidden = true;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.querySelector('.icon-menu')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', () => {
    if (!mobileMenu) return;
    if (mobileMenu.hidden) openMobileMenu();
    else closeMobileMenu();
  });

  // Close menu on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Scroll reveal (IntersectionObserver) with optional delay attribute
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
        window.setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach((el) => obs.observe(el));
})();
