# Portofolio – Hari 12 (Dokumentasi Kode & Finalisasi Capstone)

**Pelatihan Junior Web Programmer — Balai Diklat Industri Denpasar**  
**Unit Kompetensi**: J.620100.025.02 — Mendokumentasikan Kode Program

---

## Ringkasan

Hari 12 berfokus pada **dokumentasi kode program** dan **finalisasi Capstone (Proyek 5)**. Dua kegiatan utama dilaksanakan:

1. **Praktik Dokumentasi Kode** — Menulis JSDoc pada `applama.js` (Lab) dan melakukan Doc Hunt untuk menemukan & memperbaiki komentar yang hilang/tidak akurat di seluruh kode sumber Capstone.
2. **Finalisasi & Penerbitan Capstone** — Melengkapi semua dokumen teknis (README, CHANGELOG, arsitektur, panduan pengguna, panduan instalasi, peta modul, dan dokumentasi API) serta menandai versi rilis `v1.0.0`.

---

## Checklist Kelengkapan Portofolio

```markdown
- [x] 1. docs/peta-modul.md — Peta modul src/ dan public/
- [x] 2. Dokumen modul per berkas — docs/modul/auth.md, docs/modul/pendaftar.md
- [x] 3. docs/api/ — Hasil build phpDocumentor (HTML)
- [x] 4. docs/api-js/ — Hasil build JSDoc (HTML)
- [x] 5. README.md — Di dalam proyek capstone
- [x] 6. CHANGELOG.md — Riwayat versi dengan entry v1.0.0
- [x] 7. docs/arsitektur.md — Diagram alur & ERD
- [x] 8. docs/panduan-pengguna.md — Panduan untuk peserta & admin
- [x] 9. docs/panduan_instalasi.md — Panduan instalasi dari nol
- [x] 10. docs/daftar-library.md — Daftar library pihak ketiga
- [x] 11. docs/doc-hunt.md — Tabel Doc Hunt (10 temuan)
- [ ] 12. Tangkapan layar aplikasi (login, pendaftaran, panel admin, cetak PDF)
- [ ] 13. Tangkapan layar docs/api/index.html di browser
- [ ] 14. Catatan uji instalasi dari nol (screenshot instalasi lengkap)
- [ ] 15. Repositori bertag v1.0.0 (jalankan: git tag v1.0.0 && git push --tags)
```

---

## Struktur Direktori Hari 12

```
hari-12-dokumentasi/
│   applama.js                              # Lab: JSDoc pada JS (sudah ada DocBlock lengkap)
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
   │   ├─ panduan-pengguna.md               # Panduan pengguna ✅ (baru dibuat)
   │   ├─ panduan_instalasi.md              # Panduan instalasi ✅
   │   ├─ daftar-library.md                 # Daftar library ✅
   │   └─ doc-hunt.md                       # Tabel Doc Hunt ✅ (baru dibuat)
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
# 1. Pastikan semua perubahan sudah di-commit
git add .
git commit -m "Hari 12: Finalisasi dokumentasi kode dan Capstone Sprint 2"

# 2. Buat tag annotated v1.0.0
git tag -a v1.0.0 -m "Capstone Sprint 2 - Sistem Pendaftaran Diklat v1.0.0"

# 3. Push tag ke remote (jika ada)
git push origin v1.0.0
```

---

## Tangkapan Layar yang Diperlukan

| Screenshot | File Referensi | Status |
|------------|---------------|:------:|
| Form pendaftaran publik | `docs/gambar/pendaftaran.png` | ✅ Ada |
| Panel admin (DataTables) | `docs/gambar/paneladmin.png` | ✅ Ada |
| Cetak bukti PDF | `docs/gambar/pdf.png` | ✅ Ada |
| Bukti instalasi tools (XAMPP/Composer) | `docs/gambar/buktiinstallTolls.png` | ✅ Ada |
| Import database di phpMyAdmin | `docs/gambar/buktimysqlAtphpmyadmin.png` | ✅ Ada |
| Halaman `docs/api/index.html` di browser | _(belum ada)_ | ⬜ Perlu |
| Halaman `docs/api-js/` di browser | _(belum ada)_ | ⬜ Perlu |

---

*Dokumen ini dibuat sebagai kerangka dokumentasi portofolio Hari 12 Diklat Junior Web Programmer.*

