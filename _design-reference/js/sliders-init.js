/**
 * ThePro3DStudio - Slick Slider Initialization
 * Portfolio Showcase Carousel + Testimonials Carousel.
 * centerMode + centerPadding produces the edge-to-edge "peek" effect;
 * Slick handles touch/swipe, drag, autoplay and looping natively.
 */
jQuery(function ($) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const $successStoriesSlick = $('#successStoriesSlick');
    if ($successStoriesSlick.length) {
        $successStoriesSlick.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            centerMode: true,
            centerPadding: '80px',
            autoplay: !prefersReducedMotion,
            autoplaySpeed: 1800,
            speed: 500,
            pauseOnHover: true,
            pauseOnFocus: true,
            arrows: true,
            prevArrow: '<button type="button" class="service-success-stories-nav-prev" aria-label="Previous success story"><i class="fa-solid fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="service-success-stories-nav-next" aria-label="Next success story"><i class="fa-solid fa-chevron-right"></i></button>',
            appendArrows: $('.service-success-stories-wrap .service-success-stories-nav'),
            dots: true,
            appendDots: $('.service-success-stories-wrap .service-success-stories-nav'),
            responsive: [
                { breakpoint: 1600, settings: { slidesToShow: 2, centerPadding: '60px' } },
                { breakpoint: 992, settings: { slidesToShow: 1, centerPadding: '40px' } },
                { breakpoint: 600, settings: { slidesToShow: 1, centerPadding: '24px' } },
            ],
        });
    }

    const $portfolioSlick = $('#portfolioSlick');
    if ($portfolioSlick.length) {
        $portfolioSlick.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            centerMode: true,
            centerPadding: '60px',
            autoplay: !prefersReducedMotion,
            autoplaySpeed: 2500,
            speed: 250,
            pauseOnHover: true,
            pauseOnFocus: true,
            arrows: true,
            prevArrow: '<button type="button" class="portfolio-nav portfolio-nav-prev" aria-label="Previous project"><i class="fa-solid fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="portfolio-nav portfolio-nav-next" aria-label="Next project"><i class="fa-solid fa-chevron-right"></i></button>',
            appendArrows: $('.portfolio-carousel-wrap .portfolio-carousel-nav'),
            dots: true,
            appendDots: $('.portfolio-carousel-wrap .portfolio-carousel-nav'),
            responsive: [
                { breakpoint: 1500, settings: { slidesToShow: 4, centerPadding: '50px' } },
                { breakpoint: 1250, settings: { slidesToShow: 3, centerPadding: '45px' } },
                { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: '40px' } },
                { breakpoint: 640, settings: { slidesToShow: 1, centerPadding: '32px' } },
            ],
        });
    }

    const $testimonialsSlick = $('#testimonialsSlick');
    if ($testimonialsSlick.length) {
        // Slick has no reliable built-in equal-height for horizontal mode —
        // quote length varies per card, so without this each card sizes to
        // its own content and the row looks uneven. Measure the tallest
        // real (non-cloned) card and apply it as min-height to every card,
        // including clones, so the infinite-loop copies match too.
        function equalizeTestimonialHeights() {
            const $cards = $testimonialsSlick.find('.testimonial-card');
            $cards.css('min-height', '');
            let max = 0;
            $testimonialsSlick.find('.testimonial-card:not(.slick-cloned)').each(function () {
                max = Math.max(max, this.getBoundingClientRect().height);
            });
            $cards.css('min-height', max + 'px');
        }

        $testimonialsSlick.on('init reInit setPosition breakpoint', () => {
            requestAnimationFrame(equalizeTestimonialHeights);
        });

        $testimonialsSlick.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            centerMode: true,
            centerPadding: '50px',
            autoplay: !prefersReducedMotion,
            autoplaySpeed: 3000,
            speed: 600,
            pauseOnHover: true,
            pauseOnFocus: true,
            arrows: false,
            dots: false,
           responsive: [
    {
        breakpoint: 1200,
        settings: {
            slidesToShow: 3,
            centerPadding: '35px'
        }
    },
    {
        breakpoint: 992,
        settings: {
            slidesToShow: 2,
            centerPadding: '30px'
        }
    },
    {
        breakpoint: 769,
        settings: {
            slidesToShow: 1,
            centerPadding: '28px'
        }
    }
],
        });

        let resizeTimer;
        $(window).on('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(equalizeTestimonialHeights, 150);
        });
    }
});
