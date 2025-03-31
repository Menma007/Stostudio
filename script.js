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
let hasShownNotification = false;

function handleOrientation() {
  const notification = document.getElementById('rotate-notification');
  
  if (window.matchMedia("(orientation: portrait)").matches && !hasShownNotification) {
    notification.style.display = 'flex';
    // Setelah animasi selesai, sembunyikan
    setTimeout(() => {
      notification.style.display = 'none';
      hasShownNotification = true;
    }, 800); // Sesuai durasi animasi (0.8s)
  } else {
    // Tampilkan konten utama saat landscape
    document.querySelectorAll('body > *:not(.rotate-notification)').forEach(el => {
      el.style.display = '';
    });
  }
}

// Deteksi perubahan orientasi
window.addEventListener('DOMContentLoaded', handleOrientation);
window.addEventListener('orientationchange', handleOrientation);
