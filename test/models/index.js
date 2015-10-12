'use strict';

let loader = require('../../helpers/loader');

module.exports = (db) => {
  loader('test/models').forEach((model) => {
    model.File(db);
  });
};
