/**
 * UI Talks 6.0 - Data Rendering Script
 * Author: Joe Fadlan Wahid (Jolan)
 * Description: Handles fetching from Google Sheets CSV and rendering to HTML.
 * Requires: PapaParse (loaded via CDN in index.html)
 */

const SPREADSHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmCoT-NllVz0tti7Xv0lqvg47mYC0NOLbnGASvlzLnm7kCpqinpoRtR8H0xrtJyON7mWag21DPkv7b/pub?gid=0&single=true&output=csv';
const TIMELINE_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmCoT-NllVz0tti7Xv0lqvg47mYC0NOLbnGASvlzLnm7kCpqinpoRtR8H0xrtJyON7mWag21DPkv7b/pub?gid=267317411&single=true&output=csv';
const GALLERY_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmCoT-NllVz0tti7Xv0lqvg47mYC0NOLbnGASvlzLnm7kCpqinpoRtR8H0xrtJyON7mWag21DPkv7b/pub?gid=1924427979&single=true&output=csv';
const FALLBACK_IMAGE = 'https://via.placeholder.com/240x280?text=No+Photo';

// Escape teks dari spreadsheet biar aman di-inject ke HTML (anti karakter <, &, dll)
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str ?? '';
    return div.innerHTML;
}

// Skeleton loader
function showSkeleton(container, count, className) {
    container.innerHTML = Array(count).fill(`<div class="skeleton ${className}"></div>`).join('');
}

// Helper generik: fetch CSV -> parsed rows (pakai PapaParse, jadi aman walau ada koma di dalam data)
async function fetchCsvRows(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const rawData = await response.text();
    const parsed = Papa.parse(rawData.trim(), { skipEmptyLines: true });
    return parsed.data.slice(1); // buang header row
}

// 1. FUNGSI FETCH & RENDER SPEAKERS DARI GOOGLE SHEET
async function loadGoogleSheetSpeakers() {
    const container = document.getElementById('speaker-container');
    if (!container) return;

    showSkeleton(container, 4, 'skeleton-card');

    try {
        const rows = await fetchCsvRows(SPREADSHEET_CSV_URL);

        const cards = rows
            .filter(cols => cols[0] && cols[0].trim() !== '')
            .map(cols => {
                const nama = escapeHtml(cols[0]);
                const jabatan = escapeHtml(cols[1]);
                const fotoUrl = cols[2] && cols[2].trim() !== '' ? cols[2].trim() : FALLBACK_IMAGE;

                return `
                    <div class="speaker-card">
                        <div class="speaker-img-wrapper">
                            <img src="${fotoUrl}" alt="${nama}" loading="lazy" onerror="this.src='${FALLBACK_IMAGE}'">
                        </div>
                        <div class="speaker-info">
                            <h3>${nama}</h3>
                            <p>${jabatan}</p>
                        </div>
                    </div>
                `;
            });

        container.innerHTML = cards.length
            ? cards.join('')
            : `<div class="loading-text">Belum ada data pembicara.</div>`;
    } catch (error) {
        console.error('Error fetching sheet data:', error);
        container.innerHTML = `<div class="loading-text" style="color: #ff5a5f;">Gagal memuat data pembicara.</div>`;
    }
}

// 2. FUNGSI FETCH & RENDER TIMELINE DARI GOOGLE SHEET (TAB 2)
async function loadGoogleSheetTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    showSkeleton(container, 3, 'skeleton-timeline');

    try {
        const rows = await fetchCsvRows(TIMELINE_CSV_URL);

        const items = rows
            .filter(cols => cols[0] && cols[0].trim() !== '')
            .map(cols => {
                const tanggal = escapeHtml(cols[0]);
                const namaAgenda = escapeHtml(cols[1]);
                const deskripsi = escapeHtml(cols[2]);

                return `
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-date">${tanggal}</div>
                        <div class="timeline-content">
                            <h3>${namaAgenda}</h3>
                            <p>${deskripsi}</p>
                        </div>
                    </div>
                `;
            });

        container.innerHTML = items.length
            ? items.join('')
            : `<div class="loading-text">Belum ada jadwal acara.</div>`;
    } catch (error) {
        console.error('Error timeline:', error);
        container.innerHTML = `<div class="loading-text" style="color: #ff5a5f;">Gagal memuat jadwal acara.</div>`;
    }
}

// 3. FUNGSI FETCH & RENDER GALLERY DARI GOOGLE SHEET (TAB 3)
async function loadGoogleSheetGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;
    showSkeleton(container, 6, 'skeleton-gallery');

    try {
        const rows = await fetchCsvRows(GALLERY_CSV_URL);

        const items = rows
            .filter(cols => cols[0] && cols[0].trim() !== '')
            .map((cols, index) => {
                const fotoUrl = cols[0].trim();
                const keterangan = escapeHtml(cols[1] || '');
                const kategori = escapeHtml(cols[2] || '');

                return `
                    <div class="gallery-item" data-kategori="${kategori}">
                        <img src="${fotoUrl}" alt="${keterangan || 'UI Talks Gallery ' + (index + 1)}" loading="lazy" onerror="this.parentElement.style.display='none'">
                        ${keterangan ? `<div class="gallery-caption"><p>${keterangan}</p></div>` : ''}
                    </div>
                `;
            });

        container.innerHTML = items.length
            ? items.join('')
            : `<div class="loading-text">Belum ada foto galeri.</div>`;
    } catch (error) {
        console.error('Error gallery:', error);
        container.innerHTML = `<div class="loading-text" style="color: #ff5a5f;">Gagal memuat galeri.</div>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadGoogleSheetSpeakers();
    loadGoogleSheetTimeline();
    loadGoogleSheetGallery();
});