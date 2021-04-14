const task1 = require('./src/task1.js');
const task2 = require('./src/task2.js');
const task4 = require('./src/task4.js');
const task5 = require('./src/task5.js');
const task6 = require('./src/task6.js');
const task7 = require('./src/task7.js');

const http = require('http');
const url = require('url');


http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/plain' });
    const query = url.parse(req.url, true).query;
    const { task } = query;
    let result=''
    switch (task) {
        case '1':
            const {w, l, s} = query;
            result = task1(+w, +l,s);
            break;
        case '2':
            const {a, b, c, d} = query;
            result = task2( {'a': +a, 'b': +b }, { 'c' : +c, 'd' : +d }); 
            break; 
        case '4':
            const {num} = query;
            result = task4(num);
            break;
        case '5':
            const {min, max} = query;
            result = task5({'min':+min, 'max':+max});
            break;
        case '6':
            const {len, m} = query;
            result = task6(+len, +m);
            break;
        case '7':
            const {mn, mx, length} = query;
            result = task6({'min':+mn, 'max':+mx, 'length':+length});
            break;
        default:
            result = 'Sth is wrong'
            break;
    }
    if (typeof result === 'object') {
        result = JSON.stringify(result)
    }
    res.write(result)
    res.end();
}).listen(8080);

console.log('Server on http://localhost:8080');