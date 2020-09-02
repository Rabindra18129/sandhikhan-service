var mysql = require('mysql');
var pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

function handleDisconnect() {
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    pool.on('error', function(err) {
        console.log('db error', err);
        handleDisconnect();
    });
}
pool.on('error', function(err) {
    console.log('db error', err);
    handleDisconnect();
});

function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
        pool.query({ sql: query, values: params }, (err, result, fields) => {
            if (err) {
                console.log('Error occured while executing query');
                console.log(err);
                reject(err);
            } else {
                console.log('Data fetched from database successfully');
                resolve({ dbData: result[0], dbFields: fields });
            }
        });
    });
}
module.exports = { getDBData: executeQuery };