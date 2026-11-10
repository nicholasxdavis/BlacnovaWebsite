(() => {
    const button = document.getElementById('mobile-menu-button');
    if (!button) return;

    document.body.insertAdjacentHTML('beforeend', `
        <dialog id="mobile-menu" class="bn-site-menu" aria-label="Site menu">
            <div class="bn-site-menu__top">
                <button type="button" autofocus aria-label="Close menu">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-width="2" d="M6 18 18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <nav aria-label="Mobile navigation">
                <a href="/">Home</a>
                <details>
                    <summary>Services</summary>
                    <a href="/las-cruces-web-design/">Web Design</a>
                    <a href="/las-cruces-web-development/">Web Development</a>
                    <a href="/las-cruces-seo/">Local SEO</a>
                    <a href="/#services">All Services</a>
                </details>
                <a href="/pages/projects/">Client Projects</a>
                <a href="/pages/about/">About Us</a>
                <a href="https://blog.blacnova.net/" target="_blank" rel="noopener noreferrer">Blog</a>
                <a href="/#contact">Contact Us</a>
                <a href="/#quote">Get Quote</a>
                <a class="bn-site-menu__dashboard" href="https://dashboard.blacnova.net/">Dashboard</a>
            </nav>
        </dialog>
    `);

    const menu = document.getElementById('mobile-menu');
    const closeButton = menu.querySelector('button');
    const desktop = window.matchMedia('(min-width: 1024px)');
    const currentPath = location.pathname.replace(/index\.html$/, '');

    for (const link of menu.querySelectorAll('a')) {
        if (link.getAttribute('href') === currentPath) {
            link.setAttribute('aria-current', 'page');
            if (link.closest('details')) link.closest('details').open = true;
        }
        link.addEventListener('click', () => menu.close());
    }

    button.addEventListener('click', () => {
        if (desktop.matches || menu.open) return;
        menu.showModal();
        button.setAttribute('aria-expanded', 'true');
    });
    closeButton.addEventListener('click', () => menu.close());
    menu.addEventListener('close', () => button.setAttribute('aria-expanded', 'false'));
    desktop.addEventListener('change', event => {
        if (event.matches && menu.open) menu.close();
    });
})();
