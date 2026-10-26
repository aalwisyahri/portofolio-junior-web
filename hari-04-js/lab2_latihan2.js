let durasiJam, sisaJam, sisaHari, totalHari, bayar;
durasiJam = 20;
sisaJam = durasiJam % 24;
totalHari = (durasiJam - sisaJam) / 24;
if (sisaJam <= 2) {
    bayar = 3000;
}else {
    bayar = 3000 + (sisaJam - 2)*2000;
}
if (bayar >= 15000) {
    bayar=15000;
}
bayar = totalHari * 15000 + bayar;
console.log(bayar);

