/*global describe it before */
'use strict';

let expect = require('chai').expect;
let Server = require('../helpers/server');
let db = Server.get('db');

describe('api server', () => {
  before((done) => {
    db['database'].once('connected', () => {
      done();
    });
  });

  it('should return an Express app', () => {
    expect(Server).to.not.be.null;
    expect(Server).to.have.property('mountpath');
    expect(Server).to.have.property('get');
  });

  it('should have an instance of the database', () => {
    // todo: check that the database is actually connected
    expect(db).to.not.be.null;
  });
});

describe('Models', () => {
  require('./models')(db);
});
