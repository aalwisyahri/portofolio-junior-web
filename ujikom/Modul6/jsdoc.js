// 1. Memberikan dokumentasi JSDoc pada fungsi call(a, b, c)
/**
 * Fungsi call
 * @param {number} a - Parameter pertama
 * @param {number} b - Parameter kedua
 * @param {number} c - Parameter ketiga
 * @returns {number} Hasil dari operasi call
 */
function call(a, b, c) {
    return a + b + c[0];
}

console.log('Hasil call(2, 3, [10]):', call(2, 3, [10])); // 15

// 2. Memperbaiki dokumentasi JSDoc pada fungsi addTwoNumbers
/**
 * Fungsi addTwoNumbers
 * @param {number} a - Parameter pertama
 * @param {number} b - Parameter kedua
 * @returns {number} Hasil dari operasi penjumlahan
 */
function addTwoNumbers(a, b) {
    return a + b;
}
console.log('Hasil addTwoNumbers(5, 10):', addTwoNumbers(5, 10)); // 15