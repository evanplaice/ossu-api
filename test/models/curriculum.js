/*global describe it xit before */
'use strict';

let expect = require('chai').expect;

module.exports = (db) => {
  describe('Curriculum Model', () => {
    let Model = db.Curriculum;

    before((done) => {
      Model.remove(() => {
        done();
      });
    });

    it('saves without error', (done) => {
      let curriculum = new Model({
        name: 'Master Brewer'
      });

      curriculum.save((err, model) => {
        expect(err).to.be.null;
        expect(model).to.not.be.null;
        expect(model).to.have.property('_id');
        expect(model).to.have.property('name', 'Master Brewer');
        done();
      });
    });

    xit('organizes courses into categories');
  });
};
