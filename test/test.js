/*global describe it before */
'use strict';
let assert = require('chai').assert;
let OssServer = require('./../index');
let db = OssServer.get('db');

describe('api server', () => {
  before((done) => {
    db.once('open', () => {
      done();
    });
  });

  it('should return an Express app', () => {
    assert.isDefined(OssServer && OssServer.mountpath, OssServer.get);
  });

  it('should have an instance of the database', () => {
    // todo: check that the database is actually connected
    assert.isDefined(db);
  });
});

describe('Models', () => {
  require('./suite_models.js')(db);
});
