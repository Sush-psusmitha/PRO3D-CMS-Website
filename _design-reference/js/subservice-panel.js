/**
 * ThePro3DStudio - "What We Do" Sub-Service Panel (.what-we-do-subservice)
 * Ported from the Orisa template's .at-service-area.at-panel-pin-area
 * section: hovering a list item cross-fades in its matching stacked image
 * (mirrors the reference's "portfolio-item-hover" script).
 *
 * The media column's "stays in place while the list scrolls past" behavior
 * is plain CSS `position: sticky` on .what-we-do-subservice-media-inner
 * (see css/style.css), not GSAP/ScrollTrigger. A GSAP ScrollTrigger `pin`
 * was tried first and repeatedly misbehaved here (wrong engage/release
 * offset on reload, and later the image rendering detached from its column
 * entirely) - sticky needs no scroll-position math, no load-order handling,
 * and no JS at all, so it's the more robust choice for this "no per-item
 * position change" case. (It does need every ancestor of the sticky element
 * to have `overflow: visible` - see the comments on .what-we-do-subservice
 * and .what-we-do-subservice-grid in css/style.css.)
 */
document.addEventListener('DOMContentLoaded', () => {
    ////////////////////////////////////////////////////
    // Hover cross-fade: list item -> matching stacked image
    document.querySelectorAll('.what-we-do-subservice').forEach((section) => {
        const items = section.querySelectorAll('.what-we-do-subservice-item');
        const images = section.querySelectorAll('.what-we-do-subservice-image');
        if (!items.length || !images.length || typeof gsap === 'undefined') return;

        gsap.set(images, { opacity: 0, y: 50, scale: 1 });
        gsap.set(images[0], { opacity: 1, y: 0, zIndex: 2 });

        items.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                items.forEach((el) => el.classList.remove('is-active'));
                item.classList.add('is-active');
                images.forEach((img, i) => {
                    if (i === index) {
                        gsap.to(img, { opacity: 1, y: 0, scale: 1, duration: 0.8, zIndex: 2 });
                    } else {
                        gsap.to(img, { opacity: 0, y: 200, scale: 0.8, duration: 0.8, zIndex: 1 });
                    }
                });
            });
        });
    });
});
