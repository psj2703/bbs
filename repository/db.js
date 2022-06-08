const mysql = require('mysql');
const db = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '1234',
    database : 'bbs_user_db'
});
db.connect();

module.exports = db;