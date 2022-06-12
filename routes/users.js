var express = require('express');
var router = express.Router();

var column = require('../repository/userDb.js');

router.get('/:id', async function (req, res, next) {
  const users = await column.findOne(Number(req.params.id));
  res.json(users);
});

router.post('/', async function (req, res, next) {
  const users = await column.insert(req, req.params.id);
  res.json(users);
});

router.delete('/:id', async function (req, res, next) {
  const users = await column.remove(req.params.id);
  res.json(users)
});

router.put('/:id', async function (req, res, next) {
  const users = await column.update(req, Number(req.params.id));
  res.json(users);
});

/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log('GET users listing');
  const users = await column.findAll()
  res.json(users)
});

module.exports = router;
