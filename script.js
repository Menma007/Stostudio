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

function showRotateNotification() {
  if (hasShownNotification) return;
  
  const notification = document.getElementById('rotate-notification');
  notification.style.display = 'flex';
  notification.classList.add('active');
  
  setTimeout(() => {
    notification.classList.remove('active');
    setTimeout(() => {
      notification.style.display = 'none';
    }, 500); // Sesuai durasi fade out
  }, 2000); // Durasi total notifikasi
  
  hasShownNotification = true;
}

// Deteksi orientasi
function checkOrientation() {
  if (window.matchMedia("(orientation: portrait)").matches) {
    showRotateNotification();
  } else {
    document.querySelectorAll('body > *:not(.rotate-notification)').forEach(el => {
      el.style.filter = 'none';
    });
  }
}

// Event listeners
window.addEventListener('DOMContentLoaded', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

// Reset notifikasi saat reload
window.addEventListener('beforeunload', () => {
  hasShownNotification = false;
});
