# UI Talks 6.0

**"Adapt to Grow: Empowering Youth Entrepreneurship for a Smarter, Sustainable Society 5.0"**

Situs web resmi UI Talks 6.0 — National Talkshow & National Business Competition yang diselenggarakan oleh CEDS UI (Center for Entrepreneurship Development Studies, Universitas Indonesia).

## Live Demo

🔗 [ui-talks.com](https://ui-talks.com)

## Fitur

- Countdown timer menuju Talksnovation & Awarding Day
- Events, Speakers, dan Gallery/Memories yang diambil dari Google Sheets secara dynamic
- Vision & Mission section dengan desain asymmetric frame
- Responsive design dengan mobile navigation (hamburger menu)
- Skeleton loader untuk pengalaman loading yang lebih baik
- Custom 404 page
- Smooth scroll dan scroll-reveal animation
- SEO-friendly (robots.txt, sitemap.xml, Open Graph meta tags)

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Markup | HTML5 |
| Styling | Pure CSS3 (custom design system) |
| Scripting | Vanilla JavaScript |
| Data Source | Google Sheets (published as CSV) |
| CSV Parser | [PapaParse](https://www.papaparse.com/) |
| Icons | [Font Awesome 6.4.0](https://fontawesome.com/) |
| Fonts | Google Fonts — Inter + Montserrat |
| Hosting | GitHub Pages |

## Project Structure

```
UI-Talks/
├── index.html              # Halaman utama (single-page)
├── 404.html                # Custom 404 error page
├── CNAME                   # Konfigurasi custom domain GitHub Pages
├── .htaccess               # Apache config: custom 404 redirect
├── robots.txt              # SEO: allow all crawlers
├── sitemap.xml             # SEO: sitemap untuk single-page
├── humans.txt              # Credits: developer info
│
├── css/
│   ├── style.css           # Stylesheet utama (~860 baris)
│   └── style-additions.css # Tambahan: memories, vision/mission, skeleton, partners
│
├── js/
│   ├── main.js             # UI: navbar, mobile menu, scroll spy, smooth scroll
│   └── data-render.js      # Data fetching & rendering dari Google Sheets
│
└── assets/
    ├── icons/              # Favicon dan app icons
    └── images/             # Gambar: hero, about, vision, mission, partners, dll.
```

## Cara Kerja

Situs ini menggunakan **Google Sheets sebagai headless CMS**. Data events, speakers, dan gallery diambil dari Google Spreadsheet yang dipublikasikan sebagai CSV:

1. Google Spreadsheet memiliki beberapa sheet (tab), masing-masing untuk Events, Speakers, dan Gallery
2. Setiap sheet dipublikasikan ke web dan menghasilkan URL CSV publik
3. `data-render.js` mengambil data CSV menggunakan fetch API
4. PapaParse mem-parse CSV menjadi array of objects
5. Data dirender ke DOM secara dinamis dengan HTML escaping untuk mencegah XSS

Untuk mengupdate konten (events, speakers, gallery), cukup edit Google Spreadsheet — tidak perlu touch code.

## Cara Jalankan Lokally

Clone repository:

```bash
git clone https://github.com/Jofadlan/Ui-Talks.git
cd Ui-Talks
```

Buka `index.html` langsung di browser, atau gunakan Live Server (VS Code Extension).

> **Note:** Fitur Google Sheets integration membutuhkan koneksi internet karena mengambil data dari CSV yang di-host di Google.

## Deploy

Situs ini di-deploy menggunakan **GitHub Pages** dengan custom domain `ui-talks.com`. Setiap push ke branch `master` akan otomatis trigger rebuild di GitHub Pages.

## Credits

Developer: **Joe Fadlan Wahid (Jolan)** — [@Jofadlan](https://github.com/Jofadlan)

Center for Entrepreneurship Development Studies (CEDS) — Universitas Indonesia
