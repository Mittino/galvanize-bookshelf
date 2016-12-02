'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
var tokenPath = path.join(__dirname, '../.env');
console.log(tokenPath);


var token = fs.readFileSync(tokenPath, 'utf8', function(err, data){
  if (err) {
    throw (err);
  }
});
console.log(token);

// router.get('/token', function(req, res, next){
//   var decoded = jwt.decode(token, {complete: true});
//   console.log(decoded.header);
//   console.log(decoded.payload);
//
// });


module.exports = router;
