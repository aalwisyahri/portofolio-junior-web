// buat aplikasi web serer sederhana untuk menguji fungsi bandingkanArray saat endpoint '/' diakses melalui get jalankan di localhost:8000

const http = require('http');
const PORT = 8000;


const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Server is running on http://localhost:' + PORT);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});