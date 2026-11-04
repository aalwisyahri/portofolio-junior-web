<?php
declare(strict_types=1);

// bughunt.php - Demonstrasi Penyelesaian 8 Bug Hunt Hari 8 (PHP)
// Modul: PHP Terstruktur: Sintaks, Form, Validasi, dan Akses File

echo "==================================================\n";
echo "      BUG HUNT HARI 8: DEMONSTRASI PERBAIKAN      \n";
echo "==================================================\n\n";

// --------------------------------------------------------------------------
// 1. echo 'Halo' tanpa titik koma
// --------------------------------------------------------------------------
echo "--- Bug 1: Titik Koma pada Akhir Pernyataan ---\n";
// Kode bermasalah: echo 'Halo' (memicu Parse error)
// Perbaikan: Tambahkan tanda titik koma (;)
echo "Halo!\n";
echo "Penanganan: Menambahkan titik koma (;) pada akhir baris perintah.\n\n";

// --------------------------------------------------------------------------
// 2. $nama = $_POST['nama']; saat halaman pertama dibuka
// --------------------------------------------------------------------------
echo "--- Bug 2: Akses Array Key \$_POST Tanpa Nilai Default ---\n";
// Kode bermasalah: $nama = $_POST['nama']; (Warning: Undefined array key)
// Perbaikan: Gunakan operator null coalescing (?? '')
$_POST_SIMULASI = [];
$nama = $_POST_SIMULASI['nama'] ?? '';
echo "Nilai \$nama aman: '" . $nama . "'\n";
echo "Penanganan: Menggunakan \$_POST['nama'] ?? '' agar tidak memicu Warning.\n\n";

// --------------------------------------------------------------------------
// 3. if ($a = 5) di dalam percabangan
// --------------------------------------------------------------------------
echo "--- Bug 3: Operator Assignment (=) dalam Percabangan ---\n";
$a = 10;
// Kode bermasalah: if ($a = 5) { ... } -> menugaskan 5 ke $a dan selalu bernilai true
// Perbaikan: Gunakan operator perbandingan identik ===
if ($a === 5) {
    echo "Nilai \$a adalah 5\n";
} else {
    echo "Nilai \$a BUKAN 5 (nilai sebenarnya: $a)\n";
}
echo "Penanganan: Mengganti operator assignment (=) dengan operator identik (===).\n\n";

// --------------------------------------------------------------------------
// 4. echo 'Nama: ' + $nama; (Penggabungan string keliru)
// --------------------------------------------------------------------------
echo "--- Bug 4: Penggabungan String Menggunakan Tanda Plus (+) ---\n";
$namaPeserta = 'Budi';
// Kode bermasalah: echo 'Nama: ' + $namaPeserta; (Menghasilkan 0 atau TypeError)
// Perbaikan: Gunakan operator titik (.) untuk konkatenasi string
echo 'Nama: ' . $namaPeserta . "\n";
echo "Penanganan: Menggunakan tanda titik (.) untuk penggabungan string di PHP.\n\n";

// --------------------------------------------------------------------------
// 5. echo $_POST['pesan']; (Celah XSS)
// --------------------------------------------------------------------------
echo "--- Bug 5: Pencetakan Input Pengguna Langsung Tanpa Escape (XSS) ---\n";
$pesanPengguna = "<script>alert('hack');</script>";
// Kode bermasalah: echo $pesanPengguna; (Memicu eksekusi skrip di browser)
// Perbaikan: Gunakan htmlspecialchars()
$pesanAman = htmlspecialchars($pesanPengguna, ENT_QUOTES, 'UTF-8');
echo "Teks asli: " . $pesanPengguna . "\n";
echo "Teks aman ter-escape: " . $pesanAman . "\n";
echo "Penanganan: Menggunakan htmlspecialchars(\$teks, ENT_QUOTES, 'UTF-8').\n\n";

// --------------------------------------------------------------------------
// 6. file_put_contents('data/log.txt', ...) saat folder data belum ada
// --------------------------------------------------------------------------
echo "--- Bug 6: Menulis Berkas pada Folder yang Belum Ada ---\n";
$folderData = __DIR__ . '/data_demo';
$fileLog = $folderData . '/log.txt';
// Kode bermasalah: langsung file_put_contents tanpa cek folder (Warning: failed to open stream)
// Perbaikan: Pastikan folder dibuat terlebih dahulu jika belum ada
if (!is_dir($folderData)) {
    mkdir($folderData, 0755, true);
}
file_put_contents($fileLog, "Log tersimpan pada " . date('Y-m-d H:i:s') . PHP_EOL, LOCK_EX);
echo "Status: Berhasil menulis berkas log di folder data.\n";
echo "Penanganan: Memeriksa folder dengan is_dir() dan membuatnya via mkdir().\n\n";
// Bersihkan demo
if (file_exists($fileLog)) unlink($fileLog);
if (is_dir($folderData)) rmdir($folderData);

// --------------------------------------------------------------------------
// 7. json_decode tanpa argumen true lalu mengakses $d['nama']
// --------------------------------------------------------------------------
echo "--- Bug 7: Pengambilan Nilai json_decode Sebagai Array ---\n";
$jsonString = '{"nama":"Citra","nilai":85}';
// Kode bermasalah: $d = json_decode($jsonString); echo $d['nama']; (Error: Cannot use object as array)
// Perbaikan: Tambahkan parameter true agar menghasilkan array asosiatif
$d = json_decode($jsonString, true);
echo "Nama dari array asosiatif: " . $d['nama'] . "\n";
echo "Penanganan: Menambahkan argumen true pada json_decode(\$json, true).\n\n";

// --------------------------------------------------------------------------
// 8. header('Location: ...') setelah ada output
// --------------------------------------------------------------------------
echo "--- Bug 8: Pemanggilan header() Setelah Ada Output ---\n";
// Kode bermasalah: echo "Memproses..."; header('Location: index.php'); (Warning: headers already sent)
// Perbaikan: Pastikan logika redirect dan pemanggilan header() dijalankan SEBELUM mencetak HTML, lalu sertakan exit;
echo "Prinsip: header('Location: index.php'); wajib dipanggil sebelum ada teks/HTML apa pun, lalu diakhiri exit;\n";
echo "Penanganan: Pindahkan header() ke baris awal sebelum ada output apa pun.\n\n";

echo "==================================================\n";
echo "  SELURUH 8 BUG TELAH BERHASIL DITANGANI DENGAN BAIK \n";
echo "==================================================\n";
