let slideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slideIndex = index;
    
    document.querySelector('.slides').style.transform = `translateX(-${index * 100}vw)`;
    
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % 3;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + 3) % 3;
    showSlide(slideIndex);
}

// Inisialisasi awal tanpa auto-slide
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
});

// JavaScript untuk kontrol dinamis
const dynamicBox = document.querySelector('.dynamic-box');

function checkOrientation() {
  if (window.matchMedia("(orientation: portrait)").matches) {
    dynamicBox.style.display = 'block';
  } else {
    dynamicBox.style.display = 'none';
  }
}

// Deteksi perubahan orientasi
window.addEventListener('DOMContentLoaded', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

// Opsional: Efek klik
dynamicBox.addEventListener('click', function() {
  this.style.transform = 'translate(-50%, -50%) scale(0.9)';
  setTimeout(() => {
    this.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 300);
});
