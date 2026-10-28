import { LinkedList, Queue, LinkedQueue } from "./structures.js";
// 2. Uji LinkedList: addFirst, addLast, removeFirst, find, toArray, serta kasus kosong dan satu
// elemen.
// --- PENGUJIAN LINKED LIST ---
console.log("=== PENGUJIAN LINKED LIST ===");
const list = new LinkedList();

// kasus kosong
console.log("Kosong:", list.isEmpty()); // true

// Uji addFirst dan addLast
list.addFirst(10);
list.addLast(20);
list.addFirst(5);
console.log("\nSetelah addfirst dan addlast:");
console.log("Isi LinkedList:", list.toArray()); // [5, 10, 20]
console.log("Ukuran:", list.size()); // 3
console.log("Kosong:", list.isEmpty()); // false

// Uji removeFirst
console.log("Hapus pertama:", list.removeFirst()); // 5
console.log("Isi LinkedList:", list.toArray()); // [10, 20]
console.log("Ukuran:", list.size()); // 2

// Uji removeFirst sampai kosong
console.log("Hapus pertama:", list.removeFirst()); // 10
console.log("Hapus pertama:", list.removeFirst()); // 20
console.log("Hapus pertama pada LinkedList kosong:", list.removeFirst()); // undefined

// Uji find
list.addFirst(15);
const found = list.find((x) => x === 15);
console.log("Elemen ditemukan:", found);




// 3. Tambahkan method remove(data) yang menghapus node pertama bernilai data (tangani kasus
// kepala, tengah, ekor, dan tidak ada). Gambar dahulu pointer yang diubah.
list.remove(15);
console.log("Isi LinkedList setelah remove(15):", list.toArray());
console.log("Ukuran setelah remove(15):", list.size());


// 4. Bandingkan kecepatan Queue array (versi shift) dengan LinkedQueue untuk 100.000 elemen
// memakai console.time, catat pada tabel.
const QueueArray = new Queue();
const linkedQueue = new LinkedQueue();
const numElements = 100000;
for (let i = 0; i < numElements; i++) {
  QueueArray.enqueue(i);
  linkedQueue.enqueue(i);
}
console.time("Queue Array Dequeue");
for (let i = 0; i < numElements; i++) {
  QueueArray.dequeue();
}
console.timeEnd("Queue Array Dequeue"); 
console.time("Linked Queue Dequeue");
for (let i = 0; i < numElements; i++) {
  linkedQueue.dequeue();
}
console.timeEnd("Linked Queue Dequeue");
