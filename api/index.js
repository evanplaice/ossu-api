var express     = require('express'),
    bodyParser  = require('body-parser'),
    helmet      = require('helmet'),
    UsersApi    = require('./users');

/** 
 * Returns an express router to handle api endpoints.
 * Receives an instance of the express app.
*/
module.exports = function(app) {
  var router = express.Router(),
    db = app.get('db');

  router.use( helmet() );
  router.use( bodyParser.json() );

  //mount the users api
  router.use( '/users', UsersApi(db) );

  return router;
}