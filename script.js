// Slider Controller
let currentSlide = 0;
let isAnimating = false;
const animationDuration = 1000;

// Element Selectors
const slider = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Initialize Slider
function initSlider() {
  if (!slider || slides.length === 0) {
    console.error('Slider elements not found');
    return;
  }

  // Set initial positions
  slider.style.transition = `transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  updateControls();
  
  // Spline Viewer Isolation
  isolateSplineEvents();

  // Set initial active slide
  updateActiveSlide();
}

// Core Slide Function
function goToSlide(index) {
  if (isAnimating || !slider) return;
  
  // Validate index
  const lastIndex = slides.length - 1;
  index = Math.max(0, Math.min(index, lastIndex));
  
  // Don't animate if already on this slide
  if (index === currentSlide) return;
  
  // Animation lock
  isAnimating = true;
  
  // Update slide position
  slider.style.transform = `translateX(-${index * 100}%)`;
  currentSlide = index;
  
  // Update UI states
  updateActiveSlide();
  updateControls();
  
  // Reset animation lock
  setTimeout(() => {
    isAnimating = false;
  }, animationDuration);
}

// Update Visual States
function updateActiveSlide() {
  slides.forEach((slide, i) => {
    if (slide) {
      slide.classList.toggle('active', i === currentSlide);
      slide.style.zIndex = i === currentSlide ? 1 : 0;
    }
  });
}

// Control States
function updateControls() {
  if (!prevBtn || !nextBtn) return;
  
  // Button states
  prevBtn.classList.toggle('disabled', currentSlide === 0);
  nextBtn.classList.toggle('disabled', currentSlide === slides.length - 1);
  
  // Dot states
  dots.forEach((dot, i) => {
    if (dot) {
      dot.classList.toggle('active', i === currentSlide);
    }
  });
}

// Spline Event Isolation
function isolateSplineEvents() {
  const viewers = document.querySelectorAll('spline-viewer');
  if (!viewers) return;

  viewers.forEach(viewer => {
    viewer.addEventListener('click', e => e.stopPropagation());
    viewer.addEventListener('touchstart', e => e.stopPropagation());
  });
}

// Event Handlers
function handlePrev() {
  if (prevBtn && !prevBtn.classList.contains('disabled')) {
    goToSlide(currentSlide - 1);
  }
}

function handleNext() {
  if (nextBtn && !nextBtn.classList.contains('disabled')) {
    goToSlide(currentSlide + 1);
  }
}

// Add event listeners safely
function addEventListeners() {
  if (prevBtn) prevBtn.addEventListener('click', handlePrev);
  if (nextBtn) nextBtn.addEventListener('click', handleNext);

  dots.forEach((dot, index) => {
    if (dot) {
      dot.addEventListener('click', () => goToSlide(index));
    }
  });

  if (slider) {
    slider.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) {
        diff > 0 ? handleNext() : handlePrev();
      }
    });
  }
}

// Keyboard Navigation
function handleKeyboardNavigation(e) {
  if (e.key === 'ArrowLeft') handlePrev();
  if (e.key === 'ArrowRight') handleNext();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  addEventListeners();
  document.addEventListener('keydown', handleKeyboardNavigation);
});
