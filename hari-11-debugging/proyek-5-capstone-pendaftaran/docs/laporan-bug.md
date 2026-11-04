# Laporan Bug dan Debugging Sistematis (Format T7)

**Mata Diklat**: Melakukan Debugging (Unit Kompetensi: J.620100.025.02)  
**Proyek**: Capstone Sprint 2 - Sistem Pendaftaran Pelatihan / Diklat  
**Metodologi**: Siklus Debugging Sistematis (Reproduksi $\rightarrow$ Isolasi $\rightarrow$ Hipotesis $\rightarrow$ Uji Hipotesis $\rightarrow$ Perbaiki $\rightarrow$ Re-test $\rightarrow$ Catat)  

---

## 📌 Bagian A: Temuan Bug Capstone Sprint 2 (Proyek 5)

Berikut adalah 5 temuan bug nyata yang ditemukan dan diselesaikan pada fase pengembangan Capstone Sprint 2:

### 1. BUG-CP-01: Potensi Terjadinya Kondisi Perlombaan (*Race Condition*) pada Pendaftaran Kuota Kelas
* **Jenis**: Logic Error
* **Tingkat Keparahan**: **Kritis** (Dapat menyebabkan kuota kelas terlampaui/rusak integritas data pendaftaran)
* **Lokasi**: `src/pendaftar.php:daftarkanDenganKuota()`
* **Langkah Reproduksi**:
  1. Siapkan kelas dengan sisa kuota tinggal 1 kursi.
  2. Buka dua jendela browser atau jalankan 2 request submit formulir pendaftaran secara bersamaan dalam detik yang sama.
* **Hasil Diharapkan vs Aktual**:
  - *Diharapkan*: Hanya pendaftar pertama yang berhasil; pendaftar kedua menerima pesan *"Kuota kelas sudah penuh."*.
  - *Aktual*: Tanpa mekanisme penguncian baris, kedua proses membaca sisa kuota masih mencukupi, sehingga keduanya berhasil tersimpan (kuota tembus).
* **Pesan/Kode Error**: Tidak ada error runtime, namun data di database melebihi kapasitas kelas.
* **Akar Penyebab**: Operasi pengecekan kuota dan insert data pendaftar berjalan tanpa transaksi database atomik dan tidak mengunci baris data kelas yang bersangkutan.
* **Perbaikan**: Menggunakan transaksi PDO (`$pdo->beginTransaction()` dan `$pdo->commit()`), menjalankan `SELECT kuota FROM kelas WHERE id = :id FOR UPDATE` untuk mengunci baris kelas hingga transaksi selesai, serta melempar `KuotaPenuhException` jika kuota sudah terpenuhi.
* **Hasil Re-test**: **Lolos** (Pendaftar kedua berhasil diblokir dengan exception dan rollback).

---

### 2. BUG-CP-02: Kebocoran Halaman Panel Admin Tanpa Verifikasi Sesi Autentikasi
* **Jenis**: Runtime / Security Vulnerability
* **Tingkat Keparahan**: **Kritis** (Akses tidak sah ke data sensitif peserta diklat)
* **Lokasi**: `public/admin.php`, `public/tambah.php`, `public/ubah.php`, `public/hapus.php`
* **Langkah Reproduksi**:
  1. Buka browser baru pada mode Incognito / Private (tanpa login).
  2. Masukkan URL langsung: `http://localhost/.../public/admin.php`.
* **Hasil Diharapkan vs Aktual**:
  - *Diharapkan*: Pengguna langsung dialihkan (*redirect*) ke `public/login.php`.
  - *Aktual*: Halaman dashboard admin terbuka dan menampilkan seluruh data peserta diklat.
* **Pesan/Kode Error**: `HTTP 200 OK` (seharusnya ditolak/dialihkan).
* **Akar Penyebab**: Skrip `admin.php` dan modul manajemen data belum memanggil fungsi guard pengecekan status autentikasi admin di baris awal.
* **Perbaikan**: Menambahkan pemanggilan fungsi `wajibLogin();` pada baris paling atas tepat setelah pemanggilan `require_once __DIR__ . '/../src/bootstrap.php';` di semua halaman admin.
* **Hasil Re-test**: **Lolos** (Akses tanpa sesi langsung dialihkan ke `login.php`).

