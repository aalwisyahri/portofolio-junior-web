# Dokumen Kasus Uji (Test Cases) - Capstone Sprint 2

**Aplikasi**: Proyek 5 - Sistem Pendaftaran Pelatihan / Diklat  
**Unit Kompetensi**: J.620100.025.02 (Melakukan Debugging)  
**Metode Pengujian**: Black-box Testing (Partisi Ekuivalen, Analisis Nilai Batas, Kasus Negatif, dan Pengujian Keamanan)  
**Format Standar**: Format T6 Modul Hari 11 Diklat Junior Web Programmer  

---

## Tabel Kasus Uji Sistem (Minimal 15 Kasus)

| ID | Skenario Pengujian | Data Masukan (Input) | Hasil yang Diharapkan | Hasil Aktual | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Pendaftaran pendaftar baru dengan data lengkap dan valid | Nama: `Budi Pratama`<br>Email: `budi.pratama@example.com`<br>No HP: `081234567890`<br>Alamat: `Jl. Sudirman No. 10`<br>Kelas: ID 1 (`Web Frontend`) | Data berhasil disimpan ke database, diarahkan ke status sukses, flash message *"Pendaftaran berhasil"* muncul | Data tersimpan, pesan sukses muncul | **LOLOS** |
| **TC-02** | Validasi input: Nama kosong atau kurang dari 3 karakter | Nama: `Al` (2 karakter)<br>Field lain valid | Form ditolak, muncul pesan galat *"Nama minimal 3 karakter."*, data input dipertahankan | Ditolak, pesan galat validasi muncul | **LOLOS** |
| **TC-03** | Validasi input: Format email tidak valid | Email: `budi_bukan_email`<br>Field lain valid | Form ditolak, muncul pesan galat *"Format email tidak valid."* | Ditolak, pesan validasi format email tampil | **LOLOS** |
| **TC-04** | Validasi integritas: Pendaftaran dengan email yang sudah terdaftar | Email: `budi.pratama@example.com` (sudah ada di DB)<br>Field lain valid | Form ditolak, muncul pesan galat *"Email sudah terdaftar."* (mencegah duplikasi data) | Ditolak, pesan *"Email sudah terdaftar."* tampil | **LOLOS** |
| **TC-05** | Nilai Batas (Boundary): Nomor HP 9 digit (di bawah batas minimum) | No HP: `081234567` (9 digit)<br>Field lain valid | Ditolak sistem validasi, nomor HP dianggap tidak valid | Uji otomatis / validasi menolak input | **LOLOS** |
| **TC-06** | Nilai Batas (Boundary): Nomor HP 10 digit (batas bawah valid) | No HP: `0812345678` (10 digit)<br>Field lain valid | Diterima dan validasi regex `^08[0-9]{8,11}$` lolos | Lolos validasi | **LOLOS** |
| **TC-07** | Nilai Batas (Boundary): Nomor HP 13 digit (batas atas valid) | No HP: `0812345678901` (13 digit)<br>Field lain valid | Diterima dan validasi regex lolos | Lolos validasi | **LOLOS** |
| **TC-08** | Nilai Batas (Boundary): Nomor HP 14 digit (melebihi batas maksimum) | No HP: `08123456789012` (14 digit)<br>Field lain valid | Ditolak sistem validasi regex | Ditolak validasi | **LOLOS** |
| **TC-09** | Kasus Negatif: Nomor HP mengandung huruf atau simbol pemisah | No HP: `0812-3456-78` atau `08abc45678` | Ditolak validasi nomor HP | Ditolak validasi | **LOLOS** |
| **TC-10** | Validasi kuota kelas: Pendaftaran saat kuota kelas telah penuh | Memilih kelas yang jumlah pendaftarnya $\ge$ kuota kelas | Sistem melempar `KuotaPenuhException`, transaksi dibatalkan (rollback), muncul notifikasi *"Kuota kelas sudah penuh."* | Transaksi dibatalkan, pesan kuota penuh tampil | **LOLOS** |
| **TC-11** | Autentikasi Admin: Login dengan username & password benar | Username: `admin`<br>Password: `SandiKuat123` | Login berhasil, session diregenerasi (`session_regenerate_id`), diarahkan ke dashboard `admin.php` | Berhasil login, masuk dashboard | **LOLOS** |
| **TC-12** | Autentikasi Admin: Login dengan password salah | Username: `admin`<br>Password: `SalahPassword!` | Login ditolak, pesan umum *"Username atau kata sandi salah."*, counter `gagal_login` bertambah | Ditolak dengan pesan kesalahan umum | **LOLOS** |
| **TC-13** | Autentikasi Admin: Login dengan username yang tidak terdaftar | Username: `hacker_user`<br>Password: `bebas123` | Login ditolak, menampilkan pesan umum yang identik (*"Username atau kata sandi salah."*) untuk mencegah enumerasi pengguna | Ditolak dengan pesan kesalahan umum yang aman | **LOLOS** |
| **TC-14** | Otorisasi Akses: Membuka halaman admin tanpa sesi login | Mengakses URL `admin.php`, `tambah.php`, `ubah.php`, `hapus.php` di browser anonim | Fungsi `wajibLogin()` mendeteksi sesi kosong dan langsung me-redirect ke `login.php` | Dialihkan otomatis ke `login.php` | **LOLOS** |
| **TC-15** | Manipulasi Parameter URL: Akses ubah dengan ID invalid | Mengakses `ubah.php?id=abc` atau `ubah.php?id=-1` atau `ubah.php?id=999999` | Sistem menangani dengan aman, tidak menampilkan error database mentah, mengembalikan status 404 / redirect | Ditangani aman tanpa kebocoran struktur data | **LOLOS** |
| **TC-16** | Keamanan XSS (Cross-Site Scripting): Input skrip berbahaya pada nama | Nama: `<script>alert('XSS')</script>`<br>Field lain valid | Masukan di-escape dengan aman oleh helper `e()` / `htmlspecialchars()`, skrip tampil sebagai teks biasa dan tidak dieksekusi browser | Tampil sebagai teks biasa `&lt;script&gt;...` | **LOLOS** |
| **TC-17** | Keamanan SQL Injection: Input string pemutus SQL pada form & pencarian | Input: `' OR '1'='1`<br>atau `' UNION SELECT null--` | Query dieksekusi dengan PDO Prepared Statements (`:kata` / `:email` binding). Karakter kutip dianggap literal string, struktur SQL tidak berubah | Query aman, tidak terjadi bypass login / kebocoran data | **LOLOS** |
| **TC-18** | Keamanan CSRF: Pengiriman request Hapus (POST) tanpa token CSRF | Mengirim form POST ke `hapus.php` tanpa menyertakan input hidden `csrf` atau token tidak cocok | `cekCsrf()` menolak eksekusi, membatalkan aksi hapus, dan menghentikan proses (HTTP 403 / error message) | Permintaan ditolak, data tetap aman | **LOLOS** |

---

## Kesimpulan Hasil Uji

* **Total Kasus Uji**: 18 Kasus (Melampaui batas minimal 15 kasus modul)
* **Jumlah Kasus Lolos**: 18
* **Jumlah Kasus Gagal**: 0
* **Tingkat Keberhasilan**: 100%
