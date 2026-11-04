# Portofolio – Hari 12 (Dokumentasi Kode & Finalisasi Capstone)

**Pelatihan Junior Web Programmer — Balai Diklat Industri Denpasar**  
**Unit Kompetensi**: J.620100.025.02 — Mendokumentasikan Kode Program

---

## Ringkasan
 
Hari 12 berfokus pada **dokumentasi kode program** dan **finalisasi Capstone (Proyek 5)**. Dua kegiatan utama dilaksanakan:

1. **Praktik Dokumentasi Kode** — Menulis JSDoc pada `applama.js` (Lab) dan melakukan Doc Hunt untuk menemukan & memperbaiki komentar yang hilang/tidak akurat di seluruh kode sumber Capstone.
2. **Finalisasi & Penerbitan Capstone** — Melengkapi semua dokumen teknis (README, CHANGELOG, arsitektur, panduan pengguna, panduan instalasi, peta modul, dan dokumentasi API) serta menandai versi rilis `v1.0.0`.

---

## Struktur Direktori Hari 12

```
hari-12-dokumentasi/
│   applama.js                              # Lab: JSDoc pada JS
│   README.md                               # (file ini)
│
└─ proyek-5-capstone-pendaftaran/
   │   README.md                            # README utama capstone ✅
   │   CHANGELOG.md                         # Riwayat versi v1.0.0 ✅
   │   peta_modul.md                        # Peta modul src/ & public/ ✅
   │   composer.json
   │
   ├─ config/
   ├─ database/
   ├─ docs/
   │   ├─ api/                              # Hasil build phpDocumentor ✅
   │   │   └─ index.html
   │   ├─ api-js/                           # Hasil build JSDoc ✅
   │   ├─ gambar/                           # Screenshot aplikasi ✅
   │   │   ├─ paneladmin.png
   │   │   ├─ pendaftaran.png
   │   │   ├─ pdf.png
   │   │   ├─ buktiinstallTolls.png
   │   │   └─ buktimysqlAtphpmyadmin.png
   │   ├─ modul/                            # Spesifikasi per modul ✅
   │   │   ├─ auth.md
   │   │   └─ pendaftar.md
   │   ├─ arsitektur.md                     # Arsitektur sistem ✅
   │   ├─ panduan-pengguna.md               # Panduan pengguna ✅ 
   │   ├─ panduan_instalasi.md              # Panduan instalasi ✅
   │   ├─ daftar-library.md                 # Daftar library ✅
   │   └─ doc-hunt.md                       # Tabel Doc Hunt ✅ 
   │
   ├─ public/
   ├─ src/
   ├─ templates/
   └─ tests/
```

---

## Cara Membuat Git Tag v1.0.0

Jalankan perintah berikut dari direktori root repositori (`portofolio-junior-web`):

```bash
git status
git add .
git commit -m 'Hari 12: finalisasi dokumentasi dan rilis v1.0.0'
git tag -a v1.0.0 -m 'Rilis 1.0.0: Sistem Pendaftaran Pelatihan'
git push origin main --tags
```

---

