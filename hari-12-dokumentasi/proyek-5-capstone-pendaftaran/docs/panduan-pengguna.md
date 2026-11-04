# Panduan Pengguna – Sistem Pendaftaran Pelatihan / Diklat

**Versi Aplikasi**: 1.0.0  
**Tanggal Pembuatan**: November 2026  
**Ditujukan untuk**: Peserta diklat (pengguna publik) dan Admin pengelola data  

---

## Daftar Isi
1. [Pendahuluan](#1-pendahuluan)
2. [Alur Penggunaan untuk Peserta (Publik)](#2-alur-penggunaan-untuk-peserta-publik)
3. [Alur Penggunaan untuk Admin](#3-alur-penggunaan-untuk-admin)
4. [Pertanyaan Umum (FAQ)](#4-pertanyaan-umum-faq)

---

## 1. Pendahuluan

Sistem Pendaftaran Pelatihan adalah aplikasi web yang memungkinkan:
- **Peserta** mendaftarkan diri ke kelas pelatihan / diklat yang tersedia.
- **Admin** mengelola data peserta, kelas, dan kuota tempat duduk.

### Persyaratan Perangkat
- Browser modern: Google Chrome, Mozilla Firefox, Microsoft Edge (terbaru).
- Koneksi internet atau akses ke jaringan lokal web server.

---

## 2. Alur Penggunaan untuk Peserta (Publik)

### A. Mengakses Formulir Pendaftaran
1. Buka browser dan navigasikan ke alamat:  
   `http://localhost/pendaftaran/public/`
2. Halaman beranda akan menampilkan **formulir pendaftaran**.

### B. Mengisi Formulir Pendaftaran

Isi setiap kolom pada formulir sesuai ketentuan berikut:

| Kolom | Ketentuan Pengisian |
|-------|---------------------|
| **Nama Lengkap** | Wajib diisi, minimal 3 karakter |
| **Email** | Wajib diisi, format email yang valid (contoh: `nama@email.com`) |
| **No. HP** | Wajib diisi, diawali `08`, panjang 10–13 digit angka |
| **Alamat** | Wajib diisi |
| **Pilih Kelas** | Wajib dipilih dari daftar kelas yang tersedia |

> **Catatan:** Email yang sudah pernah didaftarkan sebelumnya tidak dapat digunakan kembali.

### C. Mengirim Pendaftaran
1. Setelah semua kolom terisi dengan benar, klik tombol **"Daftar Sekarang"**.
2. Jika ada kolom yang tidak sesuai, sistem akan menampilkan pesan kesalahan di bawah kolom terkait.
3. Jika berhasil, Anda akan dialihkan ke **halaman bukti pendaftaran** yang berisi:
   - Nomor bukti pendaftaran (format: `REG-YYYY-XXXXXX`)
   - Data pendaftaran yang telah disimpan

### D. Mencetak Bukti Pendaftaran
1. Di halaman bukti pendaftaran, klik tombol **"Cetak Bukti (PDF)"**.
2. Browser atau sistem akan membuka tampilan cetak; simpan sebagai PDF atau cetak langsung.

> **Penting:** Simpan/cetak bukti pendaftaran Anda, karena nomor bukti dibutuhkan saat mengikuti pelatihan.

---

## 3. Alur Penggunaan untuk Admin

### A. Masuk ke Panel Admin (Login)
1. Buka browser dan navigasikan ke:  
   `http://localhost/pendaftaran/public/login.php`
2. Masukkan **Username** dan **Kata Sandi** admin yang telah dibuat saat instalasi.
3. Klik tombol **"Masuk"**.

> **Keamanan:** Setelah 5 kali percobaan login yang gagal, akun akan dikunci sementara.

### B. Dashboard / Daftar Pendaftar (Panel Admin)
Setelah login berhasil, Anda akan melihat dashboard yang menampilkan:
- **Tabel daftar seluruh peserta** yang telah mendaftar (dilengkapi fitur pencarian dan pengurutan via DataTables).
- **Kolom aksi**: Ubah, Hapus, dan Cetak bukti untuk setiap peserta.

**Fitur pencarian:**
- Ketikkan nama peserta pada kolom pencarian di atas tabel untuk menyaring data secara langsung.

### C. Menambah Data Pendaftar (Admin)
1. Di dashboard, klik tombol **"Tambah Pendaftar"**.
2. Isi formulir data pendaftar (aturan sama seperti formulir publik).
3. Klik tombol **"Simpan"**; data akan tersimpan dan Anda kembali ke dashboard.

### D. Mengubah Data Pendaftar
1. Di baris data peserta yang ingin diubah, klik ikon/tombol **"Ubah"** (ikon pensil).
2. Formulir akan terisi dengan data peserta saat ini.
3. Ubah data yang diperlukan, lalu klik **"Simpan Perubahan"**.

### E. Menghapus Data Pendaftar
1. Di baris data peserta yang ingin dihapus, klik ikon/tombol **"Hapus"** (ikon tempat sampah).
2. Sistem akan menampilkan dialog konfirmasi:  
   _"Data [Nama Peserta] akan dihapus permanen."_
3. Klik **"Ya, hapus"** untuk mengonfirmasi, atau **"Batal"** untuk membatalkan.

> **Perhatian:** Penghapusan data bersifat permanen dan tidak dapat dikembalikan (tidak ada fitur undo).

### F. Keluar dari Panel Admin (Logout)
1. Klik tombol atau tautan **"Keluar"** yang tersedia di sudut halaman.
2. Sesi Anda akan dihapus dan Anda akan dialihkan kembali ke halaman login.

---

## 4. Pertanyaan Umum (FAQ)

**Q: Saya sudah mendaftar tetapi ingin mengubah email, bagaimana caranya?**  
A: Perubahan data hanya bisa dilakukan oleh admin. Hubungi pengelola pelatihan untuk meminta perubahan.

**Q: Kelas yang ingin saya pilih tidak muncul di dropdown, kenapa?**  
A: Kemungkinan kuota kelas tersebut sudah penuh. Silakan pilih kelas lain yang masih tersedia.

**Q: Saya lupa nomor bukti pendaftaran saya, apa yang harus dilakukan?**  
A: Hubungi admin pelatihan dan berikan data nama lengkap serta email yang didaftarkan; admin dapat mencarinya di panel.

**Q: Apakah data saya aman?**  
A: Ya. Sistem menggunakan proteksi berlapis: enkripsi password (Bcrypt), pencegahan XSS (`htmlspecialchars`), SQL Injection (Prepared Statements PDO), dan CSRF Token.

---

