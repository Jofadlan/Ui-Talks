/**
 * UI Talks 6.0 - Data Rendering Script
 * Author: Joe Fadlan Wahid (Jolan)
 * Description: Handles fetching from Google Sheets CSV and rendering to HTML.
 * Requires: PapaParse (loaded via CDN in index.html)
 */

const SPREADSHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmCoT-NllVz0tti7Xv0lqvg47mYC0NOLbnGASvlzLnm7kCpqinpoRtR8H0xrtJyON7mWag21DPkv7b/pub?gid=0&single=true&output=csv';
const EVENTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmCoT-NllVz0tti7Xv0lqvg47mYC0NOLbnGASvlzLnm7kCpqinpoRtR8H0xrtJyON7mWag21DPkv7b/pub?gid=163766779&single=true&output=csv';
const GALLERY_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmCoT-NllVz0tti7Xv0lqvg47mYC0NOLbnGASvlzLnm7kCpqinpoRtR8H0xrtJyON7mWag21DPkv7b/pub?gid=1924427979&single=true&output=csv';
const FALLBACK_IMAGE = 'https://via.placeholder.com/240x280?text=No+Photo';

// Escape teks dari spreadsheet biar aman di-inject ke HTML (anti karakter <, &, dll)
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str ?? '';
    return div.innerHTML;
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
    const topRow = document.getElementById('speaker-row-top');
    const bottomRow = document.getElementById('speaker-row-bottom');
    if (!topRow || !bottomRow) return;

    try {
        const rows = await fetchCsvRows(SPREADSHEET_CSV_URL);
        const cards = rows
            .filter(cols => cols[0] && cols[0].trim() !== '')
            .slice(0, 5)
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

        topRow.innerHTML = cards.slice(0, 3).join('') || `<div class="loading-text">Belum ada data pembicara.</div>`;
        bottomRow.innerHTML = cards.slice(3, 5).join('');
    } catch (error) {
        console.error('Error fetching sheet data:', error);
        topRow.innerHTML = `<div class="loading-text" style="color: #ff5a5f;">Gagal memuat data pembicara.</div>`;
    }
}
// 2. FUNGSI FETCH & RENDER EVENTS DARI GOOGLE SHEET
// Kolom: [0] Nama, [1] Deskripsi, [2] Badge Tanggal, [3] Foto URL, [4] Accent (opsional)
async function loadGoogleSheetEvents() {
    const container = document.getElementById('events-container');
    if (!container) return;

    try {
        const rows = await fetchCsvRows(EVENTS_CSV_URL);

        const cards = rows
            .filter(cols => cols[0] && cols[0].trim() !== '')
            .map(cols => {
                const nama = escapeHtml(cols[0]);
                const deskripsi = escapeHtml(cols[1]);
                const badge = escapeHtml(cols[2]);
                const fotoUrl = cols[3] && cols[3].trim() !== '' ? cols[3].trim() : FALLBACK_IMAGE;
                const accentRaw = (cols[4] || '').trim().toLowerCase();
                const accentClass = ['blue', 'orange', 'green'].includes(accentRaw) ? `accent-${accentRaw}` : '';

                return `
                    <div class="event-card ${accentClass}">
                        <img src="${fotoUrl}" alt="${nama}" loading="lazy" style="width:100%; height:auto; border-radius:8px; margin-bottom:1.2rem;" onerror="this.src='${FALLBACK_IMAGE}'">
                        <div class="event-badge"><i class="fa-regular fa-calendar-days"></i> ${badge}</div>
                        <h3>${nama}</h3>
                        <p>${deskripsi}</p>
                    </div>
                `;
            });

        container.innerHTML = cards.length
            ? cards.join('')
            : `<div class="loading-text">Belum ada data event.</div>`;
    } catch (error) {
        console.error('Error fetching events:', error);
        container.innerHTML = `<div class="loading-text" style="color: #ff5a5f;">Gagal memuat data event.</div>`;
    }
}

// 3. FUNGSI FETCH & RENDER GALLERY / MEMORIES DARI GOOGLE SHEET
async function loadGoogleSheetGallery() {
    const topRow = document.getElementById('mem-top-row');
    const bottomRow = document.getElementById('mem-bottom-row');
    if (!topRow || !bottomRow) return;

    try {
        const rows = await fetchCsvRows(GALLERY_CSV_URL);
        const items = rows
            .filter(cols => cols[0] && cols[0].trim() !== '')
            .slice(0, 7)
            .map((cols, index) => {
                const fotoUrl = cols[0].trim();
                const keterangan = escapeHtml(cols[1] || '');
                return `<div class="memory-item"><img src="${fotoUrl}" alt="${keterangan || 'Memory ' + (index+1)}" loading="lazy" onerror="this.parentElement.style.display='none'"></div>`;
            });

        topRow.innerHTML = items.slice(0, 3).join('') || `<div class="loading-text">Belum ada foto.</div>`;
        bottomRow.innerHTML = items.slice(3, 7).join('');
    } catch (error) {
        console.error('Error gallery:', error);
        topRow.innerHTML = `<div class="loading-text" style="color:#ff5a5f;">Gagal memuat galeri.</div>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadGoogleSheetSpeakers();
    loadGoogleSheetEvents();
    loadGoogleSheetGallery();
});