/**
 * UI Talks 6.0 - Core UI Interactions
 * Author: Joe Fadlan Wahid (Jolan)
 * Description: Manages frontend UI behavior such as navigation effects and mobile layout toggles.
 */

// 1. FUNGSI NAVBAR SCROLL EFFECT
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}

// 2. FUNGSI MOBILE MENU DRAWER TOGGLE
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');
    if (!menuBtn || !drawer) return;

    const drawerLinks = drawer.querySelectorAll('.mobile-nav-item');

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

// 3. FUNGSI SYNC TINGGI NAVBAR AKTUAL (fix drawer & konten ketutup)
function syncNavbarHeight() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`);
}

// Tiap fitur punya listener sendiri -> kalau 1 error, yang lain tetap jalan
document.addEventListener('DOMContentLoaded', initMobileMenu);

document.addEventListener('DOMContentLoaded', () => {
    syncNavbarHeight();
    handleNavbarScroll();
});

window.addEventListener('scroll', () => {
    handleNavbarScroll();
    syncNavbarHeight();
});

window.addEventListener('resize', syncNavbarHeight);