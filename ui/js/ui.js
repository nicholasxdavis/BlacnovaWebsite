document.addEventListener('DOMContentLoaded', function () {
            const canvas = document.getElementById('cta-particles');
            if (canvas) {
                const container = canvas.parentElement;
                const ctx = canvas.getContext('2d');
                let particles = [];
                const particleCount = 50;

                function resizeCanvas() {
                    if (container && container.offsetWidth > 0 && container.offsetHeight > 0) {
                        canvas.width = container.offsetWidth;
                        canvas.height = container.offsetHeight;
                    }
                }

                class Particle {
                    constructor() {
                        this.radius = Math.random() * 1.5 + 0.5;
                        this.color = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`;
                        this.reset();
                    }

                    reset() {
                        this.x = Math.random() * canvas.width;
                        this.y = Math.random() * canvas.height;
                        this.vx = (Math.random() - 0.5) * 0.5;
                        this.vy = (Math.random() - 0.5) * 0.5;
                    }

                    draw() {
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                        ctx.fillStyle = this.color;
                        ctx.fill();
                    }

                    update() {
                        this.x += this.vx;
                        this.y += this.vy;

                        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                            this.reset();
                            this.x = Math.random() * canvas.width;
                            this.y = Math.random() > 0.5 ? 0 : canvas.height;
                        }
                    }
                }

                function initParticles() {
                    particles = [];
                    if (canvas.width > 0) {
                        for (let i = 0; i < particleCount; i++) {
                            particles.push(new Particle());
                        }
                    }
                }

                function animate() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    for (const particle of particles) {
                        particle.update();
                        particle.draw();
                    }

                    requestAnimationFrame(animate);
                }

                if (container) {
                    const resizeObserver = new ResizeObserver(() => {
                        resizeCanvas();
                        initParticles();
                    });
                    resizeObserver.observe(container);
                }

                resizeCanvas();
                initParticles();
                animate();
            }

            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const closeMenuButton = document.getElementById('close-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const menuOverlay = document.getElementById('menu-overlay');
            const header = document.querySelector('.header');
            const headerContent = document.querySelector('.header-content');
            const logo = document.querySelector('.logo');
            const yearSpan = document.getElementById('year');

            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }

            // Mobile dropdown functionality
            const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
            mobileDropdownBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const dropdownContent = this.nextElementSibling;
                    const arrow = this.querySelector('svg');
                    
                    // Toggle this dropdown
                    dropdownContent.classList.toggle('open');
                    arrow.classList.toggle('rotate-0');
                    arrow.classList.toggle('rotate-180');
                    
                    // Close other dropdowns
                    document.querySelectorAll('.mobile-dropdown-content').forEach(content => {
                        if (content !== dropdownContent && content.classList.contains('open')) {
                            content.classList.remove('open');
                            content.previousElementSibling.querySelector('svg').classList.add('rotate-0');
                            content.previousElementSibling.querySelector('svg').classList.remove('rotate-180');
                        }
                    });
                });
            });

            const openMenu = () => {
                mobileMenu.classList.replace('closed', 'open');
                menuOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                mobileMenuButton.setAttribute('aria-expanded', 'true');
                closeMenuButton.focus();
            };

            const closeMenu = () => {
                if (!mobileMenu.classList.contains('open')) return;
                mobileMenu.classList.replace('open', 'closed');
                menuOverlay.classList.add('hidden');
                document.body.style.overflow = '';
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenuButton.focus();
                
                // Close all dropdowns when menu closes
                document.querySelectorAll('.mobile-dropdown-content').forEach(content => {
                    content.classList.remove('open');
                });
                document.querySelectorAll('.mobile-dropdown-btn svg').forEach(arrow => {
                    arrow.classList.add('rotate-0');
                    arrow.classList.remove('rotate-180');
                });
            };

            if (mobileMenu instanceof HTMLDialogElement) {
                const desktop = window.matchMedia('(min-width: 1024px)');
                mobileMenuButton.addEventListener('click', () => {
                    mobileMenu.showModal();
                    document.documentElement.classList.add('bn-home-menu-open');
                    mobileMenuButton.setAttribute('aria-expanded', 'true');
                });
                const dismiss = () => mobileMenu.close();
                closeMenuButton.addEventListener('click', dismiss);
                mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', dismiss));
                mobileMenu.addEventListener('close', () => {
                    document.documentElement.classList.remove('bn-home-menu-open');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                });
                desktop.addEventListener('change', event => {
                    if (event.matches && mobileMenu.open) dismiss();
                });
            } else if (mobileMenu && mobileMenuButton && closeMenuButton && menuOverlay) {
                mobileMenuButton.addEventListener('click', openMenu);
                closeMenuButton.addEventListener('click', closeMenu);
                menuOverlay.addEventListener('click', closeMenu);
                document.addEventListener('keydown', event => {
                    if (event.key === 'Escape') closeMenu();
                });
                window.matchMedia('(min-width: 768px)').addEventListener('change', event => {
                    if (event.matches) closeMenu();
                });
                mobileMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', closeMenu);
                });
            }

            const handleScroll = () => {
                if (header && headerContent && logo) {
                    const isScrolled = window.scrollY > 50;
                    header.classList.toggle('scrolled', isScrolled);
                    headerContent.classList.toggle('h-16', isScrolled);
                    headerContent.classList.toggle('h-24', !isScrolled);
                    logo.classList.toggle('h-12', isScrolled);
                    logo.classList.toggle('h-20', !isScrolled);
                }
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            // Initialize scroll state
            handleScroll();
        });
