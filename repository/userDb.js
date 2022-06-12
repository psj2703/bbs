// CREATE DATABASE bbs_user_db;

// USE bbs_user_db;

// CREATE TABLE user
// (   id    INT(10) NOT NULL PRIMARY KEY,
//     name  VARCHAR(30) NOT NULL,
//     age   INT NOT NULL
// );

// INSERT INTO user VALUES (101, 'hyunjae', 35);
// INSERT INTO user VALUES (102, 'jinsuk', 35);
// INSERT INTO user VALUES (103, 'dongil', 41);
// INSERT INTO user VALUES (104, 'seongjae', 38);

const db = require('./db.js');

const column = {
    findAll : function () {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user', function(err, rows) {
                console.log(rows)
                resolve(rows)
            })
        })
    },
    
    findOne : function (id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM user`, (err, list) => {       
                const result = list.find(element => element.id === id)
                resolve(result)
              });
        });
    },
    
    insert : function(req, id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM user`, (err, data) => {
                const ids = data.map(user => user.id);
                const maxId = Math.max(...ids) + 1;
            
                const { body } = req;
                const { name, age } = body;

                const newUser = {
                    "id": Number(maxId),
                    "name" : name,
                    "age": Number(age)
                }

                db.query(`INSERT INTO user (id, name, age) VALUES(?, ?, ?)`, [newUser.id, newUser.name, newUser.age], 
                    (err2, data2) => {
                    resolve(newUser);
                }
                );
            });
        });
    },
    
    remove : function (req) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM user WHERE id=?`, req, (err2, result) => {
                resolve(result);
            });
        })
    },
    
    update : function (req, id) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE user SET name=?, age=? WHERE id=?`, [req.body.name, req.body.age, id],
            (err, data) => {
                resolve(data);
            });
        })
    }
}

module.exports = column;