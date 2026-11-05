/**
 * Unit Kompetensi: J.620100.017.02 - Mengimplementasikan Pemrograman Terstruktur
 * Web Server HTTP Sederhana & Static File Server di Port 8000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Pemetaan MIME Type untuk Static Files
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8'
};

function kirimResponse(res, statusCode, contentType, konten) {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(konten);
}

const server = http.createServer((req, res) => {
  try {
    // 1. Endpoint "/" dengan method GET mengembalikan "hello world"
    if (req.url === '/' && req.method === 'GET') {
      return kirimResponse(res, 200, 'text/plain; charset=utf-8', 'hello world');
    }

    // 2. Hanya mendukung method GET untuk static server
    if (req.method !== 'GET') {
      return kirimResponse(res, 405, 'text/plain; charset=utf-8', '405 Method Not Allowed');
    }

    // 3. Static File Server dari direktori public/
    const urlBersih = decodeURIComponent(req.url.split('?')[0]);
    const filePath = path.join(PUBLIC_DIR, urlBersih);

    // Proteksi Path Traversal (Mencegah akses ../ ke luar folder public)
    if (!filePath.startsWith(PUBLIC_DIR)) {
      return kirimResponse(res, 403, 'text/plain; charset=utf-8', '403 Forbidden');
    }

    fs.stat(filePath, (errStat, stats) => {
      if (errStat || !stats.isFile()) {
        return kirimResponse(res, 404, 'text/plain; charset=utf-8', '404 Not Found');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (errRead, data) => {
        if (errRead) {
          return kirimResponse(res, 500, 'text/plain; charset=utf-8', '500 Internal Server Error');
        }
        return kirimResponse(res, 200, contentType, data);
      });
    });

  } catch (error) {
    console.error('Unhandled Server Error:', error);
    kirimResponse(res, 500, 'text/plain; charset=utf-8', '500 Internal Server Error');
  }
});

// Penanganan Error Server Level agar Minim Crash
server.on('error', (err) => {
  console.error('Server Error:', err.message);
});

server.listen(PORT, () => {
  console.log(`Web Server berjalan di http://localhost:${PORT}`);
});

