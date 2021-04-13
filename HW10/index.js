const task1 = require('./src/task1.js');
const task2 = require('./src/task2.js');

const http = require('http');
const url = require('url');


http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/plain' });
    const query = url.parse(req.url, true).query;
    const { task } = query;
    let result;
    if (task == '1') {
        const {w, l, s} = query;
        res.write(task1(+w, +l,s))
    } else if (task == '2') {
        const {a, b, c, d} = query;
        res.write(task2( {'a': +a, 'b': +b }, { 'c' : +c, 'd' : +d })); 
    }
    res.end();
}).listen(8080);

console.log('Server on http://localhost:8080');