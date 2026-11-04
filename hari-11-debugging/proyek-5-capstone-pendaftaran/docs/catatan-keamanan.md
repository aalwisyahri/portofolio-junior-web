# Catatan Pengujian Keamanan Sistem (Security Testing Report)

**Aplikasi**: Proyek 5 - Capstone Sistem Pendaftaran Pelatihan / Diklat  
**Unit Kompetensi**: J.620100.025.02 (Melakukan Debugging & Pengujian Sistem)  
**Lingkup Keamanan**: Proteksi terhadap 3 Celah Kerentanan Utama OWASP (XSS, SQL Injection, dan CSRF) serta Keamanan Autentikasi & Sesi.

---

## 🛡️ 1. Pengujian Keamanan XSS (Cross-Site Scripting)

### A. Deskripsi Kerentanan
XSS terjadi apabila aplikasi menerima masukan dari pengguna dan mencetaknya langsung ke dalam antarmuka HTML tanpa proses *sanitasi* atau *escaping*. Hal ini memungkinkan penyerang menyisipkan tag `<script>` yang dapat mencuri *session cookie*, mengalihkan halaman, atau merusak tampilan web.

### B. Prosedur dan Payload Pengujian
1. **Formulir yang Diuji**: Form Pendaftaran Peserta (`_form.php` / `tambah.php`) pada kolom **Nama Lengkap** dan **Alamat**.
2. **Payload yang Digunakan**:
   - `<script>alert('XSS Berbahaya')</script>`
   - `<img src="x" onerror="alert('XSS Terbuka')">`
   - `<a href="javascript:alert(1)">Klik Disini</a>`

### C. Mekanisme Proteksi Kode
Aplikasi menerapkan fungsi helper terpusat `e()` di `src/helpers.php`:
```php
function e(?string $teks): string
{
    return htmlspecialchars($teks ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
```
Setiap kali mencetak data pengguna di `public/admin.php`, `public/ubah.php`, dan `templates/bukti.php`, kode wajib menggunakan `<?= e($data['nama']) ?>`.

### D. Hasil Pengujian
* **Output pada HTML**: Masukan `<script>alert('XSS Berbahaya')</script>` diubah secara otomatis menjadi:
  ```html
  &lt;script&gt;alert('XSS Berbahaya')&lt;/script&gt;
  ```
* **Perilaku Browser**: Tidak ada *alert dialog* yang muncul. Teks script tampil sebagai karakter teks polos biasa di layar antarmuka pengguna.
* **Status**: **LOLOS (Aman dari Stored & Reflected XSS)**.

---

## 🛡️ 2. Pengujian Keamanan SQL Injection (SQLi)

### A. Deskripsi Kerentanan
SQL Injection terjadi apabila masukan pengguna disambungkan langsung (*string concatenation*) ke dalam kueri SQL. Akibatnya, peretas dapat memanipulasi logika kueri untuk membypass autentikasi, melihat seluruh isi database, hingga menghapus data.

### B. Prosedur dan Payload Pengujian
1. **Titik Uji**:
   - Kolom pencarian data pendaftar (`public/admin.php?kata=...`)
   - Formulir Login Admin (`public/login.php`) pada input **Username** dan **Kata Sandi**
   - Skrip pengujian terisolasi `proyek-5-capstone-pendaftaran/injeksi.php`
2. **Payload yang Digunakan**:
   - `' OR '1'='1`
   - `' OR '1'='1' -- `
   - `admin' #`
   - `' UNION SELECT null, username, password_hash, null, null FROM admin -- `

### C. Mekanisme Proteksi Kode
Seluruh akses database menggunakan PDO dengan fitur **Prepared Statements** dan parameter binding:
```php
// Pencarian data pendaftar (src/pendaftar.php)
$stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE nama LIKE :kata');
$stmt->execute(['kata' => '%' . $kata . '%']);

// Pencarian data admin (src/auth.php)
$stmt = $pdo->prepare('SELECT id, username, password_hash FROM admin WHERE username = :u');
$stmt->execute(['u' => $username]);
```

### D. Hasil Demonstrasi Pengujian (`injeksi.php`)
Pada berkas demonstrasi `injeksi.php`, dilakukan komparasi eksplisit:
1. **Versi Berbahaya (String Concatenation)**:
   - Query: `SELECT * FROM pendaftar WHERE email = 'x' OR '1'='1'`
   - Akibat: Mengembalikan seluruh data pendaftar tanpa filter (Bypass berhasil $\rightarrow$ Rentan).
