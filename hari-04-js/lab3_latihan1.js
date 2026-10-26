console.log("=== TABEL PERKALIAN 1 - 10 ===");

for (let i = 1; i <= 10; i++) {
    let baris = "";
    for (let j = 1; j <= 10; j++) {
        // padStart(4) digunakan agar susunan angka rapi berjejer
        let hasil = (i * j).toString().padStart(4, " ");
        baris += hasil;
    }
    console.log(baris);
}

console.log("=== SEGITIGA BINTANG ===");
let tinggiSegitiga = 5;

for (let i = 1; i <= tinggiSegitiga; i++) {
    let baris = "";
    for (let j = 1; j <= i; j++) {
        baris += "* ";
    }
    console.log(baris);
}

console.log("\n=== PIRAMIDA BINTANG ===");
let tinggiPiramida = 5;

for (let i = 1; i <= tinggiPiramida; i++) {
    let spasi = " ".repeat(tinggiPiramida - i);
    let bintang = "*".repeat(2 * i - 1);
    console.log(spasi + bintang);
}

console.log("\n=== PERSEGI ANGKA ===");
let ukuranPersegi = 5;

for (let i = 1; i <= ukuranPersegi; i++) {
    let baris = "";
    for (let j = 1; j <= ukuranPersegi; j++) {
        baris += j + " ";
    }
    console.log(baris);
}

console.log("=== FIZZBUZZ 1 - 50 ===");

for (let i = 1; i <= 50; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

let angka = 4821;
let angkaAwal = angka;
let totalJumlah = 0;

while (angka > 0) {
    let digitTerakhir = angka % 10;          // Mengambil digit paling belakang (misal: 4821 % 10 = 1)
    totalJumlah += digitTerakhir;             // Menambahkan ke total
    angka = Math.floor(angka / 10);          // Membuang digit terakhir (misal: 4821 / 10 = 482.1 -> 482)
}

console.log(`Jumlah digit dari ${angkaAwal} adalah: ${totalJumlah}`);

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const angkaRahasia = Math.floor(Math.random() * 100) + 1;
let tebakan;

console.log("=== GAME TEBAK ANGKA (1 - 100) ===");

function mainkanGame() {
    rl.question("Tebak angka: ", (input) => {
        tebakan = parseInt(input);

        if (isNaN(tebakan)) {
            console.log("Masukkan angka yang valid!");
            mainkanGame();
        } else if (tebakan < angkaRahasia) {
            console.log("Terlalu RENDAH! Coba lagi.\n");
            mainkanGame();
        } else if (tebakan > angkaRahasia) {
            console.log("Terlalu TINGGI! Coba lagi.\n");
            mainkanGame();
        } else {
            console.log(`🎉 Selamat! Tebakan Anda BENAR (${angkaRahasia}).`);
            rl.close();
        }
    });
}

mainkanGame();