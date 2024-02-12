const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'chlqhqo1',
    host: 'localhost',
    port: 5432,
    database: 'reciper'
});

module.exports = pool;