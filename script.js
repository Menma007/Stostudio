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

// Opsional: Deteksi orientasi lebih akurat
window.addEventListener('orientationchange', function() {
  const icon = document.getElementById('rotate-icon');
  icon.style.display = (window.orientation === 0 || window.orientation === 180) ? 'block' : 'none';
});

// Inisialisasi awal
window.addEventListener('DOMContentLoaded', function() {
  const icon = document.getElementById('rotate-icon');
  icon.style.display = (window.matchMedia("(orientation: portrait)").matches) ? 'block' : 'none';
});