2. **Versi Aman (Prepared Statements PDO)**:
   - Query: `SELECT * FROM pendaftar WHERE email = ?`
   - Akibat: Karakter `' OR '1'='1` dianggap sebagai satu string literal email yang utuh. Database mengembalikan `0 data` (Kueri aman $\rightarrow$ Kebal).
* **Status**: **LOLOS (Aman dari SQL Injection)**.

---

## 🛡️ 3. Pengujian Keamanan CSRF (Cross-Site Request Forgery)

### A. Deskripsi Kerentanan
CSRF terjadi ketika situs berbahaya memaksa browser pengguna yang sedang terautentikasi untuk mengirimkan permintaan HTTP berbahaya ke aplikasi target tanpa disadari oleh pengguna tersebut (misalnya menghapus data).

### B. Prosedur dan Payload Pengujian
1. **Endpoint yang Diuji**:
   - `public/hapus.php` (penghapusan data pendaftar)
   - `public/logout.php` (proses keluar dari sistem)
2. **Skenario Pengujian**:
   - Menjalankan aksi hapus melalui metode `GET` (langsung diblokir karena wajib `POST`).
   - Mengirimkan request `POST` langsung tanpa menyertakan field `csrf`.
   - Mengirimkan request `POST` dengan nilai token acak yang salah (`csrf=token_palsu_123`).

### C. Mekanisme Proteksi Kode
Aplikasi memanfaatkan mekanisme token anti-CSRF berbasis sesi kriptografis aman:
```php
// Pembuatan token unik (src/helpers.php)
function tokenCsrf(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// Verifikasi token (src/helpers.php)
function cekCsrf(): void {
    $token = $_POST['csrf'] ?? '';
    if (!hash_equals($_SESSION['csrf_token'] ?? '', $token)) {
        http_response_code(403);
        exit('Permintaan tidak sah (CSRF terdeteksi).');
    }
}
```

### D. Hasil Pengujian
* Pengiriman form tanpa token atau dengan token yang tidak cocok langsung menghentikan proses dengan kode status **HTTP 403 Forbidden** dan pesan *"Permintaan tidak sah (CSRF terdeteksi)."*.
* Data pendaftar di basis data tetap utuh dan tidak terhapus.
* **Status**: **LOLOS (Aman dari Serangan CSRF)**.

---

## 🔐 4. Pengujian Fitur Autentikasi dan Manajemen Sesi

Selain 3 pilar keamanan di atas, sistem telah mengimplementasikan praktik keamanan autentikasi modern:
1. **Penyimpanan Password**: Password admin dienkripsi menggunakan algoritma *Bcrypt* modern via `password_hash($sandi, PASSWORD_DEFAULT)`.
2. **Verifikasi Login**: Menggunakan `password_verify($sandi, $hash)` yang kebal terhadap *timing attack*.
3. **Pencegahan Session Fixation**: Pemanggilan `session_regenerate_id(true)` sesaat setelah kredensial berhasil diverifikasi.
4. **Pencegahan Brute-Force Sederhana**: Pembatasan counter `$_SESSION['gagal_login'] >= 5` yang mengunci sementara percobaan login.
5. **Pesan Kegagalan Netral**: Menampilkan pesan generik *"Username atau kata sandi salah"* untuk mencegah peretas mengetahui keberadaan username tertentu.
6. **Otorisasi Terpusat**: Fungsi `wajibLogin()` melindungi seluruh halaman backend admin.

---

## 📊 Ringkasan Status Keamanan

| Parameter Keamanan | Kriteria Penilaian | Hasil Pengujian | Status |
| :--- | :--- | :--- | :---: |
| **XSS** | Input `<script>` di-escape menjadi entitas teks HTML | Berhasil di-escape dengan `e()` | **AMAN** |
| **SQL Injection** | Input string pemutus SQL tidak merusak query | Dilindungi PDO Prepared Statements | **AMAN** |
| **CSRF** | Request form state-changing tanpa token ditolak | Ditolak HTTP 403 via `cekCsrf()` | **AMAN** |
| **Session Fixation** | ID sesi diganti setelah pengguna berhasil login | Diperbarui via `session_regenerate_id(true)` | **AMAN** |
| **Password Storage** | Password tidak disimpan dalam bentuk plain-text | Terenkripsi Bcrypt via `password_hash()` | **AMAN** |

