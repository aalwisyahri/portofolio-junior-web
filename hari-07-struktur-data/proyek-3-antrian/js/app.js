
import { Antrian } from "./antrian.js";
import { RiwayatCatatan } from "./riwayat.js";

const antrian = new Antrian();
const elemen = {
  nomor: document.querySelector("#nomor-panggil"),
  jumlah: document.querySelector("#jumlah-antrean"),
  total: document.querySelector("#jumlah-dipanggil"),
  daftar: document.querySelector("#daftar-antrean"),
  riwayat: document.querySelector("#riwayat-panggilan"),
  pesan: document.querySelector("#pesan-antrean"),
  editor: document.querySelector("#editor-catatan"),
  undo: document.querySelector("#btn-undo"),
  redo: document.querySelector("#btn-redo"),
  jumlahRiwayat: document.querySelector("#jumlah-riwayat"),
  pesanEditor: document.querySelector("#pesan-editor"),
};

const KUNCI_CATATAN = "catatan-klinik";
let totalDipanggil = 0;
const riwayat = new RiwayatCatatan(
  localStorage.getItem(KUNCI_CATATAN) ?? "",
);

elemen.editor.value = riwayat.catatanSaatIni();

function tampilkanDaftar(elemenList, daftar) {
  elemenList.replaceChildren();
  daftar.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    elemenList.append(li);
  });
}

function perbaruiAntrean() {
  elemen.jumlah.textContent = antrian.jumlahMenunggu();
  elemen.total.textContent = totalDipanggil;
  tampilkanDaftar(elemen.daftar, antrian.daftarMenunggu());
  tampilkanDaftar(elemen.riwayat, antrian.riwayatPanggilan());
}

function ambilNomor() {
  const nomor = antrian.ambilNomor();
  elemen.pesan.textContent = `Nomor ${nomor} berhasil diambil.`;
  perbaruiAntrean();
}

function panggilNomor() {
  const nomor = antrian.panggilBerikutnya();
  if (nomor === undefined) {
    elemen.pesan.textContent = "Antrean kosong. Ambil nomor terlebih dahulu.";
    return;
  }
  elemen.nomor.textContent = nomor;
  elemen.pesan.textContent = `Nomor ${nomor}, silakan menuju loket.`;
  totalDipanggil++;
  perbaruiAntrean();
}

function resetAntrean() {
  const setuju = window.confirm("Yakin ingin mereset seluruh antrean?");
  if (!setuju) return;

  antrian.reset();
  totalDipanggil = 0;
  elemen.nomor.textContent = "---";
  elemen.pesan.textContent = "Antrean berhasil direset.";
  perbaruiAntrean();
}

function perbaruiRiwayat() {
  elemen.undo.disabled = !riwayat.bisaUndo();
  elemen.redo.disabled = !riwayat.bisaRedo();
  elemen.jumlahRiwayat.textContent =
    `Undo: ${riwayat.jumlahUndo()} | Redo: ${riwayat.jumlahRedo()}`;
}

function simpanCatatan() {
  localStorage.setItem(KUNCI_CATATAN, riwayat.catatanSaatIni());
}

function ubahCatatan() {
  riwayat.ubahCatatan(elemen.editor.value);
  simpanCatatan();
  perbaruiRiwayat();
}

function undoCatatan() {
  const catatan = riwayat.undo();
  if (catatan === undefined) return;
  elemen.editor.value = catatan;
  simpanCatatan();
  perbaruiRiwayat();
}

function redoCatatan() {
  const catatan = riwayat.redo();
  if (catatan === undefined) return;
  elemen.editor.value = catatan;
  simpanCatatan();
  perbaruiRiwayat();
}

document.querySelector("#btn-ambil").addEventListener("click", ambilNomor);
document.querySelector("#btn-panggil").addEventListener("click", panggilNomor);
document.querySelector("#btn-reset").addEventListener("click", resetAntrean);
elemen.editor.addEventListener("input", ubahCatatan);
elemen.undo.addEventListener("click", undoCatatan);
elemen.redo.addEventListener("click", redoCatatan);

perbaruiAntrean();
perbaruiRiwayat();
