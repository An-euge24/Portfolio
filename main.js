document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-active');
    // Header transition on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.05, // Show as soon as 5% is visible
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply animation to elements
    const animateElements = [
        '.exp-card',
        '.project-card',
        '.skill-col',
        '.formation-card',
        '.section-header',
        '.contact-left',
        '.contact-right'
    ];

    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            // Only add animation class if it's not already visible to avoid flickering
            if (!el.classList.contains('visible')) {
                el.classList.add('animate-on-scroll');
            }
            observer.observe(el);
        });
    });

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Mobile navigation toggle (simplified for this version)
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            navLinks.style.flexDirection = 'column';
            navLinks.style.alignItems = 'center';
            navLinks.style.padding = '40px 0';
            navLinks.style.zIndex = '1000';
            navLinks.style.borderBottom = '1px solid #333';
        });
    }

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Contact Form Submission (Simple feedback)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message envoyé !';
            submitBtn.style.backgroundColor = '#4CAF50';
            submitBtn.style.color = '#fff';
            
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
            }, 3000);
        });
    }

});
