// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            const navCollapse = document.getElementById('navbarNav');
            if (navCollapse && navCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler')?.click();
            }
        }
    });
});

// =============================================
// MODAL
// =============================================
function openModal(id) {
    const m = document.getElementById(id + 'Modal');
    if (m) { m.classList.add('show'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
    const m = document.getElementById(id + 'Modal');
    if (m) { m.classList.remove('show'); document.body.style.overflow = ''; }
}
window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
        document.body.style.overflow = '';
    }
});
window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
        document.body.style.overflow = '';
        closeLightbox();
    }
});

// =============================================
// SCROLL REVEAL
// =============================================
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal, .edu-item, .pcard, .skill-group, .exp-item').forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    revealObs.observe(el);
});

// =============================================
// SKILL BAR ANIMATION
// =============================================
const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(f => {
                f.style.width = f.getAttribute('data-w') + '%';
            });
            skillObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-wrap').forEach(el => skillObs.observe(el));

// =============================================
// ACTIVE NAV ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector(`.nav-link[href="#${entry.target.id}"]`)?.classList.add('active');
        }
    });
}, { threshold: 0.4 });
sections.forEach(s => sectionObs.observe(s));

// =============================================
// GALLERY FILTER + LIGHTBOX
// =============================================
const gfilters = document.querySelectorAll('.gfilter');
const gcards = document.querySelectorAll('.gcard');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

let visibleCards = [];
let lightboxIndex = 0;

// Filter
gfilters.forEach(btn => {
    btn.addEventListener('click', () => {
        gfilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        gcards.forEach(card => {
            const cat = card.getAttribute('data-cat');
            if (filter === 'all' || cat === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        updateVisibleCards();
    });
});

function updateVisibleCards() {
    visibleCards = [...gcards].filter(c => !c.classList.contains('hidden') && !c.classList.contains('img-error'));
}
updateVisibleCards();

// Open lightbox on card click
gcards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const caption = card.querySelector('.gcard-caption')?.textContent || '';
        if (!img || card.classList.contains('img-error')) return;
        lightboxIndex = visibleCards.indexOf(card);
        showLightboxImage(card);
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

function showLightboxImage(card) {
    const img = card.querySelector('img');
    const caption = card.querySelector('.gcard-caption')?.textContent || '';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }
}

document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.getElementById('lightboxPrev')?.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + visibleCards.length) % visibleCards.length;
    showLightboxImage(visibleCards[lightboxIndex]);
});
document.getElementById('lightboxNext')?.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % visibleCards.length;
    showLightboxImage(visibleCards[lightboxIndex]);
});

// Swipe support for lightbox
let touchStartX = 0;
lightbox?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
lightbox?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
        if (dx < 0) {
            lightboxIndex = (lightboxIndex + 1) % visibleCards.length;
        } else {
            lightboxIndex = (lightboxIndex - 1 + visibleCards.length) % visibleCards.length;
        }
        showLightboxImage(visibleCards[lightboxIndex]);
    }
});