---

### 3. BUG-CP-03: Celah Kerentanan XSS (*Stored Cross-Site Scripting*) pada Data Nama Peserta
* **Jenis**: Security / Logic
* **Tingkat Keparahan**: **Tinggi** (Skrip peretas dapat dieksekusi di browser pengelola/admin)
* **Lokasi**: `templates/header.php`, `public/admin.php`, `templates/bukti.php`
* **Langkah Reproduksi**:
  1. Daftar dengan mengisi nama: `<script>alert('XSS Terbuka')</script>`.
  2. Login sebagai admin dan buka daftar pendaftar.
* **Hasil Diharapkan vs Aktual**:
  - *Diharapkan*: Tag `<script>` ditampilkan sebagai karakter teks biasa murni (`&lt;script&gt;`).
  - *Aktual*: Dialog pop-up browser muncul mengeksekusi skrip JavaScript yang diinputkan.
* **Pesan/Kode Error**: Eksekusi JavaScript tak terduga di browser.
* **Akar Penyebab**: Output data dicetak langsung menggunakan `echo $baris['nama']` tanpa proses *escaping* karakter HTML khusus.
* **Perbaikan**: Seluruh pencetakan data dinamis ke HTML dibungkus menggunakan fungsi helper `e($val)` yang mengimplementasikan `htmlspecialchars($string, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')`.
* **Hasil Re-test**: **Lolos** (Skrip tampil aman sebagai teks biasa tanpa pop-up).

---

### 4. BUG-CP-04: Penghapusan Data Peserta Rentan Serangan CSRF (*Cross-Site Request Forgery*)
* **Jenis**: Security Vulnerability
* **Tingkat Keparahan**: **Tinggi** (Pihak ketiga dapat memicu penghapusan data peserta tanpa sepengetahuan admin)
* **Lokasi**: `public/hapus.php`
* **Langkah Reproduksi**:
  1. Login sebagai admin.
  2. Buat skrip web eksternal sederhana yang mengirimkan request POST ke `hapus.php?id=1` tanpa menyertakan token sesi.
* **Hasil Diharapkan vs Aktual**:
  - *Diharapkan*: Permintaan ditolak dengan pesan kesalahan CSRF atau error 403 Forbidden.
  - *Aktual*: Data peserta dengan ID 1 langsung terhapus dari basis data.
* **Pesan/Kode Error**: Tidak ada pencegahan validasi keaslian origin permintaan.
* **Akar Penyebab**: Berkas `hapus.php` memproses penghapusan data tanpa memverifikasi token anti-CSRF yang unik per sesi.
* **Perbaikan**: Menambahkan verifikasi `cekCsrf()` pada awal pemrosesan form POST di `hapus.php` dan mewajibkan pengiriman `tokenCsrf()` dari form dashboard.
* **Hasil Re-test**: **Lolos** (Permintaan POST tanpa token CSRF yang valid langsung digagalkan).

---

### 5. BUG-CP-05: Penanganan Parameter ID Tidak Valid Menyebabkan Kesalahan Database Mentah
* **Jenis**: Runtime Error
* **Tingkat Keparahan**: **Sedang** (Membocorkan informasi teknis/struktur database kepada publik)
* **Lokasi**: `public/ubah.php`, `public/cetak.php`
* **Langkah Reproduksi**:
  1. Akses halaman ubah dengan parameter string non-angka: `ubah.php?id=abc` atau nilai id yang tidak ada: `ubah.php?id=99999`.
* **Hasil Diharapkan vs Aktual**:
  - *Diharapkan*: Tampilan halaman informasi ramah (404 Not Found) atau dialihkan dengan notifikasi *"Data tidak ditemukan"*.
  - *Aktual*: Terjadi Warning `Trying to access array offset on value of type null` dan error query.
* **Pesan/Kode Error**: `Fatal error: Uncaught TypeError / PDOException`.
* **Akar Penyebab**: Variabel `$_GET['id']` langsung di-cast atau digunakan tanpa pengecekan apakah id berupa numerik valid dan apakah data dengan id tersebut benar-benar ditemukan di database (`ambilPendaftarById() === null`).
* **Perbaikan**: Melakukan validasi casting `(int)$_GET['id']`, mengecek hasil `ambilPendaftarById($pdo, $id)`, dan jika `null`, langsung panggil `redirect('admin.php')` atau kirim HTTP header 404.
* **Hasil Re-test**: **Lolos** (Aplikasi aman dari ID acak dan tidak membocorkan struktur internal).

