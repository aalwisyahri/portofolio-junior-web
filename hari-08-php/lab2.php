<?php
declare(strict_types=1);
// buat fungsi bertipe berikut dan uji hasilnya padahtml

$peserta = [
['nama' => 'Sari', 'kelas' => 'Web', 'nilai' => 90],
['nama' => 'Budi', 'kelas' => 'Web', 'nilai' => 68],
['nama' => 'Citra', 'kelas' => 'Data', 'nilai' => 82],
];

// hitungRataRata(array $daftar): float dan cariTertinggi(array $daftar): ?array
function hitungRataRata(array $daftar): float {
    $total = array_sum(array_column($daftar, 'nilai'));
    return $total / count($daftar);
}

function cariTertinggi(array $daftar): ?array {
    $maxNilai = max(array_column($daftar, 'nilai'));
    $result = array_filter($daftar, function ($item) use ($maxNilai) {
        return $item['nilai'] === $maxNilai;
    });
    return !empty($result) ? array_values($result)[0] : null;
}

echo '<h3>Hasil Fungsi</h3>';
$rataRata = hitungRataRata($peserta);
echo '<p>Rata-rata nilai: ' . $rataRata . '</p>';
$tertinggi = cariTertinggi($peserta);
if ($tertinggi) {
    echo '<p>Peserta dengan nilai tertinggi: ' . $tertinggi['nama'] . ' (Nilai: ' . $tertinggi['nilai'] . ')</p>';
} else {
    echo '<p>Tidak ada peserta.</p>';
}

// filterLulus(array $peserta, int $batas = 70): array dengan array_filter
function filterNilaiLulus(array $daftar): array {
    $result = array_filter($daftar, function ($item) {
        return $item['nilai'] >= 70;
    });
    return array_values($result); // mereset indeks array setelah filter
}

$hasilFilter = filterNilaiLulus($peserta);

foreach ($hasilFilter as $item) {
    echo '<p>Peserta lulus: ' . $item['nama'] . ' (Nilai: ' . $item['nilai'] . ')</p>';
}

// urutkanNilai (array $peserta): array dengan usort (kembalikan salinan)
function urutkanNilai(array $daftar): array {
    $salinan = $daftar; // buat salinan untuk menghindari perubahan pada array asli
    usort($salinan, function ($a, $b) {
        return $b['nilai'] <=> $a['nilai']; // urutkan secara descending
    });
    return $salinan;
}
$pesertaTerurut = urutkanNilai($peserta);
echo '<h3>Peserta Terurut Berdasarkan Nilai</h3>';
foreach ($pesertaTerurut as $item) {
    echo '<p>' . $item['nama'] . ' (Nilai: ' . $item['nilai'] . ')</p>';
}

// kelompokkanPerKelas(array $peserta): array yang menghasilkan ['Web' => [...],'Data' => [...]].
function kelompokkanPerKelas(array $daftar): array {
    $result = [];
    foreach ($daftar as $item) {
        $kelas = $item['kelas'];
        $result[$kelas][] = $item;
    }
    return $result;
}

$dataPerKelas = kelompokkanPerKelas($peserta);
foreach ($dataPerKelas as $kelas => $pesertaKelas) {
    echo '<h3>Peserta Kelas ' . $kelas . '</h3>';
    echo '<ul>';
    foreach ($pesertaKelas as $item) {
        echo '<li>' . $item['nama'] . ' (Nilai: ' . $item['nilai'] . ')</li>';
    }
    echo '</ul>';
    echo '<hr>';
}

// tentukanGrade(int $nilai): string dengan match
function tentukanGrade(int $nilai): string {
    return match (true) {
        $nilai >= 85 => 'A',
        $nilai >= 75 => 'B',
        $nilai >= 65 => 'C',
        $nilai >= 50 => 'D',
        default      => 'E',
    };
}

// Tampilkan hasil dalam tabel HTML berisi nomor, nama, kelas, nilai, dan grade. Semua output di-escape dengan htmlspecialchars
?>
<h3>Daftar Nilai Peserta</h3>
<table border="1" cellpadding="8" cellspacing="0">
    <thead>
        <tr>
            <th>Nomor</th>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Nilai</th>
            <th>Grade</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($peserta as $index => $item): ?>
            <tr>
                <td><?= htmlspecialchars((string) ($index + 1), ENT_QUOTES, 'UTF-8') ?></td>
                <td><?= htmlspecialchars($item['nama'], ENT_QUOTES, 'UTF-8') ?></td>
                <td><?= htmlspecialchars($item['kelas'], ENT_QUOTES, 'UTF-8') ?></td>
                <td><?= htmlspecialchars((string) $item['nilai'], ENT_QUOTES, 'UTF-8') ?></td>
                <td><?= htmlspecialchars(tentukanGrade($item['nilai']), ENT_QUOTES, 'UTF-8') ?></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>


<?php
foreach ($dataPerKelas as $kelas => $pesertaKelas) {
    echo '<h3>Peserta Kelas ' . $kelas . '</h3>';
    echo "<table border='1' cellpadding='8' cellspacing='0'>";
    echo '<tr><th>Nama</th><th>Nilai</th></tr>';
    foreach ($pesertaKelas as $item) {
        echo "<tr><td>" . htmlspecialchars($item['nama'], ENT_QUOTES, 'UTF-8') . "</td><td>" . htmlspecialchars((string) $item['nilai'], ENT_QUOTES, 'UTF-8') . "</td></tr>";
    }
    echo '</table>';
    echo '<hr>';
}