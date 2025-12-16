// RAYZI HAVLIN - Premium Photography Website
// Advanced Interactions & Animations

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCursor();
    initParticles();
    initNavigation();
    initHeroSlider();
    initGallery();
    initTestimonials();
    initStats();
    initServiceCards();
    initContactForm();
    initViewer();
    initScrollAnimations();
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 2000);
    });
}

// Custom Cursor
function initCursor() {
    if (window.innerWidth < 992) return;
    
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
}

// Particles Background
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        
        // Draw connections
        particles.forEach((a, i) => {
            particles.slice(i + 1).forEach(b => {
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - dist / 150)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    animate();
}

// Navigation
function initNavigation() {
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });
    
    // Mobile menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = header.offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const counter = document.querySelector('.slide-counter .current');
    let current = 0;
    
    function nextSlide() {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
        if (counter) counter.textContent = String(current + 1).padStart(2, '0');
    }
    
    setInterval(nextSlide, 5000);
}

// Gallery
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            items.forEach((item, i) => {
                const category = item.dataset.category;
                const show = filter === 'all' || category === filter;
                
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    item.style.display = show ? 'block' : 'none';
                    if (show) {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, i * 50);
                    }
                }, 300);
            });
        });
    });
    
    // Click to view
    items.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) openViewer(img.src);
        });
    });
}

// Testimonials
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');
    let current = 0;
    let interval;
    
    function show(index) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === index);
            dots[i]?.classList.toggle('active', i === index);
        });
        current = index;
    }
    
    function next() { show((current + 1) % testimonials.length); }
    function prev() { show((current - 1 + testimonials.length) % testimonials.length); }
    
    function startAuto() { interval = setInterval(next, 5000); }
    function stopAuto() { clearInterval(interval); }
    
    nextBtn?.addEventListener('click', () => { stopAuto(); next(); startAuto(); });
    prevBtn?.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { stopAuto(); show(i); startAuto(); });
    });
    
    startAuto();
}

// Stats Counter
function initStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const increment = target / 60;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current);
                    }
                }, 30);
                
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Service Cards Hover Effect
function initServiceCards() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        
        btn.classList.add('loading');
        
        setTimeout(() => {
            btn.classList.remove('loading');
            btn.classList.add('success');
            form.reset();
            
            setTimeout(() => {
                btn.classList.remove('success');
            }, 3000);
        }, 2000);
    });
}

// Image Viewer
let currentImages = [];
let currentIndex = 0;

function initViewer() {
    const viewer = document.getElementById('viewer');
    const closeBtn = viewer.querySelector('.viewer-close');
    const prevBtn = viewer.querySelector('.viewer-nav.prev');
    const nextBtn = viewer.querySelector('.viewer-nav.next');
    const img = viewer.querySelector('.viewer-image');
    
    closeBtn.addEventListener('click', closeViewer);
    viewer.addEventListener('click', (e) => { if (e.target === viewer) closeViewer(); });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        img.src = currentImages[currentIndex];
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        img.src = currentImages[currentIndex];
    });
    
    document.addEventListener('keydown', (e) => {
        if (!viewer.classList.contains('active')) return;
        if (e.key === 'Escape') closeViewer();
        if (e.key === 'ArrowLeft') nextBtn.click();
        if (e.key === 'ArrowRight') prevBtn.click();
    });
}

function openViewer(src) {
    const viewer = document.getElementById('viewer');
    const img = viewer.querySelector('.viewer-image');
    
    currentImages = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"]) img')).map(i => i.src);
    currentIndex = currentImages.indexOf(src);
    
    img.src = src;
    viewer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeViewer() {
    document.getElementById('viewer').classList.remove('active');
    document.body.style.overflow = '';
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.section-header, .gallery-item, .service-card, .about-container, .contact-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

// Add visible class styles
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// Console Easter Egg
console.log('%c✨ רייזי הבלין - צילום שלוכד נשמות', 'font-size: 20px; color: #d4af37; font-weight: bold;');
console.log('%cאתר נבנה באהבה 💛', 'font-size: 14px; color: #888;');
