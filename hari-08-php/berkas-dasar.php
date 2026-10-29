<?php
declare(strict_types=1);

// cetak nama umur status memakai variabel
$nama = 'Sari';
$umur = 25;
$status = 'mahasiswa';
echo 'Halo, ' . $nama . '! <br>';
echo 'Umur: ' . $umur . ' tahun <br>';
echo 'Status: ' . $status . ' <br>';

// tampilkan var_dump tiap variabel
var_dump($nama);
var_dump($umur);
var_dump($status);

// Buat tabel perkalian 1 sampai 10 dalam <table> dengan for bersarang.
echo '<table border="1">';
for ($i = 1; $i <= 10; $i++) {
    echo '<tr>';
    for ($j = 1; $j <= 10; $j++) {
        echo '<td>' . ($i * $j) . '</td>';
    }
    echo '</tr>';
}
echo '</table>';

// Kerjakan: bilangan ganjil/genap 1-20, FizzBuzz 1-30, dan konversi nilai ke grade dengan match.
echo '<h3>Bilangan Ganjil/Genap 1-20</h3>';
echo '<p>Ganjil: ';
for ($k = 1; $k <= 20; $k++) {
    if ($k % 2 !== 0) {
        echo $k . ' ';
    }
}
echo '</p>';
echo '<p>Genap: ';
for ($k = 1; $k <= 20; $k++) {
    if ($k % 2 === 0) {
        echo $k . ' ';
    }
}
echo '</p>';

// FizzBuzz 1-30
echo '<h3>FizzBuzz 1-30</h3>';
for ($l = 1; $l <= 30; $l++) {
    if ($l % 15 === 0) {
        echo 'FizzBuzz <br>';
    } elseif ($l % 3 === 0) {
        echo 'Fizz <br>';
    } elseif ($l % 5 === 0) {
        echo 'Buzz <br>';
    } else {
        echo $l . ' <br>';
    }
}

// Konversi nilai ke grade dengan match dengan tabel
// tampilkan dalam tabel rentang nilai 0-100, dengan grade A, B, C, D, E


$nilai = 82;

$grade = match (true) {
    $nilai >= 85 => 'A',
    $nilai >= 75 => 'B',
    $nilai >= 65 => 'C',
    $nilai >= 50 => 'D',
    default      => 'E',
};

echo "Nilai Anda: $nilai<br>";
echo "Grade: $grade <br>";

// Output:
// Nilai Anda: 82
// Grade: B

// Jalankan program kalender sederhana: tampilkan hari ini dengan nama hari berbahasa Indonesia
// memakai array ['Minggu', 'Senin', ...] dan date('w')
date_default_timezone_set('Asia/Jakarta');
$namaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
$hariIni = date('w');
echo "Hari ini adalah: " . $namaHari[$hariIni] . " Jam: " . date('H:i:s') . "<br>";


?>
<!-- date lokasi asia jakarta -->

<p>Waktu saat ini: <?php echo date('Y-m-d H:i:s'); ?></p>