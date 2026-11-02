# Desain Basis Data (ERD & Skema Relasional)
**Proyek 5 (Capstone) - Sistem Pendaftaran Pelatihan**

---

## 1. Diagram Relasi Entitas (ERD)

```text
+-----------------------+              +-------------------------------------+
|        kelas          |              |              pendaftar              |
+-----------------------+              +-------------------------------------+
| PK  id           INT  |<----+        | PK  id            INT               |
|     nama_kelas   VR100|     |        |     nama          VARCHAR(100)      |
|     kuota        INT  |     |        |     email         VARCHAR(120) [UQ] |
+-----------------------+     |        |     no_hp         VARCHAR(20)       |
                              |        |     alamat        TEXT [NULL]       |
                              +-------<| FK  kelas_id      INT               |
                               (1 : M) |     tgl_daftar    TIMESTAMP         |
                                       +-------------------------------------+

+-------------------------------------+
|                admin                |
+-------------------------------------+
| PK  id            INT               |
|     username      VARCHAR(100) [UQ] |
|     password_hash VARCHAR(255)      |
|     dibuat_pada   TIMESTAMP         |
+-------------------------------------+
```

### Penjelasan Relasi:
- **`kelas` $\rightarrow$ `pendaftar` (One-to-Many / $1 : N$)**:
  - Satu kelas pelatihan dapat diikuti oleh banyak pendaftar.
  - Setiap pendaftar wajib memilih tepat satu kelas pelatihan (`kelas_id`).
  - Aturan Integritas Referensial (*Foreign Key Constraints*):
    - `ON DELETE RESTRICT`: Menolak penghapusan data kelas jika masih ada pendaftar yang terhubung pada kelas tersebut.
    - `ON UPDATE CASCADE`: Apabila `id` kelas diperbarui, maka seluruh `kelas_id` pada pendaftar terkait akan diperbarui secara otomatis.

---

## 2. Struktur Kamus Data Tabel

### A. Tabel `kelas`
Menyimpan master program pelatihan yang dibuka lembaga.

| Nama Kolom | Tipe Data | Keterangan | Atribut & Batasan |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | Identifikator unik kelas | `AUTO_INCREMENT`, `PRIMARY KEY` |
| `nama_kelas` | `VARCHAR(100)` | Nama program pelatihan | `NOT NULL` |
| `kuota` | `INT` | Batas kapasitas maksimal peserta | `NOT NULL`, `DEFAULT 30` |

### B. Tabel `pendaftar`
Menyimpan data identitas peserta yang mendaftar pelatihan.

| Nama Kolom | Tipe Data | Keterangan | Atribut & Batasan |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | Identifikator unik pendaftar | `AUTO_INCREMENT`, `PRIMARY KEY` |
| `nama` | `VARCHAR(100)` | Nama lengkap calon peserta | `NOT NULL` |
| `email` | `VARCHAR(120)` | Alamat email aktif pendaftar | `NOT NULL`, `UNIQUE` |
| `no_hp` | `VARCHAR(20)` | Nomor kontak telepon / WhatsApp | `NOT NULL` |
| `alamat` | `TEXT` | Alamat domisili | `NULL` |
| `kelas_id` | `INT` | Relasi ke kelas pilihan | `NOT NULL`, `FOREIGN KEY REFERENCES kelas(id)` |
| `tgl_daftar` | `TIMESTAMP` | Waktu pencatatan pendaftaran | `DEFAULT CURRENT_TIMESTAMP` |

**Indeks:**
- `UNIQUE KEY (email)`: Memastikan alamat email tidak dapat didaftarkan lebih dari satu kali.
- `INDEX idx_pendaftar_nama (nama)`: Mempercepat proses pencarian nama peserta pada query `LIKE :kata` di panel admin.

### C. Tabel `admin`
Menyimpan akun administrator untuk autentikasi sistem.

| Nama Kolom | Tipe Data | Keterangan | Atribut & Batasan |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | Identifikator unik admin | `AUTO_INCREMENT`, `PRIMARY KEY` |
| `username` | `VARCHAR(100)` | Username akun admin | `NOT NULL`, `UNIQUE` |
| `password_hash` | `VARCHAR(255)` | Kata sandi ber-hash (`password_hash`) | `NOT NULL` |
| `dibuat_pada` | `TIMESTAMP` | Waktu pembuatan akun admin | `DEFAULT CURRENT_TIMESTAMP` |

**Integrasi Kode Program**:
Tabel `admin` diakses melalui fungsi `ambilAdminById(PDO $pdo, int $id): ?array` pada modul [`src/pendaftar.php`](file:///c:/xampp/htdocs/portofolio-junior-web/hari-09-sql/proyek-5-capstone-pendaftaran/src/pendaftar.php) dan diverifikasi menggunakan fungsi `password_verify()` pada alur login [`public/login.php`](file:///c:/xampp/htdocs/portofolio-junior-web/hari-09-sql/proyek-5-capstone-pendaftaran/public/login.php).

---

## 3. Berkas DDL SQL Lengkap

Skema DDL dan data awal (*seeding*) tersimpan pada berkas:
- [`databases/skema.sql`](file:///c:/xampp/htdocs/portofolio-junior-web/hari-09-sql/proyek-5-capstone-pendaftaran/databases/skema.sql)
- [`database/skema.sql`](file:///c:/xampp/htdocs/portofolio-junior-web/hari-09-sql/proyek-5-capstone-pendaftaran/database/skema.sql)

Skema tersebut siap diimpor dari nol (*clean install*) dan menyertakan data awal:
1. Pilihan master kelas: *Pemrograman Web*, *Analisis Data*, *Desain UI/UX*, *Digital Marketing*.
2. Akun default admin: username `admin`, dengan password `admin123` yang tersimpan dalam format hash Bcrypt aman.
