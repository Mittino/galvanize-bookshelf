'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

console.log(process.env.JWT_SECRET);

router.get('/token', function(req, res, next){
  var decoded = jwt.decode(token, {complete: true});
  console.log(decoded.header);
  console.log(decoded.payload);

});


module.exports = router;
