// structures.js

// ==============================
// 1. CLASS STACK (T5)
// ==============================

export class Stack {
  // Membuat stack kosong untuk menyimpan data
  constructor() {
    this.items = [];
  }

  // Menambahkan item ke bagian paling atas stack
  push(item) {
    this.items.push(item);
  }

  // Menghapus dan mengembalikan item paling atas stack
  // Jika stack kosong, mengembalikan undefined
  pop() {
    return this.isEmpty() ? undefined : this.items.pop();
  }

  // Melihat item paling atas tanpa menghapusnya
  // Jika stack kosong, mengembalikan undefined
  peek() {
    return this.isEmpty()
      ? undefined
      : this.items[this.items.length - 1];
  }

  // Memeriksa apakah stack kosong
  // Mengembalikan true jika kosong, false jika berisi data
  isEmpty() {
    return this.items.length === 0;
  }

  // Mengembalikan jumlah item yang tersimpan di stack
  size() {
    return this.items.length;
  }

  // Menghapus semua item dan mengosongkan stack
  clear() {
    this.items = [];
  }
}


// ==============================
// 2. CLASS QUEUE (T6)
// ==============================

export class Queue {
  // Membuat queue kosong dengan penanda head dan tail
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  // Menambahkan item ke bagian belakang queue
  enqueue(item) {
    this.items[this.tail] = item;
    this.tail++;
  }

  // Menghapus dan mengembalikan item paling depan queue
  // Jika queue kosong, mengembalikan undefined
  dequeue() {
    if (this.isEmpty()) return undefined;

    const item = this.items[this.head];

    // Menghapus item yang sudah diambil
    delete this.items[this.head];

    // Memindahkan penanda head ke item berikutnya
    this.head++;

    return item;
  }

  // Melihat item paling depan tanpa menghapusnya
  front() {
    return this.items[this.head];
  }

  // Memeriksa apakah queue kosong
  // Mengembalikan true jika kosong, false jika berisi data
  isEmpty() {
    return this.tail === this.head;
  }

  // Mengembalikan jumlah item yang masih ada di queue
  size() {
    return this.tail - this.head;
  }
}