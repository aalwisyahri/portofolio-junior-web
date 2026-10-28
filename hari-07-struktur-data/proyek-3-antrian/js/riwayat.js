
import { Stack } from "./structures.js";

const MAKS_RIWAYAT = 50;

export class RiwayatCatatan {
  #undoStack = new Stack();
  #redoStack = new Stack();
  #catatan = "";

  constructor(catatanAwal = "") {
    this.#catatan = catatanAwal;
  }

  ubahCatatan(catatanBaru) {
    if (typeof catatanBaru !== "string") {
      throw new TypeError("Catatan harus berupa teks.");
    }
    if (catatanBaru === this.#catatan) return;

    this.#undoStack.push(this.#catatan);
    if (this.#undoStack.size() > MAKS_RIWAYAT) {
      const langkah = this.#undoStack.toArray().slice(-MAKS_RIWAYAT);
      this.#undoStack.clear();
      langkah.forEach((item) => this.#undoStack.push(item));
    }
    this.#catatan = catatanBaru;
    this.#redoStack.clear();
  }

  undo() {
    if (this.#undoStack.isEmpty()) return undefined;
    this.#redoStack.push(this.#catatan);
    this.#catatan = this.#undoStack.pop();
    return this.#catatan;
  }

  redo() {
    if (this.#redoStack.isEmpty()) return undefined;
    this.#undoStack.push(this.#catatan);
    this.#catatan = this.#redoStack.pop();
    return this.#catatan;
  }

  catatanSaatIni() {
    return this.#catatan;
  }

  bisaUndo() {
    return !this.#undoStack.isEmpty();
  }

  bisaRedo() {
    return !this.#redoStack.isEmpty();
  }

  jumlahUndo() {
    return this.#undoStack.size();
  }

  jumlahRedo() {
    return this.#redoStack.size();
  }
}
