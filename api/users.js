'use strict';

let express = require('express');

module.exports = (db) => {
  let router = express.Router();
  // let userModel = db.model('user');

  /** list all users */
  router.get('/', (req, res) => {});

  /** get user by id */
  router.get('/:id', (req, res) => {});

  /** save a new user */
  router.post('/:id', (req, res) => {});

  return router;
};
