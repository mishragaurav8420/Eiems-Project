/**
 * Ei EMS India Pvt. Ltd. - Main JavaScript
 * Mobile menu, smooth scrolling, form validation, and interactions
 */

// ========================================
// Mobile Menu Toggle
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger menu
            this.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar-container')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
});


// ========================================
// Navbar Scroll Effect
// ========================================

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// ========================================
// Smooth Scrolling for Anchor Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Don't prevent default for empty hash or just #
        if (href === '#' || href === '') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// ========================================
// Form Validation (Contact Page)
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const company = document.getElementById('company');
        const phone = document.getElementById('phone');
        const service = document.getElementById('service');
        const message = document.getElementById('message');

        // Reset error states
        clearErrors();

        let isValid = true;

        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        }

        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate company
        if (!company.value.trim()) {
            showError(company, 'Company name is required');
            isValid = false;
        }

        // Validate phone (optional but format check if provided)
        if (phone.value.trim() && !isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }

        // Validate service selection
        if (!service.value) {
            showError(service, 'Please select a service');
            isValid = false;
        }

        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        }

        // If form is valid, show success message
        if (isValid) {
            showSuccessMessage();
            contactForm.reset();
        }
    });
}

// Helper function to show error
function showError(element, message) {
    const formGroup = element.closest('.form-group');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff3333';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
    element.style.borderColor = '#ff3333';
}

// Helper function to clear errors
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());

    const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (basic)
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Show success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #00cc66 0%, #00ccff 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideDown 0.3s ease;
        max-width: 90%;
        text-align: center;
    `;
    successDiv.innerHTML = `
        <div style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">✓ Message Sent Successfully!</div>
        <div>Thank you for contacting Ei EMS. We'll get back to you soon.</div>
    `;

    document.body.appendChild(successDiv);

    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }

    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);


// Removed duplicate scroll reveal - using the one below with theme switcher


// ========================================
// Current Year in Footer
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
});


// ========================================
// Active Navigation Link
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});


// ========================================
// FAQ Accordion (if present on page)
// ========================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    }
});


// ========================================
// Prevent form resubmission on page refresh
// ========================================

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}


// ========================================
// Theme Switcher (Light/Dark Mode)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            let theme = html.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);

            // Add animation to theme toggle button
            this.style.transform = 'rotate(360deg) scale(0.8)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    }

    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }
});


// ========================================
// Scroll Reveal Animation (IntersectionObserver)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Create IntersectionObserver for scroll reveal animations
    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for elements in the same section
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);

                // Optionally unobserve after revealing (for one-time animation)
                scrollRevealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all scroll-reveal elements
    const reveals = document.querySelectorAll('.scroll-reveal');
    reveals.forEach(element => {
        scrollRevealObserver.observe(element);
    });

    // Also observe cards and other animated elements
    const animatedElements = document.querySelectorAll('.card, .hero-content, .text-center h2');
    animatedElements.forEach(element => {
        if (!element.classList.contains('scroll-reveal')) {
            element.classList.add('fade-in-element');
        }
    });

    // Create observer for fade-in elements
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    document.querySelectorAll('.fade-in-element').forEach(element => {
        fadeInObserver.observe(element);
    });
});


// ========================================
// Number Counter Animation
// ========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.ceil(target);
            clearInterval(counter);
        } else {
            element.textContent = Math.ceil(start);
        }
    }, 16);
}

// Initialize counters when visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});


// ========================================
// Engagement Popup
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('popupShown');

    if (!popupShown) {
        // Show popup after 8 seconds (only once per session)
        setTimeout(showEngagementPopup, 8000);
    }
});

function showEngagementPopup() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'popup-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(5px);
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Create popup
    const popup = document.createElement('div');
    popup.id = 'engagement-popup';
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        border-radius: 16px;
        padding: 2.5rem;
        max-width: 450px;
        width: 90%;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        text-align: center;
    `;

    popup.innerHTML = `
        <button id="popup-close" style="
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            transition: color 0.2s ease;
            padding: 5px;
        ">&times;</button>

        <div style="
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, #0066cc 0%, #00ccff 100%);
            border-radius: 50%;
            margin: 0 auto 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            animation: pulse 2s ease-in-out infinite;
        ">🚀</div>

        <h3 style="
            font-size: 1.5rem;
            color: #1a1a1a;
            margin-bottom: 0.75rem;
            font-weight: 700;
        ">Ready to Build Your Product?</h3>

        <p style="
            color: #666;
            margin-bottom: 1.5rem;
            line-height: 1.6;
            font-size: 0.95rem;
        ">Get a <strong>free consultation</strong> with our engineering experts. We'll help you bring your electronics project to life!</p>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <a href="contact.html" id="popup-cta" style="
                background: linear-gradient(135deg, #0066cc 0%, #00ccff 100%);
                color: white;
                padding: 0.875rem 1.5rem;
                border-radius: 8px;
                font-weight: 600;
                text-decoration: none;
                transition: all 0.3s ease;
                display: block;
            ">Get Free Quote</a>

            <a href="https://calendly.com/gaurav-maarula24/30min" target="_blank" style="
                background: transparent;
                color: #0066cc;
                padding: 0.75rem 1.5rem;
                border: 2px solid #0066cc;
                border-radius: 8px;
                font-weight: 600;
                text-decoration: none;
                transition: all 0.3s ease;
                display: block;
            ">Schedule a Call</a>
        </div>

        <p style="
            font-size: 0.75rem;
            color: #999;
            margin-top: 1rem;
            margin-bottom: 0;
        ">No spam, just solutions for your project</p>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Animate in
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        popup.style.opacity = '1';
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Close handlers
    const closePopup = () => {
        overlay.style.opacity = '0';
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, -50%) scale(0.8)';

        setTimeout(() => {
            overlay.remove();
            popup.remove();
        }, 300);

        // Mark as shown for this session
        sessionStorage.setItem('popupShown', 'true');
    };

    document.getElementById('popup-close').addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });

    // Hover effects for buttons
    const ctaBtn = document.getElementById('popup-cta');
    ctaBtn.addEventListener('mouseenter', () => {
        ctaBtn.style.transform = 'translateY(-2px)';
        ctaBtn.style.boxShadow = '0 8px 20px rgba(0, 102, 204, 0.4)';
    });
    ctaBtn.addEventListener('mouseleave', () => {
        ctaBtn.style.transform = 'translateY(0)';
        ctaBtn.style.boxShadow = 'none';
    });
}


// Console message
console.log('%c⚡ Ei EMS India Pvt. Ltd. ⚡', 'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%cWorld-Class Electronics Manufacturing Services', 'color: #666; font-size: 14px;');
console.log('%cWebsite: https://eiems.in | Email: sales@eiems.in', 'color: #999; font-size: 12px;');
