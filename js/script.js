// Lightweight interactions: preloader, mobile navigation, scroll progress and reveal effects.
(() => {
  const preloader = document.getElementById('preloader');
  const hideLoader = () => preloader && preloader.classList.add('is-hidden');
  window.addEventListener('load', hideLoader, { once: true });
  // Fallback for slow external font/image requests.
  window.setTimeout(hideLoader, 1800);

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const closeMenu = () => {
    nav?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 680) closeMenu(); });

  const progress = document.getElementById('progress');
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = `${percent}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Reveal elements gently as they enter the viewport; content remains visible without JS.
  const revealTargets = document.querySelectorAll('.section-kicker, .about-grid, .project-card, .toolbox-grid, .journey-grid, .credentials-grid, .contact-panel');
  if ('IntersectionObserver' in window) {
    revealTargets.forEach(el => el.classList.add('will-reveal'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach(el => observer.observe(el));
  }
})();
