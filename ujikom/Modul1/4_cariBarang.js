var etalase = [
    { id: 1, barang: 'T-shirt', harga: 80000 },
    { id: 2, barang: 'Jeans', harga: 90000 },
    { id: 3, barang: 'Tote Bag', harga: 20000 },
    { id: 4, barang: 'School Bag', harga: 25000 },
    { id: 5, barang: 'Shoes', harga: 120000 }
];

// fungsi pencarian barang berdasarkan kata kunci
function cariBarangEtalase(daftarEtalase, kataKunci) {
    var keyword = kataKunci.toLowerCase();
    return daftarEtalase.filter(function (item) {
        return item.barang.toLowerCase().includes(keyword);
    });
}

// cari barang dengan kata kunci "bag"
var hasilPencarian = cariBarangEtalase(etalase, 'bag');
console.log('Hasil pencarian barang dengan kata kunci "bag":');
console.log(hasilPencarian);