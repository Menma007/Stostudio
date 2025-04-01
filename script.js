let slideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slideIndex = index;
    
    document.querySelector('.slides').style.transform = `translateX(-${index * 100}vw)`;
    
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}
  // Handle 3D viewer
  document.querySelectorAll('spline-viewer').forEach(viewer => {
    viewer.style.opacity = '0';
  });
  
  if(slides[index].querySelector('spline-viewer')) {
    setTimeout(() => {
      slides[index].querySelector('spline-viewer').style.opacity = '1';
    }, 300);
  }
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % 3;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + 3) % 3;
    showSlide(slideIndex);
}

document.addEventListener('DOMContentLoaded', function() {
  const rotateIcon = document.querySelector('.rotate-icon');
  
  // Fungsi deteksi orientasi
  function handleOrientation() {
    // Method 1: Media Query
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    
    // Method 2: Fallback comparison
    const isHeightGreater = window.innerHeight > window.innerWidth;
    
    if (isPortrait || isHeightGreater) {
      rotateIcon.style.display = 'flex';
      console.log('Portrait mode - Showing icon');
    } else {
      rotateIcon.style.display = 'none';
      console.log('Landscape mode - Hiding icon');
    }
  }

  // Initial check
  handleOrientation();

  // Event listeners
  window.addEventListener('orientationchange', handleOrientation);
  
  // Fallback for some devices
  window.addEventListener('resize', function() {
    setTimeout(handleOrientation, 300);
  });
});
