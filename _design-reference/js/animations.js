// ==========================================================================
// THEPRO3DSTUDIO - GSAP SCROLL ANIMATIONS
// 1. Generic fade-in reveal (.fade-anim, data-driven)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    ////////////////////////////////////////////////////
    // 1. Generic fade-in reveal
    // Attributes: data-fade-from (top|bottom|left|right), data-fade-offset,
    // data-duration, data-delay, data-ease, data-start, data-on-scroll (0|1)
    if (document.querySelectorAll('.fade-anim').length > 0) {
        gsap.utils.toArray('.fade-anim').forEach((item) => {
            if (!item) return;

            if (prefersReducedMotion) {
                gsap.set(item, { opacity: 1, x: 0, y: 0 });
                return;
            }

            const fadeOffset = parseFloat(item.getAttribute('data-fade-offset')) || 24;
            const duration = parseFloat(item.getAttribute('data-duration')) || 0.75;
            const fadeDirection = item.getAttribute('data-fade-from') || 'bottom';
            const onScrollAttr = item.getAttribute('data-on-scroll');
            const onScroll = onScrollAttr === null ? 1 : parseInt(onScrollAttr, 10);
            const delayParsed = parseFloat(item.getAttribute('data-delay'));
            const delay = isNaN(delayParsed) ? 0.15 : delayParsed;
            const ease = item.getAttribute('data-ease') || 'power2.out';
            const start = item.getAttribute('data-start') || '92%';

            const fromVars = {
                opacity: 0,
                x: fadeDirection === 'left' ? -fadeOffset : fadeDirection === 'right' ? fadeOffset : 0,
                y: fadeDirection === 'top' ? -fadeOffset : fadeDirection === 'bottom' ? fadeOffset : 0,
            };
            const toVars = {
                opacity: 1,
                x: 0,
                y: 0,
                ease: ease,
                duration: duration,
                delay: delay,
                clearProps: 'transform',
            };

            if (onScroll === 1 && typeof ScrollTrigger !== 'undefined') {
                toVars.scrollTrigger = {
                    trigger: item,
                    start: 'top ' + start,
                    toggleActions: 'play none none none',
                };
            }

            gsap.fromTo(item, fromVars, toVars);
        });
    }

    ////////////////////////////////////////////////////
    // 2. Service cards: scale + fade entrance with a left-to-right image wipe reveal
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        serviceCards.forEach((card, index) => {
            const img = card.querySelector('.service-card-img');
            const content = card.querySelector('.service-card-content');

            if (prefersReducedMotion) {
                gsap.set(card, { opacity: 1, y: 0, scale: 1 });
                if (img) gsap.set(img, { clipPath: 'inset(0% 0% 0% 0%)' });
                if (content) gsap.set(content, { opacity: 1, y: 0 });
                return;
            }

            gsap.set(card, { opacity: 0, y: 30, scale: 0.98 });
            if (img) gsap.set(img, { clipPath: 'inset(0% 100% 0% 0%)' });
            if (content) gsap.set(content, { opacity: 0, y: 16 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                delay: index * 0.1,
            });

            tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' });
            if (img) {
                tl.to(img, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power3.inOut' }, '<0.05');
            }
            if (content) {
                tl.to(content, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3');
            }
        });
    }

    ////////////////////////////////////////////////////
    // 3. Working Verticals: wheel-driven horizontal slider with LERP inertia.
    // Scrolling with the cursor over the card row moves the cards, not the page.
    // Once the last (or first) card is reached, the wheel event is no longer
    // intercepted, so the page's own scroll continues to the next/previous
    // section. Below the desktop threshold, falls back to native touch-swipe
    // scrolling. Mouse-drag is also supported, matching a grab-to-scroll feel.
    (function setupVerticalsSlider() {
        const wrap = document.querySelector('.verticals-slider-wrap');
        const track = document.getElementById('verticalsTrack');
        const prevBtn = document.getElementById('verticalsPrev');
        const nextBtn = document.getElementById('verticalsNext');
        if (!wrap || !track) return;

        const desktopQuery = window.matchMedia('(min-width: 1025px)');
        const LERP = 0.14;

        const state = {
            current: 0,
            target: 0,
            max: 0,
            raf: null,
        };

        function recalcMax() {
            state.max = Math.max(0, track.scrollWidth - track.clientWidth);
            state.target = Math.min(state.target, state.max);
            state.current = Math.min(state.current, state.max);
        }

        function getStep() {
            const card = track.querySelector('.vertical-card');
            if (!card) return track.clientWidth;
            const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
            return card.getBoundingClientRect().width + gap;
        }

        function updateButtons() {
            if (!prevBtn || !nextBtn) return;
            prevBtn.disabled = state.target <= 0.5;
            nextBtn.disabled = state.max <= 0.5 || state.target >= state.max - 0.5;
        }

        function applyTransform() {
            track.scrollLeft = state.current;
        }

        function render() {
            state.current += (state.target - state.current) * LERP;
            if (Math.abs(state.target - state.current) < 0.05) {
                state.current = state.target;
            }
            applyTransform();
            updateButtons();

            if (Math.abs(state.target - state.current) > 0.05) {
                state.raf = requestAnimationFrame(render);
            } else {
                state.raf = null;
            }
        }

        function nudge() {
            if (!state.raf) state.raf = requestAnimationFrame(render);
        }

        function setTarget(value) {
            state.target = Math.min(state.max, Math.max(0, value));
            nudge();
        }

        function handleWheel(e) {
            if (!desktopQuery.matches || state.max <= 0) return;
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            const wantsForward = delta > 0;
            const atStart = state.target <= 0.5;
            const atEnd = state.target >= state.max - 0.5;

            if ((wantsForward && atEnd) || (!wantsForward && atStart)) {
                return; // let the page scroll to the next/previous section
            }

            e.preventDefault();
            setTarget(state.target + delta * 1.1);
        }

        let dragging = false;
        let dragStartX = 0;
        let dragStartTarget = 0;
        let dragMoved = false;

        function handlePointerDown(e) {
            if (!desktopQuery.matches || state.max <= 0) return;
            dragging = true;
            dragMoved = false;
            dragStartX = e.clientX;
            dragStartTarget = state.target;
            track.classList.add('is-dragging');
        }

        function handlePointerMove(e) {
            if (!dragging) return;
            const deltaX = dragStartX - e.clientX;
            if (Math.abs(deltaX) > 3) dragMoved = true;
            setTarget(dragStartTarget + deltaX);
        }

        function handlePointerUp() {
            if (!dragging) return;
            dragging = false;
            track.classList.remove('is-dragging');
        }

        function handleCardClick(e) {
            if (dragMoved) {
                e.preventDefault();
                dragMoved = false;
            }
        }

        function goPrev() {
            setTarget(state.target - getStep());
        }

        function goNext() {
            setTarget(state.target + getStep());
        }

        function applyMode(isDesktop) {
            recalcMax();
            if (!isDesktop) {
                state.current = 0;
                state.target = 0;
                track.style.transform = '';
                track.scrollLeft = 0;
            } else {
                applyTransform();
            }
            updateButtons();
        }

        applyMode(desktopQuery.matches);
        if (desktopQuery.addEventListener) {
            desktopQuery.addEventListener('change', (e) => applyMode(e.matches));
        }

        wrap.addEventListener('wheel', handleWheel, { passive: false });
        track.addEventListener('mousedown', handlePointerDown);
        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('mouseup', handlePointerUp);
        track.addEventListener('dragstart', (e) => e.preventDefault());
        track.addEventListener('click', handleCardClick, true);
        track.addEventListener('scroll', updateButtons, { passive: true });

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => applyMode(desktopQuery.matches), 200);
        });

        if (prevBtn) prevBtn.addEventListener('click', goPrev);
        if (nextBtn) nextBtn.addEventListener('click', goNext);
    })();

    ////////////////////////////////////////////////////
    // 4. CTA Home: image wipe reveal on the contact card + a subtle
    // background parallax while scrolling through the section.
    const ctaCard = document.getElementById('ctaHomeCard');
    if (ctaCard && !prefersReducedMotion) {
        const cardImg = ctaCard.querySelector('.cta-home-card-img');
        if (cardImg) {
            gsap.set(cardImg, { clipPath: 'inset(0% 100% 0% 0%)' });
            gsap.to(cardImg, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: ctaCard,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        }
    }

    const ctaBgImg = document.querySelector('.cta-home-bg-img');
    const ctaSection = document.querySelector('.cta-home-section');
    if (ctaBgImg && ctaSection && !prefersReducedMotion && typeof ScrollTrigger !== 'undefined') {
        gsap.set(ctaBgImg, { scale: 1.15 });
        gsap.fromTo(ctaBgImg, { y: '-4%' }, {
            y: '4%',
            ease: 'none',
            scrollTrigger: {
                trigger: ctaSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    }

    ////////////////////////////////////////////////////
    // 5. Success Stories: cards reveal one-by-one, in sequence, as the grid
    // scrolls into view. A single trigger on the grid drives a staggered
    // timeline across all four cards, rather than each card triggering
    // independently off its own scroll position.
    const successStoriesGrid = document.querySelector('.success-stories-grid');
    if (successStoriesGrid && typeof ScrollTrigger !== 'undefined') {
        const storyCards = successStoriesGrid.querySelectorAll('.success-story-card');
        if (storyCards.length > 0) {
            if (prefersReducedMotion) {
                gsap.set(storyCards, { opacity: 1, y: 0 });
            } else {
                gsap.from(storyCards, {
                    opacity: 0,
                    y: 40,
                    duration: 0.7,
                    ease: 'power2.out',
                    stagger: 0.18,
                    scrollTrigger: {
                        trigger: successStoriesGrid,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            }
        }
    }

    ////////////////////////////////////////////////////
    // 6. Success Stories: image zoom-in reveal on scroll (each card image
    // starts scaled up + invisible, then scales down to normal while fading
    // in as it enters the viewport).
    const successStoryMedia = document.querySelectorAll('.success-story-media');
    if (successStoryMedia.length > 0 && typeof ScrollTrigger !== 'undefined') {
        successStoryMedia.forEach((wrap) => {
            const img = wrap.querySelector('.success-story-img');
            if (!img) return;

            if (prefersReducedMotion) {
                gsap.set(img, { opacity: 1, scale: 1 });
                return;
            }

            gsap.fromTo(img, { autoAlpha: 0, scale: 1.2 }, {
                autoAlpha: 1,
                scale: 1,
                duration: 2,
                ease: 'power2.out',
                clearProps: 'all',
                scrollTrigger: {
                    trigger: wrap,
                    start: 'top 100%',
                    toggleActions: 'play none none none',
                },
            });
        });
    }

    ////////////////////////////////////////////////////
    // 7. Recalculate ScrollTrigger positions once every image has finished
    // loading. Trigger points are first computed on DOMContentLoaded, before
    // the page's true final height is known (lazy images further down —
    // portfolio, testimonials, blog, CTA — haven't loaded yet), so sections
    // near the bottom of the page can end up with stale/incorrect trigger
    // offsets and fail to reveal correctly on scroll without this refresh.
    if (typeof ScrollTrigger !== 'undefined') {
        window.addEventListener('load', () => ScrollTrigger.refresh());
    }
});
