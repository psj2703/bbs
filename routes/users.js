const { application } = require('express');
var express = require('express');
var router = express.Router();

var column = require('../repository/users.js');

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
  const users = column.findOne(req.params.id)
  res.send(users);
});

router.post('/', (req, res, next) => {
  const newUser = column.insert(req);
  res.json(newUser);
});


router.delete('/:id', (req, res, next) => {
  const users = column.remove(req.params.id);
  res.json(users);  
});

router.put('/:id', (req, res, next) => {
  const users = column.update(req, req.params.id);
  res.json(users);
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('GET users listing')
  // res.send("{\"name\":\"hyeonjae\"}");
  const users = column.findAll();
  res.json(users);
});

module.exports = router;
