'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
// const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
var knex = require('../knex');

const secret = process.env.JWT_SECRET;


function verifyToken(req, res, next) {
  console.log("Veryify Token Response");
  const token = req.get('Authorization');
  try {
    jwt.verify(token, secret);
    next();
  } catch (err){
    console.log(err);
    res.send("Not Authenticated").status(401);
  }
}



module.exports = verifyToken;
// module.exports = router;
