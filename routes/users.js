const { application } = require('express');
var express = require('express');
var router = express.Router();

// var column = require('../repository/users.js');
var column = require('../repository/userDb.js');
const db = require('../repository/db.js');

// const users = [
//   {
//     id: 101,
//     name: 'hyeonjae',
//     age: 35,
//   },{
//     id: 102,
//     name: 'jinseok',
//     age: 35,
//   },{
//     id: 103,
//     name: 'dongil',
//     age: 41,
//   },{
//     id: 104,
//     name: 'seongjae',
//     age: 38,
//   },
// ]

router.get('/:id', (req, res, next) => {
  db.query(`SELECT * FROM user`, (err, data) => {    
    const users = column.findOne(data, req.params.id)
    res.send(users);
  });
});

router.post('/', (req, res, next) => {
  db.query(`SELECT * FROM user`, (err, data) => {
    const newUsers = column.insert(data, req);
    db.query(`INSERT INTO user (id, name, age) VALUES(?, ?, ?)`, [newUsers.id, req.body.name, req.body.age], 
        (err2, data) => {
          res.json(newUsers);
        })
  });  
});


router.delete('/:id', (req, res, next) => {
  db.query(`DELETE FROM user WHERE id=?`, req.params.id,
    (err2, result) => {
      db.query(`SELECT * FROM user`, (err, data) => {    
        const users = column.findAll(data);
        res.json(users);
      });
    })
});

router.put('/:id', (req, res, next) => {
  db.query(`SELECT * FROM user`, (err, data) => {
    db.query(`UPDATE user SET name=?, age=? WHERE id=?` , [req.body.name, req.body.age, req.params.id],
    (err2, data2) => {
      const users = column.update(data, req, req.params.id);
      res.json(users);
    });
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('GET users listing');
  // res.send("{\"name\":\"hyeonjae\"}");
  db.query(`SELECT * FROM user`, (err, data) => {    
    const users = column.findAll(data);
    res.json(users);
  });
});

module.exports = router;
