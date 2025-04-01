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
    const hero = document.querySelector('.hero');
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    
    orientationAlert.style.display = isPortrait ? 'flex' : 'none';
    hero.style.display = isPortrait ? 'none' : 'block';
}

// Slide Navigation
function goToSlide(index) {
    if (isAnimating || index < 0 || index >= slides.length) return;
    
    isAnimating = true;
    
    // Animasikan transisi
    slides[currentSlide].style.opacity = 0;
    slides[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].style.opacity = 1;
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
    
    // Update arrow visibility
    prevBtn.style.display = currentSlide === 0 ? 'none' : 'flex';
    nextBtn.style.display = currentSlide === slides.length-1 ? 'none' : 'flex';
}

// Event Listeners
prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    // Set initial states
    slides.forEach((slide, index) => {
        slide.style.opacity = index === 0 ? 1 : 0;
    });
    updateControls();
    handleOrientation();
});

window.addEventListener('resize', handleOrientation);
window.addEventListener('orientationchange', handleOrientation);