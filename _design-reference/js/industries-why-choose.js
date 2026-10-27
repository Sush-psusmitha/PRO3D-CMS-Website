/**
 * ThePro3DStudio - Industries "Why Choose Us" Scroll-Hijacked Card Slider
 * Ported from the Orisa template's services-details-2 "sd2-pipeline"
 * section (assets/js/services-details-2.js -> initPipeline()): as the user
 * scrolls down, the section pins in place and the card track is driven
 * horizontally in lockstep with vertical scroll (GSAP ScrollTrigger,
 * scrub), with a progress bar reflecting how far through the cards the
 * user is. The section only releases back to normal vertical scrolling -
 * letting the next section in - once the last card has been reached.
 *
 * Runs at every viewport width. Only prefers-reduced-motion falls back to
 * a plain natively-scrollable track (see the matching @media block in
 * css/style.css).
 */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.industries-why-choose-us');
    if (!section) return;

    const pin = section.querySelector('.industries-why-choose-pin');
    const track = section.querySelector('.industries-why-choose-track');
    const bar = section.querySelector('.industries-why-choose-progress-bar');
    if (!pin || !track) return;

    // Mobile browsers fire resize when the address bar shows/hides; refreshing
    // on that makes the pin jump mid-scroll.
    ScrollTrigger.config({ ignoreMobileResize: true });

    // How far the track needs to travel to bring its last card fully into
    // view: total track width minus one viewport width, plus a small
    // buffer so the last card doesn't end up flush against the edge.
    const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth + 40);

    // gsap.matchMedia re-evaluates on resize and reverts the tween + pin when
    // the query stops matching, so toggling reduced motion (or resizing in
    // devtools) never leaves a stale pin behind.
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(track, {
            x: () => -getScroll(),
            ease: 'none',
            scrollTrigger: {
                trigger: pin,
                start: 'top top',
                // The vertical scroll distance the pin stays engaged for:
                // matches the horizontal distance the track needs to travel,
                // plus a little extra so it settles before releasing.
                end: () => '+=' + (getScroll() + window.innerHeight * 0.35),
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                // animations.js creates the fade-in triggers for sections
                // below this one first; refresh the pin before them so their
                // start positions include the pin's added scroll distance.
                refreshPriority: 1,
                onUpdate: (self) => {
                    if (bar) gsap.set(bar, { width: self.progress * 100 + '%' });
                },
            },
        });
    });

    // The pin's start offset is measured once; anything above it that changes
    // height afterwards (lazy images, slick sliders, web fonts) leaves it
    // stale, so the pin engages at the wrong scroll position and the section
    // shows as an empty dark block. Re-measure whenever the page height shifts.
    let refreshTimer;
    const queueRefresh = () => {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    if ('ResizeObserver' in window) {
        let lastHeight = document.body.scrollHeight;
        new ResizeObserver(() => {
            const h = document.body.scrollHeight;
            if (h !== lastHeight) {
                lastHeight = h;
                queueRefresh();
            }
        }).observe(document.body);
    }

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(queueRefresh);
    window.addEventListener('load', queueRefresh);
});
