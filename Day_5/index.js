import http from 'http';
const port = 8080;
const ipAddress = '127.0.0.1';
import fs from 'fs'

const routes = {
    '/' : 'index.html',
    '/contact' : 'contact.html',
    '/about' : 'about.html'
}

function renderHTML(filePath, res) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.write('500 Internal Server Error');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
        }
        res.end();
    });
}

http
    .createServer((req, res) => {
    const url = req.url;
    if (routes[url]) {
        renderHTML(routes[url], res);
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found');
    }
})
    .listen(port, ipAddress, () => {
    console.log(`Server is running on http://${ipAddress}:${port}`)
})