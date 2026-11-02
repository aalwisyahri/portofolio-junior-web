# User Story dan Product Backlog
**Proyek 5 (Capstone) - Sistem Pendaftaran Pelatihan**

Dokumen ini memuat daftar User Story dan Product Backlog minimal 10 butir yang telah diprioritaskan untuk memandu pengembangan dari Sprint 0 hingga Sprint penyelesaian.

---

## 1. Tabel User Story dan Product Backlog

| ID | Sebagai | Saya ingin | Agar | Prioritas | Estimasi Sprint |
| :---: | :--- | :--- | :--- | :---: | :---: |
| **US-01** | **Peserta** | Mengisi form pendaftaran secara daring (`tambah.php`) | Terdaftar di kelas pelatihan pilihan saya | **Wajib** | **Sprint 0 (Hari 9)** |
| **US-02** | **Admin** | Melihat daftar pendaftar dengan pencarian dan paginasi (`admin.php`) | Mengelola data dengan cepat dan efisien | **Wajib** | **Sprint 0 (Hari 9)** |
| **US-03** | **Admin** | Mengubah dan menghapus data pendaftar (`ubah.php`, `hapus.php`) | Memperbaiki kesalahan data atau membatalkan pendaftaran | **Wajib** | **Sprint 0 (Hari 9)** |
| **US-04** | **Peserta** | Mencetak bukti pendaftaran PDF (`bukti.php`) | Memiliki bukti resmi keikutsertaan pelatihan | **Wajib** | **Hari 10** |
| **US-05** | **Admin** | Login dengan akun (`login.php`) menggunakan password hash | Data tidak dapat diubah oleh pihak yang tidak berhak | **Wajib** | **Fondasi Hari 9 (Final Hari 11)** |
| **US-06** | **Admin** | Membatasi kuota kelas pelatihan | Pendaftar tidak melebihi kapasitas kelas | **Wajib** | **Hari 11** |
| **US-07** | **Admin** | Melakukan logout (`logout.php`) dari panel admin | Sesi aktif tertutup dengan aman setelah selesai bertugas | **Wajib** | **Sprint 0 (Hari 9)** |
| **US-08** | **Peserta** | Mengakses halaman utama pendaftaran (`index.php`) | Mendapatkan informasi awal dan navigasi menu yang mudah | **Wajib** | **Sprint 0 (Hari 9)** |
| **US-09** | **Peserta** | Melihat pesan validasi yang jelas pada formulir | Mengetahui kolom formulir mana yang salah dan harus diperbaiki | **Wajib** | **Sprint 0 (Hari 9)** |
| **US-10** | **Peserta** | Memilih kelas dari daftar yang dimuat dinamis dari database | Selalu mendapatkan pilihan kelas yang valid dan aktif | **Wajib** | **Sprint 0 (Hari 9)** |
| **US-11** | **Sistem** | Memvalidasi keunikan alamat email pendaftar | Tidak terjadi pendaftaran ganda oleh orang yang sama | **Wajib** | **Sprint 0 (Hari 9)** |
| **US-12** | **Sistem** | Mengamankan seluruh transaksi dengan Prepared Statements dan Token CSRF | Sistem kebal terhadap ancaman SQL Injection dan CSRF | **Wajib** | **Sprint 0 (Hari 9)** |

---

## 2. Kriteria Penerimaan (*Acceptance Criteria*) Sprint 0

### US-01, US-08, US-09, US-10 (Pendaftaran Mandiri oleh Peserta)
1. Halaman utama (`index.php`) dapat diakses langsung oleh pengunjung umum tanpa autentikasi.
2. Formulir pendaftaran (`tambah.php`) dapat diakses publik dengan navigasi menu yang jelas.
3. Form pendaftaran menampilkan daftar opsi kelas yang diambil secara dinamis dari tabel `kelas`.
4. Validasi server memastikan:
   - Nama memiliki panjang minimal 3 karakter.
   - Format email valid dan belum ada di tabel `pendaftar`.
   - Nomor HP berawalan `08` dan berukuran 10–13 digit.
   - Pilihan kelas wajib terdaftar pada tabel `kelas`.
5. Jika data valid, sistem menyimpan data ke database dan menampilkan pesan sukses (*flash message*).

### US-02, US-03 (Panel Kelola Data Admin)
1. Halaman `admin.php` terproteksi penuh oleh fungsi `cekLoginAdmin()`. Akses tanpa sesi login otomatis dialihkan ke `login.php` dengan pesan instruksi.
2. Halaman `admin.php` menampilkan tabel pendaftar lengkap dengan kolom: Nama, Email, No. HP, Nama Kelas, dan Tombol Aksi (Ubah & Hapus).
3. Formulir pencarian (`GET q`) menyaring data berdasarkan nama peserta dan mempertahankan kata kunci pencarian.
4. Paginasi menampilkan 10 data per halaman lengkap dengan navigasi tautan nomor halaman.
5. Tombol **Ubah** (`ubah.php`) menampilkan form edit dengan data terisi, mengizinkan perubahan, dan memvalidasi keunikan email (mengecualikan ID peserta terkait).
6. Tombol **Hapus** (`hapus.php`) hanya merespons metode `POST` dengan verifikasi token CSRF dan konfirmasi JavaScript.

### US-05, US-07 (Autentikasi & Sesi Admin)
1. Halaman `login.php` menyediakan form input password dengan proteksi token CSRF.
2. Verifikasi kata sandi mengimplementasikan `password_verify()` terhadap password yang telah di-hash melalui `password_hash()`.
3. Setelah login berhasil, session `$_SESSION['admin_login'] = true` dibuat dan dialihkan ke `admin.php`.
4. Navigasi header (`templates/header.php`) secara otomatis menyesuaikan tampilan:
   - **Tamu / Guest**: Menampilkan menu `User` (`index.php`), `Tambah` (`tambah.php`), `Login Admin` (`login.php`).
   - **Admin Login**: Menampilkan menu `Daftar` (`admin.php`) dan `Logout` (`logout.php`).
5. Tombol logout menghapus sesi admin dan mengarahkan kembali ke `login.php` dengan pesan pemberitahuan.
