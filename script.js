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

// Tambahkan di script.js
// Deteksi perubahan orientasi
function handleOrientation() {
  const notification = document.getElementById('rotate-notification');
  
  if (window.matchMedia("(orientation: portrait)").matches) {
    notification.style.display = 'flex';
  } else {
    notification.style.display = 'none';
    // Tampilkan kembali konten utama
    document.querySelectorAll('body > *:not(.rotate-notification)').forEach(el => {
      el.style.display = '';
    });
  }
}

// Jalankan saat pertama load dan saat orientasi berubah
window.addEventListener('DOMContentLoaded', handleOrientation);
window.addEventListener('orientationchange', handleOrientation);
