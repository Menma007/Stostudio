let slideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slideIndex = index;
    
    // Geser slideshow
    document.querySelector('.slides').style.transform = `translateX(-${index * 100}vw)`;
    
    // Update status aktif
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

function nextSlide() {
    const totalSlides = document.querySelectorAll('.slide').length;
    slideIndex = (slideIndex + 1) % totalSlides;
    showSlide(slideIndex);
}

function prevSlide() {
    const totalSlides = document.querySelectorAll('.slide').length;
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    showSlide(slideIndex);
}

// Auto slide (opsional)
// setInterval(nextSlide, 5000);
