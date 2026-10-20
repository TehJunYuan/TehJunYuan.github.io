document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const themeButton = document.getElementById('theme-toggle');
  const themeIcon = themeButton?.querySelector('i');
  const themeLabel = themeButton?.querySelector('span');
  const applyTheme = theme => {
    document.documentElement.dataset.theme = theme;
    if (themeIcon) themeIcon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    if (themeLabel) themeLabel.textContent = theme === 'dark' ? 'Light' : 'Dark';
    if (themeButton) {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      themeButton.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
      themeButton.title = `Switch to ${nextTheme} theme`;
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#11152b' : '#eeedf4');
  };
  applyTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  themeButton?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try { localStorage.setItem('portfolio-theme', nextTheme); } catch {}
  });

  const nav = document.getElementById('navbarNav');
  if (nav && window.bootstrap) {
    const collapse = bootstrap.Collapse.getOrCreateInstance(nav, { toggle: false });
    nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 991.98px)').matches) collapse.hide();
      });
    });
  }

  const lightbox = document.getElementById('image-lightbox');
  const lightboxImage = lightbox?.querySelector('.image-lightbox-image');
  const lightboxCaption = lightbox?.querySelector('.image-lightbox-caption');
  const closeLightbox = lightbox?.querySelector('.image-lightbox-close');
  document.querySelectorAll('.project-gallery .gallery-grid img').forEach(image => {
    const caption = image.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || image.alt;
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Enlarge screenshot: ${caption}`);
    image.addEventListener('click', () => {
      if (!lightbox || !lightboxImage || !lightboxCaption) return;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = caption;
      lightbox.showModal();
    });
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        image.click();
      }
    });
  });
  closeLightbox?.addEventListener('click', () => lightbox?.close());
  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });

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
