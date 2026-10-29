
<?php
$folder = __DIR__ . '/data';
$file = $folder . '/peserta.json';

if (!is_dir($folder)) {
    if (!mkdir($folder, 0777, true) && !is_dir($folder)) {
        die("Gagal membuat folder data.");
    }
}

// Data awal
$peserta = [
    ['nama' => 'Sari', 'kelas' => 'Web', 'nilai' => 90],
    ['nama' => 'Budi', 'kelas' => 'Web', 'nilai' => 68],
    ['nama' => 'Citra', 'kelas' => 'Data', 'nilai' => 82],
];

// Membuat file JSON awal jika belum ada
if (!file_exists($file)) {
    $jsonAwal = json_encode(
        $peserta,
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
    );

    if (file_put_contents($file, $jsonAwal, LOCK_EX) === false) {
        die("Gagal menyimpan JSON awal.");
    }
}

// Membaca file JSON
$isi = file_get_contents($file);

if ($isi === false) {
    die("Gagal membaca file JSON.");
}

$data = json_decode($isi, true);

// Memeriksa JSON rusak
if (json_last_error() !== JSON_ERROR_NONE) {
    die("JSON rusak: " . json_last_error_msg());
}

if (!is_array($data)) {
    die("Format JSON tidak sesuai.");
}

// Menambahkan satu peserta hanya saat tombol ditekan
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data[] = [
        'nama' => 'Dewi',
        'kelas' => 'Data',
        'nilai' => 88
    ];

    $jsonBaru = json_encode(
        $data,
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
    );

    if ($jsonBaru === false) {
        die("Gagal mengubah data menjadi JSON.");
    }

    if (file_put_contents($file, $jsonBaru, LOCK_EX) === false) {
        die("Gagal menyimpan ulang JSON.");
    }

    $data = json_decode($jsonBaru, true);

    $pesan = "Peserta Dewi berhasil ditambahkan.";
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Pengolahan JSON</title>
</head>
<body>
    <h2>Data Peserta dari JSON</h2>

    <?php if (isset($pesan)): ?>
        <p><?= htmlspecialchars($pesan) ?></p>
    <?php endif; ?>

    <form method="POST">
        <button type="submit">Tambah Peserta Dewi</button>
    </form>

    <table border="1" cellpadding="5">
        <tr>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Nilai</th>
        </tr>

        <?php foreach ($data as $p): ?>
            <tr>
                <td><?= htmlspecialchars($p['nama']) ?></td>
                <td><?= htmlspecialchars($p['kelas']) ?></td>
                <td><?= $p['nilai'] ?></td>
            </tr>
        <?php endforeach; ?>
    </table>

    <p><a href="cari.php">Kembali</a></p>
</body>
</html>
