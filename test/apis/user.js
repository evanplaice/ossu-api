/*global describe it before beforeEach after afterEach */
'use strict';

let expect = require('chai').expect;
let request = require('request');
let fixture = require('../fixtures/users.json');

module.exports = (app, db) => {
  describe('User API', () => {
    // launching app via 'http' to expose server.close()
    let Server = require('http').createServer(app);
    // setup the model
    let Model = db.User;
    let user1 = new Model(fixture[0]);
    let user2 = new Model(fixture[1]);

    before((done) => {
      Model.remove()
        .then(user1.save())
        .then(user2.save())
        .then(done());
    });

    after((done) => done());

    beforeEach((done) => {
      Server.listen(4000, () => done());
    });

    afterEach((done) => {
      Server.close(() => done());
    });

    it('should list all users', (done) => {
      let options = {
        url: 'http://localhost:4000/api/users/',
        headers: [ 'content-type: application/json' ]
      };
      request(options, (err, res, body) => {
        body = JSON.parse(body);
        expect(err).to.be.null;
        expect(user1.username).to.equal(body[0].username);
        expect(user2.username).to.equal(body[1].username);
        done();
      });
    });

    it('should get a user by id', (done) => {
      let options = {
        url: 'http://localhost:4000/api/users/' + user1._id,
        headers: [ 'content-type: application/json' ]
      };
      request(options, (err, res, body) => {
        body = JSON.parse(body);
        expect(err).to.be.null;
        expect(user1.username).to.equal(body.username);
        done();
      });
    });
  });
};
