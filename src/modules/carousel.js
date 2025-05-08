export function loadCarousel(games,render){
    const itemsPerSlide = 4;
    const carousel = document.createElement('div');
    carousel.classList = 'carousel';

    const slideContainer = document.createElement('div');
    slideContainer.classList = 'slide-container';
    carousel.appendChild(slideContainer);

    const slides = [];
    for(let i = 0; i < games.length; i += itemsPerSlide){
        const slide = document.createElement('div');
        slide.classList.add('carousel-item');

        const group = games.slice(i, i + itemsPerSlide);
        group.forEach(item =>{
            const element = render(item);
            slide.appendChild(element);
        })

        slideContainer.appendChild(slide);
        slides.push(slide);
        
    }

    const carouselActions = document.createElement('div');
    carouselActions.classList = 'carousel-actions'

    const prevBtn = document.createElement('button');
    prevBtn.id = 'carousel-prev-btn';
    prevBtn.setAttribute('aria-label', 'previous-slide');
    prevBtn.textContent = '<';

    const nextBtn = document.createElement('button');
    nextBtn.id = 'carousel-next-btn';
    nextBtn.setAttribute('aria-label', 'next-slide');
    nextBtn.textContent = '>';

    carousel.appendChild(carouselActions);
    carouselActions.appendChild(prevBtn);
    carouselActions.appendChild(nextBtn);

    let slidePosition = 0;
    const totalSlides = slides.length;
    
    function updateSlidePosition() {
        slides.forEach((slide, index) => {
            slide.style.display = 'none';
           
            if (index === slidePosition) {
                slide.style.display = 'flex';  
                slide.classList.add('carousel-active-item'); 
            } else {
                slide.classList.remove('carousel-active-item');  
            }
        });
    }

    function moveToNextSlide() {
        slidePosition = (slidePosition + 1) % totalSlides;
        updateSlidePosition();
    }

    function moveToPrevSlide() {
        slidePosition = (slidePosition - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    prevBtn.addEventListener('click', moveToPrevSlide);
    nextBtn.addEventListener('click', moveToNextSlide);

    updateSlidePosition();
    return carousel; 
}