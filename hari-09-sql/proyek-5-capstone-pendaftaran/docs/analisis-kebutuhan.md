# Analisis Kebutuhan Sistem Pendaftaran Pelatihan
**Proyek 5 (Capstone) - Sprint 0: Fondasi Proyek**

---

## 1. Profil Pengguna (Stakeholders)

### A. Peserta (Calon Peserta Pelatihan / User Publik)
- **Karakteristik**: Pengguna umum/eksternal yang ingin mendaftarkan diri pada program pelatihan yang diselenggarakan oleh lembaga.
- **Tujuan Utama**:
  - Mengakses halaman utama / informasi pelatihan (`index.php`).
  - Mengakses dan mengisi formulir pendaftaran daring (`tambah.php`) kapan saja tanpa perlu login akun.
  - Memilih program kelas pelatihan yang diminati secara langsung.
  - Mendapatkan konfirmasi bahwa data pendaftaran telah berhasil disimpan ke sistem.
  - Mencetak bukti pendaftaran resmi dalam format PDF berisikan nomor registrasi dan rincian data diri (Deliverable Hari 10).

### B. Admin (Pengelola Lembaga Pelatihan)
- **Karakteristik**: Staf/administrator internal lembaga yang memiliki kewenangan penuh mengelola data pendaftaran pelatihan.
- **Tujuan Utama**:
  - Masuk ke sistem melalui autentikasi kredensial yang aman (`login.php`) menggunakan verifikasi kata sandi ber-hash (`password_hash` & `password_verify`).
  - Mengakses panel khusus admin (`admin.php`) yang terproteksi oleh fungsi pengecekan sesi `cekLoginAdmin()`.
  - Melihat daftar seluruh pendaftar secara terstruktur, dilengkapi fasilitas pencarian nama peserta secara langsung dan navigasi paginasi (10 pendaftar per halaman).
  - Memperbaiki/mengubah data pendaftar (`ubah.php`) apabila terdapat kesalahan input identitas atau pilihan kelas.
  - Menghapus data pendaftar (`hapus.php`) yang tidak valid, fiktif, atau dibatalkan dengan perlindungan token CSRF.
  - Mengakhiri sesi kerja secara aman melalui fasilitas logout (`logout.php`).
  - Membatasi kuota peserta pada setiap kelas pelatihan agar tidak melebihi kapasitas (Sprint Hari 11).

---

## 2. Kebutuhan Fungsional (Fitur)

### Fitur Wajib (Must Have - Sprint 0)
1. **Halaman Pengguna / Publik (`index.php`)**:
   - Menjadi landing page awal bagi pengunjung/peserta umum.
   - Menyediakan navigasi menuju form pendaftaran maupun akses masuk untuk admin.
2. **Formulir Pendaftaran Peserta Daring (`tambah.php`)**:
   - Formulir pendaftaran dapat diakses oleh publik tanpa memerlukan sesi login.
   - Pilihan kelas pelatihan dimuat secara dinamis dari tabel database `kelas`.
   - Validasi ketat di sisi server:
     - Nama lengkap minimal 3 karakter.
     - Alamat email berformat valid dan belum pernah terdaftar sebelumnya (*unique validation*).
     - Nomor HP diawali format `08...` dengan panjang 10–13 digit numerik.
     - Pilihan kelas harus valid dan terdaftar di database.
3. **Panel Pengelolaan Data Admin (`admin.php`) - CRUD**:
   - **Create**: Pendaftaran dapat dilakukan dari form peserta (`tambah.php`).
   - **Read**: Menampilkan tabel pendaftar dengan relasi nama kelas (`JOIN kelas`), fitur pencarian nama (`LIKE :kata`), dan paginasi data (10 data per halaman).
   - **Update (`ubah.php`)**: Membuka form edit dengan *pre-fill* data yang ada, validasi ulang (mengecualikan email milik sendiri), dan menyimpan perubahan.
   - **Delete (`hapus.php`)**: Menghapus data pendaftar berbasis metode `POST` dengan verifikasi token CSRF dan konfirmasi interaktif.
4. **Autentikasi & Otorisasi Admin**:
   - Halaman login admin (`login.php`) dengan verifikasi kata sandi aman (`password_verify`).
   - Proteksi akses halaman admin (`admin.php`, `ubah.php`, `hapus.php`) menggunakan fungsi `cekLoginAdmin()`; pengguna yang belum login otomatis dialihkan ke `login.php`.
   - Mengambil identitas admin melalui fungsi `ambilAdminById()` dari tabel `admin`.
   - Navigasi dinamis pada `templates/header.php` yang membedakan menu saat tamu (Guest: User, Tambah, Login Admin) dan saat terautentikasi (Admin: Daftar, Logout).
5. **Keamanan Aplikasi**:
   - **Anti SQL Injection**: Seluruh interaksi query menggunakan PDO Prepared Statements dengan parameter binding (`:param`).
   - **Anti XSS (Cross-Site Scripting)**: Seluruh keluaran variabel ke HTML dibersihkan melalui fungsi helper `e()` (`htmlspecialchars`).
   - **Anti CSRF**: Formulir POST (pendaftaran, ubah, dan hapus) diproteksi menggunakan token acak `tokenCsrf()` dan divalidasi dengan `cekCsrf()`.

### Fitur Tambahan (Sprint Lanjutan)
1. **Cetak Bukti Pendaftaran PDF (Sprint Hari 10)**:
   - Peserta dapat mencetak/mengunduh kartu bukti registrasi berformat PDF resmi.
2. **Pembatasan Kuota Otomatis (Sprint Hari 11)**:
   - Pilihan kelas otomatis ditutup jika kuota telah terpenuhi (`COUNT(pendaftar) >= kelas.kuota`).
3. **Manajemen Akun Multi-Admin (Sprint Hari 11)**:
   - Pengelolaan multi-pengguna admin dengan enkripsi penuh di database.

---

## 3. Batasan Sistem (Constraints)
- **Bahasa & Standar**: PHP 8.x dengan deklarasi tipe ketat (`declare(strict_types=1);`).
- **Basis Data**: MySQL / MariaDB dengan engine InnoDB yang mendukung *Foreign Key Constraints* dan integritas referensial.
- **Penyimpanan Password**: Menggunakan hash standar industri PHP `password_hash($pass, PASSWORD_DEFAULT)` (Bcrypt) dan `password_verify()`.
- **Penanganan Kesalahan (Error Handling)**: Sistem tidak boleh memunculkan peringatan (*Notice/Warning*) yang merusak tampilan HTML; error tak terduga ditangani *global exception handler*.
- **Keamanan Repositori**: Berkas kredensial koneksi lokal (`config/config.php`) dikecualikan dari Git melalui berkas `.gitignore`, sedangkan template `config/config.contoh.php` disediakan untuk instalasi awal.
