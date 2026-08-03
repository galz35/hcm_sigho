const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.querySelector('.slider-dots');

let current = 0;


slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if(i===0) dot.classList.add('active');
    dot.onclick = ()=>showSlide(i);
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.slider-dots span');

function showSlide(index){

    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = index;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
}

document.querySelector('.slider-next').onclick = ()=>{
    showSlide((current+1)%slides.length);
};

document.querySelector('.slider-prev').onclick = ()=>{
    showSlide((current-1+slides.length)%slides.length);
};


setInterval(()=>{
    showSlide((current+1)%slides.length);
},15000);