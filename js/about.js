const scrollSpy = new bootstrap.ScrollSpy(document.getElementById('scrollspyContainer'), {
    target: '#navbar-example2'
});

// Intersection Observer para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observar elementos con animación
document.querySelectorAll('.fade-in-left, .fade-in-right').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// Efecto parallax en partículas
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');

    particles.forEach((particle, index) => {
        const speed = 0.3 + (index * 0.1);
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Efecto de typing en títulos
function typeWriter(element, text, delay = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, delay);
        }
    }

    type();
}

// Smooth scroll mejorado para navegación
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        const container = document.getElementById('scrollspyContainer');

        if (target && container) {
            const offsetTop = target.offsetTop - container.offsetTop;
            container.scrollTo({
                top: offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de brillo en skill badges
document.querySelectorAll('.skill-badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
        badge.style.background = 'rgba(255, 255, 255, 0.2)';
        badge.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
    });

    badge.addEventListener('mouseleave', () => {
        badge.style.background = 'rgba(255, 255, 255, 0.1)';
        badge.style.boxShadow = 'none';
    });
});

// Animación de contador para skills
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}