/**
 * UI Talks 6.0 - Data Rendering Script
 * Author: Joe Fadlan Wahid (Jolan)
 * Description: Handles fetching from Google Sheets CSV and rendering to HTML.
 */

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
        
        container.innerHTML = ''; // Reset container

        for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim() === '') continue; 

            const columns = rows[i].split(',');
            const nama = columns[0];
            const jabatan = columns[1];
            const fotoUrl = columns[2];

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
        container.innerHTML = `<div class="loading-text" style="color: #ff5a5f;">Gagal memuat data pembicara.</div>`;
    }
}

// 2. FUNGSI FETCH & RENDER TIMELINE DARI GOOGLE SHEET (TAB 2)
async function loadGoogleSheetTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    try {
        const response = await fetch(TIMELINE_CSV_URL);
        if (!response.ok) throw new Error('Gagal mengambil data timeline');
        
        const rawData = await response.text();
        const rows = rawData.split(/\r?\n/);
        
        container.innerHTML = ''; 

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

// Jalankan proses render data saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    loadGoogleSheetSpeakers();
    loadGoogleSheetTimeline();
});