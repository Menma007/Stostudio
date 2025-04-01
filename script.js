// script.js
let currentSlide = 0;
let isAnimating = false;
const animationDuration = 1000;

// Elements
const slider = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Orientation Check
function checkOrientation() {
    const orientationAlert = document.querySelector('.orientation-alert');
    const hero = document.querySelector('.hero');
    
    if (window.matchMedia("(orientation: portrait)").matches) {
        orientationAlert.style.display = 'flex';
        hero.style.display = 'none';
    } else {
        orientationAlert.style.display = 'none';
        hero.style.display = 'block';
    }
}

// Slider Functions
function updateControls() {
    prevBtn.classList.toggle('disabled', currentSlide === 0);
    nextBtn.classList.toggle('disabled', currentSlide === slides.length - 1);
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function goToSlide(index) {
    if (isAnimating) return;
    index = Math.max(0, Math.min(index, slides.length - 1));
    
    isAnimating = true;
    slides[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    
    updateControls();
    
    setTimeout(() => {
        isAnimating = false;
    }, animationDuration);
}

// Event Listeners
prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    updateControls();
});