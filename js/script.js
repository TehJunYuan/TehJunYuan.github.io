'use strict';
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 801px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();
const galleries = {
  oas: { title: 'SUC Online Admission System', images: [
    ['images/oas/LandingPage.png', 'Application landing page'],
    ['images/oas/SettingPersonalProfile.png', 'Setting up a personal profile'],
    ['images/oas/select_programmes.png', 'Programme selection'],
    ['images/oas/application_progress.png', 'Application progress'],
    ['images/oas/aaro_admin_dashboard.png', 'Admissions administration dashboard'],
    ['images/oas/finance_admin_dashboard.png', 'Finance administration dashboard'],
    ['images/oas/admin_communicate_chat.png', 'Administrative communication']
  ]},
  movie: { title: 'MovieMoment', images: [
    ['images/moviemoment/movie-details.png', 'Movie details'],
    ['images/moviemoment/movie-recommendation.png', 'Movie recommendations'],
    ['images/moviemoment/movie-community-1.png', 'Movie community'],
    ['images/moviemoment/movie-community-2.png', 'Community discussions'],
    ['images/moviemoment/reward-system.png', 'Reward system']
  ]}
};
const dialog = document.querySelector('#gallery');
let activeGallery, imageIndex = 0;
function renderImage() {
  const [src, caption] = activeGallery.images[imageIndex];
  document.querySelector('#gallery-image').src = src;
  document.querySelector('#gallery-image').alt = caption;
  document.querySelector('#gallery-caption').textContent = `${imageIndex + 1} / ${activeGallery.images.length} — ${caption}`;
}
function advanceImage(direction) { imageIndex = (imageIndex + direction + activeGallery.images.length) % activeGallery.images.length; renderImage(); }
document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => {
  activeGallery = galleries[button.dataset.gallery]; imageIndex = 0;
  document.querySelector('#gallery-title').textContent = activeGallery.title;
  renderImage(); dialog.showModal(); document.body.classList.add('gallery-open');
}));
document.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
document.querySelector('#gallery-prev').addEventListener('click', () => advanceImage(-1));
document.querySelector('#gallery-next').addEventListener('click', () => advanceImage(1));
dialog.addEventListener('keydown', event => { if (event.key === 'ArrowLeft') { event.preventDefault(); advanceImage(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); advanceImage(1); } });
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => document.body.classList.remove('gallery-open'));
const sectionObserver = new IntersectionObserver(entries => { for (const entry of entries) { if (entry.isIntersecting) navigation.querySelectorAll('a').forEach(link => { const active = link.hash === `#${entry.target.id}`; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
