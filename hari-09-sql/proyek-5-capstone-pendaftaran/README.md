# Sistem Pendaftaran Pelatihan Lembaga Kejuruan
**Proyek 5 (Capstone Project) - Sprint 0: Fondasi Proyek**

Aplikasi web sistem pendaftaran pelatihan daring berbasis PHP Native 8.x dan MySQL/MariaDB dengan arsitektur bersih, aman dari SQL Injection (PDO Prepared Statements), aman dari XSS (*escaping* output), serta terlindung CSRF.

---

## 📋 Ikhtisar Proyek

Sistem ini melayani dua jenis pengguna:
1. **Peserta (User Publik)**:
   - Mengakses portal halaman utama (`index.php`).
   - Mengisi formulir pendaftaran daring (`tambah.php`) untuk memilih kelas pelatihan yang diinginkan secara mandiri.
   - Mencetak bukti pendaftaran PDF resmi (Deliverable Sprint Hari 10).
2. **Admin**:
   - Masuk melalui sistem autentikasi kata sandi (`login.php`) dengan `password_verify()`.
   - Mengelola data pendaftar pada panel khusus admin (`admin.php`), mencari nama peserta, navigasi paginasi, mengubah data (`ubah.php`), dan menghapus data (`hapus.php`).
   - Membatasi kuota peserta pada setiap kelas pelatihan (Sprint Hari 11).

---

## 📁 Struktur Direktori

```text
proyek-5-capstone-pendaftaran/
├── config/
│   ├── config.contoh.php       # Template konfigurasi database (ter-commit)
│   ├── config.php              # Kredensial database lokal (diabaikan oleh git)
│   └── database.php            # Koneksi PDO singleton / fungsi getConnection()
├── database/
│   └── skema.sql               # Skema DDL & seeding database lengkap
├── databases/
│   ├── skema.sql               # Skema DDL lengkap & akun admin default
│   └── latihan.sql             # Kumpulan query latihan agregasi & manipulasi
├── docs/
│   ├── analisis-kebutuhan.md   # Analisis stakeholder, fitur wajib/tambahan, & batasan
│   ├── user-stories.md         # 12 User Story & Product Backlog terprioritas
│   ├── desain-basis-data.md    # ERD, relasi 1:M, kamus data tabel kelas/pendaftar/admin
│   └── wireframe.md            # Wireframe form pendaftaran, daftar admin, & bukti PDF
├── public/
│   ├── _form.php               # Komponen form reusable (tambah & ubah)
│   ├── admin.php               # Panel dashboard admin (pencarian, paginasi, aksi CRUD)
│   ├── hapus.php               # Aksi penghapusan peserta (POST + CSRF + cekLoginAdmin)
│   ├── index.php               # Halaman utama bagi user / calon peserta
│   ├── login.php               # Halaman login admin (verifikasi password_verify)
│   ├── logout.php              # Penghentian sesi login admin
│   ├── tambah.php              # Form pendaftaran daring (akses terbuka untuk peserta)
│   └── ubah.php                # Form edit data pendaftar (terproteksi cekLoginAdmin)
├── src/
│   ├── bootstrap.php           # Inisialisasi session, config, error handler
│   ├── helpers.php             # Helper XSS e(), redirect, CSRF, flash, cekLoginAdmin()
│   └── pendaftar.php           # Model & logika bisnis query database (CRUD & admin)
├── templates/
│   ├── footer.php              # Layout penutup HTML & copyright
│   └── header.php              # Layout header & navigasi dinamis (Guest vs Admin)
├── .gitignore                  # Mengabaikan config/config.php & file sensitif
└── README.md                   # Dokumentasi panduan proyek lengkap
```

---

## 🚀 Panduan Instalasi & Penggunaan

### 1. Prasyarat Lingkungan
- Web Server Apache & MySQL (misalnya XAMPP / WampServer / LAMP).
- PHP versi 8.1 atau yang lebih baru dengan ekstensi `pdo_mysql` dan `mbstring` aktif.

### 2. Impor Skema Basis Data
1. Buka **phpMyAdmin** (`http://localhost/phpmyadmin`) atau terminal MySQL.
2. Impor berkas [`databases/skema.sql`](databases/skema.sql) (atau [`database/skema.sql`](database/skema.sql)):
   ```bash
   mysql -u root -p < databases/skema.sql
   ```
3. Skema akan membuat database `db_pelatihan`, tabel `kelas`, tabel `pendaftar`, tabel `admin`, serta mengisi data awal kelas dan akun default admin.

### 3. Konfigurasi Aplikasi
1. Salin berkas `config/config.contoh.php` menjadi `config/config.php`:
   ```bash
   cp config/config.contoh.php config/config.php
   ```
2. Sesuaikan kredensial database lokal Anda pada `config/config.php`.

### 4. Mengakses Aplikasi
Buka browser dan arahkan ke alamat lokal:
- **Halaman Utama User / Peserta**:
  ```url
  http://localhost/portofolio-junior-web/hari-09-sql/proyek-5-capstone-pendaftaran/public/index.php
  ```
- **Form Pendaftaran Peserta (Publik)**:
  ```url
  http://localhost/portofolio-junior-web/hari-09-sql/proyek-5-capstone-pendaftaran/public/tambah.php
  ```
- **Login Admin**:
  ```url
  http://localhost/portofolio-junior-web/hari-09-sql/proyek-5-capstone-pendaftaran/public/login.php
  ```
  *(Kredensial Default: Password `admin123`)*.
- **Daftar Pendaftar (Panel Admin)**:
  ```url
  http://localhost/portofolio-junior-web/hari-09-sql/proyek-5-capstone-pendaftaran/public/admin.php
  ```
  *(Terproteksi `cekLoginAdmin()`; jika belum login, sistem otomatis mengalihkan ke `login.php`)*.

---

## ✅ Definisi Selesai (Definition of Done) - Sprint 0

- [x] **CRUD Pendaftar Berjalan Penuh**: Tambah pendaftar mandiri, tampil pada panel admin dengan pencarian & paginasi, ubah data, dan hapus data.
- [x] **Pemisahan Halaman User & Admin**: `index.php` untuk user dan `admin.php` untuk admin terproteksi `cekLoginAdmin()`.
- [x] **Bebas Warning / Notice**: Error reporting aktif dengan penanganan exception global.
- [x] **Semua Query Berparameter**: Menggunakan PDO prepared statement (`:param`) untuk menolak SQL Injection.
- [x] **Output Di-escape**: Seluruh variabel yang dirender ke HTML dibungkus helper `e()` / `htmlspecialchars`.
- [x] **Kredensial Sensitif Terisolasi**: `config/config.php` tercantum di `.gitignore` dan tidak ter-commit ke Git.
- [x] **Skema SQL Bersih**: `skema.sql` dapat diimpor langsung dari nol (*clean install*) tanpa error.
- [x] **Dokumentasi Lengkap di `docs/`**: Analisis kebutuhan, 12 User Story, ERD desain basis data, dan wireframe 3 halaman.
