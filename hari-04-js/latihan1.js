// Deklarasi variabel
let nama = 'Alwi';
let umur = 17;
let tinggi_badan = 1.69;
let status_aktif = true;

console.log(`Halo ${nama}! umur ${umur} tinggi badan ${tinggi_badan} m status aktif: ${status_aktif}`);

// Cek Tipe Data
console.log(typeof ('5' + 3));
console.log(typeof ('5' * 3));
console.log(typeof (0.1 + 0.2));
console.log(typeof (Number('abc')));
console.log(typeof (10 / 3));
console.log(typeof (10 % 3));
console.log(typeof (2 ** 10));

// Cari luas dan keliling lingkaran
let jari = 10;
let luasLingkaran = Math.PI * jari ** 2;
let kelLingkaran = 2 * Math.PI * jari;

console.log(`Luas lingkaran = ${luasLingkaran}`);
console.log(`Keliling lingkaran = ${kelLingkaran}`);

// Jumlah detik 1 hari
let detik = 1;
let menit = detik * 60;
let jam = menit * 60;
let hari = jam * 24;
console.log(`1 hari = ${hari} detik`)

// Konversi suhu
let suhuC = 100;
let suhuF = (suhuC * 9/5) + 32;
console.log(`${suhuC} celcius = ${suhuF} Fahrenheit`)

// Program A: konversi nilai ke huruf
const nilai = Number(prompt('Nilai (0-100):'));
let grade;
if (nilai >= 85) grade = 'A';
else if (nilai >= 70) grade = 'B';
else if (nilai >= 55) grade = 'C';
else grade = 'D';
console.log(`Grade: ${grade}`);

// Program B: tahun kabisat
const tahun = Number(prompt('Tahun:'));
const kabisat = (tahun % 4 === 0 && tahun % 100 !== 0) || tahun % 400 === 0;
console.log(kabisat ? 'Kabisat' : 'Bukan kabisat');
