// Main JS for Ghost Kitchen Template V2

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle logic removed - handled by navbar-v4.js

    // Enhanced Scroll Reveal (AOS Style)
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Mobile Menu Toggle removed - handled by navbar-v3.js

    // Basic Testimonial Slider
    const tracks = document.querySelector('.testimonial-track');
    if (tracks) {
        let index = 0;
        const slides = document.querySelectorAll('.testimonial-slide');
        
        const updateTestimonials = () => {
            const isRTL = document.documentElement.dir === 'rtl';
            const multiplier = isRTL ? 1 : -1;
            tracks.style.transform = `translateX(${index * 100 * multiplier}%)`;
        };

        const nextSlide = () => {
            index = (index + 1) % slides.length;
            updateTestimonials();
        };

        let testimonialInterval = setInterval(nextSlide, 5000);
        
        window.addEventListener('directionChanged', updateTestimonials);
    }

    // Navbar scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // V4 Mouse Parallax Effect
    const heroCollage = document.querySelector('.hero-collage');
    if (heroCollage) {
        document.addEventListener('mousemove', (e) => {
            const items = document.querySelectorAll('.parallax-item');
            const isRTL = document.documentElement.dir === 'rtl';
            
            // Invert mouse X calculation for RTL if needed, but usually 
            // parallax follows screen coordinates. If layout is mirrored, 
            // we might want to invert the initial offset.
            const x = (window.innerWidth - e.pageX * 2) / 100 * (isRTL ? -1 : 1);
            const y = (window.innerHeight - e.pageY * 2) / 100;

            items.forEach(item => {
                const speed = item.getAttribute('data-speed');
                const xShift = x * speed * 50;
                const yShift = y * speed * 50;
                item.style.transform = `translate(${xShift}px, ${yShift}px)`;
            });
        });
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it was not already open
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 15. Live Kitchen Pulse - Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const countUp = (target) => {
        const value = +target.innerText;
        const dataTarget = +target.getAttribute('data-target');
        const increment = dataTarget / speed;

        if (value < dataTarget) {
            target.innerText = Math.ceil(value + increment);
            setTimeout(() => countUp(target), 1);
        } else {
            target.innerText = dataTarget + (dataTarget === 4.9 ? '' : '+');
        }
    };

    // Trigger counters when they scroll into view
    const observerOptions = { threshold: 0.5 };
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                countUp(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // 16. Signature Selections Carousel Logic
    const track = document.getElementById('signature-track');
    const prevBtn = document.getElementById('signature-prev');
    const nextBtn = document.getElementById('signature-next');

    if (track && prevBtn && nextBtn) {
        let currentPosition = 0;
        let autoSlideInterval;
        
        const getGap = () => {
            const gapStr = window.getComputedStyle(track).gap;
            return parseInt(gapStr) || 0;
        };

        const updateCarousel = () => {
            const card = track.querySelector('.dish-card');
            if (!card) return;
            
            const cardWidth = card.offsetWidth;
            const gap = getGap();
            const maxScroll = track.scrollWidth - track.offsetWidth;
            const isRTL = document.documentElement.dir === 'rtl';
            
            // Limit position
            currentPosition = Math.max(0, Math.min(currentPosition, maxScroll));
            
            // In RTL with row-reverse, translateX positive moves it to the left 
            // from the right starting point.
            const multiplier = isRTL ? 1 : -1;
            track.style.transform = `translateX(${currentPosition * multiplier}px)`;
        };

        const nextSlide = () => {
            const card = track.querySelector('.dish-card');
            if (!card) return;
            const cardWidth = card.offsetWidth;
            const gap = getGap();
            const maxScroll = track.scrollWidth - track.offsetWidth;

            if (currentPosition >= maxScroll - 5) {
                currentPosition = 0; // Loop back to start
            } else {
                currentPosition += (cardWidth + gap);
            }
            updateCarousel();
        };

        const prevSlide = () => {
            const card = track.querySelector('.dish-card');
            if (!card) return;
            const cardWidth = card.offsetWidth;
            const gap = getGap();
            if (currentPosition <= 0) {
                const maxScroll = track.scrollWidth - track.offsetWidth;
                currentPosition = maxScroll; // Loop to end
            } else {
                currentPosition -= (cardWidth + gap);
            }
            updateCarousel();
        };

        const startAutoSlide = () => {
            stopAutoSlide();
            autoSlideInterval = setInterval(nextSlide, 5000);
        };

        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };

        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide(); // Reset timer on interaction
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide(); // Reset timer on interaction
        });

        // Pause on Hover
        track.addEventListener('mouseenter', stopAutoSlide);
        track.addEventListener('mouseleave', startAutoSlide);

        // Initialize and handle resize + direction change
        window.addEventListener('resize', updateCarousel);
        window.addEventListener('directionChanged', () => {
            currentPosition = 0; // Reset position on direction change to avoid jumps
            updateCarousel();
        });
        
        setTimeout(() => {
            updateCarousel();
            startAutoSlide();
        }, 1000);
    }
});
