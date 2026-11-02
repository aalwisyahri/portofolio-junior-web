# Wireframe Desain Antarmuka Tiga Halaman
**Proyek 5 (Capstone) - Sistem Pendaftaran Pelatihan**

Dokumen wireframe ini memetakan tata letak (*layout*) dan komponen antarmuka pengguna untuk 3 halaman utama sistem, serta halaman pendukung sesuai implementasi proyek terkini.

---

## 1. Wireframe Halaman Form Pendaftaran Peserta (`tambah.php`)

Halaman formulir publik yang digunakan calon peserta untuk mendaftar secara daring.

```text
+-------------------------------------------------------------------------------+
|                            PENDAFTARAN PELATIHAN                              |
| [User]  |  [Tambah]  |  [Login Admin]                                         |
+-------------------------------------------------------------------------------+
|                                                                               |
|   TAMBAH PENDAFTAR                                                            |
|                                                                               |
|   Nama:                                                                       |
|   +-----------------------------------------------------------------------+   |
|   | Contoh: Budi Santoso                                                  |   |
|   +-----------------------------------------------------------------------+   |
|   (Minimal 3 karakter)                                                        |
|                                                                               |
|   Email:                                                                      |
|   +-----------------------------------------------------------------------+   |
|   | budi@example.com                                                      |   |
|   +-----------------------------------------------------------------------+   |
|   (Harus unik dan berformat email valid)                                      |
|                                                                               |
|   No. HP:                                                                     |
|   +-----------------------------------------------------------------------+   |
|   | 081234567890                                                          |   |
|   +-----------------------------------------------------------------------+   |
|   (Diawali 08, 10-13 digit)                                                   |
|                                                                               |
|   Kelas:                                                                      |
|   +-----------------------------------------------------------------------+   |
|   | [ -- Pilih kelas --                v ]                                |   |
|   +-----------------------------------------------------------------------+   |
|                                                                               |
|   Alamat:                                                                     |
|   +-----------------------------------------------------------------------+   |
|   | Jl. Kaliurang KM 5, Sleman                                            |   |
|   |                                                                       |   |
|   +-----------------------------------------------------------------------+   |
|                                                                               |
|   [ Simpan ]   [ Batal ]                                                      |
|                                                                               |
+-------------------------------------------------------------------------------+
| (c) 2026 Pendaftaran Pelatihan                                                |
+-------------------------------------------------------------------------------+
```

---

## 2. Wireframe Halaman Daftar Admin (`admin.php`)

Halaman panel terproteksi (`cekLoginAdmin()`) yang digunakan oleh admin untuk mengelola seluruh data pendaftar.

```text
+-------------------------------------------------------------------------------+
|                            PENDAFTARAN PELATIHAN                              |
| [Daftar]  |  [Logout]                                                         |
+-------------------------------------------------------------------------------+
|                                                                               |
|   DAFTAR PENDAFTAR                                                            |
|                                                                               |
|   Cari nama: [ Siti                    ]  [ Cari ]                            |
|                                                                               |
|   +---------------+--------------------+---------------+---------------+----+ |
|   | Nama          | Email              | No. HP        | Kelas         |Aksi| |
|   +---------------+--------------------+---------------+---------------+----+ |
|   | Siti Aminah   | siti@gmail.com     | 081234567890  | Analisis Data |[U] | |
|   |               |                    |               |               |[H] | |
|   | Siti Rahma    | rahma@gmail.com    | 081398765432  | Desain UI/UX  |[U] | |
|   |               |                    |               |               |[H] | |
|   +---------------+--------------------+---------------+---------------+----+ |
|                                                                               |
|   Halaman: [1]  2  3                                                          |
|                                                                               |
+-------------------------------------------------------------------------------+
| (c) 2026 Pendaftaran Pelatihan                                                |
+-------------------------------------------------------------------------------+
* Keterangan Aksi: [U] = Ubah (ubah.php), [H] = Hapus dengan konfirmasi & token CSRF (hapus.php)
```

