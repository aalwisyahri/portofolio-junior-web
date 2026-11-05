var etalase = [
    { id: 1, barang: 'T-shirt', harga: 80000 },
    { id: 2, barang: 'Jeans', harga: 90000 },
    { id: 3, barang: 'Tote Bag', harga: 20000 },
    { id: 4, barang: 'School Bag', harga: 25000 },
    { id: 5, barang: 'Shoes', harga: 120000 }
];

function cariBarangTermurah(daftarEtalase) {
  if (!daftarEtalase || daftarEtalase.length === 0) {
    return null;
  }

  var termurah = daftarEtalase[0];
  for (var i = 1; i < daftarEtalase.length; i++) {
    if (daftarEtalase[i].harga < termurah.harga) {
      termurah = daftarEtalase[i];
    }
  }
  return termurah;
}

console.log('Barang paling murah di etalase:');
var barangTermurah = cariBarangTermurah(etalase);
console.log(barangTermurah);