/**
 * UI Talks 6.0 - Core UI Interactions
 * Author: Joe Fadlan Wahid (Jolan)
 * Description: Manages frontend UI behavior such as navigation effects and mobile layout toggles.
 */

// 1. FUNGSI NAVBAR SCROLL EFFECT
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}

// 2. FUNGSI MOBILE MENU DRAWER TOGGLE
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');
    const drawerLinks = document.querySelectorAll('.mobile-nav-item');

    if (menuBtn && drawer) {
        menuBtn.addEventListener('click', () => {
            drawer.classList.toggle('open');
            const icon = menuBtn.querySelector('i');
            icon.className = drawer.classList.contains('open')
                ? 'fa-solid fa-xmark'
                : 'fa-solid fa-bars';
        });

        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                drawer.classList.remove('open');
                menuBtn.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    handleNavbarScroll(); // set state awal, jaga-jaga kalau reload di posisi scroll
    window.addEventListener('scroll', handleNavbarScroll);
});