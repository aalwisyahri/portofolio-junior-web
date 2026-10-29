
<?php
$peserta = [
    ['nama' => 'Sari', 'kelas' => 'Web', 'nilai' => 90],
    ['nama' => 'Budi', 'kelas' => 'Web', 'nilai' => 68],
    ['nama' => 'Citra', 'kelas' => 'Data', 'nilai' => 82],
];

$folder = __DIR__ . '/data';

// Membuat folder data jika belum ada
if (!is_dir($folder)) {
    mkdir($folder, 0777, true);
}

// Mengambil kata kunci dari GET
$q = trim($_GET['q'] ?? '');

// Mencatat waktu, IP, dan kata kunci
$waktu = date('Y-m-d H:i:s');
$ip = $_SERVER['REMOTE_ADDR'] ?? 'Tidak diketahui';
$log = "$waktu | $ip | $q" . PHP_EOL;

$hasilLog = file_put_contents(
    $folder . '/log.txt',
    $log,
    FILE_APPEND | LOCK_EX
);

if ($hasilLog === false) {
    echo "Gagal menyimpan log pengunjung.<br>";
}

// Menyaring peserta berdasarkan sebagian nama
$hasil = [];

if ($q !== '') {
    foreach ($peserta as $p) {
        if (stripos($p['nama'], $q) !== false) {
            $hasil[] = $p;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Pencarian Peserta</title>
</head>
<body>
    <h2>Pencarian Peserta</h2>

    <form method="GET" action="cari.php">
        <label>Nama peserta:</label>
        <input type="text" name="q"
               value="<?= htmlspecialchars($q) ?>">
        <button type="submit">Cari</button>
    </form>

    <?php if ($q === ''): ?>
        <p>Masukkan kata kunci untuk mencari peserta.</p>
    <?php elseif (count($hasil) > 0): ?>
        <table border="1" cellpadding="5">
            <tr>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Nilai</th>
            </tr>

            <?php foreach ($hasil as $p): ?>
                <tr>
                    <td><?= htmlspecialchars($p['nama']) ?></td>
                    <td><?= htmlspecialchars($p['kelas']) ?></td>
                    <td><?= $p['nilai'] ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    <?php else: ?>
        <p>Peserta dengan nama
            "<?= htmlspecialchars($q) ?>" tidak ditemukan.</p>
    <?php endif; ?>

    <p><a href="lihat-log.php">Lihat Log Pengunjung</a></p>
    <p><a href="json.php">Pengolahan JSON</a></p>
    <p><a href="csv.php">Ekspor dan Impor CSV</a></p>
</body>
</html>
