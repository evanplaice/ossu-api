/*global describe it before */
'use strict';

let expect = require('chai').expect;

module.exports = (db) => {
  describe('User Model', () => {
    let Model = db.User;

    before((done) => {
      Model.remove(() => {
        done();
      });
    });

    it('saves without error', (done) => {
      let user = new Model({
        fname: 'John',
        lname: 'Doe'
      });

      user.save((err, model) => {
        expect(err).to.be.null;
        expect(model).to.not.be.null;
        expect(model).to.have.property('_id');
        expect(model).to.have.property('fname', 'John');
        expect(model).to.have.property('lname', 'Doe');
        done();
      });
    });
  });
};
