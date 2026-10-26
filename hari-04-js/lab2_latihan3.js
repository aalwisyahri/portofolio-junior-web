// Kalkulator sederhana dengan switch (+, -, *, /) dan penanganan pembagian dengan nol.
// 0. start, let nilai1, nilai2, hasil, pilih
// 1.output("menu pilihan (+, -, *, /)")
// 2. input (nilai1, nilai2, pilih)
// 3. switch (pilih)
//     case 1: hasil = nilai1+nilai2
//     case 2: hasil = nilai1-nilai2
//     case 3: hasil = nilai1*nilai2
//     case 4: if(nilai2==0) {hasil = "tidak terdefinisi"}else{hasil = nilai1/nilai2}
// 4. cetak (hasil)
// 5. end


let nilai, nilai2, hasil, pilih;
nilai = 10;
nilai2 = 0;
console.log("Menu pilihan: 1. +, 2. -, 3. *, 4. /");
pilih = 4;
switch(pilih) {
    case 1:
        hasil = nilai + nilai2;
        break;
    case 2:
        hasil = nilai - nilai2;
        break;
    case 3:
        hasil = nilai * nilai2;
        break;
    case 4:
        if(nilai2 == 0) {
            hasil = "tidak terdefinisi";
        } else {
            hasil = nilai / nilai2;
        }
        break;
    default:
        hasil = "Pilihan tidak valid";
}
console.log("Hasil: " + hasil); 
