'use strict';

// load deps
let express = require('express');
let helmet = require('helmet');
let bodyParser = require('body-parser');

// load the routes
let UsersApi = require('./users');

/**
 * Returns an express router to handle api endpoints.
 * Receives an instance of the express app.
*/
module.exports = (app) => {
  let router = express.Router();
  let db = app.get('db');

  router.use(helmet());
  router.use(bodyParser.json());

  // load controllers
  let Controllers = require('../controllers')(db);

  // mount the users api
  router.use('/users', UsersApi(Controllers.User));

  return router;
};
