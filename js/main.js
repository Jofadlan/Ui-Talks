const SPREADSHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmCoT-NllVz0tti7Xv0lqvg47mYC0NOLbnGASvlzLnm7kCpqinpoRtR8H0xrtJyON7mWag21DPkv7b/pub?gid=0&single=true&output=csv';
const TIMELINE_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmCoT-NllVz0tti7Xv0lqvg47mYC0NOLbnGASvlzLnm7kCpqinpoRtR8H0xrtJyON7mWag21DPkv7b/pub?gid=267317411&single=true&output=csv';

// 1. FUNGSI FETCH & RENDER SPEAKERS DARI GOOGLE SHEET
async function loadGoogleSheetSpeakers() {
    const container = document.getElementById('speaker-container');
    if (!container) return;

    try {
        const response = await fetch(SPREADSHEET_CSV_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const rawData = await response.text();
        const rows = rawData.split(/\r?\n/);
        
        // Reset container (hapus teks "Memuat data...")
        container.innerHTML = '';

        // Looping data, baris ke-0 di-skip karena header (nama,jabatan,foto)
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim() === '') continue; // Skip jika ada baris kosong di sheet

            // Pisah kolom berdasarkan koma
            const columns = rows[i].split(',');
            const nama = columns[0];
            const jabatan = columns[1];
            const fotoUrl = columns[2];

            // Render susunan struktur HTML Card Speaker
            const cardHTML = `
                <div class="speaker-card">
                    <div class="speaker-img-wrapper">
                        <img src="${fotoUrl}" alt="${nama}" loading="lazy">
                    </div>
                    <div class="speaker-info">
                        <h3>${nama}</h3>
                        <p>${jabatan}</p>
                    </div>
                </div>
            `;
            container.innerHTML += cardHTML;
        }
    } catch (error) {
        console.error('Error fetching sheet data:', error);
        container.innerHTML = `<div class="loading-text" style="color: #ff5a5f;">Gagal memuat data pembicara. Pastikan URL CSV benar & sudah di-publish.</div>`;
    }
}

// 2. FUNGSI NAVBAR SCROLL EFFECT
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

// 3. FUNGSI MOBILE MENU DRAWER TOGGLE
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');
    const drawerLinks = document.querySelectorAll('.mobile-nav-item');

    if (menuBtn && drawer) {
        // Klik hamburger menu untuk buka/tutup drawer
        menuBtn.addEventListener('click', () => {
            drawer.classList.toggle('open');
            // Ganti ikon hamburger ke tanda silang (X)
            const icon = menuBtn.querySelector('i');
            if (drawer.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Tutup drawer otomatis ketika salah satu link menu di-klik
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                drawer.classList.remove('open');
                menuBtn.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }
}

// FUNGSI FETCH & RENDER TIMELINE DARI GOOGLE SHEET (TAB 2)
async function loadGoogleSheetTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    try {
        const response = await fetch(TIMELINE_CSV_URL);
        if (!response.ok) throw new Error('Gagal mengambil data timeline');
        
        const rawData = await response.text();
        const rows = rawData.split(/\r?\n/);
        
        container.innerHTML = ''; // Hapus teks loading

        // Loop mulai dari baris 1 (skip header)
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim() === '') continue;

            const columns = rows[i].split(',');
            const tanggal = columns[0];
            const namaAgenda = columns[1];
            const deskripsi = columns[2];

            const itemHTML = `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-date">${tanggal}</div>
                    <div class="timeline-content">
                        <h3>${namaAgenda}</h3>
                        <p>${deskripsi}</p>
                    </div>
                </div>
            `;
            container.innerHTML += itemHTML;
        }
    } catch (error) {
        console.error('Error timeline:', error);
        container.innerHTML = `<div class="loading-text" style="color: #ff5a5f;">Gagal memuat jadwal acara.</div>`;
    }
}

// JALANKAN SEMUA FUNGSI KETIKA HALAMAN SELESAI DIMUAT
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    loadGoogleSheetSpeakers();
    loadGoogleSheetTimeline();
    window.addEventListener('scroll', handleNavbarScroll);
});