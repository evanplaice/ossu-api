'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let helmet = require('helmet');
let UsersApi = require('./users');

/**
 * Returns an express router to handle api endpoints.
 * Receives an instance of the express app.
*/
module.exports = function (app) {
  let router = express.Router();
  let db = app.get('db');

  router.use(helmet());
  router.use(bodyParser.json());

  // mount the users api
  router.use('/users', UsersApi(db));

  return router;
};
