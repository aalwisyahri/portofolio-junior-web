
<?php
$folder = __DIR__ . '/data';
$file = $folder . '/peserta.csv';

if (!is_dir($folder)) {
    if (!mkdir($folder, 0777, true) && !is_dir($folder)) {
        die("Gagal membuat folder data.");
    }
}

$peserta = [
    ['nama' => 'Sari', 'kelas' => 'Web', 'nilai' => 90],
    ['nama' => 'Budi', 'kelas' => 'Web', 'nilai' => 68],
    ['nama' => 'Citra', 'kelas' => 'Data', 'nilai' => 82],
];

$pesan = '';

// Ekspor CSV saat tombol ditekan
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $handle = fopen($file, 'w');

    if ($handle === false) {
        die("Gagal membuka file CSV untuk ditulis.");
    }

    if (fputcsv($handle, ['nama', 'kelas', 'nilai']) === false) {
        fclose($handle);
        die("Gagal menulis header CSV.");
    }

    foreach ($peserta as $p) {
        if (fputcsv($handle, array_values($p)) === false) {
            fclose($handle);
            die("Gagal menulis data CSV.");
        }
    }

    fclose($handle);
    $pesan = "Ekspor CSV berhasil.";
}

// Impor CSV
$dataCSV = [];

if (is_file($file)) {
    $handle = fopen($file, 'r');

    if ($handle === false) {
        die("Gagal membuka file CSV untuk dibaca.");
    }

    // Melewati baris header
    fgetcsv($handle);

    while (($baris = fgetcsv($handle)) !== false) {
        if (count($baris) >= 3) {
            $dataCSV[] = [
                'nama' => $baris[0],
                'kelas' => $baris[1],
                'nilai' => $baris[2]
            ];
        }
    }

    fclose($handle);
} else {
    $pesan = "File CSV belum tersedia. Tekan tombol ekspor terlebih dahulu.";
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Ekspor dan Impor CSV</title>
</head>
<body>
    <h2>Ekspor dan Impor Data Peserta</h2>

    <?php if ($pesan !== ''): ?>
        <p><?= htmlspecialchars($pesan) ?></p>
    <?php endif; ?>

    <form method="POST">
        <button type="submit">Ekspor Peserta ke CSV</button>
    </form>

    <h3>Hasil Impor CSV</h3>

    <?php if (empty($dataCSV)): ?>
        <p>Belum ada data CSV untuk ditampilkan.</p>
    <?php else: ?>
        <table border="1" cellpadding="5">
            <tr>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Nilai</th>
            </tr>

            <?php foreach ($dataCSV as $p): ?>
                <tr>
                    <td><?= htmlspecialchars($p['nama']) ?></td>
                    <td><?= htmlspecialchars($p['kelas']) ?></td>
                    <td><?= htmlspecialchars($p['nilai']) ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    <?php endif; ?>

    <p><a href="cari.php">Kembali</a></p>
</body>
</html>
