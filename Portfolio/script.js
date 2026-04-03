// ==========================================
// Smooth scrolling for navigation links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ==========================================
// Mobile Menu Toggle
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ==========================================
// Sticky Navbar & Active Link Update on Scroll
// ==========================================
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Navbar styling on scroll
    if (window.scrollY > 50) {
        header.style.padding = '10px 10%';
    } else {
        header.style.padding = '20px 10%';
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// ==========================================
// Scroll Reveal Animations
// ==========================================
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', reveal);
// Trigger once on load
reveal();

// ==========================================
// Typewriter Effect for Hero Title
// ==========================================
const roles = [
    "ICT Undergraduate",
    "Business Analyst",
    "UI/UX Enthusiast",
    "Front-End Developer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;
const typewriterElement = document.querySelector('.typewriter');

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster deleting
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 120; // Normal typing speed
    }

    // Blink cursor effect with CSS border-right in styles, but here we just manage text
    
    // If word is completely typed out
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at the end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
}

// Start typing effect on load
document.addEventListener("DOMContentLoaded", () => {
    if(typewriterElement) {
        typewriterElement.innerHTML = '&nbsp;'; // Reserve height
        setTimeout(type, 1000);
    }
});

// ==========================================
// Dark Mode Toggle Logic
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}
