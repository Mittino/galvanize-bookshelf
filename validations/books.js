'use strict';

const Joi = require('joi');

// Then, add rules to validate the req.body of all POST requests for the following route files.
//
// routes/authors.js
// routes/books.js
// routes/session.js
// routes/users.js

module.exports.post = {
  body: {
    title: Joi.string()
    .label('title')
    .required()
    .trim(),

    author: Joi.string()
    .label('author')
    .required()
    .trim(),

    genre: Joi.string()
    .label('genre')
    .required()
    .trim(),

    description: Joi.string()
    .label('description')
    .required()
    .trim()
  }
};
