'use strict';

// load deps
let express = require('express');

module.exports = (Controller) => {
  let router = express.Router();

  /** list all users */
  router.get('/', Controller.show);

  /** get user by id */
  router.get('/:id', Controller.get);

  /** save a new user */
  router.post('/:id', Controller.create);

  /** delete a user */
  router.delete('/:id', Controller.destroy);

  return router;
};
