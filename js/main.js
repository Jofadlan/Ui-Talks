/**
 * UI Talks 6.0 - Core UI Interactions
 * Author: Joe Fadlan Wahid (Jolan)
 * Description: Manages frontend UI behavior such as navigation effects and mobile layout toggles.
 */

// 1. FUNGSI NAVBAR SCROLL EFFECT
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.8rem 0';
        navbar.style.backgroundColor = 'rgba(6, 44, 34, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
        navbar.style.padding = '1.2rem 0';
        navbar.style.backgroundColor = 'rgba(6, 44, 34, 0.95)';
        navbar.style.boxShadow = 'none';
    }
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
            if (drawer.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                drawer.classList.remove('open');
                menuBtn.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }
}

// Jalankan interaksi UI saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    window.addEventListener('scroll', handleNavbarScroll);
});