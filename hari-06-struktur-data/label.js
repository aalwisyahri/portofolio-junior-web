const peserta = [
{ id: 1, nama: 'Sari', kelas: 'Web', nilai: 90, aktif: true },
{ id: 2, nama: 'Budi', kelas: 'Web', nilai: 68, aktif: true },
{ id: 3, nama: 'Citra', kelas: 'Data', nilai: 82, aktif: false },
{ id: 4, nama: 'Dewi', kelas: 'Data', nilai: 75, aktif: true },
{ id: 5, nama: 'Eko', kelas: 'Web', nilai: 88, aktif: true },
{ id: 6, nama: 'Fajar', kelas: 'Data', nilai: 55, aktif: false },
{ id: 7, nama: 'Gita', kelas: 'Web', nilai: 92, aktif: true },
{ id: 8, nama: 'Hadi', kelas: 'Data', nilai: 60, aktif: true },
{ id: 9, nama: 'Intan', kelas: 'Web', nilai: 70, aktif: false },
{ id: 10, nama: 'Joko', kelas: 'Data', nilai: 85, aktif: true }
];

// 1. Tampilkan peserta aktif saja (filter).
const pesertaAktif = peserta.filter(p => p.aktif);
console.log('Peserta Aktif:', pesertaAktif);

// 2. Urutkan berdasarkan nama (sort dengan localeCompare) tanpa mengubah array asli.
const pesertaUrut = [...peserta].sort((a, b) => a.nama.localeCompare(b.nama));
console.log('Peserta Urut:', pesertaUrut);

// 3. Cari peserta berdasarkan id (find) dan tangani bila tidak ditemukan.
const cariId = 2;
const pesertaDitemukan = peserta.find(p => p.id === cariId);
if (pesertaDitemukan) {
  console.log(`Peserta dengan ID ${cariId}:`, pesertaDitemukan);
} else {
  console.log(`Peserta dengan ID ${cariId} tidak ditemukan.`);
}

// 4. Hitung jumlah peserta per kelas dengan objek penghitung.
const jumlahPerKelas = peserta.reduce((acc, p) => {
    if (acc[p.kelas]) {
        acc[p.kelas]++;
    } else {
        acc[p.kelas] = 1;
    }
    return acc;
}, {});
console.log('Jumlah Peserta per Kelas:', jumlahPerKelas);

// 5. Tambah, ubah, dan hapus peserta (push, perubahan properti, filter atau splice) lalu cetak
// hasilnya.
// Tambah peserta baru
const pesertaBaru = { id: 11, nama: 'Kiki', kelas: 'Web', nilai: 78, aktif: true };
peserta.push(pesertaBaru);
console.log('Setelah Menambah Peserta:', peserta);

// LAB 2
// 1. Hitung frekuensi kata dari kalimat 'saya belajar web saya suka web' memakai Map, lalu
// tampilkan terurut dari yang paling sering.
const kalimat = 'saya belajar web saya suka web';
const kataArray = kalimat.split(' ');
const frekuensiKata = new Map();

kataArray.forEach(kata => {
    frekuensiKata.set(kata, (frekuensiKata.get(kata) || 0) + 1);
});

// Urutkan berdasarkan frekuensi
const frekuensiTerurut = [...frekuensiKata.entries()].sort((a, b) => b[1] - a[1]);
console.log('Frekuensi Kata:', frekuensiTerurut);

// 2. Hilangkan duplikat dari daftar email memakai Set, tampilkan sebelum dan sesudah.
const emails = ['user1@example.com', 'user2@example.com', 'user1@example.com', 'user3@example.com'];
console.log('Email Sebelum Dihapus Duplikat:', emails);
const emailsUnik = [...new Set(emails)];
console.log('Email Setelah Dihapus Duplikat:', emailsUnik);

// 3. Cari irisan dua daftar peserta (kelas A dan kelas B) memakai Set.
const pesertaA = new Set(peserta.filter(p => p.kelas === 'Web').map(p => p.id));
const pesertaB = new Set(peserta.filter(p => p.kelas === 'Data').map(p => p.id));
const irisan = [...pesertaA].filter(id => pesertaB.has(id));
console.log('Irisan Peserta (Kelas A dan B):', irisan);

// 4. Buat fungsi adaDuplikat(daftar) (versi Set) dan uji dengan array kosong, satu elemen, dan
// elemen berulang.
function adaDuplikat(daftar) {
    const unik = new Set(daftar);
    return unik.size !== daftar.length;
}

console.log('Array Kosong:', adaDuplikat([])); // false
console.log('Satu Elemen:', adaDuplikat([1])); // false
console.log('Elemen Berulang:', adaDuplikat([1, 2, 2, 3])); // true