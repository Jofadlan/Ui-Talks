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

// 4. FUNGSI SCROLLSPY (highlight nav sesuai section yang lagi keliatan)
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const navbar = document.querySelector('.navbar');
    const navHeight = navbar ? navbar.offsetHeight : 76;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        rootMargin: `-${navHeight}px 0px -60% 0px`,
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

// 5. FUNGSI SMOOTH SCROLL TANPA UBAH URL + SUPPORT SHARED LINK
function scrollToSection(targetEl) {
    if (!targetEl) return;
    targetEl.scrollIntoView({ behavior: 'smooth' });
}

function initCleanAnchorScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').slice(1);
            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;

            e.preventDefault(); // cegah browser nambahin # ke URL
            scrollToSection(targetEl);
        });
    });
}

// Handle kalau user buka link langsung dengan hash (misal dari share link ke #register)
function handleSharedLinkOnLoad() {
    if (!window.location.hash) return;

    const targetId = window.location.hash.slice(1);
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    // Kasih delay dikit biar layout selesai render dulu (foto, dll) sebelum scroll
    setTimeout(() => {
        scrollToSection(targetEl);
        // Bersihin URL setelah landing, tanpa nambah history entry baru
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }, 300);
}

// 6. FUNGSI SCROLL REVEAL (fade-in section header saat masuk viewport)
function initScrollReveal() {
    const targets = document.querySelectorAll('.section-header, .about-text, .vm-card');
    if (!targets.length) return;

    targets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // animasi cukup sekali, gak ulang tiap scroll
            }
        });
    }, { threshold: 0.15 });

    targets.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initMobileMenu);

document.addEventListener('DOMContentLoaded', () => {
    syncNavbarHeight();
    handleNavbarScroll();
    initScrollSpy();
    initCleanAnchorScroll();
    handleSharedLinkOnLoad();
    initScrollReveal();
});

window.addEventListener('scroll', () => {
    handleNavbarScroll();
    syncNavbarHeight();
});

window.addEventListener('resize', syncNavbarHeight);