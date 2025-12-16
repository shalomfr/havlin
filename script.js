// RAYZI HAVLIN - Premium Photography Website
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavigation();
    initCursorGlow();
    initScrollAnimations();
    initGallery();
    initTestimonials();
    initContactForm();
    initCountUp();
    initServiceCardHover();
    initSmoothScroll();
});

function initLoader() {
    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 2200);
    });
}

function initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'visible';
        });
    });
    
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.about-grid, .service-card, .gallery-item, .contact-grid, .section-header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    let currentIndex = 0;
    let visibleItems = Array.from(galleryItems);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            
            galleryItems.forEach((item, index) => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'block';
                        setTimeout(() => { item.style.opacity = '1'; }, 50);
                    }, index * 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
            visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
        });
    });
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImage.src = img.src;
                currentIndex = visibleItems.indexOf(item);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    function showImage(index) {
        if (visibleItems.length === 0) return;
        currentIndex = (index + visibleItems.length) % visibleItems.length;
        const img = visibleItems[currentIndex].querySelector('img');
        if (img) {
            lightboxImage.style.opacity = '0';
            setTimeout(() => {
                lightboxImage.src = img.src;
                lightboxImage.style.opacity = '1';
            }, 200);
        }
    }
    
    document.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
    document.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowRight') showImage(currentIndex + 1);
        else if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'visible';
    }
}

function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.nav-dot');
    let currentIndex = 0;
    let interval;
    
    function showTestimonial(index) {
        cards.forEach((card, i) => { card.classList.remove('active'); dots[i].classList.remove('active'); });
        cards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    function startAutoPlay() { interval = setInterval(() => showTestimonial((currentIndex + 1) % cards.length), 5000); }
    function stopAutoPlay() { clearInterval(interval); }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { stopAutoPlay(); showTestimonial(index); startAutoPlay(); });
    });
    
    startAutoPlay();
    document.querySelector('.testimonials-slider').addEventListener('mouseenter', stopAutoPlay);
    document.querySelector('.testimonials-slider').addEventListener('mouseleave', startAutoPlay);
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>שולח...</span>';
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.innerHTML = '<span>נשלח בהצלחה! ✓</span>';
                submitBtn.style.background = '#4CAF50';
                form.reset();
                setTimeout(() => { submitBtn.innerHTML = originalText; submitBtn.style.background = ''; submitBtn.disabled = false; }, 3000);
            }, 1500);
        });
    }
}

function initCountUp() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.dataset.count);
                let current = 0;
                const increment = count / 125;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= count) { target.textContent = count; clearInterval(timer); }
                    else { target.textContent = Math.floor(current); }
                }, 16);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-number').forEach(stat => observer.observe(stat));
}

function initServiceCardHover() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({ top: target.offsetTop - document.querySelector('.nav').offsetHeight, behavior: 'smooth' });
            }
        });
    });
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.shape').forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed}px)`;
    });
});

console.log('%c🎨 רייזי הבלין - צילום מקצועי', 'font-size: 24px; font-weight: bold; color: #c9a962;');

