/**
 * Contact Popup Injector
 *
 * This script injects a configurable contact form popup into the page.
 * All HTML, CSS, and JavaScript are self-contained.
 *
 * How it Works:
 * - The popup is created and added to the page on load, but remains hidden.
 * - It will automatically appear if the page URL ends with #contact.
 * - You can also manually display the popup by calling the global function `showContactPopup()`.
 * - Clicking the close button, the overlay, or submitting the form will hide it.
 *
 * To Use:
 * 1. Include this script in your HTML file.
 * 2. Navigate to yourpage.html#contact to see it automatically.
 * 3. Or, call `showContactPopup()` from a button click or other event.
 * e.g., <button onclick="showContactPopup()">Contact Us</button>
 */

(function() {
    // --- Configuration ---
    // Easily change the popup's appearance and behavior here.
    const config = {
        fontFamily: "'Poppins', sans-serif",
        fontUrl: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap",
        gradientTop: "#000000",
        gradientBottom: "#000000",
        submitButtonBg: "#000000",
    };

    // --- Shared variables for component logic ---
    let canvas, container, ctx, particles = [];
    const particleCount = 50; // Increased particle count

    // --- Main Function to Create the Popup ---
    function createContactPopup() {
        // 1. Inject CSS and Fonts into the document's <head>
        const styleSheet = `
            @import url('${config.fontUrl}');

            #bn-contact-overlay {
                font-family: ${config.fontFamily};
                position: fixed;
                inset: 0;
                background-color: rgba(0, 0, 0, 0.55);
                display: none;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                z-index: 10000;
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
            }

            #bn-contact-popup-container {
                position: relative;
                width: min(385px, calc(100vw - 2rem));
                max-height: min(640px, 90vh);
                border-radius: 1.5rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                background: #000;
                color: white;
            }

            #bn-contact-particle-canvas {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
                pointer-events: none;
            }

            #bn-contact-close-button {
                position: absolute;
                top: 1.15rem;
                right: 1.15rem;
                color: #eeeeee;
                z-index: 50;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.4rem;
                border-radius: 5px;
                transition: color 0.2s ease;
                pointer-events: auto;
                line-height: 0;
            }
            #bn-contact-close-button:hover { color: white; }
            #bn-contact-close-button:focus-visible {
                outline: 2px solid #d4611c;
                outline-offset: 2px;
            }

            #bn-contact-form-title {
                position: relative;
                z-index: 20;
                margin: 0;
                padding: 1.35rem 3.25rem 1rem 1.25rem;
                font-size: 1.35rem;
                font-weight: 400;
                text-align: left;
                color: #fff;
                pointer-events: none;
            }

            #bn-contact-inner-box {
                position: relative;
                z-index: 20;
                margin: 0 0.75rem 0.75rem;
                flex: 1;
                min-height: 0;
                background-color: #ffffff;
                color: #1a1a1a;
                border-radius: 1rem;
                padding: 1.25rem 1.35rem 1.25rem;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                overflow: auto;
            }

            .bn-contact-input-group { margin-bottom: 0.85rem; }

            .bn-contact-label {
                display: block;
                margin-bottom: 0.4rem;
                font-size: 0.8125rem;
                font-weight: 400;
                color: #484848;
            }

            .bn-contact-input, .bn-contact-textarea {
                width: 100%;
                padding: 0.7rem 0.75rem;
                font-size: 0.9375rem;
                font-family: inherit;
                font-weight: 400;
                border: 1px solid #d1d5db;
                border-radius: 5px;
                box-sizing: border-box;
                background: #f9fafb;
                transition: border-color 0.2s, box-shadow 0.2s;
            }
            .bn-contact-input:focus, .bn-contact-textarea:focus,
            .bn-contact-input:focus-visible, .bn-contact-textarea:focus-visible {
                outline: none;
                border-color: #d4611c;
                box-shadow: 0 0 0 2px rgba(212, 97, 28, 0.2);
            }

            .bn-contact-textarea {
                resize: none;
                min-height: 96px;
            }

            #bn-contact-submit-btn {
                width: 100%;
                margin-top: auto;
                padding: 0.8rem 0;
                color: white;
                font-weight: 400;
                font-size: 0.9375rem;
                font-family: inherit;
                border-radius: 999px;
                background-color: ${config.submitButtonBg};
                transition: opacity 0.2s;
                border: none;
                cursor: pointer;
            }
            #bn-contact-submit-btn:hover { opacity: 0.9; }
            #bn-contact-submit-btn:focus-visible {
                outline: 2px solid #d4611c;
                outline-offset: 2px;
            }
            #bn-contact-submit-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            #bn-contact-toast {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #1A1A1A;
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10001;
                transition: transform 0.35s ease, opacity 0.35s ease;
                transform: translateY(200%);
                opacity: 0;
                max-width: 400px;
                font-weight: 400;
            }
            #bn-contact-toast.show {
                transform: translateY(0);
                opacity: 1;
            }
            #bn-contact-toast .toast-content {
                display: flex;
                align-items: center;
            }
            #bn-contact-toast svg {
                width: 20px;
                height: 20px;
                margin-right: 8px;
                flex-shrink: 0;
            }

            @media (max-width: 420px) {
                #bn-contact-popup-container {
                    width: calc(100vw - 1.5rem);
                    max-height: 88vh;
                }
                #bn-contact-inner-box {
                    margin: 0 0.55rem 0.55rem;
                    padding: 1rem;
                }
            }
        `;
        const styleElement = document.createElement('style');
        styleElement.textContent = styleSheet;
        document.head.appendChild(styleElement);

        // 2. Define the HTML structure for the popup
        const componentHTML = `
            <div id="bn-contact-overlay">
                <div id="bn-contact-popup-container">
                    <canvas id="bn-contact-particle-canvas"></canvas>
                    <button type="button" id="bn-contact-close-button" aria-label="Close popup">
                        <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem; pointer-events: none;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 id="bn-contact-form-title">Contact Us</h2>
                    <div id="bn-contact-inner-box">
                        <p style="text-align: center; margin: 0 0 1.1rem; color: #6b7280; font-size: 0.875rem; font-weight: 400;">Fill out this form. We'll get back to you as soon as possible.</p>
                        <form id="bn-contact-form" action="#" method="POST" style="flex-grow: 1; display: flex; flex-direction: column; min-height: 0;">
                            <div class="bn-contact-input-group" aria-hidden="true" style="position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;">
                                <label for="contact-website">Website</label>
                                <input id="contact-website" name="website" type="text" tabindex="-1" autocomplete="off">
                            </div>
                            <input type="hidden" name="_t" id="contact-started" value="">
                            <div class="bn-contact-input-group">
                                <label for="contact-name" class="bn-contact-label">Full Name</label>
                                <input id="contact-name" name="name" type="text" class="bn-contact-input" placeholder="John Doe" required maxlength="120" autocomplete="name">
                            </div>
                            <div class="bn-contact-input-group">
                                <label for="contact-email" class="bn-contact-label">Email Address</label>
                                <input id="contact-email" name="email" type="email" class="bn-contact-input" placeholder="you@example.com" required maxlength="254" autocomplete="email">
                            </div>
                            <div class="bn-contact-input-group" style="flex-grow: 1; display: flex; flex-direction: column; min-height: 0;">
                                <label for="contact-message" class="bn-contact-label">Message</label>
                                <textarea id="contact-message" name="message" class="bn-contact-textarea" placeholder="How can we help you?" required maxlength="5000" style="flex-grow: 1;"></textarea>
                            </div>
                            <button id="bn-contact-submit-btn" type="submit">Submit Request</button>
                        </form>
                    </div>
                </div>
            </div>
            <div id="bn-contact-toast">
                <div class="toast-content">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span>Success! Your message has been submitted.</span>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', componentHTML);

        // 3. Initialize the JavaScript logic
        initializeComponentLogic();
    }

    // --- Particle Animation Logic ---
    class Particle {
        constructor() {
            this.radius = Math.random() * 1.5 + 0.5;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`;
            this.reset();
        }

        reset() {
            if (!canvas) return;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }

        draw() {
            if (!ctx) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (!canvas) return;
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
    }

    function resizeCanvas() {
        if (!canvas || !container) return;
        if (container.offsetWidth > 0 && container.offsetHeight > 0) {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }
    }

    function initParticles() {
        particles = [];
        if (!canvas || canvas.width === 0) return;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const particle of particles) {
            particle.update();
            particle.draw();
        }
        requestAnimationFrame(animate);
    }

    // --- Component Logic (Interaction) ---
    function initializeComponentLogic() {
        const overlay = document.getElementById('bn-contact-overlay');
        const closeButton = document.getElementById('bn-contact-close-button');
        const contactForm = document.getElementById('bn-contact-form');
        
        // Assign canvas elements to higher-scoped variables
        canvas = document.getElementById('bn-contact-particle-canvas');
        container = document.getElementById('bn-contact-popup-container');
        ctx = canvas.getContext('2d');

        if (!overlay || !closeButton || !contactForm || !canvas || !container) {
            console.error("Contact Popup: Could not find required elements.");
            return;
        }

        const hidePopup = () => {
            overlay.style.display = 'none';
            if (history.pushState) {
                history.pushState("", document.title, window.location.pathname + window.location.search);
            } else {
                window.location.hash = '';
            }
        };

        // --- Form Submission ---
        const startedInput = document.getElementById('contact-started')
        if (startedInput) startedInput.value = String(Date.now())

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = document.getElementById('bn-contact-submit-btn');
            const toast = document.getElementById('bn-contact-toast');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            try {
                const name = contactForm.querySelector('[name="name"]')?.value?.trim() || '';
                const email = contactForm.querySelector('[name="email"]')?.value?.trim() || '';
                const message = contactForm.querySelector('[name="message"]')?.value?.trim() || '';
                const phone = contactForm.querySelector('[name="phone"]')?.value?.trim() || '';
                const website = contactForm.querySelector('[name="website"]')?.value || '';
                const startedAt = Number(contactForm.querySelector('[name="_t"]')?.value) || Date.now();

                const payload = {
                    name,
                    email,
                    phone,
                    subject: 'Contact form',
                    message,
                    source: 'Contact popup',
                    website,
                    formStarted: startedAt,
                };

                if (window.BlacnovaCMS) {
                    await window.BlacnovaCMS.submit(payload);
                } else {
                    const response = await fetch('https://blacnova-api.nic-58f.workers.dev/v1/public/submissions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            domain: 'www.blacnova.net',
                            ...payload,
                        }),
                    });
                    if (!response.ok) {
                        const err = await response.json().catch(() => ({}));
                        throw new Error(err.error || 'Submission failed');
                    }
                }

                if (toast) toast.classList.add('show');
                contactForm.reset();
                if (startedInput) startedInput.value = String(Date.now());
                setTimeout(() => hidePopup(), 500);
                if (toast) {
                    setTimeout(() => toast.classList.remove('show'), 3000);
                }
            } catch (error) {
                console.error('Error:', error);
                alert(error?.message || 'There was an error submitting your message. Please try again.');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });

        // --- Close Logic ---
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hidePopup();
        });
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                hidePopup();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.style.display === 'flex') {
                hidePopup();
            }
        });
        
        // --- Event listener for window resize using ResizeObserver ---
        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
            initParticles();
        });
        resizeObserver.observe(container);

        // Start the animation loop
        animate();
    }

    // --- Global Trigger Function ---
    function showContactPopup() {
        const overlay = document.getElementById('bn-contact-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
            // Now that the popup is visible, initialize the canvas
            resizeCanvas();
            initParticles();
        } else {
            console.error("Contact Popup: Overlay element not found. Was createContactPopup() called?");
        }
    }

    // --- URL Hash Handling ---
    function checkHashForPopup() {
        if (window.location.hash === '#contact') {
            showContactPopup();
        }
    }

    // --- Execution ---
    function onDOMLoaded() {
        createContactPopup();
        checkHashForPopup();
        window.addEventListener('hashchange', checkHashForPopup, false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDOMLoaded);
    } else {
        onDOMLoaded();
    }

    window.showContactPopup = showContactPopup;

})();
