'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const ev = require('express-validation');
const validations = require('../validations/books');

var knex = require('../knex');
const {decamelizeKeys, camelizeKeys} = require('humps');

router.get('/books', (req, res, next) => {
  knex('books')
  .orderBy('title')
  .then((books) => {
    var newbooks = camelizeKeys(books);
    res.send(newbooks).status(200);
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/books/:id', (req, res, next) => {
  knex('books')
  .where('id', req.params.id)
  .first()
  .then((book) => {
    var newBook = camelizeKeys(book);
    res.send(newBook).status(200);
  })
  .catch((err) => {
    next(err);
  });
});

router.post('/books', ev(validations.post), (req, res, next) => {
  knex('books')
  .insert({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
  }, '*')
  .then((book) => {
    var newbook = camelizeKeys(book);
    res.send(newbook[0]).status(200);
  })
  .catch((err) => {
    next(err);
  });
});

router.patch('/books/:id', (req, res, next) => {
  knex('books')
  .where('id', req.params.id)
  .first()
  .then((books) => {
    if (!books) {
      return next();
    } return knex('books')
      .update({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        cover_url: req.body.coverUrl
      }, '*')
      .where ('id', req.params.id);
      })
      .then((books) => {
        var newbook = camelizeKeys(books);
        res.send(newbook[0]);
      })
      .catch ((err) => {
        next(err);
  });
});

router.delete('/books/:id', (req, res, next) => {
  let book;
  knex('books')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }

    book = row;

    return knex('books')
      .del()
      .where('id', req.params.id);
    })
    .then(() => {
      delete book.id;
      res.send(camelizeKeys(book));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
