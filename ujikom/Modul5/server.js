const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Konfigurasi middleware body-parser untuk membaca JSON
app.use(bodyParser.json());

// Konfigurasi koneksi ke basis data MySQL 'ujian'
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ujian'
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi ke basis data ujian gagal:', err.message);
    return;
  }
  console.log("Berhasil terhubung ke database 'ujian'");
});

// Endpoint GET '/' -> Mengembalikan JSON data tabel users
app.get('/', (req, res) => {
  const querySql = 'SELECT * FROM users';

  db.query(querySql, (err, rows) => {
    if (err) {
      console.error('Query Error:', err.message);
      return res.status(500).json({ error: 'Gagal mengambil data users' });
    }

    res.json({ data: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Server Express berjalan di http://localhost:${PORT}`);
});

