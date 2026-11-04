const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

// Konstanta terdefinisi tanpa magic number
const NILAI_MIN = 0;
const NILAI_MAKS = 100;
const BATAS_LULUS = 70;
const BATAS_GRADE_A = 85;
const BATAS_GRADE_B = 70;
const BATAS_GRADE_C = 55;

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

    switch (pilihan.trim()) {
      case "1": {
        const nama = (await rl.question("Nama siswa: ")).trim();
        const nilaiInput = await rl.question("Nilai (0-100): ");
        const nilai = Number(nilaiInput);

        // Validasi: nama tidak boleh kosong dan nilai harus angka antara 0-100
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
        // Validasi: jika kosong tampilkan pesan; jika ada, hitung statistik
        if (daftarNama.length === 0) {
          console.log("Belum ada data siswa.");
        } else {
          let total = 0;
          let nilaiTertinggi = daftarNilai[0];
          let nilaiTerendah = daftarNilai[0];
          let jumlahLulus = 0;
          let jumlahTidakLulus = 0;

          // Penghitung histogram per grade
          let countGradeA = 0;
          let countGradeB = 0;
          let countGradeC = 0;
          let countGradeD = 0;

          for (let i = 0; i < daftarNilai.length; i++) {
            const skor = daftarNilai[i];
            total += skor;

            if (skor > nilaiTertinggi) {
              nilaiTertinggi = skor;
            }
            if (skor < nilaiTerendah) {
              nilaiTerendah = skor;
            }

            if (skor >= BATAS_LULUS) {
              jumlahLulus++;
            } else {
              jumlahTidakLulus++;
            }

            if (skor >= BATAS_GRADE_A) {
              countGradeA++;
            } else if (skor >= BATAS_GRADE_B) {
              countGradeB++;
            } else if (skor >= BATAS_GRADE_C) {
              countGradeC++;
            } else {
              countGradeD++;
            }
          }

          const rataRata = total / daftarNilai.length;
          console.log(`Rata-rata: ${rataRata.toFixed(2)}`);
          console.log(`Nilai tertinggi: ${nilaiTertinggi}`);
          console.log(`Nilai terendah: ${nilaiTerendah}`);
          console.log(`Jumlah lulus: ${jumlahLulus}`);
          console.log(`Jumlah tidak lulus: ${jumlahTidakLulus}`);
          console.log("Histogram per grade:");
          console.log(`Grade A: ${countGradeA}`);
          console.log(`Grade B: ${countGradeB}`);
          console.log(`Grade C: ${countGradeC}`);
          console.log(`Grade D: ${countGradeD}`);
        }
        break;
      }
      case "3": {
        // Tampilkan predikat: nama, nilai, grade A/B/C/D, Lulus/Tidak lulus
        if (daftarNama.length === 0) {
          console.log("Belum ada data siswa.");
        } else {
          // Tantangan Tambahan: Bubble Sort manual dari nilai tertinggi ke terendah
          const namaUrut = [...daftarNama];
          const nilaiUrut = [...daftarNilai];
          for (let i = 0; i < nilaiUrut.length - 1; i++) {
            for (let j = 0; j < nilaiUrut.length - 1 - i; j++) {
              if (nilaiUrut[j] < nilaiUrut[j + 1]) {
                // Tukar nilai
                const tempNilai = nilaiUrut[j];
                nilaiUrut[j] = nilaiUrut[j + 1];
                nilaiUrut[j + 1] = tempNilai;
                // Tukar nama
                const tempNama = namaUrut[j];
                namaUrut[j] = namaUrut[j + 1];
                namaUrut[j + 1] = tempNama;
              }
            }
          }

          console.log("\n=== PREDIKAT SISWA (TERURUT NILAI TERTINGGI) ===");
          for (let i = 0; i < namaUrut.length; i++) {
            const nama = namaUrut[i];
            const nilai = nilaiUrut[i];
            let grade = "D";

            if (nilai >= BATAS_GRADE_A) {
              grade = "A";
            } else if (nilai >= BATAS_GRADE_B) {
              grade = "B";
            } else if (nilai >= BATAS_GRADE_C) {
              grade = "C";
            }

            const statusKelulusan = nilai >= BATAS_LULUS ? "Lulus" : "Tidak lulus";
            console.log(`${i + 1}. ${nama}: ${nilai} (Grade ${grade}) - ${statusKelulusan}`);
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
