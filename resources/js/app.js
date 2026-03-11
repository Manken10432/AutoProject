import './bootstrap';

const WHATSAPP_NUMBER = '526141234567';

document.addEventListener('DOMContentLoaded', function () {
    // --- Mobile menu toggle ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden', isOpen);
            // Toggle icon
            const iconOpen = menuBtn.querySelector('.icon-open');
            const iconClose = menuBtn.querySelector('.icon-close');
            if (iconOpen) iconOpen.classList.toggle('hidden', !isOpen);
            if (iconClose) iconClose.classList.toggle('hidden', isOpen);
        });
    }

    // --- Vehicle image gallery switcher ---
    const mainImage = document.getElementById('main-vehicle-image');
    const thumbItems = document.querySelectorAll('.thumb-item');

    if (mainImage && thumbItems.length > 0) {
        thumbItems.forEach(function (thumb) {
            thumb.addEventListener('click', function () {
                const src = this.getAttribute('data-src');
                mainImage.src = src;
                thumbItems.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // --- Hero slider ---
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 1) {
        let currentSlide = 0;
        setInterval(function () {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, 5000);
    }

    // --- Mobile filter sidebar toggle ---
    const filterToggleBtn = document.getElementById('filter-toggle-btn');
    const filterPanel = document.getElementById('filter-panel');
    const filterToggleIcon = document.getElementById('filter-toggle-icon');

    if (filterToggleBtn && filterPanel) {
        filterToggleBtn.addEventListener('click', function () {
            const isOpen = !filterPanel.classList.contains('hidden');
            filterPanel.classList.toggle('hidden', isOpen);
            if (filterToggleIcon) {
                filterToggleIcon.style.transform = isOpen ? '' : 'rotate(180deg)';
            }
        });
    }

    // --- Filter form: sort by dropdown auto-submit ---
    const sortSelect = document.getElementById('sort_by');
    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            document.getElementById('filter-form').submit();
        });
    }

    // --- Bottom quote bar: show after scroll, hide on close ---
    const quoteBar = document.getElementById('bottom-quote-bar');
    const closeQuoteBar = document.getElementById('close-quote-bar');

    if (quoteBar) {
        let quoteDismissed = sessionStorage.getItem('quoteDismissed') === '1';

        function showQuoteBar() {
            if (!quoteDismissed) {
                quoteBar.style.transform = 'translateY(0)';
            }
        }

        if (!quoteDismissed) {
            window.addEventListener('scroll', function onScroll() {
                if (window.scrollY > 600) {
                    showQuoteBar();
                    window.removeEventListener('scroll', onScroll);
                }
            }, { passive: true });
        }

        if (closeQuoteBar) {
            closeQuoteBar.addEventListener('click', function () {
                quoteBar.style.transform = 'translateY(100%)';
                quoteDismissed = true;
                sessionStorage.setItem('quoteDismissed', '1');
            });
        }
    }

    // --- WhatsApp FAB tooltip ---
    const fabBtn = document.querySelector('.whatsapp-fab');
    if (fabBtn && !fabBtn.getAttribute('href').includes('?')) {
        fabBtn.setAttribute('href', 'https://wa.me/' + WHATSAPP_NUMBER + '?text=Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20veh%C3%ADculos%20disponibles.');
    }
});
