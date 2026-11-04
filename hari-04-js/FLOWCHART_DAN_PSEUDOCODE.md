# Flowchart dan Pseudocode Program Percabangan
**Portofolio Hari 4 - JavaScript Dasar dan Pemrograman Terstruktur I**

Dokumen ini memuat perancangan algoritma menggunakan **Pseudocode** dan **Flowchart (Diagram Alir)** untuk program percabangan (*selection*) sesuai modul Hari 4 diklat Junior Web Programmer.

---

## 1. Program 1: Perhitungan Tarif Parkir (`lab2_latihan2.js`)

### Spesifikasi:
- 2 jam pertama: **Rp3.000**
- Tiap jam berikutnya: **Rp2.000 / jam**
- Maksimum per hari (24 jam): **Rp15.000**

### A. Pseudocode
```text
ALGORITMA Hitung_Tarif_Parkir
DEKLARASI:
    durasiJam, sisaJam, totalHari, bayarHari, bayarTotal : Integer
    TARIF_AWAL = 3000
    TARIF_PER_JAM = 2000
    TARIF_MAKS_PER_HARI = 15000

DESKRIPSI:
    MULAI
    BACA durasiJam

    sisaJam = durasiJam MOD 24
    totalHari = (durasiJam - sisaJam) / 24

    JIKA (sisaJam <= 2) MAKA
        bayarHari = TARIF_AWAL
    JIKA TIDAK
        bayarHari = TARIF_AWAL + (sisaJam - 2) * TARIF_PER_JAM
    AKHIR JIKA

    JIKA (bayarHari > TARIF_MAKS_PER_HARI) MAKA
        bayarHari = TARIF_MAKS_PER_HARI
    AKHIR JIKA

    bayarTotal = (totalHari * TARIF_MAKS_PER_HARI) + bayarHari
    TAMPILKAN bayarTotal
    SELESAI
```

### B. Flowchart (Diagram Alir)
```mermaid
flowchart TD
    Start(["Mulai"]) --> InputDurasi[/"Input durasiJam"/]
    InputDurasi --> HitungSisa["sisaJam = durasiJam % 24<br/>totalHari = (durasiJam - sisaJam) / 24"]
    HitungSisa --> CekJam{"sisaJam <= 2?"}
    
    CekJam -- "Ya" --> TarifAwal["bayarHari = 3000"]
    CekJam -- "Tidak" --> TarifLebih["bayarHari = 3000 + (sisaJam - 2) * 2000"]
    
    TarifAwal --> CekMaks{"bayarHari > 15000?"}
    TarifLebih --> CekMaks
    
    CekMaks -- "Ya" --> SetMaks["bayarHari = 15000"]
    CekMaks -- "Tidak" --> HitungTotal["bayarTotal = (totalHari * 15000) + bayarHari"]
    SetMaks --> HitungTotal
    
    HitungTotal --> Output[/"Tampilkan bayarTotal"/]
    Output --> Selesai(["Selesai"])
```

---

## 2. Program 2: Penentu Kategori BMI (`lab2_latihan4.js` & `lab4.html`)

### Spesifikasi:
- Rumus BMI: `berat (kg) / (tinggi (m) * tinggi (m))`
- Kategori:
  - BMI < 18.5 : **Kurang**
  - 18.5 $\le$ BMI $\le$ 24.9 : **Normal**
  - 25.0 $\le$ BMI $\le$ 29.9 : **Lebih**
  - BMI $\ge$ 30.0 : **Obesitas**

### A. Pseudocode
```text
ALGORITMA Penentu_Kategori_BMI
DEKLARASI:
    berat, tinggi, bmi : Real
    kategori : String

DESKRIPSI:
    MULAI
    BACA berat (kg)
    BACA tinggi (m)

    bmi = berat / (tinggi * tinggi)

    JIKA (bmi < 18.5) MAKA
        kategori = "Kurang"
    JIKA TIDAK, JIKA (bmi <= 24.9) MAKA
        kategori = "Normal"
    JIKA TIDAK, JIKA (bmi <= 29.9) MAKA
        kategori = "Lebih"
    JIKA TIDAK
        kategori = "Obesitas"
    AKHIR JIKA

    TAMPILKAN bmi, kategori
    SELESAI
```

### B. Flowchart (Diagram Alir)
```mermaid
flowchart TD
    Start(["Mulai"]) --> InputData[/"Input berat (kg) & tinggi (m)"/]
    InputData --> HitungBMI["bmi = berat / (tinggi * tinggi)"]
    HitungBMI --> CekKurang{"bmi < 18.5?"}
    
    CekKurang -- "Ya" --> KatKurang["kategori = 'Kurang'"]
    CekKurang -- "Tidak" --> CekNormal{"bmi <= 24.9?"}
    
    CekNormal -- "Ya" --> KatNormal["kategori = 'Normal'"]
    CekNormal -- "Tidak" --> CekLebih{"bmi <= 29.9?"}
    
    CekLebih -- "Ya" --> KatLebih["kategori = 'Lebih'"]
    CekLebih -- "Tidak" --> KatObesitas["kategori = 'Obesitas'"]
    
    KatKurang --> Output[/"Tampilkan bmi & kategori"/]
    KatNormal --> Output
    KatLebih --> Output
    KatObesitas --> Output
    
    Output --> Selesai(["Selesai"])
```

---

## 3. Program 3: Penentu Bilangan Ganjil/Genap dan Positif/Negatif/Nol (`lab2_latihan1.js`)

### A. Pseudocode
```text
ALGORITMA Penentu_Sifat_Bilangan
DEKLARASI:
    nilai : Integer
    statusGanjilGenap, statusTanda : String

DESKRIPSI:
    MULAI
    BACA nilai

    JIKA (nilai MOD 2 === 0) MAKA
        statusGanjilGenap = "genap"
    JIKA TIDAK
        statusGanjilGenap = "ganjil"
    AKHIR JIKA

    JIKA (nilai > 0) MAKA
        statusTanda = "positif"
    JIKA TIDAK, JIKA (nilai < 0) MAKA
        statusTanda = "negatif"
    JIKA TIDAK
        statusTanda = "nol"
    AKHIR JIKA

    TAMPILKAN statusGanjilGenap, statusTanda
    SELESAI
```

### B. Flowchart (Diagram Alir)
```mermaid
flowchart TD
    Start(["Mulai"]) --> InputNilai[/"Input nilai"/]
    InputNilai --> CekGenap{"nilai % 2 === 0?"}
    
    CekGenap -- "Ya" --> SetGenap["statusGanjilGenap = 'genap'"]
    CekGenap -- "Tidak" --> SetGanjil["statusGanjilGenap = 'ganjil'"]
    
    SetGenap --> CekPositif{"nilai > 0?"}
    SetGanjil --> CekPositif
    
    CekPositif -- "Ya" --> SetPositif["statusTanda = 'positif'"]
    CekPositif -- "Tidak" --> CekNegatif{"nilai < 0?"}
    
    CekNegatif -- "Ya" --> SetNegatif["statusTanda = 'negatif'"]
    CekNegatif -- "Tidak" --> SetNol["statusTanda = 'nol'"]
    
    SetPositif --> Output[/"Tampilkan statusGanjilGenap & statusTanda"/]
    SetNegatif --> Output
    SetNol --> Output
    
    Output --> Selesai(["Selesai"])
```

