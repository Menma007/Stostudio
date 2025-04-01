// script.js
let currentSlide = 0;
let isAnimating = false;
const animationDuration = 800;

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Orientation Handler
function handleOrientation() {
    const orientationAlert = document.querySelector('.orientation-alert');
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    
    orientationAlert.style.display = isPortrait ? 'flex' : 'none';
    document.querySelector('.hero').style.display = isPortrait ? 'none' : 'block';
}

// Slide Navigation
function goToSlide(index) {
    if (isAnimating || index === currentSlide) return;
    
    isAnimating = true;
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    
    updateControls();
    
    setTimeout(() => {
        isAnimating = false;
    }, animationDuration);
}

// Update Controls
function updateControls() {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Event Listeners
prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    handleOrientation();
    updateControls();
    
    // Set initial slide background
    document.querySelectorAll('.slide').forEach((slide, index) => {
        if(index !== 0) slide.style.opacity = 0;
    });
});

window.addEventListener('resize', handleOrientation);
window.addEventListener('orientationchange', handleOrientation);