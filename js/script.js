// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });

            // Close mobile menu if open
            const navCollapse = document.getElementById('navbarNav');
            if (navCollapse && navCollapse.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                toggler && toggler.click();
            }
        }
    });
});

// =============================================
// MODAL FUNCTIONS
// =============================================
function openModal(modalId) {
    const modal = document.getElementById(modalId + 'Modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId + 'Modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close modal on backdrop click
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Close modal on Escape key
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = '';
    }
});

// =============================================
// SCROLL REVEAL ANIMATION
// =============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.edu-item, .pcard, .skill-group, .cert-img').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// =============================================
// SKILL BAR ANIMATION
// =============================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                const w = fill.getAttribute('data-w');
                fill.style.width = w + '%';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-wrap').forEach(el => skillObserver.observe(el));

// =============================================
// ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));