// ===== DARK/LIGHT MODE TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeToggleDesktop = document.getElementById('themeToggleDesktop');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark-mode';
if (currentTheme === 'light-mode') {
    body.classList.add('light-mode');
    updateThemeIcons('light');
} else {
    updateThemeIcons('dark');
}

function updateThemeIcons(mode) {
    const icon = mode === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    const label = mode === 'light' ? 'Light Mode' : 'Dark Mode';
    
    themeToggle.innerHTML = icon + `<span class="theme-label">${label}</span>`;
    themeToggleDesktop.innerHTML = icon;
}

function toggleTheme() {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light-mode');
        updateThemeIcons('light');
    } else {
        localStorage.setItem('theme', 'dark-mode');
        updateThemeIcons('dark');
    }
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleDesktop.addEventListener('click', toggleTheme);

// ===== SMOOTH SCROLLING & ACTIVE NAV LINK =====
const navLinks = document.querySelectorAll('.nav-link');

// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking on theme toggle in menu
themeToggle.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get the section
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== BUTTON ANIMATIONS & INTERACTIONS =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleAnimation 0.6s ease-out';
    });
});

// ===== FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
        const message = contactForm.querySelector('textarea[placeholder="Your Message"]').value;
        
        // Validate form
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        animation: slideIn 0.4s ease-out;
        z-index: 2000;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #7c3aed, #a855f7)';
        notification.style.color = '#ffffff';
    } else {
        notification.style.background = '#ff6b6b';
        notification.style.color = '#ffffff';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards, project cards, and experience items
document.querySelectorAll('.skill-card, .project-card, .experience-card, .about-text').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== PROJECT CARD INTERACTIONS =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== SKILL CARD GLOW EFFECT =====
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 0 40px rgba(124, 58, 237, 0.6)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = 'none';
    });
});

// ===== NAVBAR SHADOW ON SCROLL =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(124, 58, 237, 0.15)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== ADD RIPPLE ANIMATION CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(4);
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .nav-link.active {
        color: #82ed3a;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// ===== PARALLAX EFFECT ON MOUSE MOVE =====
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach(shape => {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== BUTTON RIPPLE EFFECT =====
const primaryButtons = document.querySelectorAll('.btn-primary, .btn-details');

primaryButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: rippleAnimation 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== INTERSECTION OBSERVER FOR LAZY LOADING =====
const images = document.querySelectorAll('.project-image img');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
            imageObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

images.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'all 0.5s ease-out';
    imageObserver.observe(img);
});

// ===== TOUCH SUPPORT FOR MOBILE =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const navMenu = document.querySelector('.nav-menu');
    if (touchEndX < touchStartX - 50) {
        // Swiped left
        console.log('Swiped left');
    }
    if (touchEndX > touchStartX + 50) {
        // Swiped right
        console.log('Swiped right');
    }
}

// ===== PERFORMANCE OPTIMIZATION: DEBOUNCE SCROLL =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll event for better performance
const debouncedScroll = debounce(() => {
    // Scroll calculations here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===== INITIALIZE ANIMATIONS ON PAGE LOAD =====
window.addEventListener('load', () => {
    // Add entrance animation to hero section
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.animation = 'fadeInUp 0.8s ease-out';
    }
    
    // Add staggered animation to nav links
    navLinks.forEach((link, index) => {
        link.style.animation = `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s both`;
    });
});

// ===== CONSOLE MESSAGE =====
console.log('%cWelcome to Riya\'s Portfolio! 🚀', 'font-size: 20px; color: #7c3aed; font-weight: bold;');
console.log('%cLet\'s build something amazing together!', 'font-size: 14px; color: #a855f7;');
