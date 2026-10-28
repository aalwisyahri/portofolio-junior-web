class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
export class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;
  addFirst(data) {
    const node = new Node(data);
    node.next = this.#head;
    this.#head = node;
    if (this.#tail === null) this.#tail = node;
    this.#size++;
  }
  addLast(data) {
    const node = new Node(data);
    if (this.#tail === null) {
      this.#head = node;
    } else {
      this.#tail.next = node;
    }
    this.#tail = node;
    this.#size++;
  }
  removeFirst() {
    if (this.#head === null) return undefined;
    const data = this.#head.data;
    this.#head = this.#head.next;
    if (this.#head === null) this.#tail = null;
    this.#size--;
    return data;
  }
  peekFirst() {
    return this.#head === null ? undefined : this.#head.data;
  }
  find(predikat) {
    let saatIni = this.#head;
    while (saatIni !== null) {
      if (predikat(saatIni.data)) return saatIni.data;
      saatIni = saatIni.next;
    }
    return undefined;
  }
  size() {
    return this.#size;
  }
  isEmpty() {
    return this.#size === 0;
  }
  toArray() {
    const hasil = [];
    let saatIni = this.#head;
    while (saatIni !== null) {
      hasil.push(saatIni.data);
      saatIni = saatIni.next;
    }
    return hasil;
  }
  remove(data) {
    if (this.#head === null) return undefined; // List kosong

    // Jika elemen yang ingin dihapus adalah head
    if (this.#head.data === data) {
      return this.removeFirst();
    }

    let saatIni = this.#head;
    while (saatIni.next !== null && saatIni.next.data !== data) {
      saatIni = saatIni.next;
    }

    if (saatIni.next === null) return undefined; // Elemen tidak ditemukan

    const dataDihapus = saatIni.next.data;
    saatIni.next = saatIni.next.next;

    // Jika elemen yang dihapus adalah tail
    if (saatIni.next === null) {
      this.#tail = saatIni;
    }

    this.#size--;
    return dataDihapus;
  }
}

// Queue berbasis Linked List: semua operasi O(1) dan detail internal tersembunyi
export class LinkedQueue {
  #daftar = new LinkedList();
  enqueue(item) {
    this.#daftar.addLast(item);
  }
  dequeue() {
    return this.#daftar.removeFirst();
  }
  front() {
    return this.#daftar.peekFirst();
  }
  isEmpty() {
    return this.#daftar.isEmpty();
  }
  size() {
    return this.#daftar.size();
  }
  toArray() {
    return this.#daftar.toArray();
  }
}

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
    return this.isEmpty() ? undefined : this.items[this.items.length - 1];
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