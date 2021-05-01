const Pool = require('pg').Pool

class DatabasePool {
    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'shop',
            password: '123',
            port: 5432,
            connectionTimeoutMillis: 30000 
        });
    }
}

module.exports = DatabasePool;