/*global describe it before */
'use strict';
let assert = require('chai').assert;
let OssServer = require('./../index');

describe('api server', () => {
  before((done) => {
    OssServer.get('db').once('open', () => {
      done();
    });
  });

  it('should return an Express app', () => {
    assert.isDefined(OssServer && OssServer.mountpath, OssServer.get);
  });

  it('should have an instance of the database', () => {
    // todo: check that the database is actually connected
    assert.isDefined(OssServer.get('db'));
  });
});

describe('User Model', () => {
  let db = OssServer.get('db');
  let UserModel = db.model('user');

  before((done) => {
    // empty colleciton
    UserModel.remove(() => {
      done();
    });
  });

  it('saves without error', (done) => {
    let user = new UserModel({
      fname: 'John',
      lname: 'Doe'
    });

    user.save((err, model) => {
      assert.isNull(err);
      assert.isDefined(model._id);
      done();
    });
  });
});
