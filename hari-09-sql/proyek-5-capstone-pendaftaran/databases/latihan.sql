-- 1. Tampilkan semua pendaftar berdasarkan nama A-Z
SELECT *
FROM pendaftar
ORDER BY nama ASC;

-- 2. Tampilkan 5 pendaftar terbaru
SELECT *
FROM pendaftar
ORDER BY tgl_daftar DESC, id DESC
LIMIT 5;

-- 3. Cari pendaftar yang namanya mengandung "an"
SELECT *
FROM pendaftar
WHERE nama LIKE '%an%';

-- 4. Tampilkan nama pendaftar beserta nama kelas
SELECT
    p.nama AS nama_pendaftar,
    k.nama_kelas
FROM pendaftar p
JOIN kelas k
    ON p.kelas_id = k.id;

-- 5. Hitung jumlah pendaftar per kelas
SELECT
    k.nama_kelas,
    COUNT(p.id) AS jumlah_pendaftar
FROM kelas k
LEFT JOIN pendaftar p
    ON k.id = p.kelas_id
GROUP BY k.id, k.nama_kelas;

-- 6. Tampilkan kelas yang belum memiliki pendaftar
SELECT
    k.id,
    k.nama_kelas
FROM kelas k
LEFT JOIN pendaftar p
    ON k.id = p.kelas_id
WHERE p.id IS NULL;

-- 7. Ubah nomor HP satu pendaftar
UPDATE pendaftar
SET no_hp = '081299998888'
WHERE email = 'andi@gmail.com';

-- Periksa perubahan nomor HP
SELECT id, nama, no_hp
FROM pendaftar
WHERE email = 'andi@gmail.com';

-- 8. Hapus satu pendaftar
DELETE FROM pendaftar
WHERE email = 'rina@gmail.com';

-- Periksa penghapusan
SELECT *
FROM pendaftar
WHERE email = 'rina@gmail.com';

-- 9. Uji memasukkan email ganda
-- Seharusnya menghasilkan error 1062
INSERT INTO pendaftar
(nama, email, no_hp, alamat, kelas_id)
VALUES
('Andi Duplikat', 'andi@gmail.com',
'081200000000', 'Sleman', 1);

-- 10. Uji menghapus kelas yang masih memiliki pendaftar
-- Seharusnya menghasilkan error 1451
DELETE FROM kelas
WHERE id = 1;
