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
// Scroll Reveal Animation
// ========================================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


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


// Console message
console.log('%c⚡ Ei EMS India Pvt. Ltd. ⚡', 'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%cWorld-Class Electronics Manufacturing Services', 'color: #666; font-size: 14px;');
console.log('%cWebsite: https://eiems.in | Email: sales@eiems.in', 'color: #999; font-size: 12px;');
