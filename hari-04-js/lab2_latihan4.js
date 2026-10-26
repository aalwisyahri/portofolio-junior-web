// Penentu kategori BMI (berat / (tinggi * tinggi)): kurang (di bawah 18,5), normal
// (18,5-24,9), lebih (25-29,9), obesitas (30 ke atas).
// 0. start, berat, tinggi, BMI, status
// 1. input (berat, tinggi)
// 2. BMI = berat / (tinggi * tinggi)
// 3. if (BMI < 18,5) {status = "kurang"}else if(BMI <= 24.9) {status = "normal"}else if(BMI <= 29,9) {status = "lebih"}
//     else{status="obesitas"}
// 4. cetak (status)
// 5. end

let berat, tinggi, BMI, statusOrang;
berat = 55;
tinggi = 1.69;
BMI = berat / (tinggi * tinggi);
if (BMI < 18.5) {
    statusOrang = "kurang";
} else if (BMI <= 24.9) {
    statusOrang = "normal";
} else if (BMI <= 29.9) {
    statusOrang  = "lebih";
} else {
    statusOrang = "obesitas";
}
console.log("Status: " + statusOrang);