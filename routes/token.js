'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const boom = require('boom');
require('dotenv').config();
const knex = require('../knex');
const bcrypt = require('bcrypt');

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
    res.status(200).json(false);
  } else {
    try {
      jwt.verify(req.cookies.token, secret);
      res.json(true).status(200);
    } catch(err) {
      res.json(false).status(400);
    }
  }
});

router.post('/token', (req, res, next) => {
  knex('users')
    .where({
      email: req.body.email,
    })
    .then(function(results) {
      var user = results[0];
      if (user){
        var matches = bcrypt.compareSync(req.body.password, user.hashed_password);
        if (matches === true){
          var response = {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name
          };
          var token = jwt.sign(response, secret);
          res.cookie("token", token, {httpOnly: true});
          res.json(response).status(200);
        } else {
          throw new boom.create(400, 'Bad email or password');
        }
      } else {
        throw new boom.create(400, 'Bad email or password');
      }
    })
    .catch(function(err) {
      next(err);
    });
});

router.delete('/token', (req, res, next) => {

});

module.exports = router;
