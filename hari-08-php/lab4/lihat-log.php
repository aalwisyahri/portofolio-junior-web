
<?php
$file = __DIR__ . '/data/log.txt';

if (!is_file($file)) {
    echo "File log belum tersedia.";
    exit;
}

$baris = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

if ($baris === false) {
    echo "Gagal membaca file log.";
    exit;
}

// Membalik urutan, lalu mengambil 20 baris terakhir
$logTerakhir = array_slice(array_reverse($baris), 0, 20);
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Log Pengunjung</title>
</head>
<body>
    <h2>20 Log Pengunjung Terakhir</h2>

    <?php if (empty($logTerakhir)): ?>
        <p>Belum ada log pengunjung.</p>
    <?php else: ?>
        <table border="1" cellpadding="5">
            <tr>
                <th>No.</th>
                <th>Waktu | IP | Kata Kunci</th>
            </tr>

            <?php foreach ($logTerakhir as $i => $barisLog): ?>
                <tr>
                    <td><?= $i + 1 ?></td>
                    <td><?= htmlspecialchars($barisLog) ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    <?php endif; ?>

    <p><a href="cari.php">Kembali ke Pencarian</a></p>
</body>
</html>
