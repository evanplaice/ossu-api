'use strict';

let loader = require('../../helpers/loader');

module.exports = (app, db) => {
  loader('test/apis').forEach((api) => {
    api.File(app, db);
  });
};
