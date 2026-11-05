// objek sepeda menerima input construktor berupa angka kemudian  tambahkan buat fungsi diameter
function Sepeda(jariJari) {
    this.jariJari = jariJari; // dalam cm
    this.diameter = function () {
        return 2 * this.jariJari;
    }
}

var sepeda1 = new Sepeda(30);
console.log(`Jari-jari sepeda: ${sepeda1.jariJari} cm`);
console.log(`Diameter sepeda: ${sepeda1.diameter()} cm`);