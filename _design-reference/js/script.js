/**
 * ThePro3DStudio - Redesign JavaScript
 * Handles Sticky Responsive Header, Mobile Navigation Drawer, and Search Modal
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky / Scrolled Header Glassmorphism
    const siteHeader = document.getElementById('siteHeader') || document.querySelector('.site-header');
    
    function handleHeaderScroll() {
        if (!siteHeader) return;
        if (window.scrollY > 20) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Initialize on page load

    // 2. Search Modal Elements & Handling
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchBackdrop = document.getElementById('searchBackdrop');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.getElementById('searchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');

    function openSearchModal() {
        if (searchModal && searchBackdrop) {
            searchModal.classList.add('active');
            searchBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                if (searchInput) searchInput.focus();
            }, 100);
        }
    }

    function closeSearchModal() {
        if (searchModal && searchBackdrop) {
            searchModal.classList.remove('active');
            searchBackdrop.classList.remove('active');
            const mobileDrawer = document.getElementById('mobileDrawer');
            if (!mobileDrawer || !mobileDrawer.classList.contains('active')) {
                document.body.style.overflow = '';
            }
            if (searchInput) searchInput.value = '';
            if (searchClearBtn) searchClearBtn.classList.remove('visible');
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', openSearchModal);
    }

    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', closeSearchModal);
    }

    if (searchBackdrop) {
        searchBackdrop.addEventListener('click', closeSearchModal);
    }

    if (searchInput && searchClearBtn) {
        searchInput.addEventListener('input', () => {
            if (searchInput.value.trim().length > 0) {
                searchClearBtn.classList.add('visible');
            } else {
                searchClearBtn.classList.remove('visible');
            }
        });

        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchClearBtn.classList.remove('visible');
            searchInput.focus();
        });
    }

    // 3. Mobile Drawer Navigation Elements
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');

    // Open Mobile Drawer
    function openDrawer() {
        if (mobileDrawer && mobileBackdrop) {
            mobileDrawer.classList.add('active');
            mobileBackdrop.classList.add('active');
            if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close Mobile Drawer
    function closeDrawer() {
        if (mobileDrawer && mobileBackdrop) {
            mobileDrawer.classList.remove('active');
            mobileBackdrop.classList.remove('active');
            if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
            if (!searchModal || !searchModal.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openDrawer);
    }

    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', closeDrawer);
    }

    // Mobile Submenu Accordions
    mobileNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const subMenu = btn.nextElementSibling;
            if (subMenu && subMenu.classList.contains('mobile-sub-menu')) {
                const isOpen = subMenu.classList.contains('open');
                
                // Close other open accordions
                document.querySelectorAll('.mobile-sub-menu.open').forEach(menu => {
                    if (menu !== subMenu) {
                        menu.classList.remove('open');
                        if (menu.previousElementSibling) {
                            menu.previousElementSibling.classList.remove('open');
                            menu.previousElementSibling.setAttribute('aria-expanded', 'false');
                        }
                    }
                });

                // Toggle current
                if (isOpen) {
                    subMenu.classList.remove('open');
                    btn.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                } else {
                    subMenu.classList.add('open');
                    btn.classList.add('open');
                    btn.setAttribute('aria-expanded', 'true');
                }
            }
        });
    });

    // 4. Desktop Mega Menu Header State Management (Active only on Desktop > 1100px)
    const megaMenuItems = document.querySelectorAll('.header-nav-item.has-mega-menu');
    let megaMenuTimer = null;

    megaMenuItems.forEach(item => {
        const panel = item.querySelector('.mega-menu-panel');
        const link = item.querySelector('.header-nav-link');

        function activateThisMenu() {
            if (window.innerWidth > 1100 && siteHeader) {
                clearTimeout(megaMenuTimer);
                // Deactivate any other open mega menus
                megaMenuItems.forEach(otherItem => {
                    if (otherItem !== item) otherItem.classList.remove('menu-active');
                });
                item.classList.add('menu-active');
                siteHeader.classList.add('mega-menu-open');
            }
        }

        function deactivateThisMenu() {
            clearTimeout(megaMenuTimer);
            megaMenuTimer = setTimeout(() => {
                item.classList.remove('menu-active');
                const anyActive = document.querySelector('.header-nav-item.has-mega-menu.menu-active');
                if (!anyActive && siteHeader) {
                    siteHeader.classList.remove('mega-menu-open');
                }
            }, 120);
        }

        // Opening is scoped to the link text itself (not the whole <li>,
        // which used to include an invisible hover-bridge zone below the
        // text that opened the menu even when nowhere near it). Closing
        // still watches the whole item so moving down into the panel
        // doesn't lose hover.
        if (link) link.addEventListener('mouseenter', activateThisMenu);
        item.addEventListener('mouseleave', deactivateThisMenu);

        if (panel) {
            panel.addEventListener('mouseenter', activateThisMenu);
            panel.addEventListener('mouseleave', deactivateThisMenu);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1100 && siteHeader) {
            clearTimeout(megaMenuTimer);
            megaMenuItems.forEach(item => item.classList.remove('menu-active'));
            siteHeader.classList.remove('mega-menu-open');
        }
    });

    // 5. Global Keyboard Shortcuts (Close on ESC)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearchModal();
            closeDrawer();
            if (siteHeader) siteHeader.classList.remove('mega-menu-open');
        }
    });

    // 6. Working Verticals Slider: see js/animations.js (GSAP ScrollTrigger pin-and-slide)

    // 7. Services FAQ Accordion (exclusive open, CSS grid-rows drives the height animation)
    const faqItems = document.querySelectorAll('.services-faq-section .faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('open');
                    other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            item.classList.toggle('open', !isOpen);
            question.setAttribute('aria-expanded', String(!isOpen));
        });
    });
});
