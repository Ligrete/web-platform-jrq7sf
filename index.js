var http = require('http');
http.createServer(function (req, res) {
res.end('Hello World\n');
}).listen(80, 'localhost');
console.log('Server running at localhost');