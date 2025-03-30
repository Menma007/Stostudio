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

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Initialize first slide
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
});