---

## 3. Wireframe Halaman / Dokumen Bukti Pendaftaran PDF (`bukti.php`)

Format dokumen bukti pendaftaran resmi yang dapat diunduh/dicetak peserta (Deliverable Sprint Hari 10).

```text
+-------------------------------------------------------------------------------+
|  ===========================================================================  |
|  ||                        LEMBAGA PELATIHAN KEJURUAN                      || |
|  ||              Jl. Teknologi Canggih No. 42, Telp: (0274) 555-1234       || |
|  ||=======================================================================||  |
|  ||                                                                       ||  |
|  ||                     TANDA BUKTI PENDAFTARAN PESERTA                   ||  |
|  ||                     Nomor Registrasi: REG-2026-0042                   ||  |
|  ||                                                                       ||  |
|  ||  Data Peserta:                                                        ||  |
|  ||  -------------------------------------------------------------------  ||  |
|  ||  Nama Lengkap     : Budi Santoso                                      ||  |
|  ||  Email Terdaftar  : budi@example.com                                  ||  |
|  ||  Nomor HP         : 081234567890                                      ||  |
|  ||  Alamat Domisili  : Sleman, DI Yogyakarta                             ||  |
|  ||  Kelas Pelatihan  : Pemrograman Web (Fullstack)                       ||  |
|  ||  Waktu Pendaftaran: 29 Oktober 2026, 14:30 WIB                        ||  |
|  ||  -------------------------------------------------------------------  ||  |
|  ||                                                                       ||  |
|  ||  Catatan:                                                             ||  |
|  ||  1. Harap membawa dokumen bukti ini saat orientasi kelas pertama.     ||  |
|  ||  2. Konfirmasi jadwal kelas akan diinformasikan via WhatsApp/Email.   ||  |
|  ||                                                                       ||  |
|  ||  [ QR Code Validasi ]                     Yogyakarta, 29 Oktober 2026 ||  |
|  ||  +---------------+                        Panitia Pelatihan,          ||  |
|  ||  | # # # # # # # |                                                    ||  |
|  ||  | #   #   #   # |                        (Cap & Tanda Tangan)        ||  |
|  ||  | # # # # # # # |                                                    ||  |
|  ||  +---------------+                        Admin Lembaga Pelatihan     ||  |
|  ===========================================================================  |
+-------------------------------------------------------------------------------+
```

---

## 4. (Pelengkap) Wireframe Halaman Pengguna / Utama (`index.php`) & Login (`login.php`)

### A. Halaman Utama Pengguna (`index.php`)
```text
+-------------------------------------------------------------------------------+
|                            PENDAFTARAN PELATIHAN                              |
| [User]  |  [Tambah]  |  [Login Admin]                                         |
+-------------------------------------------------------------------------------+
|                                                                               |
|   INI HALAMAN USER                                                            |
|                                                                               |
|   Selamat datang di Portal Sistem Pendaftaran Pelatihan.                      |
|   Gunakan menu "Tambah" di atas untuk mendaftarkan diri Anda pada pelatihan.  |
|                                                                               |
+-------------------------------------------------------------------------------+
| (c) 2026 Pendaftaran Pelatihan                                                |
+-------------------------------------------------------------------------------+
```

### B. Halaman Login Admin (`login.php`)
```text
+-------------------------------------------------------------------------------+
|                            PENDAFTARAN PELATIHAN                              |
| [User]  |  [Tambah]  |  [Login Admin]                                         |
+-------------------------------------------------------------------------------+
|                                                                               |
|   LOGIN ADMIN                                                                 |
|                                                                               |
|   Password:                                                                   |
|   +---------------------------------------+                                   |
|   | [ ********* ]                         |                                   |
|   +---------------------------------------+                                   |
|                                                                               |
|   [ Login ]                                                                   |
|                                                                               |
+-------------------------------------------------------------------------------+
| (c) 2026 Pendaftaran Pelatihan                                                |
+-------------------------------------------------------------------------------+
```
