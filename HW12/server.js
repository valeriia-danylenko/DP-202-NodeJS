const http = require('http');
const fs = require('fs');
const url = require('url');

const { paramsValidator, checkRequiredParams } = require('./validator');
const { findUser, addNewUser } = require('./database/db.js');


const server = http.createServer();
server.on('request', async (req, res) => {
    const path = url.parse(req.url, true).pathname;
    const query = url.parse(req.url, true).query;

    if (path === '/auth') {
        const { login, password } = query;
        const foundUser = findUser(login, password);
        foundUser.then(val => {
            writeAnswer(res, ...val)
        })
    }

    else if (path === '/reg') {
        if (!checkRequiredParams(query)) {
            writeAnswer(res, 401, 'Some information is missing')
            return;
        }
        for (const [key, value] of Object.entries(query)) {
            const resultValid = await paramsValidator(value, key);
            if (!resultValid) {
                writeAnswer(res, 401, 'Validation has failed');
                return;
            }
        }
        const { name, surname, login, password, email, dob } = query;
        const newUser = addNewUser(name, surname, login, password, email, dob);
        newUser.then(val => {
            writeAnswer(res, ...val)
        })
    }

});

const writeAnswer = function (res, status, message) {
    res.writeHead(status, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    });
    res.write(message);
    res.end();
}

server.listen(3000);