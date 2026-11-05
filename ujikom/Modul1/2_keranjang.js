var keranjang = [
    {id: 1, barang: 'T-shirt', harga: 80000, banyak: 2},
    {id: 2, barang: 'Jeans', harga: 90000, banyak: 1}
]

// fungsi untuk menghitung total harga keranjang
function hitungTotalKeranjang(daftarKeranjang) {
    var total = 0;
    for (var i = 0; i < daftarKeranjang.length; i++) {
        total += daftarKeranjang[i].harga * daftarKeranjang[i].banyak;
    }
    return total;
}

// hitung total harga keranjang
var totalHarga = hitungTotalKeranjang(keranjang);
console.log(`Total harga keranjang: Rp ${totalHarga}`);