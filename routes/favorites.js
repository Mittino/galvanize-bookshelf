'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const secret = process.env.JWT_SECRET;
const {decamelizeKeys, camelizeKeys} = require('humps');

// YOUR CODE HERE

router.get("/favorites", function(req, res, next){
  if (!req.cookies.token){
    res.status(400).send('noCookie');
  } else {
    var token = req.cookies.token;
    try {
      var decoded = jwt.verify(token, secret);
      knex.select('*').from('favorites').rightJoin('books','favorites.book_id', 'books.id')
      .where({
        user_id: decoded.id
      })
      .then(function(results){
        res.send(camelizeKeys(results));
      });
    } catch(err) {
      res.json(false).status(400);
    }
  }
});

router.post("/favorites", function(req, res, next){

});

router.delete("/favorites", function( req, res, next){

});

module.exports = router;
