const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'users',
    password: '123',
    port: 5432,
});

const findUser = async function (login, password) {
    const selector = 'SELECT * FROM users WHERE login = $1 AND password = $2'
    const values = [login, password];
    const { rows } = await pool.query(selector, values);
    if (rows.length !== 0) {
        return [200, JSON.stringify(rows)];
    } else {
        return [401, 'No such user is found. Check login and password'];
    }
}

const checkingNoDubles = async function (value, type) {
    const selector = `SELECT * FROM users WHERE ${type} = $1`;
    const values = [value];
    const { rows } = await pool.query(selector, values);
    return rows.length === 0;
};

const addNewUser = async function (name, surname, login, password, email, dob) {
    dob = dob.replace(/-/g, '/');
    const today = new Date();
    const date_created = today.toISOString().substring(0, 10).replace(/-/g, '/');
    const selector = 'INSERT INTO users (name, surname, login, password, email, dob, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [name, surname, login, password, email, dob, date_created];
    const result = await pool.query(selector, values);
    return [200, 'New user has been added']
};

module.exports.addNewUser = addNewUser;
module.exports.checkingNoDubles = checkingNoDubles;
module.exports.findUser = findUser;