---

## 📌 Bagian B: Rekapitulasi Bug Lab 1 (JavaScript: `bug-keranjang.js`)

| ID | Jenis | Lokasi | Gejala | Akar Penyebab | Perbaikan yang Diterapkan | Status |
| :---: | :---: | :--- | :--- | :--- | :--- | :---: |
| **B-01** | Syntax Error | Baris `console.log` terakhir | `SyntaxError: missing ) after argument list` | Kurung penutup pada pemanggilan `console.log()` hilang | Menambahkan kurung penutup `)` pada akhir baris | **Lolos** |
| **B-02** | Runtime Error | Fungsi `hitungTotal()` | `TypeError: Cannot read properties of undefined (reading 'harga')` | Loop menggunakan operator `<=` sehingga indeks array melebihi panjang array (`i = daftar.length`) | Memperbaiki kondisi batas loop menjadi `i < daftar.length` | **Lolos** |
| **B-03** | Logic / Data | `hitungSubtotal()` untuk item Penghapus | Hasil perhitungan total bernilai `NaN` | Properti `jumlah` tidak didefinisikan pada objek Penghapus (`undefined`) | Memberikan nilai bawaan jumlah `item.jumlah ?? 1` atau melengkapi properti jumlah pada data | **Lolos** |
| **B-04** | Logic Error | Fungsi `hitungDiskon()` | Total belanja tepat Rp50.000 tidak mendapatkan potongan diskon | Operator pengkondisian menggunakan `>` padahal syarat minimal adalah `>= 50000` | Mengubah kondisi seleksi menjadi `if (total >= 50000)` | **Lolos** |

---

## 📌 Bagian C: Rekapitulasi Bug Lab 2 (PHP: `bug-nilai.php`)

| ID | Jenis | Lokasi | Gejala | Akar Penyebab | Perbaikan yang Diterapkan | Status |
| :---: | :---: | :--- | :--- | :--- | :--- | :---: |
| **B-01** | Syntax Error | `hitungLulus()` baris return | `Parse error: syntax error, unexpected '}'` | Perintah `return $lulus` tidak diakhiri tanda titik koma (`;`) | Menambahkan tanda titik koma: `return $lulus;` | **Lolos** |
| **B-02** | Runtime Error | `hitungRataRata()` baris penjumlahan | `TypeError: Unsupported operand types: int + string` pada `$total += $n` | Elemen nilai Budi bertipe string (`'68'`), melanggar strict typing | Melakukan type casting `(int)$n` atau memperbaiki sumber data array | **Lolos** |
| **B-03** | Logic Error | `hitungRataRata()` baris return | Hasil rata-rata terlalu tinggi (salah perhitungan) | Pembagian total nilai menggunakan `count($daftar) - 1` | Mengubah pembagi menjadi `count($daftar)` serta menangani kasus jika array kosong | **Lolos** |
| **B-04** | Logic Error | `hitungLulus()` baris filter | Siswa bernama Dewi (nilai 70) tidak dihitung lulus | Syarat kelulusan minimal 70, namun kondisi kode `if ($n > 70)` | Mengubah perbandingan menjadi operator lebih besar sama dengan: `if ($n >= 70)` | **Lolos** |
| **B-05** | Runtime (Warning) | Baris pencetakan nilai Eko | `Warning: Undefined array key 'Eko'` | Kunci `'Eko'` tidak ditemukan pada array `$nilai` awal | Menambahkan data siswa Eko pada array atau menggunakan operator null coalescing `$nilai['Eko'] ?? 0` | **Lolos** |
| **B-06** | Runtime (Warning) | Pemanggilan `header()` | `Warning: Cannot modify header information - headers already sent` | Fungsi `header()` dipanggil setelah adanya output HTML/teks (`echo`) | Memindahkan pemanggilan `header('X-Debug: selesai');` ke baris paling atas sebelum perintah `echo` | **Lolos** |
