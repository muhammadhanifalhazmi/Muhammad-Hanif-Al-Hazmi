<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
        let currentCarouselIndex = 0;

        function changeCarousel(n) {
            const items = document.querySelectorAll('.carousel-item');
            const dots = document.querySelectorAll('.carousel-dot');
            currentCarouselIndex += n;

            if (currentCarouselIndex >= items.length) {
                currentCarouselIndex = 0;
            } else if (currentCarouselIndex < 0) {
                currentCarouselIndex = items.length - 1;
            }

            items.forEach(item => item.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            items[currentCarouselIndex].classList.add('active');
            dots[currentCarouselIndex].classList.add('active');
        }

        function currentCarousel(n) {
            const items = document.querySelectorAll('.carousel-item');
            const dots = document.querySelectorAll('.carousel-dot');
            
            items.forEach(item => item.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            currentCarouselIndex = n;
            items[currentCarouselIndex].classList.add('active');
            dots[currentCarouselIndex].classList.add('active');
        }

        function openModal(modalId) {
            const modal = document.getElementById(modalId + 'Modal');
            if (modal) {
                modal.classList.add('show');
            }
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId + 'Modal');
            if (modal) {
                modal.classList.remove('show');
            }
        }

        // Close modal ketika klik di luar modal
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.classList.remove('show');
            }
        }

        async function sendEmail(event) {
            event.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            const messageDiv = document.getElementById('formMessage');

            try {
                const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    messageDiv.textContent = 'Pesan berhasil dikirim ke email Anda!';
                    messageDiv.className = 'form-message success';
                    document.getElementById('contactForm').reset();
                    
                    // Reset message setelah 5 detik
                    setTimeout(() => {
                        messageDiv.className = 'form-message';
                    }, 5000);
                } else {
                    throw new Error('Gagal mengirim pesan');
                }
            } catch (error) {
                messageDiv.textContent = 'Gagal mengirim pesan. Silakan coba lagi.';
                messageDiv.className = 'form-message error';
            }
        }

        // Smooth scroll untuk navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    

        const images = document.querySelectorAll(".carousel-images img");
const dots = document.querySelectorAll(".dot");
const title = document.getElementById("aboutTitle");
const desc = document.getElementById("aboutDesc");

const aboutData = [
    {
        title: "Let's get to know me better",
        desc: "Greetings! I'm Muhammad Hanif Al Hazmi, an Informatics Engineering graduate with a strong analytical mindset and growing passion for data-driven decision making."
    },
    {
        title: "Web Development Background",
        desc: "I have experience developing responsive web applications and turning complex ideas into intuitive digital solutions."
    },
    {
        title: "Research & Innovation",
        desc: "I conducted applied research in IoT for agriculture and Cryptography, both officially recognized with copyright certificates."
    },
    {
        title: "Industry Experience",
        desc: "During my internship as a Front-End Web Developer at Gamelab Indonesia, I worked on transforming data into engaging user experiences."
    },
    {
        title: "Data Analytics Journey",
        desc: "Currently, I’m building strong skills in Excel, Python, SQL, Statistics, and Tableau to pursue a career in Data Analytics and Business Intelligence."
    }
];

let currentIndex = 0;

function showSlide(index) {
    images.forEach(img => img.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    images[index].classList.add("active");
    dots[index].classList.add("active");

    title.textContent = aboutData[index].title;
    desc.textContent = aboutData[index].desc;

    currentIndex = index;
}

// DOT CLICK
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showSlide(index);
    });
});

// AUTO SLIDE
setInterval(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    showSlide(nextIndex);
}, 6000);

/* ===== EXPERIENCE CAROUSEL ===== */

let experienceIndex = 0;

const experienceItems = document.querySelectorAll(".carousel-item");
const experienceDots = document.querySelectorAll(".carousel-dot");

function showExperience(index) {
    // looping aman
    if (index >= experienceItems.length) experienceIndex = 0;
    if (index < 0) experienceIndex = experienceItems.length - 1;

    // reset semua
    experienceItems.forEach(item => item.classList.remove("active"));
    experienceDots.forEach(dot => dot.classList.remove("active"));

    // aktifkan yang dipilih
    experienceItems[experienceIndex].classList.add("active");
    experienceDots[experienceIndex].classList.add("active");
}

function changeCarousel(step) {
    experienceIndex += step;
    showExperience(experienceIndex);
}

function currentCarousel(index) {
    experienceIndex = index;
    showExperience(experienceIndex);
}

/* AUTO SLIDE (optional, boleh hapus kalau tidak mau) */
setInterval(() => {
    changeCarousel(1);
}, 7000);

