// Versi final yang sudah diuji
let slideIndex = 0;
const transitionDuration = 500; // Sesuaikan dengan CSS

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const slidesContainer = document.querySelector('.slides');
  const dots = document.querySelectorAll('.dot');
  
  // Validasi index
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  
  slideIndex = index;
  
  // Update tampilan
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  
  slidesContainer.style.transform = `translateX(-${index * 100}vw)`;
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  updateArrowState(); // Tambahkan ini di akhir fungsi
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

function prevSlide() {
  showSlide(slideIndex - 1);
}

// Tambahkan fungsi untuk update arrow state
function updateArrowState() {
  const prevBtn = document.querySelector('.arrow-btn.prev');
  const nextBtn = document.querySelector('.arrow-btn.next');
  const totalSlides = document.querySelectorAll('.slide').length;

  prevBtn.style.opacity = slideIndex === 0 ? '0.5' : '1';
  nextBtn.style.opacity = slideIndex === totalSlides - 1 ? '0.5' : '1';
  
  prevBtn.style.cursor = slideIndex === 0 ? 'not-allowed' : 'pointer';
  nextBtn.style.cursor = slideIndex === totalSlides - 1 ? 'not-allowed' : 'pointer';
}

// Tambahkan event listener untuk hover effect
document.querySelectorAll('.arrow-btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    if(this.classList.contains('prev')) {
      this.querySelector('.arrow-icon').style.transform = 'translateX(-3px)';
    } else {
      this.querySelector('.arrow-icon').style.transform = 'translateX(3px)';
    }
  });
  
  btn.addEventListener('mouseleave', function() {
    this.querySelector('.arrow-icon').style.transform = 'translateX(0)';
  });
});

// Event delegation untuk menghindari conflict dengan Spline
document.addEventListener('click', function(e) {
  const target = e.target;
  
  if (target.closest('.prev')) {
    e.preventDefault();
    e.stopPropagation();
    prevSlide();
  }
  
  if (target.closest('.next')) {
    e.preventDefault();
    e.stopPropagation();
    nextSlide();
  }
  
  if (target.closest('.dot')) {
    e.preventDefault();
    e.stopPropagation();
    const dotIndex = [...document.querySelectorAll('.dot')].indexOf(target.closest('.dot'));
    showSlide(dotIndex);
  }
});

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  showSlide(0);
  
  // Isolasi event Spline viewer
  const splineViewers = document.querySelectorAll('spline-viewer');
  splineViewers.forEach(viewer => {
    viewer.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
});
