const { application } = require('express');
var express = require('express');
var router = express.Router();

const users = [
  {
    id: 101,
    name: 'hyeonjae',
    age: 35,
  },{
    id: 102,
    name: 'jinseok',
    age: 35,
  },{
    id: 103,
    name: 'dongil',
    age: 41,
  },{
    id: 104,
    name: 'seongjae',
    age: 38,
  },
]

router.get('/:id', (req, res, next) => {
  const fvalue = req.params.id;
  const found = users.find(element => element.id == fvalue);
  res.send(found); 
});

router.post('/', (req, res, next) => {
  const ids = users.map(user => user.id)
  const maxId = Math.max(...ids)

  const { body } = req
  const { name, age } = body

  const newUser = {
    id: maxId + 1,
    name,
    age,
  }

  users.push(newUser);

  res.json(newUser);
})


router.delete('/:id', (req, res, next) => {
  const fvalue = req.params.id;
  const found = users.findIndex(element => element.id == fvalue);
  users.splice(found, 1);

  res.json(users);  
});

router.put('/:id', (req, res, next) => {
  const fvalue = req.params.id;
  const found = users.findIndex(element => element.id == fvalue);
  const newUser = {
    id: Number(fvalue),
    name: req.body.name,
    age: req.body.age
  }
  users.splice(found, 1, newUser);

  res.json(users);
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('GET users listing')
  // res.send("{\"name\":\"hyeonjae\"}");
  res.json(users);
});

module.exports = router;
