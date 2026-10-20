document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const nav = document.getElementById('navbarNav');
  if (nav && window.bootstrap) {
    const collapse = bootstrap.Collapse.getOrCreateInstance(nav, { toggle: false });
    nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 991.98px)').matches) collapse.hide();
      });
    });
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.navbar .nav-link')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach(section => observer.observe(section));
  }
});
