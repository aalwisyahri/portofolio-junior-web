/**
 * Bug Hunt Hari 4 - JavaScript Dasar dan Pemrograman Terstruktur
 * Mengklasifikasikan 8 jenis kesalahan (syntax, runtime, logic) dan memperbaikinya.
 */

console.log("=== HASIL PERBAIKAN BUG HUNT HARI 4 ===\n");

// --------------------------------------------------------------------------
// Kasus 1: Kesalahan Operator Penugasan (=) pada Kondisi
// Kode bermasalah: if (nilai = 70)
// Jenis: Logic Error (karena = adalah operator assignment, bukan comparison,
//        sehingga kondisi selalu bernilai truthy 70 dan mengubah nilai variabel).
// Perbaikan: Gunakan operator perbandingan ketat (===).
// --------------------------------------------------------------------------
let nilaiUji = 80;
// Salah: if (nilaiUji = 70)
if (nilaiUji === 70) {
  console.log("Kasus 1: Nilai sama dengan 70");
} else {
  console.log(`Kasus 1: [FIXED] Nilai adalah ${nilaiUji} (bukan 70, perbandingan === bekerja benar)`);
}

// --------------------------------------------------------------------------
// Kasus 2: Perulangan Tak Berhingga (Infinite Loop)
// Kode bermasalah: for (let i = 1; i <= 10; i--)
// Jenis: Logic Error (decrement i-- membuat nilai i semakin kecil, sehingga i <= 10 selalu true).
// Perbaikan: Gunakan increment i++.
// --------------------------------------------------------------------------
let counterLoop = 0;
// Salah: for (let i = 1; i <= 10; i--)
for (let i = 1; i <= 10; i++) {
  counterLoop++;
}
console.log(`Kasus 2: [FIXED] Perulangan berhenti pada iterasi ke-${counterLoop} dengan i++`);

// --------------------------------------------------------------------------
// Kasus 3: Kesalahan Batas Indeks Array (Off-by-One)
// Kode bermasalah: for (let i = 0; i <= daftar.length; i++)
// Jenis: Logic Error (indeks array dimulai dari 0 sampai length - 1. Menggunakan <=
//        menyebabkan akses elemen daftar[daftar.length] yang bernilai undefined).
// Perbaikan: Gunakan operator lebih kecil (i < daftar.length).
// --------------------------------------------------------------------------
const daftarNama = ['Andi', 'Budi', 'Citra'];
let daftarHasil = [];
// Salah: for (let i = 0; i <= daftarNama.length; i++)
for (let i = 0; i < daftarNama.length; i++) {
  daftarHasil.push(daftarNama[i]);
}
console.log(`Kasus 3: [FIXED] Elemen array valid: [${daftarHasil.join(', ')}] (panjang: ${daftarNama.length})`);

// --------------------------------------------------------------------------
// Kasus 4: Konkatenasi String karena Input prompt()
// Kode bermasalah: const a = prompt('A'); const b = prompt('B'); console.log(a + b);
// Jenis: Logic Error (hasil prompt() bertipe string sehingga operator + menggabungkan string '5' + '3' = '53').
// Perbaikan: Konversi input string ke number dengan Number(a) + Number(b).
// --------------------------------------------------------------------------
const inputA = '5'; // simulasi input prompt
const inputB = '3';
// Salah: const hasilJumlah = inputA + inputB; // menghasilkan '53'
const hasilJumlah = Number(inputA) + Number(inputB); // menghasilkan 8
console.log(`Kasus 4: [FIXED] Penjumlahan Number('${inputA}') + Number('${inputB}') = ${hasilJumlah}`);

// --------------------------------------------------------------------------
// Kasus 5: Sintaks Percabangan Tidak Valid
// Kode bermasalah: elseif (x > 5)
// Jenis: Syntax Error (di JavaScript tidak ada kata kunci 'elseif', yang benar adalah 'else if' terpisah).
// Perbaikan: Pisahkan menjadi else if (x > 5).
// --------------------------------------------------------------------------
const nilaiX = 10;
if (nilaiX > 15) {
  console.log("X > 15");
// Salah: elseif (nilaiX > 5)
} else if (nilaiX > 5) {
  console.log(`Kasus 5: [FIXED] Sintaks else if benar, X = ${nilaiX} > 5`);
}

// --------------------------------------------------------------------------
// Kasus 6: Penugasan Ulang pada Variabel Konstanta (const)
// Kode bermasalah: const total = 0; total += 5;
// Jenis: Runtime Error (TypeError: Assignment to constant variable).
// Perbaikan: Gunakan kata kunci let untuk variabel yang nilainya akan diubah.
// --------------------------------------------------------------------------
// Salah: const totalBiaya = 0;
let totalBiaya = 0;
totalBiaya += 5;
console.log(`Kasus 6: [FIXED] Variabel dideklarasikan dengan 'let', totalBiaya = ${totalBiaya}`);

// --------------------------------------------------------------------------
// Kasus 7: Penggunaan Variabel Sebelum Dideklarasikan
// Kode bermasalah: console.log(jumlahPeserta) sebelum dideklarasikan
// Jenis: Runtime Error (ReferenceError: Cannot access 'jumlahPeserta' before initialization).
// Perbaikan: Deklarasikan variabel sebelum dipanggil/digunakan.
// --------------------------------------------------------------------------
// Salah: console.log(jumlahPeserta); let jumlahPeserta = 30;
let jumlahPeserta = 30;
console.log(`Kasus 7: [FIXED] Variabel dideklarasikan terlebih dahulu: jumlahPeserta = ${jumlahPeserta}`);

// --------------------------------------------------------------------------
// Kasus 8: Tanda Kutip String Tidak Berpasangan
// Kode bermasalah: console.log('Halo);
// Jenis: Syntax Error (Unterminated string literal).
// Perbaikan: Tutup string dengan tanda kutip yang sesuai console.log('Halo');
// --------------------------------------------------------------------------
// Salah: console.log('Halo);
console.log("Kasus 8: [FIXED] String ditutup dengan benar: 'Halo'");

console.log("\nSemua 8 bug berhasil diperbaiki dan berjalan sempurna!");

