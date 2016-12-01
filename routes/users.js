'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
var knex = require('../knex');
const {decamelizeKeys, camelizeKeys} = require('humps');
var bcrypt = require('bcrypt');

router.post('/users', function(req, res, next){
  var hashed = bcrypt.hashSync(req.body.password, 8);

  knex('users')
  .insert({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    hashed_password: hashed,
  }, '*')
  .then((user) => {
    var newUser = camelizeKeys(user);
    res.send({
      id: newUser[0].id,
      firstName: newUser[0].firstName,
      lastName: newUser[0].lastName,
      email: newUser[0].email
    }).status(200);
  })
  .catch ((err) => {
    next(err);
  });
});

module.exports = router;
