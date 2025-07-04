// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }));

    // Close menu on window resize if open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Calculate navbar height dynamically on mobile
function updateNavbarHeight() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        const navbarHeight = navbar.offsetHeight;
        navMenu.style.top = navbarHeight + 'px';
        navMenu.style.maxHeight = `calc(100vh - ${navbarHeight}px)`;
        
        // Update hero padding
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.paddingTop = `calc(${navbarHeight}px + 1.5rem)`;
        }
        
        // Update scroll padding
        document.documentElement.style.scrollPaddingTop = navbarHeight + 'px';
    }
}

// Call on load and resize
window.addEventListener('load', updateNavbarHeight);
window.addEventListener('resize', updateNavbarHeight);

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.program-day, .facilitator, .ticket-card, .highlight-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background img');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize body opacity
document.body.style.opacity = '0';

// Ticket card hover effects
document.querySelectorAll('.ticket-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px rgba(139, 115, 85, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Add zen-like breathing animation to key elements
function addBreathingAnimation() {
    const zenElements = document.querySelectorAll('.hero-title, .monastery-subtitle');
    
    zenElements.forEach(el => {
        el.style.animation = 'breathe 4s ease-in-out infinite';
    });
}

// Add CSS for breathing animation
const style = document.createElement('style');
style.textContent = `
    @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
`;
document.head.appendChild(style);

// Initialize breathing animation
document.addEventListener('DOMContentLoaded', addBreathingAnimation);

// Add zen sound effect on button clicks (optional)
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create a subtle visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #8B7355, #D4AF37);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', addScrollProgress);

/* ── Aggiorna dinamicamente l'altezza della navbar ── */
function syncNavHeight() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const h = nav.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--nav-h-mobile', `${h}px`);
  }
  
  /* esegui a caricamento pagina e ad ogni resize/orientamento */
  window.addEventListener('load',   syncNavHeight);
  window.addEventListener('resize', syncNavHeight);

  function syncNavHeight(){
    const h = document.querySelector('.navbar').getBoundingClientRect().height;
    document.documentElement.style.setProperty('--nav-h-mobile', h + 'px');
  }
  window.addEventListener('load',   syncNavHeight);
  window.addEventListener('resize', syncNavHeight);

  function setDynamicOffsets(){
    const nav  = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    if (!nav || !hero) return;
  
    // altezza effettiva della barra
    const h = nav.getBoundingClientRect().height;
  
    // aggiorna la custom property usata nel CSS
    document.documentElement.style.setProperty('--nav-h-mobile', `${h}px`);
  
    // spazio interno all’hero
    hero.style.paddingTop = `calc(${h}px + 1.5rem)`;
  
    // offset per gli anchor-link (#festival, #programma…)
    document.documentElement.style.scrollPaddingTop = `${h}px`;
  }
  
  // al primo caricamento e a ogni resize/orientamento
  window.addEventListener('DOMContentLoaded', setDynamicOffsets);
  window.addEventListener('resize',          setDynamicOffsets);
  
  
  