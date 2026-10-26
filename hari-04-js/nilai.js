const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const NILAI_MIN = 0;
const NILAI_MAKS = 100;
const BATAS_LULUS = 70;
async function main() {
  const rl = readline.createInterface({ input, output });
  const daftarNama = [];
  const daftarNilai = [];
  let jalan = true;
  while (jalan) {
    console.log("\n===== PENGOLAH NILAI =====");
    console.log("1. Input nilai siswa");
    console.log("2. Tampilkan statistik");
    console.log("3. Tampilkan predikat per siswa");
    console.log("4. Keluar");
    const pilihan = await rl.question("Pilih menu (1-4): ");
    switch (pilihan) {
      case "1": {
        const nama = (await rl.question("Nama siswa: ")).trim();
        const nilai = Number(await rl.question("Nilai (0-100): "));
        // TODO: validasi nama tidak kosong dan nilai 0-100 (Number.isNaN)
        // TODO: jika valid, push ke daftarNama dan daftarNilai
        if (!nama) {
          console.log("Nama tidak boleh kosong.");
          break;
        }
        if (Number.isNaN(nilai) || nilai < NILAI_MIN || nilai > NILAI_MAKS) {
          console.log(`Nilai harus berupa angka antara ${NILAI_MIN} dan ${NILAI_MAKS}.`);
          break;
        }
        daftarNama.push(nama);
        daftarNilai.push(nilai);
        console.log("Data siswa berhasil ditambahkan.");
        break;
      }
      case "2": {
        // TODO: jika kosong tampilkan pesan; jika ada hitung rata-rata,
        // nilai tertinggi, dan nilai terendah dengan perulangan
        if (daftarNama.length === 0) {
          console.log("Belum ada data siswa.");
        } else {
          let total = 0;
          let nilaiTertinggi = daftarNilai[0];
          let nilaiTerendah = daftarNilai[0];
          for (let i = 0; i < daftarNilai.length; i++) {
            total += daftarNilai[i];
            if (daftarNilai[i] > nilaiTertinggi) {
              nilaiTertinggi = daftarNilai[i];
            }
            if (daftarNilai[i] < nilaiTerendah) {
              nilaiTerendah = daftarNilai[i];
            }
          }
          const rataRata = total / daftarNilai.length;
          console.log(`Rata-rata: ${rataRata.toFixed(2)}`);
          console.log(`Nilai tertinggi: ${nilaiTertinggi}`);
          console.log(`Nilai terendah: ${nilaiTerendah}`);
        }
        break;
      }
      case "3": {
        // TODO: for dengan indeks; tampilkan nama, nilai, grade A/B/C/D, Lulus/Tidak
        if (daftarNama.length === 0) {
          console.log("Belum ada data siswa.");
        } else {
          console.log("\n=== PREDIKAT SISWA ==="); 
          for (let i = 0; i < daftarNama.length; i++) {
            const nama = daftarNama[i];
            const nilai = daftarNilai[i];
            let grade = "D";
            let lulus = "Tidak";
            if (nilai >= 80) {
              grade = "A";
            } else if (nilai >= 70) {
              grade = "B";
            } else if (nilai >= 60) {
              grade = "C";
            }
            if (nilai >= BATAS_LULUS) {
              lulus = "Lulus";
            }
            console.log(`${nama}: ${nilai} (${grade}) - ${lulus}`);
          }
        }
        break;
      }
      case "4":
        jalan = false;
        console.log("Terima kasih.");
        break;
      default:
        console.log("Pilihan tidak valid.");
    }
  }
  rl.close();
}
main();
