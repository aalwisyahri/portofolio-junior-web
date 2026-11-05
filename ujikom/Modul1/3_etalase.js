var etalase = [
    { id: 1, barang: 'T-shirt', harga: 80000 },
    { id: 2, barang: 'Jeans', harga: 90000 },
    { id: 3, barang: 'Tote Bag', harga: 20000 },
    { id: 4, barang: 'School Bag', harga: 25000 },
    { id: 5, barang: 'Shoes', harga: 120000 }
];

// fungsi untuk mengurutkan etalase dari termurah ke termahal
function urutkanEtalaseTermurah(daftarEtalase) {
    return [...daftarEtalase].sort(function (a, b) {
        return a.harga - b.harga;
    });
}

// Etalase setelah diurutkan dari termurah ke termahal
var etalaseTerurut = urutkanEtalaseTermurah(etalase);
console.log('Etalase setelah diurutkan dari termurah ke termahal:');
console.log(etalaseTerurut);