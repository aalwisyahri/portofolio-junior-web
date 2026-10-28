
import { LinkedList, LinkedQueue } from "./structures.js";

const AWALAN_NOMOR = "A";
const PANJANG_NOMOR = 3;
const MAKS_RIWAYAT_PANGGILAN = 5;

export class Antrian {
  #queue = new LinkedQueue();
  #riwayatPanggilan = new LinkedList();
  #nomorBerikutnya = 1;

  ambilNomor() {
    const nomor = AWALAN_NOMOR +
      String(this.#nomorBerikutnya).padStart(PANJANG_NOMOR, "0");
    this.#queue.enqueue(nomor);
    this.#nomorBerikutnya++;
    return nomor;
  }

  panggilBerikutnya() {
    if (this.#queue.isEmpty()) return undefined;
    const nomor = this.#queue.dequeue();
    this.#riwayatPanggilan.addFirst(nomor);
    this.#batasiRiwayat();
    return nomor;
  }

  #batasiRiwayat() {
    while (this.#riwayatPanggilan.size() > MAKS_RIWAYAT_PANGGILAN) {
      const nomorTerlama = this.#riwayatPanggilan.toArray().at(-1);
      this.#riwayatPanggilan.remove(nomorTerlama);
    }
  }

  daftarMenunggu() {
    return this.#queue.toArray();
  }

  riwayatPanggilan() {
    return this.#riwayatPanggilan.toArray();
  }

  jumlahMenunggu() {
    return this.#queue.size();
  }

  reset() {
    this.#queue.clear();
    this.#riwayatPanggilan.clear();
    this.#nomorBerikutnya = 1;
  }
}
