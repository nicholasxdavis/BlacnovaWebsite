(function () {
  const openBtn = document.getElementById('mobile-menu-button');
  const closeBtn = document.getElementById('close-menu-button');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  if (!openBtn || !closeBtn || !menu || !overlay) return;

  const openMenu = () => {
    menu.classList.add('is-open');
    overlay.classList.add('is-open');
    menu.removeAttribute('hidden');
    overlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    openBtn.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
  };

  const closeMenu = () => {
    const wasOpen = menu.classList.contains('is-open');
    menu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    menu.setAttribute('hidden', '');
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
    openBtn.setAttribute('aria-expanded', 'false');
    if (wasOpen) openBtn.focus();
  };

  // Start closed even if markup omitted hidden
  closeMenu();

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
})();
