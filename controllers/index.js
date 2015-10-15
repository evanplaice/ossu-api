'use strict';

// load deps
let loader = require('../helpers/loader');

/**
 *
 * Returns all controllers to handle the endpoints
 * Receives an instance of database.
 *
 */

module.exports = (db) => {
  let Controllers = {};

  loader('controllers').forEach((controller) => {
    Controllers[controller.name] = new controller.File(db);
  });

  return Controllers;
};
