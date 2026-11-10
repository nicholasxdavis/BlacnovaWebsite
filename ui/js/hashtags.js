document.addEventListener('DOMContentLoaded', function() {
    // Service content definitions with hero icons
    const services = {
        'web-development': {
            icon: 'ph ph-code',
            title: 'Web Development Services',
            description: 'Comprehensive solutions to build, optimize, and maintain your digital presence.',
            features: [
                {
                    icon: 'ph ph-code',
                    title: 'Custom Website Development',
                    description: 'We build responsive, high-performing websites that are secure, scalable, and tailored to your brand. From simple landing pages to complex web applications, our solutions drive user engagement and conversions.',
                    points: [
                        'Mobile-first responsive design',
                        'Custom functionality development',
                        'Performance optimization',
                        'SEO-friendly architecture'
                    ]
                },
                {
                    icon: 'ph ph-shopping-cart',
                    title: 'E-Commerce Solutions',
                    description: 'Launch and grow your online store with our end-to-end e-commerce solutions. We build secure, user-friendly platforms with seamless payment gateway integration that boost sales.',
                    points: [
                        'Product catalog management',
                        'Secure checkout systems',
                        'Inventory and order tracking',
                        'Marketing tools integration'
                    ]
                },
                {
                    icon: 'ph ph-gear',
                    title: 'CMS Integration',
                    description: 'Take control of your content with our easy-to-use content management solutions. Update your website without needing developer assistance.',
                    points: [
                        'WordPress, Craft CMS, and custom',
                        'Intuitive admin interfaces',
                        'Role-based access control',
                        'Content versioning'
                    ]
                }
            ]
        },
        'seo-optimization': {
            icon: 'ph ph-magnifying-glass',
            title: 'SEO Optimization Services',
            description: 'Boost your online visibility with tailored SEO strategies that drive organic traffic and increase conversions.',
            features: [
                {
                    icon: 'ph ph-chart-line-up',
                    title: 'On-Page SEO',
                    description: 'Optimize your website\'s content and structure to rank higher on search engines and attract qualified leads that convert.',
                    points: [
                        'Keyword research and optimization',
                        'Meta tags and descriptions',
                        'Content optimization',
                        'Internal linking strategies'
                    ]
                },
                {
                    icon: 'ph ph-link',
                    title: 'Off-Page SEO',
                    description: 'Build your website\'s authority through strategic link-building and online reputation management that establishes trust.',
                    points: [
                        'High-quality backlink acquisition',
                        'Guest posting and outreach',
                        'Social media signals',
                        'Local SEO optimization'
                    ]
                },
                {
                    icon: 'ph ph-wrench',
                    title: 'Technical SEO',
                    description: 'Ensure your website is crawlable, fast, and secure to maximize search engine performance and user experience.',
                    points: [
                        'Site speed optimization',
                        'Mobile usability improvements',
                        'XML sitemap and robots.txt',
                        'Structured data implementation'
                    ]
                }
            ]
        },
        'cloud-solutions': {
            icon: 'ph ph-cloud',
            title: 'Cloud Solutions Services',
            description: 'Harness the power of the cloud to enhance scalability, security, and efficiency for your business operations.',
            features: [
                {
                    icon: 'ph ph-cloud-arrow-up',
                    title: 'Cloud Migration',
                    description: 'Seamlessly transition your applications and data to the cloud with minimal downtime and disruption to your business.',
                    points: [
                        'Migration strategy and planning',
                        'Data transfer and validation',
                        'Application re-architecture',
                        'Post-migration support'
                    ]
                },
                {
                    icon: 'ph ph-hard-drives',
                    title: 'Infrastructure Management',
                    description: 'Optimize and maintain your cloud infrastructure for performance, cost-efficiency, and reliability that scales with your business.',
                    points: [
                        'Automated scaling solutions',
                        'Cost optimization strategies',
                        'Security and compliance',
                        'Monitoring and alerts'
                    ]
                },
                {
                    icon: 'ph ph-git-branch',
                    title: 'Cloud-Native Development',
                    description: 'Build scalable, resilient applications designed specifically for cloud environments that future-proof your business.',
                    points: [
                        'Microservices architecture',
                        'Containerization with Docker',
                        'Kubernetes orchestration',
                        'Serverless computing'
                    ]
                }
            ]
        },
        'e-commerce': {
            icon: 'ph ph-shopping-cart',
            title: 'E-Commerce Services',
            description: 'Launch and scale your online store with secure, user-friendly e-commerce platforms that drive sales and growth.',
            features: [
                {
                    icon: 'ph ph-shopping-cart',
                    title: 'Store Development',
                    description: 'Build a robust e-commerce platform tailored to your business needs and customer expectations that converts visitors into buyers.',
                    points: [
                        'Custom storefront design',
                        'Mobile-optimized checkout',
                        'Payment gateway integration',
                        'Multi-language support'
                    ]
                },
                {
                    icon: 'ph ph-package',
                    title: 'Inventory Management',
                    description: 'Streamline your operations with efficient inventory and order management systems that save time and reduce errors.',
                    points: [
                        'Real-time inventory tracking',
                        'Automated stock alerts',
                        'Order fulfillment integration',
                        'Multi-channel selling'
                    ]
                },
                {
                    icon: 'ph ph-chart-bar',
                    title: 'Analytics & Optimization',
                    description: 'Drive sales with data-driven insights and continuous optimization of your e-commerce platform that maximizes revenue.',
                    points: [
                        'Customer behavior analytics',
                        'Conversion rate optimization',
                        'A/B testing and experimentation',
                        'Sales funnel analysis'
                    ]
                }
            ]
        },
        'api-integration': {
            icon: 'ph ph-plugs',
            title: 'API Integration Services',
            description: 'Connect your systems and automate workflows with seamless API integrations that streamline operations and boost productivity.',
            features: [
                {
                    icon: 'ph ph-gear',
                    title: 'Custom API Development',
                    description: 'Build secure, scalable APIs to connect your applications and enable seamless data exchange that powers your business.',
                    points: [
                        'REST and GraphQL APIs',
                        'Secure authentication methods',
                        'API documentation',
                        'Performance optimization'
                    ]
                },
                {
                    icon: 'ph ph-plugs',
                    title: 'Third-Party Integration',
                    description: 'Integrate with popular platforms to enhance functionality and streamline operations across your entire tech stack.',
                    points: [
                        'Payment and CRM integrations',
                        'Social media and marketing APIs',
                        'Shipping and logistics APIs',
                        'Custom webhook setup'
                    ]
                },
                {
                    icon: 'ph ph-arrows-clockwise',
                    title: 'Data Synchronization',
                    description: 'Ensure real-time data consistency across your applications and platforms that eliminates data silos and errors.',
                    points: [
                        'Bi-directional data sync',
                        'Error handling and logging',
                        'Data transformation and mapping',
                        'Scheduled sync processes'
                    ]
                }
            ]
        },
        'initiatives': {
            icon: 'ph ph-hand-heart',
            title: 'Community Focused',
            description: 'We reinvest in local businesses and support the growth of the Mesilla Valley\'s digital economy because your success is our success.',
            features: [
                {
                    icon: 'ph ph-hand-heart',
                    title: 'Local Business Support',
                    description: 'We prioritize working with local businesses to strengthen our community\'s economic foundation and foster mutual growth.',
                    points: [
                        'Special rates for local businesses',
                        'Pro bono work for select non-profits',
                        'Community workshops and training',
                        'Local business partnerships'
                    ]
                },
                {
                    icon: 'ph ph-plant',
                    title: 'Digital Growth Initiatives',
                    description: 'Programs designed to help local businesses thrive in the digital economy and compete effectively in today\'s market.',
                    points: [
                        'Digital literacy programs',
                        'Small business web development grants',
                        'Mentorship for local entrepreneurs',
                        'Tech education partnerships'
                    ]
                },
                {
                    icon: 'ph ph-heart',
                    title: 'Community Investment',
                    description: 'We believe in giving back to the community that supports our business and making a positive impact where we live and work.',
                    points: [
                        'Local event sponsorship',
                        'School and education support',
                        'Charitable contributions',
                        'Volunteer time off for employees'
                    ]
                }
            ]
        },
        'meet-us': {
            icon: 'ph ph-handshake',
            title: 'Personal Service',
            description: 'Unlike national agencies, we offer face-to-face consultations and personalized support because you deserve more than a ticket number.',
            features: [
                {
                    icon: 'ph ph-handshake',
                    title: 'Local Presence',
                    description: 'We\'re your neighbors, with a physical presence in the Mesilla Valley community who understands your unique market challenges.',
                    points: [
                        'In-person consultations',
                        'Local phone number with real people',
                        'Quick response times',
                        'Understanding of local market'
                    ]
                },
                {
                    icon: 'ph ph-users',
                    title: 'Dedicated Support',
                    description: 'Work directly with our team, not a call center or automated system, for personalized service that understands your vision.',
                    points: [
                        'Direct access to our team',
                        'Assigned account manager',
                        'Personalized service approach',
                        'Long-term relationship building'
                    ]
                },
                {
                    icon: 'ph ph-lightbulb',
                    title: 'Collaborative Process',
                    description: 'We work with you, not just for you, to ensure your vision becomes reality through transparent communication and partnership.',
                    points: [
                        'Regular progress updates',
                        'Collaborative decision making',
                        'Transparent communication',
                        'Flexible approach to changes'
                    ]
                }
            ]
        }
    };

    // Function to create a feature cell (bento grid)
    function createFeatureCard(feature, index) {
        const num = String(index + 1).padStart(2, '0');
        return `
            <article class="bn-connected-cell service-bento-cell flex flex-col">
                <div class="mb-5 text-xs tracking-[0.18em] text-[#d4611c]">${num}</div>
                <div class="mb-3 flex items-center gap-2.5">
                    <i class="${feature.icon} text-xl text-[#d4611c]" aria-hidden="true"></i>
                    <h3 class="text-lg text-gray-900 leading-snug">${feature.title}</h3>
                </div>
                <p class="mb-5 text-sm leading-relaxed text-gray-500">${feature.description}</p>
                <ul class="space-y-2.5 flex-1">
                    ${feature.points.map(point => `
                        <li class="flex items-start gap-2.5 text-sm text-gray-600">
                            <span class="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#d4611c]"></span>
                            <span>${point}</span>
                        </li>
                    `).join('')}
                </ul>
            </article>
        `;
    }


    // Function to create a service section
    function createServiceSection(serviceId, serviceData) {
        const section = document.createElement('section');
        section.className = 'service-section relative min-h-screen bg-white poppins-font-section';
        section.dataset.serviceId = serviceId;

        const container = document.createElement('div');
        container.className = 'container mx-auto max-w-6xl px-5 pb-24 pt-28';

        const headingDiv = document.createElement('div');
        headingDiv.className = 'mb-12 max-w-2xl';
        headingDiv.innerHTML = `
            <p class="mb-3 text-xs uppercase tracking-[0.2em] text-[#d4611c]">Service</p>
            <h2 class="mb-4 text-3xl text-gray-900 md:text-4xl">${serviceData.title}</h2>
            <p class="text-sm leading-relaxed text-gray-500 md:text-base">${serviceData.description}</p>
        `;

        const featureCount = serviceData.features.length;
        const gridCols =
            featureCount >= 3 ? 'md:grid-cols-3' :
            featureCount === 2 ? 'md:grid-cols-2' :
            'md:grid-cols-1';

        let ctaInner = '';
        if (serviceId === 'initiatives') {
            ctaInner = `
                <p class="text-sm text-gray-500">Questions? <a href="#contact" class="text-[#d4611c] transition-colors hover:text-[#c55718]">Contact our team</a></p>
            `;
        } else if (serviceId === 'meet-us') {
            ctaInner = `
                <div class="flex flex-wrap items-center gap-4">
                    <button onclick="showMeetingPopup()" class="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-2.5 text-sm text-white transition-opacity hover:opacity-90">
                        Schedule Meeting
                    </button>
                    <a href="#contact" class="inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-800">
                        Contact our team <i class="ph ph-arrow-right text-xs"></i>
                    </a>
                </div>
            `;
        } else {
            ctaInner = `
                <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                    <div>
                        <p class="text-sm text-gray-900">Ready to get started?</p>
                        <p class="text-sm text-gray-500 mt-0.5">Tell us about your project and we will follow up quickly.</p>
                    </div>
                    <div class="flex flex-wrap items-center gap-4">
                        <a href="#quote" id="quote-cta" class="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-2.5 text-sm text-white transition-opacity hover:opacity-90">
                            Get a Quote
                        </a>
                        <a href="#contact" class="inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-800">
                            Contact our team <i class="ph ph-arrow-right text-xs"></i>
                        </a>
                    </div>
                </div>
            `;
        }

        const ctaWrap = document.createElement('div');
        ctaWrap.className = 'bn-connected-cell service-bento-cta';
        ctaWrap.innerHTML = ctaInner;

        const bentoWrap = document.createElement('div');
        bentoWrap.className = 'bn-connected overflow-hidden';

        const featuresOnly = document.createElement('div');
        featuresOnly.className = `bn-connected-row grid grid-cols-1 ${gridCols}`;
        serviceData.features.forEach((feature, index) => {
            featuresOnly.innerHTML += createFeatureCard(feature, index);
        });
        bentoWrap.appendChild(featuresOnly);
        bentoWrap.appendChild(ctaWrap);

        container.appendChild(headingDiv);
        container.appendChild(bentoWrap);
        section.appendChild(container);

        if (serviceId !== 'initiatives' && serviceId !== 'meet-us') {
            setTimeout(() => {
                const quoteCta = document.getElementById('quote-cta');
                if (quoteCta) {
                    quoteCta.addEventListener('click', function(e) {
                        e.preventDefault();
                        window.location.href = window.location.pathname + '#quote';
                        window.location.reload();
                    });
                }
            }, 100);
        }

        return section;
    }

    // Track current open service
    let currentService = null;

    // Handle hash changes
    function handleHashChange() {
        const sections = document.querySelectorAll('main > section:not(.service-section)');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const hash = window.location.hash.slice(1); // Remove '#'

        // If we're already viewing a service and clicking a different one
        if (currentService && currentService !== hash && services[hash]) {
            // Remove current service section
            const currentSection = document.querySelector(`.service-section[data-service-id="${currentService}"]`);
            if (currentSection) {
                currentSection.remove();
            }
        }

        if (services[hash]) {
            // Hide all sections except header and footer
            sections.forEach(section => {
                section.style.display = 'none';
            });
            if (footer) footer.style.display = 'none';
            const main = document.querySelector('main');
            if (main) main.style.display = 'none';
            document.documentElement.classList.add('service-view');
            document.documentElement.style.backgroundColor = '#ffffff';
            document.body.classList.add('service-view');
            document.body.style.backgroundColor = '#ffffff';
            if (window.BNPreviousPage) window.BNPreviousPage.show();

            // Find or create service section
            let serviceSection = document.querySelector(`.service-section[data-service-id="${hash}"]`);
            if (!serviceSection) {
                serviceSection = createServiceSection(hash, services[hash]);
                header.insertAdjacentElement('afterend', serviceSection);
            } else {
                serviceSection.style.display = 'block';
            }

            // Set current service
            currentService = hash;

            // Force scroll to top with additional offset to ensure it's at the very top
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
            
            // Additional manual scroll to ensure we're at the absolute top
            setTimeout(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
            }, 50);
            
        } else {
            // Show all sections
            sections.forEach(section => {
                section.style.display = 'block';
            });
            if (footer) footer.style.display = '';
            const main = document.querySelector('main');
            if (main) main.style.display = '';
            document.documentElement.classList.remove('service-view');
            document.documentElement.style.backgroundColor = '';
            document.body.classList.remove('service-view');
            document.body.style.backgroundColor = '';
            if (window.BNPreviousPage) window.BNPreviousPage.hide();

            // Hide all service sections
            document.querySelectorAll('.service-section').forEach(section => {
                section.style.display = 'none';
            });

            // Reset current service
            currentService = null;
            
            // If the hash is #quote, scroll to it smoothly
            if (hash === 'quote') {
                setTimeout(() => {
                    const quoteElement = document.getElementById('quote');
                    if (quoteElement) {
                        quoteElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        }
    }

    // Initial check
    handleHashChange();
    window.BNHandleHashChange = handleHashChange;

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Additional scroll to top on page load if there's a service hash (not #quote)
    if (window.location.hash && window.location.hash !== '#quote') {
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
        }, 100);
    }

    // --- Meeting Scheduling Popup ---
    function createMeetingPopup() {
        // Check if popup already exists
        if (document.getElementById('bn-meeting-overlay')) {
            return;
        }

        // Inject CSS for meeting popup
        const meetingStyle = `
            #bn-meeting-overlay {
                font-family: 'Inter', sans-serif;
                position: fixed;
                top: 0; right: 0; bottom: 0; left: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: none;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                z-index: 10000;
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
            }

            #bn-meeting-popup-container {
                position: relative;
                width: 385px;
                height: 610px;
                border-radius: 1.5rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
                display: flex;
                align-items: flex-end;
                justify-content: center;
                overflow: hidden;
                padding-bottom: 1.25rem;
                background-image: linear-gradient(to bottom, #000000, #484848);
                color: white;
            }

            #bn-meeting-close-button {
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
                color: #eeeeee;
                z-index: 30;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                transition: color 0.2s ease-in-out;
            }
            #bn-meeting-close-button:hover {
                color: white;
            }

            #bn-meeting-form-title {
                position: absolute;
                top: 1.5rem;
                left: 1.2rem;
                font-size: 1.575rem;
                font-weight: 100;
                text-align: left;
                z-index: 30;
                margin: 0;
                background: linear-gradient(to bottom, white 65%, transparent 100%);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
            }

            #bn-meeting-inner-box {
                width: 360px;
                height: 485px;
                background-color: #ffffff;
                opacity: 98%;
                color: #1a1a1a;
                border-radius: 1rem;
                z-index: 20;
                padding: 1.5rem 2rem;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
            }
            
            .bn-meeting-input-group {
                margin-bottom: 1rem;
            }

            .bn-meeting-label {
                display: block;
                margin-bottom: 0.5rem;
                font-size: 0.875rem;
                font-weight: 500;
                color: #374151;
            }

            .bn-meeting-input, .bn-meeting-textarea {
                width: 100%;
                padding: 0.75rem;
                font-size: 1rem;
                border: 1px solid #d1d5db;
                border-radius: 0.5rem;
                box-sizing: border-box;
                transition: border-color 0.2s, box-shadow 0.2s;
            }
            .bn-meeting-input:focus, .bn-meeting-textarea:focus {
                outline: none;
                border-color: #000000;
                box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
            }

            .bn-meeting-textarea {
                resize: none;
            }

            #bn-meeting-submit-btn {
                width: 100%;
                margin-top: 0.5rem;
                padding: 0.875rem 0;
                color: white;
                font-weight: 600;
                font-size: 1rem;
                border-radius: 1.5rem;
                background-color: #000000;
                transition: opacity 0.2s;
                border: none;
                cursor: pointer;
            }
            #bn-meeting-submit-btn:hover {
                opacity: 0.85;
            }
            #bn-meeting-submit-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            
            /* Toast Notification Styles */
            #bn-meeting-toast {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #1A1A1A;
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10001;
                transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
                transform: translateY(200%);
                opacity: 0;
                max-width: 400px;
            }
            #bn-meeting-toast.show {
                transform: translateY(0);
                opacity: 1;
            }
            #bn-meeting-toast .toast-content {
                display: flex;
                align-items: center;
            }
            #bn-meeting-toast svg {
                width: 20px;
                height: 20px;
                margin-right: 8px;
                flex-shrink: 0;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = meetingStyle;
        styleElement.id = 'bn-meeting-styles';
        if (!document.getElementById('bn-meeting-styles')) {
            document.head.appendChild(styleElement);
        }

        // Create HTML structure
        const meetingHTML = `
            <div id="bn-meeting-overlay">
                <div id="bn-meeting-popup-container">
                    <button id="bn-meeting-close-button" aria-label="Close popup">
                        <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 id="bn-meeting-form-title">Schedule Meeting</h2>
                    <div id="bn-meeting-inner-box">
                        <p style="text-align: center; margin-top: 0; margin-bottom: 1.5rem; color: #4b5563;">Fill out this form to schedule a meeting with us.</p>
                        <form id="bn-meeting-form" action="https://formspree.io/f/mldoylwq" method="POST" style="flex-grow: 1; display: flex; flex-direction: column;">
                            <input type="hidden" name="type" value="Meeting Request">
                            <div class="bn-meeting-input-group">
                                <label for="meeting-name" class="bn-meeting-label">Full Name</label>
                                <input id="meeting-name" name="name" type="text" class="bn-meeting-input" placeholder="John Doe" required>
                            </div>
                            <div class="bn-meeting-input-group">
                                <label for="meeting-email" class="bn-meeting-label">Email Address</label>
                                <input id="meeting-email" name="email" type="email" class="bn-meeting-input" placeholder="you@example.com" required>
                            </div>
                            <div class="bn-meeting-input-group" style="flex-grow: 1; display: flex; flex-direction: column;">
                                <label for="meeting-message" class="bn-meeting-label">Message (Optional - preferred date/time)</label>
                                <textarea id="meeting-message" name="message" class="bn-meeting-textarea" placeholder="Let us know your preferred date and time..." style="flex-grow: 1;"></textarea>
                            </div>
                            <button id="bn-meeting-submit-btn" type="submit">Schedule Meeting</button>
                        </form>
                    </div>
                </div>
            </div>
            <!-- Toast Notification -->
            <div id="bn-meeting-toast">
                <div class="toast-content">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span>Success! Your meeting request has been submitted.</span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', meetingHTML);

        // Initialize popup logic
        initializeMeetingPopup();
    }

    function initializeMeetingPopup() {
        const overlay = document.getElementById('bn-meeting-overlay');
        const closeButton = document.getElementById('bn-meeting-close-button');
        const meetingForm = document.getElementById('bn-meeting-form');
        
        if (!overlay || !closeButton || !meetingForm) {
            console.error("Meeting Popup: Could not find required elements.");
            return;
        }

        const hidePopup = () => {
            overlay.style.display = 'none';
        };

        // Form submission
        meetingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = document.getElementById('bn-meeting-submit-btn');
            const toast = document.getElementById('bn-meeting-toast');
            const originalText = submitButton.textContent;
            
            // Disable submit button
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            try {
                // Get form data
                const formData = new FormData(meetingForm);
                
                // Submit to Formspree
                const response = await fetch('https://formspree.io/f/mldoylwq', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success toast
                    if (toast) {
                        toast.classList.add('show');
                    }
                    
                    // Reset form
                    meetingForm.reset();
                    
                    // Hide popup after a short delay
                    setTimeout(() => {
                        hidePopup();
                    }, 500);
                    
                    // Hide toast after 3 seconds
                    if (toast) {
                        setTimeout(() => {
                            toast.classList.remove('show');
                        }, 3000);
                    }
                } else {
                    // Handle error
                    const data = await response.json();
                    if (data.errors) {
                        alert('There was an error submitting your meeting request. Please try again.');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting your meeting request. Please try again.');
            } finally {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });

        // Close button
        closeButton.addEventListener('click', hidePopup);
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                hidePopup();
            }
        });
    }

    // Global function to show meeting popup
    window.showMeetingPopup = function() {
        createMeetingPopup();
        const overlay = document.getElementById('bn-meeting-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    };
});
