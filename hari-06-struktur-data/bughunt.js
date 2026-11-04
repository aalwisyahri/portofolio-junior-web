// bughunt.js - Demonstrasi Penyelesaian 6 Bug Hunt Hari 6
// Modul: Struktur Data I (Array, Objek, Stack, Queue)

import { Stack, Queue } from './structures.js';

console.log('==================================================');
console.log('      BUG HUNT HARI 6: DEMONSTRASI PERBAIKAN      ');
console.log('==================================================\n');

// --------------------------------------------------------------------------
// 1. dequeue() pada queue kosong hasilnya dipakai sebagai angka
// --------------------------------------------------------------------------
console.log('--- Bug 1: Dequeue pada Queue Kosong ---');
const q1 = new Queue();
// Kode bermasalah: const total = q1.dequeue() + 10; -> menghasilkan NaN
// Perbaikan: Selalu periksa isEmpty() sebelum memproses nilai kembalian
if (!q1.isEmpty()) {
  const hasil = q1.dequeue();
  console.log('Nilai berhasil diambil:', hasil);
} else {
  console.log('Penanganan: Antrean kosong, mencegah eksekusi NaN / undefined.');
}

// --------------------------------------------------------------------------
// 2. pop() stack kosong tanpa pemeriksaan
// --------------------------------------------------------------------------
console.log('\n--- Bug 2: Pop pada Stack Kosong ---');
const s1 = new Stack();
// Kode bermasalah: const data = s1.pop(); data.toLowerCase(); -> TypeError
// Perbaikan: Periksa isEmpty() sebelum melakukan operasi lanjut
if (!s1.isEmpty()) {
  const item = s1.pop();
  console.log('Item stack:', item);
} else {
  console.log('Penanganan: Stack kosong, mengembalikan nilai aman tanpa error.');
}

// --------------------------------------------------------------------------
// 3. peek() memakai items[items.length] (selalu undefined)
// --------------------------------------------------------------------------
console.log('\n--- Bug 3: Indeks Elemen Teratas Stack (peek) ---');
const s2 = new Stack();
s2.push('Dokumen 1');
s2.push('Dokumen 2');
// Kode bermasalah: items[items.length] selalu undefined karena array 0-indexed
// Perbaikan: Gunakan items[items.length - 1]
console.log('Elemen teratas (peek benar):', s2.peek()); // 'Dokumen 2'

// --------------------------------------------------------------------------
// 4. size() pada Queue menghitung tail + head
// --------------------------------------------------------------------------
console.log('\n--- Bug 4: Penghitungan Ukuran Queue (size) ---');
const q2 = new Queue();
q2.enqueue('A001');
q2.enqueue('A002');
q2.dequeue(); // head = 1, tail = 2
// Kode bermasalah: tail + head = 3 (salah)
// Perbaikan: tail - head = 2 - 1 = 1 (benar)
console.log('Jumlah elemen riil antrean (tail - head):', q2.size()); // 1

// --------------------------------------------------------------------------
// 5. const salinan = daftar; salinan.sort() mengubah array asli
// --------------------------------------------------------------------------
console.log('\n--- Bug 5: Salinan Array Sebelum Pengurutan (sort) ---');
const nilaiAsli = [85, 60, 92, 70];
// Kode bermasalah: const salinan = nilaiAsli; salinan.sort(); -> nilaiAsli ikut berubah
// Perbaikan: Gunakan spread operator [...nilaiAsli] agar membuat array baru
const salinanTerurut = [...nilaiAsli].sort((a, b) => a - b);
console.log('Array Asli (tetap tidak berubah):', nilaiAsli); // [85, 60, 92, 70]
console.log('Salinan Terurut (array baru)    :', salinanTerurut); // [60, 70, 85, 92]

// --------------------------------------------------------------------------
// 6. Mencari ID dengan find di dalam loop 100.000 kali (O(n^2))
// --------------------------------------------------------------------------
console.log('\n--- Bug 6: Optimasi Pencarian ID (O(n^2) -> O(1)) ---');
const daftarPeserta = [
  { id: 101, nama: 'Sari' },
  { id: 102, nama: 'Budi' },
  { id: 103, nama: 'Citra' }
];
// Kode bermasalah: for(...) { daftarPeserta.find(p => p.id === targetId); } -> O(n) tiap iterasi
// Perbaikan: Petakan ke Map berindeks ID satu kali (O(n)), lalu lookup instan O(1)
const mapPeserta = new Map(daftarPeserta.map(p => [p.id, p]));
console.log('Pencarian instan ID 102 dengan Map O(1):', mapPeserta.get(102).nama); // 'Budi'

console.log('\n==================================================');
console.log('  SELURUH 6 BUG TELAH BERHASIL DITANGANI DENGAN BAIK ');
console.log('==================================================');

