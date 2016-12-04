'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
var knex = require('../knex');
var bcrypt = require('bcrypt');

const secret = process.env.JWT_SECRET;


// function verifyToken(req, res, next) {
//   console.log("Veryify Token Response");
//   const token = req.get('Authorization');
//   try {
//     jwt.verify(token, secret);
//     next();
//   } catch (err){
//     console.log(err);
//     res.send("Not Authenticated").status(401);
//   }
// }

router.get('/token', (req, res, next) => {
  if (!req.cookies.token){
    res.status(200).send('false');
  } else {

  }
  // check cookie for token
    // if it exists, verify
      // resp with 200 and true if it verifies
      // resp with 200 and false if it does NOT verify

});

router.post('/token', (req, res, next) => {
  knex('users')
    .where({
      email: req.body.email,
    })
    .then(function(results) {
      if (results[0]){
        var matches = bcrypt.compareSync(req.body.password, results[0].hashed_password);
        if (matches === true){
          //var token = jwt.sign({ //});
          res.send("token goes here").status(200);
        } else {
          throw new Error('Password does not match');
        }
      } else {
        throw new Error('No results in the DB');
      }
    })
    .catch(function(err) {
      res.status(400).send("Bad email or password");
      // errs for either DB trip
    });



// check the req body for email and password
// verify that email and password (remember to check hashed pass) match a user in the DB
  // if it does match a user,
    // create a JWT
    // set the JWT as a cookie
    // resp with 200 and {
      //   id: 1,
      //   firstName: 'Joanne',
      //   lastName: 'Rowling',
      //   email: 'jkrowling@gmail.com'
      // }
  // if it does NOT match a user,
    // resp with 400, 'Bad email or password'
});

router.delete('/token', (req, res, next) => {

});

module.exports = router;
