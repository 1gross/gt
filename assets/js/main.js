document.addEventListener('DOMContentLoaded', () => {
    initBrowserSlider();
    initAnimationObserver();
    initFeaturesSlider();
    initFaqs();

    initMobileMenu();
});

function initMobileMenu(){
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobile-menu');
    const menuBlock = menu.getElementsByClassName('mobile-menu-block')[0];
    const closeBtn = menu.getElementsByClassName('close')[0];

    menu.addEventListener('click', (e)=>{
        if (!menuBlock.contains(e.target)) {
            toggleMenu();
        }
    });
    closeBtn.addEventListener('click', () => {
        toggleMenu();
    });

    burger.addEventListener('click', () => {
        console.log(1);
        menu.classList.toggle('active');
    });
    const toggleMenu = () => {
        menu.classList.toggle('active')
    }
}
function initBrowserSlider() {
    const interval = 3700;
    let currentIndex = 0;
    let slideInterval;
    let isPaused = false;

    const changeBulletColor = (slideIndex) => {
        const bulletsColor = slides[slideIndex].dataset.bulletBg
        bulletsContainer.setAttribute('data-bg', bulletsColor);
    }

    const slider = document.getElementById('browser-slider');
    const slides = slider.getElementsByClassName('slide');
    const bulletsContainer = slider.getElementsByClassName('bullets')[0];

    changeBulletColor(currentIndex);

    for (let i = 0; i < slides.length; i++) {
        const bullet = document.createElement('div');
        bullet.innerHTML = '<div class="bullet-progress"></div>';
        bullet.classList.add('bullet');
        bulletsContainer.appendChild(bullet);
    }

    const bullets = bulletsContainer.getElementsByClassName('bullet');


    const switchSlide = (newIndex) => {
        slides[currentIndex].classList.remove('active');
        bullets[currentIndex].classList.remove('active');
        currentIndex = newIndex;
        changeBulletColor(newIndex);
        slides[newIndex].classList.add('active');
        bullets[newIndex].classList.add('active');
    }

    const showNextSlide = () => {
        switchSlide((currentIndex + 1) % slides.length);
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const sliderObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bullets[isPaused ? currentIndex : 0].classList.add('active');
                slideInterval = setInterval(showNextSlide, interval);
            } else {
                clearInterval(slideInterval);
                bullets[currentIndex].classList.remove('active');
                isPaused = true;
            }
        });
    }, observerOptions);
    sliderObserver.observe(slider);
}

function initAnimationObserver() {
    const sliders = document.getElementsByClassName('animation');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 1
    };
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);
    for (let i = 0; i < sliders.length; i++) {
        animationObserver.observe(sliders[i]);
    }
}

function initFeaturesSlider() {
    const interval = 3700;
    let currentIndex = 0;
    let isPaused = false;
    let slideInterval;

    const slider = document.getElementById('features-slider');
    const slides = slider.getElementsByClassName('features-slider-slide');

    const bullets = slider.getElementsByClassName('features-slider-bullet');

    const arrowNext = slider.getElementsByClassName('arrow-next')[0];
    const arrowPrev = slider.getElementsByClassName('arrow-prev')[0];

    arrowNext.addEventListener('click', ()=>{
        switchSlide((currentIndex + 1) % slides.length);
        resetInterval();
    });

    arrowPrev.addEventListener('click', ()=>{
        switchSlide((currentIndex - 1 + slides.length) % slides.length);
        resetInterval();
    });

    for (let i = 0; i < bullets.length; i++) {
        bullets[i].addEventListener('click', () => {
            switchSlide(i);
            resetInterval();
        })
    }
    const deactivateBullet = () => {
        bullets[currentIndex].classList.remove('active');
        bullets[currentIndex].getElementsByClassName('features-slider-bullet-description')[0].style.height = '0px';
    };
    const activateBullet = (index) => {
        bullets[index].classList.add('active');
        const bulletDescription = bullets[currentIndex].getElementsByClassName('features-slider-bullet-description')[0];
        bulletDescription.style.height = `${bulletDescription.scrollHeight}px`;
    };

    const switchSlide = (newIndex) => {
        slides[currentIndex].classList.remove('active');
        deactivateBullet();

        currentIndex = newIndex;

        slides[newIndex].classList.add('active');
        activateBullet(newIndex);
    }

    const showNextSlide = () => {
        switchSlide((currentIndex + 1) % slides.length);
    }

    const resetInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(showNextSlide, interval);
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const sliderObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateBullet(isPaused ? currentIndex : 0);
                slideInterval = setInterval(showNextSlide, interval);
            } else {
                clearInterval(slideInterval);
                deactivateBullet();
                isPaused = true;
            }
        });
    }, observerOptions);
    sliderObserver.observe(slider);
}

function initFaqs() {
    const faqs = document.getElementsByClassName('faq-item');
    for (let i = 0; i < faqs.length; i++) {
        faqs[i].addEventListener('click', (e) => {
            const currentFaq = e.currentTarget;
            if (currentFaq.classList.contains('active')) {
                currentFaq.classList.remove('active');
                currentFaq.getElementsByClassName('faq-item-description')[0].removeAttribute('style');
            } else {
                for (let j = 0; j < faqs.length; j++) {
                    if (faqs[j].classList.contains('active')) {
                        faqs[j].classList.remove('active');
                        faqs[j].getElementsByClassName('faq-item-description')[0].removeAttribute('style');
                    }
                }
                console.log(1);
                currentFaq.classList.add('active');
                currentFaq.getElementsByClassName('faq-item-description')[0].style.height = `${currentFaq.getElementsByClassName('faq-item-description')[0].scrollHeight}px`;
            }
        });
    }
}