const PAJAK = 0.11;
const BATAS_GRADE = { A: 85, B: 70, C: 55 };
function hitungRataRata(daftarNilai) {
  if (daftarNilai.length === 0) return 0;
  const jumlah = daftarNilai.reduce((total, nilai) => total + nilai, 0);
  return jumlah / daftarNilai.length;
}
function tentukanGrade(nilai) {
  if (nilai >= BATAS_GRADE.A) return "A";
  if (nilai >= BATAS_GRADE.B) return "B";
  if (nilai >= BATAS_GRADE.C) return "C";
  return "D";
}
function hitungHargaDenganPajak(harga) {
  return harga * (1 + PAJAK);
}

// mencoba fungsi diatas
const daftarNilai = [80, 65, 90];
const rataRata = hitungRataRata(daftarNilai);
console.log("Rata-rata:", rataRata);
console.log("Grade:", tentukanGrade(rataRata));
console.log("Harga dengan pajak (misal 100):", hitungHargaDenganPajak(100));